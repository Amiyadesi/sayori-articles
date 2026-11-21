---
title: "Ce que le niveau gratuit de Cloudflare peut faire pour les développeurs : la suite tout-en-un du « philanthrope du cyberespace » qui ne coûte rien"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: "Un tour d'horizon de ce qui fonctionne vraiment dans le niveau gratuit de Cloudflare : Pages, Workers, R2, Tunnel, Email Routing, DNS, Web Analytics, et dans quels cas il est plus adapté qu'un VPS."
image: ""
tags:
  - Tutoriels pratiques
  - Création de site et Cloudflare
  - Avantages étudiants officiels
  - VPS et auto-hébergement
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: "posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide"
---

Ce n'est pas sans raison que Cloudflare est surnommé le « philanthrope du cyberespace » dans le milieu des développeurs.

Ses quotas gratuits, pour un développeur solo, c'est carrément de la surconsommation

Ici, je rassemble les services gratuits qui me semblent vraiment utiles aux développeurs

## Inscription

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

Il suffit de s'inscrire avec une adresse e-mail. Pas besoin de lier une carte bancaire pour utiliser la plupart des fonctions du niveau gratuit (certaines, comme R2, demandent une carte mais ne prélèvent rien sauf si vous dépassez les quotas)

Si l'inscription bloque, essayez de changer de nœud ou d'ouvrir une fenêtre de navigation privée

## Cloudflare Pages

C'est celui que j'utilise le plus.

Pages vous permet de déployer des sites statiques (HTML, CSS, JS, ou les sorties de build de frameworks comme Astro, Next.js, Hugo, etc.) sur le réseau mondial de Cloudflare

Le niveau gratuit vous donne :

- Un nombre illimité de sites
- Une bande passante illimitée
- 500 builds par mois
- HTTPS automatique
- Noms de domaine personnalisés
- Déploiements d'aperçu (une URL d'aperçu par PR)

Pour un blog perso, il n'y a quasiment aucune limite

Mon blog tourne sur Pages. Après un push sur le dépôt GitHub, GitHub Actions build Astro, puis Wrangler l'envoie sur Pages. Tout le pipeline coûte zéro

Si vous n'avez pas encore essayé :

[[astro-mizuki-blog-from-zero|Monter un blog épuré avec Sayori Lite]]

## Cloudflare Workers

Workers, ce sont les fonctions Serverless de Cloudflare. Vous écrivez un petit bout de JS/TS, vous le déployez, et il tourne sur les nœuds edge de Cloudflare

Le niveau gratuit vous donne :

- 100 000 requêtes par jour
- 10 ms de temps CPU par requête
- 1 Mo de taille de code

À quoi ça sert :

- Faire une API simple (par exemple renvoyer une citation aléatoire, relayer une requête, faire un raccourcisseur d'URL)
- Ajouter un peu de logique dynamique à un site statique
- Faire un récepteur de Webhook
- Faire un proxy simple ou une redirection

À quoi ça ne sert pas :

- Les tâches qui doivent tourner longtemps
- Les backends complexes avec base de données (même si on peut brancher D1 ou KV, le niveau gratuit a des quotas)
- Les services nécessitant du WebSocket persistant

Si vous voulez juste écrire un blog, Workers ne vous servira pas tout de suite. Mais savoir qu'il existe est très utile, on le recroise souvent quand on bricole des petits outils

## Cloudflare R2

R2 est un stockage objet compatible avec l'API S3

Le niveau gratuit vous donne :

- 10 Go de stockage
- 10 millions d'opérations de classe A par mois (PUT/POST/LIST)
- 10 millions d'opérations de classe B par mois (GET)
- Trafic sortant gratuit (c'est l'argument massue)

À quoi ça sert :

- Stocker les images d'un blog (avec un domaine personnalisé, ça fait un hébergeur d'images)
- Ranger des fichiers de sauvegarde
- Héberger des ressources statiques
- Stocker les uploads de fichiers de petits projets

Pourquoi c'est plus intéressant qu'un OSS : le trafic sortant n'est pas facturé. Sur Alibaba Cloud OSS, le trafic sortant est payant, pas sur R2. Pour un blog perso et des petits projets, la différence est énorme

Il faut lier une carte bancaire pour activer R2, mais rien n'est débité dans les limites du niveau gratuit

## Cloudflare Tunnel

