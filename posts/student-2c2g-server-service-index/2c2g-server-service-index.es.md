---
title: "¿Qué puede correr un servidor de estudiante 2C2G?: No satures la maquinita todavía"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "Configuración práctica del servidor ligero Alibaba Cloud 2C2G del webmaster: Vaultwarden, ntfy, Gatus, Fast Note Sync, AstrBot y puerta de enlace de búsqueda. Incluye consumo de memoria real y lista de no recomendados"
image: ""
tags:
  - Tutoriales prácticos
  - VPS y autohospedaje
  - Docker
  - Servidor de estudiante
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: "posts/student-2c2g-server-service-index/2c2g-server-service-index"
---
Si eres como el administrador y cambiaste tu cupón de estudiante de Alibaba Cloud de 300 yuanes por un servidor 2C2G, ¡felicidades!

 Ahora tienes una pequeña máquina en línea las 24 horas.

 Si aún no la has encendido, puedes echar un vistazo primero a [[aliyun-student-300-voucher-guide|cupón de estudiante de Alibaba Cloud]] o a [[azure-students-100-credit-guide|servidor de Azure en Japón]]; esta guía se encarga de la selección de usos después de encenderla.

 Pero recuerda que sigue siendo solo una máquina pequeña. Con 2 núcleos y 1.6 GB de RAM (unos 672 MB disponibles reales, con Swap activada), es adecuada para practicar y alojar servicios ligeros, no para tareas pesadas como correr modelos locales, Nextcloud o transcodificación de vídeo.

 Esta entrada es el registro de configuración real del administrador. El servidor lleva funcionando más de un mes con 14 contenedores actualmente: la memoria usada es de 765 MB + 987 MB de Swap, y el disco usa 21 GB de 40 GB.

## Primero, haz la configuración básica

No te apresures a instalar servicios todavía.

 Una vez que recibas el servidor, haz estas cosas primero:

- Inicio de sesión con clave SSH
- Desactivar el inicio de sesión por contraseña
- Cambiar el puerto SSH por defecto a uno no estándar
- Configurar grupos de seguridad y UFW
- Configurar las alertas de costes de Alibaba Cloud (tráfico CDT)
- Crear un directorio de servicios unificado
- Instalar Docker y Docker Compose

Puedes consultar los pasos anteriores en mi entrada anterior:

[Yo solo quería que un bot estuviera en línea 24/7 y terminé comprando un servidor en la nube](/posts/sayori-server-01-vps-start/)

Coloco el directorio de servicios en `/root/sayori/`, gestionándolo todo de manera unificada con un gran `docker-compose.yml`. También puedes usar un directorio por servicio:

```text
/srv/stacks/
  vaultwarden/
  ntfy/
  gatus/
  fast-note-sync/
```

Cada directorio lleva su propio `docker-compose.yml`, y las claves reales van en `.env` sin subirlas a repositorios públicos.

## Servicios que el administrador ejecuta actualmente

### 🔐 Vaultwarden (gestor de contraseñas, el más importante)

**Uso:** Gestor de contraseñas personal

**Por qué priorizarlo:**

- Un gestor de contraseñas es más importante que un blog, una página de estado o un bot
- Es ligero y consume poca memoria
- El ecosistema de clientes es maduro; puedes usar el cliente oficial de Bitwarden en el móvil, el ordenador y el navegador
- Es compatible con las funciones de pago de Bitwarden (almacenamiento de 2FA, comprobación de la salud de las contraseñas)

**Notas clave:**

- Cierra el registro en `SIGNUPS_ALLOWED` justo después de crear tu cuenta por primera vez
- Debes configurar HTTPS (con Cloudflare Tunnel o Caddy)
- Realiza copias de seguridad y simulacros de recuperación de forma periódica
- No lo dejes expuesto directamente a la red pública

**Consumo de memoria:** ~50 MB

**Tutorial detallado:** [[selfhost-vaultwarden-on-2c2g|Montar Vaultwarden en un servidor de estudiante 2C2G]]

---

### 📢 ntfy (notificaciones push, segundo en importancia)

