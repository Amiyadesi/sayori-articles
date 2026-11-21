---
title: "ゼロからシンプルなブログを作る：GitHub、Cloudflare Pages、そして任意の Obsidian"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "Sayori Lite の完成版テンプレートを使い、Cloudflare Pages と GitHub をつないでシンプルなブログを構築する方法。フォルダごとに Markdown を書いて公開でき、Obsidian や Token を使った公開は任意"
image: ""
tags:
  - 実践ガイド
  - サイト構築とCloudflare
  - Astro
  - Obsidian
category: "チュートリアル・ガイド"
draft: false
alias: ""
lang: ja
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# ゼロからシンプルなブログを作る：GitHub、Cloudflare Pages、そして任意の Obsidian

この記事もそろそろ手を入れておかないとと思ってたところだ。前の版は Mizuki と Obsidian、それにローカルの同期スクリプトを中心に書いていたけれど、その後ブログは今のシンプルな形に変わって、ガイドだけがその場に置き去りになっていた。古い手順どおりやると、テーマを足したりディレクトリを変えたり、さらにプラグインやデプロイ設定まで触る必要があって、最初のブログ構築ガイドとしては正直むいていない

だから今回は、そのまま使える完成版テンプレートにまとめた。名前は **Sayori Lite · 我的书桌**。今のブログの温かみのある紙色、オリーブグリーンのリンク、ちょっとしたコーラルカラーは残して、トップページに記事を並べ、本文には落ち着いた余白をとってある

まずはサイトを立ち上げてから、自分がどのツールで書きたいかを考える流れにする。GitHub の画面だけでも公開できるし、Obsidian は僕のおすすめではあるけれど、必須というわけじゃない

> 本記事は 2026 年 10 月 16 日時点のテンプレートおよび公式ドキュメントをもとに書き直している。旧記事の URL とテンプレートリポジトリの URL はそのまま残しているが、旧版のスクリーンショットや PowerShell プラグインの手順は使えない

## まずは2つのアカウントを用意する

