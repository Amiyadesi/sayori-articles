---
title: "免费 AI API 入口：innilove 和几个导航站"
published: 2026-06-25
created: 2026-06-25
updated: 2026-07-29
lastEdited: 2026-07-29
updateCount: 8
description: "整理几个还能找到免费 AI API 的入口，以及适合查公益站和免费额度的导航"
image: ""
tags:
  - AI API
  - Claude Code
  - 免费资源
category: AI 与工作流
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "收集 innilove 和可查询免费额度的导航站"
    - "补充查找公益站和免费额度的导航"
    - "免费入口变化快，调用前先看额度和稳定性"
alias: ""

---

现在先放这几个

- innilove New API：[https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)
- 白嫖免费资源大全：[https://baipiao.org/free/](https://baipiao.org/free/)
- Yangmao AI：[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)
- 俏亮拆除公益 API 导航：[https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)
- HCNSEC API 导航：[https://link.hcnsec.cn/](https://link.hcnsec.cn/)

> [!NOTE]
> 本文按 2026-07-29 看到的页面整理，免费额度、模型、限速和站点状态都会变，真要用之前以官网和后台显示为准

如果你没看过站内的这个帖子，也可以去看看喵[[anyrouter-sharedchat-cc-switch-student-guide|Anyrouter和sharedchat还有AgentRouter测评与使用]]
## 先分清楚

innilove 是可以直接拿来试的 API 入口

白嫖、Yangmao、俏亮拆除、HCNSEC 更像导航站，用来找新的 API、免费额度和服务入口

导航页不是 Base URL，也不是 API Key 页面，别把它们直接填进 cc-switch

## innilove New API

入口：

[https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)

这是 New API 面板，注册后登录，在 Key 页面创建令牌

当前记录里支持 163 等常见邮箱，也能签到拿额度，模型主要看后台列表，之前能看到 DeepSeek、MiniMax 这类模型

如果后台还是标准的 OpenAI 兼容配置，可以先试：

```text
供应商名称: innilove New API
API Key: 页面里创建的 Key
Base URL: https://api.innilove.xyz/v1
接口格式: OpenAI 兼容
```

模型名、倍率和额度不要照抄旧文章，登录后看当前页面

## 白嫖免费资源大全

入口：

[https://baipiao.org/free/](https://baipiao.org/free/)

这个页面按免费 API 与模型、服务器、域名等类别整理资源，条目会标注最后验证时间并由社区反馈有效性

这里只把它当作找免费 API 和模型入口的线索。它收录的内容不全是 API，具体服务仍要回到官网确认

## Yangmao AI

入口：

[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)

它更像一个 AI 工具和免费额度情报站，页面会整理模型平台、API 价格、免费额度、Token 成本和地区限制，也有一个可以直接问的入口

想找新 API 时，可以先在这里搜平台名字，再点回官方页面确认

## 俏亮拆除公益 API 导航

入口：

[https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)

页面标题就是“公益 API 导航”，收录公益、免费和付费 API 服务

我这次看到的首页更像一个聚合入口，具体有哪些站、现在还能不能注册，要进页面自己看

这种导航站的优点是省得自己到处翻群和帖子，缺点也明显，站点状态变化很快，入口能打开不代表 API 一定能用

## HCNSEC API 导航

入口：

[https://link.hcnsec.cn/](https://link.hcnsec.cn/)

它的定位更直接，页面写的是“白嫖大模型 api 中转站导航网”，里面分了大厂、普通中转站和公益 API

公开列表里能看到多个模型平台和服务入口，也会混着一些需要实名、需要手机号或带邀请条件的服务

这里适合拿来扫一遍新站，但别看到“免费”两个字就直接丢自己的主账号和代码进去

## 怎么选

想马上配到 cc-switch，先进 innilove 后自己生成 Key

想找更多入口，先看 Yangmao 和白嫖，再翻俏亮拆除和 HCNSEC

导航页里找到的新站，先确认四件事

1. 注册条件
2. 是否要实名或手机号
3. Key 页面和接口文档在哪
4. 免费额度、模型倍率和限速怎么写

都确认以后，再拿一个很轻的请求测试，不要一上来就跑长 Agent

## 安全提醒

免费 API 和第三方聚合站都不适合放密钥、账号、未公开代码、私人聊天记录

也别把它们接到公开服务、群机器人或长期运行的 Agent 上

这类入口今天能用，不代表明天还在

把它们当备用和测试入口就好，别把整个工作流压上去
