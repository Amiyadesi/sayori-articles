---
title: 給剛搭好的博客配一個免費域名，再去站長社區露個臉
published: 2026-06-22
created: 2026-06-22
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 8
description: 從 DNSHE 免費二級域名、Cloudflare DNS 到評論系統、開往、萌備、十年之約，給剛搭好的博客補上域名、互動和一點被看見的機會。
image: ""
tags:
  - 敘事
  - 域名
  - Cloudflare
  - 獨立博客
category: 建站與自託管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "給博客補上 DNSHE 免費二級域名和 Cloudflare DNS"
    - "接入評論系統，讓讀者能留下反饋"
    - "從開往、萌備和十年之約認識個人站社區"
alias: ""

lang: zh-Hant
translationKey: posts/free-domain-and-web-community/free-domain-and-web-community
---

上一篇寫了怎麼從 GitHub、Cloudflare Pages、Mizuki 和 Obsidian 搭一個自己的博客

搭完以後，默認地址大概長這樣：

```text
https://你的项目名.pages.dev
```

能用，但總感覺還差一點

博客有了，下一步很自然就是給它配一個像樣的域名，然後去一些站長社區露個臉。不是爲了立刻有多少流量，而是讓這個網站從「我電腦裏一個項目」變成「互聯網上一個有名字的小地方」

## 免費域名先夠用

如果暫時不想買域名，可以先用免費二級域名練手

我現在比較推薦看 DNSHE 這類服務：

