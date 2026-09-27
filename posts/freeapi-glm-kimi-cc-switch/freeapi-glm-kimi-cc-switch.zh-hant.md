---
title: "免費 AI API 入口：商湯、innilove 和幾個導航站"
published: 2026-06-25
created: 2026-06-25
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 8
description: "整理幾個還能找到免費 AI API 的入口，以及適合查公益站和免費額度的導航"
image: ""
tags:
  - 資源整合
  - AI API
  - Claude Code
  - 免費資源
category: AI 與工作流
section: deals
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "收集商湯、innilove 等免費 AI API 入口"
    - "補充查找公益站和免費額度的導航"
    - "免費入口變化快，調用前先看額度和穩定性"
alias: ""

lang: zh-Hant
translationKey: posts/freeapi-glm-kimi-cc-switch/freeapi-glm-kimi-cc-switch
---

現在先放這幾個

- 商湯 SenseNova Token Plan：[https://www.sensenova.cn/token-plan](https://www.sensenova.cn/token-plan)
- innilove New API：[https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)
- Yangmao AI：[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)
- 俏亮拆除公益 API 導航：[https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)
- HCNSEC API 導航：[https://link.hcnsec.cn/](https://link.hcnsec.cn/)

參考的 Linux.do 帖子：[商湯 Token Plan 免費計劃延長到 7 月底](https://linux.do/t/topic/2514855)

> [!NOTE]
> 本文按 2026-07-10 看到的頁面整理，免費額度、模型、限速和站點狀態都會變，真要用之前以官網和後臺顯示爲準

如果你沒看過站內的這個帖子，也可以去看看喵[[anyrouter-sharedchat-cc-switch-student-guide|Anyrouter和sharedchat还有AgentRouter测评与使用]]
## 先分清楚

商湯和 innilove 是可以直接拿來試的 API 入口

Yangmao、俏亮拆除、HCNSEC 更像導航站，用來找新的公益站、免費額度和中轉入口

導航頁不是 Base URL，也不是 API Key 頁面，別把它們直接填進 cc-switch

## 商湯 SenseNova

這個目前最適合拿來當備用

入口頁面：

[https://www.sensenova.cn/token-plan](https://www.sensenova.cn/token-plan)

Key 管理：

[https://platform.sensenova.cn/console/keys](https://platform.sensenova.cn/console/keys)

當前頁面寫的是 Free 公測，最多 20 個 API Key，每個模型每 5 小時最多 1500 次調用，特殊模型除外

Linux.do 帖子裏整理過這些模型

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

配 cc-switch 時，填 Base URL 就行，別把完整的 `/chat/completions` 也塞進去

## innilove New API

入口：

[https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)

這是 New API 面板，註冊後登錄，在 Key 頁面創建令牌

當前記錄裏支持 163 等常見郵箱，也能簽到拿額度，模型主要看後臺列表，之前能看到 DeepSeek、MiniMax 這類模型

如果後臺還是標準的 OpenAI 兼容配置，可以先試：

```text
供应商名称: innilove New API
API Key: 页面里创建的 Key
Base URL: https://api.innilove.xyz/v1
接口格式: OpenAI 兼容
```

模型名、倍率和額度不要照抄舊文章，登錄後看當前頁面

## Yangmao AI

入口：

[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)

這個不是中轉站

它更像一個 AI 工具和免費額度情報站，頁面會整理模型平臺、API 價格、免費額度和地區限制，也有一個可以直接問的入口

想找新 API 時，可以先在這裏搜平臺名字，再點回官方頁面確認

## 俏亮拆除公益 API 導航

入口：

[https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)

頁面標題就是“公益 API 導航”，收錄公益、免費和付費 API 服務

我這次看到的首頁更像一個聚合入口，具體有哪些站、現在還能不能註冊，要進頁面自己看

這種導航站的優點是省得自己到處翻羣和帖子，缺點也明顯，站點狀態變化很快，入口能打開不代表 API 一定能用

## HCNSEC API 導航

入口：

[https://link.hcnsec.cn/](https://link.hcnsec.cn/)

它的定位更直接，頁面寫的是“白嫖大模型 api 中轉站導航網”，裏面分了大廠、普通中轉站和公益 API

公開列表裏能看到 SenseNova、ModelScope、OpenRouter 等入口，也會混着一些需要實名、需要手機號或帶邀請條件的服務

這裏適合拿來掃一遍新站，但別看到“免費”兩個字就直接丟自己的主賬號和代碼進去

## 怎麼選

想馬上配到 cc-switch，先試商湯，或者進 innilove 後自己生成 Key

想找更多入口，先看 Yangmao，再翻俏亮拆除和 HCNSEC

導航頁裏找到的新站，先確認四件事

1. 註冊條件
2. 是否要實名或手機號
3. Key 頁面和接口文檔在哪
4. 免費額度、模型倍率和限速怎麼寫

都確認以後，再拿一個很輕的請求測試，不要一上來就跑長 Agent

## 配到 cc-switch

商湯可以這樣填

```text
供应商名称: SenseNova Token Plan
API Key: 你在控制台生成的 Key
Base URL: https://token.sensenova.cn/v1
接口格式: OpenAI 兼容
```

模型映射可以先這樣

```text
Opus -> deepseek-v4-flash
Sonnet -> glm-5.2
Haiku -> sensenova-6.7-flash-lite
```

保存後先發一句請求

```text
用三句话说明你当前使用的模型
```

能正常返回，再繼續跑代碼任務

如果報錯，先查 Base URL、模型名、Key 是否完整，再看額度有沒有用完

## 安全提醒

免費 API 和公益中轉都不適合放密鑰、賬號、未公開代碼、私人聊天記錄

也別把它們接到公開服務、羣機器人或長期運行的 Agent 上

這類入口今天能用，不代表明天還在

把它們當備用和測試入口就好，別把整個工作流壓上去
