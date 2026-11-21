---
title: "2C2G 학생 서버로 뭘 돌릴 수 있을까: 작은 기기부터 터지게 만들지 말자"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "블로그 주인의 2C2G 알리바바 클라우드 경량 서버 실전 세팅: Vaultwarden, ntfy, Gatus, Fast Note Sync, AstrBot, 검색 게이트웨이. 실제 메모리 점유율과 비추천 목록 포함"
image: ""
tags:
  - 실전 튜토리얼
  - VPS와 셀프호스팅
  - Docker
  - 학생 서버
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: "posts/student-2c2g-server-service-index/2c2g-server-service-index"
---
만약 알리바바 클라우드 학생 300위안 쿠폰으로 블로그 운영자처럼 2C2G 서버를 장만하셨다면

 축하합니다! 이제 24시간 내내 켜져 있는 작은 컴퓨터가 생겼습니다

 아직 서버를 켜기 전이라면 [[aliyun-student-300-voucher-guide|알리바바 클라우드 학생 쿠폰]]이나 [[azure-students-100-credit-guide|Azure 일본 서버]] 글을 먼저 참고하세요. 이 글은 서버를 켠 뒤 어떤 용도로 쓸지 고르는 내용을 다룹니다

 하지만 정말로 '작은 컴퓨터'일 뿐입니다. 2코어 1.6GB 메모리(실제 가용량은 Swap 활성화 시 약 672MB)라 가벼운 서비스를 연습하고 띄우기엔 좋지만, 로컬 모델, Nextcloud, 동영상 인코딩 같은 무거운 작업을 돌리기엔 적합하지 않습니다

 이 글은 운영자의 실제 설정 기록입니다. 서버를 돌린 지 한 달이 넘었고, 현재 컨테이너 14개, 메모리는 765MB + 987MB Swap을 사용 중이며 디스크는 40GB 중 21GB를 쓰고 있습니다

## 먼저 기초 설정부터 하기

서비스는 서둘러 설치하지 마세요

서버를 받았다면 다음 작업부터 먼저 하세요:

- SSH 키 로그인
- 비밀번호 로그인 차단
- 기본이 아닌 다른 SSH 포트로 변경
- 보안 그룹 및 UFW 설정
- 알리바바 클라우드 비용 경보 설정(CDT 트래픽)
- 통합 서비스 디렉터리 생성
- Docker 및 Docker Compose 설치

앞의 몇 단계는 예전에 쓴 이 글을 참고하세요:

[원래는 그냥 봇을 24시간 켜두고 싶었을 뿐인데, 클라우드 서버를 사고 말았다](/posts/sayori-server-01-vps-start/)

서비스 디렉터리는 `/root/sayori/`에 두고, 커다란 `docker-compose.yml` 하나로 통합 관리합니다. 서비스마다 각각 디렉터리를 만들어도 됩니다:

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

디렉터리마다 `docker-compose.yml` 하나씩 두고, 실제 비밀 키는 `.env`에 넣어서 공개 저장소에 올라가지 않도록 하세요

## 운영자가 현재 돌리고 있는 서비스

### 🔐 Vaultwarden (비밀번호 관리자, 가장 중요)

**용도:** 개인 비밀번호 관리자

**우선적으로 돌리는 이유:**

- 비밀번호 관리자는 블로그, 상태 페이지, 봇보다 중요함
- 가볍고 낮은 메모리 사용량
- 클라이언트 생태계가 성숙해서 모바일, PC, 브라우저 모두 Bitwarden 공식 클라이언트를 사용 가능
- Bitwarden 유료 기능 지원(2FA 저장, 비밀번호 상태 점검)

**핵심 주의사항:**

- 첫 회원가입이 끝나면 즉시 `SIGNUPS_ALLOWED` 끄기
- 반드시 HTTPS 설정하기 (Cloudflare Tunnel 또는 Caddy 이용)
- 주기적인 백업과 복구 리허설 진행
- 공인 IP에 무방비하게 노출하지 않기

**메모리 사용량:** ~50MB

**상세 튜토리얼:** [[selfhost-vaultwarden-on-2c2g|2C2G 학생 서버에 Vaultwarden 구축하기]]

