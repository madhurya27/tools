import { test, expect } from '@playwright/test';

test('homepage shows both tool cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.tool-card')).toHaveCount(2);
  await expect(page.locator('a.tool-card[href="itinerary.html"]')).toBeVisible();
  await expect(page.locator('a.tool-card[href="phonetic-converter.html"]')).toBeVisible();
});

test('theme toggle switches between light and dark', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await page.locator('button[aria-label]').click();
  const theme = await html.getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
});
