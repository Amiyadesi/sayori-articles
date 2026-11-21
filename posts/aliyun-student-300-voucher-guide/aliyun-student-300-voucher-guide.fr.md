---
title: "Que peut-on acheter avec le bon étudiant Alibaba Cloud de 300 yuans : un guide pour ne pas le gâcher"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: "Tour d'horizon des façons les plus utiles de dépenser le bon étudiant Alibaba Cloud de 300 yuans : ECS, serveur d'applications léger, Wuying Lingdou, API de grands modèles Bailian, et les pièges à vérifier avant de valider la commande"
image: ""
tags:
  - Tutoriel pratique
  - Avantages étudiants officiels
  - Alibaba Cloud
  - VPS et auto-hébergement
category: "Tutoriels et guides"
draft: false
lang: fr
translationKey: "posts/aliyun-student-300-voucher-guide/aliyun-student-300-voucher-guide"
alias: ""
---

> [!NOTE]
> Cet article rassemble les méthodes testées et approuvées en juin 2026. Le périmètre d'utilisation des bons Alibaba Cloud évolue régulièrement et seule la page de paiement fait foi : ne prenez donc pas ce guide pour parole d'évangile éternelle. Si vous consultez cet article plus tard, vérifiez d'abord sur la page de règlement que la réduction s'applique bien avant de commander.

Comme chacun sait, le programme Cloud Talent (云工开物) d'Alibaba Cloud offre un bon de réduction exclusif de 300 yuans aux étudiants inscrits dans un établissement d'enseignement supérieur en Chine ayant validé leur statut étudiant.

Les règles officielles sont très claires : tant que votre certification étudiante est valide, vous pouvez réclamer un bon tous les 12 mois, et les comptes associés d'un même utilisateur ne peuvent pas en réclamer en double ; chaque bon est valable 1 an, le solde non utilisé à l'expiration est perdu et ne se cumule pas automatiquement avec le bon suivant. L'utilisation est limitée aux produits cloud publics désignés sur le site chinois d'Alibaba Cloud ; sauf mention contraire, le bon n'est pas cumulable avec les remises produits ou d'autres coupons, et seule la page de paiement détermine s'il est applicable.

De plus, le périmètre d'éligibilité de ce bon est ajusté de façon dynamique : une configuration déductible l'an dernier ne l'est pas forcément cette année. Avant de réclamer le bon, mieux vaut réfléchir au projet que vous comptez réellement faire tourner au cours de l'année à venir.

L'accès est ici : [Lien pour réclamer les avantages étudiants](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)

## Comment le récupérer

La procédure est très rapide :

1. Préparer un compte Alibaba Cloud (site chinois) ayant passé la vérification d'identité réelle
2. Ouvrir la page étudiante du programme Cloud Talent d'Alibaba Cloud
3. Valider son statut étudiant via CHSI (学信网) ou une adresse e-mail universitaire
4. Réclamer le bon sans minimum d'achat de 300 yuans dans l'espace avantages étudiants

Une fois la vérification validée, le bon apparaît dans votre liste de coupons. Il est valable un an à compter du jour de sa récupération.

Si vous n'avez pas encore de compte Alibaba Cloud, profitez-en pour en créer un : même si vous n'utilisez pas de serveur par la suite, vous pourrez toujours utiliser le bon pour payer les API de grands modèles sur Alibaba Cloud Bailian.


# À quoi peut-il servir

## Option 1 : un ECS en Chine continentale à l'année

L'usage le plus courant sur les forums consiste à prendre une instance ECS 2C2G en Chine continentale pour un an. Comme le bon est renouvelable chaque année, vous pouvez pratiquement en profiter pendant toute la durée de vos études.

Discussion de référence :

