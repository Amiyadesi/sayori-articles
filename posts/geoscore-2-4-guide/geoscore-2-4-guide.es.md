---
title: "GeoScore 2.4.5: una herramienta para que un webmaster vea qué le falta realmente a su sitio"
published: 2026-07-16
created: 2026-07-16
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Usa el perfil del sitio, pruebas reales de rastreo y un informe de corrección para aclarar qué le falta de verdad a una web
image: ""
tags:
  - Tutorial práctico
  - Creación de webs y Cloudflare
  - GEO
  - Código abierto
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: "posts/geoscore-2-4-guide/geoscore-2-4-guide"
---

# GeoScore 2.4.5: una herramienta para que un webmaster vea qué le falta realmente a su sitio

## Primero, por qué lo hice

Las versiones anteriores de geoscore eran un proyecto ya desarrollado por otra persona, [https://geoscoreapp.pages.dev/](https://geoscoreapp.pages.dev/), que también puedes probar aquí; yo intenté ir optimizando el seo de mi web con él, e incluso añadí [Amiya's Desk](https://www.wikidata.org/wiki/Q140378510) y [Amiya_desi](https://www.wikidata.org/wiki/Q140378992) con listas tipo wiki para reforzar el geo y el seo.

Pero bueno, más adelante el proyecto mostró sus limitaciones: a mi blog personal le llegaban seguido sugerencias para añadir FAQs, tablas de precios o schema de Service, cuando mi sitio ni tiene planes ni acepta encargos.

Total, como tampoco me falta cuota de IA y yo mismo tenía la necesidad, me puse a hacer un fork y seguir desarrollándolo a ver qué tal; esta vez tenía claro que había que afinar bien la clasificación, porque para un blog personal este tipo de FAQs, tablas de precios y schema de Service sobra del todo.

GeoScore nació como un desarrollo derivado sobre el trabajo del autor original, [https://github.com/sprawf/geoscore](https://github.com/sprawf/geoscore); el GeoScore original tenía licencia Mit, así que decidí mantenerla.

Es una herramienta de auditoría SEO y GEO de código abierto bajo licencia MIT; tanto el acceso como el código fuente están aquí.

<https://geo.sayori.org>

<https://github.com/Amiyadesi/geoscore>

La documentación completa en chino e inglés está aquí.

<https://geo.sayori.org/docs>

Su trabajo consiste en separar los problemas ya detectados, los que aún no se saben y los que directamente no aplican, y luego dejarle al webmaster rutas de corrección verificables y generar un documento md con las conclusiones para dárselo a una IA y hacer mejoras puntuales.

## El núcleo de 2.4.5 sigue siendo separar conclusiones de suposiciones

Cada comprobación de hechos tiene solo cinco estados.

| Estado | Significado |
| --- | --- |
| `pass` | Confirmado como aprobado a partir de la página o la respuesta |
| `fail` | Hay evidencia clara de que requiere atención |
| `not_applicable` | Esta regla no aplica al sitio o página actual |
| `unknown` | No hay evidencia suficiente para decidir ahora |
| `error` | Hubo un problema de rastreo o de un servicio externo |

Solo `pass` y `fail`, cuando aplican y tienen conclusión, entran en la puntuación de hechos.

`unknown` y `error` no se disfrazan de fallos, pero reducen coverage y confidence.

Cuando hay poca evidencia, GeoScore prefiere mostrar que faltan pruebas; en el fondo, eso también deja ver que en este aspecto todavía hay muchas carencias.

La versión 2.4 añadió un mecanismo de tope por fallos graves.

Un fallo critical baja el puntaje máximo de la categoría correspondiente a 49, y cada critical extra lo reduce 10 puntos más, hasta un mínimo de 19.

Un fallo major baja el tope a 79, y cada major extra lo reduce 10 puntos más, hasta un mínimo de 49.

Los fallos minor pesan menos, pero tampoco conviene ignorarlos por completo.

Esta regla existe para evitar que un sitio problemático —bloqueado por `noindex`, imposible de rastrear o sin texto extraíble— saque un informe con una nota alta aparentemente segura solo porque tiene bien resueltos los alt de las imágenes y Open Graph.

Por eso ahora miro los resultados en un orden muy rígido: primero los fallos graves y la evidencia, luego coverage y confidence, y al final la puntuación total.

## Cómo participan 73 sitios reales en la calibración

No quería demostrar que la clasificación acierta usando solo mi blog, así que ahora mantengo una matriz de calibración de tipos con 73 sitios.

Incluye medios de noticias, blogs personales, portafolios, sitios de documentación, proyectos de código abierto, comercio electrónico, comunidades, SaaS, servicios profesionales, negocios locales, organizaciones sin fines de lucro y sitios gubernamentales y universitarios.

Para cada sitio se anota primero el rango de tipos aceptable, y luego el código actual rastrea y decide por su cuenta.

En las dos últimas ejecuciones salieron 48 coincidencias, 0 revisiones manuales y 25 no disponibles, y en la otra 47 coincidencias, 0 revisiones manuales y 26 no disponibles.

La diferencia de un sitio entre ambas ejecuciones viene de la disponibilidad real de red, no de un nuevo conflicto de clasificación.

Todas las muestras rastreadas con éxito y resueltas quedaron dentro del rango de tipos permitido de antemano.

Que algo no esté disponible suele deberse a WAF, restricciones regionales, errores de red o páginas de verificación; no cuenta ni como acierto ni como fallo de clasificación.

Esos 25 sitios se quedan en la matriz porque a los que una herramienta de auditoría tiene que enfrentarse de verdad es a páginas que no colaboran.

La puntuación en sí se calibra aparte usando fixtures HTML dorados.

Blogs personales, SaaS, comercio electrónico, negocios locales, medios y sitios desconocidos tienen evidencias y rangos de puntuación fijos, y el tope por fallos graves también tiene pruebas de regresión independientes.

La matriz de sitios reales sirve para detectar sesgos de clasificación, y los fixtures dorados sirven para que los cambios de puntuación sean repetibles; no conviene mezclar ambas cosas en un porcentaje de éxito bonito.

## Modo sitio y modo URL única

GeoScore tiene dos formas de usarse.

Si pones un dominio, entra en modo sitio y extrae como máximo cinco páginas HTML representativas.

Primero se lee la página de inicio; si se detecta una página About, se añade también, y luego se eligen otras muestras según el tipo de ruta a partir del sitemap o de los enlaces internos de la portada.

Cinco páginas no es un rastreador de todo el sitio; simplemente mantiene cada auditoría dentro de un margen explicable y reproducible.

Por eso vale la pena mirar la lista de muestras del informe: te dice de qué páginas concretas salen las conclusiones de esa ejecución.

Si solo quiero revisar un artículo nuevo, una landing recién retocada o una página temática, puedo pegar la URL completa.

Eso entra en modo URL única y revisa a fondo la página objetivo.

Cuando la página objetivo no es la portada, la herramienta igual lee la portada si hace falta para dar contexto, evitando que un único artículo sobre IA haga pasar a todo el sitio por un SaaS.

Yo suelo ejecutar primero el dominio para confirmar la configuración general del sitio y su perfil, y luego paso el modo URL única sobre la página que de verdad voy a modificar.

## Primero confirma qué creyó que eras

Al terminar la auditoría, no te quedes mirando la puntuación total de inmediato.

Mira primero el perfil del sitio.
![[Pasted image 20260720112010.png|width=360|align=center]]

Ahí aparecen el tipo de sitio, la entidad, el idioma, el dominio raíz, las páginas muestreadas, la confianza de detección y la evidencia de clasificación.

El perfil se apoya primero en JSON-LD, canonical, título, navegación y estructura de la página; las palabras clave del cuerpo solo cuentan como señal débil.

Esto evita que un blog personal se clasifique como SaaS, que un sitio de documentación acabe como tienda o que a un sitio de artículos le metan a la fuerza schema comercial.

Si el tipo no encaja de verdad, puedes dar una pista de tipo solo para esta auditoría y elegir el tipo correcto pulsando en corregir tipo.

No equivale a escribir una regla permanente en todo el sistema ni afecta a otras webs.

## Por qué no conviene seguir calculando a la fuerza cuando no se puede leer la página

Las webs reales rara vez devuelven el texto limpio a la primera.

Algunas devuelven un challenge de Cloudflare, otras una página de inicio de sesión o de consentimiento, y SiteGround incluso puede devolver una página de verificación `/.well-known/sgcaptcha/` con HTTP 202.

Esas páginas también parecen HTML, pero hacer una auditoría SEO sobre ellas solo da un informe falso sobre una página de verificación.

2.4.5 detecta primero estas páginas intermedias y deja de tratar un HTTP 202 o una verificación vacía como una captura correcta.

Cuando la comprobación HTTP normal topa con un challenge, un error de red reintentable o un cascarón vacío de JavaScript, la portada puede recurrir una vez a Cloudflare Browser Run como respaldo.

Ese intento tiene un presupuesto claro de 20 segundos.

La navegación de la página usa como máximo 16.5 segundos, tras el evento `load` se dan 1.5 segundos más para completar la hidratación normal y al final se reservan 2 segundos para capturar el HTML.

Antes, al usar `networkidle2`, los scripts de analítica y las peticiones continuas podían hacer que la página no llegara nunca a estar inactiva en red y acabaran agotando todo el presupuesto.

Ahora ya no espera a que la red en segundo plano quede en calma absoluta, pero sigue comprobando si el resultado renderizado es un challenge, una página de error o un cascarón de JavaScript sin contenido.

Si el respaldo también falla, GeoScore deja la página en `unknown` o `error`, y la puntuación total puede pasar directamente a evidencia insuficiente.

2.4.5 sube además la caché de auditoría a `v24`.

Así, tras desplegar, no se siguen sirviendo resultados de tiempos de espera agotados o páginas de verificación heredados de versiones anteriores, y la caché antigua caduca de forma natural según su TTL original.

## Cómo usar la API personalizada

Debajo del cuadro de entrada de la portada hay un panel de API personalizada plegado por defecto.

Es una función opcional, pensada solo para hacer una observación de respuesta en Evidence Map una vez terminada la auditoría de hechos.

Al introducir API Key, HTTPS Base URL y model, puedes obtener la lista de modelos o escribir a mano un model conocido.

No hace falta concatenar `/v1/models` a mano en la Base URL.

Si pongo `https://api.example.com`, GeoScore lo completa automáticamente a `https://api.example.com/v1`.

Si por descuido pego también `/models` o `/chat/completions`, primero vuelve a la raíz de API correspondiente y luego envía la petición.

Los tres campos deben rellenarse juntos; si falta uno, no se puede enviar la petición.

Antes de iniciar la auditoría, el navegador los limpia; no se guardan en el almacenamiento del navegador, en la URL ni en los informes descargados.

El servidor tampoco los trata más que como configuración de una sola petición y no los persiste al acabar la auditoría.

Eso no significa que puedas mostrar una Key real en una grabación de pantalla o en directo; los datos sensibles conviene taparlos igual.

Al terminar la petición, la última respuesta de la API aparece directamente arriba en Evidence Map.

Ahí se ven la consulta, el modelo, el estado, la hora, la duración, el texto de respuesta y el número de citas, y la respuesta completa junto con las citas se pueden desplegar.

Que la API personalizada tenga éxito o falle no altera la puntuación de hechos.

Yo la dejo para después de haber trabajado ya una ronda sobre los problemas de hechos.

Primero conviene ver los problemas de la propia página y luego mirar la búsqueda externa y la observación de respuestas; hacerlo al revés facilita que te desvíe un texto generado.

## Para qué sirve realmente el Token de monitorización

Al crear un proyecto de monitorización se obtienen dos cosas: project ID y management token.

El project ID sirve para identificar el proyecto, y el Token sirve para demostrar que tienes permiso para leer el proyecto, modificar consultas, ejecutar snapshots, ver el historial, rotar el Token o borrar el proyecto.

El servidor solo guarda un hash protegido; el Token original se muestra una única vez al crearlo o rotarlo.

Por eso, en cuanto lo tengas por primera vez, conviene copiarlo a tu gestor de contraseñas.

Si cambias de navegador o de dispositivo, puedes introducir el project ID y el Token en «Conectar a un proyecto de monitorización existente» para volver a cargar las consultas, el historial y el estado del proyecto.

Por defecto la página no guarda el Token.

Solo entra en el almacenamiento local del navegador actual si pulsas explícitamente en guardar en este dispositivo, y también puedes pulsar en olvidar este dispositivo en cualquier momento.

Si el Token aparece en una captura de pantalla, en un chat o en un log público, rótalo de inmediato; el Token antiguo queda invalidado al instante.

La página de Docs incluye peticiones `curl` listas para copiar y la explicación de la API pública.

## Cómo funciona la monitorización por correo

En un proyecto de monitorización puedes introducir un correo y verificarlo.

El sistema solo intenta enviar avisos cuando ya existe una línea base comparable, la versión de puntuación es la misma, la coverage es suficiente y la puntuación cambia de verdad.

En la primera ejecución, cuando cambia la versión de puntuación o cuando falta evidencia, solo guarda el snapshot y no genera alertas falsas de subida o bajada.

El adaptador de correo actual prioriza el canal principal de envío y, ante fallos de autenticación, límite de tasa, red o del proveedor, puede cambiar al servicio fijo de envío del propio webmaster.

Tanto si el correo sale bien como si no, el snapshot de auditoría ya completado se guarda primero.

## Descargar el informe completo de corrección en Markdown

Al terminar una auditoría, puedes descargar de una vez el informe completo de corrección en Markdown, sin generar archivos uno por uno.

El informe incluye el perfil del sitio, las páginas muestreadas, la puntuación y los motivos de tope, todas las evidencias de fallo, los errores desconocidos y externos, el estado de los módulos opcionales, las tareas de corrección agrupadas y los pasos de verificación.

Al final del informe hay además un handoff prompt para una IA de desarrollo.

Se puede pasar a Codex, Claude u otro asistente de programación, pero le pide al modelo que use solo la evidencia existente y que no invente precios, servicios, direcciones, entidades, autores ni fuentes estadísticas inexistentes.

Yo suelo dejar este Markdown junto al repositorio del código de la web, pido al asistente de programación que localice primero los archivos fuente que generan cada URL y luego reviso yo mismo el diff.

## Un orden práctico de uso

1. Abre <https://geo.sayori.org>，先用站点模式审首页域名
2. Comprueba que el perfil del sitio y las páginas muestreadas no se han desviado.
3. Si la primera pantalla muestra un fallo de captura, mira primero la evidencia de obtención de página y no sigas interpretando una puntuación inexistente.
4. Revisa coverage, confidence y las tres acciones prioritarias antes de decidir si la puntuación total sirve de referencia.
5. Atiende primero los fallos critical y major y ve a cambiar los archivos fuente o la plantilla del CMS de las páginas correspondientes.
6. En los problemas de rendimiento, comprueba por separado que haya datos reales de PageSpeed tanto en móvil como en escritorio.
7. Cuando los problemas de hechos estén resueltos, ejecuta Evidence Map según haga falta o rellena una vez la API personalizada.
8. Descarga el informe en Markdown, pásaselo a una IA de desarrollo para una segunda ronda de localización y despliega tras revisar tú mismo los cambios.
9. Crea un proyecto de monitorización solo cuando necesites seguimiento continuo y guarda el project ID y el Token en el gestor de contraseñas.
10. Si no tienes claro algún botón o endpoint, abre <https://geo.sayori.org/docs>
11. Tras desplegar, vuelve a auditar la misma URL para confirmar que la evidencia del fallo desaparece de verdad.

## Qué no puede hacer

GeoScore no es un rastreador de profundidad infinita; una muestra de cinco páginas no representa todas las URL.

Tampoco sustituye a Search Console, los registros del servidor, los datos reales de usuarios ni el criterio humano sobre el contenido.

En páginas bloqueadas por WAF, muros de inicio de sesión, páginas de verificación o restricciones regionales, el informe quizá solo pueda dar `unknown` o `error`.

En esos casos no conviene desactivar medidas de seguridad solo por perseguir puntuación.

Menos aún puede confirmar de la nada que un producto de IA de consumo haya citado de verdad tu sitio.

Para mí, esos límites hacen que el informe sea más útil.

Una herramienta de auditoría debe dejar claro qué sabe y qué no sabe, y el resto ya lo verifica quien mantiene el sitio.

## Seguir leyendo

Si aún no has montado el sitio, puedes empezar por [[astro-mizuki-blog-from-zero|plantilla minimalista de blog]], y dejar el dominio, el alojamiento y el almacenamiento de imágenes en [[cloudflare-free-tier-developer-guide|capa gratuita de Cloudflare]].

Además del rastreo y la indexación, también estoy ajustando la experiencia al leer artículos de verdad; el proceso y las decisiones quedaron anotados en [[blog-style-change|registro del rediseño del estilo del blog]].
