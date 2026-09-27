---
title: "大學生怎麼用 AnyRouter、SharedChat 和 cc-switch 管理 AI 額度"
published: 2026-06-18
created: 2026-06-18
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 10
description: "給大學生看的 AnyRouter 註冊、SharedChat GPT 額度領取和 cc-switch 配置記錄，配合我已經發到 B 站的視頻看。"
image: ""
tags:
  - 教程
  - Claude Code
  - AI 額度
  - 學生資源
category: AI 與工作流
section: deals
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "梳理 AnyRouter 和 SharedChat 的學生額度入口"
    - "用 cc-switch 集中切換 Claude Code 等工具配置"
    - "配合視頻把註冊、領額度和配置過程走一遍"
alias: ""

lang: zh-Hant
translationKey: posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide
---

這篇是給視頻補一個文字版

視頻在這裏：[BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## 這幾個東西分別是什麼

AnyRouter 是一個 AI API / Claude Code 相關的路由服務。簡單說，它給你一個可用的 API 入口和 Key，然後你把這個 Key 填到支持 Claude Code / Anthropic 接口的工具裏

SharedChat 是另一個偏 GPT / Codex 公益額度的入口。你可以理解成一個額外的 Codex 額度來源

cc-switch 是桌面端配置管理工具，GitHub 倉庫是 [farion1231/cc-switch](https://github.com/farion1231/cc-switch)。它的作用是幫你切換 Claude Code、Codex、Gemini CLI 之類工具的供應商配置

## 註冊 AnyRouter

官網：[https://anyrouter.top/](https://anyrouter.top/)

站長的 AFF 鏈接，走這個會都有 50 刀：[https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

註冊時按頁面提示走。郵箱驗證碼可能不會秒到，等幾分鐘再點重發，不然容易把自己搞煩

> [!TIP]
> 如果遇到 EDU 郵箱無法註冊的問題，可以直接看：
> [[#^answer1|👉 EDU邮箱注册不了怎么办]]

## AgentRouter 也可以單獨看一下

還有一個可以一起看的入口是 AgentRouter：[https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

它可以用 GitHub 和 Linux Do 賬號註冊 / 登錄，模型列表裏能看到 `gpt-5.5` 和 Claude 系列。如果能夠註冊，可以把它當成備用路線

註冊要求在這裏

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## 生成 AnyRouter API Key

進後臺的 API 令牌頁面，新建一個令牌

名字隨便寫，建議寫得能看懂，比如：

```text
cc-switch-anyrouter
```

常見要填的信息大概是：

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## 領取 SharedChat GPT 額度

[SharedChat](https://sharedchat.cc/#/) 這塊按它頁面的活動入口走。

這個本身就是一個可以免費不註冊 GPT 網頁端對話的公益項目。站長最近又做了一個公益 Codex 項目，每天都可以領取。

流程大致是：

1. 用 QQ 郵箱註冊 / 登錄 [Codex 公益站](https://new.sharedchat.cc/list/#/register?i=E8v44)，**而不是付費站**。當然你想付費也行。
2. ![[Pasted image 20260620234009.png]]
3. 點擊右下角的申請，寫一些小理由就好了，如果瀏覽器提示不通過，就換一個或者開無痕模式

## 安裝 cc-switch

cc-switch 官方倉庫：[https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Windows 一般下 `.msi` 或 portable zip。macOS 可以看 README 裏的安裝方式。Linux 通常按發行版選 deb、rpm 或 AppImage。

裝完打開，它會檢測本機已有的 AI CLI 工具，讀取 skill 和歷史記錄。你可以先拿這個管理現有配置，也可以用它更新和安裝相關工具。
![[Pasted image 20260620233340.png]]

## 在 cc-switch 裏添加供應商

以 AnyRouter 爲例：

1. 打開 cc-switch
2. 進入 Claude Code 或對應工具的供應商設置
3. 新建自定義供應商
4. 填供應商名稱，比如 `AnyRouter`
5. 填 API Key
6. 填請求地址 / Base URL
7. 選擇接口格式，按 AnyRouter 頁面提示選
8. 保存
9. 點擊使用 / 切換

如果你要加 SharedChat，就再建一個供應商，名字寫清楚：

```text
AnyRouter edu
SharedChat
```

以後切換時看名字就知道自己在用哪個額度

## cc-switch 開啓自動路由

最簡單的自動路由配置就是先開路由，再排好故障轉移順序。

在設置裏面啓動路由
![[Pasted image 20260620234413.png]]

在自動故障轉移裏編排好幾個供應商
![[Pasted image 20260620234401.png]]

## 驗證有沒有生效

切換後重開終端，或者直接新開一個終端。

先問一句：

```text
/init
```

能正常返回，再試代碼任務

如果報錯，可以查查這些：

1. Key 有沒有複製完整
2. Base URL 有沒有多一個空格或少一段路徑
3. cc-switch 是否真的點了使用 / 切換
4. 終端有沒有重開
5. 對應站點額度是不是已經用完
6. 模型名是不是後臺當前支持的模型
## 常見問題

### EDU郵箱註冊不了怎麼辦
大概率是你的郵箱在 AnyRouter 的黑名單上了。

不過也可以嘗試把學校郵箱域名的一段首字母改成大寫看看能不能收到。比如你的郵箱是 `stu.xxxx.edu.cn`，可以試試改成 `stu.Xxxx.edu.cn`。有時候能發出來，但能不能穩定收到就不一定了。

^answer1

### 接入CPA，Sub2後用不了

因爲 AnyRouter 主要面向 Codex、Claude Code 之類的工具端。如果想接到 CPA、Sub2 這類地方，可能需要處理請求頭，下面只是我當時排查時記的例子

| 頭             | 值                                                            |
| ------------- | ------------------------------------------------------------ |
| Authorization | Bearer sk-你的api                                              |
| User-Agent    | codex_cli_rs/0.114.0（或者其他存在的版本） (Windows 10.0.26100; x86_64) |
### Any用不了，很卡
這個就沒辦法了。畢竟同時被很多人用，穩定性看當時負載。我的經驗放下面。
> [!NOTE]
> 這個只能看運氣咯，一般來說gpt5.5挺好用上的，以及一般來說用上了就比較穩定，然後還有就是凌晨的時候容易上車之類的
>
> 人多的時候要排隊，可以嘗試開個新會話，發個hi，開目標模式，斷了就恢復，十分鐘內基本上就連上了，如果沒連上大概率就是配置問題了

還有更多問題，可以看看這個
[Any牌路由器使用清障！](https://linux.do/t/topic/1779614?U=AMIYA_DESI)
