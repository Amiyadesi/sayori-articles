---
title: Plugins de Godot muy útiles
published: 2026-07-03
created: 2026-07-03
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 2
description: ""
image: ""
tags:
  - 2026verano
  - registro de herramientas
  - Godot
  - desarrollo de juegos
category: "Registro personal"
draft: false
alias: ""
lang: es
translationKey: "posts/godot-useful-plugins/godot-useful-plugins"
---

# Inicio
Ya que voy a seguir con el desarrollo de juegos, ¡vamos a ordenar el equipo antes de empezar! He recopilado los plugins que más uso en mis proyectos y los dejo por aquí. En la [Godot Asset Store](https://store.godotengine.org/), la tienda de plugins oficial más reciente, también se pueden encontrar muchos complementos útiles. Además, añado una comunidad de Godot de China, [开源项目 - GodotHub](https://godothub.com/oss), donde hay plugins compatibles con TapTap y los minijuegos de WeChat y Douyin.

# DialogueManager
[nathanhoad/godot_dialogue_manager: A powerful nonlinear dialogue system for Godot](https://github.com/nathanhoad/godot_dialogue_manager), mi plugin de diálogo favorito. Aunque hay otras opciones excelentes como [dialogic-godot/dialogic: 💬 Create Dialogs, Visual Novels, RPGs, and manage Characters with Godot to create your Game!](https://github.com/dialogic-godot/dialogic) y [Konado](https://godothub.com/oss/konado/zh/2.4/) en el GodotHub chino, el administrador del sitio se queda siempre con este, ya que permite lograr un alto nivel de personalización de forma más sencilla.

# SceneManager
[m-canton/godot-scene-manager: Scene Manager Plugin for Godot.](https://github.com/m-canton/godot-scene-manager), esta es la versión que usa el administrador y la verdad es que va bastante bien. Recuerdo que en GitHub hay otros dos plugins de gestores de escenas con más de cien estrellas, les echaré un vistazo la próxima vez.

# RichText2
[RichTextLabel2 - Godot Asset Library](https://godotengine.org/asset-library/asset/3254)\
Suelo combinar este con el DialogueManager mencionado antes para conseguir efectos de texto de lo más chulos. La próxima vez añadiré un GIF por aquí.

# PhantomCamera
Aparte de ser un poco pesado (aunque por supuesto se puede recortar un poco por aquí y por allá), la cámara fantasma solo tiene ventajas: es cómoda y muy útil. [ramokz/phantom-camera: A Camera addon for Godot 4. Inspired by Cinemachine.](https://github.com/ramokz/phantom-camera), aquí tienes el enlace.

# SoundManager
Si tu juego no llega al punto de necesitar algo como FMod, pero aun así quieres controlar mejor el audio, entonces [nathanhoad/godot_sound_manager: A simple music and sound effect player for the Godot Engine](https://github.com/nathanhoad/godot_sound_manager) será una opción fantástica.

# EnhanceSaveSystem
Barrer para casa y presumir de lo propio (risas). Este es el plugin de guardado que el administrador programó combinando su propio criterio con ayuda de IA. Lo uso ampliamente en mis proyectos; me parece un sistema de guardado modular bastante cómodo, fácil de integrar con ganchos (*hooks*) y que además soporta varios tipos de guardado cifrado: [Amiyadesi/enhance_save_system](https://github.com/Amiyadesi/enhance_save_system).

# GodotSteam
[Welcome To GodotSteam - GodotSteam](https://godotsteam.com/), el célebre plugin de GodotSteam. Sobra decir que si quieres publicar en Steam, tarde o temprano tendrás que echarle un vistazo a fondo.

# Para terminar
Con los continuos movimientos extraños de Unity, Godot se ha vuelto mucho más popular en los últimos años, algo que creo que se tiene bien merecido. Este motor de código abierto también destaca aún más en la actual era de la IA, ya que combina a la perfección con ella. En definitiva, si te gusta el código abierto y la libertad, o simplemente quieres probar un motor nuevo, Godot es sin duda una gran opción. Y si quieres hacer algo con él, ¡aprovechar la fuerza de los plugins con cabeza es lo más normal del mundo!

## Seguir leyendo

Fuera de los plugins, mi propio proceso de desarrollo lo cuento en [[re0：game-dev-life|Otra vez en marcha, vida de desarrollo de juegos desde cero]], y también hablo de una [[after-gmtk|Retrospectiva de la GMTK Jam]] en la que por poco se me va el alcance de las manos en el último momento.

Si ya tienes pensado publicar tu obra en Steam, GodotSteam va ligado a temas de cuentas y cobros, de los cuales hablo en la [[steam-dev-work-01|Guía de registro para desarrolladores de Steam]].
