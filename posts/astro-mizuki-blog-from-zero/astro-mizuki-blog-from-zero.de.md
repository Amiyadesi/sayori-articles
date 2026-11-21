---
title: "Einen schlichten Blog von Grund auf aufsetzen: GitHub, Cloudflare Pages und optional Obsidian"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "Mit der kompletten Vorlage Sayori Lite einen schlichten Blog über Cloudflare Pages und GitHub aufsetzen. Einfach Markdown in Ordnern schreiben und veröffentlichen – Obsidian und Token-Deployment sind komplett optional"
image: ""
tags:
  - Praxis-Tutorial
  - Website-Bau & Cloudflare
  - Astro
  - Obsidian
category: "Anleitungen & Tutorials"
draft: false
alias: ""
lang: de
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# Einen schlichten Blog von Grund auf aufsetzen: GitHub, Cloudflare Pages und optional Obsidian

Dieses Tutorial musste ich endlich mal aufräumen. Die alte Version drehte sich noch um Mizuki, Obsidian und ein lokales Sync-Skript. Inzwischen sieht mein Blog längst so schlicht aus wie heute, nur die Anleitung war auf dem alten Stand stehen geblieben. Wer den alten Schritten folgte, musste Themes nachrüsten, Ordner umbauen und sich mit Plugins sowie Deployment-Configs herumschlagen – als allererste Anleitung zum Blog-Aufsetzen taugte das wirklich nicht.

Deshalb habe ich diesmal alles in einer direkt einsatzbereiten Komplettvorlage gebündelt: **Sayori Lite · Mein Schreibtisch**. Der warme Papier-Hintergrund, die olivgrünen Links und die dezenten Korall-Akzente meines aktuellen Blogs sind geblieben. Die Startseite listet direkt die Artikel auf, und der Fließtext hat angenehm viel Platz zum Lesen.

Diesmal bringen wir erst mal die Website zum Laufen – welches Schreibwerkzeug du am liebsten nutzt, kannst du dir danach überlegen. Veröffentlichen klappt zur Not komplett über die GitHub-Weboberfläche; Obsidian empfehle ich zwar zum Schreiben, es ist aber kein Muss.

> Dieser Artikel wurde am 16. Oktober 2026 auf Basis der aktuellen Vorlage und offiziellen Dokumentation neu geschrieben. Die alte Artikel-URL und die Adresse des Template-Repos bleiben erhalten; die alten Screenshots und die Schritte für das PowerShell-Plugin gelten nicht mehr.

## Erstmal zwei Konten anlegen