**Uso:** Enviarme notificaciones push a mí mismo

Si ejecutas scripts de copia de seguridad, scripts de monitorización o tareas cron en el servidor, alguien tiene que avisarte si algo falla. ntfy es perfecto para esto.

**Para qué lo uso:**

- Notificaciones de éxito/fallo de copias de seguridad
- Alertas de comprobación de salud de Gatus
- Envío de resultados de moderación de comentarios
- Ejecución manual de algunos comandos de operaciones y mantenimiento (vía ntfy → combinación de scripts)

**Notas clave:**

- Configura el control de acceso para evitar que desconocidos envíen mensajes a tus temas (topics)
- Utiliza Cloudflare Access para proteger el panel de gestión

**Consumo de memoria:** ~20 MB



---

**Tutorial detallado:** [[selfhost-ntfy-on-2c2g|Ejecutar ntfy en un servidor de estudiante 2C2G]]

### 📊 Gatus (página de estado y comprobación de salud)

**Uso:** Monitorizar tus servicios

Puede comprobar periódicamente si tu blog, Vaultwarden, panel del bot o API siguen vivos. Si algo se cae, te avisa a través de ntfy.

**Puntos que monitorizo:**

- `sayori.org` Blog
- `vault.sayori.org` Vaultwarden
- `status.sayori.org` Gatus propiamente dicho
- `ntfy.sayori.org` ntfy
- API de sincronización de notas rápidas (Fast Note Sync API)

**Notas clave:**

- Escribe el archivo de configuración en YAML y ten cuidado de no equivocarte con la indentación al escribir
- Exponer mediante Cloudflare Tunnel y proteger con Access
- Conectar los canales de notificación con ntfy

**Consumo de memoria:** ~15 MB

---

### 📝 Fast Note Sync (sincronización para Obsidian)

**Uso:** Sincronización privada para Obsidian

Si, al igual que yo, usas Obsidian para escribir tu blog, registrar proyectos y guardar borradores, este servicio te resultará muy tentador. Es más barato que Obsidian Sync (0 yuanes) y menos problemático que Syncthing (no requiere que todos tus dispositivos estén en línea a la vez)

**Notas clave:**

- Haz copias de seguridad periódicas del directorio de datos
- No guardes archivos gigantescos (imágenes o vídeos)
- Gestiona manualmente los conflictos de sincronización

**Consumo de memoria:** ~30 MB

**Tutorial detallado:** [[fast-note-sync-on-student-server|Trastear con Fast Note Sync en un servidor de estudiante]]

---

### 🤖 AstrBot + NapCat (bot de QQ)

**Uso:** Bot de QQ/Telegram/Discord en línea las 24 horas

Al alojarlo en un servidor remoto, por fin es posible hacer que el bot funcione de forma ininterrumpida las 24 horas. Se puede integrar con Discord y Telegram, plataformas donde prácticamente no hay riesgos de control de riesgos (wind control).

**Notas sobre la integración con QQ:**

- Las cuentas nuevas son propensas a restricciones; se recomienda calentar las cuentas (raising accounts)
- No uses una cuenta recién creada de inmediato (lección aprendida con sangre por el administrador)
- NapCat requiere escanear el código QR para iniciar sesión periódicamente

**Consumo de memoria:** AstrBot ~100 MB, NapCat ~150 MB

---

### 🔍 AI Search Gateway (pasarela de búsqueda con IA)

**Uso:** Pasarela agregada de búsqueda con IA para uso propio

Integra Tavily, Brave Search, Firecrawl, Exa, Grok Search y SearXNG, construida con FastAPI. Resulta útil para Codex y Claude Code MCP, siendo más cómoda que llamar a las API de forma individual.

**Notas clave:**

- Escuchar únicamente en `127.0.0.1:8000`, no exponerlo a la red pública
- Llamadas locales a través de reenvío de puertos SSH + MCP
- Las claves de API van en las variables de entorno

**Consumo de memoria:** ~100 MB (incluyendo Redis y SearXNG)

---

### 🛡️ Comment Moderation (moderación de comentarios)

**Uso:** Moderación de comentarios del blog mediante IA

