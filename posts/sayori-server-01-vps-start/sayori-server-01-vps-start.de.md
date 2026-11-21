---
title: Ich wollte eigentlich nur den Bot rund um die Uhr online halten – und habe dann einen Cloud-Server gekauft
published: 2026-05-25
created: 2026-05-25
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: Von Alibaba Cloud Studentengutscheinen über Ubuntu, SSH-Key-Login und unkonventionellen Ports bis zur Basis-Firewall – der erste Schritt zum eigenen Server.
image: ""
tags:
  - Praxistutorial
  - VPS und Self-Hosting
  - Alibaba Cloud
  - Offizielle Studentenangebote
category: "Anleitungen & Tutorials"
draft: false
lang: de
translationKey: "posts/sayori-server-01-vps-start/sayori-server-01-vps-start"
---

# Anfang

Eigentlich wollte ich gar kein Server-Setup aufziehen. Ich wollte nur, dass mein QQ-Bot rund um die Uhr online ist.

Lokal laufen lassen geht natürlich auch. AstrBot an, NapCat läuft mit, Dienste nicht schließen, Netz nicht abreißen lassen, den PC als Host nutzen.

![[Pasted image 20260609215751.png]]

So habe ich ganz natürlich verstanden, was ein Server überhaupt ist: ein Computer, der 24 Stunden läuft und in jemandes Rechenzentrum steht.

Da der Betreiber hier ein armer Student ist, habe ich natürlich meine KI-Armee losgeschickt, um kostenlose Wege zu finden )

Später sah ich, dass es für die Studentenverifizierung bei Alibaba Cloud einen 300-Yuan-Gutschein gibt – [Link zum Studentenangebot](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv), mitnehmen schadet nicht.

