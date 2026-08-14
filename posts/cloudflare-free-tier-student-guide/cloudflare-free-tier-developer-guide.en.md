---
title: "What Cloudflare's Free Tier Can Do for Developers: The Cyber Philanthropist's Free-for-All"
published: 2026-06-22
created: 2026-06-22
updated: 2026-08-10
lastEdited: 2026-08-10
updateCount: 1
description: "A rundown of genuinely useful things in Cloudflare's free tier: Pages, Workers, R2, Tunnel, Email Routing, DNS, Web Analytics, and when it's a better fit than a VPS."
image: ""
tags:
  - Cloudflare
  - Cloud Services
  - Free Resources
category: Website Building & Self-Hosting
draft: false
alias: ""
lang: en
translationKey: posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide
---

Cloudflare isn't called a "cyber philanthropist" in developer circles for no reason.

Its free tier limits are practically overkill for individual developers.

This post rounds up some of the free services I think developers can actually use.

## Registration

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

Just register with an email. You don't need to link a credit card for most free tier features (some, like R2, require a card but won't charge you unless you exceed limits).

If you can't register, try a different node or an incognito browser.

## Cloudflare Pages

This is what I use the most.

Pages lets you deploy static websites (HTML, CSS, JS, or build artifacts from frameworks like Astro/Next.js/Hugo) to Cloudflare's global network.

The free tier gives you:

- Unlimited sites
- Unlimited bandwidth
- 500 builds per month
- Automatic HTTPS
- Custom domains
- Preview deployments (one preview URL per PR)

For a personal blog, this pretty much has no limits.

My blog runs on Pages. After a push to the GitHub repo, GitHub Actions builds Astro, then Wrangler uploads it to Pages. The whole process costs nothing.

If you haven't used it yet:

[[astro-mizuki-blog-from-zero|Build a blog just like mine from scratch]]

## Cloudflare Workers

Workers are Cloudflare's Serverless functions. You can write a small piece of JS/TS, deploy it, and it runs on Cloudflare's edge nodes.

The free tier gives you:

- 100,000 requests per day
- 10ms CPU time per request
- 1MB code size

Good for:

- Creating a simple API (e.g., returning random sentences, forwarding requests, making a URL shortener)
- Adding a bit of dynamic logic to a static site
- Acting as a Webhook receiver
- Simple proxies or redirects

Not good for:

- Long-running tasks
- Complex backends requiring databases (though you can connect D1 or KV, the free tier has limits)
- Services requiring persistent WebSockets

If you're just looking to write a blog, Workers won't be immediately useful. But knowing it exists is handy; you'll often encounter it when tinkering with various small tools later on.

## Cloudflare R2

R2 is object storage, compatible with the S3 API.

The free tier gives you:

- 10GB storage
- 10 million Class A operations per month (PUT/POST/LIST)
- 10 million Class B operations per month (GET)
- Free egress (this is a killer feature)

Good for:

- Blog image storage (with a custom domain, it's an image host)
- Storing backup files
- Static asset hosting
- File upload storage for small projects

Why it's better than OSS: Egress traffic is free. Alibaba Cloud OSS charges for egress, R2 doesn't. For personal blogs and small projects, this difference is huge.

You need to link a credit card to enable R2, but you won't be charged within the free tier.

## Cloudflare Tunnel

Tunnel lets you securely expose internal services (like Vaultwarden listening only on 127.0.0.1 on your VPS) to the public internet.

How it works:

```text
User
  -> vault.example.com
  -> Cloudflare Network
  -> Cloudflare Tunnel (encrypted connection)
  -> Your VPS 127.0.0.1:8080
  -> Vaultwarden
```

Benefits:

- Your VPS doesn't need to open ports 80/443
- No need to apply for SSL certificates yourself
- Can be combined with Cloudflare Access for an extra layer of authentication
- Origin IP is not exposed

My Vaultwarden, ntfy, Gatus, and 1Panel dashboard all use Tunnel.

The free tier has no limit on the number of Tunnels. You can run multiple subdomains through a single Tunnel.

Installation involves running a `cloudflared` daemon on your VPS; it actively connects outwards, so no inbound rules are needed.

## Cloudflare DNS

Change your domain's NS to Cloudflare, and you can use its free DNS hosting.

Benefits:

- Global Anycast for fast resolution
- Free DNSSEC
- Hides origin IP with Proxy mode
- Clear management interface

If you bought your domain from another registrar (like Namesilo, Porkbun, SpaceShip, or various domestic cloud providers), you can change the NS to be managed by Cloudflare.

If you're using a free domain (like DNSHE's cc.cd), you'll need to check if that domain service allows NS changes. Some do, some only let you add records on their original platform.

