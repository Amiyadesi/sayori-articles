---
title: Rückblick nach dem GMTK Jam
published: 2026-07-27
created: 2026-07-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: In den letzten sechs Stunden des GMTK Jam habe ich unfertige Rätsel gekürzt und ein tatsächlich durchspielbares Minispiel abgegeben.
image: ""
tags:
  - Sommer 2026
  - Game Jam
  - Spieleentwicklung
  - Wachstumsrückblick
category: "Persönliche Notizen"
draft: false
alias: ""
lang: de
translationKey: "posts/after-gmtk/after-gmtk"
---

# Fertig geworden, aber irgendwie nicht froh darüber
Der GMTK ist durch, hier ist der Link: [Last Minute Echo by Amiya_desi](https://amiya-desi.itch.io/last-minute-echo). Am Ende wurde es unerwarteterweise nur ein kleines Spiel – immerhin ein vollständiges Minispiel mit Sieg- und Niederlagebedingung –, aber freuen kann ich mich darüber kein Stück.

# Gedanklicher Weg

## Am Anfang
Als ich am Anfang sah, dass das GMTK-Thema Count Down ist, fand ich es ziemlich entspannt und machbar. Zumal ich schon ein Projekt hatte, das ganz gut dazu passte: [TimeRewindLinker by Amiya_desi](https://amiya-desi.itch.io/time-rewind-linker). Ich wollte auf dieser Zeitumkehr-Mechanik aufbauen und Rätsel mit Countdown-Limit hinzufügen – Himmel, was für eine geniale Idee, fast schon wie für [Dank & Ermutigung](/essays/thanks-encourage/) gemacht (Nebel). So überzeugt von meinem tollen Einfall dachte ich natürlich, der Sieg sei schon so gut wie sicher (freu).

## Entwicklung zwischendurch und purer Zorn
Weil es so gut zu meinem früheren Projekt passte, war ich total gehyped, habe direkt mit der KI einen ersten Entwurf besprochen und losgelegt … und dann ging es ab in die Hölle. Was die KI geändert hat, fühlte sich für mich dauernd falsch an, und ich hatte mich wohl zu sehr auf den KI-Rollstuhl verlassen: Selbst einen simplen Level-Graubox-Aufbau war ich zu faul zu machen und ließ die KI einfach Gacha-mäßig direkt von Skelett bis Fleisch in einem Rutsch generieren – genauso rollstuhlmäßig verblödet wie Regulus QAQ.
![[Pasted image 20260727222142.png|width=640|align=center]]
Wer hätte gedacht, dass ich in den letzten sechs Stunden, als ich endlich den Mut fasste, mir die von der KI gebaute Szene anzusehen, fast eine Hirnblutung bekommen hätte. An einen Punkt erinnere ich mich noch genau:
`谁能想到这个人机做一个陷阱方块，不单独用一个场景做陷阱预制体，然后再在主场景实例化放置，而是选择神秘的一个陷阱tile放陷阱贴图，然后一个陷阱Node2d下面放一堆area2d放在这些尖刺边上，我去你这让我怎么改，要是我一开始就一个场景内聚好了只需要摆放就行了，这TM全是零散拆开的，我还得一个一个挪，那我挪个蛋啊我靠！`

## Letzter Entschluss und Endspurt
Als dann endlich wieder Vernunft einkehrte, stand ich vor der Wahl zwischen einem vollständigen, aber sehr kleinen Werk und einem anderen, das zwar groß aussah, aber unspielbar war – und entschied mich konsequent für Ersteres. Alle Rätsel raus, zurück zu einem einzigen Ziel: der Verfolgung ausweichen. Sobald das Ziel klar war, sollte die KI nur noch den Verfolger-Algorithmus sowie ein paar Sieg- und Niederlagebedingungen und Szenen schreiben, während ich die Map rettete. In den letzten zehn Minuten bin ich tatsächlich fertig geworden und habe abgegeben – immerhin abgeschlossen … Auch wenn die KI des Verfolgers noch ziemlich dumm ist und ich, damit es nicht zu leicht wird, noch ein bisschen Teleportation einbauen musste, was natürlich wieder andere Probleme nach sich zog, aber die Zeit lief einfach ab.

# Fazit nach dem Jam
Zu viel Rollstuhl gefahren und von Onkel GMTK gnadenlos abgeschossen worden. Immerhin habe ich am Ende noch den Revers-Hexenmeister begriffen und mich irgendwie durchgemogelt …
Verdammt noch mal, sollte ich nicht der Stärkste sein?! Um der Stärkste zu werden, liegt wohl noch ein verdammt langer Weg vor mir … GMTK, dich vergesse ich mein Lebtag nicht …

In meinem privaten Tagebuch vom 2026-07-26 habe ich auch schon viel reflektiert – das ist im Grunde genau das, was ich in diesem plötzlichen Umschwung und Inspirationsschub niedergeschrieben habe.

Zum Schluss: Kinder, fahrt in Zukunft bloß nicht zu viel Rollstuhl, bleibt eigenständig im Denken, nicht antworten, nicht antworten, nicht antworten!
{{黑幕:Aber über Kommentare freue ich mich natürlich sehr (*^_^*)}}

## Weiterlesen

Wenn du sehen willst, wie ich davor noch einmal neu angefangen habe, kannst du zurück zu [[re0：game-dev-life|Spieleentwickler-Alltag bei null begonnen]] gehen; die späteren kleinen Projekte liegen in [[subarutap-and-selfthink|SubaruTap – Entwicklungsnotizen]].

Die Quittung für dieses Scope-Chaos und die KI-Abhängigkeit passte später beim Lesen von [[weakly-articles-02|Own the Slice]] an vielen Stellen ziemlich gut zusammen – beides nebeneinander zu lesen, löst schon einiges aus.
