---
title: "Qué puede hacer el plan gratuito de Cloudflare por los desarrolladores: el paquete todo incluido del santo patrón del ciberespacio sin gastar un centavo"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: "Un repaso a lo que realmente sirve del plan gratuito de Cloudflare: Pages, Workers, R2, Tunnel, Email Routing, DNS, Web Analytics y en qué casos conviene más que un VPS."
image: ""
tags:
  - Tutoriales prácticos
  - Creación web y Cloudflare
  - Beneficios oficiales para estudiantes
  - VPS y autoalojamiento
category: "Tutoriales y guías"
draft: false
alias: ""
lang: es
translationKey: "posts/cloudflare-free-tier-student-guide/cloudflare-free-tier-developer-guide"
---

No es casualidad que en el mundillo de los desarrolladores a Cloudflare lo llamen el «santo patrón del ciberespacio».

Para un desarrollador independiente, las cuotas de su plan gratuito son prácticamente un exceso de nutrientes.

Aquí recopilo algunos servicios gratuitos que me parecen útiles para cualquier desarrollador.

## Registro

[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

Basta con registrarse usando un correo electrónico. No hace falta vincular una tarjeta de crédito para usar la mayoría de las funciones gratuitas (algunas como R2 sí piden tarjeta, pero no cobran nada a menos que superes el límite).

Si no te deja registrarte, prueba cambiar de nodo o usar una ventana de incógnito.

## Cloudflare Pages

Es lo que más uso.

Pages te permite desplegar sitios estáticos (HTML, CSS, JS, o los archivos compilados de frameworks como Astro, Next.js o Hugo) en la red global de Cloudflare.

El plan gratuito te da:

- Sitios ilimitados
- Ancho de banda ilimitado
- 500 compilaciones al mes
- HTTPS automático
- Dominios personalizados
- Despliegues de vista previa (una URL de prueba por cada PR)

Para un blog personal, esto es prácticamente ilimitado.

Mi blog corre precisamente en Pages. Después de hacer push al repositorio de GitHub, GitHub Actions compila Astro y luego Wrangler lo sube a Pages. Todo el flujo tiene costo cero.

Si todavía no lo has probado:

[[astro-mizuki-blog-from-zero|Montar un blog sencillo con Sayori Lite]]

## Cloudflare Workers

Workers son las funciones Serverless de Cloudflare. Puedes escribir un pequeño fragmento de JS/TS, desplegarlo y se ejecuta en los nodos perimetrales de Cloudflare.

El plan gratuito te da:

- 100 000 peticiones al día
- 10 ms de tiempo de CPU por petición
- 1 MB de tamaño de código

Para qué sirve:

- Crear una API sencilla (como devolver frases aleatorias, reenviar peticiones o montar un acortador de enlaces)
- Añadir algo de lógica dinámica a un sitio estático
- Servir como receptor de Webhooks
- Hacer proxies sencillos o redirecciones

Para qué no sirve:

- Tareas que necesiten ejecutarse durante mucho tiempo
- Backends complejos que requieran base de datos (aunque se puede conectar D1 o KV, el plan gratuito tiene cuotas)
- Servicios que necesiten WebSockets persistentes

Si solo quieres escribir un blog, por ahora no vas a necesitar Workers. Pero viene muy bien saber que existe, porque te lo vas a cruzar a menudo cuando empieces a cacharrear con herramientas pequeñas.

## Cloudflare R2

R2 es almacenamiento de objetos compatible con la API de S3.

El plan gratuito te da:

- 10 GB de almacenamiento
- 10 millones de operaciones de clase A al mes (PUT/POST/LIST)
- 10 millones de operaciones de clase B al mes (GET)
- Tráfico de salida gratuito (esta es la verdadera joya)

Para qué sirve:

- Almacenar imágenes del blog (junto con un dominio personalizado funciona como alojamiento de imágenes)
- Guardar copias de seguridad
- Alojar recursos estáticos
- Almacenamiento para subida de archivos en proyectos pequeños

Por qué sale mejor que OSS: no te cobran por el tráfico de salida. En Alibaba Cloud OSS el tráfico de salida cuesta dinero, en R2 es gratis. Para blogs personales y proyectos pequeños, esta diferencia es enorme.

Hay que vincular una tarjeta de crédito para activar R2, pero dentro del nivel gratuito no te cobran nada.

## Cloudflare Tunnel

Tunnel te permite exponer servicios de tu red local (por ejemplo, un Vaultwarden en tu VPS que solo escucha en 127.0.0.1) a internet de forma segura.

Cómo funciona:

```text
用户
  -> vault.example.com
  -> Cloudflare 网络
  -> Cloudflare Tunnel（加密连接）
  -> 你的 VPS 127.0.0.1:8080
  -> Vaultwarden
```

Ventajas:

- El VPS no necesita abrir los puertos 80/443
- No tienes que solicitar certificados SSL por tu cuenta
- Se puede combinar con Cloudflare Access para añadir una capa de autenticación
- La IP del servidor de origen no queda expuesta

Mis instancias de [[selfhost-vaultwarden-on-2c2g|Vaultwarden]], [[selfhost-ntfy-on-2c2g|ntfy]], Gatus y el panel 1Panel pasan todos por Tunnel; el uso para sincronización de notas está en el [[fast-note-sync-on-student-server|tutorial de Fast Note Sync]].

El plan gratuito no tiene límite de túneles. Con un solo Tunnel puedes manejar varios subdominios.

Se instala ejecutando un demonio `cloudflared` en el VPS, que establece una conexión saliente sin necesidad de reglas de entrada.

## Cloudflare DNS

Cambia los servidores de nombres (NS) de tu dominio a Cloudflare y podrás usar su alojamiento DNS gratuito.

Si todavía no has elegido dominio, échale un vistazo a [[free-domain-and-web-community|dominios gratuitos y dominios del paquete de estudiantes]].

Ventajas:

- Anycast global, resolución rápida
- DNSSEC gratuito
- Oculta la IP de origen al combinarse con el modo Proxy
- Interfaz de gestión muy clara

Si compraste tu dominio en otro registrador (como Namesilo, Porkbun, SpaceShip o proveedores chinos), puedes cambiar los NS a Cloudflare para gestionarlo desde ahí.

Si usas un dominio gratuito (como los cc.cd de DNSHE), revisa si el proveedor permite cambiar los NS. Algunos lo permiten y otros solo dejan añadir registros en su propia plataforma.

## Cloudflare Email Routing

Email Routing te permite recibir correos con tu dominio personalizado y reenviarlos a tu buzón real.

Por ejemplo:

```text
me@example.com -> 转发到 -> 你的Gmail/Outlook
```

Es gratis y no tienes que montar tu propio servidor de correo.

Ideal para:

- Dejar un correo de contacto en el blog sin exponer tu dirección real
- Usar correos con dominio propio al registrarte en distintos servicios
- Aprender cómo funcionan los registros DNS de correo (MX, SPF, DKIM)

Ojo: esto es solo reenvío de correos entrantes. Si quieres enviar correos desde tu dominio personalizado, necesitarás una configuración adicional (por ejemplo, usando Gmail SMTP + alias, o servicios como Resend, Mailgun o Zoho Mail).

## Cloudflare Web Analytics

Sin instalar ningún script JS, Cloudflare te muestra las estadísticas básicas de tráfico de tu sitio.

Se activa directamente desde Web Analytics en el Dashboard.

Es mucho más ligero que Google Analytics:

- No rastrea a los usuarios
- No coloca cookies
- No necesita cargar JS adicional
- Respeta la privacidad

Para un blog personal, basta y sobra para ver si entra gente cada día, de dónde vienen y qué páginas leen.

Si más adelante quieres analíticas más detalladas (seguimiento de eventos, embudos, dimensiones personalizadas), siempre puedes mirar Umami o Plausible. Pero para empezar, lo que trae Cloudflare es suficiente.

## Cloudflare Access (plan gratuito de Zero Trust)

Access te permite añadir una capa de inicio de sesión a cualquier servicio web que tengas.

Por ejemplo, si tienes un panel de administración corriendo en `panel.example.com` y no quieres que cualquiera pueda entrar, Access muestra una pantalla de acceso y solo deja pasar a quienes superen la verificación.

El plan gratuito soporta hasta 50 usuarios.

Los métodos de verificación pueden ser:

- Código de un solo uso por correo electrónico
- Inicio de sesión con GitHub
- Inicio de sesión con Google

Mi panel 1Panel está protegido con Access. Aunque el panel ya tenga su propia contraseña, nunca está de más una capa extra de autenticación en la puerta.

## Qué más hay gratis

Otras cosas gratuitas que uso menos:

- **D1**: Base de datos SQLite que corre junto a Workers. El plan gratuito incluye 5 GB
- **KV**: Almacenamiento clave-valor. El plan gratuito tiene límites diarios de lectura/escritura, pero alcanza para proyectos pequeños
- **Queues**: Colas de mensajes
- **Images**: Transformación de imágenes (aquí el plan gratuito es bastante limitado)
- **Stream**: Alojamiento de video (el plan gratuito prácticamente no alcanza para nada)
- **Zaraz**: Gestión de scripts de terceros

No hace falta memorizarlo todo. Basta con saber que el plan gratuito de Cloudflare es muy generoso y volver a consultar esto cuando lo necesites.

## Cuándo no deberías usar Cloudflare

- Tareas en segundo plano de larga duración → usa un VPS
- Bases de datos persistentes y consultas complejas → usa un VPS o una base de datos gestionada
- Conexiones persistentes por WebSocket → Workers tiene limitaciones
- Procesamiento de archivos pesados → la memoria y CPU de Workers son limitadas
- Sensibilidad a la velocidad de acceso desde China continental → el plan gratuito de Cloudflare no siempre va rápido allí

Regla general: lo que pueda ir en Cloudflare, ponlo en Cloudflare; lo que deba ejecutarse de forma persistente, ponlo en un VPS. No son sustitutos, se complementan.

## Resumen de mi configuración

```text
博客静态文件 → Cloudflare Pages
域名 DNS → Cloudflare DNS
VPS 内网服务公网访问 → Cloudflare Tunnel
管理面板保护 → Cloudflare Access
博客图片（考虑中） → R2
流量统计 → Web Analytics
联系邮箱 → Email Routing
```

El servidor de estudiantes de 2C2G solo se encarga de correr lo que necesita ejecución persistente. Todo lo demás que se pueda delegar a Cloudflare, se lo quito de encima al servidor.

Si necesitas una máquina, puedes revisar primero [[azure-students-100-credit-guide|servidores de Azure en Japón]] o los [[aliyun-student-300-voucher-guide|cupones de estudiante de Alibaba Cloud]], y luego seguir la [[docker-compose-minimum-start|introducción a Docker]] y la [[2c2g-server-service-index|lista de servicios]] para desplegar tus aplicaciones.

## Lecturas adicionales

awesome-cloudflare: [https://github.com/zhuima/awesome-cloudflare](https://github.com/zhuima/awesome-cloudflare)

Este repositorio recopila todo tipo de herramientas y usos dentro del ecosistema de Cloudflare y tiene más de 14k estrellas. Si quieres saber «qué hace la gente con Cloudflare», empieza por aquí.

Tienes más herramientas externas recopiladas en la [[webmaster-resource-toolbox|lista de recursos para webmasters]], y una vez que tu web esté en línea puedes usar [[geoscore-2-4-guide|GeoScore]] para revisar si el rastreo y la información de la página están completos.
