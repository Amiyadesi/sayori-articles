---
title: "2C2G 学生服务器能跑什么：先别把小机器塞爆"
published: 2026-06-22
created: 2026-06-22
updated: 2026-06-27
lastEdited: 2026-06-27
updateCount: 3
description: "站长的 2C2G 阿里云轻量服务器实战配置：Vaultwarden、ntfy、Gatus、Fast Note Sync、AstrBot 和搜索网关。包含真实内存占用和不推荐列表。"
image: ""
tags:
  - 教程
  - 2C2G
  - Docker
  - 自托管
  - 学生向
category: 服务器探索
draft: false
alias: ""
---

如果你跟站长一样，把阿里云学生 300 元券换成了一台 2C2G 服务器，恭喜。

你现在拥有了一台 24 小时在线的小机器。

但它真的只是小机器。2 核 1.6GB 内存（实际可用 672MB 左右，开了 Swap），适合练手、挂轻量服务，不适合跑本地模型、Nextcloud、视频转码这类重活。

这篇是站长的真实配置记录。服务器已经跑了一个多月，目前 14 个容器，内存用了 765MB + 987MB Swap，磁盘用了 21GB / 40GB。

## 先做好基础配置

服务先别急着装。

拿到服务器后，先把这几件事做了：

- SSH 密钥登录
- 关闭密码登录
- 换一个非默认 SSH 端口
- 配安全组和 UFW
- 设置阿里云费用预警（CDT 流量）
- 建一个统一的服务目录
- 装 Docker 和 Docker Compose

前面几步可以看我之前这篇：

[我本来只是想让机器人 24 小时在线，结果买了一台云服务器](/posts/sayori-server-01-vps-start/)

服务目录我放在 `/root/sayori/`，用一个大 `docker-compose.yml` 统一管理。也可以每个服务一个目录：

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

每个目录一个 `docker-compose.yml`，真实密钥放 `.env`，不要进公开仓库。

## 站长目前在跑的服务

### 🔐 Vaultwarden（密码库，最重要）

**用途：** 个人密码库

**为什么优先跑它：**

- 密码库比博客、状态页、机器人都重要
- 轻量，内存占用低
- 客户端生态成熟，手机、电脑、浏览器都能用 Bitwarden 官方客户端
- 支持 Bitwarden 付费功能（2FA 保存、密码健康检查）

**关键注意：**

- 第一次注册完就关 `SIGNUPS_ALLOWED`
- 必须配 HTTPS（Cloudflare Tunnel 或 Caddy）
- 定期备份，定期恢复演练
- 不要裸奔在公网

**内存占用：** ~50MB

**详细教程：** [[selfhost-vaultwarden-on-2c2g|在 2C2G 学生服务器上搭 Vaultwarden]]

---

### 📢 ntfy（推送通知，第二重要）

**用途：** 给自己发推送

服务器上跑备份脚本、监控脚本、定时任务，失败了总要有人通知你。ntfy 就适合干这个。

**我用它做什么：**

- 备份成功/失败通知
- Gatus 健康检查报警
- 评论审核结果推送
- 手动触发一些运维命令（通过 ntfy → 脚本联动）

**关键注意：**

- 设置访问控制，不要让陌生人往你的 topic 发消息
- 配合 Cloudflare Access 保护管理后台

**内存占用：** ~20MB



---

### 📊 Gatus（状态页和健康检查）

**用途：** 监控你的服务

它可以定时检查你的博客、Vaultwarden、机器人面板、API 是否还活着。挂了就通过 ntfy 通知你。

**我监控的端点：**

- `sayori.org` 博客
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus 自己
- `ntfy.sayori.org` ntfy
- Fast Note Sync API

**关键注意：**

- 配置文件写 YAML，别手抖写错缩进
- Cloudflare Tunnel 暴露，Access 保护
- 通知渠道对接 ntfy

**内存占用：** ~15MB

---

### 📝 Fast Note Sync（Obsidian 同步）

**用途：** 给 Obsidian 做私有同步

如果你像我一样用 Obsidian 写博客、记项目、存草稿，这个服务会很诱人。它比 Obsidian Sync 便宜（0 元），比 Syncthing 省心（不用多端都在线）。

**关键注意：**

- 定期备份数据目录
- 不要放超大文件（图片、视频）
- 同步冲突时手动处理

**内存占用：** ~30MB

**详细教程：** [[fast-note-sync-on-student-server|在学生服务器上折腾 Fast Note Sync]]

---

### 🤖 AstrBot + NapCat（QQ 机器人）

**用途：** 24 小时在线的 QQ/Telegram/Discord 机器人

放在远端服务器后，终于能实现 24 小时不停地跑机器人了。可以接入 Discord 和 Telegram，这两个地方基本没有风控。

**QQ 接入注意：**

- 新号容易风控，建议养号
- 不要刚创小号就去用（站长血泪教训）
- NapCat 需要定期扫码登录

**内存占用：** AstrBot ~100MB, NapCat ~150MB

---

### 🔍 AI Search Gateway（搜索网关）

**用途：** 自用 AI 搜索聚合网关

整合了 Tavily、Brave Search、Firecrawl、Exa、Grok Search、SearXNG，用 FastAPI 搭的。给 Codex 和 Claude Code MCP 用，比单独调 API 方便。

**关键注意：**

