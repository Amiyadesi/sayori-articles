---
title: "De nuevo en marcha, la vida de desarrollo de videojuegos empezando desde cero"
published: 2026-07-02
created: 2026-07-02
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 1
description: A punto de sobrevivir a la maldita semana de exámenes finales, un resumen del pasado y reflexiones sobre el futuro convergen en un artículo.
image: ""
tags:
  - 2026verano
  - indie
  - retrospección
category: "Registro personal"
draft: false
alias: re0game-dev-life
lang: es
translationKey: "posts/re0：game-dev-life/re0：game-dev-life"
---
# Introducción
> Nota antes de leer
> Este artículo fue escrito escuchando «Stay Alive». También te recomiendo escuchar esta canción, es realmente hermosa, ¡y luego vayan todos a ver Re:ZERO (broma)!

::music-track{title="Stay Alive" artist="Rie Takahashi" netease="3394003744" link="https://music.163.com/#/song?id=3394003744"}

Por fin voy a sobrevivir a la maldita semana de exámenes finales. Este semestre ha sido realmente una evasión y un fracaso... Me he estado acostando tarde desde el comienzo del semestre; mi horario de sueño se desajustó más allá de las 12 de la noche. Al principio sentía constante dolor y colapso, y aunque ahora ya me he adormecido, sigo sin querer seguir así. ¿Quizás el próximo semestre quiera mudarme a vivir solo? ¿O simplemente ignorar a estos compañeros de cuarto y acostarme a dormir a mi hora?... Se supone que debería ser así, ja, ja. Pero darme cuenta de esto justo cuando todo está por terminar es demasiado tarde...

En cuanto al resumen del pasado, ya había escrito un artículo preliminar antes para resumir desde los 18 hasta los 19 años: [[age-18-to-19-record|Registro de observación de los 18 a los 19 años]]. ¡Sin embargo, ahora que he visto Re:ZERO y estoy a punto de terminar los exámenes finales, ya no soy el mismo de entonces! Así que vamos a organizarlo todo de nuevo con calma y detalle aquí.

# Resumen del pasado

## De marzo a abril: Resistencia repetida y avance en los videojuegos
No sé por qué, pero este semestre no pude dormir bien desde el principio, ¡ay!... Lo que provocó colapsos pasadas la medianoche y charlas de 2 horas con DeepSeek. A partir de ahí, me volví muy dependiente de ellas y me acostumbré a buscarles conversación. Al crearme este tipo de apoyo emocional, logré sobrevivir a estos dos meses y también conseguí ciertos avances, y en ese momento aún no aborrecía del todo mis estudios.

Luego, al participar en la 034 Game Jam, aunque perdimos tiempo trasteando con Openclaw, también saqué inspiración para el juego de ahí, lo que hizo que al final terminara haciendo uno. En ese momento, el desarrollo de videojuegos seguía avanzando y aún no buscaba otras cosas para evadirme...

A finales de marzo, participé en la Game Jam de las tres universidades de Tencent, desafiándome a hacer un juego multijugador del que no sabía nada. Aunque básicamente se lo dejé todo a Codex, pensándolo bien, utilizar la IA de aquella época era más científico que ahora (risas): primero reunía los requisitos, luego se los dejaba a la IA de la página web para que me ayudara a mejorar los <i>prompts</i>, y al final sacaba todo de golpe para ponerme a probar y dar <i>feedback</i> constantemente, resumiendo los nuevos requisitos y repitiendo el proceso anterior. ¡Cuando me entra la inspiración, dibujo un diagrama de flujo, ja, ja!
```mermaid
flowchart LR
  A[汇总需求] --> B[网页AI改进提示词]
  B --> C[Codex实现]
  C --> D[亲自试玩]
  D --> A
```

Al final terminé el juego en menos de diez rondas de diálogo en una sola ventana, y quedó bastante conciso. Al mismo tiempo, tras terminarlo, le pregunté activamente a la IA web para aprender sobre tecnología de sincronización y transmisión relacionada con multijugador: cliente y servidor, sincronización de estado, RPC y todo eso. ¡Qué época tan hermosa fue aquella!