Tunnel vous permet d'exposer en toute sécurité sur l'Internet public un service interne (par exemple un Vaultwarden qui n'écoute que sur `127.0.0.1` sur votre VPS)

Comment ça fonctionne :

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

Les avantages :

- Pas besoin d'ouvrir les ports 80/443 sur le VPS
- Pas besoin de demander soi-même un certificat SSL
- On peut ajouter une couche d'authentification avec Cloudflare Access
- L'IP de l' serveur d'origine n'est pas exposée

Mon [[selfhost-vaultwarden-on-2c2g|Vaultwarden]], [[selfhost-ntfy-on-2c2g|ntfy]], Gatus et mon panneau 1Panel passent tous par Tunnel ; l'usage pour la synchro de notes est dans le [[fast-note-sync-on-student-server|tutoriel Fast Note Sync]]

Le niveau gratuit n'a pas de limite sur le nombre de Tunnels. Vous pouvez faire tourner plusieurs sous-domaines sur un seul Tunnel

Pour l'installer, on fait tourner un démon `cloudflared` sur le VPS ; il établit la connexion vers l'extérieur, sans règle entrante

## Cloudflare DNS

En faisant pointer les NS de votre domaine vers Cloudflare, vous profitez de son hébergement DNS gratuit

Si vous n'avez pas encore choisi votre domaine, vous pouvez d'abord jeter un œil à [[free-domain-and-web-community|Domaines gratuits et domaines de packs étudiants]]

Les avantages :

- Anycast mondial, résolution rapide
- DNSSEC gratuit
- Masquage de l'IP d'origine avec le mode Proxy
- Interface d'administration très claire

Si votre domaine a été acheté chez un autre registrar (comme Namesilo, Porkbun, SpaceShip, ou divers clouds chinois), vous pouvez passer les NS sur Cloudflare pour le gérer

Si vous utilisez un domaine gratuit (comme les `cc.cd` de DNSHE), vérifiez si ce service de domaine autorise le changement de NS. Certains l'autorisent, d'autres n'acceptent que d'ajouter des enregistrements sur la plateforme d'origine

## Cloudflare Email Routing

Email Routing permet de recevoir des e-mails avec votre domaine personnalisé, puis de les rediriger vers votre vraie boîte mail

Par exemple :

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

C'est gratuit, pas besoin de monter son propre serveur mail

Pratique pour :

- Laisser une adresse de contact sur un blog sans exposer sa vraie adresse
- S'inscrire à divers services avec une adresse sur son domaine perso
- Apprendre les enregistrements DNS liés au mail (MX, SPF, DKIM)

Attention : c'est uniquement de la réception avec redirection. Si vous voulez envoyer des e-mails depuis votre domaine personnalisé, il faut une configuration en plus (par exemple avec Gmail SMTP + alias, ou des services comme Resend, Mailgun, Zoho Mail)

## Cloudflare Web Analytics

Sans installer aucun script JS, Cloudflare vous affiche les statistiques de trafic de base de votre site

Ça s'active dans Web Analytics, directement dans le Dashboard

C'est beaucoup plus léger que Google Analytics :

- Pas de suivi des utilisateurs
- Pas de cookies
- Pas de JS supplémentaire à charger
- Respectueux de la vie privée

Pour un blog perso, voir s'il y a du passage chaque jour, d'où les gens viennent et quelles pages sont consultées, ça suffit largement

Si vous voulez des analyses plus poussées (suivi d'événements, entonnoirs, dimensions personnalisées), vous pourrez voir Umami ou Plausible plus tard. Mais pour démarrer, ce qui est intégré à Cloudflare suffit

## Cloudflare Access (niveau gratuit Zero Trust)

Access permet d'ajouter une couche de protection par connexion à n'importe quel service web

Par exemple, vous avez un panneau d'administration qui tourne sur `panel.example.com` et vous ne voulez pas que n'importe qui puisse y accéder. Access peut afficher une page de connexion à l'ouverture, et seuls les utilisateurs authentifiés entrent

Le niveau gratuit prend en charge jusqu'à 50 utilisateurs

Les méthodes d'authentification peuvent être :

- Code à usage unique par e-mail
- Connexion GitHub
- Connexion Google

Mon panneau 1Panel est protégé par Access. Même si le panneau a déjà son propre mot de passe, une couche d'authentification en amont ne fait jamais de mal

## Quoi d'autre en gratuit ?

D'autres trucs gratuits mais que j'utilise peu :

- **D1** : base de données SQLite, juste à côté des Workers. 5 Go sur le niveau gratuit
- **KV** : stockage clé-valeur. Limites quotidiennes de lecture/écriture sur le niveau gratuit, mais suffisant pour de petits projets
- **Queues** : file de messages
- **Images** : transformation d'images (le niveau gratuit est très limité)
- **Stream** : hébergement vidéo (le niveau gratuit ne suffit quasiment pas)
- **Zaraz** : gestion de scripts tiers

Pas besoin de tout retenir. Il suffit de savoir que le niveau gratuit de Cloudflare est très généreux, et de revenir consulter ça quand le besoin se présente

## Quand ne pas utiliser Cloudflare

- Tâches de fond devant tourner longtemps → utiliser un VPS
- Base de données persistante et requêtes complexes → utiliser un VPS ou une base managée
- Connexions WebSocket longue durée → Workers a des limites
- Traitement de gros fichiers → mémoire et CPU limités sur Workers
- Sensibilité à la vitesse d'accès depuis la Chine continentale → le niveau gratuit de Cloudflare n'est pas forcément rapide sur place

Le principe général : ce qui peut aller sur Cloudflare va sur Cloudflare, ce qui doit tourner en continu va sur le VPS. Les deux ne se remplacent pas, ils se complètent

## Résumé de mon usage

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

Mon serveur étudiant en 2C2G ne sert qu'à faire tourner ce qui doit tourner en continu. Pour le reste, dès qu'on peut décharger sur Cloudflare, on ne fait pas tout encaisser au serveur

Quand il faut une machine, on peut d'abord regarder [[azure-students-100-credit-guide|Serveur Azure Japon]] ou [[aliyun-student-300-voucher-guide|Coupons étudiants Alibaba Cloud]], puis déployer ses applis selon [[docker-compose-minimum-start|Débuter avec Docker]] et [[2c2g-server-service-index|Liste des services]]

## Pour aller plus loin

awesome-cloudflare : [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

Ce dépôt rassemble toutes sortes d'outils et d'usages de l'écosystème Cloudflare, plus de 14k stars. Si vous voulez savoir « ce que les autres ont fait avec Cloudflare », c'est un bon point de départ

D'autres outils externes sont rassemblés dans [[webmaster-resource-toolbox|Liste de ressources pour webmasters]], et une fois le site en ligne, vous pouvez utiliser [[geoscore-2-4-guide|GeoScore]] pour vérifier si le crawl et les informations de page sont complets
