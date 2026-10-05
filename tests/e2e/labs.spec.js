import { test, expect, seedProgress } from './fixtures.js';

test.beforeEach(async ({ page }) => {
  await seedProgress(page, { fde_role: 'mid', fde_onboarded: true });
});

test('labs hub lists all seven labs', async ({ page }) => {
  await page.goto('#/labs');
  await expect(page.locator('.lab-tile')).toHaveCount(7);
});

test('diagnostic can be completed with the keyboard', async ({ page }) => {
  await page.goto('#/labs/diagnostic');
  await expect(page.locator('.quiz')).toBeVisible();
  const total = 15;
  for (let i = 1; i <= total; i++) {
    await expect(page.locator('.quiz-top')).toContainText(`QUESTION ${String(i).padStart(2, '0')}`);
    await page.keyboard.press(String((i % 3) + 1));
  }
  await page.click('[data-action="quiz-finish"]');
  await expect(page.locator('.radar')).toBeVisible();
  await expect(page.locator('main')).toContainText('Close the gap');
  expect(await page.evaluate(() => localStorage.getItem('fde_diag_done'))).toBe('true');
});

test('field simulator runs to a graded debrief', async ({ page }) => {
  await page.goto('#/labs/simulator');
  await page.locator('.sim-card').first().click();
  for (let s = 0; s < 10 && !(await page.locator('.grade').count()); s++) {
    await page.locator('[data-action="sim-pick"]').nth(1).click();
    await page.click('[data-action="sim-next"]');
  }
  await expect(page.locator('.grade')).toHaveText(/^[ABCD]$/);
  expect(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('fde_sims'))).length)).toBe(1);
});

test('the scope-creep simulation loads by deep link', async ({ page }) => {
  await page.goto('#/labs/simulator/sim_scope_creep');
  await expect(page.locator('h1')).toContainText('Scope Ambush');
});

test.describe('question bank', () => {
  test('category deep link filters the list', async ({ page }) => {
    await page.goto(`#/labs/questions?c=${encodeURIComponent('Enterprise AI & LLMs')}`);
    const cats = await page.locator('.q-card .chip-blue').allTextContents();
    expect(cats.length).toBeGreaterThan(0);
    expect(new Set(cats)).toEqual(new Set(['Enterprise AI & LLMs']));
  });

  test('search filters and keeps focus while typing', async ({ page }) => {
    await page.goto('#/labs/questions');
    await page.fill('#qSearch', 'spark');
    await expect(page.locator('.q-card')).toHaveCount(1);
    await expect(page.locator('#qSearch')).toBeFocused();
  });

  test('search input is rendered as text, not HTML', async ({ page }) => {
    await page.goto('#/labs/questions');
    await page.fill('#qSearch', '<img src=x onerror=window.__xss=1>');
    expect(await page.evaluate(() => window.__xss)).toBeUndefined();
    await expect(page.locator('#app img[src="x"]')).toHaveCount(0);
  });

  test('marking a question practiced keeps the card open', async ({ page }) => {
    await page.goto('#/labs/questions');
    await page.locator('.q-card summary').first().click();
    await page.locator('[data-action="toggle-practiced"]').first().click();
    await expect(page.locator('.q-card').first()).toHaveAttribute('open', '');
  });
});

test('studying a case and setting a target playbook', async ({ page }) => {
  await page.goto('#/labs/cases/cs_ontology');
  await expect(page.locator('.entity').first()).toBeVisible();
  await page.goto('#/playbooks/databricks');
  await page.click('[data-action="set-target"]');
  await expect(page.locator('[data-action="set-target"]')).toContainText('Your target');
  expect(await page.evaluate(() => localStorage.getItem('fde_target'))).toBe('"databricks"');
});

test('portfolio project ships when every criterion is met', async ({ page }) => {
  await page.goto('#/labs/projects');
  expect(await page.locator('.case-card').count()).toBeGreaterThanOrEqual(10);
  await page.goto('#/labs/projects/p-explorer');
  const criteria = page.locator('label.task');
  const n = await criteria.count();
  for (let i = 0; i < n; i++) await criteria.nth(i).click();
  await expect(page.locator('main')).toContainText('Shipped');
});

test.describe('decomp drill', () => {
  test('timer counts down, highlights the phase and pauses', async ({ page }) => {
    await page.clock.install({ time: new Date('2026-01-05T09:00:00') });
    await page.goto('#/labs/decomp/d1');
    await page.clock.pauseAt(new Date('2026-01-05T09:00:01'));
    await expect(page.locator('#drillClock')).toHaveText('45:00');
    await page.click('[data-action="drill-start"]');
    await page.clock.runFor(65_000);
    await expect(page.locator('#drillClock')).toHaveText('43:55');
    await expect(page.locator('[data-phase-row="scope"]')).toHaveClass(/active/);
    await page.clock.runFor(5 * 60_000);
    await expect(page.locator('[data-phase-row="entities"]')).toHaveClass(/active/);

    await page.click('[data-action="drill-pause"]');
    const paused = await page.locator('#drillClock').textContent();
    await page.clock.runFor(60_000);
    await expect(page.locator('#drillClock')).toHaveText(paused);
    await expect(page.locator('[data-action="drill-start"]')).toContainText('Resume');
  });

  test('notes, twist and completion persist across reloads', async ({ page }) => {
    await page.goto('#/labs/decomp/d1');
    await page.fill('textarea[data-note="d1:scope"]', 'Operator is the terminal planner; metric is truck turn time.');
    await page.click('[data-action="drill-twist"]');
    await expect(page.locator('.twist')).toBeVisible();
    await page.locator('label.task').first().click();
    await page.click('[data-action="drill-complete"]');
    await expect(page.locator('.toast')).toContainText('Drill complete');
    await page.reload();
    await expect(page.locator('textarea[data-note="d1:scope"]')).toHaveValue(/terminal planner/);
  });

  test('prompt list shows all twelve prompts', async ({ page }) => {
    await page.goto('#/labs/decomp');
    expect(await page.locator('.case-card').count()).toBeGreaterThanOrEqual(12);
  });
});

test('story bank marks a complete STAR story and saves it', async ({ page }) => {
  await page.goto('#/labs/stories');
  for (const f of ['situation', 'task', 'action', 'result']) {
    await page.fill(`textarea[data-story="s1:${f}"]`, `Example ${f} text that is long enough to count.`);
  }
  await expect(page.locator('[data-story-status="s1"]')).toHaveText('Complete');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('fde_stories'))).toContain('Example action');
  await page.reload();
  await expect(page.locator('textarea[data-story="s1:action"]')).toHaveValue(/Example action/);
});
