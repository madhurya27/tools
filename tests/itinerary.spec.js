import { test, expect } from '@playwright/test';

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const STRUCTURED = `Tokyo & Kyoto Trip

Day 1 – June 3, 2027
  14:00  Flight JL123 arrives at Narita Airport
  16:30  Check in at Park Hyatt Tokyo
  19:30  Dinner at Ichiran Ramen

Day 2 – June 4, 2027
  09:00  Senso-ji Temple, Asakusa
  12:00  Lunch in Shibuya
  20:00  Dinner at Gonpachi Izakaya

Day 3 – June 5, 2027
  11:00  Check out of Park Hyatt
  14:30  Flight JL456 departs Narita`;

const EMAIL = `From: American Airlines <noreply@aa.com>
Subject: Your flight is confirmed

DEPARTING
New York (JFK)
Wednesday, June 11, 2027
7:00 PM

ARRIVING
London (LHR)
Thursday, June 12, 2027
7:15 AM

Flight: AA 100

Hotel: The Savoy
Check-in: Thursday, June 12, 2027
Check-out: Friday, June 20, 2027`;

const UNRECOGNIZABLE = 'Just some random text with no dates or travel info.';


// ─── Helpers ──────────────────────────────────────────────────────────────────

async function visualize(page, text) {
  await page.locator('#raw-input').fill(text);
  await page.locator('button', { hasText: 'Visualize' }).click();
  await expect(page.locator('#itinerary-view')).toBeVisible();
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('Itinerary – initial state', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/tools/itinerary.html'); });

  test('input view visible, itinerary view hidden on load', async ({ page }) => {
    await expect(page.locator('#input-view')).toBeVisible();
    await expect(page.locator('#itinerary-view')).toBeHidden();
  });

  test('empty input does nothing', async ({ page }) => {
    await page.locator('button', { hasText: 'Visualize' }).click();
    await expect(page.locator('#input-view')).toBeVisible();
    await expect(page.locator('#itinerary-view')).toBeHidden();
  });
});

test.describe('Itinerary – structured parsing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/itinerary.html');
    await visualize(page, STRUCTURED);
  });

  test('shows itinerary view with day cards', async ({ page }) => {
    await expect(page.locator('#days-grid .day-card')).toHaveCount(3);
  });

  test('infers title from first line', async ({ page }) => {
    await expect(page.locator('#trip-title')).toContainText('Tokyo');
  });

  test('trip meta shows day count', async ({ page }) => {
    await expect(page.locator('#trip-meta')).toContainText('3 days');
  });

  test('day labels are shown', async ({ page }) => {
    const labels = page.locator('.day-label');
    await expect(labels.first()).toContainText('Day 1');
  });

  test('flight events get flight icon', async ({ page }) => {
    const flightIcons = page.locator('.event-icon[data-icon="flight"]');
    await expect(flightIcons.first()).toBeVisible();
  });

  test('hotel events get hotel icon', async ({ page }) => {
    const hotelIcons = page.locator('.event-icon[data-icon="hotel"]');
    await expect(hotelIcons.first()).toBeVisible();
  });

  test('food events get food icon', async ({ page }) => {
    const foodIcons = page.locator('.event-icon[data-icon="food"]');
    await expect(foodIcons.first()).toBeVisible();
  });

  test('timed events show time', async ({ page }) => {
    await expect(page.locator('.event-time').first()).toContainText('14:00');
  });

  test('no parse warning shown for structured itinerary', async ({ page }) => {
    await expect(page.locator('#parse-warning')).toBeHidden();
  });
});

test.describe('Itinerary – email parsing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/itinerary.html');
    await visualize(page, EMAIL);
  });

  test('extracts flight from route pattern', async ({ page }) => {
    const grid = page.locator('#days-grid');
    await expect(grid).toContainText('JFK');
    await expect(grid).toContainText('LHR');
  });

  test('extracts hotel check-in and check-out', async ({ page }) => {
    const grid = page.locator('#days-grid');
    await expect(grid).toContainText('Check in');
    await expect(grid).toContainText('Check out');
  });

  test('infers title from flight destination with date range', async ({ page }) => {
    await expect(page.locator('#trip-title')).toContainText('London · Jun');
  });

  test('trip meta shows calendar span, not card count', async ({ page }) => {
    // EMAIL has 3 day cards (Jun 11, Jun 12, Jun 20) but spans 10 calendar days
    await expect(page.locator('#trip-meta')).toContainText('10 days');
  });

  test('day labels reflect calendar offset from trip start', async ({ page }) => {
    const labels = page.locator('.day-label');
    // Jun 11 = Day 1, Jun 12 = Day 2, Jun 20 = Day 10
    await expect(labels.nth(0)).toContainText('Day 1');
    await expect(labels.nth(1)).toContainText('Day 2');
    await expect(labels.nth(2)).toContainText('Day 10');
  });
});


