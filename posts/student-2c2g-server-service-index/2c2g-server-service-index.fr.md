---
title: "Ce qu'un serveur étudiant 2C2G peut faire tourner : évitez de faire exploser cette petite machine"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "Configuration concrète du serveur léger Alibaba Cloud 2C2G du webmaster : Vaultwarden, ntfy, Gatus, Fast Note Sync, AstrBot et passerelle de recherche. Inclut l'empreinte mémoire réelle et une liste à éviter"
image: ""
tags:
  - Tutoriel pratique
  - VPS et auto-hébergement
  - Docker
  - Serveur étudiant
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: "posts/student-2c2g-server-service-index/2c2g-server-service-index"
---
Si, comme l'administrateur, vous avez troqué votre bon étudiant Alibaba Cloud de 300 yuans contre un serveur 2C2G, félicitations

vous possédez désormais une petite machine en ligne 24h/24

Si vous n'avez pas encore démarré, vous pouvez d'abord consulter [[aliyun-student-300-voucher-guide|Bons étudiants Alibaba Cloud]] ou [[azure-students-100-credit-guide|Serveur Azure Japon]], cet article traite quant à lui du choix des services à installer après le démarrage

Mais il s'agit bel et bien d'une petite machine. 2 cœurs et 1,6 Go de RAM (environ 672 Mo réellement utilisables avec le Swap activé), adaptée pour s'entraîner et faire tourner des services légers, mais impropre aux gros travaux tels que les modèles locaux, Nextcloud ou le transcodage vidéo

Ceci est le journal de configuration réel de l'administrateur. Le serveur tourne depuis plus d'un mois, avec actuellement 14 conteneurs, consommant 765 Mo de RAM + 987 Mo de Swap, et 21 Go / 40 Go d'espace disque

## Commencer par la configuration de base

Ne vous pressez pas d'installer des services

Une fois le serveur récupéré, commencez par effectuer ces opérations :

- Connexion par clé SSH
- Désactivation de la connexion par mot de passe
- Modification du port SSH par défaut
- Configuration des groupes de sécurité et d'UFW
- Configuration des alertes de facturation Alibaba Cloud (trafic CDT)
- Création d'un répertoire de services unifié
- Installation de Docker et Docker Compose

Pour les premières étapes, vous pouvez consulter mon article précédent :

