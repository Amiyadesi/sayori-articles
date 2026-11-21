---
title: 大学教育用メールの公式特典ガイド：GitHub Student Pack・JetBrains・Azure・Alibaba Cloud
published: 2026-06-27
created: 2026-06-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 10
description: 大学の教育用メールで申請できる公式特典のまとめ：GitHub Student Pack、JetBrains、Zed、Azure 年間 100 ドル、Alibaba Cloud 300 元クーポン、Heroku、MongoDB、Codespaces、Camber、GLaDOS 教育プラン
image: ""
tags:
  - 実践チュートリアル
  - 公式学生特典
  - 教育用メール
  - GitHub
  - クラウドサービス
category: "チュートリアル・ガイド"
draft: false
alias: ""
lang: ja
translationKey: posts/edumails-glados-student-benefits/edumails-glados-student-benefits
---

教育用メールを学校からの連絡受信だけに使うのはもったいない。

自分の申請順はシンプルで、まず GitHub や JetBrains のような長く使えるものを押さえてから、AI・ネットワーク・サーバー系を見るようにしている。

他の人がまとめた[教育用メール特典の全体まとめ](https://nav.edumails.cn)も参考になる。この記事は現在、自分が以前に取得した記録と、今回公式ページを確認して追記した特典の2本立てになっている。

初回公開：2026 年 6 月 27 日。今回の追記：2026 年 10 月 13 日。公開日や確認日以降もキャンペーンが有効である保証はないため、申請時は公式ルールと自分のアカウント表示を基準にしてほしい。

以下の Zed と GLaDOS は以前の記録を残したもので、現在も同じプランが取れるとは限らない。

この記事はサイト内の学生向けリソースの総合入り口として、教育用メールで申請できる特典をひとまずここにまとめている。カテゴリごとの具体的な設定手順は、以下の個別記事を参照してほしい：

- **AI クレジットと設定管理**：[[anyrouter-sharedchat-cc-switch-student-guide|大学生が公式 AI クレジット・AnyRouter・SharedChat・cc-switch で開発環境を管理する方法]]
- **Azure 日本サーバー**：[[azure-students-100-credit-guide|100 ドルを受け取り、ブラウザまたは PowerShell で日本の VPS を立てる]]
- **Alibaba Cloud 300 元学生クーポン**：[[aliyun-student-300-voucher-guide|Alibaba Cloud 学生向け 300 元クーポンの使い道：無駄にしないための活用ガイド]]
- **Cloudflare 無料フルセット**：[[cloudflare-free-tier-developer-guide|Cloudflare の無料枠で開発者にできること：お金のかからない太っ腹フルセット]]
- **無料ドメインと学生パックのドメイン**：[[free-domain-and-web-community|作ったばかりのブログに無料ドメインを設定し、ウェブマスターコミュニティに顔を出す]]

## まずは開発ツールを確保する

[GitHub Student Developer Pack](https://education.github.com/pack) を最優先にする。

認証が通ると GitHub Pro に加え、GitHub 学生パック経由でしか受け取れない提携特典が大量についてくるので、自分の Pack ページにログインして確認すればいい。

[JetBrains 学生ライセンス](https://www.jetbrains.com/community/education/#students) は、JetBrains 製品を一通り触ってみたいなら教育用メールで登録してみる価値がある。

[Zed Education](https://zed.dev/education) も申請したことがあり、1 年間の Student プランが付与された。Agent は毎月 10 ドル分の tokens が使えて、無制限の編集予測もついてくる。

ただし完全な Pro ではなく、Claude Opus は含まれていない。

Zed の条件は 2 つで、GitHub アカウントの作成から 30 日以上経っていることと、学校のメールドメインが [JetBrains/swot](https://github.com/JetBrains/swot) に登録されていること。

## 最初に区別しておく：クレジット残高・クーポン・月間枠

以下の特典は 2026 年 10 月 13 日に公式ページを確認済み。このうち Azure と Alibaba Cloud は学校メールまたは学信網（CHSI）で個別に認証すればよく、**Heroku、MongoDB、Codespaces、Camber はいずれも先に GitHub Student Developer Pack を通過しないと受け取れない**。

| 項目 | 申請窓口 | もらえる内容 | 有効期限・更新 | まず確認すること |
| --- | --- | --- | --- | --- |
| Azure for Students | 学校メールで直接申請 | 100 ドル分の Azure サービスクレジット | 12 か月間；学生資格を満たしていれば毎年更新可能 | 満 18 歳以上・対象となる全日制高等教育機関の在籍条件；クレジットカード不要 |
| [Alibaba Cloud 雲工開物](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv) | 学信網 / 大学メール | 300 元分の学生限定クーポン | 学生認証の有効期間中、12 か月ごとに 1 枚取得可能；各 1 年間有効 | 一部商品のみ割引対象、決済画面で確認 |
| Heroku | GitHub 学生パック限定 | 毎月 13 ドル分のプラットフォームクレジット | 計 24 か月間；当月未使用分の繰り越し不可 | 有効なクレジットカードまたはデビットカードが必要；超過分は課金 |
| MongoDB Atlas | GitHub 学生パック限定 | 50 ドル分の Atlas クレジット、別途認定試験特典あり | 引き換えコード発行後 90 日以内に適用；付与後の期限はアカウントを確認 | クレジットカードまたは PayPal が必要；200 ドルの現金ではない |
| GitHub Codespaces | GitHub 学生パック限定 | Pro プランの毎月 180 コア時間と 20 GB-month ストレージ | 毎月リセット；学生特典の状態はアカウントを確認 | 2 コア環境で約 90 時間、ストレージは別計算 |
| Camber Student | GitHub 学生パック限定 | 毎月 40 CPU 時間、5 GPU 時間、50 GB ストレージ、50 件の agent メッセージ | 公式 Pack ページには在学期間中利用可能と記載；具体的な周期はコンソールを確認 | 任意の GPU モデルやマシンスペックが保証されるわけではない |

これらはすべてサービス利用枠であり、現金として引き出せるものではない。また、年次更新も永久に自動付与されるわけではない。

### Azure：年間 100 ドル、まずは資格を確認

[Azure for Students](https://azure.microsoft.com/en-us/free/students/) は一番押さえておく価値がある特典で、クレジットカードの紐付け不要、100 ドル分を 12 か月間ほとんどの Azure サービスに使える。

「年間 100 ドル」のより正確な意味は、条件を満たし続けている学生であれば、学生サブスクリプションを 1 年ごとに更新できるというもの。資格の再確認が必要で、期限切れ後に自動で次の枠が降ってくる保証はない。

[公式規約](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/)では満 18 歳以上、対象となる全日制の高等教育機関に在籍し、学校メールでの認証を通過することが求められている。Azure for Students Starter は別のプランなので、同じ 100 ドルパックと混同しないこと。

小さな API や授業の課題、クラウドデプロイの練習にちょうどいい。リージョン・サービス・リソースのクォータには制限があるため、すべての AI モデルや GPU、Marketplace 商品が買えるわけではない点には注意。

クレジットを使い切ると学生サブスクリプションは無効化される。手動で従量課金へアップグレードすると課金ルールが変わるので気をつけたい。

受け取り方、無料枠スペック、日本リージョンでのインスタンス作成手順は [[azure-students-100-credit-guide|Azure 学生サーバーチュートリアル]] にまとめてあり、ブラウザと PowerShell の両方の方法を載せている。

## GitHub Student Developer Pack 限定特典（学生パック経由での取得が必要）

以下のクラウドサービス、開発環境、ドメイン、学習コースはすべて [GitHub Student Developer Pack](https://education.github.com/pack) に紐づいており、先に GitHub の学生認証を通さないと有効化できない：

### 1. Heroku：毎月 13 ドルであり、312 ドルを一気に使えるわけではない

[Heroku 学生窓口と FAQ](https://www.heroku.com/github-students) は、先に GitHub Student Developer Pack を通過していること、および満 18 歳以上であることが条件になる。

枠は毎月 13 ドルで 24 か月間継続し、合計で最大 312 ドル。使い切れなかった当月分は月末で失効し、翌月への繰り越しはできない。また、同じ 24 か月特典の再申請も不可。クレジットは承認された月の初日から計算されるため、月初に申請するほうが無駄がない。

Heroku 自社のアプリコンテナ（Eco / Basic dynos）、Postgres、Key-Value Store の支払いに充当できるが、サードパーティ製の有料 Add-ons は対象外。

有効なクレジットカードまたはデビットカードの登録が必要で、毎月の割引枠を超えた分はそのまま請求される。軽量な授業用バックエンドや小さな API を動かすには向いているが、申請したまま請求を放置するような使い方には向かない。

### 2. MongoDB：50 ドルのデータベースクレジット、認定資格は別枠

[MongoDB 学生窓口](https://www.mongodb.com/students) から GitHub 学生認証経由で受け取る。50 ドルは Atlas データベースのクレジットであり、クラウドサーバーのクレジットではない。

ページに書かれている 200 ドル相当の特典とは、50 ドルの Atlas クレジットに 150 ドル相当の認定試験特典を足した金額のことで、200 ドル分のデータベース残高として使えるわけではない。認定資格は先に対応する学習パスを修了・合格する必要があり、クーポンをもらえば即証明書が手に入る仕組みではない。

Atlas クレジットの引き換えには有効なクレジットカードまたは PayPal が必要。コード生成後 90 日以内に指定の Organization へ適用する必要があり、1 コードにつき 1 回のみ使用可能。付与後の有効期限と適用範囲は Billing 画面で確認できる。

ちょっとした練習だけなら、まず Atlas の無料クラスター（M0）で足りるか試せばよく、クレジットを消化するためにわざわざ有料クラスターへすぐ上げる必要はない。

### 3. Codespaces と Camber：従量制の開発環境

[Codespaces 課金仕様](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) の Pro プランは毎月 180 コア時間と 20 GB-month のストレージが含まれ、学生 Pack ではこの Pro プランがそのまま使える。

180 コア時間といっても、どのスペックでも 180 時間動かせるわけではない。2 コア環境を 1 時間使うと 2 コア時間消費（約 90 時間稼働可能）、4 コアなら 4 コア時間（約 45 時間）、8 コアなら 8 コア時間（約 22.5 時間）となる。

環境を停止すればコンピュート消費は止まるが、環境を残したままだとストレージは消費し続ける。使い終わってストレージを空けたい Codespace は、先に `git push` してから削除するのを忘れないこと。支払い方法を紐づけていない場合、クォータを超えると自動的に利用がブロックされる。

[Camber の学生特典](https://education.github.com/pack#cambercloud) はデータ分析や AI 実験寄り。公式 Pack には毎月 40 CPU 時間、5 GPU 時間、50 GB ストレージ、50 件の agent メッセージと記載されている。特定モデルの GPU が永久無料になるわけではないので、具体的なスペックや消費倍率は [Camber ドキュメント](https://docs.cambercloud.com/) とコンソールを確認してほしい。

### 4. GitHub 学生パック内の AI・ドメイン・学習ツール

- GitHub Copilot Student：認証済み学生が申請可能。無制限のコード補完に加え、制限付きのチャット・agent・GitHub AI Credits が含まれる。モデルは自動選択で提供され、すべての上位モデルが使い放題になるわけではない
- Namecheap：`.me` ドメイン 1 つの初年度登録と 1 年間の SSL 証明書。更新は永久無料ではない
- Name.com：対象 TLD の初年度無料ドメイン（`.app`、`.dev` などを収録）。ドメイン名・資格・更新価格は申請画面および決済画面で確認
- Educative：70 以上の指定ハンズオンコースへの 6 か月間アクセス権。全コースライブラリが永久解放されるわけではない
- Boot.dev：フル機能のインタラクティブ会員 3 か月分。バックエンドや DevOps を集中的に学ぶのに向いている
- 1Password：個人プラン 1 年分。取得前にその後の更新方法を確認しておくこと

### 5. これらの学生枠を組み合わせて実際のプロジェクトを作るには

「数百ドル相当」という言葉に釣られて、期限付きの特典をすべて同時に有効化する必要はない。一番堅実なのは、まず完結できそうな小さなプロジェクト（授業課題の展示サイト、個人用のミニ API やツールなど）を決めてから、必要なものだけを 1〜2 個ずつ申請すること。

- **フロントエンド展示 / ブログ**：[[astro-mizuki-blog-from-zero|シンプルブログチュートリアル]] に沿って Cloudflare Pages に載せ、[[free-domain-and-web-community|無料ドメイン]] を組み合わせる
- **一時的なコーディング環境**：手元の PC スペックが足りないときや複数端末を切り替えるときに GitHub Codespaces（2 コアマシン、使い終わったらこまめに停止）を立ち上げる
- **軽量バックエンド / データベース**：まず MongoDB Atlas の無料枠か 50 ドルクレジットを使い、バックエンドは Azure（クレカ不要）または Heroku（月 13 ドル以内）を選ぶ
- **24 時間常駐のセルフホストサービス**：[[aliyun-student-300-voucher-guide|Alibaba Cloud 学生クーポン]] か [[azure-students-100-credit-guide|Azure 学生クレジット]] でサーバーを立て、[[2c2g-server-service-index|ミニサーバー活用リスト]] から用途を 1 つ選ぶ

## ネットワークとサーバー

[GLaDOS](https://glados.space/register) の[教育窓口](https://glados.one/console/education)

GLaDOS Education の提供内容：
1. 高校から大学（中国）の学生または教員であれば、GLaDOS の 360 日間教育プランを無料で取得可能
2. 医学部（中国）の学生または教員であれば、GLaDOS の Pro Plan 360 Days を無料で取得可能
3. 中国本土以外の学生であれば、GLaDOS の 14 日間教育プランを無料で取得可能（edu.kg でも可）
4. 本特典は 1 回限りのオファー
5. アクティブデバイス 3 台まで対応、月間最大 100GB の通信量、エコノミーサーバー（ストリーミング配信向けには最適化されていない）のため Netflix の地域制限解除や高度な機能には非対応

登録時はこの招待コードが使える：`JZELF-GSULR-G5LFS-BD1S4`

実際に課金する場合は、決済時に自分のクーポンコード `AMIYADESI` を入力すると Alipay 払いで 10% オフになる。

[Alibaba Cloud 学生窓口](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv) の 300 元クーポンは現金ではなく、すべての商品に使えるわけでもない。

ECS、軽量アプリケーションサーバー、百煉 API、無影などを買いたい場合は、まずカートに入れて決済画面で確認すること。

自分が実際にハマったポイントと現実的な選択肢は [[aliyun-student-300-voucher-guide|Alibaba Cloud 学生向け 300 元クーポンの使い道]] に書いてある。

Web サイトで授業課題やドキュメント、ポートフォリオを置くだけなら、まず [GitHub Pages](https://pages.github.com/) か [Cloudflare Pages](https://pages.cloudflare.com/) を使い、それで足りなくなってからサーバーに手を出すのがいい。
