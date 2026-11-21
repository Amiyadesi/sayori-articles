---
title: "Hospedar Vaultwarden em um servidor de 2C2G: não deixe seu gerenciador de senhas nu e cru"
published: 2026-06-22
created: 2026-06-22
updated: 2026-10-17
lastEdited: 2026-10-17
updateCount: 6
description: "Implante o Vaultwarden em um servidor de estudante usando Docker Compose e entenda as partes realmente importantes: HTTPS, fechamento de cadastros, backups e testes de restauração."
image: ""
tags:
  - Tutoriais Práticos
  - VPS e Autohospedagem
  - Docker
  - Vaultwarden
category: "Tutoriais e guias"
draft: false
alias: ""
lang: pt-BR
translationKey: "posts/selfhost-vaultwarden-on-2c2g/selfhost-vaultwarden-on-2c2g"
---

O Vaultwarden é provavelmente um dos melhores serviços para colocar em um servidorzinho de 2C2G

Ele é leve, o ecossistema de clientes é maduro, e você pode conectar aplicativos oficiais do Bitwarden diretamente pelo celular, computador ou extensão de navegador

Mas também é um dos serviços que eu menos recomendo para brincar sem cuidado

Se um blog quebrar, você pode reconstruí-lo. Se o seu cofre de senhas der problema, o que você perde são contas, 2FA, senhas de painéis e até os acessos de todos os seus outros servidores

Portanto, este artigo não vai inventar firulas. Vamos direto a uma estratégia que funcione e seja segura:

1. Subir com o Docker Compose
2. Expor apenas via HTTPS
3. Fechar os cadastros assim que terminar de registrar a conta
4. Não enrolar para fazer backups e restaurações

Projeto oficial:

