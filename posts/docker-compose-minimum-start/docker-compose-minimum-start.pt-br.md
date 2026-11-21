---
title: "Introdução Mínima ao Docker e Docker Compose: Entendendo aqueles arquivos yml"
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: "Uma introdução mínima ao Docker para quem acabou de pegar um servidor: o que são os contêineres, como ler arquivos compose, como iniciar, parar, atualizar e excluir. Sem enrolação teórica, direto ao que funciona."
image: ""
tags:
  - Tutoriais Práticos
  - Docker
  - VPS e Self-Hosting
  - Para Iniciantes
category: "Tutoriais e guias"
draft: false
lang: pt-BR
translationKey: "posts/docker-compose-minimum-start/docker-compose-minimum-start"
alias: ""
---

Se você olhar meus outros artigos, vai perceber que quase todo serviço auto-hospedado roda usando o Docker.

Vaultwarden, ntfy, Gatus, Fast Note Sync, tudo resolvido com um único arquivo `docker-compose.yml`.

Este post explica: depois de pegar o servidor, como instalar o Docker, como entender um arquivo compose, como iniciar, parar, atualizar e excluir contêineres. O suficiente para você rodar todos os serviços anteriores.

## O que é o Docker (versão em uma frase)

O Docker permite rodar serviços diretamente usando "imagens" empacotadas por outras pessoas, sem precisar instalar dependências manualmente no sistema uma a uma.

Você não precisa instalar Python, Go, Node, configurar variáveis de ambiente ou lidar com conflitos de versão manualmente. Está tudo dentro da imagem.

`docker-compose.yml` é apenas um arquivo de configuração que diz ao Docker:

- Qual imagem puxar
- Quais portas usar
- Quais diretórios montar
- Quais variáveis de ambiente definir
- Se deve reiniciar automaticamente caso ocorra um erro

## Instalação

Para instalar o Docker no Ubuntu / Debian:

```bash
curl -fsSL https://get.docker.com | sh
```

Esse script de instalação rápida vai instalar o Docker Engine e o Docker Compose (agora o compose é um subcomando do Docker, não precisa mais instalar o `docker-compose` separado).

Após a instalação, verifique:

```bash
docker --version
docker compose version
```

Se você não quiser usar `sudo` para rodar o Docker:

```bash
sudo usermod -aG docker $USER
```

Em seguida, saia e faça login novamente. Se ainda assim não funcionar, reinicie o servidor.

## O primeiro arquivo compose

Vou usar o exemplo mais simples para vermos como funciona:

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

Tradução linha por linha:

| Linha | Significado |
| --- | --- |
| `services:` | Define a lista de serviços abaixo |
| `whoami:` | Nome do serviço, escolha o que quiser |
| `image: traefik/whoami` | Usa esta imagem |
| `container_name: whoami` | O contêiner se chama whoami |
| `restart: unless-stopped` | Reinicia automaticamente se cair, a menos que você pare manualmente |
| `ports: - "127.0.0.1:8080:80"` | Mapeia a porta 8080 da máquina local para a porta 80 do contêiner |

Salve este trecho como `docker-compose.yml` (ou `compose.yml`, qualquer um dos dois nomes serve) e execute no mesmo diretório:

```bash
docker compose up -d
```

`-d` serve para rodar em segundo plano (background).

Verifique:

```bash
curl http://127.0.0.1:8080/
```

Se você vir a resposta retornada, significa que está rodando.

## Comandos mais usados

Coloquei os mais utilizados aqui:

```bash
# 启动（后台）
docker compose up -d

# 查看日志
docker compose logs -f

# 查看日志（只看最后 100 行）
docker compose logs --tail=100

# 停止
docker compose down

# 重启
docker compose restart

# 查看状态
docker compose ps

# 进入容器内部（排查问题时用）
docker compose exec whoami sh
```

Todos os comandos devem ser executados no diretório onde o `docker-compose.yml` está localizado.

## Entendendo um arquivo compose real

Vamos usar o do Vaultwarden como exemplo:

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

Novas coisas que apareceram:

| Campo | Significado |
| --- | --- |
| `environment:` | Variáveis de ambiente, equivalem a itens de configuração |
| `volumes: - ./vw-data:/data` | Monta a pasta `vw-data` do diretório atual dentro do contêiner em `/data` |

### environment

As variáveis de ambiente são a forma de configuração da maioria dos serviços Docker.

Serviços diferentes possuem variáveis diferentes; por exemplo, o Vaultwarden usa `DOMAIN` e `SIGNUPS_ALLOWED`, enquanto o ntfy usa `NTFY_BASE_URL` e `NTFY_AUTH_DEFAULT_ACCESS`.

Basta consultar a documentação de cada projeto para saber quais variáveis ele suporta.

### volumes

Os volumes são a chave para a persistência de dados.

