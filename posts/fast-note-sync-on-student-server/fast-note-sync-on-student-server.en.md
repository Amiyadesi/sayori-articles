---
title: "Tinkering with Fast Note Sync on a Student Server: A Private Sync Layer for Obsidian"
published: 2026-06-22
created: 2026-06-22
updated: 2026-08-14
lastEdited: 2026-08-14
updateCount: 1
description: Running Fast Note Sync Service on a 2C2G student server, carving out a private route for Obsidian multi-device sync, backup, and REST/MCP interfaces.
image: ""
tags:
  - Obsidian
  - Docker
  - Note Sync
category: Website Building & Self-Hosting
draft: false
lang: en
translationKey: posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "Running Fast Note Sync on a 2C2G student server"
    - "Carving out a private route for Obsidian multi-device sync and backup"
    - "Also leaving room to tinker with REST and MCP interfaces"
alias: ""

---

I write all my blog posts and project notes in Obsidian now, but I started writing everything on my computer. After accumulating a bunch of stuff, I realized I couldn't write on my phone, so I went looking for a sync service.

Official Obsidian Sync is certainly hassle-free, though your wallet might not be; Syncthing, Git, and WebDAV all have their own methods, but I found them inconvenient.

Eventually, I stumbled upon the Fast Note Sync plugin, which I saw mentioned in the comments while browsing L-station: it's an Obsidian plugin + self-hosted backend, aiming for real-time multi-device sync. It also conveniently adds version history, attachments, web management, REST API, MCP, and other features. After a few days of hands-on configuration, I found it genuinely excellent b(￣▽￣)d

Plugin:

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

Backend:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Obsidian Plugin Page:

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## Who it's for

I think it's suitable for these people:

-   Already writes a lot of content in Obsidian
-   Has a small server that's online 24/7
-   Willing to handle HTTPS, reverse proxy, and backups themselves
-   Wants to be able to write notes anytime, anywhere

This way, even if your computer isn't with you, you can easily write articles on your phone, and it'll sync up once you're back on your computer.

## Deploying the Backend

The backend repository is here:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

It's a Go-based backend, and the repository description states it's a high-performance, low-latency note sync, online management, and remote REST API service platform.

I'll start by creating directories:

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

Then, I'll deploy it according to the official documentation, choosing Docker, binary, or source compilation. Whichever method I pick, I'll try to make the service only listen on the local address, then expose HTTPS using a reverse proxy or Tunnel.

The idea is:

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

If using Docker Compose, at least keep these habits:

-   Persist data directories to the current service directory
-   Don't commit configuration files to public repositories
-   Don't directly expose service ports to the public internet
-   Back up data directories before updating

Your notes are in the sync service; it shouldn't be running exposed.

## Connecting a Domain

You can use Caddy / Nginx, or Cloudflare Tunnel.

For example, domain:

```text
notes.example.com
```

Structure:

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

If you don't have a domain yet, you can check out:

[[free-domain-and-web-community|Get a free domain for your new blog, then show your face in the webmaster community]]

I don't recommend direct access:

```text
http://服务器IP:<服务端口>
```

At least HTTPS, preferably with additional access protection.

## Initializing Account and Plugin

The process described in the backend README is roughly:

1.  Open the Web management interface
2.  Register an account on first visit
3.  Copy API configuration from the backend
4.  Paste the configuration into Obsidian plugin settings

Manually download `main.js`、`styles.css`、`manifest.json` from GitHub Releases and place them into:

```text
.obsidian/plugins/fast-note-sync/
```

Then go to the plugin page and activate it. You'll need to create and copy a token from the web interface, then paste it into the remote configuration. It usually starts up after a short while.

## Backup is More Important Than Sync

This sentence needs to be written separately. Sync will propagate deletions, and it will also propagate errors.

Fast Note Sync itself supports version history, recycle bin, backup, mirroring, Git sync, and other features, but you still need your own fallback plan.

If you're already syncing Obsidian with Git, don't immediately add another layer of real-time sync. First, figure out who is the primary sync and who is the backup.

## My Thoughts on MCP and REST API

Fast Note Sync Service now also offers REST API and MCP support.

This is very appealing to me. Because a lot of my content is in Obsidian, if AI clients can read and write notes through controlled interfaces in the future, then it won't just be a sync tool, but an entry point to my personal knowledge base.

But this also comes with risks.

If AI can read and write your notes, it means permission boundaries need to be clearer:

-   Don't expose the MCP interface to the public internet
-   Don't grant write permissions to untrusted clients
-   Don't mix private diaries, account information, or keys in an open Vault
-   For important Vaults, start with read-only access, and only consider write access after confirming the process.

'AI integration' is not a reason to immediately grant full permissions.

## Is it Resource-Intensive on a 2C2G Server?

For normal personal use, it should be fine.

What truly consumes resources are the number of attachments, sync frequency, and whether you're stuffing an entire multi-gigabyte asset library into Obsidian.
