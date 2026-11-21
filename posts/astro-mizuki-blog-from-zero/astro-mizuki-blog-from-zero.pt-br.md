---
title: "Criando um blog minimalista do zero: GitHub, Cloudflare Pages e Obsidian opcional"
published: 2026-06-19
created: 2026-06-19
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 8
description: "Use o template completo Sayori Lite para colocar um blog minimalista no ar conectando o GitHub ao Cloudflare Pages. É só escrever Markdown em pastas para publicar — Obsidian e deploy via Token são totalmente opcionais."
image: ""
tags:
  - Tutorial prático
  - Criação de sites e Cloudflare
  - Astro
  - Obsidian
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: posts/astro-mizuki-blog-from-zero/astro-mizuki-blog-from-zero
---

# Criando um blog minimalista do zero: GitHub, Cloudflare Pages e Obsidian opcional

Finalmente chegou a hora de dar uma geral neste tutorial. A versão anterior girava em torno do Mizuki, do Obsidian e de um conjunto de scripts locais de sincronização. Depois disso, mudei meu blog para o visual minimalista de hoje, mas o tutorial ficou parado no tempo. Seguir aqueles passos antigos exigia instalar tema, mexer em diretórios e ainda lidar com plugins e configurações de deploy — nada amigável para um primeiro guia de criação de site.

Por isso, desta vez organizei tudo em um template completo e pronto para usar, chamado **Sayori Lite · Minha Escrivaninha**. Ele mantém o tom de papel quente, os links verde-oliva e os pequenos detalhes em coral do blog atual, listando os posts direto na página inicial e deixando um respiro confortável para leitura.

A ideia aqui é colocar o site no ar primeiro e só depois escolher com qual ferramenta você prefere escrever. Dá para publicar usando apenas a interface web do GitHub; o Obsidian é o fluxo de escrita que eu recomendo, mas não é obrigatório instalar nada.

> Este artigo foi reescrito com base no template e na documentação oficial de 16 de outubro de 2026. Os links do post antigo e do repositório do template continuam os mesmos, mas as capturas de tela antigas e os passos com plugins em PowerShell não se aplicam mais.

## Prepare duas contas primeiro