- 只监听 `127.0.0.1:8000`，不要暴露公网
- 本地通过 SSH 端口转发 + MCP 调用
- API Key 放环境变量

**内存占用：** ~100MB（含 Redis 和 SearXNG）

---

### 🛡️ Comment Moderation（评论审核）

**用途：** AI 审核博客评论

用公益 GPT 额度自动审核 Twikoo 评论，配合 ntfy 推送审核结果。可以在 ntfy 里通过发消息手动删除和恢复评论。

再加上 Cloudflare Turnstile 人机验证，留下来的评论基本都是高质量的。

**内存占用：** ~40MB

---

### 🌐 Cloudflared（Cloudflare Tunnel）

**用途：** 暴露本地服务到公网，不开 80/443

站长的所有公网服务都走 Cloudflare Tunnel：

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel（必须配 Cloudflare Access）

**优点：**

- 不用开放源站端口
- 自动 HTTPS
- 可以配 Access 做鉴权

**内存占用：** ~30MB

---

### 🎛️ 1Panel（Docker 管理面板）

**用途：** Web 界面管理 Docker 容器

适合新手看容器状态，也适合临时排查问题。

**安全警告：**

- 必须走 Cloudflare Tunnel + Access，或者至少反代 HTTPS 并强密码
- 这个能控制你的所有容器
- 不要裸奔在公网

**内存占用：** ~80MB

---

### 其他辅助服务

- **Mihomo**：代理客户端，给需要的服务提供代理
- **Redis**：给 Search Gateway 做缓存

## 目前内存占用情况（真实数据）

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**结论：**

- 1.6GB 内存，用了 765MB，Swap 用了 987MB
- 14 个容器，内存占用合理
- Swap 用得多说明内存确实紧张，但还能撑
- 不要再加重服务了

## 不推荐在 2C2G 上跑的服务

这些要么吃内存，要么吃 CPU，要么吃存储，2C2G 撑不住：

### ❌ Nextcloud / OwnCloud

**为什么不推荐：**

- 内存占用高（PHP-FPM + 数据库 + Redis）
- 文件上传下载吃带宽和 IO
- 大文件预览吃 CPU
- 同步冲突多

**替代方案：**

- 轻量文件同步：Fast Note Sync（只适合文本）、Syncthing
- 云存储：Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**为什么不推荐：**

- 视频转码吃 CPU 和内存
- 媒体库扫描吃 IO
- 40GB 磁盘放不了几部电影

**替代方案：**

- 用专门的 NAS 或媒体服务器
- 或者直接用在线流媒体

---

### ❌ GitLab

**为什么不推荐：**

- 内存占用 4GB 起步
- 2C2G 根本跑不动

**替代方案：**

- GitHub / Gitea / Forgejo
- Gitea 轻量很多，但也要 512MB+ 内存

---

### ❌ Mastodon / Misskey

**为什么不推荐：**

- 联邦宇宙服务器吃内存和数据库
- 媒体存储占用磁盘

**替代方案：**

- 直接用公共实例注册账号

---

### ❌ 本地大模型（Ollama / LM Studio）

**为什么不推荐：**

- 2C 跑推理慢到怀疑人生
- 1.6GB 内存装不下任何有用的模型

**替代方案：**

- 用公益额度：AnyRouter、SharedChat
- 用学生券：阿里云百炼
- 详见：[大学生怎么用 AnyRouter、SharedChat 和 cc-switch 管理 AI 额度](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress（不是不能跑，是不建议）

**为什么不太推荐：**

- PHP + MySQL 吃内存
- 插件装多了更吃
- 静态博客（Astro / Hugo）性能更好

**如果一定要跑：**

- 用 Caddy + PHP-FPM + SQLite
- 少装插件
- 配 Cloudflare CDN

## 推荐的学习顺序

站长会这样安排：

1. **基础配置**：SSH、安全组、Docker、费用预警
2. **域名和 HTTPS**：免费域名 + Cloudflare DNS + Cloudflare Tunnel
3. **核心服务**：Vaultwarden（密码库）+ ntfy（通知）+ Gatus（监控）
4. **按需添加**：Fast Note Sync、机器人、其他工具

**不要一口气装 10 个服务。** 一个一个来，每个都跑稳了再加下一个。

## 相关资源

**自托管服务发现：**

- awesome-selfhosted：[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare：[https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**本文提到的项目：**

- Vaultwarden：[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync：[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy：[https://ntfy.sh/](https://ntfy.sh/)
- Gatus：[https://gatus.io/](https://gatus.io/)
- AstrBot：[https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` 适合找「还有什么能自建」。`awesome-cloudflare` 适合找「哪些东西可以不放在 VPS 上，而是放到 Cloudflare 上」。

个人服务器不是所有东西都自己扛。能让 Cloudflare Pages、Workers、R2、Tunnel 做的，就别用 2GB 内存硬撑。

---

## 最后

2C2G 的服务器最适合做「个人常用服务的起点」。

它能让你：

- 熟悉 Linux、Docker、反代、域名、HTTPS
- 跑几个轻量但有用的服务
- 养成备份、监控、运维的习惯

它不能让你：

- 跑重服务
- 当生产服务器
- 替代专业 NAS 或媒体服务器

但这就够了。

服务器不是配置完就结束，它会逼着你认真对待备份、安全、监控。这其实是好事。

