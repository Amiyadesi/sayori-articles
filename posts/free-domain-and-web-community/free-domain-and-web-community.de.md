---
title: Einem frisch aufgesetzten Blog eine kostenlose Domain verpassen und sich in der Webmaster-Community blicken lassen
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: Von kostenlosen DNSHE-Subdomains und Cloudflare DNS bis hin zu Kommentarsystemen, Travellings, Moe ICP und dem Zehn-Jahres-Versprechen – so bekommt ein frisch aufgesetzter Blog eine Domain, Interaktion und ein bisschen Sichtbarkeit
image: ""
tags:
  - Praxis-Tutorial
  - Webseitenbau & Cloudflare
  - Indie-Blog
  - Offizielle Studenten-Vorteile
category: "Anleitungen & Tutorials"
draft: false
lang: de
translationKey: "posts/free-domain-and-web-community/free-domain-and-web-community"
alias: ""
---

Im letzten Beitrag [[astro-mizuki-blog-from-zero|Einen schlichten Blog mit Sayori Lite aufsetzen]] ging es um GitHub, Cloudflare Pages und den optionalen Schreib-Workflow mit Obsidian.

Nach dem Aufsetzen sieht die Standardadresse ungefähr so aus:

```text
https://你的项目名.pages.dev
```

Funktioniert zwar, aber irgendwie fehlt da noch was.

Der Blog steht, also ist der nächste logische Schritt, ihm eine vernünftige Domain zu verpassen und sich in ein paar Webmaster-Communities blicken zu lassen. Nicht, um sofort massenhaft Traffic abzugreifen, sondern um aus „einem Projekt auf meinem Rechner“ einen „kleinen Ort mit eigenem Namen im Internet“ zu machen.

## Eine kostenlose Domain reicht für den Anfang völlig

Wenn du dir vorerst keine Domain kaufen willst, kannst du erst einmal mit einer kostenlosen Subdomain üben.

Ich empfehle aktuell vor allem Dienste wie DNSHE:

