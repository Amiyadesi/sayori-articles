---
title: "How College Students Use AnyRouter, SharedChat, and cc-switch to Manage AI Quotas"
published: 2026-06-18
created: 2026-06-18
updated: 2026-08-10
lastEdited: 2026-08-10
updateCount: 1
description: "A guide for college students on AnyRouter registration, SharedChat GPT quota claiming, and cc-switch configuration, to be watched with my Bilibili video."
image: ""
tags:
  - Claude Code
  - AI Quota
  - Student Resources
category: AI & Workflow
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "Outline student quota access for AnyRouter and SharedChat"
    - "Use cc-switch to centrally manage configurations for tools like Claude Code"
    - "Follow the video to go through the registration, quota claiming, and configuration process"
alias: ""
lang: en
translationKey: posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide
---

This post is a text companion to the video.

The video is here: [BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## What Are These Things, Anyway?

AnyRouter is a routing service for AI API / Claude Code. Simply put, it gives you a usable API endpoint and Key, which you then plug into tools that support Claude Code / Anthropic interfaces.

SharedChat is another entry point, leaning towards GPT / Codex public welfare quotas. You can think of it as an additional source of Codex quotas.

cc-switch is a desktop configuration management tool, with its GitHub repo at [farion1231/cc-switch](https://github.com/farion1231/cc-switch). Its purpose is to help you switch provider configurations for tools like Claude Code, Codex, and Gemini CLI.

## Registering for AnyRouter

Official website: [https://anyrouter.top/](https://anyrouter.top/)

The admin's affiliate link; using this will get both of us $50: [https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

Follow the on-screen instructions during registration. The email verification code might not arrive instantly; wait a few minutes before clicking resend, or you'll just annoy yourself.

> [!TIP]
> If you encounter issues registering with an EDU email, you can directly refer to:
> [[#^answer1|👉 What to do if your EDU email can't register]]

## AgentRouter is also worth a look

Another entry point you can check out is AgentRouter: [https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

You can register/log in with GitHub and Linux Do accounts, and the model list includes `gpt-5.5` and the Claude series. If you can register, you can use it as a backup option.

Registration requirements are here

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## Generating an AnyRouter API Key

Go to the API Tokens page in the backend and create a new token.

Name it whatever you want, but I suggest something clear, like:

```text
cc-switch-anyrouter
```

The common information you'll need to fill in is usually:

```text
API Key: Your generated Key
Base URL: The API address provided on the AnyRouter homepage
```

## Claiming SharedChat GPT Quotas

For [SharedChat](https://sharedchat.cc/#/), follow the activity entry points on its page.

This is itself a public welfare project that allows free GPT web-based conversations without registration. The admin recently launched another public welfare Codex project, which you can claim daily.

The process is roughly:

1. Register/log in to the [Codex Public Welfare Site](https://new.sharedchat.cc/list/#/register?i=E8v44) using a QQ email, **not the paid site**. Of course, if you want to pay, that's fine too.
2. ![[Pasted image 20260620234009.png]]
3. Click 'Apply' in the bottom right, write a small reason, and you're good. If your browser gives an error, try another browser or incognito mode.

## Installing cc-switch

cc-switch official repository: [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

For Windows, usually download the `.msi` or portable zip. For macOS, check the installation methods in the README. For Linux, typically choose deb, rpm, or AppImage according to your distribution.

After installation, open it. It will detect existing AI CLI tools on your machine, read skills and history. You can use it to manage your current configurations, or to update and install related tools.
![[Pasted image 20260620233340.png]]

## Adding Providers in cc-switch

Taking AnyRouter as an example:

1. Open cc-switch
2. Go to the provider settings for Claude Code or the corresponding tool.
3. Create a custom provider.
4. Enter the provider name, e.g., `AnyRouter`.
5. Enter the API Key.
6. Enter the Request Address / Base URL.
7. Select the interface format, as prompted on the AnyRouter page.
8. Save.
9. Click Use / Switch.

If you want to add SharedChat, create another provider and name it clearly:

```text
AnyRouter edu
SharedChat
```

Next time you switch, you'll know which quota you're using just by the name.

## Enabling Automatic Routing in cc-switch

The simplest automatic routing configuration is to enable routing first, then arrange the failover order.

Enable routing in settings.
![[Pasted image 20260620234413.png]]

Arrange multiple providers in automatic failover.
![[Pasted image 20260620234401.png]]

## Verifying It Works

After switching, restart your terminal, or just open a new one.

First, ask a question:

```text
/init
```

If it returns normally, then try a code task.

If there's an error, check these:

1. Is the Key copied completely?
2. Does the Base URL have an extra space or a missing path segment?
3. Did you actually click Use / Switch in cc-switch?
4. Was the terminal restarted?
5. Has the quota for the corresponding site been used up?
6. Is the model name one that the backend currently supports?

## Common Issues

### What to do if your EDU email can't register
Most likely, your email is on AnyRouter's blacklist.

However, you can also try capitalizing a segment of your school email domain to see if you can receive it. For example, if your email is `stu.xxxx.edu.cn`, you can try changing it to `stu.Xxxx.edu.cn`. Sometimes it might send, but whether you'll reliably receive it is another story.

^answer1

### Can't use after connecting to CPA, Sub2

Because AnyRouter primarily targets tool-side applications like Codex and Claude Code. If you want to connect it to places like CPA or Sub2, you might need to handle request headers. Below are just examples I noted during my troubleshooting.

| Header | Value |
|---|---|
| Authorization | Bearer sk-your_api |
| User-Agent | codex_cli_rs/0.114.0 (or other existing version) (Windows 10.0.26100; x86_64) |

### AnyRouter is unusable, very laggy

There's not much to do about this. After all, many people use it simultaneously, so stability depends on the current load. My experience is below.
> [!NOTE]
> You just have to try your luck. Generally, gpt5.5 is quite easy to get started with, and once it's working, it's usually stable. Also, it's often easier to get on board in the early morning hours.
> When it's crowded, you'll have to queue. You can try opening a new session, sending a 'hi', enabling target mode, and if it disconnects, just resume. It usually connects within ten minutes; if not, it's likely a configuration issue.

For more issues, you can check this out:
[Clearing Obstacles for AnyRouter Usage!](https://linux.do/t/topic/1779614?U=AMIYA_DESI)
