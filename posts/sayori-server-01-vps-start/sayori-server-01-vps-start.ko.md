---
title: 난 원래 그냥 봇을 24시간 켜두고 싶었을 뿐인데, 어쩌다 보니 클라우드 서버를 샀다
published: 2026-05-25
created: 2026-05-25
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: 알리클라우드 학생 쿠폰부터 Ubuntu, SSH 키 로그인, 비표준 포트와 기본 방화벽까지, 개인 서버의 첫걸음.
image: ""
tags:
  - 실습튜토리얼
  - VPS와셀프호스팅
  - 알리클라우드
  - 공식학생혜택
category: "튜토리얼 및 가이드"
draft: false
lang: ko
translationKey: "posts/sayori-server-01-vps-start/sayori-server-01-vps-start"
---

# 시작

처음부터 뭔가 거창한 서버 시스템을 구축하려던 건 아니었다. 그냥 QQ 봇을 24시간 내내 켜두고 싶었을 뿐이다.

로컬에서 돌리려면 당연히 돌릴 수도 있다. AstrBot을 켜두고, NapCat을 띄워둔 채 서비스도 끄지 않고 네트워크도 끊기지 않게 컴퓨터를 메인 호스트처럼 쓰면 된다.

![[Pasted image 20260609215751.png]]

그래서 나는 서버라는 걸 아주 자연스럽게 이렇게 이해했다: 24시간 내내 켜져 있는, 남의 데이터센터에 처박혀 있는 컴퓨터 한 대라고 말이다.

그러다 관리자가 가난한 대학생인 관계로, 당연히 나의 AI 군단을 동원해 무료 경로를 샅샅이 뒤지게 만들었다 )

나중에 알리클라우드 학생 인증을 하면 300위안 쿠폰을 준다는 걸 알게 됐다. [학생 혜택 수령 링크](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)인데, 안 받으면 손해다.

