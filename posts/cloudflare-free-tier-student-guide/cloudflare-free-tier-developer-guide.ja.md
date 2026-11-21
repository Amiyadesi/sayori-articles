---
title: Cloudflareの無料枠で開発者に何ができるか：お金をかけないサイバー大善人フルセット
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: Cloudflareの無料枠で本当に使えるものを整理：Pages、Workers、R2、Tunnel、Email Routing、DNS、Web Analytics、そしてVPSより適している場面について。
image: ""
tags:
  - 実践チュートリアル
  - サイト構築とCloudflare
  - 公式学生特典
  - VPSとセルフホスト
category: "チュートリアル・ガイド"
draft: false
lang: ja
translationKey: "posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide"
alias: ""
---

Cloudflareが開発者界隈で「サイバー大善人」と呼ばれているのには、ちゃんとした理由がある。

その無料枠のボリュームは、個人開発者にとっては正直言って栄養過多なレベルだ。

この記事では、開発者が実際に使えそうな無料サービスをひと通りまとめておく。

## 登録

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

メールアドレスだけで登録できる。クレジットカードを紐づけなくても、無料枠のほとんどの機能は使える（R2など一部の機能はカード登録が必要だが、上限を超えない限り課金されない）。

うまく登録できない場合は、接続ノードを変えるかシークレットブラウザで試してみてほしい。

## Cloudflare Pages

これが一番よく使っているサービス。

Pagesを使うと、静的サイト（HTML、CSS、JS、あるいはAstro/Next.js/Hugoなどのフレームワークのビルド成果物）をCloudflareのグローバルネットワークにデプロイできる。

無料枠で使える内容：

- サイト数無制限
- 帯域幅無制限
- 月間500回のビルド
- 自動HTTPS
- カスタムドメイン
- プレビューデプロイ（PRごとにプレビューURLを発行）

個人ブログなら、実質制限なしに等しい。

自分のブログもPagesで動かしている。GitHubリポジトリにプッシュすると、GitHub ActionsでAstroをビルドし、WranglerでPagesにアップロードする仕組みだ。この流れ全体がゼロコストで完結する。

まだ使ったことがないなら：

[[astro-mizuki-blog-from-zero|Sayori Liteでシンプルなブログを作る]]

## Cloudflare Workers

WorkersはCloudflareのServerless関数。ちょっとしたJS/TSを書いてデプロイするだけで、Cloudflareのエッジノード上で動く。

無料枠で使える内容：

- 1日あたり10万リクエスト
- 1リクエストあたり10msのCPU時間
- コードサイズ1MB

向いている用途：

- シンプルなAPIの作成（ランダムな一文を返す、リクエストを転送する、短縮URLサービスを作るなど）
- 静的サイトにちょっとした動的ロジックを足す
- Webhookの受け口にする
- 簡単なプロキシやリダイレクト処理

向いていない用途：

- 長時間実行が必要なタスク
- データベースを伴う複雑なバックエンド（D1やKVは繋げるものの、無料枠に上限がある）
- 常時接続のWebSocketが必要なサービス

ただブログを書きたいだけなら、Workersは今のところ出番がない。でも存在を知っておくと後々いろんな小道具をいじるときによく出会うので、覚えておいて損はない。

## Cloudflare R2

R2はS3 API互換のオブジェクトストレージ。

無料枠で使える内容：

- 10GBのストレージ
- 月間1,000万回のクラスA操作（PUT/POST/LIST）
- 月間1,000万回のクラスB操作（GET）
- 下り転送料（エグレス）無料（これが最大の強み）

向いている用途：

- ブログの画像保存（カスタムドメインを組み合わせればそのまま画像ホスティングになる）
- バックアップファイルの保管
- 静的アセットのホスティング
- 小規模プロジェクトのファイルアップロード先

他のOSSより美味しい理由：下り転送料がかからないこと。Alibaba Cloud OSSなどは下り転送量に応じて課金されるが、R2は無料だ。個人ブログや小規模プロジェクトにとって、この差はかなり大きい。

R2の有効化にはクレジットカードの登録が必要だが、無料枠の範囲内なら課金は発生しない。

## Cloudflare Tunnel

Tunnelを使うと、内部ネットワークのサービス（たとえばVPS上で127.0.0.1のみをリッスンしているVaultwardenなど）を安全にインターネットへ公開できる。

仕組み：

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

メリット：

- VPS側で80/443番ポートを開放する必要がない
- 自分でSSL証明書を取得する手間がない
- Cloudflare Accessと組み合わせて認証レイヤーを追加できる
- オリジンサーバーのIPアドレスが露出しない

自分の[[selfhost-vaultwarden-on-2c2g|Vaultwarden]]、[[selfhost-ntfy-on-2c2g|ntfy]]、Gatus、1Panel管理画面はすべてTunnel経由にしている。ノート同期の使い方については[[fast-note-sync-on-student-server|Fast Note Sync チュートリアル]]にまとめた。

無料枠にTunnel数の制限はない。1本のTunnelで複数のサブドメインをさばくこともできる。

セットアップはVPS上で `cloudflared` デーモンを動かすだけ。こちらから外へ接続しにいく仕組みなので、インバウンドのファイアウォールルールも不要だ。

## Cloudflare DNS

ドメインのネームサーバー（NS）をCloudflareに向けるだけで、無料のDNSホスティングが使える。

