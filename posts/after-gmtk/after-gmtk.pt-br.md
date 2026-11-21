---
title: Retrospectiva pós-GMTK Jam
published: 2026-07-27
created: 2026-07-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: Nas últimas seis horas da GMTK Jam, cortei os puzzles que não daria tempo de terminar e entreguei um minijogo que de fato dá pra jogar até o fim
image: ""
tags:
  - Verão 2026
  - Game Jam
  - Desenvolvimento de jogos
  - Reflexão de crescimento
category: "Registros pessoais"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/after-gmtk/after-gmtk"
---

# Terminei, mas não consigo ficar feliz
A gmtk saiu, o link tá aqui: [Last Minute Echo by Amiya_desi](https://amiya-desi.itch.io/last-minute-echo). No fim das contas, virou só um minijogo — pelo menos é um minijogo completo, com vitória e derrota — mas eu não consigo ficar nem um pouco feliz.

# Jornada mental

## No começo
Quando vi que o tema da gmtk era count down, achei que ia ser bem tranquilo e confortável. Ainda mais porque eu já tinha um projeto anterior que combinava bastante com isso, o [TimeRewindLinker by Amiya_desi](https://amiya-desi.itch.io/time-rewind-linker). Pensei em pegar essa base de rebobinar o tempo e colocar puzzles com limite de contagem regressiva — caramba, parecia uma ideia genial daquelas de entrar pros [Agradecimentos e incentivos](/essays/thanks-encourage/) (risos/névoa). Achando que tinha bolado um plano desses, já tava assumindo que a vitória era garantida (feliz).

## O meio do desenvolvimento e o surto de raiva
Como achei que encaixava perfeitamente no que eu já tinha feito, fiquei empolgado e fui logo discutir uma primeira versão com a IA pra começar... e aí veio o inferno na terra... A IA nunca mexia do jeito que eu sentia que devia, e eu também, de tanto usar a IA como cadeira de rodas, fiquei com preguiça até de montar um greybox de fase por conta própria — só sabia pedir pra IA tirar na sorte, gerando do esqueleto à carne de uma vez só. Virei um cérebro frito na cadeira de rodas igual o Regulus QAQ.
![[Pasted image 20260727222142.png|width=640|align=center]]
Quem diria que, quando finalmente criei coragem nas últimas seis horas pra olhar a cena que a IA tinha montado pra mim, eu ia ter um aneurisma desse tamanho. Até hoje lembro de um detalhe específico:
`谁能想到这个人机做一个陷阱方块，不单独用一个场景做陷阱预制体，然后再在主场景实例化放置，而是选择神秘的一个陷阱tile放陷阱贴图，然后一个陷阱Node2d下面放一堆area2d放在这些尖刺边上，我去你这让我怎么改，要是我一开始就一个场景内聚好了只需要摆放就行了，这TM全是零散拆开的，我还得一个一个挪，那我挪个蛋啊我靠！`

## A decisão final e o sprint
Aí, quando a sanidade voltou no apagar das luzes, entre enviar algo completo porém bem pequeno e outro troço que parecia gigante mas nem dava pra jogar, fui firme no primeiro: cortei todos os puzzles, voltei pra um objetivo único, fugir de um perseguidor. Com o objetivo claro, deixei a IA cuidar só do algoritmo do perseguidor, de umas condições de vitória/derrota e do cenário, enquanto eu fui salvar o mapa na marra. Faltando 10 minutos, terminei e enviei. Pelo menos ficou pronto... mesmo que a IA do perseguidor ainda seja meio burra e, pra não ficar fácil demais, eu tenha tacado um pouquinho de teletransporte — o que, claro, causou outros problemas, mas já não tinha mais tempo.

# Resumo pós-jam
De tanto andar de cadeira de rodas, tomei uma capotagem feia do tio gmtk. Ainda bem que no fim despertei o bruxo da reversão e consegui sobreviver aos trancos e barrancos pra concluir...
Droga, eu não deveria ser o mais forte?! Pra virar o mais forte, pelo visto ainda tem um caminho bem longo pela frente... GMTK, acho que eu nunca vou te esquecer na vida...

Na verdade, eu já tinha resumido bastante coisa no meu diário pessoal de 2026-07-26 — foi basicamente o fluxo de consciência que escrevi no calor da inspiração bem na hora da virada.

Por fim, galerinha, nunca usem cadeira de rodas demais no futuro, mantenham o pensamento independente — não respondam, não respondam, não respondam!
{{黑幕:Mas comentários são super bem-vindos (*^_^*)}}

## Continue lendo

Se quiser ver como eu recomecei antes disso, dá pra voltar pra [[re0：game-dev-life|Vida no desenvolvimento de jogos do zero]], e os minijogos que vieram depois estão em [[subarutap-and-selfthink|Diário de desenvolvimento do SubaruTap]].

Os tombos que eu levei com escopo saindo do controle e dependência de IA bateram bastante com o que eu li depois em [[weakly-articles-02|Own the Slice]] — ler os dois juntos dá uma boa mexida.
