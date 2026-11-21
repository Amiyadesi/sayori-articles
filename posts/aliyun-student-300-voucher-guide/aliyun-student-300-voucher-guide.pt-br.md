---
title: "O que dá para comprar com o voucher de estudante de 300 RMB da Alibaba Cloud: um guia para não jogar dinheiro fora"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 4
description: "Um resumo das formas mais práticas de usar o voucher estudantil de 300 RMB da Alibaba Cloud: ECS, Simple Application Server, Wuying Lingdou, APIs de LLM do Bailian e as pegadinhas para checar antes de fechar o pedido"
image: ""
tags:
  - Tutorial prático
  - Benefícios estudantis oficiais
  - Alibaba Cloud
  - VPS e self-hosting
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/aliyun-student-300-voucher-guide/aliyun-student-300-voucher-guide"
---

> [!NOTE]
> Este guia reúne métodos testados e aprovados em junho de 2026. As regras de uso dos vouchers da Alibaba Cloud mudam o tempo todo, e quem manda mesmo é a tela de checkout — então não encare este post como um guia definitivo. Se estiver lendo isso bem depois, confira primeiro no checkout se o desconto aplica antes de fechar o pedido.

Como todo mundo já sabe, o programa 云工开物 (Cloud Craft) da Alibaba Cloud distribui um cupom exclusivo de 300 RMB para universitários chineses com verificação estudantil aprovada.

As regras oficiais são bem claras: enquanto sua verificação de estudante estiver ativa, dá para resgatar um cupom a cada 12 meses, e contas vinculadas ao mesmo usuário não podem pegar de novo. Cada cupom vale por 1 ano; o saldo que sobrar vence e não acumula para o próximo. O uso vale apenas para produtos selecionados de nuvem pública no site chinês da Alibaba Cloud e, salvo aviso explícito, não acumula com descontos promocionais ou outros cupons. No fim das contas, o que vale é o que aparecer na tela de pagamento.

Além disso, a lista de produtos elegíveis muda dinamicamente: uma configuração que passava direto no ano passado pode não servir neste ano. Antes de resgatar o cupom, vale pensar bem no que você realmente pretende rodar nos próximos doze meses.

O link de acesso está aqui: [Link para resgate do benefício estudantil](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv)

## Como resgatar

O processo é bem rápido:

1. Tenha uma conta no site chinês da Alibaba Cloud com verificação de identidade (实名认证) concluída
2. Acesse a página universitária do programa 云工开物 da Alibaba Cloud
3. Conclua a verificação estudantil via CHSI (学信网) ou e-mail institucional (.edu.cn)
4. Resgate o cupom de 300 RMB sem valor mínimo na área de benefícios estudantis

Assim que a verificação for aprovada, o cupom aparece na sua lista de vouchers. Ele vale por um ano a partir do dia do resgate.

Se você ainda não tem conta na Alibaba Cloud, já aproveita para criar uma: mesmo que não vá subir servidor agora, dá para abater o custo das APIs de LLM do Alibaba Cloud Bailian com esse voucher.


# Dá para usar com o quê?

## Primeira opção: ECS anual na China continental

O uso mais clássico nos fóruns é subir uma instância ECS 2C2G na China continental por um ano inteiro. Como dá para pegar um voucher desses por ano, basicamente você consegue manter a máquina enquanto durar a faculdade.

Post de referência:

[https://linux.do/t/topic/2258128](https://linux.do/t/topic/2258128?u=amiya_desi)

A ideia geral é esta:

1. Entre na página de compra personalizada do ECS
2. Escolha uma instância da série `e` com configuração por volta de 2C2G
3. Selecione uma região na China continental, fugindo das regiões que já têm desconto promocional ativo (porque o cupom de estudante geralmente não acumula com promoções)
4. Escolha cobrança de tráfego sob demanda via CDT
5. Confirme no checkout se o cupom abate o valor

Página de compra personalizada do ECS:

[https://ecs-buy.aliyun.com/ecs/#/custom/](https://ecs-buy.aliyun.com/ecs/#/custom/)

Configuração-chave validada pelo pessoal nos fóruns:

```text
实例规格：ecs.e-c1m1.large（2C2G）
付费模式：包年包月，一年
流量计费方式：CDT 按量计费
```

Se acertar nas escolhas, o checkout deve ficar abaixo de 300 RMB e o voucher zera a conta na hora, sem você precisar tirar um centavo do bolso.

Se aí aparecer que o cupom não se aplica, tente trocar de região. Nos fóruns tem gente que conseguiu em Qingdao, outros no Sul da China — a regra varia conforme a época. O segredo é simples: olhe a tela de pagamento, não fique chutando.

Depois de ativar o CDT, você ganha cerca de 20 GB de tráfego gratuito por mês. Para hospedar blog, bot ou uma API pequena dá e sobra, mas não invente de usar para site de download pesado, hospedagem externa de imagens ou streaming de vídeo.

A primeira coisa a fazer depois da compra não é instalar painel, e sim configurar um alerta de gastos. Cobrança sob demanda no CDT significa que, passou da franquia grátis, começa a cobrar. Coloque um limite de alerta — nem que seja para avisar a partir de 1 RMB — para descobrir rápido caso tome algum ataque ou erre alguma configuração.

## Segunda opção: Simple Application Server (轻量应用服务器)

Se você não quer quebrar a cabeça com ECS, security groups, IP elástico e CDT, o Simple Application Server (轻量应用服务器) funciona bem mais como um "mini VPS já empacotado".

Role para baixo na página de benefícios estudantis ou pesquise direto por "轻量应用服务器" por lá:

[https://university.aliyun.com/buycenter/](https://university.aliyun.com/buycenter/)

Os caminhos que tenho visto funcionando:

**A. Pegar 6 meses de 2C2G por 0 RMB direto**

Já confirmaram nos fóruns que dá para pegar o plano 2C2G com banda de 200M por 6 meses saindo a 0 RMB. A vantagem é que o tráfego é ilimitado (como a banda é fixa, não há risco de estourar cota de CDT). A desvantagem é que dura só meio ano.

**B. Promoção relâmpago de 38 RMB no 云小站 + renovação com voucher**

Primeiro, pegue o Simple Application Server de 38 RMB por ano nas ofertas com horário marcado do 云小站:

[https://www.aliyun.com/minisite/goods](https://www.aliyun.com/minisite/goods)

Dizem que não é tão difícil conseguir. Depois de garantir a máquina, use o voucher de 300 RMB para renovar por mais 6 meses. Somando tudo, dá um ano e meio gastando só 38 RMB.

Só fique atento a dois detalhes nesse esquema:

- Preço promocional e cupom de estudante nem sempre acumulam. O que vale é o valor final na hora do pagamento
- Se o voucher não passar na renovação, seus 38 RMB vão render só 1 ano, e não 1 ano e meio

**C. Teste grátis de ECS convertido para plano pago**

Esse foi o caminho que eu mesmo segui. A Alibaba Cloud tem uma página de teste gratuito:

[https://free.aliyun.com](https://free.aliyun.com)

Dá para testar um ECS 2C2G por três meses de graça. Pouco antes ou logo depois de o período de teste acabar, você usa o voucher de 300 RMB para converter em plano anual — na prática, acaba rendendo algo em torno de um ano e três meses (ou até um pouco mais) de uso.

Pessoalmente, eu prefiro muito mais o Simple Application Server para quem está começando. Não porque seja mais avançado, mas porque tem menos opções para você se perder no caminho.

## Terceira opção: Simple Application Server fora da China continental

Fora da China continental a coisa já fica bem mais imprevisível.

O feedback nos fóruns é que ECS fora do continente praticamente nunca aceita o cupom, mas alguns planos do Simple Application Server, em certas regiões e configurações específicas, às vezes passam. Já teve gente comentando que pegou o plano geral 2C2G por 6 meses, ou 2C0.5G por 1 ano — que sai a 336 RMB no total, então usando o voucher você só completa 36 RMB. Também tem quem prefira ir renovando mês a mês.

Aqui eu nem recomendo cravar uma região específica.

Hong Kong, Singapura, Japão, Estados Unidos, Alemanha, Reino Unido, Sudeste Asiático — as regras do cupom para essas regiões podem funcionar hoje e parar amanhã. Se você realmente precisa de uma máquina fora do continente, jogue a configuração no carrinho e olhe a tela de pagamento.

Agora, se o seu objetivo for só hospedar um blog, o Cloudflare Pages já resolve sua vida.

## Quarta opção: Wuying Cloud Computer e Lingdou (无影灵豆)

Na página de benefícios estudantis da Alibaba Cloud agora também aparecem entradas para a linha Wuying (无影).

Esse caminho faz sentido para dois perfis:

- Quem quer experimentar um PC na nuvem para rodar algum programa ou jogo de vez em quando
- Quem precisa alugar GPU temporariamente sem ter que comprar placa de vídeo

Nos fóruns já organizaram algumas dicas de uso do Wuying Lingdou (无影灵豆) e da plataforma Wuying Linggou (无影灵构), como subir um ambiente GPU com RTX 5880 de 48 GB de VRAM usando Lingdou:

[https://linux.do/t/topic/2219866/60](https://linux.do/t/topic/2219866/60)

Encare esse tipo de post mais como pista do que como garantia. Antes de pagar, volte sempre ao checkout da Alibaba Cloud para conferir a quantidade de Lingdou, a região e o tempo de uso.

A parte boa desse esquema é que é bem legal de usar; a parte ruim é que funciona queimando créditos sob demanda. Se você quer deixar um serviço rodando 24/7, um servidor tradicional ganha fácil. Mas se você faz pesquisa, treina modelos ou precisa de VRAM pontualmente, vale muito dar uma olhada.

## Quinta opção: Bailian e APIs de LLM

Se você já tem servidor ou não tem o menor interesse em administrar máquina na nuvem, gastar esses 300 RMB testando APIs de LLM também é uma ótima saída.

Na página de benefícios estudantis há atalhos para serviços de modelos grandes, desenvolvimento de aplicações de IA e o Alibaba Cloud Bailian (百炼). No 云小站 também aparecem campanhas ligadas ao Bailian, Token Plan, HappyHorse e outros modelos:

[https://www.aliyun.com/minisite/goods](https://www.aliyun.com/minisite/goods)

Para garantir que o voucher abata o consumo, dê preferência aos modelos fornecidos diretamente pela Alibaba Cloud e cobrados sob demanda no console oficial. Repasses de terceiros, itens de marketplace e pacotes promocionais especiais costumam ficar de fora do cupom.

Dá para testar:

- Família Qwen (通义千问)
- APIs relacionadas ao DeepSeek
- Modelos oficiais disponíveis na plataforma, como GLM e Kimi
- Modelos de vídeo como o HappyHorse, desde que você confirme no checkout que o desconto entra

O segredo na hora de chamar a API é escolher um "modelo oficial direto" (官方直供模型). No console do Bailian alguns modelos vêm marcados como "terceiros" (三方) ou "marketplace" (市场), e esses nem sempre aceitam o voucher.

Quantas chamadas 300 RMB rendem? Depende do modelo escolhido e do tamanho do seu input. Em modelos baratinhos como o Qwen Turbo, 300 RMB dão para chamadas praticamente a perder de vista. Já nos modelos topo de linha o saldo vai embora bem mais rápido. Comece testando nos mais baratos até validar todo o fluxo.

Para quem só quer brincar com API, isso faz muito mais sentido do que pegar um servidor para deixar pegando poeira.

## Sexta opção: tirar a certificação ACA de Engenheiro de LLM na faixa

Tem também uma jogada bem esperta na Alibaba Cloud: usar o voucher de 300 RMB para pagar direto a certificação ACA de Engenheiro de LLM.

O exame custa 600 RMB no preço cheio, mas com o desconto de estudante cai exatamente para 300 RMB — aplicando o cupom, sai por 0 RMB.

Post de referência:

[https://linux.do/t/topic/2456810](https://linux.do/t/topic/2456810)

O passo a passo básico é:

1. Conclua a verificação estudantil e resgate o voucher de 300 RMB
2. Role a página de benefícios estudantis até encontrar a seção "大模型认证" (Certificação de LLM)
3. Clique em "立即购买" (Comprar agora) e aplique o cupom

Essa é uma certificação profissional oficial da Alibaba Cloud voltada para iniciantes. Não é nenhum certificado super avançado que vai mudar sua carreira sozinho, mas para quem é estudante, sair com um certificado no currículo gastando zero e ainda revisar os fundamentos de LLMs não tem nada a perder.

**Para quem faz sentido:**

- Quem quer dar uma encorpada na seção de certificações do currículo
- Quem quer estudar os conceitos básicos de LLMs de forma estruturada
- Quem já tem servidor ou não se interessa por infraestrutura

**Para quem não faz sentido:**

- Quem já trabalha com engenharia de LLMs e vai achar o conteúdo básico demais
- Quem prefere guardar o voucher para servidor ou APIs do Bailian

Se o seu cupom estiver perto de vencer e você não for usar nem servidor nem API por agora, trocar por essa certificação é um destino bem digno.

## O que eu escolheria

Se fosse minha primeira vez mexendo com nuvem, eu seguiria esta ordem:

1. Resgatar o voucher primeiro
2. Ver se há algum ECS ou Simple Application Server 2C2G elegível ao cupom
3. Se der para pegar um servidor por 0 RMB ou completando uma diferença pequena, ir direto no servidor
4. Assim que a máquina subir, configurar SSH, security group e alerta de gastos na hora
5. Depois, subir serviços leves como Vaultwarden, ntfy, Gatus, bots ou sincronização de notas

Se você já tem um VPS, não pegue outra máquina só para não deixar o cupom vencer e acabar deixando o servidor parado. Usar o saldo com as APIs do Bailian ou com Wuying Lingdou aproveita muito melhor o benefício.

## Checklist antes de fechar o pedido

Não saia clicando em pagar na pressa; confira estes pontos antes:

- Se o desconto do voucher de 300 RMB apareceu mesmo na tela de pagamento
- Se o pedido é plano mensal/anual ou cobrança sob demanda
- Se a renovação automática vem ativada após o vencimento
- Como são cobrados tráfego, largura de banda e IP público
- Se o security group padrão não está deixando portas abertas demais
- Se dá para configurar alertas de gastos e limite de consumo
- Se o voucher pode ser reutilizado na mesma categoria caso você peça reembolso

Atenção redobrada nesse último item. As regras oficiais deixam claro que, se um pedido pago com voucher for reembolsado, o cupom devolvido não pode ser usado novamente na mesma categoria de produto. Nada de ficar fazendo pedido de teste à toa.

## O que ler em seguida

Se no fim das contas você também pegou um servidor 2C2G, vale seguir com estes guias:

- [[sayori-server-01-vps-start|SSH e configuração básica do seu primeiro servidor]]
- [[docker-compose-minimum-start|Introdução ao Docker e Docker Compose]]
- [[2c2g-server-service-index|Lista de serviços para rodar em servidores pequenos]]
- [[selfhost-ntfy-on-2c2g|Enviando notificações para o celular com ntfy]]
- [[selfhost-vaultwarden-on-2c2g|Hospedando o Vaultwarden em um servidor estudantil 2C2G]]
- [[fast-note-sync-on-student-server|Brincando com Fast Note Sync no servidor estudantil]]

O melhor jeito de aproveitar esse voucher não é só "pegar o benefício e largar lá", mas transformar isso em um laboratório barato para praticar.

Servidor, domínio, Cloudflare, Docker, backup, monitoramento — no começo tudo isso parece um monte de peça solta. Na hora em que você sobe o primeiro serviço simples, aponta um domínio para ele e configura um backup, percebe que tudo se encaixa.

## Continue lendo

Na mesma linha, os [[azure-students-100-credit-guide|créditos estudantis do Azure]] também servem para subir um servidor no Japão; para outras ferramentas de desenvolvimento e benefícios de IA, dê uma olhada no [[edumails-glados-student-benefits|resumo geral de benefícios estudantis]]; e para configurar domínio e HTTPS nos seus serviços, siga para o guia do [[cloudflare-free-tier-developer-guide|plano gratuito da Cloudflare]].