[https://linux.do/t/topic/2258128](https://linux.do/t/topic/2258128?u=amiya_desi)

L'idée générale est la suivante :

1. Aller sur la page d'achat personnalisé ECS
2. Choisir une instance de type `e` autour de 2C2G
3. Sélectionner une région en Chine continentale en évitant celles qui bénéficient déjà d'une promotion spéciale, car le bon étudiant n'est généralement pas cumulable avec les offres promotionnelles
4. Choisir la facturation du trafic à l'usage via CDT
5. Vérifier sur la page de règlement que le bon s'applique bien

Page d'achat personnalisé ECS :

[https://ecs-buy.aliyun.com/ecs/#/custom/](https://ecs-buy.aliyun.com/ecs/#/custom/)

Configuration clé validée par les membres du forum :

```text
实例规格：ecs.e-c1m1.large（2C2G）
付费模式：包年包月，一年
流量计费方式：CDT 按量计费
```

Si tout est bien sélectionné, la page de règlement devrait afficher moins de 300 yuans, intégralement couverts par le bon, sans avoir à sortir un centime de votre poche.

Si le bon refuse de s'appliquer chez vous, essayez une autre région. Sur les forums, ça passe à Qingdao pour certains et en Chine du Sud pour d'autres : les règles changent selon les périodes. L'essentiel est de regarder la page de paiement, pas de deviner.

Une fois le CDT activé, vous disposez d'environ 20 Go de trafic gratuit par mois. C'est largement suffisant pour héberger un blog, un bot ou une petite API, mais évitez d'en faire un site de téléchargement à fort trafic, un hébergeur d'images externe ou un serveur de diffusion vidéo.

La toute première chose à faire après l'achat n'est pas d'installer un panneau de gestion, mais de configurer une alerte de dépenses. La facturation CDT à l'usage signifie que tout dépassement du quota gratuit sera facturé. Fixez un seuil d'alerte, même à 1 yuan, pour repérer immédiatement une attaque ou une erreur de configuration.

## Option 2 : le serveur d'applications léger (Simple Application Server)

Si vous n'avez pas envie de vous plonger dans les méandres des ECS, groupes de sécurité, IP publiques élastiques et CDT, le serveur d'applications léger ressemble davantage à un « petit VPS déjà tout prêt ».

Faites défiler la page des offres étudiantes ou cherchez directement « 轻量应用服务器 » sur la page :

[https://university.aliyun.com/buycenter/](https://university.aliyun.com/buycenter/)

Voici les pistes repérées jusqu'ici :

**A. Prendre directement un serveur léger 2C2G gratuit pendant 6 mois**

Des membres du forum ont confirmé qu'on peut obtenir gratuitement un serveur léger 2C2G avec une bande passante de 200 Mbit/s pendant six mois. L'avantage, c'est que le trafic est illimité puisque la bande passante est fixe : aucun risque de dépasser un quota CDT. L'inconvénient, c'est que ça ne dure que six mois.

**B. Vente flash à 38 yuans sur Cloud Station + renouvellement avec le bon**

Attrapez d'abord lors d'une vente flash sur Cloud Station un serveur d'applications léger à 38 yuans pour un an :

[https://www.aliyun.com/minisite/goods](https://www.aliyun.com/minisite/goods)

Il paraît qu'il n'est pas trop difficile à décrocher. Une fois obtenu, utilisez le bon de 300 yuans pour le renouveler de six mois. Au total, ça fait un an et demi pour 38 yuans.

Deux points de vigilance avec cette méthode :

- Les tarifs promotionnels et le bon étudiant ne sont pas toujours cumulables. Seul l'affichage réel au moment du paiement fait foi.
- Si le bon ne passe pas au moment du renouvellement, vos 38 yuans ne vous auront payé qu'un an, et non un an et demi.

**C. Passer d'un ECS d'essai à une offre payante**

C'est la voie que j'ai choisie personnellement. Alibaba Cloud propose un portail d'essai gratuit :

[https://free.aliyun.com](https://free.aliyun.com)

Il permet de tester un ECS 2C2G pendant trois mois. Avant ou après l'expiration de l'essai, vous utilisez le bon de 300 yuans pour basculer sur un abonnement annuel, ce qui permet de tenir environ un an et trois mois, voire un peu plus.

À titre personnel, je préfère conseiller le serveur léger aux débutants pour se faire la main. Non pas parce qu'il est plus sophistiqué, mais parce qu'il propose moins d'options et limite les risques de s'y perdre.

## Option 3 : le serveur léger hors Chine continentale

Hors de Chine continentale, c'est un peu plus aléatoire.

D'après les retours sur les forums, les ECS hors Chine continentale n'acceptent quasiment pas le bon, mais certains serveurs d'applications légers, dans certaines régions et configurations, peuvent passer. Quelqu'un a par exemple mentionné un modèle polyvalent 2C2G sur 6 mois, ou un 2C0.5G sur un an à 336 yuans au total, ne laissant que 36 yuans à compléter après déduction du bon ; d'autres préfèrent renouveler au mois.

Je déconseille ici de figer une liste de régions précises.

Hong Kong, Singapour, Japon, États-Unis, Allemagne, Royaume-Uni, Asie du Sud-Est : dans toutes ces zones, les règles du bon peuvent fonctionner aujourd'hui et ne plus marcher demain. Si vous voulez vraiment une machine à l'étranger, mettez la configuration dans votre panier et regardez la page de paiement.

Si c'est juste pour héberger un blog, Cloudflare Pages fait déjà très bien l'affaire.

## Option 4 : le PC cloud Wuying et les Lingdou

La page des avantages étudiants d'Alibaba Cloud affiche désormais aussi des accès liés à Wuying.

Cette option s'adresse à deux profils :

- Ceux qui veulent tester un PC cloud pour faire tourner ponctuellement des logiciels ou des jeux
- Ceux qui ont besoin de louer temporairement de la puissance GPU sans acheter de carte graphique

Sur les forums, certains ont détaillé les possibilités des Wuying Lingdou et de la plateforme Wuying Linggou, par exemple pour lancer un environnement GPU RTX 5880 avec 48 Go de VRAM grâce aux Lingdou :

[https://linux.do/t/topic/2219866/60](https://linux.do/t/topic/2219866/60)

Ce genre de discussion sert surtout de piste. Avant de payer quoi que ce soit, retournez sur la page de règlement d'Alibaba Cloud pour vérifier les Lingdou, la région et la durée.

L'avantage de cette approche, c'est que c'est grisant ; l'inconvénient, c'est que ça revient à brûler des crédits à la consommation. Si vous voulez simplement faire tourner un service en continu, un serveur classique reste bien meilleur. En revanche, si vous faites de la recherche, entraînez des modèles ou avez besoin de VRAM ponctuellement, ça vaut le coup d'œil.

## Option 5 : Bailian et les API de grands modèles

Si vous avez déjà un serveur, ou que les serveurs cloud ne vous intéressent pas, dépenser les 300 yuans pour tester des API de grands modèles est tout à fait envisageable.

La page des avantages étudiants donne accès aux services de grands modèles, au développement d'applications IA et à Alibaba Cloud Bailian. Sur Cloud Station, on trouve aussi des offres autour de Bailian, Token Plan ou HappyHorse :

[https://www.aliyun.com/minisite/goods](https://www.aliyun.com/minisite/goods)

Pour que le bon s'applique, privilégiez les modèles fournis directement par Alibaba Cloud et facturés à l'usage dans la console officielle. Les relais tiers, articles de la place de marché ou packs promotionnels spéciaux risquent de ne pas être couverts par ce bon.

Vous pouvez par exemple tester :

- La gamme Tongyi Qianwen (Qwen)
- Les API liées à DeepSeek
- Les modèles officiels disponibles sur la plateforme comme GLM ou Kimi
- Des modèles vidéo comme HappyHorse, à condition de vérifier que la réduction s'affiche au paiement

Le point clé est de choisir les « modèles fournis directement par la plateforme » lors des appels. Dans la console Bailian, certains modèles portent la mention « tiers » ou « marketplace » et ne sont pas forcément payables avec ce bon.

Combien d'appels peut-on faire avec 300 yuans ? Tout dépend du modèle choisi et de la longueur des entrées. Avec des modèles économiques comme Tongyi Qianwen Turbo, 300 yuans permettent un nombre considérable d'appels. Avec les grands modèles haut de gamme, la facture grimpe beaucoup plus vite. Commencez par un modèle bon marché pour valider votre pipeline avant de monter en gamme.

C'est bien plus pertinent que d'acheter un serveur qui prendra la poussière si votre seul but est de tester des API.

## Option 6 : décrocher gratuitement la certification ACA Ingénieur Grands Modèles

Alibaba Cloud propose aussi une astuce maline : utiliser directement le bon de 300 yuans pour régler les frais de la certification ACA Ingénieur Grands Modèles.

Facturée normalement 600 yuans, cette certification passe exactement à 300 yuans avec le tarif étudiant, soit 0 yuan après déduction du bon.

Discussion de référence :

[https://linux.do/t/topic/2456810](https://linux.do/t/topic/2456810)

La marche à suivre en bref :

1. Valider votre statut étudiant et récupérer le bon de 300 yuans
2. Descendre sur la page des avantages étudiants jusqu'à la rubrique « 大模型认证 » (Certification grands modèles)
3. Cliquer sur « 立即购买 » (Acheter maintenant) et appliquer le bon

Il s'agit d'une certification professionnelle officielle d'Alibaba Cloud destinée aux débutants. Sa valeur sur le marché reste modeste, mais pour un étudiant, obtenir un certificat à 0 yuan tout en révisant les bases des grands modèles ne coûte rien et ne fait pas de mal.

**Pour qui :**

- Ceux qui veulent étoffer la rubrique certifications de leur CV
- Ceux qui souhaitent apprendre méthodiquement les concepts fondamentaux des grands modèles
- Ceux qui ont déjà un serveur ou ne s'y intéressent pas

**Pas pour qui :**

- Ceux qui font déjà de l'ingénierie autour des grands modèles et trouveront ce niveau d'entrée trop basique
- Ceux qui préfèrent garder leur bon pour un serveur ou les API Bailian

Si votre bon approche de sa date d'expiration et que vous n'avez besoin ni de serveur ni d'API dans l'immédiat, l'échanger contre cette certification reste un bon plan.

## Ce que je choisirais

Si vous débutez dans le cloud, voilà l'ordre que je suivrais :

1. Récupérer le bon d'abord
2. Regarder si un ECS ou un serveur léger en 2C2G est éligible au bon
3. Si vous pouvez obtenir un serveur à 0 yuan ou avec un faible complément, prendre le serveur en priorité
4. Dès réception du serveur, configurer immédiatement SSH, le groupe de sécurité et les alertes de dépenses
5. Faire ensuite tourner dessus de petits services comme Vaultwarden, ntfy, Gatus, un bot ou la synchronisation de notes

Si vous possédez déjà un VPS, n'allez pas acheter une machine supplémentaire qui dormira dans un coin juste pour dépenser le bon. Mettez-le plutôt dans les API Bailian ou les Wuying Lingdou : vous aurez bien plus l'impression d'en avoir pour votre argent.

## Vérifications avant de commander

Ne vous précipitez pas pour payer, contrôlez d'abord ces quelques points :

- La déduction du bon de 300 yuans apparaît-elle bien sur la page de paiement ?
- La commande est-elle en forfait mensuel/annuel ou facturée à l'usage ?
- Le renouvellement automatique est-il activé à l'échéance ?
- Comment sont facturés le trafic, la bande passante et l'IP publique ?
- Y a-t-il un risque lié aux règles ouvertes par défaut dans le groupe de sécurité ?
- Peut-on configurer des alertes de dépenses et de seuil de consommation ?
- En cas de remboursement, le bon peut-il être réutilisé sur la même catégorie de produits ?

Faites particulièrement attention au dernier point. Les règles officielles précisent qu'en cas de remboursement d'une commande payée avec le bon, celui-ci est restitué mais ne peut plus être utilisé une seconde fois sur la catégorie de produits concernée. Évitez donc de passer des commandes tests à l'aveugle.

## Que lire ensuite

Si vous avez finalement opté comme moi pour un serveur 2C2G, vous pouvez poursuivre avec ces articles :

- [[sayori-server-01-vps-start|SSH et configuration de base de son premier serveur]]
- [[docker-compose-minimum-start|Introduction à Docker et Compose]]
- [[2c2g-server-service-index|Liste de services pour petit serveur]]
- [[selfhost-ntfy-on-2c2g|Envoyer des notifications sur son téléphone avec ntfy]]
- [[selfhost-vaultwarden-on-2c2g|Héberger Vaultwarden sur un serveur étudiant 2C2G]]
- [[fast-note-sync-on-student-server|Bidouiller Fast Note Sync sur un serveur étudiant]]

La meilleure façon d'utiliser ce bon n'est pas de « gratter un truc gratuit et partir », mais de s'en servir comme terrain d'entraînement à moindre coût.

Serveur, nom de domaine, Cloudflare, Docker, sauvegardes, monitoring : au début, tout cela semble très éparpillé. Mais le jour où vous faites vraiment tourner un petit service, que vous le reliez à un nom de domaine et que vous mettez en place une première sauvegarde, vous verrez que toutes les pièces s'emboîtent.

## Pour aller plus loin

Dans la même série, les [[azure-students-100-credit-guide|crédits étudiants Azure]] permettent de lancer un serveur au Japon, et vous retrouverez d'autres outils de développement et avantages IA dans le [[edumails-glados-student-benefits|récapitulatif des avantages étudiants]] ; pour configurer un nom de domaine et le HTTPS sur vos services, rendez-vous sur l'article consacré à l'[[cloudflare-free-tier-developer-guide|offre gratuite de Cloudflare]].
