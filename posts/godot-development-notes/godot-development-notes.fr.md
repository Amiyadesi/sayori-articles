---
title: Astuces et habitudes personnelles sur Godot
published: 2026-11-06
created: 2026-10-19
updated: 2026-11-06
lastEdited: 2026-11-06
updateCount: 0
description: Des références de nœuds, UID et thèmes aux annotations de type, à l'organisation des dossiers et au partage de ressources — quelques petites habitudes pour rendre un projet Godot plus facile à modifier
lang: fr
translationKey: "posts/godot-development-notes/godot-development-notes"
image: ""
tags:
  - Godot
  - Développement de jeux
  - Tutoriel pratique
category: "Tutoriels et guides"
draft: false
alias: ""
---
# Pourquoi cet article

J'avais déjà compilé un billet sur [[godot-useful-plugins|des plugins Godot bien utiles]] ; cette fois, j'ai envie de parler de choses plus basiques, à savoir mes habitudes de développement au quotidien dans Godot.

En fait, je suis tombé aujourd'hui sur un post intitulé [Partage d'expérience de développement Godot](https://pd.qq.com/s/72backvjc) sur [GodotHub](https://godothub.com/zh). Il y a pas mal de trucs que j'applique déjà, mais aussi quelques points où je fais différemment.

Après tout, le webmaster de ce blog a commencé par le développement de jeux vidéo — avoir si peu d'articles sur le sujet ici finit par être un peu gênant (bon, j'exagère à peine).

Du coup, je pose ici mes propres habitudes sur Godot.
## % pour l'accès en tant que nom unique
![[Pasted image 20261019195911.png]]

Quand tu références un nœud dans un script Godot en le faisant glisser avec Ctrl ou Alt pour obtenir `@onready` ou `@export`, c'est super pratique sur le coup, mais :

```gdscript
@onready var start_button: Button = $Panel/MarginContainer/VBoxContainer/StartButton
```

Dès que tu retouches l'UI plus tard et que tu ajoutes un conteneur intermédiaire, tout le chemin est à refaire.

Les [noms uniques de scène](https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html) de Godot tombent à pic ici. Fais un clic droit sur le nœud dans l'arborescence et active « Accéder en tant que nom unique » : une icône `%` apparaît à côté du nœud, et dans le script tu peux abréger ça en :

```gdscript
@onready var start_button: Button = %StartButton
```

Tant que tu restes dans la même scène propriétaire et que tu ne renommes pas le nœud, réorganiser la hiérarchie intermédiaire ne casse plus cette référence. En plus, le petit symbole dans l'arbre de scène sert de pense-bête pour te rappeler qu'un script s'appuie probablement dessus.

Ce côté « unique » s'entend à l'échelle d'une scène et dépend de l'`owner` du nœud. Par exemple, si une scène d'arme est instanciée dans la scène du joueur, le script du joueur ne peut pas aller chercher directement la lame à l'intérieur de l'arme avec `%Blade`. Je garde donc ce genre de référence cloisonné dans chaque scène respective.

## Références de ressources, préchargement et constantes

En général, j'utilise le préchargement au sein d'une même scène, par exemple pour un arbre de machine à états déjà configuré.

Les références exportées me servent plutôt d'une scène à l'autre.

Quant aux ressources en constantes, ce sont des éléments qu'on modifie rarement et qui ne se prêtent pas bien aux références classiques — typiquement les classes de données d'un système de sauvegarde. C'est une ressource abstraite dont un script global a besoin, et la logique du jeu en dépend forcément, donc ça ne bouge pas.

Par exemple, pour choisir la scène cible d'un portail de téléportation, j'exporte une propriété, puisque cette scène sera forcément réutilisée dans plusieurs niveaux tout en menant à des destinations différentes :

```gdscript
extends Area2D

@export var destination_scene: PackedScene
```

Ensuite, il suffit de glisser la scène voulue dans l'Inspecteur. Une même scène de portail placée dans différents niveaux peut ainsi avoir sa propre destination, et c'est très visuel à modifier.

Quand j'ai vraiment besoin de charger une ressource en dur dans un script, je fais un clic droit dessus dans le panneau Système de fichiers de Godot pour copier son UID, et je colle la chaîne `uid://...` obtenue dans `preload()`. Si je déplace le fichier plus tard, la référence ne dépend plus de l'ancien chemin.

L'UID gère l'identité d'une ressource, tandis que `%StartButton` gère la référence d'un nœud dans une scène : ce sont deux problèmes bien distincts.

## Theme

![[Pasted image 20261019201052.png]]

