---
title: 無料＆便利なブラウザ拡張機能リスト：スクリプト、翻訳、パスワード、倍速、類似サイト検索とプライバシー
published: 2026-07-02
created: 2026-07-02
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: Tampermonkeyスクリプト、Immersive Translate、Bitwarden、Global Speed、SimilarSites、AI補助拡張機能とプライバシー系拡張機能の簡単なまとめ
image: ""
tags:
  - 2026夏
  - ツール記録
  - ブラウザ拡張機能
  - 効率化ツールボックス
category: "個人の記録"
draft: false
alias: ""
lang: ja
translationKey: "posts/useful-browser-extensions-toolbox/useful-browser-extensions-toolbox"
---

この記事ではブラウザの拡張機能とスクリプトの入り口だけを載せておく

よく使うソフトは [[useful-free-software-toolbox|無料＆便利なソフトリスト]] を参照

サイト内の関連記事は [[site-article-index|当サイト記事インデックス]] を参照

# 拡張機能とは

![[Pasted image 20260703114150.png|width=560|align=center|caption=浏览器插件入口]]
右側のパズルのピースをクリックすると拡張機能ストアに行ってダウンロードできる。ブラウザ拡張機能は簡単に言えばページに挿入される追加のスクリプトなのでいろいろなことができる。そのため出所不明の拡張機能はなるべくダウンロードしないほうがいい、できるだけ正規のものをダウンロードしよう、ストアにあるものでも十分足りる

# AdGuard
![[Pasted image 20260703123311.png|width=520|align=center|caption=AdGuard 插件面板]]
公式拡張機能ストアからダウンロード可能、めちゃくちゃ便利な広告ブロック拡張機能でブラウザ必須級といえる、ダウンロードしたら基本的にずっとオンにしたまま放置で大丈夫

# Tampermonkey
言わずと知れた有名な油猴（Tampermonkey）スクリプト、拡張機能の中のカスタム拡張機能みたいなもの、[https://www.youxiaohou.com/](https://www.youxiaohou.com/)、このサイト内のリソースから各種スクリプトなどをダウンロードするのがおすすめ。それからよく使っているものを一つ紹介すると[hmjz100/LinkSwift: JavaScriptベースのネットディスクファイルダウンロードリンク取得ツール。「网盘直链下载助手」をベースに改変し、百度网盘 / 阿里云盘 / 中国移动云盘 / 天翼云盘 / 迅雷云盘 / 夸克网盘 / UC网盘 / 123云盘 の8大ネットディスクに対応](https://github.com/hmjz100/LinkSwift)、他にも便利なスクリプトがいろいろある。あと学生としてはこれを使ってできることも多いけど、具体的なことは言わないでおく（ニヤリ）

# ~~Immersive Translate（沉浸式翻译）~~——Read Frog（陪读蛙）🐸
![[Pasted image 20260718200848.png|width=560|align=center|caption=陪读蛙插件]]
拡張機能ストアで見つかる、バイリンガル翻訳などをするのにすごく快適、標準の無料ルートだけでも悪くない。もっと高い精度を求めるなら、DeepSeek公式APIにチャージするか、[[anyrouter-sharedchat-cc-switch-student-guide|公式の学生向けAI枠]]を使ってLLMのAPIに接続して翻訳すれば、かなり長く安定して使える

最近Read Frogを試してみたら、翻訳ってこんなに速くできるのかと初めて気づいた！Immersive Translateって誰だっけ、知らないな、私とRead Frogの蜜月を邪魔しないでくれ

# Bitwarden
![[Pasted image 20260703121438.png|width=560|align=center|caption=Bitwarden 插件]]
これも拡張機能ストアで見つかる、標準機能だけで個人情報やクレジットカード、パスワードアカウント、パスキーの保存ができて自動入力もできる。ネットを渡り歩くなら必須といっていい、早いうちに触れておけばおくほどよくて、一度使い始めたらもう手放せなくなる。さらにステップアップした2FA保存には自分でvaultwardenを立てるのがおすすめ[[selfhost-vaultwarden-on-2c2g|自分でvaultwardenを構築する]]、あるいはどこか提供しているところを探すのもあり、例えば[[disroot-open-services-note|Disroot紹介]]この組織には無料のvaultwardenがある

# GlobalSpeed
![[Pasted image 20260703121741.png|width=560|align=center|caption=GlobalSpeed 插件]]
これも拡張機能ストアで見つかる、再生速度を簡単に調整できる、~~授業動画の消化にはめちゃくちゃ便利（霧）~~

# SimilarSites
![[Pasted image 20260703122818.png|width=560|align=center|caption=SimilarSites 插件]]
[Similarsites.com - Easily Explore alternative websites](https://www.similarsites.com/)、ここからダウンロードできる
さっきの油小猴（スクリプトサイト）を例にすると、この拡張機能を通じて似たような面白いサイトをさらに発掘できる、リソースを見つけたりインターネットを探索したりするのにすごく役立つ

# WebRTC Control

:::photo-grid
![[Pasted image 20260703124657.png|caption=激活状态]]
![[Pasted image 20260703124715.png|caption=关闭状态]]
:::

~~海外ネット必須~~、本当のIPアドレスを隠すのに役立ち、オンオフも簡単でオフにしたいときはワンクリックするだけ

# ALL API HUB
![[Pasted image 20260703123412.png|width=560|align=center|caption=ALL API HUB 插件]]
new-api系サイトを集約して自動チェックインと残高集計ができる、ようやく毎日泣く泣く手動でチェックインする日々から解放された

# Superpower Chatgpt
![[Pasted image 20260703125251.png|width=560|align=center|caption=Superpower ChatGPT 插件]]
[https://spchatgpt.com/](https://spchatgpt.com/)、サイトはこちら、これを入れるとEnterで改行してCtrl+Enterで送信できるようになる！さらに高度なモデルスイッチャーを有効にしてカスタムモデルを使ったり、定番の会話エクスポートやフォルダ分け、プロンプト保存なんかも一通り揃っている

# Voyager
![[Pasted image 20260703200044.png|width=480|align=center|caption=Voyager插件]]
上のと似たようなもので、これはGemini版、これも多くの機能に対応していてめちゃくちゃ使いやすい

# End
今のところはひとまずこれくらいにしておく。今後ほかに便利な拡張機能を見つけたら、たぶんここにも随時追記していくつもり。もし少しでも役に立てたなら光栄です(≧∇≦)/

## 続けて読む

Bitwardenを自分のパスワード保管庫に繋ぎたい場合は、続けて [[selfhost-vaultwarden-on-2c2g|セルフホスト Vaultwarden]] をどうぞ；AIツールのAPIやプロバイダー設定は [[anyrouter-sharedchat-cc-switch-student-guide|AI利用枠と cc-switch]] にまとめてある

広告やプライバシー系拡張機能が裏側で一体何を処理しているのかは、続けて [[cross-app-tracking-device-fingerprinting|スマホ広告とプライバシー読書インデックス]] にある3本の元記事を読んで、拡張機能と照らし合わせながら理解してみてほしい
