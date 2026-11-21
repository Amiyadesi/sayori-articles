---
title: "ntfy auf dem 2C2G-Studentenserver betreiben: Ein Benachrichtigungsbutton für dich selbst"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: Bereitstellung des ntfy-Push-Dienstes auf einem Studentenserver mit Docker, damit Backup-Skripte, Monitoring und Cronjobs Benachrichtigungen aufs Handy senden können.
image: ""
tags:
  - Praktische Anleitung
  - VPS und Self-Hosting
  - Docker
  - Push-Benachrichtigungen
category: "Anleitungen & Tutorials"
draft: false
alias: ""
lang: de
translationKey: "posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g"
---

ntfy ist einer der unauffälligsten, aber nützlichsten Dienste auf meinem Server.

Was es tut, ist denkbar einfach: Du sendest einen Satz per HTTP-Request an den Dienst, und er leitet ihn an dein Smartphone weiter – im Grunde ein reiner Push-Kanal.

Doch die Einsatzmöglichkeiten dieses Kanals sind vielfältiger, als man denkt:

- Ein Backup-Skript ist durchgelaufen und teilt dir Erfolg oder Misserfolg mit.
- Eine Serverkosten-Warnung wird ausgelöst und erinnert dich daran, nachzusehen.
- Ein Cronjob schlägt fehl, und du bekommst eine Benachrichtigung.
- Gatus stellt fest, dass ein Dienst ausgefallen ist, und benachrichtigt dich.
- Ein Zertifikat läuft bald ab und erinnert dich daran.
- Du kannst auch benutzerdefinierte Befehle senden, um temporäre Fernsteuerungen zu realisieren.

Offizielles Projekt:

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

Offizielle Dokumentation:

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## Warum selbst hosten?

ntfy bietet einen offiziellen öffentlichen Server `ntfy.sh`, den man nutzen kann, ohne irgendetwas zu installieren.

Ich habe mich dennoch für das Self-Hosting entschieden, aus folgenden Gründen:

- Die Topics auf dem öffentlichen Server sind öffentlich. Jeder, der den Namen deines Topics kennt, kann Nachrichten hineinsenden.
- Beim Self-Hosting kann man eine Benutzerauthentifizierung hinzufügen.
- Beim Self-Hosting lassen sich Vorratsspeicherung und Logs kontrollieren.
- Der Studentenserver hat ohnehin noch Platz, und ntfy ist extrem leichtgewichtiger Natur.

Wenn du es nur mal kurz ausprobieren möchtest, ist das öffentliche `ntfy.sh` völlig in Ordnung. Für die langfristige Nutzung fährt man mit dem Selbsthosten jedoch beruhigter.

## Bereitstellung

Verzeichnis vorbereiten:

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

`docker-compose.yml` schreiben:

```yaml
services:
  ntfy:
    image: binwiederhier/ntfy
    container_name: ntfy
    restart: unless-stopped
    command: serve
    environment:
      TZ: Asia/Shanghai
      NTFY_BASE_URL: "https://ntfy.example.com"
      NTFY_AUTH_DEFAULT_ACCESS: "deny-all"
    volumes:
      - ./cache:/var/cache/ntfy
      - ./data:/var/lib/ntfy
      - ./etc:/etc/ntfy
    ports:
      - "127.0.0.1:8090:80"
```

Ein paar wichtige Punkte:

- Port `127.0.0.1:8090:80`: Lauscht nur lokal auf dem Host. Nicht direkt ins öffentliche Internet freigeben.
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`: Lehnt standardmäßig alle unauthentifizierten Anfragen ab. Auf diese Weise kannst nur du selbst (mit Token oder Zugangsdaten) Nachrichten senden und empfangen.
- `NTFY_BASE_URL`: Trage hier deine letztendlich genutzte Domain ein, bei mir ist das beispielsweise `ntfy.sayori.org`.

## Starten

```bash
docker compose up -d
docker compose logs -f
```

Lokale Überprüfung:

```bash
curl http://127.0.0.1:8090/
```

Es reicht aus, wenn die Antwort der Web-Oberfläche von ntfy sichtbar ist.

## Benutzer erstellen

Da wir `deny-all` eingerichtet haben, müssen wir einen Benutzer für den Eigengebrauch anlegen:

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

Dabei wirst du zur Eingabe eines Passworts aufgefordert. Merke dir diesen Benutzernamen und das Passwort, da du sie später zum Senden von Benachrichtigungen und in der Smartphone-App benötigst.

Alternativ lässt sich auch ein Token generieren:

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

Ein Token ist praktischer als ein Passwort und kann direkt im Header eines Skripts verwendet werden.

## Domain anbinden

Genau wie bei Vaultwarden läuft das über einen Cloudflare Tunnel oder einen Caddy/Nginx-Reverse-Proxy.

Cloudflare-Tunnel-Weg:

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

Sobald du sichergestellt hast, dass HTTPS ordnungsgemäß funktioniert, öffnest du `https://ntfy.example.com` und meldest dich mit den eben erstellten Zugangsdaten an der Web-Oberfläche an.

