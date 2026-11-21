---
title: "Cloudflare 무료 티어로 개발자가 할 수 있는 것들: 돈 안 드는 사이버 자선사업가 종합 선물 세트"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: "Cloudflare 무료 티어에서 실제로 쓸 만한 것들 정리: Pages, Workers, R2, Tunnel, Email Routing, DNS, Web Analytics, 그리고 어떤 상황에서 VPS보다 더 적합한지."
image: ""
tags:
  - 실전 튜토리얼
  - 웹사이트 구축 및 Cloudflare
  - 공식 학생 혜택
  - VPS 및 셀프 호스팅
category: "튜토리얼 및 가이드"
draft: false
lang: ko
translationKey: "posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide"
alias: ""
---

Cloudflare가 개발자 바닥에서 '사이버 자선사업가'라고 불리는 데는 다 이유가 있다.

무료 티어 제공량이 개인 개발자 입장에서는 그야말로 영양 과잉 수준이다.

이 글에서는 개발자가 쓸 만한 무료 서비스들을 한데 모아 정리해 봤다.

## 가입

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

이메일로 가입하면 끝이다. 신용카드를 등록하지 않아도 무료 티어의 대부분 기능을 쓸 수 있다(R2 같은 일부 기능은 카드를 등록해야 하지만, 할당량을 초과하지 않는 한 결제되지 않는다).

가입이 안 되면 노드를 바꾸거나 시크릿 창으로 시도해 보자.

## Cloudflare Pages

내가 제일 많이 쓰는 서비스다.

Pages를 쓰면 정적 웹사이트(HTML, CSS, JS, 또는 Astro/Next.js/Hugo 같은 프레임워크의 빌드 결과물)를 Cloudflare의 글로벌 네트워크에 배포할 수 있다.

무료 티어 제공 내역:

- 무제한 사이트 수
- 무제한 대역폭
- 월 500회 빌드
- 자동 HTTPS
- 커스텀 도메인
- 프리뷰 배포(PR마다 프리뷰 URL 생성)

개인 블로그 용도로는 사실상 제한이 없는 수준이다.

내 블로그도 Pages 위에서 돌아간다. GitHub 리포지토리에 푸시하면 GitHub Actions가 Astro를 빌드하고, 다시 Wrangler로 Pages에 업로드한다. 전체 과정이 비용 제로다.

아직 안 써봤다면:

[[astro-mizuki-blog-from-zero|Sayori Lite로 깔끔한 블로그 구축하기]]

## Cloudflare Workers

Workers는 Cloudflare의 서버리스 함수다. 짧은 JS/TS 코드를 작성해 배포하면 Cloudflare 엣지 노드에서 실행된다.

무료 티어 제공 내역:

- 일일 10만 회 요청
- 요청당 10ms CPU 시간
- 1MB 코드 크기

쓰기 좋은 용도:

- 간단한 API 만들기(예: 랜덤 문구 반환, 요청 전달, 단축 URL 서비스)
- 정적 사이트에 약간의 동적 로직 추가
- Webhook 수신기 구축
- 간단한 프록시 또는 리디렉션 처리

적합하지 않은 용도:

- 장시간 실행이 필요한 작업
- 데이터베이스가 필요한 복잡한 백엔드(D1이나 KV를 붙일 순 있지만 무료 티어 한도가 있음)
- 지속적인 WebSocket 연결이 필요한 서비스

단순히 블로그만 쓸 생각이라면 당장 Workers까지 쓸 일은 없다. 하지만 이런 게 있다는 걸 알아두면 나중에 이것저것 작은 도구를 만지작거릴 때 자주 마주치게 된다.

## Cloudflare R2

R2는 S3 API와 호환되는 오브젝트 스토리지다.

무료 티어 제공 내역:

- 10GB 스토리지
- 월 1,000만 회 Class A 작업(PUT/POST/LIST)
- 월 1,000만 회 Class B 작업(GET)
- 아웃바운드 트래픽 무료(이게 진짜 필살기다)

쓰기 좋은 용도:

