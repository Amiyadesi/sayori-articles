---
title: "Wie Studierende offizielle KI-Kontingente, AnyRouter, SharedChat und cc-switch nutzen, um ihre Entwicklungsumgebung zu verwalten"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 12
description: "Notizen für Studierende zu offiziellen KI-Kontingenten, AnyRouter-Registrierung, SharedChat-Guthaben und der cc-switch-Konfiguration – als Begleittext zu meinem Video auf Bilibili"
image: ""
tags:
  - Praxis-Tutorial
  - KI-Workflow
  - Claude Code
  - Offizielle Studierenden-Vorteile
category: "Anleitungen & Tutorials"
draft: false
alias: ""

lang: de
translationKey: "posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide"
---

Das hier ist die Textfassung zu meinem Video, ergänzt um Möglichkeiten, wie man ganz reguläre offizielle KI-Kontingente für Studierende einbindet.

Das Video gibt es hier: [BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## Was diese ganzen Sachen überhaupt sind

Bevor wir `cc-switch` einrichten, sortieren wir erst einmal die verschiedenen Kontingent-Quellen, die wir einbinden können:

- **Reguläre offizielle Kontingente**: Dazu gehören [Zed Education](https://zed.dev/education) (nach Studierenden-Verifizierung gibt es ein Jahr den Student-Plan inklusive 10 US-Dollar KI-Agent-Guthaben pro Monat und unbegrenzter Edit-Prediction), [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/) (einlösbar mit dem 300-RMB-Gutschein ohne Mindestbestellwert für Hochschulstudierende oder kostenlosen Neukunden-Tokens), [Google AI Studio](https://aistudio.google.com/) (offizieller kostenloser Tier der Gemini API) sowie GitHub Copilot Student und GitHub Models aus dem [GitHub Student Developer Pack](https://education.github.com/pack). Die laufen am stabilsten und taugen gut als Haupt-Setup.
- **AnyRouter / AgentRouter**: Routing-Dienste mit Claude-Code- bzw. Anthropic-kompatiblen Schnittstellen. Man bekommt einen funktionierenden API-Endpunkt und einen Key, die man einfach in Tools mit Claude-Code-Unterstützung einträgt.
- **SharedChat**: Eher eine Anlaufstelle für kostenlose Community-Kontingente rund um GPT / Codex – im Grunde eine zusätzliche Codex-Guthabenquelle.
- **cc-switch**: Ein Open-Source-Konfigurationsmanager für den Desktop, das GitHub-Repository liegt unter [farion1231/cc-switch](https://github.com/farion1231/cc-switch). Damit lassen sich Provider-Konfigurationen für Tools wie Claude Code, Codex oder Gemini CLI zentral umschalten.

## Wie man an die offiziellen regulären Kontingente kommt

Wenn du zuerst die stabilsten offiziellen Hauptkanäle einrichten willst, kannst du dir diese vier Bildungs- bzw. Gratis-Angebote sichern (eine komplette Übersicht aller Studierenden-Ressourcen findest du unter [[edumails-glados-student-benefits|Leitfaden für offizielle Vorteile mit Hochschul-E-Mail]]):

1. **Zed Education (10 Dollar KI-Guthaben pro Monat)**: Nach erfolgreicher Bewerbung bei [Zed Education](https://zed.dev/education) bekommst du ein Jahr lang den Student-Status mit monatlich 10 US-Dollar Guthaben für Agent-Tokens und unbegrenzter Edit-Prediction (Claude Opus ist nicht enthalten). Voraussetzung: Dein GitHub-Account muss mindestens 30 Tage alt sein und deine Hochschul-Domain muss in der Liste von [JetBrains/swot](https://github.com/JetBrains/swot) stehen.
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **Offizielle API von Alibaba Cloud Bailian**: Hol dir über den [Link für Alibaba-Cloud-Studierendenvorteile](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv) den 300-RMB-Gutschein oder geh direkt in die Bailian-Konsole, um einen API Key zu erstellen. Als Base URL trägst du `https://dashscope.aliyuncs.com/compatible-mode/v1` ein.
3. **Offizieller Free Tier von Google AI Studio**: Mit deinem Google-Konto einloggen und direkt einen Gemini API Key generieren. Auch ohne hinterlegte Kreditkarte kannst du damit im Rahmen des täglichen Freikontingents die Gemini-Modelle ansprechen.
4. **GitHub Student Developer Pack**: Nach Verifizierung deiner Bildungs-E-Mail-Adresse kannst du direkt GitHub Copilot Student aktivieren.

## Bei AnyRouter registrieren

Offizielle Website: [https://anyrouter.top/](https://anyrouter.top/)

Affiliate-Link des Betreibers – darüber bekommen beide Seiten 50 Dollar Guthaben: [https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

Bei der Registrierung einfach den Anweisungen auf der Seite folgen. Der Bestätigungscode per E-Mail kommt manchmal nicht sofort an – warte ein paar Minuten, bevor du auf „Erneut senden“ klickst, sonst machst du dich nur selbst verrückt.

> [!TIP]
> Falls es bei der Registrierung mit deiner EDU-E-Mail hakt, schau direkt hier rein:
> [[#^answer1|👉 Was tun, wenn die Registrierung mit der EDU-E-Mail nicht klappt]]

## AgentRouter kann man sich auch noch anschauen

Ein weiterer Zugang, den man sich parallel ansehen kann, ist AgentRouter: [https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

Dort kann man sich mit einem GitHub- oder Linux-Do-Account registrieren bzw. einloggen; in der Modellliste tauchen `gpt-5.5` und die Claude-Reihe auf. Wenn die Registrierung klappt, taugt das gut als Backup-Route.

Die Registrierungsbedingungen stehen hier:

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## AnyRouter API Key generieren

Geh im Dashboard auf die Seite für API-Tokens und lege einen neuen Token an.

Der Name ist egal, am besten nimmst du aber etwas Sprechendes, zum Beispiel:

```text
cc-switch-anyrouter
```

Die üblichen Angaben, die man ausfüllen muss, sehen ungefähr so aus:

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## SharedChat-GPT-Kontingent abholen

Bei [SharedChat](https://sharedchat.cc/#/) folgst du einfach dem Aktions-Banner auf der Seite.

Im Kern ist das ein Community-Projekt, mit dem man GPT im Web kostenlos und ohne Registrierung nutzen kann. Der Betreiber hat kürzlich noch ein kostenloses Community-Projekt für Codex aufgesetzt, bei dem man sich täglich Guthaben abholen kann.

Der Ablauf ist grob so:

1. Mit einer QQ-Mail-Adresse auf der [kostenlosen Codex-Community-Seite](https://new.sharedchat.cc/list/#/register?i=E8v44) registrieren / einloggen – **nicht auf der Bezahlseite**. Wobei du natürlich auch zahlen kannst, wenn du willst.
2. ![[Pasted image 20260620234009.png]]
3. Unten rechts auf „Beantragen“ klicken und eine kurze Begründung reinschreiben. Falls der Browser die Anfrage ablehnt, probier einen anderen Browser oder das Inkognito-Fenster.

## cc-switch installieren

Offizielles Repository von cc-switch: [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Unter Windows lädt man in der Regel `.msi` oder die portable ZIP-Datei herunter. Für macOS steht die Installationsanleitung in der README. Unter Linux wählt man je nach Distribution meist deb, rpm oder AppImage.

Nach der Installation starten: Das Tool erkennt automatisch die lokal vorhandenen KI-CLI-Tools und liest Skills sowie den Verlauf ein. Du kannst damit erst einmal deine bestehende Konfiguration verwalten oder darüber auch die entsprechenden Tools aktualisieren und installieren.
![[Pasted image 20260620233340.png]]

## Provider in cc-switch hinzufügen

Am Beispiel von AnyRouter oder Alibaba Cloud Bailian:

1. cc-switch öffnen
2. In die Provider-Einstellungen für Claude Code oder das jeweilige Tool gehen
3. Einen neuen benutzerdefinierten Provider anlegen
4. Einen Provider-Namen vergeben, zum Beispiel `Aliyun-Bailian` oder `AnyRouter`
5. Den API Key eintragen
6. Die Request-Adresse / Base URL eintragen
7. Das Schnittstellenformat gemäß den Angaben auf der jeweiligen Plattform-Seite auswählen
8. Speichern
9. Auf „Verwenden / Wechseln“ klicken

Wenn du mehrere Kanäle einbinden willst, legst du für jeden einen eigenen Provider an und benennst sie eindeutig:

```text
Bailian Official
AnyRouter edu
SharedChat
```

So siehst du beim Umschalten später schon am Namen, welches Kontingent gerade läuft.

## Auto-Routing in cc-switch aktivieren

Die simpelste Konfiguration für automatisches Routing besteht darin, erst das Routing einzuschalten und dann die Failover-Reihenfolge festzulegen.

In den Einstellungen das Routing aktivieren:
![[Pasted image 20260620234413.png]]

Im automatischen Failover mehrere Provider in der gewünschten Reihenfolge anordnen:
![[Pasted image 20260620234401.png]]

## Prüfen, ob alles greift

Nach dem Umschalten das Terminal neu starten oder direkt ein neues Terminal-Fenster öffnen.

Zuerst einmal kurz antesten mit:

```text
/init
```

Wenn eine normale Antwort zurückkommt, kannst du dich an richtige Coding-Aufgaben wagen.

Falls ein Fehler auftaucht, prüfe diese Punkte:

1. Wurde der Key vollständig kopiert?
2. Steckt in der Base URL ein Leerzeichen zu viel oder fehlt ein Pfadabschnitt?
3. Hast du in cc-switch wirklich auf „Verwenden / Wechseln“ geklickt?
4. Wurde das Terminal neu gestartet?
5. Ist das Guthaben auf der entsprechenden Plattform eventuell schon aufgebraucht?
6. Wird der Modellname aktuell vom Backend unterstützt?

## Häufige Probleme

### Was tun, wenn die Registrierung mit der EDU-E-Mail nicht klappt
Sehr wahrscheinlich steht deine E-Mail-Domain bei AnyRouter auf der Blacklist.

Du kannst aber mal probieren, den ersten Buchstaben eines Teils deiner Hochschul-Domain großzuschreiben, um zu sehen, ob die Mail dann durchgeht. Wenn deine Adresse zum Beispiel `stu.xxxx.edu.cn` lautet, versuch es mal mit `stu.Xxxx.edu.cn`. Manchmal geht die Mail dann raus – ob sie zuverlässig ankommt, ist allerdings Glückssache.

^answer1

### Nach Einbindung in CPA oder Sub2 funktioniert nichts

AnyRouter ist in erster Linie auf CLI-Tools wie Codex oder Claude Code ausgelegt. Wenn du es in Anwendungen wie CPA oder Sub2 einbinden willst, musst du eventuell die Request-Header anpassen. Hier ist ein Beispiel, das ich mir damals beim Debugging notiert habe:

| Header        | Wert                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| Authorization | Bearer sk-dein-api-key                                                    |
| User-Agent    | codex_cli_rs/0.114.0 (oder eine andere existierende Version) (Windows 10.0.26100; x86_64) |

### AnyRouter läuft nicht oder hängt extrem
Da lässt sich leider wenig machen. Es hängen eben sehr viele Leute gleichzeitig drauf, die Stabilität hängt komplett von der aktuellen Auslastung ab. Meine Erfahrungswerte dazu:
> [!NOTE]
> Hier hilft nur Glück. Meistens kommt man bei gpt5.5 ganz gut rein, und wenn die Verbindung erst einmal steht, läuft sie in der Regel auch recht stabil. Außerdem hat man spät nachts deutlich bessere Chancen, einen Platz zu erwischen.
>
> Zu Stoßzeiten landet man in der Warteschlange. Du kannst versuchen, eine neue Session zu starten, kurz „hi“ zu schicken und den Zielmodus zu aktivieren; wenn die Verbindung abbricht, einfach wiederherstellen. Innerhalb von zehn Minuten sollte es klappen – wenn bis dahin gar nichts geht, liegt es sehr wahrscheinlich an deiner Konfiguration.

Noch mehr Tipps zur Fehlerbehebung gibt es hier:
[AnyRouter Troubleshooting-Guide!](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## Weiterlesen

Weitere offizielle Vorteile findest du in der [[edumails-glados-student-benefits|Gesamtübersicht der Studierenden-Vorteile]]. Wenn du deine fertigen Projekte online bringen willst, schau dir als Nächstes [[azure-students-100-credit-guide|Azure-Server in Japan]] und [[aliyun-student-300-voucher-guide|Alibaba-Cloud-Studierendengutscheine]] an; für statische Websites bietet sich direkt [[astro-mizuki-blog-from-zero|Hosting mit Cloudflare Pages]] an.

Sobald die Modelle angebunden sind, habe ich das Thema Suche separat in [[build-your-search-gateway|Search Gateway]] ausgelagert; Browser-Erweiterungen zum Lesen, Übersetzen und Verwalten von Schnittstellen stehen in der [[useful-browser-extensions-toolbox|Plugin-Liste]].
