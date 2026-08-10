---
title: "What Can a 2C2G Student Server Run: Don't Overload the Little Machine Yet"
published: 2026-06-22
created: 2026-06-22
updated: 2026-06-27
lastEdited: 2026-06-27
updateCount: 3
description: "My real-world setup for a 2C2G Alibaba Cloud student server: Vaultwarden, ntfy, Gatus, Fast Note Sync, AstrBot, and a search gateway. Includes actual memory usage and a list of what not to run."
image: ""
tags:
  - Student Server
  - Docker
  - Self-hosting
category: Website Building & Self-hosting
draft: false
alias: ""
lang: en
translationKey: posts/student-2c2g-server-service-index/2c2g-server-service-index
---

If you, like me, traded your Alibaba Cloud student coupon for a 2C2G server, congrats.

You now own a little machine that's online 24/7.

But it really is just a *little* machine. With 2 cores and 1.6GB RAM (about 672MB actually usable, with Swap enabled), it's great for practice and light services, but not for heavy tasks like local models, Nextcloud, or video transcoding.

This post is my actual configuration log. The server has been running for over a month, currently with 14 containers, using 765MB RAM + 987MB Swap, and 21GB / 40GB disk space.

## First, Get the Basic Setup Done

Don't rush to install services.

After you get the server, do these things first:

- SSH key login
- Disable password login
- Change to a non-default SSH port
- Configure security groups and UFW
- Set up Alibaba Cloud cost alerts (CDT traffic)
- Create a unified service directory
- Install Docker and Docker Compose

For the first few steps, you can check out my previous post:

[I Just Wanted My Bot Online 24/7, So I Bought a Cloud Server](/posts/sayori-server-01-vps-start/)

I put my service directories in `/root/sayori/`, managed uniformly with a big `docker-compose.yml`. You can also have a directory for each service:

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

Each directory gets a `docker-compose.yml`, with real keys in `.env`. Don't put them in public repositories.

## Services I'm Currently Running

### 🔐 Vaultwarden (Password Manager, Most Important)

**Purpose:** Personal password manager

**Why run it first:**

- A password manager is more important than a blog, status page, or bots.
- Lightweight, low memory usage.
- Mature client ecosystem; official Bitwarden clients work on phones, computers, and browsers.
- Supports paid Bitwarden features (2FA storage, password health check).

**Key considerations:**

- Close `SIGNUPS_ALLOWED` after the first registration.
- Must configure HTTPS (Cloudflare Tunnel or Caddy).
- Regular backups, regular recovery drills.
- Don't expose it directly to the public internet.

**Memory usage:** ~50MB

**Detailed tutorial:** [[selfhost-vaultwarden-on-2c2g|Setting up Vaultwarden on a 2C2G Student Server]]

---

### 📢 ntfy (Push Notifications, Second Most Important)

**Purpose:** Send myself push notifications

When backup scripts, monitoring scripts, or scheduled tasks run on the server, someone needs to tell you if they fail. ntfy is perfect for this.

**What I use it for:**

- Backup success/failure notifications
- Gatus health check alerts
- Comment moderation results push
- Manually trigger some ops commands (via ntfy → script linkage)

**Key considerations:**

- Set access control; don't let strangers send messages to your topic.
- Use Cloudflare Access to protect the admin backend.

**Memory usage:** ~20MB

---

### 📊 Gatus (Status Page and Health Checks)

**Purpose:** Monitor your services

It can periodically check if your blog, Vaultwarden, bot panel, or API are still alive. If something goes down, it notifies you via ntfy.

**Endpoints I monitor:**

- `sayori.org` Blog
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus itself
- `ntfy.sayori.org` ntfy
- Fast Note Sync API

**Key considerations:**

- Configuration files are in YAML; don't mess up the indentation.
- Exposed via Cloudflare Tunnel, protected by Access.
- Notification channel integrated with ntfy.

**Memory usage:** ~15MB

---

### 📝 Fast Note Sync (Obsidian Sync)

**Purpose:** Private sync for Obsidian

If you, like me, use Obsidian for blogging, project notes, and drafts, this service is very appealing. It's cheaper than Obsidian Sync (free) and less hassle than Syncthing (no need for multiple devices to be online simultaneously).

**Key considerations:**

- Regularly back up the data directory.
- Don't put huge files (images, videos) in it.
- Handle sync conflicts manually.

**Memory usage:** ~30MB

**Detailed tutorial:** [[fast-note-sync-on-student-server|Tinkering with Fast Note Sync on a Student Server]]

---

### 🤖 AstrBot + NapCat (QQ Bot)

**Purpose:** 24/7 online QQ/Telegram/Discord bot

With it on a remote server, I can finally run bots 24/7 without interruption. It can connect to Discord and Telegram, which generally have no risk control issues.

**QQ integration notes:**

- New accounts are prone to risk control; it's recommended to 'age' the account.
- Don't use a newly created alt account right away (learned that the hard way).
- NapCat requires periodic QR code login.

**Memory usage:** AstrBot ~100MB, NapCat ~150MB

---

### 🔍 AI Search Gateway (Search Gateway)

**Purpose:** Self-hosted AI search aggregation gateway

Integrates Tavily, Brave Search, Firecrawl, Exa, Grok Search, and SearXNG, built with FastAPI. Used by Codex and Claude Code MCP, more convenient than calling APIs individually.

**Key considerations:**

