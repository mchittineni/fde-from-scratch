import { experienceLevels } from './data/roadmaps.js';
import { diagnosticPillars, diagnosticQuestions, calculateDiagnosticResult } from './data/diagnostic.js';
import { companyPlaybooks } from './data/companies.js';
import { simulations } from './data/simulations.js';
import { caseStudies } from './data/caseStudies.js';
import { questionBank } from './data/questionBank.js';
import { orientationLessons } from './data/foundations.js';
import { resources, resourceTopics } from './data/resources.js';
import { portfolioProjects, decompPhases, decompRubric, decompPrompts, storyPrompts, starFields } from './data/labs.js';
import { esc, pad, pct, cleanTitle, todayKey, XP, rankFor, totalXP as totalXPFor, SIM_START, gradeFor, simScore, applyImpact, fmtClock, phaseAt as phaseAtFor } from './lib/core.js';
import { practiceFor, topicsFor, learnFor as learnForProgress, projectFor as projectForProgress, projectDone as projectDoneFor, topicById, resById } from './lib/journey.js';

/* ==========================================================================
   0. EXTERNAL LINKS
   ========================================================================== */
const SUPPORT = {
  bmc: 'https://buymeacoffee.com/mchittineni',
  sponsors: 'https://github.com/sponsors/mchittineni'
};

const REPO = 'https://github.com/mchittineni/fde-from-scratch';

const MORE_GUIDES = [
  {
    name: 'Ultimate DevOps Guide',
    repo: 'mchittineni/ultimate-devops-guide',
    url: 'https://github.com/mchittineni/ultimate-devops-guide',
    icon: 'infinity', tone: 'blue',
    text: 'CI/CD, containers, infrastructure as code, observability and SRE practice, from first commit to production on-call.'
  },
  {
    name: 'Ultimate AI Engineering Guide',
    repo: 'mchittineni/ultimate-ai-engineering-guide',
    url: 'https://github.com/mchittineni/ultimate-ai-engineering-guide',
    icon: 'zap', tone: 'violet',
    text: 'LLMs, retrieval, agents, evaluation and production inference — the applied AI stack every FDE now deploys.'
  },
  {
    name: 'Ultimate Platform Engineering Guide',
    repo: 'mchittineni/ultimate-platform-engineering-guide',
    url: 'https://github.com/mchittineni/ultimate-platform-engineering-guide',
    icon: 'layers', tone: 'amber',
    text: 'Internal developer platforms, Kubernetes, GitOps, multi-tenancy, policy as code, reliability and FinOps.'
  }
];

/* ==========================================================================
   1. STORAGE + STATE
   ========================================================================== */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      try { return JSON.parse(raw); } catch { return raw; } // legacy plain-string values
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }
};

const state = {
  role: experienceLevels[store.get('fde_role', '')] ? store.get('fde_role') : 'entry',
  onboarded: store.get('fde_onboarded', false),
  target: store.get('fde_target', null),
  tasks: store.get('fde_tasks', {}),
  lessons: store.get('fde_lessons', {}),
  quiz: store.get('fde_quiz_answers', {}),
  diagDone: store.get('fde_diag_done', false),
  practiced: store.get('fde_practiced', {}),
  studied: store.get('fde_studied', {}),
  sims: store.get('fde_sims', {}),
  activity: store.get('fde_activity', []),
  projects: store.get('fde_projects', {}),   // { projectId: { criterionId: true } }
  drills: store.get('fde_drills', {}),       // { promptId: { notes: {phaseId: text}, rubric: {id: true}, done } }
  stories: store.get('fde_stories', {}),     // { storyId: { situation, task, action, result } }
  storiesAwarded: store.get('fde_stories_awarded', {}),
  readRes: store.get('fde_resources', {}),   // { resourceId: true }
  // session-only UI state
  libTopic: 'all',
  libLevel: 'all',
  libFree: false,
  libSearch: '',
  drillLevel: 'all',
  drillTimer: null,                          // { promptId, startedAt, elapsedBefore, running }
  revealTwist: {},
  openStations: {},
  onboardStep: 1,
  quizIndex: 0,
  sim: null,
  qSearch: '',
  qCat: 'All'
};

function persist(key, stateKey) { store.set(key, state[stateKey]); }

/* ==========================================================================
   2. HELPERS
   Views are HTML template strings assigned via innerHTML. Every interpolated
   data value goes through esc(); the only user input (search) is escaped too.
   ========================================================================== */
const ICONS = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  flask: '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
  library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  infinity: '<path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>'
};

const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;

// The GitHub mark is a filled glyph, so it gets its own helper.
const githubMark = (cls = '') =>
  `<svg class="icon icon-fill ${cls}" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;


function ring(percent, size = 96, stroke = 8) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(100, Math.max(0, percent)) / 100);
  return `<svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle class="ring-track" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"/>
    <circle class="ring-fill" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"
      stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/>
  </svg>`;
}

function toast(message, xp) {
  const wrap = document.getElementById('toasts');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${xp ? `<span class="xp">+${xp} XP</span>` : icon('check', 'icon-sm')}<span>${esc(message)}</span>`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 2700);
}

function markActive() {
  const key = todayKey();
  if (!state.activity.includes(key)) {
    state.activity = [...state.activity, key].slice(-90);
    persist('fde_activity', 'activity');
  }
}

const supportButtons = (size = '') => `
  <a class="btn btn-bmc ${size}" href="${SUPPORT.bmc}" target="_blank" rel="noopener">${icon('coffee')} Buy me a coffee</a>
  <a class="btn btn-gh ${size}" href="${SUPPORT.sponsors}" target="_blank" rel="noopener">${githubMark()} Sponsor <span class="heart">${icon('heart', 'icon-sm')}</span></a>`;

/* ==========================================================================
   3. JOURNEY MODEL — stations, progress, XP, ranks
   ========================================================================== */

const LOOP_TASKS = [
  { id: 'loop1', text: 'Read your target company playbook end to end and write a one-page summary of its loop in your own words.', milestone: 'Playbook brief' },
  { id: 'loop2', text: 'Run every field simulation and earn an A grade on at least one of them.', milestone: 'Judgment under pressure' },
  { id: 'loop3', text: 'Complete every entry in the Story bank and rehearse each one out loud in under two minutes.', milestone: 'Behavioral story bank' },
  { id: 'loop5', text: 'Run three timed decomp drills, including at least one at the Deep level, and score yourself honestly.', milestone: 'Decomp under the clock' },
  { id: 'loop4', text: 'Run a full mock loop with a peer, using the playbook stages as the agenda.', milestone: 'Full loop rehearsal' }
];

const PILLAR_STYLE = {
  software_engineering: { icon: 'code', tone: 'accent' },
  data_ai_infra: { icon: 'database', tone: 'blue' },
  enterprise_security: { icon: 'shield', tone: 'violet' },
  decomp_problem_solving: { icon: 'layers', tone: 'amber' },
  client_diplomacy: { icon: 'users', tone: 'red' }
};

// Journey logic lives in lib/journey.js; these bind it to the learner's saved progress.
const learnFor = (topics, limit = 3) => learnForProgress(topics, state, limit);
const projectFor = (topics) => projectForProgress(topics, state);
const projectDone = (p) => projectDoneFor(p, state.projects);


function targetCompany() { return companyPlaybooks.find((c) => c.id === state.target) || null; }

function stationsFor(roleId) {
  const role = experienceLevels[roleId];
  const target = targetCompany();
  const orientation = {
    id: 'orientation', n: '00', kind: 'orientation',
    title: 'Orientation: the role from zero',
    week: 'Before week 1', focus: 'Foundations',
    summary: `${orientationLessons.length} short reads that explain what the job actually is, how it differs from adjacent roles, and how this guide is built. Start here even if you are senior — it frames everything after.`,
    items: orientationLessons.map((l) => ({ id: l.id, done: !!state.lessons[l.id] }))
  };
  const phases = role.weeks.map((w, i) => {
    const topics = topicsFor(`${w.title} ${w.focus}`, w.summary);
    return {
      id: `${roleId}-${i}`, n: pad(i + 1), kind: 'phase',
      title: cleanTitle(w.title), week: w.week, focus: w.focus, summary: w.summary,
      tasks: w.tasks, topicsToResearch: w.resources, practice: practiceFor(w),
      learn: learnFor(topics), project: projectFor(topics),
      items: w.tasks.map((t) => ({ id: t.id, done: !!state.tasks[t.id] }))
    };
  });
  const loop = {
    id: 'loop', n: 'GO', kind: 'loop',
    title: target ? `The Loop: ${target.name}` : 'The Loop: your target interview',
    week: 'Final 2 weeks', focus: 'Interview execution',
    summary: target
      ? `Rehearse the ${target.roleName} loop end to end. Everything before this station was preparation; this is the performance.`
      : 'Pick a target company, then rehearse its loop end to end. Everything before this station was preparation; this is the performance.',
    tasks: LOOP_TASKS,
    practice: [
      { href: target ? `#/playbooks/${target.id}` : '#/playbooks', label: target ? `${target.name} playbook` : 'Choose a target playbook', icon: 'building' },
      { href: '#/labs/stories', label: 'Story bank', icon: 'message' },
      { href: '#/labs/decomp', label: 'Decomp drill', icon: 'timer' }
    ],
    learn: learnFor(['interview', 'diplomacy']),
    items: LOOP_TASKS.map((t) => ({ id: t.id, done: !!state.tasks[t.id] }))
  };
  const all = [orientation, ...phases, loop];
  let currentFound = false;
  all.forEach((s) => {
    s.doneCount = s.items.filter((i) => i.done).length;
    s.total = s.items.length;
    s.complete = s.doneCount === s.total;
    s.status = s.complete ? 'done' : currentFound ? 'upcoming' : 'current';
    if (!s.complete) currentFound = true;
  });
  return all;
}

function journeyProgress(roleId = state.role) {
  const st = stationsFor(roleId);
  const done = st.reduce((a, s) => a + s.doneCount, 0);
  const total = st.reduce((a, s) => a + s.total, 0);
  return { stations: st, done, total, percent: pct(done, total), current: st.find((s) => s.status === 'current') || null };
}

const totalXP = () => totalXPFor(state);

/* ==========================================================================
   4. ROUTER + CHROME
   ========================================================================== */
const app = document.getElementById('app');

const NAV = [
  { href: '#/', label: 'Home', icon: 'home', section: '' },
  { href: '#/journey', label: 'Journey', icon: 'route', section: 'journey' },
  { href: '#/labs', label: 'Labs', icon: 'flask', section: 'labs' },
  { href: '#/library', label: 'Library', icon: 'library', section: 'library' },
  { href: '#/playbooks', label: 'Playbooks', icon: 'building', section: 'playbooks' }
];

const ROUTES = [
  [/^\/$/, viewHome],
  [/^\/start$/, viewStart],
  [/^\/journey$/, viewJourney],
  [/^\/orientation(?:\/([\w-]+))?$/, viewReader],
  [/^\/labs$/, viewLabs],
  [/^\/labs\/diagnostic$/, viewDiagnostic],
  [/^\/labs\/simulator(?:\/([\w-]+))?$/, viewSimulator],
  [/^\/labs\/cases(?:\/([\w-]+))?$/, viewCases],
  [/^\/labs\/questions$/, viewQuestions],
  [/^\/labs\/projects(?:\/([\w-]+))?$/, viewProjects],
  [/^\/labs\/decomp(?:\/([\w-]+))?$/, viewDecomp],
  [/^\/labs\/stories$/, viewStories],
  [/^\/library$/, viewLibrary],
  [/^\/playbooks(?:\/([\w-]+))?$/, viewPlaybooks]
];

function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = raw.split('?');
  return { path: path || '/', params: new URLSearchParams(query) };
}

let lastPath = null;

function render() {
  const { path, params } = parseHash();
  let match = null;
  let view = viewNotFound;
  for (const [re, fn] of ROUTES) {
    const m = path.match(re);
    if (m) { match = m; view = fn; break; }
  }

  // remember focus + scroll so in-place re-renders don't jump
  const focusKey = document.activeElement?.dataset?.key;
  const scrollY = window.scrollY;
  const routeChanged = path !== lastPath;

  if (routeChanged) stopTicker();
  const { title, html, after } = view(match ? match.slice(1) : [], params);
  app.innerHTML = `<div class="${routeChanged ? 'view' : ''}">${html}</div>`;
  document.title = `${title} · FDE from Scratch`;
  renderChrome(path);
  after?.();

  if (routeChanged) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lastPath !== null) document.getElementById('main')?.focus({ preventScroll: true });
  } else {
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    if (focusKey) app.querySelector(`[data-key="${CSS.escape(focusKey)}"]`)?.focus({ preventScroll: true });
  }
  lastPath = path;
}

