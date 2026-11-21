---
title: Eu só queria que o bot ficasse online 24 horas por dia e acabei comprando um servidor na nuvem
published: 2026-05-25
created: 2026-05-25
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: De cupons de estudantes da Alibaba Cloud ao Ubuntu, login por chave SSH, portas não padrão e firewall básico, o primeiro passo para ter um servidor pessoal.
image: ""
tags:
  - 实操教程
  - VPS与自托管
  - 阿里云
  - 官方学生权益
category: "Tutoriais e guias"
draft: false
lang: pt-BR
translationKey: "posts/sayori-server-01-vps-start/sayori-server-01-vps-start"
---

# Introdução

No começo, eu não planejava montar nenhum sistema de servidores. Eu só queria que o bot do QQ ficasse online 24 horas por dia.

Claro que também dá para rodar localmente. Deixando o AstrBot aberto, o NapCat rodando, sem fechar o serviço e sem cair a rede, usando o computador como host principal.

![[Pasted image 20260609215751.png]]

Então, naturalmente compreendi o conceito de um servidor: um computador ligado 24 horas por dia, alojado no data center de outra pessoa.

E como o autor é um estudante pobre, obviamente acionei o meu exército de IAs para me ajudar a vasculhar canais gratuitos )

Mais tarde, vi que a verificação de estudante da Alibaba Cloud oferecia um cupom de 300 yuans — [link de resgate de benefícios para estudantes](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv) —, e seria burrice não pegar.

