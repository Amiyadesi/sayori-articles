---
title: "Introducción mínima a Docker y Docker Compose: cómo entender esos archivos yml"
published: 2026-06-23
created: 2026-06-23
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: "Una guía de iniciación a Docker para quienes acaban de conseguir un servidor: qué es un contenedor, cómo leer archivos Compose, cómo iniciar, detener, actualizar y eliminar. Sin teorías complejas, solo lo práctico."
image: ""
tags:
  - Tutorial práctico
  - Docker
  - VPS y autohospedaje
  - Iniciación
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: "posts/docker-compose-minimum-start/docker-compose-minimum-start"
---

Si echas un vistazo a mis otros artículos, verás que casi todos los servicios autohospedados corren usando Docker.

Vaultwarden, ntfy, Gatus, Fast Note Sync... todos se configuran con un solo archivo `docker-compose.yml`.

Este artículo explica: qué hacer una vez que tienes el servidor, cómo instalar Docker, cómo entender un archivo compose, y cómo iniciar, detener, actualizar y eliminar contenedores. Con esto tendrás suficiente para poner en marcha todos los servicios anteriores.

## Qué es Docker (en una sola frase)

Docker te permite ejecutar servicios directamente usando «imágenes» empaquetadas por otras personas, sin necesidad de instalar dependencias una por una en tu sistema operativo.

No tienes que instalar manualmente Python, Go, Node, configurar variables de entorno ni lidiar con conflictos de versiones. La imagen ya lo incluye todo.

`docker-compose.yml` es simplemente un archivo de configuración que le indica a Docker:

- Qué imagen descargar.
- Qué puertos utilizar.
- Qué directorios montar.
- Qué variables de entorno configurar.
- Si debe reiniciarse automáticamente en caso de error.

## Instalación

Para instalar Docker en Ubuntu / Debian:

```bash
curl -fsSL https://get.docker.com | sh
```

Este script de un solo comando instalará Docker Engine y Docker Compose (actualmente compose es un subcomando de Docker, por lo que no es necesario instalar `docker-compose` por separado).

Para verificar la instalación:

```bash
docker --version
docker compose version
```

Si no quieres usar `sudo` para ejecutar Docker:

```bash
sudo usermod -aG docker $USER
```

Luego sal de la sesión y vuelve a iniciar sesión. Si sigue sin funcionar, reinicia el servidor.

## Tu primer archivo compose

Veamos un ejemplo súper sencillo:

```yaml
services:
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

Traducción línea por línea:

| Línea | Significado |
| --- | --- |
| `services:` | Define la lista de servicios a continuación |
| `whoami:` | Nombre del servicio, puedes ponerle el que quieras |
| `image: traefik/whoami` | Utiliza esta imagen |
| `container_name: whoami` | El contenedor se llama whoami |
| `restart: unless-stopped` | Se reinicia automáticamente si falla, a menos que lo detengas manualmente |
| `ports: - "127.0.0.1:8080:80"` | Mapea el puerto 8080 de la máquina local al puerto 80 del contenedor |

Guarda este fragmento como `docker-compose.yml` (o `compose.yml`, cualquiera de los dos nombres sirve) y ejecuta en el mismo directorio:

```bash
docker compose up -d
```

`-d` sirve para ejecutarlo en segundo plano.

Para comprobarlo:

```bash
curl http://127.0.0.1:8080/
```

Si ves que devuelve información, significa que ya está en marcha.

## Comandos habituales

Aquí tienes los comandos que más vas a usar:

```bash
# 启动（后台）
docker compose up -d

# 查看日志
docker compose logs -f

# 查看日志（只看最后 100 行）
docker compose logs --tail=100

# 停止
docker compose down

# 重启
docker compose restart

# 查看状态
docker compose ps

# 进入容器内部（排查问题时用）
docker compose exec whoami sh
```

Todos los comandos deben ejecutarse en el directorio donde se encuentra `docker-compose.yml`.

## Entender un archivo compose real

Tomemos como ejemplo el de Vaultwarden:

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "false"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

Nuevos elementos que aparecen aquí:

| Campo | Significado |
| --- | --- |
| `environment:` | Variables de entorno, equivalente a opciones de configuración |
| `volumes: - ./vw-data:/data` | Monta la carpeta `vw-data` del directorio actual en `/data` dentro del contenedor |

### environment

Las variables de entorno son el método de configuración para la mayoría de los servicios de Docker.

Cada servicio tiene sus propias variables; por ejemplo, Vaultwarden usa `DOMAIN`, `SIGNUPS_ALLOWED`; ntfy usa `NTFY_BASE_URL`, `NTFY_AUTH_DEFAULT_ACCESS`.

Puedes consultar la documentación de cada proyecto para saber qué variables admite.

### volumes

Los volúmenes (volumes) son la clave para la persistencia de datos.

Una vez que se elimina un contenedor, los archivos dentro de él desaparecen. Sin embargo, los directorios montados mediante volumes se encuentran en el sistema host y no desaparecen con el contenedor. Es como una partida guardada de un videojuego: cada vez que inicias el contenedor, cargas la partida guardada para empezar a jugar (risas).

```text
./vw-data:/data
  ↑              ↑
  宿主机目录     容器内路径
```

Esto significa que:

- Los archivos bajo `/data` en el contenedor se almacenan en realidad en el `./vw-data` del host.
- Si borras el contenedor y lo recreas, los datos siguen ahí.
- Para hacer una copia de seguridad, solo necesitas respaldar el `./vw-data` del host.

### ports

```text
"127.0.0.1:8080:80"
  ↑           ↑    ↑
  监听地址   宿主端口  容器端口
