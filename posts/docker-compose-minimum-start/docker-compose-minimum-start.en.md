---
title: "Docker and Docker Compose Minimum Start: Understanding Those YML Files"
published: 2026-06-23
created: 2026-06-23
updated: 2026-08-14
lastEdited: 2026-08-14
updateCount: 1
description: "A minimum start guide to Docker for those who just got a server: what containers are, how to read Compose files, how to start, stop, update, and delete them. No theory, just practical usage."
image: ""
tags:
  - Docker
  - Beginner's Guide
category: Website Building and Self-Hosting
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "Understand containers and Docker Compose with minimal concepts"
    - "Understand services, ports, volumes, and environment variables in yml"
    - "Cover common operations like starting, stopping, updating, and deleting"
alias: ""
lang: en
translationKey: posts/docker-compose-minimum-start/docker-compose-minimum-start
---

If you've read my other articles, you'll notice almost every self-hosted service runs on Docker.

Vaultwarden, ntfy, Gatus, Fast Note Sync—all handled by a single `docker-compose.yml` file.

This post will cover: how to install Docker after getting a server, how to understand Compose files, and how to start, stop, update, and delete containers. Just enough to get all those services running.

## What is Docker (One-Sentence Version)

Docker lets you run services directly using pre-packaged "images," so you don't have to install dependencies one by one on your system.

You don't need to manually install Python, Go, Node, configure environment variables, or deal with version conflicts. Everything's already in the image.

`docker-compose.yml` is just a configuration file that tells Docker:

- Which image to pull
- Which ports to use
- Which directories to mount
- Which environment variables to set
- Whether to automatically restart if it crashes

## Installation

Install Docker on Ubuntu / Debian:

```bash
curl -fsSL https://get.docker.com | sh
```

This one-liner script installs Docker Engine and Docker Compose (Compose is now a Docker subcommand, no need to install `docker-compose` separately).

Check after installation:

```bash
docker --version
docker compose version
```

If you don't want to run Docker with `sudo`:

```bash
sudo usermod -aG docker $USER
```

Then log out and log back in. If it still doesn't work, restart the server.

## Your First Compose File

Let's look at the simplest example:

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

Line by line translation:

| Line | Meaning |
| --- | --- |
| `services:` | Defines the list of services below |
| `whoami:` | Service name, can be anything |
| `image: traefik/whoami` | Use this image |
| `container_name: whoami` | Container named whoami |
| `restart: unless-stopped` | Auto-restart if it crashes, unless you stop it manually |
| `ports: - "127.0.0.1:8080:80"` | Map local port 8080 to container port 80 |

Save this snippet as `docker-compose.yml` (or `compose.yml`, either name works), then run it in the same directory:

```bash
docker compose up -d
```

`-d` means run in the background.

Check:

```bash
curl http://127.0.0.1:8080/
```

If you see a response, it means it's running.

## Common Commands

I've listed the most common ones here:

```bash
# Start (in background)
docker compose up -d

# View logs
docker compose logs -f

# View logs (last 100 lines only)
docker compose logs --tail=100

# Stop
docker compose down

# Restart
docker compose restart

# View status
docker compose ps

# Enter container (for troubleshooting)
docker compose exec whoami sh
```

All commands must be executed in the directory where `docker-compose.yml` is located.

## Understanding Real Compose Files

Let's take Vaultwarden as an example:

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

New things that appeared:

| Field | Meaning |
| --- | --- |
| `environment:` | Environment variables, like configuration options |
| `volumes: - ./vw-data:/data` | Mount the `vw-data` folder in the current directory to `/data` inside the container |

### environment

Environment variables are how most Docker services are configured.

Different services have different variables, for example, Vaultwarden uses `DOMAIN`, `SIGNUPS_ALLOWED`, while ntfy uses `NTFY_BASE_URL`, `NTFY_AUTH_DEFAULT_ACCESS`.

Check each project's documentation to find out which variables it supports.

### volumes

Volumes are key for data persistence.

