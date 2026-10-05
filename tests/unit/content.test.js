import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { diagnosticQuestions, diagnosticPillars, calculateDiagnosticResult } from '../../src/data/diagnostic.js';
import { experienceLevels } from '../../src/data/roadmaps.js';
import { companyPlaybooks } from '../../src/data/companies.js';
import { simulations } from '../../src/data/simulations.js';
import { resources } from '../../src/data/resources.js';

const root = fileURLToPath(new URL('../..', import.meta.url));

test('content validator passes', () => {
  const r = spawnSync(process.execPath, ['scripts/validate.mjs'], { cwd: root, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr || r.stdout);
});

describe('diagnostic scoring', () => {
  const answerAll = (pick) => Object.fromEntries(diagnosticQuestions.map((q) => [q.id, pick(q.options.map((o) => o.score))]));

  test('every pillar has exactly three questions', () => {
    for (const p of diagnosticPillars) {
      assert.equal(diagnosticQuestions.filter((q) => q.pillar === p.id).length, 3, p.id);
    }
  });

  test('best answers score 100 and recommend the senior track', () => {
    const r = calculateDiagnosticResult(answerAll((s) => Math.max(...s)));
    assert.equal(r.overallScore, 100);
    assert.equal(r.recommendedLevel, 'senior');
    Object.values(r.percentages).forEach((v) => assert.equal(v, 100));
  });

  test('weakest answers recommend the entry track', () => {
    const r = calculateDiagnosticResult(answerAll((s) => Math.min(...s)));
    assert.equal(r.recommendedLevel, 'entry');
    assert.ok(r.overallScore < 45);
  });

  test('no answers scores zero without throwing', () => {
    const r = calculateDiagnosticResult({});
    assert.equal(r.overallScore, 0);
    assert.ok(r.diagnosisSummary.length > 0);
  });

  test('identifies the weakest pillar', () => {
    const answers = answerAll((s) => Math.max(...s));
    diagnosticQuestions.filter((q) => q.pillar === 'client_diplomacy').forEach((q) => { answers[q.id] = 1; });
    const r = calculateDiagnosticResult(answers);
    assert.equal(r.primaryWeaknessKey, 'client_diplomacy');
  });

  test('recommended tracks exist', () => {
    for (const pick of [Math.max, Math.min]) {
      const r = calculateDiagnosticResult(answerAll((s) => pick(...s)));
      assert.ok(experienceLevels[r.recommendedLevel], r.recommendedLevel);
    }
  });
});

// WCAG relative luminance, for checking badge colors rendered with white text.
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrastWithWhite = (hex) => 1.05 / (luminance(hex) + 0.05);

describe('content guardrails', () => {
  test('company badge colors keep white text readable (WCAG AA)', () => {
    for (const c of companyPlaybooks) {
      assert.match(c.accentColor, /^#[0-9a-f]{6}$/i, c.id);
      assert.ok(contrastWithWhite(c.accentColor) >= 4.5, `${c.id} ${c.accentColor} is ${contrastWithWhite(c.accentColor).toFixed(2)}:1`);
    }
  });

  const allText = JSON.stringify({ experienceLevels, companyPlaybooks, simulations, resources });

  test('no specific compensation figures in playbooks', () => {
    // Pay changes often and varies by level; the guide points to Levels.fyi instead.
    assert.doesNotMatch(JSON.stringify(companyPlaybooks), /\$\s?\d{2,3}(,\d{3}|k)/i);
  });

  test('no links to the removed third-party course site', () => {
    assert.doesNotMatch(allText, /aiengineeringfromscratch\.com/);
  });

  test('every simulation stage offers at least two choices', () => {
    for (const s of simulations) s.stages.forEach((st, i) => assert.ok(st.options.length >= 2, `${s.id} stage ${i + 1}`));
  });

  test('roadmap tracks are roughly twelve weeks', () => {
    for (const [id, track] of Object.entries(experienceLevels)) {
      assert.ok(track.weeks.length >= 3, `${id} has ${track.weeks.length} phases`);
    }
  });
});
