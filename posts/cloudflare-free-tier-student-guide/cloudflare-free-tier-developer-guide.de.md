---
title: "Was der kostenlose Tarif von Cloudflare für Entwickler leistet: Das gratis Rundum-sorglos-Paket des Cyber-Wohltäters"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: "Eine Übersicht über alles im kostenlosen Cloudflare-Tarif, was man wirklich gebrauchen kann: Pages, Workers, R2, Tunnel, Email Routing, DNS, Web Analytics – und wann es besser passt als ein VPS."
image: ""
tags:
  - Praxis-Tutorials
  - Webseitenbau & Cloudflare
  - Offizielle Studenten-Vorteile
  - VPS & Self-Hosting
category: "Anleitungen & Tutorials"
draft: false
lang: de
translationKey: "posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide"
alias: ""
---

Dass Cloudflare in der Entwicklerszene als „Cyber-Wohltäter“ bezeichnet wird, kommt nicht von ungefähr.

Die Kontingente im kostenlosen Tarif sind für Einzelentwickler schlichtweg völlig überdimensioniert.

Hier habe ich die kostenlosen Dienste zusammengestellt, die aus meiner Sicht für Entwickler wirklich nützlich sind.

## Registrierung

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

Eine E-Mail-Adresse reicht für die Anmeldung aus. Für die meisten Funktionen im Free-Tarif muss keine Kreditkarte hinterlegt werden (für manche Dinge wie R2 ist zwar eine Karte nötig, aber solange du die Limits nicht sprengst, wird nichts abgebucht).

Falls die Registrierung nicht klappt, probier es mit einem anderen VPN-Knoten oder im Inkognito-Modus.

## Cloudflare Pages

Das nutze ich mit Abstand am häufigsten.

Mit Pages kannst du statische Websites (HTML, CSS, JS oder die Build-Artefakte von Frameworks wie Astro, Next.js oder Hugo) im globalen Netzwerk von Cloudflare bereitstellen.

Im kostenlosen Tarif bekommst du:

- Unbegrenzte Anzahl an Websites
- Unbegrenzte Bandbreite
- 500 Builds pro Monat
- Automatisches HTTPS
- Eigene Domains
- Preview-Deployments (eine eigene Vorschau-URL für jeden PR)

Für einen persönlichen Blog gibt es hier praktisch keinerlei Einschränkungen.

Mein eigener Blog läuft auf Pages. Nach dem Push ins GitHub-Repository baut GitHub Actions das Astro-Projekt und lädt es per Wrangler zu Pages hoch. Der komplette Ablauf kostet keinen Cent.

Falls du es noch nicht ausprobiert hast:

[[astro-mizuki-blog-from-zero|Einen schlichten Blog mit Sayori Lite aufsetzen]]

## Cloudflare Workers

Workers sind die Serverless-Funktionen von Cloudflare. Du schreibst ein kurzes Stück JS/TS, lädst es hoch und es läuft direkt auf den Edge-Servern von Cloudflare.

Im kostenlosen Tarif bekommst du:

- 100.000 Anfragen pro Tag
- 10 ms CPU-Zeit pro Anfrage
- 1 MB Codegröße

Wofür es sich eignet:

- Einfache APIs bauen (z. B. Zufallssprüche ausgeben, Anfragen weiterleiten oder einen URL-Shortener betreiben)
- Statischen Seiten ein wenig dynamische Logik verpassen
- Als Webhook-Empfänger dienen
- Einfache Proxys oder Weiterleitungen umsetzen

Wofür es sich nicht eignet:

- Aufgaben, die lange laufen müssen
- Komplexe Backends mit Datenbanken (man kann zwar D1 oder KV anbinden, aber auch dort greifen die Limits des Free-Tarifs)
- Dienste, die dauerhafte WebSocket-Verbindungen brauchen

Wenn du nur einen Blog schreiben willst, brauchst du Workers erst einmal nicht. Es ist aber gut zu wissen, dass es sie gibt – sobald du später an kleinen Tools bastelst, laufen sie dir ständig über den Weg.

## Cloudflare R2

R2 ist ein Objektspeicher, der kompatibel zur S3-API ist.

Im kostenlosen Tarif bekommst du:

- 10 GB Speicherplatz
- 10 Millionen Class-A-Operationen pro Monat (PUT/POST/LIST)
- 10 Millionen Class-B-Operationen pro Monat (GET)
- Kostenlosen ausgehenden Traffic (das ist der eigentliche Gamechanger)

