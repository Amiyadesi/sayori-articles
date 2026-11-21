---
title: "O que o plano gratuito da Cloudflare faz pelos desenvolvedores: o pacote completo do \"filantropo cibernético\" sem gastar nada"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: "Um levantamento do que realmente vale a pena usar no plano gratuito da Cloudflare: Pages, Workers, R2, Tunnel, Email Routing, DNS, Web Analytics e em quais cenários ele faz mais sentido que um VPS."
image: ""
tags:
  - Tutoriais Práticos
  - Criação de Sites e Cloudflare
  - Benefícios Estudantis Oficiais
  - VPS e Auto-hospedagem
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide"
---

Não é à toa que a Cloudflare ganhou o apelido de "filantropo cibernético" na comunidade dev.

Para quem desenvolve projetos pessoais, a cota gratuita deles é praticamente um exagero de generosidade.

Neste post, organizei os serviços gratuitos que eu acho realmente úteis para desenvolvedores.

## Cadastro

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

Basta se cadastrar com um e-mail. Não precisa vincular cartão de crédito para usar a maior parte do plano gratuito (alguns recursos como o R2 pedem cartão, mas não cobram nada a menos que você ultrapasse o limite).

Se não conseguir criar a conta, tente trocar o nó da rede ou usar uma aba anônima.

## Cloudflare Pages

É o que eu mais uso.

O Pages permite fazer o deploy de sites estáticos (HTML, CSS, JS ou builds de frameworks como Astro, Next.js e Hugo) direto na rede global da Cloudflare.

O plano gratuito oferece:

- Quantidade ilimitada de sites
- Banda ilimitada
- 500 builds por mês
- HTTPS automático
- Domínios personalizados
- Deploys de preview (uma URL de preview para cada PR)

Para um blog pessoal, isso significa praticamente zero limitações.

Meu próprio blog roda no Pages. Depois de dar push no repositório do GitHub, o GitHub Actions faz o build do Astro e usa o Wrangler para subir tudo no Pages. O fluxo inteiro sai a custo zero.

Se você ainda não usou:

[[astro-mizuki-blog-from-zero|Como montar um blog minimalista com Sayori Lite]]

## Cloudflare Workers

Workers são as funções Serverless da Cloudflare. Você escreve um trechinho de JS/TS, faz o deploy e ele roda nos nós de borda (edge) da Cloudflare.

O plano gratuito oferece:

- 100 mil requisições por dia
- 10 ms de tempo de CPU por requisição
- 1 MB de tamanho de código

Para que serve:

- Criar uma API simples (retornar frases aleatórias, encaminhar requisições, encurtador de links)
- Adicionar um pouco de lógica dinâmica a um site estático
- Servir como receptor de Webhooks
- Fazer proxies simples ou redirecionamentos

Para que não serve:

- Tarefas que precisam rodar por muito tempo
- Backends complexos que dependem de banco de dados (até dá para conectar D1 ou KV, mas o plano gratuito tem limites)
- Serviços que exigem WebSockets persistentes

Se você só quer escrever um blog, não vai precisar de Workers por enquanto. Mas vale saber que existem, porque você vai esbarrar neles o tempo todo quando começar a brincar com pequenas ferramentas.

## Cloudflare R2

O R2 é um serviço de armazenamento de objetos compatível com a API do S3.

O plano gratuito oferece:

- 10 GB de armazenamento
- 10 milhões de operações Classe A por mês (PUT/POST/LIST)
- 10 milhões de operações Classe B por mês (GET)
- Tráfego de saída gratuito (esse é o grande trunfo)

Para que serve:

- Hospedar imagens do blog (combinado com um domínio próprio, vira um ótimo servidor de imagens)
- Guardar arquivos de backup
- Hospedar assets estáticos
- Armazenar uploads de arquivos de projetos pequenos

Por que vale mais a pena que outros serviços de Object Storage: não cobra pelo tráfego de saída (egress). Enquanto serviços como o Alibaba Cloud OSS cobram pela banda de saída, o R2 zera esse custo. Para blogs pessoais e projetos pequenos, isso faz uma diferença enorme.

É necessário cadastrar um cartão de crédito para ativar o R2, mas nada é cobrado dentro da cota gratuita.

## Cloudflare Tunnel

O Tunnel permite expor serviços da sua rede interna (como um Vaultwarden rodando no seu VPS e escutando apenas em 127.0.0.1) para a internet pública com segurança.

Como funciona:

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

Vantagens:

- O VPS não precisa abrir as portas 80/443
- Você não precisa emitir certificados SSL por conta própria
- Dá para combinar com o Cloudflare Access para adicionar uma camada de autenticação
- O IP de origem fica oculto

Meu [[selfhost-vaultwarden-on-2c2g|Vaultwarden]], [[selfhost-ntfy-on-2c2g|ntfy]], Gatus e o painel 1Panel passam todos pelo Tunnel; o esquema de sincronização de notas está no [[fast-note-sync-on-student-server|Tutorial do Fast Note Sync]].

O plano gratuito não limita a quantidade de Tunnels. Você pode rodar vários subdomínios em um único Tunnel.

A instalação consiste em rodar o daemon `cloudflared` no VPS; ele inicia a conexão de saída ativamente, dispensando regras de entrada no firewall.

## Cloudflare DNS

Basta apontar os servidores de nomes (NS) do seu domínio para a Cloudflare para usar a hospedagem de DNS gratuita deles.

