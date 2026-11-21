---
title: "O que roda num servidor estudantil 2C2G: melhor não entupir a maquininha"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "Configuração prática do autor no servidor leve 2C2G da Alibaba Cloud: Vaultwarden, ntfy, Gatus, Fast Note Sync, AstrBot e gateway de busca. Inclui consumo real de RAM e lista do que não vale a pena"
lang: pt-BR
translationKey: "posts/student-2c2g-server-service-index/2c2g-server-service-index"
image: ""
tags:
  - tutorial prático
  - VPS e auto-hospedagem
  - Docker
  - servidor estudantil
category: "Tutoriais e guias"
draft: false
alias: ""
---
Se você, assim como o admin do blog, trocou o cupom estudantil de 300 yuans da Alibaba Cloud por um servidor 2C2G, parabéns

agora você tem uma maquininha online 24 horas por dia

Ainda não ligou? Dá uma olhada em [[aliyun-student-300-voucher-guide|Cupom estudantil da Alibaba Cloud]] ou [[azure-students-100-credit-guide|Servidor japonês no Azure]]; este post cuida do que fazer depois de ligar

Mas é realmente só uma maquininha. São 2 núcleos e 1,6 GB de RAM (cerca de 672 MB disponíveis na prática, com Swap ativado), boa para praticar e rodar serviços leves, mas não para modelos locais, Nextcloud ou transcodificação de vídeo

Este post é o registro real da configuração do admin. O servidor já roda há mais de um mês: atualmente são 14 containers, usando 765 MB de RAM + 987 MB de Swap, e 21 GB / 40 GB de disco

## Faça a configuração base primeiro

Não saia instalando serviços na pressa

Assim que pegar o servidor, faça primeiro estas coisas:

- Login por chave SSH
- Desative o login por senha
- Troque para uma porta SSH não padrão
- Configure o security group e o UFW
- Configure alertas de custo na Alibaba Cloud (tráfego CDT)
- Crie um diretório unificado para os serviços
- Instale o Docker e o Docker Compose

Os primeiros passos estão neste post anterior meu:

[Eu só queria deixar o bot online 24 horas e acabei comprando um servidor na nuvem](/posts/sayori-server-01-vps-start/)

Eu coloco o diretório de serviços em `/root/sayori/` e gerencio tudo com um `docker-compose.yml` grande. Também dá para ter um diretório por serviço:

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

Um `docker-compose.yml` por diretório, e as chaves reais no `.env`, sem jogar em repositório público

## Serviços que o admin está rodando agora

### 🔐 Vaultwarden (cofre de senhas, o mais importante)

**Uso:** Cofre pessoal de senhas

**Por que rodar antes de tudo:**

- Um cofre de senhas é mais importante que blog, status page ou bot
- Leve, com baixo consumo de memória
- Ecossistema maduro de clientes; dá para usar o client oficial do Bitwarden no celular, computador e navegador
- Suporta recursos pagos do Bitwarden (salvar 2FA, verificação de saúde das senhas)

**Atenção crucial:**

- Desative o `SIGNUPS_ALLOWED` logo após o primeiro cadastro
- Exige HTTPS (Cloudflare Tunnel ou Caddy)
- Faça backups periódicos e testes periódicos de restauração
- Não deixe exposto sem proteção na internet pública

**Uso de memória:** ~50MB

**Tutorial detalhado:** [[selfhost-vaultwarden-on-2c2g|Montando o Vaultwarden em um servidor estudantil 2C2G]]

---

### 📢 ntfy (notificações push, segundo mais importante)

**Uso:** Enviar notificações para si mesmo

Quando scripts de backup, scripts de monitoramento ou tarefas agendadas rodam no servidor e falham, alguém precisa te avisar. O ntfy serve exatamente para isso

**O que eu faço com ele:**

- Notificações de sucesso/falha de backup
- Alertas de health check do Gatus
- Notificação de resultado de moderação de comentários
- Acionar alguns comandos de ops manualmente (via ntfy → integração com scripts)

**Atenção crucial:**

- Configure controle de acesso para não deixar estranhos mandarem mensagens no seu topic
- Proteja o painel de administração com Cloudflare Access

**Uso de memória:** ~20MB



---

**Tutorial detalhado:** [[selfhost-ntfy-on-2c2g|Rodando o ntfy em um servidor estudantil 2C2G]]

### 📊 Gatus (status page e health check)

**Uso:** Monitorar seus serviços

Ele checa periodicamente se seu blog, Vaultwarden, painel do bot e APIs ainda estão vivos. Se cair, te avisa pelo ntfy

**Endpoints que eu monitoro:**

