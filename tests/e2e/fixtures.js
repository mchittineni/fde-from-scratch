// Shared fixtures: every test fails if the page logs an error or throws.
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await use(page);
    expect(errors, 'console and page errors').toEqual([]);
  }
});

export { expect };

// Every route the router knows, with one deep link per parameterized route.
export const ROUTES = [
  '#/', '#/start', '#/journey', '#/orientation/what-is-an-fde', '#/orientation/fde-vs-other-roles',
  '#/labs', '#/labs/diagnostic', '#/labs/simulator', '#/labs/simulator/sim_airgap_bank',
  '#/labs/cases', '#/labs/cases/cs_ontology', '#/labs/questions', '#/labs/projects', '#/labs/projects/p-rag',
  '#/labs/decomp', '#/labs/decomp/d3', '#/labs/stories', '#/library', '#/playbooks', '#/playbooks/palantir'
];

// Skip onboarding by seeding the saved track before the app boots.
export async function seedProgress(page, values = {}) {
  await page.addInitScript((v) => {
    if (sessionStorage.getItem('seeded')) return; // only seed once, so reloads keep real progress
    sessionStorage.setItem('seeded', '1');
    for (const [k, val] of Object.entries(v)) localStorage.setItem(k, JSON.stringify(val));
  }, values);
}
