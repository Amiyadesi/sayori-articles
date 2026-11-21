---
title: Ponle un dominio gratis a tu blog recién montado y date a conocer en las comunidades de webmasters
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 9
description: Desde subdominios gratuitos de DNSHE y Cloudflare DNS hasta sistemas de comentarios, Travellings, Moe ICP y el Pacto de los Diez Años, para darle a tu blog recién creado un dominio, interacción y algo de visibilidad
image: ""
tags:
  - Tutorial práctico
  - Creación web y Cloudflare
  - Blog independiente
  - Beneficios estudiantiles oficiales
category: "Tutoriales y guías"
draft: false
lang: es
translationKey: "posts/free-domain-and-web-community/free-domain-and-web-community"
alias: ""
---

En el post anterior [[astro-mizuki-blog-from-zero|Monta un blog minimalista con Sayori Lite]] hablé de GitHub, Cloudflare Pages y un flujo de escritura opcional con Obsidian

Una vez montado, la dirección por defecto se ve más o menos así:

```text
https://你的项目名.pages.dev
```

Funciona, pero da la sensación de que le falta algo

Ya tienes el blog; el siguiente paso natural es ponerle un dominio decente y dejarte ver por algunas comunidades de webmasters. No se trata de conseguir tráfico al instante, sino de hacer que la web pase de ser «un proyecto en mi ordenador» a «un rinconcito con nombre propio en internet»

## Por ahora basta con un dominio gratuito

Si de momento no quieres comprar un dominio, puedes empezar practicando con un subdominio gratuito

Ahora mismo recomiendo echarle un vistazo a servicios como DNSHE:

