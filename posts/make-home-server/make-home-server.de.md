---
title: Alten Win7-PC in einen Homeserver umbauen – ein Erfahrungsbericht
published: 2026-08-09
created: 2026-08-09
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: Von Grund auf einen alten Win7-PC zu Hause in einen Linux-Server verwandeln – nach dem Lesen kannst du direkt selbst loslegen
image: ""
tags:
  - Praxis-Tutorial
  - VPS & Self-Hosting
  - Docker
  - Homeserver
category: "Anleitungen & Tutorials"
draft: false
alias: ""
lang: de
translationKey: "posts/make-home-server/make-home-server"
---
# Vorgeschichte
Als ich in den Semesterferien nach Hause kam und mit meiner Familie gequatscht habe, stellte sich heraus, dass zu Hause noch ein alter Win7-PC herumsteht, den niemand mehr benutzen wollte. Da kam mir sofort die Idee, mir daraus einen kleinen Homeserver einzurichten. Nachdem ich mich Schritt für Schritt ausführlich von einer KI habe anleiten lassen, hat die Einrichtung tatsächlich geklappt – inklusive Einbindung in mein eigenes Tailscale-Netzwerk. Grund genug, das Ganze hier mal festzuhalten.
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# Der komplette Ablauf

## Vorbereitung

