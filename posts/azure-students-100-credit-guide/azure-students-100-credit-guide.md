---
title: Azure 学生服务器：领取 100 美元，用网页或 CLI 开一台日本 VPS
published: 2026-10-17
created: 2026-10-13
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 0
description: 从 GitHub 学生包或学校邮箱领取 Azure for Students，用网页和 Azure CLI 创建日本区 Ubuntu 服务器，算清免费规格、系统盘、IPv4、IPv6 和出站流量
image: ""
tags:
  - 实操教程
  - 官方学生权益
  - Azure
  - 云服务
category: 教程教学
draft: false
lang: zh-Hans
translationKey: posts/azure-students-100-credit-guide/azure-students-100-credit-guide
---

学生权益里，我会把 Azure 这项放在比较靠前的位置，每年 100 美元赠金，不用信用卡，前 12 个月还有小规格服务器和两块系统盘的免费额度，拿来放自己的项目刚刚好

我更推荐先开日本区，系统用 Ubuntu，先把 SSH 连通，再慢慢折腾自己想放的东西，这篇就写到服务器开好，不展开应用部署，感兴趣的可以自己去搜怎么搭建哦～

下面按 2026 年 10 月 17 日的权益和价格整理，网页和 CLI 两种方法选一种做就行

步骤图参考正常的微软页面，改成了隐私的信息

## 先领 Azure for Students

申请要求年满 18 岁，在符合条件的高校全日制就读，准备一个微软账号和能收到邮件的学校邮箱

### 路线一：从 GitHub 学生包进入

