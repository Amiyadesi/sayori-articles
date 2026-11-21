---
title: "Exécuter ntfy sur un serveur étudiant 2C2G : s'offrir un bouton de notification"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: Déployer le service de notification push ntfy avec Docker sur un serveur étudiant pour recevoir des alertes sur son téléphone depuis les scripts de sauvegarde, les moniteurs et les tâches planifiées.
image: ""
tags:
  - Tutoriel pratique
  - VPS et auto-hébergement
  - Docker
  - Notifications push
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: "posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g"
---

ntfy est l'un des services les plus discrets mais les plus utiles sur mon serveur.

Son fonctionnement est simple : vous lui envoyez une phrase via une requête HTTP et il la transmet directement sur votre téléphone. C'est ni plus ni moins qu'un tunnel de notification.

Mais les cas d'usage de ce tunnel sont bien plus nombreux que vous ne le pensez :

- Un script de sauvegarde s'est terminé, il vous indique le succès ou l'échec.
- Une alerte de dépassement de frais de serveur se déclenche pour vous inviter à jeter un œil.
- Une tâche planifiée rencontre une erreur et vous envoie une alerte.
- Gatus détecte qu'un service est hors service et vous prévient.
- Un certificat est sur le point d'expirer et vous le rappelle.
- Vous pouvez aussi personnaliser des commandes à envoyer pour réaliser un contrôle à distance temporaire.

Projet officiel :

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

Documentation officielle :

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## Pourquoi l'auto-héberger

ntfy dispose d'un serveur public officiel `ntfy.sh`, utilisable sans rien installer.

Cependant, j'ai choisi de l'auto-héberger pour les raisons suivantes :

- Les topics du serveur public sont publics. N'importe qui connaissant le nom de votre topic peut y envoyer des messages.
- L'auto-hébergement permet d'ajouter une authentification utilisateur.
- L'auto-hébergement permet de contrôler la rétention et les journaux.
- De toute façon, un serveur étudiant a de l'espace et ntfy est très léger.

Si vous souhaitez simplement faire un test rapide, utiliser le serveur public `ntfy.sh` convient parfaitement. Mais pour un usage à long terme, l'auto-hébergement s'avère plus rassurant.

## Déploiement

Préparation du dossier :

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

Création du `docker-compose.yml` :

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

Quelques points clés :

- Port `127.0.0.1:8090:80` : écoute uniquement sur la machine locale. Ne l'exposez pas directement au web public.
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"` : refuse par défaut toutes les requêtes non authentifiées. Ainsi, vous seul (muni d'un jeton ou d'un nom d'utilisateur et d'un mot de passe) pouvez envoyer et recevoir.
- `NTFY_BASE_URL` : indiquez le domaine que vous allez finalement utiliser, par exemple le mien est `ntfy.sayori.org`.

## Démarrage

```bash
docker compose up -d
docker compose logs -f
```

Vérification locale :

```bash
curl http://127.0.0.1:8090/
```

Il suffit de voir la page Web de ntfy répondre.

## Création d'un utilisateur

Puisque nous avons configuré `deny-all`, il est nécessaire de se créer un compte personnel :

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

Il vous sera demandé de saisir un mot de passe. Retenez bien ces identifiants, ils seront requis pour l'envoi de notifications et dans l'application mobile.

Il est également possible de générer un jeton (token) :

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

Un jeton est plus pratique qu'un mot de passe et s'utilise directement dans l'en-tête (header) d'un script.

## Association d'un nom de domaine

Comme pour Vaultwarden, utilisez Cloudflare Tunnel ou un proxy inverse Caddy/Nginx.

Méthode Cloudflare Tunnel :

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

Une fois que vous avez vérifié que le HTTPS fonctionne correctement, ouvrez `https://ntfy.example.com` et connectez-vous à l'interface Web avec le compte créé précédemment.

## Envoyer une première notification

La méthode la plus simple :

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

Ici, `/test` correspond au nom du topic. Vous pouvez lui donner le nom de votre choix, comme `/backup`, `/alert` ou `/server`.

