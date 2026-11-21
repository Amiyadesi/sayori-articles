---
title: ボットを24時間稼働させたかっただけなのに、クラウドサーバーを買ってしまった話
published: 2026-05-25
created: 2026-05-25
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: アリババクラウドの学生クーポンからUbuntu、SSH鍵認証、非標準ポート、基本ファイアウォールまで、個人サーバーの最初の一歩。
lang: ja
translationKey: "posts/sayori-server-01-vps-start/sayori-server-01-vps-start"
image: ""
tags:
  - 実践チュートリアル
  - VPSとセルフホスト
  - アリババクラウド
  - 公式学生特典
category: "チュートリアル・ガイド"
draft: false
---

# はじめに

最初はサーバー環境とか大げさなことをやるつもりはなかった。ただQQボットを24時間オンラインにしたかっただけ。

ローカルでももちろん動かせる。AstrBotを立ち上げて、NapCatをつなぎっぱなしにして、サービスを落とさず、ネットも切らさず、PCをホスト代わりにすればいい。

![[Pasted image 20260609215751.png]]

だから「サーバー」というものの正体もすんなり腑に落ちた。24時間つきっぱなしで、他人のマシンルームに置いてあるパソコンのことだ。

で、管理人は貧乏学生なので、もちろんAI軍団を総動員して無料枠を探させた )

その後、アリババクラウドの学生認証に300元のクーポンがあるのを見つけた（[学生特典の受け取りリンク](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)）。もらえるものはもらっておいて損はない。

