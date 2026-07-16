---
title: 从零搭一个自己的博客：GitHub、Cloudflare Pages、Mizuki 和 Obsidian
published: 2026-06-19
created: 2026-06-19
updated: 2026-06-24
lastEdited: 2026-06-24
updateCount: 4
description: 从注册 GitHub 和 Cloudflare 开始，用我的 Obsidian 博客模板写文章，再用 GitHub Actions 发布到 Cloudflare Pages。
image: ""
tags:
  - Astro
  - Cloudflare
  - Obsidian
category: 建站与自托管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "从 GitHub 和 Cloudflare Pages 开始搭建博客"
    - "用 Mizuki 模板和 Obsidian 管理文章源文件"
    - "通过 GitHub Actions 自动构建和发布"
alias: ""

---

# 从零搭一个自己的博客：GitHub、Cloudflare Pages、Mizuki 和 Obsidian

> [!NOTE]
> 现在是 AI 时代，Node.js、Git、pnpm 这些环境如果装不明白，完全可以让AI帮你装好，下载一个opencode或者trae的免费AI就能实现了，以及包括拉取github仓库和配置之类的，不过呢，这样的话就没有意思了，虽然站长本人也是这么做的，但是既然自己要出教程的话，还是出一个能手操的吧
> 
> 说个有意思的，站长在写这个的时候，才知道原来要安装pnpm，之前都是直接让codex帮我部署好了说是，不过这也挺好的，通过写文章什么的，深入的了解AI帮我搞出来的东西啊！



做完以后，你会有：

```text
GitHub 仓库
Cloudflare Pages 项目
Obsidian 写作目录
Astro/Mizuki 博客
GitHub Actions 自动部署
```

最后打开的地址大概长这样：

```text
https://你的项目名.pages.dev
```

![[Pasted image 20260620202027.png]]

## 先注册Github和Cloudflare

如果你没有这两个账号，那么还是最好注册了好，github和cloudflare，可都是两个著名的赛博大善人啊！而且github的账号一般你注册的越早越好，能享受很多福利呢！

先注册 GitHub：

