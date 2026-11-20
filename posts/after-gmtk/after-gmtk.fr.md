---
title: Bilan après la GMTK Jam
published: 2026-07-27
created: 2026-07-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: Dans les six dernières heures de la GMTK Jam, j'ai sabré les énigmes impossibles à finir pour rendre un petit jeu vraiment jouable jusqu'au bout
image: ""
tags:
  - Été 2026
  - Game Jam
  - Développement de jeux
  - Rétrospective personnelle
category: Journal personnel
draft: false
lang: fr
translationKey: "posts/after-gmtk/after-gmtk"
alias: ""
---

# C'est fini, mais le cœur n'y est pas
La GMTK est terminée, le lien est ici : [Last Minute Echo by Amiya_desi](https://amiya-desi.itch.io/last-minute-echo). Je ne m'attendais pas à n'en tirer qu'un tout petit jeu au final. Même si c'est au moins un petit jeu complet avec une vraie victoire et une vraie défaite, je n'arrive pas du tout à m'en réjouir.

# État d'esprit en chemin

## Au début
Au départ, en voyant que le thème de la GMTK était *count down*, j'ai trouvé ça plutôt simple et confortable, d'autant plus que j'avais déjà un projet qui collait assez bien à ce thème, [TimeRewindLinker by Amiya_desi](https://amiya-desi.itch.io/time-rewind-linker). Je comptais partir de cette base de retour dans le temps et y greffer des énigmes sous compte à rebours. Mon Dieu, c'était tout bonnement une idée de génie, du calibre à finir dans la sélection « [Merci pour l'encouragement](/essays/thanks-encourage/) » (hum). Avec une idée pareille en tête, la victoire me semblait déjà acquise d'office (joie).

## Le développement au milieu et le pétage de plombs
Comme j'étais super enthousiaste à l'idée de faire le pont avec mon ancien projet, j'ai directement discuté d'une première version avec l'IA et je me suis lancé... et là, ça a été l'enfer devant moi... Les modifs de l'IA sonnaient toujours faux, et moi, à force d'abuser du « fauteuil roulant » de l'IA, j'avais même la flemme de monter une simple greybox de niveau à la main. Je me contentais de tirer au sort avec l'IA pour tout générer d'un coup, du squelette à la chair — complètement ramolli du cerveau par l'assistanat, exactement comme Regulus QAQ
![[Pasted image 20260727222142.png|width=640|align=center]]
Qui aurait cru qu'à six heures de la fin, quand j'ai enfin trouvé le courage de regarder la scène que l'IA m'avait bricolée, je frôlerais l'AVC à ce point. Je me souviens encore d'un détail en particulier :
`谁能想到这个人机做一个陷阱方块，不单独用一个场景做陷阱预制体，然后再在主场景实例化放置，而是选择神秘的一个陷阱tile放陷阱贴图，然后一个陷阱Node2d下面放一堆area2d放在这些尖刺边上，我去你这让我怎么改，要是我一开始就一个场景内聚好了只需要摆放就行了，这TM全是零散拆开的，我还得一个一个挪，那我挪个蛋啊我靠！`

## La décision finale et le sprint
Du coup, quand la raison m'est enfin revenue sur la fin, entre rendre un tout petit jeu complet et un truc d'apparence ambitieux mais même pas jouable, j'ai tranché sans hésiter pour la première option. J'ai sabré toutes les énigmes pour revenir à un objectif unique : fuir un poursuivant. Une fois le cap fixé, il ne restait plus qu'à demander à l'IA de coder l'algorithme du poursuivant ainsi que quelques scènes et conditions de victoire ou de défaite, pendant que je me chargeais de sauver la carte des eaux. Finalement, dans les 10 dernières minutes, j'ai terminé et envoyé le jeu. Au moins, c'est bouclé... Même si l'IA du poursuivant reste assez bête, et que pour éviter que ce soit trop facile j'ai dû lui bricoler une petite téléportation — ce qui a évidemment créé d'autres soucis, mais bon, il n'y avait plus le temps.

# Bilan d'après-jam
À force de rouler en fauteuil roulant, je me suis fait envoyer dans le décor par tonton GMTK. Heureusement qu'à la toute fin j'ai fini par maîtriser le Sort Inversé, histoire de survivre de justesse et de rendre ma copie...
Bon sang, je ne suis pas censé être le plus fort, moi ?! Pour devenir le plus fort, il me reste visiblement encore un sacré bout de chemin à parcourir... GMTK, je crois que je ne t'oublierai jamais de toute ma vie...

En fait, j'avais déjà pas mal fait le point dans mon journal intime du 2026-07-26 ; ce texte, c'est grosso modo le cheminement que j'ai couché par écrit sous le coup de l'inspiration, pile au moment où j'ai changé de cap.

Pour finir, les enfants, n'abusez surtout pas du fauteuil roulant à l'avenir : gardez votre esprit critique. Ne répondez pas ! Ne répondez pas ! Ne répondez pas !
{{黑幕:Mais vos commentaires sont tout à fait les bienvenus (*^_^*)}}

## Pour aller plus loin

Si vous voulez voir comment j'étais reparti de zéro avant ça, vous pouvez retourner lire [[re0：game-dev-life|Ma vie de dev de jeux repartie de zéro]], et mes petits projets suivants se trouvent dans [[subarutap-and-selfthink|Journal de développement de SubaruTap]].

La leçon que j'ai prise ici sur le dérapage du périmètre et la dépendance à l'IA a fait écho à pas mal de choses quand j'ai lu [[weakly-articles-02|Own the Slice]] plus tard ; mis côte à côte, ça donne assez matière à réfléchir.
