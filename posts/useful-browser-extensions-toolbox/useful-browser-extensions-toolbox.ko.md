---
title: "무료로 쓰기 좋은 브라우저 확장 프로그램 모음: 스크립트, 번역, 비밀번호, 배속, 유사 사이트, 프라이버시"
published: 2026-07-02
created: 2026-07-02
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: 탬퍼몽키 스크립트, 몰입형 번역, Bitwarden, Global Speed, SimilarSites, AI 보조 확장 프로그램과 프라이버시 확장 프로그램 간단 정리
image: ""
tags:
  - 2026여름
  - 툴기록
  - 브라우저확장프로그램
  - 생산성툴박스
category: "개인 기록"
draft: false
lang: ko
translationKey: "posts/useful-browser-extensions-toolbox/useful-browser-extensions-toolbox"
alias: ""
---

이 글에서는 브라우저 확장 프로그램이랑 스크립트 입구만 정리해 둡니다.

자주 쓰는 소프트웨어는 [[useful-free-software-toolbox|무료로 쓰기 좋은 소프트웨어 모음]] 참고

블로그 내 관련 글은 [[site-article-index|블로그 글 색인]] 참고

# 확장 프로그램이 뭔가요

![[Pasted image 20260703114150.png|width=560|align=center|caption=浏览器插件入口]]
오른쪽에 있는 저 퍼즐 조각 아이콘을 누르면 확장 프로그램 스토어로 가서 다운로드할 수 있어요. 브라우저 확장 프로그램은 간단히 말해서 페이지에 추가로 삽입되는 스크립트 한 조각이라 할 수 있는 일이 정말 많습니다. 그래서 출처가 불분명한 확장 프로그램은 웬만하면 받지 않는 게 좋고, 가급적 정식 스토어에 있는 걸로 고르세요. 스토어에 있는 것만 써도 충분합니다.

# AdGuard
![[Pasted image 20260703123311.png|width=520|align=center|caption=AdGuard 插件面板]]
공식 확장 프로그램 스토어에서 바로 받을 수 있는, 진짜 쓰기 좋은 광고 차단 확장 프로그램입니다. 브라우저 필수템이라고 봐도 무방하고, 한 번 깔아두면 그 뒤로는 거의 켜둔 채로 신경 안 쓰고 살면 됩니다.

