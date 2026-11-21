---
title: Attribuer un nom de domaine gratuit à son blog tout juste monté et se montrer dans les communautés de webmasters
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: "Des sous-domaines gratuits DNSHE et du DNS Cloudflare aux systèmes de commentaires, en passant par Travellings, Moe ICP et le Pacte de dix ans : ajouter un nom de domaine, un peu d'interaction et un soupçon de visibilité à un blog tout frais"
image: ""
tags:
  - Tutoriel pratique
  - Création de site et Cloudflare
  - Blog indépendant
  - Avantages étudiants officiels
category: "Tutoriels et guides"
draft: false
lang: fr
translationKey: "posts/free-domain-and-web-community/free-domain-and-web-community"
alias: ""
---

Dans l'article précédent [[astro-mizuki-blog-from-zero|Monter un blog épuré avec Sayori Lite]], j'avais présenté le flux GitHub, Cloudflare Pages et l'écriture optionnelle sous Obsidian.

Une fois en ligne, l'adresse par défaut ressemble en gros à ceci :

```text
https://你的项目名.pages.dev
```

Ça fonctionne, mais on a toujours l'impression qu'il manque un petit quelque chose.

Maintenant que le blog existe, l'étape suivante consiste tout naturellement à lui trouver un nom de domaine présentable, puis à aller se montrer dans quelques communautés de webmasters. Pas pour faire exploser le trafic du jour au lendemain, mais pour transformer ce site d'un simple « projet sur mon ordinateur » en « petit coin à moi avec un vrai nom sur Internet ».

## Un domaine gratuit suffit largement pour commencer

Si tu n'as pas encore envie d'acheter un nom de domaine, tu peux d'abord te faire la main avec un sous-domaine gratuit.

En ce moment, je recommande plutôt des services comme DNSHE :

