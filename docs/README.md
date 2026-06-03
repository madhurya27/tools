# Tools

A collection of small, self-contained browser utilities. No frameworks, no dependencies — just HTML, CSS, and vanilla JS.

**Live site:** https://madhurya27.github.io/tools/

## Tools

| Tool | Description |
|------|-------------|
| [Travel Itinerary](../tools/itinerary.html) | Paste flight/hotel emails or a Day 1/Day 2 itinerary to get a clean visual layout |
| [Phonetic Converter](../tools/phonetic-converter.html) | Convert text into NATO phonetic codewords |

## Running locally

Requires Python 3 (for the dev server) and pnpm (for tests).

```bash
make serve   # serves at http://localhost:8080 and opens the browser
```

Tools must be served — opening `.html` files directly as `file://` won't work because `theme.css` is loaded via a relative URL.

## Adding a new tool

1. Copy `tools/template.html` to a new file in `tools/`
2. Follow the patterns in [STYLE_GUIDE.md](STYLE_GUIDE.md) for color tokens, layout, and components
3. Add a card for it in `index.html`
4. Add a row for it in the table above

## Testing

End-to-end tests use [Playwright](https://playwright.dev/) (Chromium only). The test suite covers all real-world functionality for every tool.

```bash
make test          # run all tests (headless)
pnpm run test:ui   # open Playwright UI for interactive debugging
```

Tests live in `tests/`. The server starts automatically before the suite runs and stops when it finishes — no manual `make serve` needed.

### Adding tests for a new tool

Create `tests/<tool-name>.spec.js`. Cover:
- Initial page state
- Core functionality (input → expected output)
- Edge cases (empty input, unknown characters, etc.)
- Any UI interactions (buttons, keyboard shortcuts, edit mode)

## Principles

- One file per tool, no build step
- No build-time dependencies; CDN links for runtime libraries are fine
- Mobile friendly
