---
title: Transformer un vieux PC Windows 7 en serveur maison (homelab)
published: 2026-08-09
created: 2026-08-09
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: Comment recycler un vieux PC sous Windows 7 en serveur Linux à la maison, étape par étape — vous pouvez vous lancer vous aussi après lecture
image: ""
tags:
  - Tutoriel pratique
  - VPS et auto-hébergement
  - Docker
  - Serveur maison
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: "posts/make-home-server/make-home-server"
---
# Le point de départ
En rentrant chez mes parents pendant les vacances d'été et en discutant avec eux, j'ai découvert qu'il traînait à la maison un vieux PC sous Windows 7 dont personne ne se servait plus. Je me suis dit que c'était l'occasion rêvée de monter un petit serveur maison. Après avoir suivi pas à pas les explications détaillées d'une IA, j'ai enfin réussi à tout configurer et à l'intégrer à mon réseau Tailscale. Je consigne tout ça ici pour garder une trace.
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# Journal complet de l'installation

## Préparation

Préparez une petite clé USB d'au moins 4 Go pour créer le support d'installation d'Ubuntu. Commencez par télécharger la dernière version stable sur le [site officiel d'Ubuntu Server](https://ubuntu.com/download/server) (pour ma part, j'ai pris la 26.04), puis téléchargez [Rufus](https://rufus.ie/) pour créer la clé bootable.
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
Dans Rufus, sélectionnez l'image Ubuntu téléchargée. Vérifiez bien qu'il ne reste aucun fichier important sur la clé USB avant de lancer l'écriture, en laissant les autres options par défaut. Une fois terminé, vous avez une clé prête avec l'installateur d'Ubuntu Server 26.04 LTS.

## Installation
Branchez la clé USB avant d'allumer le PC. Dès que le logo **Lenovo** apparaît, appuyez plusieurs fois de suite sur `F12` ; si ça ne marche pas, essayez `Fn+F12`. Une fois dans le **Boot Menu**, utilisez les flèches directionnelles pour choisir l'option contenant « USB » afin de démarrer sur la clé et lancer l'installation d'Ubuntu.

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

Pour les premiers écrans, laissez simplement les choix par défaut. Arrivé à cette étape, l'IA m'a conseillé de cocher la troisième option : ça permet de rechercher automatiquement les pilotes tiers et d'éviter les galères de son absent ou de Wi-Fi qui refuse de se connecter.

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

Sur cet écran, si vous avez le Wi-Fi à la maison, descendez avec les flèches jusqu'à la deuxième ligne `wlp3s0`, appuyez sur Entrée, puis sélectionnez `Edit Wifi`. Il ne reste plus qu'à renseigner le nom et le mot de passe de votre réseau Wi-Fi : comme ça, la machine aura directement accès à Internet une fois l'installation terminée.

L'écran suivant permet de configurer un proxy ; si vous n'en avez pas besoin, passez-le directement.

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

Si, comme moi, vous dédiez entièrement le PC à cette transformation, continuez simplement en validant sur « Done ». L'écran suivant affichera un récapitulatif de votre configuration : validez encore avec « Done » puis « Continue », et l'installation va tourner pendant un petit moment...

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

Sur cet écran, vous pouvez définir le nom du serveur, votre nom d'utilisateur et votre mot de passe. L'installateur d'Ubuntu Server crée un compte utilisateur standard auquel il accorde les droits `sudo` ; comme Ubuntu verrouille par défaut le compte `root`, inutile de mettre `root` comme nom d'utilisateur. De mon côté, j'ai choisi `amiya`, ce qui me permet ensuite de me connecter avec `ssh amiya@服务器地址` et d'exécuter `sudo` dès que j'ai besoin des droits administrateur.

Notez bien le nom d'hôte, l'identifiant et le mot de passe choisis ici. En cas d'oubli, il n'est pas forcément nécessaire de tout réinstaller, mais la récupération est nettement plus pénible.

Ensuite, l'installateur vous propose d'activer Ubuntu Pro : passez directement, un utilisateur normal n'en a pratiquement jamais besoin haha.

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

On arrive maintenant au **point crucial**. D'abord, il faut absolument installer OpenSSH. Ensuite, si vous avez un compte GitHub avec une clé publique SSH déjà configurée, vous pouvez entrer directement votre pseudo GitHub pour l'importer. Une fois l'installation finie, vous pourrez vous connecter en SSH sur le réseau local via l'adresse IP et votre clé.

Une fois que vous êtes sûr que la clé publique a bien été importée, vous pouvez décocher `[ ] Allow password authentication over SSH` à l'écran : cette option détermine si la connexion SSH par mot de passe reste autorisée.

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

L'installateur affiche ensuite une liste de logiciels serveur courants. Si vous en avez vraiment besoin, cochez-les avec la barre d'espace ; sinon, sélectionnez directement `Done`.

Enfin, après avoir cliqué sur `Reboot Now`, si le message **Please remove the installation medium, then press ENTER** s'affiche, c'est tout simple : retirez la clé USB puis appuyez sur Entrée pour démarrer normalement ! Si le message n'apparaît pas, débranchez la clé dès que l'écran devient noir, sinon vous êtes bon pour repartir pour un tour en boucle...

## Configuration initiale

Pour faciliter les connexions à distance par la suite, j'ai opté pour un réseau privé avec Tailscale.

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

Une fois l'installation terminée, le terminal affiche généralement un lien Tailscale : il suffit de vous connecter à votre compte Tailscale sur votre machine principale pour accéder facilement au serveur comme en réseau local !

# Épilogue
Ça fait maintenant un peu plus de deux jours que la machine tourne, et j'ai réussi à migrer dessus mes bots AstrBot et NapCat (Sayori), oh yeah !

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

J'ai aussi migré Fast Note Sync sur ce serveur maison, ce qui rend la synchronisation des données de mon blog nettement plus rapide.

> [!NOTE]
> Pour l'instant, je ne sais pas trop quoi d'autre y installer miaou, mais avoir un petit serveur hébergé à la maison reste quand même bien marrant miaou. En pratique, le débit montant tourne autour de 70 Mbps, et la config 2 cœurs / 4 Go de RAM fait très bien l'affaire. Si vous avez lu jusqu'ici, n'hésitez pas à me souffler des idées pour tirer parti de ce petit serveur domestique !

## Pour aller plus loin

Une fois la machine prête, vous pouvez enchaîner avec [[docker-compose-minimum-start|Introduction minimaliste à Docker]], puis piocher un service utile dans la [[2c2g-server-service-index|liste de services pour petit serveur]].

J'ai aussi rapatrié la synchronisation de mes notes à la maison : toute la démarche est détaillée dans [[fast-note-sync-on-student-server|Fast Note Sync]], et si vous voulez associer un nom de domaine et du HTTPS à vos services, jetez un œil à [[cloudflare-free-tier-developer-guide|Cloudflare]].
