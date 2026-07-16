---
title: 给刚搭好的博客配一个免费域名，再去站长社区露个脸
published: 2026-06-22
created: 2026-06-22
updated: 2026-06-27
lastEdited: 2026-07-01
updateCount: 6
description: 从 DNSHE 免费二级域名、Cloudflare DNS 到评论系统、开往、萌备、十年之约，给刚搭好的博客补上域名、互动和一点被看见的机会。
image: ""
tags:
  - 域名
  - Cloudflare
  - 独立博客
category: 建站与自托管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "给博客补上 DNSHE 免费二级域名和 Cloudflare DNS"
    - "接入评论系统，让读者能留下反馈"
    - "从开往、萌备和十年之约认识个人站社区"
alias: ""

---

上一篇写了怎么从 GitHub、Cloudflare Pages、Mizuki 和 Obsidian 搭一个自己的博客

搭完以后，默认地址大概长这样：

```text
https://你的项目名.pages.dev
```

能用，但总感觉还差一点

博客有了，下一步很自然就是给它配一个像样的域名，然后去一些站长社区露个脸。不是为了立刻有多少流量，而是让这个网站从「我电脑里一个项目」变成「互联网上一个有名字的小地方」

## 免费域名先够用

如果暂时不想买域名，可以先用免费二级域名练手

我现在比较推荐看 DNSHE 这类服务：

