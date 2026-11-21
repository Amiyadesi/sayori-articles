---
title: "학생 서버에서 Fast Note Sync 갖고 놀기: Obsidian에 사유 동기화 레이어 구축하기"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: 2C2G 학생 서버에서 Fast Note Sync Service를 테스트하며 Obsidian의 멀티 디바이스 동기화, 백업, REST/MCP 인터페이스를 위한 사유 경로를 마련해 봅니다.
image: ""
tags:
  - 실습 튜토리얼
  - VPS와 자체 호스팅
  - Docker
  - Obsidian
category: "튜토리얼 및 가이드"
draft: false
lang: ko
translationKey: "posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server"
alias: ""
---

현재 저는 블로그와 프로젝트 노트를 모두 Obsidian에서 작성하고 있습니다. 그런데 Obsidian을 처음에는 컴퓨터로만 쓰다가, PC에 글이 한참 쌓이고 나서야 스마트폰으로는 작성할 수 없다는 사실을 깨달았습니다. 그래서 동기화 서비스를 찾아보게 되었죠.

공식 Obsidian Sync는 당연히 속 편하겠지만 지갑이 편하진 않습니다. Syncthing, Git, WebDAV도 저마다의 활용법이 있지만 왠지 모르게 불편하더라고요.

그러다 우연히 L커뮤니티(L站) 댓글창에서 Fast Note Sync라는 플러그인을 보게 되었습니다. Obsidian 플러그인과 자체 호스팅 서버를 조합해 멀티 디바이스 실시간 동기화를 목표로 하는 툴인데, 여기에 버전 히스토리, 첨부 파일, 웹 관리, REST API, MCP 같은 기능들까지 덤으로 얹어져 있었습니다. 며칠 동안 직접 만져보며 실전 테스트를 해보니 정말 유용하더군요 b(￣▽￣)d

플러그인:

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

서버:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Obsidian 플러그인 페이지:

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## 어떤 사람에게 알맞을까요?

이런 분들에게 적합하다고 생각합니다:

- 이미 Obsidian으로 방대한 콘텐츠를 작성하고 계신 분
- 24시간 켜져 있는 작은 서버가 있으신 분
- HTTPS, 리버스 프록시, 백업 등을 직접 처리할 의향이 있으신 분
- 언제 어디서나 노트를 작성하고 싶으신 분

이렇게 세팅해 두면 컴퓨터가 곁에 없더라도 스마트폰으로 간편하게 글을 작성할 수 있고, 나중에 돌아와서 컴퓨터와 동기화만 해주면 끝납니다.

## 서버 배포하기

서버 저장소는 여기 있습니다:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Go 언어로 작성된 서버이며, 저장소 설명에는 고성능·저지연 노트 동기화, 온라인 관리 및 원격 REST API 서비스 플랫폼이라고 적혀 있네요.

저는 먼저 디렉터리를 생성합니다:

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

그런 다음 공식 문서에 따라 Docker, 바이너리, 혹은 소스 코드 컴파일 중 원하는 방식으로 배포합니다. 어떤 방식을 쓰든 서비스가 로컬 주소만 수신하도록 설정한 뒤, 리버스 프록시나 Tunnel을 통해 HTTPS로 노출하는 편입니다.

기본적인 접근 방식은 이렇습니다:

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

Docker Compose를 사용한다면 최소한 다음 습관들을 지키는 것이 좋습니다:

- 데이터 디렉터리는 현재 서비스 디렉터리에 영구 저장(볼륨 마운트)하기
- 설정 파일은 공개 저장소에 올리지 않기
- 서비스 포트를 공인망에 직접 노출하지 않기
- 업데이트하기 전에 데이터 디렉터리 백업하기

동기화 서비스 안에는 여러분의 소중한 노트가 들어 있으므로 벌거벗은 채로 방치하면 안 됩니다.

## 도메인 연결하기

Caddy나 Nginx를 써도 되고, Cloudflare Tunnel을 이용해도 됩니다.

예를 들어 도메인이 다음과 같다면:

```text
notes.example.com
```

구조는 이렇습니다:

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

아직 도메인이 없다면 먼저 다음 글을 참고해 보세요:

