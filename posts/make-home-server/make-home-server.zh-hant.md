---
title: win7老電腦爆改家裏雲記錄
published: 2026-08-09
created: 2026-08-09
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 2
description: 從零開始把家中win7老電腦改成linux服務器，看完你也可以上手
image: ""
tags:
  - 敘事
  - 服務器探索
category: 建站與自託管
draft: false
alias: ""
lang: zh-Hant
translationKey: posts/make-home-server/make-home-server
---
# 起因
暑假回來的時候和家裏人交流的時候，發現家中其實有一臺老舊不打算用的win7電腦，於是正好想着配置一個家裏雲，在和AI詳細一步一步學習和指導下，終於成功配置，並且加入自己的tailscale組網成功，特此記錄一下
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# 完整記錄

## 準備階段

準備一個至少4GB的小U盤，用來製作Ubuntu系統安裝盤。先從[Ubuntu Server官網](https://ubuntu.com/download/server)下載最新的穩定版，比如站長下載的就是26.04版本，然後下載[Rufus](https://rufus.ie/)製作啓動盤。
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
在Rufus中選擇下載好的Ubuntu鏡像。確認U盤裏沒有重要文件後開始寫入，其他選項保持默認即可。完成後，我們就有了一個裝載Ubuntu Server 26.04 LTS安裝程序的U盤。

## 安裝階段
開機前插上U盤。出現**Lenovo**標誌時連續按幾次`F12`；如果無效，可以嘗試`Fn+F12`。進入**Boot Menu**後，用方向鍵選擇帶有USB的啓動項，就能從U盤啓動並進入Ubuntu安裝流程。

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

前面的選擇直接按照默認選擇就行了，然後當站長選擇到這裏的時候，AI推薦最好勾上第三個，幫你自動尋找第三方驅動，減少沒有聲音和連不上wifi的問題

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

然後到達這個頁面的時候，如果家裏有無線Wifi的話，用方向鍵移動到第二個`wlp3s0`，然後Enter點擊後繼續選擇`Edit Wifi`，填入家裏的Wifi名稱和Wifi密碼就好了，這樣方便後面配置好後是直接有網的狀態

然後接下來就是一個讓你填入代理配置的頁面，如果沒有需求的話就可以直接跳過

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

如果你是像我一樣整個電腦爆改的話就繼續點done好了，然後下一個頁面就會彈出你的電腦的總結信息，繼續點done和continue就行了，然後就會進入一段時間的安裝中ing......

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

進入這個界面後，就可以設置服務器名稱、用戶名和密碼了。Ubuntu Server安裝器創建的是一個普通用戶，並授予它`sudo`權限；Ubuntu默認鎖定`root`賬號，因此這裏不需要把用戶名填成`root`。我使用的是`amiya`，後續通過`ssh amiya@服务器地址`登錄，需要管理員權限時再執行`sudo`。

請記住這裏設置的主機名、用戶名和密碼。忘記密碼也不一定需要重新刷機，但恢復過程會麻煩很多。

然後中間會有一個讓你選擇是否是ubuntu pro的，直接跳過就行了，正常人基本用不到hh

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

然後**重點**來了，首先OpenSSH是肯定要裝的。其次，如果你有GitHub賬戶並且已經配置SSH公鑰，可以直接輸入GitHub用戶名導入公鑰。安裝完成後，就能在同一局域網內通過IP和SSH密鑰登錄。

確認公鑰已經正確導入後，可以不勾選圖中的`[ ] Allow password authentication over SSH`。這個選項控制是否允許使用密碼進行SSH登錄。

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

然後安裝器會列出一些常見的服務器軟件。如果確實需要，可以用空格鍵勾選；暫時沒有需求就直接選擇`Done`。

最後點擊`Reboot Now`後，如果出現了**Please remove the installation medium, then press ENTER**就比較簡單了，拔掉U盤再點擊enter就可以正常啓動了！如果沒有出現這些，那就在黑屏後拔掉，否則你就要即刻輪迴......

## 初始配置

爲了後面連接的方便，站長選擇用tailscale組網

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

這些安裝好後通常會給你一個tailscale的鏈接，在自己的主力機上登錄自己的tailscale賬戶就可以方便的內網連接了！

# 後記
截止目前運行了兩天多，把之前的astrbot和napcat的sayori機器人成功遷移到家寬服務器上哦耶！

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

然後目前的fast note sync也成功遷移到家寬服務器上，讓我的博客的數據同步的更快一些

> [!NOTE]
> 然後暫時也不知道搞什麼了喵，不過有一個放在家裏的國內家寬服務器還是挺有趣的喵。實測上行帶寬約70 Mbps，2核4GB也能用。如果你看到這裏了，歡迎給我一些如何利用好這個家寬小服務器的建議！
