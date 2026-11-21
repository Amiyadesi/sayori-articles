---
title: "Cómo usar cuotas oficiales de IA, AnyRouter, SharedChat y cc-switch para gestionar entornos de desarrollo siendo estudiante"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 12
description: "Apuntes en texto para acompañar el vídeo sobre cuotas oficiales de IA para estudiantes, registro en AnyRouter, obtención de cuotas en SharedChat y configuración de cc-switch, pensado para verse junto al vídeo que ya subí a Bilibili"
image: ""
tags:
  - 实操教程
  - AI工作流
  - Claude Code
  - 官方学生权益
category: "Tutoriales y guías"
draft: false
alias: ""

lang: es
translationKey: "posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide"
---

Esto es una versión en texto para complementar el vídeo, añadiendo además la forma de integrar las cuotas de IA oficiales y legítimas para estudiantes.

El vídeo está aquí: [BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## Qué son exactamente estas cosas

Antes de configurar `cc-switch`, vamos a distinguir las diferentes fuentes de cuotas que podemos conectar:

- **Cuotas oficiales y legítimas**: Incluyen [Zed Education](https://zed.dev/education) (verificación de estudiante que regala un año del plan Student, con 10 dólares de cuota para AI Agent al mes y predicciones de edición ilimitadas), [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/) (se pueden canjear vales sin mínimo de 300 yuanes para estudiantes universitarios o reclamar tokens gratuitos para nuevos usuarios), [Google AI Studio](https://aistudio.google.com/) (la capa gratuita de la API oficial de Gemini) y [GitHub Student Developer Pack](https://education.github.com/pack) con GitHub Copilot Student y GitHub Models; son las más estables y van genial como canal principal.
- **AnyRouter / AgentRouter**: Servicios de enrutamiento que ofrecen interfaces compatibles con Claude Code y Anthropic, dándote una pasarela API funcional y una clave que puedes pegar en cualquier herramienta compatible con Claude Code.
- **SharedChat**: Una pasarela orientada a cuotas benéficas de GPT / Codex, que se puede entender como una fuente adicional de cuotas de Codex.
- **cc-switch**: Una herramienta de gestión de configuración de escritorio de código abierto cuyo repositorio en GitHub es [farion1231/cc-switch](https://github.com/farion1231/cc-switch), y sirve para centralizar el cambio de configuraciones de proveedores para herramientas como Claude Code, Codex, Gemini CLI, etc.

## Cómo conseguir cuotas oficiales y legítimas

Si quieres configurar primero el canal principal oficial más estable, puedes reclamar estos cuatro canales educativos/gratuitos (puedes consultar la tabla general de recursos para estudiantes de todas las categorías en [[edumails-glados-student-benefits|高校教育邮箱官方权益指南]]):

1. **Zed Education (10 dólares al mes en cuota de IA)**: Tras aprobar la solicitud en [Zed Education](https://zed.dev/education), te darán un año de estatus de Student, con 10 dólares mensuales en tokens para agentes y predicciones de edición ilimitadas (no incluye Claude Opus). Los requisitos de solicitud exigen tener una cuenta de GitHub con más de 30 días de antigüedad y que el dominio del correo de tu escuela esté en la lista [JetBrains/swot](https://github.com/JetBrains/swot).
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **API oficial de Alibaba Cloud Bailian**: Canjea el vale de estudiante de 300 yuanes a través del [enlace para reclamar beneficios de estudiante de Alibaba Cloud](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv), o ve directamente a la consola de Bailian para generar una clave API, poniendo en Base URL `https://dashscope.aliyuncs.com/compatible-mode/v1`.
3. **Capa gratuita oficial de Google AI Studio**: Inicia sesión con una cuenta de Google y genera directamente una clave para la API de Gemini; puedes invocar modelos de la familia Gemini dentro de los límites de la cuota diaria gratuita sin necesidad de asociar ninguna tarjeta.
4. **Paquete de estudiante de GitHub**: Activa GitHub Copilot Student directamente tras verificar tu correo educativo.

## Registrarse en AnyRouter

Sitio web oficial: [https://anyrouter.top/](https://anyrouter.top/)

Enlace de afiliado del administrador del sitio, usando este te llevas 50 dólares: [https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

Sigue las indicaciones de la página al registrarte. Puede que el código de verificación por correo no llegue al instante; espera unos minutos antes de volver a hacer clic en reenviar, o te acabarás desesperando tú solo.

> [!TIP]
> Si te encuentras con problemas al registrarte con un correo EDU, puedes consultar directamente:
> [[#^answer1|👉 EDU邮箱注册不了怎么办]]

## También se puede echar un vistazo a AgentRouter

Otra pasarela que se puede mirar al mismo tiempo es AgentRouter: [https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

Permite registrarse o iniciar sesión con cuentas de GitHub y Linux Do, y en la lista de modelos se puede ver `gpt-5.5` junto con la serie Claude. Si consigues registrarte, puedes usarla como ruta de respaldo.

Los requisitos de registro están aquí:

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## Generar la clave API de AnyRouter

Entra en la página de tokens de API del panel de control y crea un nuevo token.

Ponle el nombre que quieras, aunque se recomienda uno que se entienda, por ejemplo:

```text
cc-switch-anyrouter
```

La información habitual que hay que rellenar suele ser:

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## Reclamar cuota de GPT en SharedChat

Sigue los accesos de eventos en su página para [SharedChat](https://sharedchat.cc/#/).

Este sitio en sí es un proyecto benéfico que permite chatear gratis con la versión web de GPT sin registrarse. El administrador ha lanzado recientemente un proyecto benéfico de Codex del que se puede reclamar cuota todos los días.

El proceso es más o menos así:

1. Regístrate o inicia sesión en la [estación benéfica de Codex](https://new.sharedchat.cc/list/#/register?i=E8v44) usando un correo de QQ, **en lugar de la versión de pago**. Por supuesto, si quieres pagar, adelante.
2. ![[Pasted image 20260620234009.png]]
3. Haz clic en la solicitud situada en la esquina inferior derecha y escribe un pequeño motivo; si el navegador te indica que no pasa, cambia de navegador o usa el modo de incógnito.

## Instalar cc-switch

Repositorio oficial de cc-switch: [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

Para Windows, normalmente se descarga `.msi` o el archivo zip portable. En macOS puedes echar un vistazo a las formas de instalación del README. En Linux, por lo general se elige deb, rpm o AppImage según la distribución.

Una vez instalado y abierto, detectará las herramientas CLI de IA que ya tengas en el equipo, leyendo los "skills" y el historial. Puedes usar esto primero para gestionar tus configuraciones actuales, o bien para actualizar e instalar herramientas relacionadas.
![[Pasted image 20260620233340.png]]

## Añadir proveedores en cc-switch

Tomando AnyRouter o Alibaba Cloud Bailian como ejemplo:

1. Abre cc-switch.
2. Entra en la configuración de proveedores de Claude Code o la herramienta correspondiente.
3. Crea un nuevo proveedor personalizado.
4. Escribe el nombre del proveedor, por ejemplo `Aliyun-Bailian` o `AnyRouter`.
5. Introduce la clave API.
6. Introduce la dirección de petición / Base URL.
7. Selecciona el formato de la interfaz según las indicaciones de la página de la plataforma correspondiente.
8. Guarda.
9. Haz clic en usar / cambiar.

Si vas a añadir varios canales, crea proveedores separados escribiendo nombres claros:

```text
Bailian Official
AnyRouter edu
SharedChat
```

Así, al cambiar en el futuro, sabrás de un vistazo qué cuota estás gastando.

## Activar el enrutamiento automático en cc-switch

La configuración más sencilla de enrutamiento automático consiste en activar primero el enrutamiento y luego ordenar la secuencia de conmutación por error (failover).

Inicia el enrutamiento dentro de la configuración.
![[Pasted image 20260620234413.png]]

Organiza varios proveedores en la conmutación por error automática.
![[Pasted image 20260620234401.png]]

## Verificar si ha surtido efecto

Tras cambiar, reinicia la terminal o abre una nueva directamente.

Haz primero esta pregunta:

```text
/init
```

Si responde con normalidad, prueba con una tarea de código.

Si salta un error, puedes revisar lo siguiente:

1. Si la clave se copió entera.
2. Si sobra un espacio o falta un trozo de ruta en la Base URL.
3. Si realmente se hizo clic en usar / cambiar en cc-switch.
4. Si se reinició la terminal.
5. Si se ha agotado la cuota en el sitio correspondiente.
6. Si el nombre del modelo es compatible actualmente en el panel de control.

## Preguntas frecuentes

### Qué hacer si el correo EDU no se puede registrar
Lo más probable es que tu correo esté en la lista negra de AnyRouter.

Aun así, puedes probar a poner en mayúsculas una parte de las letras iniciales del dominio del correo de tu escuela a ver si llega. Por ejemplo, si tu correo es `stu.xxxx.edu.cn`, puedes probar a cambiarlo por `stu.Xxxx.edu.cn`. A veces se envía, aunque si llegará de forma estable o no ya es otra historia.

^answer1

### No funciona después de conectar CPA o Sub2

Dado que AnyRouter está enfocado principalmente a herramientas como Codex o Claude Code, si quieres conectarlo a sitios como CPA o Sub2, es posible que necesites procesar las cabeceras de las peticiones. Lo siguiente es solo un ejemplo que anoté cuando estuve depurándolo:

| Cabecera      | Valor                                                         |
| ------------- | ------------------------------------------------------------ |
| Authorization | Bearer sk-tu-api                                              |
| User-Agent    | codex_cli_rs/0.114.0 (o alguna otra versión existente) (Windows 10.0.26100; x86_64) |

### Any no funciona y va muy lento
Pues para esto no hay mucho que hacer. Al fin y al cabo, lo usa mucha gente a la vez y la estabilidad depende de la carga del momento. Dejo mi experiencia por aquí:
> [!NOTE]
> Esto es cuestión de suerte, la verdad. Por lo general, gpt5.5 suele funcionar bastante bien, y una vez que entra suele ser estable. Además, a altas horas de la madrugada es más fácil conseguir hueco, etc.
>
> Cuando hay mucha gente hay que hacer cola; puedes probar a abrir una nueva sesión, mandar un "hi", activar el modo objetivo, y si se corta reconectar. En diez minutos suele conectar, y si no conecta, lo más probable es que sea un problema de configuración.

Si tienes más dudas, puedes echar un vistazo a esto:
[¡Limpiando obstáculos al usar el enrutador Any!](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## Seguir leyendo

Tienes otros beneficios oficiales en [[edumails-glados-student-benefits|学生权益总表]]; si quieres subir a la nube los proyectos que hayas escrito, puedes seguir leyendo [[azure-students-100-credit-guide|Azure 日本服务器]] y [[aliyun-student-300-voucher-guide|阿里云学生券]], y para páginas web estáticas usa directamente [[astro-mizuki-blog-from-zero|Cloudflare Pages 建站]].

Una vez conectados los modelos, la parte de búsqueda la convertí por separado en [[build-your-search-gateway|Search Gateway]]; las herramientas en el navegador para lectura asistida, traducción y gestión de interfaces están en la [[useful-browser-extensions-toolbox|插件清单]].
