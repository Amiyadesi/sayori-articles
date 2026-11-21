---
title: "Disroot : un bouquet de services open source au parfum du vieil Internet idéaliste"
published: 2026-06-27
created: 2026-06-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Notes sur l'e-mail, le cloud, le XMPP et les outils collaboratifs de Disroot, et l'occasion de repenser les services publics que sayori.org peut maintenir sur le long terme
image: ""
tags:
  - Été 2026
  - Notes communautaires
  - Services open source
  - Fediverse
category: "Carnet personnel"
draft: false
lang: fr
translationKey: "posts/disroot-open-services-note/disroot-open-services-note"
alias: ""
---

> [!NOTE]
> Cette note date du 27 juin 2026 : les questions d'inscription, les quotas et les fonctionnalités disponibles sur Disroot peuvent évoluer, mieux vaut jeter un œil au site officiel avant de faire une demande

Aujourd'hui, je suis tombé sur une organisation open source plutôt sympa : [Disroot](https://disroot.org/)

Ce collectif rassemble tout un tas d'outils d'un Internet ouvert et les maintient sérieusement pour en faire une plateforme utilisable au quotidien

Sur le site officiel, la couleur est annoncée clairement : liberté, vie privée, fédération, décentralisation

Pas de pub, pas de pistage, pas de profilage, pas d'exploitation de données — purement d'intérêt général, et tout à fait digne de son .org

## Ce qu'on y trouve

La liste des services est ici :

[https://disroot.org/en/services](https://disroot.org/en/services)

Actuellement, il y a tout ça :

- Email, utilisable via le webmail ou en le connectant à un client IMAP
- Cloud, basé sur Nextcloud, pour synchroniser fichiers, calendriers et contacts
- XMPP Chat, un protocole de messagerie instantanée décentralisé
- Pads, des documents collaboratifs en ligne
- PrivateBin, un pastebin chiffré
- Upload, pour le partage temporaire de fichiers
- Forgejo, de l'hébergement de code
- CryptPad, une suite bureautique en ligne axée sur la confidentialité
- FEDIsroot, à l'adresse [fe.disroot.org](https://fe.disroot.org/), un service de microblogging ActivityPub / Fediverse basé sur Akkoma et compatible avec l'API Mastodon
- LibreTranslate, un service de traduction
- Vault, tout ce qui touche à la gestion de mots de passe

Pas besoin de tout utiliser, évidemment

Mais c'est justement là que c'est chouette : un seul compte créé, et tu as accès à toute cette panoplie de services open source

Pour quelqu'un comme moi qui aime bidouiller des sites perso, des serveurs et des logiciels libres, c'est franchement attirant, et c'est un bel exemple dont s'inspirer

## Une question d'inscription un peu insolite

Le formulaire d'inscription est par ici :

[https://user.disroot.org/pwm/public/newuser/](https://user.disroot.org/pwm/public/newuser/)

La question sur laquelle je suis tombé cette fois-ci était : qu'aimes-tu faire avant d'aller dormir ?

Et il faut écrire plus de 50 mots

Je trouve la question plutôt bien vue

Tu peux d'abord rédiger un petit paragraphe sérieusement en chinois ou dans une autre langue, puis le traduire en anglais

Par exemple, expliquer que tu aimes lire avant de dormir, préparer ta liste de tâches pour le lendemain, écouter de la musique, parcourir un peu l'actu des communautés open source, ou simplement poser ton téléphone loin de toi pour t'endormir plus tôt

## Ce que je vais en faire

Pour l'instant, j'ai créé un compte, même si à l'usage il n'y a guère que l'adresse e-mail qui m'intéresse vraiment — faut dire qu'à force de m'inscrire partout, j'ai déjà accumulé un sacré paquet d'adresses sur des domaines originaux, sans compter mes propres e-mails temporaires et mes domaines auto-hébergés

Il y a bien un service communautaire de Vaultwarden, mais comme j'auto-héberge déjà le mien, je n'en ai pas vraiment l'utilité

Et puis Disroot n'est pas l'offre gratuite d'un géant de la tech : ça tourne grâce à la communauté et aux dons. Savoir que c'est là si jamais j'en ai besoin, ça me suffit largement

## Ça m'a aussi poussé à revoir mes propres services

Après avoir parcouru la liste de Disroot et celle rassemblée par [[radical-servers-public-services|Riseup]], mon premier réflexe a aussi été de vouloir continuer à empiler des trucs sur sayori.org, histoire de me montrer à la hauteur du .org

Sauf que mes capacités personnelles restent limitées. Après en avoir discuté avec GPT, j'ai fini par dresser une liste de services publics, disponible juste ici <https://sayori.org/zh/services/>

Aujourd'hui, ce qui est vraiment ouvert à tout le monde, ce sont surtout GeoScore, les articles du blog, les flux RSS, le tableau blanc et le livre d'or. Search Gateway reste open source, mais l'instance en ligne ne sert plus qu'à mes propres sites et à mes tâches de maintenance

Plutôt que de continuer à empiler de nouveaux outils, j'ai plutôt envie de tester quelques pistes à très petite échelle : faire des bilans de santé pour des blogs personnels, aider des sites statiques non commerciaux à se mettre en ligne, fournir un petit quota de preuves de recherche, ainsi que des notifications basse fréquence de flux RSS vers e-mail ou Webhook

Rien de tout ça ne sera lancé d'emblée comme une plateforme publique anonyme : ce sera d'abord sur invitation, avec des quotas et un traitement manuel. S'il n'y a pas de demande, j'arrête ; si le coût de maintenance dépasse mes moyens, j'arrête aussi

Désormais, je préfère présenter sayori.org comme des services numériques publics maintenus à titre personnel, non commerciaux et fournis au mieux de mes possibilités, plutôt que comme une organisation d'intérêt général — je n'ai tout simplement pas l'énergie pour ça


## Pour aller plus loin

Dans la même veine, tu peux aussi jeter un œil à [[radical-servers-public-services|Collectifs techniques et services publics recensés par Riseup]], on y déniche pas mal de petites structures intéressantes

Si tu veux installer certains de ces services sur ta propre machine, regarde d'abord [[2c2g-server-service-index|Liste des services sur mon petit serveur]], et pour la partie coffre-fort de mots de passe, j'ai écrit à part [[selfhost-vaultwarden-on-2c2g|Notes sur l'auto-hébergement de Vaultwarden]]
