---
title: J'ai créé un petit dépôt de liste de forums
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: J'ai rassemblé des communautés internet notées ici et là dans un petit dépôt de liste de forums façon wiki et un site dédié, et tout le monde est bienvenu pour ouvrir une PR.
image: ""
tags:
  - Été 2026
  - Notes communautaires
  - Open source
  - Forums
category: "Carnet personnel"
draft: false
alias: ""
lang: fr
translationKey: "posts/cn-internet-community-map/internet-community-map"
---

# J'ai créé un petit dépôt de liste de forums

Cela faisait un moment que je voulais dresser une carte des communautés internet

Je ne parle pas ici des grosses plateformes bien visibles comme X, Instagram, Tieba, Xiaohongshu ou Xiaoheihe, mais plutôt des forums et communautés qu'on ne croise quasiment jamais naturellement sans chercher activement ou sans traîner dans le coin

Le projet est passé d'un simple article à un dépôt indépendant maintenable sur la durée et une page en ligne :

- Dépôt GitHub : [https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)
- Page en ligne : [https://forums.cc.cd/](https://forums.cc.cd/)

Le site ressemble désormais plutôt à un wiki ou à une doc : à gauche les catégories et l'annuaire des communautés, au milieu les fiches détaillées, chaque communauté a sa propre page, et il y a des commentaires Giscus en bas de page

La première version recense 49 communautés. Si des gens ajoutent des entrées, corrigent des trucs ou ouvrent des PR par la suite, ce chiffre continuera d'évoluer

## Ce que répertorie ce dépôt

Ici, « petit » ne se mesure pas strictement au nombre d'utilisateurs, mais à la façon dont on y arrive

Si on n'y tombe pas vraiment sans faire une recherche active, ou si seules les personnes qui traînent dans les cercles hébergement, ACG, sécurité, matériel, webmasters ou ressources les voient régulièrement, alors ça a des chances d'entrer dans la liste

Pour l'instant, ça se découpe à peu près ainsi :

- Tech / IA / Développeurs
- Hébergement / VPS / Webmasters / Sites indépendants
- Recherche / Ressources / Outils de connaissances
- Sécurité / Reverse engineering / Système / Logiciels
- ACG / Jeux vidéo / Petits cercles
- Matériel / Électronique / Homelab
- Adulte / Ressources / Zone grise
- Vieux forums étrangers / Intérêts variés

Le classement fait par l'IA paraît un peu bizarre par endroits, mais bon, faute de mieux on fait avec pour l'instant

## À quoi ressemble la page maintenant

Avant, ça ressemblait plutôt à une longue liste dans un README ; maintenant c'est découpé en site.

L'accueil garde un aperçu par catégorie pour voir vite quelles communautés sont là ; le menu de gauche permet de sauter d'une catégorie à l'autre ; chaque communauté a aussi sa page dédiée, ce qui aide à signaler directement si une fiche est fausse, si l'accès a changé ou si les règles d'inscription ont bougé

Au départ, je voulais faire une « carte des communautés internet », mais plus j'écris, plus je réalise que le plus dur dans une carte, ce n'est pas de la tracer, c'est de la maintenir

Les accès aux forums changent, les modes d'inscription changent, l'ambiance des communautés change aussi. Du côté de l'hébergement, de nouvelles infos tombent sans arrêt avec les fournisseurs, les routes réseau et les promos ; les communautés ACG et ressources deviennent vite obsolètes à cause des noms de domaine, des droits d'accès ou des règles de section

Du coup, l'idée actuelle est simple : le dépôt sert d'annuaire et de relevé factuel, et le blog sert à raconter mon vécu

Si j'ai vraiment fréquenté une communauté sur la durée, j'en fais un article à part. Si ce n'est que de la compilation d'infos publiques, ça reste dans la liste

## Ce qui est écrit pour chaque communauté

Dans le dépôt, chaque fiche essaie de renseigner ces éléments :

- Accès
- Positionnement et ambiance de la communauté
- Mode d'inscription ou conditions d'entrée
- Ce qu'on y trouve principalement
- Ce qu'il est pertinent d'y regarder
- Points de vigilance
- Sources publiques
- Date de dernière vérification

Pour les communautés que j'ai fréquentées longtemps, l'écriture ressemble davantage à un vrai ressenti.

Par exemple pour Linux.do et NodeLoc, je m'appuierai sur ce que j'avais noté dans [[internet-community-1|Notes sur les communautés internet 1]] : sur Linux.do, les règles, les missions débutants, les services gratuits/communautaires, les bons plans/gratuités, l'optimisation dev, la co-construction de doc, LDC ; sur NodeLoc, l'ambiance libre, les sous-forums, les points batterie, les liens d'affiliation (AFF) et l'activité de l'admin

Pour celles que je n'ai pas utilisées sur la durée, je me contente d'organiser les pages publiques et les retours entendus dans le milieu, sans faire semblant d'avoir vécu la chose de l'intérieur

## Pourquoi les PR sont bienvenues

Sur ce genre de liste, une seule personne se trompe forcément

Pour certaines communautés, quelqu'un de l'extérieur ne voit que la porte d'entrée sans saisir l'ambiance réelle. Certaines inscriptions ouvrent par vagues, certains domaines bougent, et les anciens et nouveaux noms se mélangent facilement

Ce dont ce dépôt a le plus besoin, ce n'est donc pas d'une présentation plus léchée, mais de corrections apportées par de vrais membres de ces communautés

Si vous êtes un ancien utilisateur d'une de ces communautés, ou que vous repérez simplement une erreur dans une fiche, vous pouvez ouvrir directement une PR. Les ajouts les plus utiles portent généralement sur ces points :

- Les inscriptions sont-elles ouvertes, sur invitation, ou ouvertes par périodes ?
- Quel règlement ou quelle annonce un nouveau venu devrait-il lire en premier ?
- L'ambiance réelle penche-t-elle plutôt vers la technique, le flood, les échanges/transactions ou les ressources ?
- Quelles sont les sections les plus intéressantes à l'intérieur ?
- L'accès a-t-il changé, ou l'ancien domaine est-il déjà instable ?
- Certaines descriptions font-elles trop « résumé IA » et gagneraient à être réécrites avec le ton d'un vrai utilisateur ?

Si vous ne voulez pas faire de PR, vous pouvez aussi laisser un message directement sous la page de la communauté concernée. Le site est maintenant relié à Giscus, et les commentaires arrivent dans GitHub Discussions

## Comment aider à la mise à jour

Pour ajouter ou modifier une communauté, mieux vaut toucher en priorité aux données structurées du dépôt :

```bash
data/communities.json
```

Une fois les modifs faites, lancez :

```bash
node scripts/generate-readme.mjs
node scripts/build-site.mjs
```

La première commande met à jour le README, la seconde génère les pages en ligne

Si vous modifiez seulement les descriptions de catégories, vous pouvez regarder :

```bash
docs/categories.md
```

Si vous ajoutez une communauté, le mieux est d'indiquer en même temps une source publique. Ça peut être le site officiel, la page d'inscription, une annonce sur le site, une page À propos, une page de règles, ou toute autre info accessible publiquement

## Règles de classement actuelles

Ce projet a pour l'instant été surtout assemblé par l'IA à partir de sources publiques, de pages de sites et d'un petit peu de vécu personnel. Seule une partie de ces communautés correspond à une fréquentation réelle et suivie de ma part

J'aimerais donc que chaque fiche puisse peu à peu être revue par de vrais utilisateurs

Les communautés adulte, ressources, crack, reverse engineering, sécurité, flashage/ROM ou transactions figurent aussi dans la liste, mais seront décrites par grande catégorie : ce qu'on y trouve en gros, ce qu'il est intéressant d'y observer et les pièges à éviter. Chacun reste responsable de décider d'y aller ou non, d'y participer et d'évaluer les risques

À ce stade, je préfère en faire un annuaire public modifiable sur la durée plutôt qu'un billet de blog périmé dès sa publication

Si vous remarquez un forum que j'ai oublié ou une fiche qui fait très amateur, n'hésitez pas à passer directement ouvrir une PR sur le dépôt :

[https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)

## Pour continuer la lecture

Si vous voulez d'abord lire mes propres retours en parcourant ces communautés, vous pouvez commencer par [[internet-community-1|Linux.do, NodeLoc et NodeSeek]], puis enchaîner sur [[internet-community-2|Volet communautés d'intérêt]]

Les liens liés aux blogs indépendants sont regroupés à part dans [[internet-community-3|Communautés et organisations de webmasters]] — à explorer tranquillement en parallèle de la carte