```

`127.0.0.1` significa que solo la máquina local puede acceder. No se puede conectar desde el exterior.

Si escribes `"0.0.0.0:8080:80"` o `"8080:80"`, entonces también se podrá acceder directamente desde la red pública.

Para gestores de contraseñas, paneles de administración y cosas por el estilo, utiliza siempre `127.0.0.1`, y luego expón HTTPS mediante un proxy inverso o un túnel.

## Usar un archivo .env para información sensible

No escribas contraseñas, tokens o nombres de dominio directamente en `docker-compose.yml` para luego subirlo a GitHub.

Crea un archivo `.env` en el mismo directorio:

```text
VAULTWARDEN_DOMAIN=https://vault.example.com
ADMIN_TOKEN=一个很长很复杂的随机字符串
```

Luego haz referencia a él en el compose:

```yaml
environment:
  DOMAIN: "${VAULTWARDEN_DOMAIN}"
  ADMIN_TOKEN: "${ADMIN_TOKEN}"
```

Añade el archivo `.env` a tu `.gitignore` para que no suba al repositorio.

## Actualizar un servicio

Para actualizar un servicio:

```bash
cd /srv/stacks/vaultwarden

# 先备份数据
tar -czf backup-$(date +%F).tar.gz vw-data

# 拉新镜像
docker compose pull

# 用新镜像重启
docker compose up -d

# 看日志确认正常
docker compose logs --tail=50
```

Haz una copia de seguridad antes de actualizar. Así podrás hacer rollback si surge algún problema.

## Eliminar un servicio

Si ya no quieres un servicio:

```bash
# 停止并删除容器
docker compose down

# 如果确认不要数据了，删目录
rm -rf /srv/stacks/那个服务
```

`docker compose down` solo borra el contenedor, no los datos de los volumes.

Si deseas limpiar por completo incluyendo los volúmenes:

```bash
docker compose down -v
```

Pero esto borrará los datos. Asegúrate de que ya no los necesitas antes de usarlo.

## Limpiar el disco

Con el uso prolongado, Docker acumula muchas imágenes antiguas. Como un disco de 2C2G no es muy grande, conviene limpiarlo de vez en cuando:

```bash
# 看 Docker 占了多少空间
docker system df

# 清理不用的镜像、容器、网络
docker system prune

# 连不用的 volume 也清（小心，会删孤立 volume 的数据）
docker system prune --volumes
```

`prune` solo limpia aquello que no se esté utilizando; los servicios en ejecución no se ven afectados. Pero ten cuidado al usar `--volumes`.

## Mi estructura de directorios

Me gusta organizarlo así:

```text
/srv/stacks/
├── vaultwarden/
│   ├── docker-compose.yml
│   ├── .env
│   └── vw-data/
├── ntfy/
│   ├── docker-compose.yml
│   ├── .env
│   ├── cache/
│   ├── data/
│   └── etc/
├── gatus/
│   ├── docker-compose.yml
│   └── config/
└── fast-note-sync/
    ├── docker-compose.yml
    ├── .env
    └── storage/
```

Un directorio por cada servicio. Entras al directorio y puedes ejecutar `docker compose up -d`. Tanto los datos como la configuración están en su propio directorio, lo que facilita las copias de seguridad.

## Preguntas frecuentes

**Conflicto de puertos**

Dos servicios no pueden usar el mismo puerto del host. Si Vaultwarden usó el 8080, ntfy tendrá que usar otro, por ejemplo el 8090.

**Problemas de permisos**

Algunas imágenes ejecutan aplicaciones dentro del contenedor con un usuario que no es root, y unos permisos incorrectos en los directorios montados pueden causar fallos de escritura. En ese caso, comprueba el propietario y los permisos del directorio en el host.

**Olvidar el parámetro -d**

Si ejecutas `docker compose up` sin `-d`, al cerrar la terminal el servicio se detendrá. Recuerda añadir `-d`.

**compose v1 vs v2**

Los tutoriales antiguos que usan `docker-compose up` (con guion) corresponden a la v1. Ahora se usa `docker compose up` (con espacio) para la v2. Los sistemas recién instalados vienen con la v2; si ves un tutorial antiguo con guion, cámbialo por un espacio y listo.

## Es suficiente por ahora

Llegados a este punto ya sabes cómo:

- Instalar Docker.
- Entender un archivo compose.
- Iniciar, detener, actualizar y eliminar servicios.
- Gestionar datos y configuraciones.
- Limpiar el disco.

A partir de ahora, en cada artículo de servicios autohospedados solo necesitaré darte un `docker-compose.yml` para que puedas ponerlo en marcha.

No hace falta entender todos los conceptos de Docker desde el principio. Empieza a usarlo y, a medida que lo emplees más, de forma natural querrás saber más.

## Sigue leyendo

Empieza eligiendo un uso en la [[2c2g-server-service-index|lista de servicios para servidores pequeños]], luego pon a prueba [[selfhost-ntfy-on-2c2g|notificaciones ntfy]], [[selfhost-vaultwarden-on-2c2g|gestor de contraseñas Vaultwarden]] o [[fast-note-sync-on-student-server|sincronización de Obsidian]], y conecta el dominio y la puerta de entrada mediante [[cloudflare-free-tier-developer-guide|Cloudflare]].
