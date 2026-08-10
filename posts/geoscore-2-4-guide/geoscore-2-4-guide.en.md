---
title: "GeoScore 2.4.5: A Tool for Webmasters to Figure Out What Their Site is Really Missing"
published: 2026-07-16
created: 2026-07-16
updated: 2026-08-02
lastEdited: 2026-08-02
updateCount: 3
description: Using site profiles, real crawl evidence, and repair reports to understand what a website truly lacks.
image: ""
tags:
  - SEO
  - GEO
  - Tutorial
  - Open Source Tool
  - Website Optimization
category: Tutorial
draft: false
alias: ""
lang: en
translationKey: posts/geoscore-2-4-guide/geoscore-2-4-guide
---

# GeoScore 2.4.5: A Tool for Webmasters to Figure Out What Their Site is Really Missing

## First, the Reason for Making It

The old version of GeoScore was a project already developed by someone else, [https://geoscoreapp.pages.dev/](https://geoscoreapp.pages.dev/). You can try it out there. I also tried to use it to continuously optimize my website's SEO, even adding [Amiya's Desk](https://www.wikidata.org/wiki/Q140378510) and [Amiya_desi](https://www.wikidata.org/wiki/Q140378992) to Wikidata lists to enhance geo and SEO, and so on.

However, the project later showed its limitations. My personal blog often received suggestions to add FAQ, pricing tables, or Service schema, but my site has neither packages nor takes on projects.

Anyway, I'm not short on AI credits, and since I have a need, I decided to fork it and continue development. This time, I definitely need to get the categorization right. For a personal blog site, I feel that FAQ pricing tables and Service schema are indeed unnecessary.

GeoScore was re-developed based on the original author's work, [https://github.com/sprawf/geoscore](https://github.com/sprawf/geoscore). The original GeoScore was under the MIT license, so I chose to inherit that.

It's an open-source SEO and GEO auditing tool under the MIT license. The entry point and source code are here:

<https://geo.sayori.org>

<https://github.com/Amiyadesi/geoscore>

The complete English and Chinese user documentation is here:

<https://geo.sayori.org/docs>

Its job is to separate already discovered issues, unknown issues, and inapplicable issues, then provide verifiable modification paths for webmasters, and generate modification conclusions into Markdown documents to feed to AI for targeted enhancement.

## The Core of 2.4.5 is Still Distinguishing Between Conclusions and Guesses

Each fact check has only five states:

| State | Meaning |
| --- | --- |
| `pass` | Confirmed as passed from the page or response |
| `fail` | Clear evidence indicates a need for action |
| `not_applicable` | This rule is not suitable for the current site or page |
| `unknown` | Not enough evidence to judge at present |
| `error` | Issue with crawling or external service |

Only `pass` and `fail` that are confirmed applicable and have a conclusion will contribute to the factual score.

`unknown` and `error` will not be misrepresented as failures, but they will reduce coverage and confidence.

When there's too little evidence, GeoScore would rather show insufficient evidence, which actually highlights many shortcomings in that area.

2.4 added a critical failure capping mechanism.

One critical failure will cap the highest score for the corresponding category at 49. Each additional critical failure reduces it by another 10, down to a minimum of 19.

One major failure will cap the limit at 79. Each additional major failure reduces it by another 10, down to a minimum of 49.

Minor failures have a lighter impact but cannot be completely ignored.

This rule is to prevent a site that is `noindexed`, uncrawlable, or has unextractable main content from getting a seemingly safe high score report just because its image alt text and Open Graph are well done.

So, my order for reviewing results is very rigid: first, look at critical failures and evidence, then coverage and confidence, and finally the total score.

## How 73 Real Sites Participated in Calibration

I didn't want to just use my own blog to prove the accuracy of classification, so I now maintain a 73-site type calibration matrix.

It includes news media, personal blogs, portfolios, documentation sites, open-source projects, e-commerce, communities, SaaS, professional services, local businesses, non-profits, government, and university sites.

Each site first has its acceptable type range defined, then the current code independently crawls and determines its type.

The last two runs yielded 48 matches, 0 requiring manual review, and 25 unavailable, and 47 matches, 0 requiring manual review, and 26 unavailable, respectively.

The difference of one site between the two results comes from real network availability, not a new classification conflict.

All successfully crawled and judged samples fell within the pre-allowed type range.

Unavailable usually comes from WAF, regional restrictions, network errors, or verification pages. It doesn't mean classification passed, nor does it mean it failed.

These 25 sites will remain in the matrix because auditing tools truly need to deal with these uncooperative pages.

The scoring itself is calibrated separately using golden HTML fixtures.

Personal blogs, SaaS, e-commerce, local businesses, media, and unknown sites all have fixed evidence and score ranges. Critical failure capping also has independent regression tests.

The real site matrix is responsible for discovering classification deviations, and golden fixtures ensure score changes are repeatable. These two things should not be conflated into a pretty success rate.

## Site Mode and Single URL Mode

GeoScore has two modes of use.

Entering a domain name will enter site mode, which extracts up to five representative HTML pages.

The homepage will be read first. If an About page is found, it will be included. Then, other samples will be selected from the sitemap or internal links on the homepage based on path type.

Five pages are not a full-site crawler; it merely controls an audit within an interpretable and repeatable scope.

Therefore, the sample list in the report is worth looking at, as it tells you which pages this conclusion came from.

If I only want to check a new article, a recently modified landing page, or a specific topic page, I can paste the full URL.

This enters single URL mode, focusing on auditing the target page.

When the target page is not the homepage, the tool will still read the homepage to establish context if needed, to avoid classifying the entire site as SaaS based solely on an article about AI.

I usually run the domain first to confirm the site's public configuration and profile, then run a single URL audit for the pages that actually need changes.

## First, Confirm How It Identifies You

After the audit is complete, don't immediately focus on the total score.

First, look at the site profile.
![[Pasted image 20260720112010.png|width=360|align=center]]

This will display the site type, entity, language, root domain, sampled pages, identification confidence, and classification evidence.

The profile primarily relies on JSON-LD, canonical, title, navigation, and page structure. Body keywords are only considered weak signals.

This is to prevent personal blogs from being classified as SaaS, documentation sites as e-commerce, or article sites from being forced into commercial schema.

If the type is indeed incorrect, you can provide a type hint for this audit only. Click "Correct Type" to select the right type.

This does not mean writing a permanent rule for the entire system, nor will it affect other websites.

## Why Can't It Keep Calculating When Pages Can't Be Crawled?

Real websites often don't return the main content directly.

Some sites return a Cloudflare challenge, some return a login or consent page, and SiteGround might even return a `/.well-known/sgcaptcha/` verification page with HTTP 202.

These pages also look like HTML, but using them for SEO auditing would only result in a fake report about a verification page.

2.4.5 will first identify these intermediate pages and no longer treat HTTP 202 or empty verification pages as successful crawls.

For ordinary HTTP confirmations encountering challenges, retriable network errors, or JavaScript shells, the homepage can use a Cloudflare Browser Run as a fallback.

This attempt has a clear 20-second budget.

Page navigation uses a maximum of 16.5 seconds, followed by 1.5 seconds after the `load` event for normal hydration, and finally 2 seconds reserved for HTML capture.

Previously, when using `networkidle2`, analytics scripts and continuous requests could prevent the page from ever reaching network idle, eventually exhausting the entire budget.

Now, it no longer waits for background network activity to completely quiet down, but it still checks if the rendering result is a challenge, an error page, or a JavaScript shell without main content.

If the fallback still fails, GeoScore will leave the page as `unknown` or `error`, and the total score can directly become "insufficient evidence."

2.4.5 also upgraded the audit cache to `v24`.

This ensures that after deployment, it won't continue to hit old cached timeout or verification page results. Old caches will naturally expire according to their original TTL.

## How to Use the Custom API

Below the input box on the homepage, there's a custom API panel that's collapsed by default.

This is an optional feature, used only for a single observation of the answer for the Evidence Map after the factual audit is complete.

After filling in the API Key, HTTPS Base URL, and model, you can fetch the model list or directly manually enter a known model.

The Base URL does not need to be manually concatenated with `/v1/models`.

If I enter `https://api.example.com`, GeoScore will automatically complete it to `https://api.example.com/v1`.

If `/models` or `/chat/completions` are accidentally pasted along with it, it will also revert to the corresponding API root path before making the request.

All three fields must be filled together; if one is missing, the request cannot be sent.

Before starting the audit, the browser will clear them. They will not be written to browser storage, URL, or downloaded reports.

The server also treats them only as configuration for a single request and will not persist them after the audit is complete.

This does not mean you can display your actual Key in screen recordings or live streams; sensitive information should still be obscured.

After the request is completed, the latest API response will be displayed directly at the top of the Evidence Map.

Here you can see the query, model, status, time, duration, response body, and number of citations. The complete response and citations can be further expanded.

Whether the custom API succeeds or fails, it will not alter the factual score.

I usually save this until after the factual issues have been addressed in a first pass.

First, look at the page's own issues, then external search and response observations. Reversing the order can easily lead you astray by a generated text.

## What's the Point of Monitoring Tokens?

After creating a monitoring project, you'll get two things: a project ID and a management token.

The project ID identifies the project, and the Token proves you have permission to read the project, modify queries, run snapshots, view history, rotate tokens, or delete the project.

The server only stores protected hashes; the original Token is only displayed once when created or rotated.

So, after getting it the first time, you should copy it to your password manager.

When switching browsers or devices, you can fill in the project ID and Token in "Connect Existing Monitoring Project" to reload queries, history, and project status.

The page does not save the Token by default.

It will only enter the current browser's local storage if you explicitly click "Save to this device," and you can click "Forget this device" at any time.

If the Token appears in screenshots, chat logs, or public logs, rotate it immediately; the old Token will become invalid instantly.

The Docs page provides `curl` requests that can be directly copied and public API descriptions.

## How Email Monitoring Works

Monitoring projects can fill in an email address and complete verification.

The system will only attempt to send alerts when a comparable baseline has been established, the scoring version is the same, coverage is sufficient, and the score has actually changed.

The first run, changes in scoring version, or insufficient evidence will only save a snapshot and not generate rise/fall alerts.

The current email adapter prioritizes the main sending channel. In case of authentication, rate limiting, network, or upstream failures, it can switch to the webmaster's own fixed sending service.

Regardless of whether the email is successful, the completed audit snapshot will be saved first.

## Download Full Markdown Repair Report

After running the audit, you can download the complete Markdown repair report at once, without needing to generate files item by item.

The report will include the site profile, sampled pages, scoring and capping reasons, all failure evidence, unknown and external errors, optional module status, grouped repair tasks, and re-verification steps.

At the end of the report, there's also a handoff prompt for AI development.

It can be given to Codex, Claude, or other coding assistants, but it will require the model to use only existing evidence and not fabricate non-existent prices, services, addresses, entities, authors, or statistical sources.

I usually place this Markdown next to the website's code repository, letting the coding assistant first locate the source file that generates the corresponding URL, then I review the diff myself.

## A Practical Usage Sequence

1. Open <https://geo.sayori.org>, and first audit the homepage domain using site mode.
2. Confirm that the site profile and sampled pages are not off.
3. If the first screen shows a crawl failure, first look at the page acquisition evidence, don't continue to interpret a non-existent score.
4. Look at coverage, confidence, and the three priority actions, then decide if the total score has any reference value.
5. First address critical and major failures, going back to the source file or CMS template of the corresponding page to modify.
6. For performance issues, separately confirm that both mobile and desktop have real PageSpeed data.
7. After factual issues are handled, run the Evidence Map or fill in a custom API as needed.
8. Download the Markdown report, hand it over to a development AI for a second round of localization, then review the changes yourself and deploy.
9. If continuous observation is needed, create a monitoring project and save the project ID and Token to a password manager.
10. If unsure about a button or interface, open <https://geo.sayori.org/docs>.
11. After deployment, re-audit the same URL to confirm that the failure evidence has truly disappeared.

## What It Cannot Do

GeoScore is not an infinitely deep crawler; five samples cannot represent every URL.

Nor will it replace Search Console, server logs, real user data, or manual content judgment.

For pages blocked by WAF, login walls, verification pages, or regional restrictions, the report may only show `unknown` or `error`.

In such cases, security policies should not be disabled just to chase a higher score.

It's even less likely to confirm out of thin air that a certain consumer AI product actually cited your site.

For me, these boundaries actually make the report more useful.

An auditing tool should clearly state what it knows and what it doesn't, leaving the rest for the site maintainer to verify.
