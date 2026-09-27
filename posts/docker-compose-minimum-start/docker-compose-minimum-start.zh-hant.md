---
title: "Docker 和 Docker Compose 最小入門：看懂那些 yml 文件"
published: 2026-06-23
created: 2026-06-23
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 4
description: "給剛拿到服務器的人寫的 Docker 最小入門：容器是什麼、Compose 文件怎麼讀、怎麼啓動停止更新刪除，不講原理只講能用。"
image: ""
tags:
  - 教程
  - Docker
  - 新手入門
category: 建站與自託管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "用最少概念理解容器和 Docker Compose"
    - "看懂 yml 裏服務、端口、卷和環境變量"
    - "覆蓋啓動、停止、更新和刪除這些常用操作"
alias: ""

lang: zh-Hant
translationKey: posts/docker-compose-minimum-start/docker-compose-minimum-start
---

如果你看我的其他文章，會發現幾乎每個自託管服務都是用 Docker 跑的

Vaultwarden、ntfy、Gatus、Fast Note Sync，全部都是一個 `docker-compose.yml` 文件搞定

這篇講：拿到服務器以後，怎麼裝 Docker，怎麼看懂 compose 文件，怎麼啓動、停止、更新、刪除容器，夠你跑完前面所有服務就行

## Docker 是什麼（一句話版）

Docker 讓你用別人打包好的「鏡像」直接跑服務，不用自己在系統裏一個一個裝依賴

你不需要手動裝 Python、裝 Go、裝 Node、配環境變量、處理版本衝突。鏡像裏面全有了

`docker-compose.yml` 就是一個配置文件，告訴 Docker：

- 拉哪個鏡像
- 用什麼端口
- 掛載哪些目錄
- 設置哪些環境變量
- 出錯了要不要自動重啓

## 安裝

Ubuntu / Debian 上裝 Docker：

```bash
curl -fsSL https://get.docker.com | sh
```

這個一鍵腳本會裝 Docker Engine 和 Docker Compose（現在 compose 是 Docker 的子命令，不需要單獨裝 `docker-compose`）

裝完檢查：

```bash
docker --version
docker compose version
```

如果你不想用 `sudo` 跑 Docker：

```bash
sudo usermod -aG docker $USER
```

然後退出重新登錄。如果還是不行，重啓服務器

## 第一個 compose 文件

我拿一個最簡單的例子來看：

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

逐行翻譯：

| 行 | 意思 |
| --- | --- |
| `services:` | 下面定義服務列表 |
| `whoami:` | 服務名，隨便起 |
| `image: traefik/whoami` | 用這個鏡像 |
| `container_name: whoami` | 容器叫 whoami |
| `restart: unless-stopped` | 崩了自動重啓，除非你手動停 |
| `ports: - "127.0.0.1:8080:80"` | 本機 8080 端口映射到容器的 80 端口 |

把這段保存成 `docker-compose.yml`（或者 `compose.yml`，兩個名字都行），然後在同目錄運行：

```bash
docker compose up -d
```

`-d` 是後臺運行

檢查：

```bash
curl http://127.0.0.1:8080/
```

能看到返回信息就說明在跑了

## 常用命令

我把最常用的列在這裏：

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

所有命令都要在 `docker-compose.yml` 所在的目錄下執行

## 讀懂真實的 compose 文件

拿 Vaultwarden 的來舉例：

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

新出現的東西：

| 字段 | 意思 |
| --- | --- |
| `environment:` | 環境變量，相當於配置項 |
| `volumes: - ./vw-data:/data` | 把當前目錄下的 `vw-data` 文件夾掛載到容器裏的 `/data` |

### environment

環境變量是大多數 Docker 服務的配置方式

不同的服務有不同的變量，比如 Vaultwarden 是 `DOMAIN`、`SIGNUPS_ALLOWED`，ntfy 是 `NTFY_BASE_URL`、`NTFY_AUTH_DEFAULT_ACCESS`

去看每個項目的文檔就能知道它支持哪些變量

### volumes

volumes 是數據持久化的關鍵

容器刪掉以後，容器內部的文件會消失。但 volumes 掛載的目錄在宿主機上，不會跟着容器一起消失，類似遊戲存檔一般的存在，每次啓動容器就是讀取存檔開始遊戲（笑）

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

這意味着：

- 容器裏 `/data` 下的文件，實際上存在宿主機的 `./vw-data` 裏
- 刪掉容器再重建，數據還在
- 備份只需要備份宿主機的 `./vw-data`

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1` 意味着只有本機能訪問。外面連不進來

如果你寫 `"0.0.0.0:8080:80"` 或者 `"8080:80"`，那就是公網也能直接訪問

對於密碼庫、管理面板這類東西，永遠先 `127.0.0.1`，再用反代或 Tunnel 暴露 HTTPS

## 用 .env 文件放敏感信息

不要把密碼、Token、域名直接寫在 `docker-compose.yml` 裏然後推到 GitHub

在同目錄下建一個 `.env` 文件：

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

然後在 compose 裏引用：

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

`.env` 文件加到 `.gitignore` 裏，不要進倉庫

## 更新服務

更新一個服務：

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

先備份再更新。出問題了還能回滾

## 刪除服務

如果你不想要某個服務了：

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down` 只刪容器，不刪 volumes 數據

如果你想徹底清理包括 volume：

```bash
docker compose down -v
```

但這會刪數據。確認不需要了再用

## 清理磁盤

Docker 用久了會積累很多舊鏡像。2C2G 的磁盤不大，偶爾清理一下：

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

`prune` 只清理沒在用的東西，在跑的服務不受影響。但 `--volumes` 要想清楚再用

## 我的目錄結構

我習慣這樣放：

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

每個服務一個目錄。進目錄就能 `docker compose up -d`。數據和配置都在自己目錄裏，備份也好做

## 常見問題

**端口衝突**

兩個服務不能用同一個宿主機端口。如果 Vaultwarden 用了 8080，ntfy 就得換一個，比如 8090

**權限問題**

有些鏡像容器內用非 root 用戶運行，掛載的目錄權限不對會導致寫不進去。這時候檢查一下宿主機目錄的所有者和權限

**忘記 -d**

`docker compose up` 不加 `-d` 的話，關掉終端服務就停了。記得加 `-d`

**compose v1 vs v2**

老教程裏寫的 `docker-compose up`（帶橫槓）是 v1。現在用 `docker compose up`（空格）是 v2。新裝的系統都是 v2，如果你看到老教程帶橫槓，換成空格就行

## 夠用了

到這裏你已經能：

- 裝 Docker
- 讀懂 compose 文件
- 啓動、停止、更新、刪除服務
- 管理數據和配置
- 清理磁盤

後面每篇自託管服務的文章，都只需要給你一個 `docker-compose.yml`，你就能跑起來

不用一開始就理解 Docker 的所有概念。先能用，用多了自然會想知道更多
