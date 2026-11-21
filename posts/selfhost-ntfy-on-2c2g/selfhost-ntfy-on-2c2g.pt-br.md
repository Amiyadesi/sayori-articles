---
title: "Rodando o ntfy num servidor estudantil 2C2G: dando a si mesmo um botão de notificação"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: Implante o serviço de push ntfy com Docker num servidor estudantil para scripts de backup, monitoramento e tarefas agendadas mandarem notificações pro celular.
image: ""
tags:
  - Tutorial prático
  - VPS e auto-hospedagem
  - Docker
  - Notificações push
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g"
---

O ntfy é um dos serviços mais discretos e úteis que rodo no meu servidor.

O que ele faz é simples: você manda uma frase com uma requisição HTTP e ele empurra essa frase pro seu celular. É basicamente um duto de notificação.

Mas esse duto serve pra bem mais coisa do que parece:

- O script de backup terminou e avisa se deu certo ou errado
- O alerta de custo do servidor disparou e te chama pra dar uma olhada
- Uma tarefa agendada deu ruim e te manda um aviso
- O monitoramento do Gatus viu que algum serviço caiu e te avisa
- Um certificado tá perto de vencer e te lembra
- Também dá pra mandar comandos personalizados pra fazer uns ajustes rápidos à distância

Projeto oficial:

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

Documentação oficial:

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## Por que auto-hospedar

O ntfy tem o servidor público oficial `ntfy.sh`, que funciona sem instalar nada.

Mesmo assim, preferi auto-hospedar pelos seguintes motivos:

- Os topics do servidor público são abertos. Qualquer um que saiba o nome do seu topic pode mandar coisa lá dentro
- Auto-hospedando dá pra colocar autenticação de usuário
- Auto-hospedando dá pra controlar retenção e logs
- O servidor estudantil já tem espaço sobrando, e o ntfy é bem leve

Se for só pra testar rapidinho, usar o `ntfy.sh` público serve de boa. Mas pra uso contínuo, auto-hospedar passa mais tranquilidade.

## Deploy

Prepare o diretório:

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

Escreva o `docker-compose.yml`:

```yaml
services:
  ntfy:
    image: binwiederhier/ntfy
    container_name: ntfy
    restart: unless-stopped
    command: serve
    environment:
      TZ: Asia/Shanghai
      NTFY_BASE_URL: "https://ntfy.example.com"
      NTFY_AUTH_DEFAULT_ACCESS: "deny-all"
    volumes:
      - ./cache:/var/cache/ntfy
      - ./data:/var/lib/ntfy
      - ./etc:/etc/ntfy
    ports:
      - "127.0.0.1:8090:80"
```

Alguns pontos importantes:

- Porta `127.0.0.1:8090:80`: escuta só localmente. Não exponha direto na internet pública
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`: bloqueia por padrão qualquer requisição sem autenticação. Assim só você mesmo (com token ou usuário e senha) consegue enviar e receber
- `NTFY_BASE_URL`: coloque o domínio que você vai usar no final; no meu caso, é `ntfy.sayori.org`

## Subindo o serviço

```bash
docker compose up -d
docker compose logs -f
```

Teste local:

```bash
curl http://127.0.0.1:8090/
```

Basta ver a resposta da interface web do ntfy.

## Criando um usuário

Como ativamos `deny-all`, precisamos criar um usuário pra gente:

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

Ele vai pedir uma senha. Guarde esse usuário e senha, porque vamos usar depois pra mandar notificações e no app do celular.

Também dá pra gerar um token:

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

O token é mais prático que a senha; nos scripts, basta mandar direto no header.

## Conectando o domínio

Igual ao Vaultwarden, vai de Cloudflare Tunnel ou proxy reverso com Caddy/Nginx.

Pelo caminho do Cloudflare Tunnel:

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

Depois de confirmar que o HTTPS tá abrindo certinho, abra `https://ntfy.example.com` e entre na interface web com a conta que você criou.

## Mandando a primeira notificação

O jeito mais simples:

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

Aqui `/test` é o nome do topic. Dá pra inventar qualquer nome, tipo `/backup`, `/alert` ou `/server`.

Também dá pra mandar com título e prioridade:

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## App no celular

Android:

- Tem cliente do ntfy no F-Droid
- Também tem no Google Play

iOS:

- Busque por ntfy na App Store

Ao abrir o app:

1. Adicione o endereço do seu servidor auto-hospedado nas configurações
2. Preencha o usuário e senha ou o token
3. Assine seus topics (por exemplo, `backup`, `alert`)

A partir daí, as notificações enviadas pelo servidor vão chegar no seu celular.

## Usando nos scripts

Adicione uma linha no fim do script de backup:

```bash
NTFY_URL="https://ntfy.example.com/backup"
NTFY_TOKEN="你的token"

# 备份成功时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ✅ 备份成功" \
     -d "Vaultwarden 备份完成 $(date +%F)" \
     "$NTFY_URL"

# 备份失败时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ❌ 备份失败" \
     -H "Priority: high" \
     -d "Vaultwarden 备份出错，请检查日志" \
     "$NTFY_URL"
```

Notificação de falha em tarefa agendada:

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## Integrando com o Gatus

Se você roda o Gatus pra checagem de saúde, dá pra colocar o ntfy como canal de alerta na configuração do Gatus.

O Gatus tem suporte nativo a alertas do ntfy; basta preencher o endereço do servidor, o topic e o token na config.

Assim, quando algum serviço cair, o Gatus manda uma notificação pro ntfy automaticamente e seu celular toca.

## Consumo de recursos

O ntfy é bem leve.

Rodando no meu servidor, fica por volta de 20-30MB de RAM no dia a dia. CPU é praticamente zero. Num 2C2G, não pesa nada.

Ele não precisa de banco de dados. As mensagens ficam em cache em arquivos locais e expiram automaticamente depois de um tempo padrão.

## Pontos de atenção

- Não coloque o token do ntfy em repositório público
- Se você ligou `deny-all`, mas algum serviço externo (como o Gatus rodando na mesma máquina) precisa mandar notificação sem autenticação, dá pra liberar permissão separada pra certos topics
- As mensagens não ficam guardadas pra sempre. Se você precisa de histórico, quem envia deve gravar o próprio log
- A interface web do ntfy não precisa ficar exposta na internet pública. O app do celular assina usando a API

## Vale a pena num 2C2G?

Vale muito. Provavelmente é um dos serviços com melhor custo-benefício num 2C2G.

Depois que você instala, percebe que o último passo de quase todo script vira "manda uma notificação me dizendo o resultado" — muito mais confortável do que entrar via SSH todo dia pra olhar log.

E o ntfy ainda permite uns comandos curtos personalizados; por exemplo, o dono do blog pode receber a moderação de comentários pelo ntfy e responder `/delete ID_do_comentario` pra apagar ou `/recover ID_do_comentario` pra restaurar.

## Continue lendo

Sobre domínio e HTTPS, dá pra seguir em [[free-domain-and-web-community|Tutorial de domínio]] e [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]]; com o duto de notificação pronto, também dá pra mandar pro celular o resultado do backup do [[selfhost-vaultwarden-on-2c2g|Vaultwarden]], e pra outros usos é só voltar na [[2c2g-server-service-index|Lista de serviços]] e escolher.
