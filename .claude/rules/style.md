---
paths:
  - "tools/**/*.html"
  - "index.html"
---

Full token reference: `docs/STYLE_GUIDE.md`.

- Link `../theme.css` from tools (`theme.css` for `index.html`). Add only tool-specific styles inline — never in a separate file.
- Use CSS custom properties for all colors — never hardcode hex values.
- Typography: page title `1.75rem / font-weight:700`, subtitle `0.875rem`, section labels `0.75rem / 600 / uppercase / letter-spacing:0.08em`, body `1rem`, small `0.8rem`. Use `--text-primary`, `--text-body`, `--text-muted`, `--text-secondary`.
- Layout: `display:flex; flex-direction:column; align-items:center; padding:2rem 1rem`. Set max width via `--content-max-width` on `:root` — `640px` single-column, `860px` grid.
- Border radii: `12px` cards, `8px` inner elements, `6px` buttons.
- Icons: Lucide from CDN only (`https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`). Call `lucide.createIcons()` after every DOM update that inserts icon elements. Add `<!-- Icons by Lucide (https://lucide.dev) — MIT License -->` near the script tag.
