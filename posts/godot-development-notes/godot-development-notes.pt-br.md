---
title: Dicas e hábitos pessoais de uso do Godot
published: 2026-11-06
created: 2026-10-19
updated: 2026-11-06
lastEdited: 2026-11-06
updateCount: 0
description: De referências de nós, UIDs e temas a dicas de digitação, diretórios de projeto e compartilhamento de recursos, reunindo alguns hábitos que facilitam a modificação de projetos no Godot
image: ""
tags:
  - Godot
  - Desenvolvimento de Jogos
  - Tutorial Prático
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/godot-development-notes/godot-development-notes"
---
# Motivação

Eu já tinha organizado um post sobre [[godot-useful-plugins|plugins úteis para o Godot]], e desta vez gostaria de falar sobre algo mais básico: os meus hábitos de desenvolvimento dentro do Godot.

Como vi um post hoje no [GodotHub](https://godothub.com/zh) chamado [Compartilhamento de experiências de desenvolvimento no Godot](https://pd.qq.com/s/72backvjc), e muitas das coisas lá são exatamente o que uso agora, embora algumas sejam diferentes das minhas.

Afinal, como o administrador do site começou desenvolvendo jogos, seria meio embaraçoso se houvesse tão poucos artigos sobre desenvolvimento de jogos no meu próprio blog (risos).

Então, resolvi escrever sobre os meus próprios hábitos de uso do Godot aqui.
## % para acesso por nome exclusivo
![[Pasted image 20261019195911.png]]

Quando você está referenciando nós em um script do Godot, arrastar o nó segurando Ctrl ou Alt para gerar `@onready` ou `@export` é certamente prático, mas...

```gdscript
@onready var start_button: Button = $Panel/MarginContainer/VBoxContainer/StartButton
```

Mais tarde, para ajustar a interface de usuário (UI) e adicionar uma camada extra de container, todo esse caminho precisa ser alterado junto.

O recurso de [nome exclusivo de cena](https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html) do Godot cai como uma luva aqui. Basta clicar com o botão direito no nó na árvore de cena e ativar "Acessar por nome exclusivo". Um marcador `%` aparecerá ao lado do nó, e o script poderá ser simplificado para:

```gdscript
@onready var start_button: Button = %StartButton
```

Enquanto estiver dentro da mesma cena proprietária e o nome não for alterado, ajustar a hierarquia dos nós no meio não exigirá a modificação dessa referência. O marcador na árvore de cena também serve para te lembrar de que aquele nó possivelmente está sendo usado por um script.

A "unicidade" aqui é restrita ao escopo da cena, dependendo do `owner` dos nós. Por exemplo, se uma cena de arma foi instanciada dentro de uma cena de jogador, o script do jogador não poderá usar diretamente `%Blade` para encontrar a lâmina dentro da arma, então eu costumo manter essas referências restritas aos limites de suas respectivas cenas.

## Referências de recursos, pré-carregamento e constantes

Geralmente uso o pré-carregamento dentro da mesma cena, como em uma árvore de máquina de estados bem configurada.

Já as referências exportadas costumam ser para cruzar cenas.

Recursos constantes geralmente são coisas que não mudam com frequência e cuja referência não é prática, como classes de dados de um sistema de salvamento. Esse tipo de recurso requer um recurso abstrato global, e a implementação lógica inevitavelmente precisará dele, ou seja, nunca...

Por exemplo, ao escolher um cena de destino para um portal, você pode exportar uma propriedade, pois essa cena certamente será reutilizada em outros lugares enquanto transporta para destinos diferentes.

```gdscript
extends Area2D

@export var destination_scene: PackedScene
```

Em seguida, basta arrastar a cena correspondente para dentro do Inspector. Colocando a mesma cena de portal em diferentes fases, cada uma poderá escolher seu próprio destino, tornando as alterações bem intuitivas.

Quando for realmente necessário carregar recursos de forma fixa no script, você pode clicar com o botão direito no painel do sistema de arquivos do Godot para copiar o UID, preenchendo o `uid://...` gerado efetivamente nos parâmetros de string de `preload()`. Assim, se o recurso mudar de lugar, a referência não dependerá mais do caminho de arquivo original.

O UID lida com a identidade do recurso, enquanto `%StartButton` cuida das referências de nós na cena; são duas coisas diferentes.

## Tema (Theme)

![[Pasted image 20261019201052.png]]

Eu recomendo criar primeiro um arquivo de recurso `Theme`, colocar os estilos comuns de botões, rótulos (labels) e painéis ali dentro, e então atribuí-lo à `Control` raiz da interface. Os controles abaixo herdarão esse tema, e se depois você quiser trocar a fonte ou ajustar o estilo dos botões, haverá um ponto centralizado para modificações.

O mesmo tipo de botão também pode ter usos diferentes, como um botão comum, um botão de confirmação e um botão de exclusão. Nesses casos, você pode usar a [variante de tipo de tema](https://docs.godotengine.org/en/stable/tutorials/ui/gui_theme_type_variations.html):

1. Clique no botão de adição ao lado da lista de tipos no editor de temas para criar um tipo, por exemplo, `DangerButton`.
2. Mude para a aba correspondente ao ícone de ferramenta e defina seu tipo base como `Button`.
3. Modifique as cores e os estilos dessa variante e preencha `DangerButton` no campo `Theme Type Variation` do botão de destino.

Dessa forma, a fonte comum e o espaçamento continuam seguindo o `Button`, e o botão de exclusão só precisa manter separadamente a parte que difere dele. Se a variante não aparecer na lista suspensa, você também pode digitar o nome diretamente.

Se um controle específico realmente tiver necessidades especiais, a sobrescrita local é perfeitamente válida; a vantagem de colocar estilos repetitivos em um tema é que fica bem mais fácil de alterar depois.

## Dicas de tipos e comentários de documentação: escreva alguns enquanto programa

O GDScript não obriga o uso de tipagem, mas deixar explícito o que são as variáveis, o que as funções recebem e o que retornam torna tudo muito mais claro, além de permitir que o editor forneça autocompletes e mensagens de erro mais precisas.

```gdscript
extends Node

## 当前关卡获得的分数
var score: int = 0


## 增加分数，amount 为本次获得的分数
func add_score(amount: int) -> void:
	score += amount
```

Aqui foram usadas duas coisas ao mesmo tempo: `int` e `-> void` são dicas de tipos, e o `##` na frente do membro é um comentário de documentação.

Escrever de forma que os tipos possam ser deduzidos claramente, como em `var score := 0`, também é muito útil e evita esticar demais cada linha apenas para declarar tipos. Prefiro declarar explicitamente os parâmetros de funções, valores de retorno e referências de nós importantes.

Se o autocomplete de funções nunca exibir tipos, você pode procurar por `Add Type Hints` nas configurações do editor (a posição correspondente é `Text Editor → Completion → Add Type Hints`). O uso detalhado pode ser conferido na [documentação de tipagem estática](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/static_typing.html).

Quanto aos comentários, acho que o mais valioso de se escrever são os significados dos parâmetros, as unidades de medida e as condições de chamada. Por exemplo, se um parâmetro de tempo está em segundos ou milissegundos, você mesmo vai esquecer daqui a pouco. Esclarecer isso é muito mais útil do que traduzir cada linha de código para o português.

O conteúdo escrito com `##` também pode ser reconhecido pela ajuda integrada do Godot, e quando colocado em propriedades exportadas, é exibido como dicas no Inspector, o que é bem prático ao criar plugins ou componentes para outras pessoas. [A forma completa de escrever comentários de documentação está aqui](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html).

## Quebra de linhas em condições longas: dê preferência a parênteses

Várias condições espremidas na mesma linha estouram a tela rapidamente, especialmente quando você abre dois scripts lado a lado.

O GDScript permite usar a barra invertida (\) para continuar linhas, mas eu recomendo envolver as expressões com parênteses. Esta é a abordagem recomendada pelo [guia de estilo oficial](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_styleguide.html#format-multiline-statements-for-readability), e facilita muito a adição ou remoção de condições mais tarde.

```gdscript
func can_interact(in_range: bool, target_visible: bool, dialogue_open: bool) -> bool:
	return (
			in_range
			and target_visible
			and not dialogue_open
	)
```

As duas linhas verticais no editor são as linhas de referência suave e rígida para o comprimento da linha, servindo para lembrar se o código está ficando longo demais. Não significa que o programa vai parar de funcionar se passar delas, nem é preciso retalhar uma expressão simples só para encaixá-la dentro da margem de referência.

## Organizar arquivos por cena e funcionalidade: o que facilitar a busca é o que vale

Naquele tutorial, sugeria-se dividir os arquivos em pastas como `scripts`, `scenes` e `assets`. Embora seja intuitivo, quando o projeto cresce um pouco, procurar a cena, o script e a configuração do mesmo jogador alternando entre vários diretórios acaba se tornando cansativo.

Prefiro deixar as coisas que são modificadas juntas no mesmo lugar, por exemplo:

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

Os arquivos do próprio jogador vão para `player`, os da interface do inventário vão para `inventory`, e fontes, áudios e temas usados em vários lugares ficam centralizados. A [documentação de organização de projetos](https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html) do Godot também recomenda manter os recursos relacionados o mais próximo possível das cenas.

Continue usando os diretórios atuais se já estiver acostumado; o resultado mais útil de organizar diretórios é reduzir o tempo gasto nas próximas alterações.

## Subcenas dizem o que aconteceu; deixe que a camada superior resolva o resto

Por exemplo, quando um espaço do inventário é clicado, ele pode emitir um sinal `item_selected`, enviando o ID do item para fora, e deixar que a interface do inventário decida se vai exibir os detalhes ou equipar o item.

Se o próprio espaço ficar dando `get_parent()` até encontrar a cena principal e modificar diretamente o jogador e o painel de detalhes, reutilizar esse espaço em outro lugar vai gerar problemas em conjunto.

Acho que o segredo aqui é fazer com que as subcenas dependam menos da estrutura detalhada de fora. Conexões e coordenações entre cenas devem ficar, tanto quanto possível, na camada superior que conhece a relação entre ambas. Quando conectar diretamente um sinal claro já for suficiente, não há necessidade de embutir mais uma camada de sistema de eventos globais.

A [documentação oficial de organização de cenas](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html) traz vários exemplos desse tipo de relação.

## Compartilhamento de recursos e variáveis de instância: saiba diferenciá-los

Isso é especialmente comum em materiais, temas e `Resource` customizados. Por exemplo, se vários personagens referenciam o mesmo recurso de atributos, modificar a vida lá dentro em tempo de execução pode acabar alterando os demais personagens junto.

O [Godot reutiliza recursos já carregados](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html), e o fato de um recurso vir embutido na cena não significa que cada instanciação da cena ganhará automaticamente uma cópia independente.

Se quiser que um recurso seja independente para cada instância de cena, você pode configurar o modo `Local To Scene` no Inspector do recurso, ou duplicá-lo quando realmente precisar de dados independentes. Texturas comuns, fontes e configurações somente leitura continuam sendo compartilhadas.

Mas "compartilhar o mesmo recurso de script" e "compartilhar todas as variáveis dentro do script" não são a mesma coisa. Dois nós que usam o mesmo script ainda mantêm variáveis de membro normais pertencentes às suas respectivas instâncias de script — como o `score` mencionado acima, que registrará pontuações separadamente. O conceito de [variáveis `static`](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#static-variables) é que possui outra semântica de compartilhamento.

Portanto, se notar vários objetos mudando juntos, verifique primeiro se eles estão referenciando o mesmo recurso modificável; isso costuma ser bem mais rápido do que sair adicionando lógica de cópia por toda parte.

## Pequenas dicas soltas

### Impedir que a barra de espaço acione a UI automaticamente
![[Pasted image 20261019200301.png]]
O mais simples é encontrar `ui_accept` no mapeamento de entrada (Input Map) e remover `space` dali. Por que isso acontece? Porque os nós de UI do Godot podem ser acionados por `ui_accept` por padrão, e `space` é a tecla padrão para isso. É simples assim!

### Use region para recolher blocos, e comentários para explicar o motivo

Quando um script estiver um pouco longo, você pode usar `#region` e `#endregion` para dividir seções de códigos relacionados, e o editor poderá recolher esse trecho ([a sintaxe oficial está aqui](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#code-regions)).

```gdscript
#region Score

var score: int = 0


func add_score(amount: int) -> void:
	score += amount

#endregion
```

O `#` desses dois marcadores não tem espaço na frente, o que difere da escrita de comentários comuns. Escrever com `# region` resultará apenas em um comentário comum.

# Referências e continuação

Este post tomou como referência o [Compartilhamento de experiências de desenvolvimento no Godot](https://pd.qq.com/g/647545104021278691/post/B_92b3b86a5d1607001441152186786637080X60?showGuild=1&errCode=0&asideType=Full) do canal da Tencent e as complementações nos comentários, e a documentação oficial para os usos correspondentes foi colocada em cada seção.

Se quiser conferir alguns plugins úteis, você pode continuar lendo [[godot-useful-plugins|plugins úteis para o Godot]]