Besorg dir einen kleinen USB-Stick mit mindestens 4 GB Speicher, um daraus einen Ubuntu-Installationsstick zu machen. Lade dir zuerst die aktuelle LTS-Version von der [offiziellen Ubuntu-Server-Website](https://ubuntu.com/download/server) herunter – ich habe mir zum Beispiel die Version 26.04 geholt – und lade danach [Rufus](https://rufus.ie/) herunter, um den bootfähigen Stick zu erstellen.
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
Wähle in Rufus das heruntergeladene Ubuntu-Image aus. Vergewissere dich, dass keine wichtigen Dateien mehr auf dem Stick sind, und starte den Schreibvorgang; alle anderen Einstellungen kannst du einfach auf Standard lassen. Danach hast du einen USB-Stick mit dem Installationsprogramm für Ubuntu Server 26.04 LTS parat.

## Installation
Steck den USB-Stick vor dem Einschalten ein. Sobald das **Lenovo**-Logo erscheint, drück mehrmals hintereinander `F12`; falls das nicht klappt, probier es mit `Fn+F12`. Im **Boot Menu** wählst du dann mit den Pfeiltasten den Starteintrag mit USB aus, um vom Stick zu booten und die Ubuntu-Installation zu starten.

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

Bei den ersten Schritten kannst du einfach die Standardauswahl übernehmen. An dieser Stelle hat mir die KI dann aber empfohlen, am besten die dritte Option anzuhaken, damit automatisch nach Treibern von Drittanbietern gesucht wird – das erspart später Ärger mit fehlendem Ton oder WLAN-Problemen.

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

Wenn du auf dieser Seite landest und zu Hause WLAN hast, geh mit den Pfeiltasten auf den zweiten Punkt `wlp3s0`, drück Enter und wähl anschließend `Edit Wifi` aus. Trag dort den Namen und das Passwort deines Heim-WLANs ein, damit der Server nach der Einrichtung direkt online ist.

Als Nächstes kommt eine Seite für Proxy-Einstellungen – wenn du keinen Proxy brauchst, kannst du das einfach überspringen.

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

Wenn du wie ich den kompletten Rechner plattmachen und umbauen willst, klick einfach weiter auf Done. Auf der nächsten Seite erscheint dann eine Zusammenfassung deiner Systemkonfiguration; dort wieder auf Done und Continue klicken, und dann läuft erst mal eine Weile die Installation …

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

Auf diesem Bildschirm legst du Servernamen, Benutzernamen und Passwort fest. Der Ubuntu-Server-Installer legt einen normalen Benutzer an und gibt ihm `sudo`-Rechte; das Konto `root` ist unter Ubuntu standardmäßig gesperrt, du musst hier also nicht `root` als Benutzernamen eintragen. Ich habe `amiya` genommen, melde mich später per `ssh amiya@服务器地址` an und nutze `sudo`, wenn ich Admin-Rechte brauche.

Merk dir den hier festgelegten Hostnamen, Benutzernamen und das Passwort gut. Wenn du das Passwort vergisst, musst du zwar nicht zwingend neu flashen, aber die Wiederherstellung ist deutlich nerviger.

Zwischendurch wirst du noch gefragt, ob du Ubuntu Pro aktivieren willst – einfach überspringen, braucht als Normalsterblicher eh kein Mensch, haha.

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

Jetzt kommt der **wichtige** Teil: Erstens muss OpenSSH auf jeden Fall installiert werden. Zweitens kannst du, falls du ein GitHub-Konto hast und dort bereits einen öffentlichen SSH-Schlüssel hinterlegt ist, direkt deinen GitHub-Benutzernamen eingeben und den Key importieren. Nach der Installation kannst du dich dann im selben lokalen Netz per IP und SSH-Key einloggen.

Wenn du sicher bist, dass dein Public Key sauber importiert wurde, kannst du das Häkchen bei `[ ] Allow password authentication over SSH` im Bild weglassen. Diese Option steuert, ob der SSH-Login per Passwort erlaubt ist.

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

Danach listet der Installer noch ein paar gängige Server-Pakete auf. Wenn du davon wirklich etwas brauchst, kannst du es mit der Leertaste auswählen; wenn nicht, wähl direkt `Done`.

Nachdem du zum Schluss auf `Reboot Now` geklickt hast, wird es einfach, falls **Please remove the installation medium, then press ENTER** erscheint: Stick abziehen, Enter drücken und das System fährt ganz normal hoch! Falls diese Meldung nicht kommt, zieh den Stick ab, sobald der Bildschirm schwarz wird – sonst landest du direkt in einer Endlosschleife …

## Ersteinrichtung

Damit ich mich später bequem von überall verbinden kann, habe ich mich für ein Mesh-Netzwerk mit Tailscale entschieden.

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

Nach der Installation spuckt dir das Ganze normalerweise einen Tailscale-Link aus. Sobald du dich auf deinem Hauptrechner in dein Tailscale-Konto einloggst, kannst du ganz entspannt wie im lokalen Netz darauf zugreifen!

# Fazit & Ausblick
Bisher läuft die Kiste seit gut zwei Tagen stabil, und ich habe meinen Sayori-Bot (AstrBot + NapCat) erfolgreich auf den Homeserver umgezogen – oh yeah!

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

Außerdem läuft mein Fast Note Sync jetzt ebenfalls auf dem Homeserver, wodurch sich die Daten für meinen Blog spürbar schneller synchronisieren.

> [!NOTE]
> Gerade weiß ich zwar noch nicht so recht, was ich sonst noch damit anstellen soll, miau, aber so einen eigenen Homeserver am Heimanschluss stehen zu haben, macht schon ziemlich Spaß. Gemessen liegt der Upload bei rund 70 Mbps, und die 2 Kerne mit 4 GB RAM reichen durchaus für einiges. Wenn du bis hierhin gelesen hast: Her mit deinen Vorschlägen, wie ich den kleinen Server noch sinnvoll auslasten kann!

## Weiterlesen

Wenn die Kiste einmal steht, kannst du direkt mit [[docker-compose-minimum-start|Docker-Minimaleinstieg]] weitermachen und dir danach aus [[2c2g-server-service-index|Diensteliste für kleine Server]] etwas aussuchen, das dir wirklich nützt.

Später habe ich auch meine Notiz-Synchronisation nach Hause umgezogen – wie das lief, steht in [[fast-note-sync-on-student-server|Fast Note Sync]]. Und wenn du deinen Diensten noch eine Domain samt HTTPS verpassen willst, schau bei [[cloudflare-free-tier-developer-guide|Cloudflare]] vorbei.