# Tampermonkey
유명한 탬퍼몽키(유저 스크립트)는 굳이 길게 설명할 필요도 없죠. 일종의 확장 프로그램 속 커스텀 확장 프로그램 같은 존재입니다. [https://www.youxiaohou.com/](https://www.youxiaohou.com/), 이 사이트 안에 있는 리소스를 통해 각종 스크립트 등을 받아 쓰는 걸 추천해요. 제가 자주 쓰는 걸 하나 공유하자면 [hmjz100/LinkSwift: JavaScript 기반 클라우드 드라이브 파일 다운로드 주소 추출 도구. 【网盘直链下载助手】를 기반으로 수정되었으며 百度网盘 / 阿里云盘 / 中国移动云盘 / 天翼云盘 / 迅雷云盘 / 夸克网盘 / UC网盘 / 123云盘 8대 클라우드 드라이브 지원](https://github.com/hmjz100/LinkSwift) 이런 게 있고, 그 외에도 편한 스크립트가 엄청 많습니다. 그리고 학생 신분이라면 이걸로 할 수 있는 일도 꽤 많은데, 구체적인 건 말 안 할게요 히히

# ~~몰입형 번역~~——Read Frog🐸
![[Pasted image 20260718200848.png|width=560|align=center|caption=陪读蛙插件]]
확장 프로그램 스토어에서 찾을 수 있고, 이중 언어 번역 같은 거 할 때 엄청 쾌적합니다. 기본 내장 무료 채널만 써도 꽤 괜찮아요. 퀄리티 욕심이 좀 있다면 DeepSeek 공식 API를 충전해서 쓰거나, [[anyrouter-sharedchat-cc-switch-student-guide|공식 학생 AI 크레딧]]으로 LLM API를 물려서 번역하면 아주 오랫동안 안정적으로 쓸 수 있습니다.

최근에 Read Frog를 써봤는데, 세상에 번역이 이렇게 빠를 수도 있구나 싶더라고요! 몰입형 번역 그게 누구죠, 전 모르는 사람입니다. 저랑 Read Frog 알콩달콩 사는 데 방해하지 마세요.

# Bitwarden
![[Pasted image 20260703121438.png|width=560|align=center|caption=Bitwarden 插件]]
이것도 확장 프로그램 스토어에서 찾을 수 있습니다. 기본 기능만으로도 신원 정보, 카드 정보, 비밀번호 계정, 패스키까지 저장하고 자동 완성까지 해줘서, 인터넷 세상 굴러다니려면 거의 필수템이라고 볼 수 있어요. 일찍 접할수록 좋고, 한 번 쓰기 시작하면 못 빠져나옵니다. 좀 더 나아가서 2FA 저장까지 쓰고 싶다면 [[selfhost-vaultwarden-on-2c2g|직접 vaultwarden 구축하기]]처럼 셀프 호스팅을 하거나, [[disroot-open-services-note|Disroot 소개]] 글에 나오는 곳처럼 무료 vaultwarden을 제공하는 단체를 찾아 써보세요.

# GlobalSpeed
![[Pasted image 20260703121741.png|width=560|align=center|caption=GlobalSpeed 插件]]
마찬가지로 확장 프로그램 스토어에서 받을 수 있고, 재생 배속을 아주 편하게 조절할 수 있습니다. ~~인강 밀린 거 돌릴 때 아주 유용하죠 (흠흠)~~

# SimilarSites
![[Pasted image 20260703122818.png|width=560|align=center|caption=SimilarSites 插件]]
[Similarsites.com - Easily Explore alternative websites](https://www.similarsites.com/), 여기서 다운로드할 수 있습니다.
위에 나온 탬퍼몽키 사이트를 예로 들면, 이 확장 프로그램을 통해 비슷하고 재미있는 사이트들을 더 찾아볼 수 있어서 자료 찾고 인터넷 탐험하기가 훨씬 수월해집니다.

# WebRTC Control

:::photo-grid
![[Pasted image 20260703124657.png|caption=激活状态]]
![[Pasted image 20260703124715.png|caption=关闭状态]]
:::

~~해외망 필수템~~, 실제 IP 주소가 새는 걸 막아주고 껐다 켜기도 편해서, 끌 일이 생기면 그냥 한 번 클릭만 하면 됩니다.

# ALL API HUB
![[Pasted image 20260703123412.png|width=560|align=center|caption=ALL API HUB 插件]]
여러 new-api 사이트들을 한곳에 모아주고 자동 출석 체크랑 잔액 통계까지 잡아줘서, 드디어 매일 눈물 젖은 출첵 노가다를 안 해도 됩니다.

# Superpower Chatgpt
![[Pasted image 20260703125251.png|width=560|align=center|caption=Superpower ChatGPT 插件]]
[https://spchatgpt.com/](https://spchatgpt.com/), 사이트는 여기입니다. 이걸 깔면 Enter로 줄바꿈하고 Ctrl+Enter로 전송할 수 있게 돼요! 게다가 고급 모델 스위처를 켜서 커스텀 모델도 쓸 수 있고, 흔히 쓰는 대화 내보내기, 폴더 분류, 프롬프트 저장 같은 기능도 다 들어 있습니다.

# Voyager
![[Pasted image 20260703200044.png|width=480|align=center|caption=Voyager插件]]
위에 거랑 비슷한데 Gemini 버전이라고 보면 됩니다. 지원하는 기능도 많고 엄청 쓰기 편해요.

# End
일단은 우선 이 정도만 소개할게요. 나중에 또 쓸 만한 좋은 확장 프로그램을 찾으면 여기에도 같이 업데이트해 두겠습니다. 조금이라도 도움이 되었다면 정말 영광이에요(≧∇≦)/

## 이어서 읽기

Bitwarden을 개인 비밀번호 금고에 연결하고 싶다면 [[selfhost-vaultwarden-on-2c2g|Vaultwarden 셀프 호스팅]]을 이어서 읽어보세요. AI 도구 API와 공급자 설정은 [[anyrouter-sharedchat-cc-switch-student-guide|AI 크레딧과 cc-switch]]에 정리해 두었습니다.

광고 차단과 프라이버시 확장 프로그램 뒤단에서 실제로 무슨 일이 벌어지는지 궁금하다면 [[cross-app-tracking-device-fingerprinting|모바일 광고와 프라이버시 읽기 색인]]에 있는 원글 세 편을 확장 프로그램과 함께 대조해 보면서 이해해 보세요.
