---
title: "처음부터 깔끔한 블로그 만들기: GitHub, Cloudflare Pages, 그리고 선택 사항인 Obsidian"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "Sayori Lite 완성형 템플릿을 사용해 Cloudflare Pages와 GitHub를 연결해 깔끔한 블로그를 구축합니다. 폴더별로 Markdown을 작성하면 바로 발행되며, Obsidian과 Token 발행은 모두 선택 사항입니다"
image: ""
tags:
  - 실전 튜토리얼
  - 웹사이트 구축 및 Cloudflare
  - Astro
  - Obsidian
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# 처음부터 깔끔한 블로그 만들기: GitHub, Cloudflare Pages, 그리고 선택 사항인 Obsidian

이 튜토리얼도 드디어 손볼 때가 되었습니다. 이전 버전은 Mizuki, Obsidian, 그리고 로컬 동기화 스크립트를 중심으로 작성했었는데, 정작 제 블로그는 지금의 깔끔한 모습으로 바뀐 지 오래인데 튜토리얼만 제자리에 멈춰 있었거든요. 예전 순서대로 따라 하려면 테마를 보완하고 디렉터리를 수정해야 하는 데다 플러그인과 배포 설정까지 만져야 해서, 첫 블로그 구축 튜토리얼로는 영 적절하지 않았습니다.

그래서 이번에는 바로 가져다 쓸 수 있는 완성형 템플릿으로 정리해 보았습니다. 이름은 **Sayori Lite · 나의 책상**입니다. 현재 블로그의 따뜻한 종이 색감, 올리브 그린 링크, 약간의 코랄 컬러를 그대로 살렸고, 홈 화면에는 글 목록을 바로 배치했으며 본문에는 쾌적한 읽기 여백을 남겼습니다.

이번에는 일단 사이트부터 먼저 띄워 놓고, 어떤 도구로 글을 쓸지는 나중에 고민해 봅시다. GitHub 웹페이지만으로도 글을 발행할 수 있고, Obsidian은 제가 추천하는 글쓰기 방식이긴 하지만 꼭 설치해야 하는 필수품은 아닙니다.

> 이 글은 2026년 10월 16일 기준 템플릿과 공식 문서를 바탕으로 다시 작성했습니다. 기존 글 주소와 템플릿 저장소 주소는 그대로 유지되며, 구버전 스크린샷과 PowerShell 플러그인 단계는 더 이상 적용되지 않습니다.

## 먼저 계정 두 개 준비하기

