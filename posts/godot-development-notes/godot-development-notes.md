---
title: 个人Godot使用技巧和习惯
published: 2026-11-06
created: 2026-10-19
updated: 2026-11-06
lastEdited: 2026-11-06
updateCount: 0
description: 从节点引用、UID 和主题，到类型提示、项目目录和资源共享，整理一些让 Godot 项目更好改的小习惯
image: ""
tags:
  - Godot
  - 游戏开发
  - 实操教程
category: 教程教学
draft: false
alias: ""
---
# 起因

之前整理过一篇 [[godot-useful-plugins|很有用的 Godot 插件]]，这次想聊点更基础的，就是在Godot里面开发的习惯

因为今天在[GodotHub](https://godothub.com/zh)看到了一个帖子[Godot开发经验分享](https://pd.qq.com/s/72backvjc)，里面很多也都是我现在在用的，不过也有一些和我不同

毕竟站长也是开发游戏起家的，自己的博客关于游戏开发的文章太少了也有些尴尬吧（雾

所以就在这里写写站长自己的Godot使用习惯吧
## %作为唯一名称访问
![[Pasted image 20261019195911.png]]

当你在Godot的脚本里面引用节点的的时候，按下ctrl或者alt拖拽节点从而实现`@onready`或者`@export`的时候，固然方便，但是

```gdscript
@onready var start_button: Button = $Panel/MarginContainer/VBoxContainer/StartButton
```

后面为了调整 UI，多加一层容器，这条路径就得跟着改

Godot 的[场景唯一名](https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html)正好可以用在这里，在场景树里右键节点，启用「以唯一名称访问」，节点旁边就会出现一个 `%` 标记，脚本里也能简写成

```gdscript
@onready var start_button: Button = %StartButton
```

只要仍在同一个所属场景内，名字也没改，调整中间的节点层级就不需要再修改这条引用，场景树里的标记也能提醒自己，这个节点可能正在被脚本使用

这里的「唯一」是场景范围内的唯一，取决于节点的 `owner`，比如玩家场景里又实例化了一个武器场景，玩家脚本不能直接用 `%Blade` 找到武器内部的刀刃，所以我会把这种引用留在各自的场景内部

## 资源引用和预加载和常量

预加载我一般在同一个场景内使用，比如配置好的状态机树

而导出引用我一般都是跨场景的引用

而常量资源通常是不经常修改同时不方便引用的东西，比如存档系统的数据类之类的，这种就是一个全局脚本需要的抽象资源，而且逻辑实现肯定会需要这个，也就是不会

比如给一个传送门选择目标场景，就可以导出一个属性，因为这个场景必然会复用在其他场景同时传送到不同的场景

```gdscript
extends Area2D

@export var destination_scene: PackedScene
```

然后在 Inspector 里把对应场景拖进去，同一份传送门场景放到不同关卡，也能各自选择目的地，改起来比较直观

确实需要在脚本里固定加载资源时，可以从 Godot 的文件系统面板右键复制 UID，把实际复制出来的 `uid://...` 填进 `preload()` 的字符串参数，资源移动位置后，引用就不必依赖原来的文件路径

UID 管的是资源身份，`%StartButton` 管的是场景里的节点引用，它们解决的是两件不同的事

## Theme

![[Pasted image 20261019201052.png]]

我更推荐先创建一份 `Theme` 资源，把按钮、标签和面板的公共样式放进去，再赋给界面的根 `Control`，下面的控件就能沿用这套主题，之后想换字体或者调整按钮样式，也有一个集中修改的地方

同一种按钮还可以有不同用途，比如普通按钮、确认按钮和删除按钮，这种时候可以用[主题类型变体](https://docs.godotengine.org/en/stable/tutorials/ui/gui_theme_type_variations.html)

1. 在主题编辑器的类型列表旁点加号，创建一个类型，比如 `DangerButton`
2. 切到工具图标对应的页签，把它的基础类型设为 `Button`
3. 修改这个变体的颜色和样式，再在目标按钮的 `Theme Type Variation` 中填入 `DangerButton`

这样公共字体和间距仍然跟着 `Button` 走，删除按钮只需要单独维护它有区别的部分，如果下拉框里没有出现变体，也可以直接输入名称

单个控件确实有特殊需求时，局部覆盖当然也可以用，只是重复出现的样式放进主题后，后面会好改很多

## 类型提示和文档注释，顺手写一点

GDScript 不强制写类型，不过变量是什么、函数接收什么、返回什么，写出来以后看着会清楚很多，编辑器也能给出更准确的补全和错误提示

```gdscript
extends Node

## 当前关卡获得的分数
var score: int = 0


## 增加分数，amount 为本次获得的分数
func add_score(amount: int) -> void:
	score += amount
```

这里同时用了两样东西：`int` 和 `-> void` 是类型提示，成员前面的 `##` 是文档注释

像 `var score := 0` 这样能明确推断类型的写法也很好用，不用为了写类型把每一行都拉长，函数参数、返回值和重要的节点引用，我会更倾向于明确写出来

如果自动补全函数时总是没有类型，可以在编辑器设置里搜索 `Add Type Hints`，对应位置是 `Text Editor → Completion → Add Type Hints`，具体用法可以看[静态类型文档](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/static_typing.html)

至于注释，我觉得最值得写的是参数含义、单位和调用条件，比如一个时间参数到底是秒还是毫秒，过一阵子自己都会忘，写清楚这些比给每行代码翻译成中文有用

`##` 写的内容也能被 Godot 的内置帮助识别，写在导出属性上时还能显示为 Inspector 的提示，做插件或者给别人用的组件时挺方便，[文档注释的完整写法在这里](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html)

## 长条件换行，优先用括号

几个条件挤在同一行，很快就会超出屏幕，特别是左右同时打开两个脚本的时候

GDScript 可以用反斜杠续行，不过我更推荐用括号把表达式包起来，这是[官方风格指南](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_styleguide.html#format-multiline-statements-for-readability)推荐的写法，后面加减条件时也更省事

```gdscript
func can_interact(in_range: bool, target_visible: bool, dialogue_open: bool) -> bool:
	return (
			in_range
			and target_visible
			and not dialogue_open
	)
```

编辑器里那两条竖线是行长度的软、硬参考线，用来提醒代码是不是写得太长，不是超过它就不能运行，也不用为了卡在参考线以内，把一个简单表达式拆得七零八落

## 文件按场景和功能放，找起来方便就好

在那个教程里面，写把文件分成 `scripts`、`scenes` 和 `assets`，虽然很直观，不过项目大一点以后，同一个玩家的场景、脚本和配置可能就要在几个目录之间来回找，还是比较麻烦的

我更倾向于让一起修改的东西放在一起，比如

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

玩家自己的东西放进 `player`，背包界面自己的东西放进 `inventory`，几个地方都要用的字体、音频和主题再集中放，Godot 的[项目组织文档](https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html)也推荐让相关资源尽量靠近场景

已有的目录用得顺手就继续用，整理目录最有意义的结果，是减少下次修改的时间

## 子场景说发生了什么，外面的事交给父层

比如背包格子被点击，它可以发出一个 `item_selected` 信号，把物品 ID 带出去，再由背包界面决定要显示详情还是装备物品

如果格子自己一路 `get_parent()` 找到主场景，然后直接修改玩家和详情面板，换个地方复用这个格子时就容易一起出问题

这里我觉得关键是让子场景少依赖外面的具体结构，跨场景的连接和协调尽量放在知道双方关系的父层，直接连接一个明确的信号就够用时，也不必再套一层全局事件系统

[官方的场景组织文档](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html)对这类关系有不少例子

## 资源共享和实例变量，要分清楚

这一点在材质、主题和自定义 `Resource` 上尤其容易遇到，比如几个角色引用了同一份属性资源，运行时修改里面的血量，就可能把其他角色一起改掉

[Godot 会复用已加载的资源](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html)，资源内置在场景里，也不代表每次实例化场景都会自动得到独立的一份

想让某个资源跟着场景实例各自独立，可以在资源的 Inspector 中设置 `Local To Scene`，也可以在确实需要独立数据的时候复制资源，公共的纹理、字体和只读配置就继续共享

但「共享同一份脚本资源」和「共享脚本里所有变量」不是一回事，两个节点使用同一个脚本，普通成员变量仍属于各自的脚本实例，比如上面的 `score` 会各自记录分数，[`static` 变量](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#static-variables)才是另一种共享语义

所以遇到几个对象一起变化时，先看看它们是不是引用了同一份可修改的资源，比到处加复制逻辑更容易找到原因



## 零散的小tips

### 让空格键不自动按下UI
![[Pasted image 20261019200301.png]]
最简单的就是在输入映射里面找到`ui_accept`然后删除其中的`space`就可以了，至于为什么呢，因为Godot的UI节点默认可以被`ui_accept`按动，然后`space`就是这个的默认按键，就是这么简单

### region 用来折叠，注释用来说明原因

脚本稍长一点时，可以用 `#region` 和 `#endregion` 给相关代码分区，编辑器就能把这一段折叠起来，[官方语法在这里](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#code-regions)

```gdscript
#region Score

var score: int = 0


func add_score(amount: int) -> void:
	score += amount

#endregion
```

这两个标记的 `#` 后面没有空格，和普通注释的写法不同，写成 `# region` 就只是普通注释了
# 参考与继续

这篇参考了腾讯频道的 [Godot 开发经验分享](https://pd.qq.com/g/647545104021278691/post/B_92b3b86a5d1607001441152186786637080X60?showGuild=1&errCode=0&asideType=Full)及评论里的补充，相关用法的官方文档也放在了各节里

如果想看看一些有用的插件，可以接着看 [[godot-useful-plugins|很有用的 Godot 插件]]
