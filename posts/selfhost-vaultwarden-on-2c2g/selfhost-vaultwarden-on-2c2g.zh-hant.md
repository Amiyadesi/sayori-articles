---
title: 在 2C2G 學生服務器上搭 Vaultwarden：密碼庫先別裸奔
published: 2026-06-22
created: 2026-06-22
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 5
description: 用 Docker Compose 在學生服務器上部署 Vaultwarden，並把 HTTPS、關閉註冊、備份、恢復演練這些真正重要的部分講清楚。
image: ""
tags:
  - 教程
  - Vaultwarden
  - Docker
  - 密碼管理
category: 建站與自託管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "用 Docker Compose 在學生服務器部署 Vaultwarden"
    - "HTTPS 和關閉公開註冊比裝起來更重要"
    - "把備份和恢復演練當成上線步驟的一部分"
alias: ""

lang: zh-Hant
translationKey: posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g
---

Vaultwarden 大概是最適合放在 2C2G 小服務器上的服務之一

它很輕，客戶端生態也成熟，手機、電腦、瀏覽器插件都能直接用 Bitwarden 官方客戶端連上去

但它也是我最不建議隨手玩玩的服務之一

博客壞了還能重建，密碼庫要是出事，丟的是賬號、2FA、面板密碼，甚至你後面所有服務器的入口

所以這篇不打算講什麼花裏胡哨的玩法，就講一套夠用的思路：

1. 用 Docker Compose 跑起來
2. 只通過 HTTPS 暴露出去
3. 註冊完立刻關注冊
4. 備份和恢復別拖

官方項目：

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Compose 文檔：

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## 它適合誰

我覺得適合這些人：

- 已經有一臺自己的小服務器
- 想把密碼數據握在自己手裏
- 願意處理 HTTPS、備份、更新這些髒活

如果你只想省心，那 Bitwarden 官方託管、1Password、Apple 密碼管理器這些都很好

Vaultwarden 的優勢不是零維護，而是更輕，更自由，也更適合窮學生的小機器

## 先準備這些

- 一臺能跑 Docker 的 VPS
- 一個域名，或者至少一個穩定的 HTTPS 入口
- Docker 和 Docker Compose
- 基本的 SSH、反代、防火牆常識

如果你還沒裝 Docker，可以先看 [[docker-compose-minimum-start|Docker 和 Docker Compose 最小入门：看懂那些 yml 文件]]

如果你還沒配域名，可以先看 [[free-domain-and-web-community|给刚搭好的博客配一个免费域名，再去站长社区露个脸]]

## 創建目錄

我這裏還是放在 `/srv/stacks`

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

目錄結構大概這樣：

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

後面數據庫、附件這些東西都在 `vw-data` 裏

## 先寫 compose

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

把 `vault.example.com` 換成你自己的域名

這裏最重要的是這一行：

```text
127.0.0.1:8080:80
```

意思是 Vaultwarden 只監聽本機 `8080`

公網不會直接打到它，只能通過 Nginx、Caddy 或 Cloudflare Tunnel 轉進去

不要一上來就寫成：

```text
0.0.0.0:8080:80
```

密碼庫直接裸在公網 HTTP 端口上，這事不太行

幾個變量簡單說一下：

- `DOMAIN`：最後實際訪問的 HTTPS 地址
- `SIGNUPS_ALLOWED`：第一次註冊時臨時開，註冊完就關
- `INVITATIONS_ALLOWED`：個人自用直接關
- `ENABLE_WEBSOCKET`：開着就行，客戶端同步體驗會正常一點

## 啓動

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

本機檢查一下：

```bash
curl -I http://127.0.0.1:8080/
```

能返回狀態碼，說明容器活着

但這還不算搭完，因爲真正重要的是 HTTPS

## 反代和 HTTPS

Vaultwarden 這種東西不要長期跑在 HTTP 上

瀏覽器安全上下文、密碼管理器客戶端、後面你自己的心理安全感，都要求你把 HTTPS 這件事弄對

我一般會在兩條路里選一條

### 路線 A：Caddy / Nginx

適合域名直接解析到服務器，80 和 443 也願意開放

Caddy 最省事：

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

它會自己處理證書

Nginx 也行，核心思路一樣，就是把 `https://vault.example.com` 轉到 `127.0.0.1:8080`

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

改完別忘了檢查：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 路線 B：Cloudflare Tunnel

如果你不想讓源站直接開 80 和 443，那 Tunnel 更舒服

結構就是：

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

我自己更偏向這條路，因爲源站更安靜一點

不過這裏有個坑：不要給整個 Vaultwarden 套 Cloudflare Access 登錄頁

瀏覽器插件和手機客戶端不一定喫得消這套東西

真要加額外保護，優先只保護 `/admin`

## 第一次註冊完立刻關注冊

第一次打開 `https://vault.example.com` 之後，先把自己的主賬號建好

建完以後馬上改配置：

```yaml
SIGNUPS_ALLOWED: "false"
```

然後重啓：

```bash
docker compose up -d
```

不要覺得自己域名很冷門，公網服務遲早會被掃到

## 賬號建好以後先做什麼

- 設置一個真的夠強的主密碼
- 開兩步驗證
- 確認 HTTPS 正常後再導入密碼
- 導入前先從舊密碼管理器導出一份離線備份

還有一個很現實的事：

別把服務器 SSH 密鑰、面板密碼、各種 root 級憑據亂扔進一個沒想清楚備份策略的密碼庫裏

先搭起來，再慢慢遷

## 備份

Vaultwarden 最重要的數據就在這裏：

```text
/srv/stacks/vaultwarden/vw-data
```

最簡單的做法就是先讓它做一次內部備份，再把整個目錄打包

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

如果你用了 `.env`、SMTP、管理 token 之類的東西，也要一起備份，但別扔進公開倉庫

然後把備份拉回本地，或者同步到另一臺機器

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

別隻放在同一臺服務器上

同機備份很多時候等於沒備份

## 恢復演練

只會備份，不會恢復，其實挺危險的

你至少得偶爾檢查一下備份包裏面有沒有東西：

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

正常應該能看到：

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

真恢復的時候，先停服務，再把舊數據挪開：

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

恢復後至少檢查四件事：

- 網頁能打開
- 自己能登錄
- 條目還在
- 瀏覽器插件和手機能同步

別等真炸了再第一次學恢復

## 更新

更新前先備份，這個別偷懶

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

更新完別光看日誌，網頁和客戶端都自己點進去試一下

## 它適不適合 2C2G

很適合

Vaultwarden 本身不喫多少資源，2C2G 跑它很輕鬆

真正的成本不在 CPU 和內存，在維護習慣：

- HTTPS
- 關閉註冊
- 備份
- 恢復
- 更新

如果你只是想找個服務截圖發朋友圈，那這東西不適合

如果你想認真開始自己的自託管路線，它反而很適合當第一個嚴肅服務

因爲密碼庫會逼着你把很多基礎習慣都補齊
