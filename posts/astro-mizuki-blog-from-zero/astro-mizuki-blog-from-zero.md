---
title: "从零搭一个简洁博客：GitHub、Cloudflare Pages 和可选的 Obsidian"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "使用 Sayori Lite 完整模板，通过 Cloudflare Pages 连接 GitHub 搭建简洁博客。按文件夹写 Markdown 即可发布，Obsidian 和 Token 发布均为可选"
image: ""
tags:
  - 实操教程
  - 建站与Cloudflare
  - Astro
  - Obsidian
category: 教程教学
draft: false
alias: ""
lang: zh-Hans
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# 从零搭一个简洁博客：GitHub、Cloudflare Pages 和可选的 Obsidian

这篇教程终于也该收拾一下了。之前的版本围绕 Mizuki、Obsidian 和一套本地同步脚本来写，后来我的博客已经改成了现在的简洁样子，教程却还停在原地。照着旧步骤做，需要补主题、改目录，还得处理插件和部署配置，实在不适合作为第一篇建站教程

所以这次我把它整理成了一个可以直接使用的完整模板，叫 **Sayori Lite · 我的书桌**。保留现在博客的暖纸色、橄榄绿链接和少量珊瑚色，首页直接列文章，正文留出舒服的阅读空间

这次先把网站搭起来，再考虑自己喜欢用什么工具写。只用 GitHub 网页也能发布；Obsidian 是我推荐的写作方式，但不是必装的东西

> 本文按 2026 年 10 月 16 日的模板和官方文档重写。旧文章地址与模板仓库地址保留，旧版截图和 PowerShell 插件步骤不再适用

## 先准备两个账号