Je conseille plutôt de créer d'abord une ressource `Theme`, d'y mettre les styles communs des boutons, labels et panneaux, puis de l'assigner au nœud racine `Control` de l'interface. Tous les contrôles enfants en héritent, et le jour où tu veux changer de police ou retoucher le style des boutons, tout est centralisé au même endroit.

Un même type de bouton peut aussi avoir plusieurs rôles — bouton standard, bouton de confirmation, bouton de suppression. C'est là que les [variantes de type de thème](https://docs.godotengine.org/en/stable/tutorials/ui/gui_theme_type_variations.html) deviennent utiles :

1. Dans l'éditeur de thème, clique sur le « + » à côté de la liste des types pour en créer un nouveau, par exemple `DangerButton`.
2. Passe sur l'onglet avec l'icône d'outil et définis son type de base sur `Button`.
3. Modifie les couleurs et le style de cette variante, puis renseigne `DangerButton` dans le champ `Theme Type Variation` du bouton concerné.

De cette façon, la police et les marges communes continuent de suivre `Button`, et le bouton de suppression ne gère que ce qui le différencie. Si la variante n'apparaît pas dans le menu déroulant, tu peux aussi saisir son nom directement.

Bien sûr, si un contrôle isolé a un besoin très particulier, une surcharge locale fait très bien l'affaire. Mais dès qu'un style se répète, le mettre dans le thème rend la maintenance beaucoup plus agréable.

## Typage et commentaires de documentation : autant les écrire au fil de l'eau

GDScript n'impose pas de typer son code, mais indiquer ce que contient une variable, ce qu'une fonction attend et ce qu'elle renvoie rend le tout beaucoup plus lisible — et permet à l'éditeur d'offrir une autocomplétion et des alertes d'erreur bien plus pertinentes.

```gdscript
extends Node

## 当前关卡获得的分数
var score: int = 0


## 增加分数，amount 为本次获得的分数
func add_score(amount: int) -> void:
	score += amount
```

Ici, j'utilise deux choses à la fois : `int` et `-> void` pour les indications de type, et `##` devant les membres pour les commentaires de documentation.

L'inférence de type comme `var score := 0` est aussi très pratique : pas besoin d'allonger chaque ligne pour préciser le type quand il est évident. En revanche, pour les paramètres de fonction, les valeurs de retour et les références de nœuds importantes, je préfère les écrire explicitement.

Si l'autocomplétion de tes fonctions n'affiche jamais les types, cherche `Add Type Hints` dans les paramètres de l'éditeur ; l'option se trouve sous `Text Editor → Completion → Add Type Hints`. Tu peux consulter la [documentation sur le typage statique](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/static_typing.html) pour les détails.

Côté commentaires, ce qui mérite vraiment d'être noté, ce sont le sens des paramètres, leurs unités et les conditions d'appel. Savoir si une durée est en secondes ou en millisecondes, par exemple, on l'oublie vite soi-même au bout de quelques semaines — c'est infiniment plus utile que de paraphraser chaque ligne de code.

Ce qui est écrit avec `##` est aussi reconnu par l'aide intégrée de Godot et s'affiche en infobulle dans l'Inspecteur sur les propriétés exportées. C'est super pratique quand on écrit un plugin ou des composants destinés à d'autres ; la [syntaxe complète des commentaires de documentation est ici](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html).

## Couper les conditions trop longues avec des parenthèses

Quand plusieurs conditions s'entassent sur une seule ligne, ça dépasse vite de l'écran, surtout quand on a deux scripts ouverts côte à côte.