쿠폰을 다 받고 나니 [체험판 ECS](https://free.aliyun.com)라는 것도 보였다. 이걸로 먼저 체험해 보는 걸 추천한다. 2코어 2기가(2H2G) 사양 하나면 봇을 돌리기에 딱 충분하고, 마침 딱 3개월 동안 쓸 수 있다.

![[Pasted image 20260609221047.png]]

그리고 이 300위안 쿠폰은 체험판 ECS를 연간/월간 계약 ECS로 전환하는 데 딱 쓸 수 있다. 관리자는 벌써 전환을 끝냈다!

![[Pasted image 20260609221956.png]]

이렇게 계산해 보면 대충 4년짜리 무료 서버를 날로 먹을 수 있는 셈이다.

하지만 주의할 점은, 알리클라우드의 매달 무료 트래픽이 내륙 기준으로 20GB밖에 안 되는 것 같다는 점이다. 나는 봇만 돌릴 거라 그럭저럭 충분하지만, 가급적 사용량 경고 알람을 설정해 두는 게 좋다.

## 이 머신에 처음 접속하기

서버를 사고 나니 진짜 문제가 시작됐다: 내가 이걸 어떻게 들어가지?

콘솔에서 공인 IP, root 계정, 초기 비밀번호를 하나 준다. 가장 직관적인 방법은 일단 비밀번호로 한 번 접속해 보는 거다:

```powershell
ssh root@<VPS_PUBLIC_IP>
```

처음 접속할 때 이 머신을 신뢰할 거냐고 물어보는데, IP를 잘못 입력하지 않은 게 확실하다면 `yes`를 입력하자.

하지만 이 비밀번호 로그인은 어디까지나 임시방편일 뿐이다. 본격적으로 오래 쓰려면 역시 SSH 키 로그인으로 아예 갈아타는 걸 추천한다.

비밀번호는 마치 대문 밑에 열쇠를 숨겨두는 것과 같다. 편리하긴 하지만, 공인 IP가 할당된 머신은 매일같이 온갖 곳에서 털고 다닌다. 기본 22번 포트에 비밀번호 로그인 조합은 인터넷상의 온갖 스크립트한테 "나를 좀 두들겨주세요"라고 광고하는 꼴이다.

## SSH 키 생성하기

나는 윈도우에서 작업하고 있으므로, 먼저 로컬에서 이 서버 전용으로 쓸 SSH 키를 하나 만든다:

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

그냥 엔터만 연달아 쳐서 넘어가도 된다. 만약 개인키(Private Key)에 보안을 한 겹 더 걸고 싶다면 패스프레이즈(Passphrase)를 설정하면 된다.

생성이 끝나면 파일이 두 개 나온다:

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

`.pub`가 없는 쪽이 개인키다. ~~뭐에 쓰는 물건인지 모르겠다면 나한테 보내주세요~~, 그럼 네가 쓰는 ssh에 내가 접속할 수 있으니까 😈

`.pub`가 붙은 쪽이 공개키(Public Key)인데, 이걸 서버에 올려두면 된다.

공개키 내용을 살펴보자:

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

`ssh-ed25519`부터 시작해서 맨 마지막 주석이 끝날 때까지 줄 전체를 복사한다.

## 서버에 공개키 집어넣기

아까 그 비밀번호로 로그인해 둔 SSH 창은 닫지 말고 그대로 둔 채, 서버에서 SSH 디렉터리를 준비한다:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

로컬의 `.pub`에 들어 있던 그 긴 줄 전체를 갖다 붙여넣고 저장한다.

그런 다음 권한을 수정한다:

```bash
chmod 600 ~/.ssh/authorized_keys
```

이 단계가 뭔가 쓸데없어 보이지만 엄청나게 중요하다. 권한이 너무 헐거우면 SSH가 아예 작동을 거부하고 이 열쇠를 쌩까버린다.

그다음 로컬에 SSH 에일리어스(Alias)를 하나 작성한다. 앞으로 매번 IP, 포트, 개인키 경로가 잔뜩 들어간 긴 명령어를 치지 않아도 된다.

열어보자:

```powershell
notepad $env:USERPROFILE\.ssh\config
```

내용을 적는다:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

새 터미널을 하나 열어서 테스트해 본다:

```powershell
ssh sayori
```

바로 접속된다면 키 로그인이 드디어 성공적으로 뚫린 것이다.

참고로 새 터미널을 열어서 테스트하라는 거다. 기존의 비밀번호 로그인 창은 아직 닫지 마라. 이 창이 지금은 안전벨트 같은 역할을 하니까 모든 설정을 완전히 끝내고 나서 손을 놔야 한다.

## 비밀번호를 끄고, 비표준 포트로 바꾸기

키로 로그인이 잘 되면 이제 비밀번호 로그인을 꺼버리고, 동시에 SSH를 기본 22번 포트에서 다른 곳으로 옮겨야 한다.

먼저 비표준 포트를 하나 고른다. 예를 들면:

```text
11451
```

내 걸 그냥 그대로 베껴 쓰지 마라. 1024부터 65535 사이의 숫자 중에서 다른 서비스와 충돌하지 않는 걸로 직접 골라라.

그다음 먼저 알리클라우드 ECS의 보안그룹(Security Group)으로 들어가서 이 포트를 허용해 줘야 한다. 이게 진짜 중요하다.

서버 안쪽의 UFW는 문 하나고, 알리클라우드 보안그룹도 문 하나다. 서버 안쪽만 바꾸고 보안그룹을 안 바꾸면 새 포트로 똑같이 들어올 수가 없다.

보안그룹에서 포트를 열어줬다면 다시 SSH 창으로 돌아와서 나만의 SSH 설정 조각을 작성한다:

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

내용:

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

여기서 `PermitRootLogin prohibit-password`의 의미는 root 계정이 여전히 키 로그인으로는 들어올 수 있지만, 비밀번호로는 절대 못 들어오게 막는다는 뜻이다.

더 엄격하게 하려면 아예 일반 사용자를 새로 만들고 root를 막아버리는 게 맞다. 다만 내 이 글에서는 일단 가장 빨리 써먹을 수 있는 방식을 먼저 다룬다.

수정이 끝나면 먼저 SSH 설정에 문법 오류가 없는지 검사한다:

```bash
sshd -t
```

아무 출력도 안 나오는 게 가장 좋은 소식이다.

그다음 SSH 서비스를 재시작한다:

```bash
systemctl restart ssh
```

지금 예전 창을 닫으면 절대 안 된다!

로컬 `~/.ssh/config`에 적어둔 포트 번호도 마저 고친다:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

이제 세 번째로 새 터미널을 열어서 테스트해 본다:

```powershell
ssh sayori
```

접속이 성공해야만 새 포트, 키 로그인, 보안그룹 설정이 전부 제대로 먹힌 거다.

나는 옛날 방식의 비밀번호 로그인이 정말로 차단되었는지 한 번 더 테스트해 본다. 예를 들어 개인키를 쓰지 않고 수동으로 IP에 붙어보는 식이다.

만약 여전히 비밀번호를 물어보고 안으로 들여보내 준다면 `PasswordAuthentication no` 설정이 제대로 적용되지 않은 거니까, 조급하게 넘어가지 말고 이걸 먼저 해결해라.

## 방화벽 설정하기

SSH가 안정적으로 굳어졌다면 이제 서버 자체의 방화벽을 세팅한다.

Ubuntu에서 가장 손에 익은 건 역시 UFW다:

```bash
apt update
apt install -y ufw
```

규칙을 먼저 예쁘게 적어둔다:

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

만약 웹 서비스(Web Service)를 띄울 준비를 하고 있다면 HTTP / HTTPS를 미리 열어둘 수 있다:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

그다음 방화벽을 활성화한다:

```bash
ufw enable
ufw status verbose
```

여기서도 역시 예전 SSH 창을 켜두는 걸 추천한다. 새 터미널을 열어서 다시 한 번 접속해 본다:

```powershell
ssh sayori
```

접속이 잘 되면 그때 예전 창을 닫아라.

## 접속하고 나면 일단 머신을 훑어보기

연결이 완전히 안정화되면 일단 머신 상태를 한 번 쓱 봐준다:

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

2코어 2기가 메모리는 덩치가 크지 않아서 나중에 서비스를 고를 때 거의 다 가벼운 녀석들 위주로 가야 한다.

데이터베이스는 안 써도 되면 안 쓰고, SQLite를 쓸 수 있다면 일단 SQLite를 쓰고, Cloudflare Pages에 던져둘 수 있는 건 VPS에 올리지 않는 게 상책이다.

이 머신 위에는 나중에 봇뿐만 아니라 Vaultwarden, ntfy, Gatus, Portainer, AI Search Gateway까지 온갖 것들이 여기서 자라났다.

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/), 여기에 서버를 어떻게 기깔나게 써먹을 수 있는지 보여주는 아주 훌륭한 awesome 시리즈 사이트가 있다!

