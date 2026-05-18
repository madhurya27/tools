# Style Guide

Design reference for all tools in this repo. Follow these patterns to keep the collection looking cohesive.

---

## Theming

Tools support **dark** and **light** themes via CSS custom properties on `html[data-theme]`. The theme defaults to the user's system preference (`prefers-color-scheme`) and can be toggled manually, with the choice saved in `localStorage`.

All shared styles — color tokens, base layout, typography, buttons, and cards — live in `theme.css`. Each tool links to it and adds only tool-specific styles inline.

Accent colors (`--accent`, `--accent-hover`, `--accent-light`, `--accent-soft`, `--accent-pale`) are shared between themes and do not change.

---

## Colors

Palette: https://colorhunt.co/palette/f8ede3bdd2b6a2b29f798777

### Dark theme (default)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#1a2620` | Page background, inset surfaces |
| `--bg-card` | `#243530` | Cards, panels |
| `--bg-inset` | `#1a2620` | Input/textarea backgrounds |
| `--bg-card-hover` | `#2d4038` | Card hover background |
| `--border` | `#3d5a50` | Borders, dividers |
| `--text-primary` | `#EEEFE0` | Headings |
| `--text-body` | `#D1D8BE` | Body text |
| `--text-muted` | `#819A91` | Labels, subtitles, placeholders |
| `--text-secondary` | `#A7C1A8` | Section labels |
| `--btn-sec-bg` | `#3d5a50` | Secondary button background |
| `--btn-sec-color` | `#A7C1A8` | Secondary button text |
| `--btn-sec-hover-bg` | `#4a6a5e` | Secondary button hover bg |
| `--btn-sec-hover-color` | `#D1D8BE` | Secondary button hover text |

### Light theme

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#EEEFE0` | Page background |
| `--bg-card` | `#ffffff` | Cards, panels |
| `--bg-inset` | `#f5f6ee` | Input/textarea backgrounds |
| `--bg-card-hover` | `#D1D8BE` | Card hover background |
| `--border` | `#c8d0b8` | Borders, dividers |
| `--text-primary` | `#1e3028` | Headings |
| `--text-body` | `#2f4a3e` | Body text |
| `--text-muted` | `#819A91` | Labels, subtitles, placeholders |
| `--text-secondary` | `#5a7a70` | Section labels |
| `--btn-sec-bg` | `#D1D8BE` | Secondary button background |
| `--btn-sec-color` | `#5a7a70` | Secondary button text |
| `--btn-sec-hover-bg` | `#A7C1A8` | Secondary button hover bg |
| `--btn-sec-hover-color` | `#1e3028` | Secondary button hover text |

### Accent (shared across both themes)

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#819A91` | Primary buttons, focus rings, highlights |
| `--accent-hover` | `#5e716a` | Hover state for accent |
| `--accent-light` | `#A7C1A8` | Letter/character highlights |
| `--accent-soft` | `#D1D8BE` | Phonetic word text, soft highlights |
| `--accent-pale` | `#EEEFE0` | Confirmation states (e.g. "Copied!") |
| `--danger` | `#e07070` / `#b83228` | Errors, unknowns (dark / light) |

---

## Typography

- **Font stack:** `'Segoe UI', system-ui, sans-serif`
- **Page title:** `1.75rem`, `font-weight: 700`, color `var(--text-primary)`
- **Subtitle:** `0.875rem`, color `var(--text-muted)`
- **Section labels:** `0.75rem`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`, color `var(--text-secondary)`
- **Body:** `1rem`, color `var(--text-body)`
- **Small/meta:** `0.8rem`, color `var(--text-muted)`

---

## Layout

- Page: `display: flex; flex-direction: column; align-items: center; padding: 2rem 1rem;`
- Max content width: `640px` (single-column tools), `860px` (grid layouts) — set via `--content-max-width` in the tool's `:root`
- Border radii: `12px` cards, `8px` inner elements, `6px` buttons

---

## Icons

Use [Lucide](https://lucide.dev) for all UI icons (MIT License — add `<!-- Icons by Lucide (https://lucide.dev) — MIT License -->` as a comment near the script tag). Load from CDN in the `<head>`:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

Render icons with `data-lucide` attributes and call `lucide.createIcons()` after any DOM update that inserts them:

```html
<i data-lucide="plane"></i>
```

```js
lucide.createIcons();
```

Size via CSS — Lucide defaults to 24×24, override with `width`/`height` on the `svg` element. Use `stroke="currentColor"` (Lucide default) so icons inherit the element's `color` for theming.

---

## Page template

Copy `template.html` as the starting point for every new tool.

---

## Adding a tool to the index

Add a card to the `<div class="grid">` in `index.html`:

```html
<a class="tool-card" href="your-tool.html">
  <div class="tool-icon">🔧</div>
  <div class="tool-name">Tool Name</div>
  <div class="tool-desc">Short description of what the tool does.</div>
</a>
```
