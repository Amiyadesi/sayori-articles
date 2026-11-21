---
title: "Introduction minimale à Docker et Docker Compose : comprendre ces fichiers yml"
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: "Une introduction minimale à Docker pour les débutants qui viennent de recevoir leur serveur : qu'est-ce qu'un conteneur, comment lire un fichier Compose, comment lancer, arrêter, mettre à jour et supprimer. Pas de théorie, que du pratique."
image: ""
tags:
  - Tutoriel pratique
  - Docker
  - VPS et auto-hébergement
  - Débutant
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: "posts/docker-compose-minimum-start/docker-compose-minimum-start"
---

Si vous lisez mes autres articles, vous remarquerez que presque tous les services auto-hébergés tournent sur Docker.

Vaultwarden, ntfy, Gatus, Fast Note Sync, tout cela fonctionne avec un simple fichier `docker-compose.yml`.

Cet article explique : comment installer Docker une fois que vous avez votre serveur, comment comprendre un fichier compose, et comment démarrer, arrêter, mettre à jour ou supprimer des conteneurs. C'est tout ce qu'il vous faut pour faire tourner tous les services précédents.

## Qu'est-ce que Docker (en une phrase)

Docker vous permet de faire tourner des services directement grâce à des « images » préparées par d'autres, sans avoir à installer les dépendances une par une sur votre système.

Pas besoin d'installer manuellement Python, Go, Node, de configurer des variables d'environnement ou de gérer des conflits de versions. Tout est déjà dans l'image.

Un `docker-compose.yml` est simplement un fichier de configuration qui indique à Docker :

- Quelle image télécharger
- Quels ports utiliser
- Quels répertoires monter
- Quelles variables d'environnement définir
- S'il faut redémarrer automatiquement en cas de plantage

## Installation

Pour installer Docker sur Ubuntu / Debian :

```bash
curl -fsSL https://get.docker.com | sh
```

Ce script d'installation automatique installe Docker Engine et Docker Compose (maintenant que compose est une sous-commande de Docker, il n'est plus nécessaire d'installer `docker-compose` séparément).

Vérifiez l'installation avec :

```bash
docker --version
docker compose version
```

Si vous ne souhaitez pas utiliser `sudo` pour lancer Docker :

```bash
sudo usermod -aG docker $USER
```

Ensuite, déconnectez-vous et reconnectez-vous. Si cela ne fonctionne toujours pas, redémarrez le serveur.

## Votre premier fichier compose

Prenons l'exemple le plus simple possible :

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

Traduction ligne par ligne :

| Ligne | Signification |
| --- | --- |
| `services:` | Définit la liste des services ci-dessous |
| `whoami:` | Nom du service, que vous choisissez librement |
| `image: traefik/whoami` | Utilise cette image |
| `container_name: whoami` | Nomme le conteneur whoami |
| `restart: unless-stopped` | Redémarre automatiquement en cas de crash, sauf si vous l'arrêtez manuellement |
| `ports: - "127.0.0.1:8080:80"` | Mappe le port 8080 de la machine hôte vers le port 80 du conteneur |

Enregistrez ce bloc sous le nom `docker-compose.yml` (ou `compose.yml`, les deux fonctionnent), puis exécutez ceci dans le même dossier :

```bash
docker compose up -d
```

`-d` permet de l'exécuter en arrière-plan.

Vérification :

```bash
curl http://127.0.0.1:8080/
```

Si vous voyez une réponse s'afficher, c'est que ça tourne.

## Commandes courantes

Voici les plus utiles :

```bash
# 启动（后台）
docker compose up -d

# 查看日志
docker compose logs -f

# 查看日志（只看最后 100 行）
docker compose logs --tail=100

# 停止
docker compose down

# 重启
docker compose restart

# 查看状态
docker compose ps

# 进入容器内部（排查问题时用）
docker compose exec whoami sh
```

Toutes ces commandes doivent être exécutées dans le répertoire où se trouve `docker-compose.yml`.

## Comprendre un vrai fichier compose

Prenons l'exemple de Vaultwarden :

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

Nouveautés :

| Champ | Signification |
| --- | --- |
| `environment:` | Variables d'environnement, équivalentes à des options de configuration |
| `volumes: - ./vw-data:/data` | Monte le dossier `vw-data` du répertoire courant vers `/data` à l'intérieur du conteneur |

### environment

Les variables d'environnement sont la méthode de configuration de la plupart des services Docker.

Chaque service utilise des variables différentes. Par exemple, Vaultwarden utilise `DOMAIN`, `SIGNUPS_ALLOWED` ; ntfy utilise `NTFY_BASE_URL`, `NTFY_AUTH_DEFAULT_ACCESS`.

Consultez la documentation de chaque projet pour connaître les variables qu'il prend en charge.

### volumes

Les volumes sont indispensables pour la persistance des données.

