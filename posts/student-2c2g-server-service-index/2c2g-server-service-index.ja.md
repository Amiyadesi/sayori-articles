---
title: "2C2G学生サーバーで何が動く？非力なマシンをパンクさせる前に"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "管理人の2C2Gアリババクラウド軽量サーバー実践設定：Vaultwarden、ntfy、Gatus、Fast Note Sync、AstrBot、検索ゲートウェイ。実際のメモリ消費量と非推奨リストを掲載"
image: ""
tags:
  - 実践チュートリアル
  - VPSとセルフホスト
  - Docker
  - 学生サーバー
category: "チュートリアル・ガイド"
draft: false
alias: ""
lang: ja
translationKey: "posts/student-2c2g-server-service-index/2c2g-server-service-index"
---
もし私と同じように、アリババクラウドの学生向け300元クーポンを2C2Gサーバーに引き換えたなら、おめでとう

これで24時間オンラインの小さなマシンが手に入ったわけだ

まだ起動していないなら、先に [[aliyun-student-300-voucher-guide|アリババクラウド学生クーポン]] や [[azure-students-100-credit-guide|Azure 日本サーバー]] を読んでみてほしい。この記事では起動後の用途の選び方を担当する

ただ、本当に「小さなマシン」にすぎない。2コア・メモリ1.6GB（実際の空きは672MBほど、Swap有効）なので、練習用や軽量サービスを常駐させるのには向いているが、ローカルLLMやNextcloud、動画エンコードのような重い処理には不向きだ

これは管理人自身のリアルな構成記録だ。サーバーを1ヶ月ほど稼働させており、現在は14個のコンテナが動いていて、メモリ使用量は765MB + Swap 987MB、ディスクは21GB / 40GB使っている

## まずは基本設定を済ませる

サービスを入れるのはまだ早い

サーバーを手に入れたら、まずは以下のことを済ませよう：

- SSH公開鍵認証ログイン
- パスワードログインの無効化
- デフォルト以外のSSHポートへの変更
- セキュリティグループとUFWの設定
- アリババクラウドの料金アラート設定（CDT通信量）
- 統一されたサービス用ディレクトリの作成
- DockerとDocker Composeのインストール

最初の数ステップは以前のこの記事を参考にしてほしい：

[Botを24時間オンラインにしたかっただけなのに、気づけばクラウドサーバーを買っていた](/posts/sayori-server-01-vps-start/)

サービス用ディレクトリは `/root/sayori/` に置き、1つの大きな `docker-compose.yml` で一括管理している。サービスごとにディレクトリを分けてもいい：

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

各ディレクトリに1つの `docker-compose.yml` を置き、本物のシークレットキーは `.env` に入れて、公開リポジトリには上げないようにしよう

## 管理人が現在動かしているサービス

### 🔐 Vaultwarden（パスワード管理、最重要）

**用途：** 個人用パスワード管理庫

**最優先で動かす理由：**

- パスワード管理はブログやステータスページ、Botよりも重要だから
- 軽量でメモリ消費が少ない
- クライアントのエコシステムが成熟しており、スマホ・PC・ブラウザすべてでBitwarden公式クライアントが使える
- Bitwardenの有料機能（2FAの保存、パスワードの健全性チェック）に対応している

**重要な注意点：**

- 初回登録が終わったらすぐに `SIGNUPS_ALLOWED` をオフにする
- HTTPS化は必須（Cloudflare Tunnel または Caddy）
- 定期的なバックアップと、定期的な復元テストを行う
- インターネット上に丸裸で公開しない

**メモリ消費量：** ~50MB

**詳しいチュートリアル：** [[selfhost-vaultwarden-on-2c2g|2C2G学生サーバーにVaultwardenを構築する]]

---

### 📢 ntfy（プッシュ通知、2番目に重要）

**用途：** 自分宛てにプッシュ通知を送る

サーバー上でバックアップスクリプトや監視スクリプト、定期タスクを動かしていると、失敗したときに誰かが知らせてくれる必要がある。ntfyはまさにその用途にぴったりだ

**私の使い道：**

- バックアップの成功・失敗通知
- Gatusのヘルスチェックアラート
- コメントモデレーション結果のプッシュ通知
- 一部の運用コマンドの手動トリガー（ntfy → スクリプト連携経由）

**重要な注意点：**

- アクセス制御を設定し、見知らぬ人に自分のトピックへメッセージを送られないようにする
- Cloudflare Accessと組み合わせて管理画面を保護する

**メモリ消費量：** ~20MB



---

**詳しいチュートリアル：** [[selfhost-ntfy-on-2c2g|2C2G学生サーバーでntfyを動かす]]

### 📊 Gatus（ステータスページとヘルスチェック）

**用途：** 自分のサービスを監視する

ブログ、Vaultwarden、Botの管理パネル、APIなどがまだ生きているかを定期的にチェックしてくれる。落ちていたらntfy経由で通知が飛ぶ仕組みだ

