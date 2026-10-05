import { test, expect, seedProgress } from './fixtures.js';

test.beforeEach(async ({ page }) => {
  await seedProgress(page, { fde_role: 'mid', fde_onboarded: true });
});

test.describe('interactive diagrams', () => {
  test('a selector button swaps only its diagram and keeps keyboard focus', async ({ page }) => {
    await page.goto('#/orientation/field-triage');
    const card = page.locator('#dg-triage');
    await expect(card.locator('.dg-inspector-title')).toHaveText('Name resolution');

    const tls = card.getByRole('button', { name: 'L3 TLS' });
    await tls.focus();
    await page.keyboard.press('Enter');
    await expect(card.locator('.dg-inspector-title')).toHaveText('TLS & proxies');
    await expect(card.getByRole('button', { name: 'L3 TLS' })).toHaveAttribute('aria-pressed', 'true');
    await expect(card.getByRole('button', { name: 'L3 TLS' })).toBeFocused();
    await expect(card.locator('.dg-status.is-ok')).toHaveCount(2);
  });

  test('clicking an SVG node selects it too', async ({ page }) => {
    await page.goto('#/orientation/proving-impact');
    await page.locator('#dg-flywheel g[data-value="upstream"]').click();
    await expect(page.locator('#dg-flywheel .dg-inspector-title')).toHaveText('Upstream');
    await expect(page.locator('#dg-flywheel button[data-value="upstream"]')).toHaveAttribute('aria-pressed', 'true');
  });

  test('a playbook round choice does not leak into another company', async ({ page }) => {
    await page.goto('#/playbooks/palantir');
    await page.locator('#dg-playbook').getByRole('button', { name: 'Round 4' }).click();
    await expect(page.locator('#dg-playbook .dg-chip')).toHaveText(/Round 4 of/);
    await page.goto('#/playbooks/databricks');
    await expect(page.locator('#dg-playbook .dg-chip')).toHaveText(/Round 1 of/);
  });
});

test.describe('knowledge checks', () => {
  test('a correct first answer locks the check, explains it and awards XP that survives a reload', async ({ page }) => {
    await page.goto('#/orientation/your-first-90-days');
    const check = page.locator('#check-o8-c2');
    await expect(page.locator('#xpPill')).toContainText('0 XP');
    await check.locator('.check-opt').nth(1).click();

    await expect(check).toHaveClass(/is-right/);
    await expect(check.locator('.check-explain')).toContainText('Correct.');
    await expect(check.locator('.check-explain')).toBeFocused();
    await expect(check.locator('.check-opt').first()).toBeDisabled();
    await expect(page.locator('#xpPill')).toContainText('10 XP');

    await page.reload();
    await expect(page.locator('#check-o8-c2')).toHaveClass(/is-right/);
    await expect(page.locator('#xpPill')).toContainText('10 XP');
  });

  test('a wrong answer reveals the right one without awarding XP', async ({ page }) => {
    await page.goto('#/orientation/field-triage');
    const check = page.locator('#check-o9-c1');
    await check.locator('.check-opt').first().click();
    await expect(check).toHaveClass(/is-wrong/);
    await expect(check.locator('.check-opt.is-answer')).toContainText('TLS-inspecting proxy');
    await expect(check.locator('.check-explain')).toContainText('Not quite.');
    await expect(page.locator('#xpPill')).toContainText('0 XP');
  });
});

test.describe('motion', () => {
  test('below-the-fold sections fade in as they scroll into view', async ({ page }) => {
    await page.goto('#/orientation/working-sustainably');
    const last = page.locator('.check').last();
    await expect(last).toHaveClass(/reveal/);
    await last.scrollIntoViewIfNeeded();
    await expect(last).toHaveClass(/is-in/);
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });
    test('nothing is hidden waiting for a scroll', async ({ page }) => {
      await page.goto('#/orientation/working-sustainably');
      await expect(page.locator('.article h1')).toBeVisible();
      await expect(page.locator('.reveal')).toHaveCount(0);
    });
  });
});
