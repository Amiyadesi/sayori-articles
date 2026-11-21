---
title: "Disroot: Eine Open-Source-Dienstesammlung ganz nach dem alten Ideal des Internets"
published: 2026-06-27
created: 2026-06-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Notizen zu Disroots E-Mail, Cloud, XMPP und Kollaborationstools – und ein Anlass, neu zu sortieren, welche öffentlichen Dienste sich auf sayori.org langfristig pflegen lassen
image: ""
tags:
  - Sommer 2026
  - Community-Notizen
  - Open-Source-Dienste
  - Fediverse
category: "Persönliche Notizen"
draft: false
alias: ""
lang: de
translationKey: "posts/disroot-open-services-note/disroot-open-services-note"
---

> [!NOTE]
> Dieser Beitrag stammt vom 27. Juni 2026. Die Registrierungsfragen, Kontingente und verfügbaren Funktionen von Disroot können sich ändern – vor einer Anmeldung lohnt sich ein kurzer Blick auf die offizielle Website.

Heute bin ich auf eine ziemlich interessante Open-Source-Organisation gestoßen: [Disroot](https://disroot.org/)

Diese Organisation bündelt einen ganzen Haufen offener Internet-Tools und pflegt sie ernsthaft als Plattform für den täglichen Gebrauch.

Die Selbstbeschreibung auf der Website ist ziemlich klar: Freiheit, Privatsphäre, Föderation, Dezentralisierung.

Keine Werbung, kein Tracking, kein Profiling, kein Data-Mining – rein gemeinnützig und der .org-Domain absolut würdig.

## Was es dort alles gibt

Die Diensteliste findet sich hier:

[https://disroot.org/en/services](https://disroot.org/en/services)

Aktuell gehören dazu:

- Email, nutzbar per Webmail oder über einen IMAP-Client
- Cloud, basierend auf Nextcloud, zum Synchronisieren von Dateien, Kalendern und Kontakten
- XMPP Chat, ein dezentrales Chat-Protokoll
- Pads, kollaborative Online-Dokumente
- PrivateBin, ein verschlüsseltes Pastebin
- Upload, temporäres Teilen von Dateien
- Forgejo, Code-Hosting
- CryptPad, eine datenschutzfreundliche Online-Office-Suite
- FEDIsroot, erreichbar unter [fe.disroot.org](https://fe.disroot.org/), ein ActivityPub-/Fediverse-Mikroblogging-Dienst auf Basis von Akkoma, kompatibel mit der Mastodon-API
- LibreTranslate, ein Übersetzungsdienst
- Vault, Dienste rund um die Passwortverwaltung

Man muss nicht unbedingt alles davon nutzen.

Aber genau das ist der Reiz daran: Mit einem einzigen Account bekommt man Zugang zu all diesen Open-Source-Diensten.

Für jemanden wie mich, der gerne an eigenen Websites, Servern und Open-Source-Diensten herumbastelt, ist das wirklich verlockend – und ein gutes Vorbild, von dem man sich etwas abschauen kann.

## Die Registrierungsfrage ist etwas eigen

Das Registrierungsformular ist hier:

[https://user.disroot.org/pwm/public/newuser/](https://user.disroot.org/pwm/public/newuser/)

Die Frage bei meiner Anmeldung lautete: Was machst du gerne vor dem Schlafengehen?

Außerdem muss die Antwort über 50 Wörter lang sein.

Die Frage ist eigentlich ganz nett.

Man kann erst in Ruhe auf Chinesisch oder einer anderen Sprache einen Absatz schreiben und ihn dann ins Englische übersetzen.

Zum Beispiel, dass man vor dem Schlafen noch etwas liest, die Aufgaben für morgen sortiert, Musik hört, kurz durch Open-Source-Communities stöbert oder einfach das Handy weiter weglegt, um früher einzuschlafen.

## Wie ich es nutzen werde

Ich habe mir jetzt erstmal einen Account registriert, aber wirklich interessant ist für mich davon aktuell eigentlich nur die E-Mail-Adresse. Schließlich habe ich mich schon bei so vielen Diensten und Communities angemeldet, dass sich ohnehin ein ganzer Stapel eigener Domain-E-Mail-Adressen angesammelt hat – plus meine selbst gehosteten Wegwerf- und Domain-Mails.

Es gibt dort zwar auch einen gemeinnützigen Vaultwarden-Dienst, aber da ich bereits mein eigenes Vaultwarden betreibe, brauche ich das nicht.

Außerdem ist Disroot kein Gratis-Tarif eines Tech-Konzerns, sondern lebt von der Community und Spenden. Dass man es bei Bedarf nutzen kann, reicht völlig.

## Es hat mich auch meine eigenen Dienste neu betrachten lassen

Nachdem ich mir die Dienstelisten von Disroot und [[radical-servers-public-services|Riseup]] angesehen hatte, war mein erster Reflex ebenfalls, immer mehr Zeug auf sayori.org zu packen, um dem .org im Namen gerecht zu werden.

Aber meine persönlichen Kapazitäten sind nun mal begrenzt. Nach einer kurzen Rücksprache mit GPT habe ich mir daraus eine Liste öffentlicher Dienste zusammengestellt, und zwar hier<https://sayori.org/zh/services/>

Wirklich öffentlich zugänglich sind aktuell vor allem GeoScore, die Blogbeiträge, RSS, das Whiteboard und das Gästebuch-Feedback. Search Gateway bleibt Open Source, aber die laufende Online-Instanz nutze ich nur noch für meine eigenen Seiten und Wartungsaufgaben.

Statt weiter neue Dienste aufzuhäufen, möchte ich lieber erst ein paar sehr überschaubare Richtungen ausprobieren: Website-Check-ups für persönliche Blogs, Hilfe beim Online-Bringen nicht-kommerzieller statischer Seiten, kleine Kontingente für Suchbelege sowie niederfrequente Benachrichtigungen von RSS zu E-Mail oder Webhook.

Nichts davon wird von Anfang an als anonyme öffentliche Plattform aufgezogen, sondern erstmal auf Einladung, mit Kontingenten und manueller Bearbeitung. Wenn kein Bedarf besteht, stelle ich es ein; wenn der Wartungsaufwand meine Kapazitäten übersteigt, ebenfalls.

Inzwischen bezeichne ich sayori.org lieber als privat gepflegte, nicht-kommerzielle digitale Dienste nach bestem Bemühen statt als gemeinnützige Organisation – dafür fehlt mir schlicht die Energie.


## Weiterlesen

In dieselbe Richtung geht auch [[radical-servers-public-services|Von Riseup zusammengestellte Tech-Kollektive und öffentliche Dienste]], dort entdeckt man einige spannende kleinere Gruppen.

Wer ein paar solcher Dienste selbst auf dem eigenen Server betreiben möchte, kann zuerst einen Blick in [[2c2g-server-service-index|Diensteliste für kleine Server]] werfen; zum Thema Passwort-Tresor habe ich separat [[selfhost-vaultwarden-on-2c2g|Notizen zum Selbsthosten von Vaultwarden]] geschrieben.
