---
title: 我本来只是想让机器人 24 小时在线，结果买了一台云服务器
published: 2026-05-25
created: 2026-05-25
updated: 2026-06-24
lastEdited: 2026-06-24
updateCount: 4
description: 从阿里云学生代金券到 Ubuntu、SSH 密钥登录、非常规端口和基础防火墙，个人服务器的第一步。
image: ""
tags:
  - VPS
  - 阿里云
  - 自托管
category: 建站与自托管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "为了让机器人 24 小时在线买下第一台云服务器"
    - "从学生券、Ubuntu 到 SSH 密钥登录的起步过程"
    - "换端口和配防火墙，先把最基础的安全边界搭好"

---

# 开头

最开始没想搞什么服务器体系。只是想让 QQ 机器人 24 小时在线

本地跑当然也能跑。AstrBot 开着，NapCat 挂着，服务不关，网络别断，电脑当主机用

![[Pasted image 20260609215751.png]]

所以我很自然地理解到了服务器这个东西：一台 24 小时开着、放在别人机房里的电脑

然后由于站长是穷学生，所以当然是发动我的 AI 大军帮我搜罗免费渠道了 )

后来看到阿里云学生认证有 300 元代金券，[学生权益领取链接](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)，不领白不领

领完以后还看到有一个 [试用 ECS](https://free.aliyun.com)。推荐可以先试用这个，开一个 2H2G 的配置就够玩机器人了，而且刚好能用三个月

![[Pasted image 20260609221047.png]]

然后这个 300 元券，正好可以用在试用 ECS 转包年 ECS 上，站长已经转好了！

![[Pasted image 20260609221956.png]]

这样算下来，基本上能白嫖一个四年的免费服务器

不过要注意，阿里云每个月的免费流量好像内地只有 20GB。我只玩机器人倒是够用，但最好去设置一个额度预警

## 第一次连上这台机器

买完服务器以后，真正的问题才开始：我怎么进去

控制台会给一个公网 IP、root 用户和初始密码。最直接的办法就是先用密码连一次：

```powershell
ssh root@<VPS_PUBLIC_IP>
```

第一次连接会问你要不要信任这台机器，确认 IP 没填错再输入 `yes`

但这个密码登录只能拿来过渡。真正长期用，我还是推荐直接换成 SSH 密钥登录

密码就像门口藏钥匙。方便是方便，但公网机器每天都会被扫。默认 22 端口加密码登录，基本就是在跟互联网上的各种脚本说「来敲我」

## 生成 SSH 密钥

我是在 Windows 上操作，所以先在本地生成一把专门给这台服务器用的 SSH key：

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

一路回车也可以。如果你想给私钥再加一层保护，就设置 passphrase

生成完会有两个文件：

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

没有 `.pub` 的那个是私钥，~~如果不知道有什么用可以发给我~~，这样你的ssh我就可以连接了😈

带 `.pub` 的是公钥，可以放到服务器上

看一下公钥内容：

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

复制整行，从 `ssh-ed25519` 开始，到最后的注释结束

## 把公钥放进服务器

保持刚才那个密码登录的 SSH 窗口不要关，在服务器上准备 SSH 目录：

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

把本地 `.pub` 里的那一整行粘进去，保存

然后改权限：

```bash
chmod 600 ~/.ssh/authorized_keys
```

这一步看起来很莫名其妙，但很重要。权限太松的话，SSH 会直接失效，然后直接不认这把钥匙

接着在本地写一个 SSH alias。以后不用每次都输一长串 IP、端口、私钥路径

打开：

```powershell
notepad $env:USERPROFILE\.ssh\config
```

写进去：

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

新开一个终端测试：

```powershell
ssh sayori
```

能直接连上，说明密钥登录已经通了

注意，是新开一个终端测试。旧的密码登录窗口先别关，这个窗口现在像安全绳，等全部改完再松手

## 关掉密码，换一个非常规端口

密钥能登录以后，就可以把密码登录关掉，同时把 SSH 从默认 22 端口挪走

先选一个非常规端口，比如：

```text
11451
```

不要直接照抄我这个。自己挑一个 1024 到 65535 之间、不和其它服务冲突的端口

然后先去阿里云 ECS 的安全组里放行这个端口。这个很重要

服务器里面的 UFW 是一层门，阿里云安全组也是一层门。你只改服务器，不改安全组，新端口一样进不来

安全组放行后，回到 SSH 窗口，写一个自己的 SSH 配置片段：

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

内容：

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

这里的 `PermitRootLogin prohibit-password` 意思是 root 还能用密钥登录，但不能用密码登录

更严谨的做法是新建普通用户，再禁 root。只是我这篇先讲最快可用的方式

改完先检查 SSH 配置有没有语法错误：

```bash
sshd -t
```

没输出就是好消息

然后重启 SSH 服务：

```bash
systemctl restart ssh
```

现在不要关旧窗口

把本地 `~/.ssh/config` 里的端口也改掉：

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

再新开第三个终端测试：

```powershell
ssh sayori
```

能连上，才说明新端口、密钥登录、安全组都通了

我会再测试一次旧密码登录是不是被关掉了，比如不用私钥、手动连 IP

如果它还让你输密码并且能进，那就说明 `PasswordAuthentication no` 没生效，别急着继续，先把这个查清楚

## 配防火墙

SSH 稳了之后，再配服务器自己的防火墙

Ubuntu 上最顺手的是 UFW：

```bash
apt update
apt install -y ufw
```

规则先写好：

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

如果你已经准备开 Web 服务，可以先留 HTTP / HTTPS：

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

然后启用：

```bash
ufw enable
ufw status verbose
```

这里我还是建议保留旧 SSH 窗口。新开终端再连一次：

```powershell
ssh sayori
```

能连上，再关旧窗口

## 连上以后先摸一遍机器

真正连稳以后，可以先看一眼机器状态：

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

2H2G 内存不大，后面做服务选择时基本都要轻量

能不用数据库就不用，能用 SQLite 就先 SQLite，能放 Cloudflare Pages 就不放 VPS 上

这台机器后来不只跑了机器人，Vaultwarden、ntfy、Gatus、Portainer、AI Search Gateway 都从这里长出来

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)，这里有一个关于服务器如何利用非常好的awesome系列网站！

回头看，个人服务器最有用的不是某个具体服务，而是逼着你理解网络、部署、安全、备份这些东西

如果重来一次，我会更早建立几个习惯：

1. 每个服务单独目录
2. 真实密钥只放 `.env` 或平台 Secret
3. 能复制的命令都写进文档
4. 每次部署完留一条验证命令

这篇先到这里。服务器现在能用 SSH 稳定连上，密码登录关了，端口也换了，防火墙也有了最基础的边界

下一篇讲怎么用 `scp` 把本地配置搬到远程主机里

也就是终于要开始把机器人从「我电脑上能跑」搬到「服务器上也能跑」了