Wofür es sich eignet:

- Bilder für den Blog speichern (zusammen mit einer eigenen Domain hast du einen vollwertigen Bilder-Hoster)
- Backups ablegen
- Statische Assets hosten
- Datei-Uploads für kleine Projekte speichern

Warum es attraktiver als klassischer OSS ist: Der ausgehende Traffic kostet nichts. Bei Alibaba Cloud OSS zahlt man für den Traffic nach draußen, bei R2 nicht. Für persönliche Blogs und kleine Projekte macht das einen riesigen Unterschied.

Für die Freischaltung von R2 muss eine Kreditkarte hinterlegt werden, aber innerhalb der Freigrenzen fallen keinerlei Gebühren an.

## Cloudflare Tunnel

Mit Tunnel kannst du interne Dienste (etwa ein Vaultwarden auf deinem VPS, das nur auf 127.0.0.1 lauscht) sicher ins öffentliche Netz bringen.

Funktionsweise:

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

Vorteile:

- Auf dem VPS müssen die Ports 80 und 443 nicht geöffnet werden
- Du musst dich nicht selbst um SSL-Zertifikate kümmern
- Lässt sich mit Cloudflare Access um eine zusätzliche Authentifizierungsschicht erweitern
- Die IP-Adresse des Ursprungsservers bleibt verborgen

Mein [[selfhost-vaultwarden-on-2c2g|Vaultwarden]], [[selfhost-ntfy-on-2c2g|ntfy]], Gatus und das 1Panel-Dashboard laufen alle über Tunnel; wie ich das für die Notizsynchronisation nutze, steht in der [[fast-note-sync-on-student-server|Fast Note Sync Anleitung]].

Im kostenlosen Tarif gibt es keine Begrenzung für die Anzahl der Tunnel. Über einen einzigen Tunnel kannst du problemlos mehrere Subdomains betreiben.

Zur Einrichtung läuft auf dem VPS lediglich ein `cloudflared`-Daemon, der die Verbindung aktiv nach außen aufbaut – eingehende Firewall-Regeln sind nicht nötig.

## Cloudflare DNS

Wenn du die Nameserver (NS) deiner Domain auf Cloudflare umstellst, kannst du das kostenlose DNS-Hosting nutzen.

Falls du noch keine Domain hast, schau dir zuerst [[free-domain-and-web-community|Kostenlose Domains und Student-Pack-Domains]] an.

Vorteile:

- Globales Anycast-Netzwerk für schnelle Namensauflösung
- Kostenloses DNSSEC
- Verbirgt im Proxy-Modus die echte IP des Ursprungsservers
- Sehr übersichtliche Verwaltungsoberfläche

Wenn deine Domain bei einem anderen Registrar liegt (z. B. Namesilo, Porkbun, SpaceShip oder den verschiedenen chinesischen Cloud-Anbietern), kannst du einfach die Nameserver auf Cloudflare umbiegen.

Falls du eine kostenlose Domain nutzt (wie etwa cc.cd von DNSHE), hängt es vom Anbieter ab, ob sich die Nameserver ändern lassen. Manche erlauben das, bei anderen kannst du nur direkt auf deren Plattform DNS-Einträge anlegen.

## Cloudflare Email Routing

Mit Email Routing kannst du E-Mails über deine eigene Domain empfangen und an dein echtes Postfach weiterleiten lassen.

Zum Beispiel:

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

Das Ganze ist kostenlos und du musst keinen eigenen Mailserver aufsetzen.

Eignet sich gut für:

- Eine Kontaktadresse im Blog angeben, ohne die private E-Mail-Adresse preiszugeben
- Eigene Domain-Adressen für die Registrierung bei verschiedenen Diensten nutzen
- Die Grundlagen von E-Mail-DNS-Einträgen (MX, SPF, DKIM) in der Praxis lernen

Hinweis: Das gilt nur für den Empfang und die Weiterleitung. Wenn du über deine eigene Domain auch E-Mails versenden willst, brauchst du eine zusätzliche Lösung (etwa Gmail SMTP + Alias oder Dienste wie Resend, Mailgun oder Zoho Mail).

## Cloudflare Web Analytics

Ohne auch nur ein einziges JS-Skript einbauen zu müssen, liefert dir Cloudflare grundlegende Besucherstatistiken für deine Website.

Du aktivierst das einfach im Dashboard unter Web Analytics.

Es ist deutlich schlanker als Google Analytics:

