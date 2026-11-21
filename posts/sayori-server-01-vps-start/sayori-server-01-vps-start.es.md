---
title: Solo quería que el bot estuviera en línea 24 horas y terminé comprando un servidor en la nube
published: 2026-05-25
created: 2026-05-25
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "De los cupones de estudiante de Alibaba Cloud a Ubuntu, inicio de sesión con clave SSH, puerto no estándar y cortafuegos básico: el primer paso con un servidor personal."
lang: es
translationKey: "posts/sayori-server-01-vps-start/sayori-server-01-vps-start"
image: ""
tags:
  - Tutorial práctico
  - VPS y autoalojamiento
  - Alibaba Cloud
  - Beneficios oficiales para estudiantes
category: "Tutoriales y guías"
draft: false
---

# Introducción

Al principio no pensaba montar ningún sistema de servidores. Solo quería que un bot de QQ estuviera en línea las 24 horas

En local claro que se puede correr. Con AstrBot abierto, NapCat colgado, el servicio encendido, sin cortes de red y usando el PC como host

![[Pasted image 20260609215751.png]]

Así que de forma muy natural entendí qué es un servidor: una computadora encendida las 24 horas, metida en el centro de datos de alguien más

Y como el webmaster es un estudiante pobre, pues claro que movilicé a mi ejército de IA para rastrear opciones gratis )

Luego vi que la verificación de estudiante de Alibaba Cloud tiene un cupón de 300 yuanes, [enlace para reclamar beneficios de estudiante](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv), sería tontería no pedirlo