GDScript accepte l'antislash pour continuer sur la ligne suivante, mais je préfère nettement entourer l'expression de parenthèses. C'est d'ailleurs ce que recommande le [guide de style officiel](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_styleguide.html#format-multiline-statements-for-readability), et c'est bien moins pénible quand on ajoute ou retire une condition par la suite.

```gdscript
func can_interact(in_range: bool, target_visible: bool, dialogue_open: bool) -> bool:
	return (
			in_range
			and target_visible
			and not dialogue_open
	)
```

Les deux lignes verticales dans l'éditeur sont des repères souple et strict de longueur de ligne : elles servent juste à signaler qu'une ligne commence à être longue, pas à bloquer l'exécution. Inutile non plus de découper une expression toute simple en mille morceaux juste pour rester à gauche du repère.

## Ranger les fichiers par scène et par fonctionnalité pour s'y retrouver vite

Dans le tutoriel mentionné plus haut, l'auteur sépare ses fichiers entre `scripts`, `scenes` et `assets`. Sur le papier c'est très clair, mais dès que le projet grossit un peu, devoir faire des allers-retours entre trois dossiers différents pour retrouver la scène, le script et la config du joueur devient vite agaçant.

Je préfère regrouper ce qui se modifie ensemble, par exemple :

```text
res://
├── characters/
│   └── player/
│       ├── player.tscn
│       ├── player.gd
│       └── player_stats.tres
├── ui/
│   └── inventory/
│       ├── inventory.tscn
│       ├── inventory.gd
│       └── inventory_slot.tscn
├── shared/
│   ├── themes/
│   └── shaders/
└── assets/
    ├── fonts/
    └── audio/
```

Tout ce qui appartient au joueur va dans `player`, tout ce qui concerne l'écran d'inventaire va dans `inventory`, et seules les ressources partagées partout (polices, audio, thèmes) sont centralisées. La [documentation Godot sur l'organisation de projet](https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html) recommande d'ailleurs de garder les ressources au plus près de leur scène.

Si ton arborescence actuelle te convient, garde-la : le seul vrai critère d'une bonne organisation de dossiers, c'est le temps qu'elle te fait gagner à la prochaine modification.

## Les scènes enfants signalent ce qui se passe, le parent gère le reste

Prenons un emplacement d'inventaire sur lequel on clique : il peut émettre un signal `item_selected` en transmettant l'ID de l'objet, et c'est l'interface d'inventaire au-dessus qui décide s'il faut afficher la fiche détaillée ou équiper l'objet.

Si l'emplacement remonte lui-même toute l'arborescence à grands coups de `get_parent()` jusqu'à la scène principale pour modifier directement le joueur et le panneau de détails, le jour où tu veux réutiliser cet emplacement ailleurs, tout casse en même temps.

L'idée clé ici, c'est que les scènes enfants dépendent le moins possible de la structure extérieure. La plomberie et la coordination entre scènes doivent rester au niveau du parent qui connaît les deux parties — et quand une connexion directe de signal suffit, pas besoin de rajouter une couche d'événements globaux par-dessus.

La [documentation officielle sur l'organisation des scènes](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html) donne pas mal de bons exemples de ce genre de découplage.

## Bien distinguer ressources partagées et variables d'instance

On se fait très vite piéger sur les matériaux, les thèmes et les `Resource` personnalisées : par exemple, plusieurs personnages pointent vers la même ressource de statistiques, et modifier les PV de l'un en cours de partie modifie ceux de tous les autres.

[Godot réutilise les ressources déjà chargées](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html), et le fait qu'une ressource soit intégrée à une scène ne garantit pas que chaque instance de cette scène en recevra une copie indépendante.

Pour qu'une ressource soit propre à chaque instance de scène, tu peux cocher `Local To Scene` dans l'Inspecteur de la ressource, ou la dupliquer explicitement quand tu as besoin de données indépendantes, tout en continuant de partager les textures, polices et configurations en lecture seule.

Attention toutefois : « partager la même ressource de script » ne veut pas dire « partager toutes les variables du script ». Si deux nœuds utilisent le même script, leurs variables membres classiques restent propres à chaque instance — par exemple, `score` ci-dessus garde un score distinct pour chacun. Les [variables `static`](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#static-variables) relèvent d'une autre logique de partage.

Bref, quand plusieurs objets changent d'un seul coup, vérifie d'abord s'ils ne partagent pas la même ressource modifiable avant de semer des appels de duplication partout.



## Petites astuces en vrac

### Empêcher la barre d'espace d'activer l'UI toute seule
![[Pasted image 20261019200301.png]]
Le plus simple est d'aller dans les contrôles (Input Map), de trouver `ui_accept` et d'y supprimer `space`. Pourquoi ? Parce que les nœuds d'interface de Godot réagissent par défaut à `ui_accept`, et que `space` y est associée d'origine. C'est aussi bête que ça.

### Les regions pour plier le code, les commentaires pour expliquer le pourquoi

Quand un script commence à s'allonger, on peut délimiter des blocs logiques avec `#region` et `#endregion` pour pouvoir les replier dans l'éditeur. La [syntaxe officielle est ici](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#code-regions).

```gdscript
#region Score

var score: int = 0


func add_score(amount: int) -> void:
	score += amount

#endregion
```

Attention à ne pas mettre d'espace après `#` sur ces deux balises : contrairement aux commentaires classiques, écrire `# region` en fait juste un commentaire ordinaire.
# Références et suite

Cet article s'inspire du fil [Partage d'expérience de développement Godot](https://pd.qq.com/g/647545104021278691/post/B_92b3b86a5d1607001441152186786637080X60?showGuild=1&errCode=0&asideType=Full) sur Tencent Channels ainsi que des ajouts en commentaires, et j'ai glissé les liens vers la documentation officielle dans chaque section.

Si tu veux découvrir quelques extensions pratiques, tu peux enchaîner avec [[godot-useful-plugins|des plugins Godot bien utiles]].
