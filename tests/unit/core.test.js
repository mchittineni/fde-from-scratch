import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  esc, pad, pct, cleanTitle, todayKey, XP, RANKS, rankFor, totalXP,
  SIM_START, gradeFor, simScore, applyImpact, fmtClock, phaseAt
} from '../../src/lib/core.js';
import { decompPhases } from '../../src/data/labs.js';

const emptyProgress = () => ({
  tasks: {}, lessons: {}, practiced: {}, studied: {}, sims: {}, diagDone: false,
  projects: {}, drills: {}, storiesAwarded: {}, readRes: {}
});

describe('esc', () => {
  test('escapes every HTML-significant character', () => {
    assert.equal(esc(`<img src=x onerror="alert('1')">&`), '&lt;img src=x onerror=&quot;alert(&#39;1&#39;)&quot;&gt;&amp;');
  });
  test('treats null and undefined as empty and stringifies other values', () => {
    assert.equal(esc(null), '');
    assert.equal(esc(undefined), '');
    assert.equal(esc(0), '0');
    assert.equal(esc(false), 'false');
  });
  test('leaves safe text unchanged', () => {
    assert.equal(esc('Forward Deployed Engineer — week 3'), 'Forward Deployed Engineer — week 3');
  });
});

describe('small helpers', () => {
  test('pad zero-pads to two digits', () => {
    assert.equal(pad(3), '03');
    assert.equal(pad(12), '12');
  });
  test('pct rounds and never divides by zero', () => {
    assert.equal(pct(1, 3), 33);
    assert.equal(pct(2, 3), 67);
    assert.equal(pct(5, 0), 0);
  });
  test('cleanTitle strips a "Pillar N:" prefix only', () => {
    assert.equal(cleanTitle('Pillar 2: Data Engineering'), 'Data Engineering');
    assert.equal(cleanTitle('pillar 10 :  Loop'), 'Loop');
    assert.equal(cleanTitle('Mock interviews'), 'Mock interviews');
  });
  test('todayKey uses local YYYY-MM-DD', () => {
    assert.equal(todayKey(new Date(2026, 0, 5)), '2026-01-05');
    assert.match(todayKey(), /^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('XP and ranks', () => {
  test('ranks are sorted and start at zero', () => {
    assert.equal(RANKS[0].min, 0);
    RANKS.slice(1).forEach((r, i) => assert.ok(r.min > RANKS[i].min, `${r.name} must need more XP than ${RANKS[i].name}`));
  });

  test('rankFor picks the highest rank reached', () => {
    assert.equal(rankFor(0).name, 'Recruit');
    assert.equal(rankFor(299).name, 'Recruit');
    assert.equal(rankFor(300).name, 'Field Associate');
    assert.equal(rankFor(300).level, 2);
  });

  test('rankFor reports distance and progress to the next rank', () => {
    const r = rankFor(600);
    assert.equal(r.next.name, 'Deployed Engineer');
    assert.equal(r.toNext, 300);
    assert.equal(r.progress, 50);
  });

  test('the top rank has no next rank and full progress', () => {
    const r = rankFor(1_000_000);
    assert.equal(r.name, 'Field CTO');
    assert.equal(r.next, undefined);
    assert.equal(r.toNext, 0);
    assert.equal(r.progress, 100);
  });

  test('totalXP is zero for a new learner', () => {
    assert.equal(totalXP(emptyProgress()), 0);
  });

  test('totalXP counts only truthy flags and completed drills', () => {
    const s = emptyProgress();
    s.tasks = { a: true, b: false, c: true };
    s.lessons = { o1: true };
    s.practiced = { q1: true };
    s.studied = { cs1: true };
    s.sims = { sim1: 40, sim2: 90 }; // any recorded score counts, even a low one
    s.diagDone = true;
    s.projects = { p1: { c1: true, c2: true }, p2: { c1: false } };
    s.drills = { d1: { done: true }, d2: { done: false } };
    s.storiesAwarded = { s1: true };
    s.readRes = { r1: true, r2: true };
    const expected = 2 * XP.task + XP.lesson + XP.practiced + XP.studied + 2 * XP.sim
      + XP.diagnostic + 2 * XP.criterion + XP.drill + XP.story + 2 * XP.resource;
    assert.equal(totalXP(s), expected);
  });

  test('totalXP counts only correctly answered knowledge checks, and tolerates older saves without them', () => {
    const s = emptyProgress();
    assert.equal(totalXP(s), 0); // no checks key at all
    s.checks = { 'o1-c1': { pick: 1, correct: true }, 'o2-c1': { pick: 0, correct: false } };
    assert.equal(totalXP(s), XP.check);
  });
});

describe('simulator scoring', () => {
  test('gradeFor boundaries', () => {
    assert.equal(gradeFor(100), 'A');
    assert.equal(gradeFor(85), 'A');
    assert.equal(gradeFor(84), 'B');
    assert.equal(gradeFor(70), 'B');
    assert.equal(gradeFor(69), 'C');
    assert.equal(gradeFor(55), 'C');
    assert.equal(gradeFor(54), 'D');
    assert.equal(gradeFor(0), 'D');
  });

  test('simScore is the rounded mean of the three meters', () => {
    assert.equal(simScore(SIM_START), Math.round((70 + 85 + 80) / 3));
    assert.equal(simScore({ trust: 100, integrity: 100, velocity: 99 }), 100);
  });

  test('applyImpact adds deltas and clamps to 0–100', () => {
    const run = { ...SIM_START };
    applyImpact(run, { trust: 50, integrity: -200 });
    assert.deepEqual(run, { trust: 100, integrity: 0, velocity: 80 });
  });

  test('applyImpact ignores missing impact and unknown keys', () => {
    const run = { ...SIM_START };
    applyImpact(run);
    applyImpact(run, { morale: 30 });
    assert.deepEqual(run, SIM_START);
  });

  test('applyImpact does not mutate SIM_START when given a copy', () => {
    applyImpact({ ...SIM_START }, { trust: -70 });
    assert.equal(SIM_START.trust, 70);
  });
});

describe('decomp drill clock', () => {
  test('fmtClock formats mm:ss and marks overtime with +', () => {
    assert.equal(fmtClock(45 * 60000), '45:00');
    assert.equal(fmtClock(61_999), '01:01');
    assert.equal(fmtClock(0), '00:00');
    assert.equal(fmtClock(-5_000), '+00:05');
  });

  test('phaseAt walks the phases by their minutes', () => {
    const min = 60000;
    assert.equal(phaseAt(0, decompPhases), decompPhases[0].id);
    assert.equal(phaseAt(decompPhases[0].minutes * min - 1, decompPhases), decompPhases[0].id);
    assert.equal(phaseAt(decompPhases[0].minutes * min, decompPhases), decompPhases[1].id);
  });

  test('phaseAt stays on the last phase once time runs out', () => {
    const total = decompPhases.reduce((a, p) => a + p.minutes, 0) * 60000;
    assert.equal(phaseAt(total, decompPhases), decompPhases.at(-1).id);
    assert.equal(phaseAt(total * 3, decompPhases), decompPhases.at(-1).id);
  });

  test('the drill is 45 minutes long', () => {
    assert.equal(decompPhases.reduce((a, p) => a + p.minutes, 0), 45);
  });
});