Você vai precisar de uma conta no [GitHub](https://github.com/signup) e outra no [Cloudflare](https://dash.cloudflare.com/sign-up). O GitHub guarda o código do site e os seus posts, enquanto o Cloudflare Pages cuida do build, da hospedagem e ainda entrega um endereço `pages.dev`. Para começar, você não precisa comprar um domínio — também dá para testar um subdomínio gratuito[[free-domain-and-web-community|Domínios gratuitos e comunidades de webmasters]].

O fluxo padrão é este:

```text
在 GitHub 创建自己的模板仓库
    ↓
Cloudflare Pages 连接这个仓库
    ↓
写 Markdown，提交到 main
    ↓
Cloudflare 自动构建并更新网站
```

**Esse caminho não usa Cloudflare API Token.** Você não precisa configurar nenhuma chave extra de publicação para postar; o Token mencionado mais adiante só entra em cena se você quiser mudar o deploy para o GitHub Actions.

## Crie seu próprio repositório a partir do template

O template continua neste endereço — não mudei o nome por enquanto, então o link antigo segue funcionando:

[Repositório do template Sayori Lite](https://github.com/Amiyadesi/astro-mizuki-blog-from-zero)

Ao abrir a página, clique em **Use this template → Create a new repository**, selecione sua conta em Owner e escolha um nome para o repositório, como `my-blog`.

Desta vez o repositório já traz o site Astro completo, com uma estrutura parecida com esta:

```text
my-blog/
  articles/
    posts/
      hello-mizuki/
        index.md
        desk.svg
    spec/
      about.md
      friends.md
    templates/
      blog-post.md
  public/
    avatar.svg
    favicon.svg
  src/
  site.config.mjs
  package.json
  pnpm-lock.yaml
  .github/workflows/deploy-cloudflare-pages.yml
```

`articles/` é a pasta onde você escreve, e `src/` contém o código do site — os posts entram direto no processo de build.

## Conecte o Cloudflare ao GitHub

No painel do Cloudflare, acesse **Workers & Pages**, crie uma aplicação, escolha **Pages** e selecione a opção para importar um repositório Git existente. Autorize o Cloudflare a acessar o repositório que você acabou de criar (pode liberar acesso apenas a ele).



Preencha as configurações de build assim:

| Configuração | O que preencher |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | Deixe em branco para usar a raiz do repositório |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Variável de ambiente `NODE_VERSION` | `22` |
| Variável de ambiente `PNPM_VERSION` | `11.0.8` |
| Variável de ambiente `SITE_URL` | `https://你的项目名.pages.dev` |

O nome do projeto define o seu endereço inicial `pages.dev`. Salve, faça o deploy e, quando o build terminar, abra a URL exibida pelo Cloudflare.

O Pages instala as dependências seguindo o lockfile. Se o ambiente não fornecer o pnpm corretamente, o README do template traz um comando de build alternativo que instala uma versão fixa do pnpm — olhe os logs antes de mexer nisso, sem precisar trocar toda a estratégia de deploy.

Em `SITE_URL`, coloque o endereço oficial do site, porque o RSS, o sitemap e as tags canonical usam esse valor. Quando você vincular seu próprio domínio no futuro, lembre-se de atualizar esse campo e refazer o deploy; não coloque o link do repositório do GitHub nem do painel administrativo.

## Deixe a escrivaninha com a sua cara

No GitHub, abra `site.config.mjs`, clique em editar e troque o nome do site, o autor e a bio pelos seus. Coloque o arquivo do seu avatar em `public/` e aponte o caminho correspondente na configuração.

```js
export default {
  title: "我的书桌",
  author: "你的名字",
  description: "记录日常，也写一点认真整理过的东西",
  url: "",
  lang: "zh-CN",
  avatar: "/avatar.svg",
  note: "慢慢写，慢慢读",
};
```

Se você já configurou `SITE_URL` no Cloudflare, pode deixar `url` em branco no arquivo de configuração — a variável de ambiente tem prioridade.

Para editar a página Sobre, mexa em `articles/spec/about.md`; para a página de links/amigos, edite `articles/spec/friends.md` — basta escrever os links em Markdown com uma breve descrição.

O template já vem com arquivo de posts, sumário nos artigos, zoom nas imagens, tema claro e escuro, busca com Pagefind, RSS e sitemap, usando fontes do sistema no texto.

## Publique seu primeiro post sem instalar nada no computador

No repositório do GitHub, clique em **Add file → Create new file** e digite o seguinte nome de arquivo:

```text
articles/posts/my-first-post/index.md
```

A barra cria a pasta automaticamente. Como conteúdo inicial, você pode colar isto:

```md
---
title: 我的第一篇文章
description: 今天终于有了自己的博客
published: 2026-10-16
updated: 2026-10-16
draft: false
category: 日常
tags: [生活]
---

这里是第一段正文。不用重复写一级标题，页面会自动显示上面的 title

## 想记下的一件事

这里继续写
```

Ajuste a data para o dia em que você estiver escrevendo. Depois clique em **Commit changes** e envie para `main`. Assim que detectar o commit, o Cloudflare inicia o build sozinho e, quando concluir, o post já aparece na página inicial.

A regra aqui é bem simples: cada post fica em uma pasta própria, nomeada com letras minúsculas em inglês, números e hifens, e o texto principal sempre se chama `index.md`. O campo `my-first-post` define a URL pública `/posts/my-first-post/`; mudar o título depois não altera o endereço, mas renomear a pasta altera.

`draft: true` marca o post como rascunho; a página só é gerada quando você muda para `false`. Posts com data de publicação no futuro também ficam de fora temporariamente — e, quando a data chegar, será preciso disparar um novo build, já que o template não inclui agendamento automático.

No meu fluxo pessoal com o Obsidian, `private: true` pula a sincronização pública e mantém o texto só localmente; neste template independente, apenas `draft` controla se a página vai ao ar.

## Recomendo usar o Obsidian

Se você já gosta de Markdown, pode usar qualquer editor que preferir — mas, como eu escrevo no Obsidian, o fluxo de trabalho adaptado para ele acaba sendo bem mais redondo. Se quiser usar o Obsidian, faça o seguinte:

0. Baixe o [Obsidian](https://obsidian.md/download)
1. Instale o Git e clone o seu novo repositório para o computador
2. No Obsidian, escolha "Abrir pasta como cofre" e selecione toda a pasta raiz `my-blog`, não apenas `articles/`
3. O template já deixa o plugin nativo Templates configurado, apontando para a pasta `articles/templates`
4. Dentro de `articles/posts/文章名/`, crie `index.md`, execute "Inserir template" e escolha `blog-post`
5. Depois de escrever, ajuste o título, a data e `draft`, faça o commit e envie (push) para o GitHub

Usar a raiz do repositório como cofre do Obsidian serve para que o plugin de Git encontre o repositório na mesma camada de diretórios. Os anexos vão por padrão para a mesma pasta do post atual; não tem problema o arquivo se chamar `index.md`, porque o título exibido vem de `title` nas propriedades.

Para fazer commits direto de dentro do Obsidian, instale o plugin da comunidade **Git**, criado por **Vinzent** (o ID do plugin é `obsidian-git`).

Sobre autenticação, recomendo reaproveitar as credenciais do Git do próprio sistema. No Windows, ative o Git Credential Manager ao instalar o Git for Windows, rode `git push` uma primeira vez na pasta do repositório e faça login no GitHub pelo navegador. Feito isso, o Obsidian Git no desktop passa a usar as credenciais já salvas no sistema.

## Quer ver como fica localmente?

Dá para começar editando direto pela web sem problemas. Quando quiser pré-visualização em tempo real, instale o Node.js 22.12 ou superior e rode na raiz do seu repositório:

```powershell
npm install --global pnpm@11.0.8
pnpm install --frozen-lockfile
pnpm dev
```

Abra o endereço mostrado no terminal — por padrão, `http://localhost:4321`. Sempre que você alterar o Markdown, a página atualiza sozinha.

O índice de busca é gerado durante o build; para testar a pesquisa, execute:

```powershell
pnpm run build
pnpm preview
```

Desta vez, abra o endereço exibido pelo comando de preview. No dia a dia escrevendo, não precisa rodar um build completo a cada parágrafo alterado.

## Opcional: publicar via GitHub Actions usando Token

Se você preferir que o site só seja enviado depois que todas as verificações do GitHub passarem, pode seguir este caminho. A integração padrão via Git já dá conta do recado, então não precisa configurar isso só para escrever posts.

Primeiro, tenha um projeto do Pages já criado. No projeto que estava conectado ao GitHub, desative os deploys automáticos das branches de produção e preview em Build and Branch control no Cloudflare, para evitar que o mesmo commit publique o site duas vezes.

Crie um API Token personalizado no Cloudflare, selecionando apenas a permissão **Account → Cloudflare Pages → Edit** na conta desejada.

Depois, vá em **Settings → Secrets and variables → Actions** no seu repositório do GitHub e preencha:

| Tipo | Nome | Conteúdo |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | O Pages Token que você acabou de criar |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | O ID da sua conta Cloudflare |
| Variable | `CLOUDFLARE_PROJECT_NAME` | Nome do projeto existente no Pages |
| Variable | `SITE_URL` | Endereço completo do site oficial |
| Variable | `CF_PAGES_DEPLOY` | `true` |

Por padrão, o `.github/workflows/deploy-cloudflare-pages.yml` do template roda apenas verificações. Ele só envia os arquivos compilados que passaram nos testes para o projeto indicado quando `CF_PAGES_DEPLOY` está definido.

Depois disso, você continua escrevendo Markdown dentro da pasta do post e fazendo commit em `main` normalmente — a única diferença é que o upload final fica por conta do Actions, com o Token guardado nos GitHub Secrets.

## Onde mexer quando quiser personalizar algo

| O que você quer mudar | Onde fica o arquivo |
| --- | --- |
| Nome do site, autor, bio e notas | `site.config.mjs` |
| Posts e imagens | `articles/posts/文章名/` |
| Página Sobre e página de links | `articles/spec/` |
| Template de novos posts | `articles/templates/blog-post.md` |
| Avatar e ícone do navegador | `public/` |
| Cores, tamanhos de fonte e espaçamentos | `src/styles/global.css` |
| Navegação e rodapé | `src/layouts/Base.astro` |

Por padrão, este template é pensado para um blog em chinês simplificado e não exige que cada artigo tenha versões em três idiomas. Ele é separado do sistema trilíngue do meu próprio blog, justamente para deixar o ato de escrever e publicar bem simples. Mais para frente, se sentir necessidade real, você vai adicionando comentários ou outros recursos aos poucos.

Continuo achando que o mais importante em um blog é o conteúdo dentro dele — por isso escolhi este template simples agora, para escrever mais e escrever melhor.

## Leia também

Com o site no ar, comece configurando um [[free-domain-and-web-community|domínio gratuito]]; se quiser entender melhor DNS, armazenamento de imagens e portas de entrada de serviços, siga para [[cloudflare-free-tier-developer-guide|plano gratuito do Cloudflare]]; e para sincronizar sua escrita entre celular e computador, dê uma olhada em [[fast-note-sync-on-student-server|Fast Note Sync]].

As escolhas por trás desse visual minimalista estão em [[blog-style-change|registro da reforma do blog]], e se quiser conferir indexação e metadados depois que o site entrar no ar, vale ler [[geoscore-2-4-guide|check-up de sites com GeoScore]].
