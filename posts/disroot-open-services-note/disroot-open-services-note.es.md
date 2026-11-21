---
title: "Disroot: un conjunto de servicios de código abierto con aire al viejo ideal de internet"
published: 2026-06-27
created: 2026-06-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Apuntes sobre el correo, la nube, XMPP y las herramientas colaborativas de Disroot, y una excusa para replantear qué servicios públicos de sayori.org vale la pena mantener a largo plazo
image: ""
tags:
  - Verano 2026
  - Notas de comunidad
  - Servicios de código abierto
  - Fediverse
category: "Registro personal"
draft: false
lang: es
translationKey: "posts/disroot-open-services-note/disroot-open-services-note"
alias: ""
---

> [!NOTE]
> Esta nota es del 27 de junio de 2026. Las preguntas de registro, cuotas de servicio y funciones disponibles de Disroot pueden cambiar, así que mejor echarle un ojo a su web oficial antes de solicitar cuenta

Hoy me topé con otra organización de código abierto muy interesante: [Disroot](https://disroot.org/)

Esta gente juntó un montón de herramientas de internet abierto y las mantiene con cariño como una plataforma usable en el día a día

Su propia web se define sin rodeos: libertad, privacidad, federación y descentralización

Sin anuncios, sin rastreo, sin perfilado ni minería de datos; puro proyecto sin ánimo de lucro, haciendo honor al dominio .org

## Qué ofrece

La lista de servicios está aquí:

[https://disroot.org/en/services](https://disroot.org/en/services)

De momento tiene todo esto:

- Email, usable vía webmail o conectándolo a un cliente IMAP
- Cloud, basado en Nextcloud, para sincronizar archivos, calendario y contactos
- XMPP Chat, un protocolo de mensajería descentralizado
- Pads, documentos colaborativos en línea
- PrivateBin, un pastebin cifrado
- Upload, para compartir archivos temporales
- Forgejo, alojamiento de código
- CryptPad, una suite ofimática en línea enfocada en la privacidad
- FEDIsroot, en [fe.disroot.org](https://fe.disroot.org/), un servicio de microblogging en ActivityPub / Fediverse basado en Akkoma y compatible con la API de Mastodon
- LibreTranslate, servicio de traducción
- Vault, servicios relacionados con la gestión de contraseñas

No hace falta usarlos todos

Pero justo ahí está la gracia: registras una sola cuenta y ya tienes acceso a todo este arsenal de servicios de código abierto

Para alguien como yo, al que le encanta cacharrear con webs personales, servidores y software libre, resulta súper atractivo y es todo un veterano del que tomar nota

## La pregunta de registro es algo peculiar

El acceso al registro está aquí:

[https://user.disroot.org/pwm/public/newuser/](https://user.disroot.org/pwm/public/newuser/)

La pregunta que me tocó esta vez fue: qué te gusta hacer antes de irte a dormir

Y además exige escribir más de 50 palabras

La pregunta tiene bastante gracia

Puedes escribir un párrafo con calma en chino o en cualquier otro idioma y luego traducirlo al inglés

Por ejemplo, contar que antes de dormir lees un rato, organizas lo que tienes pendiente para mañana, escuchas música, echas un vistazo a novedades de comunidades open source o simplemente dejas el móvil lejos para dormirte antes

## Cómo lo voy a usar yo

De momento ya me registré una cuenta, aunque en la práctica ahora mismo lo único que me llama un poco es el correo; al fin y al cabo, con tantas cuentas y comunidades acumuladas ya tengo un buen puñado de correos con dominio propio, además de mi propio correo temporal y correos de dominio autoalojados

Aunque también tienen un servicio comunitario de Vaultwarden, como ya tengo mi propia instancia autoalojada tampoco me hace falta

Además, Disroot no es el plan gratuito de una gran tecnológica: sobrevive gracias a la comunidad y a las donaciones, así que con poder echar mano de él cuando haga falta me doy por satisfecho

## También me hizo repasar mis propios servicios

Después de ver la lista de servicios que reúnen Disroot y [[radical-servers-public-services|Riseup]], mi primer impulso también fue seguir metiendo cosas en sayori.org para estar a la altura del .org

Pero bueno, la capacidad de una sola persona da para lo que da; tras consultarlo un poco con GPT, me armé una lista de servicios públicos, justo aquí <https://sayori.org/zh/services/>

Ahora mismo lo que está abierto al público de verdad son GeoScore, las entradas del blog, el RSS, la pizarra y el buzón de comentarios. Search Gateway sigue siendo de código abierto, pero la instancia en línea queda solo para mis propios sitios y tareas de mantenimiento

En vez de seguir apilando servicios nuevos, prefiero probar primero unos cuantos frentes muy acotados: hacer chequeos técnicos a blogs personales, ayudar a poner en marcha sitios estáticos no comerciales, ofrecer pequeñas cuotas de búsqueda con fuentes y enviar notificaciones poco frecuentes de RSS a correo o Webhook

Nada de esto nacerá como una plataforma pública anónima: irá primero por invitación, con cupos limitados y gestión manual. Si no hay demanda se cierra, y si el coste de mantenimiento supera mis fuerzas, también se cierra

Hoy prefiero definir sayori.org como un conjunto de servicios digitales públicos mantenidos a título personal, sin ánimo de lucro y bajo el principio de "hasta donde llegue", más que como una organización benéfica, porque tampoco me da la vida para tanto


## Seguir leyendo

En esta misma línea puedes echar un vistazo a [[radical-servers-public-services|Organizaciones tecnológicas y servicios públicos recopilados por Riseup]], donde salen bastantes colectivos pequeños muy interesantes

Si quieres montar algunos de estos servicios en tu propia máquina, mira primero [[2c2g-server-service-index|Lista de servicios para un servidor pequeño]]; para la parte del gestor de contraseñas escribí aparte [[selfhost-vaultwarden-on-2c2g|Notas sobre autoalojar Vaultwarden]]