[GitHub](https://github.com/signup) と [Cloudflare](https://dash.cloudflare.com/sign-up) が必要になる。GitHub にサイトプログラムと記事を置き、Cloudflare Pages がビルドとホスティングを担当して、`pages.dev` のアドレスを用意してくれる。最初の段階では独自ドメインを買わなくてもよくて、無料のサブドメインを試してみるのもありだ[[free-domain-and-web-community|無料ドメインとWebマスターコミュニティ]]

デフォルトのルートはこうなる：

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**このルートでは Cloudflare API Token は不要。** 記事を書くのに公開用の鍵を追加で設定する必要はなく、GitHub Actions でのアップロードに変えたくなったときに、後述の Token が必要になる

## テンプレートから自分のリポジトリを作る

テンプレートは今もこの場所にあって、名前もとりあえず変えていないので、古いリンクもそのまま使える：

[Sayori Lite テンプレートリポジトリ](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

開いたら **Use this template → Create a new repository** をクリックし、Owner は自分のアカウントを選び、リポジトリ名はたとえば `my-blog` にする

今回のリポジトリにはすでに一通りの Astro サイトが入っていて、おおまかな構成はこんな感じ：

```text
my-blog/
  articles/
    posts/
      hello-mizuki/
        index.md
        desk.svg
    spec/
      about.md
      friends.md
    templates/
      blog-post.md
  public/
    avatar.svg
    favicon.svg
  src/
  site.config.mjs
  package.json
  pnpm-lock.yaml
  .github/workflows/deploy-cloudflare-pages.yml
```

`articles/` が執筆用ディレクトリ、`src/` がサイトプログラムで、記事はそのままビルドに取り込まれる

## Cloudflare と GitHub をつなぐ

Cloudflare の **Workers & Pages** に進み、アプリケーションを作成して **Pages** を選び、既存の Git リポジトリをインポートする。作成したばかりのリポジトリへのアクセスを Cloudflare に許可するが、この1つだけに絞っておく



ビルド設定は次のように入力する：

| 設定 | 入力内容 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | 空欄のままにしてリポジトリのルートを使う |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| 環境変数 `NODE_VERSION` | `22` |
| 環境変数 `PNPM_VERSION` | `11.0.8` |
| 環境変数 `SITE_URL` | `https://你的项目名.pages.dev` |

プロジェクト名によって最初の `pages.dev` アドレスが決まる。保存してデプロイし、ビルドが終わったら Cloudflare に表示された URL を開いてみよう

Pages はロックファイルに沿って依存関係をインストールする。環境で pnpm がうまく用意できない場合も、テンプレートの README に固定バージョンの pnpm インストール手順を含めた代替ビルドコマンドが載っているので、まずはログを見てから直すのがよく、デプロイ方式丸ごと変える必要はない

`SITE_URL` にはサイトの正式なアドレスを入れること。RSS やサイトマップ、canonical にも使われるからだ。あとから独自ドメインを紐づけるときは、ここも書き換えて再デプロイする。GitHub リポジトリの URL や管理画面の URL は入れないこと

## 自分の机に作り変える

GitHub で `site.config.mjs` を開いて編集を押し、サイト名や著者、自己紹介を自分のものに書き換える。アバター画像は `public/` に置き、設定にはサイト内のパスを書く

```js
export default {
  title: "我的书桌",
  author: "你的名字",
  description: "记录日常，也写一点认真整理过的东西",
  url: "",
  lang: "zh-CN",
  avatar: "/avatar.svg",
  note: "慢慢写，慢慢读",
};
```

すでに Cloudflare で `SITE_URL` を設定しているなら、設定ファイルの `url` は空欄のままでいい。環境変数が優先される

プロフィールページは `articles/spec/about.md`、相互リンクページは `articles/spec/friends.md` を編集し、リンクはそのまま Markdown のリンクと紹介文を書けば大丈夫だ

テンプレートにはアーカイブ、目次、画像拡大、ライト／ダークテーマ、Pagefind 検索、RSS、サイトマップが揃っていて、本文はシステムフォントを使っている

## ローカルツールを入れなくても、1本目を公開できる

GitHub リポジトリで **Add file → Create new file** を押し、ファイル名に次のように入力する：

```text
articles/posts/my-first-post/index.md
```

スラッシュを入れるとディレクトリもまとめて作ってくれる。本文はひとまずこれを使っていい：

```md
---
title: 我的第一篇文章
description: 今天终于有了自己的博客
published: 2026-10-16
updated: 2026-10-16
draft: false
category: 日常
tags: [生活]
---

这里是第一段正文。不用重复写一级标题，页面会自动显示上面的 title

## 想记下的一件事

这里继续写
```

日付は実際に書いた日に合わせて変える。書き終えたら **Commit changes** を押して `main` にコミットする。Cloudflare がコミットを検知すると自動でビルドが始まり、成功すればトップページに記事が見えるはずだ

ここのルールはシンプルで、1記事につき1フォルダ、フォルダ名は小文字の英数字とハイフンを使い、本文は `index.md` で統一する。`my-first-post` が公開アドレス `/posts/my-first-post/` を決め、あとからタイトルを変えても URL は変わらないが、フォルダ名を変えると URL も変わる

`draft: true` は下書き状態で、`false` に変えて初めてページが生成される。公開日が未来の記事も一時的に除外されるので、その日になったらもう一度ビルドを走らせる必要がある。このテンプレートには予約投稿の仕組みは付いていない

`private: true` は、僕自身の Obsidian 公開フローでは外部公開の同期をスキップしてローカルだけに留める用途で使っているけれど、この単体テンプレートでは今のところ `draft` だけでページ公開を制御している

## Obsidian を使うのがおすすめ

普段から Markdown に慣れているならエディタは何でもいいけれど、管理人自身が Obsidian で書いていることもあって、Obsidian 向けのワークフローが一番よく馴染むのは確かだ。Obsidian を使いたい場合は、こう進めるといい：

0. [obsidian](https://obsidian.md/download) をダウンロードする
1. Git をインストールして、新しく作ったリポジトリをローカルにクローンする
2. Obsidian で「フォルダをボールトとして開く」を選び、`my-blog` のルートフォルダ全体を開く（`articles/` だけを開かないこと）
3. テンプレートには Templates の基本設定がすでに用意されていて、テンプレートフォルダは `articles/templates` になっている
4. `articles/posts/文章名/` の中に `index.md` を作り、「テンプレートを挿入」を実行して `blog-post` を選ぶ
5. 書き終えたらタイトルや日付、`draft` を直し、コミットして GitHub にプッシュする

リポジトリのルートを Obsidian のボールトにしているのは、Git プラグインから同じ階層の Git リポジトリをすぐ見つけられるようにするためだ。添付ファイルはデフォルトでその記事のすぐ隣に置かれるし、ファイル名が `index.md` でも問題ない。記事タイトルはプロパティの `title` で決まるからだ

Obsidian の中からコミットしたい場合は、コミュニティプラグインから作者が **Vinzent** の **Git** プラグインを入れられる。プラグイン ID は `obsidian-git` だ

ログイン周りは、システムの Git 認証を使い回すのが個人的にはおすすめ。Windows で Git for Windows を入れるときに Git Credential Manager を有効にしておき、最初にリポジトリのディレクトリで `git push` を実行してブラウザの案内に従って自分の GitHub にログインする。それが済めば、デスクトップ版 Obsidian Git からもシステム Git にある認証情報をそのまま使える

## ローカルで表示を確認したいとき

まずはブラウザ上の編集から始めても十分使える。リアルタイムプレビューが欲しくなったら、Node.js 22.12 以降をインストールして、自分のリポジトリのルートで次を実行する：

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

ターミナルに表示されたアドレス（デフォルトは `http://localhost:4321`）を開けばよく、Markdown を直すと自動で再読み込みされる

検索インデックスはビルド時に作られるので、検索を試したいときは次を実行する：

```powershell
pnpm run build
pnpm preview
```

そして今回プレビューコマンドが表示したアドレスを開く。普段の執筆では、ひと段落直すたびにフルビルドする必要はない

## 任意：Token を使って GitHub Actions から公開する

GitHub 側のチェックがすべて通ってからサイトをアップロードしたいなら、このルートも選べる。デフォルトの Git 連携でも十分なので、記事を書くためだけにわざわざ設定し直す必要はない

まずはすでに存在する Pages プロジェクトを用意しておく。もともと GitHub とつないでいたプロジェクトは、Cloudflare の Build と Branch control から本番ブランチ・プレビューブランチの自動デプロイをオフにして、同じコミットで二重に公開されないようにする

Cloudflare でカスタム API Token を作り、権限は対象アカウントの **Account → Cloudflare Pages → Edit** だけを選ぶ

次に GitHub リポジトリの **Settings → Secrets and variables → Actions** に進み、次を入力する：

| 種別 | 名前 | 内容 |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | 作成した Pages Token |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |
| Variable | `CLOUDFLARE_PROJECT_NAME` | 既存の Pages プロジェクト名 |
| Variable | `SITE_URL` | 正式なサイト URL 全文 |
| Variable | `CF_PAGES_DEPLOY` | `true` |

テンプレート内の `.github/workflows/deploy-cloudflare-pages.yml` はデフォルトだとチェックだけを行う。`CF_PAGES_DEPLOY` を設定して初めて、チェックを通った同じビルド成果物を指定のプロジェクトへアップロードするようになる

これ以降も記事フォルダに Markdown を書いて `main` にコミットする流れは同じで、変わるのは最後のアップロードを Actions が担う点だけだ。Token は GitHub Secrets に置く

## あとからどこを直したくなったら

| 変えたいもの | ファイルの場所 |
| --- | --- |
| サイト名、著者、自己紹介、メモ | `site.config.mjs` |
| 記事、画像 | `articles/posts/文章名/` |
| プロフィールページ、相互リンクページ | `articles/spec/` |
| 新規記事テンプレート | `articles/templates/blog-post.md` |
| アバター、ファビコン | `public/` |
| 配色、文字サイズ、余白 | `src/styles/global.css` |
| ナビゲーション、フッター | `src/layouts/Base.astro` |

このテンプレートはデフォルトで簡体字中国語の記事サイトになっていて、1記事ごとに3言語を用意するような仕組みではない。僕自身のブログの3言語公開システムとは切り離していて、まずは書くことと公開することをシンプルにしている。あとからはっきり必要になったら、コメントやほかの機能を少しずつ足していけばいい

結局のところ、ブログで一番大事なのは中身だと思っている。だからこそ今の僕はこういうシンプルなテンプレートを選んで、もっとよくて面白い記事を書いていきたい

## 続きを読む

サイトが公開されたら、まずは [[free-domain-and-web-community|無料ドメイン]] を設定してみよう。DNS や画像ストレージ、サービスの入口について知りたければ、続けて [[cloudflare-free-tier-developer-guide|Cloudflare 無料枠]] へ。スマホと PC の間で執筆を同期したいなら、[[fast-note-sync-on-student-server|Fast Note Sync]] を覗いてみてほしい

このシンプルなスタイルに絞った判断の背景は [[blog-style-change|ブログリニューアル記録]] にまとめていて、公開後にクロールやページ情報を確認したくなったら、続いて [[geoscore-2-4-guide|GeoScore サイト診断]] を見てみるといい
