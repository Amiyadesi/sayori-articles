---
title: "Bricoler Fast Note Sync sur un serveur étudiant : une couche de synchro privée pour Obsidian"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: "Tester Fast Note Sync Service sur un serveur étudiant 2C2G pour garder une voie privée vers Obsidian : synchro multi-appareils, sauvegarde et API REST / MCP."
image: ""
tags:
  - Tutoriels pratiques
  - VPS et auto-hébergement
  - Docker
  - Obsidian
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: "posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server"
---

En ce moment j'écris mes billets de blog et mes notes de projet dans Obsidian, mais au début je n'écrivais que sur l'ordi ; ce n'est qu'après en avoir accumulé un tas que j'ai réalisé que je ne pouvais pas écrire sur téléphone, alors je me suis mis à chercher un service de synchro.

Obsidian Sync officiel est bien sûr pratique, même si votre portefeuille ne l'est pas ; Syncthing, Git et WebDAV ont chacun leurs trucs, mais je trouvais ça peu commode.

Jusqu'à ce que je tombe sur le plugin Fast Note Sync, repéré au passage dans les commentaires en traînant sur linux.do : c'est un plugin Obsidian + un serveur auto-hébergé, pensé pour la synchro temps réel multi-appareils, avec en prime l'historique des versions, les pièces jointes, l'interface web, une API REST et MCP. Après quelques jours de mise en place et d'usage réel, franchement il tourne super bien b(￣▽￣)d

Plugin :

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

Serveur :

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Page du plugin Obsidian :

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## À qui ça s'adresse

À mon avis, c'est taillé pour celles et ceux qui :

- utilisent déjà Obsidian pour écrire pas mal de contenu
- ont un petit serveur allumé 24h/24
- acceptent de gérer eux-mêmes le HTTPS, le reverse proxy et les sauvegardes
- veulent pouvoir prendre des notes n'importe quand, n'importe où

Comme ça, même sans l'ordi sous la main, on peut écrire tranquillement sur téléphone, et une fois rentré, un coup de synchro sur l'ordi et c'est réglé.

## Déployer le serveur

Le dépôt du serveur est ici :

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

C'est un serveur écrit en Go, décrit dans le dépôt comme une plateforme de synchronisation de notes, de gestion en ligne et d'API REST distante haute performance et à faible latence.

Je commence par créer le dossier :

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

Puis je suis la doc officielle pour déployer via Docker, binaire ou compilation depuis les sources. Quelle que soit la méthode, j'essaie toujours de faire écouter le service uniquement en local, puis d'exposer le HTTPS via un reverse proxy ou un tunnel.

L'idée :

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

Si vous utilisez Docker Compose, gardez au moins ces quelques réflexes :

- persister le dossier de données dans le dossier courant du service
- ne pas mettre les fichiers de config dans un dépôt public
- ne pas exposer directement le port du service sur l'Internet public
- sauvegarder le dossier de données avant toute mise à jour

Dans un service de synchro, il y a vos notes : pas question qu'elles tournent à découvert.

## Associer un domaine

Vous pouvez passer par Caddy / Nginx ou par Cloudflare Tunnel.

Par exemple un domaine :

```text
notes.example.com
```

Architecture :

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

Si vous n'avez pas encore de domaine, vous pouvez d'abord jeter un œil à :

[[free-domain-and-web-community|Associer un domaine gratuit à un blog fraîchement monté, puis aller se montrer sur un forum de webmasters]]

Je déconseille d'accéder directement à :

```text
http://服务器IP:<服务端口>
```

Il faut au moins du HTTPS, et idéalement une protection d'accès en plus.

## Initialiser le compte et le plugin

Le parcours décrit dans le README du serveur ressemble à ceci :

1. Ouvrir l'interface d'administration web
2. Créer un compte lors de la première visite
3. Copier la configuration API dans le panneau d'administration
4. Coller la configuration dans les réglages du plugin Obsidian

Téléchargez manuellement `main.js`, `styles.css` et `manifest.json` depuis les Releases GitHub, et placez-les dans :

```text
.obsidian/plugins/fast-note-sync/
```

Ensuite, allez démarrer sur la page du plugin : il faudra créer et copier un token sur la page web, puis le coller dans la config distante, et en général ça démarre au bout d'un petit moment.

## La sauvegarde compte plus que la synchro

Synchroniser, ce n'est pas sauvegarder.

Cette phrase mérite d'être écrite à part. La synchro répercute les suppressions, et elle répercute aussi les erreurs.

Fast Note Sync gère nativement l'historique des versions, la corbeille, la sauvegarde, le miroir, la synchro Git, etc., mais il faut quand même garder votre propre filet de sécurité.

Si vous synchronisez déjà Obsidian avec Git, n'empilez pas une synchro temps réel par-dessus d'entrée de jeu : réfléchissez d'abord à qui fait office de synchro principale et qui sert de sauvegarde.

## Que penser de MCP et de l'API REST

Fast Note Sync Service propose désormais aussi le support de l'API REST et de MCP.

Ça m'attire beaucoup. Comme une bonne partie de mes contenus est dans Obsidian, si des clients IA peuvent lire et écrire des notes via une interface contrôlée à l'avenir, ce ne sera plus seulement un outil de synchro, mais une porte d'entrée vers ma base de connaissances personnelle.

Mais c'est aussi un risque.

Si une IA peut lire et écrire vos notes, les frontières de permissions doivent être encore plus nettes :

- ne pas exposer l'interface MCP sur l'Internet public
- ne pas donner de droits d'écriture à des clients non fiables
- ne pas mélanger journal intime, identifiants de compte et clés secrètes dans un même Vault ouvert
- garder les Vaults importants en lecture seule au début, et n'envisager l'écriture qu'une fois le flux validé

« Pouvoir brancher une IA » n'est pas une raison pour tout ouvrir d'un coup.

## Est-ce que ça pèse lourd sur du 2C2G ?

Pour un usage personnel normal, ça devrait aller.

Ce qui consomme vraiment des ressources, c'est le nombre de pièces jointes, la fréquence de synchro, et le fait de balancer ou non une médiathèque entière de plusieurs dizaines de Go dans Obsidian.

## Pour aller plus loin

Une fois la synchro multi-appareils en place, si vous voulez transformer vos articles publics en blog, jetez un œil à [[astro-mizuki-blog-from-zero|modèle de blog minimaliste]] ; pour l'entrée de service et le HTTPS, poursuivez avec [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]], et pour les autres usages du serveur, revenez à [[2c2g-server-service-index|liste des services]]
