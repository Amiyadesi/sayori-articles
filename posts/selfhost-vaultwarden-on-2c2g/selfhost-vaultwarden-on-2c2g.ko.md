---
title: "2C2G 학생 서버에 Vaultwarden 구축하기: 비밀번호 금고를 벌거벗겨 두지 마세요"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: Docker Compose를 사용하여 학생 서버에 Vaultwarden을 배포하고, HTTPS, 회원가입 차단, 백업, 복구 리허설 등 정말 중요한 부분들을 깔끔하게 설명합니다.
image: ""
tags:
  - 실습 튜토리얼
  - VPS 및 셀프 호스팅
  - Docker
  - Vaultwarden
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: "posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g"
---

Vaultwarden은 아마도 2C2G 저사양 서버에 가장 잘 어울리는 서비스 중 하나일 것입니다.

매우 가볍고 클라이언트 생태계도 성숙해서 휴대폰, PC, 브라우저 확장 프로그램까지 Bitwarden 공식 클라이언트로 바로 연결할 수 있습니다.

하지만 동시에 제가 가장 아무렇게나 대충 띄워보라고 추천하지 않는 서비스이기도 합니다.

블로그가 망가지면 다시 만들면 되지만, 비밀번호 금고에 문제가 생기면 계정, 2FA, 패널 비밀번호는 물론이고 나중에 사용할 모든 서버의 진입로까지 통째로 털리게 됩니다.

그래서 이 글에서는 거창하고 화려한 기능 대신 딱 실용적인 수준의 구성 방안을 다룹니다.

1. Docker Compose로 띄우기
2. HTTPS를 통해서만 노출하기
3. 회원가입 완료 후 즉시 회원가입 기능 닫기
4. 백업과 복구는 미루지 않기

공식 프로젝트:

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Compose 문서:

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## 어떤 사람에게 적합할까요?

이런 분들에게 추천합니다:

- 이미 자신만의 작은 서버를 가지고 있는 분
- 비밀번호 데이터를 온전히 직접 관리하고 싶은 분
- HTTPS, 백업, 업데이트 같은 귀찮은 일들을 직접 처리할 의향이 있는 분

만약 귀찮은 건 질색이라면 Bitwarden 공식 호스팅, 1Password, Apple 비밀번호 관리자 같은 서비스들이 훨씬 좋습니다.

Vaultwarden의 장점은 관리가 제로(0)라는 점이 아니라 더 가볍고, 더 자유로우며, 가난한 학생의 작은 서버에 훨씬 적합하다는 점입니다.

## 사전 준비물

- Docker를 실행할 수 있는 VPS
- 도메인, 또는 최소한 안정적인 HTTPS 진입점
- Docker 및 Docker Compose
- 기본적인 SSH, 리버스 프록시, 방화벽 지식

아직 Docker를 설치하지 않았다면 [[docker-compose-minimum-start|Docker와 Docker Compose 최소 뚝딱 입문: yml 파일 구조 이해하기]]를 먼저 참고하세요.

아직 도메인을 설정하지 않았다면 [[free-domain-and-web-community|방금 구축한 블로그에 무료 도메인을 연결하고 커뮤니티에 얼굴도장 찍기]]를 먼저 읽어보세요.

## 디렉토리 생성

여기서는 `/srv/stacks`에 생성하겠습니다.

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

디렉토리 구조는 대략 이렇습니다:

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

이후 데이터베이스와 첨부 파일 같은 모든 데이터는 `vw-data` 안에 저장됩니다.

## Compose 파일 작성

