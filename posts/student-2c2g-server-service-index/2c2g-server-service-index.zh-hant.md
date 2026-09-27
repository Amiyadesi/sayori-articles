---
title: "2C2G 學生服務器能跑什麼：先別把小機器塞爆"
published: 2026-06-22
created: 2026-06-22
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 4
description: "站長的 2C2G 阿里雲輕量服務器實戰配置：Vaultwarden、ntfy、Gatus、Fast Note Sync、AstrBot 和搜索網關。包含真實內存佔用和不推薦列表。"
image: ""
tags:
  - 資源整合
  - 學生服務器
  - Docker
  - 自託管
category: 建站與自託管
section: deals
draft: false
alias: ""
lang: zh-Hant
translationKey: posts/student-2c2g-server-service-index/2c2g-server-service-index
---

如果你跟站長一樣，把阿里雲學生 300 元券換成了一臺 2C2G 服務器，恭喜。

你現在擁有了一臺 24 小時在線的小機器。

但它真的只是小機器。2 核 1.6GB 內存（實際可用 672MB 左右，開了 Swap），適合練手、掛輕量服務，不適合跑本地模型、Nextcloud、視頻轉碼這類重活。

這篇是站長的真實配置記錄。服務器已經跑了一個多月，目前 14 個容器，內存用了 765MB + 987MB Swap，磁盤用了 21GB / 40GB。

## 先做好基礎配置

服務先別急着裝。

拿到服務器後，先把這幾件事做了：

- SSH 密鑰登錄
- 關閉密碼登錄
- 換一個非默認 SSH 端口
- 配安全組和 UFW
- 設置阿里雲費用預警（CDT 流量）
- 建一個統一的服務目錄
- 裝 Docker 和 Docker Compose

前面幾步可以看我之前這篇：

[我本來只是想讓機器人 24 小時在線，結果買了一臺雲服務器](/posts/sayori-server-01-vps-start/)

服務目錄我放在 `/root/sayori/`，用一個大 `docker-compose.yml` 統一管理。也可以每個服務一個目錄：

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

每個目錄一個 `docker-compose.yml`，真實密鑰放 `.env`，不要進公開倉庫。

## 站長目前在跑的服務

### 🔐 Vaultwarden（密碼庫，最重要）

**用途：** 個人密碼庫

**爲什麼優先跑它：**

- 密碼庫比博客、狀態頁、機器人都重要
- 輕量，內存佔用低
- 客戶端生態成熟，手機、電腦、瀏覽器都能用 Bitwarden 官方客戶端
- 支持 Bitwarden 付費功能（2FA 保存、密碼健康檢查）

**關鍵注意：**

- 第一次註冊完就關 `SIGNUPS_ALLOWED`
- 必須配 HTTPS（Cloudflare Tunnel 或 Caddy）
- 定期備份，定期恢復演練
- 不要裸奔在公網

**內存佔用：** ~50MB

**詳細教程：** [[selfhost-vaultwarden-on-2c2g|在 2C2G 学生服务器上搭 Vaultwarden]]

---

### 📢 ntfy（推送通知，第二重要）

**用途：** 給自己發推送

服務器上跑備份腳本、監控腳本、定時任務，失敗了總要有人通知你。ntfy 就適合幹這個。

**我用它做什麼：**

- 備份成功/失敗通知
- Gatus 健康檢查報警
- 評論審覈結果推送
- 手動觸發一些運維命令（通過 ntfy → 腳本聯動）

**關鍵注意：**

- 設置訪問控制，不要讓陌生人往你的 topic 發消息
- 配合 Cloudflare Access 保護管理後臺

**內存佔用：** ~20MB



---

### 📊 Gatus（狀態頁和健康檢查）

**用途：** 監控你的服務

它可以定時檢查你的博客、Vaultwarden、機器人面板、API 是否還活着。掛了就通過 ntfy 通知你。

**我監控的端點：**

- `sayori.org` 博客
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus 自己
- `ntfy.sayori.org` ntfy
- Fast Note Sync API

**關鍵注意：**

- 配置文件寫 YAML，別手抖寫錯縮進
- Cloudflare Tunnel 暴露，Access 保護
- 通知渠道對接 ntfy

**內存佔用：** ~15MB

---

### 📝 Fast Note Sync（Obsidian 同步）

**用途：** 給 Obsidian 做私有同步

如果你像我一樣用 Obsidian 寫博客、記項目、存草稿，這個服務會很誘人。它比 Obsidian Sync 便宜（0 元），比 Syncthing 省心（不用多端都在線）。

**關鍵注意：**

- 定期備份數據目錄
- 不要放超大文件（圖片、視頻）
- 同步衝突時手動處理

**內存佔用：** ~30MB

**詳細教程：** [[fast-note-sync-on-student-server|在学生服务器上折腾 Fast Note Sync]]

---

### 🤖 AstrBot + NapCat（QQ 機器人）

**用途：** 24 小時在線的 QQ/Telegram/Discord 機器人

放在遠端服務器後，終於能實現 24 小時不停地跑機器人了。可以接入 Discord 和 Telegram，這兩個地方基本沒有風控。

**QQ 接入注意：**

- 新號容易風控，建議養號
- 不要剛創小號就去用（站長血淚教訓）
- NapCat 需要定期掃碼登錄

**內存佔用：** AstrBot ~100MB, NapCat ~150MB

---

### 🔍 AI Search Gateway（搜索網關）

**用途：** 自用 AI 搜索聚合網關

整合了 Tavily、Brave Search、Firecrawl、Exa、Grok Search、SearXNG，用 FastAPI 搭的。給 Codex 和 Claude Code MCP 用，比單獨調 API 方便。

