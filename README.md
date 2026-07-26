# Sayori Articles

Public content source for [blog.sayori.org](https://blog.sayori.org) and
[sayori.org](https://sayori.org). The companion repositories are
[sayori-blog](https://github.com/Amiyadesi/sayori-blog) and
[sayori-home](https://github.com/Amiyadesi/sayori-home).

This repository intentionally contains only publishable material:

- published posts, essays, public site data, assets, friends, anime, and home data;
- no Obsidian workspace state, backups, user archives, secrets, or drafts;
- friend files contain public frontmatter only, with private notes removed.

Validate a change before pushing:

```bash
node scripts/verify-public-content.mjs
```

The blog and home deployment workflows check out this repository into `content/`
and pass `CONTENT_DIR=./content` before building.

## Publishing boundary

The local Obsidian vault remains private. Its publish command mirrors an
explicit public-content allowlist into this repository, runs the verification
above, and then commits to `main`. Adds, edits, and removals in that allowlist
are all synchronized. Do not add `.obsidian`, logs, drafts, backups, machine
configuration, or server files to this repository.

Pushing to `main` validates the public-content boundary but does not deploy the
sites automatically. After reviewing the published diff, manually run the Blog
and Home deployment workflows. Both downstream workflows read this repository
at `main`; they do not read the private vault. No cross-repository deployment
token is required.

## License

Unless a file says otherwise, original text and structured content are available
under [CC BY 4.0](./LICENSE). Third-party quotations, trademarks, embeds, and
linked media retain their original rights.