Se ainda não escolheu um domínio, dê uma olhada em [[free-domain-and-web-community|Domínios gratuitos e domínios de pacotes estudantis]].

Vantagens:

- Anycast global, com resolução muito rápida
- DNSSEC gratuito
- Ocultação do IP de origem usando o modo Proxy
- Interface de gerenciamento bem limpa e direta

Se você comprou seu domínio em outro registrador (como Namesilo, Porkbun, SpaceShip ou provedores locais), basta alterar o NS para gerenciá-lo pela Cloudflare.

Caso use um domínio gratuito (como o cc.cd da DNSHE), verifique se o serviço permite alterar o NS. Alguns permitem, outros só deixam adicionar registros na própria plataforma.

## Cloudflare Email Routing

O Email Routing permite receber e-mails no seu domínio personalizado e encaminhá-los para sua caixa de entrada real.

Por exemplo:

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

É gratuito e dispensa montar um servidor de e-mail próprio.

Ideal para:

- Deixar um e-mail de contato no blog sem expor seu endereço pessoal
- Cadastrar-se em serviços diversos usando e-mails do seu próprio domínio
- Aprender na prática como funcionam registros DNS de e-mail (MX, SPF, DKIM)

Atenção: isso serve apenas para encaminhar e-mails recebidos. Se quiser enviar mensagens usando seu domínio próprio, vai precisar de configuração extra (como usar o SMTP do Gmail + alias, ou serviços como Resend, Mailgun e Zoho Mail).

## Cloudflare Web Analytics

Sem precisar instalar nenhum script JS, a Cloudflare já mostra os dados básicos de tráfego do seu site.

Você ativa direto na aba Web Analytics do painel.

É bem mais leve que o Google Analytics:

- Não rastreia usuários
- Não usa cookies
- Não carrega JS adicional
- Focado em privacidade

Para um blog pessoal, saber se alguém apareceu por lá no dia, de onde veio e quais páginas leu já resolve tudo.

Se no futuro você quiser métricas mais detalhadas (rastreamento de eventos, funis, dimensões personalizadas), pode partir para o Umami ou Plausible. Mas para começar, o nativo da Cloudflare dá conta do recado.

## Cloudflare Access (Plano gratuito do Zero Trust)

O Access permite adicionar uma camada de login na frente de qualquer serviço web seu.

Por exemplo, se você tem um painel administrativo rodando em `panel.example.com` e não quer que qualquer pessoa acesse, o Access exibe uma tela de login antes de liberar a entrada apenas para quem for autenticado.

O plano gratuito suporta até 50 usuários.

Os métodos de autenticação incluem:

- Código descartável enviado por e-mail
- Login com GitHub
- Login com Google

Meu painel 1Panel é protegido pelo Access. Mesmo que o painel já tenha senha própria, ter uma barreira extra logo na entrada nunca é demais.

## O que mais existe de graça

Outros recursos gratuitos que acabo usando menos:

- **D1**: Banco de dados SQLite que roda junto aos Workers. 5 GB no plano gratuito
- **KV**: Armazenamento chave-valor. Tem limite diário de leitura/escrita no plano gratuito, mas atende bem projetos pequenos
- **Queues**: Filas de mensagens
- **Images**: Transformação de imagens (bem limitado no plano gratuito)
- **Stream**: Hospedagem de vídeos (praticamente insuficiente no plano gratuito)
- **Zaraz**: Gerenciador de scripts de terceiros

Não precisa decorar tudo. Basta saber que o plano gratuito da Cloudflare é bem generoso e voltar aqui para consultar quando surgir a necessidade.

## Quando não usar a Cloudflare

- Tarefas em segundo plano de longa duração → use um VPS
- Bancos de dados persistentes e consultas complexas → use um VPS ou banco gerenciado
- Conexões WebSocket de longa duração → Workers têm limitações
- Processamento de arquivos pesados → Workers têm limites rígidos de memória e CPU
- Sensibilidade extrema à latência na China continental → a rota gratuita da Cloudflare nem sempre é rápida por lá

Regra geral: o que der para colocar na Cloudflare, coloque na Cloudflare; o que precisar rodar de forma persistente, vai para o VPS. Eles não se substituem, se complementam.

## Resumo de como eu uso

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

Meu servidor estudantil de 2 vCPU e 2 GB de RAM cuida apenas do que precisa ficar rodando continuamente. Todo o resto que dá para descarregar na Cloudflare não pesa no servidor.

Se precisar de uma máquina, vale conferir antes [[azure-students-100-credit-guide|Servidor Azure no Japão]] ou [[aliyun-student-300-voucher-guide|Créditos estudantis da Alibaba Cloud]], e depois seguir [[docker-compose-minimum-start|Introdução ao Docker]] e [[2c2g-server-service-index|Lista de serviços]] para subir suas aplicações.

## Leitura complementar

awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

Esse repositório reúne várias ferramentas e casos de uso do ecossistema Cloudflare, com mais de 14 mil estrelas. Se quiser ter ideias do que o pessoal anda construindo com a Cloudflare, comece por aqui.

Mais ferramentas externas estão reunidas em [[webmaster-resource-toolbox|Lista de recursos para webmasters]], e depois de colocar o site no ar você pode usar o [[geoscore-2-4-guide|GeoScore]] para conferir se a indexação e os metadados das páginas estão redondos.