まだドメインを決めていないなら、先に[[free-domain-and-web-community|無料ドメインと学生パックドメイン]]を見ておくといい。

メリット：

- グローバルAnycastによる高速な名前解決
- 無料のDNSSEC
- Proxyモードと組み合わせてオリジンIPを隠蔽
- 管理画面がわかりやすい

他社のレジストラ（Namesilo、Porkbun、SpaceShip、各種クラウドなど）で買ったドメインでも、NSをCloudflareに変更すればここで管理できる。

無料ドメイン（DNSHEのcc.cdなど）を使っている場合は、そのサービスがNS変更に対応しているか確認が必要だ。変更できるものもあれば、元の管理画面でレコード追加しかできないものもある。

## Cloudflare Email Routing

Email Routingを使うと、独自ドメイン宛てのメールを受け取って、普段使っている自分のメールアドレスへ転送できる。

たとえばこんな感じ：

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

無料で使えて、自前でメールサーバーを立てる必要もない。

向いている用途：

- ブログの連絡用メールアドレスを用意しつつ、本物のアドレスは隠す
- 各種サービスに登録するときの独自ドメイン用アドレスにする
- メール関連のDNSレコード（MX、SPF、DKIM）の仕組みを学ぶ

注意点：これはあくまで受信転送専用。独自ドメインからメールを送信したい場合は、別途設定が必要になる（GmailのSMTP＋エイリアス機能を使うか、Resend、Mailgun、Zoho Mailといったサービスを使うなど）。

## Cloudflare Web Analytics

JSスクリプトを一切埋め込まなくても、Cloudflare側でサイトの基本的なアクセス解析データを確認できる。

ダッシュボードのWeb Analyticsから有効化するだけ。

Google Analyticsよりずっと軽い：

- ユーザーを追跡しない
- Cookieを発行しない
- 追加のJS読み込みが不要
- プライバシーに優しい

個人ブログであれば、毎日どれくらい人が来ているか、どこから来たか、どのページが見られているかが分かれば十分だ。

もっと詳細な分析（イベント計測、ファネル、カスタムディメンションなど）が欲しくなったら、その時にUmamiやPlausibleを検討すればいい。最初のうちはCloudflare標準のもので事足りる。

## Cloudflare Access（Zero Trust 無料枠）

Accessを使うと、あらゆるWebサービスにログイン保護のレイヤーを追加できる。

たとえば `panel.example.com` で管理パネルを動かしていて、誰にでもアクセスされたくない場合。Accessを設定しておけばアクセス時にログイン画面が挟まり、認証を通った人だけが入れるようになる。

無料枠では最大50ユーザーまで対応している。

認証方法の選択肢：

- メールアドレスのワンタイムパスコード
- GitHubログイン
- Googleログイン

自分の1Panel管理画面もAccessで保護している。パネル自体にパスワードがかかっていても、入り口に認証がもう1枚あるに越したことはない。

## 他に無料のもの

他にも無料だけど、自分はあまり使っていないもの：

- **D1**：Workersの隣で動くSQLiteデータベース。無料枠は5GB
- **KV**：キーバリューストア。1日の読み書き制限はあるが小規模プロジェクトなら十分
- **Queues**：メッセージキュー
- **Images**：画像変換（ここの無料枠はかなり控えめ）
- **Stream**：動画ホスティング（無料枠だとほぼ足りない）
- **Zaraz**：サードパーティスクリプト管理

全部覚える必要はない。Cloudflareの無料枠はとにかく太っ腹だということだけ知っておいて、必要になった時に見返せばいい。

## Cloudflareを使うべきでない場面

- 長時間動き続けるバックグラウンドタスク → VPSを使う
- 永続的なデータベースと複雑なクエリ → VPSまたはマネージドDBを使う
- WebSocketの常時接続 → Workersには制限がある
- 大きなファイルの処理 → WorkersはメモリとCPUに限りがある
- 中国本土からのアクセス速度がシビアな場合 → Cloudflareの無料枠は中国国内からだと速いとは限らない

基本方針としては、Cloudflareに載せられるものはCloudflareへ、常時稼働が必須なものはVPSへ。両者はどちらか一方を選ぶ関係ではなく、補完し合う関係だ。

## 自分の使い分けまとめ

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

2C2Gの学生向けサーバーには、どうしても常時稼働が必要なものだけを載せている。それ以外のCloudflareへ逃がせる処理は、サーバーに背負わせないようにしている。

サーバーが1台欲しくなったら、まず[[azure-students-100-credit-guide|Azure 日本サーバー]]や[[aliyun-student-300-voucher-guide|Alibaba Cloud 学生クーポン]]を見てから、[[docker-compose-minimum-start|Docker入門]]と[[2c2g-server-service-index|サービス一覧]]に沿って自分のアプリをデプロイするといい。

## 発展資料

awesome-cloudflare：[https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

Cloudflareエコシステム内のさまざまなツールや活用法をまとめたリポジトリで、スター数は14k超。「他の人がCloudflareで何を作っているか」を知りたいなら、ここから覗いてみるのがおすすめ。

その他の外部ツールは[[webmaster-resource-toolbox|サイト運営者向けリソース一覧]]にまとめてある。サイトを公開したあとは[[geoscore-2-4-guide|GeoScore]]も併用して、クローラビリティやページ情報が揃っているかチェックしてみるといい。