Utiliza la cuota gratuita de GPT de beneficencia para revisar automáticamente los comentarios de Twikoo, combinándolo con ntfy para enviar notificaciones con los resultados de la revisión. Permite eliminar y restaurar comentarios manualmente enviando mensajes a través de ntfy.

Además, con la verificación CAPTCHA de Cloudflare Turnstile, los comentarios que se quedan son básicamente de alta calidad.

**Consumo de memoria:** ~40 MB

---

### 🌐 Cloudflared (Cloudflare Tunnel)

**Uso:** Exponer servicios locales a la red pública sin abrir los puertos 80/443

Todos los servicios públicos del administrador pasan por Cloudflare Tunnel:

- `vault.sayori.org` → Vaultwarden
- `ntfy.sayori.org` → ntfy
- `status.sayori.org` → Gatus
- `panel.sayori.org` → 1Panel (debe configurarse con Cloudflare Access)

**Ventajas:**

- No es necesario abrir los puertos del servidor de origen
- HTTPS automático
- Se puede configurar Access para la autenticación

**Uso de memoria:** ~30MB

---

### 🎛️ 1Panel (Panel de gestión de Docker)

**Uso:** Gestionar contenedores Docker mediante interfaz web

Ideal para que los principiantes vean el estado de los contenedores, y también viene bien para depurar problemas puntuales

**Advertencia de seguridad:**

- Debe pasar obligatoriamente por Cloudflare Tunnel + Access, o al menos usar proxy inverso con HTTPS y una contraseña robusta
- Esto puede controlar todos tus contenedores
- No lo dejes expuesto a pelo en internet público

**Uso de memoria:** ~80MB

---

### Otros servicios auxiliares

- **Mihomo**: Cliente proxy, proporciona proxy a los servicios que lo necesitan
- **Redis**: Funciona como caché para Search Gateway

## Uso actual de memoria (datos reales)

```bash
$ ssh sayori "free -h"
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       765Mi        92Mi       2.0Mi       750Mi       672Mi
Swap:          2.0Gi       987Mi       1.0Gi
```

**Conclusión:**

- De 1.6GB de RAM, se usan 765MB, y de Swap se usan 987MB
- 14 contenedores, un consumo de memoria razonable
- Que se use bastante Swap indica que la memoria va justita, pero aguanta
- No le metas más servicios pesados

## Servicios no recomendados para correr en un 2C2G

Estos devoran RAM, CPU o almacenamiento; un 2C2G no puede con ellos:

### ❌ Nextcloud / OwnCloud

**Por qué no se recomienda:**

- Alto consumo de memoria (PHP-FPM + base de datos + Redis)
- La subida y bajada de archivos devora ancho de banda e IO
- La vista previa de archivos grandes se come la CPU
- Muchos conflictos de sincronización

**Alternativas:**

- Sincronización ligera de archivos: Fast Note Sync (solo sirve para texto), Syncthing
- Almacenamiento en la nube: Cloudflare R2 + Rclone

---

### ❌ Plex / Jellyfin / Emby

**Por qué no se recomienda:**

- La transcodificación de vídeo devora CPU y memoria
- El escaneo de la biblioteca multimedia consume muchísimo IO
- En 40GB de disco apenas caben unas pocas películas

**Alternativas:**

- Usar un NAS dedicado o un servidor multimedia
- O tirar directamente de streaming online

---

### ❌ GitLab

**Por qué no se recomienda:**

- Pide 4GB de memoria como mínimo
- Un 2C2G ni siquiera lo mueve

**Alternativas:**

- GitHub / Gitea / Forgejo
- Gitea es mucho más ligero, pero aun así requiere 512MB+ de RAM

---

### ❌ Mastodon / Misskey

**Por qué no se recomienda:**

- Los servidores del fediverso devoran memoria y base de datos
- El almacenamiento multimedia ocupa mucho disco

**Alternativas:**

- Registrarse directamente en una instancia pública

---

### ❌ Modelos grandes locales (Ollama / LM Studio)

**Por qué no se recomienda:**

