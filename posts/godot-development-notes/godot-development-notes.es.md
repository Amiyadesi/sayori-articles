---
title: Trucos y hábitos personales al usar Godot
published: 2026-11-06
created: 2026-10-19
updated: 2026-11-06
lastEdited: 2026-11-06
updateCount: 0
description: "Desde referencias de nodos, UID y temas hasta sugerencias de tipo, estructura de carpetas y recursos compartidos: una recopilación de pequeños hábitos para que los proyectos de Godot sean más fáciles de mantener"
image: ""
tags:
  - Godot
  - Desarrollo de videojuegos
  - Tutorial práctico
category: "Tutoriales y guías"
draft: false
lang: es
translationKey: "posts/godot-development-notes/godot-development-notes"
alias: ""
---
# El origen

Hace tiempo recopilé un artículo sobre [[godot-useful-plugins|plugins muy útiles para Godot]], pero esta vez quería hablar de algo más básico: los hábitos de desarrollo dentro de Godot.

Hoy vi un hilo en [GodotHub](https://godothub.com/zh) titulado [Experiencias compartidas de desarrollo en Godot](https://pd.qq.com/s/72backvjc); muchas de las cosas que mencionan ya las uso, aunque en otras tengo mis propias manías.

Al fin y al cabo, este humilde servidor empezó haciendo juegos; tener tan pocos artículos sobre desarrollo de videojuegos en mi propio blog ya empezaba a dar un poco de vergüenza (o eso dicen).

Así que aprovecho para apuntar por aquí mis propios hábitos de uso en Godot.
## % para acceder como nombre único
![[Pasted image 20261019195911.png]]

Cuando referencias un nodo dentro de un script de Godot, mantener pulsado Ctrl o Alt y arrastrarlo para generar `@onready` o `@export` es muy cómodo, sí, pero...

```gdscript
@onready var start_button: Button = $Panel/MarginContainer/VBoxContainer/StartButton
```

En cuanto tocas la interfaz más adelante y metes un contenedor intermedio, toca cambiar toda esa ruta.

Aquí es donde vienen de maravilla los [nombres únicos de escena](https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html) de Godot. Si haces clic derecho sobre un nodo en el árbol de escenas y activas «Acceder como nombre único», aparecerá un icono de `%` junto al nodo, y en el script podrás abreviarlo así:

```gdscript
@onready var start_button: Button = %StartButton
```

Mientras siga dentro de la misma escena propietaria y no le cambies el nombre, podrás reorganizar la jerarquía de nodos intermedia sin volver a tocar esa referencia. Además, la marca en el árbol de escenas sirve de recordatorio visual de que probablemente haya un script tirando de ese nodo.

Eso sí, lo de «único» es a nivel de escena y depende del `owner` del nodo. Por ejemplo, si instancias una escena de arma dentro de la escena del jugador, el script del jugador no puede usar `%Blade` directamente para pillar la hoja del arma, así que este tipo de referencias prefiero dejarlas dentro de su propia escena.

## Referencias a recursos, precarga y constantes

La precarga la suelo usar dentro de una misma escena, por ejemplo para un árbol de máquina de estados ya configurado.

En cambio, las referencias exportadas las uso casi siempre para conectar cosas entre distintas escenas.

Y los recursos constantes suelen ser cosas que apenas cambian y que resultan incómodas de referenciar a mano, como las clases de datos del sistema de guardado; son recursos abstractos que necesita un script global y que la lógica va a pedir sí o sí, así que tampoco van a variar.

Por ejemplo, para elegir la escena de destino de un portal, lo ideal es exportar una propiedad, ya que esa escena se va a reutilizar en otros niveles y llevará a sitios distintos:

```gdscript
extends Area2D

@export var destination_scene: PackedScene
```

Luego basta con arrastrar la escena correspondiente en el Inspector; así puedes colocar el mismo portal en varios niveles, asignarle un destino distinto a cada uno y cambiarlo de forma bastante visual.

Cuando de verdad hace falta cargar un recurso fijo por código, puedes hacer clic derecho en el panel Sistema de Archivos de Godot, copiar su UID y pegar el `uid://...` resultante en el parámetro de texto de `preload()`. Así, aunque muevas el archivo de carpeta, la referencia no dependerá de la ruta original.

El UID gestiona la identidad del recurso y `%StartButton` gestiona las referencias a nodos en la escena; resuelven dos problemas distintos.

## Theme

![[Pasted image 20261019201052.png]]

Prefiero crear primero un recurso `Theme`, meter ahí los estilos comunes de botones, etiquetas y paneles, y asignárselo al `Control` raíz de la interfaz. Todos los controles hijos heredarán ese tema y, si más adelante quieres cambiar la fuente o retocar los botones, lo tienes todo centralizado en un solo sitio.

Además, un mismo tipo de botón puede tener distintos usos —como botón normal, botón de confirmar o botón de eliminar—, y para eso están las [variaciones de tipo de tema](https://docs.godotengine.org/en/stable/tutorials/ui/gui_theme_type_variations.html):

1. Haz clic en el signo más junto a la lista de tipos en el editor de temas y crea un tipo nuevo, por ejemplo `DangerButton`
2. Ve a la pestaña con el icono de herramientas y establece su tipo base como `Button`
3. Cambia los colores y estilos de esta variación, y luego escribe `DangerButton` en la propiedad `Theme Type Variation` del botón que quieras

De esta forma, la tipografía y los márgenes generales siguen dependiendo de `Button`, y el botón de eliminar solo mantiene aparte lo que tiene de distinto. Si la variación no aparece en el desplegable, puedes escribir el nombre a mano sin problema.

Cuando un control concreto necesita algo muy específico, las sobrescrituras locales siguen ahí, claro, pero llevar los estilos repetidos al tema ahorra muchísimo trabajo cuando toca hacer cambios.

## Tipado estático y comentarios de documentación: ponlos sobre la marcha

GDScript no te obliga a declarar tipos, pero dejar claro qué es cada variable, qué recibe una función y qué devuelve hace que el código se lea mucho mejor, además de darle al editor pistas para ofrecer autocompletado y avisos de error más precisos.

```gdscript
extends Node

## 当前关卡获得的分数
var score: int = 0


## 增加分数，amount 为本次获得的分数
func add_score(amount: int) -> void:
	score += amount
```

Aquí se usan dos cosas a la vez: `int` y `-> void` son anotaciones de tipo, y el `##` delante del miembro es un comentario de documentación.

Formas como `var score := 0`, donde el tipo se infiere sin ambigüedad, también son muy prácticas para no alargar cada línea innecesariamente; yo suelo reservar el tipado explícito para parámetros de funciones, valores de retorno y referencias a nodos importantes.

Si al autocompletar funciones notas que nunca te sugiere los tipos, busca `Add Type Hints` en la configuración del editor; está en `Text Editor → Completion → Add Type Hints`, y puedes ver los detalles en la [documentación sobre tipado estático](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/static_typing.html).

En cuanto a los comentarios, lo que más merece la pena apuntar es qué significa cada parámetro, sus unidades y en qué condiciones se llama —por ejemplo, si un tiempo va en segundos o en milisegundos, porque al cabo de un tiempo hasta a ti se te olvida—. Aclarar eso sirve mucho más que traducir cada línea de código al español.

Lo que escribas con `##` también lo reconoce la ayuda integrada de Godot y, si lo pones encima de propiedades exportadas, aparece como tooltip en el Inspector, lo cual viene genial al hacer plugins o componentes para otros. Aquí tienes [la guía completa sobre comentarios de documentación](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html).

## Para partir condiciones largas, mejor usa paréntesis

Si metes varias condiciones en una sola línea, enseguida se te salen de la pantalla, sobre todo cuando tienes dos scripts abiertos en paralelo.

En GDScript se puede usar la barra invertida para continuar en la siguiente línea, pero prefiero rodear la expresión con paréntesis; es lo que recomienda la [guía de estilo oficial](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_styleguide.html#format-multiline-statements-for-readability) y resulta mucho más cómodo cuando toca añadir o quitar condiciones más adelante.

```gdscript
func can_interact(in_range: bool, target_visible: bool, dialogue_open: bool) -> bool:
	return (
			in_range
			and target_visible
			and not dialogue_open
	)
```

Esas dos líneas verticales del editor son las guías de longitud suave y estricta; solo están para avisarte de si una línea se está alargando demasiado, no es que el código deje de funcionar si las pasas, así que tampoco hace falta descuartizar una expresión sencilla solo por no cruzarlas.

## Organiza los archivos por escena y funcionalidad para encontrarlos rápido

En aquel tutorial proponían dividir los archivos en `scripts`, `scenes` y `assets`. A primera vista parece muy ordenado, pero en cuanto el proyecto crece un poco, la escena, el script y la configuración del jugador acaban repartidos en varias carpetas y andar saltando de una a otra se vuelve un engorro.

Yo prefiero tener juntas las cosas que se modifican juntas, por ejemplo:

```text
res://
├── characters/
│   └── player/
│       ├── player.tscn
│       ├── player.gd
│       └── player_stats.tres
├── ui/
│   └── inventory/
│       ├── inventory.tscn
│       ├── inventory.gd
│       └── inventory_slot.tscn
├── shared/
│   ├── themes/
│   └── shaders/
└── assets/
    ├── fonts/
    └── audio/
```

Lo propio del jugador va a `player`, lo de la interfaz del inventario a `inventory`, y las fuentes, audios o temas compartidos por varios sitios se guardan en carpetas comunes. La propia [documentación de organización de proyectos](https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html) de Godot recomienda mantener los recursos relacionados cerca de su escena.

Si la estructura que ya usas te resulta cómoda, quédatela; el verdadero objetivo de ordenar carpetas es tardar menos la próxima vez que toque cambiar algo.

## Las subescenas avisan de lo que pasa; de lo de fuera se encarga el padre

Por ejemplo, cuando se hace clic en una casilla del inventario, puede emitir una señal `item_selected` pasando el ID del objeto, y que sea la interfaz del inventario la que decida si mostrar los detalles o equiparlo.

Si la propia casilla se pone a buscar la escena principal a base de `get_parent()` para modificar directamente al jugador y al panel de detalles, en cuanto intentes reutilizar esa casilla en otro sitio se va a romper todo.

La clave aquí es que las subescenas dependan lo menos posible de la estructura externa: las conexiones y la coordinación entre escenas conviene dejarlas en el nodo padre que conoce a ambas partes. Y cuando basta con conectar una señal directa, tampoco hace falta montar un sistema global de eventos.

En la [documentación oficial sobre organización de escenas](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html) hay bastantes ejemplos de este tipo de relaciones.

## Distingue bien entre recursos compartidos y variables de instancia

Esto pasa muchísimo con materiales, temas y recursos `Resource` personalizados: por ejemplo, si varios personajes apuntan al mismo recurso de estadísticas y modificas la vida en tiempo de ejecución, les cambiarás la vida a todos a la vez.

[Godot reutiliza los recursos que ya están cargados](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html), y que un recurso esté incrustado dentro de una escena no significa que cada instancia vaya a recibir una copia independiente automáticamente.

Si quieres que un recurso sea independiente en cada instancia de la escena, puedes activar `Local To Scene` en el Inspector del recurso o duplicarlo cuando realmente necesites datos separados, dejando compartidas las texturas, fuentes y configuraciones de solo lectura.

Eso sí, «compartir el mismo recurso de script» no es lo mismo que «compartir todas las variables del script»: si dos nodos usan el mismo script, las variables miembro normales siguen perteneciendo a cada instancia por separado —como el `score` de arriba, donde cada uno lleva su propia puntuación—; las [variables `static`](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#static-variables) son otra historia.

Así que cuando veas que varios objetos cambian al unísono, revisa primero si están compartiendo un mismo recurso mutable antes de ponerte a llenar el código de duplicados.



## Pequeños consejos sueltos

### Evitar que la barra espaciadora pulse botones de la UI por accidente
![[Pasted image 20261019200301.png]]
Lo más fácil es ir al Mapa de Entrada, buscar `ui_accept` y quitar `space`. El motivo es que los nodos de interfaz de Godot responden por defecto a `ui_accept`, y `space` viene asignada ahí de serie; así de simple.

### Usa region para plegar código y comentarios para explicar el porqué

Cuando un script empieza a hacerse largo, puedes agrupar bloques relacionados con `#region` y `#endregion` para que el editor te deje plegar toda esa sección; aquí tienes la [sintaxis oficial](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#code-regions).

```gdscript
#region Score

var score: int = 0


func add_score(amount: int) -> void:
	score += amount

#endregion
```

En estas dos directivas no va espacio después de `#`, a diferencia de un comentario normal; si escribes `# region`, se queda en un simple comentario.
# Referencias y lecturas relacionadas

Este artículo toma como referencia el hilo [Experiencias compartidas de desarrollo en Godot](https://pd.qq.com/g/647545104021278691/post/B_92b3b86a5d1607001441152186786637080X60?showGuild=1&errCode=0&asideType=Full) de Tencent Channel y los aportes de sus comentarios; la documentación oficial correspondiente queda enlazada en cada apartado.

Si te apetece echar un ojo a unos cuantos plugins útiles, puedes seguir con [[godot-useful-plugins|plugins muy útiles para Godot]].
