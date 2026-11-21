---
title: "Héberger Vaultwarden sur un serveur étudiant 2C2G : ne laissez pas votre coffre-fort tourner en clair"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "Déployer Vaultwarden sur un serveur étudiant avec Docker Compose et expliquer les points vraiment importants : HTTPS, désactivation des inscriptions, sauvegardes et tests de restauration."
image: ""
tags:
  - Tuto pratique
  - VPS et auto-hébergement
  - Docker
  - Vaultwarden
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: "posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g"
---

Vaultwarden est probablement l'un des meilleurs services à installer sur un petit serveur 2C2G.

Il est léger, l'écosystème client est mature, et les applications officielles Bitwarden (mobile, ordinateur, extension de navigateur) peuvent s'y connecter directement.

Mais c'est aussi l'un des services que je vous déconseille le plus de tester à la va-vite.

Si votre blog plante, vous pouvez le reconstruire. Si votre coffre-fort de mots de passe plante, vous perdez vos identifiants, votre double authentification, vos mots de passe de tableaux de bord, et potentiellement les accès à tous vos serveurs futurs.

Cet article ne va donc pas s'attarder sur des fonctionnalités superflues, mais se concentrer sur une méthode simple et solide :

1. Le lancer avec Docker Compose
2. L'exposer uniquement en HTTPS
3. Fermer les inscriptions dès que votre compte est créé
4. Ne pas tarder à mettre en place sauvegardes et restaurations

Projet officiel :

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Documentation de Compose :

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## À qui ça s'adresse

Je pense que c'est pour vous si :

- Vous possédez déjà votre propre petit serveur
- Vous voulez garder vos données de mots de passe entre vos mains
- Vous êtes prêt à gérer les corvées de HTTPS, de sauvegardes et de mises à jour

Si vous préférez la tranquillité d'esprit, l'hébergement officiel de Bitwarden, 1Password ou le gestionnaire de mots de passe Apple feront très bien l'affaire.

L'avantage de Vaultwarden n'est pas l'absence de maintenance, mais sa légèreté, sa liberté, et son adéquation avec la petite machine d'un étudiant fauche.

## À préparer au préalable

- Un VPS capable de faire tourner Docker
- Un nom de domaine, ou au moins un point d'entrée HTTPS stable
- Docker et Docker Compose
- Des notions de base en SSH, proxy inverse et pare-feu

Si vous n'avez pas encore installé Docker, vous pouvez d'abord jeter un œil à [[docker-compose-minimum-start|Docker et Docker Compose pour les nuls : comprendre ces fichiers yml]].

Si vous n'avez pas encore configuré de nom de domaine, consultez [[free-domain-and-web-community|Offrez un domaine gratuit à votre nouveau blog et faites-vous voir dans la communauté]].

## Créer le répertoire

De mon côté, je place le tout dans `/srv/stacks` :

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

La structure des dossiers ressemble à peu près à ça :

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

La base de données, les pièces jointes et le reste se retrouveront plus tard dans `vw-data`.

## Rédiger le fichier compose

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

Remplacez `vault.example.com` par votre propre nom de domaine.

Le plus important ici, c'est cette ligne :

```text
127.0.0.1:8080:80
```

Cela signifie que Vaultwarden n'écoute que sur la machine locale `8080`.

Le web public ne pourra pas y accéder directement ; le trafic devra obligatoirement passer par Nginx, Caddy ou Cloudflare Tunnel.

Ne commencez surtout pas par écrire :

```text
0.0.0.0:8080:80
```

Laisser un coffre-fort de mots de passe directement exposé sur un port HTTP public, ce n'est vraiment pas une bonne idée.

Petite explication rapide des variables :

- `DOMAIN` : L'adresse HTTPS finale utilisée pour l'accès
- `SIGNUPS_ALLOWED` : À activer temporairement lors de la toute première inscription, puis à désactiver
- `INVITATIONS_ALLOWED` : À désactiver pour un usage personnel, à activer si vous voulez inviter d'autres personnes
- `ENABLE_WEBSOCKET` : À laisser activé, cela permet aux applications clientes de synchroniser normalement

## Démarrage

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

Vérifiez localement :

```bash
curl -I http://127.0.0.1:8080/
```

Si un code d'état est renvoyé, le conteneur est en vie.

Mais ce n'est pas encore terminé, car le point crucial reste le HTTPS.

## Proxy inverse et HTTPS

Ne faites pas tourner un service comme Vaultwarden sur du HTTP brut sur le long terme.

Le contexte de sécurité du navigateur, les applications de gestion de mots de passe et votre propre tranquillité d'esprit exigent que le HTTPS soit configuré correctement.

J'hésite généralement entre deux approches :