[Je voulais juste que mon bot reste en ligne 24h/24, et j'ai fini par acheter un serveur cloud](/posts/sayori-server-01-vps-start/)

Je place mon répertoire de services dans `/root/sayori/`, géré de manière unifiée via un grand `docker-compose.yml`. Vous pouvez également opter pour un répertoire par service :

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

Chaque répertoire possède son propre `docker-compose.yml`, et les vrais secrets vont dans `.env` sans être poussés sur le dépôt public

## Services actuellement hébergés par l'administrateur

### 🔐 Vaultwarden (Gestionnaire de mots de passe, le plus important)

**Utilité :** Gestionnaire de mots de passe personnel

**Pourquoi le prioriser :**

- Un gestionnaire de mots de passe est plus important qu'un blog, une page de statut ou un bot
- Léger, faible consommation de mémoire
- Écosystème client mature ; les clients officiels Bitwarden fonctionnent sur mobile, PC et navigateur
- Prise en charge des fonctionnalités payantes de Bitwarden (sauvegarde 2FA, vérification de la santé des mots de passe)

**Points d'attention majeurs :**

- Désactiver `SIGNUPS_ALLOWED` dès la première inscription terminée
- HTTPS obligatoire (via Cloudflare Tunnel ou Caddy)
- Sauvegardes régulières et exercices de restauration périodiques
- Ne pas l'exposer à nu sur le réseau public

**Consommation mémoire :** ~50 Mo

**Tutoriel détaillé :** [[selfhost-vaultwarden-on-2c2g|Héberger Vaultwarden sur un serveur étudiant 2C2G]]

---

### 📢 ntfy (Notifications Push, le deuxième plus important)

**Utilité :** S'envoyer des notifications push

Vous faites tourner des scripts de sauvegarde, des scripts de surveillance et des tâches planifiées sur le serveur ; s'il y a un échec, il faut bien que quelqu'un vous prévienne. ntfy est parfait pour ça

**Ce que j'en fais :**

- Notifications de succès/échec de sauvegarde
- Alertes de surveillance de santé Gatus
- Push des résultats de modération des commentaires
- Déclenchement manuel de commandes d'administration (via ntfy → association de scripts)

**Points d'attention majeurs :**

- Configurer le contrôle d'accès pour empêcher des inconnus d'envoyer des messages sur votre topic
- Utiliser Cloudflare Access pour protéger le panneau d'administration

**Consommation mémoire :** ~20 Mo



---

**Tutoriel détaillé :** [[selfhost-ntfy-on-2c2g|Faire tourner ntfy sur un serveur étudiant 2C2G]]

### 📊 Gatus (Page de statut et vérification de santé)

**Utilité :** Surveiller vos services

Il peut vérifier périodiquement si votre blog, Vaultwarden, tableau de bord de bot ou API sont toujours en vie. En cas de panne, vous êtes averti via ntfy

**Les points de terminaison que je surveille :**

- `sayori.org` Blog
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus lui-même
- `ntfy.sayori.org` ntfy
- API Fast Note Sync

**Points d'attention majeurs :**

- Fichier de configuration en YAML, attention à ne pas se tromper d'indentation par mégarde
- Exposition via Cloudflare Tunnel, protection par Access
- Canaux de notification interfacés avec ntfy

**Consommation mémoire :** ~15 Mo

---

### 📝 Fast Note Sync (Synchronisation Obsidian)

**Utilité :** Synchronisation privée pour Obsidian

Si vous utilisez Obsidian comme moi pour écrire des blog posts, noter des projets et stocker des brouillons, ce service vous fera de l'œil. C'est moins cher qu'Obsidian Sync (0 yen/euro) et plus serein que Syncthing (pas besoin que tous les terminaux soient en ligne en même temps)

**Points d'attention majeurs :**

- Sauvegarder régulièrement le répertoire de données
- Ne pas y mettre de fichiers surdimensionnés (images, vidéos)
- Gérer manuellement les conflits de synchronisation

**Consommation mémoire :** ~30 Mo

**Tutoriel détaillé :** [[fast-note-sync-on-student-server|Bricoler Fast Note Sync sur un serveur étudiant]]

---

### 🤖 AstrBot + NapCat (Bot QQ)

**Utilité :** Bot QQ/Telegram/Discord en ligne 24h/24

Une fois installé sur un serveur distant, on peut enfin faire tourner un bot en continu 24h/24. Il peut être connecté à Discord et Telegram, des plateformes pratiquement exemptes de contrôles de risque

**Points d'attention pour la connexion QQ :**

- Les nouveaux comptes sont facilement soumis à des contrôles de risque, il est conseillé de les faire "vieillir"
- Ne l'utilisez pas juste après la création d'un petit compte (leçon apprise dans le sang par l'administrateur)
- NapCat nécessite un scan périodique de QR code pour se connecter

**Consommation mémoire :** AstrBot ~100 Mo, NapCat ~150 Mo

---

### 🔍 AI Search Gateway (Passerelle de recherche IA)

**Utilité :** Passerelle d'agrégation de recherche IA pour usage personnel

Intègre Tavily, Brave Search, Firecrawl, Exa, Grok Search et SearXNG, construite avec FastAPI. Pratique pour Codex et Claude Code MCP, plus commode que d'appeler les API séparément

**Points d'attention majeurs :**

- Écouter uniquement sur `127.0.0.1:8000`, ne pas l'exposer sur le réseau public
- Utiliser localement le transfert de port SSH + appels MCP
- Clés API placées dans les variables d'environnement

**Consommation mémoire :** ~100 Mo (incluant Redis et SearXNG)

---

### 🛡️ Comment Moderation (Modération des commentaires)

**Utilité :** Modération par IA des commentaires de blog

Utilise les quotas GPT communautaires pour modérer automatiquement les commentaires Twikoo, avec envoi des résultats par push ntfy. Permet de supprimer et restaurer manuellement des commentaires en envoyant des messages dans ntfy

Couplé à la vérification anti-bot Cloudflare Turnstile, les commentaires restants sont fondamentalement de haute qualité

**Consommation mémoire :** ~40 Mo

---

### 🌐 Cloudflared (Cloudflare Tunnel)

**Utilité :** Exposer les services locaux sur le réseau public sans ouvrir les ports 80/443

Tous les services publics de l'administrateur passent par Cloudflare Tunnel :

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel (Cloudflare Access obligatoire)

**Avantages :**

- Pas besoin d'ouvrir les ports du serveur d'origine
- HTTPS automatique
- Possibilité de configurer Access pour l'authentification

**Consommation mémoire :** ~30MB

---

### 🎛️ 1Panel (Panneau de gestion Docker)

**Utilité :** Gérer les conteneurs Docker via une interface web

Pratique pour les débutants qui veulent vérifier l'état des conteneurs ou déboguer un souci à la volée

**Avertissement de sécurité :**

- Doit impérativement passer par Cloudflare Tunnel + Access, ou au minimum derrière un reverse proxy HTTPS avec un mot de passe robuste
- Ce panneau contrôle l'ensemble de tes conteneurs
- Ne l'expose jamais à nu sur le réseau public

**Consommation mémoire :** ~80MB

---

### Autres services auxiliaires

- **Mihomo** : client proxy, fournit un proxy aux services qui en ont besoin
- **Redis** : sert de cache pour Search Gateway

## Consommation mémoire actuelle (données réelles)

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**Conclusion :**

- Sur 1.6GB de RAM, 765MB sont utilisés et 987MB de Swap sont pris
- 14 conteneurs, l'empreinte mémoire reste raisonnable
- Un Swap très sollicité montre que la mémoire est effectivement à l'étroit, mais ça tient le choc
- Évite d'y ajouter de nouveaux services lourds

## Services déconseillés sur un serveur 2C2G

Ceux-là bouffent soit trop de RAM, soit trop de CPU, soit trop de stockage — un 2C2G ne suivra pas :

### ❌ Nextcloud / OwnCloud

**Pourquoi ce n'est pas recommandé :**

- Très gourmand en mémoire (PHP-FPM + base de données + Redis)
- L'envoi et le téléchargement de fichiers saturent la bande passante et les I/O
- L'aperçu des gros fichiers fait exploser le CPU
- Conflits de synchronisation fréquents

**Alternatives :**

- Synchronisation légère de fichiers : Fast Note Sync (uniquement pour du texte), Syncthing
- Stockage cloud : Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**Pourquoi ce n'est pas recommandé :**

- Le transcodage vidéo met à genoux le CPU et la RAM
- L'indexation de la médiathèque sollicite fortement les I/O
- Un disque de 40GB ne stockera pas grand-chose en films

**Alternatives :**

- Utiliser un NAS dédié ou un serveur multimédia séparé
- Ou passer directement par le streaming en ligne

---

### ❌ GitLab

**Pourquoi ce n'est pas recommandé :**

- Demande au minimum 4GB de RAM au démarrage
- Impossible à faire tourner sur un 2C2G

**Alternatives :**

- GitHub / Gitea / Forgejo
- Gitea est beaucoup plus léger, mais demande quand même plus de 512MB de RAM

---

### ❌ Mastodon / Misskey

**Pourquoi ce n'est pas recommandé :**

- Les serveurs du Fediverse sont gourmands en mémoire et en base de données
- Le stockage des médias grignote vite le disque

**Alternatives :**

- Créer un compte directement sur une instance publique

---

### ❌ Grands modèles locaux (Ollama / LM Studio)

**Pourquoi ce n'est pas recommandé :**

- Faire de l'inférence sur 2 cœurs est d'une lenteur à en perdre la foi
- 1.6GB de RAM ne permet de charger aucun modèle vraiment exploitable

**Alternatives :**

- Profiter des avantages étudiants officiels : GitHub Copilot Student, l'offre gratuite officielle de Google AI Studio
- Utiliser des bons étudiants : l'API officielle des grands modèles d'Alibaba Cloud Bailian
- Voir en détail : [Comment utiliser les quotas IA officiels pour étudiants et gérer son environnement de développement avec cc-switch](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress (pas impossible à faire tourner, mais déconseillé)

**Pourquoi ce n'est pas trop recommandé :**

- PHP + MySQL consomment pas mal de RAM
- Plus on ajoute de plugins, plus ça pèse
- Un blog statique (Astro / Hugo) offre de bien meilleures performances

**Si tu tiens vraiment à l'installer :**

- Utilise Caddy + PHP-FPM + SQLite
- Limite le nombre de plugins
- Configure le CDN de Cloudflare

## Ordre d'apprentissage recommandé

Voici comment j'organiserais les étapes :

1. **Configuration de base** : [[sayori-server-01-vps-start|SSH et groupes de sécurité]], [[docker-compose-minimum-start|Docker et Compose]], alertes de facturation
2. **Nom de domaine et HTTPS** : [[free-domain-and-web-community|Nom de domaine gratuit]] + [[cloudflare-free-tier-developer-guide|Cloudflare DNS et Tunnel]]
3. **Services essentiels** : [[selfhost-vaultwarden-on-2c2g|Coffre-fort de mots de passe Vaultwarden]] + [[selfhost-ntfy-on-2c2g|Notifications ntfy]] + monitoring Gatus
4. **Ajouts selon les besoins** : [[fast-note-sync-on-student-server|Fast Note Sync]], bots, autres outils

**N'installe pas 10 services d'un coup.** Avance un par un, et assure-toi que chacun tourne de façon stable avant de passer au suivant

## Ressources utiles

**Découvrir des services auto-hébergés :**

- awesome-selfhosted : [https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare : [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**Projets mentionnés dans cet article :**

- Vaultwarden : [https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync : [https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy : [https://ntfy.sh/](https://ntfy.sh/)
- Gatus : [https://gatus.io/](https://gatus.io/)
- AstrBot : [https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` est idéal pour trouver « quoi d'autre héberger soi-même ». `awesome-cloudflare` est parfait pour repérer « ce qu'on peut déporter sur Cloudflare plutôt que de le laisser sur un VPS »

Avec un serveur personnel, l'idée n'est pas de tout porter sur ses propres épaules. Tout ce que Cloudflare Pages, Workers, R2 ou Tunnel peuvent gérer, inutile de l'imposer à tes 2GB de RAM

---

## Pour finir

Un serveur 2C2G est surtout idéal comme « point de départ pour ses services personnels du quotidien »

Il te permet de :

- Te familiariser avec Linux, Docker, les reverse proxies, les noms de domaine et le HTTPS
- Faire tourner quelques services légers mais vraiment utiles
- Prendre de bonnes habitudes de sauvegarde, de monitoring et d'exploitation

Il ne te permet pas de :

- Faire tourner des services lourds
- Servir de machine de production
- Remplacer un NAS dédié ou un serveur multimédia

Mais c'est largement suffisant

Un serveur ne s'arrête pas une fois la configuration terminée : il t'oblige à prendre au sérieux les sauvegardes, la sécurité et la surveillance. Et au fond, c'est une très bonne chose

## Pour aller plus loin

En dehors des serveurs cloud, j'ai aussi bidouillé pour [[make-home-server|transformer un vieux PC en cloud domestique]], et cette même liste reste tout à fait valable pour choisir tes services

Si tu veux connecter tes outils IA à tes propres capacités de recherche, tu peux jeter un œil à [[build-your-search-gateway|l'architecture et le flux de travail d'une passerelle de recherche]], et continuer d'expérimenter dans la direction qui te sert vraiment
