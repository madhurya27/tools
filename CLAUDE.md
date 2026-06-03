# CLAUDE.md

Serve: `make serve` (port 8080). Test: `make test` or `pnpm test tests/<tool-name>.spec.js`. No build step — CDN links for runtime libraries are fine.

## Architecture

`index.html` and `theme.css` live at the repo root. Tools are `.html` files in `tools/`. Docs live in `docs/`. Each tool links to `../theme.css` and adds only tool-specific styles inline. Tools must be served — `file://` won't resolve the CSS link.

## Adding a new tool

1. Copy `tools/template.html`
2. Add a card to `index.html` — see `docs/STYLE_GUIDE.md` for color tokens
3. Add `tests/<tool-name>.spec.js` — see `docs/README.md` for what to cover
