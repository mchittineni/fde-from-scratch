import { test, expect, ROUTES } from './fixtures.js';

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

test('mobile tab bar navigates', async ({ page }) => {
  await page.goto('#/');
  await expect(page.locator('#tabbar')).toBeVisible();
  await page.locator('#tabbar').getByRole('link', { name: /Labs/ }).click();
  await expect(page).toHaveURL(/#\/labs$/);
});