---

### 📢 ntfy (푸시 알림, 두 번째로 중요)

**용도:** 나에게 푸시 알림 보내기

서버에서 백업 스크립트, 모니터링 스크립트, 크론 팝업 등을 돌리다 보면 실패했을 때 누군가 알려줘야 합니다. ntfy가 딱 이 용도에 알맞습니다

**주요 활용처:**

- 백업 성공/실패 알림
- Gatus 헬스체크 경고
- 댓글 심사 결과 푸시
- 수동으로 일부 운영 명령어 트리거 (ntfy → 스크립트 연동)

**핵심 주의사항:**

- 액세스 제어를 설정하여 모르는 사람이 내 topic에 메시지를 보내지 못하게 하기
- Cloudflare Access와 연동하여 관리자 페이지 보호하기

**메모리 사용량:** ~20MB



---

**상세 튜토리얼:** [[selfhost-ntfy-on-2c2g|2C2G 학생 서버에서 ntfy 돌리기]]

### 📊 Gatus (상태 페이지 및 헬스체크)

**용도:** 내 서비스 모니터링

블로그, Vaultwarden, 봇 패널, API가 여전히 살아있는지 주기적으로 확인해 줍니다. 죽으면 ntfy를 통해 알려줍니다

**모니터링 중인 엔드포인트:**

- `sayori.org` 블로그
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus 본인
- `ntfy.sayori.org` ntfy
- Fast Note Sync API

**핵심 주의사항:**

- 설정 파일은 YAML로 작성하고 들여쓰기에 실수하지 않기
- Cloudflare Tunnel로 노출하고 Access로 보호하기
- 알림 채널을 ntfy와 연동하기

**메모리 사용량:** ~15MB

---

### 📝 Fast Note Sync (Obsidian 동기화)

**용도:** Obsidian용 프라이빗 동기화

저처럼 Obsidian으로 블로그를 쓰고, 프로젝트를 기록하고, 초안을 저장한다면 이 서비스가 매우 매력적일 겁니다. Obsidian Sync보다 저렴하고(0원), Syncthing보다 마음 편합니다(모든 기기가 동시에 켜져 있을 필요 없음)

**핵심 주의사항:**

- 데이터 디렉터리를 주기적으로 백업하기
- 너무 큰 파일(이미지, 동영상)은 넣지 않기
- 동기화 충돌 발생 시 수동으로 처리하기

**메모리 사용량:** ~30MB

**상세 튜토리얼:** [[fast-note-sync-on-student-server|학생 서버에서 Fast Note Sync 다루기]]

---

### 🤖 AstrBot + NapCat (QQ 봇)

**용도:** 24시간 온라인 상태의 QQ/Telegram/Discord 봇

원격 서버에 올려두니 드디어 24시간 내내 끊김 없이 봇을 돌릴 수 있게 되었습니다. Discord와 Telegram에도 연동할 수 있는데, 이 두 곳은 기본적으로 제재 위험이 거의 없습니다

**QQ 연동 시 주의사항:**

- 신규 계정은 제재 위험이 크므로 계정 육성을 권장함
- 계정을 만들자마자 바로 쓰지 말 것(운영자의 피눈물 나는 교훈)
- NapCat은 주기적으로 QR코드를 스캔해 로그인해야 함

**메모리 사용량:** AstrBot ~100MB, NapCat ~150MB

---

### 🔍 AI Search Gateway (검색 게이트웨이)

**용도:** 개인용 AI 검색 집계 게이트웨이

Tavily, Brave Search, Firecrawl, Exa, Grok Search, SearXNG를 통합하여 FastAPI로 만들었습니다. Codex와 Claude Code MCP용으로 쓰기에 API를 따로 호출하는 것보다 편리합니다

**핵심 주의사항:**

- `127.0.0.1:8000`에만 바인딩하고 공인 IP에 노출하지 않기
- 로컬에서 SSH 포트 포워딩 + MCP를 통해 호출
- API Key는 환경 변수에 넣기

**메모리 사용량:** ~100MB (Redis 및 SearXNG 포함)

---

### 🛡️ Comment Moderation (댓글 심사)

**용도:** AI로 블로그 댓글 심사

