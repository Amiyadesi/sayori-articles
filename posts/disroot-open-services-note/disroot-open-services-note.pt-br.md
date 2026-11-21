---
title: "Disroot: uma coleção de serviços de código aberto com cara de ideal antigo da internet"
published: 2026-06-27
created: 2026-06-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Anotações sobre o e-mail, nuvem, XMPP e ferramentas colaborativas do Disroot, aproveitando para reorganizar os serviços públicos que vale a pena manter a longo prazo no sayori.org
image: ""
tags:
  - Verão 2026
  - Notas da comunidade
  - Serviços open source
  - Fediverse
category: "Registros pessoais"
draft: false
lang: pt-BR
translationKey: "posts/disroot-open-services-note/disroot-open-services-note"
alias: ""
---

> [!NOTE]
> Este registro é de 27 de junho de 2026; as perguntas de cadastro, cotas de serviço e recursos disponíveis do Disroot podem mudar, então vale dar uma olhada no site oficial antes de pedir conta

Hoje também encontrei uma organização de código aberto bem interessante: [Disroot](https://disroot.org/)

Esse pessoal juntou um monte de ferramentas abertas da internet e mantém tudo funcionando direitinho como uma plataforma que dá para usar no dia a dia

A descrição no site oficial é bem direta: liberdade, privacidade, federação, descentralização

Sem anúncios, sem rastreamento, sem criação de perfil, sem mineração de dados — pura utilidade pública mesmo, fazendo jus ao domínio .org

## O que ele oferece

A lista de serviços fica aqui:

[https://disroot.org/en/services](https://disroot.org/en/services)

Por enquanto tem tudo isso:

- Email, que dá para usar via webmail ou conectar em cliente IMAP
- Cloud, baseado em Nextcloud, para sincronizar arquivos, calendário e contatos
- XMPP Chat, um protocolo de chat descentralizado
- Pads, documentos colaborativos online
- PrivateBin, pastebin criptografado
- Upload, compartilhamento temporário de arquivos
- Forgejo, hospedagem de código
- CryptPad, suíte de documentos online focada em privacidade
- FEDIsroot, no endereço [fe.disroot.org](https://fe.disroot.org/), serviço de microblogging ActivityPub / Fediverse baseado em Akkoma, compatível com a API do Mastodon
- LibreTranslate, serviço de tradução
- Vault, serviço relacionado a gerenciamento de senhas

Não precisa usar tudo

Mas o legal é justamente isso: você cria uma única conta e já ganha acesso a esse monte de serviços open source

Para alguém como eu, que gosta de ficar mexendo com site pessoal, servidor e serviços de código aberto, isso chama bastante atenção — e é uma ótima referência de quem já está na estrada há mais tempo

## A pergunta de cadastro é meio curiosa

A página de cadastro fica aqui:

[https://user.disroot.org/pwm/public/newuser/](https://user.disroot.org/pwm/public/newuser/)

A pergunta que apareceu para mim desta vez foi: o que você gosta de fazer antes de dormir

E precisa escrever mais de 50 palavras

Achei essa pergunta bem sacada

Você pode primeiro escrever com calma um parágrafo em chinês ou no seu idioma e depois traduzir para o inglês

Dá para dizer, por exemplo, que antes de dormir você lê um livro, organiza as tarefas do dia seguinte, ouve música, dá uma olhada nas novidades das comunidades open source ou simplesmente deixa o celular longe para conseguir dormir mais cedo

## Como eu pretendo usar

Por enquanto criei uma conta lá, mas, para o meu uso atual, só o e-mail me pareceu mais interessante — afinal, de tanto me cadastrar em contas e comunidades por aí, já devo ter acumulado uma coleção de e-mails com domínios diferentes, fora o meu próprio e-mail temporário e e-mail com domínio próprio hospedados por conta

Embora eles ofereçam um serviço comunitário de vaultwarden, eu já tenho o meu próprio vaultwarden auto-hospedado, então acabo não precisando desse

Além disso, o Disroot não é plano gratuito de big tech; ele sobrevive graças à comunidade e a doações. Poder contar com ele quando precisar já está ótimo

## Isso também me fez rever os meus próprios serviços

Depois de olhar as listas de serviços reunidas pelo Disroot e pelo [[radical-servers-public-services|Riseup]], minha primeira reação também foi sair colocando mais coisa no sayori.org, querendo fazer jus ao .org

Só que a capacidade de uma pessoa só tem limite. Depois de trocar uma ideia com o gpt, montei uma lista de serviços públicos, bem aqui<https://sayori.org/zh/services/>

Hoje o que está realmente aberto ao público são o GeoScore, os posts do blog, o RSS, o quadro branco e o espaço de comentários/feedback. O Search Gateway continua open source, mas a instância online fica só para os meus próprios sites e tarefas de manutenção

Em vez de continuar empilhando serviços novos, prefiro testar primeiro algumas frentes bem enxutas: fazer check-up técnico de blogs pessoais, ajudar sites estáticos não comerciais a irem para o ar, oferecer uma cota pequena de busca de evidências e notificações de baixa frequência de RSS para e-mail ou Webhook

Nada disso vai começar como plataforma pública anônima; vai ser primeiro por convite, com cota limitada e triagem manual. Se não houver demanda, eu paro; se o custo de manutenção passar do que dou conta, paro também

Hoje eu prefiro chamar o sayori.org de serviços digitais públicos mantidos de forma pessoal, sem fins lucrativos e na base do melhor esforço — e não de organização filantrópica, até porque eu também não tenho energia para tudo isso


## Continue lendo

Nessa mesma linha, vale dar uma olhada em [[radical-servers-public-services|Organizações técnicas e serviços públicos reunidos pelo Riseup]], dá para descobrir várias iniciativas pequenas bem legais

Se quiser subir alguns desses serviços na sua própria máquina, dê uma olhada antes em [[2c2g-server-service-index|Lista de serviços para servidores pequenos]]; sobre a parte de cofre de senhas, escrevi à parte em [[selfhost-vaultwarden-on-2c2g|Notas sobre auto-hospedagem do Vaultwarden]]
