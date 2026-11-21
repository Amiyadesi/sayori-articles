---
title: Wöchentliche Internet-Lektüre 2 – Own the Slice
published: 2026-09-27
created: 2026-09-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 1
description: Own the Slice – Die Methodik, die wir beim Programmieren im KI-Zeitalter beherrschen sollten?
image: ""
tags:
  - Lesegedanken
  - Wöchentliche-Lektüre
  - KI-Workflow
  - Herbst-2026
category: "Persönliche Gedanken"
draft: false
alias: ""
lang: de
translationKey: "posts/weakly-articles-02/weakly-articles-02"
---
[Originallink](https://www.kentlangley.com/blog/own-the-slice/)

# Einordnung
Künstliche Intelligenz hat die Kosten für das Schreiben von Code schneller gesenkt als die Kosten für die eigentliche Produktarbeit. Dieser Artikel beschreibt eine Arbeitseinheit, bei der eine einzelne Person den gesamten Weg von der Kundenanforderung bis zum ausgelieferten Ergebnis verantwortet.

Zu Beginn skizziert der Artikel ein Szenario: Auf den ersten Blick scheint paralleles Multitasking kein großes Problem zu sein. Doch laut dieser Studie [https://contextcost.com/the-research](https://contextcost.com/the-research) verbraucht man bei jedem parallelen Task-Wechsel zwischendurch immer mehr Umschaltzeit. Der Autor zitiert Weinbergs klassische Erfahrungsschätzung, um die Kosten des Kontextwechsels bei parallelen Projekten zu verdeutlichen: Je mehr Projekte man gleichzeitig schultert, desto rasanter steigt die Zeit, die man braucht, um sich wieder in den jeweiligen Kontext einzudenken.

Schon zwei Projekte fressen 1/5 der ursprünglichen Gesamtzeit. Bei 5 parallelen Projekten gehen fast 3/4 drauf – und das ist wohlgemerkt nur die Wechselzeit. Zieht man diese von 100 % ab und teilt den Rest durch die Anzahl der Projekte, sinkt die eigene Entwicklungseffizienz in den Keller. Man sollte allerdings im Hinterkopf behalten, dass diese Prozentzahlen selbst nur Erfahrungswerte sind und keine strengen experimentellen Ergebnisse. Danach führt der Artikel sein Kernkonzept `slice` ein.

`slice` ist für den Verfasser ein **vertikaler Slice / ein lieferbares Ergebnis**: Es wird nicht nach technischer Architektur geschnitten, sondern ausgehend von einem echten Bedürfnis durch alle Schichten hindurch, die für die Umsetzung nötig sind – bis am Ende ein Resultat steht, das der Nutzer tatsächlich spüren kann. Nebenbei wird auch `INVEST检查清单` vorgestellt, eines der Paradigmen der agilen Softwareentwicklung.

Anschließend geht der Autor auf den derzeitigen tatsächlichen Nutzen von KI ein: In der Umsetzungsphase spart sie massiv Zeit, bei Entscheidungen hingegen nur sehr wenig. Unterm Strich kann die gesamte Entwicklungszeit dadurch sogar steigen. Ein interessantes Experiment, das im Artikel zitiert wird [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), zeigt genau das.

Der Autor reiht mehrere Jahre der DORA-Berichte aneinander und spinnt daraus eine Erzählung nach dem Motto „KI stört erst Produktionssysteme und wird dann schrittweise von ihnen absorbiert“. Da diese jährlichen Ergebnisse aber streng genommen keine Längsschnittstudie mit exakt derselben Untersuchungsgruppe sind, sehe ich darin eher einen Trendhinweis als einen bewiesenen Kausalzusammenhang.

# Mein Verständnis
Eigentlich gehört das, was der Artikel über KI erklärt, in der Tech-Szene mittlerweile fast schon zum Allgemeinwissen: KI ist eher ein extrem starkes Effizienz-Werkzeug als eine echte „Wunschmaschine für alles“.

Sie kann die Zeit in der Umsetzungsphase drastisch verkürzen, aber Projektentwicklung besteht eben nicht nur aus dem Coden. Anforderungen bewerten, Konzepte entwerfen, testen, Reviewen, integrieren, abnehmen – all diese Schritte schrumpfen nicht im gleichen Tempo mit.

Und genau da liegt das Problem.

Früher war bei der Entwicklung eines Features das „Runterschreiben“ oft der teuerste Teil. Heute, mit KI, wird das reine Schreiben immer billiger, während die wirklich teuren Dinge plötzlich ganz andere sind: zu entscheiden, was überhaupt gemacht werden soll, zu beurteilen, ob das Generierte stimmt, und eine Sache wirklich sauber abzuschließen.

Anders gesagt: KI hat den Flaschenhals in der Entwicklung nicht beseitigt, sie hat ihn nur verschoben.

Genau deshalb finde ich das Konzept `slice` so spannend.

Wenn die Umsetzungskosten immer weiter sinken, tappt man leicht in eine neue Falle: Weil es so billig geworden ist, „mal eben etwas anzufangen“, startet man immer mehr Aufgaben gleichzeitig. Eine KI per Prompt ein Feature schreiben zu lassen und nebenbei noch einen Agenten für ein zweites Feature anzuwerfen, kostet mental fast nichts – und nach außen sieht es so aus, als ginge alles gleichzeitig voran.

Nur muss irgendjemand diese Ergebnisse am Ende trotzdem verstehen, testen, anpassen und entscheiden, ob sie akzeptabel sind. Und dieser Jemand ist meistens man selbst.

So führt der Produktivitätsschub durch KI womöglich dazu, dass man am Ende nur noch mehr unabgenommenen Code, unfertige Features und Kontexte produziert, die man mühsam neu in den Kopf laden muss. Code entsteht immer schneller, aber das, was wirklich fertig wird, wächst nicht unbedingt im selben Maße mit.

Aus diesem Blickwinkel wirkt `slice` wie ein dringend nötiges Korrektiv gegen genau diesen Trend.

Statt Arbeit in rein technische Häppchen wie „Datenbank bauen“, „UI schreiben“ oder „API hinzufügen“ zu zerlegen, definiert man das Ziel als vollständiges, überprüfbares Ergebnis – zum Beispiel: „Der Nutzer kann jetzt etwas tun, was vorher nicht ging.“

Die KI hilft natürlich weiterhin bei Datenbank, UI, API und Tests, aber diese Einzelteile gelten nicht mehr jeweils für sich als abgehakte Aufgaben, sondern nur noch als Bausteine ein und desselben Ergebnisses.

Das erinnert mich an meine eigenen Erfahrungen, die ich gerade mit Coding Agents mache.

Früher musste ich jede Zeile selbst schreiben, also war die Zahl der Dinge, die ich gleichzeitig vorantreiben konnte, ganz natürlich begrenzt. Heute kann ich mehrere Agenten gleichzeitig auf verschiedene Projekte ansetzen: ein Spiel, eine Website, Automatisierungsskripte oder sogar mehrere Features im selben Projekt.

Oberflächlich betrachtet ist mein „Entwicklungstempo“ tatsächlich rasant gestiegen.

Sobald die Agenten aber fertig sind, muss ich – wenn ich die Kontrolle über die Änderungen behalten will – trotzdem Stück für Stück nachlesen, was sie da eigentlich fabriziert haben, prüfen, ob bestehende Logik kaputtgegangen ist, Tests laufen lassen und mir das ganze Projektmodell wieder neu ins eigene Gehirn laden.

Der eigentliche Engpass hat sich vermutlich von „Ich schreibe zu langsam Code“ verschoben zu „Meine Aufmerksamkeit reicht nicht aus, um alles zu verstehen und abzunehmen, was die KI ausspuckt“.

Deshalb glaube ich, dass eine der wichtigsten Fähigkeiten im KI-Zeitalter gar nicht darin besteht, möglichst viele Agenten parallel zu dirigieren, sondern darin, zu begrenzen, wie viele „noch nicht wirklich fertige Baustellen“ man gleichzeitig offen hat.

Das ist zumindest das, was ich aus diesem Artikel für mich mitgenommen habe.

`slice` – ob das wirklich der Königsweg ist, da bin ich mir noch nicht ganz sicher. Manche tiefgreifenden Refactorings, technischen Schulden oder Performance-Optimierungen lassen sich kaum direkt auf ein für Nutzer spürbares Ergebnis herunterbrechen. Und wenn eine einzelne Person von der Anforderung bis zur Auslieferung alles allein verantwortet, kann das auch eine ganz neue Art von kognitiver Überlastung erzeugen.

Aber es bietet zumindest eine sehr interessante Perspektive:

**Sollten wir, jetzt wo Code immer billiger wird, nicht langsam anfangen, „Fertigstellung“ statt „Umsetzung“ als Grundeinheit für Entwicklungsfortschritt zu betrachten?**

Früher haben wir „ein Stück Code fertiggeschrieben“ oder „ein Modul implementiert“ ganz selbstverständlich als Fortschritt verbucht. Doch seit KI die Umsetzungskosten massiv drückt, funktioniert dieser Maßstab vielleicht immer weniger.

Wirklich entscheidend ist womöglich nicht mehr, wie viel Code wir produziert haben, sondern wie viele Dinge tatsächlich durch Design, Umsetzung, Prüfung und Integration gelaufen sind – bis am Ende ein Ergebnis steht, das man nutzen, erleben und ausliefern kann.

Wenn dem so ist, dann ist das wahre knappe Gut im KI-Zeitalter vielleicht nicht mehr allein die Fähigkeit zur Umsetzung, sondern die Kontrolle über Scope, Aufmerksamkeit und das „Fertigmachen“ selbst.

# Nachwort
Puh... Artikel lesen ist echt anstrengend... vor allem so fachliche Texte... und dann auch noch so lange.

Und wie soll ich sagen – mein ehrliches Lesegefühl schwankt meistens zwischen „Das muss man doch nun wirklich nicht erklären“ und „Ich verstehe kein Wort“.

Das ist wohl einfach der Fluch des Wissens: Sobald man etwas einmal begriffen hat, kann man sich kaum noch in sein früheres Ich hineinversetzen, das es noch nicht verstanden hatte.

Wenn man dann aber genau solche eigenen Erkenntnisse teilen will, muss man sie trotzdem sauber in Worte fassen. Denn wenn am Ende ein Text herauskommt, den nur man selbst versteht, darf man sich schon fragen, ob man das überhaupt noch einen Artikel nennen kann...

Teilen ist wirklich nie einfach... Die Angst davor zu überwinden, überhaupt etwas zu veröffentlichen, ist eigentlich nur die allererste Hürde. Die eigentliche Kunst besteht darin, die eigenen Gedanken klar auszudrücken, das eigene Verständnis nachvollziehbar zu zeigen, gut zu argumentieren und dabei auch noch fesselnd zu schreiben.

Das ist ein bisschen so, wie es in diesem Artikel heißt:

„Runtergeschrieben“ heißt noch lange nicht „fertig“.

## Weiterlesen

Der Startpunkt dieser Reihe liegt in [[weakly-articles-01|Erste Internet-Lektüre]], und genau bei den Themen Scope und Fertigstellung, um die es diesmal ging, habe ich beim [[after-gmtk|GMTK Jam]] ordentlich Lehrgeld gezahlt.

Später, als ich [[subarutap-and-selfthink|SubaruTap]] gebaut habe, ist mir dann endlich wieder ein kleiner geschlossener Kreislauf gelungen. Zusammengenommen zeigen diese Beiträge ganz gut, wie ich nach und nach neu gelernt habe, was Erschaffen eigentlich bedeutet.
