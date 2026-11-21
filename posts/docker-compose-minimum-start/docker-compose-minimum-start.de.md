---
title: "Docker und Docker Compose Minimal-Einstieg: YAML-Dateien verstehen"
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: "Ein minimaler Docker-Einstieg für alle, die gerade einen Server bekommen haben: Was ist ein Container, wie liest man Compose-Dateien, wie startet, stoppt, aktualisiert und löscht man sie – keine Theorie, nur das, was man wirklich braucht."
image: ""
tags:
  - Praxistutorial
  - Docker
  - VPS und Self-Hosting
  - Einstieg
category: "Anleitungen & Tutorials"
draft: false
lang: de
translationKey: "posts/docker-compose-minimum-start/docker-compose-minimum-start"
alias: ""
---

Wenn du dir meine anderen Artikel anschaust, wirst du feststellen, dass fast jeder Self-Hosting-Dienst über Docker läuft.

Vaultwarden, ntfy, Gatus, Fast Note Sync – alles wird mit einer einzigen `docker-compose.yml`-Datei erledigt.

Dieser Artikel behandelt: Wie man Docker installiert, nachdem man einen Server erhalten hat, wie man Compose-Dateien versteht und wie man Container startet, stoppt, aktualisiert und löscht. Das reicht aus, um alle vorherigen Dienste zum Laufen zu bringen.

## Was ist Docker? (Die Ein-Satz-Version)

Mit Docker kannst du Dienste direkt über vorgefertigte „Images“ von anderen ausführen, ohne Abhängigkeiten mühsam einzeln auf deinem System installieren zu müssen.

Du musst nicht manuell Python, Go oder Node installieren, Umgebungsvariablen konfigurieren oder Versionskonflikte lösen. Im Image ist bereits alles enthalten.

Eine `docker-compose.yml` ist einfach eine Konfigurationsdatei, die Docker Folgendes sagt:

- Welches Image gezogen werden soll
- Welche Ports verwendet werden sollen
- Welche Verzeichnisse gemountet werden sollen
- Welche Umgebungsvariablen gesetzt werden sollen
- Ob der Container bei einem Fehler automatisch neu gestartet werden soll

## Installation

Docker auf Ubuntu / Debian installieren:

```bash
curl -fsSL https://get.docker.com | sh
```

Dieses Ein-Klick-Skript installiert die Docker Engine und Docker Compose (mittlerweile ist Compose ein Unterbefehl von Docker, `docker-compose` muss nicht mehr separat installiert werden).

Nach der Installation überprüfen:

```bash
docker --version
docker compose version
```

Wenn du Docker nicht mit `sudo` ausführen möchtest:

```bash
sudo usermod -aG docker $USER
```

Melde dich dann ab und wieder an. Wenn es immer noch nicht funktioniert, starte den Server neu.

## Die erste Compose-Datei

Schauen wir uns ein ganz einfaches Beispiel an:

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

Zeile für Zeile übersetzt:

| Zeile | Bedeutung |
| --- | --- |
| `services:` | Definiert die Liste der Dienste unten |
| `whoami:` | Dienstname, kann beliebig gewählt werden |
| `image: traefik/whoami` | Verwendet dieses Image |
| `container_name: whoami` | Der Container heißt whoami |
| `restart: unless-stopped` | Startet bei einem Absturz automatisch neu, es sei denn, du stoppst ihn manuell |
| `ports: - "127.0.0.1:8080:80"` | Mappt Port 8080 auf dem Host auf Port 80 des Containers |

Speichere diesen Abschnitt als `docker-compose.yml` (oder `compose.yml` – beide Namen funktionieren) und führe ihn im selben Verzeichnis aus:

```bash
docker compose up -d
```

`-d` dient dem Ausführen im Hintergrund.

Überprüfen:

```bash
curl http://127.0.0.1:8080/
```

Wenn du eine Rückmeldung siehst, läuft das Ding.

## Häufig verwendete Befehle

Hier sind die Befehle, die ich am häufigsten nutze:

```bash
# 启动（后台）
docker compose up -d

# 查看日志
docker compose logs -f

# 查看日志（只看最后 100 行）
docker compose logs --tail=100

# 停止
docker compose down

# 重启
docker compose restart

# 查看状态
docker compose ps

# 进入容器内部（排查问题时用）
docker compose exec whoami sh
```

Alle Befehle müssen in dem Verzeichnis ausgeführt werden, in dem sich die `docker-compose.yml` befindet.

## Echte Compose-Dateien verstehen

Nehmen wir Vaultwarden als Beispiel:

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

Neuartige Elemente:

| Feld | Bedeutung |
| --- | --- |
| `environment:` | Umgebungsvariablen, entsprechen Konfigurationseinstellungen |
| `volumes: - ./vw-data:/data` | Mountet den Ordner `vw-data` im aktuellen Verzeichnis in den Container nach `/data` |

### environment

Umgebungsvariablen sind die Art und Weise, wie die meisten Docker-Dienste konfiguriert werden.

Verschiedene Dienste haben unterschiedliche Variablen; Vaultwarden verwendet beispielsweise `DOMAIN`, `SIGNUPS_ALLOWED`, während ntfy `NTFY_BASE_URL`, `NTFY_AUTH_DEFAULT_ACCESS` nutzt.

In der Dokumentation des jeweiligen Projekts kannst du nachlesen, welche Variablen unterstützt werden.

### volumes

Volumes sind der Schlüssel zur Datenpersistenz.

Wenn ein Container gelöscht wird, verschwinden die Dateien im Inneren des Containers. Aber die über volumes gemounteten Verzeichnisse befinden sich auf dem Host-System und verschwinden nicht zusammen mit dem Container. Das ist im Grunde wie ein Spielstand: Jeder Neustart des Containers lädt den Spielstand und das Spiel geht weiter (lacht).

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