const rerender = render;

function renderChrome(path) {
  const section = path.split('/')[1] || '';
  const active = section === 'start' || section === 'orientation' ? 'journey' : section;
  const cur = (n) => (n.section === active ? 'aria-current="page"' : '');

  document.getElementById('primaryNav').innerHTML = NAV.slice(1)
    .map((n) => `<a class="nav-link" href="${n.href}" ${cur(n)}>${icon(n.icon, 'icon-sm')}<span>${n.label}</span></a>`).join('');
  document.getElementById('tabbar').innerHTML = NAV
    .map((n) => `<a href="${n.href}" ${cur(n)}>${icon(n.icon)}<span>${n.label}</span></a>`).join('');

  const xp = totalXP();
  const rank = rankFor(xp);
  const prog = journeyProgress();
  document.getElementById('xpPill').innerHTML = `
    <span class="xp-pill-ring ring" style="width:28px;height:28px">${ring(prog.percent, 28, 4)}</span>
    <span class="xp-pill-label"><strong>${esc(rank.name)}</strong> · ${xp} XP</span>
    <span class="sr-only">${prog.percent}% of journey complete</span>`;

  const isLight = effectiveTheme() === 'light';
  const tt = document.getElementById('themeToggle');
  tt.innerHTML = icon(isLight ? 'moon' : 'sun');
  tt.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

function renderStaticChrome() {
  const sponsor = document.getElementById('sponsorBtn');
  sponsor.href = SUPPORT.sponsors;
  sponsor.innerHTML = icon('heart');

  document.getElementById('footer').innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <h2>FDE from Scratch</h2>
          <p>An open-source field guide to Forward Deployed Engineering. If it helped you land a role or ship a deployment, consider supporting it.</p>
          <div class="btn-row mt-16">${supportButtons('btn-sm')}</div>
        </div>
        <nav aria-label="Guide">
          <h2>This guide</h2>
          <div class="footer-links">
            <a href="#/orientation">Orientation</a>
            <a href="#/journey">Journey</a>
            <a href="#/labs">Labs</a>
            <a href="#/library">Library</a>
            <a href="#/playbooks">Playbooks</a>
          </div>
        </nav>
        <nav aria-label="More guides">
          <h2>More guides</h2>
          <div class="footer-links">
            ${MORE_GUIDES.map((g) => `<a href="${g.url}" target="_blank" rel="noopener">${githubMark('icon-sm')} ${esc(g.name)}</a>`).join('')}
          </div>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>Open source under the MIT license · progress is saved in this browser only · not affiliated with any company named here.</span>
        <span class="footer-links-inline"><a href="${REPO}" target="_blank" rel="noopener">${githubMark('icon-sm')} View source</a><a href="${REPO}/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">Contribute</a></span>
      </div>
    </div>`;
}

function effectiveTheme() {
  const t = document.documentElement.dataset.theme;
  if (t) return t;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/* ==========================================================================
   5. VIEWS
   ========================================================================== */

/* ---------- Home ---------- */
function viewHome() {
  const prog = journeyProgress();
  const role = experienceLevels[state.role];
  const started = state.onboarded || prog.done > 0;
  const preview = prog.stations.slice(0, 6);

  const route = [
    ['00', 'Orientation', 'What the job is, from zero. How it differs from SWE, SA and consulting.'],
    ['01', 'Ship fast', 'Full-stack prototypes in hours, on unfamiliar stacks.'],
    ['02', 'Wrangle data', 'Messy CSVs, SQL fluency, pipelines that survive real customers.'],
    ['03', 'Decompose', 'Turn a vague executive ask into entities, flows and milestones.'],
    ['04', 'Deploy anywhere', 'Linux triage, networks, SSO, VPCs, air-gapped installs.'],
    ['05', 'Applied AI', 'RAG, evals and guardrails inside enterprise constraints.'],
    ['GO', 'The Loop', 'Rehearse your target company interview end to end.']
  ];

  const caps = [
    ['zap', 'accent', 'Ship in 48 hours', 'Build working software on a stack you saw for the first time on Monday.'],
    ['layers', 'amber', 'Decompose ambiguity', 'Go from "we need visibility" to a data model and a first milestone.'],
    ['shield', 'violet', 'Deploy anywhere', 'Get it running behind SSO, inside a VPC, or fully air-gapped.'],
    ['users', 'red', 'Win the room', 'De-escalate hostile engineers and pitch value to a VP in two minutes.']
  ];

  return {
    title: 'Zero to Forward Deployed',
    html: `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow eyebrow-accent"><span class="dot"></span>FDE from Scratch · the open field guide</span>
          <h1>Zero to <em>Forward Deployed.</em></h1>
          <p class="lead">A guided route from "what is an FDE?" to offer-ready. Orientation first, then a track built for your experience level, hands-on labs between stations, and company playbooks for the final loop.</p>
          <div class="btn-row">
            <a class="btn btn-primary btn-lg" href="${started ? '#/journey' : '#/start'}">${started ? 'Continue my journey' : 'Start my journey'} ${icon('arrowRight')}</a>
            <a class="btn btn-secondary btn-lg" href="#/orientation">${icon('book')} Read the orientation</a>
          </div>
          <div class="hero-meta">
            <span>${icon('route', 'icon-sm')} ${Object.keys(experienceLevels).length} experience tracks</span>
            <span>${icon('flask', 'icon-sm')} 7 hands-on labs</span>
            <span>${icon('library', 'icon-sm')} ${resources.length} vetted resources</span>
            <span>${icon('building', 'icon-sm')} ${companyPlaybooks.length} company playbooks</span>
          </div>
        </div>

        <div class="mission-card" aria-label="Your route preview">
          <div class="mission-card-bar"><i></i><i></i><i></i><span>route.${esc(state.role)}</span><span class="live">${started ? 'in progress' : 'preview'}</span></div>
          <div class="mission-card-body">
            <div class="mini-route">
              ${preview.map((s) => `
                <div class="mini-stop ${s.status}">
                  <span class="mini-dot">${s.status === 'done' ? icon('check', 'icon-sm') : s.n}</span>
                  <span class="mini-stop-title">${esc(s.title)}</span>
                  <span class="mini-stop-meta">${s.doneCount}/${s.total}</span>
                </div>`).join('')}
            </div>
            <div class="mission-card-foot">
              <span>TRACK <strong>${esc(role.experience)}</strong></span>
              <span>PROGRESS <strong>${prog.percent}%</strong></span>
              <span>XP <strong>${totalXP()}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">// The route</span>
          <h2>One route, from zero to offer</h2>
          <p>Every track follows the same shape. The stations in the middle change with your experience level, but you always start with orientation and finish by rehearsing a real interview loop.</p>
        </div>
        <div class="route-strip" role="list">
          ${route.map(([n, t, d], i) => `
            <div class="route-stop ${i === route.length - 1 ? 'final' : ''}" role="listitem">
              <span class="route-stop-dot">${n}</span>
              <h3>${t}</h3>
              <p>${d}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">// What you'll be able to do</span>
          <h2>The four things FDE interviews test</h2>
        </div>
        <div class="cap-grid">
          ${caps.map(([ic, tone, t, d]) => `
            <div class="card cap">
              <div class="cap-icon tone-${tone}">${icon(ic)}</div>
              <h3>${t}</h3>
              <p>${d}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">// Where are you starting from?</span>
          <h2>Pick a track that fits today</h2>
          <p>You can switch any time — your checkmarks carry over.</p>
        </div>
        <div class="track-grid">
          ${Object.values(experienceLevels).map((r) => `
            <button class="track-card" type="button" data-action="home-pick" data-role="${r.id}" data-key="home-${r.id}" aria-pressed="${state.onboarded && r.id === state.role}">
              <div class="track-card-top"><span class="chip chip-mono">${esc(r.experience)}</span>${state.onboarded && r.id === state.role ? '<span class="chip chip-accent">Your track</span>' : ''}</div>
              <h3>${esc(r.title)}</h3>
              <p>${esc(r.tagline)}</p>
              <div class="track-card-foot">${r.weeks.length + 2} stations · ${r.weeks.reduce((a, w) => a + w.tasks.length, 0)} milestones</div>
            </button>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">// Between stations</span>
          <h2>Labs for reps, not reading</h2>
        </div>
        ${labTiles()}
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">// Keep learning</span>
          <h2>More guides from the same author</h2>
          <p>FDEs end up owning the whole stack. These companion guides go deeper on the parts you'll deploy most.</p>
        </div>
        <div class="project-grid">
          ${MORE_GUIDES.map((g) => `
            <a class="card card-link project-card" href="${g.url}" target="_blank" rel="noopener">
              <div class="spread"><span class="cap-icon tone-${g.tone}" style="margin:0">${icon(g.icon)}</span><span class="chip chip-mono">Companion guide</span></div>
              <h3>${esc(g.name)}</h3>
              <p>${esc(g.text)}</p>
              <div class="lab-tile-foot"><span class="repo">${githubMark('icon-sm')} ${esc(g.repo)}</span><span class="go">Learn more ${icon('external', 'icon-sm')}</span></div>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="support-card">
          <div>
            <span class="eyebrow eyebrow-accent">${icon('heart', 'icon-sm')} Support the guide</span>
            <h2 class="mt-8">Free and open source, kept alive by readers.</h2>
            <p>If this route helped you prepare, a coffee or a GitHub sponsorship pays for new cases, simulations and playbooks.</p>
          </div>
          <div class="btn-row">${supportButtons('btn-lg')}</div>
        </div>
      </div>
    </section>`
  };
}

/* ---------- Onboarding ---------- */
function viewStart() {
  const step = state.onboardStep;
  const steps = ['Starting point', 'Target company', 'Launch'];
  const stepper = `<div class="stepper" aria-label="Step ${step} of 3">
    ${steps.map((s, i) => `<div class="stepper-step ${i + 1 < step ? 'done' : ''} ${i + 1 === step ? 'active' : ''}"><div class="stepper-bar"><span></span></div><div class="stepper-label">${pad(i + 1)} · ${s}</div></div>`).join('')}
  </div>`;

  let body;
  if (step === 1) {
    body = `
      <span class="eyebrow">Step 1 of 3</span>
      <h1 class="mt-8">Where are you starting from?</h1>
      <p class="lead mt-8">This picks the stations and milestones on your route. Orientation is included in every track.</p>
      <div class="track-grid mt-24" role="radiogroup" aria-label="Experience track">
        ${Object.values(experienceLevels).map((r) => `
          <button class="track-card" type="button" role="radio" aria-checked="${r.id === state.role}" data-action="pick-role" data-role="${r.id}" data-key="role-${r.id}">
            <div class="track-card-top"><span class="chip chip-mono">${esc(r.experience)}</span><span class="track-check">${icon('check', 'icon-sm')}</span></div>
            <h3>${esc(r.title)}</h3>
            <p>${esc(r.tagline)}</p>
          </button>`).join('')}
      </div>
      <div class="helper">${icon('help')}<div>Not sure which fits? <a href="#/labs/diagnostic">Take the 15-question diagnostic</a> — it recommends a track and you can switch with one click.</div></div>`;
  } else if (step === 2) {
    body = `
      <span class="eyebrow">Step 2 of 3 · optional</span>
      <h1 class="mt-8">Who do you want to deploy for?</h1>
      <p class="lead mt-8">Your final station rehearses this company's interview loop. Skip it if you haven't decided — you can set it later from any playbook.</p>
      <div class="track-grid mt-24" role="radiogroup" aria-label="Target company">
        ${companyPlaybooks.map((c) => `
          <button class="track-card" type="button" role="radio" aria-checked="${c.id === state.target}" data-action="pick-target" data-id="${c.id}" data-key="target-${c.id}">
            <div class="track-card-top"><span class="company-logo" style="background:${esc(c.accentColor)}">${esc(c.logoBadge)}</span><span class="track-check">${icon('check', 'icon-sm')}</span></div>
            <h3>${esc(c.name)}</h3>
            <p>${esc(c.roleName)}</p>
          </button>`).join('')}
        <button class="track-card" type="button" role="radio" aria-checked="${!state.target}" data-action="pick-target" data-id="" data-key="target-none">
          <div class="track-card-top"><span class="chip">Undecided</span><span class="track-check">${icon('check', 'icon-sm')}</span></div>
          <h3>Not decided yet</h3>
          <p>Keep options open. The final station will prompt you later.</p>
        </button>
      </div>`;
  } else {
    const role = experienceLevels[state.role];
    const t = targetCompany();
    const st = stationsFor(state.role);
    body = `
      <span class="eyebrow">Step 3 of 3</span>
      <h1 class="mt-8">Your route is ready.</h1>
      <p class="lead mt-8">${esc(role.overview)}</p>
      <div class="grid-2 mt-24">
        <div class="panel">
          <div class="panel-title">Track</div>
          <strong style="font-size:18px">${esc(role.title)}</strong>
          <p class="muted mt-8">${st.length} stations · ${st.reduce((a, s) => a + s.total, 0)} milestones</p>
        </div>
        <div class="panel">
          <div class="panel-title">Target</div>
          <strong style="font-size:18px">${t ? esc(t.name) : 'Undecided'}</strong>
          <p class="muted mt-8">${t ? esc(t.roleName) : 'Pick one from Playbooks whenever you are ready.'}</p>
        </div>
      </div>
      <div class="panel mt-16">
        <div class="panel-title">What you'll prove</div>
        <ul class="plain-list good">${role.keyStrengthsToProve.map((k) => `<li>${icon('check', 'icon-sm')}<span>${esc(k)}</span></li>`).join('')}</ul>
      </div>`;
  }

  return {
    title: 'Start your journey',
    html: `<div class="container"><div class="onboard">
      ${stepper}
      ${body}
      <div class="onboard-actions">
        ${step > 1 ? `<button class="btn btn-ghost" type="button" data-action="onboard-back">${icon('arrowLeft')} Back</button>` : '<a class="btn btn-ghost" href="#/">Cancel</a>'}
        ${step < 3
          ? `<button class="btn btn-primary btn-lg" type="button" data-action="onboard-next" data-key="onboard-next">Continue ${icon('arrowRight')}</button>`
          : `<button class="btn btn-primary btn-lg" type="button" data-action="onboard-finish">Launch my journey ${icon('arrowRight')}</button>`}
      </div>
    </div></div>`
  };
}

/* ---------- Journey ---------- */
function viewJourney() {
  const role = experienceLevels[state.role];
  const prog = journeyProgress();
  const xp = totalXP();
  const rank = rankFor(xp);
  const cur = prog.current;

  // default-open the current station once per session
  if (cur && state.openStations[cur.id] === undefined) state.openStations[cur.id] = true;

  let nextHtml;
  if (!cur) {
    nextHtml = `<h3>Route complete.</h3><p>Every milestone is checked. Run the simulator for an A grade, or switch to a harder track.</p><a class="btn btn-primary btn-sm" href="#/labs/simulator">Open simulator ${icon('arrowRight', 'icon-sm')}</a>`;
  } else if (cur.kind === 'orientation') {
    const lesson = orientationLessons.find((l) => !state.lessons[l.id]);
    nextHtml = `<span class="chip chip-mono">STN ${cur.n} · ${lesson.minutes} min read</span><h3 class="mt-8">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><a class="btn btn-primary btn-sm" href="#/orientation/${lesson.slug}">Start reading ${icon('arrowRight', 'icon-sm')}</a>`;
  } else {
    const task = cur.tasks.find((t) => !state.tasks[t.id]);
    nextHtml = `<span class="chip chip-mono">STN ${cur.n} · ${esc(cur.week)}</span><h3 class="mt-8">${esc(task.milestone)}</h3><p>${esc(task.text)}</p><button class="btn btn-primary btn-sm" type="button" data-action="goto-station" data-id="${cur.id}">Go to station ${icon('arrowRight', 'icon-sm')}</button>`;
  }

  const days = [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return { key: todayKey(d), label: d.toLocaleDateString(undefined, { weekday: 'narrow' }), today: i === 6 };
  });
  const activeDays = days.filter((d) => state.activity.includes(d.key)).length;

  return {
    title: 'Your journey',
    html: `<div class="container"><div class="journey">
      <aside class="mission-panel" aria-label="Mission status">
        <div class="panel">
          <div class="panel-title"><span>Track</span><a href="#/start" data-action="change-track">Change</a></div>
          <div class="progress-hero">
            <div class="ring">${ring(prog.percent)}<div class="ring-label"><div><strong>${prog.percent}%</strong><span>${prog.done}/${prog.total}</span></div></div></div>
            <div><h2>${esc(role.title)}</h2><p>${esc(role.experience)} · ${prog.stations.length} stations</p></div>
          </div>
        </div>
        <div class="panel next-up">
          <div class="panel-title"><span>Next up</span></div>
          ${nextHtml}
        </div>
        <div class="panel">
          <div class="panel-title"><span>Rank</span><span>LV ${rank.level}</span></div>
          <div class="rank">
            <div class="rank-badge">${icon('award')}</div>
            <div><div class="rank-name">${esc(rank.name)}</div><div class="rank-sub">${xp} XP${rank.next ? ` · ${rank.toNext} to ${esc(rank.next.name)}` : ' · max rank'}</div></div>
          </div>
          <div class="xp-bar" role="progressbar" aria-label="Progress to next rank" aria-valuenow="${rank.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${rank.progress}%"></span></div>
        </div>
        <div class="panel">
          <div class="panel-title"><span>This week</span><span>${activeDays}/7 days</span></div>
          <div class="activity">
            ${days.map((d) => `<div class="activity-day ${state.activity.includes(d.key) ? 'on' : ''} ${d.today ? 'today' : ''}"><div class="activity-cell" title="${d.key}"></div><span>${d.label}</span></div>`).join('')}
          </div>
        </div>
      </aside>

      <section aria-labelledby="routeTitle">
        <div class="route-head">
          <div>
            <span class="eyebrow eyebrow-accent"><span class="dot"></span>${esc(role.experience)} track</span>
            <h1 id="routeTitle">${esc(role.tagline)}</h1>
          </div>
          <div class="row">
            <button class="btn btn-secondary btn-sm" type="button" data-action="expand-all">Expand all</button>
            <button class="btn btn-ghost btn-sm" type="button" data-action="collapse-all">Collapse all</button>
          </div>
        </div>
        <ol class="route">
          ${prog.stations.map(stationHtml).join('')}
        </ol>
      </section>
    </div></div>`
  };
}

function stationHtml(s) {
  const open = !!state.openStations[s.id];
  const nodeLabel = s.status === 'done' ? icon('check') : s.n;
  const bodyId = `stn-${s.id}`;
  const chip = s.status === 'current' ? '<span class="chip chip-accent">You are here</span>' : s.status === 'done' ? '<span class="chip chip-accent">Cleared</span>' : '';

  let body;
  if (s.kind === 'orientation') {
    body = `<p class="station-summary">${esc(s.summary)}</p>
      <div class="task-list">
        ${orientationLessons.map((l, i) => `
          <a class="lesson-link ${state.lessons[l.id] ? 'read' : ''}" href="#/orientation/${l.slug}">
            <span class="task-box">${icon('check', 'icon-sm')}</span>
            <span><span class="lesson-link-title">${pad(i + 1)}. ${esc(l.title)}</span><br><span class="lesson-link-sub">${esc(l.summary)}</span></span>
            <span class="task-xp">${l.minutes} min</span>
          </a>`).join('')}
      </div>`;
  } else {
    body = `<p class="station-summary">${esc(s.summary)}</p>
      <div class="task-list">
        ${s.tasks.map((t) => `
          <label class="task">
            <input type="checkbox" data-task="${t.id}" data-key="task-${t.id}" ${state.tasks[t.id] ? 'checked' : ''}>
            <span class="task-box">${icon('check', 'icon-sm')}</span>
            <span class="task-content">
              <span class="task-text">${esc(t.text)}</span><br>
              <span class="task-proof">${icon('flag', 'icon-sm')} Proof: ${esc(t.milestone)}</span>
            </span>
          </label>`).join('')}
      </div>
      <div class="station-foot">
        <div class="foot-block">
          <h4>Practice in labs</h4>
          ${s.practice.map((p) => `<a class="practice-link" href="${p.href}">${icon(p.icon, 'icon-sm')}<span>${esc(p.label)}</span><span class="arrow">${icon('arrowRight', 'icon-sm')}</span></a>`).join('')}
        </div>
        ${s.learn?.length ? `<div class="foot-block"><h4>Learn from</h4>${s.learn.map(resourceLink).join('')}</div>` : ''}
        ${s.project ? `<div class="foot-block"><h4>Build for your portfolio</h4><a class="practice-link" href="#/labs/projects/${s.project.id}">${icon('wrench', 'icon-sm')}<span>${esc(s.project.title)}</span><span class="arrow">${icon('arrowRight', 'icon-sm')}</span></a></div>` : ''}
      </div>
      ${s.topicsToResearch?.length ? `<p class="research-topics"><span class="dim mono">Also research:</span> ${s.topicsToResearch.map(esc).join(' · ')}</p>` : ''}`;
  }

  return `<li class="station ${s.status}" id="station-${s.id}">
    <div class="station-rail"><span class="station-node" aria-hidden="true">${nodeLabel}</span></div>
    <div class="station-card">
      <button class="station-head" type="button" aria-expanded="${open}" aria-controls="${bodyId}" data-action="toggle-station" data-id="${s.id}" data-key="head-${s.id}">
        <div>
          <div class="station-meta"><span class="chip chip-mono">STN ${s.n}</span><span class="chip chip-mono">${esc(s.week)}</span><span class="chip chip-amber">${esc(s.focus)}</span>${chip}</div>
          <h2>${esc(s.title)}</h2>
        </div>
        <div class="station-head-right">
          <span class="station-count"><strong>${s.doneCount}</strong>/${s.total}</span>
          <span class="station-chevron">${icon('chevronDown', 'icon-sm')}</span>
        </div>
        <span class="station-mini-bar" aria-hidden="true"><span style="width:${pct(s.doneCount, s.total)}%"></span></span>
      </button>
      <div class="station-body" id="${bodyId}" ${open ? '' : 'hidden'}>${body}</div>
    </div>
  </li>`;
}

function resourceLink(r) {
  return `<a class="practice-link resource-link ${state.readRes[r.id] ? 'is-read' : ''}" href="${r.url}" target="_blank" rel="noopener">
    ${icon(state.readRes[r.id] ? 'check' : 'book', 'icon-sm')}
    <span><span class="rl-title">${esc(r.title)}</span><span class="rl-meta">${esc(r.type)} · ${esc(r.level)}${r.free ? ' · free' : ''}</span></span>
    <span class="arrow">${icon('external', 'icon-sm')}<span class="sr-only">(opens in a new tab)</span></span>
  </a>`;
}

/* ---------- Orientation reader ---------- */
function viewReader([slug]) {
  const found = slug ? orientationLessons.findIndex((l) => l.slug === slug) : orientationLessons.findIndex((l) => !state.lessons[l.id]);
  const idx = Math.max(0, found);
  const lesson = orientationLessons[idx];
  const prev = orientationLessons[idx - 1];
  const next = orientationLessons[idx + 1];
  const read = !!state.lessons[lesson.id];

  return {
    title: lesson.title,
    html: `<div class="container">
      ${crumbs(['Journey', '#/journey'], ['Station 00 · Orientation'])}
      <div class="reader">
        <nav class="reader-nav" aria-label="Orientation lessons">
          <div class="panel-title">Station 00</div>
          <ol>
            ${orientationLessons.map((l, i) => `<li><a href="#/orientation/${l.slug}" class="${state.lessons[l.id] ? 'read' : ''}" ${l.id === lesson.id ? 'aria-current="page"' : ''}><span class="n">${state.lessons[l.id] ? '✓' : pad(i + 1)}</span><span>${esc(l.title)}</span></a></li>`).join('')}
          </ol>
        </nav>
        <article class="article">
          <span class="eyebrow eyebrow-accent">${icon('clock', 'icon-sm')} Lesson ${pad(idx + 1)} · ${lesson.minutes} min</span>
          <h1>${esc(lesson.title)}</h1>
          <p class="lead">${esc(lesson.summary)}</p>
          ${lesson.blocks.map(blockHtml).join('')}
          <div class="article-foot">
            ${prev ? `<a class="btn btn-ghost" href="#/orientation/${prev.slug}">${icon('arrowLeft')} ${esc(prev.title)}</a>` : '<span></span>'}
            <button class="btn btn-primary" type="button" data-action="lesson-done" data-id="${lesson.id}" data-next="${next ? next.slug : ''}">
              ${read ? (next ? 'Next lesson' : 'Back to journey') : (next ? 'Mark read & continue' : 'Finish orientation')} ${icon('arrowRight')}
            </button>
          </div>
        </article>
      </div>
    </div>`
  };
}

function blockHtml(b) {
  switch (b.type) {
    case 'p': return `<p>${esc(b.text)}</p>`;
    case 'list': return `<ul class="bullets">${b.items.map((i) => `<li>${icon('chevronRight', 'icon-sm')}<span>${esc(i)}</span></li>`).join('')}</ul>`;
    case 'callout': return `<div class="callout ${b.tone}"><div class="callout-title">${esc(b.title)}</div><p>${esc(b.text)}</p></div>`;
    case 'steps': return `<div><div class="steps-title">${esc(b.title)}</div><div class="steps">${b.items.map((s, i) => `<div class="step"><span class="step-n">${pad(i + 1)}</span><div><strong>${esc(s.label)}</strong><p>${esc(s.text)}</p></div></div>`).join('')}</div></div>`;
    case 'table': return `<div class="table-wrap"><table><thead><tr>${b.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'timeline': return `<div class="timeline">${b.items.map((t) => `<div class="tl-item"><span class="tl-day">${esc(t.label)}</span><div><strong>${esc(t.title)}</strong><p>${esc(t.text)}</p></div></div>`).join('')}</div>`;
    case 'pillars': return `<div class="pillar-grid">${diagnosticPillars.map((p) => {
      const st = PILLAR_STYLE[p.id] || { icon: 'target', tone: 'accent' };
      return `<div class="pillar"><div class="pillar-head"><span class="cap-icon tone-${st.tone}">${icon(st.icon, 'icon-sm')}</span><strong>${esc(p.name)}</strong></div><p>${esc(p.description)}</p></div>`;
    }).join('')}</div>`;
    default: return '';
  }
}

/* ---------- Labs hub ---------- */
function labTiles() {
  const answered = Object.keys(state.quiz).length;
  const projectsDone = portfolioProjects.filter(projectDone).length;
  const drillsDone = Object.values(state.drills).filter((d) => d.done).length;
  const storiesDone = storyPrompts.filter(storyComplete).length;
  const tiles = [
    { href: '#/labs/projects', icon: 'wrench', tone: 'accent', title: 'Portfolio projects', text: `${portfolioProjects.length} mini-deployments with customer briefs and acceptance criteria. Each one becomes proof and an interview story.`, meta: `${projectsDone}/${portfolioProjects.length} shipped`, cta: 'Build' },
    { href: '#/labs/decomp', icon: 'timer', tone: 'amber', title: 'Decomp drill', text: `${decompPrompts.length} timed prompts with a five-phase scaffold, hints, a mid-drill twist and a self-score rubric.`, meta: `${drillsDone} drills completed`, cta: 'Start the clock' },
    { href: '#/labs/simulator', icon: 'activity', tone: 'red', title: 'Field simulator', text: 'Branching client crises with live trust, integrity and velocity meters. Every choice has consequences.', meta: `${Object.keys(state.sims).length}/${simulations.length} missions run`, cta: 'Deploy' },
    { href: '#/labs/stories', icon: 'message', tone: 'violet', title: 'Story bank', text: `${storyPrompts.length} behavioral prompts every FDE loop asks, written in STAR form and exportable as Markdown.`, meta: `${storiesDone}/${storyPrompts.length} stories written`, cta: 'Write' },
    { href: '#/labs/diagnostic', icon: 'target', tone: 'accent', title: 'Skill diagnostic', text: '15 scenario questions across the five pillars. Get a radar of your strengths, a recommended track and resources for your gaps.', meta: state.diagDone ? 'Completed · retake anytime' : `${answered}/${diagnosticQuestions.length} answered`, cta: state.diagDone ? 'View results' : 'Start' },
    { href: '#/labs/cases', icon: 'layers', tone: 'amber', title: 'Decomp cases', text: 'End-to-end architectures: entity models, ingestion, writeback and tradeoffs, the way strong candidates present them.', meta: `${Object.keys(state.studied).length}/${caseStudies.length} studied`, cta: 'Study' },
    { href: '#/labs/questions', icon: 'help', tone: 'blue', title: 'Question bank', text: `${questionBank.length} interview prompts with model answers, red flags, and the follow-up probe the interviewer will ask next.`, meta: `${Object.keys(state.practiced).length}/${questionBank.length} practiced`, cta: 'Practice' }
  ];
  return `<div class="lab-grid">${tiles.map((t) => `
    <a class="card card-link lab-tile" href="${t.href}">
      <span class="cap-icon tone-${t.tone}" style="margin:0">${icon(t.icon)}</span>
      <h2>${t.title}</h2>
      <p>${t.text}</p>
      <div class="lab-tile-foot"><span>${t.meta}</span><span class="go">${t.cta} ${icon('arrowRight', 'icon-sm')}</span></div>
    </a>`).join('')}</div>`;
}

function viewLabs() {
  return {
    title: 'Labs',
    html: `<div class="container">
      <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Labs</span><h1>Reps between stations</h1><p class="lead">Reading builds vocabulary. Labs build judgment. Use them whenever a station points you here, or any time you want to recalibrate.</p></div></header>
      ${labTiles()}
    </div>`
  };
}

/* ---------- Diagnostic ---------- */
function crumbs(...parts) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${parts.map(([label, href]) => (href ? `<a href="${href}">${esc(label)}</a>` : `<span>${esc(label)}</span>`)).join(icon('chevronRight', 'icon-sm'))}</nav>`;
}

function viewDiagnostic() {
  const total = diagnosticQuestions.length;
  const answered = Object.keys(state.quiz).length;
  const head = crumbs(['Labs', '#/labs'], ['Skill diagnostic']);

  if (state.diagDone && answered === total) return diagnosticResults(head);

  const i = Math.min(state.quizIndex, total - 1);
  const q = diagnosticQuestions[i];
  const pillar = diagnosticPillars.find((p) => p.id === q.pillar);
  const st = PILLAR_STYLE[q.pillar] || { icon: 'target', tone: 'accent' };
  const selected = state.quiz[q.id];

  return {
    title: 'Skill diagnostic',
    html: `<div class="container">${head}
      <h1 class="sr-only">Skill diagnostic</h1>
      <div class="quiz mt-32">
        <div class="quiz-top"><span>QUESTION ${pad(i + 1)} / ${total}</span><span>${answered} answered</span></div>
        <div class="quiz-progress" role="progressbar" aria-label="Diagnostic progress" aria-valuenow="${answered}" aria-valuemin="0" aria-valuemax="${total}"><span style="width:${pct(answered, total)}%"></span></div>
        <span class="chip tone-${st.tone}" style="border:none">${icon(st.icon, 'icon-sm')} ${esc(pillar?.name || '')}</span>
        <h2 id="qText">${esc(q.text)}</h2>
        <div class="options" role="radiogroup" aria-labelledby="qText">
          ${q.options.map((o, k) => `
            <button class="option" type="button" role="radio" aria-checked="${selected === o.score}" data-action="answer" data-q="${q.id}" data-score="${o.score}" data-key="opt-${k}">
              <span class="option-key">${k + 1}</span><span>${esc(o.text)}</span>
            </button>`).join('')}
        </div>
        <div class="quiz-nav">
          <button class="btn btn-ghost" type="button" data-action="quiz-prev" ${i === 0 ? 'disabled' : ''}>${icon('arrowLeft')} Back</button>
          ${answered === total
            ? `<button class="btn btn-primary" type="button" data-action="quiz-finish" data-key="quiz-finish">See my results ${icon('arrowRight')}</button>`
            : `<button class="btn btn-secondary" type="button" data-action="quiz-next" ${i === total - 1 ? 'disabled' : ''}>Skip for now ${icon('arrowRight')}</button>`}
        </div>
        <p class="kbd-hint">Press <span class="kbd">1</span>–<span class="kbd">${q.options.length}</span> to answer · <span class="kbd">←</span> <span class="kbd">→</span> to move</p>
      </div>
    </div>`
  };
}

function diagnosticResults(head) {
  const r = calculateDiagnosticResult(state.quiz);
  const rec = experienceLevels[r.recommendedLevel];
  const keys = diagnosticPillars.map((p) => p.id);
  const cx = 160, cy = 160, R = 110;
  const pt = (i, v) => {
    const a = (-Math.PI / 2) + (i * 2 * Math.PI) / keys.length;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const level = (k) => Math.max(0.04, r.percentages[k] / 100);
  const rings = [0.25, 0.5, 0.75, 1].map((v) => `<polygon class="radar-grid" points="${keys.map((_, i) => pt(i, v).join(',')).join(' ')}"/>`).join('');
  const axes = keys.map((_, i) => { const [x, y] = pt(i, 1); return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; }).join('');
  const area = keys.map((k, i) => pt(i, level(k)).join(',')).join(' ');
  const dots = keys.map((k, i) => { const [x, y] = pt(i, level(k)); return `<circle class="radar-dot" cx="${x}" cy="${y}" r="4"/>`; }).join('');
  const labels = keys.map((k, i) => {
    const [x, y] = pt(i, 1.18);
    const anchor = Math.abs(x - cx) < 10 ? 'middle' : x > cx ? 'start' : 'end';
    return `<text class="radar-label" x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle">${esc(r.pillarScores[k].name)}</text>`;
  }).join('');

  return {
    title: 'Diagnostic results',
    html: `<div class="container">${head}
      <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Diagnostic results</span><h1>Your FDE readiness</h1><p class="lead">${esc(r.diagnosisSummary)}</p></div>
        <button class="btn btn-secondary" type="button" data-action="quiz-reset">${icon('reset')} Retake</button></header>
      <div class="results">
        <div class="panel">
          <div class="spread"><div><div class="panel-title">Overall</div><div class="score-big">${r.overallScore}<small>/100</small></div></div>
            <div class="stack" style="--stack:8px;text-align:right"><div class="chip chip-accent">Strength: ${esc(r.primaryStrength)}</div><div class="chip chip-amber">Focus: ${esc(r.primaryWeakness)}</div></div></div>
          <svg class="radar mt-16" viewBox="-80 -10 480 340" role="img" aria-label="Radar chart of pillar scores">
            ${rings}${axes}<polygon class="radar-area" points="${area}"/>${dots}${labels}
          </svg>
        </div>
        <div class="stack" style="--stack:20px">
          <div class="panel">
            <div class="panel-title">By pillar</div>
            <div class="bars">
              ${keys.map((k) => `<div><div class="bar-row-top"><span>${esc(r.pillarScores[k].name)}</span><span>${r.percentages[k]}%</span></div><div class="bar ${k === r.primaryWeaknessKey ? 'weak' : ''}"><span style="width:${r.percentages[k]}%"></span></div></div>`).join('')}
            </div>
          </div>
          <div class="panel next-up">
            <div class="panel-title">Recommended track</div>
            <h3>${esc(rec.title)}</h3>
            <p>${esc(rec.tagline)}</p>
            ${state.role === rec.id && state.onboarded
              ? `<a class="btn btn-secondary btn-sm" href="#/journey">You're on this track · open journey ${icon('arrowRight', 'icon-sm')}</a>`
              : `<button class="btn btn-primary btn-sm" type="button" data-action="adopt-role" data-role="${rec.id}">Start this track ${icon('arrowRight', 'icon-sm')}</button>`}
          </div>
          ${gapPanel(r.primaryWeaknessKey, r.primaryWeakness)}
        </div>
      </div>
    </div>`
  };
}

function gapPanel(pillarId, pillarName) {
  const topics = resourceTopics.filter((t) => t.pillar === pillarId).map((t) => t.id);
  const learn = learnFor(topics, 3);
  const project = projectFor(topics);
  return `<div class="panel">
    <div class="panel-title">Close the gap · ${esc(pillarName)}</div>
    ${learn.map(resourceLink).join('')}
    ${project ? `<a class="practice-link" href="#/labs/projects/${project.id}">${icon('wrench', 'icon-sm')}<span>Build: ${esc(project.title)}</span><span class="arrow">${icon('arrowRight', 'icon-sm')}</span></a>` : ''}
    <a class="btn btn-ghost btn-sm mt-8" href="#/library?t=${topics[0] || 'all'}">See all ${esc(pillarName)} resources ${icon('arrowRight', 'icon-sm')}</a>
  </div>`;
}

/* ---------- Simulator ---------- */

function viewSimulator([simId]) {
  const sim = simulations.find((s) => s.id === simId);
  const head = sim
    ? crumbs(['Labs', '#/labs'], ['Field simulator', '#/labs/simulator'], ['Mission'])
    : crumbs(['Labs', '#/labs'], ['Field simulator']);

  if (!sim) {
    return {
      title: 'Field simulator',
      html: `<div class="container">${head}
        <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Field simulator</span><h1>Decisions under fire</h1><p class="lead">You're on-site. Something just broke. Each mission has branching stages and three live meters — client trust, technical integrity and deployment velocity. Keep all three up.</p></div></header>
        <div class="sim-grid">
          ${simulations.map((s) => `
            <a class="card card-link sim-card" href="#/labs/simulator/${s.id}">
              <div class="chip-row"><span class="chip chip-red">${esc(s.difficulty)}</span><span class="chip chip-mono">${esc(s.companyStyle)}</span></div>
              <h3>${esc(s.title)}</h3>
              <p>${esc(s.client)} · ${esc(s.stakes)}</p>
              <div class="sim-card-foot"><span>${s.stages.length} stages</span>${state.sims[s.id] !== undefined ? `<span class="chip chip-accent">Best grade ${gradeFor(state.sims[s.id])}</span>` : `<span class="go">${icon('play', 'icon-sm')} Deploy</span>`}</div>
            </a>`).join('')}
        </div>
      </div>`
    };
  }

  if (!state.sim || state.sim.id !== sim.id) state.sim = { id: sim.id, idx: 0, ...SIM_START, picked: null };
  const run = state.sim;
  const finished = run.idx >= sim.stages.length;
  const meter = (label, v) => `<div><div class="meter-top"><span>${label}</span><strong>${v}</strong></div><div class="meter ${v >= 70 ? 'hi' : v >= 45 ? 'mid' : 'lo'}" role="meter" aria-label="${label}" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100"><span style="width:${v}%"></span></div></div>`;
  const side = `<aside class="stack" style="--stack:16px">
      <div class="panel"><div class="panel-title">Telemetry</div><div class="meters">${meter('Client trust', run.trust)}${meter('Technical integrity', run.integrity)}${meter('Deployment velocity', run.velocity)}</div></div>
      <div class="panel"><div class="panel-title">Your role</div><p style="font-size:14px"><strong>${esc(sim.role)}</strong></p><p class="muted mt-8" style="font-size:14px">${esc(sim.client)} · ${esc(sim.stakes)}</p></div>
    </aside>`;
  const pips = sim.stages.map((_, i) => `<span class="stage-pip ${i < run.idx ? 'done' : i === run.idx ? 'current' : ''}"></span>`).join('');

  let main;
  if (finished) {
    const score = simScore(run);
    main = `<div class="console-body">
      <span class="eyebrow eyebrow-accent">Mission debrief</span>
      <div class="spread mt-16"><div><div class="grade">${gradeFor(score)}</div><p class="muted mono" style="font-size:13px">COMPOSITE ${score}/100</p></div>
        <div class="btn-row"><button class="btn btn-secondary" type="button" data-action="sim-restart">${icon('reset')} Run again</button><a class="btn btn-primary" href="#/labs/simulator">Next mission ${icon('arrowRight')}</a></div></div>
      <div class="callout accent mt-24"><div class="callout-title">The lesson</div><p>${esc(sim.debrief.lesson)}</p></div>
      <div class="mt-24"><div class="panel-title">Skills demonstrated</div><div class="chip-row">${sim.debrief.coreSkillsDemonstrated.map((s) => `<span class="chip chip-accent">${esc(s)}</span>`).join('')}</div></div>
    </div>`;
  } else {
    const stage = sim.stages[run.idx];
    const picked = stage.options.find((o) => o.id === run.picked);
    const net = picked ? Object.values(picked.impact).reduce((a, b) => a + b, 0) : 0;
    main = `<div class="console-body">
      ${run.idx === 0 ? `<div class="callout amber"><div class="callout-title">Situation</div><p>${esc(sim.background)}</p></div>` : ''}
      <span class="eyebrow mt-24" style="display:flex">Stage ${run.idx + 1} of ${sim.stages.length}</span>
      <h2>${esc(stage.title)}</h2>
      <p class="dilemma">${esc(stage.dilemma)}</p>
      <div class="choices">
        ${stage.options.map((o, k) => `
          <button class="choice ${run.picked === o.id ? `picked ${net < 0 ? 'bad' : ''}` : ''}" type="button" data-action="sim-pick" data-id="${o.id}" data-key="choice-${k}" ${picked ? 'disabled' : ''}>
            <span class="option-key">${String.fromCharCode(65 + k)}</span><span>${esc(o.text)}</span>
          </button>`).join('')}
      </div>
      ${picked ? `<div class="feedback ${net >= 0 ? 'good' : 'bad'}">
        <div class="feedback-title">${icon(net >= 0 ? 'check' : 'alert', 'icon-sm')} ${net >= 0 ? 'Strong call' : 'Costly call'}</div>
        <p>${esc(picked.feedback)}</p>
        <div class="deltas">${Object.entries(picked.impact).map(([k, v]) => `<span class="chip ${v >= 0 ? 'chip-accent' : 'chip-red'} chip-mono">${k} ${v >= 0 ? '+' : ''}${v}</span>`).join('')}</div>
        <div class="mt-16"><button class="btn btn-primary" type="button" data-action="sim-next" data-key="sim-next">${run.idx + 1 < sim.stages.length ? 'Next stage' : 'View debrief'} ${icon('arrowRight')}</button></div>
      </div>` : ''}
    </div>`;
  }

  return {
    title: sim.title,
    html: `<div class="container">${head}
      <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>${esc(sim.companyStyle)}</span><h1>${esc(sim.title)}</h1></div></header>
      <div class="console">
        <div class="card console-main">
          <div class="console-bar"><span>MISSION · ${esc(sim.id.toUpperCase())}</span><span class="stage-pips" role="img" aria-label="Stage ${Math.min(run.idx + 1, sim.stages.length)} of ${sim.stages.length}">${pips}</span></div>
          ${main}
        </div>
        ${side}
      </div>
    </div>`
  };
}

/* ---------- Decomp cases ---------- */
function viewCases([caseId]) {
  const cs = caseStudies.find((c) => c.id === caseId);

  if (!cs) {
    return {
      title: 'Decomp cases',
      html: `<div class="container">${crumbs(['Labs', '#/labs'], ['Decomp cases'])}
        <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Architecture vault</span><h1>Decomp cases</h1><p class="lead">Read the prompt, sketch your own answer for 15 minutes, then open the case and compare. That gap is what you're training.</p></div></header>
        <div class="case-list">
          ${caseStudies.map((c) => `
            <a class="card card-link case-card" href="#/labs/cases/${c.id}">
              <div class="chip-row"><span class="chip chip-amber">${esc(c.category)}</span>${state.studied[c.id] ? '<span class="chip chip-accent">Studied</span>' : ''}</div>
              <h3>${esc(c.title)}</h3>
              <p>${esc(c.problemStatement)}</p>
              <div class="lab-tile-foot"><span>${esc(c.difficulty)}</span><span class="go">Open case ${icon('arrowRight', 'icon-sm')}</span></div>
            </a>`).join('')}
        </div>
      </div>`
    };
  }

  return {
    title: cs.title,
    html: `<div class="container">${crumbs(['Labs', '#/labs'], ['Decomp cases', '#/labs/cases'], ['Case'])}
      <header class="page-head"><div style="max-width:820px"><div class="chip-row"><span class="chip chip-amber">${esc(cs.category)}</span><span class="chip chip-mono">${esc(cs.difficulty)}</span><span class="chip chip-mono">${esc(cs.companyContext)}</span></div><h1>${esc(cs.title)}</h1></div>
        <button class="btn ${state.studied[cs.id] ? 'btn-secondary' : 'btn-primary'}" type="button" data-action="toggle-studied" data-id="${cs.id}" data-key="studied">${icon('check')} ${state.studied[cs.id] ? 'Studied' : 'Mark as studied'}</button></header>
      <div class="callout amber"><div class="callout-title">The prompt</div><p>${esc(cs.problemStatement)}</p></div>
      <div class="mt-24">
        ${cs.architecturePhases.map((ph) => `
          <section class="card case-phase">
            <h3>${esc(ph.phase)}</h3>
            <p>${esc(ph.details)}</p>
            ${ph.entities ? `<div class="entity-grid">${ph.entities.map((e) => `<div class="entity"><strong>${esc(e.name)}</strong><div>${e.properties.map(esc).join('<br>')}</div></div>`).join('')}</div>` : ''}
            ${ph.relationships ? `<div class="relationship">${esc(ph.relationships)}</div>` : ''}
            ${ph.technicalDecisions ? `<ul class="decisions">${ph.technicalDecisions.map((d) => `<li>${icon('check', 'icon-sm')}<span>${esc(d)}</span></li>`).join('')}</ul>` : ''}
          </section>`).join('')}
      </div>
      ${cs.tradeoffs?.length ? `<div class="grid-2 mt-24">${cs.tradeoffs.map((t) => `<div class="panel"><div class="panel-title">Tradeoff</div><strong>${esc(t.decision)}</strong><p class="muted mt-8" style="font-size:15px">${esc(t.reasoning)}</p></div>`).join('')}</div>` : ''}
      <div class="callout accent mt-24"><div class="callout-title">Interview takeaway</div><p>${esc(cs.interviewTakeaway)}</p></div>
    </div>`
  };
}

/* ---------- Question bank ---------- */
function viewQuestions(_, params) {
  const c = params.get('c');
  if (c !== null) state.qCat = c;
  const cats = ['All', ...new Set(questionBank.map((q) => q.category))];

  return {
    title: 'Question bank',
    html: `<div class="container">
      ${crumbs(['Labs', '#/labs'], ['Question bank'])}
      <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Question bank</span><h1>Interview reps</h1><p class="lead">Answer out loud before you open the model answer. Then read the red flags — that's where most candidates lose the round.</p></div></header>
      <div class="toolbar">
        <label class="search"><span class="sr-only">Search questions</span>${icon('search')}<input type="search" id="qSearch" placeholder="Search prompts, companies, topics…" value="${esc(state.qSearch)}" data-key="qsearch" autocomplete="off"></label>
        <div class="filters" role="group" aria-label="Filter by category">
          ${cats.map((cat, i) => `<button class="filter" type="button" data-action="q-cat" data-cat="${esc(cat)}" aria-pressed="${state.qCat === cat}" data-key="cat-${i}">${esc(cat)}</button>`).join('')}
        </div>
      </div>
      <div id="qList" class="q-list">${questionListHtml()}</div>
    </div>`,
    after() {
      document.getElementById('qSearch')?.addEventListener('input', (e) => {
        state.qSearch = e.target.value;
        document.getElementById('qList').innerHTML = questionListHtml();
      });
    }
  };
}

function questionListHtml() {
  const term = state.qSearch.trim().toLowerCase();
  const list = questionBank.filter((q) =>
    (state.qCat === 'All' || q.category === state.qCat) &&
    (!term || `${q.title} ${q.prompt} ${q.company} ${q.category}`.toLowerCase().includes(term)));
  if (!list.length) return `<div class="empty card">${icon('search', 'icon-lg')}<p class="mt-8">No questions match. Try a broader term or the All filter.</p></div>`;

  return list.map((q) => `
    <details class="card q-card" data-qid="${q.id}">
      <summary>
        <div>
          <div class="chip-row"><span class="chip chip-blue">${esc(q.category)}</span><span class="chip chip-mono">${esc(q.company)}</span><span class="chip chip-mono">${esc(q.level)}</span>${state.practiced[q.id] ? '<span class="chip chip-accent">Practiced</span>' : ''}</div>
          <h3>${esc(q.title)}</h3>
        </div>
        <span class="station-chevron">${icon('chevronDown', 'icon-sm')}</span>
      </summary>
      <div class="q-body">
        <div class="q-prompt">${esc(q.prompt)}</div>
        <div class="q-section"><h4 style="color:var(--accent)">Model answer</h4><div class="q-answer">${q.modelAnswer.split('\n').filter(Boolean).map((l) => `<p>${esc(l)}</p>`).join('')}</div></div>
        <div class="q-section"><h4 style="color:var(--red)">Red flags</h4><p style="font-size:15px">${esc(q.redFlags)}</p></div>
        <div class="q-section"><h4 style="color:var(--amber)">Follow-up probe</h4><p style="font-size:15px">${esc(q.followUp)}</p></div>
        <div class="q-foot"><span class="dim mono" style="font-size:12px">+${XP.practiced} XP when practiced</span>
          <button class="btn ${state.practiced[q.id] ? 'btn-secondary' : 'btn-primary'} btn-sm" type="button" data-action="toggle-practiced" data-id="${q.id}" data-key="prac-${q.id}">${icon('check', 'icon-sm')} ${state.practiced[q.id] ? 'Practiced' : 'Mark practiced'}</button></div>
      </div>
    </details>`).join('');
}

/* ---------- Playbooks ---------- */
function viewPlaybooks([companyId]) {
  const co = companyPlaybooks.find((c) => c.id === companyId);
  if (!co) {
    return {
      title: 'Company playbooks',
      html: `<div class="container">
        <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Playbooks</span><h1>Company interview playbooks</h1><p class="lead">How each team runs its loop, the decomp formula they reward, and the red flags that end interviews early. Set one as your target to shape your final station.</p></div></header>
        <div class="company-grid">
          ${companyPlaybooks.map((c) => `
            <a class="card card-link company-card" href="#/playbooks/${c.id}">
              <div class="spread"><span class="company-logo" style="background:${esc(c.accentColor)}">${esc(c.logoBadge)}</span>${state.target === c.id ? `<span class="target">${icon('target', 'icon-sm')} Your target</span>` : ''}</div>
              <h3>${esc(c.name)}</h3>
              <p>${esc(c.tagline)}</p>
              <div class="lab-tile-foot"><span>${c.interviewStages.length} stages</span><span class="go">Open ${icon('arrowRight', 'icon-sm')}</span></div>
            </a>`).join('')}
        </div>
      </div>`
    };
  }

  const isTarget = state.target === co.id;
  return {
    title: `${co.name} playbook`,
    html: `<div class="container">
      ${crumbs(['Playbooks', '#/playbooks'], [co.name])}
      <header class="page-head pb-head">
        <div>
          <span class="company-logo" style="background:${esc(co.accentColor)}">${esc(co.logoBadge)}</span>
          <h1>${esc(co.name)}</h1>
          <p class="mono dim" style="font-size:13px;margin-top:6px">${esc(co.roleName)}</p>
          <p class="lead">${esc(co.overview)}</p>
        </div>
        <button class="btn ${isTarget ? 'btn-secondary' : 'btn-primary'}" type="button" data-action="set-target" data-id="${co.id}" data-key="set-target">${icon('target')} ${isTarget ? 'Your target' : 'Set as my target'}</button>
      </header>
      <div class="grid-2">
        <div class="panel"><div class="panel-title">Compensation</div><p>${esc(co.compensationTier)}</p></div>
        <div class="panel"><div class="panel-title">Products you'll deploy</div><div class="chip-row">${co.products.map((p) => `<span class="chip">${esc(p)}</span>`).join('')}</div></div>
      </div>
      <div class="pb-grid">
        <section class="panel">
          <div class="panel-title">The loop</div>
          <ol>
            ${co.interviewStages.map((s, i) => `<li class="loop-step"><span class="step-n">${pad(i + 1)}</span><div><strong>${esc(s.stage)}</strong><p>${esc(s.details)}</p></div></li>`).join('')}
          </ol>
        </section>
        <div class="stack" style="--stack:20px">
          ${co.decompPlaybook ? `<section class="panel"><div class="panel-title">Decomp formula</div><ol class="plain-list good">${co.decompPlaybook.formula.map((f) => `<li>${icon('chevronRight', 'icon-sm')}<span>${esc(f)}</span></li>`).join('')}</ol>
            ${co.decompPlaybook.goldenRules ? `<div class="callout accent mt-16"><div class="callout-title">Golden rules</div>${co.decompPlaybook.goldenRules.map((g) => `<p>${esc(g)}</p>`).join('')}</div>` : ''}</section>` : ''}
          <section class="panel"><div class="panel-title">Red flags</div><ul class="plain-list bad">${co.redFlags.map((f) => `<li>${icon('x', 'icon-sm')}<span>${esc(f)}</span></li>`).join('')}</ul></section>
          <section class="panel"><div class="panel-title">Sample questions</div>${co.sampleQuestions.map((q) => `<div class="sample-q"><strong>${esc(q.q)}</strong><p>${icon('bulb', 'icon-sm')}<span>${esc(q.tip)}</span></p></div>`).join('')}</section>
        </div>
      </div>
    </div>`
  };
}

/* ---------- Library ---------- */
const LEVELS = ['Start', 'Core', 'Deep'];
const LEVEL_HELP = { Start: 'from zero', Core: 'job-ready', Deep: 'senior+' };

function viewLibrary(_, params) {
  const t = params.get('t');
  if (t !== null) state.libTopic = topicById[t] ? t : 'all';
  const readCount = resources.filter((r) => state.readRes[r.id]).length;
  const freeCount = resources.filter((r) => r.free).length;

  return {
    title: 'Library',
    html: `<div class="container">
      <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Library</span><h1>Learn from the best sources</h1>
        <p class="lead">${resources.length} hand-picked docs, books, courses and tools, ${freeCount} of them free. Filter by skill and level — <strong>Start</strong> assumes nothing, <strong>Core</strong> is job-ready, <strong>Deep</strong> is for senior loops.</p></div>
        <div class="panel lib-stat"><div class="panel-title">Your reading</div><div class="score-big" style="font-size:40px">${readCount}<small>/${resources.length}</small></div></div></header>
      <div class="toolbar">
        <label class="search"><span class="sr-only">Search the library</span>${icon('search')}<input type="search" id="libSearch" placeholder="Search titles and topics…" value="${esc(state.libSearch)}" data-key="libsearch" autocomplete="off"></label>
        <div class="filters" role="group" aria-label="Filter by skill">
          <button class="filter" type="button" data-action="lib-topic" data-topic="all" aria-pressed="${state.libTopic === 'all'}" data-key="lt-all">All skills</button>
          ${resourceTopics.map((tp) => `<button class="filter" type="button" data-action="lib-topic" data-topic="${tp.id}" aria-pressed="${state.libTopic === tp.id}" data-key="lt-${tp.id}">${esc(tp.name)}</button>`).join('')}
        </div>
        <div class="filters" role="group" aria-label="Filter by level">
          <button class="filter" type="button" data-action="lib-level" data-level="all" aria-pressed="${state.libLevel === 'all'}" data-key="ll-all">Any level</button>
          ${LEVELS.map((l) => `<button class="filter" type="button" data-action="lib-level" data-level="${l}" aria-pressed="${state.libLevel === l}" data-key="ll-${l}">${l} · ${LEVEL_HELP[l]}</button>`).join('')}
          <button class="filter" type="button" data-action="lib-free" aria-pressed="${state.libFree}" data-key="lib-free">Free only</button>
        </div>
      </div>
      <div id="libList">${libraryListHtml()}</div>
    </div>`,
    after() {
      document.getElementById('libSearch')?.addEventListener('input', (e) => {
        state.libSearch = e.target.value;
        document.getElementById('libList').innerHTML = libraryListHtml();
      });
    }
  };
}

function libraryListHtml() {
  const term = state.libSearch.trim().toLowerCase();
  const list = resources.filter((r) =>
    (state.libTopic === 'all' || r.topic === state.libTopic) &&
    (state.libLevel === 'all' || r.level === state.libLevel) &&
    (!state.libFree || r.free) &&
    (!term || `${r.title} ${r.why} ${topicById[r.topic].name} ${r.type}`.toLowerCase().includes(term)));
  if (!list.length) return `<div class="empty card">${icon('search', 'icon-lg')}<p class="mt-8">Nothing matches those filters.</p></div>`;

  const groups = resourceTopics.map((tp) => [tp, list.filter((r) => r.topic === tp.id)]).filter(([, rs]) => rs.length);
  return groups.map(([tp, rs]) => `
    <section class="lib-group">
      <h2 class="lib-group-title">${esc(tp.name)} <span class="dim mono">${rs.length}</span></h2>
      <div class="lib-grid">
        ${rs.map((r) => `
          <article class="card lib-card ${state.readRes[r.id] ? 'is-read' : ''}">
            <div class="chip-row"><span class="chip chip-mono">${esc(r.type)}</span><span class="chip ${r.level === 'Start' ? 'chip-accent' : r.level === 'Core' ? 'chip-blue' : 'chip-violet'}">${esc(r.level)}</span>${r.free ? '<span class="chip">Free</span>' : '<span class="chip">Paid</span>'}</div>
            <h3><a href="${r.url}" target="_blank" rel="noopener">${esc(r.title)} ${icon('external', 'icon-sm')}<span class="sr-only">(opens in a new tab)</span></a></h3>
            <p>${esc(r.why)}</p>
            <div class="lab-tile-foot"><span>${esc(new URL(r.url).hostname.replace(/^www\./, ''))}</span>
              <button class="btn btn-sm ${state.readRes[r.id] ? 'btn-secondary' : 'btn-ghost'}" type="button" data-action="toggle-resource" data-id="${r.id}" data-key="res-${r.id}" aria-pressed="${!!state.readRes[r.id]}">${icon('check', 'icon-sm')} ${state.readRes[r.id] ? 'Done' : 'Mark done'}</button></div>
          </article>`).join('')}
      </div>
    </section>`).join('');
}

/* ---------- Portfolio projects ---------- */
function viewProjects([projectId]) {
  const p = portfolioProjects.find((x) => x.id === projectId);
  const pillarName = (id) => diagnosticPillars.find((d) => d.id === id)?.name || '';

  if (!p) {
    return {
      title: 'Portfolio projects',
      html: `<div class="container">${crumbs(['Labs', '#/labs'], ['Portfolio projects'])}
        <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Portfolio projects</span><h1>Build proof, not just knowledge</h1>
          <p class="lead">Each project is a small deployment with a realistic customer brief and acceptance criteria. Ship three and you have a portfolio, a set of interview stories, and real evidence for every pillar.</p></div></header>
        <div class="case-list">
          ${portfolioProjects.map((x) => {
            const done = x.criteria.filter((c) => state.projects[x.id]?.[c.id]).length;
            const st = PILLAR_STYLE[x.pillar];
            return `<a class="card card-link case-card" href="#/labs/projects/${x.id}">
              <div class="chip-row"><span class="chip tone-${st.tone}" style="border:none">${icon(st.icon, 'icon-sm')} ${esc(pillarName(x.pillar))}</span><span class="chip chip-mono">${esc(x.level)}</span><span class="chip chip-mono">${esc(x.hours)}</span>${done === x.criteria.length ? '<span class="chip chip-accent">Shipped</span>' : ''}</div>
              <h3>${esc(x.title)}</h3>
              <p>${esc(x.brief)}</p>
              <div class="station-mini-bar" aria-hidden="true"><span style="width:${pct(done, x.criteria.length)}%"></span></div>
              <div class="lab-tile-foot"><span>${done}/${x.criteria.length} criteria met</span><span class="go">Open brief ${icon('arrowRight', 'icon-sm')}</span></div>
            </a>`;
          }).join('')}
        </div>
      </div>`
    };
  }

  const done = p.criteria.filter((c) => state.projects[p.id]?.[c.id]).length;
  const shipped = done === p.criteria.length;
  const st = PILLAR_STYLE[p.pillar];
  return {
    title: p.title,
    html: `<div class="container">${crumbs(['Labs', '#/labs'], ['Portfolio projects', '#/labs/projects'], [p.title])}
      <header class="page-head"><div style="max-width:820px">
        <div class="chip-row"><span class="chip tone-${st.tone}" style="border:none">${icon(st.icon, 'icon-sm')} ${esc(pillarName(p.pillar))}</span><span class="chip chip-mono">${esc(p.level)}</span><span class="chip chip-mono">${icon('clock', 'icon-sm')} ${esc(p.hours)}</span></div>
        <h1>${esc(p.title)}</h1></div>
        <div class="ring" style="width:84px;height:84px">${ring(pct(done, p.criteria.length), 84, 7)}<div class="ring-label"><div><strong style="font-size:20px">${done}/${p.criteria.length}</strong><span>criteria</span></div></div></div>
      </header>
      ${shipped ? `<div class="callout accent"><div class="callout-title">Shipped</div><p>Every acceptance criterion is met. Add it to your portfolio, then write it up as a Story bank entry.</p></div>` : ''}
      <div class="pb-grid">
        <div class="stack" style="--stack:20px">
          <div class="callout amber"><div class="callout-title">The customer brief</div><p>${esc(p.brief)}</p></div>
          <section class="panel"><div class="panel-title">What you'll build</div><p>${esc(p.build)}</p><div class="chip-row mt-16">${p.stack.map((x) => `<span class="chip chip-mono">${esc(x)}</span>`).join('')}</div></section>
          <section class="panel"><div class="panel-title">Acceptance criteria</div>
            <div class="task-list">
              ${p.criteria.map((c) => `
                <label class="task">
                  <input type="checkbox" data-crit="${p.id}:${c.id}" data-key="crit-${c.id}" ${state.projects[p.id]?.[c.id] ? 'checked' : ''}>
                  <span class="task-box">${icon('check', 'icon-sm')}</span>
                  <span class="task-content"><span class="task-text">${esc(c.text)}</span></span>
                </label>`).join('')}
            </div>
          </section>
        </div>
        <div class="stack" style="--stack:20px">
          <section class="panel"><div class="panel-title">Proof to show</div><p>${esc(p.proof)}</p></section>
          <section class="panel"><div class="panel-title">Stretch goals</div><ul class="plain-list good">${p.stretch.map((x) => `<li>${icon('zap', 'icon-sm')}<span>${esc(x)}</span></li>`).join('')}</ul></section>
          <section class="panel"><div class="panel-title">Learn from</div>${p.resources.map((id) => resById[id]).filter(Boolean).map(resourceLink).join('')}</section>
        </div>
      </div>
    </div>`
  };
}

/* ---------- Decomp drill ---------- */
const DRILL_TOTAL_MS = decompPhases.reduce((a, ph) => a + ph.minutes, 0) * 60000;
let tickerId = null;

const drillState = (id) => (state.drills[id] ||= { notes: {}, rubric: {}, done: false });
const drillElapsed = () => {
  const t = state.drillTimer;
  return t ? t.elapsedBefore + (t.startedAt ? Date.now() - t.startedAt : 0) : 0;
};
const phaseAt = (ms) => phaseAtFor(ms, decompPhases);
function paintClock() {
  const el = document.getElementById('drillClock');
  if (!el) return;
  const remaining = DRILL_TOTAL_MS - drillElapsed();
  el.textContent = fmtClock(remaining);
  el.classList.toggle('over', remaining < 0);
  const cur = phaseAt(drillElapsed());
  document.querySelectorAll('[data-phase-row]').forEach((row) => row.classList.toggle('active', !!state.drillTimer && row.dataset.phaseRow === cur));
}
function startTicker() { stopTickerOnly(); tickerId = setInterval(paintClock, 1000); }
function stopTickerOnly() { if (tickerId) clearInterval(tickerId); tickerId = null; }
function stopTicker() {
  stopTickerOnly();
  const t = state.drillTimer;
  if (t?.startedAt) { t.elapsedBefore += Date.now() - t.startedAt; t.startedAt = null; }
}

function viewDecomp([promptId]) {
  const d = decompPrompts.find((x) => x.id === promptId);
  if (!d) {
    const list = decompPrompts.filter((x) => state.drillLevel === 'all' || x.level === state.drillLevel);
    return {
      title: 'Decomp drill',
      html: `<div class="container">${crumbs(['Labs', '#/labs'], ['Decomp drill'])}
        <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Decomp drill</span><h1>45 minutes, one messy problem</h1>
          <p class="lead">The decomposition round is where FDE loops are won or lost. Pick a prompt, start the clock, and work through five phases out loud or in writing. Halfway through, the interviewer changes the rules.</p></div></header>
        <div class="filters mt-8" role="group" aria-label="Filter by level" style="margin-bottom:20px">
          ${['all', ...LEVELS].map((l) => `<button class="filter" type="button" data-action="drill-level" data-level="${l}" aria-pressed="${state.drillLevel === l}" data-key="dl-${l}">${l === 'all' ? 'All levels' : l}</button>`).join('')}
        </div>
        <div class="case-list">
          ${list.map((x) => {
            const ds = state.drills[x.id];
            const started = ds && Object.values(ds.notes || {}).some((v) => v.trim());
            return `<a class="card card-link case-card" href="#/labs/decomp/${x.id}">
              <div class="chip-row"><span class="chip chip-amber">${esc(x.domain)}</span><span class="chip chip-mono">${esc(x.level)}</span>${ds?.done ? '<span class="chip chip-accent">Completed</span>' : started ? '<span class="chip chip-blue">In progress</span>' : ''}</div>
              <h3>${esc(x.title)}</h3>
              <p>${esc(x.prompt)}</p>
              <div class="lab-tile-foot"><span>${decompPhases.length} phases · 45 min</span><span class="go">${icon('timer', 'icon-sm')} Start drill</span></div>
            </a>`;
          }).join('')}
        </div>
      </div>`
    };
  }

  const ds = drillState(d.id);
  if (state.drillTimer && state.drillTimer.promptId !== d.id) state.drillTimer = null;
  const t = state.drillTimer;
  const running = !!t?.startedAt;
  const showTwist = !!state.revealTwist[d.id];
  const rubricScore = decompRubric.filter((r) => ds.rubric[r.id]).length;

  return {
    title: `Drill: ${d.title}`,
    html: `<div class="container">${crumbs(['Labs', '#/labs'], ['Decomp drill', '#/labs/decomp'], [d.title])}
      <header class="page-head"><div style="max-width:820px"><div class="chip-row"><span class="chip chip-amber">${esc(d.domain)}</span><span class="chip chip-mono">${esc(d.level)}</span>${ds.done ? '<span class="chip chip-accent">Completed</span>' : ''}</div><h1>${esc(d.title)}</h1></div></header>
      <div class="drill">
        <div class="stack" style="--stack:16px">
          <div class="callout amber"><div class="callout-title">The prompt</div><p>${esc(d.prompt)}</p></div>
          ${decompPhases.map((ph, i) => `
            <section class="panel drill-phase">
              <div class="spread"><h2 class="drill-phase-title"><span class="step-n">${pad(i + 1)}</span> ${esc(ph.title)}</h2><span class="chip chip-mono">${ph.minutes} min</span></div>
              <p class="muted mt-8">${esc(ph.guide)}</p>
              <details class="hint"><summary>${icon('bulb', 'icon-sm')} Show a hint</summary><p>${esc(ph.hint)}</p></details>
              <label class="sr-only" for="note-${ph.id}">Your notes for ${esc(ph.title)}</label>
              <textarea id="note-${ph.id}" class="notes" rows="5" data-note="${d.id}:${ph.id}" placeholder="Your notes…">${esc(ds.notes[ph.id] || '')}</textarea>
            </section>
            ${ph.id === 'workflow' ? `
            <section class="panel twist ${showTwist ? 'open' : ''}">
              <div class="panel-title">${icon('alert', 'icon-sm')} The interviewer interrupts</div>
              ${showTwist
                ? `<p class="dilemma">${esc(d.twist)}</p><p class="muted mt-8">How does your design change? Say what stays, what moves, and what you'd cut.</p>
                   <textarea class="notes mt-16" rows="4" data-note="${d.id}:twist" aria-label="Your response to the twist" placeholder="Your response…">${esc(ds.notes.twist || '')}</textarea>`
                : `<p class="muted">Real interviewers change a constraint mid-answer to see how you adapt. Reveal it once you've sketched your workflow.</p><button class="btn btn-secondary btn-sm mt-16" type="button" data-action="drill-twist" data-id="${d.id}">${icon('eye', 'icon-sm')} Reveal the twist</button>`}
            </section>` : ''}`).join('')}
          <section class="panel">
            <div class="panel-title"><span>Self-review</span><span>${rubricScore}/${decompRubric.length}</span></div>
            <div class="task-list">
              ${decompRubric.map((r) => `
                <label class="task">
                  <input type="checkbox" data-rubric="${d.id}:${r.id}" data-key="rub-${r.id}" ${ds.rubric[r.id] ? 'checked' : ''}>
                  <span class="task-box">${icon('check', 'icon-sm')}</span>
                  <span class="task-content"><span class="task-text">${esc(r.text)}</span></span>
                </label>`).join('')}
            </div>
            <div class="btn-row mt-24">
              <button class="btn btn-primary" type="button" data-action="drill-complete" data-id="${d.id}">${icon('check')} ${ds.done ? 'Completed — run it again later' : 'Mark drill complete'}</button>
              <button class="btn btn-secondary" type="button" data-action="drill-copy" data-id="${d.id}">${icon('copy')} Copy notes as Markdown</button>
              <button class="btn btn-ghost" type="button" data-action="drill-clear" data-id="${d.id}">${icon('reset')} Clear notes</button>
            </div>
          </section>
        </div>
        <aside class="drill-side">
          <div class="panel">
            <div class="panel-title"><span>Clock</span><span>${running ? 'running' : t ? 'paused' : 'ready'}</span></div>
            <div class="drill-clock mono" id="drillClock" role="timer" aria-live="off">${fmtClock(DRILL_TOTAL_MS - drillElapsed())}</div>
            <div class="btn-row mt-16">
              ${running
                ? `<button class="btn btn-secondary btn-sm" type="button" data-action="drill-pause" data-key="drill-toggle">${icon('pause', 'icon-sm')} Pause</button>`
                : `<button class="btn btn-primary btn-sm" type="button" data-action="drill-start" data-id="${d.id}" data-key="drill-toggle">${icon('play', 'icon-sm')} ${t ? 'Resume' : 'Start'}</button>`}
              <button class="btn btn-ghost btn-sm" type="button" data-action="drill-reset">${icon('reset', 'icon-sm')} Reset</button>
            </div>
            <ol class="phase-plan mt-16">
              ${decompPhases.map((ph, i) => `<li data-phase-row="${ph.id}"><span class="mono dim">${pad(i + 1)}</span><span>${esc(ph.title)}</span><span class="mono dim">${ph.minutes}m</span></li>`).join('')}
            </ol>
          </div>
          <div class="panel"><div class="panel-title">Go deeper</div>${['r-ddd', 'r-bounded', 'r-saga'].map((id) => resourceLink(resById[id])).join('')}</div>
        </aside>
      </div>
    </div>`,
    after() { paintClock(); if (running) startTicker(); }
  };
}

function drillMarkdown(id) {
  const d = decompPrompts.find((x) => x.id === id);
  const ds = drillState(id);
  const lines = [`# Decomp drill: ${d.title}`, '', `> ${d.prompt}`, ''];
  decompPhases.forEach((ph) => { lines.push(`## ${ph.title}`, '', (ds.notes[ph.id] || '_No notes._').trim(), ''); });
  if (state.revealTwist[id] || ds.notes.twist) lines.push('## Twist', '', `> ${d.twist}`, '', (ds.notes.twist || '_No notes._').trim(), '');
  lines.push('## Self-review', '', ...decompRubric.map((r) => `- [${ds.rubric[r.id] ? 'x' : ' '}] ${r.text}`), '');
  return lines.join('\n');
}

/* ---------- Story bank ---------- */
const storyComplete = (p) => starFields.every((f) => (state.stories[p.id]?.[f.id] || '').trim().length >= 15);

function viewStories() {
  const done = storyPrompts.filter(storyComplete).length;
  return {
    title: 'Story bank',
    html: `<div class="container">${crumbs(['Labs', '#/labs'], ['Story bank'])}
      <header class="page-head"><div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Story bank</span><h1>Your behavioral stories, ready to tell</h1>
        <p class="lead">Every FDE loop has a culture or behavioral round, and the same eight questions come up again and again. Write each answer once in STAR form, then rehearse it out loud in under two minutes. Everything saves in this browser as you type.</p></div>
        <div class="row"><span class="chip chip-accent" id="storyCount">${done}/${storyPrompts.length} complete</span><button class="btn btn-secondary" type="button" data-action="stories-copy">${icon('copy')} Copy all as Markdown</button></div></header>
      <div class="stack" style="--stack:16px">
        ${storyPrompts.map((p, i) => `
          <section class="panel story" id="story-${p.id}">
            <div class="spread"><h2 class="drill-phase-title"><span class="step-n">${pad(i + 1)}</span> ${esc(p.title)}</h2><span class="chip ${storyComplete(p) ? 'chip-accent' : ''}" data-story-status="${p.id}">${storyComplete(p) ? 'Complete' : 'Draft'}</span></div>
            <p class="mt-8"><strong>"${esc(p.prompt)}"</strong></p>
            <p class="muted" style="font-size:14px">Likely follow-up: ${esc(p.probe)}</p>
            <div class="star-grid mt-16">
              ${starFields.map((f) => `
                <label class="star-field"><span class="star-label">${f.label}</span><span class="star-help">${esc(f.help)}</span>
                  <textarea class="notes" rows="3" data-story="${p.id}:${f.id}">${esc(state.stories[p.id]?.[f.id] || '')}</textarea></label>`).join('')}
            </div>
          </section>`).join('')}
      </div>
    </div>`
  };
}

function storiesMarkdown() {
  const lines = ['# My FDE story bank', ''];
  storyPrompts.forEach((p) => {
    lines.push(`## ${p.title}`, '', `_${p.prompt}_`, '');
    starFields.forEach((f) => lines.push(`**${f.label}:** ${(state.stories[p.id]?.[f.id] || '').trim() || '—'}`, ''));
  });
  return lines.join('\n');
}

async function copyMarkdown(text, filename) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied as Markdown');
  } catch {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/markdown' }));
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Downloaded as Markdown');
  }
}

