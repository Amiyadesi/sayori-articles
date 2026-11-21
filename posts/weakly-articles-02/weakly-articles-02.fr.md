---
title: Lectures hebdomadaires du web 2 —— Own the Slice
published: 2026-09-27
created: 2026-09-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 1
description: Own the Slice —— la méthodologie de code à maîtriser à l'ère de l'IA ?
image: ""
tags:
  - Réflexions de lecture
  - Lectures hebdomadaires
  - Flux de travail IA
  - Automne 2026
category: "Réflexions personnelles"
draft: false
alias: ""
lang: fr
translationKey: "posts/weakly-articles-02/weakly-articles-02"
---
[Lien vers l'article original](https://www.kentlangley.com/blog/own-the-slice/)

# Décryptage
L'intelligence artificielle a fait baisser le coût d'écriture du code bien plus vite que celui du travail produit dans son ensemble. Cet article présente une unité de travail permettant à une seule personne d'assumer l'intégralité du processus, du besoin client jusqu'à la livraison du résultat

Au début, l'article décrit un scénario où le multitâche semble a priori sans problème. Pourtant, selon cette étude [https://contextcost.com/the-research](https://contextcost.com/the-research), chaque tâche menée en parallèle consomme en réalité davantage de temps de bascule entre elles. L'auteur cite la célèbre estimation empirique de Weinberg pour illustrer le coût du changement de contexte sur des projets simultanés : à mesure que le nombre de projets menés de front augmente, le temps nécessaire pour recharger le contexte peut grimper en flèche

Deux projets vous mangent déjà 1/5 de votre temps total initial, et si vous menez 5 projets en parallèle, cela engloutit presque les 3/4 de votre temps — uniquement en changements de contexte. Une fois ce temps déduit des 100 % et le reste divisé par le nombre de projets, votre efficacité de développement s'effondre. Il faut toutefois noter que ces pourcentages relèvent d'une estimation empirique et non d'un résultat expérimental rigoureux. L'article introduit ensuite son concept central : `slice`

Aux yeux de l'auteur, `slice` est une **tranche verticale / un résultat livrable** : plutôt que de découper le travail selon l'architecture technique, on part d'un besoin réel, on traverse toutes les couches nécessaires pour y répondre, et on livre au final un résultat concrètement perceptible par l'utilisateur. Il en profite également pour présenter `INVEST检查清单`, l'un des paradigmes de la programmation agile

L'auteur aborde ensuite le véritable impact actuel de l'intelligence artificielle : elle réduit drastiquement le temps consacré à l'implémentation, mais le gain de temps sur la prise de décision reste très limité, ce qui peut finalement rallonger la durée globale du développement. L'expérience amusante citée dans l'article [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) va exactement dans ce sens

L'auteur aligne plusieurs années de rapports DORA pour tracer un récit allant de « l'IA perturbe les systèmes de production » à « l'IA est progressivement absorbée par le système ». Mais comme ces résultats annuels ne constituent pas au sens strict un suivi longitudinal d'une même cohorte, je préfère y voir un indice de tendance plutôt qu'un lien de causalité démontré

# Ce que j'en retiens
En vrai, l'explication de l'IA proposée dans l'article fait aujourd'hui plutôt consensus dans le milieu tech : l'IA ressemble davantage à un outil de gain d'efficacité surpuissant qu'à une véritable « lampe d'Aladin » capable de tout exaucer

Elle permet de comprimer énormément le temps nécessaire à la phase d'implémentation, mais développer un projet ne se résume pas à coder. L'évaluation des besoins, la conception de la solution, les tests, la relecture (Review), l'intégration et la recette n'ont pas été comprimés au même rythme

C'est là que le problème apparaît

Auparavant, la partie la plus coûteuse du développement d'une fonctionnalité était sans doute de « l'écrire » ; maintenant qu'on a l'IA, « écrire le code » devient de moins en moins cher, et ce qui coûte vraiment cher, c'est progressivement devenu : décider quoi faire, juger si ce qui est généré est correct, et mener véritablement une tâche jusqu'au bout

Autrement dit, l'IA n'a pas éliminé les goulots d'étranglement du développement, elle les a simplement déplacés

C'est aussi ce que je trouve vraiment intéressant dans le concept de `slice`

Si le coût d'implémentation baisse sans cesse, on tombe facilement dans un nouveau piège : comme « commencer quelque chose » ne coûte presque rien, on lance de plus en plus de tâches en même temps. Demander à l'IA de coder une fonctionnalité ne prend qu'un prompt, et ouvrir un autre agent pour en faire une autre n'a quasi aucun coût mental supplémentaire — en apparence, tout avance en parallèle

Mais au final, il faut toujours quelqu'un pour comprendre, tester, corriger et décider d'accepter ou non ces productions, et cette personne, c'est généralement soi-même

Ainsi, le gain de productivité apporté par l'IA risque paradoxalement de produire encore plus de code non validé, de fonctionnalités inachevées et de contextes à recharger. Le code sort de plus en plus vite, mais ce qui est réellement terminé n'augmente pas forcément dans les mêmes proportions

Sous cet angle, `slice` ressemble davantage à un garde-fou contre cette dérive

Plutôt que de découper le travail en tâches techniques du type « implémenter la base de données », « coder une interface » ou « ajouter une API », mieux vaut définir l'objectif comme un résultat complet et vérifiable, par exemple : « l'utilisateur peut désormais accomplir telle action qu'il ne pouvait pas faire avant »

L'IA peut toujours aider à implémenter la base de données, l'interface, l'API et les tests correspondants, mais ces éléments ne sont plus considérés comme autant de tâches terminées séparément : ce ne sont que différentes composantes d'un seul et même résultat

Cela me rappelle certaines de mes expériences actuelles avec les Coding Agents

Avant, je devais écrire le code moi-même, donc ce que je pouvais faire avancer en même temps était naturellement limité. Maintenant, je peux demander simultanément à plusieurs agents de modifier différents projets : un jeu, un site web, un script d'automatisation, ou même plusieurs fonctionnalités d'un même projet

En apparence, ma « vitesse de développement » est effectivement devenue fulgurante

Mais une fois que les agents ont fini, si je veux pouvoir rester maître des modifications, je dois quand même relire une par une ce qu'ils ont fait, vérifier qu'ils n'ont pas cassé la logique existante, lancer les tests et recharger tout ça dans le modèle mental du projet que j'ai en tête

Le vrai goulot d'étranglement est peut-être passé de « je code trop lentement » à « je n'ai pas assez d'attention pour comprendre et valider tout ce que l'IA produit »

Je pense donc qu'à l'ère de l'IA, une compétence essentielle n'est peut-être pas le nombre d'agents qu'on arrive à piloter en même temps, mais la capacité à limiter le nombre de choses « pas encore vraiment terminées » qu'on garde sur les bras

C'est ce que j'ai vu et tiré de cet article

Quant à savoir si `slice` est vraiment la meilleure solution, je n'en suis pas encore certain. Certaines refactorisations bas niveau, dettes techniques ou optimisations de performances correspondent difficilement à un résultat directement perceptible par l'utilisateur ; et confier à une seule personne la responsabilité du besoin jusqu'à la livraison peut aussi engendrer une autre forme de charge cognitive

Mais cela offre au moins un angle de réflexion très pertinent :

**Maintenant que le code coûte de moins en moins cher, ne devrait-on pas commencer à prendre le « terminé » plutôt que l'« implémenté » comme unité de base pour mesurer l'avancement du développement ?**

Par le passé, on assimilait facilement « avoir écrit un bout de code » ou « avoir fini un module » à de l'avancement, mais depuis que l'IA a drastiquement réduit le coût d'implémentation, cette façon de mesurer est peut-être en train de devenir obsolète

Ce qui compte vraiment n'est peut-être plus la quantité de code produite, mais le nombre de sujets qui ont réellement traversé la conception, l'implémentation, la vérification et l'intégration pour devenir au final un résultat utilisable, tangible et livrable

Si tel est le cas, alors ce qui devient vraiment rare à l'ère de l'IA, ce n'est peut-être plus seulement la capacité d'implémenter, mais la capacité à maîtriser le périmètre, son attention et l'achèvement lui-même

# Épilogue
Pfiou... lire des articles, c'est épuisant... surtout ce genre d'articles spécialisés... et en plus il est super long

Et comment dire, mon ressenti honnête en lisant, c'est que soit j'ai l'impression qu'on explique des évidences qui n'avaient pas besoin d'être dites, soit c'est un tas de trucs auxquels je ne comprends absolument rien

C'est la malédiction de la connaissance, au fond : une fois qu'on maîtrise un savoir, il devient très difficile de s'imaginer tel qu'on était avant de le comprendre

Et si on veut partager ses propres prises de conscience ou réflexions, il faut pourtant réussir à bien les mettre en mots — sinon, un article que vous êtes le seul à comprendre mérite-t-il vraiment qu'on l'appelle un article ? On peut en douter......

Partager n'a jamais été une chose simple... surmonter la peur de publier n'est finalement que la toute première marche : le vrai défi, c'est de savoir mieux exprimer son point de vue, montrer sa compréhension avec des arguments solides, tout en rendant le texte captivant

C'est un peu comme ce que dit l'article :

« L'avoir écrit » ne veut pas dire « l'avoir terminé »

## Poursuivre la lecture

Le point de départ de cette série se trouve dans [[weakly-articles-01|la première lecture d'article du web]], et ces questions de périmètre et d'achèvement abordées aujourd'hui, j'en ai effectivement fait les frais lors de la [[after-gmtk|GMTK Jam]]

Plus tard, en réalisant [[subarutap-and-selfthink|SubaruTap]], j'ai enfin réussi à boucler une petite boucle complète ; mis bout à bout, ces billets retracent aussi la façon dont j'ai peu à peu réappris ce que signifie créer