## Erste Benachrichtigung senden

Der einfachste Weg:

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

Hierbei ist `/test` der Name des Topics. Du kannst dir einen beliebigen Namen ausdenken, wie zum Beispiel `/backup`, `/alert` oder `/server`.

Es lassen sich auch Titel und Priorität übergeben:

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## Smartphone-App

Android:

- Der ntfy-Client ist auf F-Droid verfügbar.
- Auch im Google Play Store zu finden.

iOS:

- Im App Store nach ntfy suchen.

Nach dem Öffnen der App:

1. Füge in den Einstellungen die Adresse deines selbst gehosteten Servers hinzu.
2. Trage Benutzernamen und Passwort oder das Token ein.
3. Abonniere dein Topic (wie `backup` oder `alert`).

Die vom Server ausgehenden Benachrichtigungen werden fortan direkt auf dein Smartphone gepusht.

## In Skripten verwenden

Am Ende des Backup-Skripts eine Zeile hinzufügen:

```bash
NTFY_URL="https://ntfy.example.com/backup"
NTFY_TOKEN="你的token"

# 备份成功时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ✅ 备份成功" \
     -d "Vaultwarden 备份完成 $(date +%F)" \
     "$NTFY_URL"

# 备份失败时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ❌ 备份失败" \
     -H "Priority: high" \
     -d "Vaultwarden 备份出错，请检查日志" \
     "$NTFY_URL"
```

Benachrichtigung bei fehlgeschlagenen Cronjobs:

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## Zusammenspiel mit Gatus

Wenn du Gatus für Health Checks betreibst, kannst du ntfy in der Gatus-Konfiguration als Benachrichtigungskanal hinterlegen.

Gatus unterstützt nativ ntfy-Warnungen – trage dazu einfach die Serveradresse, das Topic und das Token in die Konfiguration ein.

Fällt ein Dienst aus, sendet Gatus automatisch eine Benachrichtigung an ntfy, und dein Handy klingelt.

## Ressourcenverbrauch

ntfy ist extrem leichtgewichtig.

Wenn es auf meinem Server läuft, liegt die Speicherauslastung im Alltag bei etwa 20-30 MB. Die CPU-Auslastung geht gegen Null. Für eine 2C2G-Instanz ist das absolut keine Last.

Es wird keine Datenbank benötigt. Nachrichten werden in lokalen Dateien zwischengespeichert und laufen nach einer voreingestellten Zeit automatisch ab.

## Hinweise

- Schreibe das ntfy-Token niemals in ein öffentliches Repository.
- Falls du `deny-all` eingestellt hast, aber bestimmte externe Dienste (wie Gatus, die von derselben Maschine aus senden) Benachrichtigungen ohne Authentifizierung übermitteln müssen, kannst du die Berechtigungen für bestimmte Topics separat öffnen.
- Nachrichten werden nicht dauerhaft gespeichert. Wenn du eine Historie benötigst, muss der Sender selbst Protokolle führen.
- Die Web-Oberfläche von ntfy muss nicht im öffentlichen Internet freigegeben werden. Für das Abonnieren reicht die API für die Smartphone-App völlig aus.

## Eignet es sich für 2C2G?

Hervorragend. Es ist vermutlich einer der Dienste mit dem besten Preis-Leistungs-Verhältnis auf 2C2G.

Sobald es eingerichtet ist, wirst du feststellen, dass fast jedes Skript am Ende darauf hinausläuft, „einfach kurz eine Benachrichtigung über das Ergebnis zu schicken“. Das ist deutlich entspannter, als sich jeden Tag per SSH einzuloggen, um die Logs zu prüfen.

Außerdem unterstützt ntfy solche kleinen Befehle: Der Blog-Betreiber sendet beispielsweise die Moderation von Blog-Kommentaren über ntfy an sich selbst. Zum Löschen wählt man `/delete Kommentar-ID`, zum Wiederherstellen `/recover Kommentar-ID` oder Ähnliches.

## Weiterlesen

Für Domain und HTTPS kannst du mit [[free-domain-and-web-community|Domain-Anleitung]] und [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]] fortfahren; sobald der Benachrichtigungskanal steht, lassen sich auch die Backup-Ergebnisse von [[selfhost-vaultwarden-on-2c2g|Vaultwarden]] aufs Handy pushen, während du für andere Zwecke zur [[2c2g-server-service-index|Diensteliste]] zurückkehren kannst.
