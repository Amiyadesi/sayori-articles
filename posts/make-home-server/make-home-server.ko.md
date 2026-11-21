---
title: win7 구형 컴퓨터 개조해서 홈 서버 만든 기록
published: 2026-08-09
created: 2026-08-09
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: 집에 있던 win7 구형 컴퓨터를 리눅스 서버로 처음부터 개조하는 방법, 보고 나면 여러분도 할 수 있습니다
image: ""
tags:
  - 실습 튜토리얼
  - VPS 및 셀프 호스팅
  - Docker
  - 홈 서버
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: "posts/make-home-server/make-home-server"
---
# 계기
여름방학 때 집에 와서 가족들과 이야기를 나누다가 집에 쓸모없는 윈도우 7 구형 컴퓨터가 있다는 걸 알게 되었습니다. 그래서 겸사겸사 홈 서버를 구축해 보기로 마음먹었습니다. AI의 상세하고 단계별적인 학습 및 지도 덕분에 드디어 성공적으로 설정하고 제 tailscale 네트워크에도 편입시켰기에 기록으로 남겨둡니다.
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# 전체 기록

## 준비 단계

Ubuntu 시스템 설치용으로 쓸 최소 4GB짜리 작은 USB 메모리 하나를 준비합니다. 먼저 [Ubuntu Server 공식 홈페이지](https://ubuntu.com/download/server)에서 최신 안정 버전을 다운로드합니다. 예를 들어 블로그 주인장은 26.04 버전을 다운로드했습니다. 그런 다음 [Rufus](https://rufus.ie/)를 다운로드해 부팅용 USB를 만듭니다.
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
Rufus에서 다운로드한 우분투 이미지를 선택합니다. USB에 중요한 파일이 없는지 확인한 뒤 쓰기를 시작하고, 나머지 옵션은 기본값 그대로 둡니다. 완료되면 Ubuntu Server 26.04 LTS 설치 프로그램이 담긴 USB가 완성됩니다.

## 설치 단계
부팅하기 전에 USB를 꽂습니다. **Lenovo** 로고가 나타날 때 `F12`을 여러 번 연달아 누릅니다. 만약 안 된다면 `Fn+F12`를 시도해 볼 수 있습니다. **Boot Menu**에 진입한 후 방향키로 USB가 포함된 부팅 항목을 선택하면 USB로 부팅되어 Ubuntu 설치 과정으로 진입할 수 있습니다.

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

앞부분의 선택 사항들은 그냥 기본값대로 선택하면 됩니다. 그러다가 주인장이 여기를 선택했을 때, AI는 서드파티 드라이버를 자동으로 찾아 소리가 안 나거나 와이파이에 연결되지 않는 문제를 줄여주므로 세 번째 항목에 체크하는 것을 가장 추천했습니다.

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

그리고 이 페이지에 도달했을 때, 집에 무선 와이파이가 있다면 방향키로 두 번째 `wlp3s0`으로 이동한 뒤 Enter를 눌러 계속해서 `Edit Wifi`를 선택하고, 집의 와이파이 이름과 와이파이 비밀번호를 입력하면 됩니다. 이렇게 하면 나중에 설정이 끝났을 때 바로 인터넷에 연결된 상태가 되므로 편리합니다.

그 다음은 프록시 설정을 입력하라는 페이지가 나오는데, 따로 필요 없다면 바로 건너뛰어도 됩니다.

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

저처럼 컴퓨터 전체를 싹 갈아엎는 분들이라면 계속해서 done을 누르면 됩니다. 다음 페이지에서 컴퓨터의 요약 정보가 팝업되는데, 계속해서 done과 continue를 누르면 잠시 동안 설치가 진행됩니다 ing......

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

이 화면으로 진입한 후 서버 이름, 사용자 이름, 비밀번호를 설정할 수 있습니다. Ubuntu Server 설치 프로그램은 일반 사용자를 생성하고 그에게 `sudo` 권한을 부여합니다. 우분투는 기본적으로 `root` 계정을 잠그므로, 여기서 사용자 이름을 `root`로 입력할 필요가 없습니다. 저는 `amiya`을 사용했고, 이후 `ssh amiya@服务器地址`로 로그인하며 관리자 권한이 필요할 때만 `sudo`을 실행합니다.

여기서 설정한 호스트 이름, 사용자 이름, 비밀번호를 꼭 기억해 두세요. 비밀번호를 까먹었다고 해서 반드시 재설정해야 하는 것은 아니지만 복구 과정이 훨씬 번거로워집니다.

그런 중간에 ubuntu pro를 사용할 것인지 묻는 단계가 나오는데, 그냥 건너뛰시면 됩니다. 일반 사람들은 거의 쓸 일이 없으니까요 ㅎㅎ

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

그리고 **핵심**입니다. 우선 OpenSSH는 무조건 설치해야 합니다. 둘째로, 만약 GitHub 계정이 있고 이미 SSH 공개 키를 설정해 두었다면 GitHub 사용자 이름을 직접 입력하여 공개 키를 가져올 수 있습니다. 설치가 완료되면 동일한 로컬 네트워크 내에서 IP와 SSH 키를 통해 로그인할 수 있습니다.

공개 키가 올바르게 가져와졌는지 확인한 후, 그림에 있는 `[ ] Allow password authentication over SSH`은 체크 해제해도 됩니다. 이 옵션은 비밀번호를 이용한 SSH 로그인을 허용할지 여부를 제어합니다.

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

그런 다음 설치 프로그램이 몇 가지 흔한 서버 소프트웨어들을 나열해 줍니다. 정말로 필요하다면 스페이스바로 체크하고, 당장 필요 없다면 바로 `[ ] Allow password authentication over SSH`을 선택합니다. (역주: 원문의 `Done` 유지)

마지막으로 `Reboot Now`을 클릭한 뒤 **Please remove the installation medium, then press ENTER** 문구가 나타나면 비교적 간단합니다. USB를 뽑고 enter를 누르면 정상적으로 부팅됩니다! 만약 저 문구들이 나타나지 않는다면 화면이 까매졌을 때 뽑아버리세요. 그렇지 않으면 곧바로 윤회(재부팅 지옥)를 겪게 될 것입니다...

## 초기 설정

나중에 연결하기 편하도록 주인장은 tailscale 네트워크 구성을 선택했습니다.

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

이것들을 설치하고 나면 보통 tailscale 링크를 하나 줍니다. 메인 컴퓨터에서 본인의 tailscale 계정에 로그인하면 편리하게 내부망으로 연결할 수 있습니다!

# 후기
지금까지 이틀 넘게 구동 중인데, 기존의 astrbot과 napcat의 sayori 봇을 가정용 광랜 서버로 성공적으로 이전했습니다. 오예!

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

그리고 현재 fast note sync도 가정용 광랜 서버로 성공적으로 이전하여 제 블로그 데이터가 더 빨리 동기화되도록 만들었습니다.

> [!NOTE]
> 그리고 당장은 또 뭘 해야 할지 모르겠네요 냥. 하지만 집에 놓아둔 국내 가정용 광랜 서버라는 게 꽤 재미있습니다 냥. 직접 측정해 보니 업로드 대역폭이 약 70 Mbps이고, 2코어 4GB로도 쓸만하네요. 여기까지 보셨다면 이 가정용 소형 서버를 잘 활용할 수 있는 방법에 대해 몇 가지 조언을 남겨주세요!

## 계속 읽기

기본 세팅이 끝났다면 이어서 [[docker-compose-minimum-start|Docker 최소 입문]]을 읽어보시고, [[2c2g-server-service-index|소형 서버 서비스 목록]]에서 본인에게 쓸모 있는 서비스를 하나 골라보세요.

나중에 노트 동기화도 집으로 이전했는데, 그 과정은 [[fast-note-sync-on-student-server|Fast Note Sync]]에 정리해 두었습니다. 서비스에 도메인과 HTTPS를 설정해야 한다면 [[cloudflare-free-tier-developer-guide|Cloudflare]]를 참고하세요.