Das bedeutet:

- Dateien unter `/data` im Container befinden sich tatsächlich in `./vw-data` auf dem Host.
- Wenn du den Container löschst und neu erstellst, bleiben die Daten erhalten.
- Für ein Backup musst du lediglich `./vw-data` auf dem Host sichern.

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1` bedeutet, dass nur der lokale Rechner darauf zugreifen kann. Von außen ist kein Zugriff möglich.

Wenn du `"0.0.0.0:8080:80"` oder `"8080:80"` schreibst, ist der Dienst direkt aus dem öffentlichen Internet erreichbar.

Verwende für Dinge wie Passwort-Manager oder Admin-Panels immer `127.0.0.1` und exponiere sie stattdessen über einen Reverse Proxy oder ein Tunnel-Tool mit HTTPS.

## Sensible Daten in einer .env-Datei ablegen

Schreibe Passwörter, Token und Domains nicht direkt in die `docker-compose.yml` und pushe sie dann zu GitHub.

Erstelle im selben Verzeichnis eine `.env`-Datei:

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

Referenziere sie dann in der Compose-Datei:

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

Füge die `.env`-Datei zu deiner `.gitignore` hinzu, damit sie nicht im Repository landet.

## Dienste aktualisieren

So aktualisierst du einen Dienst:

```bash
cd /srv/stacks/vaultwarden

# 先备份数据
tar -czf backup-$(date +%F).tar.gz vw-data

# 拉新镜像
docker compose pull

# 用新镜像重启
docker compose up -d

# 看日志确认正常
docker compose logs --tail=50
```

Erstelle vor dem Update immer ein Backup. Falls etwas schiefgeht, kannst du ein Rollback durchführen.

## Dienste löschen

Wenn du einen Dienst nicht mehr haben möchtest:

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down` löscht nur den Container, nicht aber die Volume-Daten.

Wenn du alles inklusive Volumes gründlich bereinigen möchtest:

```bash
docker compose down -v
```

Das löscht jedoch auch die Daten. Verwende das erst, wenn du sicher bist, dass du sie nicht mehr brauchst.

## Speicherplatz freigeben

Wenn man Docker lange Zeit nutzt, sammeln sich viele alte Images an. Da ein 2C2G-Server nicht viel Speicherplatz hat, sollte man gelegentlich aufräumen:

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

`prune` bereinigt nur Dinge, die gerade nicht verwendet werden; laufende Dienste sind davon nicht betroffen. Überlege dir `--volumes` jedoch gut, bevor du es einsetzt.

## Meine Verzeichnisstruktur

Ich habe mir folgende Struktur angewöhnt:

```text
/srv/stacks/
├── vaultwarden/
│   ├── docker-compose.yml
│   ├── .env
│   └── vw-data/
├── ntfy/
│   ├── docker-compose.yml
│   ├── .env
│   ├── cache/
│   ├── data/
│   └── etc/
├── gatus/
│   ├── docker-compose.yml
│   └── config/
└── fast-note-sync/
    ├── docker-compose.yml
    ├── .env
    └── storage/
```

Ein Verzeichnis pro Dienst. Man wechselt in das Verzeichnis und kann `docker compose up -d` ausführen. Daten und Konfigurationen liegen sauber in ihrem eigenen Ordner, was Backups unkompliziert macht.

## Häufige Probleme

**Portkonflikte**

Zwei Dienste können denselben Host-Port nicht gleichzeitig belegen. Wenn Vaultwarden Port 8080 verwendet, muss ntfy einen anderen nehmen, beispielsweise 8090.

**Berechtigungsprobleme**

Einige Images laufen im Container als Nicht-Root-Benutzer. Wenn die Berechtigungen des gemounteten Verzeichnisses nicht stimmen, schlägt das Schreiben fehl. Überprüfe in diesem Fall den Besitzer und die Berechtigungen des Host-Verzeichnisses.

**Vergessen von -d**

Wenn du `docker compose up` ohne `-d` ausführst, stoppt der Dienst, sobald du das Terminal schließt. Denk an das `-d`.

**Compose v1 vs. v2**

`docker-compose up` (mit Bindestrich) aus alten Tutorials ist v1. Heute verwendet man `docker compose up` (mit Leerzeichen) für v2. Frisch installierte Systeme verwenden alle v2 – falls du also auf ein altes Tutorial mit Bindestrich stößt, ersetze ihn einfach durch ein Leerzeichen.

## Das reicht völlig aus

An diesem Punkt bist du in der Lage:

- Docker zu installieren
- Compose-Foren und -Dateien zu verstehen
- Dienste zu starten, zu stoppen, zu aktualisieren und zu löschen
- Daten und Konfigurationen zu verwalten
- Den Speicherplatz aufzuräumen

Für jeden weiteren Artikel über Self-Hosting-Dienste musst du mir nur eine `docker-compose.yml` geben, und du kannst den Dienst sofort starten.

Du musst nicht von Anfang an jedes einzelne Konzept von Docker verstanden haben. Fang einfach an, es zu nutzen – mit der Zeit kommt das Interesse an den tieferen Details ganz von selbst.

## Weiterlesen

Wähle zuerst einen Anwendungsfall aus der [[2c2g-server-service-index|Server-Dienste-Liste]], starte dann [[selfhost-ntfy-on-2c2g|ntfy Benachrichtigungen]], [[selfhost-vaultwarden-on-2c2g|Vaultwarden Passwort-Manager]] oder [[fast-note-sync-on-student-server|Obsidian Sync]], und richte Domain sowie Zugriff über [[cloudflare-free-tier-developer-guide|Cloudflare]] ein.