Il est aussi possible d'ajouter un titre et un niveau de priorité :

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## Application mobile

Android :

- Le client ntfy est disponible sur F-Droid.
- Également disponible sur Google Play.

iOS :

- Recherchez ntfy sur l'App Store.

Une fois l'application ouverte :

1. Ajoutez l'adresse de votre serveur auto-hébergé dans les paramètres.
2. Saisissez votre nom d'utilisateur et votre mot de passe ou votre jeton.
3. Abonnez-vous à votre topic (par exemple `backup`, `alert`).

Les notifications émises par le serveur seront désormais acheminées vers votre téléphone.

## Utilisation dans les scripts

Ajoutez une ligne à la fin du script de sauvegarde :

```bash
NTFY_URL="https://ntfy.example.com/backup"
NTFY_TOKEN="你的token"

# 备份成功时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ✅ 备份成功" \
     -d "Vaultwarden 备份完成 $(date +%F)" \
     "$NTFY_URL"

# 备份失败时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ❌ 备份失败" \
     -H "Priority: high" \
     -d "Vaultwarden 备份出错，请检查日志" \
     "$NTFY_URL"
```

Notification d'échec d'une tâche planifiée :

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## Intégration avec Gatus

Si vous utilisez Gatus pour les bilans de santé (health checks), vous pouvez ajouter ntfy comme canal d'alerte dans sa configuration.

Gatus prend en charge nativement les alertes ntfy. Il suffit d'inscrire l'adresse du serveur, le topic et le jeton dans le fichier de configuration.

Ainsi, si un service tombe en panne, Gatus envoie automatiquement une notification à ntfy et votre téléphone sonnera.

## Consommation des ressources

ntfy est extrêmement léger.

Sur mon serveur, il tourne en permanence et sa consommation de mémoire tourne autour de 20-30 Mo. Le processeur est quasiment à zéro pour cent. Ce n'est absolument pas une charge pour une configuration 2C2G.

Il ne nécessite pas de base de données. Les messages sont mis en cache dans des fichiers locaux et expirent automatiquement après une durée définie par défaut.

## Remarques importantes

- Ne consignez jamais un jeton ntfy dans un dépôt public.
- Si vous avez configuré `deny-all` mais que certains services externes (par exemple Gatus tournant sur la même machine) ont besoin d'envoyer des notifications sans authentification, vous pouvez ouvrir les permissions pour des topics spécifiques.
- Les messages ne sont pas conservés indéfiniment. Si vous avez besoin d'un historique, l'émetteur doit se charger de tenir ses propres journaux.
- L'interface Web de ntfy n'a pas besoin d'être exposée au web public. L'API suffit amplement pour l'abonnement de l'application mobile.

## Est-ce adapté à une configuration 2C2G ?

C'est parfait. C'est probablement l'un des services au meilleur rapport qualité-prix sur une machine 2C2G.

Une fois installé, vous constaterez que la dernière étape de presque tous vos scripts se transforme en « envoyer une notification pour m'annoncer le résultat », ce qui s'avère bien plus confortable que de se connecter en SSH tous les jours pour vérifier les journaux.

De plus, ntfy permet également de personnaliser des mini-commandes. Par exemple, l'auteur gère la modération des commentaires de son blog en s'envoyant les notifications via ntfy : en choisissant de supprimer, la commande `/delete ID_commentaire` est exécutée ; en choisissant de restaurer, c'est `/recover ID_commentaire`, et ainsi de suite.

## Pour continuer la lecture

Pour le domaine et le HTTPS, vous pouvez enchaîner avec [[free-domain-and-web-community|Tutoriel de nom de domaine]] et [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]] ; maintenant que vous disposez d'un canal de notification, les résultats de sauvegarde de [[selfhost-vaultwarden-on-2c2g|Vaultwarden]] peuvent aussi être acheminés sur votre téléphone, et vous pouvez revenir à [[2c2g-server-service-index|Liste des services]] pour d'autres usages.
