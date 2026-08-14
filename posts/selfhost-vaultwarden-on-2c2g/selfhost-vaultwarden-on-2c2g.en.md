---
title: "Setting up Vaultwarden on a 2C2G Student Server: Don't Let Your Password Vault Run Naked"
published: 2026-06-22
created: 2026-06-22
updated: 2026-08-14
lastEdited: 2026-08-14
updateCount: 1
description: "Deploying Vaultwarden with Docker Compose on a student server, and clearly explaining the truly important parts: HTTPS, disabling registration, backup, and recovery drills."
image: ""
tags:
  - Vaultwarden
  - Docker
  - Password Management
category: Website Building & Self-Hosting
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "Deploying Vaultwarden with Docker Compose on a student server"
    - "HTTPS and disabling public registration are more important than just getting it installed"
    - "Treat backup and recovery drills as part of the go-live process"
alias: ""
lang: en
translationKey: posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g
---

Vaultwarden is probably one of the most suitable services for a small 2C2G server.

It's lightweight, and its client ecosystem is mature; phones, computers, and browser extensions can all connect directly using official Bitwarden clients.

But it's also one of the services I least recommend just messing around with.

If your blog breaks, you can rebuild it. But if your password vault goes south, you lose accounts, 2FA, panel passwords, and even access to all your subsequent servers.

So, this post isn't about fancy tricks; it's about a practical approach that's good enough:

1. Get it running with Docker Compose
2. Expose it only via HTTPS
3. Disable registration immediately after signing up
4. Don't procrastinate on backup and recovery

Official Project:

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Compose Documentation:

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## Who It's For

I think it's suitable for these people:

- Already have their own small server
- Want to keep their password data in their own hands
- Are willing to deal with the dirty work of HTTPS, backups, and updates

If you just want peace of mind, then official Bitwarden hosting, 1Password, or Apple Password Manager are all great options.

Vaultwarden's advantage isn't zero maintenance, but rather that it's lighter, more flexible, and better suited for a poor student's small machine.

## What You'll Need

- A VPS capable of running Docker
- A domain, or at least a stable HTTPS entry point
- Docker and Docker Compose
- Basic knowledge of SSH, reverse proxies, and firewalls

If you haven't installed Docker yet, you can check out [[docker-compose-minimum-start|Docker and Docker Compose Minimum Introduction: Understanding those YML files]] first.

If you haven't set up a domain yet, you can check out [[free-domain-and-web-community|Get a Free Domain for Your New Blog, Then Show Your Face in the Webmaster Community]] first.

## Create Directories

I'll still put it in `/srv/stacks` here.

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

The directory structure will look something like this:

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

Later, the database, attachments, and other stuff will all be in `vw-data`.

## First, Write the Compose File

```yaml
services:
  vaultwarden:
    image: ghcr.io/dani-garcia/vaultwarden:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true"
      INVITATIONS_ALLOWED: "false"
      ENABLE_WEBSOCKET: "true"
      TZ: "Asia/Shanghai"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

Replace `vault.example.com` with your own domain.

The most important line here is:

```text
127.0.0.1:8080:80
```

This means Vaultwarden only listens on `8080` on the local machine.

The public internet won't hit it directly; it can only be routed through Nginx, Caddy, or Cloudflare Tunnel.

Don't just write it like this from the start:

```text
0.0.0.0:8080:80
```

Having your password vault directly exposed on a public HTTP port is a no-go.

A quick word on a few variables:

- `DOMAIN`: The actual HTTPS address you'll access.
- `SIGNUPS_ALLOWED`: Temporarily enable it for the first registration, then turn it off.
- `INVITATIONS_ALLOWED`: Directly disable it for personal use.
- `ENABLE_WEBSOCKET`: Keep it enabled; client sync experience will be smoother.

## Start It Up

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

Check it locally:

```bash
curl -I http://127.0.0.1:8080/
```

If it returns a status code, the container is alive.

But that's not the end of the setup, because what's truly important is HTTPS.

## Reverse Proxy and HTTPS

You shouldn't run something like Vaultwarden on HTTP long-term.

Browser security contexts, password manager clients, and your own peace of mind all demand that you get HTTPS right.

I usually choose one of two paths.

### Option A: Caddy / Nginx

Suitable if your domain points directly to the server and you're willing to open ports 80 and 443.

Caddy is the easiest:

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

It handles certificates automatically.

Nginx works too; the core idea is the same: route `https://vault.example.com` to `127.0.0.1:8080`.

```nginx
server {
    listen 80;
    server_name vault.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vault.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        client_max_body_size 525M;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Don't forget to check after making changes:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Option B: Cloudflare Tunnel

If you don't want your origin server to directly expose ports 80 and 443, then Tunnel is more comfortable.

The structure is:

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

I personally lean towards this path because the origin server is a bit quieter.

However, there's a pitfall here: don't put Cloudflare Access login pages in front of the entire Vaultwarden instance.

Browser extensions and mobile clients might not handle that setup well.

If you really want to add extra protection, prioritize protecting only `/admin`.

## Disable Registration Immediately After First Signup

After opening `https://vault.example.com` for the first time, set up your main account.

Once done, immediately change the configuration:

```yaml
SIGNUPS_ALLOWED: "false"
```

Then restart:

```bash
docker compose up -d
```

Don't think your domain is obscure; public services will eventually be scanned.

## What to Do After Setting Up Your Account

- Set a truly strong master password.
- Enable two-factor authentication.
- Only import passwords after confirming HTTPS is working correctly.
- Before importing, export an offline backup from your old password manager.

And here's a very realistic point:

Don't carelessly throw server SSH keys, panel passwords, and various root-level credentials into a password vault without a clear backup strategy.

Set it up first, then migrate gradually.

## Backup

Vaultwarden's most important data is right here:

```text
/srv/stacks/vaultwarden/vw-data
```

The simplest approach is to first let it perform an internal backup, then package the entire directory.

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

If you're using things like `.env`, SMTP, or admin tokens, back those up too, but don't put them in a public repository.

Then pull the backup back to your local machine, or sync it to another server.

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

Don't just keep it on the same server.

On-server backups often amount to no backup at all.

## Recovery Drill

Only knowing how to back up, but not how to restore, is actually quite dangerous.

You should at least occasionally check if there's anything inside the backup package:

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

Normally, you should see:

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

When actually restoring, first stop the service, then move the old data aside:

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

After restoring, check at least four things:

- The web page can be opened.
- You can log in.
- Entries are still there.
- Browser extensions and mobile clients can sync.

Don't wait until things actually blow up to learn how to restore for the first time.

## Updates

Back up before updating; don't be lazy about this.

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

After updating, don't just look at the logs; click around on the web interface and client yourself to test it.

## Is It Suitable for 2C2G?

Very suitable.

Vaultwarden itself doesn't consume much in terms of resources; a 2C2G server can run it easily.

The real cost isn't in CPU and memory, but in maintenance habits:

- HTTPS
- Disabling registration
- Backups
- Recovery
- Updates

If you just want a service to screenshot and post on social media, then this isn't for you.

If you want to seriously start your self-hosting journey, it's actually very suitable as your first serious service.

Because a password vault will force you to complete many fundamental habits.