如果你已经通过 GitHub Education 认证，直接打开 [GitHub Student Developer Pack](https://education.github.com/pack)，找到 Microsoft Azure，点击领取入口，再登录自己的微软账号完成申请

确认领取的是 **Azure for Students，100 美元，12 个月**，不要和面向更低年龄段的 Azure for Students Starter 混在一起

如果进入学术验证页面后需要选择验证方法，就选 GitHub，再按页面提示完成账号授权

![学术验证方法下拉菜单，选择 GitHub](azure-students-assets/github-verification.webp)

### 路线二：用学校邮箱验证

打开 [Azure for Students](https://azure.microsoft.com/en-us/free/students/)，登录微软账号，按页面提示填写学校和学校邮箱

![微软学术验证表单，填写自己的真实学校信息和学校邮箱](azure-students-assets/academic-verification.webp)

上面的 `student@example.edu` 只是示例，申请时填自己的真实资料，学校所在国家也按实际情况选，和后面服务器选日本区是两回事

收到学术身份验证邮件后，点击邮件里的验证链接，再回到申请页面完成后面的步骤，链接有效期看邮件显示，过期就重新申请一封

收到了验证邮件，还不算已经领完，最后到 [Azure 门户](https://portal.azure.com/) 的「订阅」里确认出现 **Azure for Students**，再看余额和到期日

![收到 Microsoft Azure 的 Azure for Students 欢迎邮件](azure-students-assets/student-welcome.webp)

这两个入口领取的是同一份权益，邮箱路线卡住了可以换学生包入口试试

## 免费的是哪些

先分清两件事：**100 美元赠金用 12 个月，符合学生资格可以逐年续领；新客户前 12 个月的免费资源，不会跟着每年续领重新来一轮**

| 项目                  | 免费范围                                 | 这篇怎么选              |
| ------------------- | ------------------------------------ | ------------------ |
| `Standard_B2ats_v2` | 新客户前 12 个月，每月 750 小时                 | x64，优先选这个          |
| `Standard_B2pts_v2` | 新客户前 12 个月，每月 750 小时                 | Arm64，适合做第二台实验机    |
| `Standard_B1s`      | 学生说明页仍列有每月 750 小时                    | 先看自己的免费服务页和地区是否还可用 |
| 托管系统盘               | 前 12 个月，两块 64 GiB P6 Premium SSD LRS | `Premium_LRS`，每台一块 |
| Internet 出站流量       | 每月前 100 GB                           | 多台机器合计算，不按每台重复加    |
| 公网 IPv6 地址          | 无地址费                                 | 出站流量照常计量           |
| Standard 公网 IPv4    | 不在这里的免费地址额度里                         | 日本区约 0.005 美元/小时   |

每种免费 VM 规格的 750 小时分别计算，一个月够一台常开，但两台相同规格会一起消耗这份小时数，想开两台可以考虑一台 B2ats_v2 加一台 B2pts_v2

还有一个容易选错的地方：**免费盘是两个 P6 Premium SSD LRS，64 GiB**

![微软免费服务页面中的 Linux 虚拟机、P6 磁盘和出站流量说明](azure-students-assets/free-services.webp)

图里这几项重点看 Linux Virtual Machines、Azure Disk Storage 和 100 GB 出站，下面的流量预算也按每月 100 GB 这一档来算

进入「订阅 → Azure for Students → 免费服务」核对自己的可用额度，创建之后，等用量出现，再回来确认 VM 小时数和磁盘确实计入免费服务

## 区域我推荐日本

先查自己能开哪里，在 [Azure 门户](https://portal.azure.com/) 顶部搜索 **策略（Policy）**，进入后选左侧的 **分配（Assignments）**，范围选自己的 **Azure for Students** 订阅

打开 **Allowed resource deployment regions**，进入 **参数（Parameters）**，看 **Allowed locations** 的值，通常就能看到这个订阅允许的五个区域

比如我这里是：

```json
["centralindia","indiasouthcentral","uaenorth","malaysiawest","japaneast"]
```

这个列表每个人不一定一样，我这份里面有日本东部，所以直接选 `japaneast`

从国内用，我推荐 **日本 → 新加坡 → 印度 → 香港**，美国就不列作常规备选了，在自己允许的地区里按这个顺序找

| 地区 | CLI 名称 | 我的选择 |
| --- | --- | --- |
| 日本 | `japaneast` / `japanwest` | 首选，优先日本东部 |
| 新加坡 | `southeastasia` | 日本开不出来时再看 |
| 印度 | `centralindia` / `indiasouthcentral` 等 | 按自己策略里的印度区域选 |
| 香港 | `eastasia` | 放在最后，留意下面的 AI 服务限制 |

**香港目前不在 [ChatGPT 官方支持地区](https://help.openai.com/en/articles/7947663-chatgpt-supported-countries) 和 [Claude 官方支持地区](https://support.claude.com/en/articles/8461763-where-can-i-access-claude) 里**，想用这类 AI 服务就别把香港当作解锁地区，优先看日本、新加坡和印度

确定地区在允许列表里，再看规格和配额，区域出现在创建页的下拉框里，不代表这个学生订阅就能创建

遇到 `RequestDisallowedByAzure`，看错误里指出的地区策略；遇到规格不可用或区域容量不足，再换允许的区域，单纯换可用区不能绕过区域策略

## 网页版：在 Azure 门户里创建

### 基本信息和系统盘

进入「虚拟机 → 创建 → Azure 虚拟机」，按下面选：

| 设置 | 填写内容 |
| --- | --- |
| 订阅 | Azure for Students |
| 资源组 | 新建 `rg-student-jp` |
| 虚拟机名称 | `student-jp` |
| 区域 | Japan East |
| 可用性选项 | 入门先选无需基础结构冗余；有分区需求再选可用区 |
| 映像 | Ubuntu Server 24.04 LTS，x64 Gen2 |
| 安全类型 | 标准 |
| 大小 | `Standard_B2ats_v2` |
| 身份验证 | SSH 公钥 |
| 用户名 | `student` |
| 公共入站端口 | 只允许 SSH 22 |
| OS 磁盘类型 | Premium SSD LRS |
| OS 磁盘大小 | 64 GiB，P6 |
| 数据盘 | 不添加 |

先填订阅、资源组和区域，资源组这里直接新建 `rg-student-jp`，后面公网 IP 和网卡也放在这个组里

![创建虚拟机的基本信息，资源组 rg-student-jp，名称 student-jp，区域 Japan East](azure-students-assets/portal-basics.webp)

再往下选系统和规格，B2ats_v2 对应 x64，身份验证选 SSH 公钥，用户名这里统一用 `student`

![Ubuntu Server 24.04 LTS x64 Gen2、Standard_B2ats_v2 和 SSH 公钥设置](azure-students-assets/portal-image-size.webp)

如果用门户生成 SSH 密钥，创建时下载好私钥，之后连接就靠它；已经有自己的 SSH 公钥，也可以直接填进去

不要把 **Premium SSD v2** 和 **Premium SSD LRS** 选混，进入磁盘页后再确认一次 P6 和 64 GiB

### 网络怎么选

第一次用，我更推荐新建一个 **Standard 公网 IPv4**，IPv6 可以以后再加，大多数网络都能直接 SSH，装软件也省心

如果 VM 的网络页里新建公网 IP 不顺手，也可以从门户搜索「公共 IP 地址」单独创建，选择同一个资源组和 Japan East，名字用 `student-jp-ip4`，版本选 IPv4，SKU 选标准，再回到 VM 网络页选择它

![在 Japan East 创建 Standard 公网 IPv4，名称 student-jp-ip4](azure-students-assets/public-ipv4.webp)

如果确定自己上网的地方支持 IPv6，可以把公网 IPv4 选成「无」，创建之后再补 IPv6：

1. 打开 VM 所在的虚拟网络，在地址空间里增加 `fd12:3456:789a::/48`
2. 给 VM 所在子网增加 `fd12:3456:789a:1::/64`，Azure 的 IPv6 子网固定用 `/64`
3. 创建一个同区域的 Standard 公网 IP，地址版本选 IPv6，分配方式选静态
4. 打开 VM 的网络接口，在「IP 配置」里新增 IPv6 配置，选择刚才的子网和公网 IPv6
5. 保留原来的私网 IPv4 配置，检查网络安全组允许 TCP 22

第 3 步的页面和创建 IPv4 很像，名字换成 `student-jp-ip6`，IP 版本选 IPv6，SKU 仍选标准，别选成带 NAT Gateway 的标准 v2

![在 Japan East 创建 Standard 公网 IPv6，名称 student-jp-ip6](azure-students-assets/public-ipv6.webp)

这里说的纯 IPv6，是**不买公网 IPv4**，Azure 的 VM 网卡仍要保留私网 IPv4，不需要删它

备份、额外监控和付费附加服务都先不加，在「查看 + 创建」核对资源后创建，门户显示的 VM 标价也要结合自己的免费服务额度看，不是看到标价就说明没有免费权益

### 连上服务器

有公网 IPv4：

```powershell
ssh -i "$HOME\.ssh\azure-student" student@你的公网IPv4
```

只有公网 IPv6：

```powershell
ssh -6 -i "$HOME\.ssh\azure-student" student@你的公网IPv6
```

`$HOME\.ssh\azure-student` 换成自己保存的私钥路径，公网地址在 VM 的网络页查看

## CLI 版：用命令创建

下面用 Windows 上的 PowerShell 7.4 或更新版本，SSH 私钥保存在自己电脑上

### 安装、登录和检查

按 [微软的 Windows 安装方法](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows) 安装 Azure CLI，已经装好的可以跳过对应命令：

```powershell
winget install --exact --id Microsoft.AzureCLI
winget install --exact --id Microsoft.PowerShell
```

安装完成后重新打开 PowerShell 7，下面的命令都在这个窗口里执行，先设置遇到命令失败就停止，再登录和选择订阅：

```powershell
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true

az login
az account list -o table
az account set --subscription '你的 Azure for Students 订阅 ID'
```

设置下面这几个变量，`$publicIpv4 = $true` 表示购买一个公网 IPv4，改成 `$false` 就只创建公网 IPv6，两种都保留双栈私网

```powershell
$region = 'japaneast'
$group = 'rg-student-jp'
$vm = 'student-jp'
$size = 'Standard_B2ats_v2'
$image = 'Canonical:ubuntu-24_04-lts:server:latest'
$publicIpv4 = $true

az policy assignment list -o jsonc
az vm list-usage --location $region -o table
az vm list-skus --location $region --size $size `
  --resource-type virtualMachines --all `
  --query '[].{SKU:name,Restrictions:restrictions,Zones:locationInfo[0].zones}' -o jsonc
az vm image show --location $region --urn $image -o table
```

先看策略允许的地区、区域和规格家族的 vCPU 余额，再看 `Restrictions`，`Zones` 只是分区支持情况，不等于容量保证，免费资格仍在订阅的「免费服务」里确认

如果换成 B2pts_v2，要同时把 `$size` 改成 `'Standard_B2pts_v2'`、`$image` 改成 `'Canonical:ubuntu-24_04-lts:server-arm64:latest'`

### 创建网络和地址

后面继续在同一个 PowerShell 7 窗口执行，命令中的反引号是续行符，它后面直接换行

```powershell
New-Item -ItemType Directory -Path "$HOME\.ssh" -Force | Out-Null
ssh-keygen -t ed25519 -f "$HOME\.ssh\azure-student" -C azure-student

az group create --name $group --location $region

az network vnet create -g $group -n vnet-student -l $region `
  --address-prefixes 10.20.0.0/16 fd12:3456:789a::/48 `
  --subnet-name snet-student `
  --subnet-prefixes 10.20.1.0/24 fd12:3456:789a:1::/64

az network nsg create -g $group -n nsg-student -l $region
az network nsg rule create -g $group --nsg-name nsg-student `
  -n allow-ssh --priority 1000 --direction Inbound --access Allow `
  --protocol Tcp --source-address-prefixes Internet `
  --source-port-ranges '*' --destination-address-prefixes '*' `
  --destination-port-ranges 22

az network public-ip create -g $group -n "${vm}-ip6" -l $region `
  --sku Standard --version IPv6 --allocation-method Static

az network nic create -g $group -n "${vm}-nic" -l $region `
  --vnet-name vnet-student --subnet snet-student `
  --network-security-group nsg-student

az network nic ip-config create -g $group --nic-name "${vm}-nic" `
  -n ipconfig6 --private-ip-address-version IPv6 `
  --vnet-name vnet-student --subnet snet-student `
  --public-ip-address "${vm}-ip6"

if ($publicIpv4) {
  az network public-ip create -g $group -n "${vm}-ip4" -l $region `
    --sku Standard --version IPv4 --allocation-method Static
  az network nic ip-config update -g $group --nic-name "${vm}-nic" `
    -n ipconfig1 --public-ip-address "${vm}-ip4"
}
```

`ssh-keygen` 问到覆盖已有文件时不要覆盖自己的旧密钥，可以换一个新文件名，并同步修改后面的公钥路径

### 创建 VM，再确认系统盘

```powershell
az vm create -g $group -n $vm -l $region `
  --size $size --image $image --security-type Standard `
  --admin-username student --authentication-type ssh `
  --ssh-key-values "$HOME\.ssh\azure-student.pub" `
  --nics "${vm}-nic" --os-disk-name "${vm}-os" `
  --storage-sku Premium_LRS --os-disk-size-gb 64

az vm get-instance-view -g $group -n $vm `
  --query 'instanceView.statuses[].displayStatus' -o tsv
az disk show -g $group -n "${vm}-os" `
  --query '{Disk:name,Storage:sku.name,GiB:diskSizeGb,Tier:tier}' -o table
az network public-ip list -g $group `
  --query '[].{Name:name,Version:publicIPAddressVersion,Address:ipAddress}' -o table
```

系统盘应是 `Premium_LRS`、64 GiB、P6，记下输出的公网地址，用前面的 SSH 命令连接，这套命令默认不指定可用区，避免把某个区的容量要求写死

## 也可以让 AI 帮你配置

用能操作本机终端的 AI 助手时，把这一段发过去，账号登录和验证码自己在微软页面完成

```text
帮我用 PowerShell 7 安装 Azure CLI、登录 Azure for Students，检查允许地区、配额和免费服务；地区依次选日本、新加坡、印度、香港，列出费用等我确认，再创建一台 B2ats_v2、Ubuntu 24.04 LTS x64 Gen2、64 GiB P6 Premium_LRS 的 VM，配好双栈网络、公网 IPv4 和 IPv6、SSH 公钥与 TCP 22，验证 SSH 后给出地址、连接命令和资源清单
```

想只用 IPv6，把公网方案改成「Standard 公网 IPv6，保留双栈私网」；用普通聊天 AI，就让它给出 PowerShell 命令，自己复制执行

## 公网 IPv4 值不值得买

**想省心就保留一个 IPv4，想省地址费又能接受兼容性取舍，就只挂公网 IPv6**

IPv6 地址本身免费，传出去的数据仍然算出站流量，而且你连接服务器的网络也得有 IPv6，服务器访问只支持 IPv4 的网站或镜像源时，也可能连不上

![微软 IPv6 文档中的价格说明，公网 IPv6 地址免费，带宽和关联资源另计](azure-students-assets/ipv6-pricing.webp)

所以只挂 IPv6 后，先 SSH 连进 Ubuntu 服务器，再在服务器的 Bash 终端里看 IPv6 地址和路由，试试更新和自己会用到的软件源：

```bash
ip -6 addr show scope global
ip -6 route
curl -6 -I https://www.microsoft.com/
sudo apt update
curl -I https://github.com/
curl -I https://registry-1.docker.io/v2/
```

Docker Registry 返回 `401 Unauthorized` 通常表示已经连到服务，只是还没有认证；如果 GitHub 或软件源不通，就按具体服务检查 IPv6 支持，不用为了补这个自动加一个有固定费用的 NAT Gateway

## 每月能用多少流量

**Internet 入站免费，出站每月前 100 GB 免费**，下面按默认的 Microsoft 全球网络路由计算，日本、新加坡、印度和香港超出部分均为 0.12 美元/GB

上述地区的 Standard 公网 IPv4 是 0.005 美元/小时，按每月 730 小时算，一个地址约 **3.65 美元/月**，全年约 43.80 美元；公网 IPv6 没有地址费

![微软公网 IP 定价表，Standard 静态 IPv4 为每小时 0.005 美元](azure-students-assets/ipv4-pricing.webp)

如果把 100 美元平均留给 12 个月，每月预算约 8.33 美元，VM 和前两块 P6 都落在免费范围内，且没有其他费用，那么可以这样算：

| 地区和公网配置 | 地址费/月 | 赠金可覆盖的额外出站/月 | 加上免费 100 GB 后 |
| --- | --- | --- | --- |
| 日本 / 新加坡 / 印度 / 香港，一个 IPv4，可同时挂 IPv6 | 约 $3.65 | 约 39 GB | **约 139 GB/月** |
| 日本 / 新加坡 / 印度 / 香港，只有公网 IPv6 | $0 | 约 69 GB | **约 169 GB/月** |

公式也很简单：

```text
每月总出站 GB
= 100 + (100 ÷ 12 - 公网 IPv4 月费 - 其他月费) ÷ 每 GB 出站价格
```

这里算的是整个方案的合计预算，不是每台 VM 都拿一份 100 GB 和 100 美元，两台机器只买一个 IPv4，日区合计仍约 139 GB/月；买两个 IPv4，地址费就变成约 7.30 美元/月，能留给流量的赠金少很多

另外，100 美元是一次到账的一年余额，不是每月重新发 8.33 美元，免费 100 GB 则按月重置，没用完不会累到下个月，区域间流量等其他项目另算

## 用完以后怎么收拾

平时在订阅的「免费服务」看资源用量，在「成本管理」看 IPv4 和额外流量，学生赠金余额和到期日也顺手记下来

还符合学生资格时可以逐年续领 100 美元，前 12 个月的 VM 和磁盘免费期结束后，要重新把它们的费用算进预算，旧赠金不会结转

如果不用了，先保存自己的数据，再删这个专门用来练习的资源组，里面的 VM、磁盘、网卡和公网 IP 会一起删除：

```powershell
az group delete --name rg-student-jp
```

只停 VM 不会让磁盘和保留的静态 IPv4 一起消失，这也是我推荐把这套资源单独放一个组的原因，清理起来简单很多

## 参考资料

- [Azure for Students：100 美元、续领和免费 VM 说明](https://azure.microsoft.com/en-us/free/students/)
- [Azure for Students 资格和额度条款](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/)
- [GitHub Student Developer Pack](https://education.github.com/pack)
- [Azure 免费服务清单](https://azure.microsoft.com/en-us/pricing/free-services/)
- [微软社区：查看学生订阅允许部署的五个区域](https://learn.microsoft.com/en-us/answers/questions/5924508/requestdisallowedbyazure-allowed-resource-deployme)
- [微软社区对两块 64 GiB P6 免费盘的说明](https://learn.microsoft.com/en-us/answers/questions/5556769/which-storage-type-is-free-12months-in-free-tier)
- [公网 IP 定价](https://azure.microsoft.com/en-us/pricing/details/ip-addresses/)
- [日本区公网 IP 官方零售价格 API](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Network%27%20and%20armRegionName%20eq%20%27japaneast%27)
- [出站带宽定价](https://azure.microsoft.com/en-us/pricing/details/bandwidth/)
- [Azure IPv6：地址费用、双栈网卡和子网限制](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/ipv6-overview)
- [默认出站访问与新建私有子网](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/default-outbound-access)
- [在 Windows 上安装 Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows)
- [在 PowerShell 中使用 Azure CLI](https://learn.microsoft.com/en-us/cli/azure/use-azure-cli-successfully-powershell)
- [Azure CLI 交互登录与订阅选择](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively)

## 继续读

其他官方权益放在 [[edumails-glados-student-benefits|学生权益总表]]，也可以对照 [[aliyun-student-300-voucher-guide|阿里云学生券]] 选一台适合自己的机器

服务器开好了，接着看 [[docker-compose-minimum-start|Docker 入门]] 和 [[2c2g-server-service-index|小服务器服务清单]]，再挑 [[selfhost-ntfy-on-2c2g|ntfy 通知]] 或 [[selfhost-vaultwarden-on-2c2g|Vaultwarden 密码库]]，域名和 HTTPS 交给 [[cloudflare-free-tier-developer-guide|Cloudflare]]