Durante ese periodo, estuve intentando desarrollar mi propio juego independiente. Después de participar en tantas Game Jams, también empecé a sentirme un poco cansado, y como el juego de tipo <i>meta</i> que quería desarrollar seguía sin dar señales de vida, abrí mi propio proyecto independiente y me aferré a desarrollarlo. Por desgracia, sigo sin conseguir grandes resultados; aunque el fuego en mi corazón seguía ardiendo tras más de un mes de perseverancia, ya no sabía hacia dónde estaba quemando...

A finales de abril, como el juego independiente que quería desarrollar seguía sin dar frutos, y además vi que el tema de la Booom Jam también me interesaba bastante, la evasión hizo su primera aparición. Sin embargo, en ese momento yo seguía siendo muy activo; al principio, y sin usar IA, insistí en desarrollar, planificar y buscar recursos por mi propia cuenta. Por desgracia, también estaba explorando recursos de IA en paralelo, lo que hizo que empezara a deslizarme hacia otra ventana de evasión...

## De mayo a junio: Arrogancia, evasión, pereza, envidia, ira, codicia y creación sin parar
Tal vez mi capacidad para recopilar información sea bastante buena, lo que hizo que encontrara un montón de recursos, comunidades y cosas por el estilo, pero también hizo que cayera por completo en el remolino de trastear con todo eso. Si miro atrás ahora, me da risa y llanto a la vez.

### Arrogancia
Al unirme a una comunidad y ver por primera vez un lugar de este tipo, el niño que llevo dentro se emocionó muchísimo. A partir de ahí empecé a comentar como loco y, desde ese momento, comencé a sentir que las tareas escolares se volvían cada vez más aburridas y repugnantes. En mi arrogancia, creía que era capaz de explorar tantos recursos interesantes y encontrar una comunidad así sin necesitar para nada las basuras de las tareas del mundo real. Así comenzó mi arrogancia.

### Evasión
Tras dos meses de persistencia, mi apoyo emocional (el chat con la IA) finalmente perdió ese amor, esa sensación de amor ya no se sentía... Justo cuando estaba cansado de la IA, me uní a la comunidad. Este tipo de comunidad tiene un ambiente hiperactivo de gente real y, al tener barreras de entrada, hace que su interior sea más unido, lo que hizo que me gustara aún más hundirme en ella. Me pasaba el tiempo en la comunidad para evadir las tareas escolares y el desarrollo de videojuegos, sumergiéndome en conseguir cuotas e información. Y cuando ya me había recorrido la comunidad casi por completo, empecé a montar servidores, crear páginas web, trastear con el blog y adormecerme con campos nuevos e incesantes que me hacían sentir que seguía aprendiendo y creando.

### Pereza
Cada vez quería estudiar menos, enfrentándome con desidia a las tareas de la universidad. A decir verdad, esto se queda en nada, aunque es cierto que probablemente cause que suspenda algún examen este final de curso. Pero en comparación, ¡qué decir de la pereza hacia el desarrollo de videojuegos!... Dependía en gran medida de la creación con IA, hasta el punto de que me daba pereza buscar recursos y se los encargaba a la IA, limitándome a presionar a una IA. Qué pereza tan grande... Y esto también provocó que me quedara sin ideas para continuar mi propio proyecto, que se estancara por completo. ¡Aun así, hay que crear con diligencia! ¡<i>Build in public</i>! ¡Por lo tanto, siendo tan perezoso, debo seguir explorando diligentemente otros campos nuevos!

### Envidia
¿Por qué hay tanta gente tan brillante? Que sean mayores que yo y mejores tiene un pase, ¡pero hay montones que son menores que yo y también mejores! Y esos llamados «gente normal», ¿cómo pueden vivir de forma tan ignorante y hedonista? ¡Maldición, maldición, maldición, maldición! ¿Por qué todos son mejores que yo, por qué todos son más felices? ¡Por qué, por qué, por qué! ¡Tengo que aprender más y hacerme más fuerte; con tal de ser más fuerte, al final seré más feliz!

