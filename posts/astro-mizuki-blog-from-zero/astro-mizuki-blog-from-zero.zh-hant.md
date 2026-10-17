---
title: "從零搭一個簡潔博客：GitHub、Cloudflare Pages 和可選的 Obsidian"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "使用 Sayori Lite 完整模板，通過 Cloudflare Pages 連接 GitHub 搭建簡潔博客。按文件夾寫 Markdown 即可發佈，Obsidian 和 Token 發佈均為可選"
image: ""
tags:
  - 實操教程
  - 建站與Cloudflare
  - Astro
  - Obsidian
category: 教程教學
draft: false
alias: ""
lang: zh-Hant
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# 從零搭一個簡潔博客：GitHub、Cloudflare Pages 和可選的 Obsidian

這篇教程終於也該收拾一下了。之前的版本圍繞 Mizuki、Obsidian 和一套本地同步腳本來寫，後來我的博客已經改成了現在的簡潔樣子，教程卻還停在原地。照著舊步驟做，需要補主題、改目錄，還得處理插件和部署配置，實在不適合作為第一篇建站教程

所以這次我把它整理成了一個可以直接使用的完整模板，叫 **Sayori Lite · 我的書桌**。保留現在博客的暖紙色、橄欖綠鏈接和少量珊瑚色，首頁直接列文章，正文留出舒服的閱讀空間

這次先把網站搭起來，再考慮自己喜歡用什麼工具寫。只用 GitHub 網頁也能發佈；Obsidian 是我推薦的寫作方式，但不是必裝的東西

> 本文按 2026 年 10 月 16 日的模板和官方文檔重寫。舊文章地址與模板倉庫地址保留，舊版截圖和 PowerShell 插件步驟不再適用

## 先準備兩個賬號

