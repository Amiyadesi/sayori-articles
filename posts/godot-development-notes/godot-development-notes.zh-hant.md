---
translationKey: posts/godot-development-notes/godot-development-notes
title: 個人Godot使用技巧和習慣
published: 2026-11-06
created: 2026-10-19
updated: 2026-11-06
lastEdited: 2026-11-06
updateCount: 0
description: 從節點引用、UID 和主題，到類型提示、項目目錄和資源共享，整理一些讓 Godot 項目更好改的小習慣
image: ""
tags:
  - Godot
  - 遊戲開發
  - 實操教程
category: 教程教學
draft: false
alias: ""
lang: zh-Hant
---
# 起因

之前整理過一篇 [[godot-useful-plugins|很有用的 Godot 插件]]，這次想聊點更基礎的，就是在Godot裡面開發的習慣

因為今天在[GodotHub](https://godothub.com/zh)看到了一個帖子[Godot開發經驗分享](https://pd.qq.com/s/72backvjc)，裡面很多也都是我現在在用的，不過也有一些和我不同

畢竟站長也是開發遊戲起家的，自己的博客關於遊戲開發的文章太少了也有些尷尬吧（霧

所以就在這裡寫寫站長自己的Godot使用習慣吧
## %作為唯一名稱訪問
![[Pasted image 20261019195911.png]]

當你在Godot的腳本里面引用節點的的時候，按下ctrl或者alt拖拽節點從而實現`@onready`或者`@export`的時候，固然方便，但是

```gdscript
@onready var start_button: Button = $Panel/MarginContainer/VBoxContainer/StartButton
```

後面為了調整 UI，多加一層容器，這條路徑就得跟著改

Godot 的[場景唯一名](https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html)正好可以用在這裡，在場景樹裡右鍵節點，啟用「以唯一名稱訪問」，節點旁邊就會出現一個 `%` 標記，腳本里也能簡寫成

```gdscript
@onready var start_button: Button = %StartButton
```

只要仍在同一個所屬場景內，名字也沒改，調整中間的節點層級就不需要再修改這條引用，場景樹裡的標記也能提醒自己，這個節點可能正在被腳本使用

這裡的「唯一」是場景範圍內的唯一，取決於節點的 `owner`，比如玩家場景裡又實例化了一個武器場景，玩家腳本不能直接用 `%Blade` 找到武器內部的刀刃，所以我會把這種引用留在各自的場景內部

## 資源引用和預加載和常量

預加載我一般在同一個場景內使用，比如配置好的狀態機樹

而導出引用我一般都是跨場景的引用

而常量資源通常是不經常修改同時不方便引用的東西，比如存檔系統的數據類之類的，這種就是一個全局腳本需要的抽象資源，而且邏輯實現肯定會需要這個，也就是不會

比如給一個傳送門選擇目標場景，就可以導出一個屬性，因為這個場景必然會複用在其他場景同時傳送到不同的場景

```gdscript
extends Area2D

@export var destination_scene: PackedScene
```

然後在 Inspector 裡把對應場景拖進去，同一份傳送門場景放到不同關卡，也能各自選擇目的地，改起來比較直觀

確實需要在腳本里固定加載資源時，可以從 Godot 的文件系統面板右鍵複製 UID，把實際複製出來的 `uid://...` 填進 `preload()` 的字符串參數，資源移動位置後，引用就不必依賴原來的文件路徑

UID 管的是資源身份，`%StartButton` 管的是場景裡的節點引用，它們解決的是兩件不同的事

## Theme

![[Pasted image 20261019201052.png]]

我更推薦先創建一份 `Theme` 資源，把按鈕、標籤和麵板的公共樣式放進去，再賦給界面的根 `Control`，下面的控件就能沿用這套主題，之後想換字體或者調整按鈕樣式，也有一個集中修改的地方

同一種按鈕還可以有不同用途，比如普通按鈕、確認按鈕和刪除按鈕，這種時候可以用[主題類型變體](https://docs.godotengine.org/en/stable/tutorials/ui/gui_theme_type_variations.html)

1. 在主題編輯器的類型列表旁點加號，創建一個類型，比如 `DangerButton`
2. 切到工具圖標對應的頁籤，把它的基礎類型設為 `Button`
3. 修改這個變體的顏色和樣式，再在目標按鈕的 `Theme Type Variation` 中填入 `DangerButton`

這樣公共字體和間距仍然跟著 `Button` 走，刪除按鈕只需要單獨維護它有區別的部分，如果下拉框裡沒有出現變體，也可以直接輸入名稱

單個控件確實有特殊需求時，局部覆蓋當然也可以用，只是重複出現的樣式放進主題後，後面會好改很多

## 類型提示和文檔註釋，順手寫一點

GDScript 不強制寫類型，不過變量是什麼、函數接收什麼、返回什麼，寫出來以後看著會清楚很多，編輯器也能給出更準確的補全和錯誤提示

```gdscript
extends Node

## 当前关卡获得的分数
var score: int = 0


## 增加分数，amount 为本次获得的分数
func add_score(amount: int) -> void:
	score += amount
```

這裡同時用了兩樣東西：`int` 和 `-> void` 是類型提示，成員前面的 `##` 是文檔註釋

像 `var score := 0` 這樣能明確推斷類型的寫法也很好用，不用為了寫類型把每一行都拉長，函數參數、返回值和重要的節點引用，我會更傾向於明確寫出來

如果自動補全函數時總是沒有類型，可以在編輯器設置裡搜索 `Add Type Hints`，對應位置是 `Text Editor → Completion → Add Type Hints`，具體用法可以看[靜態類型文檔](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/static_typing.html)

至於註釋，我覺得最值得寫的是參數含義、單位和調用條件，比如一個時間參數到底是秒還是毫秒，過一陣子自己都會忘，寫清楚這些比給每行代碼翻譯成中文有用

`##` 寫的內容也能被 Godot 的內置幫助識別，寫在導出屬性上時還能顯示為 Inspector 的提示，做插件或者給別人用的組件時挺方便，[文檔註釋的完整寫法在這裡](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html)

## 長條件換行，優先用括號

幾個條件擠在同一行，很快就會超出屏幕，特別是左右同時打開兩個腳本的時候

GDScript 可以用反斜槓續行，不過我更推薦用括號把表達式包起來，這是[官方風格指南](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_styleguide.html#format-multiline-statements-for-readability)推薦的寫法，後面加減條件時也更省事

```gdscript
func can_interact(in_range: bool, target_visible: bool, dialogue_open: bool) -> bool:
	return (
			in_range
			and target_visible
			and not dialogue_open
	)
```

編輯器裡那兩條豎線是行長度的軟、硬參考線，用來提醒代碼是不是寫得太長，不是超過它就不能運行，也不用為了卡在參考線以內，把一個簡單表達式拆得七零八落

## 文件按場景和功能放，找起來方便就好

在那個教程裡面，寫把文件分成 `scripts`、`scenes` 和 `assets`，雖然很直觀，不過項目大一點以後，同一個玩家的場景、腳本和配置可能就要在幾個目錄之間來回找，還是比較麻煩的

我更傾向於讓一起修改的東西放在一起，比如

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

玩家自己的東西放進 `player`，背包界面自己的東西放進 `inventory`，幾個地方都要用的字體、音頻和主題再集中放，Godot 的[項目組織文檔](https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html)也推薦讓相關資源儘量靠近場景

已有的目錄用得順手就繼續用，整理目錄最有意義的結果，是減少下次修改的時間

## 子場景說發生了什麼，外面的事交給父層

比如背包格子被點擊，它可以發出一個 `item_selected` 信號，把物品 ID 帶出去，再由背包界面決定要顯示詳情還是裝備物品

如果格子自己一路 `get_parent()` 找到主場景，然後直接修改玩家和詳情面板，換個地方複用這個格子時就容易一起出問題

這裡我覺得關鍵是讓子場景少依賴外面的具體結構，跨場景的連接和協調儘量放在知道雙方關係的父層，直接連接一個明確的信號就夠用時，也不必再套一層全局事件系統

[官方的場景組織文檔](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html)對這類關係有不少例子

## 資源共享和實例變量，要分清楚

這一點在材質、主題和自定義 `Resource` 上尤其容易遇到，比如幾個角色引用了同一份屬性資源，運行時修改裡面的血量，就可能把其他角色一起改掉

[Godot 會複用已加載的資源](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html)，資源內置在場景裡，也不代表每次實例化場景都會自動得到獨立的一份

想讓某個資源跟著場景實例各自獨立，可以在資源的 Inspector 中設置 `Local To Scene`，也可以在確實需要獨立數據的時候複製資源，公共的紋理、字體和只讀配置就繼續共享

但「共享同一份腳本資源」和「共享腳本里所有變量」不是一回事，兩個節點使用同一個腳本，普通成員變量仍屬於各自的腳本實例，比如上面的 `score` 會各自記錄分數，[`static` 變量](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#static-variables)才是另一種共享語義

所以遇到幾個對象一起變化時，先看看它們是不是引用了同一份可修改的資源，比到處加複製邏輯更容易找到原因



## 零散的小tips

### 讓空格鍵不自動按下UI
![[Pasted image 20261019200301.png]]
最簡單的就是在輸入映射裡面找到`ui_accept`然後刪除其中的`space`就可以了，至於為什麼呢，因為Godot的UI節點默認可以被`ui_accept`按動，然後`space`就是這個的默認按鍵，就是這麼簡單

### region 用來摺疊，註釋用來說明原因

腳本稍長一點時，可以用 `#region` 和 `#endregion` 給相關代碼分區，編輯器就能把這一段摺疊起來，[官方語法在這裡](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#code-regions)

```gdscript
#region Score

var score: int = 0


func add_score(amount: int) -> void:
	score += amount

#endregion
```

這兩個標記的 `#` 後面沒有空格，和普通註釋的寫法不同，寫成 `# region` 就只是普通註釋了
# 參考與繼續

這篇參考了騰訊頻道的 [Godot 開發經驗分享](https://pd.qq.com/g/647545104021278691/post/B_92b3b86a5d1607001441152186786637080X60?showGuild=1&errCode=0&asideType=Full)及評論裡的補充，相關用法的官方文檔也放在了各節裡

如果想看看一些有用的插件，可以接著看 [[godot-useful-plugins|很有用的 Godot 插件]]