[https://my.dnshe.com/](https://my.dnshe.com/)

![[Pasted image 20260623151351.png]]

我目前会优先看 `cc.cd` 这类能接入 Cloudflare 的后缀

![[Pasted image 20260622231201.png]]

免费域名适合做这几件事：

- 给 Cloudflare Pages 博客绑一个自定义域名
- 学 DNS 解析
- 学 Cloudflare 托管
- 给后面的自托管服务准备子域名

它不适合做这些事：

- 长期商业项目
- 重要邮箱主域名
- 不能丢的品牌入口
- 你完全不愿意承担规则变动风险的项目

## DNSHE 助力码

DNSHE 有助力机制，可以互相助力获得更长期的二级域名

我先把几个助力码放这里，后面如果有新的再补：

```text
VJC8UQYTPK
GHGMEUGWXA
VVN9QFPEUL
UUJ22RXYDC
G4HPCNW7R4
```

如果你只是临时试博客，不一定要追求永久，先拿一个能解析的域名，把流程跑通更重要

## 接到 Cloudflare

拿到域名后，下一步是接 Cloudflare

最常见的流程是：

1. 在 Cloudflare 里添加站点
2. 按提示把域名的 NS 改到 Cloudflare
3. 等 DNS 生效
4. 到 Cloudflare Pages 项目里添加自定义域名
5. 按 Pages 给出的提示补 CNAME 或者让 Cloudflare 自动配置

如果你用的是免费二级域名，要先确认它支不支持改 NS。不能改 NS 的话，就只能在原平台添加解析记录，或者换一个更适合接 Cloudflare 的后缀

这里不要急，DNS 生效有时会等一会儿。先确保根域名和 `www` / 子域名到底要指向哪里，别一边改一边忘了自己刚刚填过什么

## 给自托管服务留子域名

后面如果你有 2C2G 学生服务器，可以提前规划子域名：

```text
vault.example.cc.cd  -> Vaultwarden
notes.example.cc.cd  -> Fast Note Sync
ntfy.example.cc.cd   -> ntfy
status.example.cc.cd -> Gatus
```

不要所有服务都塞在根域名下面。

域名像门牌号。门牌号清楚，后面搬家、迁移、反代、关服务都舒服一点。

服务器服务可以看这篇总表：

[[2c2g-server-service-index|2C2G 学生服务器能跑什么：先别把小机器塞爆]]

## 免费域名和正式域名怎么选

我会这样分：

免费域名适合：

- 刚搭博客
- 学 DNS
- 做教程
- 试 Cloudflare Pages
- 试自托管服务

正式域名适合：

- 长期维护的博客
- 要做正式邮箱
- 要把地址印在头像、名片、视频简介里

不是说免费域名低人一等。只是长期项目最怕「以后迁移很烦」

如果你已经确定这个博客要写很久，那买一个自己喜欢的域名很值得，个人项目允许一点任性，名字喜欢就会更想维护

# 接触站长社区

域名配好后，可以去一些站长社区看看

不是去硬打广告，而是让自己进入一个还有人在写博客的环境里。独立博客最怕写着写着变成单机日记，偶尔看看别人怎么写、怎么装修、怎么互链，会有动力很多

## 开往 Travellings

开往是一个友链接力项目：

[https://www.travellings.cn/](https://www.travellings.cn/)

它的玩法很可爱。你在网站上放一个「开往」入口，访客点击后会随机跳到另一个加入项目的独立站点

加入说明：

[https://www.travellings.cn/docs/join.html](https://www.travellings.cn/docs/join.html)

适合已经有一些内容的博客

不要刚建完首页空空的就去申请。先写几篇文章，让别人点进来真的有东西看

## 萌备

萌备是萌国 ICP 备案：

[https://icp.gov.moe/](https://icp.gov.moe/)

申请页：

[https://icp.gov.moe/join.php](https://icp.gov.moe/join.php)

这个不是工信部备案，别误会。它更像二次元/个人站之间的一种趣味标识和社区入口

官网申请页对内容有要求，比如非商业、非灰色、内容不是空壳、启用 HTTPS、能长期访问

如果你的站点风格合适，可以申请一个萌备号放在页脚。它没有什么实用刚需，但很有独立站味道

## 十年之约

十年之约：

[https://www.foreverblog.cn/](https://www.foreverblog.cn/)

它的核心是一个约定：从加入开始，博客十年不关闭或者更久，保持更新和活力

听起来有点中二，但我挺喜欢这个说法

不过这个需要一年的运行时间才能申请，所以还是先等待着吧，当然如果你的站点有一年的时间，那也确实可以去尝试申请看看了哈哈

## 揪蝉

揪蝉：

[https://hi.jiuchan.org/docs](https://hi.jiuchan.org/docs)

它是一个个人网站收录和随机访问平台，玩法上有点像把独立站放进一个「随机发现」入口里

如果你的博客已经有几篇能看的文章，也可以去看看它的收录文档。对新站来说，这类平台的意义不是立刻带来多少访问量，而是让别人有机会从一个站跳到另一个站，慢慢发现你

# BlogFinder

[BlogFinder - 发现优秀的个人博客](https://bf.zzxworld.com/)

## 中文独立博客列表

GitHub：[https://github.com/timqian/chinese-independent-blogs](https://github.com/timqian/chinese-independent-blogs)

这个仓库收集中文独立博客。它更像一个长期维护的博客索引，包含博客地址、RSS、简介、标签

适合谁：

- 有稳定博客
- 有 RSS
- 内容主要是自己写的
- 愿意被公开索引

现在很多人已经不主动订阅博客了，信息都被平台拿去排队分发。中文独立博客列表至少保留了一种老但好用的方式：我喜欢谁，就订阅谁

如果要提交自己的站，先把这些补好：

```text
站名
站点 URL
RSS URL
一句话介绍
主题标签
```


# 其他免费域名途径

DNSHE 不是唯一的选择。这里再记几个我看到过的：

[ 可托管CF现有开放可注册免费域名集合](https://www.nodeloc.com/t/topic/70964?u=amiya_desi)

nodeloc的一个小宝藏贴，里面汇聚了挺多的

### GitHub Pages 自带域名

如果你暂时不想折腾任何域名服务，GitHub Pages 本身就给你一个：

```text
你的用户名.github.io
```

Cloudflare Pages 也给：

```text
你的项目名.pages.dev
```

这两个严格来说不是「你的域名」，但足够用来写博客和展示项目。等想好了再买正式域名也不迟。

## 给博客加评论系统

上一篇说了要讲评论系统，这里补上

博客没有评论区也能活，但如果你写的是教程、经验、踩坑记录，偶尔能收到一条「这个帮到我了」或者「第三步我遇到了不一样的问题」，也能够促进交流和你的学习，以及留下评论区的话就可以更方便的收到反馈了，相比于邮箱联系之类的

评论系统我目前看到比较适合个人静态博客的有这几个：

### Twikoo

[https://twikoo.js.org/](https://twikoo.js.org/)

GitHub：[https://github.com/twikoojs/twikoo](https://github.com/twikoojs/twikoo)

Twikoo 是中文独立博客圈用得比较多的评论系统。支持匿名评论、邮件通知、表情、管理后台

部署方式很多：Vercel、Netlify、云函数、自建 Docker。对学生来说，Vercel 免费部署是最省事的路线

优点：

- 中文生态，文档友好
- 部署成本可以做到零
- 管理后台能审核、删除、回复
- 支持邮件和微信通知

缺点：

- 你要选一个数据库后端（MongoDB Atlas 免费版、或者 Vercel KV、或者自建）
- 如果用第三方免费数据库，数据不完全在自己手里

### Giscus

[https://giscus.app/](https://giscus.app/)

GitHub：[https://github.com/giscus/giscus](https://github.com/giscus/giscus)

Giscus 用 GitHub Discussions 作为评论后端。访客用 GitHub 账号登录后才能评论

优点：

- 数据存在你自己的 GitHub 仓库里
- 不需要额外部署
- 适合技术博客，读者大概率有 GitHub 账号
- Markdown 格式、代码高亮天然支持

缺点：

- 必须 GitHub 登录
- 非技术读者可能不愿意为了留言注册 GitHub
- 评论和你的仓库绑死，换仓库要迁移

### Artalk

[https://artalk.js.org/](https://artalk.js.org/)

GitHub：[https://github.com/ArtalkJS/Artalk](https://github.com/ArtalkJS/Artalk)

Artalk 是自建评论系统，需要跑一个后端服务。如果你已经有 2C2G 服务器，可以用 Docker 跑

优点：

- 数据完全自己控制
- 支持多站点管理
- 功能比较全：邮件通知、Telegram 通知、验证码、管理后台

缺点：

- 你得有服务器
- 多一个要维护、备份、更新的服务
- 2C2G 上再多跑一个服务，要留意内存

### 我会怎么选

如果你刚搭好博客，没有服务器，我推荐先试 Giscus 或 Twikoo（Vercel 部署）

如果你已经有服务器，而且读者不全是程序员，可以看看 Artalk

如果你暂时不想折腾评论，也完全没问题。先把文章写好，等有读者了再加也来得及。评论系统不是博客的核心，内容才是

## 还有哪些地方可以放链接

- 友链页：找同主题博主互换链接
- GitHub Profile：把博客放在个人主页
- B 站 / YouTube / 小红书简介：教程视频配文章链接
- Linux DO / V2EX 等论坛签名：按社区规则来，不要刷屏
- 开源项目 README：如果项目和博客相关，可以放文档链接

给你的网站开拓更多入口，也就会有更多人来访问了

## 博客数据：知道有没有人来过

加完域名和社区入口以后，你可能会开始想知道：到底有没有人看我的博客？

几个轻量替代：

- **Umami**：[https://umami.is/](https://umami.is/)，可以自建，也可以用官方免费版。界面干净，数据自己控制。
- **Cloudflare Web Analytics**：如果你已经在用 Cloudflare，它自带的 Web Analytics 免费而且不需要额外代码，直接在 Dashboard 里看就行
- **Plausible**：[https://plausible.io/](https://plausible.io/)，付费为主但可以自建。
- **不装任何分析**：也行。个人博客不是商业网站，不看数据也能活

我现在的建议是先用 Cloudflare Web Analytics（因为你大概率已经接了 Cloudflare），等哪天觉得不够用了再考虑 Umami

不要每天盯着数字看。写东西比看数据有用

## 最后

刚搭好的博客先别急着追求完美

免费域名能用就先用，Cloudflare 能解析就先跑，社区能加入就慢慢申请，评论系统以后再加也不迟

真正重要的是继续写

域名、备案号、友链、开往按钮、评论框，这些都是让博客更像一个「站」的小装饰。文章才是它站得住的原因
