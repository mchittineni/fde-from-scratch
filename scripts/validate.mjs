// Validates the content data and checks every JS file parses.
// Run with: npm run validate
import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];
const fail = (msg) => errors.push(msg);

// ---- 1. Syntax check every JS file ----
const IGNORED_DIRS = new Set(['node_modules', 'test-results', 'playwright-report', 'blob-report', 'coverage', '_site']);
function jsFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (IGNORED_DIRS.has(name) || name.startsWith('.')) return [];
    return statSync(p).isDirectory() ? jsFiles(p) : /\.(m?js)$/.test(name) ? [p] : [];
  });
}
for (const file of jsFiles(root)) {
  const r = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (r.status !== 0) fail(`Syntax error in ${relative(root, file)}:\n${r.stderr}`);
}

// ---- 2. Load data modules ----
const load = (f) => import(new URL(`../src/data/${f}`, import.meta.url));
const { experienceLevels } = await load('roadmaps.js');
const { diagnosticPillars, diagnosticQuestions } = await load('diagnostic.js');
const { companyPlaybooks } = await load('companies.js');
const { simulations } = await load('simulations.js');
const { caseStudies } = await load('caseStudies.js');
const { questionBank } = await load('questionBank.js');
const { orientationLessons } = await load('foundations.js');
const { resources, resourceTopics } = await load('resources.js');
const { portfolioProjects, decompPhases, decompRubric, decompPrompts, storyPrompts, starFields } = await load('labs.js');

const unique = (label, ids) => {
  const seen = new Set();
  for (const id of ids) {
    if (!id) fail(`${label}: missing id`);
    else if (seen.has(id)) fail(`${label}: duplicate id "${id}"`);
    seen.add(id);
  }
};
const required = (label, obj, fields) => {
  for (const f of fields) {
    const v = obj[f];
    if (v === undefined || v === null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length)) fail(`${label}: missing "${f}"`);
  }
};

const pillarIds = new Set(diagnosticPillars.map((p) => p.id));
const topicIds = new Set(resourceTopics.map((t) => t.id));
const LEVELS = new Set(['Start', 'Core', 'Deep']);
const TYPES = new Set(['Book', 'Docs', 'Course', 'Article', 'Tool', 'Guide']);

// Roadmaps — task ids must be unique across every track (they share one progress store)
unique('roadmap tracks', Object.values(experienceLevels).map((r) => r.id));
unique('roadmap tasks', Object.values(experienceLevels).flatMap((r) => r.weeks.flatMap((w) => w.tasks.map((t) => t.id))));
for (const r of Object.values(experienceLevels)) {
  required(`track ${r.id}`, r, ['title', 'experience', 'tagline', 'overview', 'weeks']);
  r.weeks.forEach((w, i) => required(`track ${r.id} week ${i + 1}`, w, ['week', 'title', 'focus', 'summary', 'tasks']));
}

// Orientation
unique('orientation lesson ids', orientationLessons.map((l) => l.id));
unique('orientation lesson slugs', orientationLessons.map((l) => l.slug));
orientationLessons.forEach((l) => required(`lesson ${l.id}`, l, ['title', 'slug', 'minutes', 'summary', 'blocks']));
const { LESSON_DIAGRAMS } = await import(new URL('../src/lib/diagrams.js', import.meta.url));
const lessonChecks = orientationLessons.flatMap((l) => l.blocks.filter((b) => b.type === 'check'));
unique('knowledge checks', lessonChecks.map((c) => c.id));
for (const l of orientationLessons) {
  for (const b of l.blocks) {
    if (b.type === 'diagram' && !LESSON_DIAGRAMS[b.name]) fail(`lesson ${l.id}: unknown diagram "${b.name}"`);
    if (b.type !== 'check') continue;
    required(`check ${b.id}`, b, ['question', 'options', 'explain']);
    if (!(b.options?.length >= 2)) fail(`check ${b.id}: needs at least two options`);
    if (!Number.isInteger(b.answer) || b.answer < 0 || b.answer >= (b.options?.length || 0)) fail(`check ${b.id}: answer must index an option`);
  }
}

