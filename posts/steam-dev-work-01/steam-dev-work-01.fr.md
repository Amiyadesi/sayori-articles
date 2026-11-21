---
title: Guide d'inscription développeur Steam en Chine continentale pour éviter les galères
published: 2026-09-10
created: 2026-09-10
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 2
description: Tout le processus d'inscription développeur Steam en Chine et les points d'attention, cet article suffit !
lang: fr
translationKey: "posts/steam-dev-work-01/steam-dev-work-01"
tags:
  - 实操教程
  - 避坑指南
  - 游戏开发
  - Steam
category: "Tutoriels et guides"
draft: false
alias: ""
image: ""
---
# Guide d'inscription développeur Steam en Chine : du formulaire fiscal aux options de paiement, mon retour d'expérience réel

Beaucoup de devs indé veulent mettre leur jeu sur Steam, mais coincent dès la première étape « s'inscrire comme développeur » : il faut remplir un tas de trucs et bricoler à droite à gauche, alors on se dit qu'on verra ça plus tard.

Si tu veux gérer ton jeu toi-même, il vaut en réalité mieux s'en occuper le plus tôt possible, parce qu'après l'inscription il faut encore monter la page boutique, régler la classification du jeu, créer le compte et l'organisation développeur, créer le projet de jeu, etc.

Bien sûr, si tu comptes passer par un éditeur, tu n'as peut-être pas besoin de t'inscrire, même si tu perds en contrepartie pas mal de contrôle sur ton projet ; tu peux aussi t'inscrire comme développeur, et quand tu chercheras un éditeur tu auras déjà ton propre compte développeur, ce qui te permettra d'ajuster un minimum ton projet.

En soi le processus n'est pas bien compliqué, mais il y a pas mal d'asymétrie d'info, et au moindre faux pas on te renvoie tout dans les dents.

Aujourd'hui, à partir de mon propre passage à la caisse, je partage la checklist de départ, le formulaire fiscal, les mystères de la validation et les solutions pour encaisser l'argent.

## 1. Checklist de départ : 100 dollars + carte d'identité + compte Steam

Avant de t'inscrire, il te faut ces trois trucs :

1. 100 dollars : c'est les frais d'inscription à Steam Direct. Attention, ces 100 dollars ne sont pas remboursables, mais dès que le chiffre d'affaires total de ton jeu atteint 1 000 dollars, Valve te les rend (attention : c'est par application ; si le premier jeu rapporte 500 dollars et le deuxième 1 500 dollars, seuls les 100 dollars du deuxième seront remboursés).
2. Carte d'identité : pour la vérification d'identité et le formulaire fiscal.
3. Compte Steam classique : utilise simplement le compte avec lequel tu achètes tes jeux d'habitude, pas besoin d'en créer un nouveau exprès.

## 2. Déroulement de l'inscription et pièges de l'identité

