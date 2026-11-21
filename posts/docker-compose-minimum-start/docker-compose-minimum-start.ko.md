---
title: "Docker와 Docker Compose 최소 입문: yml 파일 읽는 법"
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: "서버를 갓 손에 넣은 사람을 위한 Docker 최소 입문: 컨테이너란 무엇인지, Compose 파일을 어떻게 읽는지, 시작·중지·업데이트·삭제 방법까지 원리 대신 바로 쓸 수 있는 내용만 담았습니다."
image: ""
tags:
  - 실전 튜토리얼
  - Docker
  - VPS와 셀프호스팅
  - 초보 입문
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: "posts/docker-compose-minimum-start/docker-compose-minimum-start"
---

내 다른 글을 보면 셀프호스팅 서비스 거의 전부를 Docker로 돌리고 있을 거야.

Vaultwarden, ntfy, Gatus, Fast Note Sync 전부 `docker-compose.yml` 파일 하나로 끝난다.

이 글에서는 서버를 받은 뒤에 Docker를 어떻게 설치하는지, compose 파일을 어떻게 읽는지, 컨테이너를 어떻게 시작·중지·업데이트·삭제하는지 다룬다. 앞서 말한 서비스들을 전부 돌리기에는 이 정도면 충분해.

## Docker란 무엇인가 (한 줄 요약)

Docker는 남이 패키징해 둔 '이미지'로 서비스를 바로 띄우게 해 준다. 시스템에 의존성을 하나하나 직접 깔 필요가 없어.

Python, Go, Node를 수동으로 설치하고 환경 변수를 맞추고 버전 충돌을 해결할 필요 없다. 이미지 안에 다 들어 있다.

`docker-compose.yml`는 설정 파일일 뿐이고, Docker에 다음을 알려 준다:

- 어떤 이미지를 가져올지
- 어떤 포트를 쓸지
- 어떤 디렉터리를 마운트할지
- 어떤 환경 변수를 넣을지
- 오류가 났을 때 자동으로 재시작할지

## 설치

Ubuntu / Debian에 Docker 설치하기:

```bash
curl -fsSL https://get.docker.com | sh
```

이 원라이너 스크립트가 Docker Engine과 Docker Compose를 설치해 준다(지금은 compose가 Docker 하위 명령어라 `docker-compose`를 따로 깔 필요 없어).

설치 후 확인:

```bash
docker --version
docker compose version
```

`sudo` 없이 Docker를 쓰고 싶다면:

```bash
sudo usermod -aG docker $USER
```

그런 다음 로그아웃했다가 다시 로그인한다. 그래도 안 되면 서버를 재부팅하자.

## 첫 번째 compose 파일

가장 간단한 예제로 살펴보자:

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

한 줄씩 해석:

| 줄 | 의미 |
| --- | --- |
| `services:` | 아래에 서비스 목록을 정의함 |
| `whoami:` | 서비스 이름, 아무렇게나 지어도 됨 |
| `image: traefik/whoami` | 이 이미지를 사용 |
| `container_name: whoami` | 컨테이너 이름을 whoami로 지정 |
| `restart: unless-stopped` | 죽으면 자동 재시작, 직접 멈추지 않는 한 계속 살림 |
| `ports: - "127.0.0.1:8080:80"` | 호스트 8080 포트를 컨테이너 80 포트에 매핑 |

이 내용을 `docker-compose.yml`(또는 `compose.yml`, 둘 다 가능)로 저장한 뒤 같은 디렉터리에서 실행한다:

```bash
docker compose up -d
```

`-d`는 백그라운드 실행이다.

확인:

```bash
curl http://127.0.0.1:8080/
```

응답이 돌아오면 잘 돌고 있다는 뜻이야.

## 자주 쓰는 명령어

제일 자주 쓰는 것만 모아 뒀다:

```bash
# 启动（后台）
docker compose up -d

# 查看日志
docker compose logs -f

# 查看日志（只看最后 100 行）
docker compose logs --tail=100

# 停止
docker compose down

# 重启
docker compose restart

# 查看状态
docker compose ps

# 进入容器内部（排查问题时用）
docker compose exec whoami sh
```

모든 명령어는 `docker-compose.yml`가 있는 디렉터리에서 실행해야 해.

## 실제 compose 파일 읽어 보기

Vaultwarden 예시로 보자:

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

새로 나온 항목:

| 필드 | 의미 |
| --- | --- |
| `environment:` | 환경 변수, 설정 항목이라고 보면 됨 |
| `volumes: - ./vw-data:/data` | 현재 디렉터리 아래 `vw-data` 폴더를 컨테이너의 `/data`에 마운트 |

### environment

환경 변수는 대부분의 Docker 서비스가 설정을 받는 방식이다.

서비스마다 변수가 다른데, 예를 들어 Vaultwarden은 `DOMAIN`, `SIGNUPS_ALLOWED`이고, ntfy는 `NTFY_BASE_URL`, `NTFY_AUTH_DEFAULT_ACCESS` 같은 식이다.

각 프로젝트 문서를 보면 어떤 변수를 지원하는지 알 수 있어.

### volumes

volumes는 데이터 영속화의 핵심이다.