**監視しているエンドポイント：**

- `sayori.org` ブログ
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus自身
- `ntfy.sayori.org` ntfy
- Fast Note Sync API

**重要な注意点：**

- 設定ファイルはYAMLで書くので、うっかりインデントを間違えないようにする
- Cloudflare Tunnelで公開し、Accessで保護する
- 通知チャンネルをntfyと連携させる

**メモリ消費量：** ~15MB

---

### 📝 Fast Note Sync（Obsidian同期）

**用途：** Obsidianのプライベート同期用

私と同じようにObsidianでブログを書いたり、プロジェクトのメモを取ったり、下書きを保存したりしているなら、このサービスはかなり魅力的だ。Obsidian Syncより安く（0円）、Syncthingより手間がかからない（複数端末が同時にオンラインである必要がない）

**重要な注意点：**

- データディレクトリを定期的にバックアップする
- 巨大なファイル（画像や動画）は置かない
- 同期の競合が起きたときは手動で対処する

**メモリ消費量：** ~30MB

**詳しいチュートリアル：** [[fast-note-sync-on-student-server|学生サーバーでFast Note Syncをいじり倒す]]

---

### 🤖 AstrBot + NapCat（QQ Bot）

**用途：** 24時間オンラインのQQ / Telegram / Discord Bot

リモートサーバーに置いたことで、ようやくBotを24時間ノンストップで稼働させられるようになった。DiscordやTelegramにも接続でき、この2つは基本的にアカウント規制（BAN）のリスクがほぼない

**QQ連携の注意点：**

- 新規アカウントは規制されやすいので、しばらく寝かせて育てるのがおすすめ
- サブ垢を作った直後にすぐ使わないこと（管理人の血と涙の教訓）
- NapCatは定期的にQRコードでの再ログインが必要

**メモリ消費量：** AstrBot ~100MB, NapCat ~150MB

---

### 🔍 AI Search Gateway（検索ゲートウェイ）

**用途：** 自分用のAI検索集約ゲートウェイ

Tavily、Brave Search、Firecrawl、Exa、Grok Search、SearXNGを統合し、FastAPIで構築したもの。CodexやClaude CodeのMCPから使っており、個別にAPIを叩くよりずっと便利だ

**重要な注意点：**

- `127.0.0.1:8000` のみをリッスンさせ、インターネットには公開しない
- ローカルからはSSHポートフォワーディング + MCP経由で呼び出す
- APIキーは環境変数に入れる

**メモリ消費量：** ~100MB（RedisとSearXNGを含む）

---

### 🛡️ Comment Moderation（コメント審査）

**用途：** AIによるブログコメントの自動審査

無料枠のGPTクレジットを使ってTwikooのコメントを自動審査し、ntfyと連携して審査結果をプッシュ通知している。ntfy側からメッセージを送ることで、手動でのコメント削除や復元も可能だ

さらにCloudflare Turnstileのボット対策も組み合わせているので、残るコメントは基本的に質の高いものばかりになる

**メモリ消費量：** ~40MB

---

### 🌐 Cloudflared（Cloudflare Tunnel）

**用途：** 80/443番ポートを開けずにローカルサービスを外部公開する

管理人の公開サービスはすべてCloudflare Tunnelを経由している：

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel（Cloudflare Accessの設定が必須）

**メリット：**

- オリジンサーバーのポートを開放する必要がない
- 自動でHTTPS化される
- Accessを設定して認証をかけられる

**メモリ使用量：** ~30MB

---

### 🎛️ 1Panel（Docker 管理パネル）

**用途：** Web 画面での Docker コンテナ管理

初心者がコンテナの状態を見たり、ちょっとしたトラブルシューティングをするのに便利

**セキュリティ警告：**

- 必ず Cloudflare Tunnel + Access を経由させるか、最低でもリバースプロキシで HTTPS 化して強力なパスワードを設定すること
- これ一つですべてのコンテナを操作できる
- パブリックネットワークに丸出しで公開してはいけない

**メモリ使用量：** ~80MB

---

### その他の補助サービス

- **Mihomo**：プロキシクライアント。必要なサービスにプロキシを提供する
- **Redis**：Search Gateway のキャッシュ用

## 現在のメモリ使用状況（実測データ）

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**結論：**

- 1.6GB のメモリのうち 765MB を使用し、Swap は 987MB 使用中
- 14 個のコンテナが動いている割には、メモリ使用量は妥当な範囲
- Swap の使用量が多いのはメモリが確かにギリギリな証拠だが、まだ耐えられる
- これ以上重いサービスは追加しないこと

## 2C2G で動かすのをおすすめしないサービス

これらはメモリ、CPU、ストレージのいずれかを大量に消費するため、2C2G では耐えられない：

### ❌ Nextcloud / OwnCloud

**おすすめしない理由：**

