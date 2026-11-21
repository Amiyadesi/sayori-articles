---
title: "Configurando o Fast Note Sync em um servidor de estudante: dando ao Obsidian uma camada de sincronização privada"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 5
description: Testando o Fast Note Sync Service em um servidor de estudante 2C2G para abrir uma rota privada para sincronização multi-dispositivo, backups e interfaces REST/MCP no Obsidian.
image: ""
tags:
  - Tutoriais práticos
  - VPS e self-hosting
  - Docker
  - Obsidian
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/fast-note-sync-on-student-server/fast-note-sync-on-student-server"
---

Atualmente, escrevo minhas postagens de blog e notas de projetos no Obsidian. No entanto, comecei a usar o Obsidian no computador e, depois de já ter um monte de coisa escrita lá, percebi que não conseguia escrever pelo celular. Foi aí que fui atrás de um serviço de sincronização.

O Obsidian Sync oficial é super prático, embora o seu bolso certamente não ache isso; Syncthing, Git e WebDAV também têm suas próprias formas de uso, mas eu achei tudo meio inconveniente.

Até que, no fim das contas, esbarrei no plugin Fast Note Sync, que vi na seção de comentários enquanto navegava pelo Linux.do: ele é um plugin do Obsidian combinado com um servidor auto-hospedado, cujo objetivo é a sincronização em tempo real entre vários dispositivos, e que de quebra ainda adiciona histórico de versões, anexos, gerenciamento web, API REST e MCP. Depois de testar e configurar na prática por alguns dias, achei que funciona muito bem b(￣▽￣)d

Plugin:

[https://github.com/haierkeys/obsidian-fast-note-sync](https://github.com/haierkeys/obsidian-fast-note-sync)

Servidor:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Página do plugin no Obsidian:

[https://community.obsidian.md/plugins/fast-note-sync](https://community.obsidian.md/plugins/fast-note-sync)

## Para quem ele é indicado?

Acho que ele é ideal para quem:

- Já usa o Obsidian para escrever bastante conteúdo
- Tem um servidor pequeno ligado 24 horas por dia
- Está disposto a lidar por conta própria com HTTPS, proxy reverso e backups
- Quer poder escrever notas a qualquer hora e em qualquer lugar

Dessa forma, mesmo que o computador não esteja por perto, você pode usar o celular facilmente para escrever seus textos, e quando voltar, é só sincronizar no computador.

## Implantando o servidor

O repositório do servidor está aqui:

[https://github.com/haierkeys/fast-note-sync-service](https://github.com/haierkeys/fast-note-sync-service)

Ele é um servidor escrito em Go, e a descrição do repositório diz que se trata de uma plataforma de serviços de alta performance e baixa latência para sincronização de notas, gerenciamento online e API REST remota.

Eu costumo criar os diretórios primeiro:

```bash
sudo mkdir -p /srv/stacks/fast-note-sync
sudo chown -R $USER:$USER /srv/stacks/fast-note-sync
cd /srv/stacks/fast-note-sync
```

Depois, escolho implantar via Docker, binário ou compilação a partir do código-fonte, seguindo a documentação oficial. De qualquer forma, procuro fazer com que o serviço escute apenas no endereço local (localhost) e uso um proxy reverso ou Tunnel para expor o HTTPS.

A lógica é a seguinte:

```text
Fast Note Sync Service
  -> 只监听 127.0.0.1:<服务端口>
  -> Caddy / Nginx / Cloudflare Tunnel
  -> notes.example.com
```

Se for usar o Docker Compose, mantenha pelo menos estes hábitos:

- Faça a persistência do diretório de dados no diretório atual do serviço
- Não deixe arquivos de configuração entrarem em repositórios públicos
- Não exponha diretamente a porta do serviço para a rede pública
- Faça backup do diretório de dados antes de atualizar

O serviço de sincronização guarda as suas notas, então ele não deve ficar desprotegido por aí.

## Conectando um domínio

Você pode usar o Caddy, o Nginx ou o Cloudflare Tunnel.

Por exemplo, para o domínio:

```text
notes.example.com
```

Estrutura:

```text
notes.example.com
  -> HTTPS
  -> 127.0.0.1:<服务端口>
  -> fast-note-sync-service
```

Se você ainda não tem um domínio, pode dar uma olhada nisto primeiro:

[[free-domain-and-web-community|Dê um domínio gratuito para o seu blog recém-criado e apareça na comunidade de webmasters]]

Eu não recomendo acessar diretamente:

```text
http://服务器IP:<服务端口>
```

No mínimo, use HTTPS e, de preferência, adicione alguma proteção de acesso.

## Inicializando a conta e o plugin

O fluxo descrito no README do servidor é mais ou menos assim:

1. Abra a interface de gerenciamento web
2. Registre uma conta no primeiro acesso
3. Copie a configuração de API no painel de administração
4. Cole a configuração nas configurações do plugin do Obsidian

Baixe manualmente `main.js`, `styles.css` e `manifest.json` a partir das Releases do GitHub e coloque-os em:

```text
.obsidian/plugins/fast-note-sync/
```

Depois, vá para a página de plugins e ative-o. Você precisará criar um token na página web, copiá-lo e colá-lo nas configurações remotas. Geralmente, ele começa a funcionar logo depois.

## O backup é mais importante do que a sincronização

Sincronização não é backup.

Esta frase merece ser escrita separadamente. A sincronização vai propagar exclusões e também vai propagar erros.

O próprio Fast Note Sync oferece recursos como histórico de versões, lixeira, backups, espelhamento e sincronização via Git, mas você ainda precisa ter a sua própria rede de segurança.

Se você já usa o Git para sincronizar o seu Obsidian, não venha empilhando outra camada de sincronização em tempo real logo de cara; decida primeiro quem é a sincronização principal e quem é o backup.

## O que pensar sobre o MCP e a API REST?

O Fast Note Sync Service agora também oferece suporte a API REST e MCP.

Isso é algo que me chama bastante atenção. Como muito do meu conteúdo está no Obsidian, se clientes de IA puderem ler e escrever notas através de uma interface controlada no futuro, ele deixará de ser apenas uma ferramenta de sincronização e se tornará a porta de entrada para a minha base de conhecimento pessoal.

Mas isso também traz riscos.

Permitir que uma IA leia e escreva nas suas notas significa que os limites de permissão devem ser muito claros:

- Não exponha a interface MCP para a rede pública
- Não dê permissões de escrita para clientes não confiáveis
- Não misture diários particulares, informações de contas e chaves de acesso em um cofre (Vault) aberto
- Deixe os cofres importantes apenas como leitura no começo, e só considere habilitar a escrita depois de confirmar que o fluxo está seguro.

"Poder conectar a IA" não é motivo para abrir todas as permissões de uma vez só.

## Ele sobrecarrega uma máquina 2C2G?

Para uso pessoal normal, deve ir bem.

O que realmente consome recursos é a quantidade de anexos, a frequência de sincronização e se você vai enfiar dezenas de gigabytes de materiais dentro do Obsidian.

## Continue lendo

Se a sincronização do Obsidian entre vários dispositivos já está pronta e você quer transformar seus artigos públicos em um blog, confira [[astro-mizuki-blog-from-zero|Modelo de blog minimalista]]; para ver mais sobre pontos de entrada de serviços e HTTPS, continue em [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]]; para outros usos de servidores, volte para [[2c2g-server-service-index|Lista de serviços]]