[https://my.dnshe.com/](https://my.dnshe.com/)

![[Pasted image 20260623151351.png]]

Pour ma part, je privilégie les extensions comme `cc.cd` qui peuvent être reliées à Cloudflare :

![[Pasted image 20260622231201.png]]

Un domaine gratuit convient très bien pour :

- Lier un domaine personnalisé à un blog Cloudflare Pages
- Apprendre la résolution DNS
- Apprendre à gérer un domaine sur Cloudflare
- Préparer des sous-domaines pour tes futurs services auto-hébergés

En revanche, il ne convient pas pour :

- Un projet commercial sur le long terme
- Le domaine principal d'une boîte mail importante
- Une vitrine de marque que tu ne peux pas te permettre de perdre
- Un projet pour lequel tu refuses tout risque de changement de règles

## Codes de parrainage DNSHE

DNSHE propose un système d'entraide qui permet d'obtenir des sous-domaines sur une plus longue durée en s'entraidant.

Je pose déjà quelques codes ici, j'en ajouterai d'autres plus tard si j'en ai :

```text
VJC8UQYTPK
GHGMEUGWXA
VVN9QFPEUL
UUJ22RXYDC
G4HPCNW7R4
```

Si tu veux juste tester ton blog temporairement, inutile de chercher la permanence à tout prix : récupère déjà un domaine qui résout correctement, le plus important est de faire tourner toute la chaîne.

## Les domaines gratuits officiels du GitHub Student Pack

Si tu as une adresse mail universitaire et que tu as validé le [GitHub Student Developer Pack](https://education.github.com/pack), tu peux aussi en profiter pour récupérer deux offres officielles de noms de domaine de premier niveau gratuits la première année :

- **Namecheap** : offre l'enregistrement gratuit pendant un an d'un domaine de premier niveau en `.me` ainsi qu'un certificat SSL d'un an
- **Name.com** : offre la première année gratuite sur une sélection d'extensions (les extensions éligibles et les tarifs de renouvellement exacts sont indiqués au moment du paiement)

Attention toutefois : les domaines du pack étudiant ne sont gratuits que la première année, et repassent au plein tarif au renouvellement. Si tu n'as pas envie d'enregistrer une carte bancaire ni de te soucier du renouvellement, rester sur DNSHE juste au-dessus est très confortable.

## Relier le domaine à Cloudflare

Les usages du DNS, de Pages et de Tunnel sont détaillés dans [[cloudflare-free-tier-developer-guide|Tutoriel sur l'offre gratuite de Cloudflare]] ; ici, on s'occupe simplement de brancher le domaine.

Une fois ton domaine en main, l'étape suivante consiste à le relier à Cloudflare.

La marche à suivre la plus courante est la suivante :

1. Ajouter le site dans Cloudflare
2. Remplacer les serveurs de noms (NS) du domaine par ceux indiqués par Cloudflare
3. Attendre la propagation DNS
4. Ajouter le domaine personnalisé dans ton projet Cloudflare Pages
5. Ajouter l'enregistrement CNAME selon les indications de Pages, ou laisser Cloudflare le configurer automatiquement

Si tu utilises un sous-domaine gratuit, vérifie d'abord s'il autorise la modification des NS. Si ce n'est pas possible, tu devras ajouter tes enregistrements DNS directement chez le fournisseur d'origine, ou choisir une autre extension compatible avec Cloudflare.

Pas de précipitation ici : la propagation DNS peut prendre un peu de temps. Assure-toi bien d'où doivent pointer le domaine racine et `www` / les sous-domaines, histoire de ne pas oublier ce que tu viens de saisir en cours de route.

## Réserver des sous-domaines pour l'auto-hébergement

Si tu récupères plus tard un serveur étudiant 2C2G, tu peux anticiper le découpage de tes sous-domaines :

```text
vault.example.cc.cd  -> Vaultwarden
notes.example.cc.cd  -> Fast Note Sync
ntfy.example.cc.cd   -> ntfy
status.example.cc.cd -> Gatus
```

Évite d'entasser tous tes services sous le domaine racine.

Un nom de domaine, c'est comme un numéro de rue. Quand les adresses sont bien rangées, déménager, migrer, configurer un reverse proxy ou couper un service devient beaucoup plus agréable.

Pour le détail des services à héberger, tu peux consulter ce récapitulatif :

[[2c2g-server-service-index|Que faire tourner sur un serveur étudiant 2C2G : évitons déjà d'asphyxier la petite machine]]

## Comment choisir entre domaine gratuit et domaine payant

Voici comment je fais la distinction :

Un domaine gratuit convient si tu veux :

- Monter un tout nouveau blog
- Apprendre le DNS
- Rédiger des tutoriels
- Tester Cloudflare Pages
- Tester des services auto-hébergés

Un vrai domaine payant convient si tu veux :

- Tenir un blog sur le long terme
- Créer une adresse mail sérieuse
- Afficher ton adresse sur ton avatar, ta carte de visite ou la description de tes vidéos

Ce n'est pas qu'un domaine gratuit soit au rabais. C'est juste que sur un projet au long cours, le pire ennemi, c'est « la galère de devoir tout migrer plus tard ».

Si tu sais déjà que tu vas écrire sur ce blog pendant longtemps, acheter un nom qui te plaît vraiment vaut largement le coup : sur un projet perso, on a le droit à un petit caprice, et quand on aime le nom de son site, on a tout de suite plus envie de l'entretenir.

# Se rapprocher des communautés de webmasters

Une fois le domaine configuré, tu peux aller faire un tour du côté de quelques communautés de webmasters.

L'idée n'est pas d'aller faire du spam publicitaire, mais de se plonger dans un environnement où des gens écrivent encore des blogs. Le plus grand danger pour un blog indépendant, c'est de finir en journal intime hors ligne : jeter un œil de temps en temps à ce que les autres écrivent, à la façon dont ils décorent leur site et dont ils se lient entre eux redonne énormément de motivation.

## 开往 Travellings

Travellings (开往) est un projet collaboratif de relais de liens :

[https://www.travellings.cn/](https://www.travellings.cn/)

Le principe est tout mignon : tu places un bouton « 开往 » sur ton site, et quand un visiteur clique dessus, il est redirigé au hasard vers un autre blog indépendant participant au projet.

Instructions pour rejoindre le projet :

[https://www.travellings.cn/docs/join.html](https://www.travellings.cn/docs/join.html)

C'est fait pour les blogs qui ont déjà un minimum de contenu.

Ne va pas postuler dès la création avec une page d'accueil vide : écris d'abord quelques articles pour que les visiteurs qui débarquent aient vraiment quelque chose à lire.

## 萌备

Moe ICP (萌备) est un enregistrement symbolique « Moe » inspiré de l'ICP :

[https://icp.gov.moe/](https://icp.gov.moe/)

Page de demande :

[https://icp.gov.moe/join.php](https://icp.gov.moe/join.php)

Ce n'est évidemment pas l'enregistrement officiel du ministère de l'Industrie et des Technologies de l'information, ne t'y trompe pas. C'est plutôt un badge ludique et une porte d'entrée communautaire entre sites persos et blogs d'inspiration ACG.

Le site officiel pose quelques conditions sur le contenu : site non commercial, rien de douteux, pas de coquille vide, HTTPS activé et accessibilité durable.

Si l'ambiance de ton site s'y prête, tu peux demander un numéro Moe ICP et l'afficher dans ton pied de page. Ça n'a aucune utilité vitale, mais ça donne tout de suite un petit cachet de site indépendant.

## 十年之约

Le Pacte de dix ans (十年之约) :

[https://www.foreverblog.cn/](https://www.foreverblog.cn/)

Le principe repose sur une promesse : à compter de ton adhésion, ne pas fermer ton blog pendant au moins dix ans et le garder actif et vivant.

Ça fait un peu mélodramatique dit comme ça, mais j'aime bien l'idée.

En revanche, il faut que le site ait déjà un an d'existence pour pouvoir postuler, donc il faudra patienter un peu. Bien sûr, si ton blog a déjà soufflé sa première bougie, rien ne t'empêche de tenter ta chance haha.

## 揪蝉

Jiuchan (揪蝉) :

[https://hi.jiuchan.org/docs](https://hi.jiuchan.org/docs)

C'est une plateforme de référencement et de visite aléatoire de sites personnels, un peu comme une porte d'entrée « découverte au hasard » dédiée aux sites indépendants.

Si ton blog compte déjà quelques articles présentables, tu peux jeter un œil à sa documentation de référencement. Pour un site récent, l'intérêt de ce genre de plateforme n'est pas d'apporter des tonnes de visites immédiatement, mais d'offrir aux curieux l'occasion de sauter d'un site à l'autre et de tomber sur le tien petit à petit.

# BlogFinder

[BlogFinder - Découvrir d'excellents blogs personnels](https://bf.zzxworld.com/)

## Liste des blogs indépendants sinophones

GitHub : [https://github.com/timqian/chinese-independent-blogs](https://github.com/timqian/chinese-independent-blogs)

Ce dépôt recense des blogs indépendants en chinois. C'est un peu un annuaire maintenu sur le long terme, avec l'adresse du blog, son flux RSS, une courte description et des étiquettes.

Pour qui :

- Avoir un blog stable
- Disposer d'un flux RSS
- Publier principalement ses propres textes
- Accepter d'être indexé publiquement

Aujourd'hui, beaucoup de gens ne s'abonnent plus activement aux blogs et laissent les algorithmes des plateformes trier l'information à leur place. Cette liste conserve au moins une méthode à l'ancienne mais redoutablement efficace : j'aime ce que quelqu'un écrit, alors je m'abonne à son flux.

Si tu veux soumettre ton propre site, commence par préparer ceci :

```text
站名
站点 URL
RSS URL
一句话介绍
主题标签
```


# Autres pistes pour des domaines gratuits

DNSHE n'est pas la seule option. Je note ici quelques autres pistes que j'ai croisées :

[Collection de domaines gratuits enregistrables et compatibles Cloudflare](https://www.nodeloc.com/t/topic/70964?u=amiya_desi)

[https://domain.stackryze.com/](https://domain.stackryze.com/) Petit rappel : on peut enregistrer jusqu'à quatre domaines, mais à l'heure actuelle, seules les extensions .in et .cc peuvent être gérées sur Cloudflare.

Un petit sujet pépite sur NodeLoc qui regroupe pas mal de ressources.

### Les domaines intégrés de GitHub Pages

Si tu n'as pas envie de te casser la tête avec un service de noms de domaine pour le moment, GitHub Pages t'en fournit déjà un par défaut :

```text
你的用户名.github.io
```

Cloudflare Pages aussi :

```text
你的项目名.pages.dev
```

Techniquement, ce ne sont pas « tes » noms de domaine, mais ils suffisent largement pour écrire des articles et présenter tes projets. Tu pourras toujours acheter un vrai domaine quand tu auras mûri ton projet.

## Ajouter un système de commentaires au blog

J'avais promis dans l'article précédent de parler des commentaires : voilà qui est fait.

Un blog peut très bien vivre sans espace commentaires, mais si tu écris des tutoriels, des retours d'expérience ou des récits de galères techniques, recevoir de temps en temps un « ça m'a bien dépanné » ou un « à l'étape 3 j'ai eu un souci différent » favorise les échanges et te fait aussi progresser. Et puis, un formulaire juste sous l'article rend les retours beaucoup plus naturels que d'obliger les gens à envoyer un mail.

Parmi les systèmes de commentaires que j'ai repérés, voici ceux qui collent le mieux à un blog statique personnel :

### Twikoo

[https://twikoo.js.org/](https://twikoo.js.org/)

GitHub : [https://github.com/twikoojs/twikoo](https://github.com/twikoojs/twikoo)

Twikoo est très répandu dans la blogosphère indépendante sinophone. Il gère les commentaires anonymes, les notifications par mail, les émojis et dispose d'une interface d'administration.

Les options de déploiement sont nombreuses : Vercel, Netlify, fonctions cloud ou Docker auto-hébergé. Pour un étudiant, le déploiement gratuit sur Vercel reste la voie la plus simple.

Avantages :

- Écosystème sinophone, documentation accessible
- Coût de déploiement nul possible
- Interface d'administration pour modérer, supprimer et répondre
- Notifications par mail et WeChat

Inconvénients :

- Il faut choisir une base de données (offre gratuite de MongoDB Atlas, Vercel KV ou auto-hébergement)
- Si tu passes par une base gratuite tierce, tes données ne sont pas entièrement chez toi

### Giscus

[https://giscus.app/](https://giscus.app/)

GitHub : [https://github.com/giscus/giscus](https://github.com/giscus/giscus)

Giscus s'appuie sur GitHub Discussions pour stocker les commentaires. Les visiteurs doivent donc se connecter avec leur compte GitHub pour laisser un message.

Avantages :

- Les données sont stockées directement dans ton propre dépôt GitHub
- Aucun serveur ou déploiement supplémentaire à gérer
- Parfait pour un blog technique dont le lectorat a déjà un compte GitHub
- Prise en charge native du Markdown et de la coloration syntaxique

Inconvénients :

- Connexion GitHub obligatoire
- Un lecteur non technicien n'aura pas forcément envie de créer un compte GitHub juste pour commenter
- Les commentaires sont liés à ton dépôt, donc il faut les migrer si tu changes de repo

### Artalk

[https://artalk.js.org/](https://artalk.js.org/)

GitHub : [https://github.com/ArtalkJS/Artalk](https://github.com/ArtalkJS/Artalk)

Artalk est un système de commentaires auto-hébergé qui nécessite de faire tourner un service backend. Si tu as déjà un serveur 2C2G, tu peux le lancer via Docker.

Avantages :

- Contrôle total sur tes données
- Gestion multi-sites intégrée
- Fonctionnalités très complètes : notifications par mail et Telegram, captcha, panneau d'administration

Inconvénients :

- Il faut posséder un serveur
- Un service de plus à maintenir, sauvegarder et mettre à jour
- Sur un serveur 2C2G, il faut garder un œil sur la consommation de mémoire vive

### Ce que je choisirais

Si tu viens de monter ton blog et que tu n'as pas de serveur, je te conseille de commencer par Giscus ou Twikoo (déployé sur Vercel).

Si tu as déjà un serveur et que tes lecteurs ne sont pas tous développeurs, jette un œil à Artalk.

Et si tu n'as pas envie de t'embêter avec les commentaires pour l'instant, aucun souci non plus. Commence par écrire de bons articles, tu auras tout le temps d'ajouter les commentaires quand les lecteurs arriveront. Les commentaires ne sont pas le cœur d'un blog : c'est le contenu qui l'est.

## Où d'autre glisser le lien de ton blog

- Page de liens amis : échanger des liens avec d'autres blogueurs sur des thématiques proches
- Profil GitHub : afficher ton blog sur ta page de profil
- Bio Bilibili / YouTube / Xiaohongshu : accompagner tes tutoriels vidéo du lien vers l'article écrit
- Signature sur des forums comme Linux DO ou V2EX : en respectant les règles de chaque communauté, sans spammer
- README de tes projets open source : ajouter un lien vers ta documentation si le projet est lié à ton blog

En multipliant les portes d'entrée vers ton site, tu augmentes naturellement tes chances de recevoir de la visite.

## Statistiques du blog : savoir si quelqu'un passe par là

Une fois le nom de domaine et les liens communautaires en place, tu vas sûrement commencer à te demander : est-ce que quelqu'un lit vraiment mon blog ?

Quelques solutions légères :

- **Umami** : [https://umami.is/](https://umami.is/), auto-hébergeable ou utilisable via l'offre gratuite officielle. Interface épurée et contrôle total sur tes données
- **Cloudflare Web Analytics** : si tu passes déjà par Cloudflare, son outil d'analyse est gratuit, ne demande aucun script supplémentaire et se consulte directement dans le tableau de bord
- **Plausible** : [https://plausible.io/](https://plausible.io/), principalement payant mais auto-hébergeable
- **Ne rien installer du tout** : ça marche aussi. Un blog personnel n'est pas un site commercial, on peut très bien vivre sans regarder ses statistiques

Pour l'instant, je conseille de commencer avec Cloudflare Web Analytics (puisque tu es probablement déjà sur Cloudflare), et de passer à Umami le jour où tu te sentiras à l'étroit.

Évite de garder les yeux rivés sur les compteurs tous les jours : écrire rapporte toujours plus que regarder des courbes.

## Pour finir

Quand on vient tout juste de monter son blog, inutile de viser la perfection dès le premier jour.

Si le domaine gratuit fait l'affaire, utilise-le ; si Cloudflare résout bien tes DNS, laisse tourner ; inscris-toi tranquillement dans les communautés au fil de l'eau, et tu ajouteras les commentaires plus tard.

Ce qui compte vraiment, c'est de continuer à écrire.

Le nom de domaine, le badge Moe ICP, les liens amis, le bouton Travellings ou l'espace commentaires ne sont que de petits ornements pour donner au blog des airs de « vrai site ». Ce sont tes articles qui le font tenir debout.
