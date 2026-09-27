---
title: Disroot：一個很像互聯網老理想的開源服務集合
published: 2026-06-27
created: 2026-06-27
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 4
description: 記錄 Disroot 的郵箱、雲盤、XMPP 與協作工具，也借它重新整理 sayori.org 適合長期維護的公共服務
image: ""
tags:
  - 資源整合
  - 開源服務
  - 隱私
  - Fediverse
category: 工具與資源
draft: false
aiSummary:
  generatedAt: "2026-07-19"
  model: "codex-local"
  items:
    - "認識帶有公益和開源氣質的 Disroot"
    - "郵箱、雲盤、XMPP 和協作工具是主要入口"
    - "從服務邊界出發重新整理 sayori.org 的公共入口"
alias: ""

lang: zh-Hant
translationKey: posts/disroot-open-services-note/disroot-open-services-note
---

> [!NOTE]
> 這篇是 2026 年 6 月 27 日的記錄，Disroot 的註冊問題、服務配額和可用功能可能會變，申請前還是看一眼官網

今天還發現了一個很有趣的開源組織：[Disroot](https://disroot.org/)

這個組織把一堆開放互聯網工具湊到一起，然後認真維護成一個可以日常使用的平臺

官網對自己的描述很明確：自由、隱私、聯邦、去中心化

沒有廣告，沒有追蹤，沒有畫像，沒有數據挖掘，純粹的公益呢，也無愧.org之名

## 它有些什麼

服務列表在這裏：

[https://disroot.org/en/services](https://disroot.org/en/services)

目前有這些：

- Email，可以用網頁郵箱，也可以接 IMAP 客戶端
- Cloud，基於 Nextcloud，用來同步文件、日曆和聯繫人
- XMPP Chat，一個去中心化聊天協議
- Pads，在線協作文檔
- PrivateBin，加密 pastebin
- Upload，臨時文件分享
- Forgejo，代碼託管
- CryptPad，偏隱私的在線文檔套件
- FEDIsroot，地址是 [fe.disroot.org](https://fe.disroot.org/)，基於 Akkoma 的 ActivityPub / Fediverse 小微博服務，兼容 Mastodon API
- LibreTranslate，翻譯服務
- Vault，密碼管理相關服務

不一定每個都要用

但它有趣的地方就在這裏：你註冊一個賬號，就可以享受這麼多的開源服務

這對我這種喜歡折騰個人網站、服務器和開源服務的人來說，真的很有吸引力，也是可以借鑑的前輩呢

## 註冊問題有些奇特

註冊入口在這裏：

[https://user.disroot.org/pwm/public/newuser/](https://user.disroot.org/pwm/public/newuser/)

我這次看到的註冊問題是：睡前喜歡做什麼事

而且需要寫超過 50 個詞

這個問題還挺妙的

你可以先用中文或者其他語言認真寫一段，再翻譯成英文

比如可以寫自己睡前會看書、整理明天要做的事、聽音樂、刷一點開源社區動態，或者只是把手機放遠一點讓自己早點睡之類的

## 我會怎麼用它

目前我註冊了一個這個賬號，不過使用的話對我來說目前也就一個郵箱比較有趣了，畢竟註冊了這麼多的賬號和社區，積攢的獨特的域名郵箱應該也有一堆了，還有自己的自建臨時郵箱和域名郵箱

雖然這個有vaultwarden的公益服務，不過我都有自建的vaultwarden了，倒也不需要這種

而且Disroot 不是大廠免費套餐，它靠社區和捐贈活着，需要的時候能夠用上，就很好了

## 它也讓我重新看了一遍自己的服務

看完 Disroot 和 [[radical-servers-public-services|Riseup]] 收集的服務列表，我第一反應也是繼續往 sayori.org 上加東西，想要不辜負.org之名

不過畢竟個人能力有限，結合詢問過gpt後，幫我做了一個公開服務列表，就在這裏<https://sayori.org/zh/services/>

現在真正對外開放的主要是 GeoScore、博客文章、RSS 、白板和留言反饋。Search Gateway 繼續開源，但線上實例只給自己的站點和維護任務使用

相比繼續堆新服務，我更想先試幾個範圍很小的方向：給個人博客做網站體檢、幫助非商業靜態站上線、提供少量搜索證據額度，以及低頻的 RSS 到郵件或 Webhook 通知

這些都不會一開始就做成匿名公共平臺，而是先邀請、限額、人工處理。需求不存在就停，維護成本超過能力也停

我現在更願意把 sayori.org 稱爲個人維護、非商業、盡力而爲的公共數字服務，而不是公益組織，因爲我也沒有這個精力就是了


