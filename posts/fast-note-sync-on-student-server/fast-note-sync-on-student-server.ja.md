---
title: 学生サーバーで Fast Note Sync をいじる：Obsidian にプライベートな同期レイヤーを
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: 2C2G の学生サーバーで Fast Note Sync Service を試運転し、Obsidian のマルチデバイス同期、バックアップ、REST/MCP インターフェース用のプライベートなルートを確保する。
image: ""
tags:
  - 実践チュートリアル
  - VPSとセルフホスト
  - Docker
  - Obsidian
category: "チュートリアル・ガイド"
draft: false
alias: ""
lang: ja
translationKey: "posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server"
---

現在、ブログの執筆もプロジェクトのメモも Obsidian でやっているのですが、Obsidian は最初パソコンで書き始めて、パソコンの中にメモが山のように溜まってからスマホで書けないことに気づいたので、同期サービスを探し始めたわけです。

公式の Obsidian Sync も手間いらずで便利ですが、財布には優しくありません。Syncthing、Git、WebDAV などにもそれぞれの良さはありますが、どうもしっくりきませんでした。

そしてついに見つけたのが Fast Note Sync というプラグインです。L サイト（Linux.do 等）を巡回しているときにコメント欄で見つけました。これは Obsidian プラグイン ＋ セルフホストのサーバーサイドという構成で、マルチデバイスでのリアルタイム同期を目標にしながら、バージョン履歴、添付ファイル、Web 管理画面、REST API、MCP などの機能もついでに搭載されているというもので、数日間実際に設定して使ってみたところ、本当に使い勝手が良かったのです b(￣▽￣)d

プラグイン：

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

サーバーサイド：

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Obsidian プラグインページ：

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## どんな人に向いているか

次のような人におすすめだと思います。

- すでに Obsidian で大量のコンテンツを書いている人
- 24 時間稼働の小さなサーバーを持っている人
- HTTPS、リバースプロキシ、バックアップを自分で何とかできる人
- いつでもどこでもメモを取りたい人

これなら、パソコンが手元になくてもスマホで手軽に文章が書けるし、戻ってきたらパソコンで同期するだけで済みます。

## サーバー側のデプロイ

サーバー側のリポジトリはこちらです：

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Go 言語で書かれたサーバーで、リポジトリの説明には高性能かつ低遅延なノート同期、オンライン管理、リモート REST API サービスプラットフォームと書かれています。

まずはディレクトリを作成します：

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

そして公式ドキュメントに従って、Docker、バイナリ、またはソースコードからのコンパイルのいずれかでデプロイします。どのような方法であれ、サービスはできるだけローカルアドレスのみを Listen させ、リバースプロキシや Tunnel を通じて HTTPS で公開するようにしています。

方針としては：

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

Docker Compose を使う場合は、少なくとも次の習慣を守りましょう：

- データディレクトリは現在のサービスディレクトリに永続化する
- 設定ファイルを公開リポジトリに入れない
- サービスのポートを直接パブリックネットワークに露出させない
- アップデートする前にデータディレクトリをバックアップする

同期サービスの中にあるのは自分のメモなのだから、丸裸で運用してはいけません。

## ドメインの接続

Caddy や Nginx を使ってもいいし、Cloudflare Tunnel を使ってもいいです。

例えばドメイン：

```text
notes.example.com
```

構造：

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

まだドメインを持っていない場合は、こちらを参考にしてください：

[[free-domain-and-web-community|取得したばかりのブログに無料ドメインを設定し、管理者コミュニティで顔を出す]]

直接アクセスするのはおすすめしません：

```text
http://服务器IP:<服务端口>
```

最低限 HTTPS にし、できればアクセス保護も追加しましょう。

## アカウントとプラグインの初期化

サーバーの README に書かれている大まかな手順は以下の通りです：

1. Web 管理画面を開く
2. 初回アクセス時にアカウントを登録する
3. 管理画面で API 設定をコピーする
4. Obsidian のプラグイン設定に設定を貼り付ける

GitHub Releases から `main.js`、`styles.css`、`manifest.json` を手動でダウンロードし、次の場所に配置します：

```text
.obsidian/plugins/fast-note-sync/
```

その後、プラグインページで有効化します。Web 画面で作成したトークンをコピーし、リモート設定に貼り付けるだけで、大抵はしばらくすると起動します。

## バックアップは同期よりも重要

同期はバックアップではない。

この言葉は单独で書いておく必要があります。同期は削除も同期してしまうし、エラーも同期してしまうからです。

Fast Note Sync 自体には、履歴バージョン、ごみ箱、バックアップ、ミラーリング、Git 同期などの機能が備わっていますが、それでも自分なりのセーフティネットを用意しておくべきです。

もしすでに Git で Obsidian を同期しているなら、いきなりその上にリアルタイム同期を重ね掛けしないこと。まずはどれがメインの同期で、どれがバックアップなのかをしっかり整理しましょう。

## MCP と REST API についてどう考えるか

Fast Note Sync Service は現在、REST API と MCP のサポートも提供しています。

これが個人的には非常に魅力的です。私のコンテンツの多くは Obsidian に入っているので、将来的に AI クライアントが制御されたインターフェース経由でメモを読み書きできるようになれば、単なる同期ツールではなく、個人の知識ベースへの入り口になるからです。

しかし、そこにはリスクも伴います。

AI がメモを読み書きできるということは、権限の境界線をもっと明確にする必要があるということです：

- MCP インターフェースをパブリックネットワークに直接露出させないこと
- 信頼できないクライアントに書き込み権限を与えないこと
- プライベートな日記、アカウント情報、秘密鍵をオープンな Vault に混ぜないこと
- 重要な Vault は最初は読み取り専用にし、プロセスを確認してから書き込みを検討すること

「AI に接続できるからといって、すぐに全権限を解放していい理由にはならない」ということです。

## 2C2G で高負荷にならないか

通常の個人利用であれば問題ないはずです。

実際にリソースを消費するのは、添付ファイルの数、同期の頻度、そして数十 GB もあるような素材ライブラリ全体を Obsidian にブチ込んでいるかどうかです。

## 続きを読む

メモのマルチデバイス同期ができたら、その中の公開記事をブログにする方法は [[astro-mizuki-blog-from-zero|シンプルなブログテンプレート]] をご覧ください。サービスのエントリと HTTPS については [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]]、その他のサーバーの用途は [[2c2g-server-service-index|サービス一覧]] に戻って確認できます。