```yaml
services:
  vaultwarden:
    image: ghcr.io/dani-garcia/vaultwarden:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true"
      INVITATIONS_ALLOWED: "false"
      ENABLE_WEBSOCKET: "true"
      TZ: "Asia/Shanghai"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

`vault.example.com` 부분을 본인의 도메인으로 변경하세요.

여기서 가장 중요한 줄은 바로 이 부분입니다:

```text
127.0.0.1:8080:80
```

Vaultwarden이 오직 로컬 호스트의 `8080` 포트만 수신하도록 설정한다는 뜻입니다.

공인 IP로 곧바로 접근할 수 없으며, 반드시 Nginx, Caddy 또는 Cloudflare Tunnel을 거쳐야만 들어올 수 있습니다.

처음부터 아래처럼 작성하면 안 됩니다:

```text
0.0.0.0:8080:80
```

비밀번호 금고를 공인 네트워크 HTTP 포트에 그대로 노출시키는 건 좋은 생각이 아닙니다.

몇 가지 환경 변수를 간단히 설명하겠습니다:

- `DOMAIN`：최종적으로 실제로 접속하게 될 HTTPS 주소
- `SIGNUPS_ALLOWED`：최초 가입 시에만 임시로 켜두고, 가입이 끝나면 바로 닫아야 함
- `INVITATIONS_ALLOWED`：개인용으로 쓸 거라면 바로 끄고, 다른 사람을 초대하고 싶다면 켜기
- `ENABLE_WEBSOCKET`：켜두는 편이 클라이언트 동기화 경험이 조금 더 매끄러워짐

## 실행

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

로컬에서 상태를 확인합니다:

```bash
curl -I http://127.0.0.1:8080/
```

상태 코드가 정상적으로 반환된다면 컨테이너가 살아 있는 것입니다.

하지만 아직 끝난 게 아닙니다. 진짜 중요한 것은 HTTPS 설정이니까요.

## 리버스 프록시와 HTTPS

Vaultwarden 같은 서비스를 HTTP 환경에서 장기간 방치하면 안 됩니다.

브라우저 보안 컨텍스트, 비밀번호 관리자 클라이언트, 그리고 본인의 심리적 안정감을 위해서라도 HTTPS 설정은 반드시 올바르게 마무리해야 합니다.

보통 다음 두 가지 경로 중 하나를 선택합니다.

### 경로 A: Caddy / Nginx

도메인이 서버로 바로 연결되어 있고, 80번과 443번 포트를 열어둘 수 있는 경우에 적합합니다.

Caddy가 가장 간단합니다:

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

Caddy가 알아서 인증서를 처리해 줍니다.

Nginx를 써도 상관없으며 핵심 아이디어는 동일합니다. `https://vault.example.com` 요청을 `127.0.0.1:8080`로 토스해 주면 됩니다.

```nginx
server {
    listen 80;
    server_name vault.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vault.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        client_max_body_size 525M;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

수정 후에는 반드시 설정을 검사하세요:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 경로 B: Cloudflare Tunnel

서버 원본 주소에 80번과 443번 포트를 직접 열어두고 싶지 않다면 Tunnel이 훨씬 마음 편합니다.

구조는 다음과 같습니다:

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

저도 이 방식을 사용하고 있습니다.

그리고 웬만하면 Vaultwarden 전체에 Cloudflare Access 로그인 화면을 씌우지 않는 것이 좋습니다.

브라우저 확장 프로그램이나 모바일 앱에서 사용하기 불편해지기 때문입니다.

정말 추가 보안이 필요하다면 `/admin` 경로에만 제한적으로 보호를 적용하세요.

## 최초 가입 직후 회원가입 기능 닫기

처음으로 `https://vault.example.com`에 접속한 뒤, 먼저 자신의 메인 계정을 생성합니다.

생성이 끝나면 곧바로 설정을 변경하세요:

```yaml
SIGNUPS_ALLOWED: "false"
```

그 후 재시작합니다:

```bash
docker compose up -d
```

내 도메인이 마이너하고 인기가 없을 거라고 과신하지 마세요. 공인 네트워크의 서비스들은 결국 언젠가 스캔에 걸리기 마련입니다.

## 계정을 만든 뒤 가장 먼저 해야 할 일

