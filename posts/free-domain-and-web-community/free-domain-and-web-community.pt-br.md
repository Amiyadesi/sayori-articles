---
title: Colocando um domínio gratuito no blog recém-criado e dando as caras na comunidade web
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: "Dos subdomínios gratuitos do DNSHE e Cloudflare DNS até sistemas de comentários, Travellings, Moe ICP e o Pacto de 10 Anos: dando ao seu blog recém-criado um domínio, interação e uma chance de ser visto"
image: ""
tags:
  - Tutorial Prático
  - Criação de Sites e Cloudflare
  - Blog Independente
  - Benefícios Oficiais para Estudantes
category: "Tutoriais e guias"
draft: false
lang: pt-BR
translationKey: "posts/free-domain-and-web-community/free-domain-and-web-community"
alias: ""
---

O post anterior [[astro-mizuki-blog-from-zero|Criando um blog minimalista com Sayori Lite]] cobriu o GitHub, o Cloudflare Pages e um fluxo de escrita opcional com Obsidian

Depois de configurar tudo, o endereço padrão fica mais ou menos assim:

```text
https://你的项目名.pages.dev
```

Funciona, mas sempre parece que falta alguma coisa

Com o blog no ar, o próximo passo natural é arrumar um domínio decente para ele e dar as caras em algumas comunidades de webmasters. Não é para conseguir tráfego imediato, mas para transformar o site de "um projeto no meu computador" em "um cantinho com nome próprio na internet"

## Um domínio gratuito já dá conta no começo

Se você não quiser comprar um domínio por enquanto, dá para começar praticando com um subdomínio gratuito

No momento, eu recomendo dar uma olhada em serviços como o DNSHE:

