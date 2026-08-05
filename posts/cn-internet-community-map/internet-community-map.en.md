---
title: I Made a Small Forum List Repository
published: 2026-06-18
created: 2026-06-18
updated: 2026-07-11
lastEdited: 2026-07-11
updateCount: 7
description: I've organized my previously scattered notes on internet communities into a wiki-style small forum list repository and a standalone site. PRs are welcome!
image: ""
tags:
  - Chinese Communities
  - Forums
  - Open Source
category: Internet & Communities
draft: false
alias: ""
lang: en
translationKey: posts/cn-internet-community-map/internet-community-map
---

# I Made a Small Forum List Repository

I've always wanted to put together a map of internet communities.

I'm not talking about the obvious big platforms like X, Instagram, Tieba, Xiaohongshu, or Xiaoheihou. I mean those forums and communities you'd rarely stumble upon unless you actively search for them or are already part of their specific circles.

This idea has now evolved from a single article into a standalone, long-term maintainable repository and an online page:

- GitHub Repository: [https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)
- Online Page: [https://forums.cc.cd/](https://forums.cc.cd/)

Currently, this site is more like a wiki or docs: categories and community directories on the left, specific entries in the middle, each community has its own page, and there's a Giscus comment section at the bottom of each page.

The first version currently includes 49 communities. This number will continue to change as people add, correct, or submit PRs.

## What This Repository Includes

Here, 'small' isn't strictly about user count, but about how you discover them.

If a community is basically inaccessible without actively searching, or if it's only frequently seen by people involved in the hosting, ACG, security, hardware, webmaster, or resource circles, then it might be suitable for inclusion.

Currently, it's roughly divided into these categories:

- Tech / AI / Developers
- Hosting / VPS / Webmasters / Indie Sites
- Search / Resources / Knowledge Tools
- Security / Reverse Engineering / Systems / Software
- ACG / Gaming / Niche Communities
- Hardware / Electronics / Homelab
- Adult / Resources / Gray Area
- Old Overseas Forums / General Interest

Although these categories feel a bit strange, it'll have to do for now.

## What the Current Page Looks Like

Before, it was more like a long README list; now it's been broken down into a full site.

The homepage will keep a category overview, great for quickly seeing what communities are available; the left-hand directory is good for jumping by category; each community also has its own page, making it easy for others to point out if something is wrong, an entry point has changed, or registration rules have shifted.

I initially wanted to create an 'Internet Community Map,' but the more I wrote, the more I realized the hardest part isn't drawing the map, but continuously maintaining it.

Forum entry points change, registration methods change, and community vibes change. The hosting scene constantly gets new info due to vendors, routes, and events, and ACG and resource communities often become outdated because of domain, permission, or rule changes.

So, the current approach is: the repository handles the directory and factual records, while the blog covers personal experiences.

If I've genuinely been active in a community for a long time, I'll write a separate article. If it's just a compilation of public information, it stays on the list.

## What Each Community Entry Will Include

Each entry in the repository will try to include this information:

- Entry Point
- Positioning and Community Vibe
- Registration Method or Barrier
- What's Primarily Inside
- What It's Good For
- Important Notes
- Public Sources
- Last Verified Date

For communities I've personally experienced long-term, the descriptions will reflect more genuine feelings.

For example, for Linux.do and NodeLoc, I'll draw from my experiences in my previous post [[internet-community-1|Internet Community Notes 1]]: Linux.do's rules, beginner tasks, public welfare initiatives, perks and freebies, development optimization, collaborative documentation, LDC; NodeLoc's free atmosphere, sub-forums, battery points, AFF, and webmaster activity.

For communities I haven't used long-term, I'll only compile information from public pages and insider discussions, without pretending it's a personal experience.

## Why PRs Are Welcome

A list like this is bound to have errors if only one person maintains it.

For some communities, outsiders can only see the entrance, not the true atmosphere. Some forums have periodically open registration, some domains drift, and some old and new names are easily confused.

Therefore, what this repository needs most isn't prettier descriptions, but corrections from actual community members.

If you're an old user of a community, or just notice an entry is wrong, you can directly submit a PR. The most valuable additions are usually these:

- Is registration currently open, invite-only, or periodically open?
- Which rules or announcements should new users check first?
- Is the community's true vibe more tech-oriented, chatty, trade-focused, or resource-driven?
- What are the most valuable sections inside?
- Has the entry point changed, or is the old domain unstable?
- Do some descriptions sound too much like an AI summary and need to be rephrased in a real user's voice?

If you don't want to submit a PR, you can also leave a comment directly on the corresponding community page. The site now uses Giscus, and comments will go into GitHub Discussions.

## How to Help Organize

When adding or modifying a community, prioritize changing the structured data in the repository:

```bash
data/communities.json
```

After making changes, run:

```bash
node scripts/generate-readme.mjs
node scripts/build-site.mjs
```

The former syncs the README, and the latter generates the online page.

If you're just changing category descriptions, see:

```bash
docs/categories.md
```

If you're adding a single community, it's best to also provide public sources. Sources can be the official website, registration page, in-site announcements, about page, rules page, or any other publicly accessible documentation.

## Current Organization Principles

This project is currently organized primarily by AI based on public information, site pages, and a small amount of personal experience. Only a portion of the communities are ones I've genuinely entered and experienced long-term.

So, I hope that eventually, every community entry can be reviewed and corrected by real users.

Adult, resource, cracking, reverse engineering, security, flashing, and trading communities will also be included, but categorized clearly: what they generally contain, what to observe, and what pitfalls exist. Whether to enter, participate, or how to assess risks is entirely the reader's responsibility.

I now want to make this a public directory that can be continuously updated, rather than a blog post that becomes outdated once written.

If you find a forum I haven't listed, or an entry that's clearly written by an outsider, feel free to submit a PR directly to the repository:

[https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)
