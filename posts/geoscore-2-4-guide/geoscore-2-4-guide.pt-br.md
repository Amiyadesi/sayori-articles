---
title: "GeoScore 2.4.5: uma ferramenta usada por um webmaster para ver o que realmente falta no próprio site"
published: 2026-07-16
created: 2026-07-16
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Descubra o que realmente falta em um site usando o perfil do site, evidências de rastreamento real e relatórios de correção
image: ""
tags:
  - 实操教程
  - 建站与Cloudflare
  - GEO
  - 开源
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/geoscore-2-4-guide/geoscore-2-4-guide"
---

# GeoScore 2.4.5: uma ferramenta usada por um webmaster para ver o que realmente falta no próprio site

## Primeiro, o motivo de ter criado isso

A versão antiga do GeoScore era um projeto já desenvolvido por outra pessoa, [https://geoscoreapp.pages.dev/](https://geoscoreapp.pages.dev/), onde você também pode testá-lo. Eu tentei usar aquilo para otimizar continuamente o SEO do meu site, e até adicionei listas da wiki em [Amiya's Desk](https://www.wikidata.org/wiki/Q140378510) e [Amiya_desi](https://www.wikidata.org/wiki/Q140378992) para melhorar GEO, SEO e coisas do tipo.

No entanto, esse projeto acabou mostrando suas limitações com o tempo. Meu blog pessoal recebia recomendações frequentes para adicionar FAQ, tabela de preços ou Service schema, mas meu site não tem planos de preços nem aceita projetos.

Ainda bem que não me falta cota de IA. Como eu tinha essa necessidade, decidi tentar fazer um fork e continuar desenvolvendo. Dessa vez, eu precisava organizar bem a categorização: como um site de blog pessoal, achei que esse tipo de FAQ, tabela de preços e Service schema realmente não faz o menor sentido.

O GeoScore é um desenvolvimento derivado baseado no autor original, [https://github.com/sprawf/geoscore](https://github.com/sprawf/geoscore), e o GeoScore original usa a licença MIT, então decidi manter isso.

É uma ferramenta de auditoria de SEO e GEO de código aberto sob a licença MIT, e o ponto de entrada e o código-fonte estão aqui:

<https://geo.sayori.org>

<https://github.com/Amiyadesi/geoscore>

A documentação de uso completa em chinês e inglês está aqui:

<https://geo.sayori.org/docs>

O trabalho dele consiste em separar problemas já descobertos, problemas que ainda não sabemos e problemas que simplesmente não se aplicam, deixando caminhos de modificação verificáveis para o webmaster e gerando conclusões de alteração em documentos em Markdown para alimentar a IA e realizar melhorias direcionadas.

## O núcleo da versão 2.4.5 ainda é separar conclusões e suposições

Cada verificação de fatos possui apenas cinco estados:

| Estado | Significado |
| --- | --- |
| `pass` | Confirmado como aprovado a partir da página ou resposta |
| `fail` | Há evidências claras de que precisa ser tratado |
| `not_applicable` | Esta regra não se aplica ao site ou à página atual |
| `unknown` | Não há evidências suficientes para julgar no momento |
| `error` | Houve um problema no rastreamento ou no serviço externo |

Apenas `pass` e `fail` que forem confirmados como aplicáveis e possuírem conclusões entrarão na pontuação de fatos.

`unknown` e `error` não serão trocados furtivamente por itens com falha, mas eles reduzem a cobertura (coverage) e a confiança (confidence).

Quando há poucas evidências, o GeoScore prefere mostrar que há evidências insuficientes, o que na verdade já deixa claro que faltam muitas coisas nesse aspecto.

A versão 2.4 adicionou um mecanismo de limite máximo (cap) para falhas graves.

Uma falha crítica (critical) reduz a pontuação máxima da categoria correspondente para 49, e cada falha crítica extra reduz mais 10 pontos, até o limite mínimo de 19.

Uma falha principal (major) reduz o teto para 79, e cada falha principal adicional reduz mais 10 pontos, até o mínimo de 49.

O impacto de falhas menores (minor) é mais leve, mas elas também não podem ser completamente ignoradas.

Essa regra serve para evitar que um site problemático, que foi `noindex`, que não pode ser rastreado ou cujo texto principal não pode ser extraído, acabe obtendo um relatório com uma aparência aparentemente segura e alta pontuação só porque o alt das imagens e o Open Graph ficaram bons.

Por isso, minha ordem para olhar os resultados agora é bem rígida: primeiro olho as falhas graves e as evidências, depois a cobertura e a confiança, e só por último a pontuação total.

## Como 73 sites reais participaram da calibração

Eu não queria usar apenas o meu próprio blog para provar que a categorização é precisa, então agora mantenho uma matriz de calibração com 73 tipos de sites.

Ela inclui notícias e mídia, blogs pessoais, portfólios, sites de documentação, projetos de código aberto, e-commerce, comunidades, SaaS, serviços profissionais, negócios locais, organizações sem fins lucrativos, governo e sites universitários.

Para cada site, define-se primeiro o intervalo de tipos aceitáveis e, em seguida, o código atual realiza o rastreamento e o julgamento de forma independente.

As duas últimas execuções obtiveram, respectivamente, 48 correspondências, 0 necessidade de revisão humana e 25 indisponíveis; e 47 correspondências, 0 necessidade de revisão humana e 26 indisponíveis.

A diferença entre os dois resultados foi de apenas um site, e a mudança veio da disponibilidade real da rede, e não do acréscimo de um novo caso de conflito de classificação.

Todas as amostras que foram rastreadas com sucesso e tiveram o julgamento concluído ficaram dentro do intervalo de tipos previamente permitido.

A indisponibilidade geralmente vem de WAF, restrições regionais, erros de rede ou páginas de verificação; isso não significa que a classificação passou, nem que falhou.

Esses 25 sites serão mantidos na matriz porque o que uma ferramenta de ferramenta de auditoria realmente precisa enfrentar são essas páginas nem um pouco cooperativas.

A pontuação em si é calibrada separadamente usando fixtures HTML douradas.

Blogs pessoais, SaaS, e-commerce, negócios locais, mídia e sites desconhecidos possuem evidências fixas e intervalos de pontuação, e o limite máximo para falhas graves também possui testes de regressão independentes.

A matriz de sites reais é responsável por descobrir desvios de classificação, enquanto os fixtures dourados servem para tornar as variações de pontuação reproduzíveis; essas duas coisas não podem ser misturadas em uma única taxa de sucesso bonitinha.

## Modo de site e modo de URL único

O GeoScore tem dois modos de uso.

Digitar um domínio entra no modo de site, que seleciona no máximo cinco páginas HTML representativas.

A página inicial é lida primeiro; se uma página Sobre (About) for encontrada, ela é incluída junto, e as demais amostras são selecionadas a partir do sitemap ou de links internos da página inicial com base no tipo de caminho.

Cinco páginas não formam um crawler de site inteiro; o objetivo é apenas manter uma auditoria controlada dentro de um escopo que possa ser explicado e reexecutado.

Portanto, vale a pena olhar a lista de amostras no relatório, pois ela indica exatamente de quais páginas vieram as conclusões desta vez.

Se eu quiser verificar apenas um artigo novo, uma landing page que acabou de ser modificada ou alguma página de tópico específica, posso colar a URL completa.

Isso entra no modo de URL único, com foco na página de destino.

Quando a página de destino não for a página inicial, a ferramenta ainda lerá a página inicial se necessário para estabelecer contexto, evitando julgar o site inteiro como um SaaS apenas com base em um artigo sobre IA.

Geralmente, eu primeiro executo o domínio para confirmar as configurações públicas globais e o perfil do site, e depois rodo o modo de URL único para a página que realmente preciso alterar.

## Primeiro confirme em que o sistema achou que você se transformou

Assim que a auditoria terminar, não fique olhando imediatamente para a pontuação total.

Primeiro, veja o perfil do site (site profile):
![[Pasted image 20260720112010.png|width=360|align=center]]

Isso mostrará o tipo de site, entidade, idioma, domínio raiz, páginas amostradas, confiança da identificação e evidências da classificação.

O perfil baseia-se prioritariamente em JSON-LD, canonical, título, navegação e estrutura da página; palavras-chave do corpo do texto só podem ser usadas como sinais fracos.

Isso serve para evitar que um blog pessoal seja julgado como um SaaS, um site de documentação seja julgado como um e-commerce ou que um site de artigos receba à força schemas comerciais.

Se o tipo estiver realmente incorreto, você pode fornecer uma dica de tipo apenas para esta auditoria, clicando em corrigir tipo de site e selecionando o tipo correto.

Isso não equivale a criar uma regra permanente para todo o sistema, nem afeta outros sites.

## Quando a página não pode ser obtida, por que não se deve continuar calculando à força

Sites reais frequentemente não retornam o corpo do texto de forma direta.

Alguns sites retornam desafios do Cloudflare (Cloudflare challenge), outros retornam páginas de login ou de consentimento, e o SiteGround também pode usar HTTP 202 para retornar uma página de verificação `/.well-known/sgcaptcha/`.

Essas páginas também parecem HTML, mas usá-las para fazer uma auditoria de SEO só resultará em um relatório falso sobre a página de verificação.

A versão 2.4.5 identifica essas páginas intermediárias primeiro, deixando de tratar HTTP 202 ou páginas de verificação vazias como rastreamento bem-sucedido.

Quando a confirmação HTTP normal encontra um desafio, um erro de rede repetível ou uma casca vazia em JavaScript, a página inicial pode usar uma vez o recurso de fallback do Cloudflare Browser Run.

Essa tentativa possui um orçamento estrito de 20 segundos.

A navegação da página usa no máximo 16,5 segundos, mais 1,5 segundo após o evento `load` para concluir a hidratação comum, e os 2 segundos finais são reservados para capturar o HTML.

Anteriormente, ao usar `networkidle2`, os scripts de análise e as requisições contínuas podiam fazer a página ficar esperando a rede ficar ociosa indefinidamente, esgotando todo o orçamento no final.

Agora, o sistema não espera mais que a rede em segundo plano fique completamente silenciosa, mas ainda verifica se o resultado da renderização é um desafio, uma página de erro ou uma casca vazia em JavaScript sem texto.

Se o fallback ainda falhar, o GeoScore deixará a página em `unknown` ou `error`, e a pontuação total pode virar diretamente evidência insuficiente.

A versão 2.4.5 também eleva o cache de auditoria para `v24`.

Dessa forma, após o deploy, o sistema não continuará atingindo resultados antigos de timeout ou de páginas de verificação deixados pela versão anterior; o cache antigo expirará naturalmente de acordo com o TTL original.

## Como usar a API personalizada

Abaixo da caixa de entrada na página inicial, há um painel de API personalizada que fica recolhido por padrão.

Este é um recurso opcional, usado apenas para realizar uma única observação de resposta para o Evidence Map após a conclusão da auditoria de fatos.

Ao preencher a chave de API (API Key), a URL base HTTPS (HTTPS Base URL) e o modelo (model), é possível puxar a lista de modelos ou preencher manualmente um modelo conhecido.

A Base URL não precisa que você concatene `/v1/models` manualmente.

Se eu preencher `https://api.example.com`, o GeoScore completará automaticamente para `https://api.example.com/v1`.

Se por engano você colar `/models` ou `/chat/completions` junto, ele também voltará primeiro para o caminho raiz da API correspondente antes de enviar a requisição.

Os três campos precisam ser preenchidos juntos; se faltar um deles, a requisição não poderá ser enviada.

Antes de iniciar a auditoria, o navegador os limpa, e eles não são gravados no armazenamento do navegador, na URL ou no relatório baixado.

O servidor também os trata apenas como configuração de uma única requisição, sem persistência após o término da auditoria.

Isso não significa que você possa exibir uma chave real em gravações de tela ou transmissões ao vivo; informações sensíveis ainda devem ser ocultadas.

Assim que a requisição for concluída, a resposta mais recente da API aparecerá diretamente no topo do Evidence Map.

Ali é possível ver a consulta, o modelo, o status, o horário, o tempo gasto, o corpo da resposta e a quantidade de citações; a resposta completa e as citações podem ser expandidas para leitura detalhada.

O sucesso ou falha da API personalizada não alterará a pontuação de fatos.

Eu prefiro deixar para usá-la somente depois que os problemas factuais já tiverem sido tratados por uma rodada.

Primeiro olhe os problemas da própria página, depois olhe a busca externa e a observação de respostas; inverter essa ordem faz com que seja muito fácil se deixar levar por um texto gerado.

## Para que serve afinal o Token de monitoramento

Após criar um projeto de monitoramento, você receberá duas coisas: um project ID e um management token.

O project ID serve para identificar o projeto, e o Token serve para provar que você tem permissão para ler o projeto, modificar consultas, executar snapshots, visualizar o histórico, rotacionar o Token ou excluir o projeto.

O servidor armazena apenas hashes protegidos, e o Token original é exibido apenas uma vez na criação ou na rotação.

Portanto, assim que obtê-lo pela primeira vez, você deve copiá-lo para o seu gerenciador de senhas.

Ao trocar de navegador ou de dispositivo, você pode inserir o project ID e o Token em "Conectar a um projeto de monitoramento existente" para carregar de volta as consultas, o histórico e o status do projeto.

Por padrão, a página não salva o Token.

Somente quando você clicar explicitamente em salvar neste dispositivo é que ele irá para o armazenamento local do navegador, e você também pode clicar a qualquer momento em esquecer este dispositivo.

Se o Token aparecer em capturas de tela, histórico de chat ou logs públicos, rotacione-o imediatamente; o Token antigo perderá a validade na mesma hora.

A página de documentação (Docs) fornece requisições cURL de `curl` fáceis de copiar e instruções da API pública.

## Como funciona o monitoramento por e-mail

Nos projetos de monitoramento, é possível preencher um endereço de e-mail e concluir a verificação.

O sistema só tentará enviar lembretes se uma linha de base comparável tiver sido estabelecida, a versão da pontuação for a mesma, a cobertura (coverage) for suficiente e a pontuação realmente sofrer alterações.

Na primeira execução, em mudanças na versão da pontuação ou quando houver evidências insuficientes, apenas o snapshot é salvo, sem disparar alertas de alta ou queda.

O adaptador de e-mail atual prioriza o canal de envio principal, mas é possível alternar para o serviço de envio fixo do próprio webmaster em caso de falhas de autenticação, limite de taxa (rate limit), rede ou problemas no upstream.

Independentemente de o e-mail ser bem-sucedido ou não, o snapshot da auditoria concluída será salvo primeiro.

## Baixando o relatório de correção completo em Markdown

Terminada a auditoria, é possível baixar de uma só vez o relatório completo de correção em Markdown, sem precisar gerar arquivos item por item.

O relatório trará o perfil do site, as páginas amostradas, a pontuação e os motivos do teto máximo, todas as evidências de falha, erros desconhecidos e externos, status dos módulos opcionais, tarefas de correção agrupadas e etapas de re-verificação.

No final do relatório, há também um prompt de handoff dedicado a IAs de programação.

Ele pode ser entregue ao Codex, ao Claude ou a outros assistentes de programação, mas exige estritamente que o modelo use apenas as evidências existentes, sendo proibido inventar preços, serviços, endereços, entidades, autores ou fontes estatísticas que não existam.

Eu geralmente coloco este arquivo Markdown ao lado do repositório de código do site, peço para o assistente de programação localizar primeiro o arquivo fonte correspondente à URL e, em seguida, reviso o diff eu mesmo.

## Uma ordem prática de uso

1. Abra <https://geo.sayori.org>，先用站点模式审首页域名
2. Confirme que o perfil do site e as páginas amostradas não se desviaram da realidade.
3. Se a primeira tela mostrar falha no rastreamento, veja primeiro as evidências de obtenção da página e não continue tentando explicar uma pontuação que não existe.
4. Veja a cobertura (coverage), a confiança (confidence) e as três ações prioritárias antes de decidir se a pontuação total tem algum valor de referência.
5. Trate primeiro as falhas críticas (critical) e principais (major), voltando aos arquivos fonte da página correspondente ou ao modelo do CMS para fazer as alterações.
6. Confirme os problemas de desempenho separadamente, garantindo que haja dados reais de PageSpeed tanto para dispositivos móveis quanto para desktop.
7. Terminado o tratamento dos problemas factuais, execute o Evidence Map conforme a necessidade ou preencha a API personalizada uma vez.
8. Baixe o relatório em Markdown, entregue-o à IA de programação para a segunda rodada de localização, revise as alterações você mesmo e faça o deploy.
9. Quando precisar de observação contínua, crie um projeto de monitoramento e salve o project ID e o Token no gerenciador de senhas.
10. Se tiver dúvidas sobre algum botão ou interface, abra <https://geo.sayori.org/docs>
11. Faça um novo rastreamento da mesma URL após o deploy para confirmar que as evidências de falha realmente desapareceram.

## O que a ferramenta não consegue fazer

O GeoScore não é um crawler de profundidade infinita; cinco páginas de amostra não podem representar todas as URLs.

Ele também não substitui o Search Console, logs de servidores, dados de usuários reais ou julgamentos de conteúdo humanos.

Para páginas bloqueadas por WAF, telas de login, páginas de verificação ou restrições regionais, o relatório talvez consiga fornecer apenas `unknown` ou `error`.

Nesse caso, você não deve desativar as políticas de segurança apenas para correr atrás de pontos.

Muito menos é possível confirmar do nada que algum produto de IA voltado para o consumidor realmente citou o seu site.

Para mim, esses limites tornam o relatório ainda mais útil.

Uma ferramenta de auditoria deve deixar claro o que sabe e o que não sabe, e deixar o restante para o mantenedor do site verificar.

## Continue lendo

Se ainda não construiu seu site, você pode começar a partir de [[astro-mizuki-blog-from-zero|Modelo de blog minimalista]]; coloque o domínio, a hospedagem e o armazenamento de imagens em [[cloudflare-free-tier-developer-guide|Camada gratuita do Cloudflare]].

Além do rastreamento e da indexação, também venho ajustando a experiência ao ler artigos de verdade; o processo de escolhas e descartes está escrito em [[blog-style-change|Registro de redesign do estilo do blog]].
