---
paths:
  - "tests/**/*.spec.js"
---

- One spec per tool at `tests/<tool-name>.spec.js`. Cover: initial page state, core functionality (input → expected output), edge cases, and all UI interactions (buttons, keyboard shortcuts, edit mode).
- Navigate with `page.goto('/tools/<tool-name>.html')` — paths are relative to the server root at `http://localhost:8080`.
- The dev server starts automatically via `playwright.config.js`; no manual `make serve` needed.
- Chromium only (`browserName: 'chromium'` in config).
