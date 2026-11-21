---
title: "Montar Vaultwarden en un servidor de estudiante de 2C2G: que la bóveda de contraseñas no quede expuesta"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "Despliega Vaultwarden con Docker Compose en un servidor de estudiante y aclara lo que de verdad importa: HTTPS, cerrar el registro, copias de seguridad y pruebas de restauración."
image: ""
tags:
  - Tutorial práctico
  - VPS y autohospedaje
  - Docker
  - Vaultwarden
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: "posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g"
---

Vaultwarden es probablemente uno de los servicios que mejor encajan en un servidor pequeño de 2C2G.

Es muy ligero y el ecosistema de clientes está bien maduro: en el móvil, en el ordenador y en las extensiones del navegador puedes conectarte directamente usando los clientes oficiales de Bitwarden.

Pero también es uno de los servicios que menos recomiendo probar a la ligera.

Si el blog se rompe, se puede rehacer; si pasa algo con la bóveda de contraseñas, pierdes cuentas, 2FA, contraseñas de paneles e incluso la entrada a todos tus servidores futuros.

Así que aquí no voy a contar nada rebuscado, sino un planteamiento que basta y sobra:

1. Levantarlo con Docker Compose
2. Exponerlo únicamente por HTTPS
3. Cerrar el registro justo después de crear tu cuenta
4. No dejar las copias de seguridad y la restauración para luego

Proyecto oficial:

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Documentación de Compose:

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## ¿Para quién es?

Creo que encaja bien si:

- Ya tienes un servidor pequeño propio
- Quieres tener tus contraseñas bajo tu propio control
- Estás dispuesto a encargarte de tareas sucias como HTTPS, copias de seguridad y actualizaciones

Si solo quieres despreocuparte, Bitwarden alojado de forma oficial, 1Password o el gestor de contraseñas de Apple van de maravilla.

La ventaja de Vaultwarden no es cero mantenimiento, sino ser más ligero, más libre y encajar mejor en las maquinitas de estudiantes sin mucho presupuesto.

## Qué preparar primero

- Un VPS capaz de ejecutar Docker
- Un dominio, o al menos una entrada HTTPS estable
- Docker y Docker Compose
- Nociones básicas de SSH, proxy inverso y cortafuegos

Si aún no tienes Docker instalado, puedes ver antes [[docker-compose-minimum-start|Introducción mínima a Docker y Docker Compose: entender esos archivos yml]]

Si aún no has configurado un dominio, puedes ver antes [[free-domain-and-web-community|Ponerle un dominio gratuito al blog recién montado y asomarse por una comunidad de webmasters]]

## Crear los directorios

Aquí sigo dejándolo en `/srv/stacks`

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

La estructura de carpetas queda más o menos así:

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

Después, la base de datos, los adjuntos y compañía irán dentro de `vw-data`

## Escribir primero el compose

```yaml
services:
  vaultwarden:
    image: ghcr.io/dani-garcia/vaultwarden:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true"
      INVITATIONS_ALLOWED: "false"
      ENABLE_WEBSOCKET: "true"
      TZ: "Asia/Shanghai"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

Cambia `vault.example.com` por tu propio dominio.

Lo más importante aquí es esta línea:

```text
127.0.0.1:8080:80
```

Significa que Vaultwarden solo escucha en local en `8080`

No le llega tráfico directo desde internet; solo entra redirigido a través de Nginx, Caddy o Cloudflare Tunnel.

No lo pongas de entrada así:

```text
0.0.0.0:8080:80
```

Dejar una bóveda de contraseñas expuesta tal cual en un puerto HTTP público no es buena idea.

Unas palabras rápidas sobre un par de variables:

- `DOMAIN`: la dirección HTTPS final con la que vas a entrar de verdad
- `SIGNUPS_ALLOWED`: se abre un momento para el primer registro y se cierra nada más registrarte
- `INVITATIONS_ALLOWED`: para uso personal ciérralo directo; si quieres invitar a alguien, puedes
- `ENABLE_WEBSOCKET`: déjalo activado y ya, la sincronización en los clientes irá más normal

## Arrancar

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

Compruébalo en local:

```bash
curl -I http://127.0.0.1:8080/
```

Si devuelve un código de estado, el contenedor está vivo.

Pero esto todavía no está terminado, porque lo que de verdad importa es el HTTPS.

## Proxy inverso y HTTPS

Con algo como Vaultwarden no conviene tirar a largo plazo sobre HTTP.

El contexto seguro del navegador, los clientes del gestor de contraseñas y tu propia tranquilidad mental exigen que el HTTPS quede bien resuelto.

Yo suelo elegir una de estas dos vías.

### Opción A: Caddy / Nginx

Viene bien si el dominio apunta directo al servidor y estás dispuesto a abrir los puertos 80 y 443.

Caddy es lo más cómodo:

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

Él mismo se encarga de los certificados.

Nginx también sirve; la idea central es la misma: redirigir `https://vault.example.com` hacia `127.0.0.1:8080`

