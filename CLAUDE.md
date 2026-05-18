# CLAUDE.md

No build step. CDN links for runtime libraries are fine; no build-time dependencies. Serve locally with `make serve` (defaults to port 8080).

## Architecture

Each tool is a single `.html` file at the repo root. `index.html` is the homepage grid; everything else is a tool. Shared styles (color tokens, theming, base layout, buttons, cards) live in `theme.css` — each tool links to it and adds only tool-specific styles inline. Tools must be served (not opened as `file://`) for the CSS link to resolve.

## Adding a new tool

Copy `template.html`, then see `README.md` for the checklist and `STYLE_GUIDE.md` for color tokens and how to add a card to `index.html`.
