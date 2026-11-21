---
title: "Vaultwarden auf einem 2C2G-Studentenserver aufsetzen: Den Passwort-Tresor nicht nackt ins Netz stellen"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: Vaultwarden mit Docker Compose auf einem Studentenserver deployen und die wirklich wichtigen Punkte wie HTTPS, Registrierung schließen, Backup und Wiederherstellungstests sauber erklären.
image: ""
tags:
  - Praxis-Tutorial
  - VPS und Self-Hosting
  - Docker
  - Vaultwarden
category: "Anleitungen & Tutorials"
draft: false
alias: ""
lang: de
translationKey: "posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g"
---

Vaultwarden gehört wohl zu den Diensten, die am besten auf einen kleinen 2C2G-Server passen

Es ist schlank und das Client-Ökosystem ist ausgereift – Handy, Computer und Browser-Plugins lassen sich direkt über offizielle Bitwarden-Clients verbinden

Gleichzeitig ist es einer der Dienste, bei denen ich am wenigsten zum lockeren Rumspielen rate

Wenn der Blog crasht, kann man ihn neu aufbauen; wenn beim Passwort-Tresor etwas schiefgeht, sind Accounts, 2FA, Panel-Passwörter und im Zweifel der Zugang zu all deinen weiteren Servern weg

Deshalb geht es hier nicht um irgendwelchen Schnickschnack, sondern um einen Ansatz, der für den Alltag reicht:

1. Mit Docker Compose starten
2. Nur über HTTPS nach außen freigeben
3. Direkt nach der Registrierung die Registrierung wieder schließen
4. Backup und Wiederherstellung nicht aufschieben

Offizielles Projekt:

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Compose-Doku:

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## Für wen passt das

Passt aus meiner Sicht zu diesen Leuten:

- du hast schon einen eigenen kleinen Server
- du willst deine Passwortdaten selbst in der Hand behalten
- du bist bereit, den Dreckskram wie HTTPS, Backups und Updates anzupacken

Wenn du einfach nur Ruhe haben willst, sind das offizielle Bitwarden-Hosting, 1Password oder der Apple Passwörter-Manager alle super

Der Vorteil von Vaultwarden ist nicht null Wartungsaufwand, sondern dass es leichter ist, freier – und besser zu den kleinen Kisten von chronisch pleiten Studierenden passt

## Das brauchst du vorab

- einen VPS, auf dem Docker läuft
- eine Domain oder zumindest einen stabilen HTTPS-Einstieg
- Docker und Docker Compose
- grundlegende Kenntnisse zu SSH, Reverse Proxy und Firewall

Falls Docker noch nicht installiert ist, schau zuerst in [[docker-compose-minimum-start|Docker und Docker Compose Minimal-Einstieg: Diese yml-Dateien verstehen]]

Falls noch keine Domain eingerichtet ist, schau zuerst in [[free-domain-and-web-community|Dem frisch aufgesetzten Blog eine kostenlose Domain geben und in der Webmaster-Community kurz Hallo sagen]]

## Verzeichnis anlegen

Ich packe das Ganze wieder unter `/srv/stacks`

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

Die Verzeichnisstruktur sieht ungefähr so aus:

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

Später landen Datenbank, Anhänge und so weiter genau in `vw-data`

## Zuerst die Compose-Datei schreiben

```yaml
services:
  vaultwarden:
    image: ghcr.io/dani-garcia/vaultwarden:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true"
      INVITATIONS_ALLOWED: "false"
      ENABLE_WEBSOCKET: "true"
      TZ: "Asia/Shanghai"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

Ersetze `vault.example.com` durch deine eigene Domain

Wichtig ist hier vor allem diese Zeile:

```text
127.0.0.1:8080:80
```

Das heißt: Vaultwarden lauscht nur lokal auf `8080`

Aus dem öffentlichen Netz kommt man nicht direkt drauf, sondern nur über Nginx, Caddy oder Cloudflare Tunnel

Schreib es nicht gleich so:

```text
0.0.0.0:8080:80
```

Einen Passwort-Tresor direkt nackt auf einen öffentlichen HTTP-Port zu legen, ist keine gute Idee

Ein paar Variablen kurz erklärt:

- `DOMAIN`: die finale HTTPS-Adresse, unter der später zugegriffen wird
- `SIGNUPS_ALLOWED`: bei der ersten Registrierung kurz anmachen, danach sofort wieder aus
- `INVITATIONS_ALLOWED`: für den Eigengebrauch direkt aus; wenn du jemanden einladen willst, geht es damit
- `ENABLE_WEBSOCKET`: einfach anlassen, dann fühlt sich die Client-Synchronisation halbwegs normal an

## Starten

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

Kurz lokal prüfen:

```bash
curl -I http://127.0.0.1:8080/
```

Wenn ein Statuscode zurückkommt, lebt der Container

Fertig ist es damit aber noch nicht – denn das eigentliche Thema ist HTTPS

## Reverse Proxy und HTTPS

So etwas wie Vaultwarden sollte nicht dauerhaft auf HTTP laufen

Sicherheitskontext im Browser, Passwort-Manager-Clients und am Ende auch dein eigenes Bauchgefühl verlangen, dass du HTTPS sauber hinbekommst

Ich entscheide mich meist für einen von zwei Wegen

### Weg A: Caddy / Nginx

Passt, wenn die Domain direkt auf den Server zeigt und 80 sowie 443 offen sein dürfen

Caddy ist am bequemsten:

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

Um die Zertifikate kümmert er sich selbst

Nginx geht genauso; die Grundidee ist dieselbe, nämlich `https://vault.example.com` auf `127.0.0.1:8080` weiterzuleiten

