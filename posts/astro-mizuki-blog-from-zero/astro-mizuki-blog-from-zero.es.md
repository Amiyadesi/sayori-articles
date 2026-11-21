---
title: "Montar un blog sencillo desde cero: GitHub, Cloudflare Pages y Obsidian opcional"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "Usa la plantilla completa Sayori Lite y conecta GitHub mediante Cloudflare Pages para montar un blog sencillo. Solo escribe Markdown en carpetas para publicar; Obsidian y la publicación con Token son opcionales"
image: ""
tags:
  - Tutorial práctico
  - Creación web y Cloudflare
  - Astro
  - Obsidian
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# Montar un blog sencillo desde cero: GitHub, Cloudflare Pages y Obsidian opcional

Ya iba siendo hora de poner orden en este tutorial. La versión anterior giraba en torno a Mizuki, Obsidian y un conjunto de scripts locales de sincronización; después, mi blog pasó a tener el aspecto sencillo de ahora, pero el tutorial seguía estancado en el pasado. Si seguías los pasos antiguos, tenías que añadir temas, cambiar directorios y pelearte con plugins y ajustes de despliegue: definitivamente no era adecuado como primer tutorial para crear una web.

Por eso esta vez lo he dejado preparado como una plantilla completa lista para usar, llamada **Sayori Lite · Mi escritorio**. Conserva el tono papel cálido, los enlaces verde oliva y los toques coral de mi blog actual; la portada lista directamente los artículos y el cuerpo deja un espacio cómodo para leer.

Esta vez montaremos primero la web y luego ya pensarás con qué herramienta te gusta escribir. Se puede publicar usando solo la web de GitHub; Obsidian es el método que recomiendo para escribir, pero no es obligatorio instalarlo.

> Este artículo se ha reescrito según la plantilla y la documentación oficial del 16 de octubre de 2026. Se mantienen la dirección del artículo anterior y la del repositorio de la plantilla; las capturas antiguas y los pasos del plugin de PowerShell ya no aplican.

## Prepara primero dos cuentas

