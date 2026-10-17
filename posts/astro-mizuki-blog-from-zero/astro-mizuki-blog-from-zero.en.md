---
title: "Build a Simple Blog from Scratch: GitHub, Cloudflare Pages, and Optional Obsidian"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "Deploy the complete Sayori Lite template through Cloudflare Pages and GitHub. Publish folder-based Markdown articles, with optional Obsidian and token-based Actions deployment."
image: ""
tags:
  - Tutorial
  - Website & Cloudflare
  - Astro
  - Obsidian
category: Tutorials & Guides
draft: false
alias: ""
lang: en
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# Build a Simple Blog from Scratch: GitHub, Cloudflare Pages, and Optional Obsidian

This tutorial needed a cleanup of its own. The old version revolved around Mizuki, Obsidian, and a local sync script. My blog has since moved to a much simpler layout, while the instructions stayed behind. Following them meant finding another theme, moving files around, and configuring a plugin before you could publish anything.

I have now turned the starter into a complete, deployable template called **Sayori Lite · My Desk**. It follows the current blog's warm paper background, olive links, and small coral accents. The home page lists articles; the article page leaves room to read.

The idea is to get a site online first, then choose how you want to write. GitHub's web editor is enough. I recommend Obsidian, but it is optional.

> Rewritten against the template and official documentation on October 16, 2026. The article and repository URLs stay the same. The old screenshots and PowerShell plugin instructions no longer apply.

## Start with two accounts

