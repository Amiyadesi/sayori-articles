---
title: "Comment gérer son environnement de dev étudiant avec les crédits IA officiels, AnyRouter, SharedChat et cc-switch"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 12
description: "Notes de configuration à destination des étudiants sur les crédits IA officiels, l'inscription sur AnyRouter, la récupération des crédits SharedChat et cc-switch, à consulter en complément de ma vidéo sur Bilibili"
image: ""
tags:
  - Tutoriel pratique
  - Workflow IA
  - Claude Code
  - Avantages étudiants officiels
category: "Tutoriels et guides"
draft: false
lang: fr
translationKey: "posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide"
alias: ""

---

Cet article sert de version écrite en complément de la vidéo, tout en ajoutant les méthodes d'intégration pour les crédits IA officiels destinés aux étudiants.

La vidéo est ici : [BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## C'est quoi exactement tous ces trucs ?

Avant de configurer `cc-switch`, commençons par bien distinguer les différentes sources de crédits qu'on peut brancher :

- **Crédits officiels classiques** : cela comprend [Zed Education](https://zed.dev/education) (la vérification étudiante offre un an de forfait Student, incluant 10 $ par mois de crédits AI Agent et des prédictions d'édition illimitées), [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/) (utilisable avec le bon étudiant sans minimum d'achat de 300 RMB ou les tokens gratuits pour nouveaux utilisateurs), [Google AI Studio](https://aistudio.google.com/) (le niveau gratuit officiel de l'API Gemini), ainsi que GitHub Copilot Student et GitHub Models dans le [GitHub Student Developer Pack](https://education.github.com/pack). C'est ce qu'il y a de plus stable, idéal pour un usage principal.
- **AnyRouter / AgentRouter** : des services de routage fournissant une interface compatible Claude Code / Anthropic. Ils vous donnent un point d'entrée API et une clé utilisables, à renseigner directement dans les outils compatibles Claude Code.
- **SharedChat** : un portail plutôt orienté crédits communautaires/gratuits GPT / Codex, à voir comme une source supplémentaire de crédits Codex.
- **cc-switch** : un gestionnaire de configuration open source sur ordinateur (dépôt GitHub : [farion1231/cc-switch](https://github.com/farion1231/cc-switch)), qui sert à centraliser et basculer facilement entre les configurations de fournisseurs pour des outils comme Claude Code, Codex ou Gemini CLI.

## Comment récupérer les crédits officiels

Si vous voulez d'abord monter un canal principal bien stable, commencez par réclamer ces quatre offres éducatives/gratuites (pour la liste complète de toutes les ressources étudiantes, jetez un œil à [[edumails-glados-student-benefits|Guide des avantages officiels liés aux adresses e-mail universitaires]]) :

1. **Zed Education (10 $ de crédits IA par mois)** : une fois votre demande validée sur [Zed Education](https://zed.dev/education), vous obtenez le statut Student pendant un an, avec 10 $ par mois de crédits Agent tokens et des prédictions d'édition illimitées (hors Claude Opus). Il faut que votre compte GitHub ait au moins 30 jours et que le domaine de votre e-mail universitaire figure dans la liste [JetBrains/swot](https://github.com/JetBrains/swot).
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **API officielle Alibaba Cloud Bailian** : récupérez le bon étudiant de 300 RMB via le [lien d'avantages étudiants Alibaba Cloud](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv), ou allez directement générer une clé API dans la console Bailian, puis renseignez `https://dashscope.aliyuncs.com/compatible-mode/v1` comme Base URL.
3. **Niveau gratuit officiel Google AI Studio** : connectez-vous avec un compte Google pour générer directement une clé API Gemini. Pas besoin d'ajouter de carte bancaire pour appeler les modèles de la gamme Gemini dans la limite du quota gratuit quotidien.
4. **Pack étudiant GitHub** : après avoir vérifié votre adresse e-mail universitaire, activez directement GitHub Copilot Student.

## S'inscrire sur AnyRouter

Site officiel : [https://anyrouter.top/](https://anyrouter.top/)

Lien d'affiliation de l'auteur du site (passer par là donne 50 $ à chacun) : [https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

Suivez simplement les instructions à l'écran lors de l'inscription. Le code de vérification par e-mail n'arrive pas toujours à la seconde près : attendez quelques minutes avant de cliquer sur renvoyer, sinon vous allez juste vous énerver pour rien.

> [!TIP]
> Si vous bloquez sur l'inscription avec une adresse EDU, allez voir directement :
> [[#^answer1|👉 Que faire si l'inscription avec un e-mail EDU ne marche pas]]

## Jeter aussi un œil à AgentRouter

Un autre portail à regarder en parallèle est AgentRouter : [https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

On peut s'y inscrire et s'y connecter avec un compte GitHub ou Linux Do, et la liste des modèles affiche `gpt-5.5` ainsi que la série Claude. Si vous arrivez à vous inscrire, ça fait une bonne roue de secours.

Les conditions d'inscription sont ici :

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## Générer une clé API AnyRouter

Allez sur la page des jetons API (API Tokens) dans le panneau d'administration et créez un nouveau jeton.

Mettez le nom que vous voulez, de préférence quelque chose de parlant, par exemple :

```text
cc-switch-anyrouter
```

Les champs habituels à remplir ressemblent à peu près à ça :

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## Récupérer les crédits GPT sur SharedChat

Pour [SharedChat](https://sharedchat.cc/#/), suivez simplement l'accès aux événements indiqué sur leur page.

À la base, c'est un projet communautaire gratuit permettant d'utiliser GPT sur le web sans inscription. Récemment, le créateur du site a aussi lancé un projet Codex communautaire sur lequel on peut réclamer des crédits tous les jours.

En gros, la marche à suivre est la suivante :

1. Inscrivez-vous / connectez-vous avec une adresse QQ Mail sur le [site communautaire Codex](https://new.sharedchat.cc/list/#/register?i=E8v44), **et non sur le site payant**. Après, rien ne vous empêche de payer si vous y tenez.
2. ![[Pasted image 20260620234009.png]]
3. Cliquez sur « Postuler » (申请) en bas à droite et écrivez une petite justification. Si le navigateur vous dit que ça ne passe pas, changez de navigateur ou passez en navigation privée.

## Installer cc-switch

Dépôt officiel de cc-switch : [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Sous Windows, on prend généralement `.msi` ou le zip portable. Sur macOS, référez-vous aux instructions d'installation dans le README. Sous Linux, choisissez deb, rpm ou AppImage selon votre distribution.

Une fois installé et lancé, il détecte les outils CLI IA déjà présents sur votre machine et lit vos skills ainsi que votre historique. Vous pouvez l'utiliser pour gérer vos configurations existantes, mais aussi pour mettre à jour et installer les outils associés.
![[Pasted image 20260620233340.png]]

## Ajouter un fournisseur dans cc-switch

Prenons AnyRouter ou Alibaba Cloud Bailian comme exemple :

1. Ouvrez cc-switch
2. Allez dans les paramètres de fournisseurs de Claude Code ou de l'outil concerné
3. Créez un nouveau fournisseur personnalisé
4. Renseignez le nom du fournisseur, par exemple `Aliyun-Bailian` ou `AnyRouter`
5. Renseignez la clé API
6. Renseignez l'adresse de requête / Base URL
7. Choisissez le format d'interface selon ce qui est indiqué sur la page de la plateforme correspondante
8. Enregistrez
9. Cliquez sur Utiliser / Basculer

Si vous ajoutez plusieurs canaux, créez un fournisseur distinct pour chacun avec un nom bien clair :

```text
Bailian Official
AnyRouter edu
SharedChat
```

Comme ça, au moment de basculer, vous savez tout de suite sur quel quota vous tournez.

## Activer le routage automatique dans cc-switch

La configuration la plus simple pour le routage automatique consiste à activer le routage puis à définir l'ordre de basculement en cas de panne (failover).

Activez le routage dans les paramètres :
![[Pasted image 20260620234413.png]]

Organisez plusieurs fournisseurs dans le basculement automatique :
![[Pasted image 20260620234401.png]]

## Vérifier que ça fonctionne

Après avoir basculé, redémarrez votre terminal ou ouvrez-en directement un nouveau.

Commencez par demander un simple :

```text
/init
```

Si ça répond normalement, passez aux tâches de code.

Si vous avez une erreur, vérifiez les points suivants :

1. Si la clé a bien été copiée en entier
2. S'il n'y a pas un espace en trop ou un bout de chemin manquant dans la Base URL
3. Si vous avez bien cliqué sur Utiliser / Basculer dans cc-switch
4. Si le terminal a bien été redémarré
5. Si le quota du site correspondant n'est pas déjà épuisé
6. Si le nom du modèle fait bien partie des modèles actuellement pris en charge par le backend

## Questions fréquentes

### Que faire si l'inscription avec un e-mail EDU ne marche pas
Il y a de fortes chances que votre adresse soit sur la liste noire d'AnyRouter.

Vous pouvez toutefois essayer de mettre en majuscule la première lettre d'un segment du domaine de votre e-mail universitaire pour voir si le mail passe. Par exemple, si votre adresse est `stu.xxxx.edu.cn`, essayez avec `stu.Xxxx.edu.cn`. Parfois le mail part, mais rien ne garantit une réception fiable.

^answer1

### Ça ne marche pas après branchement sur CPA ou Sub2

AnyRouter s'adresse avant tout aux clients comme Codex ou Claude Code. Si vous voulez le brancher sur des outils comme CPA ou Sub2, il faudra peut-être ajuster les en-têtes de requête ; voici juste l'exemple que j'avais noté lors de mes tests :

| En-tête       | Valeur                                                        |
| ------------- | ------------------------------------------------------------- |
| Authorization | Bearer sk-votre_api                                           |
| User-Agent    | codex_cli_rs/0.114.0 (ou une autre version existante) (Windows 10.0.26100; x86_64) |

### Any ne marche pas ou rame énormément
Là, on n'y peut pas grand-chose. Comme beaucoup de monde l'utilise en même temps, la stabilité dépend de la charge du moment. Voici mon retour d'expérience :
> [!NOTE]
> C'est un peu au petit bonheur la chance : en général, gpt5.5 est assez facile à accrocher, et une fois connecté ça reste plutôt stable ; sinon, c'est plus simple de monter dans le train tard dans la nuit.
>
> Aux heures de pointe il faut faire la queue : essayez d'ouvrir une nouvelle session, d'envoyer un « hi », d'activer le mode cible et de relancer si ça coupe. En moins de dix minutes c'est généralement connecté ; si ça ne passe toujours pas, c'est probablement un souci de configuration.

S'il reste d'autres problèmes, vous pouvez jeter un œil ici :
[Dépannage du routeur marque Any !](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## Pour aller plus loin

Les autres avantages officiels sont regroupés dans [[edumails-glados-student-benefits|Liste récapitulative des avantages étudiants]]. Si vous voulez mettre en ligne les projets que vous avez codés, vous pouvez continuer avec [[azure-students-100-credit-guide|Serveur Azure au Japon]] et [[aliyun-student-300-voucher-guide|Bons étudiants Alibaba Cloud]], ou passer directement par [[astro-mizuki-blog-from-zero|Héberger un site avec Cloudflare Pages]] pour des pages statiques.

Une fois les modèles branchés, j'ai dédié un article séparé à la partie recherche avec [[build-your-search-gateway|Search Gateway]], et les outils navigateur pour faciliter la lecture, la traduction et la gestion des API sont rangés dans [[useful-browser-extensions-toolbox|Liste d'extensions]].
