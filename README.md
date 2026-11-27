# BeautyByEsterr

Mini-site de uma lash designer, feito com Astro, TypeScript, Tailwind CSS e ícones Lucide. Geração estática, fontes locais e nenhum JavaScript enviado ao navegador. A paleta segue a referência rosa fornecida, com a fotografia real da Esterr.

## Rodar localmente

Use Node.js 22.23.4+ (recomendado: Node 24 LTS).

```sh
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente http://127.0.0.1:4321).

## Dados e links

Edite `src/config/site.ts`:

- `whatsapp.phone`: número completo com código do país. Já configurado como `556792742036`.
- `whatsapp.message`: texto automático do primeiro contato.
- `location.mapsUrl`: link do Google Maps fornecido, já configurado.
- `location.address`: opcional. Para usar o endereço escrito, preencha este campo e deixe `mapsUrl` vazio. O link direto tem prioridade.
- `url`: **pendente**. Após publicar, preencha com o domínio HTTPS real e faça um novo deploy para ativar a URL canônica e a imagem de compartilhamento absoluta.
- `name`, `profession`, `headline`, `description`, `photo`, `photoAlt` e `seo`: conteúdo e metadados.

Se os contatos estiverem vazios ou inválidos, os respectivos cards ficam desabilitados e exibem “Em breve.”. Nenhum telefone ou endereço é inventado.

## Fotografia

A fotografia enviada já está em `public/images/esterr.webp`, otimizada para a web. Para substituir, coloque uma imagem WebP no mesmo caminho. Ajuste `photoAlt` e, se necessário, `object-position` em `src/styles/global.css` para enquadrar o rosto. O original fora do projeto é preservado.

`public/og-image.png` é a arte para compartilhamento. Atualize-a quando trocar a foto ou a marca.
Para regenerar a arte usando a foto atual, execute `npm run image:og`. O layout dessa arte fica em `scripts/create-og.mjs`.

## Verificação e build

```sh
npm run check
npm test
npm run build
npm run preview
```

O build gera `dist/`, pronto para hospedagem estática. Os testes verificam os links, a codificação da mensagem e o comportamento com dados ausentes. O ano do rodapé é atualizado automaticamente a cada build.

## Publicar na Vercel

1. Envie este projeto para um repositório GitHub, GitLab ou Bitbucket.
2. Na Vercel, selecione **Add New → Project** e importe o repositório.
3. Escolha **Astro** como Framework Preset, `npm run build` como Build Command e `dist` como Output Directory. Use Node.js 24.x.
4. Clique em **Deploy**. A Vercel fornecerá um domínio gratuito `*.vercel.app`.
5. Copie esse domínio HTTPS para `site.url` em `src/config/site.ts` e envie a alteração para disparar um novo deploy.
6. Confira os dois links pelo celular e coloque a URL pública na bio do Instagram.

Não há variáveis secretas, banco, backend ou adaptador de servidor. Consulte a [documentação oficial de Astro na Vercel](https://docs.astro.build/en/guides/deploy/vercel/).

## Estrutura

```text
public/            Foto, favicon e imagem de compartilhamento
src/components/    Cabeçalho, foto, apresentação, cards e rodapé
src/config/site.ts Conteúdo, contatos, SEO e geradores de URLs
src/layouts/       HTML base e metadados
src/pages/         Página inicial
src/styles/        Identidade visual e responsividade
tests/             Validação dos links e configuração
```

O layout prioriza 320–430 px, mantém coluna única no desktop, usa estados de foco e respeita `prefers-reduced-motion`. Links externos abrem em nova aba e indicam esse comportamento a leitores de tela.
