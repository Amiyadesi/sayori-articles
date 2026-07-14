---
title: "Docker 和 Docker Compose 最小入门：看懂那些 yml 文件"
published: 2026-06-23
created: 2026-06-23
updated: 2026-06-27
lastEdited: 2026-06-27
updateCount: 3
description: "给刚拿到服务器的人写的 Docker 最小入门：容器是什么、Compose 文件怎么读、怎么启动停止更新删除，不讲原理只讲能用。"
image: ""
tags:
  - 教程
  - Docker
  - Docker Compose
  - 新手友好
category: 服务器探索
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "用最少概念理解容器和 Docker Compose"
    - "看懂 yml 里服务、端口、卷和环境变量"
    - "覆盖启动、停止、更新和删除这些常用操作"
alias: ""

---

如果你看我的其他文章，会发现几乎每个自托管服务都是用 Docker 跑的

Vaultwarden、ntfy、Gatus、Fast Note Sync，全部都是一个 `docker-compose.yml` 文件搞定

这篇讲：拿到服务器以后，怎么装 Docker，怎么看懂 compose 文件，怎么启动、停止、更新、删除容器，够你跑完前面所有服务就行

## Docker 是什么（一句话版）

Docker 让你用别人打包好的「镜像」直接跑服务，不用自己在系统里一个一个装依赖

你不需要手动装 Python、装 Go、装 Node、配环境变量、处理版本冲突。镜像里面全有了

`docker-compose.yml` 就是一个配置文件，告诉 Docker：

- 拉哪个镜像
- 用什么端口
- 挂载哪些目录
- 设置哪些环境变量
- 出错了要不要自动重启

## 安装

Ubuntu / Debian 上装 Docker：

```bash
curl -fsSL https://get.docker.com | sh
```

这个一键脚本会装 Docker Engine 和 Docker Compose（现在 compose 是 Docker 的子命令，不需要单独装 `docker-compose`）

装完检查：

```bash
docker --version
docker compose version
```

如果你不想用 `sudo` 跑 Docker：

```bash
sudo usermod -aG docker $USER
```

然后退出重新登录。如果还是不行，重启服务器

## 第一个 compose 文件

我拿一个最简单的例子来看：

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

逐行翻译：

| 行 | 意思 |
| --- | --- |
| `services:` | 下面定义服务列表 |
| `whoami:` | 服务名，随便起 |
| `image: traefik/whoami` | 用这个镜像 |
| `container_name: whoami` | 容器叫 whoami |
| `restart: unless-stopped` | 崩了自动重启，除非你手动停 |
| `ports: - "127.0.0.1:8080:80"` | 本机 8080 端口映射到容器的 80 端口 |

把这段保存成 `docker-compose.yml`（或者 `compose.yml`，两个名字都行），然后在同目录运行：

```bash
docker compose up -d
```

`-d` 是后台运行

检查：

```bash
curl http://127.0.0.1:8080/
```

能看到返回信息就说明在跑了

## 常用命令

我把最常用的列在这里：

```bash
# 启动（后台）
docker compose up -d

# 查看日志
docker compose logs -f

# 查看日志（只看最后 100 行）
docker compose logs --tail=100

# 停止
docker compose down

# 重启
docker compose restart

# 查看状态
docker compose ps

# 进入容器内部（排查问题时用）
docker compose exec whoami sh
```

所有命令都要在 `docker-compose.yml` 所在的目录下执行

## 读懂真实的 compose 文件

拿 Vaultwarden 的来举例：

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

新出现的东西：

| 字段 | 意思 |
| --- | --- |
| `environment:` | 环境变量，相当于配置项 |
| `volumes: - ./vw-data:/data` | 把当前目录下的 `vw-data` 文件夹挂载到容器里的 `/data` |

### environment

环境变量是大多数 Docker 服务的配置方式

不同的服务有不同的变量，比如 Vaultwarden 是 `DOMAIN`、`SIGNUPS_ALLOWED`，ntfy 是 `NTFY_BASE_URL`、`NTFY_AUTH_DEFAULT_ACCESS`

去看每个项目的文档就能知道它支持哪些变量

### volumes

volumes 是数据持久化的关键

容器删掉以后，容器内部的文件会消失。但 volumes 挂载的目录在宿主机上，不会跟着容器一起消失，类似游戏存档一般的存在，每次启动容器就是读取存档开始游戏（笑）

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

这意味着：

- 容器里 `/data` 下的文件，实际上存在宿主机的 `./vw-data` 里
- 删掉容器再重建，数据还在
- 备份只需要备份宿主机的 `./vw-data`

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1` 意味着只有本机能访问。外面连不进来

如果你写 `"0.0.0.0:8080:80"` 或者 `"8080:80"`，那就是公网也能直接访问

对于密码库、管理面板这类东西，永远先 `127.0.0.1`，再用反代或 Tunnel 暴露 HTTPS

## 用 .env 文件放敏感信息

不要把密码、Token、域名直接写在 `docker-compose.yml` 里然后推到 GitHub

在同目录下建一个 `.env` 文件：

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

然后在 compose 里引用：

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

`.env` 文件加到 `.gitignore` 里，不要进仓库

## 更新服务

更新一个服务：

```bash
cd /srv/stacks/vaultwarden

# 先备份数据
tar -czf backup-$(date +%F).tar.gz vw-data

# 拉新镜像
docker compose pull

# 用新镜像重启
docker compose up -d

# 看日志确认正常
docker compose logs --tail=50
```

先备份再更新。出问题了还能回滚

## 删除服务

如果你不想要某个服务了：

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down` 只删容器，不删 volumes 数据

如果你想彻底清理包括 volume：

```bash
docker compose down -v
```

但这会删数据。确认不需要了再用

## 清理磁盘

Docker 用久了会积累很多旧镜像。2C2G 的磁盘不大，偶尔清理一下：

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

`prune` 只清理没在用的东西，在跑的服务不受影响。但 `--volumes` 要想清楚再用

## 我的目录结构

我习惯这样放：

```text
/srv/stacks/
├── vaultwarden/
│   ├── docker-compose.yml
│   ├── .env
│   └── vw-data/
├── ntfy/
│   ├── docker-compose.yml
│   ├── .env
│   ├── cache/
│   ├── data/
│   └── etc/
├── gatus/
│   ├── docker-compose.yml
│   └── config/
└── fast-note-sync/
    ├── docker-compose.yml
    ├── .env
    └── storage/
```

每个服务一个目录。进目录就能 `docker compose up -d`。数据和配置都在自己目录里，备份也好做

## 常见问题

**端口冲突**

两个服务不能用同一个宿主机端口。如果 Vaultwarden 用了 8080，ntfy 就得换一个，比如 8090

**权限问题**

有些镜像容器内用非 root 用户运行，挂载的目录权限不对会导致写不进去。这时候检查一下宿主机目录的所有者和权限

**忘记 -d**

`docker compose up` 不加 `-d` 的话，关掉终端服务就停了。记得加 `-d`

**compose v1 vs v2**

老教程里写的 `docker-compose up`（带横杠）是 v1。现在用 `docker compose up`（空格）是 v2。新装的系统都是 v2，如果你看到老教程带横杠，换成空格就行

## 够用了

到这里你已经能：

- 装 Docker
- 读懂 compose 文件
- 启动、停止、更新、删除服务
- 管理数据和配置
- 清理磁盘

后面每篇自托管服务的文章，都只需要给你一个 `docker-compose.yml`，你就能跑起来

不用一开始就理解 Docker 的所有概念。先能用，用多了自然会想知道更多
