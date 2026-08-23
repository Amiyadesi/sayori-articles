---
title: win7老电脑爆改家里云记录
published: 2026-08-09
created: 2026-08-09
updated: 2026-08-15
lastEdited: 2026-08-15
updateCount: 1
description: 从零开始把家中win7老电脑改成linux服务器，看完你也可以上手
image: ""
tags:
  - 叙事
  - 服务器探索
category: 建站与自托管
draft: false
alias: ""
---
# 起因
暑假回来的时候和家里人交流的时候，发现家中其实有一台老旧不打算用的win7电脑，于是正好想着配置一个家里云，在和AI详细一步一步学习和指导下，终于成功配置，并且加入自己的tailscale组网成功，特此记录一下
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# 完整记录

## 准备阶段

准备一个至少4GB的小U盘，用来制作Ubuntu系统安装盘。先从[Ubuntu Server官网](https://ubuntu.com/download/server)下载最新的稳定版，比如站长下载的就是26.04版本，然后下载[Rufus](https://rufus.ie/)制作启动盘。
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
在Rufus中选择下载好的Ubuntu镜像。确认U盘里没有重要文件后开始写入，其他选项保持默认即可。完成后，我们就有了一个装载Ubuntu Server 26.04 LTS安装程序的U盘。

## 安装阶段
开机前插上U盘。出现**Lenovo**标志时连续按几次`F12`；如果无效，可以尝试`Fn+F12`。进入**Boot Menu**后，用方向键选择带有USB的启动项，就能从U盘启动并进入Ubuntu安装流程。

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

前面的选择直接按照默认选择就行了，然后当站长选择到这里的时候，AI推荐最好勾上第三个，帮你自动寻找第三方驱动，减少没有声音和连不上wifi的问题

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

然后到达这个页面的时候，如果家里有无线Wifi的话，用方向键移动到第二个`wlp3s0`，然后Enter点击后继续选择`Edit Wifi`，填入家里的Wifi名称和Wifi密码就好了，这样方便后面配置好后是直接有网的状态

然后接下来就是一个让你填入代理配置的页面，如果没有需求的话就可以直接跳过

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

如果你是像我一样整个电脑爆改的话就继续点done好了，然后下一个页面就会弹出你的电脑的总结信息，继续点done和continue就行了，然后就会进入一段时间的安装中ing......

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

进入这个界面后，就可以设置服务器名称、用户名和密码了。Ubuntu Server安装器创建的是一个普通用户，并授予它`sudo`权限；Ubuntu默认锁定`root`账号，因此这里不需要把用户名填成`root`。我使用的是`amiya`，后续通过`ssh amiya@服务器地址`登录，需要管理员权限时再执行`sudo`。

请记住这里设置的主机名、用户名和密码。忘记密码也不一定需要重新刷机，但恢复过程会麻烦很多。

然后中间会有一个让你选择是否是ubuntu pro的，直接跳过就行了，正常人基本用不到hh

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

然后**重点**来了，首先OpenSSH是肯定要装的。其次，如果你有GitHub账户并且已经配置SSH公钥，可以直接输入GitHub用户名导入公钥。安装完成后，就能在同一局域网内通过IP和SSH密钥登录。

确认公钥已经正确导入后，可以不勾选图中的`[ ] Allow password authentication over SSH`。这个选项控制是否允许使用密码进行SSH登录。

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

然后安装器会列出一些常见的服务器软件。如果确实需要，可以用空格键勾选；暂时没有需求就直接选择`Done`。

最后点击`Reboot Now`后，如果出现了**Please remove the installation medium, then press ENTER**就比较简单了，拔掉U盘再点击enter就可以正常启动了！如果没有出现这些，那就在黑屏后拔掉，否则你就要即刻轮回......

## 初始配置

为了后面连接的方便，站长选择用tailscale组网

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

这些安装好后通常会给你一个tailscale的链接，在自己的主力机上登录自己的tailscale账户就可以方便的内网连接了！

# 后记
截止目前运行了两天多，把之前的astrbot和napcat的sayori机器人成功迁移到家宽服务器上哦耶！

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

然后目前的fast note sync也成功迁移到家宽服务器上，让我的博客的数据同步的更快一些

> [!NOTE]
> 然后暂时也不知道搞什么了喵，不过有一个放在家里的国内家宽服务器还是挺有趣的喵。实测上行带宽约70 Mbps，2核4GB也能用。如果你看到这里了，欢迎给我一些如何利用好这个家宽小服务器的建议！
