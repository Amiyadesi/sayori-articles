---
title: "Was auf einem 2C2G-Studentenserver läuft: Stopf die kleine Kiste nicht gleich voll"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "Praxis-Setup des Blogbetreibers auf einem 2C2G-Aliyun-Lightweight-Server: Vaultwarden, ntfy, Gatus, Fast Note Sync, AstrBot und Such-Gateway. Mit echtem RAM-Verbrauch und Nicht-empfohlen-Liste"
image: ""
tags:
  - Praxistutorial
  - VPS und Self-Hosting
  - Docker
  - Studentenserver
category: "Anleitungen & Tutorials"
draft: false
alias: ""
lang: de
translationKey: "posts/student-2c2g-server-service-index/2c2g-server-service-index"
---
Wenn du wie der Betreiber eine 300-RMB-Gutschein für Studenten von Alibaba Cloud gegen einen 2C2G-Server eingetauscht hast, 

herzlichen Glückwunsch, du besitzt jetzt ein kleines Gerät, das rund um die Uhr online ist.

 Wenn du ihn noch nicht eingeschaltet hast, kannst du dir zuerst [[aliyun-student-300-voucher-guide|Alibaba Cloud Studenten-Gutscheine]] oder [[azure-students-100-credit-guide|Azure Japan-Server]] ansehen. Dieser Beitrag befasst sich mit der Auswahl von Verwendungszwecken nach dem Einschalten.

 Aber es ist eben wirklich nur ein kleiner Rechner. 2 Kerne, 1,6 GB RAM (etwa 672 MB tatsächlich verfügbar, mit aktiviertem Swap), geeignet zum Üben und Ausführen leichter Dienste, aber nicht für schwere Aufgaben wie das Ausführen lokaler Modelle, Nextcloud oder Videokonvertierung geeignet.

 Dies ist der echte Konfigurationsdatensatz des Betreibers. Der Server läuft jetzt seit über einem Monat, aktuell mit 14 Containern, 765 MB Speicher + 987 MB Swap belegt und 21 GB / 40 GB Speicherplatz genutzt.

## Zuerst die Grundkonfiguration vornehmen

Installiere Dienste nicht zu voreilig.

Sobald du den Server erhalten hast, erledige zuerst diese Dinge:

- SSH-Schlüssel-Anmeldung
- Passwort-Anmeldung deaktivieren
- Einen nicht standardmäßigen SSH-Port verwenden
- Sicherheitsgruppe und UFW einrichten
- Alibaba Cloud Kostenwarnungen (CDT-Traffic) einrichten
- Ein einheitliches Dienstverzeichnis erstellen
- Docker und Docker Compose installieren

Die ersten Schritte kannst du in meinem vorherigen Beitrag nachlesen:

[Ich wollte eigentlich nur, dass ein Bot 24 Stunden am Tag online ist, und habe am Ende einen Cloud-Server gekauft](/posts/sayori-server-01-vps-start/)

Das Dienstverzeichnis habe ich unter `/root/sayori/` abgelegt und verwalte es zentral über ein großes `docker-compose.yml`. Alternativ kannst du für jeden Dienst ein eigenes Verzeichnis anlegen:

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

Jedes Verzeichnis hat ein `docker-compose.yml`, echte Geheimnisse kommen in `.env` und gehören nicht in öffentliche Repositories.

## Dienste, die der Betreiber aktuell betreibt

### 🔐 Vaultwarden (Passwort-Tresor, am wichtigsten)

**Verwendungszweck:** Persönlicher Passwort-Tresor

**Warum er priorisiert wird:**

- Ein Passwort-Tresor ist wichtiger als Blogs, Statusseiten oder Bots
- Leichtgewichtiger Dienst mit geringem Speicherbedarf
- Ausgereiftes Client-Ökosystem, offizielle Bitwarden-Clients funktionieren auf Smartphone, Computer und Browser
- Unterstützt kostenpflichtige Bitwarden-Funktionen (Speichern von 2FA, Passwort-Gesundheitsprüfung)

**Wichtige Hinweise:**

- Schließe `SIGNUPS_ALLOWED` direkt nach der ersten Registrierung
- HTTPS muss eingerichtet werden (Cloudflare Tunnel oder Caddy)
- Regelmäßige Backups, regelmäßige Wiederherstellungstests
- Nicht nackt im öffentlichen Internet betreiben

**Speichernutzung:** ~50 MB