Necesitas [GitHub](https://github.com/signup) y [Cloudflare](https://dash.cloudflare.com/sign-up). GitHub guarda el código de la web y los artículos, mientras que Cloudflare Pages se encarga de compilar, alojar el sitio y darte una dirección `pages.dev`. Para un primer sitio no hace falta comprar un dominio desde el principio; también puedes probar con un subdominio gratuito[[free-domain-and-web-community|dominios gratuitos y comunidades de webmasters]].

La ruta por defecto es:

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**Esta ruta no usa Cloudflare API Token.** Para escribir artículos no hace falta configurar claves de publicación adicionales; solo necesitarás el Token que explico más adelante si quieres cambiar a subidas mediante GitHub Actions.

## Crea tu propio repositorio con la plantilla

La plantilla sigue en esta dirección; de momento no le he cambiado el nombre, así que el enlace antiguo sigue sirviendo:

[Repositorio de la plantilla Sayori Lite](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

Al abrirlo, haz clic en **Use this template → Create a new repository**, elige tu cuenta en Owner y pon un nombre al repositorio, por ejemplo `my-blog`.

Esta vez el repositorio ya incluye el sitio completo en Astro, con una estructura aproximada como esta:

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

`articles/` es el directorio donde escribes y `src/` es el código de la web; los artículos participan directamente en la compilación.

## Conecta Cloudflare con GitHub

Entra en **Workers & Pages** dentro de Cloudflare, crea una aplicación, elige **Pages** y selecciona importar un repositorio Git existente. Autoriza a Cloudflare a acceder al repositorio que acabas de crear (solo a ese).

En los ajustes de compilación rellena esto:

| Ajuste | Contenido |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | Déjalo vacío para usar la raíz del repositorio |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Variable de entorno `NODE_VERSION` | `22` |
| Variable de entorno `PNPM_VERSION` | `11.0.8` |
| Variable de entorno `SITE_URL` | `https://你的项目名.pages.dev` |

El nombre del proyecto determinará la dirección inicial `pages.dev`. Guarda y despliega; cuando termine la compilación, abre la URL que te muestra Cloudflare.

Pages instalará las dependencias según el archivo de bloqueo. Si el entorno no ofrece pnpm correctamente, el README de la plantilla incluye un comando de compilación alternativo con la instalación de una versión fija de pnpm; revisa primero los registros antes de tocar nada, no hace falta cambiar todo el sistema de despliegue.

En `SITE_URL` debes poner la dirección oficial del sitio, porque la usan el RSS, el sitemap y las etiquetas canonical. Si más adelante vinculas tu propio dominio, acuérdate de cambiar esto también y volver a desplegar; no pongas la URL del repositorio de GitHub ni la del panel de administración.

## Conviértelo en tu propio escritorio

Abre `site.config.mjs` en GitHub, pulsa editar y cambia el nombre del sitio, el autor y la descripción por los tuyos. Coloca el archivo de tu avatar en `public/` y escribe la ruta interna correspondiente en la configuración.

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

Si ya configuraste `SITE_URL` en Cloudflare, puedes dejar `url` vacío en la configuración, ya que la variable de entorno tiene prioridad.

Para la página «Acerca de» edita `articles/spec/about.md`, y para la página de enlaces amigos edita `articles/spec/friends.md`; en esta última basta con escribir enlaces en Markdown y una breve presentación.

La plantilla incluye archivo, tabla de contenidos en los artículos, ampliación de imágenes, tema claro/oscuro, búsqueda con Pagefind, RSS y sitemap; el cuerpo del texto usa las fuentes del sistema.

## Publica tu primer artículo sin instalar nada en local

En tu repositorio de GitHub haz clic en **Add file → Create new file** y escribe como nombre de archivo:

```text
articles/posts/my-first-post/index.md
```

La barra inclinada creará la carpeta automáticamente. De momento puedes usar este contenido de prueba:

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

Cambia la fecha por el momento real en que lo escribes. Al terminar, pulsa **Commit changes** para enviarlo a `main`. En cuanto Cloudflare detecte el commit compilará la web automáticamente, y cuando acabe verás el artículo en la portada.

La regla aquí es muy simple: una carpeta por artículo, con nombre en minúsculas en inglés, números y guiones, y el texto siempre llamado `index.md`. `my-first-post` determina la dirección pública `/posts/my-first-post/`; si luego cambias el título no cambiará la URL, pero si renombras la carpeta sí.

`draft: true` marca el artículo como borrador; solo se generará la página cuando lo cambies a `false`. Los artículos con fecha de publicación futura también quedan excluidos temporalmente, y cuando llegue el día tendrás que lanzar otra compilación, ya que la plantilla no incluye publicación programada.

En mi propio flujo de publicación con Obsidian, `private: true` omite la sincronización pública para que el artículo se quede solo en local; esta plantilla independiente, por ahora, usa únicamente `draft` para controlar la publicación de páginas.

## Recomiendo usar Obsidian

Si ya te gusta escribir en Markdown, puedes elegir el editor que quieras, pero como yo uso Obsidian, el flujo de trabajo adaptado a él te va a ir mucho mejor. Si te animas con Obsidian, puedes hacerlo así:

0. Descarga [obsidian](https://obsidian.md/download).
1. Instala Git y clona en local el repositorio que acabas de crear.
2. En Obsidian elige «Abrir carpeta como bóveda» y abre toda la raíz `my-blog`, no abras solo `articles/`.
3. La plantilla ya trae configurados los ajustes básicos de Templates; la carpeta de plantillas es `articles/templates`.
4. Crea `index.md` dentro de `articles/posts/文章名/`, ejecuta «Insertar plantilla» y elige `blog-post`.
5. Cuando termines de escribir, cambia el título, la fecha y `draft`, haz commit y súbelo a GitHub.

Usar la raíz del repositorio como bóveda de Obsidian sirve para que el plugin de Git encuentre directamente el repositorio en el mismo nivel. Por defecto, los adjuntos se guardan junto al artículo actual; no pasa nada porque el archivo se llame `index.md`, el título del artículo lo decide `title` en las propiedades.

Si quieres hacer commits desde dentro de Obsidian, instala desde la tienda de plugins comunitarios el plugin **Git** del autor **Vinzent** (su ID es `obsidian-git`).

En cuanto al inicio de sesión, te recomiendo reutilizar la autenticación de Git del sistema. En Windows, activa Git Credential Manager al instalar Git for Windows, ejecuta `git push` la primera vez en el directorio del repositorio e inicia sesión en tu GitHub siguiendo el aviso del navegador. Hecho esto, Obsidian Git en escritorio podrá usar las credenciales ya guardadas en el sistema.

## Si quieres ver cómo queda en local

Para empezar, te vale perfectamente con editar desde la web. Cuando necesites vista previa en tiempo real, instala Node.js 22.12 o superior y ejecuta en la raíz de tu repositorio:

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

Abre la dirección que muestre la terminal; por defecto es `http://localhost:4321`. Al modificar el Markdown se recargará solo.

El índice de búsqueda se genera al compilar, así que si quieres probar el buscador ejecuta:

```powershell
pnpm run build
pnpm preview
```

Esta vez abre la dirección que te indique el comando de vista previa. Cuando estés escribiendo con normalidad no hace falta hacer una compilación completa cada vez que cambias un párrafo.

## Opcional: delegar la publicación en GitHub Actions con un Token

Si prefieres que la web se suba solo después de pasar todas las comprobaciones en GitHub, puedes optar por esta vía. La integración Git por defecto ya es más que suficiente, así que no hace falta configurarlo solo para ponerte a escribir.

Prepara primero un proyecto de Pages ya existente. En el proyecto que estaba conectado a GitHub, desactiva el despliegue automático de las ramas de producción y vista previa dentro de Build y Branch control en Cloudflare, para evitar que un mismo commit publique dos veces.

Crea un API Token personalizado en Cloudflare dándole únicamente el permiso **Account → Cloudflare Pages → Edit** en la cuenta correspondiente.

Después entra en **Settings → Secrets and variables → Actions** dentro de tu repositorio de GitHub y rellena:

| Tipo | Nombre | Contenido |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | El Token de Pages que acabas de crear |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | El ID de tu cuenta de Cloudflare |
| Variable | `CLOUDFLARE_PROJECT_NAME` | El nombre del proyecto de Pages ya existente |
| Variable | `SITE_URL` | La URL completa del sitio oficial |
| Variable | `CF_PAGES_DEPLOY` | `true` |

Por defecto, `.github/workflows/deploy-cloudflare-pages.yml` en la plantilla solo realiza comprobaciones. Únicamente si configuras `CF_PAGES_DEPLOY` subirá al proyecto indicado el mismo artefacto compilado que haya superado las pruebas.

Después seguirás escribiendo Markdown en la carpeta del artículo y haciendo commit a `main`; la única diferencia es que al final lo sube Actions. El Token queda guardado en GitHub Secrets.

## Dónde tocar si luego quieres cambiar algo

| Qué quieres cambiar | Ubicación del archivo |
| --- | --- |
| Nombre del sitio, autor, descripción, notas | `site.config.mjs` |
| Artículos, imágenes | `articles/posts/文章名/` |
| Página «Acerca de», página de enlaces amigos | `articles/spec/` |
| Plantilla para artículos nuevos | `articles/templates/blog-post.md` |
| Avatar, favicon del navegador | `public/` |
| Paleta de colores, tamaño de letra y espaciado | `src/styles/global.css` |
| Navegación, pie de página | `src/layouts/Base.astro` |

Esta plantilla está pensada por defecto para un blog de artículos en chino simplificado y no exige que cada entrada esté en tres idiomas a la vez. Es independiente del sistema de publicación trilingüe de mi propio blog: primero hagamos que escribir y publicar sea fácil. Más adelante, si tienes una necesidad clara, ya irás añadiendo comentarios u otras funciones poco a poco.

Sigo pensando que lo más importante de un blog es lo que hay dentro, así que ahora mismo me he quedado con esta plantilla sencilla para escribir más y mejores contenidos.

## Sigue leyendo

Una vez que el sitio esté en línea, configúrale primero un [[free-domain-and-web-community|dominio gratuito]]; si quieres entender el DNS, el almacenamiento de imágenes y los puntos de entrada de servicios, sigue con [[cloudflare-free-tier-developer-guide|el nivel gratuito de Cloudflare]]; y si quieres sincronizar tus escritos entre el móvil y el ordenador, échale un vistazo a [[fast-note-sync-on-student-server|Fast Note Sync]].

Las decisiones detrás de este estilo minimalista están en [[blog-style-change|el registro de rediseño del blog]], y si una vez publicada la web quieres revisar el rastreo y los metadatos de página, puedes continuar con [[geoscore-2-4-guide|la revisión web con GeoScore]].
