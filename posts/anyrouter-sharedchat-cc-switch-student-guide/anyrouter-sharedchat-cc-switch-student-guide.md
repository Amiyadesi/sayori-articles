---
title: "大学生怎么用官方 AI 额度、AnyRouter、SharedChat 和 cc-switch 管理开发环境"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 12
description: "给大学生看的官方 AI 额度、AnyRouter 注册、SharedChat 额度领取和 cc-switch 配置记录，配合我已经发到 B 站的视频看"
image: ""
tags:
  - 实操教程
  - AI工作流
  - Claude Code
  - 官方学生权益
category: 教程教学
draft: false
alias: ""

---

这篇是给视频补一个文字版，同时也补充了正规官方学生 AI 额度的接入方式

视频在这里：[BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## 这几个东西分别是什么

在配 `cc-switch` 之前，先把几种能接进来的额度来源分清楚：

- **正规官方额度**：包括 [Zed Education](https://zed.dev/education)（学生认证送一年 Student 计划，包含每个月 10 美元 AI Agent 额度和无限编辑预测）、[阿里云百炼](https://bailian.console.aliyun.com/)（可用高校学生 300 元无门槛券抵扣或领新人免费 Token）、[Google AI Studio](https://aistudio.google.com/)（官方 Gemini API 免费层）、以及 [GitHub Student Developer Pack](https://education.github.com/pack) 里的 GitHub Copilot Student 和 GitHub Models，稳定性最好，适合做主力
- **AnyRouter / AgentRouter**：提供 Claude Code / Anthropic 兼容接口的路由服务，给你一个可用的 API 入口和 Key，填到支持 Claude Code 的工具里即可使用
- **SharedChat**：偏 GPT / Codex 公益额度的入口，可以理解成一个额外的 Codex 额度来源
- **cc-switch**：开源桌面端配置管理工具，GitHub 仓库是 [farion1231/cc-switch](https://github.com/farion1231/cc-switch)，作用是帮你集中切换 Claude Code、Codex、Gemini CLI 之类工具的供应商配置

## 官方正规额度怎么拿

如果你想先配最稳的官方主力通道，可以先把这四个教育/免费渠道领了（更多全品类学生资源总表可以看 [[edumails-glados-student-benefits|高校教育邮箱官方权益指南]]）：

1. **Zed Education（每月 10 刀 AI 额度）**：在 [Zed Education](https://zed.dev/education) 申请通过后，会给一年 Student 资格，每个月都有 10 美元的 Agent tokens 额度和无限编辑预测（不包含 Claude Opus）。申请要求 GitHub 账号注册满 30 天，且学校邮箱域名在 [JetBrains/swot](https://github.com/JetBrains/swot) 列表里
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **阿里云百炼官方 API**：通过[阿里云学生权益领取链接](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)领完 300 元学生券，或者直接去百炼控制台生成 API Key，Base URL 填 `https://dashscope.aliyuncs.com/compatible-mode/v1`
3. **Google AI Studio 官方免费层**：登录 Google 账号后直接生成 Gemini API Key，不绑卡也能在每日免费额度内调用 Gemini 系列模型
4. **GitHub 学生包**：认证教育邮箱后直接开 GitHub Copilot Student

## 注册 AnyRouter

官网：[https://anyrouter.top/](https://anyrouter.top/)

站长的 AFF 链接，走这个会都有 50 刀：[https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

注册时按页面提示走。邮箱验证码可能不会秒到，等几分钟再点重发，不然容易把自己搞烦

> [!TIP]
> 如果遇到 EDU 邮箱无法注册的问题，可以直接看：
> [[#^answer1|👉 EDU邮箱注册不了怎么办]]

## AgentRouter 也可以单独看一下

还有一个可以一起看的入口是 AgentRouter：[https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

它可以用 GitHub 和 Linux Do 账号注册 / 登录，模型列表里能看到 `gpt-5.5` 和 Claude 系列。如果能够注册，可以把它当成备用路线

注册要求在这里

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## 生成 AnyRouter API Key

进后台的 API 令牌页面，新建一个令牌

名字随便写，建议写得能看懂，比如：

```text
cc-switch-anyrouter
```

常见要填的信息大概是：

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## 领取 SharedChat GPT 额度

[SharedChat](https://sharedchat.cc/#/) 这块按它页面的活动入口走

这个本身就是一个可以免费不注册 GPT 网页端对话的公益项目。站长最近又做了一个公益 Codex 项目，每天都可以领取

流程大致是：

1. 用 QQ 邮箱注册 / 登录 [Codex 公益站](https://new.sharedchat.cc/list/#/register?i=E8v44)，**而不是付费站**。当然你想付费也行
2. ![[Pasted image 20260620234009.png]]
3. 点击右下角的申请，写一些小理由就好了，如果浏览器提示不通过，就换一个或者开无痕模式

## 安装 cc-switch

cc-switch 官方仓库：[https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Windows 一般下 `.msi` 或 portable zip。macOS 可以看 README 里的安装方式。Linux 通常按发行版选 deb、rpm 或 AppImage

装完打开，它会检测本机已有的 AI CLI 工具，读取 skill 和历史记录。你可以先拿这个管理现有配置，也可以用它更新和安装相关工具
![[Pasted image 20260620233340.png]]

## 在 cc-switch 里添加供应商

以 AnyRouter 或阿里云百炼为例：

1. 打开 cc-switch
2. 进入 Claude Code 或对应工具的供应商设置
3. 新建自定义供应商
4. 填供应商名称，比如 `Aliyun-Bailian` 或 `AnyRouter`
5. 填 API Key
6. 填请求地址 / Base URL
7. 选择接口格式，按对应平台页面提示选
8. 保存
9. 点击使用 / 切换

如果你要加多个渠道，就分别建供应商，名字写清楚：

```text
Bailian Official
AnyRouter edu
SharedChat
```

以后切换时看名字就知道自己在用哪个额度

## cc-switch 开启自动路由

最简单的自动路由配置就是先开路由，再排好故障转移顺序

在设置里面启动路由
![[Pasted image 20260620234413.png]]

在自动故障转移里编排好几个供应商
![[Pasted image 20260620234401.png]]

## 验证有没有生效

切换后重开终端，或者直接新开一个终端

先问一句：

```text
/init
```

能正常返回，再试代码任务

如果报错，可以查查这些：

1. Key 有没有复制完整
2. Base URL 有没有多一个空格或少一段路径
3. cc-switch 是否真的点了使用 / 切换
4. 终端有没有重开
5. 对应站点额度是不是已经用完
6. 模型名是不是后台当前支持的模型

## 常见问题

### EDU邮箱注册不了怎么办
大概率是你的邮箱在 AnyRouter 的黑名单上了

不过也可以尝试把学校邮箱域名的一段首字母改成大写看看能不能收到。比如你的邮箱是 `stu.xxxx.edu.cn`，可以试试改成 `stu.Xxxx.edu.cn`。有时候能发出来，但能不能稳定收到就不一定了

^answer1

### 接入CPA，Sub2后用不了

因为 AnyRouter 主要面向 Codex、Claude Code 之类的工具端。如果想接到 CPA、Sub2 这类地方，可能需要处理请求头，下面只是我当时排查时记的例子

| 头             | 值                                                            |
| ------------- | ------------------------------------------------------------ |
| Authorization | Bearer sk-你的api                                              |
| User-Agent    | codex_cli_rs/0.114.0（或者其他存在的版本） (Windows 10.0.26100; x86_64) |

### Any用不了，很卡
这个就没办法了。毕竟同时被很多人用，稳定性看当时负载。我的经验放下面
> [!NOTE]
> 这个只能看运气咯，一般来说gpt5.5挺好用上的，以及一般来说用上了就比较稳定，然后还有就是凌晨的时候容易上车之类的
>
> 人多的时候要排队，可以尝试开个新会话，发个hi，开目标模式，断了就恢复，十分钟内基本上就连上了，如果没连上大概率就是配置问题了

还有更多问题，可以看看这个
[Any牌路由器使用清障！](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## 继续读

其他官方权益放在 [[edumails-glados-student-benefits|学生权益总表]]，想把写好的项目放到线上，可以继续看 [[azure-students-100-credit-guide|Azure 日本服务器]]、[[aliyun-student-300-voucher-guide|阿里云学生券]]，静态网页则直接用 [[astro-mizuki-blog-from-zero|Cloudflare Pages 建站]]

模型接好以后，搜索这部分我单独做成了 [[build-your-search-gateway|Search Gateway]]；浏览器里辅助阅读、翻译和管理接口的工具放在 [[useful-browser-extensions-toolbox|插件清单]] 里
