---
lang: ja
translationKey: "posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g"
title: 2C2G 学生サーバーに Vaultwarden を立てる：パスワード庫はまず丸裸のまま出さない
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: Docker Compose を使って学生サーバーに Vaultwarden をデプロイし、HTTPS、登録の無効化、バックアップ、リストア訓練といった本当に大事な部分をわかりやすくまとめる。
image: ""
tags:
  - 実践チュートリアル
  - VPSとセルフホスト
  - Docker
  - Vaultwarden
category: "チュートリアル・ガイド"
draft: false
alias: ""
---

Vaultwarden はおそらく、2C2G の小さなサーバーに載せるサービスの中でも特に相性がいいひとつだ。

とても軽く、クライアントのエコシステムも成熟していて、スマホや PC、ブラウザ拡張から Bitwarden 公式クライアントでそのまま繋げる。

ただ同時に、ノリで適当に触ることは一番おすすめしないサービスでもある。

ブログが壊れても作り直せるけれど、パスワード庫がやらかすと、失うのはアカウントや 2FA、パネルのパスワード、さらにはその先にある全サーバーの入り口だ。

だからこの記事では凝った遊び方はせずに、実用上十分な手順をまとめる。

1. Docker Compose で立ち上げる
2. HTTPS 経由でのみ外に出す
3. 登録が終わったらすぐ登録を切る
4. バックアップとリストアを後回しにしない

公式プロジェクト：

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Compose ドキュメント：

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## どんな人に向いているか

こういう人には向いていると思う。

- すでに自分の小さなサーバーを持っている
- パスワードデータを自分の手で握りたい
- HTTPS、バックアップ、更新といった面倒な運用を引き受けられる

とにかく手間をかけたくないなら、Bitwarden 公式ホスティングや 1Password、Apple パスワードなどで十分いい。

Vaultwarden の強みはメンテナンスゼロなことではなく、軽さと自由度、そして貧乏学生の小さなマシンでも扱いやすいところにある。

## 事前に用意するもの

- Docker が動く VPS
- ドメイン、または少なくとも安定した HTTPS の入り口
- Docker と Docker Compose
- 基本的な SSH、リバースプロキシ、ファイアウォールの知識

Docker がまだ入っていなければ、先に [[docker-compose-minimum-start|Docker と Docker Compose 最小入門：yml ファイルを読めるようになる]] を見ておくといい。

ドメインの設定がまだなら、先に [[free-domain-and-web-community|立てたばかりのブログに無料ドメインをつけて、管理人コミュニティに顔を出す]] をどうぞ。

## ディレクトリを作る

自分はいつもどおり `/srv/stacks` に置いている。

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

ディレクトリ構成はだいたいこんな感じになる。

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

あとでデータベースや添付ファイルなどは `vw-data` の中に入る。

## まずは compose を書く

```yaml
services:
  vaultwarden:
    image: ghcr.io/dani-garcia/vaultwarden:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true"
      INVITATIONS_ALLOWED: "false"
      ENABLE_WEBSOCKET: "true"
      TZ: "Asia/Shanghai"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

`vault.example.com` は自分のドメインに書き換える。

ここで一番大事なのはこの行だ。

```text
127.0.0.1:8080:80
```

つまり Vaultwarden はローカルホストの `8080` だけを待ち受けるということ。

公衆網から直接は叩かれず、Nginx や Caddy、Cloudflare Tunnel を通して転送される。

最初からこう書くのはやめておこう。

```text
0.0.0.0:8080:80
```

パスワード庫を公衆 HTTP ポートに丸裸で晒すのは、さすがにまずい。

環境変数をいくつか簡単に説明しておく。

- `DOMAIN`：最終的に実際にアクセスする HTTPS アドレス
- `SIGNUPS_ALLOWED`：初回登録時だけ一時的にオンにして、登録が終わったらすぐ切る
- `INVITATIONS_ALLOWED`：個人利用ならそのままオフ、誰かを招待したいならオンにできる
- `ENABLE_WEBSOCKET`：オンのままでよく、クライアントの同期体験が少し自然になる

## 起動する

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

ローカルから確認してみる。

```bash
curl -I http://127.0.0.1:8080/
```

ステータスコードが返ってくれば、コンテナは生きている。

ただ、これだけではまだ完了とは言えない。本当に大事なのは HTTPS だからだ。

## リバースプロキシと HTTPS

Vaultwarden のようなものを、長い間 HTTP で動かすのはよくない。

ブラウザのセキュリティコンテキストやパスワードマネージャのクライアント、そして自分自身の安心感のためにも、HTTPS はちゃんと通しておく必要がある。

自分はだいたい次の2つのルートのどちらかを選ぶ。

### ルート A：Caddy / Nginx

ドメインを直接サーバーに向けていて、80 と 443 を開けてもいい場合のやり方。

Caddy が一番ラクだ。

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

証明書は勝手にやってくれる。

Nginx でもよくて、基本の考え方は同じで、`https://vault.example.com` を `127.0.0.1:8080` に流す。

