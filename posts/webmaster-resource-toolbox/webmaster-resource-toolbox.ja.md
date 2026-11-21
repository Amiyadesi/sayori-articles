---
title: 個人Webマスター向け外部リソース一覧
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 7
description: ドメイン、ホスティング、コメント、監視、セルフホスト、Cloudflare、アクセス解析、Webマスター向けコミュニティやブログフレームワークの外部リソースの入口
image: ""
tags:
  - 2026夏
  - ツール記録
  - 独立ブログ
  - サイト構築とCloudflare
category: "個人の記録"
draft: false
alias: blog-resource-toolbox
lang: ja
translationKey: "posts/webmaster-resource-toolbox/webmaster-resource-toolbox"
---

ここは外部リソースのリンク集のみを置いています

本サイトの記事の読み方は [[site-article-index|本サイトの記事インデックス]] をご覧ください

よく使うローカルソフトについては [[useful-free-software-toolbox|無料ですぐ使える便利ソフト一覧]] をどうぞ

ルールや無料枠は変更される可能性があるため、登録前に公式サイトの説明を必ずご確認ください

## GitHubのリストリポジトリ
- [Free for Developers](https://free-for.dev/#/)：開発者向け無料サービスまとめ、GitHubで100kスター以上
- [awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)：Cloudflare活用まとめ、GitHubで10kスター以上
- [sindresorhus/awesome: 😎 Awesome lists about all kinds of interesting topics](https://github.com/sindresorhus/awesome#readme)：Awesomeリスト集、GitHubで400kスター以上

## 無料ドメインと一時的な公開先

- [DNSHE](https://my.dnshe.com/)：無料のサブドメイン、まずはDNSの練習用に
- [eu.org](https://nic.eu.org/)：定番の無料ドメインですが、審査に時間がかかることが多いです
- [us.kg](https://nic.us.kg/)：こちらもよく見かけます。登録前に最新のルールを確認してください
- [pp.ua](https://nic.ua/)：老舗の無料ドメイン取得先の一つ
- [GitHub Pages](https://pages.github.com/)：`github.io` がもらえます
- [Cloudflare Pages](https://pages.cloudflare.com/)：`pages.dev` がもらえます

サイト構築を始めたばかりなら、これだけでもかなり長い間いろいろいじって遊べます

## 正式なドメインの取得

- [Namesilo](https://www.namesilo.com/)
- [Porkbun](https://porkbun.com/)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)

私は初年度の価格と更新時の価格を優先して見るようにしています。そうしないと初年度の安さに釣られてしまいがちなので

## 静的ホスティング

- [Cloudflare Pages](https://pages.cloudflare.com/)：現在私自身も使っています
- [Vercel](https://vercel.com/)：フロントエンドのプロジェクトはここに置く人が多いです
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Render](https://render.com/)

完全な静的ブログであれば、Cloudflare Pages と GitHub Pages で基本的には十分です

## コメントシステム

- [Giscus](https://giscus.app/)
- [Twikoo](https://twikoo.js.org/)
- [Artalk](https://artalk.js.org/)
- [Waline](https://waline.js.org/)
- [Cusdis](https://cusdis.com/)

中国語のブログを書くなら、Twikoo と Waline の方がよく見かける印象です

## 監視とステータスページ

- [Gatus](https://gatus.io/)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [UptimeRobot](https://uptimerobot.com/)
- [Better Stack](https://betterstack.com/)

セルフホストするなら、私はまず Uptime Kuma を検討します。圧倒的に楽なので

## 通知とプッシュ送信

- [ntfy](https://ntfy.sh/)
- [Bark](https://github.com/Finb/Bark)
- [Gotify](https://gotify.net/)
- [PushDeer](https://github.com/easychen/pushdeer)
- [Server 酱 (Server酱)](https://sct.ftqq.com/)

スクリプトの実行が終わったときに自分宛てに通知を飛ばすのは、やっぱり結構大事です

## セルフホストレソースのインデックス

- [awesome-selfhosted](https://awesome-selfhosted.net/)
- [awesome-selfhosted GitHub](https://github.com/awesome-selfhosted/awesome-selfhosted)
- 
- [selfh.st](https://selfh.st/)
- [noted.lol](https://noted.lol/)

何を入れたらいいか分からないときに、とりあえず覗いてみるのにおすすめです

## Cloudflare関連

- [Cloudflare Docs](https://developers.cloudflare.com/)
- [Pages Docs](https://developers.cloudflare.com/pages/)
- [Workers Docs](https://developers.cloudflare.com/workers/)
- [R2 Docs](https://developers.cloudflare.com/r2/)
- [Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

Cloudflareのようなツールは、コミュニティの投稿だとすぐ古くなってしまうので公式ドキュメントを直接見るのが一番です

## ストレージとCDN

- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Backblaze B2](https://www.backblaze.com/cloud-storage)
- [GitHub Releases](https://github.com/)
- [jsDelivr](https://www.jsdelivr.com/)

画像ホスティング、小さなファイルの置き場所、バックアップなどの用途でよくお世話になります

## アクセス解析

- Cloudflare Web Analytics：Cloudflareの管理画面から直接有効化できます
- [Umami](https://umami.is/)
- [Plausible](https://plausible.io/)
- [GoatCounter](https://www.goatcounter.com/)

個人的には今、Umamiのようなシンプルな見た目のものがお気に入りです

## Webマスター向けコミュニティとディレクトリ

- [開往 Travellings](https://www.travellings.cn/)
- [萌備](https://icp.gov.moe/)
- [十年之約](https://www.foreverblog.cn/)
- [揪蝉](https://hi.jiuchan.org/docs)
- [中文独立博客列表](https://github.com/timqian/chinese-independent-blogs)
- [BlogFinder](https://bf.zzxworld.com/)
- [博友圈](https://www.boyouquan.com/)
- [積薪](https://firewood.news/)

これらは、サイトを立ち上げたあとに少し外へ露出を増やしたいときに使う入口のようなものです

## フォーラムと技術コミュニティ

- [Linux DO](https://linux.do/)
- [V2EX](https://www.v2ex.com/)
- [NodeSeek](https://www.nodeseek.com/)
- [NodeLoc](https://www.nodeloc.com/)
- [Hacker News](https://news.ycombinator.com/)

サイト構築、VPS、お得情報（羊毛）、ちょっとした技術的試行錯誤の体験談を見たいとき、私もこのあたりをよく巡回しています

## ブログフレームワーク

- [Astro](https://astro.build/)
- [Hugo](https://gohugo.io/)
- [Hexo](https://hexo.io/)
- [VitePress](https://vitepress.dev/)
- [Zola](https://www.getzola.org/)

現在メインでAstroを使っているため、この中ではAstroが一番勝手が分かっています

## パスワードとセキュリティ

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden)
- [Bitwarden](https://bitwarden.com/)
- Cloudflare Access：Cloudflareの管理画面で設定
- [Let's Encrypt](https://letsencrypt.org/)
- [Caddy](https://caddyserver.com/)

管理画面を直接グローバルネットに剥き出しにしたり、パスワードを自分の記憶だけに頼ったりしないようにしましょう

## 続けて読む

これらのリソースを実際に活用したい場合は、[[astro-mizuki-blog-from-zero|ゼロからのサイト構築]] → [[free-domain-and-web-community|ドメインの設定]] → [[cloudflare-free-tier-developer-guide|Cloudflare]] の順番で進めてみてください

サイトを公開したあとは、[[geoscore-2-4-guide|GeoScore]] を使ってクローラーの巡回、インデックス状況、ページ情報に補うべき点がないか確認してみましょう