## Cloudflare Email Routing

Email Routing lets you receive emails using your custom domain and then forward them to your real inbox.

For example:

```text
me@example.com -> forwards to -> Your Gmail/Outlook
```

It's free, no need to set up your own mail server.

Good for:

- Having a contact email for your blog without exposing your real address
- Using a custom domain email when signing up for various services
- Learning about email-related DNS records (MX, SPF, DKIM)

Note: This is only for receiving and forwarding. If you want to send emails from your custom domain, you'll need additional configuration (e.g., using Gmail SMTP + alias, or services like Resend, Mailgun, Zoho Mail).

## Cloudflare Web Analytics

Without installing any JS scripts, Cloudflare can show you basic traffic data for your website.

You can enable it in the Web Analytics section of the Dashboard.

It's much lighter than Google Analytics:

- Doesn't track users
- Doesn't use cookies
- No extra JS loading needed
- Privacy-friendly

For a personal blog, seeing if people visit daily, where they come from, and which pages they view is usually enough.

If you want more detailed analytics (like event tracking, funnels, custom dimensions), you can look into Umami or Plausible later. But for starters, Cloudflare's built-in option is sufficient.

## Cloudflare Access (Zero Trust Free Tier)

Access can add a layer of login protection to any of your web services.

For example, if you have an admin panel running at `panel.example.com` and don't want just anyone to access it, Access can pop up a login page, allowing only authenticated users to enter.

The free tier supports up to 50 users.

Authentication methods can include:

- Email one-time passcode
- GitHub login
- Google login

My 1Panel dashboard uses Access for protection. Even if the panel itself has a password, an extra layer of entry authentication is always good.

## What Else Is Free

Other free features I use less often:

- **D1**: SQLite database, runs alongside Workers. 5GB in the free tier.
- **KV**: Key-value store. The free tier has daily read/write limits but is enough for small projects.
- **Queues**: Message queue
- **Images**: Image transformations (the free tier is very limited for this)
- **Stream**: Video hosting (the free tier is generally insufficient)
- **Zaraz**: Third-party script management

No need to remember all of them. Just know that Cloudflare's free tier is generous, and you can come back to check when you need something.

## When NOT to Use Cloudflare

- Long-running background tasks → Use a VPS
- Persistent databases and complex queries → Use a VPS or managed database
- Persistent WebSocket connections → Workers have limitations
- Large file processing → Workers have limited memory and CPU
- Sensitive to access speed in mainland China → Cloudflare's free tier might not be fast in China

General principle: Put what you can on Cloudflare, and what needs to run persistently on a VPS. They're not replacements, but complementary.

## My Usage Summary

```text
Blog static files → Cloudflare Pages
Domain DNS → Cloudflare DNS
VPS internal services public access → Cloudflare Tunnel
Admin panel protection → Cloudflare Access
Blog images (considering) → R2
Traffic analytics → Web Analytics
Contact email → Email Routing
```

My 2C2G student server only handles things that absolutely need to run persistently. Anything that can be offloaded to Cloudflare doesn't burden the server.

## Further Reading

awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

This repo compiles various tools and uses within the Cloudflare ecosystem, with 14k+ stars. If you want to know "what others are doing with Cloudflare," start here.
