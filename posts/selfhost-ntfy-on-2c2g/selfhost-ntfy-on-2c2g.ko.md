---
title: "2C2G 학생 서버에서 ntfy 돌리기: 나만의 알림 버튼 만들기"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: 학생 서버에 Docker로 ntfy 푸시 서비스를 배포하여 백업 스크립트, 모니터링, 크론 팝업 알림을 휴대폰으로 받아보세요.
image: ""
tags:
  - 실습 튜토리얼
  - VPS 및 셀프 호스팅
  - Docker
  - 푸시 알림
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: "posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g"
---

ntfy는 내 서버에서 가장 눈에 띄지 않지만 가장 유용한 서비스 중 하나다.

하는 일은 단순하다. HTTP 요청으로 메시지 하나를 보내면 스마트폰으로 푸시해 주는 일종의 푸시 파이프라인이다.

하지만 이 파이프라인의 용도는 생각보다 다양하다.

- 백업 스크립트가 끝난 뒤 성공 여부를 알려줌
- 서버 비용 경고가 트리거되었을 때 확인하라고 알려줌
- 크론 작업에 오류가 생겼을 때 알림을 보냄
- Gatus 모니터링에서 특정 서비스가 다운되었음을 알림
- 인증서 만료 임박 알림
- 원격 임시 제어를 위한 커스텀 명령 전송

공식 프로젝트:

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

공식 문서:

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## 자가 호스팅을 하는 이유

ntfy는 공식 공개 서버 `ntfy.sh`를 제공하므로 아무것도 설치하지 않고도 바로 쓸 수 있다.

그럼에도 자가 호스팅을 선택한 이유는 다음과 같다.

- 공개 서버의 topic은 누구나 볼 수 있다. 내 topic 이름을 아는 사람이면 누구나 메시지를 보낼 수 있음
- 자가 호스팅은 사용자 인증을 추가할 수 있음
- 자가 호스팅을 통해 보존 기간과 로그를 제어할 수 있음
- 학생 서버는 어차피 공간이 남고 ntfy는 매우 가벼움

잠깐 테스트만 해볼 거라면 공개 `ntfy.sh`를 써도 무방하다. 하지만 장기적으로 쓴다면 자가 호스팅이 훨씬 마음 편하다.

## 배포

디렉터리 준비:

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

`docker-compose.yml` 작성:

```yaml
services:
  ntfy:
    image: binwiederhier/ntfy
    container_name: ntfy
    restart: unless-stopped
    command: serve
    environment:
      TZ: Asia/Shanghai
      NTFY_BASE_URL: "https://ntfy.example.com"
      NTFY_AUTH_DEFAULT_ACCESS: "deny-all"
    volumes:
      - ./cache:/var/cache/ntfy
      - ./data:/var/lib/ntfy
      - ./etc:/etc/ntfy
    ports:
      - "127.0.0.1:8090:80"
```

몇 가지 핵심 포인트:

- 포트 `127.0.0.1:8090:80`: 로컬 호스트에만 바인딩함. 공인망에 직접 노출하지 말 것
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`: 기본적으로 모든 미인증 요청 거부. 오직 자신(토큰 또는 계정/비밀번호 소유자)만이 송수신할 수 있음
- `NTFY_BASE_URL`: 최종적으로 사용할 도메인 입력 (예: 나는 `ntfy.sayori.org` 사용 중)

## 실행

```bash
docker compose up -d
docker compose logs -f
```

로컬 확인:

```bash
curl http://127.0.0.1:8090/
```

ntfy 웹 인터페이스 응답이 잘 오면 성공이다.

## 계정 생성

`deny-all`를 설정했으므로 사용할 계정을 생성해야 한다.

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

비밀번호를 입력하라는 메시지가 뜬다. 이 계정과 비밀번호를 기억해 두자. 나중에 알림을 보내거나 모바일 앱을 쓸 때 필요하다.

토큰을 생성할 수도 있다.

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

토큰이 비밀번호보다 편리하며, 스크립트에서 헤더에 바로 넣어 사용할 수 있다.

## 도메인 연결

Vaultwarden과 마찬가지로 Cloudflare Tunnel 또는 Caddy/Nginx 리버스 프록시를 거친다.

Cloudflare Tunnel 경로:

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

HTTPS가 정상 접속되는 것을 확인한 후 `https://ntfy.example.com`에 접속하여 방금 만든 계정으로 웹 인터페이스에 로그인한다.