공익 GPT 크레딧을 이용해 Twikoo 댓글을 자동으로 심사하고, ntfy와 연동해 심사 결과를 푸시합니다. ntfy에서 메시지를 보내는 방식으로 댓글을 수동 삭제하거나 복구할 수 있습니다

거기에 Cloudflare Turnstile 봇 방지 기능까지 더하면 남는 댓글들은 기본적으로 전부 고품질이 됩니다

**메모리 사용량:** ~40MB

---

### 🌐 Cloudflared (Cloudflare Tunnel)

**용도:** 로컬 서비스를 공인 인터넷에 노출하기, 80/443 포트 개방 불필요

운영자의 모든 공인 서비스는 Cloudflare Tunnel을 거칩니다:

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel (반드시 Cloudflare Access 설정 필요)

**장점:**

- 원본 서버 포트를 열 필요 없음
- 자동으로 HTTPS 적용
- Access를 설정하여 인증 처리 가능

**메모리 점유율:** ~30MB

---

### 🎛️ 1Panel(Docker 관리 패널)

**용도:** 웹 인터페이스로 Docker 컨테이너 관리

초보자가 컨테이너 상태를 확인하기 좋고, 임시로 문제를 트러블슈팅할 때도 괜찮다

**보안 경고:**

- 반드시 Cloudflare Tunnel + Access를 거치거나, 최소한 리버스 프록시 HTTPS와 강력한 비밀번호를 걸어야 한다
- 이건 모든 컨테이너를 제어할 수 있다
- 절대 공용 인터넷에 생으로 노출하지 말 것

**메모리 점유율:** ~80MB

---

### 기타 보조 서비스

- **Mihomo**: 프록시 클라이언트, 프록시가 필요한 서비스에 연결 제공
- **Redis**: Search Gateway용 캐시 제공

## 현재 메모리 점유 상황(실제 데이터)

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**결론:**

- 1.6GB 메모리 중 765MB 사용, Swap은 987MB 사용 중
- 컨테이너 14개에 이 정도면 메모리 점유율은 합리적인 편
- Swap을 많이 쓴다는 건 메모리가 빠듯하다는 뜻이지만, 아직 버틸 만하다
- 더 이상 무거운 서비스를 얹지 말 것

## 2C2G에서 돌리는 걸 추천하지 않는 서비스

이런 것들은 메모리를 잡아먹거나, CPU를 태우거나, 저장 공간을 다 차지해서 2C2G로는 버티지 못한다:

### ❌ Nextcloud / OwnCloud

**비추천 이유:**

- 메모리 점유율이 높음(PHP-FPM + 데이터베이스 + Redis)
- 파일 업·다운로드가 대역폭과 IO를 많이 잡아먹음
- 대용량 파일 미리보기가 CPU를 심하게 씀
- 동기화 충돌이 잦음

**대안:**

- 가벼운 파일 동기화: Fast Note Sync(텍스트 전용으로만 적합), Syncthing
- 클라우드 스토리지: Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**비추천 이유:**

- 동영상 트랜스코딩이 CPU와 메모리를 다 잡아먹음
- 미디어 라이브러리 스캔이 IO를 심하게 소모함
- 40GB 디스크에는 영화 몇 편 들어가지도 않음

**대안:**

- 전용 NAS나 미디어 서버를 따로 구축
- 아니면 그냥 온라인 스트리밍 서비스 이용

---

### ❌ GitLab

**비추천 이유:**

- 메모리 점유율이 기본 4GB부터 시작함
- 2C2G에서는 아예 돌아가지도 않음

**대안:**

- GitHub / Gitea / Forgejo
- Gitea가 훨씬 가볍긴 하지만 그래도 512MB 이상의 메모리는 필요함

---

### ❌ Mastodon / Misskey

**비추천 이유:**

- 연합우주(Fediverse) 서버가 메모리와 데이터베이스를 많이 먹음
- 미디어 저장소가 디스크 용량을 크게 차지함

**대안:**

- 그냥 공개 인스턴스에 가입해서 계정 파기

---

### ❌ 로컬 LLM(Ollama / LM Studio)

**비추천 이유:**

