---
title: "What can you buy with Alibaba Cloud's 300 RMB student voucher: A guide to using it before you waste it"
published: 2026-06-22
created: 2026-06-22
updated: 2026-08-10
lastEdited: 2026-08-10
updateCount: 1
description: "A compilation of the most practical ways to use Alibaba Cloud's 300 RMB student voucher: ECS, Lightweight Application Server, Wuying Lingdou, Bailian Large Model API, and pitfalls to watch out for before ordering."
image: ""
tags:
  - Alibaba Cloud
  - Student Resources
category: Tools & Resources
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "Get a 300 RMB Alibaba Cloud voucher after student verification"
    - "ECS, Lightweight, Wuying, and Bailian API all have different uses"
    - "Before paying, check the deduction on the settlement page and usage-based cost warnings"
alias: ""
lang: en
translationKey: posts/aliyun-student-300-voucher-guide/aliyun-student-300-voucher-guide
---

> [!NOTE]
> This guide compiles methods verified as effective in June 2026. The scope of Alibaba Cloud vouchers can change, and the settlement page has the final say, so don't treat this as a permanent strategy. If you're reading this later, always confirm the deduction on the settlement page before placing an order.

As everyone knows, Alibaba Cloud gives out 300 RMB vouchers to university students every year.

Sounds generous, right? But once you click into the console, you'll find this voucher isn't 300 RMB cash, nor can it be used for anything on the site. The official page states clearly: university students who pass student verification can claim a 300 RMB no-threshold coupon, valid for 1 year; it applies to some Alibaba Cloud public cloud products, with the actual deduction determined at the time of purchase.

What's more, the scope of this voucher is constantly shrinking. What worked last year might not work this year. So, I'd advise you not to just leave it sitting after you claim it; figure out how to spend it as soon as possible.

The entry point is here: [Student Benefits Claim Link](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)

## How to Claim

The process is short:

1. Have an Alibaba Cloud account (registered with Alipay or phone number works)
2. Open the student benefits page
3. Complete student verification (usually via CHSI or university email)
4. Find the 'I am a student' entry and claim the 300 RMB deduction voucher

Once verified, the voucher will appear in your coupon list. It's valid for one year, starting from the day you claim it.

If you don't have an Alibaba Cloud account yet, just register one. Even if you don't use a server later, Alibaba Cloud Bailian's large model API can also be paid for with the voucher.

# What Can It Be Used For?

## Option 1: Annual ECS in Mainland China

The most common use in forums is to get a 2C2G ECS in mainland China for one year. Since you can claim one voucher each year, you can essentially use it for as long as you're in university.

Reference post:

