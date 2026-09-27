---
title: "（轉載）爲什麼你剛搜的東西，其他App轉頭就知道了？（包括IOS系統）"
published: 2026-07-23
created: 2026-07-23
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 2
description: "經原作者授權轉載，借 Loupe 展示移動 App 能讀取的設備、相冊和局域網信息，以及廣告 SDK 如何拼接設備指紋"
image: ""
tags:
  - 隨筆
  - 隱私安全
  - 設備指紋
  - iOS
category: 互聯網與社區
draft: false
author: "我愛喫糖醋排骨（aichitangcupaigu）"
licenseName: "作者授權轉載"
alias: ""
lang: zh-Hant
translationKey: posts/cross-app-tracking-device-fingerprinting/cross-app-tracking-device-fingerprinting
---
<details class="repost-source">
<summary>原文與授權</summary>
<p>原文：<a href="https://linux.do/t/topic/2598156">https://linux.do/t/topic/2598156</a></p>
<p>已獲得原作者授權</p>
</details>

爲什麼你剛搜的東西，其他App轉頭就知道了？
![原文配圖 1](https://cdn3.ldstatic.com/original/4X/8/c/e/8ce2acacfb6433a493af0eda03104ce6b84cbefb.jpeg)

**你有沒有過這種經歷：**
前一天剛在社交媒體 App 上搜了一雙洞洞鞋，結果第二天，你在一個八竿子打不着的購物 App，刷到了這雙鞋的推薦。。。
**你開始惶恐，回憶自己到底有沒有在第二個 App 裏提過這雙鞋。**
在確定沒有之後，你開始猜測：要麼「這倆公司肯定偷偷把我數據倒來倒去」，要麼「完了，手機麥克風在偷聽我說話」。
雖說上面這兩種操作都挺離譜，尤其是麥克風偷聽，很容易露餡，抓包一看就知道了，但一想到如今互聯網公司的下限，咱也
不敢替它們打包票。

![原文配圖 2](https://cdn3.ldstatic.com/original/4X/c/c/d/ccdbc57292e1e5c15f523593cbae7690e8bd4688.jpeg)

倒是廣告商們其實還有更隱祕更安全的辦法，把一雙洞洞鞋跨 App 推送到你眼前：

比如一臺手機在 A 軟件搜過洞洞鞋，就把這口味記在機器名下。
換到 B 軟件，再認出同一臺，就能接着推送這個口味了。它認的是機器，至於你叫什麼、是誰，它可以不用知道。
那問題來了，廣告商是怎麼記下這些信息的，這些信息又是怎麼溜出去的？
最近發現一個安全團隊做的 App：Loupe。
它只有一個功能，就是告訴用戶：手機 App 到底能獲取你多少數據？你每多「允許」一個權限，又會暴露哪些東西？

![原文配圖 3](https://cdn3.ldstatic.com/original/4X/2/d/6/2d6554fe54f68ceed0d214f5b2d3f2122f7db455.jpeg)

### 比如我剛進 Loupe，什麼權限都不給，它就給我一個下馬威。

![原文配圖 4](https://cdn3.ldstatic.com/original/4X/7/8/e/78e4f9f01d7cbd5baf7dbe38d311798a5c479853.jpeg)

它知道 我把手機地區設爲新加坡，鍵盤是中英文混着用，機器是23年9月激活，從那天起我已經複製29034次，上一次開機是8天3小時44分鐘前。
甚至，它還順手給我畫了個像。知道我裝了 Steam 和 Discord，判斷我多半是個遊戲玩家，又瞅見我裝了 GitHub 和 Slack，推測我在科技行業幹活。

![原文配圖 5](https://cdn3.ldstatic.com/original/4X/b/2/3/b236a61889f780c2baec80132a40731de84f8039.jpeg)

以上還只是 App 端顯示的，你要是查看了更詳細的報告，就會發現它知道更多。

![原文配圖 6](https://cdn3.ldstatic.com/original/4X/9/f/9/9f90e4fdaa228e500b670e4f56fbb875d2ed0d2d.jpeg)

> **比如知道我的 iPhone 15 Pro 這會還剩 105G 存儲空間，現在開着深色模式，屏幕亮度在一半多，電量 60%，沒插充電器；雙卡雙待，兩卡都處於 5G，甚至還知道此刻手機怎麼斜着、朝哪個方向。**

你可能還是覺得這些零碎玩意兒，知道了又能咋樣，能定位到我們嗎？
確實不行。

再說，這些還是 Loupe 基於公開 API 看到的信息：
**如果像其他 App 那樣，我再給 Loupe 開放相冊、定位等權限，它又會知道哪些信息呢？**

![原文配圖 7](https://cdn3.ldstatic.com/original/4X/b/9/3/b935c1139826d4ca05e1ced72acb9b93ff4ecd93.jpeg)

**嘗試給一下相冊權限。
很快 Loupe 就告訴我，我圖庫裏 1119 段視頻、9371 張圖，其中 3033 張都帶了地理位置，並列出了哪些地方我去的次數最多。**

![原文配圖 8](https://cdn3.ldstatic.com/original/4X/8/7/f/87fecc780d3fbbd4b3ac5d60adb23722d7795c85.jpeg)

別看 App 只精準到了「餘杭區」，這只是 loupe 爲了方便展示。
要知道照片裏 EXIF 信息裏有精確到十米左右的經緯度，一個 App 只要分析每個位置出現的次數和時間點，就能大概猜出我住的
小區，我上班的地方，然後偶爾在節假日蹦出來的某個十八線小縣城，大概率就是我的老家。

建議大家把所有 App 都設置爲走系統圖片選擇器，就是彈出來讓你勾幾張授權的，此時 iOS 就默認不把照片定位發給
App。

![原文配圖 9](https://cdn3.ldstatic.com/original/4X/d/2/4/d24bb924f7cbd8381b583cf2e5ec8786db8aa8d3.png)

**對了，平時遇到那些問你要不要爲了「方便」開啓全部權限的彈窗，也記得點
保持現狀**

![原文配圖 10](https://cdn3.ldstatic.com/original/4X/3/7/d/37d95477ca9bb8d97434e7dbb5ccb0e87da815ce.jpeg)

#### 接下來，再給 Loupe 開一個本地網絡權限，看看它能獲取些啥。

說實話，這權限平時誰會多想啊？不就是連個打印機投個屏麼。
但我在點了允許之後，局域網內的所有同事電腦，HP 激光打印機、兩臺綠聯 NAS，全部顯示出來。

![原文配圖 11](https://cdn3.ldstatic.com/original/4X/e/2/6/e260c50f19840d11607940d77b903b103c9149dc.jpeg)

當然，這權限能看到周圍所有設備也是合理的，不然也找不到設備。
只是我不明白，這權限不應該在我需要投屏時才彈窗的嗎？

**爲什麼很多 App 明明只是打開了它，它就伸出手問你要了呢？**

![原文配圖 12](https://cdn3.ldstatic.com/original/4X/d/c/2/dc2e3deecc238db396040613fa1e429b2b0aaecc.jpeg)

後面的位置、藍牙、日曆權限，就不詳細講了，大家可以看一下截圖上的信息。
總之每點一個「允許」，App 對你的瞭解就更深入，你的設備指紋就更清晰更多元。

![原文配圖 13](https://cdn3.ldstatic.com/original/4X/b/f/8/bf8c7d05a0a890f8c54d02a18b6fdfbcb4f65925.jpeg)

### 那麼我在 A 軟件裏被算出的指紋和喜好，B 軟件是怎麼知道的？

答案是廣告商。
很多 App 自己不做廣告系統，而是接入一個現成的廣告 SDK。你在 App 裏看到的開屏廣告、信息流裏的廣告，都是這段代碼從廣告平臺拿來、再顯示給你的。
與此同時，  SDK  會把你這臺手機的特徵傳回廣告平臺。

### 按說 SDK 想認出你這臺手機，本不必這麼麻煩。

蘋果原本就發過一個正經識別碼，叫 IDFV，意思是「同一家公司旗下的幾個 App，共用一個號」。所以你要是裝的幾個 App 都是一家出的，它們認出你是同一個人，根本不費勁。

可一旦跨了公司，IDFV 就不通用了，此時 IDFA 就上場了。 IDFA 一個手機一個號，所有 App 通用，專門幫廣告圈跨 App
認人。
可問題又來了。
2021 年蘋果上線了 App 跟蹤透明度（ATT），把 IDFA 的開關塞回了用戶手裏。App 要想用，得先彈窗問你一句，你點一下「要求 App 不要跟蹤」，這個號當場清零。

![原文配圖 14](https://cdn3.ldstatic.com/original/4X/6/6/7/667faaa7428c6b527a54c4fa1e90c081eb6bc9b8.jpeg)

### 所以到最後廣告商只能自己動手，用這套設備指紋戰術。

那這套戰術，是不是真有 App 在偷偷用？

Loupe 的開發者團隊叫 Mysk，他們之前就抓包過 Facebook、Instagram、Threads、Chrome、Spotify，結果發現這些 App 雖
然在蘋果隱私清單裏答應了「我讀這個信息，但絕不外傳」，但其實還是把用戶手機的開機時間，偷偷發了出去。
不是兄弟，你們要開機時間幹啥啊，難不成口味比沃爾瑪塑料袋、武裝直升機還獨特。。。

> 其實真相只有一個，就是在拼湊設備指紋。

![原文配圖 15](https://cdn3.ldstatic.com/original/4X/4/7/0/4705d3165cdb9ae055ee87c7e82945e99b5662fe.jpeg)

類似的事情在安卓陣營也出現過。
2025 年穀歌研究團隊發表了一篇論文，他們扒了 18 萬個安卓 App 和 22 萬個 SDK，結果發現應用商店的熱門 App 裏，39.4%
都裝着收集設備指紋的 SDK。如果把類別歸到交友和漫畫類 App ，這個數字更是飆到了82%和88%。

目前 Loupe 完全免費且開源，我覺得 iPhone 用戶都可以下一個試試（ 安卓用戶可能再等等）。
當然試過之後，大家也不用草木皆兵。
畢竟廣告商想猜到你愛看啥，想買啥，除了設備指紋，還有相似人羣、賬號打通、協同過濾，辦法多了去了。
我認爲 Loupe 最大的作用，就是它能讓你能知道自己有哪些數據是暴露的，又是在什麼情況下暴露的，提高一下自己的安全意
識，平時多加小心吧。

**目前 Loupe 完全免費且開源，我覺得 iPhone 用戶都可以下一個試試（ 安卓用戶可能再等等）。**
![原文配圖 16](https://cdn3.ldstatic.com/original/4X/2/6/2/26205297cb564a9cfa5f784886884928b1d370ad.png)

> **如果這方面話題感興趣，可看看我過去發的文章：**
>
> [（轉載）業內人士,向佬友揭露一下流氓APP是怎麼圍剿獵殺用戶的](/posts/rogue-app-advertising-user-traps/)

> [（轉載）你的手機，是怎麼樣被他們區分對待的？](/posts/mobile-app-ad-targeting-device-profiling/)

**相關文章、圖片、資料、代碼來源 ：**

1. https://mysk.blog/2024/05/03/apple-required-reason-api/
2. https://mp.weixin.qq.com/s/fR_GTcbEg84GOcQ5XXcyCw
3. https://apps.apple.com/cn/app/loupe-app能看到什么/id6766152470
4. https://github.com/mysk-research/loupe
5. https://nopj.cn/d/7382-loupekai-yuan-xiang-mu-shi-shi-jian-kong-iosyuan-sheng-appshu-ju-quan-xian
