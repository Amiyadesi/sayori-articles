---
title: 在学生服务器上折腾 Fast Note Sync：给 Obsidian 一个私有同步层
published: 2026-06-22
created: 2026-06-22
updated: 2026-06-24
lastEdited: 2026-06-24
updateCount: 3
description: 用 2C2G 学生服务器试跑 Fast Note Sync Service，给 Obsidian 多端同步、备份、REST/MCP 接口留一条私有路线。
image: ""
tags:
  - 教程
  - Obsidian
  - Fast Note Sync
  - Docker
  - 笔记同步
  - MCP
category: 服务器探索
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "在 2C2G 学生服务器试跑 Fast Note Sync"
    - "给 Obsidian 多端同步和备份留一条私有路线"
    - "顺带保留 REST 和 MCP 接口的折腾空间"
alias: ""

---

我现在写博客和项目笔记都在 Obsidian 里，但是obsidian一开始都是在电脑上写的，然后电脑里已经写了一堆后才发现手机写不了，于是就去找同步服务了

官方 Obsidian Sync 当然省心，虽然你的钱包不会省心；Syncthing、Git、WebDAV 也都有各自的玩法，但是我感觉不方便

直到最后我看到了Fast Note Sync 这个插件，也是在逛L站的时候在评论区里看到的：它是一个 Obsidian 插件 + 自托管服务端，目标就是多端实时同步，还顺手加了版本历史、附件、Web 管理、REST API、MCP 这些东西，而我配置实战几天后，发现确实非常好用b(￣▽￣)d

插件：

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

服务端：

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Obsidian 插件页：

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## 它适合谁

我觉得适合这些人：

- 已经用 Obsidian 写大量内容
- 有一台 24 小时在线的小服务器
- 愿意自己处理 HTTPS、反代、备份
- 希望能随时随地写笔记的人

这样的话，即使电脑不在身边，也可以方便的用手机来写文章，回来后电脑一同步就好了

## 部署服务端

服务端仓库在这里：

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

它是 Go 写的服务端，仓库描述里写的是高性能、低延迟的笔记同步、在线管理和远程 REST API 服务平台

我会先建目录：

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

然后按官方文档选择 Docker、二进制或源码编译部署。无论哪种方式，我都会尽量让服务只监听本机地址，再用反代或 Tunnel 暴露 HTTPS

思路是：

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

如果用 Docker Compose，至少保留这几个习惯：

- 数据目录持久化到当前服务目录
- 配置文件不要进公开仓库
- 不直接把服务端口暴露到公网
- 更新前备份数据目录

同步服务里面是你的笔记，不该裸奔

## 接域名

你可以用 Caddy / Nginx，也可以用 Cloudflare Tunnel

比如域名：

```text
notes.example.com
```

结构：

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

如果你还没有域名，可以先看：

[[free-domain-and-web-community|给刚搭好的博客配一个免费域名，再去站长社区露个脸]]

我不建议直接访问：

```text
http://服务器IP:<服务端口>
```

至少要 HTTPS，最好再加访问保护

## 初始化账号和插件

服务端 README 里写的流程大概是：

1. 打开 Web 管理界面
2. 首次访问注册账号
3. 在后台复制 API 配置
4. 到 Obsidian 插件设置里粘贴配置

从 GitHub Releases 手动下载 `main.js`、`styles.css`、`manifest.json`，放进：

```text
.obsidian/plugins/fast-note-sync/
```

然后去插件页面启动，需要你在Web页面创建并且复制token，然后在远端配置里面粘贴就好了，一般过一会就启动了

## 备份比同步更重要

同步不是备份

这句话要单独写出来。同步会把删除同步过去，也会把错误同步过去

Fast Note Sync 本身支持历史版本、回收站、备份、镜像、Git 同步等功能，但你还是要有自己的兜底

如果你已经用 Git 同步 Obsidian，就别一上来再叠一层实时同步，先想清楚谁是主同步，谁是备份

## MCP 和 REST API 怎么看

Fast Note Sync Service 现在还提供 REST API 和 MCP 支持

这件事对我很有吸引力。因为我的很多内容都在 Obsidian 里，如果以后 AI 客户端能通过受控接口读写笔记，那它就不只是同步工具，而是个人知识库的入口

但这也是风险

AI 能读写你的笔记，意味着权限边界要更清楚：

- 不要把 MCP 接口暴露到公网
- 不要给不可信客户端写权限
- 不要把私密日记、账号信息、密钥混在一个开放 Vault 里
- 重要 Vault 先只读，确认流程后再考虑写入

「能接 AI」不是立刻全开权限的理由

## 它在 2C2G 上压力大吗

正常个人使用应该还好

真正占资源的是附件数量、同步频率、还有你是不是把一整个几十 GB 的素材库塞进 Obsidian




