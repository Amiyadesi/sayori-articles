---
title: Registro de la transformación de una vieja PC con win7 en un servidor casero
published: 2026-08-09
created: 2026-08-09
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 3
description: Convierte una vieja PC con win7 en casa en un servidor Linux desde cero; después de leer esto, tú también puedes hacerlo
image: ""
tags:
  - Tutorial práctico
  - VPS y autohospedaje
  - Docker
  - Servidor casero
category: "Tutoriales y guías"
draft: false
lang: es
translationKey: "posts/make-home-server/make-home-server"
alias: ""
---
# Motivo
Cuando hablé con mi familia al regresar de las vacaciones de verano, descubrí que en casa había una computadora con Windows 7 vieja que ya no pensábamos usar, así que se me ocurrió armar un servidor casero. Con la guía y el aprendizaje paso a paso detallado de la IA, por fin logré configurarlo con éxito y unirme a mi propia red de Tailscale, así que lo registro aquí.
![[25ee964400599b3dac2bca3473cd1508.png|width=800|center|amiyadesi的homeserver组网成功]]

# Registro completo

## Fase de preparación

Prepara una pequeña memoria USB de al menos 4 GB para crear el disco de instalación de Ubuntu. Primero descarga la última versión estable desde el [sitio web oficial de Ubuntu Server](https://ubuntu.com/download/server); por ejemplo, el webmaster descargó la versión 26.04, y luego descarga [Rufus](https://rufus.ie/) para crear el disco de arranque.
![[Pasted image 20260809163126.png|width=600|center|Rufus界面]]
En Rufus, selecciona la imagen de Ubuntu que descargaste. Confirma que no haya archivos importantes en la memoria USB antes de comenzar la escritura, y deja las demás opciones con sus valores predeterminados. Una vez que termine, tendremos una memoria USB con el instalador de Ubuntu Server 26.04 LTS.

## Fase de instalación
Inserta la memoria USB antes de encender la computadora. Cuando aparezca el logotipo de **Lenovo**, presiona `F12` varias veces seguidas; si no funciona, puedes probar con `Fn+F12`. Al entrar al **Boot Menu**, usa las teclas de dirección para seleccionar la opción de arranque con USB, y así podrás iniciar desde la memoria USB e ingresar al proceso de instalación de Ubuntu.

![[Pasted image 20260809171132.png|800|center|美化后的选择图片1]]

Las selecciones anteriores se pueden dejar en los valores predeterminados. Luego, cuando el webmaster llegó a este punto, la IA recomendó marcar de preferencia la tercera opción para que te ayude a buscar automáticamente controladores de terceros y reducir los problemas de falta de sonido y de conexión al Wi-Fi.

![[Pasted image 20260810134432.png|800|center|美化后的选择图片2]]

Después, al llegar a esta página, si hay Wi-Fi en casa, usa las teclas de dirección para moverte a la segunda opción `wlp3s0`, presiona Enter para continuar y luego selecciona `Edit Wifi`, ingresa el nombre y la contraseña del Wi-Fi de tu casa, y listo. Esto facilita que ya tenga conexión a internet directamente una vez que se complete la configuración posterior.

A continuación, aparecerá una página para que ingreses la configuración de tu proxy; si no lo necesitas, puedes omitirla directamente.

![[Pasted image 20260810144129.png|800|center|美化后的选择图片3]]

Si vas a modificar toda la computadora como yo, sigue haciendo clic en "done" (listo). En la siguiente página aparecerá la información de resumen de tu computadora; sigue haciendo clic en "done" y "continue", y luego entrará en un periodo de instalación que tomará un momento...

![[Pasted image 20260810145100.png|800|center|美化后的选择图片4]]

Al entrar a esta interfaz, podrás configurar el nombre del servidor, el nombre de usuario y la contraseña. El instalador de Ubuntu Server crea un usuario normal y le otorga privilegios de `sudo`; Ubuntu bloquea por defecto la cuenta de `root`, por lo que aquí no es necesario poner `root` como nombre de usuario. Yo uso `amiya`, inicio sesión posteriormente mediante `ssh amiya@服务器地址` y ejecuto `sudo` cuando necesito permisos de administrador.

Recuerda el nombre de host, el nombre de usuario y la contraseña que configures aquí. Olvidar la contraseña no significa necesariamente que tengas que reinstalar todo el sistema, pero el proceso de recuperación será mucho más complicado.

Luego, en el medio habrá una opción para elegir si quieres Ubuntu Pro, sáltatela directamente; una persona normal prácticamente no lo usa, jeje.

![[Pasted image 20260810145401.png|800|center|美化后的选择图片5]]

Después viene lo **importante**. Primero, OpenSSH definitivamente debe instalarse. En segundo lugar, si tienes una cuenta de GitHub y ya configuraste tu clave pública SSH, puedes ingresar directamente tu nombre de usuario de GitHub para importar la clave pública. Una vez finalizada la instalación, podrás iniciar sesión en la misma red local mediante IP y clave SSH.

Tras confirmar que la clave pública se importó correctamente, puedes dejar sin marcar la opción `[ ] Allow password authentication over SSH` en la imagen. Esta opción controla si se permite el inicio de sesión por SSH utilizando contraseña.

![[Pasted image 20260810150230.png|800|center|美化后的选择图片6]]

Luego, el instalador enumerará algunos programas de servidor comunes. Si realmente los necesitas, puedes seleccionarlos con la barra espaciadora; si no los necesitas por ahora, simplemente selecciona `Done`.

Por último, haz clic en `Reboot Now`. Si aparece **Please remove the installation medium, then press ENTER**, es bastante sencillo: retira la memoria USB y presiona enter para iniciar normalmente. Si esto no aparece, retira la unidad cuando la pantalla se ponga negra; de lo contrario, tendrás que reencarnar de inmediato...

## Configuración inicial

Para mayor comodidad en las conexiones posteriores, el webmaster decidió usar Tailscale para crear la red.

```
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

Una vez que todo esto esté instalado, por lo general te dará un enlace de Tailscale. ¡Inicia sesión con tu cuenta de Tailscale en tu dispositivo principal para conectarte fácilmente a la red local!

# Postfacio
Hasta ahora lleva funcionando más de dos días, y logré migrar con éxito los bots de Sayori (AstrBot y Napcat) anteriores al servidor de banda ancha doméstica, ¡oh, sí!

![[Pasted image 20260810150652.png|800|center|纱世里可爱捏]]

Y ahora Fast Note Sync también se migró con éxito al servidor de banda ancha doméstica, haciendo que la sincronización de los datos de mi blog sea un poco más rápida.

> [!NOTE]
> Y por ahora tampoco sé qué más hacer, miau. Sin embargo, tener un servidor de banda ancha doméstica en casa sigue siendo bastante divertido, miau. En las pruebas reales, el ancho de banda de subida es de unos 70 Mbps, y los 2 núcleos con 4 GB también funcionan bien. Si has leído hasta aquí, ¡te agradezco que me des algunas sugerencias sobre cómo aprovechar al máximo este pequeño servidor doméstico!

## Leer más

Una vez que la máquina esté lista, puedes continuar leyendo [[docker-compose-minimum-start|Docker: Introducción mínima]] y elegir un servicio que te sea útil de la [[2c2g-server-service-index|Lista de servicios para servidores pequeños]].

Más tarde migré la sincronización de notas a casa, y el proceso se encuentra en [[fast-note-sync-on-student-server|Fast Note Sync]]. Si necesitas configurar un dominio y HTTPS para el servicio, consulta [[cloudflare-free-tier-developer-guide|Cloudflare]].