- Hacer inferencia con 2 núcleos es tan lento que te hace cuestionarte la vida
- En 1.6GB de RAM no cabe ningún modelo mínimamente útil

**Alternativas:**

- Usar beneficios oficiales para estudiantes: GitHub Copilot Student, nivel gratuito oficial de Google AI Studio
- Usar cupones de estudiante para descontar: API oficial de modelos grandes de Alibaba Cloud Bailian
- Más detalles en: [Cómo pueden los universitarios usar cuotas oficiales de IA y gestionar su entorno de desarrollo con cc-switch](/posts/anyrouter-sharedchat-cc-switch-student-guide/)

---

### ❌ WordPress (no es que no funcione, es que no se recomienda)

**Por qué no es muy recomendable:**

- PHP + MySQL consumen bastante memoria
- Y si instalas muchos plugins, todavía más
- Los blogs estáticos (Astro / Hugo) rinden mucho mejor

**Si tienes que montarlo sí o sí:**

- Usa Caddy + PHP-FPM + SQLite
- Instala pocos plugins
- Configura Cloudflare CDN

## Orden de aprendizaje recomendado

Yo lo organizaría así:

1. **Configuración básica**: [[sayori-server-01-vps-start|SSH y grupos de seguridad]], [[docker-compose-minimum-start|Docker y Compose]], alertas de facturación
2. **Dominio y HTTPS**: [[free-domain-and-web-community|Dominio gratuito]] + [[cloudflare-free-tier-developer-guide|Cloudflare DNS y Tunnel]]
3. **Servicios principales**: [[selfhost-vaultwarden-on-2c2g|Gestor de contraseñas Vaultwarden]] + [[selfhost-ntfy-on-2c2g|Notificaciones ntfy]] + monitorización Gatus
4. **Añadir según necesidad**: [[fast-note-sync-on-student-server|Fast Note Sync]], bots y otras herramientas

**No instales 10 servicios de golpe.** Ve uno por uno y añade el siguiente cuando el anterior ya funcione estable

## Recursos relacionados

**Descubrimiento de servicios autoalojados:**

- awesome-selfhosted: [https://awesome-selfhosted.net/](https://awesome-selfhosted.net/)
- awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

**Proyectos mencionados en este artículo:**

- Vaultwarden: [https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
- Fast Note Sync: [https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)
- ntfy: [https://ntfy.sh/](https://ntfy.sh/)
- Gatus: [https://gatus.io/](https://gatus.io/)
- AstrBot: [https://github.com/Soulter/AstrBot](https://github.com/Soulter/AstrBot)

`awesome-selfhosted` sirve para buscar «qué más se puede autoalojar». `awesome-cloudflare` sirve para ver «qué cosas te puedes ahorrar en el VPS y delegar directamente a Cloudflare»

Tener un servidor personal no significa cargarlo todo a tus espaldas. Lo que puedan hacer Cloudflare Pages, Workers, R2 o Tunnel, no lo aguantes a la fuerza con 2GB de RAM

---

## Para terminar

Un servidor 2C2G es ideal como «punto de partida para servicios personales de uso diario»

Te permite:

- Familiarizarte con Linux, Docker, proxies inversos, dominios y HTTPS
- Correr varios servicios ligeros pero útiles
- Coger el hábito de hacer copias de seguridad, monitorizar y mantener sistemas

No te permite:

- Correr servicios pesados
- Usarlo como servidor de producción
- Sustituir un NAS profesional o un servidor multimedia

Pero con eso basta

Un servidor no se acaba cuando terminas de configurarlo; te obliga a tomarte en serio las copias de seguridad, la seguridad y la monitorización. Y en el fondo, eso es algo bueno

## Seguir leyendo

Más allá de los servidores en la nube, también he trasteado con [[make-home-server|convertir un ordenador viejo en una nube casera]], donde igualmente puedes usar esta lista para elegir servicios

Si quieres conectar tus herramientas de IA a tu propia capacidad de búsqueda, échale un vistazo a [[build-your-search-gateway|arquitectura y flujo de trabajo de Search Gateway]], y sigue cacharreando hacia lo que realmente necesites