- Kein User-Tracking
- Keine Cookies
- Kein zusätzliches JavaScript, das geladen werden muss
- Datenschutzfreundlich

Für einen persönlichen Blog reicht es völlig aus, um zu sehen, ob überhaupt jemand vorbeischaut, woher die Besucher kommen und welche Seiten sie lesen.

Wenn du irgendwann detailliertere Auswertungen brauchst (wie Event-Tracking, Funnels oder eigene Dimensionen), kannst du dir später immer noch Umami oder Plausible ansehen. Für den Anfang genügt das Bordmittel von Cloudflare vollkommen.

## Cloudflare Access (Zero Trust Free-Tarif)

Mit Access kannst du jedem deiner Webdienste eine vorgeschaltete Login-Schranke verpassen.

Angenommen, dein Admin-Panel läuft unter `panel.example.com` und soll nicht für jeden frei zugänglich sein. Access blendet beim Aufruf eine Anmeldeseite ein, sodass nur verifizierte Nutzer durchkommen.

Der kostenlose Tarif unterstützt bis zu 50 Benutzer.

Mögliche Anmeldemethoden:

- Einmal-Code per E-Mail
- GitHub-Login
- Google-Login

Mein 1Panel-Dashboard ist genau so mit Access abgesichert. Selbst wenn das Panel selbst ein Passwort hat, schadet eine zusätzliche Schutzschicht direkt am Eingang nie.

## Was es sonst noch kostenlos gibt

Weitere Gratis-Dienste, die ich selbst aber seltener nutze:

- **D1**: SQLite-Datenbank, die direkt neben Workers läuft. 5 GB im kostenlosen Tarif.
- **KV**: Key-Value-Speicher. Hat im Free-Tarif tägliche Lese-/Schreiblimits, reicht für kleine Projekte aber aus.
- **Queues**: Message Queues.
- **Images**: Bildbearbeitung und -optimierung (hier ist der kostenlose Tarif allerdings sehr knapp bemessen).
- **Stream**: Video-Hosting (reicht im Free-Tarif praktisch nicht aus).
- **Zaraz**: Verwaltung von Drittanbieter-Skripten.

Man muss sich nicht alles merken. Es reicht zu wissen, dass Cloudflare im kostenlosen Tarif extrem großzügig ist – bei Bedarf schaut man einfach wieder nach.

## Wann man Cloudflare besser nicht nutzt

- Dauerhaft laufende Hintergrundprozesse → lieber einen VPS nehmen
- Persistente Datenbanken und komplexe Abfragen → VPS oder eine verwaltete Datenbank nutzen
- Langlebige WebSocket-Verbindungen → Workers hat hier klare Grenzen
- Verarbeitung großer Dateien → Arbeitsspeicher und CPU sind bei Workers begrenzt
- Wenn schnelle Ladezeiten aus Festlandchina kritisch sind → der kostenlose Cloudflare-Tarif ist dort nicht immer der schnellste

Die Faustregel lautet: Was auf Cloudflare laufen kann, kommt auf Cloudflare; was dauerhaft laufen muss, kommt auf den VPS. Die beiden ersetzen sich nicht, sondern ergänzen sich.

## Mein Setup im Überblick

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

Der kleine 2C2G-Studentenserver kümmert sich nur um die Dinge, die wirklich rund um die Uhr laufen müssen. Alles andere, was sich zu Cloudflare auslagern lässt, belastet den Server erst gar nicht.

Wenn du noch einen Server suchst, schau dir zuerst [[azure-students-100-credit-guide|Azure-Server in Japan]] oder [[aliyun-student-300-voucher-guide|Alibaba Cloud Studentengutscheine]] an und richte deine Anwendungen dann mithilfe von [[docker-compose-minimum-start|Docker-Einstieg]] und der [[2c2g-server-service-index|Diensteliste]] ein.

## Weiterführende Links

awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

Dieses Repository sammelt allerlei Tools und Anwendungsfälle rund um das Cloudflare-Ökosystem und hat über 14k Sterne. Wenn du wissen willst, was andere Leute so alles mit Cloudflare anstellen, ist das der beste Einstiegspunkt.

Weitere externe Tools habe ich in der [[webmaster-resource-toolbox|Webmaster-Ressourcenliste]] gesammelt; sobald die Website online ist, kannst du mit [[geoscore-2-4-guide|GeoScore]] prüfen, ob Crawling und Seiteninformationen sauber aufgesetzt sind.