```nginx
server {
    listen 80;
    server_name vault.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vault.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        client_max_body_size 525M;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Nach dem Ändern nicht vergessen zu prüfen:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Weg B: Cloudflare Tunnel

Wenn der Ursprungsserver gar nicht erst 80 und 443 öffnen soll, ist ein Tunnel angenehmer

Der Aufbau sieht dann so aus:

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

Genau das nutze ich selbst

Und grundsätzlich gilt: Leg nicht über den gesamten Vaultwarden eine Cloudflare-Access-Login-Seite

Für Browser-Plugins und Mobile-Clients ist das unpraktisch

Wenn du extra absichern willst, schütze lieber gezielt nur `/admin`

## Direkt nach der ersten Registrierung die Registrierung schließen

Nach dem ersten Öffnen von `https://vault.example.com` legst du zuerst deinen eigenen Hauptaccount an

Direkt danach die Config anpassen:

```yaml
SIGNUPS_ALLOWED: "false"
```

Und dann neu starten:

```bash
docker compose up -d
```

Glaub nicht, deine Domain sei zu unscheinbar – öffentliche Dienste werden früher oder später gescannt

## Was nach dem Anlegen des Accounts als Erstes kommt

- ein wirklich starkes Master-Passwort setzen
- Zwei-Faktor-Authentifizierung aktivieren
- Passwörter erst importieren, wenn HTTPS sauber läuft
- vor dem Import aus dem alten Passwort-Manager ein Offline-Backup exportieren

Und noch ein sehr pragmatischer Punkt:

Wirf nicht unüberlegt SSH-Keys vom Server, Panel-Passwörter oder irgendwelche Root-Zugangsdaten in einen Passwort-Tresor, dessen Backup-Strategie noch nicht steht

Erst aufsetzen, dann nach und nach umziehen

## Backup

Die wichtigsten Daten von Vaultwarden liegen hier:

```text
/srv/stacks/vaultwarden/vw-data
```

Am einfachsten lässt du erst ein internes Backup erstellen und packst dann das ganze Verzeichnis zusammen

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

Falls du `.env`, SMTP, Admin-Tokens oder Ähnliches nutzt, sichere das gleich mit – aber wirf es nicht in ein öffentliches Repo

Danach das Backup lokal ziehen oder auf eine andere Maschine synchronisieren

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

Lass es nicht nur auf demselben Server liegen

Ein Backup auf derselben Maschine ist oft so gut wie gar kein Backup

## Wiederherstellungstests

Nur sichern zu können, aber nicht wiederherstellen zu können, ist ziemlich riskant

Du solltest zumindest ab und zu prüfen, ob im Backup-Archiv überhaupt etwas drin ist:

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

Normalerweise solltest du das hier sehen:

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

Im Ernstfall beim Wiederherstellen erst den Dienst stoppen und dann die alten Daten wegschieben:

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

Nach dem Wiederherstellen mindestens vier Dinge prüfen:

- Weboberfläche öffnet sich
- eigener Login klappt
- Einträge sind noch da
- Browser-Plugin und Handy synchronisieren

Warte nicht, bis es wirklich knallt, um zum ersten Mal eine Wiederherstellung zu üben

## Updates

Vor dem Update erst sichern – da nicht faul sein

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

Nach dem Update nicht nur ins Log schauen, sondern Web und Clients selbst kurz antesten

## Passt es zu 2C2G?

Passt super

Vaultwarden braucht kaum Ressourcen, auf 2C2G läuft es ganz entspannt

Die wahren Kosten stecken nicht in CPU und RAM, sondern in den Wartungsgewohnheiten:

- HTTPS
- Registrierung schließen
- Backup
- Wiederherstellung
- Update

Wenn du deinen Self-Hosting-Weg ernsthaft starten willst, taugt es sogar ziemlich gut als erster ernsthafter Dienst

Der Komfortgewinn durch einen eigenen Passwort-Tresor ist schwer vorstellbar, und sich einen eigenen Tresor zusammenzubasteln ist auch ein guter Einstieg ins Deployment

## Weiterlesen

Domain und HTTPS für den Passwort-Tresor lassen sich mit [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]] kombinieren, die Ergebnisse des Backup-Skripts über [[selfhost-ntfy-on-2c2g|ntfy]] aufs Handy schicken und andere schlanke Dienste in der [[2c2g-server-service-index|Liste leichter Dienste für kleine Server]] unterbringen
