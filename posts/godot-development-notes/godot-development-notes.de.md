---
title: Persönliche Godot-Tipps und -Gewohnheiten
published: 2026-11-06
created: 2026-10-19
updated: 2026-11-06
lastEdited: 2026-11-06
updateCount: 0
description: Von Node-Referenzen, UIDs und Themes bis hin zu Type Hints, Projektstruktur und Resource-Sharing – eine Sammlung kleiner Gewohnheiten, die Godot-Projekte leichter wartbar machen
image: ""
tags:
  - Godot
  - Spieleentwicklung
  - Praxis-Tutorial
category: "Anleitungen & Tutorials"
draft: false
lang: de
translationKey: "posts/godot-development-notes/godot-development-notes"
alias: ""
---
# Hintergrund

Vor einiger Zeit habe ich mal einen Beitrag über [[godot-useful-plugins|nützliche Godot-Plugins]] zusammengestellt. Diesmal möchte ich über etwas Grundlegenderes sprechen, nämlich über meine Entwicklungsgewohnheiten in Godot.

Heute bin ich auf [GodotHub](https://godothub.com/zh) über den Beitrag [Godot-Entwicklungserfahrungen](https://pd.qq.com/s/72backvjc) gestolpert. Vieles davon mache ich genauso, aber in ein paar Punkten unterscheide ich mich auch.

Schließlich habe ich als Webmaster mal mit der Spieleentwicklung angefangen – da ist es schon ein bisschen peinlich, wenn im eigenen Blog kaum Artikel über Spieleentwicklung stehen (hust).

Also schreibe ich hier einfach mal meine eigenen Godot-Gewohnheiten auf.
## % für den Zugriff per eindeutigem Namen
![[Pasted image 20261019195911.png]]

Wenn man in einem Godot-Skript einen Node referenziert und dabei mit gedrückter Strg- oder Alt-Taste den Node ins Skript zieht, um `@onready` oder `@export` zu erzeugen, ist das zwar praktisch, aber:

```gdscript
@onready var start_button: Button = $Panel/MarginContainer/VBoxContainer/StartButton
```

Sobald man später das UI anpasst und eine Container-Ebene dazwischenschiebt, muss dieser Pfad direkt mitgeändert werden.

Genau hierfür sind die [szeneneindeutigen Namen](https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html) von Godot gedacht. Macht man im Szenenbaum einen Rechtsklick auf den Node und aktiviert „Als eindeutigen Namen zugänglich machen“, erscheint daneben ein `%`-Symbol, und im Skript lässt sich das Ganze abkürzen zu:

```gdscript
@onready var start_button: Button = %StartButton
```

Solange man innerhalb derselben Szene bleibt und den Namen nicht ändert, muss diese Referenz bei Anpassungen der Node-Hierarchie nicht mehr angefasst werden. Außerdem erinnert einen das Symbol im Szenenbaum direkt daran, dass dieser Node möglicherweise per Skript angesprochen wird.

Dieses „eindeutig“ gilt allerdings nur innerhalb der jeweiligen Szene und hängt vom `owner` des Nodes ab. Wenn in der Spieler-Szene zum Beispiel eine Waffen-Szene instanziert wird, kann das Spieler-Skript nicht einfach per `%Blade` auf die Klinge im Inneren der Waffe zugreifen. Solche Referenzen lasse ich deshalb jeweils innerhalb ihrer eigenen Szene.

## Resource-Referenzen, Preload und Konstanten

Preload nutze ich meistens innerhalb derselben Szene, zum Beispiel für fertig konfigurierte State-Machine-Bäume.

Exportierte Referenzen setze ich dagegen meist für szenenübergreifende Verknüpfungen ein.

Konstante Resources sind normalerweise Dinge, die sich selten ändern und gleichzeitig schwer direkt zu referenzieren sind – etwa Datenklassen für ein Speichersystem. Das sind abstrakte Resources, die ein globales Skript braucht und die in der Logik ohnehin fest benötigt werden.

Will man zum Beispiel für ein Portal eine Zielszene auswählen, bietet sich eine exportierte Property an, weil diese Szene zwangsläufig in verschiedenen anderen Szenen wiederverwendet wird und jeweils woanders hinführen soll:

```gdscript
extends Area2D

@export var destination_scene: PackedScene
```

Im Inspector zieht man dann einfach die gewünschte Szene hinein. Setzt man dasselbe Portal in verschiedene Levels, kann jedes sein eigenes Ziel bekommen, und Änderungen sind schön übersichtlich.

Wenn eine Resource im Skript wirklich fest geladen werden muss, kann man im Dateisystem-Panel von Godot per Rechtsklick die UID kopieren und die kopierte `uid://...` als String-Argument an `preload()` übergeben. Wird die Datei später verschoben, hängt die Referenz nicht mehr am alten Dateipfad.

UIDs kümmern sich um die Identität von Resources, während `%StartButton` für Node-Referenzen innerhalb einer Szene zuständig ist – die beiden lösen also zwei ganz verschiedene Probleme.

## Theme

![[Pasted image 20261019201052.png]]

Ich empfehle, zuerst eine `Theme`-Resource anzulegen, dort die gemeinsamen Stile für Buttons, Labels und Panels unterzubringen und sie dann dem Root-`Control` der Oberfläche zuzuweisen. Alle darunterliegenden Controls übernehmen dieses Theme automatisch, und wenn man später die Schriftart wechseln oder Button-Stile anpassen will, hat man eine zentrale Stelle dafür.

Ein und derselbe Button-Typ kann natürlich unterschiedliche Aufgaben haben, etwa als normaler Button, Bestätigungs-Button oder Lösch-Button. Für solche Fälle eignen sich [Theme-Typvarianten](https://docs.godotengine.org/en/stable/tutorials/ui/gui_theme_type_variations.html):

1. Im Theme-Editor neben der Typenliste auf das Plus klicken und einen neuen Typ anlegen, zum Beispiel `DangerButton`.
2. Zum Tab mit dem Werkzeug-Symbol wechseln und den Basistyp auf `Button` setzen.
3. Farben und Stile dieser Variante anpassen und anschließend beim gewünschten Button unter `Theme Type Variation` den Namen `DangerButton` eintragen.

So folgen Schriftart und Abstände weiterhin dem allgemeinen `Button`, während der Lösch-Button nur seine eigenen Abweichungen pflegen muss. Falls die Variante nicht im Dropdown auftaucht, kann man den Namen auch einfach direkt eintippen.

Wenn ein einzelnes Control wirklich mal eine Extrawurst braucht, sind lokale Overrides natürlich völlig okay – aber alles, was mehrfach vorkommt, lässt sich im Theme später deutlich entspannter ändern.

## Type Hints und Doc-Kommentare gleich mitnehmen

GDScript erzwingt keine Typangaben, aber wenn dabeisteht, was eine Variable ist und was eine Funktion erwartet oder zurückgibt, liest sich der Code gleich viel klarer – und der Editor liefert deutlich bessere Autovervollständigung und Fehlermeldungen.

```gdscript
extends Node

## 当前关卡获得的分数
var score: int = 0


## 增加分数，amount 为本次获得的分数
func add_score(amount: int) -> void:
	score += amount
```

Hier kommen zwei Dinge zusammen: `int` und `-> void` sind Type Hints, und das `##` vor den Membern sind Doc-Kommentare.

Schreibweisen wie `var score := 0`, bei denen der Typ eindeutig abgeleitet wird, sind ebenfalls super praktisch – man muss nicht auf Krampf jede Zeile in die Länge ziehen. Bei Funktionsparametern, Rückgabewerten und wichtigen Node-Referenzen schreibe ich die Typen aber lieber explizit aus.

Falls beim Autovervollständigen von Funktionen ständig keine Typen eingefügt werden, kann man in den Editor-Einstellungen nach `Add Type Hints` suchen (zu finden unter `Text Editor → Completion → Add Type Hints`). Details dazu stehen in der [Dokumentation zur statischen Typisierung](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/static_typing.html).

Bei Kommentaren lohnt es sich meiner Meinung nach am meisten, Bedeutung der Parameter, Einheiten und Aufrufbedingungen festzuhalten. Ob ein Zeitparameter in Sekunden oder Millisekunden angegeben wird, weiß man nach ein paar Wochen selbst nicht mehr – das aufzuschreiben bringt deutlich mehr, als jede Codezeile ins Chinesische zu übersetzen.

Was mit `##` geschrieben wird, erkennt auch die integrierte Hilfe von Godot, und bei exportierten Properties erscheint es sogar als Tooltip im Inspector. Gerade für Plugins oder Komponenten, die andere nutzen sollen, ist das ziemlich praktisch. Die [vollständige Syntax für Doc-Kommentare gibt es hier](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html).

## Lange Bedingungen umbrechen – lieber mit Klammern

Wenn mehrere Bedingungen in einer einzigen Zeile kleben, sprengt das schnell den Bildschirm – vor allem, wenn man zwei Skripte nebeneinander offen hat.

In GDScript kann man Zeilen zwar mit einem Backslash fortsetzen, ich ziehe es aber vor, den Ausdruck in Klammern zu setzen. Das empfiehlt auch der [offizielle Styleguide](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_styleguide.html#format-multiline-statements-for-readability), und wenn man später Bedingungen hinzufügt oder entfernt, ist es deutlich angenehmer.

```gdscript
func can_interact(in_range: bool, target_visible: bool, dialogue_open: bool) -> bool:
	return (
			in_range
			and target_visible
			and not dialogue_open
	)
```

Die beiden vertikalen Linien im Editor sind übrigens nur weiche und harte Richtlinien für die Zeilenlänge. Sie weisen darauf hin, wenn eine Zeile etwas lang gerät – es heißt aber nicht, dass der Code dahinter nicht mehr läuft. Man muss einen simplen Ausdruck also nicht komplett zerpflücken, nur um krampfhaft vor der Linie zu bleiben.

## Dateien nach Szene und Funktion ordnen – Hauptsache, man findet sie schnell

In dem oben erwähnten Tutorial wurden Dateien in `scripts`, `scenes` und `assets` aufgeteilt. Das wirkt auf den ersten Blick zwar logisch, aber sobald ein Projekt etwas größer wird, sucht man Szene, Skript und Konfiguration ein und desselben Spielers ständig in mehreren Ordnern zusammen – ziemlich mühsam.

Ich halte Dinge, die zusammen geändert werden, lieber auch zusammen, zum Beispiel so:

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

Alles, was zum Spieler gehört, kommt in `player`, alles für das Inventar-UI in `inventory`, und Schriften, Audio sowie Themes, die an mehreren Stellen gebraucht werden, landen an einem zentralen Ort. Auch Godots [Dokumentation zur Projektorganisation](https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html) empfiehlt, zusammengehörige Resources möglichst nah an der jeweiligen Szene abzulegen.

Wenn eine bestehende Ordnerstruktur für dich gut funktioniert, bleib ruhig dabei – der einzige Sinn beim Aufräumen von Ordnern ist, beim nächsten Ändern Zeit zu sparen.

## Kind-Szenen melden, was passiert – den Rest regelt der Parent

Wenn etwa ein Inventar-Slot angeklickt wird, kann er ein `item_selected`-Signal mit der Item-ID aussenden. Ob daraufhin Details angezeigt oder das Item ausgerüstet wird, entscheidet dann das Inventar-UI.

Würde sich der Slot selbst per `get_parent()` bis zur Hauptszene durchhangeln und dort direkt Spieler und Detail-Panel manipulieren, fliegt einem das bei der Wiederverwendung an anderer Stelle sofort um die Ohren.

Entscheidend ist für mich, dass Kind-Szenen möglichst wenig über die äußere Struktur wissen müssen. Szenenübergreifende Verbindungen und Koordination gehören in den Parent, der beide Seiten kennt. Und wenn ein klares, direktes Signal völlig ausreicht, muss man nicht extra ein globales Event-System dazwischenbauen.

In der [offiziellen Dokumentation zur Szenenorganisation](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html) gibt es dazu jede Menge gute Beispiele.

## Resource-Sharing und Instanzvariablen sauber trennen

Darüber stolpert man besonders leicht bei Materials, Themes und eigenen `Resource`-Klassen. Wenn mehrere Charaktere dieselbe Attribut-Resource referenzieren und man zur Laufzeit die Lebenspunkte darin ändert, verlieren plötzlich alle anderen Charaktere mit.

[Godot verwendet bereits geladene Resources wieder](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html). Selbst wenn eine Resource direkt in eine Szene eingebettet ist, heißt das nicht automatisch, dass jede Szeneninstanz eine eigene Kopie bekommt.

Soll eine Resource pro Szeneninstanz eigenständig sein, kann man im Inspector der Resource `Local To Scene` aktivieren oder sie bei Bedarf gezielt duplizieren. Gemeinsame Texturen, Schriftarten und schreibgeschützte Konfigurationen bleiben dagegen einfach geteilt.

„Dieselbe Skript-Resource teilen“ und „alle Variablen im Skript teilen“ sind aber zwei völlig verschiedene Paar Schuhe. Wenn zwei Nodes dasselbe Skript nutzen, gehören normale Membervariablen trotzdem jeweils der eigenen Skriptinstanz – wie oben zählt `score` für jeden Node getrennt. Erst [`static`-Variablen](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#static-variables) sorgen für echte gemeinsame Datenhaltung.

Wenn sich also mehrere Objekte gleichzeitig verändern, schau zuerst nach, ob sie sich dieselbe veränderbare Resource teilen – das führt meist schneller zur Ursache, als überall Kopierlogik einzubauen.



## Kleine Tipps am Rande

### Verhindern, dass die Leertaste automatisch UI-Elemente auslöst
![[Pasted image 20261019200301.png]]
Am einfachsten sucht man in der Input Map nach `ui_accept` und löscht dort `space` heraus. Warum? Weil UI-Nodes in Godot standardmäßig über `ui_accept` ausgelöst werden können und `space` dafür als Standardtaste hinterlegt ist. So simpel ist das.

### Regions zum Einklappen, Kommentare fürs Warum

Wenn ein Skript etwas länger wird, lassen sich zusammengehörige Codeabschnitte mit `#region` und `#endregion` gruppieren, sodass der Editor den Bereich einklappen kann. Die [offizielle Syntax steht hier](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#code-regions).

```gdscript
#region Score

var score: int = 0


func add_score(amount: int) -> void:
	score += amount

#endregion
```

Nach dem `#` steht bei diesen beiden Markierungen kein Leerzeichen – anders als bei normalen Kommentaren. Schreibt man `# region`, ist es einfach nur ein gewöhnlicher Kommentar.
# Quellen und Weiterlesen

Dieser Beitrag orientiert sich an [Godot-Entwicklungserfahrungen](https://pd.qq.com/g/647545104021278691/post/B_92b3b86a5d1607001441152186786637080X60?showGuild=1&errCode=0&asideType=Full) im Tencent-Channel sowie den Ergänzungen in den Kommentaren; die passenden Stellen der offiziellen Dokumentation sind direkt in den jeweiligen Abschnitten verlinkt.

Wenn du dir noch ein paar nützliche Plugins ansehen möchtest, lies direkt weiter bei [[godot-useful-plugins|nützliche Godot-Plugins]].
