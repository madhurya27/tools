# Style Guide

Design reference for all tools in this repo. Follow these patterns to keep the collection looking cohesive.

---

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-base` | `#0f172a` | Page background, inset surfaces |
| `bg-card` | `#1e293b` | Cards, panels |
| `bg-card-hover` | `#2a1520` | Card hover background |
| `border` | `#334155` | Borders, dividers |
| `text-primary` | `#f8fafc` | Headings |
| `text-body` | `#e2e8f0` | Body text |
| `text-muted` | `#64748b` | Labels, subtitles, placeholders |
| `text-secondary` | `#94a3b8` | Secondary labels |
| `accent` | `#DD2D4A` | Primary buttons, focus rings, highlights |
| `accent-hover` | `#880D1E` | Hover state for accent |
| `accent-light` | `#F26A8D` | Letter/character highlights |
| `accent-soft` | `#F49CBB` | Phonetic word text, soft highlights |
| `accent-pale` | `#CBEEF3` | Confirmation states (e.g. "Copied!") |
| `danger` | `#ef4444` | Errors, unknowns |

---

## Typography

- **Font stack:** `'Segoe UI', system-ui, sans-serif`
- **Page title:** `1.75rem`, `font-weight: 700`, color `text-primary`
- **Subtitle:** `0.875rem`, color `text-muted`
- **Section labels:** `0.75rem`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`, color `text-secondary`
- **Body:** `1rem`, color `text-body`
- **Small/meta:** `0.8rem`, color `text-muted`

---

## Layout

- Page: `display: flex; flex-direction: column; align-items: center; padding: 2rem 1rem;`
- Max content width: `640px` (single column tools), `860px` (grid layouts)
- Cards use `border-radius: 12px`, inner elements use `border-radius: 8px`, buttons use `border-radius: 6px`

---

## Components

### Card
```css
background: #1e293b;
border: 1px solid #334155;
border-radius: 12px;
padding: 1.5rem;
```

### Primary button
```css
background: #DD2D4A;
color: #fff;
border: none;
border-radius: 6px;
padding: 0.5rem 1.1rem;
font-size: 0.875rem;
font-weight: 600;
cursor: pointer;
```
Hover: `background: #880D1E`

### Secondary button
```css
background: #334155;
color: #94a3b8;
/* same border-radius, padding, font as primary */
```
Hover: `background: #475569; color: #e2e8f0`

### Text input / Textarea
```css
background: #0f172a;
border: 1px solid #334155;
border-radius: 8px;
color: #f1f5f9;
padding: 0.75rem 1rem;
outline: none;
```
Focus: `border-color: #DD2D4A`

### Section label
```html
<label>Section title</label>
```
```css
display: block;
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.08em;
color: #94a3b8;
margin-bottom: 0.5rem;
```

---

## Page template

Copy this as the starting point for every new tool:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tool Name</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 0.25rem;
    }

    .subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 2rem;
    }

    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 1.5rem;
      width: 100%;
      max-width: 640px;
    }

    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #94a3b8;
      margin-bottom: 0.5rem;
    }

    button {
      background: #DD2D4A;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1.1rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover { background: #880D1E; }

    button.secondary {
      background: #334155;
      color: #94a3b8;
    }

    button.secondary:hover { background: #475569; color: #e2e8f0; }
  </style>
</head>
<body>
  <h1>Tool Name</h1>
  <p class="subtitle">One-line description</p>

  <div class="card">
    <!-- tool content here -->
  </div>

  <script>
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
