---
title: Je voulais juste garder mon bot en ligne 24h/24, et j’ai fini par acheter un serveur cloud
published: 2026-05-25
created: 2026-05-25
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "De la réduction étudiante Alibaba Cloud jusqu'à Ubuntu, la connexion par clé SSH, un port non standard et un pare-feu de base : les premiers pas sur un serveur perso."
lang: fr
translationKey: "posts/sayori-server-01-vps-start/sayori-server-01-vps-start"
image: ""
tags:
  - Tutoriel pratique
  - VPS et auto-hébergement
  - Alibaba Cloud
  - Avantages étudiants officiels
category: "Tutoriels et guides"
draft: false
---

# Introduction

Au début, je ne comptais pas monter toute une architecture serveur. Je voulais juste qu’un bot QQ reste en ligne 24h/24.

En local, ça tournait très bien aussi. AstrBot allumé, NapCat en tâche de fond, services ouverts, réseau stable, mon PC faisait office de machine hôte.

![[Pasted image 20260609215751.png]]

Du coup, j’ai très vite compris ce qu’est un serveur : un ordinateur allumé 24h/24, posé dans le datacenter de quelqu’un d’autre.

Et comme le webmaster est un étudiant fauché, j’ai évidemment mobilisé mon armée d’IA pour fouiller les bons plans gratuits )

Puis j’ai vu qu’avec la vérification étudiante Alibaba Cloud, il y avait un bon de 300 yuans ([lien d’accès aux avantages étudiants](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)), autant le prendre.

