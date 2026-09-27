---
title: 從零搭一個自己的博客：GitHub、Cloudflare Pages、Mizuki 和 Obsidian
published: 2026-06-19
created: 2026-06-19
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 5
description: 從註冊 GitHub 和 Cloudflare 開始，用我的 Obsidian 博客模板寫文章，再用 GitHub Actions 發佈到 Cloudflare Pages。
image: ""
tags:
  - 教程
  - Astro
  - Cloudflare
  - Obsidian
category: 建站與自託管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "從 GitHub 和 Cloudflare Pages 開始搭建博客"
    - "用 Mizuki 模板和 Obsidian 管理文章源文件"
    - "通過 GitHub Actions 自動構建和發佈"
alias: ""

lang: zh-Hant
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# 從零搭一個自己的博客：GitHub、Cloudflare Pages、Mizuki 和 Obsidian

> [!NOTE]
> 現在是 AI 時代，Node.js、Git、pnpm 這些環境如果裝不明白，完全可以讓AI幫你裝好，下載一個opencode或者trae的免費AI就能實現了，以及包括拉取github倉庫和配置之類的，不過呢，這樣的話就沒有意思了，雖然站長本人也是這麼做的，但是既然自己要出教程的話，還是出一個能手操的吧
> 
> 說個有意思的，站長在寫這個的時候，才知道原來要安裝pnpm，之前都是直接讓codex幫我部署好了說是，不過這也挺好的，通過寫文章什麼的，深入的瞭解AI幫我搞出來的東西啊！



做完以後，你會有：

```text
GitHub 仓库
Cloudflare Pages 项目
Obsidian 写作目录
Astro/Mizuki 博客
GitHub Actions 自动部署
```

最後打開的地址大概長這樣：

```text
https://你的项目名.pages.dev
```

![[Pasted image 20260620202027.png]]

## 先註冊Github和Cloudflare

如果你沒有這兩個賬號，那麼還是最好註冊了好，github和cloudflare，可都是兩個著名的賽博大善人啊！而且github的賬號一般你註冊的越早越好，能享受很多福利呢！

先註冊 GitHub：

