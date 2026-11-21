---
title: Guía para evitar errores al registrarse como desarrollador de Steam en China
published: 2026-09-10
created: 2026-09-10
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 2
description: Todo el proceso y los puntos clave para registrarte como desarrollador chino en Steam. ¡Con leer esta guía te basta!
image: ""
tags:
  - Guía práctica
  - Consejos y trucos
  - Desarrollo de videojuegos
  - Steam
category: "Tutoriales y guías"
draft: false
lang: es
translationKey: "posts/steam-dev-work-01/steam-dev-work-01"
alias: ""
---
# Guía para evitar errores al registrarse como desarrollador de Steam en China: mi experiencia real desde el formulario fiscal hasta los métodos de cobro

Muchos desarrolladores independientes quieren subir sus juegos a Steam, pero se quedan atascados en el primer paso —«registrarse como desarrollador»— porque hay que rellenar un montón de cosas y lidiar con varios trámites, así que acaban pensando en dejarlo para más adelante.

Si quieres gestionar tus propios juegos por tu cuenta, cuanto antes hagas esto mejor, porque después del registro todavía te tocará montar la página de la tienda, configurar la clasificación por edades, crear la cuenta y la organización de desarrollador, dar de alta el proyecto del juego, etc.

Claro que si piensas buscar un publisher, quizá no necesites registrarte tú mismo, aunque a cambio tendrás bastante menos control sobre tu proyecto; o bien puedes registrarte como desarrollador igualmente, y así cuando busques un publisher ya tendrás tu propia cuenta y podrás seguir ajustando tu proyecto hasta cierto punto.

En realidad el proceso no es tan complicado, pero hay bastante asimetría de información y, si te equivocas en un solo paso, te lo rechazan una y otra vez.

Hoy, basándome en mi propia experiencia real de registro, comparto todo: los preparativos, cómo rellenar los datos fiscales, los misterios de la revisión y las opciones para cobrar.

## Uno. Lista de preparativos: 100 dólares + DNI chino + cuenta de Steam

Antes de registrarte, necesitas tener listas estas tres cosas:

1. 100 dólares estadounidenses: Es la tarifa de registro de Steam Direct. Ojo, estos 100 dólares no son reembolsables de entrada, pero cuando los ingresos brutos de tu juego alcancen los 1.000 dólares, Valve te los devolverá (ojo: se calcula por aplicación individual; si el primer juego gana 500 dólares y el segundo gana 1.500 dólares, solo te devolverán los 100 dólares del segundo).
2. DNI chino (cédula de identidad): Sirve para la verificación de identidad real y para rellenar el formulario fiscal.
3. Cuenta normal de Steam: Basta con usar la misma cuenta con la que compras juegos habitualmente; no hace falta crearse una nueva.

## Dos. Proceso de registro y errores que evitar con la verificación de identidad

