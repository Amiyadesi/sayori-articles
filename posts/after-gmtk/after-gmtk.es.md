---
title: Reflexiones después de la GMTK Jam
published: 2026-07-27
created: 2026-07-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: En las últimas seis horas de la GMTK Jam, recorté los puzles que no iba a terminar a tiempo y entregué un minijuego que de verdad se puede jugar de principio a fin
image: ""
tags:
  - Verano 2026
  - Game Jam
  - Desarrollo de videojuegos
  - Retrospectiva de crecimiento
category: Registro personal
draft: false
lang: es
translationKey: "posts/after-gmtk/after-gmtk"
alias: ""
---

# Lo terminé, pero no consigo alegrarme
Terminé la GMTK; dejo el enlace por aquí: [Last Minute Echo by Amiya_desi](https://amiya-desi.itch.io/last-minute-echo). Al final no pensé que acabaría siendo solo un minijuego. Aunque por lo menos es un minijuego completo, con su condición de victoria y de derrota, no me sale alegrarme ni un poquito.

# El viaje mental

## Al principio
Al principio, cuando vi que el tema de la GMTK era «count down», me pareció bastante sencillo y cómodo. Más aún teniendo en cuenta que ya tenía un proyecto anterior que encajaba bastante bien con el tema, [TimeRewindLinker by Amiya_desi](https://amiya-desi.itch.io/time-rewind-linker). Mi plan era tomar esa base de rebobinar el tiempo y sumarle puzles con límite de cuenta atrás. Dios, me parecía una idea genial, de esas que entran en la sección de [«Gracias por participar»](/essays/thanks-encourage/) (broma). Pensando que se me había ocurrido semejante ideaza, daba la victoria prácticamente por descontada (qué ilusión).

## El desarrollo intermedio y la furia
Como vi que la idea encajaba con lo que había hecho antes, me vine muy arriba, hablé directamente con la IA para sacar una primera versión y me puse manos a la obra... Y lo que había por delante era el mismísimo infierno... Todo lo que tocaba la IA me seguía pareciendo que no funcionaba, y como por lo visto llevaba demasiado tiempo abusando de la «silla de ruedas» de la IA, me dio pereza hasta armar yo mismo el greybox de un nivel. Solo sabía tirar del gacha con la IA para que me generara todo de golpe, del esqueleto a la carne; igual que Regulos, de tanto ir en silla de ruedas me quedé medio tonto QAQ
![[Pasted image 20260727222142.png|width=640|align=center]]
Quién iba a decir que, cuando a falta de seis horas por fin reuní el valor para mirar la escena que me había montado la IA, casi me da un derrame cerebral. Todavía me acuerdo de uno de los detalles:
`谁能想到这个人机做一个陷阱方块，不单独用一个场景做陷阱预制体，然后再在主场景实例化放置，而是选择神秘的一个陷阱tile放陷阱贴图，然后一个陷阱Node2d下面放一堆area2d放在这些尖刺边上，我去你这让我怎么改，要是我一开始就一个场景内聚好了只需要摆放就行了，这TM全是零散拆开的，我还得一个一个挪，那我挪个蛋啊我靠！`

## La decisión final y el sprint
Total, cuando por fin recuperé la cordura al final, entre entregar un proyecto completo pero diminuto u otro que parecía enorme pero ni siquiera se podía jugar, elegí sin dudar lo primero. Recorté todos los puzles y volví a un único objetivo: huir del perseguidor. Con la meta clara, dejé que la IA se limitara a escribir el algoritmo del perseguidor y un par de condiciones y pantallas de victoria y derrota, mientras yo me encargaba de rescatar un poco el mapa. Por fin, en los últimos 10 minutos, lo terminé y lo envié. Al menos quedó acabado... Aunque la IA del perseguidor seguía siendo bastante tonta y, para que no resultara demasiado fácil, tuve que meterle algo de teletransporte, lo cual por supuesto causó otros problemas, pero ya no quedaba tiempo.

# Conclusión tras la jam
De tanto ir en silla de ruedas, el tío GMTK me hizo volcar de lo lindo; menos mal que al final logré despertar el Ritual Inverso y sobreviví por los pelos para entregarlo...
¡Maldita sea, ¿no se suponía que yo era el más fuerte?! Para llegar a ser el más fuerte, se ve que todavía me queda un largo camino por recorrer... GMTK, creo que no te voy a olvidar en la vida...

La verdad es que en mi diario privado del 2026-07-26 también resumí un montón de cosas; esto es básicamente el proceso mental que escribí en pleno chispazo de inspiración justo cuando di el volantazo.

Por último, niños, en el futuro no abuséis nunca de la silla de ruedas, mantened el pensamiento independiente: ¡no respondáis, no respondáis, no respondáis!
{{黑幕:Pero si es para dejar un comentario, es más que bienvenido (*^_^*)}}

## Sigue leyendo

Si quieres ver cómo volví a empezar antes de esto, puedes regresar a [[re0：game-dev-life|Vida de desarrollo de videojuegos desde cero]], y el pequeño proyecto que hice después está en [[subarutap-and-selfthink|Registro de desarrollo de SubaruTap]].

El golpe que me llevé esta vez por el descontrol del alcance y por depender de la IA me resonó bastante cuando más tarde leí [[weakly-articles-02|Own the Slice]]; ponerlos uno al lado del otro da bastante que pensar.