[GitHub](https://github.com/signup)와 [Cloudflare](https://dash.cloudflare.com/sign-up) 계정이 필요합니다. GitHub에는 사이트 프로그램과 글을 저장하고, Cloudflare Pages는 사이트를 빌드 및 호스팅하며 `pages.dev` 주소를 제공해 줍니다. 초기 사이트는 굳이 도메인을 먼저 살 필요가 없고, 무료 2차 도메인을 써보는 것도 방법입니다[[free-domain-and-web-community|무료 도메인과 웹마스터 커뮤니티]].

기본 경로는 다음과 같습니다:

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**이 경로에서는 Cloudflare API Token을 쓰지 않습니다.** 글을 쓸 때 별도의 발행 키를 설정할 필요가 없으며, 나중에 GitHub Actions 업로드 방식으로 바꾸고 싶을 때만 뒷부분의 Token이 필요합니다.

## 템플릿으로 내 저장소 만들기

템플릿은 여전히 아래 주소에 있습니다. 이름은 당분간 바꾸지 않았으니 예전 링크로도 계속 접속할 수 있습니다:

[Sayori Lite 템플릿 저장소](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

페이지를 연 뒤 **Use this template → Create a new repository**를 클릭하고, Owner는 본인 계정을 선택하세요. 저장소 이름은 예를 들어 `my-blog`처럼 지으면 됩니다.

이번 저장소에는 이미 완성된 Astro 사이트가 들어 있으며, 대략적인 디렉터리 구조는 다음과 같습니다:

```text
my-blog/
  articles/
    posts/
      hello-mizuki/
        index.md
        desk.svg
    spec/
      about.md
      friends.md
    templates/
      blog-post.md
  public/
    avatar.svg
    favicon.svg
  src/
  site.config.mjs
  package.json
  pnpm-lock.yaml
  .github/workflows/deploy-cloudflare-pages.yml
```

`articles/`는 글을 쓰는 디렉터리이고, `src/`는 사이트 프로그램으로, 작성한 글이 빌드에 직접 포함됩니다.

## Cloudflare와 GitHub 연결하기

Cloudflare의 **Workers & Pages**로 들어가 애플리케이션을 생성하고 **Pages**를 선택한 다음, 기존 Git 저장소 가져오기를 선택합니다. 방금 만든 저장소에만 Cloudflare 접근 권한을 허용해 주세요.



빌드 설정은 아래와 같이 입력합니다:

| 설정 | 입력 내용 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | 비워 둠 (저장소 루트 디렉터리 사용) |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| 환경 변수 `NODE_VERSION` | `22` |
| 환경 변수 `PNPM_VERSION` | `11.0.8` |
| 환경 변수 `SITE_URL` | `https://你的项目名.pages.dev` |

프로젝트 이름에 따라 초기 `pages.dev` 주소가 결정됩니다. 저장하고 배포한 뒤, 빌드가 완료되면 Cloudflare에 표시되는 주소를 열어 보세요.

Pages는 잠금 파일(lockfile)을 기준으로 의존성을 설치합니다. 만약 환경에서 pnpm을 제대로 제공하지 않는다면 템플릿 README에 고정 버전 pnpm 설치 단계가 포함된 예비 빌드 명령어도 적어 두었으니, 먼저 로그를 확인한 뒤 수정하시면 됩니다. 배포 방식 전체를 갈아엎을 필요는 없습니다.

`SITE_URL`에는 사이트 정식 주소를 입력해야 합니다. RSS, 사이트맵, canonical 태그가 모두 이 값을 사용하기 때문입니다. 나중에 개인 도메인을 연결하면 이 값도 함께 고친 뒤 다시 배포해야 하며, GitHub 저장소 주소나 관리자 페이지 주소를 넣으면 안 됩니다.

## 나만의 책상으로 꾸미기

GitHub에서 `site.config.mjs` 파일을 열고 편집 버튼을 눌러 사이트 이름, 작성자, 소개글을 본인의 것으로 바꿉니다. 프로필 이미지 파일은 `public/`에 넣고, 설정 파일에는 그에 맞는 사이트 내부 경로를 적어 주세요.

```js
export default {
  title: "我的书桌",
  author: "你的名字",
  description: "记录日常，也写一点认真整理过的东西",
  url: "",
  lang: "zh-CN",
  avatar: "/avatar.svg",
  note: "慢慢写，慢慢读",
};
```

Cloudflare에 이미 `SITE_URL`를 설정해 두었다면, 설정 파일의 `url`는 비워 두어도 됩니다. 환경 변수가 우선 적용됩니다.

소개(About) 페이지는 `articles/spec/about.md`에서, 링크(Friends) 페이지는 `articles/spec/friends.md`에서 수정할 수 있습니다. 링크 페이지에는 Markdown 링크와 소개 문구만 바로 적으면 됩니다.

템플릿에는 아카이브, 글 목차(TOC), 이미지 확대, 라이트/다크 테마, Pagefind 검색, RSS, 사이트맵 기능이 기본으로 포함되어 있으며, 본문에는 시스템 폰트를 사용합니다.

## 로컬 도구 설치 없이 첫 글 발행하기

GitHub 저장소에서 **Add file → Create new file**을 클릭하고, 파일 이름란에 아래처럼 입력합니다:

```text
articles/posts/my-first-post/index.md
```

슬래시(`/`)를 입력하면 폴더가 자동으로 만들어집니다. 본문은 우선 아래 내용을 복사해 사용해 보세요:

```md
---
title: 我的第一篇文章
description: 今天终于有了自己的博客
published: 2026-10-16
updated: 2026-10-16
draft: false
category: 日常
tags: [生活]
---

这里是第一段正文。不用重复写一级标题，页面会自动显示上面的 title

## 想记下的一件事

这里继续写
```

날짜는 실제 글을 작성한 시간에 맞춰 수정합니다. 다 썼으면 **Commit changes**를 눌러 `main` 브랜치에 커밋하세요. Cloudflare가 커밋을 감지하면 자동으로 빌드를 시작하고, 성공하면 홈 화면에서 방금 쓴 글을 볼 수 있습니다.

규칙은 아주 간단합니다. 글 하나당 폴더 하나를 만들고, 폴더 이름은 영문 소문자, 숫자, 하이픈(`-`)으로 지으며, 본문 파일 이름은 모두 `index.md`로 통일합니다. 공개 주소 `/posts/my-first-post/`는 `my-first-post`에 의해 결정되므로, 나중에 글 제목을 바꾸더라도 주소는 변하지 않지만 폴더 이름을 바꾸면 주소가 바뀝니다.

`draft: true` 상태는 초안이므로 `false`로 바꿔야만 페이지가 생성됩니다. 발행일이 미래로 설정된 글도 일시적으로 제외되며, 해당 날짜가 되었을 때 빌드를 한 번 더 트리거해 주어야 합니다. 템플릿 자체에는 예약 발행 서비스가 내장되어 있지 않습니다.

`private: true`는 제 개인 Obsidian 발행 워크플로에서 공개 동기화를 건너뛰고 글을 로컬에만 남겨 두는 용도입니다. 현재 이 독립 템플릿에서는 `draft`만으로 페이지 발행 여부를 제어합니다.

## Obsidian 사용 추천

평소 Markdown을 즐겨 쓰신다면 에디터는 아무거나 골라도 상관없습니다. 다만 주인장인 제가 Obsidian으로 글을 쓰고 있어서 Obsidian에 맞춘 워크플로가 훨씬 매끄럽게 돌아갑니다. Obsidian을 쓰고 싶다면 아래 순서대로 진행해 보세요:

0. [obsidian](https://obsidian.md/download) 다운로드
1. Git을 설치하고, 새로 만든 본인 저장소를 로컬로 클론(clone)하기
2. Obsidian에서 "폴더를 보관함으로 열기"를 선택해 `articles/`만 열지 말고 `my-blog` 루트 폴더 전체 열기
3. 템플릿에 핵심 Templates 설정이 이미 준비되어 있으며, 템플릿 디렉터리는 `articles/templates`입니다
4. `articles/posts/文章名/` 안에 `index.md` 파일을 만들고, "템플릿 삽입"을 실행해 `blog-post` 선택하기
5. 글을 다 쓴 뒤 제목, 날짜, `draft`를 수정하고 GitHub에 커밋 및 푸시하기

저장소 루트 디렉터리를 Obsidian 보관함으로 여는 이유는 Git 플러그인이 같은 계층에 있는 Git 저장소를 바로 찾을 수 있게 하기 위해서입니다. 첨부 파일은 기본적으로 현재 글 옆에 저장되며, 파일 이름이 `index.md`여도 글 제목은 속성(frontmatter)의 `title` 값으로 결정되니 신경 쓰지 않으셔도 됩니다.

Obsidian 안에서 바로 커밋하고 싶다면 커뮤니티 플러그인 마켓에서 **Vinzent**가 만든 **Git** 플러그인을 설치하세요. 플러그인 ID는 `obsidian-git`입니다.

로그인의 경우 시스템 Git의 인증 정보를 그대로 재사용하는 방법을 더 추천합니다. Windows에서 Git for Windows를 설치할 때 Git Credential Manager를 활성화하고, 저장소 디렉터리에서 처음 한 번 `git push`를 실행해 브라우저 안내에 따라 본인 GitHub 계정에 로그인하세요. 이 과정을 마치면 데스크톱 버전 Obsidian Git에서도 시스템 Git에 저장된 자격 증명을 그대로 쓸 수 있습니다.

## 로컬에서 화면 미리 보기

처음에는 웹 편집만으로도 충분히 쓸 수 있습니다. 실시간 미리보기가 필요해지면 그때 Node.js 22.12 이상 버전을 설치한 뒤, 본인 저장소 루트 디렉터리에서 아래 명령어를 실행하세요:

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

터미널에 표시되는 주소를 열면 되며, 기본값은 `http://localhost:4321`입니다. Markdown 파일을 수정하면 화면이 자동으로 새로고침됩니다.

검색 인덱스는 빌드할 때 생성되므로 검색 기능을 확인하고 싶다면 다음 명령어를 실행하세요:

```powershell
pnpm run build
pnpm preview
```

이번에는 preview 명령어가 띄워 주는 주소를 열어 확인합니다. 평소 글을 쓸 때는 문단 하나 고칠 때마다 매번 전체 빌드를 돌릴 필요는 없습니다.

## 선택 사항: Token을 사용해 GitHub Actions로 배포하기

GitHub의 모든 검사를 통과한 뒤에만 사이트를 업로드하고 싶다면 이 경로를 선택할 수 있습니다. 기본 Git 연동만으로도 충분하니, 단순히 글을 쓰기 위해서라면 굳이 한 번 더 설정할 필요는 없습니다.

먼저 이미 존재하는 Pages 프로젝트를 하나 준비합니다. 기존에 GitHub와 연결해 둔 프로젝트라면 Cloudflare의 Build 및 Branch control 설정에서 프로덕션 및 프리뷰 브랜치 자동 배포를 꺼 두어야 같은 커밋이 두 번 배포되는 일을 막을 수 있습니다.

Cloudflare에서 사용자 지정 API Token을 생성하되, 권한은 대상 계정의 **Account → Cloudflare Pages → Edit**만 선택합니다.

그런 다음 GitHub 저장소의 **Settings → Secrets and variables → Actions**로 들어가 아래 항목들을 입력합니다:

| 유형 | 이름 | 내용 |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | 방금 생성한 Pages Token |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 계정 ID |
| Variable | `CLOUDFLARE_PROJECT_NAME` | 기존 Pages 프로젝트 이름 |
| Variable | `SITE_URL` | 정식 사이트 전체 주소 |
| Variable | `CF_PAGES_DEPLOY` | `true` |

템플릿에 포함된 `.github/workflows/deploy-cloudflare-pages.yml`는 기본적으로 검사만 수행합니다. `CF_PAGES_DEPLOY`를 설정해 두었을 때만 검사를 통과한 동일한 빌드 결과물을 지정된 프로젝트로 업로드합니다.

이후에도 글 폴더에 Markdown을 작성해 `main`에 커밋하는 과정은 똑같고, 마지막 업로드를 Actions가 대신 처리한다는 점만 다릅니다. Token은 GitHub Secrets에 안전하게 보관됩니다.

## 나중에 다른 부분을 고치고 싶다면

| 수정하고 싶은 항목 | 파일 위치 |
| --- | --- |
| 사이트 이름, 작성자, 소개, 메모 | `site.config.mjs` |
| 게시글, 이미지 | `articles/posts/文章名/` |
| 소개(About) 페이지, 링크(Friends) 페이지 | `articles/spec/` |
| 새 글 템플릿 | `articles/templates/blog-post.md` |
| 프로필 이미지, 파비콘 | `public/` |
| 배색, 글자 크기, 여백 | `src/styles/global.css` |
| 내비게이션, 푸터 | `src/layouts/Base.astro` |

이 템플릿은 기본적으로 중국어 간체 글쓰기 사이트를 기준으로 구성되어 있어, 모든 글을 세 가지 언어로 동시에 올릴 필요가 없습니다. 제 개인 블로그의 3개 국어 발행 시스템과는 독립된 버전이니, 우선은 글쓰기와 발행을 단순하게 가져가세요. 나중에 꼭 필요하다는 생각이 들면 그때 댓글이나 다른 기능을 하나씩 추가하면 됩니다.

저는 여전히 블로그에서 가장 중요한 건 그 안에 담긴 콘텐츠라고 생각합니다. 그래서 지금의 저도 이 깔끔한 템플릿을 골랐고, 앞으로 더 많고 더 좋은 글을 써 내려가려 합니다.

## 이어서 읽기

사이트가 온라인에 올라갔다면 먼저 [[free-domain-and-web-community|무료 도메인]]부터 연결해 보세요. DNS, 이미지 저장소, 서비스 진입점이 궁금하다면 [[cloudflare-free-tier-developer-guide|Cloudflare 무료 플랜]]을 이어서 읽어 보시고, 스마트폰과 컴퓨터 사이에서 글을 동기화하고 싶다면 [[fast-note-sync-on-student-server|Fast Note Sync]]를 참고해 보세요.

이 깔끔한 스타일을 선택하기까지의 고민은 [[blog-style-change|블로그 개편 기록]]에 적어 두었고, 사이트 오픈 후 크롤링과 페이지 정보를 점검해 보고 싶다면 [[geoscore-2-4-guide|GeoScore 웹사이트 점검]]을 이어서 보시면 됩니다.
