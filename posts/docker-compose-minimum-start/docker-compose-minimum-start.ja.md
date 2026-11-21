---
title: "Docker と Docker Compose 最小限入門：yml ファイルを読めるようになる"
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: "サーバーを手に入れたばかりの人に向けた Docker 最小限入門：コンテナとは何か、Compose ファイルの読み方、起動・停止・更新・削除まで。仕組みは省いて使えることだけ書く。"
image: ""
tags:
  - 実践チュートリアル
  - Docker
  - VPSとセルフホスト
  - 初心者入門
category: "チュートリアル・ガイド"
draft: false
alias: ""
lang: ja
translationKey: "posts/docker-compose-minimum-start/docker-compose-minimum-start"
---

他の記事を見てもらえばわかるけど、セルフホストサービスのほとんどは Docker で動かしている。

Vaultwarden、ntfy、Gatus、Fast Note Sync、どれも `docker-compose.yml` ファイルひとつで片付く。

この記事では、サーバーを手に入れたあと、どうやって Docker を入れて、compose ファイルを読んで、コンテナを起動・停止・更新・削除するか、さっき挙げたサービスを一通り動かせるくらいにまとめる。

## Docker とは（ひとこと版）

Docker を使うと、誰かがパッケージ済みの「イメージ」でそのままサービスを動かせる。自分の環境に依存関係をひとつずつ入れる手間がなくなる。

Python も Go も Node も手動で入れなくていいし、環境変数の設定やバージョン衝突とも無縁になる。イメージの中に全部入っているから。

`docker-compose.yml` は設定ファイルで、Docker にこう伝える：

- どのイメージを pull するか
- どのポートを使うか
- どのディレクトリをマウントするか
- どの環境変数を設定するか
- 落ちたときに自動再起動するかどうか

## インストール

Ubuntu / Debian に Docker を入れる場合：

```bash
curl -fsSL https://get.docker.com | sh
```

このワンライナーで Docker Engine と Docker Compose が入る（今は compose が Docker のサブコマンドになっているので、`docker-compose` を個別に入れる必要はない）。

入れたあとの確認：

```bash
docker --version
docker compose version
```

`sudo` なしで Docker を動かしたい場合：

```bash
sudo usermod -aG docker $USER
```

そのあと一度ログアウトして入り直す。それでもダメならサーバーを再起動。

## 最初の compose ファイル

一番シンプルな例で見てみよう：

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

1行ずつ訳すとこんな感じ：

| 行 | 意味 |
| --- | --- |
| `services:` | ここからサービス一覧を定義する |
| `whoami:` | サービス名。適当でOK |
| `image: traefik/whoami` | このイメージを使う |
| `container_name: whoami` | コンテナ名を whoami にする |
| `restart: unless-stopped` | 落ちたら自動再起動。手動で止めたときだけ除く |
| `ports: - "127.0.0.1:8080:80"` | ホスト側の 8080 番ポートをコンテナの 80 番ポートにマッピング |

これを `docker-compose.yml`（または `compose.yml`、どっちの名前でもいい）として保存して、同じディレクトリで実行する：

```bash
docker compose up -d
```

`-d` はバックグラウンド実行。

確認：

```bash
curl http://127.0.0.1:8080/
```

何か返ってくれば動いている。

## よく使うコマンド

よく使うやつを並べておく：

```bash
# 启动（后台）
docker compose up -d

# 查看日志
docker compose logs -f

# 查看日志（只看最后 100 行）
docker compose logs --tail=100

# 停止
docker compose down

# 重启
docker compose restart

# 查看状态
docker compose ps

# 进入容器内部（排查问题时用）
docker compose exec whoami sh
```

どのコマンドも、`docker-compose.yml` があるディレクトリで実行する。

## 本番っぽい compose ファイルを読む

Vaultwarden の例で見てみる：

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

新しく出てきた要素：

| フィールド | 意味 |
| --- | --- |
| `environment:` | 環境変数。設定項目みたいなもの |
| `volumes: - ./vw-data:/data` | カレントディレクトリの `vw-data` フォルダをコンテナ内の `/data` にマウントする |

### environment

環境変数は、ほとんどの Docker サービスで使われる設定方法。

サービスごとに変数は違って、たとえば Vaultwarden なら `DOMAIN` や `SIGNUPS_ALLOWED`、ntfy なら `NTFY_BASE_URL` や `NTFY_AUTH_DEFAULT_ACCESS` といった具合。

各プロジェクトのドキュメントを見れば、どんな変数が使えるかわかる。

### volumes

volumes はデータ永続化の要。