function viewNotFound() {
  return { title: 'Not found', html: `<div class="container"><div class="empty" style="padding:96px 0"><h1>Off the map.</h1><p class="mt-8">That page doesn't exist.</p><a class="btn btn-primary mt-24" href="#/">Back to base</a></div></div>` };
}

/* ==========================================================================
   6. ACTIONS
   ========================================================================== */
function award(xp, message) { markActive(); toast(message, xp); }

function flag(stateKey, storeKey, id, xp, msg) {
  if (state[stateKey][id]) delete state[stateKey][id];
  else { state[stateKey][id] = true; award(xp, msg); }
  persist(storeKey, stateKey);
}

function nextUnanswered() {
  const qs = diagnosticQuestions;
  for (let k = 1; k <= qs.length; k++) {
    const i = (state.quizIndex + k) % qs.length;
    if (state.quiz[qs[i].id] === undefined) return i;
  }
  return state.quizIndex;
}

function adoptRole(roleId) {
  state.role = roleId; store.set('fde_role', roleId);
  state.onboarded = true; persist('fde_onboarded', 'onboarded');
  state.openStations = {};
}

const ACTIONS = {
  'home-pick'(el) {
    state.role = el.dataset.role; store.set('fde_role', state.role);
    if (state.onboarded) { state.openStations = {}; toast('Track switched — checkmarks kept.'); location.hash = '#/journey'; }
    else { state.onboardStep = 2; location.hash = '#/start'; }
  },
  'pick-role'(el) { state.role = el.dataset.role; store.set('fde_role', state.role); rerender(); },
  'pick-target'(el) { state.target = el.dataset.id || null; persist('fde_target', 'target'); rerender(); },
  'onboard-next'() { state.onboardStep = Math.min(3, state.onboardStep + 1); rerender(); window.scrollTo({ top: 0 }); },
  'onboard-back'() { state.onboardStep = Math.max(1, state.onboardStep - 1); rerender(); window.scrollTo({ top: 0 }); },
  'onboard-finish'() {
    adoptRole(state.role);
    state.onboardStep = 1;
    markActive(); toast('Route locked in. Station 00 is open.');
    location.hash = '#/journey';
  },
  'change-track'(el, e) { e.preventDefault(); state.onboardStep = 1; location.hash = '#/start'; },
  'toggle-station'(el) { const id = el.dataset.id; state.openStations[id] = !state.openStations[id]; rerender(); },
  'expand-all'() { stationsFor(state.role).forEach((s) => { state.openStations[s.id] = true; }); rerender(); },
  'collapse-all'() { stationsFor(state.role).forEach((s) => { state.openStations[s.id] = false; }); rerender(); },
  'goto-station'(el) {
    const id = el.dataset.id; state.openStations[id] = true; rerender();
    const target = document.getElementById(`station-${id}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target?.querySelector('input[type="checkbox"]:not(:checked)')?.focus({ preventScroll: true });
  },
  'lesson-done'(el) {
    const id = el.dataset.id;
    if (!state.lessons[id]) { state.lessons[id] = true; persist('fde_lessons', 'lessons'); award(XP.lesson, 'Lesson complete'); }
    location.hash = el.dataset.next ? `#/orientation/${el.dataset.next}` : '#/journey';
  },
  answer(el) {
    state.quiz[el.dataset.q] = Number(el.dataset.score); persist('fde_quiz_answers', 'quiz');
    rerender();
    const next = nextUnanswered();
    if (next !== state.quizIndex) setTimeout(() => { state.quizIndex = next; rerender(); }, 260);
  },
  'quiz-prev'() { state.quizIndex = Math.max(0, state.quizIndex - 1); rerender(); },
  'quiz-next'() { state.quizIndex = Math.min(diagnosticQuestions.length - 1, state.quizIndex + 1); rerender(); },
  'quiz-finish'() {
    if (!state.diagDone) { state.diagDone = true; persist('fde_diag_done', 'diagDone'); award(XP.diagnostic, 'Diagnostic complete'); }
    rerender(); window.scrollTo({ top: 0 });
  },
  'quiz-reset'() { state.quiz = {}; state.quizIndex = 0; persist('fde_quiz_answers', 'quiz'); rerender(); window.scrollTo({ top: 0 }); },
  'adopt-role'(el) { adoptRole(el.dataset.role); toast('Journey switched — checkmarks kept.'); location.hash = '#/journey'; },
  'sim-pick'(el) {
    const run = state.sim; const sim = simulations.find((s) => s.id === run.id);
    const opt = sim.stages[run.idx].options.find((o) => o.id === el.dataset.id);
    run.picked = opt.id;
    applyImpact(run, opt.impact);
    rerender();
    app.querySelector('[data-key="sim-next"]')?.focus({ preventScroll: true });
  },
  'sim-next'() {
    const run = state.sim; const sim = simulations.find((s) => s.id === run.id);
    run.idx += 1; run.picked = null;
    if (run.idx >= sim.stages.length) {
      const score = simScore(run);
      const first = state.sims[sim.id] === undefined;
      state.sims[sim.id] = Math.max(state.sims[sim.id] ?? 0, score); persist('fde_sims', 'sims');
      if (first) award(XP.sim, 'Mission complete'); else markActive();
    }
    rerender(); window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  'sim-restart'() { state.sim = null; rerender(); window.scrollTo({ top: 0 }); },
  'toggle-studied'(el) { flag('studied', 'fde_studied', el.dataset.id, XP.studied, 'Case studied'); rerender(); },
  'toggle-practiced'(el) {
    const id = el.dataset.id;
    flag('practiced', 'fde_practiced', id, XP.practiced, 'Question practiced');
    document.getElementById('qList').innerHTML = questionListHtml();
    renderChrome(parseHash().path);
    const card = app.querySelector(`details[data-qid="${id}"]`);
    if (card) { card.open = true; card.querySelector('[data-action="toggle-practiced"]')?.focus({ preventScroll: true }); }
  },
  'q-cat'(el) { state.qCat = el.dataset.cat; history.replaceState(null, '', '#/labs/questions'); rerender(); },
  'lib-topic'(el) { state.libTopic = el.dataset.topic; history.replaceState(null, '', '#/library'); rerender(); },
  'lib-level'(el) { state.libLevel = el.dataset.level; rerender(); },
  'lib-free'() { state.libFree = !state.libFree; rerender(); },
  'toggle-resource'(el) {
    flag('readRes', 'fde_resources', el.dataset.id, XP.resource, 'Resource done');
    if (document.getElementById('libList')) {
      document.getElementById('libList').innerHTML = libraryListHtml();
      renderChrome(parseHash().path);
      app.querySelector(`[data-key="res-${el.dataset.id}"]`)?.focus({ preventScroll: true });
    } else rerender();
  },
  'drill-level'(el) { state.drillLevel = el.dataset.level; rerender(); },
  'drill-start'(el) {
    const t = state.drillTimer;
    state.drillTimer = t && t.promptId === el.dataset.id ? { ...t, startedAt: Date.now() } : { promptId: el.dataset.id, elapsedBefore: 0, startedAt: Date.now() };
    markActive(); rerender();
  },
  'drill-pause'() { stopTicker(); rerender(); },
  'drill-reset'() { stopTickerOnly(); state.drillTimer = null; rerender(); },
  'drill-twist'(el) { state.revealTwist[el.dataset.id] = true; rerender(); },
  'drill-complete'(el) {
    const ds = drillState(el.dataset.id);
    if (!ds.done) { ds.done = true; persist('fde_drills', 'drills'); award(XP.drill, 'Drill complete'); }
    stopTicker(); rerender();
  },
  'drill-copy'(el) { copyMarkdown(drillMarkdown(el.dataset.id), `decomp-${el.dataset.id}.md`); },
  'drill-clear'(el) {
    if (!window.confirm('Clear all notes and self-review for this drill?')) return;
    const ds = drillState(el.dataset.id);
    ds.notes = {}; ds.rubric = {}; persist('fde_drills', 'drills');
    delete state.revealTwist[el.dataset.id]; rerender();
  },
  'stories-copy'() { copyMarkdown(storiesMarkdown(), 'fde-story-bank.md'); },
  'set-target'(el) {
    state.target = state.target === el.dataset.id ? null : el.dataset.id; persist('fde_target', 'target');
    toast(state.target ? 'Target set. Your final station is updated.' : 'Target cleared.');
    rerender();
  }
};

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  ACTIONS[el.dataset.action]?.(el, e);
});

