---
title: Cloudflare 免費層能幫開發者做什麼：不花錢的賽博大善人全家桶
published: 2026-06-22
created: 2026-06-22
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 2
description: 整理 Cloudflare 免費層裏真的能用的東西：Pages、Workers、R2、Tunnel、Email Routing、DNS、Web Analytics，以及哪些場景下它比 VPS 更合適。
image: ""
tags:
  - 教程
  - Cloudflare
  - 雲服務
  - 免費資源
category: 建站與自託管
section: deals
draft: false
alias: ""
lang: zh-Hant
translationKey: posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide
---

Cloudflare 在開發者圈子裏被叫「賽博大善人」不是沒原因的。

它的免費層額度對於個人開發者來說，簡直就是營養過剩

這篇把我覺得開發者用得到的一些免費服務整理起來

## 註冊

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

用郵箱註冊就行。不需要綁信用卡就能用免費層的大部分功能（有些功能比如 R2 需要綁卡但不會扣錢，除非你超量）

註冊不了的話換個節點或者無痕瀏覽器試試

## Cloudflare Pages

這是我用得最多的。

Pages 讓你把靜態網站（HTML、CSS、JS，或者 Astro/Next.js/Hugo 等框架的構建產物）部署到 Cloudflare 的全球網絡上

免費層給你：

- 無限站點數量
- 無限帶寬
- 每月 500 次構建
- 自動 HTTPS
- 自定義域名
- 預覽部署（每個 PR 一個預覽 URL）

對個人博客來說，這基本沒有限制

我的博客就跑在 Pages 上。GitHub 倉庫推送後，GitHub Actions 構建 Astro，再用 Wrangler 上傳到 Pages。整個流程零成本

如果你還沒用過：

[[astro-mizuki-blog-from-zero|从零开始搭建一个和站长一样的博客]]

## Cloudflare Workers

Workers 是 Cloudflare 的 Serverless 函數。你可以寫一小段 JS/TS，部署上去，它就跑在 Cloudflare 的邊緣節點上

免費層給你：

- 每天 10 萬次請求
- 每次請求 10ms CPU 時間
- 1MB 代碼大小

適合幹什麼：

- 做一個簡單 API（比如返回隨機句子、轉發請求、做一個短鏈接服務）
- 給靜態站加一點動態邏輯
- 做 Webhook 接收器
- 做簡單的代理或重定向

不適合幹什麼：

- 需要長時間運行的任務
- 需要數據庫的複雜後端（雖然可以接 D1 或 KV，但免費層有額度）
- 需要持久 WebSocket 的服務

如果你只是想寫個博客，Workers 暫時用不上。但知道它存在很有用，後面折騰各種小工具時會經常遇到

## Cloudflare R2

R2 是對象存儲，兼容 S3 API

免費層給你：

- 10GB 存儲
- 每月 1000 萬次 A 類操作（PUT/POST/LIST）
- 每月 1000 萬次 B 類操作（GET）
- 出站流量免費（這個是大殺器）

適合幹什麼：

- 博客圖片存儲（配合自定義域名就是一個圖牀）
- 備份文件存放
- 靜態資源託管
- 小項目的文件上傳存儲

爲什麼比 OSS 香：出站流量不收錢。阿里雲 OSS 的出站流量是要花錢的，R2 不收。對個人博客和小項目來說，這個差異很大

需要綁信用卡才能開通 R2，但免費層內不會扣費

## Cloudflare Tunnel

Tunnel 讓你把內網服務（比如你 VPS 上只監聽 127.0.0.1 的 Vaultwarden）安全地暴露到公網

工作方式：

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

好處：

- VPS 不需要開放 80/443 端口
- 不需要自己申請 SSL 證書
- 可以配合 Cloudflare Access 加一層身份認證
- 源站 IP 不暴露

我的 Vaultwarden、ntfy、Gatus、1Panel 面板都走 Tunnel

免費層沒有 Tunnel 數量限制。你可以一條 Tunnel 跑多個子域名

