import { test, expect, ROUTES, seedProgress } from './fixtures.js';

test.describe('mobile layout has no horizontal scroll', () => {
  for (const route of ROUTES) {
    test(route, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('#app h1').first()).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

// The journey renders its route map only once a track is saved, so check that state too.
test('mobile journey with a saved track has no horizontal scroll', async ({ page }) => {
  await seedProgress(page, { fde_role: 'mid', fde_onboarded: true });
  await page.goto('#/journey');
  await expect(page.locator('.dg-transit')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('mobile tab bar navigates', async ({ page }) => {
  await page.goto('#/');
  await expect(page.locator('#tabbar')).toBeVisible();
  await page.locator('#tabbar').getByRole('link', { name: /Labs/ }).click();
  await expect(page).toHaveURL(/#\/labs$/);
});
