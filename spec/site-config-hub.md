# 博客站点配置入口

这里的简体中文文件是博客内容源。先改简体，再翻译；不要修改博客仓库的生成文件。

| 本地源文件 | 构建时生成 | 线上位置 |
| --- | --- | --- |
| spec/about.md | src/content/spec/about.md | /about/ 关于页正文 |
| spec/friends.md | src/content/spec/friends.md | /friends/ 友链说明 |
| site/profile.json | src/generated/obsidian-config.ts | 首页头像、昵称、简介、社交链接 |
| site/navigation.json | src/generated/obsidian-config.ts | 顶栏与“更多”菜单 |
| site/music.json | src/generated/obsidian-config.ts | 设置开启后的音乐曲目和封面 |
| site/sponsor.md、site/sponsor.json | src/content/site/sponsor.md、src/generated/obsidian-config.ts | /sponsor/ 赞助正文与名单 |
| friends/*.md | src/generated/friends.ts | /friends/ 友链卡片 |
| posts/文章目录/*.md | src/content/posts/文章目录/index.md | /posts/文章固定地址/ |
| essays/*.md | src/content/essays/*.md | /essays/ 随笔 |
| assets/profile、assets/about、assets/music | public/assets/对应目录 | 头像、二维码、音乐与封面 |
| 文章目录里的图片 | 优化后的 R2/CDN 图片 | 文章正文图片 |

导航 JSON 中，links 的顶层条目直接显示在顶栏，children 中的条目显示在下拉菜单。可以改名字、URL、顺序；外部链接设 external: true。设置入口也在这份配置里。

音乐的 cover 可以用 cover/文件名.webp，图片放 assets/music/cover/；也可以直接填 HTTPS URL。url 可以用 url/文件名.mp3，文件放 assets/music/url/。网易云和 YouTube 分别填 netease、youtube。音乐默认关闭，主动开启并播放后，站内切页继续播放。

Lite 首页没有 Banner、公告栏和布局切换。site/banner*.json、site/announcement*.json 不控制当前首页；home/*.json 只控制 sayori.org 主站。

## 语言版本

- 简体：原文件.md 或原文件.json。
- 英文：原文件.en.md 或原文件.en.json。
- 繁体：原文件.zh-hant.md 或原文件.zh-hant.json；页面通用文字还会在构建后转繁体。
- Markdown 用博客仓库已有的 translate-content 命令。它会从简体生成繁体，并翻译英文；修改简体后加 TRANSLATE_FORCE=1 更新英文。链接目标、图片文件名、代码和 Obsidian 块 ID 保持不变。
- JSON 也以简体结构为准；英文只翻译可见文字，URL、曲目 ID、图标名和键名不变。

以发布 blog-style-change 为例，在 PowerShell 运行：

~~~powershell
Set-Location D:/Amiya/111Me/repos/sayori-blog
$env:CONTENT_DIR = 'D:/Amiya/111Me/servers/remote_server/articles'
$env:TRANSLATE_MATCH = 'posts/blog-style-change/'
$env:TRANSLATE_FORCE = '1'
pnpm run translate-content
Remove-Item Env:CONTENT_DIR, Env:TRANSLATE_MATCH, Env:TRANSLATE_FORCE
~~~

## 发布链路

本地 articles → D:/Amiya/111Me/repos/sayori-articles → GitHub Actions → blog.sayori.org。

线上读的是内容仓库 main 分支，不会自动读取尚未发布的本地修改。Obsidian 的发布按钮调用 scripts/deploy-blog-from-obsidian.ps1，默认发布公开允许目录。只发布某篇或某项配置时，使用 -Paths 指定它的目录或文件，避免带上其他尚未准备好的内容：

~~~powershell
& D:/Amiya/111Me/servers/remote_server/scripts/deploy-blog-from-obsidian.ps1 -Paths 'posts/blog-style-change','spec/about.md','spec/about.en.md','spec/about.zh-hant.md' -CommitChanges -PushChanges
~~~

预览用 Obsidian 左侧“启动博客预览”，再点一次停止。发布结束可到 GitHub 的 sayori-blog Actions 查看结果。