受け取ったあと、[トライアルECS](https://free.aliyun.com) があるのも見つけた。まずはこれを試すのがおすすめ。2H2Gの構成で作ればボットを遊ぶには十分だし、ちょうど3か月使える。

![[Pasted image 20260609221047.png]]

そしてこの300元クーポンは、トライアルECSから年払いECSへ切り替えるときにぴったり使える。管理人はもう切り替え済み！

![[Pasted image 20260609221956.png]]

そう計算すると、実質4年分くらいはタダ同然でサーバーを運用できそう。

ただ気をつけたいのが、アリババクラウドの無料通信枠は中国本土だとたしか月20GBしかないこと。ボットを動かすだけなら足りるけれど、上限アラートを設定しておくのが無難。

## 初めてこのマシンにつなぐ

サーバーを買ったあと、本当の問題が始まる。どうやって中に入るのか。

コンソールにはパブリックIP、rootユーザー、初期パスワードが表示される。一番手っ取り早いのは、まずはパスワードで一度つないでみること。

```powershell
ssh root@<VPS_PUBLIC_IP>
```

初回接続時はこのマシンを信頼するか聞かれるので、IPに間違いがないか確認してから `yes` を入力する。

ただ、パスワードログインはあくまでつなぎ。本格的に長く使うなら、やっぱり最初からSSH鍵認証に切り替えるのがおすすめ。

パスワードは玄関マットの下に鍵を隠すようなもの。便利は便利だけど、グローバルIPを持つマシンは毎日スキャンされる。デフォルトの22番ポート＋パスワードログインは、ネット上のいろんなスクリプトに「叩いてください」と言っているようなものだ。

## SSH鍵を生成する

自分はWindowsで作業しているので、まずはローカルでこのサーバー専用のSSH keyを作る。

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

Enter連打でもOK。秘密鍵にもう一段ガードをかけたいならpassphraseを設定する。

生成が終わると2つのファイルができる。

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

`.pub` がついていない方が秘密鍵。~~使い道がわからなければ自分に送ってくれてもいいよ~~、そうすればこっちからあなたのsshにつなげるので😈

`.pub` がついている方が公開鍵で、サーバー側に置ける。

公開鍵の中身を確認する：

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

`ssh-ed25519` から最後のコメントまで、1行まるごとコピーする。

## 公開鍵をサーバーに入れる

さっきパスワードログインしたSSHウィンドウは閉じずにそのままにして、サーバー側でSSH用ディレクトリを用意する。

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

ローカルの `.pub` にある1行をそのまま貼り付けて保存する。

次にパーミッションを変更する：

```bash
chmod 600 ~/.ssh/authorized_keys
```

この手順はちょっと謎に見えるけれど、めちゃくちゃ大事。パーミッションが緩すぎるとSSHがそのまま効かなくなり、鍵を認識してくれなくなる。

続いてローカルにSSH aliasを書いておく。毎回IPやポートや秘密鍵のパスを長く打たなくて済むようにするためだ。

開く：

```powershell
notepad $env:USERPROFILE\.ssh\config
```

書き込む内容：

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

新しいターミナルを開いてテストする：

```powershell
ssh sayori
```

そのままつながれば、鍵認証は通っている。

ポイントは「新しいターミナルを開いてテストする」こと。古いパスワードログインのウィンドウはまだ閉じない。今は命綱みたいなものなので、全部変更し終わってから手を離す。

## パスワードを無効化し、非標準ポートに変える

鍵認証で入れるようになったら、パスワードログインをオフにしつつ、SSHをデフォルトの22番ポートから動かす。

まずは非標準ポートを1つ選ぶ。たとえばこんな感じ：

```text
11451
```

これをそのまま真似しないこと。1024から65535の間で、ほかのサービスと被らないポートを自分で選ぶ。

そしたらまず、アリババクラウドECSのセキュリティグループでこのポートを許可する。ここすごく大事。

サーバー内のUFWが一枚目の扉だとすると、アリババクラウドのセキュリティグループももう一枚の扉。サーバー側だけ変えてセキュリティグループを変えないと、新しいポートからはやっぱり入れない。

セキュリティグループで許可したら、SSHウィンドウに戻って、自分用のSSH設定ファイルを作る。

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

中身：

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

ここの `PermitRootLogin prohibit-password` は、rootでも鍵認証ならログインできるけれど、パスワードログインはできないという意味。

もっと厳密にやるなら一般ユーザーを作ってからrootを禁止するのがいい。ただ、この記事ではまず一番早く使えるやり方を書いている。

書き換えたら、SSH設定に文法エラーがないか先にチェックする：

```bash
sshd -t
```

何も出力されなければいい知らせ。

次にSSHサービスを再起動する：

```bash
systemctl restart ssh
```

この時点ではまだ古いウィンドウを閉じない。

ローカルの `~/.ssh/config` にあるポートも書き換える：

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

さらに3つ目の新しいターミナルを開いてテストする：

```powershell
ssh sayori
```

これでつながって初めて、新しいポート・鍵認証・セキュリティグループが全部通ったことになる。

念のため、古いパスワードログインがちゃんと閉じているかも確認する。たとえば秘密鍵を使わずに手動でIPへつないでみる。

もしパスワードを求められて入れてしまったら、`PasswordAuthentication no` が効いていないということ。先に進まず、まずそこを突き止める。

## ファイアウォールを設定する

SSHが安定したら、次はサーバー自身のファイアウォールを設定する。

Ubuntuで一番扱いやすいのはUFW：

```bash
apt update
apt install -y ufw
```

ルールを先に書いておく：

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

すでにWebサービスを立ち上げる予定があるなら、HTTP / HTTPSも残しておいていい：

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

そして有効化する：

```bash
ufw enable
ufw status verbose
```

ここでもやっぱり古いSSHウィンドウは残しておくのがおすすめ。新しいターミナルからもう一度つないでみる：

```powershell
ssh sayori
```

つながるのを確認してから、古いウィンドウを閉じる。

## つながったらまずはマシンを一通り触ってみる

ちゃんと安定してつながるようになったら、マシンの状態をざっと見てみる：

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

2H2Gはメモリが大きくないので、あとからサービスを選ぶときは基本どれも軽量なものにする。

データベースを使わずに済むなら使わない。SQLiteでいけるならまずSQLite。Cloudflare Pagesに置けるものはVPSに置かない。

このマシンはあとからボットだけでなく、Vaultwarden、ntfy、Gatus、Portainer、AI Search Gatewayなんかもここから生えてきた。

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/) — サーバーの活用法についてすごくよくまとまったawesome系のサイトがあるよ！

振り返ると、個人サーバーで一番役に立つのは特定のサービスそのものというより、ネットワーク、デプロイ、セキュリティ、バックアップといったあたりを嫌でも理解させられることだ。

もしやり直せるなら、もっと早い段階でいくつか習慣を作っておきたい：

1. サービスごとにディレクトリを分ける
2. 本物のシークレットは `.env` かプラットフォームのSecretにだけ置く
3. コピペできるコマンドは全部ドキュメントに書く
4. デプロイするたびに検証用コマンドを1本残しておく

今回はここまで。サーバーにはSSHで安定してつながるようになり、パスワードログインは閉じ、ポートも変え、ファイアウォールにも最低限の境界線ができた。

次回は `scp` を使ってローカルの設定をリモートホストへ移す話をする。

つまりいよいよ、ボットを「自分のPCで動く」から「サーバーでも動く」へ移し始めるわけだ。

## 続きを読む

まだマシンを選んでいなければ、[[aliyun-student-300-voucher-guide|アリババクラウド学生クーポン]] か [[azure-students-100-credit-guide|Azure 日本サーバー]] を先にどうぞ。つながったあとは [[docker-compose-minimum-start|Docker 入門]] → [[2c2g-server-service-index|サービス一覧]] の順に進んで、自分が使えそうなサービスを1つ入れてみよう。
