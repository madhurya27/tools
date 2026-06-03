import { test, expect } from '@playwright/test';

test.describe('Phonetic Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/phonetic-converter.html');
  });

  // ── Initial state ────────────────────────────────────────────────────────────

  test('output section is hidden on load', async ({ page }) => {
    await expect(page.locator('#output-section')).not.toHaveClass(/visible/);
  });

  test('input has autofocus on load', async ({ page }) => {
    await expect(page.locator('#input')).toBeFocused();
  });

  // ── Core conversion ──────────────────────────────────────────────────────────

  test('converts all NATO alphabet letters', async ({ page }) => {
    const nato = {
      A:'Alpha', B:'Bravo', C:'Charlie', D:'Delta', E:'Echo',
      F:'Foxtrot', G:'Golf', H:'Hotel', I:'India', J:'Juliet',
      K:'Kilo', L:'Lima', M:'Mike', N:'November', O:'Oscar',
      P:'Papa', Q:'Quebec', R:'Romeo', S:'Sierra', T:'Tango',
      U:'Uniform', V:'Victor', W:'Whiskey', X:'X-ray', Y:'Yankee',
      Z:'Zulu',
    };
    await page.locator('#input').fill('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    await page.locator('button', { hasText: 'Convert' }).click();
    for (const word of Object.values(nato)) {
      await expect(page.locator('#output')).toContainText(word);
    }
  });

  test('converts all digits 0-9', async ({ page }) => {
    const digitWords = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
    await page.locator('#input').fill('0123456789');
    await page.locator('button', { hasText: 'Convert' }).click();
    for (const word of digitWords) {
      await expect(page.locator('#output')).toContainText(word);
    }
  });

  test('lowercased input produces same output as uppercase', async ({ page }) => {
    await page.locator('#input').fill('abc');
    await page.locator('button', { hasText: 'Convert' }).click();
    await expect(page.locator('#output')).toContainText('Alpha');
    await expect(page.locator('#output')).toContainText('Bravo');
    await expect(page.locator('#output')).toContainText('Charlie');
  });

  test('unknown characters rendered with unknown class', async ({ page }) => {
    await page.locator('#input').fill('@!');
    await page.locator('button', { hasText: 'Convert' }).click();
    const unknowns = page.locator('#output .unknown');
    await expect(unknowns).toHaveCount(2);
  });

  test('spaces produce pipe separator between words', async ({ page }) => {
    await page.locator('#input').fill('A B');
    await page.locator('button', { hasText: 'Convert' }).click();
    await expect(page.locator('#output .space-marker')).toBeVisible();
    await expect(page.locator('#output .space-marker')).toContainText('|');
  });

  test('multiple consecutive spaces produce only one separator', async ({ page }) => {
    await page.locator('#input').fill('A  B');
    await page.locator('button', { hasText: 'Convert' }).click();
    await expect(page.locator('#output .space-marker')).toHaveCount(1);
  });

  test('output section becomes visible after convert', async ({ page }) => {
    await page.locator('#input').fill('SOS');
    await page.locator('button', { hasText: 'Convert' }).click();
    await expect(page.locator('#output-section')).toHaveClass(/visible/);
  });

  // ── Empty input guard ────────────────────────────────────────────────────────

  test('convert with empty input shows no output', async ({ page }) => {
    await page.locator('button', { hasText: 'Convert' }).click();
    await expect(page.locator('#output-section')).not.toHaveClass(/visible/);
  });

  test('convert with only whitespace shows no output', async ({ page }) => {
    await page.locator('#input').fill('   ');
    await page.locator('button', { hasText: 'Convert' }).click();
    await expect(page.locator('#output-section')).not.toHaveClass(/visible/);
  });

  // ── Keyboard shortcut ────────────────────────────────────────────────────────

  test('Enter key triggers convert', async ({ page }) => {
    await page.locator('#input').fill('SOSi');
    await page.locator('#input').press('Enter');
    await expect(page.locator('#output-section')).toHaveClass(/visible/);
  });

  test('Shift+Enter does not trigger convert', async ({ page }) => {
    await page.locator('#input').fill('SOS');
    await page.locator('#input').press('Shift+Enter');
    await expect(page.locator('#output-section')).not.toHaveClass(/visible/);
  });

  // ── Clear ────────────────────────────────────────────────────────────────────

  test('clear hides output section', async ({ page }) => {
    await page.locator('#input').fill('ABC');
    await page.locator('button', { hasText: 'Convert' }).click();
    await expect(page.locator('#output-section')).toHaveClass(/visible/);
    await page.locator('button', { hasText: 'Clear' }).click();
    await expect(page.locator('#output-section')).not.toHaveClass(/visible/);
  });

  test('clear empties the input field', async ({ page }) => {
    await page.locator('#input').fill('ABC');
    await page.locator('button', { hasText: 'Clear' }).click();
    await expect(page.locator('#input')).toHaveValue('');
  });

  test('clear refocuses the input', async ({ page }) => {
    await page.locator('#input').fill('ABC');
    await page.locator('button', { hasText: 'Convert' }).click();
    await page.locator('button', { hasText: 'Clear' }).click();
    await expect(page.locator('#input')).toBeFocused();
  });

  // ── Copy button ──────────────────────────────────────────────────────────────

  test('copy button shows Copied! then reverts', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('#input').fill('SOS');
    await page.locator('button', { hasText: 'Convert' }).click();
    const copyBtn = page.locator('#copy-btn');
    await copyBtn.click();
    await expect(copyBtn).toHaveText('Copied!');
    await expect(copyBtn).toHaveClass(/copied/);
    await expect(copyBtn).toHaveText('Copy text', { timeout: 3000 });
    await expect(copyBtn).not.toHaveClass(/copied/);
  });

  test('copy button writes NATO text to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('#input').fill('SOS');
    await page.locator('button', { hasText: 'Convert' }).click();
    await page.locator('#copy-btn').click();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toBe('Sierra Oscar Sierra');
  });

  test('copy text for multi-word input includes slash separator', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('#input').fill('AB CD');
    await page.locator('button', { hasText: 'Convert' }).click();
    await page.locator('#copy-btn').click();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain(' / ');
  });

  // ── Theme toggle ─────────────────────────────────────────────────────────────

  test('theme toggle switches between light and dark', async ({ page }) => {
    const html = page.locator('html');
    const before = await html.getAttribute('data-theme');
    await page.locator('.theme-toggle').click();
    const after = await html.getAttribute('data-theme');
    expect(after).not.toBe(before);
    expect(['light', 'dark']).toContain(after);
  });

  test('theme choice persists across reload', async ({ page }) => {
    await page.locator('.theme-toggle').click();
    const theme = await page.locator('html').getAttribute('data-theme');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  });
});