- `sayori.org` Blog
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` O próprio Gatus
- `ntfy.sayori.org` ntfy
- API do Fast Note Sync

**Atenção crucial:**

- A configuração é em YAML; cuidado para não errar a indentação no susto
- Exponha via Cloudflare Tunnel, protegido pelo Access
- Integre o canal de notificações ao ntfy

**Uso de memória:** ~15MB

---

### 📝 Fast Note Sync (sincronização do Obsidian)

**Uso:** Sincronização privada para o Obsidian

Se você usa o Obsidian como eu para escrever no blog, anotar projetos e guardar rascunhos, esse serviço é bem tentador. Sai mais barato que o Obsidian Sync (0 yuan) e dá menos dor de cabeça que o Syncthing (não exige vários dispositivos online ao mesmo tempo)

**Atenção crucial:**

- Faça backup periódico do diretório de dados
- Não jogue arquivos gigantes (imagens, vídeos)
- Resolva conflitos de sincronização manualmente

**Uso de memória:** ~30MB

**Tutorial detalhado:** [[fast-note-sync-on-student-server|Mexendo com o Fast Note Sync em um servidor estudantil]]

---

### 🤖 AstrBot + NapCat (bot do QQ)

**Uso:** Bot de QQ/Telegram/Discord online 24 horas

Colocando em um servidor remoto, finalmente dá para rodar bots sem parar 24 horas por dia. Dá para conectar no Discord e no Telegram, onde quase não há bloqueio antifraude

**Atenção ao conectar no QQ:**

- Contas novas tomam bloqueio fácil; vale a pena aquecer a conta
- Não use conta secundária recém-criada de cara (lição aprendida na dor pelo admin)
- O NapCat exige login periódico por QR code

**Uso de memória:** AstrBot ~100MB, NapCat ~150MB

---

### 🔍 AI Search Gateway (gateway de busca)

**Uso:** Gateway agregador de busca com IA para uso próprio

Integra Tavily, Brave Search, Firecrawl, Exa, Grok Search e SearXNG, montado com FastAPI. Para usar no MCP do Codex e do Claude Code, é mais prático do que chamar cada API separado

**Atenção crucial:**

- Escute apenas em `127.0.0.1:8000`, não exponha na rede pública
- Chame localmente via encaminhamento de porta SSH + MCP
- Coloque as API Keys em variáveis de ambiente

**Uso de memória:** ~100MB (incluindo Redis e SearXNG)

---

### 🛡️ Comment Moderation (moderação de comentários)

**Uso:** Moderação de comentários do blog com IA

Usa créditos gratuitos de GPT para moderar automaticamente comentários do Twikoo, junto com o ntfy para enviar o resultado. Dá para apagar e restaurar comentários manualmente mandando mensagem no ntfy

Somando o Cloudflare Turnstile, os comentários que sobram são quase todos de boa qualidade

**Uso de memória:** ~40MB

---

### 🌐 Cloudflared (Cloudflare Tunnel)

**Uso:** Expor serviços locais à internet pública sem abrir as portas 80/443

Todos os serviços públicos do admin passam pelo Cloudflare Tunnel:

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel (exige Cloudflare Access)

**Vantagens:**

- Sem precisar abrir portas da origem
- HTTPS automático
- Dá para configurar o Access para autenticação

**Uso de memória:** ~30MB

---

### 🎛️ 1Panel (Painel de gerenciamento Docker)

**Para que serve:** Gerenciar contêineres Docker pela interface web

Bom para iniciantes verem o status dos contêineres e também para investigar problemas pontuais

**Aviso de segurança:**

- Tem que passar pelo Cloudflare Tunnel + Access, ou no mínimo usar proxy reverso com HTTPS e senha forte
- Ele controla todos os seus contêineres
- Não deixe exposto na internet pública sem proteção

**Uso de memória:** ~80MB

---

### Outros serviços auxiliares

- **Mihomo**: cliente de proxy, fornece proxy para os serviços que precisam
- **Redis**: faz cache para o Search Gateway

## Uso atual de memória (dados reais)

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**Conclusão:**

- De 1.6GB de RAM, 765MB em uso e 987MB de Swap usados
- 14 contêineres, consumo de memória razoável
- O uso alto de Swap mostra que a memória está apertada mesmo, mas ainda aguenta
- Não dá mais para colocar serviços pesados

## Serviços não recomendados para rodar em 2C2G

Estes ou comem memória, ou comem CPU, ou comem armazenamento — uma máquina 2C2G não aguenta:

### ❌ Nextcloud / OwnCloud

**Por que não recomendo:**

- Consumo alto de memória (PHP-FPM + banco de dados + Redis)
- Upload e download de arquivos devoram banda e IO
- Pré-visualização de arquivos grandes torra a CPU
- Muitos conflitos de sincronização

**Alternativas:**

- Sincronização leve de arquivos: Fast Note Sync (só serve para texto), Syncthing
- Armazenamento em nuvem: Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**Por que não recomendo:**

- Transcodificação de vídeo devora CPU e memória
- Escaneamento da biblioteca de mídia consome muito IO
- Num disco de 40GB mal cabem alguns filmes

**Alternativas:**

- Use um NAS dedicado ou servidor de mídia próprio
- Ou vá direto para streaming online

---

### ❌ GitLab

**Por que não recomendo:**

- Começa pedindo 4GB de memória
- Simplesmente não roda em 2C2G

**Alternativas:**

- GitHub / Gitea / Forgejo
- O Gitea é bem mais leve, mas ainda pede 512MB+ de memória

---

### ❌ Mastodon / Misskey

**Por que não recomendo:**

- Servidores do fediverso devoram memória e banco de dados
- O armazenamento de mídia consome bastante disco

**Alternativas:**

- Crie uma conta direto em uma instância pública

---

### ❌ LLMs locais (Ollama / LM Studio)

**Por que não recomendo:**

- Rodar inferência em 2C é tão lento que faz você questionar a existência
- 1.6GB de RAM não comporta nenhum modelo útil

**Alternativas:**

- Use benefícios oficiais para estudantes: GitHub Copilot Student, camada gratuita oficial do Google AI Studio
- Use vouchers de estudante para abater custos: API oficial de LLMs da Alibaba Cloud Bailian
- Veja mais em: [Como universitários podem usar cotas oficiais de IA e gerenciar o ambiente de desenvolvimento com cc-switch](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress (não que não rode, mas não recomendo)

**Por que não recomendo muito:**

- PHP + MySQL consomem bastante memória
- Quanto mais plugins instalar, pior fica
- Blogs estáticos (Astro / Hugo) têm desempenho bem melhor

**Se fizer questão de rodar:**

- Use Caddy + PHP-FPM + SQLite
- Instale poucos plugins
- Configure CDN da Cloudflare

## Ordem de aprendizado recomendada

Eu organizaria assim:

1. **Configuração básica**: [[sayori-server-01-vps-start|SSH e grupos de segurança]], [[docker-compose-minimum-start|Docker e Compose]], alertas de gastos
2. **Domínio e HTTPS**: [[free-domain-and-web-community|Domínio gratuito]] + [[cloudflare-free-tier-developer-guide|Cloudflare DNS e Tunnel]]
3. **Serviços principais**: [[selfhost-vaultwarden-on-2c2g|Cofre de senhas Vaultwarden]] + [[selfhost-ntfy-on-2c2g|Notificações ntfy]] + monitoramento Gatus
4. **Adicionar sob demanda**: [[fast-note-sync-on-student-server|Fast Note Sync]], bots e outras ferramentas

**Não instale 10 serviços de uma vez.** Vá um por um; só adicione o próximo depois que o anterior estiver rodando redondinho

## Recursos relacionados

**Descoberta de serviços self-hosted:**

- awesome-selfhosted: [https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**Projetos citados neste post:**

- Vaultwarden: [https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync: [https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy: [https://ntfy.sh/](https://ntfy.sh/)
- Gatus: [https://gatus.io/](https://gatus.io/)
- AstrBot: [https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` serve para descobrir "o que mais dá para hospedar por conta própria". `awesome-cloudflare` serve para descobrir "o que não precisa ficar no VPS e pode ir direto para a Cloudflare"

Um servidor pessoal não precisa carregar tudo nas costas. O que der para jogar no Cloudflare Pages, Workers, R2 e Tunnel, não force nos 2GB de memória

---

## Por fim

Um servidor 2C2G é ideal para ser o "ponto de partida dos seus serviços pessoais do dia a dia"

Ele permite que você:

- Pegue intimidade com Linux, Docker, proxy reverso, domínios e HTTPS
- Rode alguns serviços leves, mas úteis
- Crie o hábito de fazer backup, monitorar e cuidar da operação

Ele não permite que você:

- Rode serviços pesados
- Use como servidor de produção
- Substitua um NAS dedicado ou servidor de mídia

Mas isso já basta

Um servidor não acaba depois de configurado; ele obriga você a levar backup, segurança e monitoramento a sério. No fim das contas, isso é ótimo

## Continue lendo

Além de servidores na nuvem, também já brinquei de [[make-home-server|transformar um PC antigo em nuvem caseira]], e dá para usar esta mesma lista para escolher os serviços

Se quiser conectar suas ferramentas de IA à sua própria capacidade de busca, dê uma olhada em [[build-your-search-gateway|arquitetura e fluxo de trabalho do gateway de busca]] e siga mexendo naquilo de que você realmente precisa
