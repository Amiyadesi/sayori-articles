---
title: "Fast Note Sync auf dem Studenten-Server: Ein privater Sync-Layer für Obsidian"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Fast Note Sync Service auf einem 2C2G-Studenten-Server ausprobieren und eine private Route für Obsidian Multi-Device-Sync, Backups und REST/MCP-Schnittstellen offenhalten.
image: ""
tags:
  - Praxis-Guide
  - VPS & Self-Hosting
  - Docker
  - Obsidian
category: "Anleitungen & Tutorials"
draft: false
alias: ""
lang: de
translationKey: "posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server"
---

Ich schreibe meine Blogposts und Projektnotizen inzwischen alle in Obsidian – am Anfang aber nur auf dem Desktop. Als dort schon ein ganzer Berg lag, fiel mir auf, dass ich vom Handy aus gar nicht schreiben konnte. Also ging die Suche nach einem Sync-Dienst los.

Offizielles Obsidian Sync ist natürlich bequem, nur dein Geldbeutel findet es weniger entspannt. Syncthing, Git und WebDAV haben auch alle ihren Reiz, fühlten sich für mich aber irgendwie unpraktisch an.

Bis ich schließlich auf das Plugin Fast Note Sync gestoßen bin – ausgerechnet in den Kommentaren auf L. Es ist ein Obsidian-Plugin plus Self-Hosted-Server, gedacht für Echtzeit-Sync über mehrere Geräte, und packt obendrauf noch Versionsverlauf, Anhänge, Web-Verwaltung, REST API und MCP mit rein. Nach ein paar Tagen Einrichten und Testen muss ich sagen: läuft echt richtig gut b(￣▽￣)d

Plugin:

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

Server:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Obsidian-Plugin-Seite:

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## Für wen passt das?

Passt meiner Meinung nach zu diesen Leuten:

- Wer schon jede Menge in Obsidian geschrieben hat
- Wer einen kleinen Server hat, der 24/7 läuft
- Wer HTTPS, Reverse Proxy und Backups selbst regeln mag
- Wer jederzeit und überall Notizen schreiben will

So kannst du auch unterwegs ohne Laptop entspannt Artikel am Handy tippen und zu Hause synchronisiert sich der Rechner einfach nach.

## Server deployen

Das Server-Repo liegt hier:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Der Server ist in Go geschrieben; in der Repo-Beschreibung steht sinngemäß eine Plattform für Notiz-Sync, Online-Verwaltung und Remote-REST-API mit hoher Performance und niedriger Latenz.

Ich lege zuerst ein Verzeichnis an:

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

Und deploye dann laut offizieller Doku per Docker, Binary oder aus dem Source. Egal wie: Ich lasse den Dienst am liebsten nur lokal lauschen und mache HTTPS über Reverse Proxy oder Tunnel.

Die Grundidee ist:

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

Bei Docker Compose halte ich mich mindestens an diese Gewohnheiten:

- Datenverzeichnis ins aktuelle Service-Verzeichnis persistieren
- Konfigurationsdateien nicht in öffentliche Repos schieben
- Service-Ports nicht direkt ins öffentliche Netz öffnen
- Vor Updates das Datenverzeichnis sichern

Im Sync-Dienst stecken deine Notizen – die sollten nicht ungeschützt im Wind stehen.

## Domain anbinden

Du kannst Caddy oder Nginx nehmen oder auch Cloudflare Tunnel.

Zum Beispiel eine Domain wie:

```text
notes.example.com
```

Struktur:

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

Falls du noch keine Domain hast, schau erstmal hier rein:

[[free-domain-and-web-community|Einem frisch aufgesetzten Blog eine kostenlose Domain verpassen und in der Webmaster-Community Hallo sagen]]

Direkten Zugriff auf so etwas empfehle ich eher nicht:

```text
http://服务器IP:<服务端口>
```

Mindestens HTTPS sollte es sein, am besten noch mit Zugriffsschutz oben drauf.

## Account und Plugin initialisieren

Der Ablauf aus dem Server-README sieht grob so aus:

1. Web-Oberfläche öffnen
2. Beim ersten Aufruf einen Account registrieren
3. Im Backend die API-Konfiguration kopieren
4. In den Obsidian-Plugin-Einstellungen die Konfiguration einfügen

Von den GitHub Releases lädst du `main.js`, `styles.css` und `manifest.json` manuell herunter und legst sie in:

```text
.obsidian/plugins/fast-note-sync/
```

Dann startest du es auf der Plugin-Seite – dafür musst du im Webinterface ein Token erzeugen und kopieren und in der Remote-Konfiguration einfügen. Nach einem kurzen Moment läuft es normalerweise.

## Backups sind wichtiger als Sync

Sync ist kein Backup.

Der Satz muss mal allein stehen. Sync synchronisiert auch Löschungen und synchronisiert auch Fehler.

Fast Note Sync bringt selbst Versionsverlauf, Papierkorb, Backup, Mirror und Git-Sync mit, aber ein eigenes Sicherheitsnetz schadet trotzdem nicht.

Wenn du Obsidian schon per Git synchronisierst, leg nicht einfach direkt noch einen Echtzeit-Sync drüber – klär erst, was Haupt-Sync und was Backup ist.

## Wie sehe ich MCP und REST API?

Fast Note Sync Service unterstützt inzwischen auch REST API und MCP.

Das reizt mich ziemlich. Weil viele meiner Inhalte in Obsidian liegen, wäre das nicht mehr nur ein Sync-Tool, sondern ein Einstieg in die persönliche Wissensdatenbank, wenn KI-Clients später über kontrollierte Schnittstellen Notizen lesen und schreiben können.

Genau darin steckt aber auch das Risiko.

Wenn eine KI deine Notizen lesen und schreiben kann, müssen die Berechtigungsgrenzen sauber gezogen sein:

- MCP-Schnittstelle nicht ins öffentliche Netz exponieren
- Keine Schreibrechte für nicht vertrauenswürdige Clients vergeben
- Private Tagebücher, Zugangsdaten und Keys nicht in einem offenen Vault mischen
- Wichtige Vaults erst nur lesend einbinden und Schreiben erst nach getestetem Ablauf erwägen

„Kann an eine KI angebunden werden“ ist kein Grund, sofort alle Rechte sperrangelweit zu öffnen.

## Macht das auf 2C2G viel Last?

Bei normaler privater Nutzung sollte das passen.

Was wirklich Ressourcen frisst, sind die Anzahl der Anhänge, die Sync-Frequenz und ob du eine zig Gigabyte schwere Asset-Sammlung in Obsidian stopfst.

## Weiterlesen

Wenn die Notizen über mehrere Geräte synchron sind und du öffentliche Artikel daraus zum Blog machen willst, schau bei [[astro-mizuki-blog-from-zero|Schlichtes Blog-Template]]; für Einstieg und HTTPS geht es weiter bei [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]], und für andere Server-Zwecke zurück zur [[2c2g-server-service-index|Service-Übersicht]].
