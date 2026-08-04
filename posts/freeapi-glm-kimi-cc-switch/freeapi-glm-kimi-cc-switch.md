---
title: "免费 AI API 入口：白嫖 BaiPiao、innilove 和几个导航站"
published: 2026-06-25
created: 2026-06-25
updated: 2026-08-04
lastEdited: 2026-08-04
updateCount: 9
description: "整理几个还能找到免费 AI API 的入口，以及适合查公益站和免费额度的导航"
image: ""
tags:
  - AI API
  - Claude Code
  - 免费资源
category: AI 与工作流
draft: false
aiSummary:
  generatedAt: "2026-08-04"
  model: "codex-local"
  items:
    - "收集白嫖 BaiPiao、innilove 等免费 AI API 入口"
    - "补充查找公益站和免费额度的导航"
    - "免费入口变化快，调用前先看额度和稳定性"
alias: ""

---

现在先放这几个

- 白嫖 BaiPiao 免费资源大全：[https://baipiao.org/free/](https://baipiao.org/free/)
- innilove New API：[https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)
- Yangmao AI：[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)
- 俏亮拆除公益 API 导航：[https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)
- HCNSEC API 导航：[https://link.hcnsec.cn/](https://link.hcnsec.cn/)

如果你想继续找同类入口，可以直接打开[资源导航的 AI 分类](https://nav.sayori.org/#cat-ai)，这里会把文章里提到的入口和其他常用 AI 工具放在一起，站点状态仍以目标站为准

> [!NOTE]
> 本文按 2026-08-04 看到的页面整理，免费额度、模型、限速和站点状态都会变，真要用之前以官网和后台显示为准

如果你没看过站内的这个帖子，也可以去看看喵[[anyrouter-sharedchat-cc-switch-student-guide|Anyrouter和sharedchat还有AgentRouter测评与使用]]
## 先分清楚

innilove 是可以直接拿来试的 API 入口

BaiPiao、Yangmao、俏亮拆除、HCNSEC 更像导航站，用来找新的公益站、免费额度和中转入口

导航页不是 Base URL，也不是 API Key 页面，别把它们直接填进 cc-switch

## 白嫖 BaiPiao

入口：

[https://baipiao.org/free/](https://baipiao.org/free/)

这是一个免费资源大全，不是单一 API 服务。首页按免费 API / 模型、VPS、域名等方向分类，API 分类在[白嫖 API / 模型](https://baipiao.org/free/api/)

页面会标最后验证时间，并用社区投票核实有效性，失效条目会沉底

它适合找入口，不适合直接当 Base URL 或 API Key 页面。点进具体资源后，仍要回到原站确认注册条件、接口地址、模型名和额度

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

## Yangmao AI

入口：

[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)

这个不是中转站

它更像一个 AI 工具和免费额度情报站，页面会整理模型平台、API 价格、免费额度和地区限制，也有一个可以直接问的入口

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

公开列表里能看到多家模型平台和 API 入口，也会混着一些需要实名、需要手机号或带邀请条件的服务

这里适合拿来扫一遍新站，但别看到“免费”两个字就直接丢自己的主账号和代码进去

## 怎么选

想马上配到 cc-switch，先进入 BaiPiao 的 API / 模型分类，或者进 innilove 后自己生成 Key

想找更多入口，先看 Yangmao，再翻俏亮拆除和 HCNSEC

导航页里找到的新站，先确认四件事

1. 注册条件
2. 是否要实名或手机号
3. Key 页面和接口文档在哪
4. 免费额度、模型倍率和限速怎么写

都确认以后，再拿一个很轻的请求测试，不要一上来就跑长 Agent

## 配到 cc-switch

白嫖 BaiPiao 不能直接填进 cc-switch，它是资源目录。先点进具体条目，按条目给出的 Base URL、API Key 和模型名配置

innilove 可以这样填

```text
供应商名称: innilove New API
API Key: 你在控制台生成的 Key
Base URL: https://api.innilove.xyz/v1
接口格式: OpenAI 兼容
```

保存后先发一句请求

```text
用三句话说明你当前使用的模型
```

能正常返回，再继续跑代码任务

如果报错，先查 Base URL、模型名、Key 是否完整，再看额度有没有用完

## 安全提醒

免费 API 和公益中转都不适合放密钥、账号、未公开代码、私人聊天记录

也别把它们接到公开服务、群机器人或长期运行的 Agent 上

这类入口今天能用，不代表明天还在

把它们当备用和测试入口就好，别把整个工作流压上去