You need [GitHub](https://github.com/signup) and [Cloudflare](https://dash.cloudflare.com/sign-up). GitHub stores the website and articles. Cloudflare Pages builds and hosts the site and provides a `pages.dev` address. You can start without buying a domain, or try a [[free-domain-and-web-community|free subdomain and webmaster communities]].

The default workflow is:

```text
Create your own repository from the template
    ↓
Connect that repository to Cloudflare Pages
    ↓
Write Markdown and commit to main
    ↓
Cloudflare builds and updates the site
```

**This route needs no Cloudflare API Token.** A token is only needed if you choose the optional GitHub Actions upload workflow later in this article.

## Create your repository from the template

The template keeps its original repository address so existing links continue to work:

[Sayori Lite template repository](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

Click **Use this template → Create a new repository**, choose your own account as Owner, and name the repository something like `my-blog`.

The repository now contains the complete Astro website. Its main folders look like this:

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

Write in `articles/`. The website code lives in `src/`. Articles are read directly during the build.

## Connect Cloudflare to GitHub

In Cloudflare, open **Workers & Pages**, create an application, choose **Pages**, and import an existing Git repository. Authorize access to the repository you just created. Grant access to that repository only where possible.

Use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | Leave empty; use the repository root |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Environment variable `NODE_VERSION` | `22` |
| Environment variable `PNPM_VERSION` | `11.0.8` |
| Environment variable `SITE_URL` | `https://YOUR-PROJECT.pages.dev` |

The project name determines the initial `pages.dev` address. Save and deploy, then open the address Cloudflare provides when the build finishes.

Pages installs dependencies using the lockfile. If pnpm is unavailable in the build environment, the template README includes an alternative build command that explicitly installs and invokes its pinned version. Read the build log before changing the deployment setup.

Set `SITE_URL` to the public production address. RSS, the sitemap, and canonical links all use it. If you later add a custom domain, update this value and redeploy. It should not point to GitHub or an administration page.

## Make the desk your own

Edit `site.config.mjs` on GitHub and change the title, author, and introduction. Put your avatar in `public/` and use its site-relative path in the configuration.

```js
export default {
  title: "My Desk",
  author: "Your name",
  description: "Notes from everyday life and things worth keeping.",
  url: "",
  lang: "en",
  avatar: "/avatar.svg",
  note: "Take your time.",
};
```

The Cloudflare `SITE_URL` variable takes precedence, so `url` can stay empty when that variable is configured.

Edit `articles/spec/about.md` for the about page and `articles/spec/friends.md` for friend links. Ordinary Markdown links and descriptions are enough.

The template includes an archive, a table of contents, image enlargement, light and dark themes, Pagefind search, RSS, and a sitemap. It uses system fonts for article text.

## Publish without installing local tools

In your GitHub repository, choose **Add file → Create new file** and enter:

```text
articles/posts/my-first-post/index.md
```

The slashes create the folders. Start with this content:

```md
---
title: My first article
description: I finally have a blog of my own.
published: 2026-10-16
updated: 2026-10-16
draft: false
category: Everyday life
tags: [life]
---

Start the article here. The page displays the title from the metadata, so there is no need to repeat it as a heading.

## Something worth remembering

Keep writing here.
```

Use your actual publication date. Choose **Commit changes** and commit to `main`. Cloudflare detects the commit, builds the site, and updates it. The article will appear on the home page after a successful deployment.

Each article has its own folder, using lowercase English letters, numbers, and hyphens. Its Markdown file is always named `index.md`. The folder `my-first-post` produces `/posts/my-first-post/`. Changing the title keeps that address; renaming the folder changes it.

`draft: true` keeps an article out of the generated site. Set it to `false` to publish. Future-dated articles are also excluded until a build runs after their publication date. The template does not include a scheduled publishing service.

`private: true` skips public synchronization in my own Obsidian publishing workflow, keeping the article local. This standalone template currently uses `draft` to control page publication.

## Recommended: Obsidian

Any Markdown editor works. I write in Obsidian, so its workflow gets more attention here. To use it:

0. Download [Obsidian](https://obsidian.md/download)
1. Install Git and clone your new repository.
2. In Obsidian, open the entire `my-blog` repository root as a vault, rather than only `articles/`.
3. The included core Templates configuration uses `articles/templates`.
4. Create `index.md` inside `articles/posts/your-article/`, run Insert template, and choose `blog-post`.
5. Fill in the title, dates, and content, change `draft` when ready, then commit and push.

Opening the repository root lets the Git plugin find the Git repository at the same level. Attachments stay beside each article. The file can be called `index.md` because the `title` property controls the displayed title.

For commits inside Obsidian, install the community **Git** plugin by **Vinzent**, whose plugin ID is `obsidian-git`.

For authentication, reuse system Git. On Windows, enable Git Credential Manager when installing Git for Windows. Run `git push` from the repository and follow its browser sign-in for your own GitHub account. Once system Git can push, the desktop Obsidian Git plugin can use those credentials.

## Preview locally when you want to

You can start with browser editing. For live previews, install Node.js 22.12 or later and run these commands from your repository root:

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed in the terminal, normally `http://localhost:4321`. Markdown edits update automatically.

Search indexes are generated during a build. To check search, run:

```powershell
pnpm run build
pnpm preview
```

Open the preview command's address. Ordinary writing does not require a full build after every paragraph.

## Optional: publish with GitHub Actions and a token

Choose this route if you want GitHub's checks to finish before the website is uploaded. The default Git integration is already sufficient for publishing articles.

First prepare an existing Pages project. For a Git-integrated project, disable automatic production and preview deployments under Cloudflare's Build and Branch control settings so the same commit does not deploy twice.

Create a Cloudflare custom API Token with **Account → Cloudflare Pages → Edit** for the intended account.

In the GitHub repository, open **Settings → Secrets and variables → Actions** and configure:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | Your Pages API Token |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| Variable | `CLOUDFLARE_PROJECT_NAME` | The existing Pages project name |
| Variable | `SITE_URL` | The full production site address |
| Variable | `CF_PAGES_DEPLOY` | `true` |

The included `.github/workflows/deploy-cloudflare-pages.yml` runs checks by default. Setting `CF_PAGES_DEPLOY` enables uploading the same verified build artifact to your existing project.

You still publish by committing Markdown to `main`; Actions performs the final upload. Keep the token in GitHub Secrets.

## Where to make changes later

| What you want to change | File or folder |
| --- | --- |
| Site title, author, introduction, note | `site.config.mjs` |
| Articles and their images | `articles/posts/your-article/` |
| About and friends pages | `articles/spec/` |
| New article template | `articles/templates/blog-post.md` |
| Avatar and favicon | `public/` |
| Colors, font sizes, spacing | `src/styles/global.css` |
| Navigation and footer | `src/layouts/Base.astro` |

The starter defaults to a single-language Chinese blog. It does not require three translations for every article and is independent of my production blog's multilingual publishing system. Start with writing and publishing; add comments or other features when you have a reason to.

I still think a blog's content matters most. That's why I chose this simple template: to write more, and write better

## Read next

Once the site is online, connect a [[free-domain-and-web-community|free domain]]. Continue with [[cloudflare-free-tier-developer-guide|Cloudflare's free tier]] for DNS, image storage, and service access. For writing across your phone and computer, see [[fast-note-sync-on-student-server|Fast Note Sync]]

The choices behind this style are in my [[blog-style-change|redesign notes]]. Once the site is online, see [[geoscore-2-4-guide|GeoScore]] for crawling and page-information checks
