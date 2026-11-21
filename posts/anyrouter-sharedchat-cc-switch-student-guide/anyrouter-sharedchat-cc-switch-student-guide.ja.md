---
title: "大学生向け：公式AI枠・AnyRouter・SharedChat・cc-switchを使った開発環境管理ガイド"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 12
description: "大学生向けの公式AIクレジット、AnyRouter登録、SharedChat無料枠の受け取り、cc-switchの設定メモ。Bilibiliに投稿した動画とあわせてどうぞ"
image: ""
tags:
  - 実践チュートリアル
  - AIワークフロー
  - Claude Code
  - 学生向け公式特典
category: "チュートリアル・ガイド"
draft: false
alias: ""
lang: ja
translationKey: "posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide"

---

この記事は動画のテキスト補足版で、正規の学生向け公式AI枠の連携方法についても書き足しています。

動画はこちら：[BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## これらはそれぞれ何なのか

`cc-switch` を設定する前に、連携できるいくつかのクレジット元を整理しておきます：

- **正規の公式枠**：[Zed Education](https://zed.dev/education)（学生認証で1年間のStudentプランが付与され、毎月10ドル分のAI Agent枠と無制限の編集予測が含まれる）、[Alibaba Cloud Model Studio（阿里云百炼）](https://bailian.console.aliyun.com/)（大学生向けの300元クーポンでの相殺や新規無料Tokenの受け取りが可能）、[Google AI Studio](https://aistudio.google.com/)（公式Gemini APIの無料枠）、および [GitHub Student Developer Pack](https://education.github.com/pack) 内の GitHub Copilot Student と GitHub Models。安定性が一番高いのでメイン使いに向いています
- **AnyRouter / AgentRouter**：Claude Code / Anthropic 互換インターフェースを提供するルーティングサービス。使えるAPIエンドポイントとKeyを発行してくれるので、Claude Code対応ツールに入力すれば使えます
- **SharedChat**：GPT / Codex 系の無料（公益）枠の入り口。追加のCodexクレジット入手先と捉えておけばOKです
- **cc-switch**：オープンソースのデスクトップ設定管理ツール。GitHubリポジトリは [farion1231/cc-switch](https://github.com/farion1231/cc-switch) で、Claude Code、Codex、Gemini CLI といったツールのプロバイダ設定を一元的に切り替えるのに使います

## 正規の公式枠の入手方法

まずは一番安定している公式のメインルートを確保したい場合、この4つの教育・無料枠を先に回収しておくのがおすすめです（全ジャンルの学生向けリソース一覧は [[edumails-glados-student-benefits|大学教育用メールアドレス公式特典ガイド]] を参照）：

1. **Zed Education（毎月10ドル分のAI枠）**：[Zed Education](https://zed.dev/education) で申請が通ると、1年間のStudent資格が付与され、毎月10ドル分のAgent tokens枠と無制限の編集予測（Claude Opusは対象外）がもらえます。申請条件はGitHubアカウントの登録から30日以上経過していることと、学校のメールドメインが [JetBrains/swot](https://github.com/JetBrains/swot) のリストに含まれていることです
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **Alibaba Cloud Model Studio（阿里云百炼）公式API**：[Alibaba Cloud学生特典受け取りリンク](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv) から300元の学生クーポンを受け取るか、直接百炼コンソールでAPI Keyを生成します。Base URLには `https://dashscope.aliyuncs.com/compatible-mode/v1` を入力します
3. **Google AI Studio 公式無料枠**：Googleアカウントでログインすれば直接Gemini API Keyを生成できます。クレジットカードを紐付けなくても、毎日の無料枠の範囲内でGeminiシリーズを呼び出せます
4. **GitHub Student Developer Pack**：教育用メールアドレスを認証すれば、そのまま GitHub Copilot Student を有効化できます

## AnyRouter の登録

公式サイト：[https://anyrouter.top/](https://anyrouter.top/)

管理人のアフィリエイトリンク（こちら経由だとお互いに50ドル分もらえます）：[https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

登録時は画面の案内に従って進めます。メールの認証コードはすぐには届かないことがあるので、数分待ってから再送ボタンを押してください。焦って連打するとかえってイライラする羽目になります。

> [!TIP]
> EDUメールアドレスで登録できない場合は、こちらを直接見てください：
> [[#^answer1|👉 EDUメールアドレスで登録できないときの対処法]]

## AgentRouter もあわせてチェック

もう一つ一緒に見ておける入り口が AgentRouter です：[https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

GitHubやLinux Doのアカウントで登録・ログインでき、モデル一覧には `gpt-5.5` やClaudeシリーズが並んでいます。もし登録できるようなら、予備ルートとして確保しておけます。

登録条件はこちら

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## AnyRouter API Key の生成

管理画面のAPIトークンページに入り、新しいトークンを作成します。

名前は何でも構いませんが、自分で見てすぐ分かるものにしておくのがおすすめです。例えば：

```text
cc-switch-anyrouter
```

よく入力する項目は大体こんな感じです：

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## SharedChat の GPT 枠を受け取る

[SharedChat](https://sharedchat.cc/#/) については、ページ内のキャンペーン入り口から進めます。

これ自体は登録不要で無料でGPTのWeb版チャットが使える公益プロジェクトですが、管理人が最近新しく公益Codexプロジェクトも立ち上げていて、毎日クレジットを受け取れます。

大まかな流れは以下の通りです：

1. QQメールで [Codex 公益サイト](https://new.sharedchat.cc/list/#/register?i=E8v44) に登録・ログインします（**有料サイトの方ではないので注意**。もちろん課金したいならそれでも構いませんが）
2. ![[Pasted image 20260620234009.png]]
3. 右下の申請ボタンをクリックし、簡単な理由を書けばOKです。ブラウザで弾かれる表示が出たら、別のブラウザに変えるかシークレットモードを試してください

## cc-switch のインストール

cc-switch 公式リポジトリ：[https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Windowsなら基本的に `.msi` か portable zip をダウンロードします。macOSはREADMEのインストール方法を参照してください。Linuxは通常ディストリビューションに合わせて deb、rpm、または AppImage を選びます。

インストールして起動すると、PC内の既存のAI CLIツールを自動検出し、skillや履歴を読み込んでくれます。まずはこれで既存の設定を管理したり、関連ツールの更新やインストールに使ったりできます。
![[Pasted image 20260620233340.png]]

## cc-switch にプロバイダを追加する

AnyRouter や Alibaba Cloud Model Studio（阿里云百炼）を例にすると：

1. cc-switch を開く
2. Claude Code または該当ツールのプロバイダ設定に入る
3. カスタムプロバイダを新規作成
4. プロバイダ名を入力（例：`Aliyun-Bailian` や `AnyRouter`）
5. API Key を入力
6. リクエストURL / Base URL を入力
7. インターフェース形式を各プラットフォームの案内通りに選択
8. 保存
9. 使用 / 切り替えをクリック

複数のルートを追加したい場合は、それぞれ個別にプロバイダを作成し、名前を分かりやすく書いておきます：

```text
Bailian Official
AnyRouter edu
SharedChat
```

こうしておけば、後で切り替えるときに名前を見るだけでどの枠を使っているか一目で分かります。

## cc-switch で自動ルーティングを有効にする

一番シンプルな自動ルーティング設定は、まずルーティングを有効にしてから、フェイルオーバー（障害時切り替え）の優先順位を並べるだけです。

設定画面でルーティングを有効化します
![[Pasted image 20260620234413.png]]

自動フェイルオーバーの項目で複数のプロバイダを並べておきます
![[Pasted image 20260620234401.png]]

## 反映されているか確認する

切り替えたらターミナルを再起動するか、新しくターミナルを開きます。

まずは一言聞いてみます：

```text
/init
```

正常に返答が返ってきたら、コーディングタスクを試してみましょう。

もしエラーが出る場合は、以下の点を確認してみてください：

1. Key が最後まで正しくコピーできているか
2. Base URL に余計なスペースが入っていたり、パスの一部が抜けていたりしないか
3. cc-switch で本当に「使用 / 切り替え」をクリックしたか
4. ターミナルを再起動したか
5. 該当サイトのクレジット枠を使い切っていないか
6. モデル名が管理画面側で現在サポートされているものになっているか

## よくある質問

### EDUメールアドレスで登録できないときは
高い確率で、あなたのメールアドレスが AnyRouter のブラックリストに入っています。

ただ、学校ドメインの一部の頭文字を大文字に変えてみると届く場合があります。例えばメールアドレスが `stu.xxxx.edu.cn` なら、`stu.Xxxx.edu.cn` に変えて試してみてください。これで送信できることもありますが、安定して受信できるかどうかは運次第です。

^answer1

### CPA や Sub2 に繋ぐと使えない

AnyRouter は主に Codex や Claude Code といったCLIツール向けに作られているためです。CPA や Sub2 のような環境に繋ぎたい場合は、リクエストヘッダーの調整が必要になることがあります。以下は私が当時トラブルシュートしたときにメモした例です。

| ヘッダー | 値 |
| ------------- | ------------------------------------------------------------ |
| Authorization | Bearer sk-あなたのapi |
| User-Agent | codex_cli_rs/0.114.0（または実在する他のバージョン） (Windows 10.0.26100; x86_64) |

### AnyRouter が使えない・重すぎる
こればかりはどうしようもありません。なんせ同時に大勢がアクセスしているので、安定性はその時々のサーバー負荷次第です。私の経験則を下に置いておきます。
> [!NOTE]
> これはもう運ゲーですね。基本的には gpt5.5 が比較的繋がりやすくて、一度繋がってしまえばそこそこ安定します。あとは深夜帯だと空いていて入りやすいです。
>
> 混雑時は順番待ちになるので、新しいセッションを開いて「hi」と送り、ターゲットモードをオンにして、切れたら復旧させるのを繰り返してみてください。10分以内には大体繋がります。それでも繋がらない場合は、高い確率で設定ミスです。

さらに詳しいトラブルシューティングはこちらもどうぞ
[Any製ルーター障害解消ガイド！](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## あわせて読みたい

その他の公式特典は [[edumails-glados-student-benefits|学生特典まとめ一覧]] にまとめています。書いたプロジェクトをオンラインに公開したい場合は、[[azure-students-100-credit-guide|Azure 日本サーバー]] や [[aliyun-student-300-voucher-guide|Alibaba Cloud学生クーポン]] も参考にしてみてください。静的サイトならそのまま [[astro-mizuki-blog-from-zero|Cloudflare Pages でのサイト構築]] が手軽です。

モデルの接続ができたら、検索周りは別に [[build-your-search-gateway|Search Gateway]] として構築しています。ブラウザでの閲覧・翻訳やAPI管理を補助するツールは [[useful-browser-extensions-toolbox|プラグイン一覧]] に載せています。