- Only listen on `127.0.0.1:8000`, do not expose to the public internet.
- Call locally via SSH port forwarding + MCP.
- Put API Keys in environment variables.

**Memory usage:** ~100MB (including Redis and SearXNG)

---

### 🛡️ Comment Moderation

**Purpose:** AI moderation for blog comments

Automatically moderates Twikoo comments using public GPT quotas, with ntfy pushing moderation results. You can manually delete and restore comments by sending messages in ntfy.

With Cloudflare Turnstile human verification added, the comments that remain are generally high quality.

**Memory usage:** ~40MB

---

### 🌐 Cloudflared (Cloudflare Tunnel)

**Purpose:** Expose local services to the public internet without opening 80/443

All my public services go through Cloudflare Tunnel:

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel (must configure Cloudflare Access)

**Advantages:**

- No need to open origin server ports.
- Automatic HTTPS.
- Can configure Access for authentication.

**Memory usage:** ~30MB

---

### 🎛️ 1Panel (Docker Management Panel)

**Purpose:** Web interface to manage Docker containers

Good for beginners to check container status, and also for temporary troubleshooting.

**Security warning:**

- Must go through Cloudflare Tunnel + Access, or at least reverse proxy with HTTPS and a strong password.
- This can control all your containers.
- Don't expose it directly to the public internet.

**Memory usage:** ~80MB

---

### Other Auxiliary Services

- **Mihomo**: Proxy client, provides proxy for services that need it.
- **Redis**: For caching in the Search Gateway.

## Current Memory Usage (Real Data)

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**Conclusion:**

- 1.6GB RAM, 765MB used, 987MB Swap used.
- 14 containers, reasonable memory usage.
- High Swap usage indicates memory is indeed tight, but it's still holding up.
- Don't add any more heavy services.

## Services Not Recommended for 2C2G

These either hog memory, CPU, or storage; a 2C2G machine can't handle them:

### ❌ Nextcloud / OwnCloud

**Why not recommended:**

- High memory usage (PHP-FPM + database + Redis).
- File uploads/downloads consume bandwidth and I/O.
- Large file previews consume CPU.
- Frequent sync conflicts.

**Alternatives:**

- Lightweight file sync: Fast Note Sync (text only), Syncthing.
- Cloud storage: Cloudflare R2 + Rclone.

---

### ❌ Plex / Jellyfin / Emby

**Why not recommended:**

- Video transcoding consumes CPU and memory.
- Media library scanning consumes I/O.
- 40GB disk can't hold many movies.

**Alternatives:**

- Use a dedicated NAS or media server.
- Or just use online streaming services.

---

### ❌ GitLab

**Why not recommended:**

- Memory usage starts at 4GB.
- A 2C2G machine simply cannot run it.

**Alternatives:**

- GitHub / Gitea / Forgejo.
- Gitea is much lighter, but still needs 512MB+ RAM.

---

### ❌ Mastodon / Misskey

**Why not recommended:**

- Federated social servers consume memory and database resources.
- Media storage occupies disk space.

**Alternatives:**

- Just use a public instance and register an account.

---

### ❌ Local Large Models (Ollama / LM Studio)

**Why not recommended:**

- 2 cores will make inference painfully slow.
- 1.6GB RAM isn't enough for any useful models.

**Alternatives:**

- Use public quotas: AnyRouter, SharedChat.
- Use student coupons: Alibaba Cloud Bailian.
- See also: [How College Students Can Manage AI Quotas with AnyRouter, SharedChat, and cc-switch](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress (Not that it *can't* run, but it's not recommended)

**Why it's not really recommended:**

- PHP + MySQL consume memory.
- More plugins mean more consumption.
- Static blogs (Astro / Hugo) offer better performance.

**If you absolutely must run it:**

- Use Caddy + PHP-FPM + SQLite.
- Install fewer plugins.
- Configure Cloudflare CDN.

## Recommended Learning Order

I'd arrange it like this:

1.  **Basic setup**: SSH, security groups, Docker, cost alerts.
2.  **Domain and HTTPS**: Free domain + Cloudflare DNS + Cloudflare Tunnel.
3.  **Core services**: Vaultwarden (password manager) + ntfy (notifications) + Gatus (monitoring).
4.  **Add as needed**: Fast Note Sync, bots, other tools.

Don't install 10 services all at once. Take them one by one; add the next only after each is running stably.

## Related Resources

**Self-hosted service discovery:**

- awesome-selfhosted: [https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**Projects mentioned in this article:**

- Vaultwarden: [https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync: [https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy: [https://ntfy.sh/](https://ntfy.sh/)
- Gatus: [https://gatus.io/](https://gatus.io/)
- AstrBot: [https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` is good for finding "what else can I self-host." `awesome-cloudflare` is good for finding "what can be put on Cloudflare instead of a VPS."

A personal server isn't meant to carry everything. If Cloudflare Pages, Workers, R2, or Tunnel can do it, don't force your 2GB RAM machine to struggle.

---

## Finally

A 2C2G server is best suited as a "starting point for personal everyday services."

It lets you:

- Get familiar with Linux, Docker, reverse proxies, domains, HTTPS.
- Run a few lightweight but useful services.
- Develop habits for backups, security, and monitoring.

It won't let you:

- Run heavy services.
- Use it as a production server.
- Replace a professional NAS or media server.

But that's enough.

A server isn't "set it and forget it." It forces you to take backups, security, and monitoring seriously. Which is actually a good thing.
