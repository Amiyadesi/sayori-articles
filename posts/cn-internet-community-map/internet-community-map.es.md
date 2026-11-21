---
title: Hice un repositorio de lista de foros pequeños
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: Organicé las comunidades de internet que tenía anotadas de forma dispersa para crear un pequeño repositorio de lista de foros tipo wiki y un sitio independiente. Todos son bienvenidos a enviar PRs.
image: ""
tags:
  - 2026夏
  - 社区记录
  - 开源
  - 论坛
category: "Registro personal"
draft: false
lang: es
translationKey: "posts/cn-internet-community-map/internet-community-map"
alias: ""
---

# Hice un repositorio de lista de foros pequeños

Desde hace tiempo quería armar un mapa de comunidades de internet.

Y no me refiero a las grandes plataformas visibles como X, Instagram, Tieba, Xiaohongshu o Little Black Box, sino a esos foros y comunidades a los que básicamente no llegas de forma natural a menos que los busques a propósito o te muevas en esos círculos.

Esto ya pasó de ser un simple artículo a convertirse en un repositorio independiente y una página en línea que se pueden mantener a largo plazo:

- Repositorio de GitHub: [https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)
- Página en línea: [https://forums.cc.cd/](https://forums.cc.cd/)

Ahora mismo el sitio se parece más a una wiki o documentación: a la izquierda está el menú con las categorías y el directorio de comunidades, en el centro las entradas específicas donde cada comunidad tiene su propia página, y al final de cada página agregué la sección de comentarios con Giscus.

La primera versión incluye 49 comunidades. Conforme la gente vaya aportando, corrigiendo errores o mandando PRs, esta cifra irá cambiando.

## Qué se incluye en este repositorio

Aquí "pequeño" no se mide estrictamente por el número de usuarios, sino por la forma en que llegas a ellos.

Si a una comunidad casi no llegas a menos que la busques activamente, o si solo la frecuenta la gente del mundillo del hosting, ACG, seguridad, hardware, webmasters o descarga de recursos, entonces probablemente califica para entrar.

Por ahora está dividido más o menos en estas categorías:

- Tecnología / IA / Desarrolladores
- Hosting / VPS / Webmasters / Sitios independientes
- Búsqueda / Recursos / Herramientas de conocimiento
- Seguridad / Ingeniería inversa / Sistemas / Software
- ACG / Juegos / Nichos
- Hardware / Electrónica / Homelab
- Adultos / Recursos / Zona gris
- Foros antiguos de fuera / Intereses generales

Aunque la categorización de la IA quedó un poco rara, ni modo, de momento se queda así.

## Cómo se ve la página ahora

Antes se parecía más a una lista larga en un README, pero ahora ya la separé en un sitio completo.

La página principal mantiene un vistazo rápido de las categorías, ideal para ver rápido qué comunidades hay; el menú de la izquierda sirve para navegar por categoría; y cada comunidad tiene su página individual para que sea fácil señalar si los datos de alguna están mal, si cambió la URL de acceso o si cambiaron las reglas de registro.

Al principio lo que quería hacer era un "mapa de comunidades de internet", pero mientras más escribía más me daba cuenta de que lo difícil no es dibujarlo, sino mantenerlo al día.

Los accesos a los foros cambian, los métodos de registro cambian y el ambiente de la comunidad también. En el mundillo del hosting la información se desactualiza constantemente por nuevos proveedores, rutas y promociones; y en las comunidades de ACG o recursos suele pasar lo mismo por cambios de dominio, permisos o reglas del foro.

Así que la idea ahora es: el repositorio se encarga del directorio y los datos objetivos, y el blog se encarga de mis experiencias personales.

Si de verdad he frecuentado bastante alguna comunidad, le escribo su propio artículo. Si solo es una recopilación de información pública, se queda en la lista.

## Qué incluye cada comunidad

En el repositorio intentaré poner estos datos en cada entrada:

- Acceso
- Enfoque y ambiente de la comunidad
- Método o requisitos de registro
- Contenido principal
- Para qué sirve o qué vale la pena ver
- Puntos a tener en cuenta
- Fuentes públicas
- Última fecha de verificación

Las comunidades que he probado personalmente durante un buen tiempo tendrán una descripción que suena más a una experiencia real.

Por ejemplo, con Linux.do y NodeLoc, me basaré en lo que viví y conté en mi artículo anterior de [[internet-community-1|互联网社区记录1]]: las reglas de Linux.do, sus misiones para principiantes, sitios sin fines de lucro, beneficios y chollos, optimización de desarrollo, co-creación de documentación y LDC; y en NodeLoc, su ambiente libre, subforos, puntos de batería, enlaces AFF y la actividad de sus webmasters.

Para las comunidades que no he usado a largo plazo, solo organizaré la información según las páginas públicas y lo que se comenta en esos círculos, sin fingir que es una experiencia de primera mano.

## Por qué son bienvenidos los PR

Un mapa como este tiene errores garantizados si lo hace una sola persona.

Hay comunidades donde los de afuera solo ven la portada pero no el ambiente real. En algunos foros las reglas de registro abren por temporadas, algunos dominios van cambiando y a veces es facilísimo confundir los nombres viejos con los nuevos.

Por eso, lo que más necesita este repositorio no son descripciones más bonitas, sino que los miembros reales de esas comunidades vengan a corregirlas.

Si eres un usuario veterano de alguna comunidad, o si simplemente ves que algo está mal escrito en una entrada, puedes mandar un PR directamente. Las aportaciones más valiosas suelen ser estas:

- ¿El registro ahora es abierto, por invitación o abre por épocas?
- ¿Qué reglas o anuncios debería leer primero un usuario nuevo al entrar?
- ¿El ambiente real tira más a lo técnico, a la charla casual, a la compraventa o a los recursos?
- ¿Cuál es la sección más valiosa que tienen?
- ¿Cambió la dirección de entrada o el dominio viejo se volvió inestable?
- ¿Hay descripciones que suenan demasiado a resumen de IA y necesitan cambiarse a un tono de usuario real?

Si no quieres mandar un PR, también puedes dejar un comentario al final de la página de la comunidad correspondiente. El sitio ahora usa Giscus, así que los comentarios van directo a GitHub Discussions.

## Cómo ayudar a organizar

Al agregar o modificar una comunidad, dale prioridad a cambiar los datos estructurados del repositorio:

```bash
data/communities.json
```

Después de modificar, ejecuta:

```bash
node scripts/generate-readme.mjs
node scripts/build-site.mjs
```

El primero sincroniza el README y el segundo genera la página en línea.

Si solo vas a editar las explicaciones de las categorías, puedes revisar:

```bash
docs/categories.md
```

Si vas a agregar una comunidad individual, lo ideal es incluir también las fuentes públicas. Las fuentes pueden ser el sitio oficial, la página de registro, anuncios del foro, la página "Sobre nosotros", las reglas o cualquier otra explicación accesible públicamente.

## Criterios de organización actuales

Por ahora, este proyecto ha sido organizado principalmente por una IA basándose en información pública, páginas web y un par de experiencias personales. Solo una parte de las comunidades son lugares donde de verdad he estado metido a largo plazo.

Por eso me gustaría que con el tiempo cada comunidad sea revisada poco a poco por usuarios reales.

También se incluyen comunidades de contenido para adultos, recursos, pirateo, ingeniería inversa, seguridad, rooteo/flasheo y compraventa, pero se explicará claramente por categorías: qué hay dentro, qué vale la pena observar y qué riesgos existen. La responsabilidad de decidir si entrar, participar o evaluar los riesgos corre totalmente por cuenta del lector.

Ahora mismo me interesa más convertirlo en un directorio público que se pueda ir corrigiendo con el tiempo, en lugar de un artículo de blog que quede obsoleto al poco tiempo de publicarlo.

Si ves algún foro que me haya faltado o si sientes que alguna entrada está escrita con muy poco conocimiento de causa, te invito a mandar un PR directamente en el repositorio:

[https://github.com/Amiyadesi/small-forums-list](https://github.com/Amiyadesi/small-forums-list)

## Seguir leyendo

Si quieres leer primero sobre mi experiencia personal navegando por estas comunidades, puedes empezar por [[internet-community-1|Linux.do、NodeLoc 和 NodeSeek]] y luego seguir con [[internet-community-2|兴趣社区篇]].

Los enlaces relacionados con blogs independientes los tengo organizados aparte en [[internet-community-3|站长社区和组织]], los cuales puedes ir explorando con calma junto con el mapa.