**Ausführliche Anleitung:** [[selfhost-vaultwarden-on-2c2g|Vaultwarden auf einem 2C2G-Studentenserver einrichten]]

---

### 📢 ntfy (Push-Benachrichtigungen, zweitwichtigst)

**Verwendungszweck:** Sich selbst Push-Benachrichtigungen senden

Wenn Backup-Skripte, Überwachungsskripte und Cronjobs auf dem Server laufen, muss dich im Fehlerfall jemand benachrichtigen. Dafür eignet sich ntfy perfekt.

**Wofür ich es verwende:**

- Benachrichtigungen bei erfolgreichen/fehlgeschlagenen Backups
- Gatus-Gesundheitsprüfungswarnungen
- Push von Kommentarmoderationsergebnissen
- Manuelles Auslösen von DevOps-Befehlen (über ntfy → Skript-Integration)

**Wichtige Hinweise:**

- Zugriffskontrolle einrichten, damit Fremde keine Nachrichten an deine Topics senden können
- Das Admin-Backend mit Cloudflare Access absichern

**Speichernutzung:** ~20 MB



---

**Ausführliche Anleitung:** [[selfhost-ntfy-on-2c2g|ntfy auf einem 2C2G-Studentenserver betreiben]]

### 📊 Gatus (Statusseite und Gesundheitsprüfung)

**Verwendungszweck:** Deine Dienste überwachen

Es kann regelmäßig prüfen, ob dein Blog, Vaultwarden, Bot-Panel und deine APIs noch leben. Wenn etwas abstürzt, wirst du per ntfy benachrichtigt.

**Von mir überwachte Endpunkte:**

- `sayori.org` Blog
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus selbst
- `ntfy.sayori.org` ntfy
- Fast Note Sync API

**Wichtige Hinweise:**

- Konfigurationsdatei in YAML schreiben, bei der Einrückung nicht zittern
- Über Cloudflare Tunnel freigeben, durch Access schützen
- Benachrichtigungskanäle mit ntfy verknüpfen

**Speichernutzung:** ~15 MB

---

### 📝 Fast Note Sync (Obsidian-Synchronisierung)

**Verwendungszweck:** Private Synchronisierung für Obsidian

Wenn du Obsidian wie ich zum Bloggen, Verwalten von Projekten und Speichern von Entwürfen nutzt, ist dieser Dienst sehr verlockend. Er ist billiger als Obsidian Sync (0 €) und unkomplizierter als Syncthing (keine Notwendigkeit, dass alle Endgeräte gleichzeitig online sind).

**Wichtige Hinweise:**

- Das Datenverzeichnis regelmäßig sichern
- Keine gigantischen Dateien (Bilder, Videos) darin ablegen
- Synchronisierungskonflikte manuell behandeln

**Speichernutzung:** ~30 MB

**Ausführliche Anleitung:** [[fast-note-sync-on-student-server|Fast Note Sync auf dem Studentenserver basteln]]

---

### 🤖 AstrBot + NapCat (QQ-Bot)

**Verwendungszweck:** Rund um die Uhr online laufender QQ-/Telegram-/Discord-Bot

Nachdem er auf einem Remote-Server platziert wurde, kann der Bot endlich rund um die Uhr ohne Unterbrechung laufen. Er kann in Discord und Telegram integriert werden, wo es im Grunde keine Risikokontrollen gibt.

**Hinweise zur QQ-Integration:**

- Neue Accounts unterliegen leicht Risikokontrollen, es wird empfohlen, den Account vorher aufzuwärmen
- Nicht direkt nach der Erstellung eines Kleinaccounts verwenden (blutige Lektion des Betreibers)
- NapCat erfordert ein regelmäßiges Scannen des QR-Codes zur Anmeldung

**Speichernutzung:** AstrBot ~100 MB, NapCat ~150 MB

---

### 🔍 AI Search Gateway (Such-Gateway)

**Verwendungszweck:** Eigenes Aggregations-Gateway für KI-Suche

Integriert Tavily, Brave Search, Firecrawl, Exa, Grok Search und SearXNG, gebaut mit FastAPI. Praktisch für Codex- und Claude Code-MCPs, bequemer als das direkte Aufrufen einzelner APIs.

**Wichtige Hinweise:**

- Nur auf `127.0.0.1:8000` lauschen, nicht im öffentlichen Internet freigeben
- Lokal über SSH-Portweiterleitung + MCP aufrufen
- API-Schlüssel in Umgebungsvariablen ablegen