[[free-domain-and-web-community|방금 구축한 블로그에 무료 도메인을 연결하고 커뮤니티에 눈도장 찍기]]

다음과 같이 직접 접속하는 방식은 권장하지 않습니다:

```text
http://服务器IP:<服务端口>
```

최소한 HTTPS를 적용하고, 가능하면 접근 제어(인증 등)까지 추가하는 것이 좋습니다.

## 계정 및 플러그인 초기화

서버 README에 적힌 절차는 대략 이렇습니다:

1. 웹 관리 인터페이스 열기
2. 최초 접속 시 계정 등록
3. 백엔드에서 API 설정 복사하기
4. Obsidian 플러그인 설정에 해당 설정 붙여넣기

GitHub Releases에서 수동으로 `main.js`, `styles.css`, `manifest.json` 파일을 다운로드하여 다음 경로에 넣습니다:

```text
.obsidian/plugins/fast-note-sync/
```

그런 다음 플러그인 페이지로 가서 활성화합니다. 웹 페이지에서 토큰을 생성해 복사한 후 원격 설정에 붙여넣기만 하면 되는데, 보통 잠시 기다리면 바로 연결됩니다.

## 백업은 동기화보다 중요하다

동기화는 백업이 아닙니다.

이 문장은 따로 떼어놓고 강조해야 합니다. 동기화는 삭제한 내용도 그대로 동기화하고, 에러나 실수도 그대로 동기화해 버리거든요.

Fast Note Sync 자체적으로 히스토리 버전, 휴지통, 백업, 미러링, Git 동기화 등의 기능을 지원하긴 하지만, 여러분 스스로의 안전장치(방어선)를 반드시 마련해 두어야 합니다.

이미 Git으로 Obsidian을 동기화하고 있다면 덜컥 실시간 동기화를 그 위에 겹쳐 쌓지 마세요. 무엇이 주(Main) 동기화 수단이고 무엇이 백업인지 먼저 확실하게 정해두어야 합니다.

## MCP와 REST API는 어떻게 볼 것인가

Fast Note Sync Service는 이제 REST API와 MCP 지원도 제공합니다.

이 점이 저에게는 굉장히 매력적으로 다가왔습니다. 제 콘텐츠의 대부분이 Obsidian 안에 들어 있기 때문에, 만약 나중에 AI 클라이언트가 제어된 인터페이스를 통해 노트를 읽고 쓸 수 있게 된다면 이건 단순한 동기화 도구를 넘어 개인 지식 베이스의 입구가 될 테니까요.

하지만 이것은 동시에 위험 요소이기도 합니다.

AI가 내 노트를 읽고 쓸 수 있다는 것은 권한 경계가 더욱 명확해야 한다는 뜻입니다:

- MCP 인터페이스를 공인망에 그대로 노출하지 말 것
- 신뢰할 수 없는 클라이언트에게 쓰기 권한을 주지 말 것
- 사적인 일기, 계정 정보, 보안 키(Secret) 등을 하나의 오픈된 Vault에 마구 섞어 두지 말 것
- 중요한 Vault는 우선 읽기 전용으로 두고, 프로세스가 확실히 검증된 후에야 쓰기 권한을 고려할 것

'AI와 연동할 수 있다'는 이유만으로 곧바로 모든 권한을 활성화해선 안 됩니다.

## 2C2G 서버에서 부하가 크지 않을까?

일반적인 개인 용도라면 아마 괜찮을 겁니다.

진짜 자원을 소모하게 만드는 주범은 첨부 파일 개수, 동기화 빈도, 그리고 수십 GB에 달하는 방대한 미디어 라이브러리를 Obsidian에 통째로 때려 박았는지 여부입니다.

## 계속 읽어보기

노트 멀티 디바이스 동기화가 잘 끝났다면 그중 공개 글들을 블로그로 만드는 방법은 [[astro-mizuki-blog-from-zero|간결한 블로그 템플릿]]을 참고해 주시고, 서비스 진입점과 HTTPS에 대해서는 [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]]을, 그 외 서버 용도들은 [[2c2g-server-service-index|서비스 목록]]으로 돌아가 살펴보세요.