コンテナを消すと、コンテナの中身は消える。でも volumes でマウントしたディレクトリはホスト側にあるので、コンテナと一緒に消えたりしない。いわばゲームのセーブデータみたいなもので、コンテナを起動するたびにセーブデータを読み込んで始めるようなもの（笑）。

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

つまりこういうこと：

- コンテナ内の `/data` にあるファイルは、実際にはホスト側の `./vw-data` に置かれている
- コンテナを消して作り直しても、データは残る
- バックアップはホスト側の `./vw-data` だけ取ればいい

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1` は、自機（localhost）からしかアクセスできないという意味。外からは繋がらない。

`"0.0.0.0:8080:80"` や `"8080:80"` と書くと、グローバル側からも直接アクセスできるようになる。

パスワード管理や管理パネルみたいなものは、まずは必ず `127.0.0.1` にして、そのあとリバースプロキシや Tunnel で HTTPS 公開するのが安全。

## 機密情報は .env ファイルに入れる

パスワードや Token、ドメインを `docker-compose.yml` に直書きして GitHub に push しないこと。

同じディレクトリに `.env` ファイルを作る：

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

そして compose 側から参照する：

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

`.env` ファイルは `.gitignore` に入れて、リポジトリには入れない。

## サービスの更新

サービスを更新する手順：

```bash
cd /srv/stacks/vaultwarden

# 先备份数据
tar -czf backup-$(date +%F).tar.gz vw-data

# 拉新镜像
docker compose pull

# 用新镜像重启
docker compose up -d

# 看日志确认正常
docker compose logs --tail=50
```

更新する前にバックアップを取っておく。何かあってもロールバックできる。

## サービスの削除

あるサービスがいらなくなったら：

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down` はコンテナだけを消して、volumes のデータは消さない。

volume も含めて丸ごと片付けたいなら：

```bash
docker compose down -v
```

ただしデータは消える。本当に不要になってから使う。

## ディスクの掃除

Docker を長く使っていると古いイメージがたまっていく。2C2G のディスクはそこまで広くないので、たまに掃除する：

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

`prune` は使われていないものだけを掃除するので、稼働中のサービスには影響しない。ただ `--volumes` はよく考えてから使うこと。

## 自分のディレクトリ構成

自分はこんな感じで置いている：

```text
/srv/stacks/
├── vaultwarden/
│   ├── docker-compose.yml
│   ├── .env
│   └── vw-data/
├── ntfy/
│   ├── docker-compose.yml
│   ├── .env
│   ├── cache/
│   ├── data/
│   └── etc/
├── gatus/
│   ├── docker-compose.yml
│   └── config/
└── fast-note-sync/
    ├── docker-compose.yml
    ├── .env
    └── storage/
```

サービスごとに1ディレクトリ。中に入って `docker compose up -d` すればいい。データも設定も自分のディレクトリにまとまっているので、バックアップもしやすい。

## よくあるハマりどころ

**ポート競合**

同じホストポートを2つのサービスでは使えない。Vaultwarden で 8080 を使っているなら、ntfy は 8090 みたいに変える必要がある。

**権限まわり**

イメージによってはコンテナ内を非 root ユーザーで動かすものがあり、マウントしたディレクトリの権限が合っていないと書き込めないことがある。そんなときはホスト側ディレクトリの所有者と権限を確認する。

**-d を忘れる**

`docker compose up` で `-d` をつけないと、ターミナルを閉じた瞬間にサービスも止まる。`-d` を忘れずに。

**compose v1 vs v2**

古い記事にある `docker-compose up`（ハイフンあり）は v1。今は `docker compose up`（スペースあり）が v2。新しく入れた環境は全部 v2 なので、古い記事でハイフンになっていたらスペースに読み替えればいい。

## これで十分動く

ここまで来れば、もう次ができる：

- Docker を入れる
- compose ファイルを読む
- サービスの起動・停止・更新・削除
- データと設定の管理
- ディスクの掃除

これからのセルフホスト記事でも、基本的には `docker-compose.yml` をひとつ渡すだけで動かせるはず。

最初から Docker の概念を全部理解しなくていい。まずは動かしてみて、触っているうちに知りたくなればそれで十分。

## 続きを読む

まずは [[2c2g-server-service-index|小規模サーバー向けサービス一覧]] から用途を選んで、[[selfhost-ntfy-on-2c2g|ntfy 通知]] や [[selfhost-vaultwarden-on-2c2g|Vaultwarden パスワード管理]]、[[fast-note-sync-on-student-server|Obsidian 同期]] を動かし、ドメインと入り口は [[cloudflare-free-tier-developer-guide|Cloudflare]] につなぐ。