**Speichernutzung:** ~100 MB (inklusive Redis und SearXNG)

---

### 🛡️ Comment Moderation (Kommentarmoderation)

**Verwendungszweck:** KI-gestützte Moderation von Blogkommentaren

Verwendet kostenlose GPT-Kontingente, um Twikoo-Kommentare automatisch zu moderieren, in Kombination mit ntfy für den Push der Moderationsergebnisse. Kommentare können in ntfy durch das Senden von Nachrichten manuell gelöscht und wiederhergestellt werden.

Zusammen mit der Cloudflare Turnstile-CAPTCHA-Überprüfung sind die verbleibenden Kommentare im Grunde von hoher Qualität.

**Speichernutzung:** ~40 MB

---

### 🌐 Cloudflared (Cloudflare Tunnel)

**Verwendungszweck:** Lokale Dienste im öffentlichen Internet verfügbar machen, ohne Port 80/443 zu öffnen

Sämtliche öffentlichen Dienste des Betreibers laufen über den Cloudflare Tunnel:

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel (Cloudflare Access muss konfiguriert werden)

**Vorteile:**

- Keine Notwendigkeit, Ports am Ursprungsserver zu öffnen
- Automatisches HTTPS
- Cloudflare Access kann zur Authentifizierung eingerichtet werden

**RAM-Verbrauch:** ~30 MB

---

### 🎛️ 1Panel (Docker-Verwaltungspanel)

**Zweck:** Docker-Container über eine Weboberfläche verwalten

Gut für Einsteiger, um den Container-Status im Blick zu behalten, und praktisch, um spontan Probleme zu debuggen

**Sicherheitswarnung:**

- Muss zwingend über Cloudflare Tunnel + Access laufen oder zumindest per Reverse-Proxy mit HTTPS und starkem Passwort abgesichert sein
- Damit lässt sich jeder einzelne deiner Container steuern
- Niemals ungeschützt ins öffentliche Netz stellen

**RAM-Verbrauch:** ~80 MB

---

### Weitere Hilfsdienste

- **Mihomo**: Proxy-Client, stellt Proxys für Dienste bereit, die einen brauchen
- **Redis**: Dient als Cache für das Search Gateway

## Aktuelle RAM-Auslastung (echte Daten)

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**Fazit:**

- 1,6 GB RAM, davon 765 MB belegt, Swap liegt bei 987 MB
- 14 Container, der RAM-Verbrauch ist völlig im Rahmen
- Die hohe Swap-Nutzung zeigt zwar, dass der Arbeitsspeicher echt knapp ist, aber es hält noch stand
- Bloß keine weiteren schweren Dienste mehr draufpacken

## Dienste, die ich auf einem 2C2G nicht empfehle

Die fressen entweder RAM, CPU oder Speicherplatz – das macht ein 2C2G nicht mit:

### ❌ Nextcloud / OwnCloud

**Warum nicht empfehlenswert:**

- Hoher RAM-Verbrauch (PHP-FPM + Datenbank + Redis)
- Up- und Downloads fressen Bandbreite und I/O
- Vorschauen großer Dateien lasten die CPU voll aus
- Viele Sync-Konflikte

**Alternativen:**

- Leichtgewichtiger Dateisync: Fast Note Sync (nur für Text geeignet), Syncthing
- Cloud-Speicher: Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**Warum nicht empfehlenswert:**

- Video-Transcoding frisst CPU und RAM
- Das Scannen der Mediathek belastet I/O stark
- Auf 40 GB Speicher passen ohnehin kaum Filme

**Alternativen:**

- Ein dediziertes NAS oder einen eigenen Medienserver nutzen
- Oder einfach direkt Online-Streaming verwenden

---

### ❌ GitLab

**Warum nicht empfehlenswert:**

- RAM-Verbrauch startet erst ab 4 GB aufwärts
- Auf einem 2C2G läuft das schlicht gar nicht

**Alternativen:**

- GitHub / Gitea / Forgejo
- Gitea ist deutlich schlanker, braucht aber trotzdem 512 MB+ RAM

---

### ❌ Mastodon / Misskey

**Warum nicht empfehlenswert:**

- Fediverse-Server fressen ordentlich RAM und Datenbankleistung
- Mediendateien füllen schnell die Festplatte

**Alternativen:**

- Einfach einen Account auf einer öffentlichen Instanz registrieren