[Sign up for GitHub · GitHub](https://github.com/signup?return_to=%2F&source=login)

GitHub 用来放博客仓库，还可以用Action来实现提交后自动上传的工作流

如果注册不了，可以尝试切换节点，切换无痕浏览器，以及切换手机注册，就比如站长最后就是在手机上注册的QAQ~~*前面就是我的步奏了哈哈

再注册 Cloudflare：

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

这个注册就比较方便了，站长拿随便注册的outlook邮箱都可以注册，当真是cf大善人

Cloudflare Pages 用来托管博客。它会把构建好的静态文件放到 Cloudflare 的网络上，然后给你一个 `pages.dev` 域名

[https://github.com/zhuima/awesome-cloudflarE](https://github.com/zhuima/awesome-cloudflarE)，这里还有一份github上14kstar的cf利用指北，推荐各位也可以收藏起来哦


## 安装本地工具

这几个工具都从官网下：

- Node.js：[https://nodejs.org/](https://nodejs.org/)
- pnpm：[https://pnpm.io/installation](https://pnpm.io/installation)
- Git：[https://git-scm.com/downloads](https://git-scm.com/downloads)
- Obsidian：[https://obsidian.md/download](https://obsidian.md/download)

装完以后，打开终端检查：

```bash
node -v
git -v
pnpm -v
```

如果 `pnpm -v` 没有结果，可以用 Corepack 开一下：

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Windows 用户建议先用 PowerShell。macOS 和 Linux 用户用系统自带终端就行

## 新建 GitHub 仓库

打开 GitHub，点 New repository。

仓库名可以写：

```text
my-blog
```

建好以后，把仓库 clone 到本地：

```bash
git clone https://github.com/你的用户名/my-blog.git
cd my-blog
```

![[Pasted image 20260621115726.png]]

![[Pasted image 20260621115948.png]]

## 放入我的 Obsidian 博客模板

我这里不是直接用 Mizuki 官方内容仓库

官方内容仓库可以看这个：

[https://github.com/matsuzaka-yuki/Mizuki-Content](https://github.com/matsuzaka-yuki/Mizuki-Content)

但我平时是用 Obsidian 写文章，所以我整理了一个自己的模板。这个模板把写作源放在 `articles/`，再由脚本同步到 Mizuki 需要的目录

现在模板里也保留了普通文章和随笔两种写法。普通文章放在 `articles/posts/<slug>/<slug>.md`，会生成独立页面；比较短的记录可以放在 `articles/essays/<slug>.md`，发布后会汇总到随笔页里。

模板仓库：

[https://github.com/Amiyadesi/astro-mizuki-blog-from-zero](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

如果你直接使用这个模板，最后目录应该像这样：

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

这里先记住一句话：

```text
articles/ 是你写东西的地方
blog/ 是网站程序本体
```

以后不要去 `blog/src/content/posts` 手写文章。那个目录是同步产物

## 用 Obsidian 打开 articles

打开 Obsidian，选择：

```text
打开本地文件夹
```

然后选：

```text
my-blog/articles
```

![[Pasted image 20260620204835.png]]

这个目录以后就是你的博客后台

常用位置先记这几个：

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

如果你嫌这些 JSON 不好改，可以直接在 Obsidian 搜索site-config-hub

这里把关于页、友链页、站点 JSON、素材目录都集中放好了，改起来会顺手一点

## 本地插件启动

装完以后，在obsidian设置里面打开

![[Pasted image 20260621211602.png]]

启动第三方插件，勾选默认存在的这个
![[Pasted image 20260621200606.png]]

然后左侧边栏就多了两个东西

 `本地预览博客` 按钮和 `一键推送按钮`
![[Pasted image 20260621141446.png]]

`本地预览博客`底层会自动做这几件事：

```text
同步 articles -> blog 内容
如果 blog 依赖还没装好，自动安装依赖
本地 build 博客
启动本地预览服务
```

所以第一次点本地预览按钮时，如果 `blog/node_modules` 还不存在，它会先在后台补齐依赖，时间会久一点；后面再点就会快很多。

它看起来是一个按钮，但背后还是在调用本机的 Node、pnpm、Git 这些工具。区别是正常使用时不用你自己进命令行处理安装、同步、构建和推送。

启动成功后，会自动给你跳转到本地预览地址，并且变成开启态

```text
Blog: http://127.0.0.1:4173/
```

这个按钮是开关：

```text
第一次点：启动预览并自动打开浏览器
第二次点：停止预览服务
```

另外一个就是点击后自动提交和上传了

## 写第一篇文章

在post下面新建一个文件夹放一个文章需要的东西，然后再新建一个文章，插入模板
![[Pasted image 20260621202714.png]]
![[Pasted image 20260621202726.png]]
![[Pasted image 20260621203145.png]]

然后就可以愉快的开始编写了，常见 Markdown 和部分 Obsidian 语法支持解析都支持解析哦！

默认模板里 `draft: true` 是草稿。如果准备发布，就改成 `draft: false`；如果这篇只是短记录，不想单独作为一篇文章出现，可以把它作为单个 Markdown 文件放进 `articles/essays/`。

如果想放两张或几张并排的照片，也不用手写 HTML，可以这样写：

```md
:::photo-grid
![[left.png|左边照片说明]]
![[right.png|右边照片说明]]
:::
```

图片下面的说明会取 `|` 后面的文字，普通 Markdown 图片也可以写成 `![说明](photo.png)`。电脑上会并排，手机上会自动变成一列。

还有一种黑块提示，适合放答案、剧透或者不想一眼看到的内容：

```md
这里有一个 {{spoiler:被遮住的内容|鼠标移上去会看到提示}}。
```

发布到博客后，鼠标移上去或者键盘选中时会显示正文和提示；手机上点一下也能展开。
## 同步和构建

点击图片中的按钮就好了，前提是你前面已经配置了github的secret，这一套模板是自带action的
![[Pasted image 20260621203335.png]]

这个按钮会把文章、配置和同步后的博客内容提交到 GitHub 并推送。推送成功后，不是你本机直接部署，而是 GitHub Actions 接着构建博客，再发布到 Cloudflare Pages。

而关于怎么配置，就在下面！

## 创建 Cloudflare API Token

打开 Cloudflare 的 API Token 页面：

[https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

创建一个 Token，权限这样就够了

![[Pasted image 20260621204437.png]]


你需要保存三样东西：

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_PROJECT_NAME
```

`CLOUDFLARE_ACCOUNT_ID` 在 Workers & Pages的右下角能看到，上面的图里就有（笑）

`CLOUDFLARE_API_TOKEN` 只会完整显示一次，复制后就赶快填写到Github Secrets里吧

`CLOUDFLARE_PROJECT_NAME`就是Action 会按这个名字自动创建 Pages 项目

## 配置 GitHub Secrets

回到 GitHub 仓库页面。

进入：

```text
Settings -> Secrets and variables -> Actions -> New repository secret
```

![[Pasted image 20260621205455.png]]
![[Pasted image 20260621205519.png]]

添加这三个：

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_PROJECT_NAME
```

名字和值对应

## 确认 GitHub Actions 工作流

模板里已经有这个文件：

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
当然最好推荐在提交前，先启动本地预览看看吧

## 提交并发布

推送后，打开 GitHub 仓库的 Actions 页面

如果看到绿色勾，说明部署成功

如果失败，点进去看日志。常见问题就几个：

```text
Secrets 名字拼错
Cloudflare Token 权限不够
PROJECT_NAME 填错
blog/ 构建失败
pnpm-lock.yaml 和依赖不一致
```

## 打开 pages.dev

部署成功后，打开：

```text
https://你的项目名.pages.dev
```

能看到页面，就说明第一篇结束

到这里你已经有一个能写、能预览、能自动部署的博客

## 这一篇先停在这里

下一篇讲解一些域名，评论系统和其他的一些站长相关的互联网上的小东西和服务还有对应的社区！