- 블로그 이미지 저장소(커스텀 도메인을 연결하면 그대로 이미지 호스팅이 됨)
- 백업 파일 보관
- 정적 리소스 호스팅
- 소규모 프로젝트의 파일 업로드 스토리지

일반 OSS보다 훨씬 좋은 이유: 아웃바운드 트래픽 비용을 안 받는다. 알리바바 클라우드 OSS는 아웃바운드 트래픽에 돈이 나가지만 R2는 공짜다. 개인 블로그나 소규모 프로젝트에서는 이 차이가 꽤 크다.

R2를 활성화하려면 신용카드를 등록해야 하지만, 무료 티어 범위 내에서는 요금이 청구되지 않는다.

## Cloudflare Tunnel

Tunnel을 쓰면 내부망 서비스(예: VPS에서 127.0.0.1로만 리스닝 중인 Vaultwarden)를 외부 인터넷에 안전하게 노출할 수 있다.

작동 방식:

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

장점:

- VPS에서 80/443 포트를 열 필요가 없음
- SSL 인증서를 직접 발급받을 필요가 없음
- Cloudflare Access와 연동해 인증 레이어를 한 겹 더 씌울 수 있음
- 원본 서버 IP가 노출되지 않음

내 [[selfhost-vaultwarden-on-2c2g|Vaultwarden]], [[selfhost-ntfy-on-2c2g|ntfy]], Gatus, 1Panel 패널 모두 Tunnel을 거친다. 노트 동기화 활용법은 [[fast-note-sync-on-student-server|Fast Note Sync 튜토리얼]]에 정리해 뒀다.

무료 티어에는 Tunnel 개수 제한이 없다. Tunnel 하나로 여러 서브도메인을 돌릴 수 있다.

설치 방법은 VPS에서 `cloudflared` 데몬을 실행하는 것이다. 데몬이 외부로 먼저 연결을 맺는 방식이라 인바운드 방화벽 규칙이 필요 없다.

## Cloudflare DNS

도메인의 네임서버(NS)를 Cloudflare로 변경하면 무료 DNS 호스팅을 쓸 수 있다.

아직 도메인을 안 골랐다면 [[free-domain-and-web-community|무료 도메인과 학생 팩 도메인]]을 먼저 읽어보자.

장점:

- 글로벌 Anycast 기반의 빠른 DNS 응답 속도
- 무료 DNSSEC
- Proxy 모드와 결합해 원본 서버 IP 은닉 가능
- 깔끔한 관리 인터페이스

다른 등록기관(예: Namesilo, Porkbun, SpaceShip, 중국 내 각종 클라우드 등)에서 도메인을 샀더라도 NS만 Cloudflare로 돌려서 관리할 수 있다.

무료 도메인(예: DNSHE의 cc.cd)을 쓰는 경우라면 해당 도메인 서비스에서 NS 변경을 허용하는지 확인해야 한다. 허용하는 곳도 있고, 원래 플랫폼에서만 레코드를 추가할 수 있는 곳도 있다.

## Cloudflare Email Routing

Email Routing을 사용하면 커스텀 도메인으로 메일을 수신해 실제 이메일 주소로 포워딩할 수 있다.

예를 들면:

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

무료인 데다 메일 서버를 직접 구축할 필요도 없다.

쓰기 좋은 용도:

- 실제 메일 주소를 노출하지 않고 블로그에 연락용 이메일 남기기
- 각종 서비스 가입 시 커스텀 도메인 이메일 사용
- 메일 관련 DNS 레코드(MX, SPF, DKIM) 학습

주의: 수신 포워딩만 지원한다. 커스텀 도메인으로 메일을 발송하려면 별도 설정(예: Gmail SMTP + 별칭 설정, 또는 Resend, Mailgun, Zoho mail 같은 서비스 이용)이 필요하다.

## Cloudflare Web Analytics

JS 스크립트를 전혀 설치하지 않고도 Cloudflare에서 웹사이트의 기본 트래픽 데이터를 볼 수 있다.

대시보드의 Web Analytics에서 바로 켤 수 있다.

Google Analytics보다 훨씬 가볍다:

- 사용자 추적 없음
- 쿠키 미사용
- 추가 JS 로딩 불필요
- 프라이버시 친화적

