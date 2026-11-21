---
title: Plugins Godot vraiment utiles
published: 2026-07-03
created: 2026-07-03
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 2
description: ""
image: ""
tags:
  - été 2026
  - notes d'outils
  - Godot
  - développement de jeux
category: "Carnet personnel"
draft: false
alias: ""
lang: fr
translationKey: "posts/godot-useful-plugins/godot-useful-plugins"
---

# Intro
Puisque je vais reprendre le développement de jeux, autant faire le point sur l'arsenal avant de me lancer ! Je rassemble ici les plugins que j'utilise souvent dans mes projets. Il y a le [Godot Asset Store](https://store.godotengine.org/), la boutique officielle la plus récente, où on trouve déjà plein de trucs utiles ; et j'ajoute aussi une communauté Godot chinoise, [开源项目 - GodotHub](https://godothub.com/oss), qui propose des plugins compatibles avec TapTap et les mini-jeux WeChat / Douyin.

# DialogueManager
[nathanhoad/godot_dialogue_manager: A powerful nonlinear dialogue system for Godot](https://github.com/nathanhoad/godot_dialogue_manager), mon plugin de dialogue préféré. Même s'il y a d'autres options très solides comme [dialogic-godot/dialogic: 💬 Create Dialogs, Visual Novels, RPGs, and manage Characters with Godot to create your Game!](https://github.com/dialogic-godot/dialogic) ou [Konado](https://godothub.com/oss/konado/zh/2.4/) sur GodotHub, celui-ci reste celui dont j'ai le plus l'habitude : il permet assez facilement de pousser la personnalisation très loin.

# SceneManager
[m-canton/godot-scene-manager: Scene Manager Plugin for Godot.](https://github.com/m-canton/godot-scene-manager), c'est la version que j'utilise et je la trouve plutôt pratique. Il me semble qu'il y a aussi deux autres plugins scene-manager à plus de cent étoiles sur GitHub, j'irai jeter un œil à l'occasion.

# RichText2
[RichTextLabel2 - Godot Asset Library](https://godotengine.org/asset-library/asset/3254)
J'aime bien le coupler aux dialogues de DialogueManager juste au-dessus pour faire des effets de texte bien stylés — je rajouterai un GIF ici la prochaine fois.

# PhantomCamera
À part son côté un peu lourd (qu'on peut bien sûr alléger soi-même en coupant des trucs), PhantomCamera n'a que des qualités de simplicité et d'efficacité. Voilà le lien : [ramokz/phantom-camera: A Camera addon for Godot 4. Inspired by Cinemachine.](https://github.com/ramokz/phantom-camera).

# SoundManager
Si votre jeu n'a pas besoin d'aller jusqu'à FMod mais que vous voulez mieux gérer l'audio, [nathanhoad/godot_sound_manager: A simple music and sound effect player for the Godot Engine](https://github.com/nathanhoad/godot_sound_manager) est un très bon choix.

# EnhanceSaveSystem
Un peu d'autopromo maison (façon de parler), c'est un plugin de sauvegarde que j'ai bricolé en mixant vibe coding et programmation manuelle, et que j'utilise un peu partout dans mes projets. Je trouve que le système modulaire est assez pratique, qu'il est facile d'y glisser des hooks et qu'il gère aussi différents types de chiffrement : [Amiyadesi/enhance_save_system](https://github.com/Amiyadesi/enhance_save_system).

# GodotSteam
[Welcome To GodotSteam - GodotSteam](https://godotsteam.com/), le très célèbre plugin GodotSteam : si vous comptez sortir sur Steam, il faudra forcément passer par là.

# Pour finir
À force des décisions un peu mystérieuses d'Unity, Godot s'est démocratisé ces dernières années, et ce n'est pas immérité selon moi. À l'ère de l'IA, ce moteur open source brille encore davantage parce qu'il s'accorde très bien avec. Bref, si vous aimez l'open source et la liberté ou si vous avez juste envie d'essayer un nouveau moteur, Godot est une valeur sûre ; et si vous voulez en faire de vrais projets, s'appuyer intelligemment sur des plugins tombe sous le sens !

## À lire ensuite

En dehors des plugins, je raconte mon propre parcours dans [[re0：game-dev-life|Repartir de zéro : mon quotidien de dev indé]], ainsi qu'une [[after-gmtk|rétrospective de GMTK Jam]] où le périmètre a été sauvé in extremis.

Si vous êtes prêt à publier votre jeu sur Steam, après GodotSteam il faudra passer par le compte et les paiements — j'en parle dans [[steam-dev-work-01|Guide d'inscription développeur Steam]].