test.describe('Itinerary – parse warning', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/tools/itinerary.html'); });

  test('shows warning for unrecognizable input', async ({ page }) => {
    await visualize(page, UNRECOGNIZABLE);
    await expect(page.locator('#parse-warning')).toBeVisible();
  });
});

test.describe('Itinerary – navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/itinerary.html');
    await visualize(page, STRUCTURED);
  });

  test('back button returns to input view', async ({ page }) => {
    await page.locator('button', { hasText: '← Back' }).click();
    await expect(page.locator('#input-view')).toBeVisible();
    await expect(page.locator('#itinerary-view')).toBeHidden();
  });

  test('raw input retains text after going back', async ({ page }) => {
    await page.locator('button', { hasText: '← Back' }).click();
    await expect(page.locator('#raw-input')).toHaveValue(STRUCTURED);
  });
});

test.describe('Itinerary – examples', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/tools/itinerary.html'); });

  test('structured example button fills textarea', async ({ page }) => {
    await page.locator('button', { hasText: 'Itinerary example' }).click();
    const value = await page.locator('#raw-input').inputValue();
    expect(value.length).toBeGreaterThan(100);
    expect(value).toContain('Day 1');
  });

  test('email example button fills textarea', async ({ page }) => {
    await page.locator('button', { hasText: 'Email example' }).click();
    const value = await page.locator('#raw-input').inputValue();
    expect(value.length).toBeGreaterThan(100);
    expect(value).toContain('DEPARTING');
  });

  test('structured example parses successfully', async ({ page }) => {
    await page.locator('button', { hasText: 'Itinerary example' }).click();
    await page.locator('button', { hasText: 'Visualize' }).click();
    await expect(page.locator('#days-grid .day-card')).toHaveCount(8);
  });

  test('email example parses successfully', async ({ page }) => {
    await page.locator('button', { hasText: 'Email example' }).click();
    await page.locator('button', { hasText: 'Visualize' }).click();
    await expect(page.locator('#days-grid .day-card')).not.toHaveCount(0);
  });
});

test.describe('Itinerary – edit mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/itinerary.html');
    await visualize(page, STRUCTURED);
  });

  test('edit toggle button text changes to "Done editing"', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await expect(page.locator('#edit-toggle')).toHaveText('Done editing');
  });

  test('itinerary doc gets edit-mode class', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await expect(page.locator('#itinerary-view')).toHaveClass(/edit-mode/);
  });

  test('delete buttons appear in edit mode', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await expect(page.locator('.delete-btn').first()).toBeVisible();
  });

  test('add event buttons appear in edit mode', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await expect(page.locator('.add-event-btn').first()).toBeVisible();
  });

  test('deleting an event removes it from the DOM', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    const initialCount = await page.locator('.event').count();
    await page.locator('.delete-btn').first().click();
    await expect(page.locator('.event')).toHaveCount(initialCount - 1);
  });

  test('adding an event inserts a new event row', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    const initialCount = await page.locator('.event').count();
    await page.locator('.add-event-btn').first().click();
    await expect(page.locator('.event')).toHaveCount(initialCount + 1);
  });

  test('done editing hides delete buttons', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await page.locator('#edit-toggle').click();
    await expect(page.locator('#edit-toggle')).toHaveText('Edit');
    await expect(page.locator('#itinerary-view')).not.toHaveClass(/edit-mode/);
  });

  test('cycling icon changes the icon', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    const icon = page.locator('.event-icon').first();
    const before = await icon.getAttribute('data-icon');
    await icon.click();
    const after = await icon.getAttribute('data-icon');
    expect(after).not.toBe(before);
  });

  test('trip title is editable in edit mode', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    const title = page.locator('#trip-title');
    await title.click();
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.type('My Edited Title');
    await expect(title).toContainText('My Edited Title');
  });

  test('add day button is visible in edit mode only', async ({ page }) => {
    await expect(page.locator('#add-day-btn')).toBeHidden();
    await page.locator('#edit-toggle').click();
    await expect(page.locator('#add-day-btn')).toBeVisible();
    await page.locator('#edit-toggle').click();
    await expect(page.locator('#add-day-btn')).toBeHidden();
  });

  test('add day button inserts a new day card', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    const before = await page.locator('#days-grid .day-card').count();
    await page.locator('#add-day-btn').click();
    await expect(page.locator('#days-grid .day-card')).toHaveCount(before + 1);
  });

  test('new day card has a date input and label', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await page.locator('#add-day-btn').click();
    const newCard = page.locator('#days-grid .day-card').last();
    await expect(newCard.locator('.day-label')).toContainText('Day ?');
    await expect(newCard.locator('input[type="date"]')).toBeVisible();
  });

  test('new day card has an add event button', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await page.locator('#add-day-btn').click();
    const newCard = page.locator('#days-grid .day-card').last();
    await expect(newCard.locator('.add-event-btn')).toBeVisible();
  });

  test('picking a date replaces date input with day name', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await page.locator('#add-day-btn').click();
    // Fill date — card will reorder (only dated card → moves first); locate by content after
    await page.locator('input[type="date"].day-date-input').fill('2027-06-10');
    await expect(page.locator('.day-name', { hasText: 'June 10, 2027' })).toBeVisible();
    await expect(page.locator('input[type="date"].day-date-input')).toHaveCount(0);
  });

  test('new day slots into correct calendar position', async ({ page }) => {
    // EMAIL has Day 1 (Jun 11), Day 2 (Jun 12), Day 10 (Jun 20)
    // Adding Jun 15 = Day 5 from Jun 11 (offset 4), should slot between Day 2 and Day 10
    await page.goto('/tools/itinerary.html');
    await visualize(page, EMAIL);
    await page.locator('#edit-toggle').click();
    await page.locator('#add-day-btn').click();
    await page.locator('#days-grid .day-card').last().locator('input[type="date"]').fill('2027-06-15');
    // Day 5 (Jun 15) should now appear before Day 10 (Jun 20)
    const labels = page.locator('.day-label');
    const count = await labels.count();
    const fourthLabel = await labels.nth(count - 2).textContent(); // second-to-last
    expect(fourthLabel).toContain('Day 5');
  });

  test('adding a day extending the trip updates trip meta', async ({ page }) => {
    // STRUCTURED spans Jun 3–5 (3 days); adding Jun 20 extends to 18 days
    await page.locator('#edit-toggle').click();
    await page.locator('#add-day-btn').click();
    await page.locator('#days-grid .day-card').last().locator('input[type="date"]').fill('2027-06-20');
    await expect(page.locator('#trip-meta')).toContainText('18 days');
  });
});

