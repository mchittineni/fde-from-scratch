import { test, expect } from './fixtures.js';

test('library lists every resource and filters by topic and price', async ({ page }) => {
  await page.goto('#/library');
  const all = await page.locator('.lib-card').count();
  expect(all).toBeGreaterThanOrEqual(50);

  await page.click('[data-action="lib-topic"][data-topic="ai"]');
  const ai = await page.locator('.lib-card').count();
  expect(ai).toBeGreaterThan(0);
  expect(ai).toBeLessThan(all);

  await page.click('[data-action="lib-free"]');
  expect(await page.locator('.lib-card').count()).toBeLessThanOrEqual(ai);
});

test('topic deep link preselects the filter', async ({ page }) => {
  await page.goto('#/library?t=security');
  await expect(page.locator('[data-topic="security"]')).toHaveAttribute('aria-pressed', 'true');
});

test('marking a resource done is saved', async ({ page }) => {
  await page.goto('#/library');
  await page.locator('[data-action="toggle-resource"]').first().click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('fde_resources'))).toContain('true');
});
