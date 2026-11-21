---
title: Ich habe ein Repository für eine kleine Forenliste gebaut
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: Ich habe meine bisher verstreuten Notizen zu Internet-Communities in ein Wiki-ähnliches Repository und eine eigene Website für kleine Foren gepackt – PRs sind ausdrücklich willkommen.
image: ""
tags:
  - Sommer 2026
  - Community-Notizen
  - Open Source
  - Foren
category: "Persönliche Notizen"
draft: false
alias: ""
lang: de
translationKey: "posts/cn-internet-community-map/internet-community-map"
---

# Ich habe ein Repository für eine kleine Forenliste gebaut

Ich wollte schon länger eine Karte von Internet-Communities zusammenstellen

Damit meine ich nicht die offensichtlichen großen Plattformen wie X, Instagram, Tieba, Xiaohongshu oder Xiaoheihe, sondern die Foren und Communities, über die man ohne gezielte Suche oder ohne in den entsprechenden Kreisen unterwegs zu sein praktisch nie zufällig stolpert

Aus einem einzelnen Artikel ist inzwischen ein langfristig pflegbares eigenes Repository samt Online-Seite geworden:

- GitHub-Repository: [https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)
- Online-Seite: [https://forums.cc.cd/](https://forums.cc.cd/)

Die Seite ähnelt jetzt eher einem Wiki oder einer Doku: links das Verzeichnis mit Kategorien und Communities, in der Mitte die einzelnen Einträge. Jede Community hat ihre eigene Unterseite, und ganz unten ist ein Giscus-Kommentarbereich eingebunden

In der ersten Version sind 49 Communities erfasst. Wenn später Leute etwas ergänzen, korrigieren oder PRs einreichen, wird diese Zahl weiter wachsen

## Was in dieses Repository kommt

„Klein“ bemisst sich hier nicht streng nach Nutzerzahlen, sondern danach, wie man überhaupt darauf stößt

Wenn man eine Community ohne aktive Suche kaum findet oder sie nur Leuten begegnet, die in der Hosting-, ACG-, Security-, Hardware-, Webmaster- oder Ressourcen-Szene unterwegs sind, passt sie wahrscheinlich hier rein

Aktuell ist das Ganze grob in diese Kategorien unterteilt:

- Technik / KI / Entwickler
- Hosting / VPS / Webmaster / Indie-Websites
- Suche / Ressourcen / Wissenstools
- Security / Reverse Engineering / Systeme / Software
- ACG / Games / Nischen-Circles
- Hardware / Elektronik / Homelab
- Adult / Ressourcen / Grauzone
- Alte internationale Foren / Allgemeine Interessen

Die KI-Sortierung fühlt sich stellenweise zwar etwas seltsam an, aber lässt sich gerade nicht ändern – bleibt erstmal so

## Wie die Seite aktuell aussieht

Früher war das eher eine lange README-Liste, mittlerweile ist daraus eine richtige Website geworden.

Auf der Startseite bleibt eine Kategorie-Übersicht, um schnell zu sehen, was alles drin ist; über das Menü links springt man durch die Kategorien; und jede Community hat ihre eigene Seite, damit andere direkt darauf hinweisen können, wenn etwas falsch beschrieben ist oder sich Zugang und Registrierungsregeln geändert haben

Ursprünglich wollte ich eine „Karte der Internet-Communities“ bauen, aber je mehr ich schrieb, desto klarer wurde: Das Schwierigste an einer Karte ist nicht das Zeichnen, sondern die laufende Pflege

Foren-Zugänge ändern sich, Registrierungswege ändern sich, und auch die Stimmung in einer Community wandelt sich. In der Hosting-Szene gibt es ständig Neues zu Anbietern, Routings und Aktionen, während Einträge zu ACG- und Ressourcen-Communities oft durch Domainwechsel, neue Berechtigungsstufen oder geänderte Forenregeln veralten

Deshalb gilt jetzt: Das Repository übernimmt das Verzeichnis und die nüchternen Fakten, der Blog bleibt für meine persönlichen Eindrücke

Wenn ich wirklich länger in einer Community unterwegs war, schreibe ich einen eigenen Artikel darüber. Wenn es nur eine Zusammenstellung öffentlicher Infos ist, bleibt es bei dem Eintrag in der Liste

## Was zu jeder Community drinsteht

Im Repository versuche ich, zu jedem Eintrag möglichst diese Punkte festzuhalten:

- Zugang / URL
- Ausrichtung und Community-Atmosphäre
- Registrierungsweg oder Einstiegshürden
- Was es dort hauptsächlich gibt
- Wofür sich ein Blick lohnt
- Worauf man achten sollte
- Öffentliche Quellen
- Datum der letzten Überprüfung

Communities, in denen ich selbst lange aktiv war, sind deutlich stärker aus echter Erfahrung heraus geschrieben.

Bei Linux.do und NodeLoc orientiere ich mich zum Beispiel an meinen Eindrücken aus [[internet-community-1|Internet-Community-Notizen 1]]: bei Linux.do an den Regeln, Einsteiger-Aufgaben, kostenlosen Community-Services, Deals, Dev-Optimierungen, gemeinsamer Doku-Arbeit und LDC; bei NodeLoc an der lockeren Stimmung, den Unterforen, dem Batterie-Punktesystem, Affiliate-Links und den vielen aktiven Seitenbetreibern

Bei Communities, die ich nicht selbst länger genutzt habe, stütze ich mich nur auf öffentliche Seiten und das, was man in der Szene so hört – ohne so zu tun, als hätte ich es aus erster Hand erlebt

## Warum PRs willkommen sind

Bei so einer Liste macht man alleine garantiert Fehler

Bei manchen Communities sieht man von außen nur die Eingangstür, aber nicht die echte Stimmung drinnen. Manche Foren öffnen die Registrierung nur phasenweise, manche Domains wandern, und alte und neue Namen werden leicht durcheinandergeworfen

Darum braucht dieses Repository keine noch hübscher formulierten Beschreibungen, sondern echte Mitglieder, die Dinge geraderücken

Wenn du in einer dieser Communities schon lange unterwegs bist oder einfach einen Fehler in einem Eintrag entdeckst, mach gerne direkt einen PR auf. Besonders wertvoll sind Infos wie diese:

- Ist die Registrierung gerade offen, nur per Einladung oder nur phasenweise geöffnet?
- Welche Forenregeln oder Ankündigungen sollte man als Neuling zuerst lesen?
- Geht es dort eher technisch zu, wird viel geplaudert, gehandelt oder geht es vor allem um Ressourcen?
- Welche Unterforen sind am wertvollsten?
- Hat sich der Zugang geändert oder ist die alte Domain mittlerweile instabil?
- Klingen manche Beschreibungen zu sehr nach KI-Zusammenfassung und sollten eher im Ton echter Nutzer umgeschrieben werden?

Wenn du keinen PR erstellen willst, kannst du auch einfach direkt unter der jeweiligen Community-Seite kommentieren. Die Seite nutzt jetzt Giscus, die Kommentare landen also direkt in den GitHub Discussions

## Wie man beim Pflegen mithelfen kann

Wenn du eine Community hinzufügen oder ändern möchtest, bearbeite am besten zuerst die strukturierten Daten im Repository:

```bash
data/communities.json
```

Führe danach Folgendes aus:

```bash
node scripts/generate-readme.mjs
node scripts/build-site.mjs
```

Der erste Befehl synchronisiert die README, der zweite generiert die Online-Seite

Wenn du nur die Kategoriebeschreibungen anpassen willst, schau hier rein:

```bash
docs/categories.md
```

Wenn du eine einzelne Community ergänzt, gib am besten direkt öffentliche Quellen mit an. Das können die offizielle Website, die Registrierungsseite, Ankündigungen im Forum, die Über-uns-Seite, die Forenregeln oder andere öffentlich zugängliche Infos sein

## Aktuelle Leitlinien für die Sammlung

Das Projekt wurde bisher größtenteils mithilfe von KI auf Basis öffentlicher Infos, Webseiten und ein paar eigenen Erfahrungen zusammengestellt. Nur einen Teil der Communities habe ich wirklich selbst über längere Zeit genutzt

Deshalb hoffe ich, dass nach und nach jeder Eintrag einmal von echten Nutzern überarbeitet wird

Communities aus den Bereichen Adult, Ressourcen, Cracks, Reverse Engineering, Security, Flashing oder Handel nehme ich ebenfalls auf, beschreibe sie aber nur auf allgemeiner Ebene: was dort grob zu finden ist, was sich zu beobachten lohnt und welche Fallstricke es gibt. Ob man dort reingeht, mitmacht und wie man die Risiken einschätzt, liegt komplett in der eigenen Verantwortung

Mir geht es inzwischen eher darum, ein langfristig editierbares öffentliches Verzeichnis aufzubauen, statt eines Blogartikels, der nach dem Schreiben sofort veraltet

Wenn dir ein Forum auffällt, das ich noch nicht drin habe, oder ein Eintrag total laienhaft klingt, mach gerne direkt einen PR im Repository auf:

[https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)

## Weiterlesen

Wenn du erst mal lesen willst, wie ich selbst durch solche Communities gestreift bin, fang am besten mit [[internet-community-1|Linux.do, NodeLoc und NodeSeek]] an und lies danach [[internet-community-2|Teil zu den Interessen-Communities]]

Anlaufstellen rund um Indie-Blogs habe ich separat unter [[internet-community-3|Webmaster-Communities und -Organisationen]] gesammelt – stöber einfach zusammen mit der Karte ganz entspannt durch