app.addEventListener('change', (e) => {
  const crit = e.target.closest('input[data-crit]');
  if (crit) {
    const [pid, cid] = crit.dataset.crit.split(':');
    const proj = portfolioProjects.find((x) => x.id === pid);
    state.projects[pid] ||= {};
    if (crit.checked) { state.projects[pid][cid] = true; award(XP.criterion, 'Criterion met'); }
    else delete state.projects[pid][cid];
    persist('fde_projects', 'projects');
    if (crit.checked && projectDone(proj)) toast(`Shipped: ${proj.title}`);
    rerender();
    return;
  }
  const rub = e.target.closest('input[data-rubric]');
  if (rub) {
    const [did, rid] = rub.dataset.rubric.split(':');
    const ds = drillState(did);
    if (rub.checked) ds.rubric[rid] = true; else delete ds.rubric[rid];
    persist('fde_drills', 'drills');
    rerender();
    return;
  }
  const cb = e.target.closest('input[data-task]');
  if (!cb) return;
  const before = journeyProgress().current?.id;
  if (cb.checked) { state.tasks[cb.dataset.task] = true; award(XP.task, 'Milestone cleared'); }
  else delete state.tasks[cb.dataset.task];
  persist('fde_tasks', 'tasks');
  const after = journeyProgress().current?.id;
  if (cb.checked && after && before !== after) {
    state.openStations[after] = true;
    toast('Station cleared. Next station unlocked.');
  }
  rerender();
});