When a container is deleted, its internal files disappear. But directories mounted as volumes reside on the host machine and won't disappear with the container. It's like a game save file; every time you start the container, you're loading a save and starting the game (lol).

```text
./vw-data:/data
  ↑              ↑
  Host directory Container path
```

This means:

- Files under `/data` in the container actually exist in `./vw-data` on the host.
- If you delete and recreate the container, your data is still there.
- To back up, you just need to back up the host's `./vw-data`.

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  Listen address Host port  Container port
```

`127.0.0.1` means only the local machine can access it. No outside connections can get in.

If you write `"0.0.0.0:8080:80"` or `"8080:80"`, then it's directly accessible from the public internet.

For things like password managers or admin panels, always start with `127.0.0.1`, then expose HTTPS using a reverse proxy or tunnel.

## Using .env Files for Sensitive Information

Don't write passwords, tokens, or domains directly into `docker-compose.yml` and then push it to GitHub.

Create a `.env` file in the same directory:

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

Then reference it in your Compose file:

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

Add the `.env` file to `.gitignore` so it doesn't get committed to the repository.

## Updating Services

To update a service:

```bash
cd /srv/stacks/vaultwarden

# First, back up your data
tar -czf backup-$(date +%F).tar.gz vw-data

# Pull the new image
docker compose pull

# Restart with the new image
docker compose up -d

# Check logs to confirm it's working
docker compose logs --tail=50
```

Always back up before updating. If something goes wrong, you can still roll back.

## Deleting Services

If you no longer want a service:

```bash
# Stop and delete containers
docker compose down

# If you're sure you don't need the data, delete the directory
rm -rf /srv/stacks/那个服务
```

`docker compose down` only deletes containers, not volume data.

If you want to completely clean up, including volumes:

```bash
docker compose down -v
```

But this will delete data. Only use it when you're sure you don't need it.

## Cleaning Up Disk Space

Over time, Docker accumulates many old images. A 2C2G disk isn't huge, so clean it up occasionally:

```bash
# See how much space Docker is using
docker system df

# Clean up unused images, containers, networks
docker system prune

# Also clean up unused volumes (be careful, this deletes data from orphaned volumes)
docker system prune --volumes
```

`prune` only cleans up unused items; running services are unaffected. But think carefully before using `--volumes`.

## My Directory Structure

I usually organize things like this:

```text
/srv/stacks/
├── vaultwarden/
│   ├── docker-compose.yml
│   ├── .env
│   └── vw-data/
├── ntfy/
│   ├── docker-compose.yml
│   ├── .env
│   ├── cache/
│   ├── data/
│   └── etc/
├── gatus/
│   ├── docker-compose.yml
│   └── config/
└── fast-note-sync/
    ├── docker-compose.yml
    ├── .env
    └── storage/
```

Each service gets its own directory. Just `cd` into it and run `docker compose up -d`. Data and configurations are all within their own directories, making backups easy.

## Common Issues

**Port Conflicts**

Two services cannot use the same host port. If Vaultwarden uses 8080, ntfy will need to use a different one, like 8090.

**Permission Issues**

Some images run with non-root users inside the container, and incorrect permissions on mounted directories can prevent writing. In such cases, check the owner and permissions of the host directory.

**Forgetting -d**

If you run `docker compose up` without `-d`, the service will stop when you close the terminal. Remember to add `-d`.

**compose v1 vs v2**

Older tutorials might show `docker-compose up` (with a hyphen) which is v1. Nowadays, `docker compose up` (with a space) is v2. Newly installed systems will use v2, so if you see an old tutorial with a hyphen, just replace it with a space.

## That's Enough (for now)

By now, you should be able to:

- Install Docker
- Understand Compose files
- Start, stop, update, and delete services
- Manage data and configurations
- Clean up disk space

For every self-hosted service article going forward, I'll just give you a `docker-compose.yml`, and you'll be able to get it running.

No need to understand all Docker concepts from the start. Just get it working, and as you use it more, you'll naturally want to learn more.