安裝方式是在 VPS 上跑一個 `cloudflared` 守護進程，它會主動連出去，不需要入站規則

## Cloudflare DNS

把域名的 NS 改到 Cloudflare，就能用它的免費 DNS 託管

好處：

- 全球 Anycast，解析速度快
- 免費 DNSSEC
- 配合 Proxy 模式隱藏源站 IP
- 管理界面很清楚

如果你的域名在其他註冊商買的（比如 Namesilo、Porkbun、SpaceShip、國內的各種雲），可以把 NS 改到 Cloudflare 來管

如果你用的是免費域名（比如 DNSHE 的 cc.cd），要看那個域名服務是否允許改 NS。有些允許，有些只能在原平臺加記錄

## Cloudflare Email Routing

Email Routing 可以讓你用自定義域名收郵件，然後轉發到你的真實郵箱

比如：

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

免費，不需要自己搭郵件服務器

適合：

- 給博客留一個聯繫郵箱，不暴露真實地址
- 註冊各種服務時用自定義域名郵箱
- 學習郵件相關的 DNS 記錄（MX、SPF、DKIM）

注意：這只是收件轉發。如果你想用自定義域名發件，需要額外配置（比如用 Gmail SMTP + 別名，或者用 Resend、Mailgun、Zoho mail 這類服務）

## Cloudflare Web Analytics

不需要安裝任何 JS 腳本，Cloudflare 就能給你看網站的基礎流量數據

在 Dashboard 裏的 Web Analytics 就能開啓

它比 Google Analytics 輕很多：

- 不追蹤用戶
- 不放 Cookie
- 不需要額外加載 JS
- 隱私友好

對個人博客來說，看看每天有沒有人來、從哪裏來、看了哪些頁面，這個就夠了

如果你想要更詳細的分析（比如事件追蹤、漏斗、自定義維度），可以以後再看 Umami 或 Plausible。但起步階段，Cloudflare 自帶的就夠

## Cloudflare Access（Zero Trust 免費層）

Access 可以給你的任何 Web 服務加一層登錄保護

比如你有一個管理面板跑在 `panel.example.com`，不想任何人都能訪問。Access 可以在訪問時彈出一個登錄頁面，只有通過驗證的人才能進

免費層支持最多 50 個用戶

驗證方式可以是：

- 郵箱一次性驗證碼
- GitHub 登錄
- Google 登錄

我的 1Panel 面板就用了 Access 保護。即使面板本身有密碼，多一層入口認證總是好的

## 還有什麼免費的

其他免費但我用得少的：

- **D1**：SQLite 數據庫，跑在 Workers 旁邊。免費層 5GB
- **KV**：鍵值存儲。免費層有日讀寫限制但對小項目夠
- **Queues**：消息隊列
- **Images**：圖片變換（這個免費層很有限）
- **Stream**：視頻託管（免費層基本不夠用）
- **Zaraz**：第三方腳本管理

不用全記住。知道 Cloudflare 免費層很大方就行，以後有需要時回來查

## 什麼時候不該用 Cloudflare

- 需要長時間運行的後臺任務 → 用 VPS
- 需要持久數據庫和複雜查詢 → 用 VPS 或託管數據庫
- 需要 WebSocket 長連接 → Workers 有限制
- 需要大文件處理 → Workers 內存和 CPU 有限
- 中國大陸訪問速度敏感 → Cloudflare 免費層在國內不一定快

總的原則：能放 Cloudflare 的放 Cloudflare，必須持久運行的放 VPS。兩者不是替代關係，是互補

## 我的用法總結

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

2C2G 的學生服務器只負責跑必須持久運行的東西。其他能卸載到 Cloudflare 的，就不用服務器扛

## 延伸閱讀

awesome-cloudflare：[https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

這個倉庫整理了 Cloudflare 生態裏各種工具和用法，14k+ star。如果你想知道「別人拿 Cloudflare 做了什麼」，從這裏開始
