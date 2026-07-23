---
title: "（转载）为什么你刚搜的东西，其他App转头就知道了？（包括IOS系统）"
published: 2026-07-23
created: 2026-07-23
updated: 2026-07-23
lastEdited: 2026-07-23
updateCount: 0
description: "经原作者授权转载，借 Loupe 展示移动 App 能读取的设备、相册和局域网信息，以及广告 SDK 如何拼接设备指纹"
image: ""
tags:
  - 隐私安全
  - 设备指纹
  - iOS
category: 互联网与社区
draft: false
author: "我爱吃糖醋排骨（aichitangcupaigu）"
licenseName: "作者授权转载"
alias: ""
---
<details class="repost-source">
<summary>原文与授权</summary>
<p>原文：<a href="https://linux.do/t/topic/2598156">https://linux.do/t/topic/2598156</a></p>
<p>已获得原作者授权</p>
</details>

为什么你刚搜的东西，其他App转头就知道了？
![原文配图 1](https://cdn3.ldstatic.com/original/4X/8/c/e/8ce2acacfb6433a493af0eda03104ce6b84cbefb.jpeg)

**你有没有过这种经历：**
前一天刚在社交媒体 App 上搜了一双洞洞鞋，结果第二天，你在一个八竿子打不着的购物 App，刷到了这双鞋的推荐。。。
**你开始惶恐，回忆自己到底有没有在第二个 App 里提过这双鞋。**
在确定没有之后，你开始猜测：要么「这俩公司肯定偷偷把我数据倒来倒去」，要么「完了，手机麦克风在偷听我说话」。
虽说上面这两种操作都挺离谱，尤其是麦克风偷听，很容易露馅，抓包一看就知道了，但一想到如今互联网公司的下限，咱也
不敢替它们打包票。

![原文配图 2](https://cdn3.ldstatic.com/original/4X/c/c/d/ccdbc57292e1e5c15f523593cbae7690e8bd4688.jpeg)

倒是广告商们其实还有更隐秘更安全的办法，把一双洞洞鞋跨 App 推送到你眼前：

比如一台手机在 A 软件搜过洞洞鞋，就把这口味记在机器名下。
换到 B 软件，再认出同一台，就能接着推送这个口味了。它认的是机器，至于你叫什么、是谁，它可以不用知道。
那问题来了，广告商是怎么记下这些信息的，这些信息又是怎么溜出去的？
最近发现一个安全团队做的 App：Loupe。
它只有一个功能，就是告诉用户：手机 App 到底能获取你多少数据？你每多「允许」一个权限，又会暴露哪些东西？

![原文配图 3](https://cdn3.ldstatic.com/original/4X/2/d/6/2d6554fe54f68ceed0d214f5b2d3f2122f7db455.jpeg)

### 比如我刚进 Loupe，什么权限都不给，它就给我一个下马威。

![原文配图 4](https://cdn3.ldstatic.com/original/4X/7/8/e/78e4f9f01d7cbd5baf7dbe38d311798a5c479853.jpeg)

它知道 我把手机地区设为新加坡，键盘是中英文混着用，机器是23年9月激活，从那天起我已经复制29034次，上一次开机是8天3小时44分钟前。
甚至，它还顺手给我画了个像。知道我装了 Steam 和 Discord，判断我多半是个游戏玩家，又瞅见我装了 GitHub 和 Slack，推测我在科技行业干活。

![原文配图 5](https://cdn3.ldstatic.com/original/4X/b/2/3/b236a61889f780c2baec80132a40731de84f8039.jpeg)

以上还只是 App 端显示的，你要是查看了更详细的报告，就会发现它知道更多。

![原文配图 6](https://cdn3.ldstatic.com/original/4X/9/f/9/9f90e4fdaa228e500b670e4f56fbb875d2ed0d2d.jpeg)

> **比如知道我的 iPhone 15 Pro 这会还剩 105G 存储空间，现在开着深色模式，屏幕亮度在一半多，电量 60%，没插充电器；双卡双待，两卡都处于 5G，甚至还知道此刻手机怎么斜着、朝哪个方向。**

你可能还是觉得这些零碎玩意儿，知道了又能咋样，能定位到我们吗？
确实不行。

再说，这些还是 Loupe 基于公开 API 看到的信息：
**如果像其他 App 那样，我再给 Loupe 开放相册、定位等权限，它又会知道哪些信息呢？**

![原文配图 7](https://cdn3.ldstatic.com/original/4X/b/9/3/b935c1139826d4ca05e1ced72acb9b93ff4ecd93.jpeg)

**尝试给一下相册权限。
很快 Loupe 就告诉我，我图库里 1119 段视频、9371 张图，其中 3033 张都带了地理位置，并列出了哪些地方我去的次数最多。**

![原文配图 8](https://cdn3.ldstatic.com/original/4X/8/7/f/87fecc780d3fbbd4b3ac5d60adb23722d7795c85.jpeg)

别看 App 只精准到了「余杭区」，这只是 loupe 为了方便展示。
要知道照片里 EXIF 信息里有精确到十米左右的经纬度，一个 App 只要分析每个位置出现的次数和时间点，就能大概猜出我住的
小区，我上班的地方，然后偶尔在节假日蹦出来的某个十八线小县城，大概率就是我的老家。

建议大家把所有 App 都设置为走系统图片选择器，就是弹出来让你勾几张授权的，此时 iOS 就默认不把照片定位发给
App。

![原文配图 9](https://cdn3.ldstatic.com/original/4X/d/2/4/d24bb924f7cbd8381b583cf2e5ec8786db8aa8d3.png)

**对了，平时遇到那些问你要不要为了「方便」开启全部权限的弹窗，也记得点
保持现状**

![原文配图 10](https://cdn3.ldstatic.com/original/4X/3/7/d/37d95477ca9bb8d97434e7dbb5ccb0e87da815ce.jpeg)

#### 接下来，再给 Loupe 开一个本地网络权限，看看它能获取些啥。

说实话，这权限平时谁会多想啊？不就是连个打印机投个屏么。
但我在点了允许之后，局域网内的所有同事电脑，HP 激光打印机、两台绿联 NAS，全部显示出来。

![原文配图 11](https://cdn3.ldstatic.com/original/4X/e/2/6/e260c50f19840d11607940d77b903b103c9149dc.jpeg)

当然，这权限能看到周围所有设备也是合理的，不然也找不到设备。
只是我不明白，这权限不应该在我需要投屏时才弹窗的吗？

**为什么很多 App 明明只是打开了它，它就伸出手问你要了呢？**

![原文配图 12](https://cdn3.ldstatic.com/original/4X/d/c/2/dc2e3deecc238db396040613fa1e429b2b0aaecc.jpeg)

后面的位置、蓝牙、日历权限，就不详细讲了，大家可以看一下截图上的信息。
总之每点一个「允许」，App 对你的了解就更深入，你的设备指纹就更清晰更多元。

![原文配图 13](https://cdn3.ldstatic.com/original/4X/b/f/8/bf8c7d05a0a890f8c54d02a18b6fdfbcb4f65925.jpeg)

### 那么我在 A 软件里被算出的指纹和喜好，B 软件是怎么知道的？

答案是广告商。
很多 App 自己不做广告系统，而是接入一个现成的广告 SDK。你在 App 里看到的开屏广告、信息流里的广告，都是这段代码从广告平台拿来、再显示给你的。
与此同时，  SDK  会把你这台手机的特征传回广告平台。

### 按说 SDK 想认出你这台手机，本不必这么麻烦。

苹果原本就发过一个正经识别码，叫 IDFV，意思是「同一家公司旗下的几个 App，共用一个号」。所以你要是装的几个 App 都是一家出的，它们认出你是同一个人，根本不费劲。

可一旦跨了公司，IDFV 就不通用了，此时 IDFA 就上场了。 IDFA 一个手机一个号，所有 App 通用，专门帮广告圈跨 App
认人。
可问题又来了。
2021 年苹果上线了 App 跟踪透明度（ATT），把 IDFA 的开关塞回了用户手里。App 要想用，得先弹窗问你一句，你点一下「要求 App 不要跟踪」，这个号当场清零。

![原文配图 14](https://cdn3.ldstatic.com/original/4X/6/6/7/667faaa7428c6b527a54c4fa1e90c081eb6bc9b8.jpeg)

### 所以到最后广告商只能自己动手，用这套设备指纹战术。

那这套战术，是不是真有 App 在偷偷用？

Loupe 的开发者团队叫 Mysk，他们之前就抓包过 Facebook、Instagram、Threads、Chrome、Spotify，结果发现这些 App 虽
然在苹果隐私清单里答应了「我读这个信息，但绝不外传」，但其实还是把用户手机的开机时间，偷偷发了出去。
不是兄弟，你们要开机时间干啥啊，难不成口味比沃尔玛塑料袋、武装直升机还独特。。。

> 其实真相只有一个，就是在拼凑设备指纹。

![原文配图 15](https://cdn3.ldstatic.com/original/4X/4/7/0/4705d3165cdb9ae055ee87c7e82945e99b5662fe.jpeg)

类似的事情在安卓阵营也出现过。
2025 年谷歌研究团队发表了一篇论文，他们扒了 18 万个安卓 App 和 22 万个 SDK，结果发现应用商店的热门 App 里，39.4%
都装着收集设备指纹的 SDK。如果把类别归到交友和漫画类 App ，这个数字更是飙到了82%和88%。

目前 Loupe 完全免费且开源，我觉得 iPhone 用户都可以下一个试试（ 安卓用户可能再等等）。
当然试过之后，大家也不用草木皆兵。
毕竟广告商想猜到你爱看啥，想买啥，除了设备指纹，还有相似人群、账号打通、协同过滤，办法多了去了。
我认为 Loupe 最大的作用，就是它能让你能知道自己有哪些数据是暴露的，又是在什么情况下暴露的，提高一下自己的安全意
识，平时多加小心吧。

**目前 Loupe 完全免费且开源，我觉得 iPhone 用户都可以下一个试试（ 安卓用户可能再等等）。**
![原文配图 16](https://cdn3.ldstatic.com/original/4X/2/6/2/26205297cb564a9cfa5f784886884928b1d370ad.png)

> **如果这方面话题感兴趣，可看看我过去发的文章：**
>
> [（转载）业内人士,向佬友揭露一下流氓APP是怎么围剿猎杀用户的](/posts/rogue-app-advertising-user-traps/)

> [（转载）你的手机，是怎么样被他们区分对待的？](/posts/mobile-app-ad-targeting-device-profiling/)

**相关文章、图片、资料、代码来源 ：**

1. https://mysk.blog/2024/05/03/apple-required-reason-api/
2. https://mp.weixin.qq.com/s/fR_GTcbEg84GOcQ5XXcyCw
3. https://apps.apple.com/cn/app/loupe-app能看到什么/id6766152470
4. https://github.com/mysk-research/loupe
5. https://nopj.cn/d/7382-loupekai-yuan-xiang-mu-shi-shi-jian-kong-iosyuan-sheng-appshu-ju-quan-xian
