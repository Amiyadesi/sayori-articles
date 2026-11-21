---
title: Lectura semanal de artículos de internet 2 — Own the Slice
published: 2026-09-27
created: 2026-09-27
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 1
description: Own the Slice — ¿La metodología de programación que deberíamos dominar en la era de la IA?
image: ""
tags:
  - Reflexiones de lectura
  - Lectura semanal
  - Flujo de trabajo con IA
  - Otoño 2026
category: "Reflexiones personales"
draft: false
alias: ""
lang: es
translationKey: "posts/weakly-articles-02/weakly-articles-02"
---
[Enlace al artículo original](https://www.kentlangley.com/blog/own-the-slice/)

# Interpretación
La inteligencia artificial ya ha reducido el coste de escribir código mucho más rápido que el de sacar adelante el trabajo de producto. Este artículo plantea una unidad de trabajo en la que una sola persona puede hacerse responsable de todo el proceso, desde la necesidad del cliente hasta la entrega final.

Al principio del texto se plantea una situación: a simple vista, llevar varias tareas en paralelo no parece tener ningún problema. Sin embargo, según este estudio [https://contextcost.com/the-research](https://contextcost.com/the-research), cada vez que trabajas en paralelo acabas perdiendo más tiempo cambiando de una cosa a otra. El autor cita la clásica estimación empírica de Weinberg para ilustrar el coste del cambio de contexto en proyectos paralelos: a medida que aumentan los proyectos simultáneos, el tiempo dedicado a volver a cargar el contexto en la cabeza puede dispararse rápidamente.

Con dos proyectos ya pierdes 1/5 de tu tiempo total; si llevas cinco a la vez, se te van casi las 3/4 partes. Y eso es solo el tiempo de cambio: si al 100 % le restas ese tiempo perdido y luego lo divides entre el número de proyectos, tu eficiencia de desarrollo cae por los suelos. Conviene aclarar que estos porcentajes son una estimación basada en la experiencia, no el resultado de un experimento estricto. A partir de ahí, el autor introduce el concepto central del artículo: `slice`.

Para mí, `slice` es un **corte vertical / resultado entregable**: en lugar de dividir el trabajo según la arquitectura técnica, se parte de una necesidad real, se atraviesan todas las capas necesarias para resolverla y se entrega al final un resultado que el usuario pueda percibir de verdad. De paso, también menciona `INVEST检查清单`, que es uno de los paradigmas de la programación ágil.

Luego el autor señala cuál es el impacto real de la IA hoy en día: recorta drásticamente el tiempo en la fase de implementación, pero el ahorro en la toma de decisiones es muy limitado. El resultado final puede ser incluso un aumento en el tiempo total de desarrollo, tal y como muestra un curioso experimento citado en el artículo [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).

El autor alinea varios años de informes DORA para trazar una narrativa de «la IA pasa de perturbar los sistemas de producción a ser absorbida poco a poco por ellos». Sin embargo, esos datos anuales no corresponden a un seguimiento longitudinal estricto del mismo grupo de estudio, así que prefiero tomarlo como una pista de tendencia más que como una relación causal demostrada.

# Mi interpretación
En realidad, la visión que da el artículo sobre la IA ya es bastante habitual hoy en día dentro del mundillo tecnológico: la IA se parece más a una herramienta brutal para ganar eficiencia que a una auténtica «lámpara de los deseos».

Puede comprimir muchísimo el tiempo necesario para la implementación, pero desarrollar un proyecto no es solo picar código. Analizar requisitos, diseñar soluciones, probar, hacer *reviews*, integrar y validar: ninguna de estas fases se ha comprimido al mismo ritmo.

Y ahí es donde surge el problema.

Antes, al desarrollar una funcionalidad, lo más caro solía ser «escribirla». Ahora que tenemos la IA, «escribirla» es cada vez más barato, y lo verdaderamente caro se ha desplazado hacia decidir qué hay que hacer, juzgar si lo que se ha generado está bien y lograr terminar una cosa de verdad.

Dicho de otro modo, la IA no ha eliminado los cuellos de botella del desarrollo; simplemente los ha cambiado de sitio.

Justo por eso me parece tan interesante el concepto de `slice`.

Si el coste de implementar baja cada vez más, es muy fácil caer en una trampa nueva: como «empezar algo» sale tan barato, acabas lanzando cada vez más tareas a la vez. Pedirle a la IA que programe una función cuesta un solo *prompt*, y abrir otro agente para hacer otra cosa no supone casi ningún esfuerzo mental extra. A simple vista, parece que todo avanza a la vez.

Pero al final alguien tiene que entender, probar, corregir y decidir si acepta todo ese trabajo generado... y ese alguien sigues siendo tú.

Así que el aumento de productividad que trae la IA puede acabar generando todavía más código sin validar, funcionalidades a medio terminar y contextos que hay que volver a cargar en la cabeza. Se produce código cada vez más rápido, pero lo que de verdad queda terminado no aumenta en la misma proporción.

Visto desde este ángulo, `slice` funciona más bien como un freno para esa inercia.

En vez de trocear el trabajo en tareas técnicas como «montar la base de datos», «hacer una interfaz» o «añadir una API», es mejor definir el objetivo como un resultado completo y verificable; por ejemplo: «que el usuario pueda hacer algo que antes no podía».

La IA sigue pudiendo ayudarte con la base de datos, la interfaz, la API y los tests, pero ya no se cuentan como varias tareas terminadas por separado, sino como piezas distintas de un mismo resultado.

Esto me recuerda bastante a mi propia experiencia usando agentes de programación últimamente.

Antes tenía que escribir el código yo mismo, así que por pura capacidad física había un límite a las cosas que podía llevar a la vez. Pero ahora puedo poner a varios agentes a modificar distintos proyectos simultáneamente: un juego, una web, scripts de automatización o incluso varias funciones dentro del mismo proyecto.

En apariencia, mi «velocidad de desarrollo» se ha disparado.

Pero cuando los agentes terminan, si quiero seguir teniendo el control de los cambios, me toca leer uno por uno lo que han hecho, comprobar que no se hayan cargado la lógica anterior, pasar los tests y volver a meter todo ese mapa mental del proyecto en mi cabeza.

Puede que el verdadero cuello de botella ya no sea «escribo código demasiado lento», sino «no me da la atención para entender y validar todo lo que escupe la IA».

Por eso creo que en la era de la IA una habilidad clave no es cuántos agentes eres capaz de manejar a la vez, sino controlar cuántas «cosas sin terminar de verdad» tienes abiertas al mismo tiempo.

Esto es lo que me llevo de este artículo.

Todavía no tengo claro si `slice` es realmente la mejor solución. Hay refactorizaciones de bajo nivel, deuda técnica u optimizaciones de rendimiento que difícilmente se traducen de forma directa en algo perceptible para el usuario; además, hacer que una sola persona cargue con todo desde el requisito hasta la entrega también puede generar otro tipo de carga cognitiva.

Pero al menos ofrece un punto de vista muy interesante:

**Ahora que el código es cada vez más barato, ¿no deberíamos empezar a medir el progreso por lo «terminado» en lugar de por lo «implementado»?**

Antes era muy fácil confundir «he terminado este bloque de código» o «ya está este módulo» con haber avanzado. Pero ahora que la IA ha desplomado el coste de implementación, esa forma de medir quizá esté dejando de servir.

Lo que de verdad importa puede que ya no sea cuánto código fabricamos, sino cuántas cosas atraviesan de verdad el diseño, la implementación, la verificación y la integración hasta convertirse en un resultado que se pueda usar, experimentar y entregar.

Si es así, entonces lo verdaderamente escaso en la era de la IA quizá no sea solo la capacidad de implementar, sino la capacidad de controlar el alcance, la atención y el propio acto de «terminar».

# Epílogo
Uf... qué cansado es leer artículos... encima tan técnicos... y tan largos.

Y a ver cómo lo digo: mi sensación real al leerlo fue que, o bien contaba cosas que ni hacía falta explicar, o soltaba un montón de cosas que no había por dónde cogerlas.

Supongo que es la famosa maldición del conocimiento: en cuanto dominas un tema, te cuesta horrores ponerte en la piel de tu yo anterior que no tenía ni idea.

Y claro, si luego quieres compartir tus reflexiones o lo que has sacado en claro, tienes que saber expresarlo bien con palabras. Porque si escribes un artículo que solo entiendes tú, pues hombre, llamarlo artículo es bastante discutible...

Compartir nunca ha sido tarea fácil, la verdad... Superar la vergüenza o el miedo a publicar es solo el primer escalón; lo difícil viene después: cómo expresar mejor tus ideas, demostrar lo que has entendido, argumentarlo bien y encima conseguir que el texto enganche.

Un poco como lo que decía este mismo artículo:

«Escribirlo» no equivale a «terminarlo».

## Seguir leyendo

El punto de partida de esta serie está en [[weakly-articles-01|Primera lectura de artículos de internet]], y con este tema del alcance y de saber terminar las cosas ya me llevé un buen golpe en [[after-gmtk|GMTK Jam]].

Más adelante, cuando hice [[subarutap-and-selfthink|SubaruTap]], por fin logré cerrar otro pequeño ciclo; leer estas entradas seguidas también refleja cómo he ido reentendiendo poco a poco el proceso de crear.
