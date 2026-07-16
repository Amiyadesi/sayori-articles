---
title: "免费 AI API 入口：商汤、innilove 和几个导航站"
published: 2026-06-25
created: 2026-06-25
updated: 2026-07-12
lastEdited: 2026-07-12
updateCount: 6
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
    - "收集商汤、innilove 等免费 AI API 入口"
    - "补充查找公益站和免费额度的导航"
    - "免费入口变化快，调用前先看额度和稳定性"
alias: ""

---

现在先放这几个

- 商汤 SenseNova Token Plan：[https://www.sensenova.cn/token-plan](https://www.sensenova.cn/token-plan)
- innilove New API：[https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)
- Yangmao AI：[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)
- 俏亮拆除公益 API 导航：[https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)
- HCNSEC API 导航：[https://link.hcnsec.cn/](https://link.hcnsec.cn/)

参考的 Linux.do 帖子：[商汤 Token Plan 免费计划延长到 7 月底](https://linux.do/t/topic/2514855)

> [!NOTE]
> 本文按 2026-07-10 看到的页面整理，免费额度、模型、限速和站点状态都会变，真要用之前以官网和后台显示为准

如果你没看过站内的这个帖子，也可以去看看喵[[anyrouter-sharedchat-cc-switch-student-guide|Anyrouter和sharedchat还有AgentRouter测评与使用]]
## 先分清楚

商汤和 innilove 是可以直接拿来试的 API 入口

Yangmao、俏亮拆除、HCNSEC 更像导航站，用来找新的公益站、免费额度和中转入口

导航页不是 Base URL，也不是 API Key 页面，别把它们直接填进 cc-switch

## 商汤 SenseNova

这个目前最适合拿来当备用

入口页面：

[https://www.sensenova.cn/token-plan](https://www.sensenova.cn/token-plan)

Key 管理：

[https://platform.sensenova.cn/console/keys](https://platform.sensenova.cn/console/keys)

当前页面写的是 Free 公测，最多 20 个 API Key，每个模型每 5 小时最多 1500 次调用，特殊模型除外

Linux.do 帖子里整理过这些模型

```text
sensenova-6.7-flash-lite: 每 5 小时 1500 次
sensenova-u1-fast: 每 5 小时 1500 次
deepseek-v4-flash: 每 5 小时 500 次
glm-5.2: 每 5 小时 500 次
```

接口是 OpenAI 兼容格式

```text
Base URL: https://token.sensenova.cn/v1
Chat Completions: https://token.sensenova.cn/v1/chat/completions
模型: deepseek-v4-flash / glm-5.2 / sensenova-6.7-flash-lite / sensenova-u1-fast
```

配 cc-switch 时，填 Base URL 就行，别把完整的 `/chat/completions` 也塞进去

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

它适合找线索，不适合拿来填 Base URL

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

公开列表里能看到 SenseNova、ModelScope、OpenRouter 等入口，也会混着一些需要实名、需要手机号或带邀请条件的服务

这里适合拿来扫一遍新站，但别看到“免费”两个字就直接丢自己的主账号和代码进去

## 怎么选

想马上配到 cc-switch，先试商汤，或者进 innilove 后自己生成 Key

想找更多入口，先看 Yangmao，再翻俏亮拆除和 HCNSEC

导航页里找到的新站，先确认四件事

1. 注册条件
2. 是否要实名或手机号
3. Key 页面和接口文档在哪
4. 免费额度、模型倍率和限速怎么写

都确认以后，再拿一个很轻的请求测试，不要一上来就跑长 Agent

## 配到 cc-switch

商汤可以这样填

```text
供应商名称: SenseNova Token Plan
API Key: 你在控制台生成的 Key
Base URL: https://token.sensenova.cn/v1
接口格式: OpenAI 兼容
```

模型映射可以先这样

```text
Opus -> deepseek-v4-flash
Sonnet -> glm-5.2
Haiku -> sensenova-6.7-flash-lite
```

保存后先发一句很轻的请求

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
