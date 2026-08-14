---
title: "Free AI API Entry Points: BaiPiao, innilove, and Several Navigation Sites"
published: 2026-06-25
created: 2026-06-25
updated: 2026-08-14
lastEdited: 2026-08-14
updateCount: 1
description: "Compiling a few entry points where you can still find free AI APIs, along with navigation sites suitable for checking public-benefit sites and free quotas."
image: ""
tags:
  - AI API
  - Claude Code
  - Free Resources
category: AI and Workflow
draft: false
aiSummary:
  generatedAt: "2026-08-04"
  model: "codex-local"
  items:
    - "Collecting free AI API entry points like BaiPiao, innilove, etc."
    - "Adding navigation for finding public-benefit sites and free quotas."
    - "Free entry points change quickly; check quotas and stability before calling."
alias: ""
lang: en
translationKey: posts/freeapi-glm-kimi-cc-switch/freeapi-glm-kimi-cc-switch
---

Here are a few for now:

- BaiPiao Free Resources Collection: [https://baipiao.org/free/](https://baipiao.org/free/)
- innilove New API: [https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)
- Yangmao AI: [https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)
- Qiaoliangchaichu Public-Benefit API Navigation: [https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)
- HCNSEC API Navigation: [https://link.hcnsec.cn/](https://link.hcnsec.cn/)

If you want to keep looking for similar entry points, you can directly open the [AI category of the resource navigation](https://nav.sayori.org/#cat-ai). This page collects the entry points mentioned in this article along with other commonly used AI tools. The status of the sites should still be verified on the target site itself.

> [!NOTE]
> This article is compiled based on the pages seen on 2026-08-04. Free quotas, models, rate limits, and site status are all subject to change. Before actually using them, please refer to the official website and backend displays.

If you haven't seen this post on the site, you can also check out [[anyrouter-sharedchat-cc-switch-student-guide|Anyrouter, Sharedchat, and AgentRouter Review and Usage]].
## Let's Clarify First

innilove is an API entry point you can directly try.

BaiPiao, Yangmao, Qiaoliangchaichu, and HCNSEC are more like navigation sites, used for finding new public-benefit sites, free quotas, and proxy entry points.

Navigation pages are not Base URLs, nor are they API Key pages. Don't directly enter them into cc-switch.

## BaiPiao

Entry Point:

[https://baipiao.org/free/](https://baipiao.org/free/)

This is a comprehensive collection of free resources, not a single API service. The homepage categorizes resources by free API / models, VPS, domains, etc. The API category is under [Free API / Models](https://baipiao.org/free/api/).

The page indicates the last verification time and uses community votes to verify validity. Expired entries are moved to the bottom.

It's suitable for finding entry points, but not for directly using as a Base URL or API Key page. After clicking into a specific resource, you still need to go back to the original site to confirm registration conditions, interface address, model name, and quota.

## innilove New API

Entry Point:

[https://api.innilove.xyz/keys](https://api.innilove.xyz/keys)

This is the New API panel. Register, log in, and create a token on the Key page.

Currently, it supports common email providers like 163. You can also check in to get quotas. For models, primarily refer to the backend list; previously, models like DeepSeek and MiniMax were visible.

If the backend still uses standard OpenAI-compatible configurations, you can try this first:

```text
Provider Name: innilove New API
API Key: Key created on the page
Base URL: https://api.innilove.xyz/v1
Interface Format: OpenAI compatible
```

Do not copy model names, multipliers, and quotas from old articles. Log in and check the current page.

## Yangmao AI

Entry Point:

[https://yangmao.ai/zh/#ask](https://yangmao.ai/zh/#ask)

This is not a proxy site.

It's more like an AI tool and free quota intelligence site. The page organizes model platforms, API prices, free quotas, and regional restrictions, and also has a direct query entry point.

When looking for new APIs, you can search for the platform name here first, then click back to the official page to confirm.

## Qiaoliangchaichu Public-Benefit API Navigation

Entry Point:

[https://link.qiaoliangchaichu.top/](https://link.qiaoliangchaichu.top/)

The page title is "Public-Benefit API Navigation," and it includes public-benefit, free, and paid API services.

The homepage I saw this time is more like an aggregated entry point. You'll need to go into the page yourself to see which sites are listed and if registration is still possible.

The advantage of such navigation sites is that it saves you from digging through groups and posts everywhere. The disadvantage is also obvious: site statuses change very quickly, and just because an entry point opens doesn't mean the API will necessarily work.

## HCNSEC API Navigation

Entry Point:

[https://link.hcnsec.cn/](https://link.hcnsec.cn/)

Its positioning is more direct; the page states "Free Large Model API Proxy Navigation Network," categorizing into major vendors, general proxy sites, and public-benefit APIs.

The public list shows multiple model platforms and API entry points, and also mixes in some services that require real-name verification, phone numbers, or invitation conditions.

This is suitable for scanning new sites, but don't just throw your main account and code in just because you see the word "free."

## How to Choose

If you want to set up cc-switch immediately, first go to BaiPiao's API / Model category, or generate a Key yourself after entering innilove.

If you want to find more entry points, check Yangmao first, then browse Qiaoliangchaichu and HCNSEC.

For new sites found on navigation pages, first confirm four things:

1. Registration conditions
2. Whether real-name verification or a phone number is required
3. Where the Key page and API documentation are
4. How free quotas, model multipliers, and rate limits are specified

After confirming everything, test with a very light request. Don't immediately run a long Agent.

## Setting up cc-switch

BaiPiao cannot be directly entered into cc-switch; it's a resource directory. First, click into a specific entry and configure it according to the Base URL, API Key, and model name provided by that entry.

innilove can be filled in like this:

```text
Provider Name: innilove New API
API Key: The Key you generated in the console
Base URL: https://api.innilove.xyz/v1
Interface Format: OpenAI compatible
```

After saving, send a request first:

```text
Describe the model you are currently using in three sentences.
```

If it returns normally, then continue running code tasks.

If an error occurs, first check if the Base URL, model name, and Key are complete, then see if the quota has been used up.

## Security Reminder

Free APIs and public-benefit proxies are not suitable for storing keys, accounts, unpublished code, or private chat logs.

Also, don't connect them to public services, group bots, or long-running Agents.

These types of entry points might work today, but that doesn't mean they'll still be available tomorrow.

Just treat them as backup and testing entry points. Don't rely your entire workflow on them.
