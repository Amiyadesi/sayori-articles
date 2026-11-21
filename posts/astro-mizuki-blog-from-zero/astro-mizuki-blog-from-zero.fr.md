---
title: "Créer un blog minimaliste de zéro : GitHub, Cloudflare Pages et Obsidian (en option)"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "Utilisez le modèle complet Sayori Lite pour lancer un blog épuré via Cloudflare Pages connecté à GitHub. Écrivez en Markdown par dossier pour publier ; Obsidian et le déploiement par Token sont entièrement optionnels."
image: ""
tags:
  - Tutoriel pratique
  - Hébergement et Cloudflare
  - Astro
  - Obsidian
category: "Tutoriels et guides"
draft: false
alias: ""
lang: fr
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# Créer un blog minimaliste de zéro : GitHub, Cloudflare Pages et Obsidian (en option)

Il était grand temps de dépoussiérer ce tutoriel. La version précédente tournait autour de Mizuki, d'Obsidian et d'une série de scripts de synchronisation locaux. Mon blog a depuis pris sa forme minimaliste actuelle, mais le guide était resté figé dans le passé. Suivre les anciennes étapes obligeait à rajouter un thème, modifier l'arborescence et jongler avec des plugins et des fichiers de déploiement — franchement pas idéal comme premier tutoriel de création de site.

J'ai donc tout remis au propre sous la forme d'un modèle complet prêt à l'emploi appelé **Sayori Lite · Mon bureau**. Il conserve la teinte papier chaud, les liens vert olive et les quelques touches corail de mon blog actuel : la page d'accueil liste directement les articles et le corps du texte laisse respirer la lecture.

Cette fois, on commence par mettre le site en ligne, et on verra ensuite quel outil d'écriture vous préférez. L'interface web de GitHub suffit amplement pour publier ; Obsidian est la méthode que je recommande, mais rien ne vous oblige à l'installer.

> Cet article a été réécrit selon le modèle et la documentation officielle au 16 octobre 2026. L'ancienne adresse de l'article et le dépôt du modèle restent valides, mais les anciennes captures d'écran et les étapes liées aux plugins PowerShell ne s'appliquent plus.

## Préparer d'abord deux comptes

