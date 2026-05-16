# Style Guide

Design reference for all tools in this repo. Follow these patterns to keep the collection looking cohesive.

---

## Theming

Tools support **dark** and **light** themes via CSS custom properties on `html[data-theme]`. The theme defaults to the user's system preference (`prefers-color-scheme`) and can be toggled manually, with the choice saved in `localStorage`.

Accent colors (`--accent`, `--accent-hover`, `--accent-light`, `--accent-soft`, `--accent-pale`) are shared between themes and do not change.

---

## Colors

### Dark theme (default)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#0f172a` | Page background, inset surfaces |
| `--bg-card` | `#1e293b` | Cards, panels |
| `--bg-inset` | `#0f172a` | Input/textarea backgrounds |
| `--bg-card-hover` | `#2a1520` | Card hover background |
| `--border` | `#334155` | Borders, dividers |
| `--text-primary` | `#f8fafc` | Headings |
| `--text-body` | `#e2e8f0` | Body text |
| `--text-muted` | `#64748b` | Labels, subtitles, placeholders |
| `--text-secondary` | `#94a3b8` | Section labels |
| `--btn-sec-bg` | `#334155` | Secondary button background |
| `--btn-sec-color` | `#94a3b8` | Secondary button text |
| `--btn-sec-hover-bg` | `#475569` | Secondary button hover bg |
| `--btn-sec-hover-color` | `#e2e8f0` | Secondary button hover text |

### Light theme

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#fff5f7` | Page background |
| `--bg-card` | `#ffffff` | Cards, panels |
| `--bg-inset` | `#fdeef1` | Input/textarea backgrounds |
| `--bg-card-hover` | `#fdeef1` | Card hover background |
| `--border` | `#f0c0cc` | Borders, dividers |
| `--text-primary` | `#1a050a` | Headings |
| `--text-body` | `#4a1520` | Body text |
| `--text-muted` | `#9b6070` | Labels, subtitles, placeholders |
| `--text-secondary` | `#7a4055` | Section labels |
| `--btn-sec-bg` | `#f0dde2` | Secondary button background |
| `--btn-sec-color` | `#7a4055` | Secondary button text |
| `--btn-sec-hover-bg` | `#e8ccd4` | Secondary button hover bg |
| `--btn-sec-hover-color` | `#4a1520` | Secondary button hover text |

### Accent (shared across both themes)

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#DD2D4A` | Primary buttons, focus rings, highlights |
| `--accent-hover` | `#880D1E` | Hover state for accent |
| `--accent-light` | `#F26A8D` | Letter/character highlights |
| `--accent-soft` | `#F49CBB` | Phonetic word text, soft highlights |
| `--accent-pale` | `#CBEEF3` | Confirmation states (e.g. "Copied!") |
| `--danger` | `#ef4444` / `#cc2233` | Errors, unknowns (dark / light) |

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
- Max content width: `640px` (single-column tools), `860px` (grid layouts)
- Border radii: `12px` cards, `8px` inner elements, `6px` buttons

---

## Page template

Copy this as the starting point for every new tool:

```html
<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tool Name</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg-base:              #0f172a;
      --bg-card:              #1e293b;
      --bg-inset:             #0f172a;
      --border:               #334155;
      --text-primary:         #f8fafc;
      --text-body:            #e2e8f0;
      --text-muted:           #64748b;
      --text-secondary:       #94a3b8;
      --accent:               #DD2D4A;
      --accent-hover:         #880D1E;
      --btn-sec-bg:           #334155;
      --btn-sec-color:        #94a3b8;
      --btn-sec-hover-bg:     #475569;
      --btn-sec-hover-color:  #e2e8f0;
    }

    @media (prefers-color-scheme: light) {
      :root:not([data-theme="dark"]) {
        --bg-base:              #fff5f7;
        --bg-card:              #ffffff;
        --bg-inset:             #fdeef1;
        --border:               #f0c0cc;
        --text-primary:         #1a050a;
        --text-body:            #4a1520;
        --text-muted:           #9b6070;
        --text-secondary:       #7a4055;
        --btn-sec-bg:           #f0dde2;
        --btn-sec-color:        #7a4055;
        --btn-sec-hover-bg:     #e8ccd4;
        --btn-sec-hover-color:  #4a1520;
      }
    }

    [data-theme="light"] {
      --bg-base:              #fff5f7;
      --bg-card:              #ffffff;
      --bg-inset:             #fdeef1;
      --border:               #f0c0cc;
      --text-primary:         #1a050a;
      --text-body:            #4a1520;
      --text-muted:           #9b6070;
      --text-secondary:       #7a4055;
      --btn-sec-bg:           #f0dde2;
      --btn-sec-color:        #7a4055;
      --btn-sec-hover-bg:     #e8ccd4;
      --btn-sec-hover-color:  #4a1520;
    }

    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: var(--bg-base);
      color: var(--text-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
      transition: background 0.2s, color 0.2s;
    }

    .top-bar {
      width: 100%;
      max-width: 640px;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }

    .theme-toggle {
      background: var(--btn-sec-bg);
      color: var(--btn-sec-color);
      border: none;
      border-radius: 6px;
      padding: 0.35rem 0.75rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }

    .theme-toggle:hover {
      background: var(--btn-sec-hover-bg);
      color: var(--btn-sec-hover-color);
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .subtitle {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      width: 100%;
      max-width: 640px;
      transition: background 0.2s, border-color 0.2s;
    }

    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    button {
      background: var(--accent);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1.1rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover { background: var(--accent-hover); }

    button.secondary {
      background: var(--btn-sec-bg);
      color: var(--btn-sec-color);
    }

    button.secondary:hover {
      background: var(--btn-sec-hover-bg);
      color: var(--btn-sec-hover-color);
    }
  </style>
</head>
<body>
  <div class="top-bar">
    <button class="theme-toggle" onclick="toggleTheme()">☀ Light</button>
  </div>

  <h1>Tool Name</h1>
  <p class="subtitle">One-line description</p>

  <div class="card">
    <!-- tool content here -->
  </div>

  <script>
    const html = document.documentElement;
    const btn = document.querySelector('.theme-toggle');

    function getEffectiveTheme() {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      btn.textContent = theme === 'light' ? '☽ Dark' : '☀ Light';
    }

    function toggleTheme() {
      const next = getEffectiveTheme() === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    }

    applyTheme(getEffectiveTheme());

    // tool logic here
  </script>
</body>
</html>
```

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
