---
title: "Correr ntfy en un servidor estudiantil 2C2G: darte un botón de notificaciones"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: Despliega el servicio de notificaciones push ntfy con Docker en un servidor estudiantil para que scripts de respaldo, monitorización y tareas programadas envíen avisos al móvil.
image: ""
tags:
  - Tutoriales prácticos
  - VPS y autohospedaje
  - Docker
  - Notificaciones push
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: "posts/selfhost-ntfy-on-2c2g/selfhost-ntfy-on-2c2g"
---

ntfy es uno de los servicios más discretos pero más útiles que tengo en el servidor

Lo que hace es simple: le mandas una frase con una petición HTTP y él te la envía como notificación push al móvil; es básicamente un canal de notificaciones

Pero este canal da para más de lo que parece:

- Un script de respaldo termina y te avisa si salió bien o mal
- Salta una alerta de gasto del servidor y te avisa para que eches un ojo
- Falla una tarea programada y te llega un aviso
- Gatus detecta que algún servicio se ha caído y te notifica
- Un certificado está a punto de caducar y te lo recuerda
- También puedes mandar comandos pequeños personalizados para hacer algún control puntual a distancia

Proyecto oficial:

[https://github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)

Documentación oficial:

[https://docs.ntfy.sh/](https://docs.ntfy.sh/)

## Por qué autohospedarlo

ntfy tiene un servidor público oficial `ntfy.sh`, y funciona sin instalar nada

Aun así, preferí autohospedarlo por esto:

- Los topics del servidor público son abiertos. Cualquiera que sepa el nombre de tu topic puede mandar cosas ahí
- Autohospedado permite añadir autenticación de usuarios
- Autohospedado permite controlar la retención y los logs
- El servidor estudiantil tiene espacio de sobra de todas formas, y ntfy es muy ligero

Si solo quieres probarlo un rato, el servidor público `ntfy.sh` va de lujo. Pero para uso continuo, autohospedarlo da más tranquilidad

## Despliegue

Preparamos el directorio:

```bash
sudo mkdir -p /srv/stacks/ntfy
sudo chown -R $USER:$USER /srv/stacks/ntfy
cd /srv/stacks/ntfy
```

Escribimos `docker-compose.yml`:

```yaml
services:
  ntfy:
    image: binwiederhier/ntfy
    container_name: ntfy
    restart: unless-stopped
    command: serve
    environment:
      TZ: Asia/Shanghai
      NTFY_BASE_URL: "https://ntfy.example.com"
      NTFY_AUTH_DEFAULT_ACCESS: "deny-all"
    volumes:
      - ./cache:/var/cache/ntfy
      - ./data:/var/lib/ntfy
      - ./etc:/etc/ntfy
    ports:
      - "127.0.0.1:8090:80"
```

Algunos puntos clave:

- Puerto `127.0.0.1:8090:80`: escucha solo en local. No lo expongas directamente a internet
- `NTFY_AUTH_DEFAULT_ACCESS: "deny-all"`: rechaza por defecto las peticiones sin autenticar. Así solo tú (con token o usuario y contraseña) puedes enviar y recibir
- `NTFY_BASE_URL`: pon el dominio final que vayas a usar; por ejemplo, yo uso `ntfy.sayori.org`

## Arranque

```bash
docker compose up -d
docker compose logs -f
```

Comprobación en local:

```bash
curl http://127.0.0.1:8090/
```

Con ver que responde la interfaz web de ntfy basta

## Crear usuario

Como activamos `deny-all`, hace falta crear un usuario para uno mismo:

```bash
docker compose exec ntfy ntfy user add --role=admin 你的用户名
```

Te pedirá una contraseña. Apunta este usuario y contraseña, que harán falta luego para enviar notificaciones y en la app del móvil

También se puede generar un token:

```bash
docker compose exec ntfy ntfy token add 你的用户名
```

Un token es más cómodo que una contraseña; en los scripts lo pasas directo en la cabecera y listo

## Conectar dominio

Igual que con Vaultwarden, pasa por Cloudflare Tunnel o por un proxy inverso con Caddy/Nginx

Ruta con Cloudflare Tunnel:

```text
ntfy.example.com
  -> Cloudflare Tunnel
  -> 127.0.0.1:8090
  -> ntfy
```

Cuando compruebes que el HTTPS va bien, abre `https://ntfy.example.com` e inicia sesión en la interfaz web con la cuenta de antes

## Enviar la primera notificación

La forma más sencilla:

```bash
curl -H "Authorization: Bearer 你的token" \
     -d "服务器还活着" \
     https://ntfy.example.com/test
```

Aquí `/test` es el nombre del topic. Puedes ponerle el que quieras, por ejemplo `/backup`, `/alert` o `/server`

También puede llevar título y prioridad:

```bash
curl -H "Authorization: Bearer 你的token" \
     -H "Title: 备份完成" \
     -H "Priority: default" \
     -d "Vaultwarden 备份成功，大小 2.3MB" \
     https://ntfy.example.com/backup
```

## App en el móvil

Android:

- Hay cliente de ntfy en F-Droid
- También está en Google Play

iOS:

- Busca ntfy en el App Store

Al abrir la app:

1. Añade la dirección de tu servidor autohospedado en los ajustes
2. Pon tu usuario y contraseña o el token
3. Suscríbete a tus topics (por ejemplo, `backup`, `alert`)

A partir de ahí, las notificaciones que mande el servidor llegarán al móvil

## Usarlo en scripts

Añade una línea al final del script de respaldo:

```bash
NTFY_URL="https://ntfy.example.com/backup"
NTFY_TOKEN="你的token"

# 备份成功时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ✅ 备份成功" \
     -d "Vaultwarden 备份完成 $(date +%F)" \
     "$NTFY_URL"

# 备份失败时
curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: ❌ 备份失败" \
     -H "Priority: high" \
     -d "Vaultwarden 备份出错，请检查日志" \
     "$NTFY_URL"
```

Aviso si falla una tarea programada:

```bash
some_command || curl -s -H "Authorization: Bearer $NTFY_TOKEN" \
     -H "Title: 定时任务失败" \
     -H "Priority: high" \
     -d "$(hostname): some_command 执行失败" \
     "$NTFY_URL"
```

## Combinarlo con Gatus

Si tienes Gatus haciendo comprobaciones de salud, puedes añadir ntfy como canal de alerta en su configuración

Gatus soporta alertas nativas para ntfy; basta con poner en la config la dirección del servidor, el topic y el token

Así, si se cae algún servicio, Gatus le manda un aviso a ntfy automáticamente y te suena el móvil

## Consumo de recursos

ntfy es muy ligero

Lo tengo corriendo en mi servidor y en reposo gasta unos 20-30 MB de RAM. La CPU es prácticamente cero. Para un 2C2G no supone ninguna carga

No necesita base de datos. Guarda los mensajes en caché en archivos locales y caducan solos tras un tiempo por defecto

## A tener en cuenta

- No metas el token de ntfy en un repositorio público
- Si pusiste `deny-all` pero algún servicio externo (por ejemplo, Gatus enviando desde la misma máquina) necesita mandar notificaciones sin autenticación, puedes abrir permisos solo para ciertos topics
- Los mensajes no se guardan para siempre. Si necesitas historial, lo suyo es que el emisor registre sus propios logs
- No hace falta exponer la interfaz web de ntfy a internet; para que la app del móvil se suscriba basta con la API

## ¿Compensa en un 2C2G?

Compensa muchísimo. Probablemente sea uno de los servicios con mejor relación utilidad-recursos en un 2C2G

Una vez lo montas, te das cuenta de que casi todos los scripts acaban con un «mándame una notificación con el resultado», lo cual es infinitamente más cómodo que entrar por SSH todos los días a mirar logs

Además, con ntfy se pueden montar comandos pequeños personalizados; por ejemplo, que te lleguen por ntfy las revisiones de comentarios del blog y, si eliges borrar, mande `/delete ID_comentario`, o si eliges restaurar, `/recover ID_comentario`, y cosas así

## Seguir leyendo

Para dominio y HTTPS puedes seguir con [[free-domain-and-web-community|Tutorial de dominio]] y [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]]; ya con el canal de notificaciones, también puedes mandar al móvil el resultado de los respaldos de [[selfhost-vaultwarden-on-2c2g|Vaultwarden]], y para otros usos vuelve a [[2c2g-server-service-index|Lista de servicios]] a elegir
