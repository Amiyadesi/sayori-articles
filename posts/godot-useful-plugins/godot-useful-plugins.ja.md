---
title: 役立ちそうなGodotプラグインまとめ
published: 2026-07-03
created: 2026-07-03
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 2
description: ""
image: ""
tags:
  - 2026夏
  - ツール記録
  - Godot
  - ゲーム開発
category: "個人の記録"
draft: false
lang: ja
translationKey: "posts/godot-useful-plugins/godot-useful-plugins"
alias: ""
---

# はじめに
ゲーム開発を再開するわけだし、始める前に手持ちの装備でも整えておこう！自分のプロジェクトでよく使うプラグインをここにまとめておく。[Godot Asset Store](https://store.godotengine.org/)は現在の公式最新アセットストアで、便利なプラグインもいろいろ見つかる。さらに中国語圏のGodotコミュニティである[开源项目 - GodotHub](https://godothub.com/oss)も補足しておくと、ここにはTapTapやWeChat・Douyinミニゲーム向けのプラグインがある。

# DialogueManager
[nathanhoad/godot_dialogue_manager: A powerful nonlinear dialogue system for Godot](https://github.com/nathanhoad/godot_dialogue_manager)。一番よく使うダイアログプラグイン。ほかにも[dialogic-godot/dialogic: 💬 Create Dialogs, Visual Novels, RPGs, and manage Characters with Godot to create your Game!](https://github.com/dialogic-godot/dialogic)やGodotHubの[Konado](https://godothub.com/oss/konado/zh/2.4/)といった優秀なものもあるけれど、管理人的にはこれが一番しっくりくるし、より簡単に高度なカスタマイズができる。

# SceneManager
[m-canton/godot-scene-manager: Scene Manager Plugin for Godot.](https://github.com/m-canton/godot-scene-manager)。管理人が使っているのはこのバージョンで、個人的にはなかなか使いやすいと感じている。GitHubには星が百超えのscene-manager系プラグインがあと2つあったはずなので、今度見てみよう。

# RichText2
[RichTextLabel2 - Godot Asset Library](https://godotengine.org/asset-library/asset/3254)
自分は上のDialogueManagerの会話と組み合わせて使うことが多くて、かなりカッコいい文字演出が作れる。今度ここにGIFを貼っておこう。

# PhantomCamera
幽霊カメラはちょっと大げさ（もちろん自分で削ることもできる）なところを除けば、あとは便利で使いやすいだけ。[ramokz/phantom-camera: A Camera addon for Godot 4. Inspired by Cinemachine.](https://github.com/ramokz/phantom-camera)、リンクはこちら。

# SoundManager
FMODを導入するほどではないけれど、オーディオをもう少しちゃんと制御したいなら、[nathanhoad/godot_sound_manager: A simple music and sound effect player for the Godot Engine](https://github.com/nathanhoad/godot_sound_manager)がかなりいい選択肢になる。

# EnhanceSaveSystem
手前味噌というか自画自賛（嘘）だけど、管理人がバイブコーディングと手作業のプログラミングを組み合わせて作ったセーブプラグイン。自分のプロジェクトでも広く使っていて、個人的にはかなり扱いやすいモジュール式のセーブシステムだと思う。hookなども差し込みやすく、各種暗号化セーブにも対応している[Amiyadesi/enhance_save_system](https://github.com/Amiyadesi/enhance_save_system)。

# GodotSteam
[Welcome To GodotSteam - GodotSteam](https://godotsteam.com/)。超有名なGodotSteamプラグイン。Steamに出したいなら、間違いなく調べておくべきやつ。

# おわりに
Unityの謎ムーブが続いたせいで、ここ数年Godotがどんどん大衆化してきたけれど、それも納得だと思う。このオープンソースエンジンは今のAI時代にも一段と映えるというか、AIとの相性がかなり高い。とにかくオープンソースの自由さが好きだったり、新しいエンジンを試してみたいなら、Godotはかなりいい選択肢になるはず。作品を作りたいなら、プラグインの力を合理的に借りるのも当然だよね！

## 関連記事

プラグイン以外の自分の開発記録は [[re0：game-dev-life|再始動、ゼロから始めるゲーム開発生活]] に、ギリギリのタイミングでスコープを縮めた [[after-gmtk|GMTK Jam 振り返り]] もある。

作品をSteamに出す準備ができたら、GodotSteamのあとにアカウントや支払いまわりの話も出てくるので、そのあたりは [[steam-dev-work-01|Steam 開発者登録ガイド]] に書いておいた。