[Sign up for GitHub · GitHub](https://github.com/signup?return_to=%2F&source=login)

GitHub 用來放博客倉庫，還可以用Action來實現提交後自動上傳的工作流

如果註冊不了，可以嘗試切換節點，切換無痕瀏覽器，以及切換手機註冊，就比如站長最後就是在手機上註冊的QAQ~~*前面就是我的步奏了哈哈

再註冊 Cloudflare：

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

這個註冊就比較方便了，站長拿隨便註冊的outlook郵箱都可以註冊，當真是cf大善人

Cloudflare Pages 用來託管博客。它會把構建好的靜態文件放到 Cloudflare 的網絡上，然後給你一個 `pages.dev` 域名

[https://github.com/zhuima/awesome-cloudflarE](https://github.com/zhuima/awesome-cloudflarE)，這裏還有一份github上14kstar的cf利用指北，推薦各位也可以收藏起來哦


## 安裝本地工具

這幾個工具都從官網下：

- Node.js：[https://nodejs.org/](https://nodejs.org/)
- pnpm：[https://pnpm.io/installation](https://pnpm.io/installation)
- Git：[https://git-scm.com/downloads](https://git-scm.com/downloads)
- Obsidian：[https://obsidian.md/download](https://obsidian.md/download)

裝完以後，打開終端檢查：

```bash
node -v
git -v
pnpm -v
```

如果 `pnpm -v` 沒有結果，可以用 Corepack 開一下：

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Windows 用戶建議先用 PowerShell。macOS 和 Linux 用戶用系統自帶終端就行

## 新建 GitHub 倉庫

打開 GitHub，點 New repository。

倉庫名可以寫：

```text
my-blog
```

建好以後，把倉庫 clone 到本地：

```bash
git clone https://github.com/你的用户名/my-blog.git
cd my-blog
```

![[Pasted image 20260621115726.png]]

![[Pasted image 20260621115948.png]]

## 放入我的 Obsidian 博客模板

我這裏不是直接用 Mizuki 官方內容倉庫

官方內容倉庫可以看這個：

[https://github.com/matsuzaka-yuki/Mizuki-Content](https://github.com/matsuzaka-yuki/Mizuki-Content)

但我平時是用 Obsidian 寫文章，所以我整理了一個自己的模板。這個模板把寫作源放在 `articles/`，再由腳本同步到 Mizuki 需要的目錄

現在模板裏也保留了普通文章和隨筆兩種寫法。普通文章放在 `articles/posts/<slug>/<slug>.md`，會生成獨立頁面；比較短的記錄可以放在 `articles/essays/<slug>.md`，發佈後會彙總到隨筆頁裏。

模板倉庫：

[https://github.com/Amiyadesi/astro-mizuki-blog-from-zero](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

如果你直接使用這個模板，最後目錄應該像這樣：

```text
my-blog/
  articles/
    posts/
    friends/
    spec/
    site/
    assets/
  blog/
    package.json
    src/
    scripts/
  .github/
    workflows/
      deploy-cloudflare-pages.yml
```

這裏先記住一句話：

```text
articles/ 是你写东西的地方
blog/ 是网站程序本体
```

以後不要去 `blog/src/content/posts` 手寫文章。那個目錄是同步產物

## 用 Obsidian 打開 articles

打開 Obsidian，選擇：

```text
打开本地文件夹
```

然後選：

```text
my-blog/articles
```

![[Pasted image 20260620204835.png]]

這個目錄以後就是你的博客後臺

常用位置先記這幾個：

```text
articles/posts/             文章
articles/friends/           友链卡片
articles/spec/about.md      关于页
articles/spec/friends.md    友链页正文和申请说明
articles/site/profile.json  头像、昵称、简介、社交链接
articles/site/navigation.json 导航栏
articles/site/banner.json   首页 Banner 和文案
articles/assets/            头像、Banner、音乐、友链头像等素材
```

如果你嫌這些 JSON 不好改，可以直接在 Obsidian 搜索site-config-hub

這裏把關於頁、友鏈頁、站點 JSON、素材目錄都集中放好了，改起來會順手一點

## 本地插件啓動

安裝完成後，在 Obsidian 設置中打開第三方插件頁面並啓用模板自帶的插件

![[Pasted image 20260621211602.png]]

啓動第三方插件，勾選默認存在的這個
![[Pasted image 20260621200606.png]]

然後左側邊欄就多了兩個東西

 `本地预览博客` 按鈕和 `一键推送按钮`
![[Pasted image 20260621141446.png]]

`本地预览博客`底層會自動做這幾件事：

```text
同步 articles -> blog 内容
如果 blog 依赖还没装好，自动安装依赖
本地 build 博客
启动本地预览服务
```

所以第一次點本地預覽按鈕時，如果 `blog/node_modules` 還不存在，它會先在後臺補齊依賴，時間會久一點；後面再點就會快很多。

它看起來是一個按鈕，但背後還是在調用本機的 Node、pnpm、Git 這些工具。區別是正常使用時不用你自己進命令行處理安裝、同步、構建和推送。

啓動成功後，會自動給你跳轉到本地預覽地址，並且變成開啓態

```text
Blog: http://127.0.0.1:4173/
```

這個按鈕是開關：

```text
第一次点：启动预览并自动打开浏览器
第二次点：停止预览服务
```

另外一個就是點擊後自動提交和上傳了

## 寫第一篇文章

在post下面新建一個文件夾放一個文章需要的東西，然後再新建一個文章，插入模板
![[Pasted image 20260621202714.png]]
![[Pasted image 20260621202726.png]]
![[Pasted image 20260621203145.png]]

然後就可以愉快的開始編寫了，常見 Markdown 和部分 Obsidian 語法支持解析都支持解析哦！

默認模板裏 `draft: true` 是草稿。如果準備發佈，就改成 `draft: false`；如果這篇只是短記錄，不想單獨作爲一篇文章出現，可以把它作爲單個 Markdown 文件放進 `articles/essays/`。

如果想放兩張或幾張並排的照片，也不用手寫 HTML，可以這樣寫：

```md
:::photo-grid
![[left.png|左边照片说明]]
![[right.png|右边照片说明]]
:::
```

圖片下面的說明會取 `|` 後面的文字，普通 Markdown 圖片也支持相同佈局：

```md
![说明](photo.png)
```

電腦上會並排，手機上會自動變成一列。

還有一種黑塊提示，適合放答案、劇透或者不想一眼看到的內容：

```md
这里有一个 {{spoiler:被遮住的内容|鼠标移上去会看到提示}}。
```

發佈到博客後，鼠標移上去或者鍵盤選中時會顯示正文和提示；手機上點一下也能展開。
## 同步和構建

點擊圖片中的按鈕就好了，前提是你前面已經配置了github的secret，這一套模板是自帶action的
![[Pasted image 20260621203335.png]]

這個按鈕會把文章、配置和同步後的博客內容提交到 GitHub 並推送。推送成功後，不是你本機直接部署，而是 GitHub Actions 接着構建博客，再發布到 Cloudflare Pages。

而關於怎麼配置，就在下面！

## 創建 Cloudflare API Token

打開 Cloudflare 的 API Token 頁面：

[https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

創建一個 Token，權限這樣就夠了

![[Pasted image 20260621204437.png]]


你需要保存三樣東西：

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_PROJECT_NAME
```

`CLOUDFLARE_ACCOUNT_ID` 在 Workers & Pages的右下角能看到，上面的圖裏就有（笑）

`CLOUDFLARE_API_TOKEN` 只會完整顯示一次，複製後就趕快填寫到Github Secrets裏吧

`CLOUDFLARE_PROJECT_NAME`就是Action 會按這個名字自動創建 Pages 項目

## 配置 GitHub Secrets

回到 GitHub 倉庫頁面。

進入：

```text
Settings -> Secrets and variables -> Actions -> New repository secret
```

![[Pasted image 20260621205455.png]]
![[Pasted image 20260621205519.png]]

添加這三個：

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_PROJECT_NAME
```

名字和值對應

## 確認 GitHub Actions 工作流

模板裏已經有這個文件：

```text
.github/workflows/deploy-cloudflare-pages.yml
```

它做的事情大概是：

```text
拉取仓库
安装 Node 和 pnpm
进入 blog/
安装依赖
构建 Astro/Mizuki
用 Wrangler 把 dist 上传到 Cloudflare Pages
```
當然最好推薦在提交前，先啓動本地預覽看看吧

## 提交併發佈

推送後，打開 GitHub 倉庫的 Actions 頁面

如果看到綠色勾，說明部署成功

如果失敗，點進去看日誌。常見問題就幾個：

```text
Secrets 名字拼错
Cloudflare Token 权限不够
PROJECT_NAME 填错
blog/ 构建失败
pnpm-lock.yaml 和依赖不一致
```

## 打開 pages.dev

部署成功後，打開：

```text
https://你的项目名.pages.dev
```

能看到頁面，就說明第一篇結束

到這裏你已經有一個能寫、能預覽、能自動部署的博客

## 這一篇先停在這裏

下一篇講解一些域名，評論系統和其他的一些站長相關的互聯網上的小東西和服務還有對應的社區！
