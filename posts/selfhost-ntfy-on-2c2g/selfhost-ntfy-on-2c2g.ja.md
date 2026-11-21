---
title: 2C2G の学生用サーバーで ntfy を動かす：自分だけの通知ボタンを手に入れる
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: Docker を使って学生用サーバーに ntfy プッシュ通知サービスをデプロイし、バックアップスクリプトや監視、定期実行タスクからスマートフォンへ通知を送れるようにする。
image: ""
tags:
  - 実践チュートリアル
  - VPSとセルフホスト
  - Docker
  - プッシュ通知
category: "チュートリアル・ガイド"
draft: false
alias: ""
lang: ja
translationKey: "posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g"
---

ntfy は、私のサーバーで最も地味ながら最も役に立つサービスの一つです。

やっていることは単純で、HTTP リクエストを 1 つ送るだけで、そのメッセージをスマートフォンへプッシュしてくれる、いわば通知のパイプラインです。

しかし、このパイプラインの用途は想像以上に多岐にわたります：

- バックアップスクリプトの実行完了時に、成功か失敗かを知らせる
- サーバーの料金アラートがトリガーされた時に、確認するよう通知する
- 定期実行タスクでエラーが起きた時に通知を飛ばす
- Gatus の監視でいずれかのサービスがダウンした時に通知する
- 証明書の有効期限が切れそうな時に警告する
- 自前のコマンドを送信して、一時的なリモート操作を実現することもできる

公式プロジェクト：

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

公式サイトドキュメント：

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## なぜセルフホストするのか

ntfy には公式のパブリックサーバー `ntfy.sh` があり、何もインストールしなくてもそのまま使えます。

それでも私がセルフホストを選ぶ理由は以下の通りです：

- パブリックサーバーのトピックは公開されている。トピック名を知っていれば誰でもメッセージを送信できてしまう
- セルフホストならユーザー認証を追加できる
- セルフホストなら保持期間やログをコントロールできる
- 学生用サーバーにはどうせ空き容量があるし、ntfy はとても軽い

ちょっと試してみたいだけなら、パブリックの `ntfy.sh` で全く問題ありません。しかし長く使うなら、セルフホストのほうが安心感があります。

## デプロイ

ディレクトリの準備：

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

`docker-compose.yml` を作成する：

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

いくつかのポイント：

- ポート `127.0.0.1:8090:80`：ローカルホストのみをリッスンする。直接パブリックインターネットに露出させないこと
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`：デフォルトですべての未認証リクエストを拒否する。これにより、自分自身（トークンまたはアカウントとパスワードを持つユーザー）だけが送受信できるようになる
- `NTFY_BASE_URL`：実際に使用するドメイン名を記入する。たとえば私は `ntfy.sayori.org` を使っている

## 起動

```bash
docker compose up -d
docker compose logs -f
```

ローカルでの確認：

```bash
curl http://127.0.0.1:8090/
```

ntfy の Web インターフェースからの応答が確認できれば OK です。

## ユーザーの作成

`deny-all` を設定しているため、自分用にユーザーを作成する必要があります：

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

パスワードの入力を求められます。このアカウントとパスワードは、後ほど通知の送信やスマホアプリで使用するので覚えておきましょう。

トークンを生成することもできます：

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

トークンはパスワードよりも便利で、スクリプト内でヘッダーとしてそのまま使用できます。

## ドメインの接続

Vaultwarden と同様に、Cloudflare Tunnel または Caddy/Nginx リバースプロキシ経由で行います。

Cloudflare Tunnel の場合：

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

HTTPS で正常にアクセスできることを確認したら、`https://ntfy.example.com` を開き、先ほどのアカウントで Web インターフェースにログインします。

## 最初の通知を送る

最も簡単な方法：

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

ここで `/test` はトピック名です。`/backup`、`/alert`、`/server` など、好きな名前を付けることができます。

タイトルや優先度を指定することもできます：

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## スマホアプリ

Android：

- F-Droid に ntfy クライアントがある
- Google Play にもある

iOS：

- App Store で「ntfy」を検索する

アプリを開いたら：

1. 設定からセルフホストサーバーのアドレスを追加する
2. アカウントとパスワード、またはトークンを入力する
3. トピックをサブスクライブする（例：`backup`、`alert`）

これで、サーバーから送信された通知がスマートフォンに届くようになります。

## スクリプト内で使う

バックアップスクリプトの末尾に 1 行追加する：

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

定期実行タスクの失敗通知：

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## Gatus との連携

ヘルスチェックに Gatus を使っている場合、Gatus の設定に ntfy をアラートチャネルとして追加できます。

Gatus は ntfy のネイティブアラートをサポートしており、設定にサーバーアドレス、トピック、トークンを記述するだけです。

こうすることで、いずれかのサービスがダウンした際に Gatus が自動的に ntfy へ通知を送り、スマホを鳴らすことができます。

## リソース消費

ntfy は非常に軽量です。

私のサーバー上で稼働させていますが、普段のメモリ使用量は大体 20〜30MB 程度です。CPU 使用率はほぼゼロに等しいです。2C2G の環境にとっても全く負担になりません。

データベースも不要です。メッセージはローカルファイル内にキャッシュされ、デフォルトでは一定期間経過後に自動的に期限切れになります。

## 注意事項

- ntfy のトークンをパブリックリポジトリに書き込まないこと
- `deny-all` を設定している一方で、一部の外部サービス（同じマシンから送信する Gatus など）が認証なしで通知を送る必要がある場合は、特定のトピックに対して個別に権限を解放することができる
- メッセージは永久には保存されない。履歴が必要な場合は、送信側自身でログを記録する必要がある
- ntfy の Web インターフェースをパブリックインターネットに公開する必要はない。スマホアプリの購読には API を使えばよい

## 2C2G で動かすのに向いているか

非常に向いています。2C2G において間違いなく最も費用対効果の高いサービスの一つです。

これを導入すれば、ほとんどすべてのスクリプトの最後の手順が「結果を通知で送る」に変わり、毎日わざわざ SSH でログインしてログを確認するよりも圧倒的に快適になります。

しかも ntfy では、例えばブログの管理者としてコメントの審査を ntfy 経由で自分に通知させ、削除を選べば `/delete コメントID`、復元を選べば `/recover コメントID` といった具合に、独自の小さなコマンドをカスタマイズして実行することもできます。

## 続けて読む

ドメインと HTTPS については [[free-domain-and-web-community|ドメインチュートリアル]] と [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]] を続けてご覧ください。通知パイプラインが整えば、[[selfhost-vaultwarden-on-2c2g|Vaultwarden]] のバックアップ結果もスマホに飛ばせるようになります。その他の用途については [[2c2g-server-service-index|サービス一覧]] に戻って選んでみてください。
