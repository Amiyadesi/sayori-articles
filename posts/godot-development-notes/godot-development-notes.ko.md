---
title: 개인 Godot 사용 팁과 습관
published: 2026-11-06
created: 2026-10-19
updated: 2026-11-06
lastEdited: 2026-11-06
updateCount: 0
description: 노드 참조, UID, 테마부터 타입 힌트, 프로젝트 디렉터리, 리소스 공유까지 Godot 프로젝트를 더 수정하기 쉽게 만들어 주는 소소한 습관들을 정리해 봅니다.
image: ""
tags:
  - Godot
  - 게임 개발
  - 실습 튜토리얼
category: "튜토리얼 및 가이드"
draft: false
alias: ""
lang: ko
translationKey: "posts/godot-development-notes/godot-development-notes"
---
# 계기

전에 [[godot-useful-plugins|유용한 Godot 플러그인]] 글을 정리한 적이 있는데, 이번에는 조금 더 기초적인 내용인 Godot 개발 습관에 대해 이야기해 보려고 합니다.

오늘 [GodotHub](https://godothub.com/zh)에서 [Godot 개발 경험 공유](https://pd.qq.com/s/72backvjc)라는 글을 보았는데, 거기에 적힌 내용 중 상당수가 제가 평소에 쓰고 있는 방식이더라고요. 물론 저와는 다른 부분도 조금 있었고요.

결국 운영자도 게임 개발로 시작한 만큼 제 블로그에 게임 개발 관련 글이 너무 없으면 조금 어색하기도 하니까요 (농담).

그래서 여기서는 운영자만의 Godot 사용 습관을 적어 보려고 합니다.

## %를 고유 이름으로 사용하기
![[Pasted image 20261019195911.png]]

Godot 스크립트에서 노드를 참조할 때 Ctrl이나 Alt를 누른 채 노드를 드래그해서 `@onready`이나 `@export`을 만드는 방식은 확실히 편하지만...

```gdscript
@onready var start_button: Button = $Panel/MarginContainer/VBoxContainer/StartButton
```

나중에 UI를 수정하느라 컨테이너 계층을 하나 더 추가하면 이 경로가 통째로 틀어지게 됩니다.

이럴 때 Godot의 [씬 고유 이름](https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html) 기능을 사용하면 딱 좋습니다. 씬 트리에서 노드를 마우스 우클릭하고 '고유 이름으로 액세스'를 활성화하면 노드 옆에 `%` 마크가 표시되고, 스크립트에서도 다음과 같이 짧게 쓸 수 있습니다.

```gdscript
@onready var start_button: Button = %StartButton
```

동일한 소속 씬 내에 있고 이름이 바뀌지 않는 한, 중간에 노드 계층이 추가되거나 변경되어도 이 참조를 수정할 필요가 없습니다. 씬 트리의 마크를 통해 이 노드가 스크립트에서 사용 중이라는 사실도 쉽게 알아볼 수 있죠.

여기서 말하는 '고유'란 씬 범위 내에서의 고유함을 의미하며, 노드의 `owner`에 따라 달라집니다. 예를 들어 플레이어 씬 안에 무기 씬이 다시 인스턴스화되어 있는 경우, 플레이어 스크립트가 `%Blade`를 이용해 무기 내부의 칼날을 직접 찾을 수는 없습니다. 그래서 이런 참조는 각자의 씬 내부에서 처리하도록 유지하는 편입니다.

## 리소스 참조, 프리로드(Preload), 그리고 상수

프리로드(Preload)는 설정해 둔 상태 기계(State Machine) 트리처럼 대개 동일한 씬 내에서 사용합니다.

반면 내보내기(Export) 참조는 주로 씬 간의 크로스 참조에 씁니다.

상수 리소스는 보통 자주 수정되지 않으면서도 참조하기 번거로운 것들, 가령 세이브 시스템의 데이터 클래스 같은 용도로 씁니다. 이런 건 전역 스크립트에 필요한 추상 리소스에 가깝고 로직 구현에도 반드시 필요하기 때문에...

예를 들어 포털에 목표 씬을 지정할 때 속성을 하나 내보내두면 유용합니다. 이 씬은 다른 씬에서 재사용되면서 각각 서로 다른 씬으로 이동해야 하니까요.

```gdscript
extends Area2D

@export var destination_scene: PackedScene
```

그런 다음 인스펙터(Inspector)에서 해당 씬을 드래그해서 넣어주면, 동일한 포털 씬을 여러 레벨에 배치하더라도 각각 다른 목적지를 지정할 수 있어 수정하기가 훨씬 직관적입니다.

스크립트 내에서 리소스를 고정으로 로드해야 할 때는 Godot 파일 시스템 패널에서 우클릭하여 UID를 복사한 뒤, 실제로 복사된 `uid://...`를 `preload()`의 문자열 인자로 채워넣으면 됩니다. 이렇게 하면 리소스의 위치가 이동해도 기존 파일 경로에 의존하지 않게 됩니다.

UID는 리소스의 신분(아이덴티티)을 관리하고, `%StartButton`는 씬 안의 노드 참조를 관리하므로 두 가지는 서로 다른 문제를 해결합니다.

## 테마(Theme)

![[Pasted image 20261019201052.png]]

버튼, 라벨, 패널의 공통 스타일을 모아둔 `Theme` 리소스를 먼저 생성한 뒤 인터페이스의 루트 `Control`에 적용하는 방식을 더 추천합니다. 그러면 하위 컨트롤들도 이 테마를 이어받게 되므로, 나중에 폰트를 바꾸거나 버튼 스타일을 조정하고 싶을 때 한 곳에서 집중적으로 수정할 수 있습니다.

같은 종류의 버튼이라도 일반 버튼, 확인 버튼, 삭제 버튼처럼 용도가 다를 수 있습니다. 이럴 때는 [테마 타입 변형(Theme Type Variations)](https://docs.godotengine.org/en/stable/tutorials/ui/gui_theme_type_variations.html)을 사용하면 됩니다.

1. 테마 편집기의 타입 목록 옆에 있는 더하기 버튼을 눌러 `DangerButton` 같은 타입을 만듭니다.
2. 도구 아이콘이 있는 탭으로 이동하여 기본 타입을 `Button`(으)로 설정합니다.
3. 이 변형의 색상과 스타일을 수정한 뒤, 대상 버튼의 `Theme Type Variation`에 `DangerButton`을 입력합니다.

이렇게 하면 공통 폰트와 간격은 여전히 기본 타입인 `Button`의 설정을 따르면서, 삭제 버튼은 차이가 나는 부분만 따로 관리할 수 있습니다. 만약 드롭다운 목록에 변형이 나타나지 않으면 직접 이름을 입력해도 됩니다.

개별 컨트롤에 특수한 요구사항이 있을 때 로컬 오버라이드를 사용하는 것도 당연히 가능하지만, 자주 반복되는 스타일은 테마에 넣어두는 편이 나중에 수정하기 훨씬 수월합니다.

## 타입 힌트와 문서 주석, 생각날 때마다 적어두기

GDScript는 타입을 강제하지 않지만, 변수의 타입이나 함수의 인자 및 반환 타입을 적어두면 훨씬 눈에 잘 들어오며 편집기도 더 정확한 자동 완성 및 오류 경고를 제공합니다.

```gdscript
extends Node

## 当前关卡获得的分数
var score: int = 0


## 增加分数，amount 为本次获得的分数
func add_score(amount: int) -> void:
	score += amount
```

여기서는 두 가지를 동시에 사용했습니다. `int`와 `-> void`은 타입 힌트이고, 멤버 변수 앞에 있는 `##`는 문서 주석입니다.

`var score := 0`처럼 타입을 명확하게 추론할 수 있는 작성법도 아주 유용합니다. 타입을 쓰겠다고 모든 줄을 길게 늘려 잡을 필요는 없으며, 함수의 인자, 반환값, 그리고 중요한 노드 참조는 명시적으로 작성하는 것을 선호합니다.

함수를 자동 완성할 때 자꾸 타입이 나타나지 않는다면 편집기 설정에서 `Add Type Hints`을 검색해 보세요. 해당 설정의 위치는 `Text Editor → Completion → Add Type Hints`이며, 자세한 사용법은 [정적 타이핑 문서](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/static_typing.html)에서 확인할 수 있습니다.

주석의 경우, 개인적으로 가장 적을 가치가 있는 것은 인자의 의미, 단위, 그리고 호출 조건이라고 생각합니다. 예를 들어 시간 인자가 초 단위인지 밀리초 단위인지는 시간이 지나면 자신도 잊어버리게 되므로, 이런 내용을 명확히 적어두는 것이 모든 코드 줄을 한글로 번역해 두는 것보다 훨씬 유용합니다.

`##`에 작성한 내용은 Godot의 내장 도움말에서도 인식됩니다. 내보내기 속성(Exported property) 위에 작성하면 인스펙터의 툴팁으로도 표시되므로 플러그인을 만들거나 다른 사람에게 공유할 컴포넌트를 만들 때 꽤 편리합니다. [문서 주석의 전체 작성법은 여기](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html)에 있습니다.

## 긴 조건문은 줄바꿈하기, 괄호를 우선 사용하기

여러 조건이 한 줄에 빽빽하게 들어가면 화면을 금방 초과해 버립니다. 특히 좌우로 스크립트를 두 개 동시에 열어둘 때는 더 그렇습니다.

GDScript에서는 백슬래시를 이용해 줄을 이을 수 있지만, 개인적으로는 괄호로 식을 감싸는 방식을 더 추천합니다. 이는 [공식 스타일 가이드](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_styleguide.html#format-multiline-statements-for-readability)에서 권장하는 작성법이며, 나중에 조건을 더하거나 뺄 때도 훨씬 편리합니다.

```gdscript
func can_interact(in_range: bool, target_visible: bool, dialogue_open: bool) -> bool:
	return (
			in_range
			and target_visible
			and not dialogue_open
	)
```

편집기 창에 있는 두 줄의 세로선은 각각 행 길이에 대한 소프트 및 하드 참고선입니다. 코드가 너무 길지 않은지 알려주는 용도일 뿐, 이 선을 넘었다고 실행되지 않는 것은 아닙니다. 참고선 안에 억지로 맞추겠다고 간단한 식을 이리저리 갈라놓을 필요도 없습니다.

## 파일은 씬과 기능 단위로 배치하기, 찾기 편한 게 장땡

어떤 튜토리얼에서는 파일을 `scripts`, `scenes`, `assets` 등으로 나누라고 하는데, 직관적이긴 하지만 프로젝트가 조금만 커져도 똑같은 플레이어의 씬, 스크립트, 설정을 여러 디렉터리 사이에서 번갈아 찾아야 하므로 여전히 번거롭습니다.

저는 함께 수정되는 것들을 한곳에 모아두는 방식을 더 선호합니다. 예를 들면 다음과 같습니다.

```text
res://
├── characters/
│   └── player/
│       ├── player.tscn
│       ├── player.gd
│       └── player_stats.tres
├── ui/
│   └── inventory/
│       ├── inventory.tscn
│       ├── inventory.gd
│       └── inventory_slot.tscn
├── shared/
│   ├── themes/
│   └── shaders/
└── assets/
    ├── fonts/
    └── audio/
```

플레이어 전용 파일은 `player`에 넣고, 인벤토리 인터페이스 전용 파일은 `inventory`에 넣습니다. 여러 곳에서 공통으로 쓰는 폰트, 오디오, 테마만 모아둡니다. Godot의 [프로젝트 조직 문서](https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html)에서도 관련 리소스가 씬과 최대한 가까이 위치하도록 권장하고 있습니다.

이미 사용 중인 디렉터리 구조가 손에 익었다면 그냥 쓰셔도 됩니다. 디렉터리를 정리하는 가장 가치 있는 결과는 다음 수정 작업을 할 때 소모되는 시간을 줄여주는 것이니까요.

## 서브 씬은 무슨 일이 일어났는지만 알리고, 바깥일은 상위 레이어에 맡기기

예를 들어 인벤토리 칸(Slot)이 클릭되었을 때, 아이템 ID를 담은 `item_selected` 신호를 발생시키고, 상세 정보를 표시할지 아이템을 장착할지는 인벤토리 인터페이스가 결정하게 만드는 식입니다.

만약 인벤토리 칸 혼자서 `get_parent()`을 타고 거슬러 올라가 메인 씬을 찾은 다음, 플레이어와 상세 패널을 직접 수정하려 든다면 이 칸을 다른 곳에서 재사용할 때 문제가 생기기 쉽습니다.

여기서 핵심은 서브 씬이 바깥쪽의 구체적인 구조에 덜 의존하게 만드는 것이라고 생각합니다. 씬 간의 연결과 조율은 양쪽의 관계를 잘 아는 상위 레이어에 맡기는 편이 좋습니다. 명확한 신호를 직접 연결하는 것만으로 충분하다면 전역 이벤트 시스템을 굳이 한 겹 더 씌울 필요는 없습니다.

[공식 씬 조직 문서](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html)에도 이러한 관계에 대한 예시가 많이 나와 있습니다.

## 리소스 공유와 인스턴스 변수 구분하기

이 점은 머티리얼, 테마, 커스텀 `Resource`을 다룰 때 특히 주의해야 합니다. 예를 들어 여러 캐릭터가 동일한 속성 리소스를 참조하고 있을 때 런타임에 그 안의 체력을 수정하면, 다른 캐릭터들의 체력까지 의도치 않게 같이 바뀌어 버릴 수 있습니다.

[Godot은 이미 로드된 리소스를 재사용](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html)합니다. 리소스가 씬 내부에 내장되어 있다고 해서 씬을 인스턴스화할 때마다 자동으로 독립된 복사본이 생성되는 것은 아닙니다.

특정 리소스가 각 씬 인스턴스마다 독립적으로 작동하게 만들고 싶다면 리소스의 인스펙터에서 `Local To Scene`을 설정하거나, 정말 독립된 데이터가 필요할 때 리소스를 복사하면 됩니다. 공용 텍스처, 폰트, 읽기 전용 설정은 계속 공유해도 무방합니다.

다만 '동일한 스크립트 리소스 공유'와 '스크립트 안의 모든 변수 공유'가 같은 뜻은 아닙니다. 두 노드가 같은 스크립트를 사용하더라도 일반 멤버 변수는 각자의 스크립트 인스턴스에 속합니다. 예를 들어 위의 `score`은 각자 점수를 따로 기록하며, [`static` 변수](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#static-variables)가 바로 다른 종류의 공유 의미를 가집니다.

따라서 여러 객체가 함께 변하는 현상을 마주쳤을 때는 사방에 복사 로직을 추가하기 전에, 이들이 동일한 수정 가능한 리소스를 참조하고 있는지 먼저 확인하는 편이 원인을 훨씬 더 쉽게 찾는 방법입니다.

## 소소한 팁들

### 스페이스바가 UI를 자동으로 누르지 않게 하기
![[Pasted image 20261019200301.png]]
가장 간단한 방법은 입력 맵(Input Map)에서 `ui_accept`을 찾아 그 안의 `space`을 삭제하는 것입니다. 왜냐하면 Godot의 UI 노드는 기본적으로 `ui_accept`(으)로 조작될 수 있으며, `space`이 바로 그 기본 키이기 때문입니다. 정말 간단하죠?

### 영역(Region)은 접기용, 주석은 이유 설명용

스크립트가 조금 길어질 때 `#region`와 `#endregion`를 사용하면 관련 코드를 구역별로 나눌 수 있고, 편집기에서 이 구간을 접어둘 수 있습니다. [공식 문법은 여기](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#code-regions)에 있습니다.

```gdscript
#region Score

var score: int = 0


func add_score(amount: int) -> void:
	score += amount

#endregion
```

이 두 마크의 `#` 뒤에는 공백이 없습니다. 일반 주석을 쓰는 방식과 다르며, `# region`처럼 쓰면 그냥 평범한 주석이 되어버립니다.

# 참고 및 이어보기

이 글은 텐센트 채널의 [Godot 개발 경험 공유](https://pd.qq.com/g/647545104021278691/post/B_92b3b86a5d1607001441152186786637080X60?showGuild=1&errCode=0&asideType=Full) 및 댓글의 보충 내용을 참고했으며, 관련 사용법에 대한 공식 문서 링크는 각 섹션에 첨부해 두었습니다.

유용한 플러그인들을 구경하고 싶으시다면 [[godot-useful-plugins|유용한 Godot 플러그인]] 글을 이어서 읽어보세요.
