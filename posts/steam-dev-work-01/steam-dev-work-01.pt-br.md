---
title: Guia para evitar armadilhas no registro de desenvolvedor Steam (China)
published: 2026-09-10
created: 2026-09-10
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 2
description: Todo o processo e os pontos de atenção para registrar uma conta de desenvolvedor Steam na China — só este post já basta!
image: ""
tags:
  - Tutorial Prático
  - Guia de Sobrevivência
  - Desenvolvimento de Jogos
  - Steam
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/steam-dev-work-01/steam-dev-work-01"
---
# Guia para evitar armadilhas no registro de desenvolvedor Steam (China): do formulário fiscal às opções de recebimento, meu relato real

Muitos desenvolvedores indie querem colocar seus jogos no Steam, mas acabam travando logo no primeiro passo, o "registro de desenvolvedor". Como exige preencher um monte de coisas e resolver várias burocracias, muita gente acaba deixando para depois

Se você quer gerenciar seu próprio jogo, quanto antes fizer isso, melhor — porque depois do registro ainda vai precisar montar a página da loja, configurar a classificação indicativa, criar a conta e a organização de desenvolvedor, registrar o projeto do jogo e por aí vai

Claro que, se você pretende buscar uma publisher, talvez não precise fazer esse registro, mas em compensação terá bem menos controle sobre o seu projeto; por outro lado, você também pode se registrar como desenvolvedor antes e procurar uma publisher já tendo sua própria conta, o que permite ajustar certas coisas do projeto no futuro

Na verdade, o processo não é complicado, mas existem várias assimetrias de informação — se errar um único passo, o pedido volta várias vezes

Hoje, juntando a minha própria experiência real de registro, vou compartilhar tudo: preparação inicial, preenchimento fiscal, a "loteria" da aprovação e as opções para receber os pagamentos

## 1. Checklist de preparação: 100 dólares + documento de identidade + conta Steam

Antes de começar o registro, você precisa separar estas três coisas:

1. 100 dólares: essa é a taxa de inscrição do Steam Direct. Atenção: esses 100 dólares não são reembolsáveis, mas assim que a receita bruta do seu jogo atingir 1.000 dólares, a Valve devolve os 100 dólares para você (detalhe: isso vale por aplicativo individual; se o primeiro jogo render 500 dólares e o segundo render 1.500 dólares, apenas os 100 dólares do segundo serão reembolsados)
2. Documento de identidade (ID chinês): usado para verificação de identidade real e preenchimento do formulário fiscal
3. Conta Steam comum: pode usar a sua conta normal onde você já compra jogos, não precisa criar uma conta nova só para isso

## 2. Processo de registro e armadilhas na verificação de identidade

