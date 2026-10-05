import AxeBuilder from '@axe-core/playwright';
import { test, expect, seedProgress } from './fixtures.js';

test('theme toggle switches and remembers light mode', async ({ page }) => {
  await page.goto('#/');
  await page.click('#themeToggle');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

// Pages that cover every component type. Serious and critical axe violations fail the build.
const A11Y_ROUTES = ['#/', '#/journey', '#/orientation/fde-vs-other-roles', '#/orientation/field-triage', '#/labs', '#/labs/diagnostic',
  '#/labs/simulator/sim_airgap_bank', '#/labs/questions', '#/labs/decomp/d1', '#/labs/stories', '#/library', '#/playbooks/palantir'];

for (const scheme of ['dark', 'light']) {
  test.describe(`accessibility (${scheme})`, () => {
    test.use({ colorScheme: scheme, reducedMotion: 'reduce' }); // settle transitions before measuring contrast
    test.beforeEach(async ({ page }) => { await seedProgress(page, { fde_role: 'mid', fde_onboarded: true }); });
    for (const route of A11Y_ROUTES) {
      test(route, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator('#app h1').first()).toBeVisible();
        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact));
        expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')})`)).toEqual([]);
      });
    }
  });
}