test.describe('Itinerary – shareable link', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/itinerary.html');
    await visualize(page, STRUCTURED);
  });

  test('copy link writes a URL with ?d= param to clipboard', async ({ page }) => {
    await page.locator('button', { hasText: 'Copy shareable link' }).click();
    const url = await page.evaluate(() => navigator.clipboard.readText());
    expect(url).toContain('?d=');
    // URL-safe base64 — no percent-encoded chars that break iMessage link detection
    expect(url).not.toMatch(/%2B|%2F|%3D/i);
  });

  test('copy link shows confirmation message', async ({ page }) => {
    await page.locator('button', { hasText: 'Copy shareable link' }).click();
    await expect(page.locator('#copy-confirm')).toBeVisible();
    await expect(page.locator('#copy-confirm')).toBeHidden({ timeout: 4000 });
  });

  test('loading a ?d= URL restores the itinerary without input view', async ({ page }) => {
    await page.locator('button', { hasText: 'Copy shareable link' }).click();
    const url = await page.evaluate(() => navigator.clipboard.readText());
    await page.goto(url);
    await expect(page.locator('#itinerary-view')).toBeVisible();
    await expect(page.locator('#input-view')).toBeHidden();
    await expect(page.locator('#days-grid .day-card')).toHaveCount(3);
  });

  test('shareable link preserves calendar-span day count', async ({ page, context }) => {
    // Visualize EMAIL (3 cards, 10-day span) then round-trip through the share URL
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/itinerary.html');
    await visualize(page, EMAIL);
    await page.locator('button', { hasText: 'Copy shareable link' }).click();
    const url = await page.evaluate(() => navigator.clipboard.readText());
    await page.goto(url);
    await expect(page.locator('#trip-meta')).toContainText('10 days');
  });

  test('shareable link preserves edited title', async ({ page }) => {
    await page.locator('#edit-toggle').click();
    await page.locator('#trip-title').fill('Custom Title');
    await page.locator('#edit-toggle').click();
    await page.locator('button', { hasText: 'Copy shareable link' }).click();
    const url = await page.evaluate(() => navigator.clipboard.readText());
    await page.goto(url);
    await expect(page.locator('#trip-title')).toContainText('Custom Title');
  });
});

test.describe('Itinerary – theme toggle', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/tools/itinerary.html'); });

  test('theme toggle switches between light and dark', async ({ page }) => {
    const before = await page.locator('html').getAttribute('data-theme');
    await page.locator('.theme-toggle').click();
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
    expect(['light', 'dark']).toContain(after);
  });
});