```nginx
server {
    listen 80;
    server_name vault.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vault.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        client_max_body_size 525M;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Al terminar de editar, no olvides comprobar:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Opción B: Cloudflare Tunnel

Si no quieres abrir el 80 y el 443 directamente en el servidor de origen, un Tunnel resulta más cómodo.

La estructura queda así:

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

Yo uso este.

Y por lo general: no le pongas una pantalla de inicio de sesión de Cloudflare Access a todo Vaultwarden.

A las extensiones del navegador y a los clientes móviles les cuesta o resulta incómodo.

Si de verdad quieres añadir protección extra, prioriza proteger solo `/admin`

## Cerrar el registro justo después del primer registro

Después de abrir `https://vault.example.com` por primera vez, crea primero tu propia cuenta principal.

Nada más crearla, cambia la configuración:

```yaml
SIGNUPS_ALLOWED: "false"
```

Y luego reinicia:

```bash
docker compose up -d
```

No pienses que tu dominio pasa desapercibido; un servicio en la red pública tarde o temprano será escaneado.

## Qué hacer justo después de crear la cuenta

- Pon una contraseña maestra que sea de verdad lo bastante robusta
- Activa la verificación en dos pasos
- Importa contraseñas solo después de confirmar que el HTTPS funciona bien
- Antes de importar, exporta una copia de seguridad sin conexión desde tu antiguo gestor de contraseñas

Y hay algo muy realista:

No metas a lo loco claves SSH del servidor, contraseñas de paneles ni credenciales de nivel root en una bóveda de contraseñas cuya estrategia de respaldo aún no tengas clara.

Primero levántalo y luego ve migrando poco a poco.

## Copias de seguridad

Los datos más importantes de Vaultwarden están aquí:

```text
/srv/stacks/vaultwarden/vw-data
```

La forma más sencilla es hacer primero una copia interna y luego empaquetar toda la carpeta.

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

Si usas `.env`, SMTP, token de administración o cosas así, hazles copia también, pero no los subas a un repositorio público.

Después tráete la copia a tu equipo local o sincrónica a otra máquina.

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

No lo dejes solo en el mismo servidor.

Una copia en la misma máquina muchas veces equivale a no tener copia.

## Pruebas de restauración

Saber hacer copias sin saber restaurar es bastante arriesgado.

Como mínimo, revisa de vez en cuando si hay contenido dentro del paquete de respaldo:

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

Lo normal es ver algo como:

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

Cuando toque restaurar de verdad, detén primero el servicio y aparta los datos antiguos:

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

Tras restaurar, revisa al menos cuatro cosas:

- Que abre la web
- Que puedes iniciar sesión
- Que las entradas siguen ahí
- Que la extensión del navegador y el móvil sincronizan

No esperes a que reviente de verdad para aprender a restaurar por primera vez.

## Actualizar

Haz copia de seguridad antes de actualizar; no te saltes esto.

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

Al terminar de actualizar, no te limites a mirar los logs: entra tú mismo tanto en la web como en el cliente para probarlo.

## ¿Encaja en un 2C2G?

Encaja muy bien.

Vaultwarden en sí no consume muchos recursos; un 2C2G lo mueve con soltura.

El coste real no está en la CPU ni en la memoria, sino en los hábitos de mantenimiento:

- HTTPS
- Cerrar el registro
- Copias de seguridad
- Restauración
- Actualizaciones

Si quieres empezar en serio tu camino de autohospedaje, de hecho sienta muy bien como primer servicio serio.

La comodidad que aporta una bóveda de contraseñas es difícil de imaginar, y montar una propia también es un buen comienzo para tus despliegues.

## Seguir leyendo

El dominio y el HTTPS de la bóveda de contraseñas pueden combinarse con [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]], los resultados del script de copia pueden mandarse al móvil con [[selfhost-ntfy-on-2c2g|ntfy]], y otros servicios ligeros están en [[2c2g-server-service-index|Lista de servicios para servidor pequeño]]
