---
title: 在學生服務器上折騰 Fast Note Sync：給 Obsidian 一個私有同步層
published: 2026-06-22
created: 2026-06-22
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 4
description: 用 2C2G 學生服務器試跑 Fast Note Sync Service，給 Obsidian 多端同步、備份、REST/MCP 接口留一條私有路線。
image: ""
tags:
  - 敘事
  - Obsidian
  - Docker
  - 筆記同步
category: 建站與自託管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "在 2C2G 學生服務器試跑 Fast Note Sync"
    - "給 Obsidian 多端同步和備份留一條私有路線"
    - "順帶保留 REST 和 MCP 接口的折騰空間"
alias: ""

lang: zh-Hant
translationKey: posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server
---

我現在寫博客和項目筆記都在 Obsidian 裏，但是obsidian一開始都是在電腦上寫的，然後電腦裏已經寫了一堆後才發現手機寫不了，於是就去找同步服務了

官方 Obsidian Sync 當然省心，雖然你的錢包不會省心；Syncthing、Git、WebDAV 也都有各自的玩法，但是我感覺不方便

直到最後我看到了Fast Note Sync 這個插件，也是在逛L站的時候在評論區裏看到的：它是一個 Obsidian 插件 + 自託管服務端，目標就是多端實時同步，還順手加了版本歷史、附件、Web 管理、REST API、MCP 這些東西，而我配置實戰幾天後，發現確實非常好用b(￣▽￣)d

插件：

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

服務端：

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Obsidian 插件頁：

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## 它適合誰

我覺得適合這些人：

- 已經用 Obsidian 寫大量內容
- 有一臺 24 小時在線的小服務器
- 願意自己處理 HTTPS、反代、備份
- 希望能隨時隨地寫筆記的人

這樣的話，即使電腦不在身邊，也可以方便的用手機來寫文章，回來後電腦一同步就好了

## 部署服務端

服務端倉庫在這裏：

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

它是 Go 寫的服務端，倉庫描述裏寫的是高性能、低延遲的筆記同步、在線管理和遠程 REST API 服務平臺

我會先建目錄：

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

然後按官方文檔選擇 Docker、二進制或源碼編譯部署。無論哪種方式，我都會盡量讓服務只監聽本機地址，再用反代或 Tunnel 暴露 HTTPS

思路是：

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

如果用 Docker Compose，至少保留這幾個習慣：

- 數據目錄持久化到當前服務目錄
- 配置文件不要進公開倉庫
- 不直接把服務端口暴露到公網
- 更新前備份數據目錄

同步服務裏面是你的筆記，不該裸奔

## 接域名

你可以用 Caddy / Nginx，也可以用 Cloudflare Tunnel

比如域名：

```text
notes.example.com
```

結構：

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

如果你還沒有域名，可以先看：

[[free-domain-and-web-community|给刚搭好的博客配一个免费域名，再去站长社区露个脸]]

我不建議直接訪問：

```text
http://服务器IP:<服务端口>
```

至少要 HTTPS，最好再加訪問保護

## 初始化賬號和插件

服務端 README 裏寫的流程大概是：

1. 打開 Web 管理界面
2. 首次訪問註冊賬號
3. 在後臺複製 API 配置
4. 到 Obsidian 插件設置裏粘貼配置

從 GitHub Releases 手動下載 `main.js`、`styles.css`、`manifest.json`，放進：

```text
.obsidian/plugins/fast-note-sync/
```

然後去插件頁面啓動，需要你在Web頁面創建並且複製token，然後在遠端配置裏面粘貼就好了，一般過一會就啓動了

## 備份比同步更重要

同步不是備份

這句話要單獨寫出來。同步會把刪除同步過去，也會把錯誤同步過去

Fast Note Sync 本身支持歷史版本、回收站、備份、鏡像、Git 同步等功能，但你還是要有自己的兜底

如果你已經用 Git 同步 Obsidian，就別一上來再疊一層實時同步，先想清楚誰是主同步，誰是備份

## MCP 和 REST API 怎麼看

Fast Note Sync Service 現在還提供 REST API 和 MCP 支持

這件事對我很有吸引力。因爲我的很多內容都在 Obsidian 裏，如果以後 AI 客戶端能通過受控接口讀寫筆記，那它就不只是同步工具，而是個人知識庫的入口

但這也是風險

AI 能讀寫你的筆記，意味着權限邊界要更清楚：

- 不要把 MCP 接口暴露到公網
- 不要給不可信客戶端寫權限
- 不要把私密日記、賬號信息、密鑰混在一個開放 Vault 裏
- 重要 Vault 先只讀，確認流程後再考慮寫入

「能接 AI」不是立刻全開權限的理由

## 它在 2C2G 上壓力大嗎

正常個人使用應該還好

真正佔資源的是附件數量、同步頻率、還有你是不是把一整個幾十 GB 的素材庫塞進 Obsidian