Le portail est sur [https://partner.steamgames.com](https://partner.steamgames.com), connecte-toi avec ton compte Steam classique et clique sur « S'inscrire en tant que développeur ».

· Utilise impérativement le pinyin pour l'identité : pour le nom, mieux vaut mettre directement le pinyin (ex. : San Zhang) et surtout pas de caractères chinois. Ensuite, pour lier une carte ou encaisser (que ce soit une carte US, WorldFirst ou une autre banque étrangère), les systèmes bancaires demandent le nom en pinyin ; garder la cohérence évite de bloquer la vérif.

· Adresse : mets l'adresse de ta carte d'identité en anglais ou en pinyin, je conseille de la faire traduire par une IA plutôt que d'improviser, histoire que l'adresse soit exacte.

## 3. Formulaire fiscal : comment faire passer la retenue à la source de 30 % à 10 %

C'est l'étape la plus rentable pour économiser des sous. En remplissant les infos fiscales (formulaire W-8BEN), fais bien gaffe à :

1. Statut fiscal : coche bien non-résident fiscal américain.
2. TIN étranger (numéro d'identification fiscale) : coche bien que tu as un TIN étranger. Pour un dev particulier en Chine, ton TIN c'est ton numéro de carte d'identité à 18 chiffres, tu le mets direct sans rien demander en plus.
3. Convention fiscale : coche l'avantage de la convention fiscale Chine–États-Unis.
   
Avec ces étapes, la retenue à la source de Steam sur tes revenus passe direct de 30 % par défaut à 10 %.

### Mes infos fiscales ont été recalées plusieurs fois

Ça a l'air limpide écrit comme ça, mais à l'époque je me suis fait achever. Regarde ce mail « Vos informations fiscales sont invalides » que j'ai reçu, tu verras le niveau de désespoir.

![[Screenshot_20260911_090317_com.tencent.androidqqmail.jpg|width=460|align=center|caption=Steamworks 发来的“税务信息无效”通知]]

La validation fiscale de Steam est sous-traitée à des boîtes tierces (Lilaham / TaxIdentity), et parfois elles ne te disent même pas où est l'erreur exacte. Quand ça a été recalé chez moi, je ne savais pas ce qui clochait, alors j'ai juste renvoyé en boucle, encore et encore.

Donc si tu reçois toi aussi un mail « informations fiscales invalides », pas de panique, ce n'est pas forcément que tu as mal rempli.

Tant que tu vérifies que les 4 points clés ci-dessus (non-résident fiscal US, carte d'identité en TIN étranger, convention fiscale cochée, adresse alignée avec la carte d'identité) sont bons, renvoie plusieurs fois, ça finit souvent par passer.

## 4. Vérification d'identité

Beaucoup de tutos sur le net disent qu'il faut fournir une facture d'eau ou d'électricité avec adresse, mais en vrai pas forcément.

Moi je n'avais pas de facture avec adresse sous la main, alors je suis juste allé au guichet de l'ICBC retirer 100 yuans et j'ai demandé au guichetier de m'imprimer un reçu de retrait avec le tampon officiel de la banque (voir image ci-dessous).

![[IMG_20260504_124358_edit_5024691644024.jpg|width=460|align=center|caption=工商银行柜台打印并盖章的取款回单]]

Sur ce papier il n'y avait que mon nom, mon numéro de carte et l'historique de transaction, pas d'adresse, mais envoyé avec ma carte d'identité, même après quelques refus, ça a fini par passer.

Étapes :

1. Va retirer 100 yuans au guichet de la banque.
2. Vérifie que le reçu porte ton nom, ton numéro de carte, l'historique de transaction et le tampon officiel de la banque (le point clé).
3. La date doit être récente, imprimé au guichet et tamponné de préférence.
4. Si la vérif est refusée, ne change pas de justificatif à la va-vite, réessaie quelques jours plus tard.

## 5. Comparatif des solutions de paiement : du top au flop, et un point de conformité

Pour un développeur en Chine continentale, rapatrier l'argent est un vrai casse-tête. Selon l'expérience réelle et le coût de conformité, voici le classement du top au flop :

| Méthode | Frais / coût | Vitesse de réception | Exigences de conformité | Pour qui |
| :--- | :--- | :--- | :--- | :--- |
| **Compte bancaire américain** | Au plus bas (ACH local) | Rapide | Gérer soi-même fiscalité et change | Ceux qui ont une carte US |
| **Plateforme tierce (WorldFirst)** | Retrait plafonné à 0,7 % | RMB crédités en quelques secondes | Envoyer régulièrement le détail des transactions | La grande majorité des devs indé |
| **Visa / MC banque étrangère (virement direct)** | Par SWIFT, banque intermédiaire prend 15–30 USD / virement | Lent, risque de retour de fonds | La banque peut demander un justificatif papier | Revenus stables, à l'aise avec la manip manuelle |
| **UnionPay avec virement international activé** | Frais élevés | Le plus lent | Souvent un justificatif papier exigé | Déconseillé |

Parlons franchement des « galères » et des avantages de WorldFirst :

· Ce que tu dois faire : après inscription, il faut régulièrement (en général tous les mois) mettre en ligne dans le tableau de bord WorldFirst tes relevés de versement Steam ou le détail des transactions pour obtenir le quota de conversion de devises. C'est effectivement une étape en plus par rapport à « juste mettre un numéro de carte et ne plus rien toucher ».

· Ce que ça règle pour toi : si tu ne passes pas par une plateforme tierce et que tu reçois directement un virement SWIFT sur une banque locale, non seulement la banque intermédiaire te prélève 15 à 30 dollars à chaque fois, mais la banque peut aussi rejeter le virement faute de reconnaître la nature du paiement de Valve, ce qui génère des frais dans les deux sens. Ce « dépôt du détail des transactions » sur WorldFirst fait en réalité la déclaration de conformité des changes à ta place, te permet de convertir tes dollars en yuans sans accroc et ne consomme pas ton quota annuel de conversion de devises de 50 000 dollars par personne.

· Comment choisir : si tes revenus mensuels sont faibles (genre cent ou deux cents dollars) ou que tu détestes la paperasse, passer en virement direct et assumer les frais et le risque de rejet est aussi une option. Mais si tes revenus augmentent ou que tu veux t'éviter de discuter en boucle avec ta banque pour expliquer « c'est quoi cet argent », WorldFirst reste le choix le plus économique au global et le moins prise de tête.

Si tu décides d'utiliser WorldFirst, tu peux passer par mon lien de parrainage pour créer un compte développeur :
👉 [Lien d'inscription WorldFirst（万里汇）](https://s.worldfirst.com.cn/3M7iMD?default_source=WF-Vk00000xX1cr&referral_id=WF-Vk00000xX1cr)

## 6. Conclusion

S'inscrire comme développeur Steam, au fond, c'est un exercice de patience et de minutie ; la compta et la fiscalité ont l'air rébarbatives, mais une fois que tu as les clés (« identité en pinyin, carte d'identité en TIN, baisse de taxe à 10 % ») et un reçu bancaire tamponné avec lequel tu tiens bon, tu passes le cap.

Je vous souhaite à tous que vos jeux cartonnent et que vous encaissiez les dollars tranquillement !

# Au prochain épisode

Page boutique, ID d'appli, exigences de classification, compte développeur et communauté ? Quand j'en serai à monter tout ça, je ferai un autre article haha.

## À lire ensuite

Si tu fais ton jeu avec Godot, tu peux croiser ça avec GodotSteam dans [[godot-useful-plugins|Liste des extensions courantes]], et mes galères en dev sont dans [[after-gmtk|Bilan GMTK Jam]].

Ce que ça fait de mener un petit projet jusqu'à la sortie, j'en ai aussi glissé un mot dans [[subarutap-and-selfthink|Réflexions sur le développement et la création de SubaruTap]].