**關鍵注意：**

- 只監聽 `127.0.0.1:8000`，不要暴露公網
- 本地通過 SSH 端口轉發 + MCP 調用
- API Key 放環境變量

**內存佔用：** ~100MB（含 Redis 和 SearXNG）

---

### 🛡️ Comment Moderation（評論審覈）

**用途：** AI 審覈博客評論

用公益 GPT 額度自動審覈 Twikoo 評論，配合 ntfy 推送審覈結果。可以在 ntfy 裏通過發消息手動刪除和恢復評論。

再加上 Cloudflare Turnstile 人機驗證，留下來的評論基本都是高質量的。

**內存佔用：** ~40MB

---

### 🌐 Cloudflared（Cloudflare Tunnel）

**用途：** 暴露本地服務到公網，不開 80/443

站長的所有公網服務都走 Cloudflare Tunnel：

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel（必須配 Cloudflare Access）

**優點：**

- 不用開放源站端口
- 自動 HTTPS
- 可以配 Access 做鑑權

**內存佔用：** ~30MB

---

### 🎛️ 1Panel（Docker 管理面板）

**用途：** Web 界面管理 Docker 容器

適合新手看容器狀態，也適合臨時排查問題。

**安全警告：**

- 必須走 Cloudflare Tunnel + Access，或者至少反代 HTTPS 並強密碼
- 這個能控制你的所有容器
- 不要裸奔在公網

**內存佔用：** ~80MB

---

### 其他輔助服務

- **Mihomo**：代理客戶端，給需要的服務提供代理
- **Redis**：給 Search Gateway 做緩存

## 目前內存佔用情況（真實數據）

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**結論：**

- 1.6GB 內存，用了 765MB，Swap 用了 987MB
- 14 個容器，內存佔用合理
- Swap 用得多說明內存確實緊張，但還能撐
- 不要再加重服務了

## 不推薦在 2C2G 上跑的服務

這些要麼喫內存，要麼喫 CPU，要麼喫存儲，2C2G 撐不住：

### ❌ Nextcloud / OwnCloud

**爲什麼不推薦：**

- 內存佔用高（PHP-FPM + 數據庫 + Redis）
- 文件上傳下載喫帶寬和 IO
- 大文件預覽喫 CPU
- 同步衝突多

**替代方案：**

- 輕量文件同步：Fast Note Sync（只適合文本）、Syncthing
- 雲存儲：Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**爲什麼不推薦：**

- 視頻轉碼喫 CPU 和內存
- 媒體庫掃描喫 IO
- 40GB 磁盤放不了幾部電影

**替代方案：**

- 用專門的 NAS 或媒體服務器
- 或者直接用在線流媒體

---

### ❌ GitLab

**爲什麼不推薦：**

- 內存佔用 4GB 起步
- 2C2G 根本跑不動

**替代方案：**

- GitHub / Gitea / Forgejo
- Gitea 輕量很多，但也要 512MB+ 內存

---

### ❌ Mastodon / Misskey

**爲什麼不推薦：**

- 聯邦宇宙服務器喫內存和數據庫
- 媒體存儲佔用磁盤

**替代方案：**

- 直接用公共實例註冊賬號

---

### ❌ 本地大模型（Ollama / LM Studio）

**爲什麼不推薦：**

- 2C 跑推理慢到懷疑人生
- 1.6GB 內存裝不下任何有用的模型

**替代方案：**

- 用公益額度：AnyRouter、SharedChat
- 用學生券：阿里雲百鍊
- 詳見：[大學生怎麼用 AnyRouter、SharedChat 和 cc-switch 管理 AI 額度](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress（不是不能跑，是不建議）

**爲什麼不太推薦：**

- PHP + MySQL 喫內存
- 插件裝多了更喫
- 靜態博客（Astro / Hugo）性能更好

**如果一定要跑：**

- 用 Caddy + PHP-FPM + SQLite
- 少裝插件
- 配 Cloudflare CDN

## 推薦的學習順序

站長會這樣安排：

1. **基礎配置**：SSH、安全組、Docker、費用預警
2. **域名和 HTTPS**：免費域名 + Cloudflare DNS + Cloudflare Tunnel
3. **核心服務**：Vaultwarden（密碼庫）+ ntfy（通知）+ Gatus（監控）
4. **按需添加**：Fast Note Sync、機器人、其他工具

**不要一口氣裝 10 個服務。** 一個一個來，每個都跑穩了再加下一個。

## 相關資源

**自託管服務發現：**

- awesome-selfhosted：[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare：[https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**本文提到的項目：**

- Vaultwarden：[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync：[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy：[https://ntfy.sh/](https://ntfy.sh/)
- Gatus：[https://gatus.io/](https://gatus.io/)
- AstrBot：[https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` 適合找「還有什麼能自建」。`awesome-cloudflare` 適合找「哪些東西可以不放在 VPS 上，而是放到 Cloudflare 上」。

個人服務器不是所有東西都自己扛。能讓 Cloudflare Pages、Workers、R2、Tunnel 做的，就別用 2GB 內存硬撐。

---

## 最後

2C2G 的服務器最適合做「個人常用服務的起點」。

它能讓你：

- 熟悉 Linux、Docker、反代、域名、HTTPS
- 跑幾個輕量但有用的服務
- 養成備份、監控、運維的習慣

它不能讓你：

- 跑重服務
- 當生產服務器
- 替代專業 NAS 或媒體服務器

但這就夠了。

服務器不是配置完就結束，它會逼着你認真對待備份、安全、監控。這其實是好事。