[https://my.dnshe.com/](https://my.dnshe.com/)

![[Pasted image 20260623151351.png]]

Ich schaue derzeit bevorzugt nach Endungen wie `cc.cd`, die sich bei Cloudflare einbinden lassen.

![[Pasted image 20260622231201.png]]

Für diese Dinge eignet sich eine kostenlose Domain gut:

- Eine eigene Domain an einen Blog auf Cloudflare Pages binden
- DNS-Auflösung lernen
- Cloudflare-Hosting ausprobieren
- Subdomains für spätere Self-Hosted-Dienste vorbereiten

Für diese Dinge eignet sie sich dagegen nicht:

- Langfristige kommerzielle Projekte
- Die Hauptdomain für wichtige E-Mails
- Marken-Zugänge, die auf keinen Fall verloren gehen dürfen
- Projekte, bei denen du absolut kein Risiko durch Regeländerungen eingehen willst

## DNSHE-Boost-Codes

DNSHE hat ein Boost-System, mit dem man sich gegenseitig unterstützen kann, um länger laufende Subdomains zu bekommen.

Ich lege hier erst mal ein paar Boost-Codes ab und ergänze später noch welche, falls neue dazukommen:

```text
VJC8UQYTPK
GHGMEUGWXA
VVN9QFPEUL
UUJ22RXYDC
G4HPCNW7R4
```

Wenn du den Blog nur vorübergehend testen willst, musst du nicht unbedingt auf „für immer“ aus sein – erst mal eine funktionierende Domain holen und den Ablauf durchspielen ist wichtiger.

## Offizielle kostenlose Domains aus dem GitHub Student Pack

Wenn du eine Hochschul-E-Mail-Adresse hast und für das [GitHub Student Developer Pack](https://education.github.com/pack) verifiziert bist, kannst du nebenbei noch zwei offizielle Vorteile für kostenlose Top-Level-Domains im ersten Jahr mitnehmen:

- **Namecheap**: Bietet eine kostenlose `.me`-Top-Level-Domain für das erste Jahr inklusive einem Jahr SSL-Zertifikat
- **Name.com**: Bietet eine kostenlose Domain im ersten Jahr aus ausgewählten Endungen; die genau verfügbaren Endungen und Verlängerungspreise stehen auf der Checkout-Seite

Wichtig dabei: Die Top-Level-Domains aus dem Student Pack sind nur im ersten Jahr kostenlos, ab dem zweiten Jahr gilt der reguläre Verlängerungspreis. Wenn du keine Kreditkarte hinterlegen oder dich nicht um Verlängerungen kümmern willst, fährst du mit DNSHE oben weiterhin sehr entspannt.

## Mit Cloudflare verbinden

Wofür DNS, Pages und Tunnel gut sind, steht im [[cloudflare-free-tier-developer-guide|Cloudflare Free-Tier-Tutorial]] – hier verknüpfen wir erst einmal nur die Domain.

Sobald du die Domain hast, wird sie als Nächstes mit Cloudflare verbunden.

Der gängigste Ablauf sieht so aus:

1. Die Website in Cloudflare hinzufügen
2. Den Anweisungen folgen und die Nameserver (NS) der Domain auf Cloudflare umstellen
3. Warten, bis die DNS-Änderungen greifen
4. Im Cloudflare-Pages-Projekt die benutzerdefinierte Domain hinzufügen
5. Den Hinweisen von Pages folgen und den CNAME ergänzen oder das Ganze automatisch von Cloudflare einrichten lassen

Falls du eine kostenlose Subdomain nutzt, prüfe vorher, ob sich die Nameserver überhaupt ändern lassen. Wenn keine NS-Änderung möglich ist, kannst du DNS-Einträge nur direkt beim ursprünglichen Anbieter anlegen oder dir eine Endung suchen, die sich besser für Cloudflare eignet.

Hier ist etwas Geduld gefragt, denn bis DNS greift, kann es einen Moment dauern. Stell vorher klar, wohin Root-Domain und `www` / Subdomains genau zeigen sollen, damit du beim Ändern nicht vergisst, was du gerade erst eingetragen hast.

## Subdomains für Self-Hosted-Dienste freihalten

Falls du dir später einen 2C2G-Studentenserver holst, kannst du Subdomains schon im Voraus einplanen:

```text
vault.example.cc.cd  -> Vaultwarden
notes.example.cc.cd  -> Fast Note Sync
ntfy.example.cc.cd   -> ntfy
status.example.cc.cd -> Gatus
```

Stopf nicht alle Dienste unter die Root-Domain.

Eine Domain ist wie eine Hausnummer. Wenn die Hausnummern sauber vergeben sind, laufen Umzüge, Migrationen, Reverse Proxies und das Abschalten von Diensten später deutlich entspannter.

Eine Gesamtübersicht zu Server-Diensten findest du hier:

[[2c2g-server-service-index|Was auf einem 2C2G-Studentenserver läuft: Die kleine Kiste nicht gleich vollstopfen]]

## Kostenlose oder reguläre Domain – wie entscheiden?

Ich würde es so aufteilen:

Eine kostenlose Domain passt für:

- Den frisch aufgesetzten Blog
- DNS lernen
- Tutorials bauen
- Cloudflare Pages testen
- Self-Hosted-Dienste ausprobieren

Eine reguläre Domain passt für:

- Einen langfristig gepflegten Blog
- Eine offizielle E-Mail-Adresse
- Eine Adresse, die in Profilbildern, Visitenkarten oder Videobeschreibungen landen soll

Nicht, dass kostenlose Domains zweitklassig wären. Aber bei langfristigen Projekten nervt nichts so sehr wie „später umziehen müssen“.

Wenn für dich schon feststeht, dass du diesen Blog lange schreiben willst, lohnt sich der Kauf einer eigenen Wunschdomain. Bei persönlichen Projekten darf man ruhig ein bisschen eigenwillig sein – wenn einem der Name gefällt, hat man auch mehr Lust, die Seite zu pflegen.

# In der Webmaster-Community vorbeischauen

Wenn die Domain steht, kannst du dich mal in ein paar Webmaster-Communities umschauen.

Nicht, um plump Werbung zu machen, sondern um in ein Umfeld einzutauchen, in dem tatsächlich noch gebloggt wird. Bei einem Indie-Blog besteht sonst schnell die Gefahr, dass er zum reinen Offline-Tagebuch verkommt. Ab und zu zu sehen, wie andere schreiben, ihre Seiten gestalten und sich gegenseitig verlinken, motiviert ungemein.

## Travellings (开往)

Travellings ist ein Blogroll-Staffelprojekt:

[https://www.travellings.cn/](https://www.travellings.cn/)

Das Prinzip ist ziemlich charmant: Du baust einen „Travellings“-Button auf deiner Seite ein, und wer darauf klickt, landet zufällig auf einer anderen teilnehmenden Indie-Website.

Hinweise zum Mitmachen:

[https://www.travellings.cn/docs/join.html](https://www.travellings.cn/docs/join.html)

Eignet sich für Blogs, auf denen schon ein bisschen Inhalt liegt.

Bewirb dich nicht direkt nach dem Aufsetzen mit einer leeren Startseite. Schreib erst ein paar Artikel, damit Besucher beim Reinklicken auch wirklich etwas zu lesen haben.

## Moe ICP (萌备)

Moe ICP ist die „Moe-Land ICP-Registrierung“:

[https://icp.gov.moe/](https://icp.gov.moe/)

Antragsseite:

[https://icp.gov.moe/join.php](https://icp.gov.moe/join.php)

Das ist ausdrücklich keine offizielle chinesische MIIT-Registrierung, nicht falsch verstehen. Es ist eher ein spielerisches Erkennungszeichen und Community-Portal unter Anime-/ACG- und persönlichen Websites.

Auf der offiziellen Antragsseite gibt es ein paar inhaltliche Vorgaben: nicht kommerziell, keine Grauzonen-Inhalte, keine leere Hülle, HTTPS aktiviert und langfristig erreichbar.

Wenn es zum Stil deiner Seite passt, kannst du dir eine Moe-ICP-Nummer holen und in den Footer packen. Praktisch zwingend ist sie nicht, aber sie versprüht ordentlich Indie-Web-Flair.

## Das Zehn-Jahres-Versprechen (十年之约)

Das Zehn-Jahres-Versprechen:

[https://www.foreverblog.cn/](https://www.foreverblog.cn/)

Im Kern geht es um ein Versprechen: Ab dem Beitritt den Blog zehn Jahre oder länger nicht abzuschalten und ihn aktiv und lebendig zu halten.

Klingt ein bisschen nach Chuunibyou, aber irgendwie mag ich den Gedanken.

Allerdings muss der Blog dafür bereits ein Jahr laufen, bevor man sich bewerben kann – also erst mal abwarten. Wenn deine Seite das eine Jahr schon voll hat, kannst du es natürlich gern mal mit einer Bewerbung versuchen, haha.

## Jiuchan (揪蝉)

Jiuchan:

[https://hi.jiuchan.org/docs](https://hi.jiuchan.org/docs)

Das ist eine Plattform für Verzeichnisse persönlicher Websites und zufällige Seitenbesuche – vom Prinzip her so, als würde man seinen Indie-Blog in ein „Zufällig entdecken“-Portal stecken.

Wenn dein Blog schon ein paar lesenswerte Artikel hat, kannst du dir die Aufnahme-Doku dort mal ansehen. Für neue Seiten liegt der Sinn solcher Plattformen nicht darin, sofort massig Besucher zu bringen, sondern anderen die Chance zu geben, von einer Seite zur nächsten zu springen und dich nach und nach zu entdecken.

# BlogFinder

[BlogFinder - Gute persönliche Blogs entdecken](https://bf.zzxworld.com/)

## Liste chinesischer Indie-Blogs

GitHub: [https://github.com/timqian/chinese-independent-blogs](https://github.com/timqian/chinese-independent-blogs)

Dieses Repository sammelt chinesischsprachige Indie-Blogs. Es ist eher ein langfristig gepflegtes Blogverzeichnis mit Blog-URL, RSS, Kurzbeschreibung und Tags.

Für wen es passt:

- Einen stabilen Blog
- Einen RSS-Feed
- Überwiegend selbst geschriebene Inhalte
- Die Bereitschaft, öffentlich indexiert zu werden

Heute abonnieren viele Leute Blogs nicht mehr aktiv selbst, sondern lassen sich Informationen von Plattformen vorsortieren. Die Liste chinesischer Indie-Blogs bewahrt zumindest eine altmodische, aber gute Methode: Wen ich mag, den abonniere ich.

Wenn du deine eigene Seite einreichen willst, bring vorher diese Punkte in Ordnung:

```text
站名
站点 URL
RSS URL
一句话介绍
主题标签
```


# Weitere Wege zu kostenlosen Domains

DNSHE ist nicht die einzige Option. Hier noch ein paar andere, über die ich gestolpert bin:

[Sammlung aktuell frei registrierbarer kostenloser Domains mit Cloudflare-Support](https://www.nodeloc.com/t/topic/70964?u=amiya_desi)

[https://domain.stackryze.com/](https://domain.stackryze.com/) Kleiner Hinweis: Man kann vier Domains registrieren, aber aktuell lassen sich nur die beiden Endungen .in und .cc bei Cloudflare einbinden.

Ein kleiner Geheimtipp-Thread auf NodeLoc, in dem ziemlich viele Angebote gesammelt sind.

### Die integrierten Domains von GitHub Pages

Wenn du dich vorerst mit gar keinem Domain-Anbieter herumschlagen willst, gibt dir GitHub Pages von Haus aus schon eine mit:

```text
你的用户名.github.io
```

Cloudflare Pages gibt ebenfalls eine:

```text
你的项目名.pages.dev
```

Streng genommen sind das beide nicht „deine Domains“, aber zum Bloggen und Vorzeigen von Projekten reichen sie völlig. Eine reguläre Domain kannst du immer noch kaufen, wenn du dir sicher bist.

## Dem Blog ein Kommentarsystem hinzufügen

Im letzten Artikel hatte ich angekündigt, etwas zu Kommentarsystemen zu schreiben – hier ist der Nachtrag.

Ein Blog überlebt auch ohne Kommentarbereich, aber wenn du Tutorials, Erfahrungsberichte oder Fehlersuchen schreibst, hilft es dem Austausch und deinem eigenen Lernprozess enorm, wenn ab und zu ein „Das hat mir geholfen“ oder „Bei Schritt drei hatte ich ein anderes Problem“ reinkommt. Außerdem bekommt man über Kommentare deutlich unkomplizierter Feedback als etwa per E-Mail.

Für persönliche statische Blogs finde ich aktuell diese Kommentarsysteme am passendsten:

### Twikoo

[https://twikoo.js.org/](https://twikoo.js.org/)

GitHub: [https://github.com/twikoojs/twikoo](https://github.com/twikoojs/twikoo)

Twikoo ist in der chinesischen Indie-Blog-Szene ziemlich verbreitet. Es unterstützt anonyme Kommentare, E-Mail-Benachrichtigungen, Emojis und ein Admin-Dashboard.

Es gibt viele Deployment-Wege: Vercel, Netlify, Cloud Functions oder selbst gehostet per Docker. Für Studierende ist das kostenlose Deployment auf Vercel der entspannteste Weg.

Vorteile:

- Starkes chinesisches Ökosystem, einsteigerfreundliche Doku
- Deployment-Kosten lassen sich auf null drücken
- Admin-Dashboard zum Moderieren, Löschen und Antworten
- Unterstützt E-Mail- und WeChat-Benachrichtigungen

Nachteile:

- Du musst ein Datenbank-Backend wählen (MongoDB Atlas Free Tier, Vercel KV oder Self-Hosting)
- Bei einer kostenlosen Drittanbieter-Datenbank liegen die Daten nicht komplett in deiner eigenen Hand

### Giscus

[https://giscus.app/](https://giscus.app/)

GitHub: [https://github.com/giscus/giscus](https://github.com/giscus/giscus)

Giscus nutzt GitHub Discussions als Kommentar-Backend. Besucher melden sich mit ihrem GitHub-Konto an und können dann kommentieren.

Vorteile:

- Die Daten liegen in deinem eigenen GitHub-Repository
- Kein zusätzliches Deployment nötig
- Ideal für Tech-Blogs, deren Leser ohnehin meist ein GitHub-Konto haben
- Native Unterstützung für Markdown und Syntax-Highlighting

Nachteile:

- GitHub-Login ist Pflicht
- Nicht-technische Leser legen sich wegen eines Kommentars ungern extra ein GitHub-Konto an
- Die Kommentare hängen fest an deinem Repo; bei einem Repo-Wechsel musst du sie migrieren

### Artalk

[https://artalk.js.org/](https://artalk.js.org/)

GitHub: [https://github.com/ArtalkJS/Artalk](https://github.com/ArtalkJS/Artalk)

Artalk ist ein selbst gehostetes Kommentarsystem, für das ein eigener Backend-Dienst laufen muss. Wenn du schon einen 2C2G-Server hast, kannst du es per Docker betreiben.

Vorteile:

- Volle Kontrolle über deine Daten
- Unterstützt die Verwaltung mehrerer Websites
- Ziemlich kompletter Funktionsumfang: E-Mail-Benachrichtigungen, Telegram-Benachrichtigungen, Captcha, Admin-Dashboard

Nachteile:

- Du brauchst einen Server
- Ein weiterer Dienst, der gewartet, gesichert und aktualisiert werden will
- Wenn auf einem 2C2G-Server noch ein Dienst dazukommt, musst du den Arbeitsspeicher im Blick behalten

### Wie ich entscheiden würde

Wenn dein Blog frisch aufgesetzt ist und du keinen Server hast, würde ich zuerst Giscus oder Twikoo (auf Vercel) ausprobieren.

Wenn du schon einen Server hast und deine Leser nicht nur aus Programmierern bestehen, lohnt sich ein Blick auf Artalk.

Und wenn du dich gerade gar nicht mit Kommentaren herumschlagen willst, ist das auch völlig okay. Schreib erst mal gute Artikel – wenn Leser da sind, kannst du immer noch welche nachrüsten. Das Kommentarsystem ist nicht der Kern eines Blogs, der Inhalt ist es.

## Wo du sonst noch Links unterbringen kannst

- Blogroll-Seite: Blogger mit ähnlichen Themen suchen und Links tauschen
- GitHub-Profil: Den Blog auf der persönlichen Profilseite verlinken
- Bilibili / YouTube / Xiaohongshu-Bio: Tutorial-Videos mit dem passenden Artikel verknüpfen
- Forensignaturen wie bei Linux DO / V2EX: An die Community-Regeln halten und nicht spammen
- Open-Source-Projekt-READMEs: Wenn Projekt und Blog zusammenpassen, einen Link zur Doku setzen

Je mehr Eingänge du für deine Website schaffst, desto mehr Leute finden auch den Weg dorthin.

## Blog-Statistiken: Wissen, ob überhaupt jemand vorbeischaut

Sobald Domain und Community-Zugänge stehen, fragst du dich vielleicht langsam: Liest meinen Blog eigentlich überhaupt jemand?

Ein paar schlanke Optionen:

- **Umami**: [https://umami.is/](https://umami.is/), lässt sich selbst hosten oder in der kostenlosen Cloud-Version nutzen. Aufgeräumte Oberfläche, volle Datenkontrolle
- **Cloudflare Web Analytics**: Wenn du ohnehin schon Cloudflare nutzt, ist das integrierte Web Analytics kostenlos, braucht kein zusätzliches Code-Snippet und lässt sich direkt im Dashboard einsehen
- **Plausible**: [https://plausible.io/](https://plausible.io/), hauptsächlich kostenpflichtig, aber selbst hostbar
- **Gar keine Analyse einbauen**: Geht auch. Ein persönlicher Blog ist keine kommerzielle Website, der überlebt auch ohne Zahlen

Meine aktuelle Empfehlung wäre, erst einmal Cloudflare Web Analytics zu nehmen (weil du höchstwahrscheinlich sowieso schon Cloudflare eingebunden hast) und erst dann über Umami nachzudenken, wenn dir das irgendwann nicht mehr reicht.

Starr nicht jeden Tag auf die Zahlen. Schreiben bringt mehr als Statistiken zu wälzen.

## Zum Schluss

Versuch bei einem frisch aufgesetzten Blog nicht sofort, alles perfekt zu machen.

Nimm erst mal eine kostenlose Domain, wenn sie funktioniert, lass Cloudflare auflösen, bewirb dich nach und nach bei den Communities, und ein Kommentarsystem kannst du auch später noch nachrüsten.

Wirklich wichtig ist nur, weiterzuschreiben.

Domain, Registrierungsnummer, Blogroll, Travellings-Button, Kommentarbox – all das sind nur kleine Dekorationen, damit der Blog mehr nach einer richtigen „Website“ aussieht. Die Artikel sind das, was ihn trägt.
