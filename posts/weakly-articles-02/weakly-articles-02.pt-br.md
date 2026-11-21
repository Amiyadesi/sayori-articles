---
title: Leitura Semanal de Artigos da Internet 2 — Own the Slice
published: 2026-09-27
created: 2026-09-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 1
description: Own the Slice — A metodologia de programação que deveríamos dominar na era da IA?
image: ""
tags:
  - Reflexões de leitura
  - Leitura semanal
  - Fluxo de trabalho com IA
  - Outono de 2026
category: "Reflexões pessoais"
draft: false
lang: pt-BR
translationKey: "posts/weakly-articles-02/weakly-articles-02"
alias: ""
---
[Link original](https://www.kentlangley.com/blog/own-the-slice/)

# Interpretação
A inteligência artificial já reduziu o custo de escrever código muito mais rápido do que reduziu o custo de entregar trabalho de produto. Este artigo expõe uma unidade de trabalho em que uma única pessoa assume a responsabilidade de ponta a ponta, desde a demanda do cliente até o resultado entregue.

Logo no início, o texto apresenta um cenário em que fazer multitarefa em paralelo parece não ter problema nenhum. Mas, na prática, de acordo com este estudo [https://contextcost.com/the-research](https://contextcost.com/the-research), cada vez que você paraleliza tarefas, acaba gastando ainda mais tempo alternando entre elas. O autor cita a clássica estimativa empírica de Weinberg para ilustrar o custo de troca de contexto em projetos paralelos: conforme aumenta o número de projetos assumidos ao mesmo tempo, o tempo gasto apenas para recarregar o contexto pode disparar.

Dois projetos já consomem 1/5 do seu tempo total original; se você tocar 5 projetos em paralelo, isso vai devorar quase 3/4 do seu tempo — e isso é *só* o tempo de troca. Subtraindo o tempo de troca dos 100% e dividindo pelo número de projetos, sua eficiência de desenvolvimento despenca. Vale notar que essas porcentagens são estimativas empíricas, não resultados de experimentos rigorosos. Em seguida, o texto introduz o conceito central do artigo: `slice`.

Para o autor, `slice` é uma **fatia vertical / resultado entregável**: em vez de fatiar o trabalho pela estrutura técnica, parte-se de uma demanda real, atravessando todas as camadas necessárias para realizá-la e entregando, no fim, um resultado que o usuário consegue de fato perceber. De quebra, o artigo também apresenta `INVEST检查清单`, um dos paradigmas da programação ágil.

Depois, o autor aponta qual é o verdadeiro papel da IA hoje: ela reduz drasticamente o tempo na etapa de implementação, mas economiza pouquíssimo tempo na etapa de tomada de decisão — e o resultado final pode acabar sendo até um aumento no tempo total de desenvolvimento. Um experimento interessante citado no artigo [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) mostra exatamente isso.

O autor enfileira vários anos de relatórios DORA para formar uma narrativa de "a IA indo de perturbar os sistemas de produção a ser gradualmente absorvida por eles", mas esses resultados anuais não são exatamente um acompanhamento longitudinal do mesmo grupo de estudo; por isso, prefiro encarar isso como um indício de tendência, e não como um processo causal já comprovado.

# Minha compreensão
Na verdade, essa visão sobre a IA já é um consenso relativamente comum na bolha tech hoje em dia: a IA funciona muito mais como uma ferramenta poderosa de ganho de eficiência do que como uma "lâmpada mágica" que realiza qualquer desejo.

Ela consegue comprimir absurdamente o tempo gasto na fase de implementação, mas desenvolver um projeto não se resume a implementar. Avaliação de requisitos, arquitetura da solução, testes, revisão, integração, homologação — nenhuma dessas etapas foi comprimida na mesma velocidade.

E aí surge o problema.

Antigamente, ao desenvolver uma funcionalidade, a parte mais cara costumava ser "escrever o código"; agora, com a IA, "escrever" ficou cada vez mais barato, e o que realmente custa caro passou a ser: decidir o que deve ser feito, julgar se o que foi gerado está correto e, de fato, concluir uma tarefa.

Em outras palavras, a IA não eliminou os gargalos do desenvolvimento; ela apenas mudou o gargalo de lugar.

É aí que entra o que eu acho realmente interessante no conceito de `slice`.

Se o custo de implementação fica cada vez menor, é muito fácil cair em uma nova armadilha: como "começar algo" ficou barato demais, passamos a iniciar cada vez mais tarefas ao mesmo tempo. Pedir para a IA escrever uma funcionalidade custa apenas um prompt, e abrir outro agente para fazer outra coisa quase não tem custo mental adicional — na aparência, tudo está avançando em paralelo.

Só que essas entregas ainda precisam de alguém para entender, testar, ajustar e decidir se aceita ou não — e essa pessoa geralmente continua sendo você.

Assim, o ganho de produtividade trazido pela IA pode acabar gerando ainda mais código não homologado, funcionalidades inacabadas e contextos que precisam ser recarregados na cabeça. O código é produzido cada vez mais rápido, mas o que é *realmente concluído* não cresce na mesma proporção.

Sob esse ângulo, `slice` funciona quase como um freio para essa tendência.

Em vez de quebrar o trabalho em tarefas técnicas como "implementar o banco de dados", "fazer uma UI" ou "adicionar uma API", vale mais a pena definir o objetivo como um resultado completo e verificável — por exemplo: "agora o usuário consegue fazer algo que antes não conseguia".

A IA continua ajudando a implementar o banco, a UI, a API e os testes disso tudo, mas essas partes deixam de ser encaradas como várias tarefas concluídas separadamente e passam a ser apenas componentes de um mesmo resultado.

Isso me lembra algumas experiências que venho tendo usando Coding Agents ultimamente.

Antes, como eu mesmo precisava escrever o código, havia um limite natural para quantas coisas eu conseguia tocar ao mesmo tempo. Hoje, consigo colocar vários agentes modificando projetos diferentes em paralelo: jogos, sites, scripts de automação e até várias funcionalidades dentro do mesmo projeto.

Superficialmente, minha "velocidade de desenvolvimento" ficou absurdamente alta.

Mas, depois que os agentes terminam, se eu quiser continuar no controle das mudanças, ainda preciso ler uma por uma para ver o que fizeram, conferir se não quebraram nenhuma lógica existente, rodar os testes e recarregar tudo isso no modelo mental do projeto dentro da minha cabeça.

O verdadeiro gargalo provavelmente deixou de ser "escrever código devagar" e passou a ser "não tenho atenção suficiente para entender e validar tudo o que a IA produz".

Por isso acho que, na era da IA, uma habilidade essencial talvez não seja quantos agentes você consegue pilotar ao mesmo tempo, mas sim controlar quantas "coisas ainda não concluídas de verdade" você mantém abertas simultaneamente.

Foi isso que eu enxerguei e tirei deste artigo.

Ainda não tenho certeza se `slice` é realmente a melhor solução. Certas refatorações de base, dívidas técnicas ou otimizações de desempenho dificilmente correspondem diretamente a um resultado perceptível pelo usuário; além disso, fazer uma única pessoa responder desde a demanda até a entrega também pode gerar outro tipo de sobrecarga cognitiva.

Mas, no mínimo, isso traz uma perspectiva muito interessante:

**Agora que o código está cada vez mais barato, deveríamos começar a usar "concluir" em vez de "implementar" como unidade básica para medir o progresso do desenvolvimento?**

No passado, era fácil encarar "terminei de escrever um trecho de código" ou "fechei um módulo" como progresso, mas depois que a IA derrubou o custo de implementação, essa régua talvez esteja perdendo a validade.

O que realmente importa talvez não seja mais quanto código produzimos, mas quantas coisas atravessaram de ponta a ponta o design, a implementação, a validação e a integração, tornando-se, no fim, um resultado utilizável, experimentável e entregável.

Se for assim, então o recurso verdadeiramente escasso na era da IA talvez não seja apenas a capacidade de implementar, mas a capacidade de controlar o escopo, a atenção e a própria "conclusão" das coisas.

# Epílogo
Ufa... ler artigos cansa demais... ainda mais artigos técnicos desse tipo... e ainda por cima longos.

E, sei lá, a minha sensação real durante a leitura é que ou parece algo totalmente óbvio que nem precisava ser dito, ou é um monte de coisa que eu simplesmente não entendo nada.

No fundo, é a tal da maldição do conhecimento: depois que você aprende algo, fica muito difícil imaginar como era o seu eu de antes de entender aquilo.

Só que, se você quer compartilhar suas próprias reflexões e percepções por aí, precisa conseguir expressar tudo isso muito bem em palavras; caso contrário, se só você mesmo entende o que escreveu, dá até para questionar se isso pode ser chamado de artigo...

Compartilhar nunca foi uma tarefa simples... vencer o medo de publicar é só a primeira barreira lá na frente; o difícil mesmo é saber articular bem o próprio ponto de vista, mostrar o que você entendeu com argumentos sólidos e ainda deixar o texto envolvente.

É um pouco como diz o próprio artigo:

"Escrever" não é a mesma coisa que "concluir".

## Continue lendo

O ponto de partida desta série está em [[weakly-articles-01|Primeira leitura de artigos da internet]], e esse problema de escopo e conclusão sobre o qual li hoje foi algo com que eu realmente quebrei a cara na [[after-gmtk|GMTK Jam]].

Mais tarde, quando fiz o [[subarutap-and-selfthink|SubaruTap]], finalmente consegui fechar um pequeno ciclo completo de novo — esses textos conectados mostram um pouco de como fui redescobrindo, aos poucos, o processo de criar.
