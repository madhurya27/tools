# CLAUDE.md

No build step. CDN links for runtime libraries are fine; no build-time dependencies. Serve locally with `make serve` (defaults to port 8080). Run tests with `make test`, or scope to one tool with `pnpm test tests/<tool-name>.spec.js`.

## Architecture

`index.html` and `theme.css` live at the repo root. Tools are single `.html` files in `tools/`. Docs (README, STYLE_GUIDE, BACKLOG) live in `docs/`. Each tool links to `../theme.css` and adds only tool-specific styles inline. Tools must be served (not opened as `file://`) for the CSS link to resolve.

## Adding a new tool

Copy `tools/template.html`, then see `docs/README.md` for the checklist and `docs/STYLE_GUIDE.md` for color tokens and how to add a card to `index.html`. Add a corresponding `tests/<tool-name>.spec.js` — see `docs/README.md` for what to cover.
