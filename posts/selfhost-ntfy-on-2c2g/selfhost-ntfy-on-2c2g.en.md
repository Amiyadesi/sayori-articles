---
title: "Running ntfy on a 2C2G Student Server: Giving Myself a Notification Button"
published: 2026-06-22
created: 2026-06-22
updated: 2026-08-14
lastEdited: 2026-08-14
updateCount: 1
description: Deploy ntfy push service with Docker on a student server, so backup scripts, monitoring, and scheduled tasks can all send notifications to your phone.
image: ""
tags:
  - ntfy
  - Docker
  - Push Notifications
  - Server Exploration
  - Self-hosting
category: Server Exploration
draft: false
alias: ""
lang: en
translationKey: posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g
---

ntfy is one of the most inconspicuous yet useful services on my server.

It does something very simple: you send it a message via an HTTP request, and it pushes that message to your phone.

No complex configuration interface, no fancy dashboards. Just a push pipeline.

But this pipeline has more uses than you might imagine:

- Backup script finished, tells you if it succeeded or failed.
- Server cost alert triggered, notifies you to check it out.
- Scheduled task failed, sends you a push.
- Gatus monitoring found a service down, notifies you.
- Certificate is about to expire, reminds you.
- You can also customize some commands to send for remote, temporary control.

Official project:

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

Official documentation:

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## Why Self-Host?

ntfy has an official public server, `ntfy.sh`, which you can use without installing anything.

But I still chose to self-host, because:

- Topics on the public server are public. Anyone who knows your topic name can send messages to it.
- Self-hosting allows for user authentication.
- Self-hosting allows control over retention and logs.
- My student server has space anyway, and ntfy is very lightweight.

If you're just trying it out temporarily, using the public `ntfy.sh` is perfectly fine. But for long-term use, self-hosting is more reliable.

## Deployment

Prepare the directory:

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

Write `docker-compose.yml`:

```yaml
services:
  ntfy:
    image: binwiederhier/ntfy
    container_name: ntfy
    restart: unless-stopped
    command: serve
    environment:
      TZ: Asia/Shanghai
      NTFY_BASE_URL: "https://ntfy.example.com"
      NTFY_AUTH_DEFAULT_ACCESS: "deny-all"
    volumes:
      - ./cache:/var/cache/ntfy
      - ./data:/var/lib/ntfy
      - ./etc:/etc/ntfy
    ports:
      - "127.0.0.1:8090:80"
```

A few key points:

- Port `127.0.0.1:8090:80`: Only listens on localhost. Do not expose directly to the public internet.
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`: Denies all unauthenticated requests by default. This means only you (with a token or username/password) can send and receive.
- `NTFY_BASE_URL`: Fill in the domain you'll eventually use, for example, I use `ntfy.sayori.org`.

## Start

```bash
docker compose up -d
docker compose logs -f
```

Local check:

```bash
curl http://127.0.0.1:8090/
```

You should see ntfy's Web interface responding.

## Create User

Since we set `deny-all`, we need to create a user for ourselves:

```bash
docker compose exec ntfy ntfy user add --role=admin your_username
```

It will ask you to enter a password. Remember this username and password; you'll need it later for sending notifications and the mobile app.

You can also generate a token:

```bash
docker compose exec ntfy ntfy token add your_username
```

Tokens are more convenient than passwords; you can just include them in the header in scripts.

## Connect Domain

Similar to Vaultwarden, use Cloudflare Tunnel or Caddy/Nginx reverse proxy.

Cloudflare Tunnel route:

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

After confirming HTTPS access is working, open `https://ntfy.example.com` and log in to the Web interface with the account you just created.

## Send Your First Notification

The simplest way:

```bash
curl -H "Authorization: Bearer $NTFY_TOKEN" \
     -d "Server is still alive" \
     https://ntfy.example.com/test
```

Here, `/test` is the topic name. You can name it anything you like, such as `/backup`, `/alert`, `/server`.

You can also include a title and priority:

```bash
curl -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: Backup Complete" \
     -H "Priority: default" \
     -d "Vaultwarden backup successful, size 2.3MB" \
     https://ntfy.example.com/backup
```

## Mobile App

Android:

- ntfy client is available on F-Droid.
- Also on Google Play.

iOS:

- Search for ntfy in the App Store.

After opening the App:

1. In settings, add your self-hosted server address.
2. Enter your username and password or token.
3. Subscribe to your topics (e.g., `backup`, `alert`).

From now on, notifications sent from your server will be pushed to your phone.

## Use in Scripts

Add a line at the end of your backup script:

```bash
NTFY_URL="https://ntfy.example.com/backup"
NTFY_TOKEN="your_token"

# On successful backup
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ✅ Backup Successful" \
     -d "Vaultwarden backup completed $(date +%F)" \
     "$NTFY_URL"

# On failed backup
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ❌ Backup Failed" \
     -H "Priority: high" \
     -d "Vaultwarden backup error, please check logs" \
     "$NTFY_URL"
```

Scheduled task failure notification:

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: Scheduled Task Failed" \
     -H "Priority: high" \
     -d "$(hostname): some_command failed to execute" \
     "$NTFY_URL"
```

## Integrating with Gatus

If you're running Gatus for health checks, you can add ntfy as an alert channel in your Gatus configuration.

Gatus supports native ntfy alerts; just configure the server address, topic, and token.

This way, if a service goes down, Gatus will automatically send a notification to ntfy, and your phone will ring.

## Resource Usage

ntfy is very lightweight.

It's running on my server, usually consuming about 20-30MB of RAM. CPU usage is practically zero. For a 2C2G server, it's no burden at all.

It doesn't require a database. Messages are cached in local files and automatically expire after a certain period.

## Important Notes

- Do not write your ntfy token into public repositories.
- If you set `deny-all` but some external services (e.g., Gatus sending from the same machine) need to send notifications without authentication, you can open permissions for specific topics.
- Messages are not permanently retained. If you need historical records, the sender should log them itself.
- ntfy's Web interface does not need to be exposed to the public internet. The mobile app subscribes using the API.

## Is it suitable for a 2C2G server?

Absolutely. It might be one of the most cost-effective services for a 2C2G server.

Once installed, you'll find that almost every script's final step becomes "send me a notification with the result." This is much more comfortable than SSHing in to check logs every day.
