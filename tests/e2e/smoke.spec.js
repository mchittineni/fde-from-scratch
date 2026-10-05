import { test, expect, ROUTES } from './fixtures.js';

test.describe('every route renders', () => {
  for (const route of ROUTES) {
    test(route, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('#app h1').first()).toBeVisible();
      await expect(page).toHaveTitle(/· FDE from Scratch$/);
    });
  }
});

test('unknown routes show a not-found view', async ({ page }) => {
  await page.goto('#/does-not-exist');
  await expect(page.locator('#app')).toContainText("That page doesn't exist");
  await expect(page.locator('#app a[href="#/"]').first()).toBeVisible();
});

test('primary navigation reaches each section and marks it current', async ({ page }) => {
  await page.goto('#/');
  for (const [label, hash] of [['Journey', '#/journey'], ['Labs', '#/labs'], ['Library', '#/library'], ['Playbooks', '#/playbooks']]) {
    await page.locator('#primaryNav').getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`${hash.replace('/', '\\/')}$`));
    await expect(page.locator('#primaryNav').getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page');
  }
});

test('support and companion guide links are present', async ({ page }) => {
  await page.goto('#/');
  const hrefs = await page.locator('a').evaluateAll((as) => as.map((a) => a.href));
  for (const url of [
    'https://buymeacoffee.com/mchittineni',
    'https://github.com/sponsors/mchittineni',
    'https://github.com/mchittineni/ultimate-devops-guide',
    'https://github.com/mchittineni/ultimate-ai-engineering-guide',
    'https://github.com/mchittineni/ultimate-platform-engineering-guide'
  ]) expect(hrefs).toContain(url);
});

test('external links open safely in a new tab', async ({ page }) => {
  await page.goto('#/library');
  const bad = await page.locator('a[target="_blank"]').evaluateAll((as) =>
    as.filter((a) => !/noopener/.test(a.rel)).map((a) => a.href));
  expect(bad).toEqual([]);
});

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto('#/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});