[https://my.dnshe.com/](https://my.dnshe.com/)

![[Pasted image 20260623151351.png]]

我目前會優先看 `cc.cd` 這類能接入 Cloudflare 的後綴

![[Pasted image 20260622231201.png]]

免費域名適合做這幾件事：

- 給 Cloudflare Pages 博客綁一個自定義域名
- 學 DNS 解析
- 學 Cloudflare 託管
- 給後面的自託管服務準備子域名

它不適合做這些事：

- 長期商業項目
- 重要郵箱主域名
- 不能丟的品牌入口
- 你完全不願意承擔規則變動風險的項目

## DNSHE 助力碼

DNSHE 有助力機制，可以互相助力獲得更長期的二級域名

我先把幾個助力碼放這裏，後面如果有新的再補：

```text
VJC8UQYTPK
GHGMEUGWXA
VVN9QFPEUL
UUJ22RXYDC
G4HPCNW7R4
```

如果你只是臨時試博客，不一定要追求永久，先拿一個能解析的域名，把流程跑通更重要

## 接到 Cloudflare

拿到域名後，下一步是接 Cloudflare

最常見的流程是：

1. 在 Cloudflare 裏添加站點
2. 按提示把域名的 NS 改到 Cloudflare
3. 等 DNS 生效
4. 到 Cloudflare Pages 項目裏添加自定義域名
5. 按 Pages 給出的提示補 CNAME 或者讓 Cloudflare 自動配置

如果你用的是免費二級域名，要先確認它支不支持改 NS。不能改 NS 的話，就只能在原平臺添加解析記錄，或者換一個更適合接 Cloudflare 的後綴

這裏不要急，DNS 生效有時會等一會兒。先確保根域名和 `www` / 子域名到底要指向哪裏，別一邊改一邊忘了自己剛剛填過什麼

## 給自託管服務留子域名

後面如果你有 2C2G 學生服務器，可以提前規劃子域名：

```text
vault.example.cc.cd  -> Vaultwarden
notes.example.cc.cd  -> Fast Note Sync
ntfy.example.cc.cd   -> ntfy
status.example.cc.cd -> Gatus
```

不要所有服務都塞在根域名下面。

域名像門牌號。門牌號清楚，後面搬家、遷移、反代、關服務都舒服一點。

服務器服務可以看這篇總表：

[[2c2g-server-service-index|2C2G 学生服务器能跑什么：先别把小机器塞爆]]

## 免費域名和正式域名怎麼選

我會這樣分：

免費域名適合：

- 剛搭博客
- 學 DNS
- 做教程
- 試 Cloudflare Pages
- 試自託管服務

正式域名適合：

- 長期維護的博客
- 要做正式郵箱
- 要把地址印在頭像、名片、視頻簡介裏

不是說免費域名低人一等。只是長期項目最怕「以後遷移很煩」

如果你已經確定這個博客要寫很久，那買一個自己喜歡的域名很值得，個人項目允許一點任性，名字喜歡就會更想維護

# 接觸站長社區

域名配好後，可以去一些站長社區看看

不是去硬打廣告，而是讓自己進入一個還有人在寫博客的環境裏。獨立博客最怕寫着寫着變成單機日記，偶爾看看別人怎麼寫、怎麼裝修、怎麼互鏈，會有動力很多

## 開往 Travellings

開往是一個友鏈接力項目：

[https://www.travellings.cn/](https://www.travellings.cn/)

它的玩法很可愛。你在網站上放一個「開往」入口，訪客點擊後會隨機跳到另一個加入項目的獨立站點

加入說明：

[https://www.travellings.cn/docs/join.html](https://www.travellings.cn/docs/join.html)

適合已經有一些內容的博客

不要剛建完首頁空空的就去申請。先寫幾篇文章，讓別人點進來真的有東西看

## 萌備

萌備是萌國 ICP 備案：

[https://icp.gov.moe/](https://icp.gov.moe/)

申請頁：

[https://icp.gov.moe/join.php](https://icp.gov.moe/join.php)

這個不是工信部備案，別誤會。它更像二次元/個人站之間的一種趣味標識和社區入口

官網申請頁對內容有要求，比如非商業、非灰色、內容不是空殼、啓用 HTTPS、能長期訪問

如果你的站點風格合適，可以申請一個萌備號放在頁腳。它沒有什麼實用剛需，但很有獨立站味道

## 十年之約

十年之約：

[https://www.foreverblog.cn/](https://www.foreverblog.cn/)

它的核心是一個約定：從加入開始，博客十年不關閉或者更久，保持更新和活力

聽起來有點中二，但我挺喜歡這個說法

不過這個需要一年的運行時間才能申請，所以還是先等待着吧，當然如果你的站點有一年的時間，那也確實可以去嘗試申請看看了哈哈

## 揪蟬

揪蟬：

[https://hi.jiuchan.org/docs](https://hi.jiuchan.org/docs)

它是一個個人網站收錄和隨機訪問平臺，玩法上有點像把獨立站放進一個「隨機發現」入口裏

如果你的博客已經有幾篇能看的文章，也可以去看看它的收錄文檔。對新站來說，這類平臺的意義不是立刻帶來多少訪問量，而是讓別人有機會從一個站跳到另一個站，慢慢發現你

# BlogFinder

[BlogFinder - 發現優秀的個人博客](https://bf.zzxworld.com/)

## 中文獨立博客列表

GitHub：[https://github.com/timqian/chinese-independent-blogs](https://github.com/timqian/chinese-independent-blogs)

這個倉庫收集中文獨立博客。它更像一個長期維護的博客索引，包含博客地址、RSS、簡介、標籤

適合誰：

- 有穩定博客
- 有 RSS
- 內容主要是自己寫的
- 願意被公開索引

現在很多人已經不主動訂閱博客了，信息都被平臺拿去排隊分發。中文獨立博客列表至少保留了一種老但好用的方式：我喜歡誰，就訂閱誰

如果要提交自己的站，先把這些補好：

```text
站名
站点 URL
RSS URL
一句话介绍
主题标签
```


# 其他免費域名途徑

DNSHE 不是唯一的選擇。這裏再記幾個我看到過的：

[ 可託管CF現有開放可註冊免費域名集合](https://www.nodeloc.com/t/topic/70964?u=amiya_desi)

[https://domain.stackryze.com/](https://domain.stackryze.com/)友情提示，可以註冊四個域名，目前可以託管CF的只有，.in,.cc這兩個域名

nodeloc的一個小寶藏貼，裏面匯聚了挺多的

### GitHub Pages 自帶域名

如果你暫時不想折騰任何域名服務，GitHub Pages 本身就給你一個：

```text
你的用户名.github.io
```

Cloudflare Pages 也給：

```text
你的项目名.pages.dev
```

這兩個嚴格來說不是「你的域名」，但足夠用來寫博客和展示項目。等想好了再買正式域名也不遲。

## 給博客加評論系統

上一篇說了要講評論系統，這裏補上

博客沒有評論區也能活，但如果你寫的是教程、經驗、踩坑記錄，偶爾能收到一條「這個幫到我了」或者「第三步我遇到了不一樣的問題」，也能夠促進交流和你的學習，以及留下評論區的話就可以更方便的收到反饋了，相比於郵箱聯繫之類的

評論系統我目前看到比較適合個人靜態博客的有這幾個：

### Twikoo

[https://twikoo.js.org/](https://twikoo.js.org/)

GitHub：[https://github.com/twikoojs/twikoo](https://github.com/twikoojs/twikoo)

Twikoo 是中文獨立博客圈用得比較多的評論系統。支持匿名評論、郵件通知、表情、管理後臺

部署方式很多：Vercel、Netlify、雲函數、自建 Docker。對學生來說，Vercel 免費部署是最省事的路線

優點：

- 中文生態，文檔友好
- 部署成本可以做到零
- 管理後臺能審覈、刪除、回覆
- 支持郵件和微信通知

缺點：

- 你要選一個數據庫後端（MongoDB Atlas 免費版、或者 Vercel KV、或者自建）
- 如果用第三方免費數據庫，數據不完全在自己手裏

### Giscus

[https://giscus.app/](https://giscus.app/)

GitHub：[https://github.com/giscus/giscus](https://github.com/giscus/giscus)

Giscus 用 GitHub Discussions 作爲評論後端。訪客用 GitHub 賬號登錄後才能評論

優點：

- 數據存在你自己的 GitHub 倉庫裏
- 不需要額外部署
- 適合技術博客，讀者大概率有 GitHub 賬號
- Markdown 格式、代碼高亮天然支持

缺點：

- 必須 GitHub 登錄
- 非技術讀者可能不願意爲了留言註冊 GitHub
- 評論和你的倉庫綁死，換倉庫要遷移

### Artalk

[https://artalk.js.org/](https://artalk.js.org/)

GitHub：[https://github.com/ArtalkJS/Artalk](https://github.com/ArtalkJS/Artalk)

Artalk 是自建評論系統，需要跑一個後端服務。如果你已經有 2C2G 服務器，可以用 Docker 跑

優點：

- 數據完全自己控制
- 支持多站點管理
- 功能比較全：郵件通知、Telegram 通知、驗證碼、管理後臺

缺點：

- 你得有服務器
- 多一個要維護、備份、更新的服務
- 2C2G 上再多跑一個服務，要留意內存

### 我會怎麼選

如果你剛搭好博客，沒有服務器，我推薦先試 Giscus 或 Twikoo（Vercel 部署）

如果你已經有服務器，而且讀者不全是程序員，可以看看 Artalk

如果你暫時不想折騰評論，也完全沒問題。先把文章寫好，等有讀者了再加也來得及。評論系統不是博客的核心，內容纔是

## 還有哪些地方可以放鏈接

- 友鏈頁：找同主題博主互換鏈接
- GitHub Profile：把博客放在個人主頁
- B 站 / YouTube / 小紅書簡介：教程視頻配文章鏈接
- Linux DO / V2EX 等論壇簽名：按社區規則來，不要刷屏
- 開源項目 README：如果項目和博客相關，可以放文檔鏈接

給你的網站開拓更多入口，也就會有更多人來訪問了

## 博客數據：知道有沒有人來過

加完域名和社區入口以後，你可能會開始想知道：到底有沒有人看我的博客？

幾個輕量替代：

- **Umami**：[https://umami.is/](https://umami.is/)，可以自建，也可以用官方免費版。界面乾淨，數據自己控制。
- **Cloudflare Web Analytics**：如果你已經在用 Cloudflare，它自帶的 Web Analytics 免費而且不需要額外代碼，直接在 Dashboard 裏看就行
- **Plausible**：[https://plausible.io/](https://plausible.io/)，付費爲主但可以自建。
- **不裝任何分析**：也行。個人博客不是商業網站，不看數據也能活

我現在的建議是先用 Cloudflare Web Analytics（因爲你大概率已經接了 Cloudflare），等哪天覺得不夠用了再考慮 Umami

不要每天盯着數字看。寫東西比看數據有用

## 最後

剛搭好的博客先別急着追求完美

免費域名能用就先用，Cloudflare 能解析就先跑，社區能加入就慢慢申請，評論系統以後再加也不遲

真正重要的是繼續寫

域名、備案號、友鏈、開往按鈕、評論框，這些都是讓博客更像一個「站」的小裝飾。文章纔是它站得住的原因