Después de reclamarlo también vi una [prueba gratuita de ECS](https://free.aliyun.com). Recomiendo probar primero con esto; abrir una configuración de 2H2G ya basta para jugar con el bot y justo alcanza para tres meses

![[Pasted image 20260609221047.png]]

Y ese cupón de 300 yuanes viene perfecto para pasar el ECS de prueba a un ECS anual; ¡el webmaster ya lo convirtió!

![[Pasted image 20260609221956.png]]

Echando cuentas, básicamente se puede sacar un servidor gratis durante cuatro años

Aunque ojo: el tráfico gratuito mensual de Alibaba Cloud en China continental parece ser solo de 20 GB. A mí solo para el bot me alcanza, pero mejor configurar una alerta de cuota

## Conectarme a la máquina por primera vez

Después de comprar el servidor empieza el verdadero problema: ¿cómo entro?

La consola te da una IP pública, el usuario root y una contraseña inicial. Lo más directo es conectarse una vez con la contraseña:

```powershell
ssh root@<VPS_PUBLIC_IP>
```

La primera conexión te preguntará si confías en esta máquina; confirma que no te equivocaste de IP y luego escribe `yes`

Pero iniciar sesión con contraseña solo sirve como transición. Para uso real a largo plazo, sigo recomendando cambiar directo a inicio de sesión con clave SSH

Una contraseña es como esconder la llave bajo el tapete. Es cómoda, sí, pero a una máquina con IP pública la escanean todos los días. Tener el puerto 22 por defecto más inicio de sesión con contraseña es básicamente decirle a todos los scripts de internet «ven a tocar la puerta»

## Generar la clave SSH

Yo estoy en Windows, así que primero genero en local una clave SSH dedicada solo para este servidor:

```powershell
ssh-keygen -t ed25519 -C "sayori-vps" -f "$env:USERPROFILE\.ssh\sayori_ed25519"
```

También puedes darle Enter a todo. Si quieres darle una capa extra de protección a la clave privada, pon una passphrase

Al terminar tendrás dos archivos:

```text
C:\Users\<你>\.ssh\sayori_ed25519
C:\Users\<你>\.ssh\sayori_ed25519.pub
```

El que no tiene `.pub` es la clave privada; ~~si no sabes para qué sirve me la puedes mandar~~, así me puedo conectar a tu SSH 😈

El que lleva `.pub` es la clave pública, y se puede poner en el servidor

Veamos el contenido de la clave pública:

```powershell
Get-Content "$env:USERPROFILE\.ssh\sayori_ed25519.pub"
```

Copia toda la línea, desde `ssh-ed25519` hasta el comentario del final

## Meter la clave pública en el servidor

Mantén abierta la ventana SSH donde entraste con contraseña y prepara el directorio SSH en el servidor:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

Pega ahí toda la línea que está en tu `.pub` local y guarda

Luego cambia los permisos:

```bash
chmod 600 ~/.ssh/authorized_keys
```

Este paso parece muy raro, pero es importante. Si los permisos son demasiado abiertos, SSH directamente dejará de funcionar y no reconocerá la clave

A continuación escribe un alias SSH en local. Así no tendrás que teclear cada vez una tira larga de IP, puerto y ruta de clave privada

Abre:

```powershell
notepad $env:USERPROFILE\.ssh\config
```

Escribe dentro:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port 22
  IdentityFile ~/.ssh/sayori_ed25519
```

Abre una terminal nueva y prueba:

```powershell
ssh sayori
```

Si entra directo, significa que el inicio de sesión por clave ya funciona

Ojo: prueba en una terminal nueva. No cierres todavía la ventana vieja con contraseña; esa ventana ahora es como una cuerda de seguridad, suéltala solo cuando termines todo

## Desactivar la contraseña y cambiar a un puerto no estándar

Una vez que la clave funcione, puedes apagar el inicio de sesión con contraseña y, de paso, sacar SSH del puerto 22 por defecto

Primero elige un puerto no estándar, por ejemplo:

```text
11451
```

No copies este tal cual. Elige tú uno entre 1024 y 65535 que no choque con otros servicios

Luego ve primero al grupo de seguridad de Alibaba Cloud ECS y abre este puerto. Esto es muy importante

UFW dentro del servidor es una puerta, y el grupo de seguridad de Alibaba Cloud es otra. Si solo cambias el servidor y no el grupo de seguridad, el puerto nuevo igual no entrará

Después de abrirlo en el grupo de seguridad, vuelve a la ventana SSH y escribe tu propio fragmento de configuración SSH:

```bash
nano /etc/ssh/sshd_config.d/99-sayori.conf
```

Contenido:

```text
Port <SSH_PORT>
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin prohibit-password
```

Aquí `PermitRootLogin prohibit-password` significa que root todavía puede entrar con clave, pero no con contraseña

Lo más estricto es crear un usuario normal y luego deshabilitar root. Solo que en este artículo primero cuento la forma más rápida que funciona

Tras editarlo, revisa si la configuración SSH tiene errores de sintaxis:

```bash
sshd -t
```

Que no devuelva nada es buena noticia

Luego reinicia el servicio SSH:

```bash
systemctl restart ssh
```

Por ahora no cierres la ventana vieja

Cambia también el puerto en tu `~/.ssh/config` local:

```text
Host sayori
  HostName <VPS_PUBLIC_IP>
  User root
  Port <SSH_PORT>
  IdentityFile ~/.ssh/sayori_ed25519
```

Abre una tercera terminal nueva y prueba:

```powershell
ssh sayori
```

Solo si logra entrar significa que el puerto nuevo, la clave y el grupo de seguridad están bien

Yo también probaría una vez si el acceso antiguo por contraseña quedó cerrado, por ejemplo conectándome a mano a la IP sin clave privada

Si aún te pide contraseña y te deja entrar, significa que `PasswordAuthentication no` no surtió efecto; no corras a seguir, aclara eso primero

## Configurar el cortafuegos

Cuando SSH esté estable, configura el propio cortafuegos del servidor

En Ubuntu lo más cómodo es UFW:

```bash
apt update
apt install -y ufw
```

Prepara primero las reglas:

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow <SSH_PORT>/tcp
```

Si ya piensas abrir servicios web, puedes dejar listos HTTP / HTTPS:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

Luego actívalo:

```bash
ufw enable
ufw status verbose
```

Aquí sigo recomendando conservar la ventana SSH vieja. Conéctate otra vez desde una terminal nueva:

```powershell
ssh sayori
```

Si logra entrar, entonces cierra la ventana vieja

## Dar un vistazo a la máquina una vez conectados

Cuando la conexión ya esté firme, puedes echar un ojo al estado de la máquina:

```bash
uname -a
df -h
free -h
systemctl status ssh --no-pager
ufw status numbered
```

2H2G no es mucha memoria, así que al elegir servicios más adelante conviene que casi todo sea ligero

Si se puede evitar una base de datos, mejor evitarla; si se puede usar SQLite, primero SQLite; si se puede poner en Cloudflare Pages, mejor no meterlo en el VPS

Esta máquina después no solo corrió el bot: Vaultwarden, ntfy, Gatus, Portainer y AI Search Gateway también nacieron aquí

[https://awesome-selfhosted.net/](https://awesome-selfhosted.net/), ¡aquí hay un sitio de la serie awesome muy bueno sobre cómo aprovechar un servidor!

Mirando atrás, lo más útil de un servidor personal no es un servicio concreto, sino que te obliga a entender redes, despliegue, seguridad, copias de respaldo y esas cosas

Si empezara de nuevo, crearía antes algunos hábitos:

1. Una carpeta separada para cada servicio
2. Secretos reales solo en `.env` o en los Secret de la plataforma
3. Meter en la documentación todo comando que se pueda copiar
4. Dejar una línea de comando de verificación tras cada despliegue

Hasta aquí llega este artículo. El servidor ya se puede conectar de forma estable por SSH, se cerró el acceso por contraseña, se cambió el puerto y el cortafuegos tiene su límite más básico

En el siguiente cuento cómo pasar la configuración local al host remoto usando `scp`

Es decir, por fin empezar a mover el bot de «funciona en mi PC» a «también puede funcionar en el servidor»

## Seguir leyendo

Si aún no eliges máquina, puedes ver [[aliyun-student-300-voucher-guide|Cupón de estudiante de Alibaba Cloud]] o [[azure-students-100-credit-guide|Servidor de Azure en Japón]]; una vez conectada, sigue por [[docker-compose-minimum-start|Introducción a Docker]] → [[2c2g-server-service-index|Lista de servicios]] y elige uno que sepas usar para instalarlo
