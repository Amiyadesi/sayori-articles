---
title: Disroot：一个很像互联网老理想的开源服务集合
published: 2026-06-27
created: 2026-06-27
updated: 2026-07-22
lastEdited: 2026-07-22
updateCount: 3
description: 记录 Disroot 的邮箱、云盘、XMPP 与协作工具，也借它重新整理 sayori.org 适合长期维护的公共服务
image: ""
tags:
  - 开源服务
  - 隐私
  - Fediverse
  - 资源整合
category: 工具与资源
draft: false
aiSummary:
  generatedAt: "2026-07-19"
  model: "codex-local"
  items:
    - "认识带有公益和开源气质的 Disroot"
    - "邮箱、云盘、XMPP 和协作工具是主要入口"
    - "从服务边界出发重新整理 sayori.org 的公共入口"
alias: ""

---

> [!NOTE]
> 这篇是 2026 年 6 月 27 日的记录，Disroot 的注册问题、服务配额和可用功能可能会变，申请前还是看一眼官网

今天还发现了一个很有趣的开源组织：[Disroot](https://disroot.org/)

这个组织把一堆开放互联网工具凑到一起，然后认真维护成一个可以日常使用的平台

官网对自己的描述很明确：自由、隐私、联邦、去中心化

没有广告，没有追踪，没有画像，没有数据挖掘，纯粹的公益呢，也无愧.org之名

## 它有些什么

服务列表在这里：

[https://disroot.org/en/services](https://disroot.org/en/services)

目前有这些：

- Email，可以用网页邮箱，也可以接 IMAP 客户端
- Cloud，基于 Nextcloud，用来同步文件、日历和联系人
- XMPP Chat，一个去中心化聊天协议
- Pads，在线协作文档
- PrivateBin，加密 pastebin
- Upload，临时文件分享
- Forgejo，代码托管
- CryptPad，偏隐私的在线文档套件
- FEDIsroot，地址是 [fe.disroot.org](https://fe.disroot.org/)，基于 Akkoma 的 ActivityPub / Fediverse 小微博服务，兼容 Mastodon API
- LibreTranslate，翻译服务
- Vault，密码管理相关服务

不一定每个都要用

但它有趣的地方就在这里：你注册一个账号，就可以享受这么多的开源服务

这对我这种喜欢折腾个人网站、服务器和开源服务的人来说，真的很有吸引力，也是可以借鉴的前辈呢

## 注册问题有些奇特

注册入口在这里：

[https://user.disroot.org/pwm/public/newuser/](https://user.disroot.org/pwm/public/newuser/)

我这次看到的注册问题是：睡前喜欢做什么事

而且需要写超过 50 个词

这个问题还挺妙的

你可以先用中文或者其他语言认真写一段，再翻译成英文

比如可以写自己睡前会看书、整理明天要做的事、听音乐、刷一点开源社区动态，或者只是把手机放远一点让自己早点睡之类的

## 我会怎么用它

目前我注册了一个这个账号，不过使用的话对我来说目前也就一个邮箱比较有趣了，毕竟注册了这么多的账号和社区，积攒的独特的域名邮箱应该也有一堆了，还有自己的自建临时邮箱和域名邮箱

虽然这个有vaultwarden的公益服务，不过我都有自建的vaultwarden了，倒也不需要这种

而且Disroot 不是大厂免费套餐，它靠社区和捐赠活着，需要的时候能够用上，就很好了

## 它也让我重新看了一遍自己的服务

看完 Disroot 和 [[radical-servers-public-services|Riseup]] 收集的服务列表，我第一反应也是继续往 sayori.org 上加东西，想要不辜负.org之名

不过毕竟个人能力有限，结合询问过gpt后，帮我做了一个公开服务列表，就在这里<https://sayori.org/zh/services/>

现在真正对外开放的主要是 GeoScore、博客文章、RSS 、白板和留言反馈。Search Gateway 继续开源，但线上实例只给自己的站点和维护任务使用

相比继续堆新服务，我更想先试几个范围很小的方向：给个人博客做网站体检、帮助非商业静态站上线、提供少量搜索证据额度，以及低频的 RSS 到邮件或 Webhook 通知

这些都不会一开始就做成匿名公共平台，而是先邀请、限额、人工处理。需求不存在就停，维护成本超过能力也停

我现在更愿意把 sayori.org 称为个人维护、非商业、尽力而为的公共数字服务，而不是公益组织，因为我也没有这个精力就是了


