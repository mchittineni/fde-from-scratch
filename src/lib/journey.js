// Maps a roadmap station's text to practice links, library resources and a portfolio project.
// Functions take the learner's progress as arguments so they stay pure and testable.
import { resources, resourceTopics } from '../data/resources.js';
import { portfolioProjects } from '../data/labs.js';

export const qHref = (cat) => `#/labs/questions?c=${encodeURIComponent(cat)}`;

export const PRACTICE_RULES = [
  [/decomp|ambigu|domain model|framing|structuring|ontology/, { href: '#/labs/cases', label: 'Study a decomp case', icon: 'layers' }],
  [/diplomac|client|stakeholder|executive|storytelling|leadership|behavioral|board/, { href: '#/labs/simulator', label: 'Run a field simulation', icon: 'activity' }],
  [/linux|network|diagnos|air-gap|zero-trust|vpc|identity|security|infrastructure/, { href: qHref('Linux & Systems Diagnostics'), label: 'Drill systems triage questions', icon: 'terminal' }],
  [/\bai\b|llm|rag|agent|generative/, { href: qHref('Enterprise AI & LLMs'), label: 'Practice applied AI questions', icon: 'zap' }],
  [/spark|lakehouse|distributed|streaming|data engine|pipeline/, { href: qHref('Distributed Systems & Lakehouse'), label: 'Practice data systems questions', icon: 'database' }],
  [/coding|algo|full-stack|velocity|mvp|prototyp|fast shipping/, { href: qHref('Live Coding / Algo Patterns'), label: 'Practice coding patterns', icon: 'code' }],
  [/interview|mock|gauntlet|company|evaluation|polish/, { href: '#/playbooks', label: 'Open company playbooks', icon: 'building' }]
];

export const FALLBACK_PRACTICE = { href: '#/labs/diagnostic', label: 'Recalibrate with the diagnostic', icon: 'target' };

export function practiceFor(week) {
  const text = `${week.title} ${week.focus} ${week.summary}`.toLowerCase();
  const out = [];
  for (const [re, link] of PRACTICE_RULES) {
    if (re.test(text) && !out.some((l) => l.href === link.href)) out.push(link);
    if (out.length === 2) break;
  }
  if (!out.length) out.push(FALLBACK_PRACTICE);
  return out;
}

export const TOPIC_RULES = [
  [/decomp|ambigu|domain|ontology|framing|structuring|field-to-product|next deployment|platform and organizational/, 'decomp'],
  [/diplomac|client|stakeholder|executive|leadership|storytelling|behavioral|board|communication|mindset|outcome|role understanding|customer's problem/, 'diplomacy'],
  [/\bai\b|llm|rag|agent|generative/, 'ai'],
  [/\bsql\b|spark|lakehouse|streaming|pipeline|ingestion|wrangling|data engine|warehouse|kafka|\betl\b/, 'data'],
  [/security|enterprise identity|identity provider|zero-trust|vpc|compliance|governance|rbac|sovereign|\bsso\b|saml|oauth/, 'security'],
  [/linux|network|infra|diagnos|air-gap|kubernetes|cloud|deploy/, 'infra'],
  [/full-stack|mvp|prototyp|velocity|fast shipping|coding|algo/, 'velocity'],
  [/interview|mock|gauntlet|\bloop\b/, 'interview']
];

export const LEVEL_PREF = { entry: ['Start', 'Core', 'Deep'], transitioner: ['Start', 'Core', 'Deep'], mid: ['Core', 'Start', 'Deep'], senior: ['Core', 'Deep', 'Start'], staff: ['Deep', 'Core', 'Start'] };
export const topicById = Object.fromEntries(resourceTopics.map((t) => [t.id, t]));
export const resById = Object.fromEntries(resources.map((r) => [r.id, r]));

// Rank topics by how many of their keywords appear; the title counts double.
export function rankTopics(title, rest = '') {
  const count = (re, str) => (str.toLowerCase().match(new RegExp(re.source, 'g')) || []).length;
  return TOPIC_RULES
    .map(([re, id], order) => ({ id, order, score: count(re, title) * 2 + count(re, rest) }))
    .filter((t) => t.score > 0)
    .sort((x, y) => y.score - x.score || x.order - y.order)
    .filter((t, i) => i === 0 || (i === 1 && t.score >= 2)) // a secondary topic must be a strong match
    .map((t) => t.id);
}

export function topicsFor(title, rest = '') {
  const ranked = rankTopics(title, rest);
  return ranked.length ? ranked : ['diplomacy']; // fallback so no station is left without links
}

export const projectDone = (p, progress = {}) => p.criteria.every((c) => progress[p.id]?.[c.id]);

// progress: { role, readRes } — unread resources at the learner's level come first.
export function learnFor(topics, { role, readRes = {} } = {}, limit = 3) {
  const pref = LEVEL_PREF[role] || LEVEL_PREF.entry;
  const rank = (r) => pref.indexOf(r.level) * 10 + (readRes[r.id] ? 5 : 0);
  const pick = (t, n, skip = []) => resources.filter((r) => r.topic === t && !skip.includes(r)).sort((x, y) => rank(x) - rank(y)).slice(0, n);
  if (topics.length < 2) return pick(topics[0], limit);
  // the primary topic gets two of three slots; top up from it if the secondary runs short
  const primary = pick(topics[0], limit - 1);
  const secondary = pick(topics[1], limit - primary.length, primary);
  const topUp = pick(topics[0], limit, [...primary, ...secondary]);
  return [...primary, ...secondary, ...topUp].slice(0, limit);
}

// progress: { role, projects } — unfinished projects at the learner's level come first.
export function projectFor(topics, { role, projects = {} } = {}) {
  const pillars = topics.map((t) => topicById[t]?.pillar).filter(Boolean);
  const pref = LEVEL_PREF[role] || LEVEL_PREF.entry;
  const done = (p) => projectDone(p, projects);
  const byLevel = (a, b) => (done(a) - done(b)) || (pref.indexOf(a.level) - pref.indexOf(b.level));
  // the station's primary topic wins; interview stations build the exec demo
  const wanted = topics.map((t) => (t === 'interview' ? 'diplomacy' : t));
  const exact = portfolioProjects.filter((p) => wanted.includes(p.topic))
    .sort((a, b) => wanted.indexOf(a.topic) - wanted.indexOf(b.topic) || byLevel(a, b));
  return exact[0] || portfolioProjects.filter((p) => pillars.includes(p.pillar)).sort(byLevel)[0] || null;
}