需要 [GitHub](https://github.com/signup) 和 [Cloudflare](https://dash.cloudflare.com/sign-up)。GitHub 存放網站程序和文章，Cloudflare Pages 負責構建、託管網站，並提供一個 `pages.dev` 地址。初步站點不需要先買域名，你也可以嘗試用免費的二級域名[[free-domain-and-web-community|免費域名和站長社區]]

默認路線是：

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**這條路線不用 Cloudflare API Token。** 寫文章並不需要額外配置發佈密鑰；只有想改成 GitHub Actions 上傳時，才需要後文的 Token

## 用模板創建自己的倉庫

模板仍然在這個地址，名字暫時沒有改，舊鏈接也能繼續用：

[Sayori Lite 模板倉庫](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

打開後點擊 **Use this template → Create a new repository**，Owner 選擇自己的賬號，倉庫名例如 `my-blog`

這次倉庫已經包含完整的 Astro 網站，大致目錄如下：

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

`articles/` 是寫作目錄，`src/` 是網站程序，文章直接參與構建

## 讓 Cloudflare 連接 GitHub

進入 Cloudflare 的 **Workers & Pages**，創建應用，選擇 **Pages**，再選擇導入現有 Git 倉庫。授權 Cloudflare 訪問自己剛創建的倉庫，只授權這一個



構建設置填這些：

| 設置 | 填寫內容 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | 留空，使用倉庫根目錄 |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| 環境變量 `NODE_VERSION` | `22` |
| 環境變量 `PNPM_VERSION` | `11.0.8` |
| 環境變量 `SITE_URL` | `https://你的项目名.pages.dev` |

項目名會決定最初的 `pages.dev` 地址。保存並部署，等構建完成後打開 Cloudflare 顯示的網址

Pages 會按鎖文件安裝依賴。如果環境沒有正確提供 pnpm，模板 README 還給了包含固定版本 pnpm 安裝步驟的備用構建命令，先看日誌再改，不需要換一整個部署方案

`SITE_URL` 要填站點正式地址，因為 RSS、站點地圖和 canonical 都會用它。以後綁定自己的域名，要把這裡一起改掉再重新部署；不要填 GitHub 倉庫地址或後臺地址

## 改成自己的書桌

在 GitHub 打開 `site.config.mjs`，點編輯，把站名、作者和簡介換成自己的。頭像文件放在 `public/`，配置裡寫對應的站內路徑

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

已經設置了 Cloudflare 的 `SITE_URL` 時，配置裡的 `url` 可以留空，環境變量優先

關於頁改 `articles/spec/about.md`，友鏈頁改 `articles/spec/friends.md`，友鏈直接寫 Markdown 鏈接和介紹就好

模板有歸檔、文章目錄、圖片放大、深淺主題、Pagefind 搜索、RSS 和站點地圖，正文使用系統字體

## 不裝本地工具，也能發第一篇

在 GitHub 倉庫點 **Add file → Create new file**，文件名輸入：

```text
articles/posts/my-first-post/index.md
```

斜槓會幫你創建目錄。正文可以先用下面這份：

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

日期按自己實際寫作的時間改。寫完點 **Commit changes**，提交到 `main`。Cloudflare 檢測到提交後會自動構建，成功後就能在首頁看見文章

這裡的規則很簡單：每篇文章一個文件夾，名字用小寫英文、數字和連字符，正文統一叫 `index.md`。`my-first-post` 決定公開地址 `/posts/my-first-post/`；以後改標題不會改地址，改文件夾名則會

`draft: true` 是草稿，只有改成 `false` 才會生成頁面。發佈日期在未來的文章也會暫時排除，到了日期還需要再觸發一次構建，模板沒有附帶定時發佈服務

`private: true` 在我自己的 Obsidian 發佈流程裡會跳過公開同步，讓文章只保留在本地；這份獨立模板目前只用 `draft` 控制頁面發佈

## 推薦用 Obsidian

如果你平時就喜歡 Markdown，編輯器隨便選，不過站長是用Obsidian來寫的，所以對於Obsidian的適配工作流肯定會更好，想用 Obsidian 的話，可以這樣做：

0. 下載[obsidian](https://obsidian.md/download)
1. 安裝 Git，把自己新建的倉庫克隆到本地
2. 在 Obsidian 選擇“打開文件夾作為倉庫”，打開整個 `my-blog` 根目錄，不要只打開 `articles/`
3. 模板已經準備好核心 Templates 設置，模板目錄是 `articles/templates`
4. 在 `articles/posts/文章名/` 創建 `index.md`，運行“插入模板”，選擇 `blog-post`
5. 寫好後改標題、日期和 `draft`，提交併推送到 GitHub

倉庫根目錄作為 Obsidian 倉庫，是為了讓 Git 插件直接找到同一層的 Git 倉庫。附件默認放在當前文章旁邊；文件叫 `index.md` 沒關係，文章標題由屬性裡的 `title` 決定

想在 Obsidian 裡提交，可以從社區插件市場安裝作者為 **Vinzent** 的 **Git** 插件，插件 ID 是 `obsidian-git`

關於登錄，我更建議複用系統 Git 的認證。Windows 安裝 Git for Windows 時啟用 Git Credential Manager，第一次在倉庫目錄執行 `git push`，按瀏覽器提示登錄自己的 GitHub。完成後，桌面版 Obsidian Git 就可以使用系統 Git 已有的憑據

## 想在本地看效果

網頁編輯可以先用起來。需要實時預覽時，再安裝 Node.js 22.12 以上版本，然後在自己的倉庫根目錄運行：

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

打開終端顯示的地址，默認是 `http://localhost:4321`。改 Markdown 後會自動刷新

搜索索引在構建時生成，想檢查搜索就運行：

```powershell
pnpm run build
pnpm preview
```

這次打開預覽命令顯示的地址。普通寫作時不用每改一段就完整構建一次

## 可選：用 Token 交給 GitHub Actions 發佈

如果你希望在 GitHub 的檢查全部通過後才上傳網站，可以選擇這條路線。默認 Git 集成已經夠用，不需要為了寫文章再配一次

先準備一個已經存在的 Pages 項目。原來連接 GitHub 的項目，要在 Cloudflare 的 Build 和 Branch control 中關閉生產、預覽分支自動部署，避免同一次提交發布兩遍

創建 Cloudflare 自定義 API Token，權限只選目標賬戶的 **Account → Cloudflare Pages → Edit**

然後進入 GitHub 倉庫的 **Settings → Secrets and variables → Actions**，填寫：

| 類型 | 名稱 | 內容 |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | 剛創建的 Pages Token |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 賬戶 ID |
| Variable | `CLOUDFLARE_PROJECT_NAME` | 已存在的 Pages 項目名 |
| Variable | `SITE_URL` | 正式站點完整地址 |
| Variable | `CF_PAGES_DEPLOY` | `true` |

模板裡的 `.github/workflows/deploy-cloudflare-pages.yml` 默認只檢查。只有設置了 `CF_PAGES_DEPLOY`，才會把通過檢查的同一份構建產物上傳到指定項目

以後仍然是在文章文件夾裡寫 Markdown、提交到 `main`，區別只是最後由 Actions 上傳。Token 放在 GitHub Secrets

## 以後想改哪裡

| 想改的東西 | 文件位置 |
| --- | --- |
| 站名、作者、簡介、便箋 | `site.config.mjs` |
| 文章、圖片 | `articles/posts/文章名/` |
| 關於頁、友鏈頁 | `articles/spec/` |
| 新文章模板 | `articles/templates/blog-post.md` |
| 頭像、瀏覽器圖標 | `public/` |
| 配色、字號和間距 | `src/styles/global.css` |
| 導航、頁腳 | `src/layouts/Base.astro` |

這份模板默認是一個簡中文章站，不要求每篇文章同時提供三種語言。它和我自己博客的三語發佈系統是獨立的，先把寫作和發佈做簡單。以後有明確需要，再一點點加上評論或其他功能就好

我還是覺得，博客最重要的裡面的內容，所以現在的我就選擇了這個簡潔的模板，寫出更多更好的內容

## 繼續讀

站點上線後，先配一個 [[free-domain-and-web-community|免費域名]]；想了解 DNS、圖片存儲和服務入口，接著看 [[cloudflare-free-tier-developer-guide|Cloudflare 免費層]]；想在手機和電腦間同步寫作，看看 [[fast-note-sync-on-student-server|Fast Note Sync]]

這套簡潔風格的取捨放在 [[blog-style-change|博客改版記錄]]，站點上線後想檢查抓取和頁面信息，可以接著看 [[geoscore-2-4-guide|GeoScore 網站體檢]]