Une fois récupéré, j’ai aussi vu un [essai ECS](https://free.aliyun.com). Je conseille de commencer par l’essai : une config 2 vCPU / 2 Go de RAM suffit amplement pour s’amuser avec un bot, et ça couvre pile trois mois.

![[Pasted image 20260609221047.png]]

Et ce bon de 300 yuans tombe à pic pour passer l’ECS d’essai en formule annuelle — le webmaster l’a déjà fait !

![[Pasted image 20260609221956.png]]

Calcul fait, ça revient en gros à gratter quatre ans de serveur gratuit.

Attention tout de même : le trafic gratuit mensuel d’Alibaba Cloud semble limité à 20 Go en Chine continentale. Pour un simple bot, ça passe, mais mieux vaut paramétrer une alerte de quota.

## Première connexion à la machine

Une fois le serveur acheté, le vrai problème commence : comment j’entre dedans ?

La console donne une IP publique, l’utilisateur `root` et un mot de passe initial. Le plus direct, c’est de se connecter une première fois par mot de passe :

```powershell
ssh root@<VPS_PUBLIC_IP>
```

À la première connexion, on vous demande si vous faites confiance à la machine : vérifiez que l’IP n’a pas de faute de frappe, puis tapez `yes`.

Mais la connexion par mot de passe ne doit servir que de transition. Pour un usage durable, je recommande vraiment de passer direct à une clé SSH.

Un mot de passe, c’est comme cacher la clé sous le paillasson. C’est pratique, mais une machine sur l’Internet public se fait scanner tous les jours. Port 22 par défaut plus connexion par mot de passe, c’est un peu dire aux scripts de tout l’Internet : « venez frapper ici ».

## Générer une clé SSH

Comme je bosse sous Windows, je génère d’abord en local une clé SSH dédiée à ce serveur :

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

Vous pouvez faire Entrée jusqu’au bout. Si vous voulez ajouter une couche de sécurité à la clé privée, mettez une passphrase.

Une fois généré, vous aurez deux fichiers :

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

Celui sans `.pub` est la clé privée — ~~si vous ne savez pas à quoi ça sert, vous pouvez me l’envoyer~~, comme ça je pourrai me connecter à votre SSH 😈

Celui avec `.pub` est la clé publique, à mettre sur le serveur.

Affichons le contenu de la clé publique :

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

Copiez toute la ligne, de `ssh-ed25519` jusqu’au commentaire final.

## Mettre la clé publique sur le serveur

Gardez la fenêtre SSH connectée par mot de passe ouverte, et préparez le dossier SSH sur le serveur :

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

Collez-y toute la ligne de votre `.pub` local, puis enregistrez.

Ensuite, modifiez les permissions :

```bash
chmod 600 ~/.ssh/authorized_keys
```

Cette étape a l’air un peu absurde, mais elle est cruciale. Si les permissions sont trop larges, SSH désactive le mécanisme et ignore purement et simplement la clé.

Créons ensuite un alias SSH en local. Plus besoin de retaper à chaque fois une longue suite d’IP, de port et de chemin vers la clé privée.

Ouvrez :

```powershell
notepad $env:USERPROFILE\.ssh\config
```

Écrivez dedans :

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

Ouvrez un nouveau terminal pour tester :

```powershell
ssh sayori
```

Si la connexion passe direct, c’est que l’authentification par clé fonctionne.

Attention : testez bien dans un **nouveau** terminal. Ne fermez pas encore l’ancienne session par mot de passe — c’est votre corde de sécurité, on ne lâche prise qu’une fois tout réglé.

## Couper le mot de passe et changer pour un port non standard

Une fois la clé opérationnelle, on peut désactiver la connexion par mot de passe et déplacer SSH hors du port 22 par défaut.

Choisissez d’abord un port non standard, par exemple :

```text
11451
```

Ne recopiez pas le mien tel quel. Choisissez-en un entre 1024 et 65535 qui n’entre pas en conflit avec d’autres services.

Allez ensuite ouvrir ce port dans le groupe de sécurité d’Alibaba Cloud ECS. C’est important.

UFW sur le serveur est une première porte, le groupe de sécurité Alibaba Cloud en est une deuxième. Si vous ne modifiez que le serveur sans toucher au groupe de sécurité, le nouveau port restera bloqué.

Une fois le groupe de sécurité ouvert, revenez dans la fenêtre SSH et créez votre propre fichier de conf SSH :

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

Contenu :

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

Ici, `PermitRootLogin prohibit-password` signifie que `root` peut toujours se connecter par clé, mais plus par mot de passe.

La méthode la plus rigoureuse consiste à créer un utilisateur normal et à désactiver `root`. Ici, je vais juste au plus rapide et fonctionnel.

Après modification, vérifiez qu’il n’y a pas d’erreur de syntaxe dans la conf SSH :

```bash
sshd -t
```

Aucune sortie, c’est bon signe.

Puis redémarrez le service SSH :

```bash
systemctl restart ssh
```

Ne fermez toujours pas l’ancienne fenêtre.

Mettez aussi à jour le port dans votre `~/.ssh/config` local :

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

Ouvrez un troisième terminal pour tester :

```powershell
ssh sayori
```

Si ça passe, c’est que le nouveau port, la clé SSH et le groupe de sécurité sont tous ok.

Je refais aussi un test de connexion par mot de passe pour vérifier qu’il est bien coupé — par exemple sans clé privée, en tapant l’IP à la main.

S’il vous demande encore un mot de passe et vous laisse entrer, c’est que `PasswordAuthentication no` n’est pas actif : n’allez pas plus loin sans avoir tiré ça au clair.

## Configurer le pare-feu

Une fois SSH bien stable, on règle le pare-feu du serveur lui-même.

Sur Ubuntu, le plus pratique, c’est UFW :

```bash
apt update
apt install -y ufw
```

On pose d’abord les règles :

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

Si vous comptez déjà lancer un service web, vous pouvez laisser HTTP / HTTPS :

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

Puis on active :

```bash
ufw enable
ufw status verbose
```

Là encore, je conseille de garder l’ancienne fenêtre SSH. Testez une nouvelle connexion dans un autre terminal :

```powershell
ssh sayori
```

Si ça se connecte, vous pouvez fermer l’ancienne fenêtre.

## Faire un premier tour de la machine une fois connecté

Une fois la connexion vraiment stable, on peut jeter un œil à l’état de la machine :

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

2 vCPU / 2 Go de RAM, ce n’est pas énorme, donc pour la suite il faudra privilégier du léger.

Quand on peut se passer de base de données, on s’en passe ; quand on peut utiliser SQLite, on prend SQLite ; quand ça peut aller sur Cloudflare Pages, on ne le met pas sur le VPS.

Par la suite, cette machine n’a pas fait tourner que le bot : Vaultwarden, ntfy, Gatus, Portainer et AI Search Gateway ont tous poussé dessus.

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/), voilà un super site de type awesome sur tout ce qu’on peut faire d’un serveur !

Avec du recul, ce qu’il y a de plus utile avec un serveur perso, ce n’est pas tel ou tel service, c’est qu’il vous force à comprendre le réseau, le déploiement, la sécurité, les sauvegardes, etc.

Si c’était à refaire, j’adopterais plus tôt quelques habitudes :

1. Un dossier séparé par service
2. Mettre les vrais secrets uniquement dans `.env` ou dans les Secrets de la plateforme
3. Noter dans la doc toutes les commandes copiables
4. Garder une commande de vérification à la fin de chaque déploiement

On s’arrête là pour cet article. Le serveur est maintenant accessible de façon stable en SSH, la connexion par mot de passe est coupée, le port a changé et le pare-feu pose les bases.

Dans le prochain article, on verra comment transférer la conf locale vers la machine distante avec `scp`.

Autrement dit, on va enfin commencer à faire passer le bot de « ça tourne sur mon PC » à « ça tourne aussi sur le serveur ».

## Pour aller plus loin

Si vous n’avez pas encore choisi de machine, jetez un œil à [[aliyun-student-300-voucher-guide|Coupon étudiant Alibaba Cloud]] ou [[azure-students-100-credit-guide|Serveur Azure Japon]] ; une fois connecté, suivez [[docker-compose-minimum-start|Débuter avec Docker]] → [[2c2g-server-service-index|Liste des services]] pour installer un service qui vous sera utile.