Danach gab es noch eine [ECS-Testversion](https://free.aliyun.com). Empfehle, erst mal das zu testen: Eine 2C2G-Konfiguration reicht völlig für Bots und läuft genau drei Monate.

![[Pasted image 20260609221047.png]]

Dieser 300-Yuan-Gutschein passt dann perfekt, um den Test-ECS auf ein Jahresabo umzustellen – ich habe das schon so umgestellt!

![[Pasted image 20260609221956.png]]

So gerechnet lässt sich im Grunde ein kostenloser Server für vier Jahre abstauben.

Allerdings beachten: Das kostenlose monatliche Traffic-Kontingent bei Alibaba Cloud beträgt auf dem chinesischen Festland wohl nur 20 GB. Für reine Bots reicht mir das, aber man sollte am besten eine Limit-Warnung setzen.

## Das erste Mal auf die Maschine kommen

Nach dem Serverkauf fängt das eigentliche Problem erst an: Wie komme ich da rein?

Die Konsole liefert eine öffentliche IP, den `root`-Nutzer und ein Anfangspasswort. Am direktesten ist es, sich zuerst einmal mit Passwort zu verbinden:

```powershell
ssh root@<VPS_PUBLIC_IP>
```

Beim ersten Verbinden wird gefragt, ob du dieser Maschine vertraust – erst prüfen, ob die IP stimmt, und dann `yes` eingeben.

Aber Passwort-Login taugt nur als Übergang. Für den echten Dauereinsatz empfehle ich, direkt auf SSH-Key-Login zu wechseln.

Ein Passwort ist wie ein Schlüssel unterm Fußabtreter. Praktisch ist es schon, aber Maschinen im öffentlichen Netz werden täglich gescannt. Standard-Port 22 plus Passwort-Login ist quasi wie zu allen Skripten im Internet zu sagen: „Klopf ruhig an.“

## SSH-Schlüssel erzeugen

Ich arbeite unter Windows und habe deshalb lokal erst mal ein eigenes SSH-Key-Paar für diesen Server erzeugt:

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

Einfach durchdrücken mit Enter geht auch. Wenn du den privaten Schlüssel noch extra absichern willst, setz eine Passphrase.

Danach liegen zwei Dateien vor:

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

Die ohne `.pub` ist der private Schlüssel – ~~falls du nicht weißt, wofür der gut ist, schick ihn mir~~, so kann ich mich per SSH bei dir einloggen 😈.

Die mit `.pub` ist der öffentliche Schlüssel, der auf den Server kommt.

Inhalt des öffentlichen Schlüssels anzeigen:

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

Die ganze Zeile kopieren, ab `ssh-ed25519` bis zum Kommentar am Ende.

## Den öffentlichen Schlüssel auf den Server legen

Das gerade geöffnete SSH-Fenster mit Passwort-Login noch nicht schließen und auf dem Server das SSH-Verzeichnis vorbereiten:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

Die komplette Zeile aus der lokalen `.pub` dort einfügen und speichern.

Danach Berechtigungen setzen:

```bash
chmod 600 ~/.ssh/authorized_keys
```

Dieser Schritt wirkt vielleicht seltsam, ist aber wichtig. Sind die Rechte zu offen, schaltet SSH direkt ab und ignoriert den Schlüssel komplett.

Anschließend lokal einen SSH-Alias anlegen. Dann musst du nicht jedes Mal eine lange Kette aus IP, Port und Schlüsselpfad tippen.

Öffnen:

```powershell
notepad $env:USERPROFILE\.ssh\config
```

Eintragen:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

Ein neues Terminal öffnen und testen:

```powershell
ssh sayori
```

Wenn die Verbindung direkt steht, klappt der Key-Login.

Achtung: in einem *neuen* Terminal testen. Das alte Passwort-SSH-Fenster bleibt erst mal offen – das ist wie ein Sicherungsseil, das man erst loslässt, wenn alles fertig umgestellt ist.

## Passwort abschalten und auf einen unkonventionellen Port wechseln

Wenn der Key-Login funktioniert, kannst du den Passwort-Login deaktivieren und SSH vom Standard-Port 22 wegziehen.

Erst einen unkonventionellen Port wählen, zum Beispiel:

```text
11451
```

Nicht einfach blind abschreiben. Such dir selbst einen Port zwischen 1024 und 65535, der mit keinem anderen Dienst kollidiert.

Dann zuerst in der Sicherheitsgruppe von Alibaba Cloud ECS diesen Port freigeben. Das ist wichtig.

Die UFW auf dem Server ist eine Tür, die Sicherheitsgruppe von Alibaba Cloud ist die nächste Tür. Änderst du nur den Server und nicht die Sicherheitsgruppe, kommst du über den neuen Port trotzdem nicht rein.

Nach dem Freigeben in der Sicherheitsgruppe zurück ins SSH-Fenster und eine eigene SSH-Konfigurationsdatei anlegen:

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

Inhalt:

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

`PermitRootLogin prohibit-password` heißt hier: `root` kann sich weiter per Key einloggen, aber nicht mehr per Passwort.

Sauberer wäre es, einen normalen Benutzer anzulegen und `root` ganz zu sperren. Hier zeige ich erst mal den schnellsten praxistauglichen Weg.

Nach der Änderung prüfen, ob die SSH-Konfiguration Syntaxfehler hat:

```bash
sshd -t
```

Keine Ausgabe ist eine gute Nachricht.

Dann den SSH-Dienst neu starten:

```bash
systemctl restart ssh
```

Das alte Fenster jetzt noch nicht schließen.

In der lokalen `~/.ssh/config` ebenfalls den Port anpassen:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

Dann ein drittes Terminal öffnen und testen:

```powershell
ssh sayori
```

Nur wenn das klappt, sind neuer Port, Key-Login und Sicherheitsgruppe durchgängig freigeschaltet.

Ich teste danach noch mal, ob der alte Passwort-Login wirklich zu ist – zum Beispiel ohne Private Key und manuell auf die IP.

Wenn er trotzdem nach einem Passwort fragt und reinlässt, greift `PasswordAuthentication no` nicht. Dann nicht vorschnell weitermachen, sondern erst die Ursache klären.

## Firewall einrichten

Wenn SSH stabil läuft, kommt die eigene Firewall auf dem Server dran.

Unter Ubuntu ist UFW am handlichsten:

```bash
apt update
apt install -y ufw
```

Regeln zuerst anlegen:

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

Falls du schon Webdienste starten willst, kannst du HTTP / HTTPS schon mal offen lassen:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

Dann aktivieren:

```bash
ufw enable
ufw status verbose
```

Auch hier empfehle ich, das alte SSH-Fenster noch offen zu halten. In einem neuen Terminal noch einmal verbinden:

```powershell
ssh sayori
```

Wenn das klappt, das alte Fenster schließen.

## Nach dem Verbinden erst mal die Maschine abtasten

Wenn die Verbindung wirklich stabil sitzt, kannst du kurz den Zustand der Maschine prüfen:

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

2C2G Arbeitsspeicher ist nicht viel – bei der Auswahl späterer Dienste muss man grundsätzlich auf Schlankheit achten.

Wenn es ohne Datenbank geht, dann ohne; wenn SQLite reicht, dann erst mal SQLite; was auf Cloudflare Pages passt, kommt nicht auf den VPS.

Auf dieser Maschine lief später nicht nur der Bot – Vaultwarden, ntfy, Gatus, Portainer und AI Search Gateway sind alle hier entstanden.

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/) – hier gibt es eine richtig gute Awesome-Sammlung dazu, wie man Server sinnvoll nutzen kann!

Rückblickend ist das Wertvollste an einem eigenen Server nicht ein bestimmter Dienst, sondern dass er dich zwingt, Netzwerk, Deployment, Sicherheit und Backups zu verstehen.

Wenn ich noch mal neu anfangen würde, hätte ich mir ein paar Gewohnheiten früher angewöhnt:

1. Für jeden Dienst ein eigenes Verzeichnis
2. Echte Secrets nur in `.env` oder Plattform-Secrets ablegen
3. Kopierbare Befehle direkt in die Doku schreiben
4. Nach jedem Deployment einen Prüf-Befehl festhalten

Soweit erst mal für diesen Teil. Der Server ist jetzt per SSH stabil erreichbar, der Passwort-Login ist aus, der Port ist gewechselt und die Firewall zieht die nötigsten Grenzen.

Im nächsten Teil geht es darum, wie man mit `scp` lokale Konfigurationen auf den Remote-Host bringt.

Das heißt, wir fangen endlich an, den Bot von „läuft auf meinem Rechner“ nach „läuft auch auf dem Server“ umzuziehen.

## Weiterlesen

Noch keine Maschine ausgesucht? Erst mal [[aliyun-student-300-voucher-guide|Alibaba Cloud Studentengutschein]] oder [[azure-students-100-credit-guide|Azure Japan Server]] ansehen; nach dem Verbinden geht es mit [[docker-compose-minimum-start|Docker Einstieg]] → [[2c2g-server-service-index|Diensteliste]] weiter – einfach einen Dienst aussuchen, den du selbst nutzt, und installieren.