Depois que um contêiner é apagado, os arquivos dentro dele desaparecem. Mas os diretórios montados por volumes ficam na máquina hospedeira (host) e não somem junto com o contêiner. Funciona como um arquivo de salvamento de jogo: cada vez que o contêiner inicia, ele lê o save e começa o jogo (risos).

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

Isso significa que:

- Os arquivos em `/data` dentro do contêiner ficam salvos na verdade em `./vw-data` no host
- Se você apagar o contêiner e recriá-lo, os dados continuam lá
- Para fazer backup, basta copiar a pasta `./vw-data` do host

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1` significa que apenas a máquina local pode acessar. De fora não é possível conectar.

Se você escrever `"0.0.0.0:8080:80"` ou `"8080:80"`, qualquer pessoa na rede pública também poderá acessar diretamente.

Para cofres de senhas, painéis de gerenciamento e coisas do tipo, use sempre `127.0.0.1`, e então utilize um proxy reverso ou um Tunnel para expor via HTTPS.

## Usando um arquivo .env para informações sensíveis

Não coloque senhas, tokens e domínios diretamente no `docker-compose.yml` para depois enviar ao GitHub.

Crie um arquivo `.env` no mesmo diretório:

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

Em seguida, faça a referência no compose:

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

Adicione o arquivo `.env` ao seu `.gitignore` para que ele não vá para o repositório.

## Atualizando serviços

Para atualizar um serviço:

```bash
cd /srv/stacks/vaultwarden

# 先备份数据
tar -czf backup-$(date +%F).tar.gz vw-data

# 拉新镜像
docker compose pull

# 用新镜像重启
docker compose up -d

# 看日志确认正常
docker compose logs --tail=50
```

Faça backup antes de atualizar. Se algo der errado, você ainda consegue reverter (rollback).

## Excluindo serviços

Se você não quiser mais algum serviço:

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down` apaga apenas o contêiner, sem deletar os dados dos volumes.

Se você quiser limpar tudo completamente, incluindo os volumes:

```bash
docker compose down -v
```

Mas isso vai apagar os dados. Só use se tiver certeza de que não precisa mais deles.

## Limpando o disco

O Docker acumula muitas imagens antigas com o tempo. Em um disco de 2C2G que não é muito grande, vale a pena dar uma limpa de vez em quando:

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

O `prune` limpa apenas o que não está em uso, os serviços em execução não são afetados. Mas pense bem antes de usar o `--volumes`.

## Minha estrutura de diretórios

Eu costumo organizar assim:

```text
/srv/stacks/
├── vaultwarden/
│   ├── docker-compose.yml
│   ├── .env
│   └── vw-data/
├── ntfy/
│   ├── docker-compose.yml
│   ├── .env
│   ├── cache/
│   ├── data/
│   └── etc/
├── gatus/
│   ├── docker-compose.yml
│   └── config/
└── fast-note-sync/
    ├── docker-compose.yml
    ├── .env
    └── storage/
```

Um diretório para cada serviço. Basta entrar no diretório para rodar `docker compose up -d`. Os dados e as configurações ficam em suas próprias pastas, o que facilita bastante na hora de fazer backup.

## Problemas comuns

**Conflito de portas**

Dois serviços não podem usar a mesma porta no host. Se o Vaultwarden usou a 8080, o ntfy precisa usar outra, como a 8090.

**Problemas de permissão**

Algumas imagens rodam com um usuário não-root dentro do contêiner, e permissões incorretas no diretório montado podem impedir a gravação de arquivos. Nesses casos, verifique o proprietário e as permissões do diretório no host.

**Esquecer o -d**

Se você rodar `docker compose up` sem `-d`, o serviço para assim que você fechar o terminal. Lembre-se de adicionar o `-d`.

**compose v1 vs v2**

O comando `docker-compose up` (com hífen) visto em tutoriais antigos é da v1. Hoje usamos `docker compose up` (com espaço), que é a v2. Sistemas recém-instalados usam a v2; se você vir um tutorial antigo com hífen, basta trocar por espaço.

## O suficiente por enquanto

Chegando aqui, você já sabe:

- Instalar o Docker
- Entender um arquivo compose
- Iniciar, parar, atualizar e excluir serviços
- Gerenciar dados e configurações
- Limpar o disco

A partir de agora, em cada post de serviço auto-hospedado, bastará eu te dar um `docker-compose.yml` para você conseguir rodar tudo.

Não precisa entender todos os conceitos do Docker logo no começo. Primeiro use, e quanto mais usar, mais vai querer saber.

## Continue lendo

Comece escolhendo um propósito na [[2c2g-server-service-index|Lista de Serviços para Servidores Pequenos]], depois coloque para rodar o [[selfhost-ntfy-on-2c2g|ntfy para notificações]], o [[selfhost-vaultwarden-on-2c2g|Vaultwarden para senhas]] ou a [[fast-note-sync-on-student-server|sincronização do Obsidian]], e conecte seu domínio e ponto de acesso usando o [[cloudflare-free-tier-developer-guide|Cloudflare]].
