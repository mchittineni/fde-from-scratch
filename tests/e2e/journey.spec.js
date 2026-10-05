import { test, expect, seedProgress } from './fixtures.js';

test('onboarding picks a track and target, then opens the journey', async ({ page }) => {
  await page.goto('#/');
  await page.getByRole('link', { name: 'Start my journey' }).first().click();
  await page.click('[data-role="mid"]');
  await expect(page.locator('[data-role="mid"]')).toHaveAttribute('aria-checked', 'true');
  await page.click('[data-action="onboard-next"]');
  await page.click('[data-action="pick-target"][data-id="palantir"]');
  await page.click('[data-action="onboard-next"]');
  await page.click('[data-action="onboard-finish"]');

  await expect(page.locator('.journey')).toBeVisible();
  await expect(page.locator('#station-loop h2')).toContainText('Palantir');
  await expect(page.locator('#stn-orientation')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('fde_role'))).toBe('"mid"');
});

test.describe('with a saved track', () => {
  test.beforeEach(async ({ page }) => {
    await seedProgress(page, { fde_role: 'mid', fde_onboarded: true });
  });

  test('reading every orientation lesson clears station 00', async ({ page }) => {
    await page.goto('#/journey');
    await page.locator('.next-up a', { hasText: 'Start reading' }).click();
    await expect(page.locator('.article')).toBeVisible();
    // keep clicking "continue" until the last lesson sends us back to the journey
    for (let guard = 0; !page.url().endsWith('#/journey'); guard++) {
      expect(guard, 'orientation should end within 20 lessons').toBeLessThan(20);
      const url = page.url();
      await page.click('[data-action="lesson-done"]');
      await page.waitForURL((u) => u.href !== url);
    }
    await expect(page.locator('.journey')).toBeVisible();
    await expect(page.locator('#station-orientation')).toHaveClass(/done/);
    await expect(page.locator('#station-mid-0')).toHaveClass(/current/);
  });

  test('ticking a milestone awards XP and survives a reload', async ({ page }) => {
    await page.goto('#/journey');
    await page.click('[data-action="toggle-station"][data-id="mid-0"]');
    const xpBefore = await page.locator('#xpPill').textContent();
    await page.locator('#stn-mid-0 .task').first().click();
    await expect(page.locator('#stn-mid-0 input[data-task]').first()).toBeChecked();
    await expect(page.locator('#xpPill')).not.toHaveText(xpBefore);
    await expect(page.locator('.toast')).toContainText('+50 XP');

    await page.reload();
    await page.click('[data-action="toggle-station"][data-id="mid-0"]');
    await expect(page.locator('#stn-mid-0 input[data-task]').first()).toBeChecked();
  });

  test('stations collapse and expand', async ({ page }) => {
    await page.goto('#/journey');
    await page.click('[data-action="expand-all"]');
    await expect(page.locator('#stn-mid-0')).toBeVisible();
    await page.click('[data-action="toggle-station"][data-id="mid-0"]');
    await expect(page.locator('#stn-mid-0')).toBeHidden();
  });

  test('every station links to real resources and portfolio projects', async ({ page }) => {
    await page.goto('#/journey');
    await page.click('[data-action="expand-all"]');
    const links = await page.locator('.resource-link').evaluateAll((as) => as.map((a) => a.href));
    expect(links.length).toBeGreaterThanOrEqual(10);
    for (const h of links) expect(h).toMatch(/^https:\/\//);
    expect(await page.locator('a[href^="#/labs/projects/"]').count()).toBeGreaterThanOrEqual(3);
  });

  test('switching track keeps earlier progress', async ({ page }) => {
    await page.goto('#/journey');
    await page.click('[data-action="toggle-station"][data-id="mid-0"]');
    await page.locator('#stn-mid-0 .task').first().click();
    const tasks = await page.evaluate(() => localStorage.getItem('fde_tasks'));
    await page.goto('#/start');
    await page.click('[data-role="senior"]');
    expect(await page.evaluate(() => localStorage.getItem('fde_tasks'))).toBe(tasks);
  });
});

test('corrupt saved data does not break the app', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('fde_role', '"not-a-track"');
    localStorage.setItem('fde_tasks', '{not json');
  });
  await page.goto('#/journey');
  await expect(page.locator('.journey')).toBeVisible();
});