---

### ❌ Lokale LLMs (Ollama / LM Studio)

**Warum nicht empfehlenswert:**

- Inferenz auf 2 Kernen ist so langsam, dass man an sich selbst zweifelt
- In 1,6 GB RAM passt kein einziges brauchbares Modell

**Alternativen:**

- Offizielle Studenten-Vorteile nutzen: GitHub Copilot Student, kostenloser Tarif von Google AI Studio
- Mit Studenten-Guthaben verrechnen: offizielle Modell-API von Alibaba Cloud Bailian
- Mehr dazu unter: [Wie Studierende offizielle KI-Kontingente nutzen und ihre Entwicklungsumgebung mit cc-switch verwalten](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress (läuft zwar, ist aber nicht ratsam)

**Warum eher nicht empfehlenswert:**

- PHP + MySQL fressen einiges an RAM
- Mit vielen Plugins wird es noch hungriger
- Statische Blogs (Astro / Hugo) bieten deutlich bessere Performance

**Falls es unbedingt sein muss:**

- Caddy + PHP-FPM + SQLite verwenden
- Möglichst wenige Plugins installieren
- Cloudflare CDN vorschalten

## Empfohlene Lernreihenfolge

So würde ich als Admin vorgehen:

1. **Grundkonfiguration**: [[sayori-server-01-vps-start|SSH und Sicherheitsgruppen]], [[docker-compose-minimum-start|Docker und Compose]], Kostenwarnungen
2. **Domain und HTTPS**: [[free-domain-and-web-community|Kostenlose Domain]] + [[cloudflare-free-tier-developer-guide|Cloudflare DNS und Tunnel]]
3. **Kerndienste**: [[selfhost-vaultwarden-on-2c2g|Vaultwarden-Passwortmanager]] + [[selfhost-ntfy-on-2c2g|ntfy-Benachrichtigungen]] + Gatus-Monitoring
4. **Nach Bedarf erweitern**: [[fast-note-sync-on-student-server|Fast Note Sync]], Bots, weitere Tools

**Installiere nicht 10 Dienste auf einmal.** Geh Schritt für Schritt vor – erst wenn einer stabil läuft, kommt der nächste dran

## Weiterführende Ressourcen

**Self-Hosted-Dienste entdecken:**

- awesome-selfhosted: [https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**In diesem Artikel erwähnte Projekte:**

- Vaultwarden: [https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync: [https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy: [https://ntfy.sh/](https://ntfy.sh/)
- Gatus: [https://gatus.io/](https://gatus.io/)
- AstrBot: [https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` eignet sich super, um zu schauen, „was man sonst noch selbst hosten kann“. `awesome-cloudflare` hilft dabei herauszufinden, „was gar nicht erst auf den VPS muss, sondern direkt bei Cloudflare laufen kann“

Auf einem eigenen Server muss man nicht alles selbst schultern. Alles, was Cloudflare Pages, Workers, R2 oder Tunnel übernehmen können, sollte man nicht auf Krampf in 2 GB RAM quetschen

---

## Zum Schluss

Ein 2C2G-Server eignet sich ideal als „Startpunkt für eigene Alltagsdienste“

Damit kannst du:

- Dich mit Linux, Docker, Reverse-Proxys, Domains und HTTPS vertraut machen
- Ein paar leichtgewichtige, aber nützliche Dienste betreiben
- Dir Gewohnheiten rund um Backups, Monitoring und Betrieb (Ops) aneignen

Damit kannst du nicht:

- Schwergewichtige Dienste ausführen
- Ihn als Produktivserver einsetzen
- Ein dediziertes NAS oder einen Medienserver ersetzen

Aber das reicht völlig aus

Ein Server ist nach dem Einrichten nicht einfach „fertig“ – er zwingt dich dazu, Backups, Sicherheit und Monitoring ernst zu nehmen. Und das ist eigentlich eine gute Sache

## Weiterlesen

Neben Cloud-Servern habe ich auch schon damit herumgebastelt, [[make-home-server|einen alten PC in eine Home-Cloud zu verwandeln]] – auch dafür kannst du dir aus dieser Liste passende Dienste heraussuchen

Wenn du deinen KI-Tools eigene Suchfähigkeiten verpassen willst, schau dir [[build-your-search-gateway|Aufbau und Workflow eines Search Gateways]] an und bastle einfach in die Richtung weiter, die du wirklich brauchst
