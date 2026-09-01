---
title: "Riseup's 'Radical Servers' List: What Public Service Organizations Offer and What I Can Do"
published: 2026-07-19
created: 2026-07-19
updated: 2026-08-14
lastEdited: 2026-08-14
updateCount: 1
description: Getting to know the non-commercial tech organizations and public services curated by Riseup, and documenting the web audit and API capabilities currently offered by sayori.org
image: ""
tags:
  - Public Service Organizations
  - Public Services
  - Open Source Services
  - Privacy
  - Resource Integration
category: Tools & Resources
draft: false
alias: ""
lang: en
translationKey: posts/radical-servers-public-services/radical-servers-public-services
---

I recently stumbled upon a long list within Riseup's security resources.

[Radical Servers - riseup.net](https://riseup.net/zh/security/resources/radical-servers)

Most projects on the list are maintained by non-profit organizations, autonomous tech collectives, cooperatives, or volunteer groups, providing internet infrastructure for social movements, grassroots organizations, non-commercial projects, and privacy-conscious individuals.

Some organizations offer email, mailing lists, and website hosting, while others maintain VPNs, XMPP, Matrix, Etherpad, file sharing, code hosting, or community networks.

This list gave me my first relatively comprehensive look at other public services in the corners of the internet.

I've also compiled the organizations mentioned in the article and the entry points offered by sayori.org into the [Network & Services category of my resource navigation](https://nav.sayori.org/#cat-net-services). If you want to continue searching by service type, you can start there.

## Why Riseup Calls Them Radical Servers

Riseup's explanation for this list is quite direct.

It includes anti-capitalist, anti-hierarchical, autonomous, feminist, or other radical tech projects.

Some of these groups provide free or mutual aid services for grassroots activists, while others focus more on privacy, free software, and decentralization.

The common thread isn't the tech stack, but rather not making profit the primary goal.

Riseup also explicitly states that this list does not constitute an official endorsement.

Each organization's region, legal environment, logging policy, registration method, and service status differ, so you should still read their terms and privacy statements before use.

## What's on This List

The page is categorized by World Wide, South America, Europe, North America, and In memoriam.

Worldwide projects include hackerspaces.org, HackThisSite, Indymedia, and Take Back The Tech.

They lean towards community spaces, cybersecurity learning, independent media, and combating digital violence against women, respectively.

The South America section lists Codigosur and Colnodo.

These organizations provide hosting, email, mailing lists, streaming, collaborative editing, and technical support for social movements and non-profit groups.

The Europe section has the most entries.

Here you can find organizations with different focuses, such as Disroot, Framasoft, GreenNet, NoLog.cz, systemli, Syster Server, and Koumbit.

The services they offer vary widely:

- Email and mailing lists
- Website, blog, Wiki, and forum hosting
- XMPP, Matrix, Mumble, and video conferencing
- Etherpad, CryptPad, and other collaboration tools
- Git, project management, and file sharing
- VPN, DNS, community networks, and virtual servers
- Technical support for social movements, feminist groups, or non-commercial projects

The North America section includes Riseup itself, as well as projects like Koumbit and Anarchy Planet.

The page also retains an 'In memoriam' section at the end.

These projects have ceased operation or are only in maintenance mode, yet they haven't been simply erased from history.

This part is important because public services can end. Maintainers leaving, funding changes, and legal risks can all cause a once-reliable entry point to disappear. This is precisely the risk that public service must bear.

## A Few Projects Worth Knowing Individually

### Disroot

[Disroot](https://disroot.org/) is a non-profit foundation based in Amsterdam, maintained by volunteers and relying on community support.

It brings together email, files, chat, collaborative documents, encrypted pastebins, and federated network tools into one open service collection.

I previously wrote a separate note about it: [[disroot-open-services-note|Disroot: An Open Source Service Collection That Feels Like the Old Internet Ideal]].

### Framasoft

[Framasoft](https://framasoft.org/) is from France and has long promoted free software, open education, and a decentralized internet.

It has created numerous public tools as alternatives to centralized platforms and continuously maintains software, documentation, and educational resources.

### systemli and NoLog.cz

[systemli](https://www.systemli.org/) provides privacy-focused communication services for political activists and social movements.

[NoLog.cz](https://nolog.cz/) is a Czech activist tech collective, offering Matrix, file sharing, collaborative documents, video, and other free software services.

These types of organizations usually don't promise unlimited resources for everyone; instead, they clearly define their target audience, application methods, and usage boundaries.

### GreenNet and Koumbit

[GreenNet](https://www.greennet.org.uk/) provides internet services, website, and hosting support for peace, environmental, and human rights groups.

[Koumbit](https://www.koumbit.org/) is a non-profit organization in Montreal, providing free software technical services for community groups and social justice projects, and also has a solidarity hosting program.

They remind me that public tech services aren't necessarily all free.

Reasonable fees, cross-subsidies, donations, and volunteer labor can all be ways to sustain services.

## Three Things to Confirm Before Using This List

I actually visited this list on July 19, 2026, and the directory still includes World Wide, South America, Europe, North America, and In memoriam.

This only proves that Riseup's directory page is currently accessible; it doesn't certify that every organization on the list still offers open services.

First, check if the project is still running.
This page retains historical entries, and some service descriptions and quotas might be outdated.

Second, check who is eligible to apply.
Some services are only for specific regions, social movements, non-profit organizations, or invited users; you can't just register because you see 'free'.

Third, check legal and data boundaries.
Privacy-friendly doesn't mean absolute anonymity, nor does it mean you can ignore backups, account recovery, and local laws.
Important data should still be kept with your own encrypted backups; don't treat any single organization as infrastructure that will never shut down.

## What I Can Learn from This List

I haven't registered sayori.org as a public service organization, nor do I have the funding, members, or long-term governance experience of these groups.

Therefore, I won't compare my small services with Riseup or Disroot on the same scale.

What I can learn is how they describe their target users, disclose boundaries, rely on donations, limit abuse, and acknowledge that services may cease.

Rather than continuing to pile up many entry points, I'd rather maintain a small number of truly sustainable services.

## Services Currently Offered by sayori.org

The full status is available in the [sayori.org Public Services documentation](https://sayori.org/zh/services/).

### GeoScore Web Audit

[GeoScore](https://geo.sayori.org/) is a registration-free SEO and GEO factual audit tool.

It targets public web pages, organizing site profiles, sampling pages, checking evidence, prioritizing fixes, and generating Markdown reports.

It does not automatically modify target websites, nor does it package predictive results as genuine AI citation rates.

![[Pasted image 20260720110643.png|width=560|align=center|caption=GeoScore Introduction]]

### GeoScore Public Audit API

I can currently also provide a public API service.

The entry point is [geo-api.sayori.org](https://geo-api.sayori.org/).

It provides a stable public interface for GeoScore, allowing public domain audits, reading deployment metadata, obtaining PageSpeed evidence, and generating an Evidence Map or FixPack from existing audits.

The API's request structure, responses, and error codes are documented in the [OpenAPI documentation](https://geo-api.sayori.org/openapi.json), with Chinese usage instructions in [GeoScore Docs](https://geo.sayori.org/docs).

The smallest site audit request is as follows:

```bash
curl "https://geo-api.sayori.org/api/audit/example.com"
```

This interface returns a Server-Sent Events stream, with site mode extracting a maximum of five HTML pages.

Operational limits are based on the live results from [`/api/meta`](https://geo-api.sayori.org/api/meta).

It only accepts public hostnames and does not support localhost, internal IP addresses, IP literals, or arbitrary proxy requests.

The public API also operates on a best-effort basis and may be rate-limited or paused if quotas are exhausted, abuse occurs, or upstream failures happen.

### Amiya's Whiteboard

[Amiya's Whiteboard](https://board.sayori.org/) is a lightweight, registration-free browser whiteboard.

It's suitable for quick sketches, organizing rough drafts, clarifying a page structure, or sending someone a collaborative canvas that can be opened directly. It's quite useful for drawing temporary flowcharts or other things to visualize your ideas.

The whiteboard is still maintained on a best-effort basis and does not guarantee long-term preservation of important content. Users should export any results they wish to keep.

### Blog, RSS, and Feedback

The [blog](https://blog.sayori.org/) and [RSS](https://blog.sayori.org/rss.xml) are used to publish articles, tutorials, and project records.

The message board and email are for receiving service issues and improvement suggestions.

## Search Gateway's Boundaries

[Search Gateway](https://github.com/Amiyadesi/search-gateway) remains open source, can be self-deployed, and offers compatible API and MCP access methods.

However, `gateway.sayori.org` is the site owner's internal instance, requiring authentication, and does not provide anonymous calls, shared tokens, or public search quotas.

The public GeoScore API and the internal Search Gateway must be explained separately.

The former is a callable public service, while the latter is self-deployable software and private infrastructure.

## Next Steps

I want to continue organizing this list of radical servers, prioritizing organizations that are still running, understandable to Chinese users, and have clearly defined service boundaries.

For my own site, I will first ensure the stability of the GeoScore web version, public audit API, blog, and RSS.

If I later add website health check mutual aid, static site launch assistance, or a small quota for search evidence, these will also be handled by invitation, limited quotas, and manual processing.

I strive to do my utmost to help others.
