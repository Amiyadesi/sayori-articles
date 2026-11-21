---
title: Diário de como transformei um PC velho com Win7 em um servidor caseiro
published: 2026-08-09
created: 2026-08-09
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: Transformando um PC antigo com Win7 em um servidor Linux do zero — depois de ler isso, você também consegue fazer o seu
image: ""
tags:
  - Tutorial prático
  - VPS e Auto-hospedagem
  - Docker
  - Servidor caseiro
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/make-home-server/make-home-server"
---
# Como tudo começou
Quando voltei para casa nas férias de verão e estava conversando com o pessoal daqui, descobri que tinha um PC velho com Win7 encostado que ninguém ia mais usar. Aproveitei a deixa para montar um servidor caseiro e, estudando e seguindo o passo a passo detalhado com a ajuda da IA, finalmente consegui configurar tudo e conectar na minha rede do Tailscale com sucesso. Resolvi deixar tudo registrado aqui.
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# Registro completo

## Fase de preparação

Separe um pendrive pequeno de pelo menos 4 GB para criar o instalador do sistema Ubuntu. Primeiro, baixe a versão estável mais recente no [site oficial do Ubuntu Server](https://ubuntu.com/download/server) — eu, por exemplo, baixei a versão 26.04 — e depois baixe o [Rufus](https://rufus.ie/) para criar o pendrive bootável.
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
No Rufus, selecione a imagem do Ubuntu que você baixou. Confira se não há nenhum arquivo importante no pendrive antes de iniciar a gravação; as outras opções podem ficar no padrão mesmo. Quando terminar, você terá um pendrive pronto com o instalador do Ubuntu Server 26.04 LTS.

## Fase de instalação
Espete o pendrive antes de ligar o PC. Quando aparecer o logotipo da **Lenovo**, aperte `F12` várias vezes seguidas; se não funcionar, tente `Fn+F12`. Ao entrar no **Boot Menu**, use as setas do teclado para escolher a opção de boot com USB para iniciar pelo pendrive e entrar no processo de instalação do Ubuntu.

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

Nas primeiras telas, é só ir aceitando as opções padrão mesmo. Quando cheguei nesta etapa aqui, a IA recomendou marcar a terceira opção para buscar drivers de terceiros automaticamente, evitando problemas de ficar sem som ou sem conseguir conectar no Wi-Fi.

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

Depois, ao chegar nesta página, se você tiver Wi-Fi em casa, use as setas para ir até a segunda opção `wlp3s0`, aperte Enter e selecione `Edit Wifi`. É só preencher o nome e a senha do Wi-Fi da sua casa, assim o sistema já sobe conectado à internet quando terminar de configurar.

Na tela seguinte, o instalador pede configurações de proxy. Se você não precisar disso, pode pular direto.

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

Se você vai formatar e converter o PC inteiro como eu fiz, é só continuar clicando em done. A próxima página vai mostrar um resumo das especificações do seu computador; continue clicando em done e continue, e aí ele vai entrar na etapa de instalação por um tempinho......

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

Ao chegar nesta tela, você já pode definir o nome do servidor, o nome de usuário e a senha. O instalador do Ubuntu Server cria um usuário comum e concede a ele permissões de `sudo`; por padrão, o Ubuntu bloqueia a conta `root`, então não precisa colocar o nome de usuário como `root`. Eu usei `amiya`, depois faço login via `ssh amiya@服务器地址` e rodo `sudo` quando preciso de privilégios de administrador.

Anote bem o hostname, o nome de usuário e a senha que você definiu aqui. Esquecer a senha não obriga necessariamente a reinstalar tudo do zero, mas o processo de recuperação dá bem mais trabalho.

No meio do caminho vai aparecer uma tela perguntando se você quer ativar o Ubuntu Pro. Pode pular direto, gente normal praticamente não usa isso haha.

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

Agora vem a **parte importante**: primeiro, o OpenSSH tem que ser instalado com certeza. Segundo, se você tem uma conta no GitHub e já configurou uma chave pública SSH por lá, dá para digitar seu nome de usuário do GitHub direto para importar a chave. Depois que a instalação acabar, você já consegue acessar pelo IP e pela chave SSH dentro da mesma rede local.

Depois de confirmar que a chave pública foi importada direitinho, você pode deixar desmarcada a opção `[ ] Allow password authentication over SSH` que aparece na imagem. Ela controla se o login via SSH usando senha fica permitido ou não.

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

Em seguida, o instalador mostra uma lista de softwares comuns para servidor. Se você realmente precisar de algum, marque com a barra de espaço; se não precisar de nada por enquanto, vá direto em `Done`.

Por fim, depois de clicar em `Reboot Now`, se aparecer a mensagem **Please remove the installation medium, then press ENTER**, fica bem fácil: tire o pendrive e aperte Enter para o sistema iniciar normalmente! Se essa mensagem não aparecer, tire o pendrive assim que a tela ficar preta, senão você vai entrar em um loop infinito de reinstalação......

## Configuração inicial

Para facilitar o acesso remoto depois, escolhi montar a rede usando o Tailscale.

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

Depois de instalar tudo isso, geralmente aparece um link do Tailscale. É só fazer login na sua conta do Tailscale no seu computador principal para conseguir acessar a rede local sem dor de cabeça!

# Considerações finais
Até o momento, já está rodando há mais de dois dias, e consegui migrar com sucesso meu bot Sayori (rodando AstrBot e NapCat) para o servidor residencial, aê!

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

Também migrei o Fast Note Sync para o servidor de casa, deixando a sincronização dos dados do meu blog bem mais rápida.

> [!NOTE]
> Por enquanto ainda não sei muito bem o que mais inventar por aqui, mas ter um servidor rodando na internet residencial de casa até que é bem divertido. Nos testes, a banda de upload bateu cerca de 70 Mbps, e 2 núcleos com 4 GB de RAM dão conta do recado. Se você leu até aqui, manda aí umas sugestões de como aproveitar melhor esse mini servidor caseiro!

## Continue lendo

Com a máquina pronta, você pode seguir para [[docker-compose-minimum-start|Introdução mínima ao Docker]] e depois escolher um serviço que faça sentido para você na [[2c2g-server-service-index|Lista de serviços para pequenos servidores]]

Mais tarde eu também migrei a sincronização das minhas notas para casa; o passo a passo está em [[fast-note-sync-on-student-server|Fast Note Sync]], e se precisar configurar domínio e HTTPS para os serviços, dá uma olhada em [[cloudflare-free-tier-developer-guide|Cloudflare]]
