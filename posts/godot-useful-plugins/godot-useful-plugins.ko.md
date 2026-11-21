---
title: 很有用的Godot插件
published: 2026-07-03
created: 2026-07-03
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 2
description: ""
image: ""
tags:
  - 2026夏
  - 工具记录
  - Godot
  - 游戏开发
category: "개인 기록"
draft: false
alias: ""
lang: ko
translationKey: "posts/godot-useful-plugins/godot-useful-plugins"
---

# 시작
기존 게임 개발을 다시 이어 나가기로 한 이상, 개발에 들어가기 전에 손에 쥘 장비부터 점검해 봐야겠다! 내 프로젝트에서 자주 쓰는 플러그인들을 정리해서 여기에 남겨둔다. [Godot Asset Store](https://store.godotengine.org/)는 현재 공식 최신 플러그인 스토어로, 여기서도 유용한 플러그인을 많이 찾을 수 있다. 그리고 국내 Godot 커뮤니티인 [开源项目 - GodotHub](https://godothub.com/oss)도 추가해 두는데, 여기에는 탭탭(taptap) 및 위챗·더유(微信抖音) 미니 게임을 지원하는 플러그인도 있다.

# DialogueManager
[nathanhoad/godot_dialogue_manager: A powerful nonlinear dialogue system for Godot](https://github.com/nathanhoad/godot_dialogue_manager)는 내가 가장 즐겨 쓰는 대화 플러그인이다. [dialogic-godot/dialogic: 💬 Create Dialogs, Visual Novels, RPGs, and manage Characters with Godot to create your Game!](https://github.com/dialogic-godot/dialogic)나 국내 GodotHub의 [Konado](https://godothub.com/oss/konado/zh/2.4/) 같은 다른 훌륭한 플러그인들도 있지만, 블로그 주인장이 가장 손에 익어 하는 건 역시 이거다. 높은 수준의 커스텀을 훨씬 간단하게 구현할 수 있기 때문이다.

# SceneManager
[m-canton/godot-scene-manager: Scene Manager Plugin for Godot.](https://github.com/m-canton/godot-scene-manager)인데, 주인장은 이 버전을 쓰고 있다. 개인적으로 꽤 쓸만하다고 느낀다. 깃허브에 스타 100개가 넘는 scene-manager 플러그인이 두 개 더 있던데 나중에 한번 살펴봐야겠다.

# RichText2
[RichTextLabel2 - Godot Asset Library](https://godotengine.org/asset-library/asset/3254)
이건 위에서 언급한 DialogueManager의 대화 기능과 함께 쓰는 게 버릇이 됐다. 아주 멋진 온갖 텍스트 효과를 만들어낼 수 있는데, 나중에 여기에 gif 움짤이라도 하나 채워 넣어야겠다.

# PhantomCamera
유령 카메라는 다소 무겁다는 점(물론 불필요한 부분을 직접 덜어내면 되지만)을 빼면 남는 건 편리함과 유용함뿐이다. [ramokz/phantom-camera: A Camera addon for Godot 4. Inspired by Cinemachine.](https://github.com/ramokz/phantom-camera), 주소는 여기 있다.

# SoundManager
FMod까지 도입할 정도는 아니지만 오디오를 더 잘 제어하고 싶다면 [nathanhoad/godot_sound_manager: A simple music and sound effect player for the Godot Engine](https://github.com/nathanhoad/godot_sound_manager)이 아주 좋은 선택이 될 것이다.

# EnhanceSaveSystem
자화자찬이지만(농담), 이건 주인장이 직접 분위기에 맞춰 인공 프로그래밍과 함께 만들어낸 세이브 플러그인이다. 내 프로젝트 전반에 널찍하게 쓰이고 있으며, 개인적으로는 훅(hook) 같은 걸 삽입하기 비교적 편하고 모듈화도 잘 된 세이브 시스템이라고 느낀다. 각종 암호화 세이브도 지원한다 [Amiyadesi/enhance_save_system](https://github.com/Amiyadesi/enhance_save_system).

# GodotSteam
[Welcome To GodotSteam - GodotSteam](https://godotsteam.com/), 이름난 그 GodotSteam 플러그인이다. 스팀에 진출하고 싶다면 이건 확실히 파고들어 봐야 할 물건이라고 할 수 있다.

# 마치며
유니티의 끊이지 않는 수상한 행보 덕분에 고도(Godot) 엔진이 최근 몇 년 사이 점점 대중화되고 있는데, 그럴 자격이 충분하다고 본다. 이 오픈소스 엔진은 오늘날의 AI 시대에도 더욱 빛을 발하는데, AI와의 궁합이 아주 좋기 때문이다. 아무튼 오픈소스의 자유로움을 좋아하거나 새로운 엔진을 한번 써보고 싶다면 고도는 분명 훌륭한 선택이다. 그리고 무언가 작품을 만들어보고 싶다면 플러그인의 힘을 적절히 빌리는 것도 당연한 일이다!

## 더 읽어보기

플러그인 외에 내 개발 과정은 [[re0：game-dev-life|다시 시작하는, 제로 베이스의 게임 개발 라이프]]에 담아두었고, 막판에 겨우 범위를 추려냈던 [[after-gmtk|GMTK 잼 회고]]도 있다.

이미 작품을 스팀에 출시할 준비를 마쳤다면 GodotSteam 뒤에 계정 생성과 정산 같은 일들이 기다리고 있는데, 그 내용은 [[steam-dev-work-01|스팀 개발자 등록 가이드]]에 적어두었다.
