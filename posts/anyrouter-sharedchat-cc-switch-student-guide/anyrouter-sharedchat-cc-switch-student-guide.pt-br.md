---
title: "Como universitários podem gerenciar seu ambiente de desenvolvimento com cotas oficiais de IA, AnyRouter, SharedChat e cc-switch"
published: 2026-06-18
created: 2026-06-18
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 12
description: "Notas para estudantes universitários sobre cotas oficiais de IA, cadastro no AnyRouter, resgate de créditos no SharedChat e configuração do cc-switch, feitas para acompanhar o vídeo que publiquei no Bilibili"
image: ""
tags:
  - Tutorial prático
  - Fluxo de trabalho com IA
  - Claude Code
  - Benefícios oficiais para estudantes
category: "Tutoriais e guias"
draft: false
lang: pt-BR
translationKey: "posts/anyrouter-sharedchat-cc-switch-student-guide/anyrouter-sharedchat-cc-switch-student-guide"
alias: ""

---

Este post serve como uma versão em texto para complementar o vídeo, aproveitando também para adicionar como integrar as cotas oficiais de IA para estudantes.

O vídeo está aqui: [BV12JLX6PE53](https://www.bilibili.com/video/BV12JLX6PE53/)

## O que é cada uma dessas coisas

Antes de configurar o `cc-switch`, vale a pena separar bem os diferentes tipos de fontes de cota que dá para integrar:

- **Cotas oficiais regulares**: incluem o [Zed Education](https://zed.dev/education) (verificação estudantil garante um ano do plano Student, com US$ 10/mês de crédito para AI Agent e previsões de edição ilimitadas), o [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/) (dá para abater usando o cupom sem valor mínimo de 300 yuans para universitários ou resgatar tokens gratuitos para novos usuários), o [Google AI Studio](https://aistudio.google.com/) (camada gratuita oficial da API do Gemini) e o GitHub Copilot Student junto com o GitHub Models dentro do [GitHub Student Developer Pack](https://education.github.com/pack). São os mais estáveis e ideais para uso principal.
- **AnyRouter / AgentRouter**: serviços de roteamento que oferecem endpoints compatíveis com Claude Code / Anthropic. Eles fornecem uma URL de API e uma Key funcionais; é só colar nas ferramentas compatíveis com o Claude Code e sair usando.
- **SharedChat**: portal comunitário/gratuito focado em cotas de GPT / Codex. Dá para encarar como uma fonte extra de créditos do Codex.
- **cc-switch**: gerenciador de configurações desktop de código aberto, com repositório no GitHub em [farion1231/cc-switch](https://github.com/farion1231/cc-switch). Serve para centralizar e alternar facilmente as configurações de provedores em ferramentas como Claude Code, Codex, Gemini CLI e afins.

## Como pegar as cotas oficiais regulares

Se você quiser configurar primeiro os canais principais mais estáveis, vale resgatar logo estes quatro canais educacionais/gratuitos (para uma lista completa de recursos estudantis de todas as categorias, confira o [[edumails-glados-student-benefits|Guia oficial de benefícios para e-mails educacionais universitários]]):

1. **Zed Education (US$ 10/mês em créditos de IA)**: após ser aprovado no [Zed Education](https://zed.dev/education), você ganha um ano de assinatura Student, com US$ 10 mensais em tokens de Agent e previsões de edição ilimitadas (não inclui o Claude Opus). Exige que sua conta do GitHub tenha pelo menos 30 dias de criação e que o domínio do e-mail da sua universidade esteja na lista [JetBrains/swot](https://github.com/JetBrains/swot).
![[zed-student-success.png|width=420|align=center|caption=通过申请后看到的 Zed Student 提示]]
2. **API oficial do Alibaba Cloud Bailian**: resgate o cupom estudantil de 300 yuans pelo [link de resgate de benefícios estudantis do Alibaba Cloud](https://university.aliyun.com/course/promotion25-activity?clubTaskBiz=subTask..12655012..10273..&userCode=gv5jbukv), ou vá direto ao console do Bailian para gerar sua API Key, preenchendo `https://dashscope.aliyuncs.com/compatible-mode/v1` na Base URL.
3. **Camada gratuita oficial do Google AI Studio**: faça login com sua conta Google para gerar diretamente uma Gemini API Key. Mesmo sem vincular cartão, você pode chamar os modelos da família Gemini dentro da cota gratuita diária.
4. **Pacote de Estudante do GitHub**: após verificar seu e-mail educacional, ative diretamente o GitHub Copilot Student.

## Cadastrando-se no AnyRouter

Site oficial: [https://anyrouter.top/](https://anyrouter.top/)

Link de afiliado (AFF) do administrador — se cadastrar por aqui dá US$ 50 para cada lado: [https://anyrouter.top/register?aff=NvOL](https://anyrouter.top/register?aff=NvOL)

Siga as instruções na tela durante o cadastro. O código de verificação por e-mail pode não chegar na hora; espere alguns minutos antes de clicar em reenviar, senão você só vai passar raiva à toa.

> [!TIP]
> Se tiver problemas para se cadastrar com seu e-mail EDU, dê uma olhada direta aqui:
> [[#^answer1|👉 O que fazer se não conseguir cadastrar com e-mail EDU]]

## Vale a pena dar uma olhada no AgentRouter também

Outro portal que dá para conferir junto é o AgentRouter: [https://agentrouter.org/register?aff=a572](https://agentrouter.org/register?aff=a572)

Ele permite cadastro/login com contas do GitHub e do Linux Do, e na lista de modelos aparecem o `gpt-5.5` e a família Claude. Se você conseguir se cadastrar, dá para deixar como rota de backup.

Os requisitos de cadastro estão aqui:

![[Pasted image 20260717102951.png]]

![[agentrouter-model-list.png]]

## Gerando a API Key no AnyRouter

Entre na página de tokens de API (API Tokens) no painel e crie um novo token.

Pode colocar qualquer nome, mas recomendo algo que dê para entender depois, tipo:

```text
cc-switch-anyrouter
```

Os campos mais comuns para preencher são basicamente estes:

```text
API Key: 你生成的 Key
Base URL: AnyRouter 主页给的 API 地址
```

## Resgatando créditos de GPT no SharedChat

No caso do [SharedChat](https://sharedchat.cc/#/), basta seguir a entrada da promoção na própria página.

Por si só, ele já é um projeto comunitário gratuito que permite conversar na interface web do GPT sem precisar de cadastro. Recentemente, o administrador lançou também um projeto comunitário do Codex, com resgate diário.

O passo a passo básico é:

1. Cadastre-se / faça login com um e-mail QQ no [site comunitário do Codex](https://new.sharedchat.cc/list/#/register?i=E8v44), **e não no site pago**. Claro, se quiser pagar, fique à vontade.
2. ![[Pasted image 20260620234009.png]]
3. Clique em solicitar no canto inferior direito e escreva uma justificativa curta. Se o navegador recusar, tente trocar de navegador ou usar uma aba anônima.

## Instalando o cc-switch

Repositório oficial do cc-switch: [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

No Windows, geralmente basta baixar o `.msi` ou o portable zip. No macOS, confira as instruções de instalação no README. No Linux, escolha deb, rpm ou AppImage de acordo com a sua distro.

Depois de instalar e abrir, ele detecta automaticamente as ferramentas de CLI de IA instaladas na máquina, lendo skills e histórico. Você pode começar usando-o para gerenciar suas configurações atuais, e também para atualizar e instalar as ferramentas relacionadas.
![[Pasted image 20260620233340.png]]

## Adicionando provedores no cc-switch

Usando o AnyRouter ou o Alibaba Cloud Bailian como exemplo:

1. Abra o cc-switch
2. Vá para as configurações de provedor do Claude Code ou da ferramenta correspondente
3. Crie um novo provedor personalizado
4. Preencha o nome do provedor, por exemplo `Aliyun-Bailian` ou `AnyRouter`
5. Preencha a API Key
6. Preencha o endereço de requisição / Base URL
7. Selecione o formato da interface conforme indicado na página da respectiva plataforma
8. Salve
9. Clique em usar / alternar

Se for adicionar vários canais, crie um provedor separado para cada um, deixando o nome bem claro:

```text
Bailian Official
AnyRouter edu
SharedChat
```

Assim, na hora de trocar, você bate o olho no nome e já sabe qual cota está usando.

## Ativando o roteamento automático no cc-switch

A configuração mais simples de roteamento automático consiste em ativar o roteamento primeiro e depois definir a ordem de failover.

Ative o roteamento nas configurações:
![[Pasted image 20260620234413.png]]

Organize a ordem dos provedores no failover automático:
![[Pasted image 20260620234401.png]]

## Verificando se funcionou

Depois de alternar, reinicie o terminal ou abra uma janela nova do terminal.

Mande primeiro um teste simples:

```text
/init
```

Se responder normalmente, aí sim parta para tarefas de código.

Se der erro, vale conferir estes pontos:

1. Se a Key foi copiada por completo
2. Se não sobrou um espaço a mais ou faltou um trecho do caminho na Base URL
3. Se você realmente clicou em usar / alternar no cc-switch
4. Se o terminal foi reiniciado
5. Se a cota do respectivo site já não acabou
6. Se o nome do modelo é realmente suportado no momento pelo painel do serviço

## Perguntas frequentes

### O que fazer se não conseguir cadastrar com e-mail EDU
Muito provavelmente o seu e-mail caiu na lista negra do AnyRouter.

Mesmo assim, vale tentar trocar a primeira letra de uma das partes do domínio do e-mail da faculdade para maiúscula para ver se chega. Por exemplo, se o seu e-mail é `stu.xxxx.edu.cn`, tente mudar para `stu.Xxxx.edu.cn`. Às vezes o envio passa, mas não dá para garantir que você vá receber sempre de forma estável.

^answer1

### Não funciona depois de conectar no CPA ou Sub2

Isso acontece porque o AnyRouter é voltado principalmente para clientes como Codex, Claude Code e afins. Se quiser conectá-lo a ferramentas como CPA ou Sub2, pode ser necessário ajustar os cabeçalhos da requisição. Abaixo está apenas o exemplo que anotei quando fiz o troubleshooting na época:

| Cabeçalho     | Valor                                                         |
| ------------- | ------------------------------------------------------------ |
| Authorization | Bearer sk-sua-api                                            |
| User-Agent    | codex_cli_rs/0.114.0（ou outra versão existente） (Windows 10.0.26100; x86_64) |

### O Any está fora do ar ou muito lento
Aí não tem muito o que fazer. Como tem muita gente usando ao mesmo tempo, a estabilidade depende da carga do momento. Deixo abaixo o que aprendi na prática:
> [!NOTE]
> Aí é na base da sorte mesmo. No geral, o gpt5.5 costuma ser bem tranquilo de pegar, e normalmente depois que conecta fica bem estável. Além disso, de madrugada costuma ser bem mais fácil conseguir vaga.
>
> Nos horários de pico tem fila; você pode tentar abrir uma nova sessão, mandar um "hi", ativar o modo alvo e retomar se cair. Em menos de dez minutos costuma conectar; se não conectar de jeito nenhum, é bem provável que seja problema de configuração.

Para mais problemas e soluções, dê uma olhada neste guia:
[Resolvendo perrengues no roteador Any!](https://linux.do/t/topic/1779614?U=AMIYA_DESI)

## Continue lendo

Outros benefícios oficiais estão reunidos na [[edumails-glados-student-benefits|Tabela geral de benefícios estudantis]]. Se quiser colocar seus projetos prontos no ar, vale conferir também [[azure-students-100-credit-guide|Servidor no Japão com Azure]] e [[aliyun-student-300-voucher-guide|Cupom estudantil do Alibaba Cloud]]; para páginas estáticas, vá direto de [[astro-mizuki-blog-from-zero|Hospedagem com Cloudflare Pages]].

Depois que os modelos estiverem conectados, separei a parte de busca em [[build-your-search-gateway|Search Gateway]]; já as ferramentas no navegador para ajudar na leitura, tradução e gerenciamento de APIs estão na [[useful-browser-extensions-toolbox|Lista de extensões]].
