---
title: win7老电脑爆改家里云记录
published: 2026-08-09
created: 2026-08-09
updated: 2026-08-09
lastEdited: 2026-08-09
updateCount: 0
description: 从零开始把家中win7老电脑改成linux服务器，看完你也可以上手
image: ""
tags:
  - 服务器探索
  - 教程
category: 服务器探索
draft: false
alias: ""
---
# 起因
暑假回来的时候和家里人交流的时候，发现家中其实有一台老旧不打算用的win7电脑，于是正好想着配置一个家里云，在和AI详细一步一步学习和指导下，终于成功配置，并且加入自己的tailscale组网成功，特此记录一下
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# 完整记录

## 准备阶段

一个至少4GB小U盘用来被刷成ubuntu系统盘，[https://ubuntu.com/download/server](https://ubuntu.com/download/server)，在官方链接下载最新的稳定版，比如站长下载的就是26.04版本，然后下载[https://rufus.ie/](https://rufus.ie/)，用来刷U盘
![[Pasted image 20260809163126.png|width=600|center|refus界面]]
然后在选择那里选择你下载好的ubuntu系统，确认你那个U盘没有什么重要文件后，直接开始然后一路过去就行了，其他的都选默认配置就好了，这下我们就有了一个装载着ubuntu server 26.04 LTS的U盘了

## 安装阶段
在电脑打开前插上U盘，然后开机的时候，当出现**Lenovo**时，快速按下`F12`按键，如果单纯的按`F12`没用的话可以结合`Fn+F12`，连续按几次，就会进入**Boot Menu**，其中按方向键选择一个带有USB的选项，直接选择哪个就可以从U盘下载了，然后就进入了ubantu系统的安装流程！

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

前面的选择直接按照默认选择就行了，然后当站长选择到这里的时候，AI推荐最好勾上第三个，帮你自动寻找第三方驱动，减少没有声音和连不上wifi的问题

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

然后到达这个页面的时候，如果家里有无线Wifi的话，用方向键移动到第二个`wlp3s0`，然后Enter点击后继续选择`Edit Wifi`，填入家里的Wifi名称和Wifi密码就好了，这样方便后面配置好后是直接有网的状态

然后接下来就是一个让你填入代理配置的页面，如果没有需求的话就可以直接跳过

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

如果你是像我一样整个电脑爆改的话就继续点done好了，然后下一个页面就会弹出你的电脑的总结信息，继续点done和continue就行了，然后就会进入一段时间的安装中ing......

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

进入这个界面后就可以开始给你的服务器配置密码和账户了，按照惯例来说，账户都起名`root`，当然你有自己的想法也行，比如我就叫`amiya`，然后配置好主机名和用户名和密码，这些东西记得都要记住哦，要不然到时候连接也登录不上自己的服务器，只能重新刷机了（

然后中间会有一个让你选择是否是ubuntu pro的，直接跳过就行了，正常人基本用不到hh

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

然后**重点**来了，首先openssh是肯定要装的，其次就是如果你有github账户并且配置了ssh~~（站长记得还有一个平台也可以improt，不过站长忘记了）~~，你可以直接输入你的github用户名导入自己的ssh公钥，然后只需要在同一个局域网下（比如同一个Wifi）就可以直接通过ip和ssh密钥对连接了！就不需要勾选途中的第二个`[ ] Allow password authentication over SSH`选项了，这个选项的意思就是能够使用密码登录

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

然后就会让你挑选一些常见的服务器软件让你安装，如果你确实有需求就可以勾引选几个，用空格键勾选，没啥需要的就直接`Done`就完事了

最后点击`Reboot Now`后，如果出现了**Please remove the installation medium, then press ENTER**就比较简单了，拔掉U盘再点击enter就可以正常启动了！如果没有出现这些，那就在黑屏后拔掉，否则你就要即刻轮回......

## 初始配置

为了后面连接的方便，站长选择用tailscale组网

```
sudo apt update && sudo apt full-upgrade -y 
sudo apt install -y openssh-server 
sudo systemctl enable --now ssh 
curl -fsSL https://tailscale.com/install.sh | sh sudo tailscale up tailscale ip -4
```

这些安装好后通常会给你一个tailscale的链接，在自己的主力机上登录自己的tailscale账户就可以方便的内网连接了！

# 后记
截止目前运行了两天多，把之前的astrbot和napcat的sayori机器人成功迁移到家宽服务器上哦耶！

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

然后目前的fast note sync也成功迁移到家宽服务器上，让我的博客的数据同步的更快一些

> [!NOTE]
> 然后暂时也不知道搞什么了喵，不过有一个放在家里的国内家宽服务器还是挺有趣的喵，测试的上行带宽70MPS差不多，2H4G也能用，如果你看到这里了，欢迎你给我一些怎么利用好这个家宽小服务器的建议！