- 정말 강력한 마스터 비밀번호 설정하기
- 2단계 인증(2FA) 활성화하기
- HTTPS가 정상 동작하는지 확인한 뒤에 비밀번호 가져오기(Import) 진행하기
- 가져오기 전에 기존 비밀번호 관리자에서 오프라인 백업 파일 하나 미리 내보내기

그리고 아주 현실적인 조언 하나:

서버 SSH 키, 패널 비밀번호, 각종 root 권한 인증서들을 백업 전략도 세우지 않은 비밀번호 금고에 아무렇게나 집어넣지 마세요.

먼저 제대로 구축한 다음에 차근차근 이관하는 것이 안전합니다.

## 백업

Vaultwarden의 가장 중요한 데이터는 여기에 고스란히 담겨 있습니다:

```text
/srv/stacks/vaultwarden/vw-data
```

가장 간단한 방법은 내부 백업 기능을 한 번 실행하게 만든 다음, 디렉토리 전체를 압축하는 것입니다.

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

만약 `.env`나 SMTP, 관리자 토큰 같은 설정들을 사용하고 있다면 이 파일들도 함께 백업해야 하지만, 절대 공개 저장소에 업로드하면 안 됩니다.

그 후 백업 파일을 로컬로 가져오거나 다른 기기로 동기화합니다:

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

단일 서버에만 백업 파일을 두지 마세요.

같은 서버에 저장하는 백업은 대개 백업을 안 한 것과 다름없습니다.

## 복구 리허설

백업할 줄만 알고 복구할 줄 모른다면 사실 굉장히 위험합니다.

최소한 백업 파일 안에 무언가 제대로 들어 있는지 틈틈이 확인해야 합니다:

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

정상적이라면 다음 항목들이 보여야 합니다:

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

실제로 복구를 진행할 때는 먼저 서비스를 멈추고 기존 데이터를 다른 곳으로 치워둡니다:

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

복구 후에는 최소한 다음 네 가지를 점검하세요:

- 웹페이지가 잘 열리는지
- 내 계정으로 로그인이 가능한지
- 기존 항목들이 고스란히 남아 있는지
- 브라우저 확장 프로그램과 스마트폰에서 동기화가 잘 되는지

시스템이 실제로 박살 난 뒤에야 처음으로 복구 방법을 공부하지 마세요.

## 업데이트

업데이트 전에는 반드시 백업을 먼저 하세요. 이 부분은 귀찮아하면 안 됩니다.

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

업데이트가 끝난 후에는 로그만 멍하니 보지 말고, 웹페이지와 클라이언트에 직접 들어가서 정상 동작하는지 테스트해 보세요.

## 2C2G 서버에 정말 적합할까요?

매우 적합합니다.

Vaultwarden 자체는 리소스를 거의 먹지 않기 때문에 2C2G 환경에서도 깃털처럼 가볍게 돌아갑니다.

진짜 비용은 CPU나 메모리가 아니라 관리 습관에 있습니다:

- HTTPS 유지
- 회원가입 차단
- 백업 수행
- 복구 테스트
- 업데이트 관리

본격적인 셀프 호스팅 여정을 시작하고 싶다면, 오히려 첫 번째 진지한 서비스로 삼기에 아주 훌륭한 선택입니다.

비밀번호 금고가 가져다주는 편리함은 상상 이상이며, 나만의 금고를 직접 굴려보는 것만으로도 훌륭한 배포 입문 경험이 될 것입니다.

## 더 읽어보기

비밀번호 금고의 도메인과 HTTPS는 [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]]과 연동하고, 백업 스크립트의 결과물은 [[selfhost-ntfy-on-2c2g|ntfy]]를 통해 휴대폰으로 받아보고, 기타 가벼운 서비스들은 [[2c2g-server-service-index|소형 서버 서비스 목록]]에서 확인해 보세요.
