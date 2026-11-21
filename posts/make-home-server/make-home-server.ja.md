---
title: 古いWin7 PCを自宅クラウドサーバーに魔改造した記録
published: 2026-08-09
created: 2026-08-09
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: ゼロから実家の古いWin7 PCをLinuxサーバーにしてみた記録。読み終わればあなたも手を出せるはず
image: ""
tags:
  - 実践チュートリアル
  - VPSとセルフホスト
  - Docker
  - 自宅クラウド
category: "チュートリアル・ガイド"
draft: false
lang: ja
translationKey: "posts/make-home-server/make-home-server"
alias: ""
---
# きっかけ
夏休みで帰省して家族と話していたとき、実家にそろそろ使わなくなった古いWin7 PCがあることに気づいた。ちょうど自宅クラウドを組んでみたいなと思っていたところなので、AIに細かく一歩ずつ教えてもらいながらついに構築に成功し、自分のTailscaleメッシュネットワークにも無事組み込めた。その記録を残しておく。
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# 全記録

## 準備フェーズ

Ubuntuのインストールメディアを作るために、4GB以上のUSBメモリを1本用意する。まずは[Ubuntu Server公式サイト](https://ubuntu.com/download/server)から最新の安定版をダウンロードする（管理人は26.04をダウンロードした）。続いてブータブルUSBを作るために[Rufus](https://rufus.ie/)をダウンロードする。
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
RufusでダウンロードしたUbuntuのイメージを選択する。USBメモリに大事なデータが入っていないか確認したら書き込み開始。ほかの項目はデフォルトのままでOK。これでUbuntu Server 26.04 LTSのインストーラーが入ったUSBメモリが完成する。

## インストールフェーズ
電源を入れる前にUSBメモリを挿しておく。**Lenovo**のロゴが出たら`F12`を何度か連打する。反応しなければ`Fn+F12`を試してみる。**Boot Menu**に入ったら方向キーでUSBのブート項目を選び、USBから起動してUbuntuのインストール画面へ進む。

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

最初のほうの選択はそのままデフォルトで進めていき、管理人がここで止まったとき、AIのおすすめ通り3つ目にチェックを入れておいた。サードパーティ製ドライバーを自動で探してくれて、音が出ない・Wi-Fiにつながらないといったトラブルを減らせる。

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

次の画面に来たら、家にWi-Fiがあるなら方向キーで2つ目の`wlp3s0`に移動し、Enterを押してから`Edit Wifi`を選び、自宅のWi-Fi名とパスワードを入力しておくとよい。あとで設定が終わったあとにすぐネットにつながっている状態になって楽だからだ。

その次はプロキシ設定を入力する画面になるが、必要なければそのままスキップしてしまって大丈夫。

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

自分みたいにPC丸ごと魔改造するならそのままDoneを押していく。次の画面でPCのまとめ情報が出るので、これもDoneとContinueを押せば、あとはしばらくインストール中ing……になる。

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

この画面に入ったら、サーバー名、ユーザー名、パスワードを設定する。Ubuntu Serverのインストーラーが作るのは一般ユーザーで、それに`sudo`権限が付与される。Ubuntuはデフォルトで`root`アカウントがロックされているので、ここを`root`にする必要はない。自分は`amiya`を使っていて、あとは`ssh amiya@服务器地址`でログインし、管理者権限が必要なときだけ`sudo`を実行している。

ここで設定したホスト名、ユーザー名、パスワードは覚えておくこと。忘れても焼き直しが必須というわけではないけれど、復旧がかなり面倒になる。

途中でUbuntu Proにするか聞かれる画面が出るが、普通に使う分にはまず使わないのでそのままスキップでOK（笑）。

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

そしてここからが**本番**。まずOpenSSHは必ず入れる。さらにGitHubアカウントを持っていてSSH公開鍵を設定済みなら、GitHubのユーザー名を入力して公開鍵をそのままインポートできる。インストールが終われば、同じLAN内からIPアドレスとSSH鍵でログインできるようになる。

公開鍵がちゃんと入ったのを確認したら、画面内の`[ ] Allow password authentication over SSH`はチェックを外してもよい。この項目はパスワードでのSSHログインを許可するかどうかを決めるもの。

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

そのあとインストーラーが定番のサーバーソフトを一覧で出してくる。本当に必要なものがあればスペースキーでチェックを入れ、いま特にいらなければそのまま`Done`を選ぶ。

最後に`Reboot Now`を押したあと、**Please remove the installation medium, then press ENTER**と出たら簡単で、USBメモリを抜いてからEnterを押せば普通に起動する！もし出なかったら、画面が真っ暗になったタイミングで抜くこと。さもないと即ループ転生……になる。

## 初期設定

あとから接続しやすいように、管理人はTailscaleでネットワークを組むことにした。

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

セットアップが終わるとだいたいTailscaleのリンクが出るので、メイン機側で自分のTailscaleアカウントにログインすれば、簡単に内線感覚でつながるようになる！

# あとがき
ここまで動かしてから2日ちょっと経ったけど、前のAstrBotとNapCatのSayoriボットを自宅回線サーバーへ無事お引越し完了！やったー！

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

それから今のFast Note Syncも自宅回線サーバーに移行できて、ブログのデータ同期がちょっと速くなった。

> [!NOTE]
> いまのところ次になにをやるかまだ決めてないにゃ。でも実家に置いた国内の自宅回線サーバーがあるの、やっぱりなんだかおもしろいにゃ。実測の上り帯域は約70 Mbpsで、2コア4GBでもちゃんと使える。ここまで読んでくれた人がいたら、この自宅回線ミニサーバーのよさそうな使い道があったらぜひ教えてほしい！

## 続きを読む

環境ができたら、次は [[docker-compose-minimum-start|Docker超入門]] を読んで、それから [[2c2g-server-service-index|ミニサーバー向けサービス一覧]] から使えそうなサービスを1つ選んでみるといい。

ノート同期もあとから自宅に移したんだけど、その手順は [[fast-note-sync-on-student-server|Fast Note Sync]] にまとめてある。サービスに独自ドメインやHTTPSを当てたいときは [[cloudflare-free-tier-developer-guide|Cloudflare]] を参照。