[https://linux.do/t/topic/2258128](https://linux.do/t/topic/2258128?u=amiya_desi)

The general idea is:

1. Go to the ECS custom purchase page
2. Select an e-instance around 2C2G
3. Choose Mainland China for the region (avoid regions marked 'discounted,' as the voucher might not work there)
4. For traffic billing, select CDT pay-as-you-go
5. Confirm the voucher can be deducted on the settlement page

ECS custom purchase page:

[https://ecs-buy.aliyun.com/ecs/#/custom/](https://ecs-buy.aliyun.com/ecs/#/custom/)

Key configurations verified to work in forums:

```text
实例规格：ecs.e-c1m1.large（2C2G）
付费模式：包年包月，一年
流量计费方式：CDT 按量计费
```

If you choose correctly, the settlement page should show less than 300 RMB, with the voucher directly deducting the cost, so you don't need to pay extra.

If it shows the voucher can't be used, try a different region. Some in the forums reported it working in Qingdao, others in South China; the rules vary at different times. The key is: look at the payment page, don't guess.

After enabling CDT, you get about 20GB of free traffic per month. This is perfectly sufficient for hosting blogs, bots, or small APIs, but don't use it for high-traffic download sites, image hotlinking, or video distribution.

The first thing to do after buying isn't installing a control panel, it's setting up cost alerts. CDT pay-as-you-go means charges will incur after exceeding the free quota. Set a threshold alert, even for 1 RMB, so you can detect issues promptly if attacked or misconfigured.

## Option 2: Lightweight Application Server

If you don't want to delve into ECS, security groups, EIPs, CDT, and all that, a Lightweight Application Server is more like a 'pre-packaged mini VPS'.

Scroll down the student benefits page, or directly search for 'Lightweight Application Server' on the page:

[https://university.aliyun.com/buycenter/](https://university.aliyun.com/buycenter/)

Here are a few routes I've seen:

**A. Get a 2C2G Lightweight server for 0 RMB for six months**

Some in the forums confirmed you can get a 2C2G Lightweight server with 200M bandwidth for 0 RMB for six months. The advantage is unlimited traffic (fixed bandwidth), so no worries about exceeding CDT. The downside is it only lasts for six months.

**B. Cloud Xiaozhan 38 RMB flash sale + voucher for renewal**

First, grab a 38 RMB annual Lightweight Application Server during a timed flash sale on Cloud Xiaozhan:

[https://www.aliyun.com/minisite/goods](https://www.aliyun.com/minisite/goods)

It's said to be relatively easy to grab. After getting it, use the 300 RMB voucher to renew for another six months. This totals one and a half years for a total cost of 38 RMB.

Be careful with two things for this plan:

- The promotional price and student voucher might not stack. The actual display at checkout is what counts.
- If the voucher can't be used for renewal, then 38 RMB only buys you one year, not one and a half.

**C. Convert a trial ECS to a full subscription**

This is the path I took. Alibaba Cloud has a free trial entry point:

[https://free.aliyun.com](https://free.aliyun.com)

You can try a 2C2G ECS for three months. Before or after the trial expires, use the 300 RMB voucher to convert to an annual subscription. This works out to about one year and three months or even longer.

Personally, I prefer Lightweight for beginners to practice with. Not because it's more advanced, but because it has fewer options, meaning fewer chances to get confused.

## Option 3: Non-Mainland Lightweight

Non-Mainland China regions are a bit more mystical.

Feedback from forums suggests that non-Mainland ECS generally doesn't work well with vouchers, but some Lightweight Application Servers, in certain regions, with specific configurations, might. For example, some mentioned buying a 2C2G general-purpose type for 6 months, or a 2C0.5G for a year, totaling 336 RMB, requiring an additional 36 RMB after using the voucher; others opted for monthly renewals.

I don't recommend hardcoding specific regions here.

Hong Kong, Singapore, Japan, US, Germany, UK, Southeast Asia – the voucher rules for these regions might work today and not tomorrow. If you really want an overseas machine, just put the configuration in your cart and check the payment page.

If you're just setting up a blog, Cloudflare Pages is already sufficient.

## Option 4: Wuying Cloud PC and Lingdou

You can now also find Wuying-related entries on the Alibaba Cloud student benefits page.

This option suits two types of people:

- Those who want to try a cloud PC for occasional software or gaming
- Those who need to temporarily rent GPU computing power and don't want to buy a graphics card

Some in the forums have compiled guides on how to use Wuying Lingdou and the Wuying Linggou platform, such as using Lingdou to set up a GPU environment with an RTX5880 48GB graphics card:

[https://linux.do/t/topic/2219866/60](https://linux.do/t/topic/2219866/60)

These kinds of posts are better viewed as clues. Before actually paying, you still need to go back to the Alibaba Cloud settlement page to confirm Lingdou, region, and duration.

The good thing about this approach is it's cool, the bad thing is it's more like burning points based on usage. If you just want to host a service long-term, it's not as good as a server. If you're a research enthusiast, a model enthusiast, or need temporary VRAM, then it's worth checking out.

## Option 5: Bailian and Large Model APIs

If you already have a server, or aren't interested in cloud servers, you can also use the 300 RMB to try out large model APIs.

The student benefits page has entry points for large model services, AI application development, and Alibaba Cloud Bailian. Cloud Xiaozhan also shows model-related activities like Bailian, Token Plan, and HappyHorse:

[https://www.aliyun.com/minisite/goods](https://www.aliyun.com/minisite/goods)

If you want the voucher to be deducted, prioritize Alibaba Cloud's official direct-supply, pay-as-you-go models in the official console. Third-party intermediaries, marketplace products, or special activity packages might not accept this voucher.

You can use it to try:

- Tongyi Qianwen series (Qwen)
- DeepSeek related APIs
- Official models available on platforms like GLM / Kimi
- Video models like HappyHorse, provided you confirm deduction on the settlement page

The key is to select 'Official Direct-Supply Model' when calling. Some models in the Bailian console are marked 'Third-party' or 'Marketplace,' and those might not accept this voucher.

How many times can 300 RMB be used? This depends on the model you choose and the input length. For cheaper models like Tongyi Qianwen Turbo, 300 RMB can be used many, many times. For high-end large models, it will be much more expensive. Start with cheaper models to get the process working first.

This is more suitable for people who 'just want to try out APIs' than buying an idle server.

## Option 6: Get the ACA Large Model Engineer Certification for Free

Alibaba Cloud has another neat trick: use the 300 RMB voucher to directly cover the ACA Large Model Engineer Certification fee.

The certification, originally 600 RMB, has a student discount price of exactly 300 RMB, making it 0 RMB after using the voucher.

Reference post:

[https://linux.do/t/topic/2456810](https://linux.do/t/topic/2456810)

General process:

1. Complete student verification and claim the 300 RMB voucher
2. Scroll down the student benefits page to find the 'Large Model Certification' section
3. Click 'Buy Now' and use the voucher for deduction

This certification is an official Alibaba Cloud professional certification, aimed at beginners. While its value might not be super high, for students, getting a certificate for 0 RMB and learning basic large model knowledge along the way is a good deal.

**Who it's for:**

- Those who need to add a certification to their resume
- Those who want to systematically learn basic large model concepts
- Those who already have a server or aren't interested in servers

**Who it's not for:**

- People already doing large model development (too basic)
- People who'd rather use the voucher for a server (opportunity cost)

If your voucher is about to expire and you don't currently need a server or API, using it for this certification isn't a bad idea.

## How I'd Choose

If it's your first time playing with cloud services, I'd prioritize like this:

1. Claim the voucher first
2. Check if there's a 2C2G ECS or Lightweight server that can use the voucher
3. If you can get a server for 0 RMB or with a small top-up, get the server first
4. Once you have the server, immediately set up SSH, security groups, and cost alerts
5. Then run small services like Vaultwarden, ntfy, Gatus, bots, note synchronization, etc.

If you already have a VPS, don't buy another machine that will just gather dust just to spend the voucher. Using it to try Bailian API or Wuying Lingdou is more like actually using the money.

## Check Before Ordering

Don't rush to pay, check these first:

- Does the payment page show the 300 RMB voucher deduction?
- Is the order annual/monthly subscription, or pay-as-you-go?
- Will it auto-renew after expiration?
- How are traffic, bandwidth, and public IP charged?
- Is there a risk of default open security group rules?
- Can cost alerts and quota warnings be set?
- Can the voucher be reused for the same product category after a refund?

Especially the last point. Official rules state that after a refund for an order using a voucher, the returned voucher cannot be reused for the corresponding product category. Don't use it to randomly test orders.

## What to Read Next

If you ended up getting a 2C2G server like the site owner, you can continue with these posts:

- [[2c2g-server-service-index]]
- [[selfhost-vaultwarden-on-2c2g|Setting up Vaultwarden on a 2C2G Student Server]]
- [[fast-note-sync-on-student-server|Fiddling with Fast Note Sync on a Student Server]]

The best way to use this voucher isn't to 'grab and go,' but to exchange it for a low-cost opportunity to practice.

Servers, domains, Cloudflare, Docker, backups, monitoring – these things seem fragmented at first. But once you actually get a small service running, connect it to a domain, and then back it up, you'll find they all tie together.