Une fois qu'un conteneur est supprimé, ses fichiers internes disparaissent. Mais les répertoires montés via volumes résident sur la machine hôte et ne disparaissent pas avec le conteneur. C'est un peu comme une sauvegarde de jeu vidéo : chaque démarrage de conteneur revient à charger sa partie et reprendre (rire).

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

Cela signifie que :

- Les fichiers situés dans `/data` à l'intérieur du conteneur sont en réalité stockés dans `./vw-data` sur la machine hôte.
- Si vous supprimez le conteneur et le recréez, vos données sont toujours là.
- Pour faire une sauvegarde, il suffit de sauvegarder le dossier `./vw-data` de l'hôte.

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1` signifie que seul l'hôte local peut y accéder. L'extérieur ne peut pas s'y connecter.

Si vous écrivez `"0.0.0.0:8080:80"` ou `"8080:80"`, l'accès direct depuis le web public est également possible.

Pour les coffres-forts de mots de passe, les panneaux d'administration et autres services sensibles, utilisez toujours `127.0.0.1`, puis exposez-les en HTTPS via un proxy inverse ou un Tunnel.

## Utiliser un fichier .env pour les informations sensibles

N'écrivez pas vos mots de passe, jetons (tokens) ou noms de domaine directement dans `docker-compose.yml` pour les pousser ensuite sur GitHub.

Créez un fichier `.env` dans le même dossier :

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

Référencez-le ensuite dans le fichier compose :

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

Ajoutez le fichier `.env` à votre `.gitignore` pour qu'il ne se retrouve pas dans le dépôt.

## Mettre à jour un service

Pour mettre à jour un service :

```bash
cd /srv/stacks/vaultwarden

# 先备份数据
tar -czf backup-$(date +%F).tar.gz vw-data

# 拉新镜像
docker compose pull

# 用新镜像重启
docker compose up -d

# 看日志确认正常
docker compose logs --tail=50
```

Faites toujours une sauvegarde avant de mettre à jour. En cas de problème, vous pourrez ainsi faire un retour en arrière.

## Supprimer un service

Si vous ne voulez plus d'un service :

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down` supprime uniquement le conteneur, pas les données des volumes.

Si vous souhaitez tout nettoyer, y compris les volumes :

```bash
docker compose down -v
```

Mais attention, cela supprime les données. Assurez-vous de n'en avoir vraiment plus besoin.

## Nettoyer le disque

À force d'utiliser Docker, de vieilles images s'accumulent. Le disque d'un VPS 2C2G n'est pas très grand, pensez à faire le ménage de temps en temps :

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

`prune` ne nettoie que ce qui n'est pas utilisé ; les services en cours d'exécution ne sont pas affectés. Réfléchissez bien avant d'utiliser `--volumes`, par contre.

## Ma structure de répertoires

J'ai pris l'habitude de m'organiser ainsi :

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

Un dossier par service. Il suffit d'entrer dans le dossier pour faire `docker compose up -d`. Les données et la configuration restent dans leur propre dossier, ce qui facilite les sauvegardes.

## Problèmes fréquents

**Conflits de ports**

Deux services ne peuvent pas utiliser le même port sur la machine hôte. Si Vaultwarden utilise le port 8080, ntfy doit en utiliser un autre, par exemple 8090.

**Problèmes de permissions**

Certaines images s'exécutent avec un utilisateur non-root à l'intérieur du conteneur. Des permissions incorrectes sur le dossier monté empêcheront l'écriture. Vérifiez alors le propriétaire et les permissions du dossier sur la machine hôte.

**Oubli de -d**

Si vous lancez `docker compose up` sans l'option `-d`, le service s'arrêtera dès que vous fermerez le terminal. Pensez à ajouter `-d`.

**compose v1 vs v2**

Les vieux tutos écrivent `docker-compose up` (avec un tiret), ce qui correspond à la v1. On utilise désormais `docker compose up` (avec un espace) pour la v2. Les systèmes nouvellement installés sont tous en v2. Si vous tombez sur un vieux tuto avec un tiret, remplacez-le simplement par un espace.

## C'est suffisant pour commencer

À ce stade, vous savez :

- Installer Docker
- Comprendre un fichier compose
- Démarrer, arrêter, mettre à jour et supprimer des services
- Gérer les données et la configuration
- Nettoyer le disque

Pour chaque article suivant sur les services auto-hébergés, il me suffira de vous donner un `docker-compose.yml` pour que vous puissiez le lancer.

Pas besoin de comprendre tous les concepts de Docker dès le départ. Essayez d'abord de faire fonctionner les choses, et avec l'usage, vous aurez naturellement envie d'en savoir plus.

## Pour aller plus loin

Commencez par choisir une utilisation dans la [[2c2g-server-service-index|liste des services pour petit serveur]], puis lancez [[selfhost-ntfy-on-2c2g|les notifications ntfy]], [[selfhost-vaultwarden-on-2c2g|le coffre-fort Vaultwarden]] ou [[fast-note-sync-on-student-server|la synchronisation Obsidian]], et connectez le tout à votre domaine via [[cloudflare-free-tier-developer-guide|Cloudflare]].
