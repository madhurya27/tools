Rules for writing and modifying tool files:

- **Cache DOM references** used across more than one function at module level: `const inputEl = document.getElementById('input')`.
- **No duplicate constants** — reuse existing arrays/objects; never redeclare under a different name.
- **No inline event handlers on JS-generated elements** — use `addEventListener`; inline `onclick=`/`onchange=` are only acceptable on static HTML in the `.html` body.
- **Extract repeated sub-expressions** — assign to a named variable or helper before using more than once.
- **Don't duplicate data processing logic** — if two functions traverse the same input the same way, extract a shared helper.