[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

Documentação do Compose:

[https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose](https://github.com/dani-garcia/vaultwarden/wiki/Using-Docker-Compose)

## Para quem é indicado

Acho que faz sentido para quem:

- Já tem um servidor próprio
- Quer manter os dados de suas senhas sob seu próprio controle
- Topa lidar com as tarefas chatas de HTTPS, backups e atualizações

Se você só quer comodidade e paz de espírito, a hospedagem oficial do Bitwarden, o 1Password e o Gerenciador de Senhas da Apple são ótimas opções

A vantagem do Vaultwarden não é a zero manutenção, mas sim ser mais leve, mais livre e se encaixar melhor nas maquininhas baratas de estudantes

## O que preparar antes

- Uma VPS capaz de rodar Docker
- Um domínio ou, pelo menos, um ponto de entrada HTTPS estável
- Docker e Docker Compose instalados
- Noções básicas de SSH, proxy reverso e firewall

Se você ainda não instalou o Docker, dê uma olhada em [[docker-compose-minimum-start|Docker e Docker Compose: Introdução mínima e como entender aqueles arquivos yml]]

Se ainda não configurou um domínio, veja [[free-domain-and-web-community|Como configurar um domínio gratuito para o seu blog recém-criado e aparecer na comunidade de webmasters]]

## Criar o diretório

Eu continuo colocando em `/srv/stacks`

```bash
sudo mkdir -p /srv/stacks/vaultwarden
sudo chown -R $USER:$USER /srv/stacks/vaultwarden
cd /srv/stacks/vaultwarden
mkdir -p vw-data
```

A estrutura de diretórios fica parecida com isto:

```text
/srv/stacks/vaultwarden/
  docker-compose.yml
  vw-data/
```

Mais adiante, o banco de dados e os anexos ficarão todos dentro de `vw-data`

## Escrever o compose

```yaml
services:
  vaultwarden:
    image: ghcr.io/dani-garcia/vaultwarden:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vault.example.com"
      SIGNUPS_ALLOWED: "true"
      INVITATIONS_ALLOWED: "false"
      ENABLE_WEBSOCKET: "true"
      TZ: "Asia/Shanghai"
    volumes:
      - ./vw-data:/data
    ports:
      - "127.0.0.1:8080:80"
```

Substitua `vault.example.com` pelo seu próprio domínio

A linha mais importante aqui é esta:

```text
127.0.0.1:8080:80
```

Isso significa que o Vaultwarden vai escutar apenas na porta local `8080`

A internet pública não vai acessá-lo diretamente; o tráfego só poderá entrar através do Nginx, Caddy ou Cloudflare Tunnel

Não coloque de primeira algo como:

```text
0.0.0.0:8080:80
```

Deixar o cofre de senhas nu e cru direto na porta HTTP pública não é uma boa ideia

Uma breve explicação sobre algumas das variáveis:

- `DOMAIN`: O endereço HTTPS final para acesso
- `SIGNUPS_ALLOWED`: Aberto temporariamente apenas no primeiro cadastro, devendo ser fechado logo em seguida
- `INVITATIONS_ALLOWED`: Desative diretamente se for para uso pessoal; deixe ativo se quiser convidar outras pessoas
- `ENABLE_WEBSOCKET`: Deixe ativado para que a sincronização nos clientes funcione de forma mais estável

## Inicialização

```bash
docker compose up -d
docker compose logs -f vaultwarden
```

Verifique localmente:

```bash
curl -I http://127.0.0.1:8080/
```

Se retornar um código de status válido, significa que o container está ativo

Mas isso ainda não basta, porque a parte realmente importante é o HTTPS

## Proxy reverso e HTTPS

Um serviço como o Vaultwarden não deve rodar a longo prazo em HTTP puro

Contextos de segurança do navegador, clientes de gerenciadores de senhas e a sua própria paz mental exigem que o HTTPS esteja configurado corretamente

Eu costumo escolher entre duas abordagens

### Rota A: Caddy / Nginx

Indicado se o domínio aponta diretamente para o servidor e as portas 80 e 443 estão abertas

O Caddy é o mais prático:

```text
vault.example.com {
  reverse_proxy 127.0.0.1:8080
}
```

Ele lida com os certificados de forma automática

O Nginx também serve, mantendo a mesma lógica central: redirecionar `https://vault.example.com` para `127.0.0.1:8080`

```nginx
server {
    listen 80;
    server_name vault.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vault.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        client_max_body_size 525M;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Depois de alterar, não se esqueça de validar:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Rota B: Cloudflare Tunnel

Se você prefere não abrir as portas 80 e 443 diretamente na origem, o Tunnel é bem mais confortável

A estrutura fica assim:

```text
vault.example.com
  -> Cloudflare
  -> Cloudflare Tunnel
  -> 127.0.0.1:8080
  -> Vaultwarden
```

Eu uso este método pessoalmente

Além disso, uma dica geral: não coloque uma página de login do Cloudflare Access em todo o Vaultwarden

Isso atrapalharia o uso das extensões de navegador e dos aplicativos móveis

Se realmente precisar de proteção extra, priorize proteger apenas `/admin`

## Fechar os cadastros logo após o primeiro registro

Assim que abrir `https://vault.example.com` pela primeira vez, crie sua conta principal

Logo após criá-la, altere a configuração:

```yaml
SIGNUPS_ALLOWED: "false"
```

Em seguida, reinicie:

```bash
docker compose up -d
```

Não ache que o seu domínio é desconhecido: serviços expostos na internet pública acabam sendo varridos mais cedo ou mais tarde

## O que fazer logo após criar a conta

- Defina uma senha principal que seja realmente forte
- Ative a verificação em duas etapas (2FA)
- Confirme que o HTTPS está funcionando antes de importar suas senhas
- Antes de importar, exporte um backup offline do seu gerenciador de senhas antigo

E um ponto muito realista:

Não jogue chaves SSH da sua VPS, senhas de painéis e vários tipos de credenciais root dentro de um cofre de senhas sem antes pensar bem na estratégia de backup

Suba o serviço primeiro e faça a migração aos poucos

## Backup

Os dados mais importantes do Vaultwarden ficam aqui:

```text
/srv/stacks/vaultwarden/vw-data
```

A maneira mais simples é forçá-lo a realizar um backup interno e, em seguida, compactar todo o diretório

```bash
cd /srv/stacks/vaultwarden
mkdir -p backups
docker compose exec -T vaultwarden /vaultwarden backup
tar -czf backups/vaultwarden-$(date +%Y%m%d-%H%M%S).tar.gz docker-compose.yml vw-data
```

Se você usa `.env`, SMTP, tokens de administração ou recursos parecidos, faça backup deles junto, mas não os jogue em repositórios públicos

Depois, baixe o backup para a sua máquina local ou sincronize para outro servidor

```bash
scp your-server:/srv/stacks/vaultwarden/backups/vaultwarden-20260625-030000.tar.gz .
```

Não guarde tudo na mesma máquina

Na maioria das vezes, backup na mesma máquina é o mesmo que não ter backup

## Testes de restauração

Saber apenas fazer backup sem saber restaurar é bastante arriscado

Você deve, pelo menos de vez em quando, verificar se há conteúdo dentro do pacote de backup:

```bash
tar -tzf backups/vaultwarden-20260625-030000.tar.gz | sed -n '1,30p'
```

O resultado normal deve mostrar algo assim:

```text
docker-compose.yml
vw-data/
vw-data/db.sqlite3
```

Na hora de fazer uma restauração de verdade, pare o serviço primeiro e mova os dados antigos para fora:

```bash
cd /srv/stacks/vaultwarden
docker compose down
mv vw-data vw-data.before-restore-$(date +%Y%m%d-%H%M%S)
tar -xzf backups/vaultwarden-20260625-030000.tar.gz
docker compose up -d
```

Após a restauração, verifique pelo menos quatro coisas:

- A página web abre
- Você consegue fazer login
- Os itens continuam lá
- A extensão do navegador e o celular conseguem sincronizar

Não espere um desastre acontecer para aprender a restaurar pela primeira vez

## Atualização

Faça um backup antes de atualizar; não pule essa etapa

```bash
cd /srv/stacks/vaultwarden
docker compose exec -T vaultwarden /vaultwarden backup
docker compose pull
docker compose up -d
docker compose logs --tail=100 vaultwarden
```

Depois de atualizar, não olhe apenas para os logs: acesse a interface web e os aplicativos para testar tudo você mesmo

## Ele é adequado para um 2C2G?

Com certeza

O Vaultwarden em si consome poucos recursos, e rodá-lo em uma máquina de 2C2G é bem tranquilo

O verdadeiro custo não está na CPU ou na memória, mas sim nos hábitos de manutenção:

- HTTPS
- Fechar os cadastros
- Backups
- Restaurações
- Atualizações

Se você quer começar a sua jornada de autohospedagem a sério, ele é ótimo para servir como o seu primeiro serviço de respeito

A conveniência trazida por um gerenciador de senhas é inacreditável, e configurar o seu próprio cofre também serve como um excelente ponto de partida para os seus próximos desploys

## Leitura recomendada

O domínio e o HTTPS do cofre de senhas podem ser integrados ao [[cloudflare-free-tier-developer-guide|Cloudflare Tunnel]], os resultados dos scripts de backup podem ser enviados para o celular usando o [[selfhost-ntfy-on-2c2g|ntfy]], e outros serviços leves podem ser consultados na [[2c2g-server-service-index|Lista de serviços para servidor pequeno]]