// Diagnostic
unique('diagnostic questions', diagnosticQuestions.map((q) => q.id));
diagnosticQuestions.forEach((q) => {
  if (!pillarIds.has(q.pillar)) fail(`diagnostic ${q.id}: unknown pillar "${q.pillar}"`);
  unique(`diagnostic ${q.id} option scores`, q.options.map((o) => String(o.score)));
});

// Library
unique('resources', resources.map((r) => r.id));
unique('resource urls', resources.map((r) => r.url));
for (const r of resources) {
  required(`resource ${r.id}`, r, ['title', 'url', 'topic', 'level', 'type', 'why']);
  if (!/^https:\/\//.test(r.url)) fail(`resource ${r.id}: url must be https`);
  if (!topicIds.has(r.topic)) fail(`resource ${r.id}: unknown topic "${r.topic}"`);
  if (!LEVELS.has(r.level)) fail(`resource ${r.id}: level must be Start, Core or Deep`);
  if (!TYPES.has(r.type)) fail(`resource ${r.id}: type must be one of ${[...TYPES].join(', ')}`);
  if (typeof r.free !== 'boolean') fail(`resource ${r.id}: "free" must be true or false`);
}
const resIds = new Set(resources.map((r) => r.id));

// Portfolio projects
unique('projects', portfolioProjects.map((p) => p.id));
for (const p of portfolioProjects) {
  required(`project ${p.id}`, p, ['title', 'pillar', 'topic', 'level', 'hours', 'brief', 'build', 'stack', 'criteria', 'proof', 'resources']);
  if (!pillarIds.has(p.pillar)) fail(`project ${p.id}: unknown pillar "${p.pillar}"`);
  if (!topicIds.has(p.topic)) fail(`project ${p.id}: unknown topic "${p.topic}"`);
  if (!LEVELS.has(p.level)) fail(`project ${p.id}: level must be Start, Core or Deep`);
  unique(`project ${p.id} criteria`, p.criteria.map((c) => c.id));
  p.resources.forEach((id) => { if (!resIds.has(id)) fail(`project ${p.id}: unknown resource "${id}"`); });
}

// Decomp drill + story bank
unique('decomp phases', decompPhases.map((p) => p.id));
unique('decomp rubric', decompRubric.map((r) => r.id));
unique('decomp prompts', decompPrompts.map((d) => d.id));
decompPrompts.forEach((d) => {
  required(`decomp ${d.id}`, d, ['domain', 'level', 'title', 'prompt', 'twist']);
  if (!LEVELS.has(d.level)) fail(`decomp ${d.id}: level must be Start, Core or Deep`);
});
unique('story prompts', storyPrompts.map((s) => s.id));
unique('STAR fields', starFields.map((f) => f.id));

// Question bank, cases, companies
unique('questions', questionBank.map((q) => q.id));
questionBank.forEach((q) => required(`question ${q.id}`, q, ['category', 'company', 'level', 'title', 'prompt', 'modelAnswer', 'redFlags', 'followUp']));
unique('case studies', caseStudies.map((c) => c.id));
unique('companies', companyPlaybooks.map((c) => c.id));

// Simulations
unique('simulations', simulations.map((s) => s.id));
unique('simulation options', simulations.flatMap((s) => s.stages.flatMap((st) => st.options.map((o) => o.id))));
for (const s of simulations) {
  required(`simulation ${s.id}`, s, ['title', 'companyStyle', 'difficulty', 'client', 'stakes', 'role', 'background', 'stages', 'debrief']);
  for (const o of s.stages.flatMap((st) => st.options)) {
    for (const k of Object.keys(o.impact)) {
      if (!['trust', 'integrity', 'velocity'].includes(k)) fail(`simulation ${s.id} ${o.id}: unknown impact "${k}"`);
    }
  }
}

// ---- Report ----
if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found:\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`✓ Content valid — ${resources.length} resources, ${portfolioProjects.length} projects, ${decompPrompts.length} decomp prompts, ${questionBank.length} questions, ${simulations.length} simulations, ${orientationLessons.length} lessons.`);