Il vous faut un compte [GitHub](https://github.com/signup) et un compte [Cloudflare](https://dash.cloudflare.com/sign-up). GitHub héberge le code du site et vos articles ; Cloudflare Pages se charge de compiler et d'héberger le site tout en vous fournissant une adresse `pages.dev`. Inutile d'acheter un nom de domaine dès le départ, et vous pouvez aussi tester un sous-domaine gratuit [[free-domain-and-web-community|Domaines gratuits et communautés de webmasters]].

Voici le parcours par défaut :

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**Ce parcours n'utilise pas de Cloudflare API Token.** Vous n'avez aucune clé de publication supplémentaire à configurer pour écrire des articles ; le Token mentionné plus loin ne sert que si vous souhaitez basculer sur un déploiement via GitHub Actions.

## Créer votre dépôt à partir du modèle

Le modèle se trouve toujours à cette adresse — je n'ai pas changé son nom pour l'instant, l'ancien lien fonctionne donc toujours :

[Dépôt du modèle Sayori Lite](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

Une fois sur la page, cliquez sur **Use this template → Create a new repository**, sélectionnez votre compte comme Owner et donnez un nom au dépôt, par exemple `my-blog`.

Cette fois, le dépôt contient déjà un site Astro complet, structuré à peu près comme suit :

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

`articles/` est le dossier d'écriture et `src/` contient le code du site ; vos articles sont directement intégrés lors de la compilation.

## Connecter Cloudflare à GitHub

Dans Cloudflare, ouvrez **Workers & Pages**, créez une application, choisissez **Pages**, puis sélectionnez l'importation d'un dépôt Git existant. Autorisez Cloudflare à accéder uniquement au dépôt que vous venez de créer.

Renseignez les paramètres de build suivants :

| Paramètre | Valeur à saisir |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | Laisser vide (racine du dépôt) |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Variable d'environnement `NODE_VERSION` | `22` |
| Variable d'environnement `PNPM_VERSION` | `11.0.8` |
| Variable d'environnement `SITE_URL` | `https://你的项目名.pages.dev` |

Le nom du projet déterminera votre adresse `pages.dev` initiale. Enregistrez et déployez, puis ouvrez l'URL affichée par Cloudflare une fois le build terminé.

Pages installe les dépendances d'après le fichier de verrouillage. Si l'environnement ne fournit pas correctement pnpm, le README du modèle propose une commande de build alternative incluant l'installation d'une version fixe de pnpm. Jetez d'abord un œil aux logs avant de modifier quoi que ce soit, inutile de changer toute la méthode de déploiement.

`SITE_URL` doit correspondre à l'adresse officielle de votre site, car le flux RSS, le sitemap et les balises canonical s'appuient dessus. Si vous liez votre propre nom de domaine par la suite, pensez à mettre à jour cette variable et à redéployer ; n'y mettez ni l'URL du dépôt GitHub ni celle du tableau de bord.

## Personnaliser votre bureau

Sur GitHub, ouvrez `site.config.mjs`, cliquez sur modifier et remplacez le nom du site, l'auteur et la description par les vôtres. Placez votre fichier d'avatar dans `public/` et indiquez le chemin interne correspondant dans la configuration.

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

Si vous avez déjà défini `SITE_URL` dans Cloudflare, vous pouvez laisser `url` vide dans la configuration : la variable d'environnement a la priorité.

Pour la page « À propos », modifiez `articles/spec/about.md` ; pour la page de liens amis, modifiez `articles/spec/friends.md` — il suffit d'y écrire des liens Markdown accompagnés d'une courte présentation.

Le modèle intègre les archives, la table des matières, le zoom sur les images, les thèmes clair et sombre, la recherche Pagefind, le flux RSS et le sitemap. Le corps du texte utilise les polices système.

## Publier un premier article sans rien installer en local

Dans votre dépôt GitHub, cliquez sur **Add file → Create new file** et saisissez comme nom de fichier :

```text
articles/posts/my-first-post/index.md
```

Les barres obliques créeront automatiquement les dossiers. Vous pouvez commencer avec ce contenu :

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

Ajustez la date selon le moment où vous écrivez. Une fois terminé, cliquez sur **Commit changes** pour valider sur `main`. Dès que Cloudflare détecte le commit, il lance automatiquement le build, et votre article apparaît sur la page d'accueil.

La règle est toute simple : un dossier par article (en minuscules, chiffres et tirets) et un fichier texte toujours nommé `index.md`. C'est `my-first-post` qui détermine l'URL publique `/posts/my-first-post/` ; modifier le titre plus tard ne changera pas l'adresse, mais renommer le dossier, si.

`draft: true` correspond à un brouillon : la page n'est générée que lorsque vous passez la valeur à `false`. Les articles datés dans le futur sont également écartés temporairement ; une fois la date atteinte, il faudra déclencher un nouveau build, car le modèle n'embarque pas de planificateur de publication.

Dans mon propre flux de publication Obsidian, `private: true` permet d'ignorer la synchronisation publique pour garder l'article uniquement en local ; ce modèle autonome utilise uniquement `draft` pour contrôler la publication des pages.

## Utiliser Obsidian (recommandé)

Si vous aimez déjà le Markdown, n'importe quel éditeur fera l'affaire. Cela dit, comme j'écris moi-même sous Obsidian, le flux de travail y est forcément mieux adapté. Si vous voulez l'utiliser, voici comment procéder :

0. Téléchargez [Obsidian](https://obsidian.md/download)
1. Installez Git et clonez votre nouveau dépôt en local
2. Dans Obsidian, choisissez « Ouvrir un dossier comme coffre » et sélectionnez tout le dossier racine `my-blog`, pas uniquement `articles/`
3. Les paramètres du module principal Modèles sont déjà préconfigurés dans le dépôt, avec comme dossier de modèles `articles/templates`
4. Créez `index.md` dans `articles/posts/文章名/`, lancez la commande « Insérer un modèle » et choisissez `blog-post`
5. Une fois l'article rédigé, mettez à jour le titre, la date et `draft`, puis faites un commit et poussez vers GitHub

Ouvrir la racine du dépôt comme coffre Obsidian permet au plugin Git de détecter directement le dépôt Git situé au même niveau. Les pièces jointes sont enregistrées par défaut à côté de l'article en cours ; peu importe que le fichier s'appelle `index.md`, le titre de l'article est défini par la propriété `title`.

Pour faire vos commits directement depuis Obsidian, installez le plugin communautaire **Git** créé par **Vinzent** (identifiant du plugin : `obsidian-git`).

Pour l'authentification, je vous conseille de réutiliser les identifiants Git du système. Sous Windows, activez Git Credential Manager lors de l'installation de Git for Windows, puis exécutez `git push` une première fois dans le dossier du dépôt et connectez-vous à GitHub via le navigateur. Ensuite, Obsidian Git sur ordinateur réutilisera automatiquement les identifiants enregistrés par le système.

## Prévisualiser le rendu en local

Vous pouvez très bien commencer par éditer directement sur le web. Si vous avez besoin d'un aperçu en temps réel, installez Node.js 22.12 ou supérieur, puis lancez à la racine de votre dépôt :

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

Ouvrez l'adresse affichée dans le terminal, par défaut `http://localhost:4321`. La page se rafraîchira automatiquement à chaque modification de vos fichiers Markdown.

L'index de recherche est généré lors de la compilation ; pour tester la recherche, exécutez :

```powershell
pnpm run build
pnpm preview
```

Ouvrez ensuite l'adresse indiquée par la commande de prévisualisation. Au quotidien, nul besoin de lancer un build complet à chaque paragraphe modifié.

## Optionnel : déployer via GitHub Actions avec un Token

Si vous préférez que le site ne soit mis en ligne qu'une fois toutes les vérifications GitHub validées, vous pouvez opter pour cette méthode. L'intégration Git par défaut suffit largement, inutile de reconfigurer quoi que ce soit juste pour écrire des articles.

Préparez d'abord un projet Pages existant. Sur le projet initialement lié à GitHub, désactivez les déploiements automatiques des branches de production et de prévisualisation dans les paramètres Build et Branch control de Cloudflare, afin d'éviter qu'un même commit ne déclenche deux publications.

Créez un API Token personnalisé dans Cloudflare en lui attribuant uniquement la permission **Account → Cloudflare Pages → Edit** sur le compte cible.

Rendez-vous ensuite dans votre dépôt GitHub sous **Settings → Secrets and variables → Actions** et ajoutez :

| Type | Nom | Contenu |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | Le Pages Token fraîchement créé |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Votre ID de compte Cloudflare |
| Variable | `CLOUDFLARE_PROJECT_NAME` | Le nom du projet Pages existant |
| Variable | `SITE_URL` | L'URL complète du site officiel |
| Variable | `CF_PAGES_DEPLOY` | `true` |

Par défaut, `.github/workflows/deploy-cloudflare-pages.yml` dans le modèle se contente d'exécuter les vérifications. Ce n'est qu'une fois `CF_PAGES_DEPLOY` activé que le résultat du build validé sera téléversé vers le projet indiqué.

Vous continuerez d'écrire vos fichiers Markdown dans les dossiers d'articles et de les pousser sur `main`, la seule différence étant que l'envoi final passe par Actions avec votre Token stocké dans les GitHub Secrets.

## Où modifier quoi plus tard

| Élément à modifier | Emplacement du fichier |
| --- | --- |
| Nom du site, auteur, bio, notes | `site.config.mjs` |
| Articles, images | `articles/posts/文章名/` |
| Page À propos, liens amis | `articles/spec/` |
| Modèle de nouvel article | `articles/templates/blog-post.md` |
| Avatar, favicon | `public/` |
| Couleurs, taille de police, espacements | `src/styles/global.css` |
| Navigation, pied de page | `src/layouts/Base.astro` |

Ce modèle est configuré par défaut pour un blog en chinois simplifié et n'impose pas de traduire chaque article en trois langues. Il est indépendant du système de publication trilingue de mon propre blog, histoire de garder l'écriture et la mise en ligne aussi simples que possible. Vous pourrez toujours ajouter les commentaires ou d'autres fonctionnalités petit à petit si le besoin s'en fait sentir.

Je reste persuadé que l'essentiel d'un blog réside dans ce qu'on y écrit : c'est justement pour ça que j'ai choisi ce modèle minimaliste, afin de me concentrer sur l'écriture de meilleurs articles.

## Pour aller plus loin

Une fois le site en ligne, commencez par configurer un [[free-domain-and-web-community|domaine gratuit]] ; pour comprendre le DNS, le stockage d'images et les points d'entrée des services, poursuivez avec [[cloudflare-free-tier-developer-guide|l'offre gratuite de Cloudflare]] ; et si vous voulez synchroniser vos brouillons entre téléphone et ordinateur, jetez un œil à [[fast-note-sync-on-student-server|Fast Note Sync]].

Les choix derrière ce style épuré sont détaillés dans [[blog-style-change|Journal de refonte du blog]], et une fois votre site publié, vous pouvez vérifier son indexation et ses métadonnées avec [[geoscore-2-4-guide|Audit de site GeoScore]].
