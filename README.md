# Portfólio — Matheus Beiruth

Portfólio editorial de página única: tipografia gigante, seções que alternam escuro e claro, projetos numa galeria horizontal guiada pela rolagem e uma malha 3D de pontos no topo.

Feito com React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion e Three.js (React Three Fiber).

## Estrutura da página

1. **Início** — nome em letras gigantes sobre a malha 3D, links para currículo, LinkedIn e GitHub.
2. **Sobre** — parágrafo grande que acende palavra por palavra conforme a rolagem, foto e ficha curta.
3. **Projetos** — no desktop a seção fixa na tela e a rolagem move os cards para o lado; no celular vira uma fileira que se arrasta.
4. **Trajetória** — seção clara (papel), com os anos em destaque.
5. **Stack** — faixa laranja com as tecnologias em movimento.
6. **Certificações** — lista tipográfica; no desktop a miniatura do certificado segue o cursor.
7. **Contato** — e-mail em destaque com botão de copiar, redes e currículo.

`Ctrl+K` abre uma paleta de comandos para navegar e abrir links pelo teclado.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:5173.

## Editar o conteúdo

Textos, links, projetos, stack, trajetória e certificados ficam em [`src/data.ts`](src/data.ts). Imagens e PDFs ficam em `public/img` e `public/files`.

## Paleta

Definida em [`src/index.css`](src/index.css), no bloco `@theme`:

| Token | Cor | Uso |
| --- | --- | --- |
| `ink` | `#0b0b10` | fundo escuro |
| `paper` | `#f3eee6` | seções claras |
| `ember` | `#ff6b35` | acento principal |
| `ember-deep` | `#d6481a` | acento sobre fundo claro |
| `lilac` | `#a78bfa` | gradientes |

## Publicar no GitHub Pages

```bash
npm run build
```

O site estático sai em `dist/`. O build usa caminhos relativos, então funciona na raiz de `BeiruthDEV.github.io` ou em uma subpasta.

## Acessibilidade

Com "reduzir movimento" ativado no sistema, a malha 3D fica parada, a faixa da stack não anda e a galeria de projetos vira rolagem lateral comum.