El acceso está en [https://partner.steamgames.com](https://partner.steamgames.com); inicia sesión con tu cuenta normal de Steam y haz clic en «Registrarse como desarrollador».

· Usa siempre pinyin para tu nombre real: Al escribir tu nombre, te recomiendo ponerlo directamente en pinyin (por ejemplo: San Zhang) y nunca en caracteres chinos. Porque más adelante, al vincular tarjetas y recibir pagos (ya sea con una cuenta bancaria estadounidense, WorldFirst u otro banco extranjero), los sistemas bancarios exigen el nombre en pinyin; mantenerlo coherente evita que te bloqueen la revisión.

· Cómo rellenar la dirección: Pon la dirección que figura en tu DNI, escrita en inglés o en pinyin. Te recomiendo traducirla con IA y no inventarte la traducción a la fuerza, para asegurar que la dirección sea exacta.

## Tres. Formulario fiscal: cómo bajar la retención de impuestos del 30 % al 10 %

Este es el paso clave para ahorrar dinero. Al rellenar la información fiscal (formulario W-8BEN), fíjate bien en esto:

1. Estatus fiscal: Elige sí o sí residente fiscal no estadounidense.
2. TIN extranjero (Número de Identificación Fiscal): Marca obligatoriamente que tienes un TIN extranjero. Para desarrolladores individuales de China, tu TIN es simplemente tu número de DNI de 18 dígitos; escríbelo tal cual, no hace falta solicitar nada adicional.
3. Tratado fiscal: Marca la casilla del convenio fiscal entre China y Estados Unidos.

Con estos pasos, la retención fiscal que te aplica Steam bajará directamente del 30 % por defecto al 10 %.

### Me rechazaron la información fiscal varias veces

Aunque arriba lo haya dejado todo tan clarito, en su momento lo pasé fatal. Mira este correo de «Tu información fiscal no es válida» que recibí y entenderás la desesperación:

![[Screenshot_20260911_090317_com.tencent.androidqqmail.jpg|width=460|align=center|caption=Steamworks 发来的“税务信息无效”通知]]

La revisión fiscal de Steam está subcontratada a una empresa externa (Lilaham / TaxIdentity) y a veces no te dicen exactamente qué está mal. Cuando me lo rechazaron, yo tampoco sabía dónde estaba el error, así que no me quedó otra que volver a enviarlo una y otra vez.

Por eso, si tú también recibes el correo de «Tu información fiscal no es válida», no entres en pánico: no significa necesariamente que hayas rellenado algo mal.

Mientras confirmes que los 4 puntos clave que mencioné arriba (residente fiscal no estadounidense, número de DNI en el TIN extranjero, convenio fiscal marcado y dirección coherente con el DNI) están bien, vuelve a enviarlo; lo más probable es que acabe pasando la revisión.

## Cuatro. Verificación de identidad

Muchos tutoriales en internet dicen que hace falta presentar una factura de suministros con tu dirección, pero en realidad no siempre es necesario.

Yo en ese momento no tenía ninguna factura con dirección a mano, así que fui directamente a la ventanilla del banco ICBC, retiré 100 yuanes y le pedí al cajero que me imprimiera un comprobante de retirada con el sello oficial de operaciones bancarias (mira la imagen de abajo):

![[IMG_20260504_124358_edit_5024691644024.jpg|width=460|align=center|caption=工商银行柜台打印并盖章的取款回单]]

En ese papel solo salían mi nombre, el número de tarjeta y el registro de la operación, sin ninguna dirección, pero al subirlo junto con mi DNI, aunque me lo rechazaron un par de veces, al final acabó pasando.

Pasos a seguir:

1. Ve a la ventanilla del banco y retira 100 yuanes.
2. Asegúrate de que en el comprobante aparezcan tu nombre, el número de tarjeta, el registro de la transacción y el sello oficial de operaciones bancarias (esto es lo fundamental).
3. La fecha debe ser reciente y es mejor que sea un recibo impreso y sellado en ventanilla.
4. Si te rechazan la revisión, no cambies de documentos a la ligera; espera unos días y vuelve a enviar los mismos.

## Cinco. Comparativa de métodos de cobro: de mejor a peor, más un apunte sobre cumplimiento normativo

Para los desarrolladores de China continental, cómo traer el dinero de vuelta es todo un tema. Según la experiencia real y los costes de cumplimiento, ordenados de mejor a peor quedan así:

| Método | Comisiones / Costes | Velocidad de abono | Requisitos de cumplimiento | Para quién es ideal |
| :--- | :--- | :--- | :--- | :--- |
| **Cuenta bancaria en EE. UU.** | Mínimos (ACH local) | Rápida | Debes gestionar impuestos y divisas por tu cuenta | Quienes tienen cuenta bancaria en EE. UU. |
| **Plataforma de terceros (WorldFirst)** | Tope del 0,7 % al retirar | Llegada en RMB en segundos | Hay que subir periódicamente el detalle de transacciones | La gran mayoría de desarrolladores individuales |
| **Visa/MC de banco extranjero (transferencia directa)** | Vía SWIFT, banco intermediario cobra 15-30 USD/op. | Lenta, propensa a devoluciones | El banco puede pedir justificantes en papel | Quienes tienen ingresos estables y no les importa hacerlo manual |
| **UnionPay con transferencias internacionales activadas** | Comisiones altas | La más lenta | Suele exigir justificantes en papel | No recomendado |

Hablemos con objetividad de las «molestias» y ventajas de WorldFirst (Wanlihui):

· Lo que tienes que hacer: Tras registrarte, tendrás que subir periódicamente (normalmente cada mes) en el panel de WorldFirst los registros de cobros o detalles de transacciones de Steam para obtener cupo de liquidación de divisas. Es cierto que esto añade un paso frente a «poner un número de tarjeta y olvidarte de todo».

· Lo que te resuelve: Si no usas una plataforma de terceros y recibes directamente una transferencia SWIFT en un banco chino, no solo te cobrará el banco intermediario entre 15 y 30 dólares por operación, sino que tu banco puede devolver el dinero directamente al no poder identificar el concepto de la transferencia de Valve, generándote comisiones por partida doble. Ese trámite de «subir el detalle» en WorldFirst sirve en esencia para hacer por ti la declaración normativa de divisas, permitiéndote cambiar los dólares a yuanes sin problemas y sin consumir tu cupo anual individual de 50.000 dólares.

· Entonces, ¿qué elegir?: Si tus ingresos mensuales son bajos (por ejemplo, apenas cien o doscientos dólares) o te da mucha pereza complicarte, cobrar por transferencia directa y asumir las comisiones y el riesgo de devolución también es una opción. Pero si tus ingresos van creciendo o quieres ahorrarte el desgaste de explicar al banco una y otra vez «de dónde sale este dinero», WorldFirst sigue siendo la opción con menor coste global y menos quebraderos de cabeza.

Si decides usar WorldFirst, puedes registrar tu cuenta de desarrollador a través de mi enlace de referido:
👉 [Enlace de registro de WorldFirst (Wanlihui)](https://s.worldfirst.com.cn/3M7iMD?default_source=WF-Vk00000xX1cr&referral_id=WF-Vk00000xX1cr)

## Seis. Resumen

Registrarse como desarrollador en Steam es, en el fondo, una prueba de paciencia y atención al detalle. La parte fiscal y financiera parece un rollo, pero en cuanto dominas las claves de «nombre en pinyin, DNI como TIN y rebaja fiscal al 10 %», junto con un comprobante bancario sellado para insistir hasta el final, lograrás cruzar este obstáculo.

¡Mucha suerte para que vuestros juegos vendan genial y podáis meter esos dólares en el bolsillo sin problemas!

# Próximo capítulo

¿Página de la tienda, ID de aplicación, requisitos de clasificación por edades, cuenta de desarrollador y comunidad? Cuando me toque montar todo eso, ya sacaré otra guía jaja.

## Seguir leyendo

Si haces juegos con Godot, puedes combinar esta lectura con GodotSteam en [[godot-useful-plugins|Lista de plugins habituales]], y los tropiezos durante el desarrollo los dejé en [[after-gmtk|Análisis post-mortem de la GMTK Jam]].

Sobre qué se siente al llevar un proyecto pequeño hasta su lanzamiento, también escribí algo en [[subarutap-and-selfthink|Reflexiones sobre el desarrollo y la creación de SubaruTap]].
