---
title: Cloudflare 免费层能帮开发者做什么：不花钱的赛博大善人全家桶
published: 2026-06-22
created: 2026-06-22
updated: 2026-06-23
lastEdited: 2026-06-23
updateCount: 1
description: 整理 Cloudflare 免费层里真的能用的东西：Pages、Workers、R2、Tunnel、Email Routing、DNS、Web Analytics，以及哪些场景下它比 VPS 更合适。
image: ""
tags:
  - Cloudflare
  - Cloudflare Pages
  - Cloudflare Workers
  - R2
  - Cloudflare Tunnel
  - 免费
  - 服务器探索
category: 服务器探索
draft: false
alias: ""
---

Cloudflare 在开发者圈子里被叫「赛博大善人」不是没原因的。

它的免费层额度对于个人开发者来说，简直就是营养过剩

这篇把我觉得开发者用得到的一些免费服务整理起来

## 注册

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

用邮箱注册就行。不需要绑信用卡就能用免费层的大部分功能（有些功能比如 R2 需要绑卡但不会扣钱，除非你超量）

注册不了的话换个节点或者无痕浏览器试试

## Cloudflare Pages

这是我用得最多的。

Pages 让你把静态网站（HTML、CSS、JS，或者 Astro/Next.js/Hugo 等框架的构建产物）部署到 Cloudflare 的全球网络上

免费层给你：

- 无限站点数量
- 无限带宽
- 每月 500 次构建
- 自动 HTTPS
- 自定义域名
- 预览部署（每个 PR 一个预览 URL）

对个人博客来说，这基本没有限制

我的博客就跑在 Pages 上。GitHub 仓库推送后，GitHub Actions 构建 Astro，再用 Wrangler 上传到 Pages。整个流程零成本

如果你还没用过：

[[astro-mizuki-blog-from-zero|从零开始搭建一个和站长一样的博客]]

## Cloudflare Workers

Workers 是 Cloudflare 的 Serverless 函数。你可以写一小段 JS/TS，部署上去，它就跑在 Cloudflare 的边缘节点上

免费层给你：

- 每天 10 万次请求
- 每次请求 10ms CPU 时间
- 1MB 代码大小

适合干什么：

- 做一个简单 API（比如返回随机句子、转发请求、做一个短链接服务）
- 给静态站加一点动态逻辑
- 做 Webhook 接收器
- 做简单的代理或重定向

不适合干什么：

- 需要长时间运行的任务
- 需要数据库的复杂后端（虽然可以接 D1 或 KV，但免费层有额度）
- 需要持久 WebSocket 的服务

如果你只是想写个博客，Workers 暂时用不上。但知道它存在很有用，后面折腾各种小工具时会经常遇到

## Cloudflare R2

R2 是对象存储，兼容 S3 API

免费层给你：

- 10GB 存储
- 每月 1000 万次 A 类操作（PUT/POST/LIST）
- 每月 1000 万次 B 类操作（GET）
- 出站流量免费（这个是大杀器）

适合干什么：

- 博客图片存储（配合自定义域名就是一个图床）
- 备份文件存放
- 静态资源托管
- 小项目的文件上传存储

为什么比 OSS 香：出站流量不收钱。阿里云 OSS 的出站流量是要花钱的，R2 不收。对个人博客和小项目来说，这个差异很大

需要绑信用卡才能开通 R2，但免费层内不会扣费

## Cloudflare Tunnel

Tunnel 让你把内网服务（比如你 VPS 上只监听 127.0.0.1 的 Vaultwarden）安全地暴露到公网

工作方式：

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

好处：

- VPS 不需要开放 80/443 端口
- 不需要自己申请 SSL 证书
- 可以配合 Cloudflare Access 加一层身份认证
- 源站 IP 不暴露

我的 Vaultwarden、ntfy、Gatus、1Panel 面板都走 Tunnel

免费层没有 Tunnel 数量限制。你可以一条 Tunnel 跑多个子域名

安装方式是在 VPS 上跑一个 `cloudflared` 守护进程，它会主动连出去，不需要入站规则

## Cloudflare DNS

把域名的 NS 改到 Cloudflare，就能用它的免费 DNS 托管

好处：

- 全球 Anycast，解析速度快
- 免费 DNSSEC
- 配合 Proxy 模式隐藏源站 IP
- 管理界面很清楚

如果你的域名在其他注册商买的（比如 Namesilo、Porkbun、SpaceShip、国内的各种云），可以把 NS 改到 Cloudflare 来管

如果你用的是免费域名（比如 DNSHE 的 cc.cd），要看那个域名服务是否允许改 NS。有些允许，有些只能在原平台加记录

## Cloudflare Email Routing

Email Routing 可以让你用自定义域名收邮件，然后转发到你的真实邮箱

比如：

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

免费，不需要自己搭邮件服务器

适合：

- 给博客留一个联系邮箱，不暴露真实地址
- 注册各种服务时用自定义域名邮箱
- 学习邮件相关的 DNS 记录（MX、SPF、DKIM）

注意：这只是收件转发。如果你想用自定义域名发件，需要额外配置（比如用 Gmail SMTP + 别名，或者用 Resend、Mailgun、Zoho mail 这类服务）

## Cloudflare Web Analytics

不需要安装任何 JS 脚本，Cloudflare 就能给你看网站的基础流量数据

在 Dashboard 里的 Web Analytics 就能开启

它比 Google Analytics 轻很多：

- 不追踪用户
- 不放 Cookie
- 不需要额外加载 JS
- 隐私友好

对个人博客来说，看看每天有没有人来、从哪里来、看了哪些页面，这个就够了

如果你想要更详细的分析（比如事件追踪、漏斗、自定义维度），可以以后再看 Umami 或 Plausible。但起步阶段，Cloudflare 自带的就够

## Cloudflare Access（Zero Trust 免费层）

Access 可以给你的任何 Web 服务加一层登录保护

比如你有一个管理面板跑在 `panel.example.com`，不想任何人都能访问。Access 可以在访问时弹出一个登录页面，只有通过验证的人才能进

免费层支持最多 50 个用户

验证方式可以是：

- 邮箱一次性验证码
- GitHub 登录
- Google 登录

我的 1Panel 面板就用了 Access 保护。即使面板本身有密码，多一层入口认证总是好的

## 还有什么免费的

其他免费但我用得少的：

- **D1**：SQLite 数据库，跑在 Workers 旁边。免费层 5GB
- **KV**：键值存储。免费层有日读写限制但对小项目够
- **Queues**：消息队列
- **Images**：图片变换（这个免费层很有限）
- **Stream**：视频托管（免费层基本不够用）
- **Zaraz**：第三方脚本管理

不用全记住。知道 Cloudflare 免费层很大方就行，以后有需要时回来查

## 什么时候不该用 Cloudflare

- 需要长时间运行的后台任务 → 用 VPS
- 需要持久数据库和复杂查询 → 用 VPS 或托管数据库
- 需要 WebSocket 长连接 → Workers 有限制
- 需要大文件处理 → Workers 内存和 CPU 有限
- 中国大陆访问速度敏感 → Cloudflare 免费层在国内不一定快

总的原则：能放 Cloudflare 的放 Cloudflare，必须持久运行的放 VPS。两者不是替代关系，是互补

## 我的用法总结

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

2C2G 的学生服务器只负责跑必须持久运行的东西。其他能卸载到 Cloudflare 的，就不用服务器扛

## 延伸阅读

awesome-cloudflare：[https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

这个仓库整理了 Cloudflare 生态里各种工具和用法，14k+ star。如果你想知道「别人拿 Cloudflare 做了什么」，从这里开始