- 2코어로 추론을 돌리면 인생에 회의감이 들 정도로 느림
- 1.6GB 메모리로는 쓸 만한 모델을 아예 올릴 수조차 없음

**대안:**

- 공식 학생 혜택 활용: GitHub Copilot Student, Google AI Studio 공식 무료 티어
- 학생 바우처 차감 활용: 알리바바 클라우드 백련(Bailian) 공식 LLM API
- 자세한 내용: [대학생이 공식 AI 할당량과 cc-switch로 개발 환경을 관리하는 법](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress(못 돌리는 건 아니지만 비추천)

**별로 추천하지 않는 이유:**

- PHP + MySQL 조합이 메모리를 꽤 먹음
- 플러그인을 많이 깔면 더 심해짐
- 정적 블로그(Astro / Hugo) 쪽이 성능이 훨씬 나음

**꼭 돌려야겠다면:**

- Caddy + PHP-FPM + SQLite 조합으로 구성
- 플러그인은 최소한으로만 설치
- Cloudflare CDN 연동

## 추천 학습 순서

운영자라면 이런 순서로 잡아갈 것이다:

1. **기본 설정**: [[sayori-server-01-vps-start|SSH와 보안 그룹]], [[docker-compose-minimum-start|Docker와 Compose]], 요금 알림 설정
2. **도메인과 HTTPS**: [[free-domain-and-web-community|무료 도메인]] + [[cloudflare-free-tier-developer-guide|Cloudflare DNS와 Tunnel]]
3. **핵심 서비스**: [[selfhost-vaultwarden-on-2c2g|Vaultwarden 비밀번호 금고]] + [[selfhost-ntfy-on-2c2g|ntfy 알림]] + Gatus 모니터링
4. **필요에 따라 추가**: [[fast-note-sync-on-student-server|Fast Note Sync]], 봇, 기타 도구

**한 번에 서비스를 10개씩 깔지 말자.** 하나씩 차근차근, 앞의 것이 안정적으로 돌아가는 걸 확인한 뒤에 다음 걸 추가하자

## 관련 리소스

**셀프 호스팅 서비스 탐색:**

- awesome-selfhosted: [https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**이 글에서 언급한 프로젝트:**

- Vaultwarden: [https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync: [https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy: [https://ntfy.sh/](https://ntfy.sh/)
- Gatus: [https://gatus.io/](https://gatus.io/)
- AstrBot: [https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted`는 「또 뭘 셀프 호스팅해 볼까」를 찾을 때 좋다. `awesome-cloudflare`는 「어떤 걸 VPS에 올리지 않고 Cloudflare 쪽으로 넘길 수 있을까」를 찾을 때 유용하다

개인 서버라고 해서 모든 걸 혼자 다 짊어질 필요는 없다. Cloudflare Pages, Workers, R2, Tunnel로 처리할 수 있는 일은 굳이 2GB 메모리로 끙끙대며 버티지 말자

---

## 마치며

2C2G 서버는 「개인용 상시 서비스의 출발점」으로 가장 잘 어울린다

이 서버로 할 수 있는 것:

- Linux, Docker, 리버스 프록시, 도메인, HTTPS에 익숙해지기
- 가볍지만 쓸모 있는 서비스 몇 가지 돌리기
- 백업, 모니터링, 운영 습관 기르기

할 수 없는 것:

- 무거운 서비스 돌리기
- 프로덕션 서버로 쓰기
- 전문 NAS나 미디어 서버 대체하기

하지만 이 정도면 충분하다

서버는 세팅을 끝냈다고 다 끝나는 게 아니다. 백업, 보안, 모니터링을 진지하게 신경 쓰도록 우리를 압박한다. 사실 이건 꽤 좋은 일이다

## 이어서 읽기

클라우드 서버 외에도 [[make-home-server|구형 컴퓨터를 홈 서버로 개조하기]]도 삽질해 봤는데, 거기서도 이 목록을 참고해 서비스를 골라 담을 수 있다

AI 도구에 나만의 검색 기능을 붙이고 싶다면 [[build-your-search-gateway|검색 게이트웨이의 구성과 워크플로우]]를 살펴보자. 각자 진짜 필요한 방향을 따라 계속 삽질해 나가면 된다