돌이키 생각해 보면, 개인 서버에서 가장 쓸모 있는 건 특정 서비스 그 자체라기보다는 네트워크, 배포, 보안, 백업 같은 개념들을 뼈저리게 이해하도록 강제한다는 점이다.

만약 다시 처음으로 돌아간다면, 나는 아래 습관들을 훨씬 더 일찍 들였을 것 같다:

1. 서비스마다 디렉터리를 딱딱 따로 파기
2. 진짜 비밀 키는 `.env`나 플랫폼 Secret에만 박아두기
3. 복붙 가능한 명령어는 전부 문서화해 두기
4. 배포가 끝날 때마다 검증용 명령어 하나씩 남겨두기

이번 글은 여기까지다. 서버는 이제 SSH로 안정적으로 접속할 수 있고, 비밀번호 로그인은 닫았고, 포트도 바꿨으며, 방화벽도 가장 기본적인 경계선이 생겼다.

다음 글에서는 `scp`을 사용해서 로컬 설정을 원격 호스트로 어떻게 통째로 이사시키는지 다룰 예정이다.

즉, 드디어 봇을 "내 컴퓨터에서 돌아간다" 상태에서 "서버에서도 돌아간다" 상태로 본격적으로 옮기기 시작할 시점이다.

## 계속 읽기

아직 머신을 고르지 않았다면 [[aliyun-student-300-voucher-guide|알리클라우드 학생 쿠폰]]이나 [[azure-students-100-credit-guide|Azure 일본 서버]]를 먼저 살펴보자. 접속하고 나서는 [[docker-compose-minimum-start|Docker 입문]] → [[2c2g-server-service-index|서비스 목록]] 순으로 쭉 따라 내려가며 자기가 쓸 줄 아는 서비스를 하나씩 골라 잡아 깔면 된다.