需要 [GitHub](https://github.com/signup) 和 [Cloudflare](https://dash.cloudflare.com/sign-up)。GitHub 存放网站程序和文章，Cloudflare Pages 负责构建、托管网站，并提供一个 `pages.dev` 地址。初步站点不需要先买域名，你也可以尝试用免费的二级域名[[free-domain-and-web-community|免费域名和站长社区]]

默认路线是：

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**这条路线不用 Cloudflare API Token。** 写文章并不需要额外配置发布密钥；只有想改成 GitHub Actions 上传时，才需要后文的 Token

## 用模板创建自己的仓库

模板仍然在这个地址，名字暂时没有改，旧链接也能继续用：

[Sayori Lite 模板仓库](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

打开后点击 **Use this template → Create a new repository**，Owner 选择自己的账号，仓库名例如 `my-blog`

这次仓库已经包含完整的 Astro 网站，大致目录如下：

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

`articles/` 是写作目录，`src/` 是网站程序，文章直接参与构建

## 让 Cloudflare 连接 GitHub

进入 Cloudflare 的 **Workers & Pages**，创建应用，选择 **Pages**，再选择导入现有 Git 仓库。授权 Cloudflare 访问自己刚创建的仓库，只授权这一个



构建设置填这些：

| 设置 | 填写内容 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | 留空，使用仓库根目录 |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| 环境变量 `NODE_VERSION` | `22` |
| 环境变量 `PNPM_VERSION` | `11.0.8` |
| 环境变量 `SITE_URL` | `https://你的项目名.pages.dev` |

项目名会决定最初的 `pages.dev` 地址。保存并部署，等构建完成后打开 Cloudflare 显示的网址

Pages 会按锁文件安装依赖。如果环境没有正确提供 pnpm，模板 README 还给了包含固定版本 pnpm 安装步骤的备用构建命令，先看日志再改，不需要换一整个部署方案

`SITE_URL` 要填站点正式地址，因为 RSS、站点地图和 canonical 都会用它。以后绑定自己的域名，要把这里一起改掉再重新部署；不要填 GitHub 仓库地址或后台地址

## 改成自己的书桌

在 GitHub 打开 `site.config.mjs`，点编辑，把站名、作者和简介换成自己的。头像文件放在 `public/`，配置里写对应的站内路径

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

已经设置了 Cloudflare 的 `SITE_URL` 时，配置里的 `url` 可以留空，环境变量优先

关于页改 `articles/spec/about.md`，友链页改 `articles/spec/friends.md`，友链直接写 Markdown 链接和介绍就好

模板有归档、文章目录、图片放大、深浅主题、Pagefind 搜索、RSS 和站点地图，正文使用系统字体

## 不装本地工具，也能发第一篇

在 GitHub 仓库点 **Add file → Create new file**，文件名输入：

```text
articles/posts/my-first-post/index.md
```

斜杠会帮你创建目录。正文可以先用下面这份：

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

日期按自己实际写作的时间改。写完点 **Commit changes**，提交到 `main`。Cloudflare 检测到提交后会自动构建，成功后就能在首页看见文章

这里的规则很简单：每篇文章一个文件夹，名字用小写英文、数字和连字符，正文统一叫 `index.md`。`my-first-post` 决定公开地址 `/posts/my-first-post/`；以后改标题不会改地址，改文件夹名则会

`draft: true` 是草稿，只有改成 `false` 才会生成页面。发布日期在未来的文章也会暂时排除，到了日期还需要再触发一次构建，模板没有附带定时发布服务

`private: true` 在我自己的 Obsidian 发布流程里会跳过公开同步，让文章只保留在本地；这份独立模板目前只用 `draft` 控制页面发布

## 推荐用 Obsidian

如果你平时就喜欢 Markdown，编辑器随便选，不过站长是用Obsidian来写的，所以对于Obsidian的适配工作流肯定会更好，想用 Obsidian 的话，可以这样做：

0. 下载[obsidian](https://obsidian.md/download)
1. 安装 Git，把自己新建的仓库克隆到本地
2. 在 Obsidian 选择“打开文件夹作为仓库”，打开整个 `my-blog` 根目录，不要只打开 `articles/`
3. 模板已经准备好核心 Templates 设置，模板目录是 `articles/templates`
4. 在 `articles/posts/文章名/` 创建 `index.md`，运行“插入模板”，选择 `blog-post`
5. 写好后改标题、日期和 `draft`，提交并推送到 GitHub

仓库根目录作为 Obsidian 仓库，是为了让 Git 插件直接找到同一层的 Git 仓库。附件默认放在当前文章旁边；文件叫 `index.md` 没关系，文章标题由属性里的 `title` 决定

想在 Obsidian 里提交，可以从社区插件市场安装作者为 **Vinzent** 的 **Git** 插件，插件 ID 是 `obsidian-git`

关于登录，我更建议复用系统 Git 的认证。Windows 安装 Git for Windows 时启用 Git Credential Manager，第一次在仓库目录执行 `git push`，按浏览器提示登录自己的 GitHub。完成后，桌面版 Obsidian Git 就可以使用系统 Git 已有的凭据

## 想在本地看效果

网页编辑可以先用起来。需要实时预览时，再安装 Node.js 22.12 以上版本，然后在自己的仓库根目录运行：

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的地址，默认是 `http://localhost:4321`。改 Markdown 后会自动刷新

搜索索引在构建时生成，想检查搜索就运行：

```powershell
pnpm run build
pnpm preview
```

这次打开预览命令显示的地址。普通写作时不用每改一段就完整构建一次

## 可选：用 Token 交给 GitHub Actions 发布

如果你希望在 GitHub 的检查全部通过后才上传网站，可以选择这条路线。默认 Git 集成已经够用，不需要为了写文章再配一次

先准备一个已经存在的 Pages 项目。原来连接 GitHub 的项目，要在 Cloudflare 的 Build 和 Branch control 中关闭生产、预览分支自动部署，避免同一次提交发布两遍

创建 Cloudflare 自定义 API Token，权限只选目标账户的 **Account → Cloudflare Pages → Edit**

然后进入 GitHub 仓库的 **Settings → Secrets and variables → Actions**，填写：

| 类型 | 名称 | 内容 |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | 刚创建的 Pages Token |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |
| Variable | `CLOUDFLARE_PROJECT_NAME` | 已存在的 Pages 项目名 |
| Variable | `SITE_URL` | 正式站点完整地址 |
| Variable | `CF_PAGES_DEPLOY` | `true` |

模板里的 `.github/workflows/deploy-cloudflare-pages.yml` 默认只检查。只有设置了 `CF_PAGES_DEPLOY`，才会把通过检查的同一份构建产物上传到指定项目

以后仍然是在文章文件夹里写 Markdown、提交到 `main`，区别只是最后由 Actions 上传。Token 放在 GitHub Secrets

## 以后想改哪里

| 想改的东西 | 文件位置 |
| --- | --- |
| 站名、作者、简介、便笺 | `site.config.mjs` |
| 文章、图片 | `articles/posts/文章名/` |
| 关于页、友链页 | `articles/spec/` |
| 新文章模板 | `articles/templates/blog-post.md` |
| 头像、浏览器图标 | `public/` |
| 配色、字号和间距 | `src/styles/global.css` |
| 导航、页脚 | `src/layouts/Base.astro` |

这份模板默认是一个简中文章站，不要求每篇文章同时提供三种语言。它和我自己博客的三语发布系统是独立的，先把写作和发布做简单。以后有明确需要，再一点点加上评论或其他功能就好

我还是觉得，博客最重要的里面的内容，所以现在的我就选择了这个简洁的模板，写出更多更好的内容

## 继续读

站点上线后，先配一个 [[free-domain-and-web-community|免费域名]]；想了解 DNS、图片存储和服务入口，接着看 [[cloudflare-free-tier-developer-guide|Cloudflare 免费层]]；想在手机和电脑间同步写作，看看 [[fast-note-sync-on-student-server|Fast Note Sync]]

这套简洁风格的取舍放在 [[blog-style-change|博客改版记录]]，站点上线后想检查抓取和页面信息，可以接着看 [[geoscore-2-4-guide|GeoScore 网站体检]]
