---
title: 在 2C2G 学生服务器上搭 Vaultwarden：密码库先别裸奔
published: 2026-06-22
created: 2026-06-22
updated: 2026-06-25
lastEdited: 2026-06-25
updateCount: 4
description: 用 Docker Compose 在学生服务器上部署 Vaultwarden，并把 HTTPS、关闭注册、备份、恢复演练这些真正重要的部分讲清楚。
image: ""
tags:
  - 教程
  - Vaultwarden
  - Bitwarden
  - Docker
  - Cloudflare Tunnel
  - 备份
category: 服务器探索
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "用 Docker Compose 在学生服务器部署 Vaultwarden"
    - "HTTPS 和关闭公开注册比装起来更重要"
    - "把备份和恢复演练当成上线步骤的一部分"
alias: ""

---

Vaultwarden 大概是最适合放在 2C2G 小服务器上的服务之一

它很轻，客户端生态也成熟，手机、电脑、浏览器插件都能直接用 Bitwarden 官方客户端连上去

但它也是我最不建议随手玩玩的服务之一

博客坏了还能重建，密码库要是出事，丢的是账号、2FA、面板密码，甚至你后面所有服务器的入口

所以这篇不打算讲什么花里胡哨的玩法，就讲一套够用的思路：

1. 用 Docker Compose 跑起来
2. 只通过 HTTPS 暴露出去
3. 注册完立刻关注册
4. 备份和恢复别拖

官方项目：

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Compose 文档：

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## 它适合谁

我觉得适合这些人：

- 已经有一台自己的小服务器
- 想把密码数据握在自己手里
- 愿意处理 HTTPS、备份、更新这些脏活

如果你只想省心，那 Bitwarden 官方托管、1Password、Apple 密码管理器这些都很好

Vaultwarden 的优势不是零维护，而是更轻，更自由，也更适合穷学生的小机器

## 先准备这些

- 一台能跑 Docker 的 VPS
- 一个域名，或者至少一个稳定的 HTTPS 入口
- Docker 和 Docker Compose
- 基本的 SSH、反代、防火墙常识

如果你还没装 Docker，可以先看 [[docker-compose-minimum-start|Docker 和 Docker Compose 最小入门：看懂那些 yml 文件]]

如果你还没配域名，可以先看 [[free-domain-and-web-community|给刚搭好的博客配一个免费域名，再去站长社区露个脸]]

## 创建目录

我这里还是放在 `/srv/stacks`

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

目录结构大概这样：

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

后面数据库、附件这些东西都在 `vw-data` 里

## 先写 compose

```yaml
services:
  vaultwarden:
    image: ghcr.io/dani-garcia/vaultwarden:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true"
      INVITATIONS_ALLOWED: "false"
      ENABLE_WEBSOCKET: "true"
      TZ: "Asia/Shanghai"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

把 `vault.example.com` 换成你自己的域名

这里最重要的是这一行：

```text
127.0.0.1:8080:80
```

意思是 Vaultwarden 只监听本机 `8080`

公网不会直接打到它，只能通过 Nginx、Caddy 或 Cloudflare Tunnel 转进去

不要一上来就写成：

```text
0.0.0.0:8080:80
```

密码库直接裸在公网 HTTP 端口上，这事不太行

几个变量简单说一下：

- `DOMAIN`：最后实际访问的 HTTPS 地址
- `SIGNUPS_ALLOWED`：第一次注册时临时开，注册完就关
- `INVITATIONS_ALLOWED`：个人自用直接关
- `ENABLE_WEBSOCKET`：开着就行，客户端同步体验会正常一点

## 启动

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

本机检查一下：

```bash
curl -I http://127.0.0.1:8080/
```

能返回状态码，说明容器活着

但这还不算搭完，因为真正重要的是 HTTPS

## 反代和 HTTPS

Vaultwarden 这种东西不要长期跑在 HTTP 上

浏览器安全上下文、密码管理器客户端、后面你自己的心理安全感，都要求你把 HTTPS 这件事弄对

我一般会在两条路里选一条

### 路线 A：Caddy / Nginx

适合域名直接解析到服务器，80 和 443 也愿意开放

Caddy 最省事：

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

它会自己处理证书

Nginx 也行，核心思路一样，就是把 `https://vault.example.com` 转到 `127.0.0.1:8080`

```nginx
server {
    listen 80;
    server_name vault.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vault.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        client_max_body_size 525M;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

改完别忘了检查：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 路线 B：Cloudflare Tunnel

如果你不想让源站直接开 80 和 443，那 Tunnel 更舒服

结构就是：

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

我自己更偏向这条路，因为源站更安静一点

不过这里有个坑：不要给整个 Vaultwarden 套 Cloudflare Access 登录页

浏览器插件和手机客户端不一定吃得消这套东西

真要加额外保护，优先只保护 `/admin`

## 第一次注册完立刻关注册

第一次打开 `https://vault.example.com` 之后，先把自己的主账号建好

建完以后马上改配置：

```yaml
SIGNUPS_ALLOWED: "false"
```

然后重启：

```bash
docker compose up -d
```

不要觉得自己域名很冷门，公网服务迟早会被扫到

## 账号建好以后先做什么

- 设置一个真的够强的主密码
- 开两步验证
- 确认 HTTPS 正常后再导入密码
- 导入前先从旧密码管理器导出一份离线备份

还有一个很现实的事：

别把服务器 SSH 密钥、面板密码、各种 root 级凭据乱扔进一个没想清楚备份策略的密码库里

先搭起来，再慢慢迁

## 备份

Vaultwarden 最重要的数据就在这里：

```text
/srv/stacks/vaultwarden/vw-data
```

最简单的做法就是先让它做一次内部备份，再把整个目录打包

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

如果你用了 `.env`、SMTP、管理 token 之类的东西，也要一起备份，但别扔进公开仓库

然后把备份拉回本地，或者同步到另一台机器

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

别只放在同一台服务器上

同机备份很多时候等于没备份

## 恢复演练

只会备份，不会恢复，其实挺危险的

你至少得偶尔检查一下备份包里面有没有东西：

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

正常应该能看到：

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

真恢复的时候，先停服务，再把旧数据挪开：

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

恢复后至少检查四件事：

- 网页能打开
- 自己能登录
- 条目还在
- 浏览器插件和手机能同步

别等真炸了再第一次学恢复

## 更新

更新前先备份，这个别偷懒

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

更新完别光看日志，网页和客户端都自己点进去试一下

## 它适不适合 2C2G

很适合

Vaultwarden 本身不吃多少资源，2C2G 跑它很轻松

真正的成本不在 CPU 和内存，在维护习惯：

- HTTPS
- 关闭注册
- 备份
- 恢复
- 更新

如果你只是想找个服务截图发朋友圈，那这东西不适合

如果你想认真开始自己的自托管路线，它反而很适合当第一个严肃服务

因为密码库会逼着你把很多基础习惯都补齐
