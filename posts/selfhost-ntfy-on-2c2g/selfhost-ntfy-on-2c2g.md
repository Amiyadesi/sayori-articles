---
title: 在 2C2G 学生服务器上跑 ntfy：给自己一个通知按钮
published: 2026-06-22
created: 2026-06-22
updated: 2026-06-27
lastEdited: 2026-06-27
updateCount: 1
description: 用 Docker 在学生服务器上部署 ntfy 推送服务，让备份脚本、监控、定时任务都能往手机发通知。
image: ""
tags:
  - ntfy
  - Docker
  - 推送通知
  - 服务器探索
  - 自托管
category: 服务器探索
draft: false
alias: ""
---

ntfy 是我服务器上最不起眼但最有用的服务之一

它做的事情很简单：你用一条 HTTP 请求往它发一句话，它就把这句话推送到你的手机

没有复杂的配置界面，没有花哨的仪表盘。就是一个推送管道

但这个管道的用途比你想象的多：

- 备份脚本跑完了，告诉你成功还是失败
- 服务器费用预警触发了，通知你去看看
- 定时任务出错了，给你推一条
- Gatus 监控发现某个服务挂了，通知你
- 证书快过期了，提醒你
- 也可以自定义一些命令发过去实现远程临时的操控

官方项目：

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

官网文档：

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## 为什么自建

ntfy 有官方公共服务器 `ntfy.sh`，不装任何东西也能用

但我还是选择自建，原因是：

- 公共服务器的 topic 是公开的。任何人知道你的 topic 名就能往里面发东西
- 自建可以加用户认证
- 自建可以控制留存和日志
- 学生服务器反正有空间，ntfy 很轻

如果你只是临时试试，用公共 `ntfy.sh` 完全可以。但长期用，自建更踏实

## 部署

准备目录：

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

写 `docker-compose.yml`：

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

几个要点：

- 端口 `127.0.0.1:8090:80`：只监听本机。不要直接暴露到公网
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`：默认拒绝所有未认证请求。这样只有你自己（带 token 或账号密码）能发和收
- `NTFY_BASE_URL`：填你最终要用的域名，比如我用的就是`ntfy.sayori.org`

## 启动

```bash
docker compose up -d
docker compose logs -f
```

本机检查：

```bash
curl http://127.0.0.1:8090/
```

能看到 ntfy 的 Web 界面响应就行。

## 创建用户

因为我们设了 `deny-all`，需要创建一个用户给自己用：

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

它会让你输入密码。记住这个账号密码，后面发通知和手机 App 都要用

也可以生成 token：

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

token 比密码方便，脚本里直接用 header 带就行

## 接域名

和 Vaultwarden 一样，走 Cloudflare Tunnel 或者 Caddy/Nginx 反代

Cloudflare Tunnel 路线：

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

确认 HTTPS 能正常访问后，打开 `https://ntfy.example.com`，用刚才的账号登录 Web 界面。

## 发第一条通知

最简单的方式：

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

这里 `/test` 是 topic 名。你可以随便起名，比如 `/backup`、`/alert`、`/server`。

也可以带标题和优先级：

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## 手机 App

Android：

- F-Droid 上有 ntfy 客户端。
- Google Play 也有。

iOS：

- App Store 搜 ntfy。

打开 App 后：

1. 设置里添加你的自建服务器地址。
2. 填账号密码或 token。
3. 订阅你的 topic（比如 `backup`、`alert`）。

以后服务器发出去的通知就会推到手机上。

## 在脚本里用

备份脚本结尾加一行：

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

定时任务失败通知：

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## 和 Gatus 配合

如果你跑了 Gatus 做健康检查，可以在 Gatus 配置里加 ntfy 作为告警通道。

Gatus 支持 ntfy 原生告警，配置里写服务器地址、topic 和 token 就行。

这样某个服务挂了，Gatus 会自动往 ntfy 发通知，你手机就会响。

## 资源占用

ntfy 非常轻

我服务器上跑着它，平时内存占用大概 20-30MB。CPU 基本为零。对 2C2G 来说完全不是负担

它不需要数据库。消息缓存在本地文件里，默认保留一段时间后自动过期

## 注意事项

- 不要把 ntfy token 写进公开仓库
- 如果你设了 `deny-all` 但有些外部服务（比如 Gatus 从同一台机器发）需要不带认证地发通知，可以单独给某些 topic 开放权限
- 消息不是永久保留的。如果你需要历史记录，应该由发送方自己记录日志
- ntfy 的 Web 界面不需要暴露给公网。手机 App 订阅用 API 就行

## 适合放在 2C2G 上吗

非常适合。它可能是 2C2G 上性价比最高的服务之一

装上以后，你会发现几乎所有脚本的最后一步都变成了「发个通知告诉我结果」。这比你每天 SSH 进去看日志舒服太多了

