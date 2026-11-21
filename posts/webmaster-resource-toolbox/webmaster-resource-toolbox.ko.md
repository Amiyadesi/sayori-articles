---
title: 개인 웹마스터 외부 리소스 목록
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 7
description: 도메인, 호스팅, 댓글, 모니터링, 셀프호스팅, Cloudflare, 통계, 웹마스터 커뮤니티 및 블로그 프레임워크 외부 리소스 모음
image: ""
tags:
  - 2026여름
  - 도구 기록
  - 독립 블로그
  - 사이트 구축과 Cloudflare
category: "개인 기록"
draft: false
alias: blog-resource-toolbox
lang: ko
translationKey: "posts/webmaster-resource-toolbox/webmaster-resource-toolbox"
---

여기에는 외부 리소스 링크만 모아둠

이 블로그 글은 어떻게 읽는지 궁금하면 [[site-article-index|사이트 글 인덱스]] 참고

자주 쓰는 로컬 소프트웨어는 [[useful-free-software-toolbox|무료 유용한 소프트웨어 목록]] 참고

정책이나 무료 한도는 바뀔 수 있으니 가입 전에 공식 안내를 한 번씩 확인해 두는 게 좋음

## GitHub 리스트 저장소
- [Free for Developers](https://free-for.dev/#/): 개발자용 무료 서비스 모음, GitHub 100k star+
- [awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare): Cloudflare 활용 모음, GitHub 10k star+
- [sindresorhus/awesome: 😎 Awesome lists about all kinds of interesting topics](https://github.com/sindresorhus/awesome#readme): awesome 리스트 모음글, GitHub 400k star+

## 무료 도메인과 임시 진입점

- [DNSHE](https://my.dnshe.com/): 무료 2차 도메인, DNS 연습용으로 먼저 쓰기 좋음
- [eu.org](https://nic.eu.org/): 대표적인 무료 도메인인데 심사가 꽤 느린 편
- [us.kg](https://nic.us.kg/): 꽤 흔히 보임, 등록 전에 요즘 규칙 먼저 확인
- [pp.ua](https://nic.ua/): 오래된 무료 도메인 창구 중 하나
- [GitHub Pages](https://pages.github.com/): `github.io` 주소를 발급해 줌
- [Cloudflare Pages](https://pages.cloudflare.com/): `pages.dev` 주소를 발급해 줌

사이트를 처음 만들기 시작할 때라면 이 정도만으로도 한참 낑낑대며 굴릴 수 있음

## 정식 도메인 등록

- [Namesilo](https://www.namesilo.com/)
- [Porkbun](https://porkbun.com/)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)

나는 첫해 가격과 갱신 가격을 먼저 보는 편임. 안 그러면 첫해 싸다는 말에 홀랑 넘어가기 딱 좋음

## 정적 호스팅

- [Cloudflare Pages](https://pages.cloudflare.com/): 내가 지금 쓰고 있는 곳
- [Vercel](https://vercel.com/): 프런트엔드 프로젝트들 많이들 여기에 올림
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Render](https://render.com/)

순수 정적 블로그라면 Cloudflare Pages랑 GitHub Pages만으로도 대체로 충분함

## 댓글 시스템

- [Giscus](https://giscus.app/)
- [Twikoo](https://twikoo.js.org/)
- [Artalk](https://artalk.js.org/)
- [Waline](https://waline.js.org/)
- [Cusdis](https://cusdis.com/)

중국어 블로그를 쓴다면 내 생각엔 Twikoo랑 Waline이 좀 더 흔한 편

## 모니터링과 상태 페이지

- [Gatus](https://gatus.io/)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [UptimeRobot](https://uptimerobot.com/)
- [Better Stack](https://betterstack.com/)

셀프호스팅으로 할 거면 나는 Uptime Kuma부터 볼 듯. 훨씬 편함

## 알림과 푸시

- [ntfy](https://ntfy.sh/)
- [Bark](https://github.com/Finb/Bark)
- [Gotify](https://gotify.net/)
- [PushDeer](https://github.com/easychen/pushdeer)
- [Server 酱](https://sct.ftqq.com/)

스크립트 돌고 나서 나한테 알림 하나 보내게 해두면 꽤 쓸모 있음

## 셀프호스팅 리소스 인덱스

- [awesome-selfhosted](https://awesome-selfhosted.net/)
- [awesome-selfhosted GitHub](https://github.com/awesome-selfhosted/awesome-selfhosted)
- 
- [selfh.st](https://selfh.st/)
- [noted.lol](https://noted.lol/)

뭘 깔아야 할지 모를 때 들춰보기 좋은 곳들

## Cloudflare 관련

- [Cloudflare Docs](https://developers.cloudflare.com/)
- [Pages Docs](https://developers.cloudflare.com/pages/)
- [Workers Docs](https://developers.cloudflare.com/workers/)
- [R2 Docs](https://developers.cloudflare.com/r2/)
- [Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

Cloudflare 같은 건 공식 문서를 바로 보는 게 제일 나음. 커뮤니티 글은 금방 한물가 버림

## 스토리지와 CDN

- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Backblaze B2](https://www.backblaze.com/cloud-storage)
- [GitHub Releases](https://github.com/)
- [jsDelivr](https://www.jsdelivr.com/)

이미지 호스팅, 작은 파일, 백업 같은 상황에서 자주 쓰이게 됨

## 데이터 통계

- Cloudflare Web Analytics: Cloudflare 대시보드에서 바로 켬
- [Umami](https://umami.is/)
- [Plausible](https://plausible.io/)
- [GoatCounter](https://www.goatcounter.com/)

나는 요즘 Umami 같은 쪽이 좀 더 마음에 듦. 화면이 깔끔해 보임

## 웹마스터 커뮤니티와 디렉토리

- [开往 Travellings](https://www.travellings.cn/)
- [萌备](https://icp.gov.moe/)
- [十年之约](https://www.foreverblog.cn/)
- [揪蝉](https://hi.jiuchan.org/docs)
- [中文独立博客列表](https://github.com/timqian/chinese-independent-blogs)
- [BlogFinder](https://bf.zzxworld.com/)
- [博友圈](https://www.boyouquan.com/)
- [积薪](https://firewood.news/)

사이트를 어느 정도 올려놓고 바깥에 얼굴도장 찍으려 할 때 쓰기 좋은 입구들

## 포럼과 기술 커뮤니티

- [Linux DO](https://linux.do/)
- [V2EX](https://www.v2ex.com/)
- [NodeSeek](https://www.nodeseek.com/)
- [NodeLoc](https://www.nodeloc.com/)
- [Hacker News](https://news.ycombinator.com/)

사이트 구축, VPS, 혜택/알뜰 팁, 이런저런 낑낑거림 후기를 보려면 나도 이쪽을 자주 들락거림

## 블로그 프레임워크

- [Astro](https://astro.build/)
- [Hugo](https://gohugo.io/)
- [Hexo](https://hexo.io/)
- [VitePress](https://vitepress.dev/)
- [Zola](https://www.getzola.org/)

나는 요즘 주로 Astro를 쓰고 있어서 이쪽은 Astro가 좀 더 익숙함

## 비밀번호와 보안

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden)
- [Bitwarden](https://bitwarden.com/)
- Cloudflare Access: Cloudflare 대시보드 안에서 켬
- [Let's Encrypt](https://letsencrypt.org/)
- [Caddy](https://caddyserver.com/)

관리자 패널을 공용 망에 그대로 노출하지 말고, 비밀번호도 진짜 기억력에만 의존하지 말 것

## 이어서 읽기

이 리소스들을 써먹으려면 [[astro-mizuki-blog-from-zero|처음부터 사이트 만들기]] → [[free-domain-and-web-community|도메인 연결]] → [[cloudflare-free-tier-developer-guide|Cloudflare]] 순서로 한 번 쭉 훑어보면 됨

사이트를 오픈한 뒤에는 [[geoscore-2-4-guide|GeoScore]]로 크롤링, 색인, 페이지 정보 쪽에 더 채울 게 없는지 확인해 봄
