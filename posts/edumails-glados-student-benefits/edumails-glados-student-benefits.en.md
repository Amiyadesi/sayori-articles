---
title: "Official Student Benefits Guide: GitHub Student Pack, JetBrains, Azure, and Aliyun"
published: 2026-06-27
created: 2026-06-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 10
description: "Official student benefits for university emails: GitHub Student Developer Pack, JetBrains, Zed, Azure $100 annual credit, Aliyun 300 RMB voucher, Heroku, MongoDB, Codespaces, and Camber."
image: ""
tags:
  - Tutorial
  - Official Student Benefits
  - Edu Email
  - GitHub
  - Cloud Services
category: Tutorials & Guides
draft: false
lang: en
translationKey: posts/edumails-glados-student-benefits/edumails-glados-student-benefits
alias: ""
---

Don't just use your edu-email for school notifications.

My own order is simple: first apply for long-term official developer tools like GitHub and JetBrains, then look into cloud credits, databases, and development environments.

You can also browse [this community overview](https://nav.edumails.cn). This article combines my earlier application records with benefits added from official pages.

First published June 27, 2026; expanded October 13, 2026. Offers may change after that date. Check official terms and your account before applying.

The Zed and GLaDOS notes below preserve earlier records; current plans may differ.

This page serves as the main hub for student resources on this blog, bringing together all benefits you can apply for with a university email. For hands-on setup guides on specific categories, see the dedicated posts below:

- **AI Quotas & Config Management**: [[anyrouter-sharedchat-cc-switch-student-guide|How College Students Use Official AI Quotas, AnyRouter, SharedChat, and cc-switch to Manage AI Quotas]]
- **Azure in Japan**: [[azure-students-100-credit-guide|Claim $100 and create a Japan VPS with the portal or PowerShell]]
- **Aliyun 300 RMB Student Voucher**: [[aliyun-student-300-voucher-guide|What You Can Buy with Alibaba Cloud's 300 RMB Student Voucher]]
- **Cloudflare Free Tier**: [[cloudflare-free-tier-developer-guide|What Cloudflare's Free Tier Can Do for Developers]]
- **Free Domains & Student Pack Domains**: [[free-domain-and-web-community|Get a Free Domain for Your New Blog, Then Show Up in Webmaster Communities]]

## Grab Developer Tools First

[GitHub Student Developer Pack](https://education.github.com/pack) comes first.

Once verified, you get GitHub Pro and a wide range of partner benefits that can only be redeemed through the GitHub Student Pack. Just log into your Pack page to see them.

[JetBrains Student License](https://www.jetbrains.com/community/education/#students) If you want to try out JetBrains' products, you can also use your edu-email to register.

[Zed Education](https://zed.dev/education) I also applied for this and got a one-year Student plan, with $10 per month in Agent tokens, plus unlimited edit prediction.


It's not the full Pro version; Claude Opus is not included.

For Zed, there are two conditions: your GitHub account must be older than 30 days, and your school email domain must be in [JetBrains/swot](https://github.com/JetBrains/swot).

## Credits, Vouchers, and Monthly Quotas Are Different

I checked the official pages for these additions on October 13, 2026. While Azure and Aliyun can be applied for directly via school email or CHSI verification, **Heroku, MongoDB, Codespaces, and Camber must all be claimed through the GitHub Student Developer Pack**.

| Offer | Redemption Path | Benefit | Validity or renewal | Check first |
| --- | --- | --- | --- | --- |
| Azure for Students | Direct via school email | $100 in Azure service credit | 12 months; eligible students can renew yearly | Age 18+, eligible full-time higher education; no credit card |
| [Aliyun student offer](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv) | CHSI / school email | RMB 300 student voucher | One per 12 months while verified; each lasts 1 year | Selected products only; check checkout |
| Heroku | GitHub Student Pack only | $13 in monthly platform credit | 24 months; unused monthly credit expires | Valid credit or debit card required; overages charged |
| MongoDB Atlas | GitHub Student Pack only | $50 Atlas credit plus certification benefits | Redeem code within 90 days; check applied-credit expiry | Credit card or PayPal required; not $200 cash |
| GitHub Codespaces | GitHub Student Pack only | Pro allowance: 180 core-hours and 20 GB-month storage monthly | Resets monthly; check student benefit status | About 90 hours on 2 cores; storage counted separately |
| Camber Student | GitHub Student Pack only | Monthly 40 CPU hours, 5 GPU hours, 50 GB storage, 50 agent messages | Pack lists access while enrolled; check account cycles | No promise of a particular GPU or machine size |

These are service benefits, not withdrawable money. Annual renewal does not mean an automatic lifetime credit.

### Azure: $100 a Year, Subject to Eligibility

[Azure for Students](https://azure.microsoft.com/en-us/free/students/) is the main addition here. No credit card is required, and the $100 credit is available for 12 months on most Azure services.

“$100 each year” means eligible students can renew the student subscription yearly. Eligibility must still hold; a fresh credit is not guaranteed to appear automatically.

[The offer terms](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/) require age 18+, eligible full-time higher education, and academic verification using a school email.

Azure for Students Starter is a different offer. Do not assume it includes the same $100.

A small API, coursework, or deployment exercise is a sensible starting point. Region, service, and resource limits still apply; not every AI model, GPU, or Marketplace product is covered.

The student subscription is disabled when its credit runs out. Upgrading to pay-as-you-go changes the billing rules.

The [[azure-students-100-credit-guide|Azure student server guide]] covers claiming the benefit, free sizes, and creating a VM in Japan with either the portal or PowerShell.

## GitHub Student Developer Pack Exclusive Benefits

The cloud services, development environments, domains, and courses below are bundled inside the [GitHub Student Developer Pack](https://education.github.com/pack) and can only be redeemed after passing GitHub student verification:

### 1. Heroku: $13 Monthly, Not $312 to Spend at Once

[Heroku's student page and FAQ](https://www.heroku.com/github-students) require GitHub Student Developer Pack approval and age 18+.

The offer is $13 each month for 24 months, up to $312 altogether. Unused monthly credit expires, does not roll over, and the same 24-month program cannot be claimed again.

It covers Heroku's own dynos, Postgres, and Key-Value Store, but not paid third-party add-ons.

A valid credit or debit card is required. Usage beyond the monthly credit is charged to it, so do not leave an app running without checking billing.

### 2. MongoDB: $50 Database Credit, Certification Separate

[MongoDB's student page](https://www.mongodb.com/students) uses GitHub student verification. The $50 is Atlas database credit, not a general-purpose server allowance.

The advertised $200 benefit combines $50 Atlas credit with certification valued at $150. It is not a $200 database balance.

Certification requires completing and passing the relevant learning path. Redeeming a benefit does not award a certificate by itself.

Atlas credit redemption requires a valid credit card or PayPal account. Apply the code to one chosen organization within 90 days of generation; each code can be redeemed once.

Check Billing for the applied credit's expiry and scope. For small exercises, see whether an Atlas free cluster is enough before upgrading.

### 3. Codespaces and Camber: Usage-Based Environments

[Codespaces billing documentation](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) lists 180 core-hours and 20 GB-month of monthly storage for Pro. The student Pack provides Pro-level access.

180 core-hours is not 180 hours on every machine. A 2-core environment consumes 2 core-hours per hour, allowing about 90 hours; 4 cores allow about 45; 8 cores allow about 22.5.

Stopping an environment stops compute usage, but retained environments still use storage. Push your code and delete unused Codespaces to avoid storage charges. Without a payment method, quota exhaustion blocks usage; with one, check budgets and overage settings.

[Camber's student benefit](https://education.github.com/pack#cambercloud) focuses on data analysis and AI experiments. Pack lists monthly 40 CPU hours, 5 GPU hours, 50 GB storage, and 50 agent messages.

It is not a permanently free GPU of a guaranteed model. Check [Camber's documentation](https://docs.cambercloud.com/) and your account for supported sizes, quota accounting, and overages.

### 4. AI, Domains, and Learning Tools in the GitHub Pack

- GitHub Copilot Student: unlimited code completions plus limited chat, agent usage, and GitHub AI Credits; models use auto selection, not unlimited access to every premium model.
- Namecheap: first-year registration of one .me domain and a one-year SSL certificate; renewal is not permanently free.
- Name.com: a free domain from selected extensions including .app and .dev; check eligible names, terms, and renewal prices.
- Educative: 6 months of access to 70+ selected practical courses, not permanent access to the whole catalog.
- Boot.dev: 3 months of its complete interactive membership for backend and DevOps study.
- 1Password: 1 year of individual membership; check renewal arrangements before redeeming.

### 5. Combining These Student Credits for a Real Project

Do not activate every timed membership at once just because its advertised value looks large. Pick a small project you can finish, then claim only the benefits you actually need:

- **Frontend / Blog**: Follow the [[astro-mizuki-blog-from-zero|simple blog guide]] to Cloudflare Pages, then connect a [[free-domain-and-web-community|free domain]].
- **Temporary Dev Environment**: Use GitHub Codespaces on a 2-core machine when switching devices, and stop or delete it after pushing.
- **Lightweight Backend / Database**: Start with a MongoDB Atlas free cluster or the $50 credit, paired with Azure (no credit card required) or Heroku (staying under $13/month).
- **24/7 Self-Hosted Services**: Create a server with the [[aliyun-student-300-voucher-guide|Aliyun voucher]] or [[azure-students-100-credit-guide|Azure student credit]], then choose a use from the [[2c2g-server-service-index|small-server service guide]].

## Networking and Servers

[GLaDOS](https://glados.space/register)'s [Education Portal](https://glados.one/console/education)

GLaDOS Education offers:
1.  If you are a high school to university student or teacher (China), you can get a free 360-day GLaDOS Education Plan.
2.  If you are a medical school student or teacher (China), you can get a free 360-day GLaDOS Pro Plan.
3.  If you are a student outside mainland China, you can get a free 14-day GLaDOS Education Plan (edu.kg also works).
4.  This is a one-time offer.
5.  Supports 3 active devices, up to 100GB traffic per month, uses economic servers (not optimized for streaming content), does not support Netflix unlocking, and does not support advanced features.

You can use this invitation code to register: `JZELF-GSULR-G5LFS-BD1S4`

If you do pay, you can use my discount code `AMIYADESI` at checkout for a 10% discount when paying with Alipay.

[Aliyun Student Portal](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)'s 300 RMB voucher is not cash, nor can it be used for all products.

If you want to buy ECS, Light Application Server, Baolian API, or Wuying, add them to your cart first and check the settlement page.

My actual pitfalls and several optional directions are written in [[aliyun-student-300-voucher-guide|What You Can Buy with Aliyun Student's 300 RMB Voucher]].

If your website is just for course projects, documentation, or portfolios, start with [GitHub Pages](https://pages.github.com/) or [Cloudflare Pages](https://pages.cloudflare.com/). Only touch servers when those aren't enough.
