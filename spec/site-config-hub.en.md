# Blog site configuration

The Simplified Chinese files here are the blog's content source. Edit them first, then translate. Do not edit generated files in the blog repository.

| Local source | Generated during the build | Published location |
| --- | --- | --- |
| spec/about.md | src/content/spec/about.md | /about/ page body |
| spec/friends.md | src/content/spec/friends.md | /friends/ link instructions |
| site/profile.json | src/generated/obsidian-config.ts | Home avatar, name, bio, and social links |
| site/navigation.json | src/generated/obsidian-config.ts | Top navigation and More menu |
| site/music.json | src/generated/obsidian-config.ts | Music tracks and covers after opting in |
| site/sponsor.md, site/sponsor.json | src/content/site/sponsor.md, src/generated/obsidian-config.ts | /sponsor/ body and supporters |
| friends/*.md | src/generated/friends.ts | /friends/ cards |
| posts/article-folder/*.md | src/content/posts/article-folder/index.md | /posts/permanent-article-address/ |
| essays/*.md | src/content/essays/*.md | /essays/ notes |
| assets/profile, assets/about, assets/music | public/assets/matching-folder | Avatar, QR code, music, and covers |
| Images beside an article | Optimized R2/CDN images | Article images |

In navigation JSON, top-level links appear directly in the navigation bar; children appear in a dropdown. Edit names, URLs, and order. Set external: true for external links. The Settings entry is also configured here.

A music cover can be cover/filename.webp with its file in assets/music/cover/, or a direct HTTPS URL. An audio url can be url/filename.mp3 with its file in assets/music/url/. Use netease and youtube for the respective track IDs. Music starts disabled; once enabled and played, it continues between blog pages.

The Lite home page has no Banner, announcement panel, or layout switch. site/banner*.json and site/announcement*.json do not control the current home page. home/*.json only controls the main site at sayori.org.

## Language versions

- Simplified Chinese: original-file.md or original-file.json.
- English: original-file.en.md or original-file.en.json.
- Traditional Chinese: original-file.zh-hant.md or original-file.zh-hant.json. Shared page text is also converted during the build.
- Use the blog repository's existing translate-content command for Markdown. It generates Traditional Chinese from Simplified Chinese and translates English. Set TRANSLATE_FORCE=1 after editing the source to refresh English. Link targets, image filenames, code, and Obsidian block IDs stay unchanged.
- JSON follows the Simplified Chinese structure too. Translate visible text only; keep URLs, track IDs, icon names, and keys unchanged.

For blog-style-change, run in PowerShell:

~~~powershell
Set-Location D:/Amiya/111Me/repos/sayori-blog
$env:CONTENT_DIR = 'D:/Amiya/111Me/servers/remote_server/articles'
$env:TRANSLATE_MATCH = 'posts/blog-style-change/'
$env:TRANSLATE_FORCE = '1'
pnpm run translate-content
Remove-Item Env:CONTENT_DIR, Env:TRANSLATE_MATCH, Env:TRANSLATE_FORCE
~~~

## Publishing flow

Local articles → D:/Amiya/111Me/repos/sayori-articles → GitHub Actions → blog.sayori.org.

The live site reads the content repository's main branch. It cannot see local edits that have not been published. Obsidian's publish button calls scripts/deploy-blog-from-obsidian.ps1 and publishes the public allowlist by default. Use -Paths for individual articles or configuration files so other unfinished edits stay local:

~~~powershell
& D:/Amiya/111Me/servers/remote_server/scripts/deploy-blog-from-obsidian.ps1 -Paths 'posts/blog-style-change','spec/about.md','spec/about.en.md','spec/about.zh-hant.md' -CommitChanges -PushChanges
~~~

Use Obsidian's Start Blog Preview button to preview; click it again to stop. After publishing, check sayori-blog Actions on GitHub for the deployment result.