[https://my.dnshe.com/](https://my.dnshe.com/)

![[Pasted image 20260623151351.png]]

Atualmente, eu daria preferência a extensões como `cc.cd`, que permitem integração com a Cloudflare

![[Pasted image 20260622231201.png]]

Domínios gratuitos servem bem para estas coisas:

- Vincular um domínio personalizado a um blog no Cloudflare Pages
- Aprender resolução de DNS
- Aprender a gerenciar pela Cloudflare
- Preparar subdomínios para serviços auto-hospedados (self-hosted) no futuro

Eles não são adequados para:

- Projetos comerciais de longo prazo
- Domínio principal para e-mails importantes
- Ponto de entrada de marca que você não pode perder
- Projetos em que você não quer correr nenhum risco de mudança nas regras do serviço

## Códigos de impulso do DNSHE

O DNSHE tem um sistema de impulso (boost) onde usuários podem se ajudar mutuamente para conseguir subdomínios de duração mais longa

Vou deixar alguns códigos de impulso aqui por enquanto, e depois adiciono mais se surgirem novos:

```text
VJC8UQYTPK
GHGMEUGWXA
VVN9QFPEUL
UUJ22RXYDC
G4HPCNW7R4
```

Se você só quer testar um blog temporariamente, não precisa se apegar a algo permanente; pegar um domínio que resolva DNS e fazer o fluxo todo rodar é o mais importante

## Domínios gratuitos oficiais no GitHub Student Pack

Se você tem um e-mail educacional de universidade e foi aprovado no [GitHub Student Developer Pack](https://education.github.com/pack), também pode aproveitar para resgatar dois benefícios oficiais de domínios de topo (TLD) gratuitos no primeiro ano:

- **Namecheap**: oferece o registro gratuito por um ano de um domínio de topo `.me` e um certificado SSL de um ano
- **Name.com**: oferece um domínio gratuito no primeiro ano entre extensões selecionadas; as extensões disponíveis e os preços de renovação constam na página de checkout

Vale notar que os domínios de topo do pacote de estudante são gratuitos apenas no primeiro ano, voltando ao preço normal de renovação no segundo; se você não quiser vincular cartão ou se preocupar com renovação, continuar usando o DNSHE acima é bem tranquilo

## Conectando à Cloudflare

Os usos de DNS, Pages e Tunnel estão no [[cloudflare-free-tier-developer-guide|Tutorial da camada gratuita da Cloudflare]]; aqui vamos apenas conectar o domínio

Depois de conseguir o domínio, o próximo passo é conectá-lo à Cloudflare

O fluxo mais comum é:

1. Adicionar o site na Cloudflare
2. Alterar os nameservers (NS) do domínio para os da Cloudflare, conforme as instruções
3. Aguardar a propagação do DNS
4. Adicionar o domínio personalizado no projeto do Cloudflare Pages
5. Adicionar o registro CNAME conforme indicado pelo Pages ou deixar a Cloudflare configurar automaticamente

Se você estiver usando um subdomínio gratuito, confirme primeiro se ele permite alterar o NS. Se não permitir, você só poderá adicionar registros DNS na plataforma original ou terá que escolher outra extensão mais adequada para integrar com a Cloudflare

Não tenha pressa aqui; a propagação de DNS às vezes demora um pouco. Primeiro garanta que você sabe exatamente para onde o domínio raiz e o `www` / subdomínios devem apontar, para não sair alterando tudo e esquecer o que acabou de preencher

## Reservando subdomínios para serviços auto-hospedados

Mais para frente, se você tiver um servidor de estudante 2C2G, pode planejar os subdomínios com antecedência:

```text
vault.example.cc.cd  -> Vaultwarden
notes.example.cc.cd  -> Fast Note Sync
ntfy.example.cc.cd   -> ntfy
status.example.cc.cd -> Gatus
```

Não entulhe todos os serviços embaixo do domínio raiz

Domínios são como números de casa. Quando a numeração é clara, fica muito mais tranquilo mudar de servidor, migrar, configurar proxy reverso ou desligar algum serviço depois

Para ver o que dá para rodar no servidor, confira esta lista geral:

[[2c2g-server-service-index|O que um servidor de estudante 2C2G aguenta rodar: calma para não estourar a maquininha]]

## Como escolher entre domínio gratuito e domínio pago

Eu separaria assim:

O domínio gratuito serve para:

- Quem acabou de criar o blog
- Aprender DNS
- Fazer tutoriais
- Testar o Cloudflare Pages
- Testar serviços auto-hospedados

O domínio pago serve para:

- Blogs mantidos a longo prazo
- Configurar um e-mail profissional/próprio
- Colocar o endereço no avatar, cartão de visitas ou descrição de vídeos

Não é que o domínio gratuito seja inferior. É só que o maior medo em projetos de longo prazo é "ter uma dor de cabeça enorme para migrar depois"

Se você já decidiu que vai escrever nesse blog por bastante tempo, vale muito a pena comprar um domínio que você goste; projetos pessoais permitem um pouco de capricho, e gostar do nome dá mais vontade de cuidar dele

# Conhecendo a comunidade de webmasters

Com o domínio configurado, vale dar uma passada em algumas comunidades de webmasters

Não é para fazer propaganda forçada, mas para se inserir em um ambiente onde ainda tem gente escrevendo blogs. O maior perigo de um blog independente é virar um diário solitário; dar uma olhada de vez em quando em como os outros escrevem, personalizam o visual e trocam links dá muito mais ânimo

## Travellings (开往)

O Travellings é um projeto de revezamento de links entre blogs amigos:

[https://www.travellings.cn/](https://www.travellings.cn/)

A dinâmica é bem simpática. Você coloca um botão do "Travellings" no seu site e, quando um visitante clica, ele é levado aleatoriamente para outro site independente participante do projeto

Instruções para participar:

[https://www.travellings.cn/docs/join.html](https://www.travellings.cn/docs/join.html)

Indicado para blogs que já tenham algum conteúdo

Não vá pedir para entrar logo depois de criar o site com a página inicial vazia. Escreva alguns artigos primeiro para que quem clicar tenha realmente algo para ler

## Moe ICP (萌备)

Moe ICP é o registro "ICP" fictício do Reino Moe:

[https://icp.gov.moe/](https://icp.gov.moe/)

Página de inscrição:

[https://icp.gov.moe/join.php](https://icp.gov.moe/join.php)

Não confunda com o registro oficial ICP do governo chinês. Isso funciona mais como um selo divertido e um portal comunitário entre sites pessoais e de cultura anime/ACG

A página oficial de inscrição tem alguns requisitos de conteúdo, como não ser comercial, não ter conteúdo duvidoso, não ser um site vazio, usar HTTPS e estar acessível a longo prazo

Se combinar com a vibe do seu site, você pode pedir um número Moe ICP e colocar no rodapé. Não tem nenhuma utilidade prática obrigatória, mas dá muito charme de site independente

## Pacto de 10 Anos (十年之约)

Pacto de 10 Anos:

[https://www.foreverblog.cn/](https://www.foreverblog.cn/)

A ideia central é um compromisso: a partir da entrada, manter o blog no ar por dez anos ou mais, sem fechar e mantendo atualizações e atividade

Parece um pouco *chuunibyou* (dramático demais), mas eu gosto bastante da proposta

Porém, é preciso que o blog já esteja no ar há um ano para poder se inscrever, então por enquanto é esperar; claro, se o seu site já tiver um ano de estrada, vale muito a pena tentar a inscrição, haha

## Jiuchan (揪蝉)

Jiuchan:

[https://hi.jiuchan.org/docs](https://hi.jiuchan.org/docs)

É uma plataforma de diretório e visita aleatória de sites pessoais; a ideia é parecida com colocar seu site independente em uma vitrine de "descoberta aleatória"

Se o seu blog já tiver alguns artigos apresentáveis, vale dar uma olhada na documentação de submissão deles. Para sites novos, o sentido dessas plataformas não é trazer uma enxurrada de visitas na hora, mas dar a chance de alguém ir pulando de um site para outro e acabar descobrindo o seu aos poucos

# BlogFinder

[BlogFinder - Descubra excelentes blogs pessoais](https://bf.zzxworld.com/)

## Lista de Blogs Independentes em Chinês

GitHub: [https://github.com/timqian/chinese-independent-blogs](https://github.com/timqian/chinese-independent-blogs)

Este repositório reúne blogs independentes em chinês. Funciona mais como um índice mantido a longo prazo, contendo o endereço do blog, RSS, descrição e tags

Para quem serve:

- Quem tem um blog estável
- Quem tem feed RSS
- Quem escreve o próprio conteúdo na maior parte
- Quem quer ser indexado publicamente

Hoje em dia muita gente não assina mais blogs ativamente, deixando toda a informação ser filtrada e entregue pelos algoritmos das plataformas. A Lista de Blogs Independentes em Chinês pelo menos preserva um jeito antigo, mas eficiente: eu sigo e assino quem eu gosto

Se quiser submeter o seu site, deixe estes itens prontos antes:

```text
站名
站点 URL
RSS URL
一句话介绍
主题标签
```


# Outras formas de conseguir domínios gratuitos

O DNSHE não é a única opção. Vou anotar aqui mais algumas que já vi por aí:

[Coleção de domínios gratuitos disponíveis atualmente que aceitam hospedagem DNS na CF](https://www.nodeloc.com/t/topic/70964?u=amiya_desi)

[https://domain.stackryze.com/](https://domain.stackryze.com/) Aviso amigo: dá para registrar quatro domínios, e atualmente os únicos que podem ser gerenciados na CF são as extensões .in e .cc

Um post-tesouro lá do NodeLoc, que reúne bastante coisa boa

### Domínios nativos do GitHub Pages

Se você não quiser mexer com nenhum serviço de domínio por enquanto, o próprio GitHub Pages já te dá um:

```text
你的用户名.github.io
```

O Cloudflare Pages também dá:

```text
你的项目名.pages.dev
```

A rigor, esses dois não são "o seu domínio", mas já bastam para escrever no blog e mostrar projetos. Comprar um domínio definitivo depois que tudo estiver bem pensado não é problema nenhum

## Adicionando um sistema de comentários ao blog

No post anterior eu disse que falaria sobre sistemas de comentários, então aqui vai

Um blog sobrevive sem área de comentários, mas se você escreve tutoriais, relatos de experiência ou registros de problemas resolvidos, receber de vez em quando um "isso me ajudou muito" ou "no passo 3 tive um erro diferente" estimula a troca de ideias e o seu próprio aprendizado, além de tornar muito mais prático receber feedback comparado a contato por e-mail

Os sistemas de comentários que eu vejo funcionando melhor para blogs estáticos pessoais hoje em dia são estes:

### Twikoo

[https://twikoo.js.org/](https://twikoo.js.org/)

GitHub: [https://github.com/twikoojs/twikoo](https://github.com/twikoojs/twikoo)

O Twikoo é um dos sistemas de comentários mais usados na comunidade chinesa de blogs independentes. Suporta comentários anônimos, notificações por e-mail, emojis e painel administrativo

Tem várias formas de fazer deploy: Vercel, Netlify, Cloud Functions, Docker próprio. Para estudantes, o deploy gratuito na Vercel é o caminho mais prático

Pontos positivos:

- Ecossistema amigável e boa documentação
- Dá para rodar com custo zero
- Painel admin permite moderar, apagar e responder
- Suporta notificações por e-mail e WeChat

Pontos negativos:

- Você precisa escolher um banco de dados de backend (MongoDB Atlas gratuito, Vercel KV ou auto-hospedado)
- Se usar banco gratuito de terceiros, os dados não ficam 100% nas suas mãos

### Giscus

[https://giscus.app/](https://giscus.app/)

GitHub: [https://github.com/giscus/giscus](https://github.com/giscus/giscus)

O Giscus usa o GitHub Discussions como backend de comentários. Os visitantes precisam fazer login com uma conta do GitHub para comentar

Pontos positivos:

- Os dados ficam salvos no seu próprio repositório do GitHub
- Não precisa de deploy extra
- Ótimo para blogs técnicos, onde os leitores provavelmente já têm conta no GitHub
- Suporte nativo a Markdown e destaque de sintaxe de código

Pontos negativos:

- Exige login no GitHub
- Leitores que não são da área de tecnologia provavelmente não vão querer criar conta no GitHub só para deixar um comentário
- Os comentários ficam presos ao seu repositório; se trocar de repo, precisa migrar

### Artalk

[https://artalk.js.org/](https://artalk.js.org/)

GitHub: [https://github.com/ArtalkJS/Artalk](https://github.com/ArtalkJS/Artalk)

O Artalk é um sistema de comentários auto-hospedado que exige rodar um serviço de backend. Se você já tem um servidor 2C2G, dá para subir com Docker

Pontos positivos:

- Controle total sobre os próprios dados
- Suporta gerenciamento de múltiplos sites
- Bem completo: notificações por e-mail e Telegram, captcha, painel admin

Pontos negativos:

- Você precisa ter um servidor
- É mais um serviço para manter, fazer backup e atualizar
- Rodar mais um serviço em um servidor 2C2G exige ficar de olho no uso de memória

### Qual eu escolheria

Se você acabou de montar o blog e não tem servidor, recomendo testar primeiro o Giscus ou o Twikoo (com deploy na Vercel)

Se você já tem um servidor e seus leitores não são apenas programadores, vale olhar o Artalk

Se não quiser mexer com comentários agora, também não tem problema nenhum. Foque em escrever bons artigos primeiro; quando tiver leitores, ainda dá tempo de adicionar. O sistema de comentários não é o coração do blog — o conteúdo é

## Onde mais dá para divulgar seu link

- Página de links amigos (Blogroll): troque links com blogueiros de temas parecidos
- Perfil do GitHub: coloque o blog na sua página principal
- Bio do Bilibili / YouTube / Xiaohongshu: acompanhe vídeos tutoriais com o link do artigo
- Assinatura em fóruns como Linux DO / V2EX: respeite as regras da comunidade e não faça spam
- README de projetos open-source: se o projeto tiver relação com o blog, coloque o link da documentação

Abrindo mais portas de entrada para o seu site, naturalmente mais pessoas vão acabar visitando

## Estatísticas do blog: sabendo se alguém apareceu por lá

Depois de configurar o domínio e entrar nas comunidades, você provavelmente vai começar a se perguntar: será que alguém está lendo o meu blog?

Algumas alternativas leves:

- **Umami**: [https://umami.is/](https://umami.is/), pode ser auto-hospedado ou usado na versão gratuita oficial. Interface limpa e dados sob seu controle
- **Cloudflare Web Analytics**: se você já está usando a Cloudflare, o Web Analytics integrado dela é gratuito e nem precisa adicionar código extra, basta olhar direto no Dashboard
- **Plausible**: [https://plausible.io/](https://plausible.io/), focado em planos pagos, mas permite auto-hospedagem
- **Não instalar nenhuma ferramenta de análise**: também serve. Blog pessoal não é site comercial e sobrevive muito bem sem olhar métricas

Minha sugestão atual é começar com o Cloudflare Web Analytics (já que você provavelmente já conectou o site à Cloudflare) e só pensar no Umami se um dia achar que não é suficiente

Não fique olhando números todo dia. Escrever ajuda muito mais do que ficar conferindo estatísticas

## Por fim

Em um blog recém-criado, não tente buscar a perfeição logo de cara

Se o domínio gratuito funciona, vai usando; se a Cloudflare já está resolvendo o DNS, deixa rodar; vá pedindo entrada nas comunidades aos poucos, e deixar os comentários para depois não faz mal nenhum

O que importa de verdade é continuar escrevendo

Domínio, selo de registro, links amigos, botão do Travellings, caixa de comentários — tudo isso são só pequenos enfeites para deixar o blog mais com cara de "site". São os textos que fazem ele se sustentar de pé
