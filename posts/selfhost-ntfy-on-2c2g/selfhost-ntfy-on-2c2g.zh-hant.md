---
title: 在 2C2G 學生服務器上跑 ntfy：給自己一個通知按鈕
published: 2026-06-22
created: 2026-06-22
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 3
description: 用 Docker 在學生服務器上部署 ntfy 推送服務，讓備份腳本、監控、定時任務都能往手機發通知。
image: ""
tags:
  - 教程
  - ntfy
  - Docker
  - 推送通知
  - 服務器探索
  - 自託管
category: 建站與自託管
draft: false
alias: ""
lang: zh-Hant
translationKey: posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g
---

ntfy 是我服務器上最不起眼但最有用的服務之一

它做的事情很簡單：你用一條 HTTP 請求往它發一句話，它就把這句話推送到你的手機

沒有複雜的配置界面，沒有花哨的儀表盤。就是一個推送管道

但這個管道的用途比你想像的多：

- 備份腳本跑完了，告訴你成功還是失敗
- 服務器費用預警觸發了，通知你去看看
- 定時任務出錯了，給你推一條
- Gatus 監控發現某個服務掛了，通知你
- 證書快過期了，提醒你
- 也可以自定義一些命令發過去實現遠程臨時的操控

官方項目：

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

官網文檔：

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## 爲什麼自建

ntfy 有官方公共服務器 `ntfy.sh`，不裝任何東西也能用

但我還是選擇自建，原因是：

- 公共服務器的 topic 是公開的。任何人知道你的 topic 名就能往裏面發東西
- 自建可以加用戶認證
- 自建可以控制留存和日誌
- 學生服務器反正有空間，ntfy 很輕

如果你只是臨時試試，用公共 `ntfy.sh` 完全可以。但長期用，自建更踏實

## 部署

準備目錄：

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

寫 `docker-compose.yml`：

```yaml
services:
  ntfy:
    image: binwiederhier/ntfy
    container_name: ntfy
    restart: unless-stopped
    command: serve
    environment:
      TZ: Asia/Shanghai
      NTFY_BASE_URL: "https://ntfy.example.com"
      NTFY_AUTH_DEFAULT_ACCESS: "deny-all"
    volumes:
      - ./cache:/var/cache/ntfy
      - ./data:/var/lib/ntfy
      - ./etc:/etc/ntfy
    ports:
      - "127.0.0.1:8090:80"
```

幾個要點：

- 端口 `127.0.0.1:8090:80`：只監聽本機。不要直接暴露到公網
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`：默認拒絕所有未認證請求。這樣只有你自己（帶 token 或賬號密碼）能發和收
- `NTFY_BASE_URL`：填你最終要用的域名，比如我用的就是`ntfy.sayori.org`

## 啓動

```bash
docker compose up -d
docker compose logs -f
```

本機檢查：

```bash
curl http://127.0.0.1:8090/
```

能看到 ntfy 的 Web 界面響應就行

## 創建用戶

因爲我們設了 `deny-all`，需要創建一個用戶給自己用：

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

它會讓你輸入密碼。記住這個賬號密碼，後面發通知和手機 App 都要用

也可以生成 token：

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

token 比密碼方便，腳本里直接用 header 帶就行

## 接域名

和 Vaultwarden 一樣，走 Cloudflare Tunnel 或者 Caddy/Nginx 反代

Cloudflare Tunnel 路線：

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

確認 HTTPS 能正常訪問後，打開 `https://ntfy.example.com`，用剛纔的賬號登錄 Web 界面

## 發第一條通知

最簡單的方式：

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

這裏 `/test` 是 topic 名。你可以隨便起名，比如 `/backup`、`/alert`、`/server`

也可以帶標題和優先級：

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## 手機 App

Android：

- F-Droid 上有 ntfy 客戶端
- Google Play 也有

iOS：

- App Store 搜 ntfy

打開 App 後：

1. 設置裏添加你的自建服務器地址
2. 填賬號密碼或 token
3. 訂閱你的 topic（比如 `backup`、`alert`）

以後服務器發出去的通知就會推到手機上

## 在腳本里用

備份腳本結尾加一行：

```bash
NTFY_URL="https://ntfy.example.com/backup"
NTFY_TOKEN="你的token"

# 备份成功时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ✅ 备份成功" \
     -d "Vaultwarden 备份完成 $(date +%F)" \
     "$NTFY_URL"

# 备份失败时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ❌ 备份失败" \
     -H "Priority: high" \
     -d "Vaultwarden 备份出错，请检查日志" \
     "$NTFY_URL"
```

定時任務失敗通知：

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## 和 Gatus 配合

如果你跑了 Gatus 做健康檢查，可以在 Gatus 配置里加 ntfy 作爲告警通道

Gatus 支持 ntfy 原生告警，配置裏寫服務器地址、topic 和 token 就行

這樣某個服務掛了，Gatus 會自動往 ntfy 發通知，你手機就會響

## 資源佔用

ntfy 非常輕

我服務器上跑着它，平時內存佔用大概 20-30MB。CPU 基本爲零。對 2C2G 來說完全不是負擔

它不需要數據庫。消息緩存在本地文件裏，默認保留一段時間後自動過期

## 注意事項

- 不要把 ntfy token 寫進公開倉庫
- 如果你設了 `deny-all` 但有些外部服務（比如 Gatus 從同一臺機器發）需要不帶認證地發通知，可以單獨給某些 topic 開放權限
- 消息不是永久保留的。如果你需要歷史記錄，應該由發送方自己記錄日誌
- ntfy 的 Web 界面不需要暴露給公網。手機 App 訂閱用 API 就行

## 適合放在 2C2G 上嗎

非常適合。它可能是 2C2G 上性價比最高的服務之一

裝上以後，你會發現幾乎所有腳本的最後一步都變成了「發個通知告訴我結果」。這比你每天 SSH 進去看日誌舒服太多了