## 첫 알림 보내기

가장 간단한 방법:

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

여기서 `/test`은 topic 이름이다. `/backup`, `/alert`, `/server`처럼 마음대로 지어도 된다.

제목과 우선순위를 지정할 수도 있다.

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## 모바일 앱

Android:

- F-Droid에 ntfy 클라이언트가 있음
- Google Play에도 있음

iOS:

- App Store에서 ntfy 검색

앱 실행 후:

1. 설정에서 자가 호스팅 서버 주소 추가
2. 계정/비밀번호 또는 토큰 입력
3. 본인의 topic 구독 (예: `backup`, `alert`)

이후 서버가 보내는 알림이 휴대폰으로 팝업된다.

## 스크립트에서 활용하기

백업 스크립트 마지막 줄에 추가:

```bash
NTFY_URL="https://ntfy.example.com/backup"
NTFY_TOKEN="你的token"

# 备份成功时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ✅ 备份成功" \
     -d "Vaultwarden 备份完成 $(date +%F)" \
     "$NTFY_URL"

# 备份失败时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ❌ 备份失败" \
     -H "Priority: high" \
     -d "Vaultwarden 备份出错，请检查日志" \
     "$NTFY_URL"
```

크론 작업 실패 알림:

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## Gatus와 연동하기

헬스 체크를 위해 Gatus를 돌리고 있다면, Gatus 설정에 ntfy를 알림 채널로 추가할 수 있다.

Gatus는 ntfy 네이티브 알림을 지원하므로 설정에 서버 주소, topic, 토큰만 적어주면 된다.

이렇게 하면 특정 서비스가 다운되었을 때 Gatus가 자동으로 ntfy에 알림을 보내고 휴대폰이 울리게 된다.

## 리소스 점유

ntfy는 엄청 가볍다.

서버에서 돌려보면 평소 메모리 사용량이 대략 20~30MB 정도다. CPU는 거의 안 쓴다. 2C2G 환경에서는 부담이 전혀 없다.

데이터베이스도 필요 없다. 메시지는 로컬 파일에 캐시되며 기본적으로 일정 시간이 지나면 자동 만료된다.

## 주의 사항

- ntfy 토큰을 공개 저장소에 올리지 말 것
- `deny-all`을 설정했더라도 일부 외부 서비스(예: 동일 머신에서 발송하는 Gatus)가 인증 없이 알림을 보내야 한다면 특정 topic에 한해 권한을 열어줄 수 있음
- 메시지가 영구 보존되지는 않는다. 히스토리가 필요하다면 보내는 쪽에서 직접 로그를 남겨야 함
- ntfy 웹 인터페이스를 공인망에 노출할 필요는 없다. 모바일 앱 구독은 API만 쓰면 되니까

## 2C2G에 어울리는가?

매우 잘 어울린다. 2C2G에서 가성비가 가장 좋은 서비스 중 하나일지도 모른다.

설치하고 나면 거의 모든 스크립트의 마지막 단계가 '결과를 알림으로 보내기'로 바뀐다. 매일 SSH로 접속해서 로그를 확인하는 것보다 훨씬 편하다.

게다가 ntfy는 작은 커스텀 명령 같은 것도 지정할 수 있다. 예를 들어 블로그 댓글 검수를 ntfy로 자신에게 보내고, 삭제를 누르면 `/delete 댓글ID`, 복구를 누르면 `/recover 댓글ID`가 실행되게 하는 식이다.

## 더 읽어보기

도메인과 HTTPS는 [[free-domain-and-web-community|도메인 튜토리얼]]과 [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]]을 참고하면 된다. 알림 파이프라인이 생겼으니 [[selfhost-vaultwarden-on-2c2g|Vaultwarden]]의 백업 결과도 휴대폰으로 보낼 수 있고, 다른 용도가 궁금하다면 [[2c2g-server-service-index|서비스 목록]]으로 돌아가 골라보자.
