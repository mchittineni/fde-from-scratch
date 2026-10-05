// Pure helpers shared by the app and the unit tests. Nothing here touches the DOM or storage.

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const pad = (n) => String(n).padStart(2, '0');
export const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
export const cleanTitle = (t) => t.replace(/^Pillar\s*\d+\s*:\s*/i, '');
export const todayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/* ---------- XP + ranks ---------- */
export const XP = { task: 50, lesson: 25, practiced: 15, studied: 40, sim: 100, diagnostic: 100, criterion: 30, drill: 75, story: 40, resource: 10, check: 10 };

export const RANKS = [
  { name: 'Recruit', min: 0 },
  { name: 'Field Associate', min: 300 },
  { name: 'Deployed Engineer', min: 900 },
  { name: 'Field Lead', min: 1800 },
  { name: 'Field CTO', min: 3000 }
];

// XP is derived from saved progress rather than stored, so it can never drift.
export function totalXP(s) {
  const n = (o) => Object.values(o).filter(Boolean).length;
  return n(s.tasks) * XP.task
    + n(s.lessons) * XP.lesson
    + n(s.practiced) * XP.practiced
    + n(s.studied) * XP.studied
    + Object.keys(s.sims).length * XP.sim
    + (s.diagDone ? XP.diagnostic : 0)
    + Object.values(s.projects).reduce((a, p) => a + n(p), 0) * XP.criterion
    + Object.values(s.drills).filter((d) => d.done).length * XP.drill
    + n(s.storiesAwarded) * XP.story
    + n(s.readRes) * XP.resource
    + Object.values(s.checks || {}).filter((c) => c.correct).length * XP.check;
}

export function rankFor(xp) {
  let i = 0;
  RANKS.forEach((r, idx) => { if (xp >= r.min) i = idx; });
  const next = RANKS[i + 1];
  return { ...RANKS[i], level: i + 1, next, toNext: next ? next.min - xp : 0, progress: next ? pct(xp - RANKS[i].min, next.min - RANKS[i].min) : 100 };
}

/* ---------- Simulator ---------- */
export const SIM_START = { trust: 70, integrity: 85, velocity: 80 };
export const gradeFor = (score) => (score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : 'D');
export const simScore = (run) => Math.round((run.trust + run.integrity + run.velocity) / 3);

// Apply an option's impact to a run in place; every meter stays within 0–100.
export function applyImpact(run, impact = {}) {
  const clamp = (v) => Math.max(0, Math.min(100, v));
  for (const k of ['trust', 'integrity', 'velocity']) run[k] = clamp(run[k] + (impact[k] || 0));
  return run;
}

/* ---------- Decomp drill clock ---------- */
export const fmtClock = (ms) => {
  const neg = ms < 0; const s = Math.floor(Math.abs(ms) / 1000);
  return `${neg ? '+' : ''}${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
};

// Which phase a drill is in after `ms` elapsed; past the end it stays on the last phase.
export function phaseAt(ms, phases) {
  let acc = 0;
  for (const ph of phases) { acc += ph.minutes * 60000; if (ms < acc) return ph.id; }
  return phases[phases.length - 1].id;
}
