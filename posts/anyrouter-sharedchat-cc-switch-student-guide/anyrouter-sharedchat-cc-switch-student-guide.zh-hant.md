---
title: "大學生怎麼用官方 AI 額度、AnyRouter、SharedChat 和 cc-switch 管理開發環境"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 11
description: "給大學生看的官方 AI 額度、AnyRouter 註冊、SharedChat 額度領取和 cc-switch 配置記錄，配合我已經發到 B 站的視頻看"
image: ""
tags:
  - 實操教程
  - AI工作流
  - Claude Code
  - 官方學生權益
category: 教程教學
draft: false
alias: ""

lang: zh-Hant
translationKey: posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide
---

這篇是給視頻補一個文字版，同時也補充了正規官方學生 AI 額度的接入方式

視頻在這裡：[BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## 這幾個東西分別是什麼

在配 `cc-switch` 之前，先把幾種能接進來的額度來源分清楚：

- **正規官方額度**：包括 [Zed Education](https://zed.dev/education)（學生認證送一年 Student 計劃，包含每個月 10 美元 AI Agent 額度和無限編輯預測）、[阿里雲百鍊](https://bailian.console.aliyun.com/)（可用高校學生 300 元無門檻券抵扣或領新人免費 Token）、[Google AI Studio](https://aistudio.google.com/)（官方 Gemini API 免費層）、以及 [GitHub Student Developer Pack](https://education.github.com/pack) 裡的 GitHub Copilot Student 和 GitHub Models，穩定性最好，適合做主力
- **AnyRouter / AgentRouter**：提供 Claude Code / Anthropic 兼容接口的路由服務，給你一個可用的 API 入口和 Key，填到支持 Claude Code 的工具裡即可使用
- **SharedChat**：偏 GPT / Codex 公益額度的入口，可以理解成一個額外的 Codex 額度來源
- **cc-switch**：開源桌面端配置管理工具，GitHub 倉庫是 [farion1231/cc-switch](https://github.com/farion1231/cc-switch)，作用是幫你集中切換 Claude Code、Codex、Gemini CLI 之類工具的供應商配置

## 官方正規額度怎麼拿

如果你想先配最穩的官方主力通道，可以先把這四個教育/免費渠道領了（更多全品類學生資源總表可以看 [[edumails-glados-student-benefits|高校教育郵箱官方權益指南]]）：

1. **Zed Education（每月 10 刀 AI 額度）**：在 [Zed Education](https://zed.dev/education) 申請通過後，會給一年 Student 資格，每個月都有 10 美元的 Agent tokens 額度和無限編輯預測（不包含 Claude Opus）。申請要求 GitHub 賬號註冊滿 30 天，且學校郵箱域名在 [JetBrains/swot](https://github.com/JetBrains/swot) 列表裡
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **阿里雲百鍊官方 API**：通過[阿里雲學生權益領取鏈接](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)領完 300 元學生券，或者直接去百鍊控制台生成 API Key，Base URL 填 `https://dashscope.aliyuncs.com/compatible-mode/v1`
3. **Google AI Studio 官方免費層**：登錄 Google 賬號後直接生成 Gemini API Key，不綁卡也能在每日免費額度內調用 Gemini 系列模型
4. **GitHub 學生包**：認證教育郵箱後直接開 GitHub Copilot Student

## 註冊 AnyRouter

官網：[https://anyrouter.top/](https://anyrouter.top/)

站長的 AFF 鏈接，走這個會都有 50 刀：[https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

註冊時按頁面提示走。郵箱驗證碼可能不會秒到，等幾分鐘再點重發，不然容易把自己搞煩

> [!TIP]
> 如果遇到 EDU 郵箱無法註冊的問題，可以直接看：
> [[#^answer1|👉 EDU郵箱註冊不了怎麼辦]]

## AgentRouter 也可以單獨看一下

還有一個可以一起看的入口是 AgentRouter：[https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

它可以用 GitHub 和 Linux Do 賬號註冊 / 登錄，模型列表裡能看到 `gpt-5.5` 和 Claude 系列。如果能夠註冊，可以把它當成備用路線

註冊要求在這裡

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

[SharedChat](https://sharedchat.cc/#/) 這塊按它頁面的活動入口走

這個本身就是一個可以免費不註冊 GPT 網頁端對話的公益項目。站長最近又做了一個公益 Codex 項目，每天都可以領取

流程大致是：

1. 用 QQ 郵箱註冊 / 登錄 [Codex 公益站](https://new.sharedchat.cc/list/#/register?i=E8v44)，**而不是付費站**。當然你想付費也行
2. ![[Pasted image 20260620234009.png]]
3. 點擊右下角的申請，寫一些小理由就好了，如果瀏覽器提示不通過，就換一個或者開無痕模式

## 安裝 cc-switch

cc-switch 官方倉庫：[https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Windows 一般下 `.msi` 或 portable zip。macOS 可以看 README 裡的安裝方式。Linux 通常按發行版選 deb、rpm 或 AppImage

裝完打開，它會檢測本機已有的 AI CLI 工具，讀取 skill 和歷史記錄。你可以先拿這個管理現有配置，也可以用它更新和安裝相關工具
![[Pasted image 20260620233340.png]]

## 在 cc-switch 裡添加供應商

以 AnyRouter 或阿里雲百鍊為例：

1. 打開 cc-switch
2. 進入 Claude Code 或對應工具的供應商設置
3. 新建自定義供應商
4. 填供應商名稱，比如 `Aliyun-Bailian` 或 `AnyRouter`
5. 填 API Key
6. 填請求地址 / Base URL
7. 選擇接口格式，按對應平臺頁面提示選
8. 保存
9. 點擊使用 / 切換

如果你要加多個渠道，就分別建供應商，名字寫清楚：

```text
Bailian Official
AnyRouter edu
SharedChat
```

以後切換時看名字就知道自己在用哪個額度

## cc-switch 開啟自動路由

最簡單的自動路由配置就是先開路由，再排好故障轉移順序

在設置裡面啟動路由
![[Pasted image 20260620234413.png]]

在自動故障轉移裡編排好幾個供應商
![[Pasted image 20260620234401.png]]

## 驗證有沒有生效

切換後重開終端，或者直接新開一個終端

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
大概率是你的郵箱在 AnyRouter 的黑名單上了

不過也可以嘗試把學校郵箱域名的一段首字母改成大寫看看能不能收到。比如你的郵箱是 `stu.xxxx.edu.cn`，可以試試改成 `stu.Xxxx.edu.cn`。有時候能發出來，但能不能穩定收到就不一定了

^answer1

### 接入CPA，Sub2後用不了

因為 AnyRouter 主要面向 Codex、Claude Code 之類的工具端。如果想接到 CPA、Sub2 這類地方，可能需要處理請求頭，下面只是我當時排查時記的例子

| 頭             | 值                                                            |
| ------------- | ------------------------------------------------------------ |
| Authorization | Bearer sk-你的api                                              |
| User-Agent    | codex_cli_rs/0.114.0（或者其他存在的版本） (Windows 10.0.26100; x86_64) |

### Any用不了，很卡
這個就沒辦法了。畢竟同時被很多人用，穩定性看當時負載。我的經驗放下面
> [!NOTE]
> 這個只能看運氣咯，一般來說gpt5.5挺好用上的，以及一般來說用上了就比較穩定，然後還有就是凌晨的時候容易上車之類的
>
> 人多的時候要排隊，可以嘗試開個新會話，發個hi，開目標模式，斷了就恢復，十分鐘內基本上就連上了，如果沒連上大概率就是配置問題了

還有更多問題，可以看看這個
[Any牌路由器使用清障！](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## 繼續讀

其他官方權益放在 [[edumails-glados-student-benefits|學生權益總表]]，想把寫好的項目放到線上，可以繼續看 [[azure-students-100-credit-guide|Azure 日本服務器]]、[[aliyun-student-300-voucher-guide|阿里雲學生券]]，靜態網頁則直接用 [[astro-mizuki-blog-from-zero|Cloudflare Pages 建站]]