### Option A : Caddy / Nginx

Idéal si votre nom de domaine pointe directement vers votre serveur et que vous acceptez d'ouvrir les ports 80 et 443.

Caddy est le plus simple :

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

Il gère les certificats tout seul.

Nginx fonctionne aussi très bien, avec la même logique de base : rediriger `https://vault.example.com` vers `127.0.0.1:8080`.

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

N'oubliez pas de vérifier après modification :

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Option B : Cloudflare Tunnel

Si vous ne voulez pas ouvrir les ports 80 et 443 directement sur votre serveur d'origine, le Tunnel est plus confortable.

L'architecture ressemble à ceci :

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

C'est celle que j'utilise personnellement.

Ensuite, de manière générale : n'ajoutez pas de page de connexion Cloudflare Access à l'ensemble de Vaultwarden.

Cela poserait des problèmes aux extensions de navigateur et aux applications mobiles.

Si vous tenez vraiment à ajouter une protection supplémentaire, limitez-la de préférence uniquement à `/admin`.

## Fermer les inscriptions dès la première inscription terminée

Après avoir ouvert `https://vault.example.com` pour la première fois, créez d'abord votre compte principal.

Modifiez la configuration immédiatement après :

```yaml
SIGNUPS_ALLOWED: "false"
```

Puis redémarrez :

```bash
docker compose up -d
```

Ne vous dites pas que votre nom de domaine est trop obscur ; les services sur le net finissent toujours par se faire scanner par des bots.

## Que faire une fois le compte créé ?

- Définir un mot de passe maître vraiment robuste
- Activer la double authentification (2FA)
- Vérifier que le HTTPS fonctionne correctement avant d'importer vos mots de passe
- Exporter une sauvegarde hors-ligne depuis votre ancien gestionnaire avant l'importation

Autre réalité pragmatique :

Ne balancez pas vos clés SSH de serveur, vos mots de passe de tableaux de bord et vos identifiants root dans un coffre-fort dont vous n'avez pas clarifié la stratégie de sauvegarde.

Installez d'abord, migrez ensuite tranquillement.

## Sauvegardes

Les données les plus importantes de Vaultwarden se trouvent ici :

```text
/srv/stacks/vaultwarden/vw-data
```

La méthode la plus simple consiste à lui faire exécuter une sauvegarde interne, puis à archiver l'ensemble du répertoire :

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

Si vous utilisez `.env`, le SMTP, ou des jetons d'administration, sauvegardez-les également, mais ne les exposez pas dans un dépôt public.

Rapatriez ensuite la sauvegarde en local ou synchronisez-la sur une autre machine :

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

Ne la stockez pas uniquement sur le même serveur.

Une sauvegarde sur la même machine équivaut la plupart du temps à une absence de sauvegarde.

## Exercice de restauration

Savoir faire des sauvegardes sans savoir les restaurer, c'est plutôt risqué.

Vous devez au moins vérifier de temps en temps qu'il y a bien du contenu dans vos archives de sauvegarde :

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

Vous devriez normalement voir :

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

Pour une vraie restauration, arrêtez d'abord le service, puis déplacez les anciennes données :

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

Après la restauration, vérifiez au moins quatre points :

- La page web s'ouvre
- Vous pouvez vous connecter
- Les éléments sont toujours là
- L'extension de navigateur et le mobile se synchronisent

N'attendez pas que tout pète pour apprendre à restaurer pour la première fois.

## Mises à jour

Faites une sauvegarde avant de mettre à jour, ne cherchez pas à y couper :

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

Une fois la mise à jour terminée, ne vous contentez pas de regarder les logs : allez tester vous-même la page web et l'application cliente.

## Est-ce adapté à un 2C2G ?

Carrément.

Vaultwarden ne consomme pas beaucoup de ressources en soi, il tourne sans problème sur un 2C2G.

Le vrai coût ne réside pas dans le processeur ou la mémoire, mais dans les bonnes habitudes de maintenance :

- HTTPS
- Désactivation des inscriptions
- Sauvegardes
- Restaurations
- Mises à jour

Si vous souhaitez sérieusement vous lancer dans l'auto-hébergement, c'est au contraire le premier service idéal à déployer.

La commodité apportée par un coffre-fort de mots de passe est incroyable, et en bricoler un soi-même constitue un excellent point de départ pour vos déploiements.

## Pour aller plus loin

Le domaine et le HTTPS de votre coffre-fort peuvent être associés à [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]], les résultats des scripts de sauvegarde peuvent être envoyés sur votre téléphone via [[selfhost-ntfy-on-2c2g|ntfy]], et d'autres services légers peuvent trouver leur place dans la [[2c2g-server-service-index|Liste des services pour petit serveur]].
