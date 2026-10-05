# 博客站點配置入口

這裡的簡體中文文件是博客內容源。先改簡體，再翻譯；不要修改博客倉庫的生成文件。

| 本地源文件 | 構建時生成 | 線上位置 |
| --- | --- | --- |
| spec/about.md | src/content/spec/about.md | /about/ 關於頁正文 |
| spec/friends.md | src/content/spec/friends.md | /friends/ 友鏈說明 |
| site/profile.json | src/generated/obsidian-config.ts | 首頁頭像、暱稱、簡介、社交鏈接 |
| site/navigation.json | src/generated/obsidian-config.ts | 頂欄與“更多”菜單 |
| site/music.json | src/generated/obsidian-config.ts | 設置開啟後的音樂曲目和封面 |
| site/sponsor.md、site/sponsor.json | src/content/site/sponsor.md、src/generated/obsidian-config.ts | /sponsor/ 贊助正文與名單 |
| friends/*.md | src/generated/friends.ts | /friends/ 友鏈卡片 |
| posts/文章目錄/*.md | src/content/posts/文章目錄/index.md | /posts/文章固定地址/ |
| essays/*.md | src/content/essays/*.md | /essays/ 隨筆 |
| assets/profile、assets/about、assets/music | public/assets/對應目錄 | 頭像、二維碼、音樂與封面 |
| 文章目錄裡的圖片 | 優化後的 R2/CDN 圖片 | 文章正文圖片 |

導航 JSON 中，links 的頂層條目直接顯示在頂欄，children 中的條目顯示在下拉菜單。可以改名字、URL、順序；外部鏈接設 external: true。設置入口也在這份配置裡。

音樂的 cover 可以用 cover/文件名.webp，圖片放 assets/music/cover/；也可以直接填 HTTPS URL。url 可以用 url/文件名.mp3，文件放 assets/music/url/。網易雲和 YouTube 分別填 netease、youtube。音樂默認關閉，主動開啟並播放後，站內切頁繼續播放。

Lite 首頁沒有 Banner、公告欄和佈局切換。site/banner*.json、site/announcement*.json 不控制當前首頁；home/*.json 只控制 sayori.org 主站。

## 語言版本

- 簡體：原文件.md 或原文件.json。
- 英文：原文件.en.md 或原文件.en.json。
- 繁體：原文件.zh-hant.md 或原文件.zh-hant.json；頁面通用文字還會在構建後轉繁體。
- Markdown 用博客倉庫已有的 translate-content 命令。它會從簡體生成繁體，並翻譯英文；修改簡體後加 TRANSLATE_FORCE=1 更新英文。鏈接目標、圖片文件名、代碼和 Obsidian 塊 ID 保持不變。
- JSON 也以簡體結構為準；英文只翻譯可見文字，URL、曲目 ID、圖標名和鍵名不變。

以發佈 blog-style-change 為例，在 PowerShell 運行：

~~~powershell
Set-Location D:/Amiya/111Me/repos/sayori-blog
$env:CONTENT_DIR = 'D:/Amiya/111Me/servers/remote_server/articles'
$env:TRANSLATE_MATCH = 'posts/blog-style-change/'
$env:TRANSLATE_FORCE = '1'
pnpm run translate-content
Remove-Item Env:CONTENT_DIR, Env:TRANSLATE_MATCH, Env:TRANSLATE_FORCE
~~~

## 發佈鏈路

本地 articles → D:/Amiya/111Me/repos/sayori-articles → GitHub Actions → blog.sayori.org。

線上讀的是內容倉庫 main 分支，不會自動讀取尚未發佈的本地修改。Obsidian 的發佈按鈕調用 scripts/deploy-blog-from-obsidian.ps1，默認發佈公開允許目錄。只發布某篇或某項配置時，使用 -Paths 指定它的目錄或文件，避免帶上其他尚未準備好的內容：

~~~powershell
& D:/Amiya/111Me/servers/remote_server/scripts/deploy-blog-from-obsidian.ps1 -Paths 'posts/blog-style-change','spec/about.md','spec/about.en.md','spec/about.zh-hant.md' -CommitChanges -PushChanges
~~~

預覽用 Obsidian 左側“啟動博客預覽”，再點一次停止。發佈結束可到 GitHub 的 sayori-blog Actions 查看結果。