[https://my.dnshe.com/](https://my.dnshe.com/)

![[Pasted image 20260623151351.png]]

De momento suelo fijarme primero en extensiones como `cc.cd` que se pueden conectar a Cloudflare

![[Pasted image 20260622231201.png]]

Un dominio gratuito sirve bien para estas cosas:

- Vincular un dominio personalizado a un blog en Cloudflare Pages
- Aprender resolución DNS
- Aprender a gestionar dominios con Cloudflare
- Preparar subdominios para futuros servicios autoalojados

No sirve para estas otras:

- Proyectos comerciales a largo plazo
- El dominio principal de un correo importante
- La entrada principal de una marca que no puedes permitirte perder
- Proyectos en los que no estés dispuesto a asumir cambios de reglas

## Códigos de impulso de DNSHE

DNSHE tiene un sistema de impulsos mutuos con el que puedes conseguir subdominios de mayor duración

Dejo por aquí algunos códigos de impulso y más adelante añadiré otros si salen nuevos:

```text
VJC8UQYTPK
GHGMEUGWXA
VVN9QFPEUL
UUJ22RXYDC
G4HPCNW7R4
```

Si solo estás probando el blog de forma temporal, no hace falta obsesionarse con que sea permanente; lo importante es pillar un dominio que resuelva bien y hacer funcionar todo el flujo

## Dominios gratuitos oficiales en el paquete de estudiantes de GitHub

Si tienes un correo universitario y has verificado el [GitHub Student Developer Pack](https://education.github.com/pack), también puedes aprovechar dos beneficios oficiales de dominios de nivel superior gratuitos durante el primer año:

- **Namecheap**: ofrece el registro gratuito por un año de un dominio de nivel superior `.me` más un certificado SSL de un año
- **Name.com**: ofrece un dominio gratuito el primer año entre ciertas extensiones; las opciones exactas y el precio de renovación se ven en la página de pago

Ten en cuenta que los dominios del paquete de estudiantes solo son gratis el primer año y al segundo se renuevan a precio normal; si no quieres vincular tarjeta ni preocuparte por renovaciones, seguir con DNSHE es mucho más cómodo

## Conectarlo a Cloudflare

Los usos de DNS, Pages y Tunnel están en [[cloudflare-free-tier-developer-guide|Tutorial del plan gratuito de Cloudflare]]; aquí vamos a centrarnos en conectar el dominio

Una vez tengas el dominio, el siguiente paso es conectarlo a Cloudflare

El flujo habitual es este:

1. Añadir el sitio en Cloudflare
2. Cambiar los servidores de nombres (NS) del dominio a los de Cloudflare según las instrucciones
3. Esperar a que se propaguen los DNS
4. Ir al proyecto de Cloudflare Pages y añadir el dominio personalizado
5. Añadir el CNAME según te indique Pages o dejar que Cloudflare lo configure automáticamente

Si usas un subdominio gratuito, comprueba primero si permite cambiar los NS. Si no deja, tendrás que añadir los registros DNS en la plataforma original o buscar una extensión que se lleve mejor con Cloudflare

Aquí no tengas prisa: la propagación de DNS a veces tarda un rato. Asegúrate primero de adónde quieres apuntar el dominio raíz y `www` / los subdominios, para no liarte cambiando cosas y olvidando lo que acabas de poner

## Reserva subdominios para servicios autoalojados

Si más adelante tienes un servidor estudiantil 2C2G, puedes planificar los subdominios con antelación:

```text
vault.example.cc.cd  -> Vaultwarden
notes.example.cc.cd  -> Fast Note Sync
ntfy.example.cc.cd   -> ntfy
status.example.cc.cd -> Gatus
```

No metas todos los servicios bajo el dominio raíz

Los dominios son como los números de portal. Si la numeración está clara, luego es mucho más cómodo migrar, mover cosas, configurar proxys inversos o apagar servicios

Para ver qué servicios meter en el servidor, tienes esta tabla general:

[[2c2g-server-service-index|Qué puede correr un servidor estudiantil 2C2G: no satures la maquinita antes de tiempo]]

## Cómo elegir entre un dominio gratuito y uno de pago

Yo lo dividiría así:

Un dominio gratuito encaja si vas a:

- Empezar un blog desde cero
- Aprender cómo funciona el DNS
- Hacer tutoriales
- Probar Cloudflare Pages
- Probar servicios autoalojados

Un dominio de pago encaja si vas a:

- Mantener un blog a largo plazo
- Montar un correo electrónico serio
- Poner la dirección en tu avatar, tarjeta o descripción de vídeos

No es que los dominios gratuitos sean de segunda categoría. Es solo que en proyectos a largo plazo da mucha pereza pensar en tener que migrar más adelante

Si ya tienes claro que vas a escribir en este blog durante mucho tiempo, comprar un dominio que te guste merece la pena. En proyectos personales se permite algún capricho, y si el nombre te gusta te darán más ganas de cuidarlo

# Acercarse a las comunidades de webmasters

Cuando ya tengas el dominio listo, puedes darte una vuelta por algunas comunidades de webmasters

No para hacer spam sin más, sino para meterte en un entorno donde todavía hay gente escribiendo blogs. El mayor peligro de un blog independiente es acabar escribiendo un diario en solitario; ver de vez en cuando cómo escriben otros, cómo decoran sus sitios y cómo se enlazan entre sí motiva muchísimo

## 开往 Travellings

Travellings es un proyecto de relevo de enlaces entre blogs:

[https://www.travellings.cn/](https://www.travellings.cn/)

Su mecánica es muy maja. Pones un botón de «Travellings» en tu web y, cuando un visitante hace clic, salta aleatoriamente a otro sitio independiente que forme parte del proyecto

Instrucciones para unirse:

[https://www.travellings.cn/docs/join.html](https://www.travellings.cn/docs/join.html)

Es ideal para blogs que ya tengan algo de contenido

No lo solicites nada más crear la portada vacía. Escribe antes unos cuantos artículos para que quien entre tenga algo de verdad que leer

## 萌备 (Moe ICP)

Moe ICP es el registro simbólico del «reino moe»:

[https://icp.gov.moe/](https://icp.gov.moe/)

Página de solicitud:

[https://icp.gov.moe/join.php](https://icp.gov.moe/join.php)

No es el registro oficial ICP del gobierno chino, que no haya confusiones. Es más bien un distintivo curioso y un punto de encuentro entre webs personales y de estilo anime

En la página oficial piden ciertos requisitos, como que no sea comercial, que no tenga contenido dudoso, que no sea una web vacía, que tenga HTTPS activo y que sea accesible de forma estable

Si encaja con el estilo de tu web, puedes pedir un número Moe ICP y ponerlo en el pie de página. No tiene ninguna utilidad práctica imprescindible, pero le da mucho aire de web independiente

## 十年之约 (Pacto de los Diez Años)

Pacto de los Diez Años:

[https://www.foreverblog.cn/](https://www.foreverblog.cn/)

Su idea central es un compromiso: desde el momento en que te unes, mantener el blog abierto durante diez años o más, con actualizaciones y vida

Suena un poco friki y épico, pero a mí me gusta bastante el concepto

Eso sí, exige que el blog lleve al menos un año funcionando para poder solicitarlo, así que toca esperar; claro que si tu sitio ya cumple el año, merece la pena probar suerte, jaja

## 揪蝉 (Jiuchan)

Jiuchan:

[https://hi.jiuchan.org/docs](https://hi.jiuchan.org/docs)

Es una plataforma de recopilación y visita aleatoria de webs personales; funciona un poco como meter tu sitio independiente en un botón de «descubrimiento aleatorio»

Si tu blog ya tiene un par de entradas presentables, puedes revisar sus requisitos de inclusión. Para un sitio nuevo, el valor de estas plataformas no es traerte mil visitas de golpe, sino dar pie a que alguien salte de una web a otra y acabe descubriéndote poco a poco

# BlogFinder

[BlogFinder - Descubre buenos blogs personales](https://bf.zzxworld.com/)

## Lista de blogs independientes en chino

GitHub: [https://github.com/timqian/chinese-independent-blogs](https://github.com/timqian/chinese-independent-blogs)

Este repositorio recopila blogs independientes en chino. Funciona más como un directorio mantenido a largo plazo, con la URL del blog, RSS, descripción y etiquetas

Para quién es:

- Tienes un blog estable
- Tienes RSS
- El contenido es principalmente propio
- Quieres aparecer en un índice público

Hoy en día mucha gente ya no se suscribe activamente a blogs y deja que los algoritmos de las plataformas decidan qué mostrarles. Esta lista conserva al menos una costumbre clásica pero muy buena: si alguien me gusta, me suscribo

Si vas a enviar tu sitio, deja antes esto bien preparado:

```text
站名
站点 URL
RSS URL
一句话介绍
主题标签
```


# Otras vías para conseguir dominios gratuitos

DNSHE no es la única opción. Apunto por aquí un par más que he visto:

[Recopilación de dominios gratuitos abiertos al registro y compatibles con Cloudflare](https://www.nodeloc.com/t/topic/70964?u=amiya_desi)

[https://domain.stackryze.com/](https://domain.stackryze.com/) Aviso amistoso: se pueden registrar hasta cuatro dominios, pero ahora mismo los únicos compatibles con Cloudflare son .in y .cc

Es un hilo muy bueno de NodeLoc que reúne bastantes opciones

### Dominios incluidos en GitHub Pages

Si de momento no quieres pelearte con ningún servicio de dominios, GitHub Pages ya te da uno por defecto:

```text
你的用户名.github.io
```

Cloudflare Pages también te da otro:

```text
你的项目名.pages.dev
```

Estrictamente hablando no son «tu propio dominio», pero bastan de sobra para escribir en el blog y enseñar proyectos. Ya habrá tiempo de comprar un dominio propio cuando lo tengas más claro

## Añadir un sistema de comentarios al blog

En el post anterior dije que hablaría de los comentarios, así que aquí va

Un blog puede sobrevivir perfectamente sin sección de comentarios, pero si escribes tutoriales, experiencias o registros de errores, recibir de vez en cuando un «esto me salvó» o un «en el paso tres me salió otro problema» fomenta el intercambio y te ayuda a seguir aprendiendo; además, tener comentarios hace mucho más cómodo recibir feedback que pedir que te escriban por correo

Entre los sistemas de comentarios que he visto, estos son los que mejor encajan con un blog estático personal:

### Twikoo

[https://twikoo.js.org/](https://twikoo.js.org/)

GitHub: [https://github.com/twikoojs/twikoo](https://github.com/twikoojs/twikoo)

Twikoo es uno de los sistemas más usados en la comunidad de blogs independientes en chino. Admite comentarios anónimos, notificaciones por correo, emojis y panel de administración

Tiene muchas formas de despliegue: Vercel, Netlify, funciones en la nube o Docker propio. Para estudiantes, el despliegue gratuito en Vercel es la ruta más cómoda

Ventajas:

- Ecosistema en chino con documentación muy clara
- Coste de despliegue cero
- Panel de administración para moderar, borrar y responder
- Notificaciones por correo y WeChat

Desventajas:

- Tienes que elegir una base de datos como backend (el plan gratuito de MongoDB Atlas, Vercel KV o autoalojarla)
- Si usas una base de datos gratuita de terceros, los datos no están al cien por cien en tus manos

### Giscus

[https://giscus.app/](https://giscus.app/)

GitHub: [https://github.com/giscus/giscus](https://github.com/giscus/giscus)

Giscus utiliza GitHub Discussions como backend de comentarios. Los visitantes inician sesión con su cuenta de GitHub para comentar

Ventajas:

- Los datos se guardan en tu propio repositorio de GitHub
- No requiere despliegues adicionales
- Ideal para blogs técnicos, donde los lectores suelen tener cuenta de GitHub
- Soporte nativo para Markdown y resaltado de sintaxis

Desventajas:

- Es obligatorio iniciar sesión con GitHub
- Los lectores no técnicos quizá no quieran crearse una cuenta de GitHub solo para dejar un comentario
- Los comentarios quedan ligados a ese repositorio; si cambias de repo toca migrarlos

### Artalk

[https://artalk.js.org/](https://artalk.js.org/)

GitHub: [https://github.com/ArtalkJS/Artalk](https://github.com/ArtalkJS/Artalk)

Artalk es un sistema de comentarios autoalojado que necesita un servicio backend corriendo. Si ya tienes un servidor 2C2G, puedes levantarlo con Docker

Ventajas:

- Control total sobre tus datos
- Gestión multisitio
- Bastante completo: notificaciones por correo y Telegram, captcha y panel de administración

Desventajas:

- Necesitas tener un servidor
- Es un servicio más que mantener, respaldar y actualizar
- Si metes otro servicio más en un 2C2G, conviene vigilar la memoria RAM

### Cuál elegiría yo

Si acabas de montar el blog y no tienes servidor, recomiendo empezar probando Giscus o Twikoo (desplegado en Vercel)

Si ya tienes servidor y tus lectores no son todos programadores, échale un ojo a Artalk

Si de momento no te apetece complicarte con comentarios, tampoco pasa nada. Céntrate primero en escribir buenos artículos y ya los pondrás cuando tengas lectores. Los comentarios no son el corazón del blog; el contenido sí

## Dónde más puedes poner el enlace de tu blog

- Página de enlaces amigos: intercambia enlaces con blogueros de temáticas parecidas
- Perfil de GitHub: pon el blog en tu perfil principal
- Biografía de Bilibili / YouTube / Xiaohongshu: acompaña tus vídeos tutoriales con el enlace al artículo
- Firmas en foros como Linux DO o V2EX: respetando las normas de cada comunidad y sin hacer spam
- README de proyectos open source: si el proyecto está relacionado con el blog, añade el enlace a la documentación

Cuantas más puertas de entrada abras para tu web, más gente acabará pasándose por allí

## Analíticas del blog: saber si ha venido alguien

Después de añadir el dominio y las entradas desde comunidades, es normal que te entre la curiosidad: ¿de verdad entra alguien a leer mi blog?

Algunas alternativas ligeras:

- **Umami**: [https://umami.is/](https://umami.is/), se puede autoalojar o usar su plan gratuito oficial. Interfaz limpia y control sobre tus datos
- **Cloudflare Web Analytics**: si ya usas Cloudflare, incluye analíticas web gratuitas sin tener que añadir scripts extra; se miran directamente desde el panel
- **Plausible**: [https://plausible.io/](https://plausible.io/), principalmente de pago, aunque se puede autoalojar
- **No instalar ninguna analítica**: también vale. Un blog personal no es una web comercial; se puede vivir perfectamente sin mirar métricas

Mi recomendación actual es empezar con Cloudflare Web Analytics (ya que lo más probable es que ya tengas el sitio en Cloudflare) y, si algún día se te queda corto, plantearte Umami

No te pases el día mirando los números. Escribir sirve mucho más que revisar estadísticas

## Para terminar

Cuando acabas de montar un blog, no busques la perfección desde el primer día

Si un dominio gratuito sirve, úsalo; si Cloudflare ya resuelve, déjalo rodar; ve pidiendo entrar en las comunidades poco a poco, y los comentarios ya los pondrás más adelante

Lo que de verdad importa es seguir escribiendo

El dominio, el número de registro, los enlaces amigos, el botón de Travellings o la caja de comentarios son solo pequeños adornos para que el blog parezca más una «web». Lo que hace que se sostenga son los artículos