// Notes and stories save as you type, without re-rendering (keeps the caret where it is).
let saveTimer = null;
const saveSoon = (key, stateKey) => { clearTimeout(saveTimer); saveTimer = setTimeout(() => persist(key, stateKey), 400); };

app.addEventListener('input', (e) => {
  const note = e.target.closest('textarea[data-note]');
  if (note) {
    const [did, phase] = note.dataset.note.split(':');
    drillState(did).notes[phase] = note.value;
    saveSoon('fde_drills', 'drills');
    return;
  }
  const story = e.target.closest('textarea[data-story]');
  if (story) {
    const [sid, field] = story.dataset.story.split(':');
    (state.stories[sid] ||= {})[field] = story.value;
    saveSoon('fde_stories', 'stories');
    const p = storyPrompts.find((x) => x.id === sid);
    const complete = storyComplete(p);
    const chip = app.querySelector(`[data-story-status="${sid}"]`);
    if (chip) { chip.textContent = complete ? 'Complete' : 'Draft'; chip.classList.toggle('chip-accent', complete); }
    const count = document.getElementById('storyCount');
    if (count) count.textContent = `${storyPrompts.filter(storyComplete).length}/${storyPrompts.length} complete`;
    if (complete && !state.storiesAwarded[sid]) {
      state.storiesAwarded[sid] = true; persist('fde_stories_awarded', 'storiesAwarded');
      award(XP.story, 'Story complete'); renderChrome(parseHash().path);
    }
  }
});

window.addEventListener('beforeunload', () => { persist('fde_drills', 'drills'); persist('fde_stories', 'stories'); });

document.addEventListener('keydown', (e) => {
  if (parseHash().path !== '/labs/diagnostic' || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.target.matches('input, textarea')) return;
  if (state.diagDone && Object.keys(state.quiz).length === diagnosticQuestions.length) return;
  const q = diagnosticQuestions[state.quizIndex];
  const n = Number(e.key);
  if (n >= 1 && n <= q.options.length) { e.preventDefault(); ACTIONS.answer({ dataset: { q: q.id, score: q.options[n - 1].score } }); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); ACTIONS['quiz-next'](); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); ACTIONS['quiz-prev'](); }
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = effectiveTheme() === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('fde_theme', next); } catch { /* ignore */ }
  document.querySelector('meta[name="theme-color"]').setAttribute('content', next === 'light' ? '#F5F6F2' : '#0A0E14');
  renderChrome(parseHash().path);
});

window.addEventListener('hashchange', render);
renderStaticChrome();
render();