컨테이너를 지우면 컨테이너 내부 파일은 사라진다. 하지만 volumes로 마운트한 디렉터리는 호스트 머신에 있어서 컨테이너랑 같이 사라지지 않아. 마치 게임 세이브 파일 같아서 컨테이너를 띄울 때마다 세이브를 불러와 게임을 시작하는 느낌이지(웃음).

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

즉 이런 뜻이다:

- 컨테이너 안 `/data` 아래 파일은 실제로 호스트의 `./vw-data`에 저장된다
- 컨테이너를 지우고 다시 만들어도 데이터는 그대로다
- 백업할 때는 호스트의 `./vw-data`만 백업하면 된다

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1`는 로컬에서만 접속할 수 있다는 뜻이다. 외부에서는 들어올 수 없어.

`"0.0.0.0:8080:80"`나 `"8080:80"`처럼 쓰면 공인 IP로도 바로 접속된다.

비밀번호 관리자나 관리 패널 같은 건 무조건 먼저 `127.0.0.1`로 두고, 리버스 프록시나 Tunnel로 HTTPS를 열자.

## 민감한 정보는 .env 파일에 넣기

비밀번호, Token, 도메인을 `docker-compose.yml`에 바로 적어 넣고 GitHub에 올리지 말자.

같은 디렉터리에 `.env` 파일을 만든다:

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

그런 다음 compose에서 불러온다:

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

`.env` 파일은 `.gitignore`에 넣어서 저장소에 올라가지 않게 하자.

## 서비스 업데이트

서비스 업데이트하기:

```bash
cd /srv/stacks/vaultwarden

# 先备份数据
tar -czf backup-$(date +%F).tar.gz vw-data

# 拉新镜像
docker compose pull

# 用新镜像重启
docker compose up -d

# 看日志确认正常
docker compose logs --tail=50
```

업데이트 전에 먼저 백업하자. 문제 생기면 롤백할 수 있어야 하니까.

## 서비스 삭제

어떤 서비스가 더 이상 필요 없다면:

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down`는 컨테이너만 지우고 volumes 데이터는 남긴다.

volume까지 싹 정리하려면:

```bash
docker compose down -v
```

단, 이건 데이터가 지워진다. 정말 필요 없을 때만 쓰자.

## 디스크 정리

Docker를 오래 쓰면 안 쓰는 옛날 이미지가 꽤 쌓인다. 2C2G 디스크는 넉넉하지 않으니 가끔 정리해 주자:

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

`prune`는 사용 중이지 않은 것만 지워서 돌아가는 서비스엔 영향이 없다. 그래도 `--volumes`는 신중히 생각하고 쓰자.

## 내 디렉터리 구조

나는 보통 이렇게 둔다:

```text
/srv/stacks/
├── vaultwarden/
│   ├── docker-compose.yml
│   ├── .env
│   └── vw-data/
├── ntfy/
│   ├── docker-compose.yml
│   ├── .env
│   ├── cache/
│   ├── data/
│   └── etc/
├── gatus/
│   ├── docker-compose.yml
│   └── config/
└── fast-note-sync/
    ├── docker-compose.yml
    ├── .env
    └── storage/
```

서비스마다 디렉터리 하나씩. 들어가서 바로 `docker compose up -d` 하면 된다. 데이터랑 설정이 각자 폴더 안에 있으니 백업하기도 편해.

## 자주 겪는 문제

**포트 충돌**

두 서비스가 같은 호스트 포트를 쓸 수 없다. Vaultwarden이 8080을 쓰면 ntfy는 8090 같은 다른 포트로 바꿔야 해.

**권한 문제**

컨테이너 안에서 비루트 사용자로 도는 이미지가 있는데, 마운트한 디렉터리 권한이 안 맞으면 쓰기가 실패한다. 이럴 땐 호스트 디렉터리 소유자와 권한을 확인해 보자.

**-d 빼먹기**

`docker compose up`에서 `-d`를 안 붙이면 터미널을 닫을 때 서비스도 멈춘다. 꼭 `-d`를 붙이자.

**compose v1 vs v2**

옛날 튜토리얼에 나오는 `docker-compose up`(하이픈 있음)은 v1이다. 지금은 `docker compose up`(공백) 쓰는 v2가 표준이다. 새로 설치한 시스템은 다 v2니까 옛 글에 하이픈이 있으면 공백으로 바꿔 쓰면 돼.

## 이 정도면 충분해

여기까지 왔으면 이제 다음을 할 수 있다:

- Docker 설치
- compose 파일 읽기
- 서비스 시작, 중지, 업데이트, 삭제
- 데이터와 설정 관리
- 디스크 정리

앞으로 나올 셀프호스팅 글들도 `docker-compose.yml` 하나만 건네면 바로 띄울 수 있을 거야.

처음부터 Docker 개념을 전부 이해하려 들 필요 없다. 일단 돌아가게 만들고, 쓰다 보면 자연스럽게 더 궁금해질 테니까.

## 더 읽어보기

먼저 [[2c2g-server-service-index|소형 서버 서비스 목록]]에서 쓸 만한 걸 고르고, [[selfhost-ntfy-on-2c2g|ntfy 알림]], [[selfhost-vaultwarden-on-2c2g|Vaultwarden 비밀번호 관리자]], [[fast-note-sync-on-student-server|Obsidian 동기화]] 중 하나를 띄워 보자. 도메인과 진입점은 [[cloudflare-free-tier-developer-guide|Cloudflare]]에 연결하면 된다.
