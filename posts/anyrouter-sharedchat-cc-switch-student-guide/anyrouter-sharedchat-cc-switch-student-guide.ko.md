---
title: "대학생을 위한 공식 AI 크레딧, AnyRouter, SharedChat 및 cc-switch 개발 환경 관리 가이드"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 12
description: "대학생을 위한 공식 AI 크레딧, AnyRouter 가입, SharedChat 크레딧 수령 및 cc-switch 설정 기록입니다. Bilibili에 올린 영상과 함께 보세요"
image: ""
tags:
  - 실전 튜토리얼
  - AI 워크플로우
  - Claude Code
  - 공식 학생 혜택
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: "posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide"

---

이 글은 영상의 텍스트 버전 보충용이며, 정식 공식 학생 AI 크레딧 연동 방법도 함께 추가했습니다.

영상은 여기 있습니다: [BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## 이것들이 각각 무엇인가요

`cc-switch`를 설정하기 전에, 연동할 수 있는 여러 크레딧 출처부터 명확히 구분해 봅시다:

- **정식 공식 크레딧**: [Zed Education](https://zed.dev/education)(학생 인증 시 1년 Student 플랜 제공, 매월 10달러 AI Agent 크레딧 및 무제한 편집 예측 포함), [阿里云百炼](https://bailian.console.aliyun.com/)(대학생 300위안 조건 없는 쿠폰으로 차감하거나 신규 무료 Token 수령 가능), [Google AI Studio](https://aistudio.google.com/)(공식 Gemini API 무료 티어), 그리고 [GitHub Student Developer Pack](https://education.github.com/pack)의 GitHub Copilot Student와 GitHub Models가 포함됩니다. 안정성이 가장 좋아서 주력으로 쓰기 딱 좋습니다.
- **AnyRouter / AgentRouter**: Claude Code / Anthropic 호환 인터페이스를 제공하는 라우팅 서비스로, 사용 가능한 API 엔드포인트와 Key를 제공하므로 Claude Code를 지원하는 도구에 입력하기만 하면 바로 쓸 수 있습니다.
- **SharedChat**: GPT / Codex 공익 크레딧 성격의 창구로, 추가 Codex 크레딧 공급원 정도로 이해하면 됩니다.
- **cc-switch**: 오픈소스 데스크톱 설정 관리 도구로, GitHub 저장소는 [farion1231/cc-switch](https://github.com/farion1231/cc-switch)이며, Claude Code, Codex, Gemini CLI 같은 도구들의 공급자(Provider) 설정을 한곳에서 편하게 전환할 수 있도록 도와줍니다.

## 공식 정식 크레딧은 어떻게 받나요

가장 안정적인 공식 주력 채널부터 먼저 세팅하고 싶다면, 이 네 가지 교육/무료 채널부터 챙기면 됩니다(전체 카테고리 학생 리소스 총정리는 [[edumails-glados-student-benefits|대학 교육용 이메일 공식 혜택 가이드]]를 참고하세요):

1. **Zed Education(매월 10달러 AI 크레딧)**: [Zed Education](https://zed.dev/education)에서 신청이 승인되면 1년간 Student 자격이 주어지며, 매달 10달러의 Agent tokens 크레딧과 무제한 편집 예측이 제공됩니다(Claude Opus 제외). 신청 조건은 GitHub 계정 가입 후 30일 이상 경과해야 하며, 학교 이메일 도메인이 [JetBrains/swot](https://github.com/JetBrains/swot) 목록에 등록되어 있어야 합니다.
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **阿里云百炼 공식 API**: [알리바바 클라우드 학생 혜택 수령 링크](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)를 통해 300위안 학생 쿠폰을 받거나, 바로 百炼 콘솔로 가서 API Key를 생성한 뒤 Base URL에 `https://dashscope.aliyuncs.com/compatible-mode/v1`를 입력합니다.
3. **Google AI Studio 공식 무료 티어**: Google 계정으로 로그인한 뒤 바로 Gemini API Key를 발급받으면, 카드를 등록하지 않아도 일일 무료 한도 내에서 Gemini 시리즈 모델을 호출할 수 있습니다.
4. **GitHub 학생 팩**: 교육용 이메일 인증 후 바로 GitHub Copilot Student를 활성화할 수 있습니다.

## AnyRouter 가입하기

공식 홈페이지: [https://anyrouter.top/](https://anyrouter.top/)

블로그 주인장의 레퍼럴(AFF) 링크, 이걸로 가입하면 양쪽 다 50달러를 받습니다: [https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

가입할 때는 화면 안내대로 진행하세요. 이메일 인증 코드가 바로 오지 않을 수 있으니 몇 분 기다렸다가 재전송을 누르세요. 안 그러면 혼자 성질만 버립니다.

> [!TIP]
> EDU 이메일로 가입이 안 되는 문제가 생긴다면 바로 이 글을 보세요:
> [[#^answer1|👉 EDU 이메일 가입이 안 될 때 해결법]]

## AgentRouter도 따로 한번 살펴보세요

함께 살펴볼 만한 또 다른 창구는 AgentRouter입니다: [https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

GitHub 및 Linux Do 계정으로 가입/로그인할 수 있고, 모델 목록에서 `gpt-5.5`와 Claude 시리즈를 볼 수 있습니다. 가입이 된다면 백업용 루트로 챙겨둘 만합니다.

가입 조건은 여기에 있습니다.

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## AnyRouter API Key 생성하기

대시보드의 API 토큰 페이지로 들어가서 새 토큰을 하나 만듭니다.

이름은 아무렇게나 지어도 되지만, 알아보기 쉽게 짓는 걸 추천합니다. 예를 들면:

```text
cc-switch-anyrouter
```

보통 입력해야 하는 정보는 대략 다음과 같습니다:

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## SharedChat GPT 크레딧 수령하기

[SharedChat](https://sharedchat.cc/#/) 쪽은 해당 페이지의 이벤트 입구를 따라 진행하면 됩니다.

이곳은 원래 회원가입 없이 무료로 GPT 웹 대화를 쓸 수 있는 공익 프로젝트입니다. 운영자가 최근에 공익 Codex 프로젝트도 하나 새로 만들었는데, 매일 크레딧을 수령할 수 있습니다.

진행 과정은 대략 다음과 같습니다:

1. QQ 이메일로 [Codex 공익 사이트](https://new.sharedchat.cc/list/#/register?i=E8v44)에 가입/로그인합니다(**유료 사이트가 아닙니다**. 물론 돈을 내고 싶다면 내셔도 됩니다).
2. ![[Pasted image 20260620234009.png]]
3. 오른쪽 아래의 신청 버튼을 누르고 간단한 사유를 적으면 됩니다. 브라우저에서 통과가 안 된다고 뜨면 다른 브라우저로 바꾸거나 시크릿 모드를 켜보세요.

## cc-switch 설치하기

cc-switch 공식 저장소: [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Windows는 보통 `.msi`이나 portable zip을 받으면 됩니다. macOS는 README에 적힌 설치 방법을 참고하세요. Linux는 보통 배포판에 맞춰 deb, rpm 또는 AppImage를 선택합니다.

설치 후 실행하면 로컬 PC에 이미 설치된 AI CLI 도구들을 자동으로 감지하고 skill과 기록을 불러옵니다. 먼저 이걸로 기존 설정을 관리해도 되고, 이걸 이용해 관련 도구들을 업데이트하거나 설치할 수도 있습니다.
![[Pasted image 20260620233340.png]]

## cc-switch에 공급자 추가하기

AnyRouter나 阿里云百炼을 예로 들면 다음과 같습니다:

1. cc-switch를 엽니다.
2. Claude Code 또는 해당 도구의 공급자(Provider) 설정으로 들어갑니다.
3. 새 커스텀 공급자를 추가합니다.
4. `Aliyun-Bailian` 또는 `AnyRouter`처럼 공급자 이름을 입력합니다.
5. API Key를 입력합니다.
6. 요청 주소 / Base URL을 입력합니다.
7. 해당 플랫폼 페이지 안내에 맞춰 인터페이스 형식을 선택합니다.
8. 저장합니다.
9. 사용 / 전환 버튼을 클릭합니다.

여러 채널을 추가하려면 각각 공급자로 만든 뒤 이름을 명확하게 적어두세요:

```text
Bailian Official
AnyRouter edu
SharedChat
```

나중에 전환할 때 이름만 봐도 어떤 크레딧을 쓰고 있는지 바로 알 수 있습니다.

## cc-switch 자동 라우팅 켜기

가장 간단한 자동 라우팅 설정은 먼저 라우팅을 켠 다음, 장애 조치(Failover) 순서를 정해두는 것입니다.

설정에서 라우팅을 활성화합니다.
![[Pasted image 20260620234413.png]]

자동 장애 조치에서 여러 공급자의 순서를 배치합니다.
![[Pasted image 20260620234401.png]]

## 정상 작동 여부 확인하기

전환한 뒤에는 터미널을 껐다 다시 켜거나, 아예 새 터미널을 하나 여세요.

먼저 간단하게 물어봅니다:

```text
/init
```

정상적으로 답변이 돌아오면 그다음에 코딩 작업을 시켜보세요.

만약 에러가 난다면 다음 항목들을 확인해 보세요:

1. Key가 빠짐없이 제대로 복사되었는지
2. Base URL에 공백이 하나 더 들어갔거나 경로 일부가 빠지진 않았는지
3. cc-switch에서 실제로 사용 / 전환 버튼을 눌렀는지
4. 터미널을 껐다 다시 켰는지
5. 해당 사이트의 크레딧이 이미 다 소진된 건 아닌지
6. 모델명이 현재 대시보드에서 지원하는 모델인지

## 자주 묻는 질문

### EDU 이메일 가입이 안 될 때 해결법
높은 확률로 본인 이메일 도메인이 AnyRouter 블랙리스트에 올라가 있을 겁니다.

그래도 학교 이메일 도메인 구간 중 첫 글자를 대문자로 바꿔서 메일이 오는지 시도해 볼 수는 있습니다. 예를 들어 이메일이 `stu.xxxx.edu.cn`라면 `stu.Xxxx.edu.cn`로 바꿔서 해보는 식입니다. 가끔 발송이 되긴 하는데, 안정적으로 수신될지는 장담할 수 없습니다.

^answer1

### CPA, Sub2 연동 후 작동이 안 될 때

AnyRouter는 주로 Codex, Claude Code 같은 CLI 도구 쪽을 대상으로 합니다. CPA, Sub2 같은 곳에 물려서 쓰려면 요청 헤더를 손봐야 할 수 있는데, 아래는 제가 당시 트러블슈팅하면서 적어둔 예시입니다.

| 헤더             | 값                                                            |
| ------------- | ------------------------------------------------------------ |
| Authorization | Bearer sk-본인의api                                              |
| User-Agent    | codex_cli_rs/0.114.0(또는 실제로 존재하는 다른 버전) (Windows 10.0.26100; x86_64) |

### AnyRouter가 안 되거나 너무 느릴 때
이건 어쩔 수 없습니다. 동시에 너무 많은 사람이 몰려 쓰다 보니 안정성은 그때그때 서버 부하에 달려 있습니다. 제 경험담은 아래에 적어둡니다.
> [!NOTE]
> 이건 그냥 운에 맡겨야죠 뭐. 보통 gpt5.5가 비교적 잘 잡히는 편이고, 일단 한 번 연결되면 그럭저럭 안정적입니다. 그리고 새벽 시간대에 탑승하기가 좀 더 수월합니다.
>
> 사람이 많을 때는 대기열이 걸리니 새 세션을 열어서 hi 한 번 보내보고, 목표 모드를 켠 뒤 끊기면 복구하는 식으로 해보세요. 10분 안에는 대충 연결이 되는데, 그때도 안 붙으면 높은 확률로 설정 문제입니다.

더 많은 문제 해결법은 이 글을 참고하세요.
[Any 표 라우터 장애 해결 가이드!](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## 이어서 읽기

다른 공식 혜택들은 [[edumails-glados-student-benefits|학생 혜택 총정리]]에 모아두었고, 작성한 프로젝트를 온라인에 배포하고 싶다면 [[azure-students-100-credit-guide|Azure 일본 서버]], [[aliyun-student-300-voucher-guide|알리바바 클라우드 학생 쿠폰]]을 이어서 보세요. 정적 웹페이지라면 바로 [[astro-mizuki-blog-from-zero|Cloudflare Pages로 웹사이트 구축하기]]를 쓰면 됩니다.

모델 연동을 마친 뒤 검색 파트는 따로 [[build-your-search-gateway|Search Gateway]]로 구성해 두었고, 브라우저에서 읽기, 번역 및 API 관리를 돕는 도구들은 [[useful-browser-extensions-toolbox|플러그인 목록]]에 정리해 두었습니다.