개인 블로그라면 매일 사람이 오긴 오는지, 어디서 유입되는지, 어떤 페이지를 봤는지 정도만 확인해도 충분하다.

더 상세한 분석(예: 이벤트 추적, 퍼널, 맞춤 측정기준)이 필요하다면 나중에 Umami나 Plausible을 알아보면 된다. 하지만 시작 단계에서는 Cloudflare 기본 제공 기능만으로 차고 넘친다.

## Cloudflare Access(Zero Trust 무료 티어)

Access를 쓰면 어떤 웹 서비스든 로그인 보호막을 한 겹 씌울 수 있다.

예를 들어 `panel.example.com`에서 돌아가는 관리 패널이 있는데 아무나 접속하는 걸 원치 않는다고 하자. Access를 걸어두면 접속 시 로그인 페이지가 뜨고, 인증을 통과한 사람만 들어갈 수 있다.

무료 티어는 최대 50명의 사용자를 지원한다.

인증 방식:

- 이메일 일회용 인증 코드
- GitHub 로그인
- Google 로그인

내 1Panel 패널도 Access로 보호하고 있다. 패널 자체에 비밀번호가 걸려 있더라도 입구에서 인증을 한 번 더 거치는 편이 마음 편하다.

## 그 밖에 무료인 것들

무료지만 내가 덜 쓰는 것들:

- **D1**: Workers 옆에서 돌아가는 SQLite 데이터베이스. 무료 티어 5GB
- **KV**: 키-값 스토리지. 무료 티어에 일일 읽기/쓰기 제한이 있지만 소규모 프로젝트엔 충분함
- **Queues**: 메시지 큐
- **Images**: 이미지 변환(이건 무료 티어 한도가 꽤 빡빡함)
- **Stream**: 비디오 호스팅(무료 티어로는 사실상 쓰기 부족함)
- **Zaraz**: 서드파티 스크립트 관리

다 외울 필요는 없다. Cloudflare 무료 티어가 꽤 후하다는 것만 알아두고, 나중에 필요할 때 다시 찾아보면 된다.

## 언제 Cloudflare를 쓰지 말아야 할까

- 장시간 실행해야 하는 백그라운드 작업 → VPS 사용
- 영구적인 데이터베이스와 복잡한 쿼리 필요 → VPS 또는 관리형 데이터베이스 사용
- WebSocket 장기 연결 필요 → Workers에 제한이 있음
- 대용량 파일 처리 필요 → Workers의 메모리와 CPU에 한계가 있음
- 중국 본토 접속 속도에 민감한 경우 → Cloudflare 무료 티어가 중국 내에서는 빠르지 않을 수 있음

대원칙은 이렇다. Cloudflare에 올릴 수 있는 건 Cloudflare에 올리고, 상시 가동이 필수인 것만 VPS에 둔다. 둘은 대체 관계가 아니라 상호 보완 관계다.

## 내 활용법 요약

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

2C2G 학생용 서버는 상시 실행이 꼭 필요한 것들만 돌린다. Cloudflare로 떠넘길 수 있는 나머지는 서버가 짊어질 필요가 없다.

서버 한 대가 필요하다면 [[azure-students-100-credit-guide|Azure 일본 서버]]나 [[aliyun-student-300-voucher-guide|알리바바 클라우드 학생 쿠폰]]을 먼저 살펴본 뒤, [[docker-compose-minimum-start|Docker 입문]]과 [[2c2g-server-service-index|서비스 목록]]에 따라 자신만의 앱을 배포해 보자.

## 더 읽어보기

awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

Cloudflare 생태계의 각종 도구와 활용법을 정리해 둔 리포지토리로 스타가 14k+개나 된다. '남들은 Cloudflare로 뭘 해 먹나' 궁금하다면 여기서부터 시작하면 된다.

더 많은 외부 도구는 [[webmaster-resource-toolbox|웹마스터 리소스 목록]]에 모아두었고, 사이트를 오픈한 뒤에는 [[geoscore-2-4-guide|GeoScore]]를 함께 활용해 크롤링과 페이지 정보가 잘 갖춰졌는지 점검해 볼 수 있다.