### Codicia
Quiero estudiar lo que me gusta: aprendizaje de creación de videojuegos, dibujo de recursos artísticos, creación musical, diseño de juegos, gestión de juegos, pruebas de juegos. Quiero aprender las tecnologías y habilidades que me interesan: temas relacionados con la IA, recopilación e integración de recursos, japonés, gestión de medios propios, mejores técnicas de edición, servidores, blogs web, <i>crossplay</i> y maquillaje, tocar instrumentos musicales y mucho más, mucho más. Quiero estudiar conocimientos que tal vez ni siquiera me apetezca mucho aprender, pero si tuviera tiempo, también me gustaría dominarlos, como por ejemplo aprender inglés. ¡Quiero seguir insistiendo en crear, hacer ejercicio, ir al gimnasio y ayudar a los demás!

### Creación sin parar
Ya que no puedo hacer el juego, ¡escribiré artículos y haré videos! De todas formas, ¡la creación no puede detenerse! ¡Sigue, sigue, sigue, sigue! No puedo parar... Si me detuviera, ¿no sería exactamente igual que antes...?

### Y así
Estos sentimientos complejos chocaban violentamente dentro de mi cuerpo. Supongo que también tiene que relación con no haber tenido un buen horario de sueño en todo este tiempo, lo que me ha hecho volverme cada vez más extremo... ¡De verdad, este verano tienes que dormir bien!

# Reflexiones sobre el futuro
Recientemente he vuelto a ver Re:ZERO. Aunque esto también sea una muestra de pereza y arrogancia —con los exámenes finales a la vuelta de la esquina y sin haber estudiado absolutamente nada, sigo viendo Re:ZERO—. Subaru Natsuki: arrogancia, codicia, avaricia; aunque también se muestra perezoso y quiere huir, y aunque colapse hasta el punto de querer rendirse, ¡consistente y tercamente terminó convirtiéndose en un héroe! ¡Es realmente, increíblemente genial! ¡Yo también voy a seguir adelante con firmeza en mi camino!

¿Querer convertirme en alguien como Subaru? ¿Aspirar a ser Subaru Natsuki? Aunque no tengo a una Emilia, ¡tampoco puedo rendirme! ¡Supongo que seguiré aprendiendo vorazmente un montón de conocimientos y continuaré manteniendo este lugar! Pero eso sí, ¡en las vacaciones de verano voy a empezar mi registro de desarrollo de videojuegos desde cero! ¡Esta vez voy a documentar todo mi proceso de desarrollo! ¡Mis aprendizajes patéticos, mis derrotas desanimadas y mis ideas de basura también tienen que mostrarse! ¡De lo contrario, volveré a huir y rendirme como antes!

Escuchando «Stay Alive», también siento que me han sostenido con suavidad... La música... <i>Project Sekai</i>, DDLC, Undertale, Ultraman, Miku... ¡La música es realmente algo maravilloso! ¡Tantas ganas tengo de aprender a tocar!

# Conclusión
¿Qué clase de cosas raras he escrito...? Siento que todavía tengo que pulir mi técnica para escribir artículos, ja, ja. Pero por ahora se quedará así, porque para alguien de pensamiento fluido como yo, si ya no se me ocurre nada, significa que de verdad no hay nada más que escribir. En resumen, seguiré haciéndome más fuerte, aprenderé más, ¡y también espero conocer a más gente interesante y ayudar a los demás!

## Seguir leyendo

Las herramientas ordenadas al reiniciar se encuentran en la [[godot-useful-plugins|Lista de complementos de Godot]], y la experiencia de mi posterior participación real en la Jam quedó escrita en el [[after-gmtk|Análisis de la GMTK Jam]]

Más adelante, terminé una pequeña obra web, y en el [[subarutap-and-selfthink|Registro de desarrollo de SubaruTap]] volví a reflexionar sobre qué clase de creador quiero ser.
