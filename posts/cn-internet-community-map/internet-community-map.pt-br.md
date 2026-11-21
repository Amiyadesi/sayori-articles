---
title: Fiz um repositório com uma lista de fóruns pequenos
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: Organizei as comunidades da internet que eu vinha anotando de forma espalhada em um repositório estilo wiki de fóruns pequenos e um site próprio. Também aceito PRs de quem quiser colaborar.
image: ""
tags:
  - verao-2026
  - registro-de-comunidades
  - open-source
  - foruns
category: "Registros pessoais"
draft: false
lang: pt-BR
translationKey: "posts/cn-internet-community-map/internet-community-map"
alias: ""
---

# Fiz um repositório com uma lista de fóruns pequenos

Eu já queria montar um mapa de comunidades da internet faz tempo.

Não estou falando de plataformas gigantes e óbvias como X, Instagram, Tieba, Xiaohongshu ou Xiaoheihe, mas daqueles fóruns e comunidades que você dificilmente encontra por acaso se não procurar ativamente ou não andar nesses círculos.

Isso agora deixou de ser só um post e virou um repositório independente e uma página online que dá para manter a longo prazo:

- Repositório no GitHub: [https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)
- Página online: [https://forums.cc.cd/](https://forums.cc.cd/)

Hoje o site lembra mais uma wiki ou uma documentação: na esquerda ficam as categorias e o índice de comunidades, no meio ficam os verbetes específicos, cada comunidade tem sua própria página e, no rodapé, há uma área de comentários integrada com o Giscus.

Na primeira versão entraram 49 comunidades. Mais pra frente, se alguém complementar, corrigir algo ou mandar PR, esse número ainda vai mudar.

## O que entra nesse repositório

Aqui, "pequeno" não é medido rigorosamente pelo número de usuários, mas pelo caminho até chegar lá.

Se uma comunidade quase nunca aparece se você não buscar por ela, ou se só quem frequenta os meios de hospedagem, ACG, segurança, hardware, webmasters ou compartilhamento de recursos costuma esbarrar nela, então ela provavelmente faz sentido na lista.

Por enquanto, dividi mais ou menos nestas categorias:

- Tecnologia / IA / Desenvolvedores
- Hospedagem / VPS / Webmasters / Sites independentes
- Busca / Recursos / Ferramentas de conhecimento
- Segurança / Engenharia reversa / Sistemas / Software
- ACG / Jogos / Nichos fechados
- Hardware / Eletrônica / Homelab
- Adulto / Recursos / Zona cinzenta
- Fóruns antigos gringos / Interesses gerais

Embora a categorização feita pela IA tenha ficado meio estranha, não tem muito o que fazer, por enquanto vai assim mesmo.

## Como a página está agora

Antes parecia mais uma lista gigante de README; agora já foi desmembrada em um site.

A página inicial mantém uma visão rápida por categorias, boa para bater o olho e ver quais comunidades existem; o menu lateral serve para navegar por categoria; e cada comunidade também tem uma página individual, o que facilita para alguém apontar diretamente se alguma informação está errada, se o endereço mudou ou se as regras de cadastro mudaram.

Minha ideia inicial era fazer um "mapa de comunidades da internet", mas quanto mais eu escrevia, mais percebia que o mais difícil não é desenhar o mapa, e sim mantê-lo atualizado.

Os endereços dos fóruns mudam, a forma de cadastro muda, o clima da comunidade também muda. O pessoal de hospedagem está sempre soltando novidade de provedor, rota e promoção, e as comunidades de ACG e recursos vivem ficando desatualizadas por troca de domínio, permissões ou regras das seções.

Então a lógica atual é: o repositório cuida do diretório e dos registros factuais, e o blog cuida das experiências pessoais.

Se eu realmente frequentei uma comunidade por bastante tempo, escrevo um post separado sobre ela. Se for só levantamento de informações públicas, fica só na lista.

## O que vai na página de cada comunidade

No repositório, cada entrada tenta reunir estas informações:

- Acesso / endereço
- Proposta e clima da comunidade
- Forma de cadastro ou barreiras de entrada
- O que tem lá dentro principalmente
- O que vale a pena acompanhar
- Pontos de atenção
- Fontes públicas
- Data da última verificação

Nas comunidades em que passei bastante tempo explorando, o texto fica bem mais próximo de uma impressão real.

Por exemplo, no caso do Linux.do e do NodeLoc, eu me baseei na experiência que contei naquele post anterior [[internet-community-1|Registros de Comunidades da Internet 1]]: as regras do Linux.do, as missões para novatos, os serviços comunitários gratuitos, os brindes e promoções, ajustes de desenvolvimento, documentação colaborativa e LDC; e no NodeLoc, o clima mais livre, os subfóruns, o sistema de pontos de bateria, links de afiliado e a atividade dos webmasters.

Já nas comunidades que não usei por muito tempo, o registro segue apenas as páginas públicas e o que se comenta nos círculos, sem fingir experiência própria.

## Por que PRs são bem-vindos

Uma lista desse tipo feita por uma pessoa só com certeza vai ter erros.

Em algumas comunidades, quem está de fora só vê a porta de entrada, mas não consegue sentir o clima real lá dentro. Alguns fóruns abrem o cadastro só por períodos específicos, alguns domínios mudam de lugar, e nomes antigos e novos se confundem fácil.

Por isso, o que esse repositório mais precisa não é de descrições mais bonitas, mas de membros reais dessas comunidades corrigindo as coisas.

Se você é usuário antigo de alguma dessas comunidades, ou só percebeu que algum verbete está errado, pode mandar um PR direto. As contribuições mais úteis costumam ser estas:

- O cadastro hoje é aberto, por convite ou abre só em períodos específicos?
- Qual regra ou aviso o novato precisa ler primeiro quando entra?
- O clima real da comunidade é mais técnico, mais bate-papo paralelo, mais voltado a negociações ou mais focado em recursos?
- Quais são as seções mais valiosas lá dentro?
- O endereço mudou ou o domínio antigo já está instável?
- Alguma descrição está com cara demais de resumo de IA e precisa ser reescrita no tom de um usuário real?

Se não quiser abrir PR, também dá para comentar direto na página da comunidade correspondente. O site agora usa Giscus, então os comentários vão parar no GitHub Discussions.

## Como ajudar a organizar

Ao adicionar ou editar uma comunidade, dê preferência por alterar os dados estruturados do repositório:

```bash
data/communities.json
```

Depois de editar, rode:

```bash
node scripts/generate-readme.mjs
node scripts/build-site.mjs
```

O primeiro sincroniza o README e o segundo gera as páginas online.

Se for só para ajustar a descrição das categorias, dê uma olhada em:

```bash
docs/categories.md
```

Se estiver adicionando uma comunidade específica, o ideal é incluir também uma fonte pública. Pode ser o site oficial, a página de cadastro, um aviso interno, a página "sobre", a página de regras ou qualquer outra explicação acessível publicamente.

## Princípios atuais de curadoria

Por enquanto, este projeto foi organizado principalmente por IA com base em informações públicas, páginas dos próprios sites e um pouco da minha experiência pessoal. Só uma parte dessas comunidades eu realmente frequentei por bastante tempo.

Por isso, espero que mais para frente cada comunidade vá sendo revisada aos poucos por usuários reais.

Comunidades de conteúdo adulto, recursos, cracking, engenharia reversa, segurança, flash de firmware e negociações também entram, mas tudo fica explicado por categoria geral: o que costuma ter lá dentro, o que vale observar e quais são as ciladas. Decidir se entra ou não, se participa e como avaliar os riscos fica por conta de cada leitor.

Hoje eu quero muito mais transformar isso em um diretório público que possa ser atualizado continuamente do que em um post de blog que nasce pronto e logo fica datado.

Se você notar que faltou algum fórum que eu não listei, ou se algum verbete estiver escrito com cara de quem não entende nada do assunto, fique à vontade para abrir um PR direto no repositório:

[https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)

## Continue lendo

Se quiser ver primeiro as minhas próprias andanças por essas comunidades, dá para começar por [[internet-community-1|Linux.do, NodeLoc e NodeSeek]] e depois seguir para [[internet-community-2|Comunidades de Interesse]].

Os links ligados a blogs independentes ficaram organizados separadamente em [[internet-community-3|Comunidades e Organizações de Webmasters]], para ir explorando junto com o mapa sem pressa.
