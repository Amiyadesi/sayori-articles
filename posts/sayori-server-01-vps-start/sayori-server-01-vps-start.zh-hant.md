---
title: 我本來只是想讓機器人 24 小時在線，結果買了一臺雲服務器
published: 2026-05-25
created: 2026-05-25
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 5
description: 從阿里雲學生代金券到 Ubuntu、SSH 密鑰登錄、非常規端口和基礎防火牆，個人服務器的第一步。
image: ""
tags:
  - 敘事
  - VPS
  - 阿里雲
  - 自託管
category: 建站與自託管
draft: false
aiSummary:
  generatedAt: "2026-07-11"
  model: "codex-local"
  items:
    - "爲了讓機器人 24 小時在線買下第一臺雲服務器"
    - "從學生券、Ubuntu 到 SSH 密鑰登錄的起步過程"
    - "換端口和配防火牆，先把最基礎的安全邊界搭好"

lang: zh-Hant
translationKey: posts/sayori-server-01-vps-start/sayori-server-01-vps-start
---

# 開頭

最開始沒想搞什麼服務器體系。只是想讓 QQ 機器人 24 小時在線

本地跑當然也能跑。AstrBot 開着，NapCat 掛着，服務不關，網絡別斷，電腦當主機用

![[Pasted image 20260609215751.png]]

所以我很自然地理解到了服務器這個東西：一臺 24 小時開着、放在別人機房裏的電腦

然後由於站長是窮學生，所以當然是發動我的 AI 大軍幫我搜羅免費渠道了 )

後來看到阿里雲學生認證有 300 元代金券，[學生權益領取鏈接](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)，不領白不領

領完以後還看到有一個 [試用 ECS](https://free.aliyun.com)。推薦可以先試用這個，開一個 2H2G 的配置就夠玩機器人了，而且剛好能用三個月

![[Pasted image 20260609221047.png]]

然後這個 300 元券，正好可以用在試用 ECS 轉包年 ECS 上，站長已經轉好了！

![[Pasted image 20260609221956.png]]

這樣算下來，基本上能白嫖一個四年的免費服務器

不過要注意，阿里雲每個月的免費流量好像內地只有 20GB。我只玩機器人倒是夠用，但最好去設置一個額度預警

## 第一次連上這臺機器

買完服務器以後，真正的問題纔開始：我怎麼進去

控制台會給一個公網 IP、root 用戶和初始密碼。最直接的辦法就是先用密碼連一次：

```powershell
ssh root@<VPS_PUBLIC_IP>
```

第一次連接會問你要不要信任這臺機器，確認 IP 沒填錯再輸入 `yes`

但這個密碼登錄只能拿來過渡。真正長期用，我還是推薦直接換成 SSH 密鑰登錄

密碼就像門口藏鑰匙。方便是方便，但公網機器每天都會被掃。默認 22 端口加密碼登錄，基本就是在跟互聯網上的各種腳本說「來敲我」

## 生成 SSH 密鑰

我是在 Windows 上操作，所以先在本地生成一把專門給這臺服務器用的 SSH key：

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

一路回車也可以。如果你想給私鑰再加一層保護，就設置 passphrase

生成完會有兩個文件：

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

沒有 `.pub` 的那個是私鑰，~~如果不知道有什麼用可以發給我~~，這樣你的ssh我就可以連接了😈

帶 `.pub` 的是公鑰，可以放到服務器上

看一下公鑰內容：

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

複製整行，從 `ssh-ed25519` 開始，到最後的註釋結束

## 把公鑰放進服務器

保持剛纔那個密碼登錄的 SSH 窗口不要關，在服務器上準備 SSH 目錄：

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

把本地 `.pub` 裏的那一整行粘進去，保存

然後改權限：

```bash
chmod 600 ~/.ssh/authorized_keys
```

這一步看起來很莫名其妙，但很重要。權限太鬆的話，SSH 會直接失效，然後直接不認這把鑰匙

接着在本地寫一個 SSH alias。以後不用每次都輸一長串 IP、端口、私鑰路徑

打開：

```powershell
notepad $env:USERPROFILE\.ssh\config
```

寫進去：

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

新開一個終端測試：

```powershell
ssh sayori
```

能直接連上，說明密鑰登錄已經通了

注意，是新開一個終端測試。舊的密碼登錄窗口先別關，這個窗口現在像安全繩，等全部改完再鬆手

## 關掉密碼，換一個非常規端口

密鑰能登錄以後，就可以把密碼登錄關掉，同時把 SSH 從默認 22 端口挪走

先選一個非常規端口，比如：

```text
11451
```

不要直接照抄我這個。自己挑一個 1024 到 65535 之間、不和其它服務衝突的端口

然後先去阿里雲 ECS 的安全組裏放行這個端口。這個很重要

服務器裏面的 UFW 是一層門，阿里雲安全組也是一層門。你只改服務器，不改安全組，新端口一樣進不來

安全組放行後，回到 SSH 窗口，寫一個自己的 SSH 配置片段：

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

內容：

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

這裏的 `PermitRootLogin prohibit-password` 意思是 root 還能用密鑰登錄，但不能用密碼登錄

更嚴謹的做法是新建普通用戶，再禁 root。只是我這篇先講最快可用的方式

改完先檢查 SSH 配置有沒有語法錯誤：

```bash
sshd -t
```

沒輸出就是好消息

然後重啓 SSH 服務：

```bash
systemctl restart ssh
```

現在不要關舊窗口

把本地 `~/.ssh/config` 裏的端口也改掉：

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

再新開第三個終端測試：

```powershell
ssh sayori
```

能連上，才說明新端口、密鑰登錄、安全組都通了

我會再測試一次舊密碼登錄是不是被關掉了，比如不用私鑰、手動連 IP

如果它還讓你輸密碼並且能進，那就說明 `PasswordAuthentication no` 沒生效，別急着繼續，先把這個查清楚

## 配防火牆

SSH 穩了之後，再配服務器自己的防火牆

Ubuntu 上最順手的是 UFW：

```bash
apt update
apt install -y ufw
```

規則先寫好：

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

如果你已經準備開 Web 服務，可以先留 HTTP / HTTPS：

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

然後啓用：

```bash
ufw enable
ufw status verbose
```

這裏我還是建議保留舊 SSH 窗口。新開終端再連一次：

```powershell
ssh sayori
```

能連上，再關舊窗口

## 連上以後先摸一遍機器

真正連穩以後，可以先看一眼機器狀態：

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

2H2G 內存不大，後面做服務選擇時基本都要輕量

能不用數據庫就不用，能用 SQLite 就先 SQLite，能放 Cloudflare Pages 就不放 VPS 上

這臺機器後來不只跑了機器人，Vaultwarden、ntfy、Gatus、Portainer、AI Search Gateway 都從這裏長出來

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)，這裏有一個關於服務器如何利用非常好的awesome系列網站！

回頭看，個人服務器最有用的不是某個具體服務，而是逼着你理解網絡、部署、安全、備份這些東西

如果重來一次，我會更早建立幾個習慣：

1. 每個服務單獨目錄
2. 真實密鑰只放 `.env` 或平臺 Secret
3. 能複製的命令都寫進文檔
4. 每次部署完留一條驗證命令

這篇先到這裏。服務器現在能用 SSH 穩定連上，密碼登錄關了，端口也換了，防火牆也有了最基礎的邊界

下一篇講怎麼用 `scp` 把本地配置搬到遠程主機裏

也就是終於要開始把機器人從「我電腦上能跑」搬到「服務器上也能跑」了
