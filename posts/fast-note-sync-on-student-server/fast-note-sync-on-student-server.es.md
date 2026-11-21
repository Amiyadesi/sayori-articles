---
title: "Trasteando con Fast Note Sync en un servidor de estudiante: una capa de sincronización privada para Obsidian"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Probando Fast Note Sync Service en un servidor de estudiante de 2C2G para dejar una ruta privada de sincronización multiplataforma, respaldo e interfaces REST/MCP para Obsidian.
image: ""
tags:
  - Tutorial práctico
  - VPS y autohospedaje
  - Docker
  - Obsidian
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: "posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server"
---

Ahora escribo mis blogs y notas de proyectos en Obsidian, pero al principio solo escribía en la computadora; después de acumular un montón ahí me di cuenta de que no podía escribir desde el teléfono, así que salí a buscar un servicio de sincronización.

Obsidian Sync oficial es cómodo, claro, aunque tu cartera no piense lo mismo; Syncthing, Git y WebDAV también tienen su gracia, pero se me hacían incómodos.

Al final di con el plugin Fast Note Sync, que vi en los comentarios mientras navegaba por el foro L: es un plugin de Obsidian más un servidor autohospedado, enfocado en sincronización en tiempo real entre dispositivos, y además trae historial de versiones, adjuntos, gestión web, REST API y MCP. Tras unos días configurándolo y probándolo en la práctica, la verdad es que funciona de maravilla b(￣▽￣)d.

Plugin:

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

Servidor:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Página del plugin de Obsidian:

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## A quién le conviene

Creo que encaja bien con gente que:

- Ya tiene bastante contenido escrito en Obsidian
- Tiene un servidor pequeño encendido 24/7
- Está dispuesta a encargarse del HTTPS, el proxy inverso y los respaldos
- Quiere poder tomar notas en cualquier momento y lugar

Así, aunque no tengas la computadora cerca, puedes escribir artículos cómodamente desde el móvil y, al volver, basta con sincronizar la computadora.

## Desplegar el servidor

El repositorio del servidor está aquí:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Es un backend escrito en Go; en la descripción del repo lo definen como una plataforma de servicio de alto rendimiento y baja latencia para sincronización de notas, gestión en línea y REST API remota.

Yo suelo empezar creando el directorio:

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

Luego sigo la documentación oficial para desplegar con Docker, binario o compilando desde el código fuente. Sea cual sea el método, procuro que el servicio escuche solo en localhost y exponer HTTPS mediante un proxy inverso o un Tunnel.

La idea es esta:

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

Si usas Docker Compose, conviene mantener al menos estos hábitos:

- Persistir el directorio de datos en el directorio actual del servicio
- No meter archivos de configuración en repositorios públicos
- No exponer directamente el puerto del servicio a internet pública
- Hacer respaldo del directorio de datos antes de actualizar

Ahí dentro van tus notas; no deberían andar "desnudas" por ahí.

## Conectar un dominio

Puedes usar Caddy o Nginx, o bien Cloudflare Tunnel.

Por ejemplo, un dominio así:

```text
notes.example.com
```

Estructura:

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

Si aún no tienes dominio, primero puedes echar un ojo a:

[[free-domain-and-web-community|Ponerle un dominio gratis a un blog recién montado y asomarte por comunidades de webmasters]]

No recomiendo entrar directo a:

```text
http://服务器IP:<服务端口>
```

Al menos que tenga HTTPS, y mejor si además le agregas alguna protección de acceso.

## Inicializar la cuenta y el plugin

El flujo que indica el README del servidor es más o menos este:

1. Abrir la interfaz web de administración
2. Registrar una cuenta en el primer acceso
3. Copiar la configuración de la API desde el panel
4. Pegar la configuración en los ajustes del plugin de Obsidian

Descarga a mano desde GitHub Releases `main.js`, `styles.css` y `manifest.json`, y mételos en:

```text
.obsidian/plugins/fast-note-sync/
```

Luego ve a la página del plugin para iniciarlo: tendrás que crear y copiar un token en la interfaz web y pegarlo en la configuración remota; por lo general arranca en un momento.

## El respaldo importa más que la sincronización

Sincronizar no es respaldar.

Vale la pena ponerlo aparte: la sincronización propaga los borrados y también propaga los errores.

Fast Note Sync incluye historial de versiones, papelera, respaldos, espejo y sincronización con Git, entre otras funciones, pero aun así conviene tener tu propia red de seguridad.

Si ya sincronizas Obsidian con Git, no apiles de entrada otra capa de sincronización en tiempo real; primero ten claro cuál es la sincronización principal y cuál es el respaldo.

## Qué pensar de MCP y la REST API

Fast Note Sync Service también ofrece ahora soporte para REST API y MCP.

Esto me llama bastante la atención: como gran parte de mi contenido está en Obsidian, si en el futuro los clientes de IA pueden leer y escribir notas a través de una interfaz controlada, deja de ser solo una herramienta de sincronización y pasa a ser una puerta de entrada a mi base de conocimiento personal.

Pero ahí también hay riesgo.

Que una IA pueda leer y escribir tus notas significa que los límites de permisos tienen que estar mucho más claros:

- No expongas la interfaz MCP a internet pública
- No des permisos de escritura a clientes en los que no confíes
- No mezcles diarios privados, datos de cuentas ni claves en un Vault abierto
- Deja primero los Vaults importantes en solo lectura, y considera la escritura solo después de verificar el flujo

Que "pueda conectarse a una IA" no es motivo para abrir todos los permisos de golpe.

## ¿Le pesa mucho a un 2C2G?

Para un uso personal normal debería ir bien.

Lo que de verdad consume recursos es la cantidad de adjuntos, la frecuencia de sincronización y si se te ocurre meter decenas de gigas de recursos multimedia dentro de Obsidian.

## Seguir leyendo

Una vez que tengas la sincronización entre dispositivos lista, si quieres convertir los artículos públicos en un blog, puedes ver [[astro-mizuki-blog-from-zero|Plantilla minimalista de blog]]; para el punto de entrada del servicio y HTTPS sigue con [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]], y para otros usos del servidor vuelve a [[2c2g-server-service-index|Lista de servicios]].