Depois de resgatar, vi também que havia um [ECS de avaliação](https://free.aliyun.com). Recomendo experimentar este primeiro; abrir uma configuração de 2 vCPUs e 2 GB de RAM já é o suficiente para brincar com o bot, e dura exatamente três meses.

![[Pasted image 20260609221047.png]]

E este cupom de 300 yuans pode ser usado exatamente na conversão do ECS de avaliação para um ECS de assinatura anual/plurianual. O autor já converteu o dele!

![[Pasted image 20260609221956.png]]

Fazendo as contas, basicamente dá para conseguir um servidor gratuito por quatro anos na faixa.

Porém, vale notar que o tráfego gratuito mensal da Alibaba Cloud para o continente parece ser de apenas 20 GB. Para mim, que só rodo o bot, isso basta, mas é melhor configurar um alerta de limite de uso.

## Conectando a esta máquina pela primeira vez

Depois de comprar o servidor, o verdadeiro problema começou: como eu entro nele?

O painel fornecerá um IP público, o usuário `root` e uma senha inicial. O jeito mais direto é conectar uma vez usando a senha:

```powershell
ssh root@<VPS_PUBLIC_IP>
```

Na primeira conexão, o sistema perguntará se você deseja confiar nesta máquina. Confirme se o IP está correto e digite `yes`.

Mas esse login por senha serve apenas como transição. Para uso prolongado de verdade, eu ainda recomendo mudar diretamente para o login por chave SSH.

A senha é como deixar a chave escondida embaixo do capacho. É cômodo, mas máquinas na internet pública sofrem varreduras todos os dias. A porta padrão 22 com login por senha é basicamente dizer para vários scripts na internet: "venham bater na minha porta".

## Gerando a chave SSH

Eu fiz isso no Windows, então primeiro criei localmente uma chave SSH dedicada para este servidor:

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

Pressionar Enter em tudo também funciona. Se você quiser adicionar uma camada extra de proteção à chave privada, defina uma passphrase.

Após a geração, haverá dois arquivos:

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

O arquivo que não tem `.pub` é a chave privada. ~~Se não souber para que serve, pode me enviar~~, assim eu poderei me conectar ao seu SSH 😈

O que tem `.pub` é a chave pública, que pode ser colocada no servidor.

Dê uma olhada no conteúdo da chave pública:

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

Copie a linha inteira, desde `ssh-ed25519` até o final dos comentários.

## Colocando a chave pública no servidor

Mantenha aquela janela SSH com login por senha aberta e prepare o diretório SSH no servidor:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

Cole aquela linha inteira do seu `.pub` local e salve.

Em seguida, ajuste as permissões:

```bash
chmod 600 ~/.ssh/authorized_keys
```

Este passo parece meio sem sentido, mas é muito importante. Se as permissões estiverem muito frouxas, o SSH simplesmente falhará e recusará totalmente essa chave.

Depois, crie um alias SSH no arquivo local. Assim, você não precisará digitar uma sequência enorme de IP, porta e caminho da chave privada todas as vezes.

Abra:

```powershell
notepad $env:USERPROFILE\.ssh\config
```

Escreva dentro:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

Abra um novo terminal para testar:

```powershell
ssh sayori
```

Se conectar direto, significa que o login por chave já está funcionando.

Atenção: abra um novo terminal para testar. Não feche a janela antiga de login por senha ainda; esta janela agora funciona como uma corda de segurança. Só solte depois que tudo estiver alterado.

## Desativando a senha e mudando para uma porta não padrão

Com a chave funcionando para login, você pode desativar o login por senha e, ao mesmo tempo, mover o SSH para longe da porta padrão 22.

Primeiro, escolha uma porta não padrão, por exemplo:

```text
11451
```

Não copie o meu valor diretamente. Escolha você mesmo uma porta entre 1024 e 65535 que não entre em conflito com outros serviços.

Depois, vá até os grupos de segurança do ECS da Alibaba Cloud e libere esta porta. Isso é muito importante.

O UFW dentro do servidor é uma porta, e o grupo de segurança da Alibaba Cloud é outra. Se você alterar apenas o servidor e não mexer no grupo de segurança, a nova porta continuará inacessível.

Após liberar no grupo de segurança, volte à janela SSH e crie um trecho de configuração SSH próprio:

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

Conteúdo:

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

O `PermitRootLogin prohibit-password` aqui significa que o `root` ainda pode fazer login usando a chave, mas não com a senha.

Uma abordagem mais rigorosa é criar um usuário comum novo e desativar o `root`. É que este meu artigo aborda primeiro o método mais rápido para uso imediato.

Após fazer as alterações, primeiro verifique se há erros de sintaxe na configuração do SSH:

```bash
sshd -t
```

Nenhuma saída é uma boa notícia.

Em seguida, reinicie o serviço SSH:

```bash
systemctl restart ssh
```

Agora não feche a janela antiga.

Altere também a porta no seu `~/.ssh/config` local:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

Abra um terceiro terminal para testar:

```powershell
ssh sayori
```

Se conseguir conectar, significa que a nova porta, o login por chave e o grupo de segurança estão funcionando.

Eu testo mais uma vez se o login por senha antigo foi realmente desativado, por exemplo, tentando conectar manualmente ao IP sem usar a chave privada.

Se o sistema ainda pedir sua senha e permitir a entrada, significa que `PasswordAuthentication no` não surtiu efeito. Não tenha pressa em continuar; descubra isso primeiro.

## Configurando o firewall

Assim que o SSH estiver firme, configure o firewall próprio do servidor.

No Ubuntu, o mais prático é o UFW:

```bash
apt update
apt install -y ufw
```

Escreva as regras com antecedência:

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

Se você já estiver se preparando para abrir um serviço Web, pode reservar HTTP / HTTPS:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

Em seguida, ative-o:

```bash
ufw enable
ufw status verbose
```

Aqui eu ainda recomendo manter a janela SSH antiga aberta. Abra um novo terminal e conecte-se novamente:

```powershell
ssh sayori
```

Se conseguir conectar, feche a janela antiga.

## Explorando a máquina após a conexão

Depois de conectar de forma estável, você pode dar uma olhada no status da máquina:

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

Com 2 vCPUs e 2 GB, a memória não é grande, então na hora de escolher os serviços mais adiante, todos devem ser leves.

Sempre que possível, evite banco de dados; prefira usar o SQLite quando puder; hospede no Cloudflare Pages em vez de na VPS quando possível.

Mais tarde, esta máquina não rodou apenas o bot: Vaultwarden, ntfy, Gatus, Portainer e AI Search Gateway nasceram daqui.

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/), aqui há uma série "awesome" excelente sobre como aproveitar servidores!

Olhando para trás, a coisa mais útil de um servidor pessoal não é um serviço específico em si, mas sim o fato de ele te forçar a entender redes, implantação, segurança e backups.

Se eu pudesse recomeçar, criaria alguns hábitos mais cedo:

1. Um diretório separado para cada serviço
2. Chaves reais apenas em `.env` ou nos Segredos da plataforma
3. Escrever todos os comandos reproduzíveis na documentação
4. Deixar um comando de validação após cada implantação

Por enquanto é só isso. O servidor agora pode ser conectado de forma estável via SSH, o login por senha foi desativado, a porta foi alterada e o firewall tem os limites mais básicos configurados.

O próximo artigo explicará como usar `scp` para migrar as configurações locais para o host remoto.

Ou seja, finalmente começaremos a mover o bot de "roda no meu computador" para "também roda no servidor".

## Continuar lendo

Se você ainda não escolheu uma máquina, pode dar uma olhada em [[aliyun-student-300-voucher-guide|Cupons de estudante da Alibaba Cloud]] ou [[azure-students-100-credit-guide|Servidor do Azure no Japão]]; depois de conectar, siga o caminho de [[docker-compose-minimum-start|Introdução ao Docker]] → [[2c2g-server-service-index|Lista de Serviços]] para escolher e instalar um serviço que você saiba usar.