- メモリ消費が激しい（PHP-FPM + データベース + Redis）
- ファイルのアップロード・ダウンロードで帯域と I/O を食いつぶす
- 大きなファイルのプレビューで CPU を食う
- 同期の競合が起きやすい

**代替案：**

- 軽量なファイル同期：Fast Note Sync（テキスト専用）、Syncthing
- クラウドストレージ：Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**おすすめしない理由：**

- 動画のトランスコードで CPU とメモリを食う
- メディアライブラリのスキャンで I/O を食う
- 40GB のディスクでは映画が数本しか入らない

**代替案：**

- 専用の NAS やメディアサーバーを使う
- あるいは普通にオンラインのストリーミングサービスを使う

---

### ❌ GitLab

**おすすめしない理由：**

- メモリ使用量が最低でも 4GB から
- 2C2G ではそもそも動かない

**代替案：**

- GitHub / Gitea / Forgejo
- Gitea はかなり軽量だが、それでも 512MB 以上のメモリは必要

---

### ❌ Mastodon / Misskey

**おすすめしない理由：**

- Fediverse サーバーはメモリとデータベースを食う
- メディアの保存でディスク容量を圧迫する

**代替案：**

- 既存の公開インスタンスでアカウントを作る

---

### ❌ ローカル LLM（Ollama / LM Studio）

**おすすめしない理由：**

- 2C で推論を回すと、人生を疑うレベルで遅い
- 1.6GB のメモリには実用的なモデルが一つも入らない

**代替案：**

- 公式の学生特典を使う：GitHub Copilot Student、Google AI Studio の公式無料枠
- 学生向けバウチャーで相殺する：Alibaba Cloud Model Studio（阿里云百炼）の公式 LLM API
- 詳しくはこちら：[大学生は公式の AI 枠と cc-switch をどう使って開発環境を管理すべきか](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress（動かないわけではないが、おすすめしない）

**あまりおすすめしない理由：**

- PHP + MySQL がメモリを食う
- プラグインをたくさん入れるとさらに重くなる
- 静的サイトジェネレーター（Astro / Hugo）の方がパフォーマンスが良い

**どうしても動かしたい場合：**

- Caddy + PHP-FPM + SQLite の構成にする
- プラグインは最小限にする
- Cloudflare CDN を組み合わせる

## おすすめの学習順序

私ならこんな順番で進める：

1. **基本設定**：[[sayori-server-01-vps-start|SSH とセキュリティグループ]]、[[docker-compose-minimum-start|Docker と Compose]]、料金アラート
2. **ドメインと HTTPS**：[[free-domain-and-web-community|無料ドメイン]] + [[cloudflare-free-tier-developer-guide|Cloudflare DNS と Tunnel]]
3. **コアサービス**：[[selfhost-vaultwarden-on-2c2g|Vaultwarden パスワード管理]] + [[selfhost-ntfy-on-2c2g|ntfy 通知]] + Gatus 監視
4. **必要に応じて追加**：[[fast-note-sync-on-student-server|Fast Note Sync]]、Bot、その他のツール

**一気に 10 個もサービスを入れないこと。** 一つずつ進めて、安定して動いているのを確認してから次を追加しよう

## 関連リソース

**セルフホストサービスの発掘：**

- awesome-selfhosted：[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare：[https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**この記事で触れたプロジェクト：**

- Vaultwarden：[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync：[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy：[https://ntfy.sh/](https://ntfy.sh/)
- Gatus：[https://gatus.io/](https://gatus.io/)
- AstrBot：[https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` は「他にどんなものがセルフホストできるか」を探すのに向いている。`awesome-cloudflare` は「VPS に置かずに Cloudflare 側に任せられるものは何か」を探すのに向いている

個人サーバーだからといって、すべてを自分で抱え込む必要はない。Cloudflare Pages、Workers、R2、Tunnel に任せられるものは任せて、2GB のメモリで無理をしないようにしよう

---

## おわりに

2C2G のサーバーは「個人用サービスを始める出発点」として最適だ

できること：

- Linux、Docker、リバースプロキシ、ドメイン、HTTPS に慣れる
- 軽量ながらも実用的なサービスをいくつか動かす
- バックアップ、監視、運用の習慣を身につける

できないこと：

- 重いサービスを動かす
- 本番環境（プロダクションサーバー）として使う
- 専用の NAS やメディアサーバーの代わりにする

でも、それで十分だ

サーバーは設定して終わりではない。バックアップやセキュリティ、監視と真剣に向き合うきっかけをくれる。これは実はすごく良いことだ

## あわせて読みたい

クラウドサーバー以外にも、[[make-home-server|古い PC を自宅クラウドに改造する]] ことも試してみた。そちらでもこのリストを参考にサービスを選べる

AI ツールに自前の検索機能をつなぎたい場合は、[[build-your-search-gateway|検索ゲートウェイの構成とワークフロー]] も見てみてほしい。自分が本当に必要とする方向へどんどんいじり倒していこう