Du brauchst [GitHub](https://github.com/signup) und [Cloudflare](https://dash.cloudflare.com/sign-up). Auf GitHub liegen Code und Artikel der Website, Cloudflare Pages übernimmt Build sowie Hosting und stellt dir eine `pages.dev`-Adresse bereit. Für den Anfang musst du noch keine eigene Domain kaufen – du kannst es auch erst mal mit einer kostenlosen Subdomain versuchen [[free-domain-and-web-community|Kostenlose Domains und Webmaster-Communities]].

Der Standardweg sieht so aus:

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**Dieser Weg braucht kein Cloudflare API Token.** Zum Artikelschreiben musst du keine zusätzlichen Deployment-Keys einrichten; das Token weiter unten brauchst du nur, falls du später auf den Upload per GitHub Actions umsteigen willst.

## Ein eigenes Repository aus der Vorlage erstellen

Die Vorlage liegt immer noch unter derselben Adresse, der Name wurde vorerst nicht geändert und der alte Link funktioniert weiter:

[Sayori Lite Template-Repository](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

Klicke nach dem Öffnen auf **Use this template → Create a new repository**, wähle unter Owner dein eigenes Konto und gib dem Repo einen Namen wie zum Beispiel `my-blog`.

Diesmal enthält das Repository bereits die komplette Astro-Website. Die grobe Ordnerstruktur sieht so aus:

```text
my-blog/
  articles/
    posts/
      hello-mizuki/
        index.md
        desk.svg
    spec/
      about.md
      friends.md
    templates/
      blog-post.md
  public/
    avatar.svg
    favicon.svg
  src/
  site.config.mjs
  package.json
  pnpm-lock.yaml
  .github/workflows/deploy-cloudflare-pages.yml
```

`articles/` ist der Ordner zum Schreiben, `src/` enthält die eigentliche Website-Anwendung – die Artikel fließen direkt in den Build ein.

## Cloudflare mit GitHub verbinden

Gehe in Cloudflare zu **Workers & Pages**, erstelle eine Anwendung, wähle **Pages** und dann den Import eines bestehenden Git-Repositorys. Erteile Cloudflare den Zugriff auf dein frisch erstelltes Repo – und wirklich nur auf dieses eine.



Trage bei den Build-Einstellungen Folgendes ein:

| Einstellung | Eintrag |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | Leer lassen, um das Repo-Hauptverzeichnis zu nutzen |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Umgebungsvariable `NODE_VERSION` | `22` |
| Umgebungsvariable `PNPM_VERSION` | `11.0.8` |
| Umgebungsvariable `SITE_URL` | `https://你的项目名.pages.dev` |

Der Projektname bestimmt deine anfängliche `pages.dev`-Adresse. Speichere und starte das Deployment; sobald der Build durch ist, öffnest du die von Cloudflare angezeigte URL.

Pages installiert die Abhängigkeiten anhand des Lockfiles. Falls die Umgebung pnpm nicht sauber bereitstellt, steht in der README der Vorlage noch ein alternativer Build-Befehl inklusive Installation einer festen pnpm-Version. Schau im Zweifel erst ins Log, bevor du etwas änderst – du musst nicht gleich das ganze Deployment-Setup umwerfen.

Unter `SITE_URL` muss die offizielle Adresse deiner Seite stehen, weil RSS, Sitemap und Canonical-Links darauf zurückgreifen. Wenn du später deine eigene Domain verknüpfst, musst du das hier ebenfalls anpassen und neu deployen – trage hier nicht die URL deines GitHub-Repos oder Admin-Dashboards ein.

## Zu deinem eigenen Schreibtisch machen

Öffne auf GitHub die Datei `site.config.mjs`, klicke auf Bearbeiten und tausche Seitentitel, Autor und Kurzbeschreibung gegen deine eigenen Daten aus. Deinen Avatar legst du unter `public/` ab und trägst den entsprechenden internen Pfad in der Konfiguration ein.

```js
export default {
  title: "我的书桌",
  author: "你的名字",
  description: "记录日常，也写一点认真整理过的东西",
  url: "",
  lang: "zh-CN",
  avatar: "/avatar.svg",
  note: "慢慢写，慢慢读",
};
```

Wenn du `SITE_URL` bereits in Cloudflare gesetzt hast, kann `url` in der Config leer bleiben – die Umgebungsvariable hat Vorrang.

Die Über-mich-Seite änderst du in `articles/spec/about.md`, die Linkliste in `articles/spec/friends.md` – dort reichen ganz normale Markdown-Links mit einer kurzen Beschreibung.

Die Vorlage bringt Archiv, Inhaltsverzeichnis, Bild-Zoom, Hell-/Dunkelmodus, Pagefind-Suche, RSS und Sitemap mit; für den Fließtext werden Systemschriften verwendet.

## Ganz ohne lokale Tools den ersten Artikel veröffentlichen

Klicke im GitHub-Repository auf **Add file → Create new file** und gib als Dateinamen ein:

```text
articles/posts/my-first-post/index.md
```

Durch die Schrägstriche legt GitHub die Ordner automatisch an. Als Inhalt kannst du fürs Erste diese Vorlage nehmen:

```md
---
title: 我的第一篇文章
description: 今天终于有了自己的博客
published: 2026-10-16
updated: 2026-10-16
draft: false
category: 日常
tags: [生活]
---

这里是第一段正文。不用重复写一级标题，页面会自动显示上面的 title

## 想记下的一件事

这里继续写
```

Passe das Datum an den Zeitpunkt an, zu dem du wirklich schreibst. Klicke danach auf **Commit changes** und committe auf `main`. Sobald Cloudflare den Commit bemerkt, startet automatisch der Build – und wenn der durchläuft, taucht dein Artikel auf der Startseite auf.

Die Regel dahinter ist simpel: Jeder Artikel bekommt einen eigenen Ordner (kleingeschriebene englische Buchstaben, Zahlen und Bindestriche), und die Textdatei heißt immer `index.md`. `my-first-post` bestimmt die öffentliche URL `/posts/my-first-post/`; wenn du später den Titel änderst, bleibt die URL gleich, benennst du aber den Ordner um, ändert sie sich.

`draft: true` markiert einen Entwurf – erst wenn du das auf `false` stellst, wird eine Seite daraus generiert. Artikel mit einem Veröffentlichungsdatum in der Zukunft werden ebenfalls vorerst ausgelassen; ist das Datum erreicht, musst du noch einmal einen Build anstoßen, da die Vorlage keinen eigenen Zeitplan-Dienst mitbringt.

`private: true` überspringt in meinem eigenen Obsidian-Workflow die öffentliche Synchronisation, sodass der Artikel nur lokal bleibt; diese eigenständige Vorlage steuert die Veröffentlichung aktuell allein über `draft`.

## Empfehlung: Mit Obsidian schreiben

Wenn du sowieso gerne in Markdown schreibst, kannst du im Grunde jeden Editor nehmen. Da ich meinen Blog aber selbst mit Obsidian schreibe, ist der Workflow darauf natürlich am besten abgestimmt. Wenn du Obsidian nutzen möchtest, gehst du so vor:

0. Lade [obsidian](https://obsidian.md/download) herunter.
1. Installiere Git und klone dein neu erstelltes Repository lokal auf deinen Rechner.
2. Wähle in Obsidian „Ordner als Vault öffnen“ und öffne das gesamte Hauptverzeichnis `my-blog` – nicht nur den Unterordner `articles/`.
3. Die Vorlage hat die Kern-Einstellungen für Templates bereits vorkonfiguriert; der Vorlagenordner ist `articles/templates`.
4. Erstelle unter `articles/posts/文章名/` die Datei `index.md`, führe „Vorlage einfügen“ aus und wähle `blog-post`.
5. Passe nach dem Schreiben Titel, Datum und `draft` an, committe alles und pushe es zu GitHub.

Das Repo-Hauptverzeichnis dient deshalb als Obsidian-Vault, damit das Git-Plugin das Git-Repository direkt auf derselben Ebene findet. Anhänge landen standardmäßig direkt neben dem jeweiligen Artikel; dass die Datei `index.md` heißt, spielt keine Rolle – der Artikeltitel wird durch `title` in den Eigenschaften bestimmt.

Um direkt aus Obsidian heraus zu committen, installiere aus den Community-Plugins das Plugin **Git** von **Vinzent** (Plugin-ID: `obsidian-git`).

Für die Anmeldung empfehle ich, einfach die Authentifizierung deines System-Gits mitzunutzen. Aktiviere unter Windows bei der Installation von Git for Windows den Git Credential Manager, führe im Repo-Ordner einmalig `git push` aus und melde dich über das Browserfenster bei GitHub an. Danach greift Obsidian Git auf dem Desktop automatisch auf die vorhandenen System-Git-Zugangsdaten zu.

## Lokal eine Vorschau ansehen

Für den Einstieg reicht das Bearbeiten im Browser völlig aus. Wenn du eine Live-Vorschau brauchst, installiere Node.js ab Version 22.12 und führe im Hauptverzeichnis deines Repositorys Folgendes aus:

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

Öffne die im Terminal angezeigte Adresse, standardmäßig `http://localhost:4321`. Sobald du eine Markdown-Datei änderst, lädt die Seite automatisch neu.

Der Suchindex wird erst beim Build erzeugt. Wenn du die Suche testen willst, führe aus:

```powershell
pnpm run build
pnpm preview
```

Öffne diesmal die URL, die der Preview-Befehl ausgibt. Beim normalen Schreiben musst du aber nicht nach jedem Absatz einen kompletten Build durchlaufen lassen.

## Optional: Deployment per Token an GitHub Actions übergeben

Wenn deine Website erst hochgeladen werden soll, nachdem alle Prüfungen auf GitHub durchgelaufen sind, kannst du diesen Weg wählen. Die Standard-Git-Integration reicht aber völlig – nur zum Bloggen musst du das nicht extra einrichten.

Lege zuerst ein bestehendes Pages-Projekt an. Bei einem Projekt, das zuvor direkt mit GitHub verknüpft war, musst du in Cloudflare unter Build und Branch control die automatischen Deployments für Production- und Preview-Branches abschalten, damit derselbe Commit nicht doppelt veröffentlicht wird.

Erstelle ein benutzerdefiniertes Cloudflare API Token und gib ihm für das Zielkonto ausschließlich die Berechtigung **Account → Cloudflare Pages → Edit**.

Gehe anschließend in deinem GitHub-Repository zu **Settings → Secrets and variables → Actions** und trage Folgendes ein:

| Typ | Name | Inhalt |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | Das gerade erstellte Pages-Token |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Deine Cloudflare Account-ID |
| Variable | `CLOUDFLARE_PROJECT_NAME` | Name des bestehenden Pages-Projekts |
| Variable | `SITE_URL` | Vollständige URL der Live-Seite |
| Variable | `CF_PAGES_DEPLOY` | `true` |

`.github/workflows/deploy-cloudflare-pages.yml` in der Vorlage führt standardmäßig nur Prüfungen aus. Erst wenn `CF_PAGES_DEPLOY` gesetzt ist, wird genau das Build-Artefakt, das die Checks bestanden hat, in das angegebene Projekt hochgeladen.

Danach schreibst du deine Artikel wie gewohnt als Markdown in den jeweiligen Ordner und committest auf `main` – der einzige Unterschied ist, dass am Ende Actions den Upload übernimmt. Das Token liegt sicher in den GitHub Secrets.

## Wo du später was anpassen kannst

| Was du ändern willst | Dateipfad |
| --- | --- |
| Seitentitel, Autor, Beschreibung, Notizen | `site.config.mjs` |
| Artikel, Bilder | `articles/posts/文章名/` |
| Über-mich-Seite, Linkliste | `articles/spec/` |
| Vorlage für neue Artikel | `articles/templates/blog-post.md` |
| Avatar, Favicon | `public/` |
| Farben, Schriftgrößen und Abstände | `src/styles/global.css` |
| Navigation, Footer | `src/layouts/Base.astro` |

Diese Vorlage ist standardmäßig als einsprachiger Blog ausgelegt und verlangt nicht, dass jeder Artikel parallel in drei Sprachen vorliegt. Sie ist unabhängig vom dreisprachigen Publishing-System meines eigenen Blogs – so bleiben Schreiben und Veröffentlichen erst mal schön unkompliziert. Wenn später wirklich Bedarf entsteht, kannst du Kommentare oder andere Funktionen immer noch Stück für Stück nachrüsten.

Ich finde nach wie vor, dass bei einem Blog der Inhalt am wichtigsten ist. Genau deshalb habe ich mich inzwischen für diese schlichte Vorlage entschieden – um mehr und bessere Texte zu schreiben.

## Weiterlesen

Sobald die Seite online ist, richte dir als Erstes eine [[free-domain-and-web-community|kostenlose Domain]] ein; wenn du mehr über DNS, Bildspeicher und Service-Einstiegspunkte wissen willst, lies weiter bei [[cloudflare-free-tier-developer-guide|Cloudflare Free Tier]]; und falls du Notizen zwischen Smartphone und PC synchronisieren möchtest, schau dir [[fast-note-sync-on-student-server|Fast Note Sync]] an.

Die Gedanken hinter diesem minimalistischen Redesign stehen im [[blog-style-change|Blog-Redesign-Logbuch]], und wenn du nach dem Livegang Crawling und Seitenmetadaten prüfen willst, hilft dir der [[geoscore-2-4-guide|GeoScore Website-Check]] weiter.