```nginx
server {
    listen 80;
    server_name vault.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vault.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        client_max_body_size 525M;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

書き換えたら確認も忘れずに。

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### ルート B：Cloudflare Tunnel

オリジンサーバーで 80 や 443 を直接開けたくないなら、Tunnel のほうが気楽だ。

構成はこうなる。

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

自分はこれを使っている。

それから一般的な話として、Vaultwarden 全体に Cloudflare Access のログイン画面をかけるのはおすすめしない。

ブラウザ拡張やスマホクライアントが使いにくくなるからだ。

どうしても追加で守りたいなら、まずは `/admin` だけを保護するほうがいい。

## 初回登録が終わったらすぐ登録を切る

`https://vault.example.com` を最初に開いたら、まずは自分のマスターアカウントを作る。

作れたらすぐ設定を書き換える。

```yaml
SIGNUPS_ALLOWED: "false"
```

そして再起動する。

```bash
docker compose up -d
```

自分のドメインはマイナーだから大丈夫、とは思わないほうがいい。公衆ネット上のサービスは遅かれ早かれスキャンされる。

## アカウントを作ったあとにまずやること

- 本当に強いマスターパスワードを設定する
- 二段階認証を有効にする
- HTTPS が正常であることを確認してからパスワードをインポートする
- インポートする前に、旧パスワードマネージャからオフラインのバックアップを書き出しておく

もうひとつ現実的な話として、

サーバーの SSH 鍵やパネルのパスワード、各種 root 級の認証情報を、バックアップ方針も固まっていないパスワード庫にいきなり突っ込むのは避けたい。

まずは動かしてみて、それから少しずつ移行していこう。

## バックアップ

Vaultwarden で一番大事なデータはここにある。

```text
/srv/stacks/vaultwarden/vw-data
```

一番シンプルなやり方は、まずは内部バックアップを作らせてから、ディレクトリごとアーカイブすることだ。

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

`.env` や SMTP、管理トークンなどを使っているなら、それも一緒にバックアップする。ただし公開リポジトリには絶対に入れないこと。

それからバックアップをローカルに引き取るか、別のマシンに同期する。

## リストア訓練

バックアップができるだけでは足りなくて、リストアできないと実はかなり危ない。

少なくともときどきは、バックアップアーカイブの中にちゃんと中身が入っているか確かめておきたい。

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

正常ならこんな中身が見えるはずだ。

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

実際にリストアするときは、まずサービスを止めて、古いデータを別の場所に退避させる。

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

リストア後は少なくとも次の4つを確認しよう。

- Web 画面が開けること
- 自分でログインできること
- エントリが残っていること
- ブラウザ拡張とスマホで同期できること

本当にぶっ壊れてから初めてリストアを学ぶような事態にはなりたくない。

## 更新

更新の前には必ずバックアップを取る。ここは手を抜かない。

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

更新が終わったらログを見るだけでなく、Web もクライアントも自分で開いて触ってみる。

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

## 2C2G に向いているか

とても向いている。

Vaultwarden 本体はそれほどリソースを食わないので、2C2G でも余裕で動く。

本当のコストは CPU やメモリではなく、運用の習慣にある。

- HTTPS
- 登録の無効化
- バックアップ
- リストア
- 更新

自分のセルフホスト路線を本気で始めたいなら、むしろ最初のちゃんとしたサービスとしてちょうどいい。

パスワード庫がもたらす便利さは想像以上で、自分用のパスワード庫をいじってみることは、デプロイの第一歩としてもとてもいい経験になる。

## 次に読む

パスワード庫のドメインや HTTPS は [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]] と組み合わせられるし、バックアップスクリプトの結果は [[selfhost-ntfy-on-2c2g|ntfy]] でスマホに飛ばせる。その他の軽量サービスは [[2c2g-server-service-index|小サーバーサービス一覧]] にまとめている。