O ponto de partida fica em [https://partner.steamgames.com](https://partner.steamgames.com). Faça login com sua conta Steam comum e clique em "Registrar-se como desenvolvedor"

· Use obrigatoriamente Pinyin no nome real: ao preencher seu nome, escreva direto em Pinyin (ex.: San Zhang) e nunca em caracteres chineses. Como depois você vai vincular cartão e receber pagamentos (seja conta nos EUA, WorldFirst ou bancos estrangeiros), os sistemas bancários exigem o nome em Pinyin — manter tudo igual evita que a análise trave

· Preenchimento do endereço: coloque o endereço que consta no seu documento de identidade, escrito em inglês ou Pinyin. Recomendo traduzir com uma IA em vez de tentar improvisar na marra, para garantir que o endereço fique exato

## 3. Formulário fiscal: como baixar a alíquota de 30% para 10%

Essa é a etapa mais importante para economizar dinheiro. Ao preencher as informações fiscais (formulário W-8BEN), preste atenção em:

1. Status fiscal: selecione obrigatoriamente residente fiscal fora dos EUA
2. TIN estrangeiro (Número de Identificação Fiscal): marque que possui um TIN estrangeiro. Para desenvolvedores individuais na China, o seu TIN é o número de 18 dígitos do seu documento de identidade — basta preenchê-lo direto, sem precisar solicitar nada extra
3. Tratado tributário: marque o benefício do tratado tributário entre China e EUA
   
Fazendo esses passos, a retenção de imposto do Steam cai direto dos 30% padrão para 10%

### Minhas informações fiscais foram rejeitadas várias vezes

Não se engane com o jeito organizado que escrevi acima; na época eu passei um sufoco danado. Dá uma olhada nesse e-mail de "Suas informações fiscais são inválidas" que recebi para sentir o nível do desespero

![[Screenshot_20260911_090317_com.tencent.androidqqmail.jpg|width=460|align=center|caption=Steamworks 发来的“税务信息无效”通知]]

A análise fiscal do Steam é terceirizada para uma empresa externa (Lilaham / TaxIdentity), e às vezes eles não dizem exatamente onde está o erro. Quando o meu foi rejeitado, eu também não sabia o que estava errado e só pude ir reenviando várias e várias vezes

Então, se você também receber o e-mail dizendo "Suas informações fiscais são inválidas", não entre em pânico — não significa necessariamente que você preencheu errado

Desde que você confirme os 4 pontos principais que mencionei acima (residente fiscal fora dos EUA, número do documento no TIN estrangeiro, tratado tributário marcado e endereço idêntico ao do documento), basta continuar reenviando que muito provavelmente vai passar

## 4. Verificação de identidade

Muitos tutoriais na internet dizem que é preciso enviar uma conta de água ou luz com endereço, mas na prática não é bem assim

Na época eu não tinha nenhuma conta com endereço em mãos, então fui direto ao caixa de uma agência do ICBC, saquei 100 yuans e pedi ao atendente para imprimir um comprovante de saque com o carimbo oficial do banco (veja a imagem abaixo)

![[IMG_20260504_124358_edit_5024691644024.jpg|width=460|align=center|caption=工商银行柜台打印并盖章的取款回单]]

Nesse comprovante constavam apenas o meu nome, o número do cartão e o registro da transação — não havia endereço nenhum. Mesmo assim, enviando junto com o documento de identidade, depois de ser rejeitado algumas vezes, acabou sendo aprovado

Passo a passo:

1. Vá ao caixa do banco e faça um saque de 100 yuans
2. Garanta que o comprovante tenha seu nome, número do cartão, registro da transação e o carimbo oficial de operações do banco (essencial)
3. A data precisa ser recente, de preferência impresso e carimbado no balcão
4. Se a análise for rejeitada, não saia trocando os documentos à toa; espere alguns dias e envie novamente

## 5. Comparativo de métodos de recebimento: do melhor ao pior, e a questão da conformidade

Para desenvolvedores da China continental, conseguir trazer o dinheiro para casa é um baita desafio. Com base na experiência prática e nos custos de conformidade, o ranking do melhor para o pior fica assim:

| Método | Taxas / Custo | Velocidade | Requisitos de Conformidade | Para quem serve |
| :--- | :--- | :--- | :--- | :--- |
| **Conta bancária nos EUA** | Mais baixa (ACH local) | Rápida | Precisa cuidar de impostos e câmbio por conta própria | Quem já tem conta nos EUA |
| **Plataforma terceirizada (WorldFirst)** | Teto de 0,7% no saque | Cai em RMB em segundos | Precisa enviar extratos de transações periodicamente | A grande maioria dos devs indie |
| **Visa/MC de banco estrangeiro (transferência direta)** | Via SWIFT, bancos intermediários descontam 15–30 USD por envio | Lenta, alto risco de devolução | O banco pode exigir comprovantes físicos | Quem tem receita estável e não liga para burocracia manual |
| **UnionPay habilitado para remessa internacional** | Taxas altas | Mais lenta | Frequentemente exige comprovantes físicos | Não recomendado |

Falando de forma sincera sobre os "perrengues" e as vantagens da WorldFirst:

· O que você precisa fazer: depois de se cadastrar, é preciso enviar periodicamente (geralmente todo mês) no painel da WorldFirst os registros de recebimento ou extratos de transações do Steam para liberar o limite de liquidação cambial. Isso realmente dá um passo a mais do que "só colocar o número do cartão e esquecer"

· O que ela resolve para você: se você não usar uma plataforma terceirizada e tentar receber uma transferência SWIFT direto em um banco chinês, além de perder de 15 a 30 dólares por transação para bancos intermediários, o banco local ainda pode devolver o dinheiro por não conseguir identificar a natureza da remessa da Valve — gerando tarifas na ida e na volta. Esse processo de "enviar os extratos" na WorldFirst serve justamente para fazer a declaração de conformidade cambial por você, permitindo converter dólares em RMB sem problemas e sem consumir a cota anual individual de 50 mil dólares

· Então, qual escolher: se a sua receita mensal ainda é baixa (tipo uns cem ou duzentos dólares) ou se você odeia burocracia, ir direto na transferência bancária e assumir as taxas e o risco de estorno é uma opção. Mas se sua receita está crescendo ou você quer poupar a dor de cabeça de ficar explicando ao banco "de onde veio esse dinheiro", a WorldFirst continua sendo a opção com menor custo total e menos estresse

Se decidir usar a WorldFirst, você pode criar sua conta de desenvolvedor pelo meu link de indicação:
👉 [Link de cadastro WorldFirst (万里汇)](https://s.worldfirst.com.cn/3M7iMD?default_source=WF-Vk00000xX1cr&referral_id=WF-Vk00000xX1cr)

## 6. Resumo

Registrar-se como desenvolvedor no Steam é, no fundo, um teste de paciência e atenção aos detalhes. A parte fiscal e financeira parece chata, mas dominando os pontos-chave — "nome real em Pinyin, documento de identidade no TIN e redução de imposto para 10%" — e insistindo com um comprovante bancário carimbado até o fim, você consegue passar por essa barreira

Desejo que os jogos de todo mundo vendam muito e que os dólares caiam direitinho no bolso de vocês!

# No próximo episódio

Página da loja, ID do aplicativo, requisitos de classificação indicativa, conta de desenvolvedor e comunidade? Quando eu chegar na parte de configurar tudo isso, faço outro post por aqui haha

## Continue lendo

Se você usa Godot para fazer jogos, vale dar uma olhada no GodotSteam lá em [[godot-useful-plugins|Lista de plugins essenciais]], e os perrengues durante o desenvolvimento estão em [[after-gmtk|Retrospectiva da GMTK Jam]]

Sobre como é levar um projetinho pequeno até o lançamento, também escrevi um pouco em [[subarutap-and-selfthink|Reflexões sobre o desenvolvimento e criação de SubaruTap]]
