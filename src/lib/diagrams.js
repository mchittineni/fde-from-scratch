// Interactive SVG diagrams. Every function returns an HTML string and never touches the DOM,
// so each one can be unit tested in Node.
//
// Wiring: any element with data-action="select-diagram" data-diagram="<name>" data-value="<id>"
// stores the choice in state.diagrams[name] and swaps just that card (swapDiagram in main.js).
// The HTML button row is the keyboard and screen-reader path. SVG nodes are a pointer shortcut
// only, so they carry no role or tabindex: an <svg role="img"> hides its children from assistive tech.

import { esc } from './core.js';
import { diagnosticPillars } from '../data/diagnostic.js';

/* ---------- Shared building blocks ---------- */

const hit = (name, value) => `data-action="select-diagram" data-diagram="${name}" data-value="${esc(value)}"`;

function selector(name, label, items, activeId) {
  return `<div class="dg-selector" role="group" aria-label="${esc(label)}">${items.map((it) => {
    const on = it.id === activeId;
    return `<button class="filter${on ? ' active' : ''}" type="button" ${hit(name, it.id)} data-key="dg-${name}-${esc(it.id)}" aria-pressed="${on}">${esc(it.label)}</button>`;
  }).join('')}</div>`;
}

function card(name, { eyebrow, title, text }, sel, body) {
  return `<div class="card dg" id="dg-${name}">
    <div class="dg-head">
      <div><span class="eyebrow eyebrow-accent"><span class="dot"></span>${esc(eyebrow)}</span>
        <h3 class="dg-title">${esc(title)}</h3><p class="dg-sub">${esc(text)}</p></div>
      ${sel}
    </div>
    ${body}
  </div>`;
}

// The detail panel under or beside a diagram. `color` is always a token from this file or an
// escaped data value, never free text.
function inspector({ color, chip, title, lead = '', rows = [] }) {
  return `<div class="dg-inspector" style="--dg:${color}">
    <span class="dg-chip">${esc(chip)}</span>
    <h4 class="dg-inspector-title">${esc(title)}</h4>
    ${lead ? `<p class="dg-lead">${esc(lead)}</p>` : ''}
    <dl class="dg-rows">${rows.map((r) => `<div class="dg-row${r.tone ? ` dg-tone-${r.tone}` : ''}"><dt>${esc(r.label)}</dt><dd>${r.code ? `<code class="dg-code">${esc(r.text)}</code>` : esc(r.text)}</dd></div>`).join('')}</dl>
  </div>`;
}

// Greedy word wrap for SVG labels, which have no automatic line breaking.
export function wrapText(text, max) {
  const lines = [];
  let line = '';
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    if (line && `${line} ${word}`.length > max) { lines.push(line); line = word; } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

const tspans = (lines, x, lh) => lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join('');
const round = (n) => Math.round(n * 10) / 10;

// Smooth curve through points (Catmull-Rom converted to cubic Béziers).
export function smoothPath(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d += ` C${round(p1[0] + (p2[0] - p0[0]) / 6)},${round(p1[1] + (p2[1] - p0[1]) / 6)} ${round(p2[0] - (p3[0] - p1[0]) / 6)},${round(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const pick = (list, id) => list.find((x) => x.id === id) || list[0];

/* ---------- 1. The deployment lifecycle (home, lesson o1) ---------- */

export const DEPLOYMENT_LIFECYCLE_STAGES = [
  {
    id: 'embed', num: '01', title: 'Embed & discover', short: 'Embed', color: 'var(--blue)',
    tagline: 'Sit with the people who do the work before you write a line of code.',
    deliverable: 'Stakeholder map, workflow map and a list of every data source — including the undocumented ones.',
    trap: 'Designing from the architecture diagram instead of watching how operators actually work.',
    metric: 'You can name the sponsor, the operator in pain and the security gatekeeper.'
  },
  {
    id: 'decompose', num: '02', title: 'Decompose the ambiguity', short: 'Decompose', color: 'var(--amber)',
    tagline: 'Turn a vague executive ask into entities, data flows and a first shippable milestone.',
    deliverable: 'Entity model, data inventory and a milestone small enough to ship in days.',
    trap: 'Trying to model the whole enterprise before shipping anything.',
    metric: 'A first milestone the sponsor agrees is worth shipping.'
  },
  {
    id: 'prototype', num: '03', title: 'Prototype on real data', short: 'Prototype', color: 'var(--accent)',
    tagline: 'Ship working software on the customer’s real data in days, not quarters.',
    deliverable: 'A thin end-to-end slice that a real operator has used.',
    trap: 'Polishing a demo on clean synthetic data that hides the messy edge cases.',
    metric: 'A real user has done real work with it and told you what is wrong.'
  },
  {
    id: 'harden', num: '04', title: 'Harden for their constraints', short: 'Harden', color: 'var(--violet)',
    tagline: 'Make it survive SSO, private networks, restricted egress and a security review.',
    deliverable: 'A deployment package with access control, audit logging, monitoring and a runbook.',
    trap: 'Assuming outbound internet, admin rights or a cloud console will be available.',
    metric: 'It passes the customer’s security review and runs without you watching it.'
  },
  {
    id: 'feedback', num: '05', title: 'Feed the product', short: 'Feed back', color: 'var(--pink)',
    tagline: 'Turn what you built for one customer into something the next customer gets for free.',
    deliverable: 'Product feedback with evidence, or a reusable connector merged upstream.',
    trap: 'Leaving a one-off fork that someone has to patch by hand forever.',
    metric: 'The next similar deployment starts from the product, not from your fork.'
  }
];

export function renderDeploymentPipelineSvg(activeId = 'embed') {
  const name = 'lifecycle';
  const active = pick(DEPLOYMENT_LIFECYCLE_STAGES, activeId);
  const activeIdx = DEPLOYMENT_LIFECYCLE_STAGES.indexOf(active);
  const cy = 80;
  const x = (i) => 80 + i * 160;

  const connectors = DEPLOYMENT_LIFECYCLE_STAGES.slice(0, -1).map((_, i) => {
    const done = i < activeIdx;
    return `<line x1="${x(i) + 30}" y1="${cy}" x2="${x(i + 1) - 30}" y2="${cy}" class="dg-link${done ? ' is-done' : ''}" pathLength="1"/>
      ${done ? `<circle cx="${x(i) + 30}" cy="${cy}" r="3.5" class="dg-particle"/>` : ''}`;
  }).join('');

  const nodes = DEPLOYMENT_LIFECYCLE_STAGES.map((s, i) => {
    const cur = s === active;
    const past = i < activeIdx;
    return `<g class="dg-node${cur ? ' is-active' : ''}" ${hit(name, s.id)} style="--dg:${s.color}">
      ${cur ? `<circle cx="${x(i)}" cy="${cy}" r="38" class="dg-pulse"/>` : ''}
      <circle cx="${x(i)}" cy="${cy}" r="28" class="dg-node-bg${cur ? ' is-on' : past ? ' is-past' : ''}"/>
      ${past
        ? `<path d="M${x(i) - 7} ${cy} l5 5 l10 -10" class="dg-check"/>`
        : `<text x="${x(i)}" y="${cy + 5}" text-anchor="middle" class="dg-num${cur ? ' is-on' : ''}">${s.num}</text>`}
      <text x="${x(i)}" y="${cy + 50}" text-anchor="middle" class="dg-label${cur ? ' is-on' : ''}">${esc(s.short)}</text>
    </g>`;
  }).join('');

  const svg = `<div class="dg-canvas">
    <svg class="interactive-svg" viewBox="0 0 800 215" role="img" aria-label="The deployment lifecycle: embed, decompose, prototype, harden, feed back to the product, then repeat. Stage ${active.num}, ${esc(active.title)}, is selected.">
      <path d="M720 142 C720 205 80 205 80 144" class="dg-loop"/>
      <path d="M73 154 L80 142 L88 153" class="dg-loop-head"/>
      <text x="400" y="207" text-anchor="middle" class="dg-caption">↺ every deployment feeds the next one</text>
      ${connectors}${nodes}
    </svg></div>`;

  return card(name,
    { eyebrow: 'Interactive lifecycle', title: 'The five-stage deployment loop', text: 'Select a stage to see what you deliver, how you know it worked, and the trap that catches new FDEs.' },
    selector(name, 'Lifecycle stages', DEPLOYMENT_LIFECYCLE_STAGES.map((s) => ({ id: s.id, label: `${s.num} ${s.short}` })), active.id),
    `${svg}${inspector({
      color: active.color, chip: `Stage ${active.num} · ${active.short}`, title: active.title, lead: active.tagline,
      rows: [
        { label: 'You deliver', text: active.deliverable },
        { label: 'Done when', text: active.metric, tone: 'accent' },
        { label: 'The trap', text: active.trap, tone: 'red' }
      ]
    })}`);
}

/* ---------- 2. Role comparison radar (lesson o2) ---------- */

// Scores are an illustrative emphasis (0–100) of where each role spends its time, not survey data.
export const ROLE_COMPARISONS = {
  fde: {
    id: 'fde', short: 'FDE', name: 'Forward Deployed Engineer', color: 'var(--accent)',
    scores: { code: 90, ambiguity: 95, speed: 95, client: 85 },
    focus: 'Owns a customer outcome end to end: discovers the problem, builds the software and runs it in production inside the customer’s constraints.',
    superpower: 'Turning a messy customer environment into working software within days.',
    trap: 'Becoming a permanent bespoke contractor for one account instead of making the product better.'
  },
  swe: {
    id: 'swe', short: 'SWE', name: 'Product Software Engineer', color: 'var(--blue)',
    scores: { code: 95, ambiguity: 45, speed: 60, client: 15 },
    focus: 'Builds and maintains the core product from a roadmap, with code review, tests and long-lived design.',
    superpower: 'Depth: clean abstractions, reliability and scale.',
    trap: 'Stalling when there is no spec, or when the customer’s reality breaks the clean abstraction.'
  },
  sa: {
    id: 'sa', short: 'SA / SE', name: 'Solutions Architect / Sales Engineer', color: 'var(--amber)',
    scores: { code: 45, ambiguity: 70, speed: 65, client: 90 },
    focus: 'Helps customers choose and adopt the product: reference architectures, technical demos and evaluations, often tied to a deal.',
    superpower: 'Breadth across platforms and fluency in front of technical buyers.',
    trap: 'Stopping at the reference architecture when the customer needs someone to build the production system.'
  },
  consultant: {
    id: 'consultant', short: 'Consultant', name: 'Technology Consultant', color: 'var(--violet)',
    scores: { code: 20, ambiguity: 85, speed: 40, client: 95 },
    focus: 'Advises on strategy, process and change; delivery is often a recommendation or a program plan.',
    superpower: 'Stakeholder alignment and executive communication.',
    trap: 'Delivering a deck when the problem needed working software.'
  }
};

const ROLE_AXES = [
  { key: 'code', label: 'Code depth' },
  { key: 'ambiguity', label: 'Ambiguity' },
  { key: 'speed', label: 'Prototyping speed' },
  { key: 'client', label: 'Client facing' }
];

export function renderRoleMatrixSvg(activeRoleId = 'fde') {
  const name = 'roles';
  const role = ROLE_COMPARISONS[activeRoleId] || ROLE_COMPARISONS.fde;
  const cx = 250;
  const cy = 175;
  const maxR = 115;
  const pt = (i, v) => {
    const a = (i * Math.PI) / 2 - Math.PI / 2;
    return [round(cx + Math.cos(a) * maxR * (v / 100)), round(cy + Math.sin(a) * maxR * (v / 100))];
  };
  const poly = (scores) => ROLE_AXES.map((a, i) => pt(i, scores[a.key]).join(',')).join(' ');
  const rings = [25, 50, 75, 100].map((v) => `<polygon points="${ROLE_AXES.map((_, i) => pt(i, v).join(',')).join(' ')}" class="dg-grid"/>`).join('');
  const axes = ROLE_AXES.map((_, i) => { const [x, y] = pt(i, 100); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="dg-axis"/>`; }).join('');
  const labelPos = [[cx, 38, 'middle'], [cx + maxR + 12, cy + 4, 'start'], [cx, cy + maxR + 26, 'middle'], [cx - maxR - 12, cy + 4, 'end']];
  const labels = ROLE_AXES.map((a, i) => {
    const [lx, ly, anchor] = labelPos[i];
    return `<text x="${lx}" y="${ly}" text-anchor="${anchor}" class="dg-label">${esc(a.label)}</text>`;
  }).join('');
  const ghost = role.id !== 'fde' ? `<polygon points="${poly(ROLE_COMPARISONS.fde.scores)}" class="dg-ghost"/>
    <text x="10" y="345" class="dg-caption dg-caption-accent">- - FDE profile for comparison</text>` : '';

  const svg = `<div class="dg-canvas"><svg class="interactive-svg" viewBox="0 0 500 355" role="img" aria-label="Radar comparing ${esc(role.name)} on code depth ${role.scores.code}, ambiguity ${role.scores.ambiguity}, prototyping speed ${role.scores.speed} and client facing ${role.scores.client}, out of 100.">
    ${rings}${axes}${ghost}
    <polygon points="${poly(role.scores)}" class="dg-radar-poly" style="--dg:${role.color}"/>
    ${ROLE_AXES.map((a, i) => { const [x, y] = pt(i, role.scores[a.key]); return `<circle cx="${x}" cy="${y}" r="5" class="dg-radar-dot" style="--dg:${role.color}"/>`; }).join('')}
    ${labels}
  </svg></div>`;

  return card(name,
    { eyebrow: 'Interactive comparison', title: 'Where each role spends its effort', text: 'Pick a role to compare it with the FDE profile. Scores are illustrative emphasis, not survey data.' },
    selector(name, 'Role to compare', Object.values(ROLE_COMPARISONS).map((r) => ({ id: r.id, label: r.short })), role.id),
    `<div class="dg-split">${svg}${inspector({
      color: role.color, chip: role.short, title: role.name, lead: role.focus,
      rows: [
        { label: 'Superpower', text: role.superpower, tone: 'accent' },
        { label: 'What to unlearn as an FDE', text: role.trap, tone: 'red' }
      ]
    })}</div>`);
}

/* ---------- 3. The five pillars (lesson o4) ---------- */

// Keyed by the diagnostic's pillar ids so the lesson, the diagnostic and its radar all agree.
export const PILLAR_DETAILS = {
  software_engineering: {
    tag: 'Velocity', color: 'var(--accent)',
    question: 'The VP agreed to a demo at 4:30 today. You have three CSV exports and a blank folder. What do you ship?',
    senior: 'Picks boring tools (SQLite or DuckDB, one web framework), ships one working flow end to end, and says clearly what is not done yet.',
    field: 'Reading a customer’s 10-year-old Java service to find why records go missing — with no author to ask.'
  },
  data_ai_infra: {
    tag: 'Data & AI', color: 'var(--blue)',
    question: 'You ingest 100 GB of daily CSVs whose schemas drift and whose timestamps come in three formats. How do you make it reliable?',
    senior: 'Idempotent loads, explicit deduplication keys, schema checks that fail loudly, row-count reconciliation at every stage, and an eval set for any LLM step.',
    field: 'Two source systems export timestamps in different time zones and nobody documented which.'
  },
  enterprise_security: {
    tag: 'Security', color: 'var(--violet)',
    question: 'The customer blocks outbound internet and requires SAML SSO and role-based access. How does your app run there?',
    senior: 'Plans for an internal registry, a TLS-inspecting proxy, private DNS and token expiry up front, and brings an architecture document to the security review early.',
    field: 'Security rejects your SaaS endpoint a week before go-live.'
  },
  decomp_problem_solving: {
    tag: 'Decomp', color: 'var(--amber)',
    question: '“We need AI visibility into supply-chain fragility.” Where do you start?',
    senior: 'Asks who decides what, finds the entities (suppliers, orders, shipments, sites), the data that backs them, and a first milestone that ships in a week.',
    field: 'Three stakeholders give three different definitions of a “late shipment”.'
  },
  client_diplomacy: {
    tag: 'Diplomacy', color: 'var(--red)',
    question: 'A customer VP threatens to cancel the pilot because the dashboard is slow. What do you say in the next two minutes?',
    senior: 'Acknowledges the impact, agrees the goal, offers a concrete next step with a time, and follows up in writing within the hour.',
    field: 'The customer’s DBAs see your team as a threat to their jobs.'
  }
};

export function renderPillarsPentagramSvg(activePillarId = 'software_engineering') {
  const name = 'pillars';
  const pillars = diagnosticPillars.map((p) => ({ ...p, ...PILLAR_DETAILS[p.id] }));
  const pillar = pick(pillars, activePillarId);
  const cx = 220;
  const cy = 200;
  const R = 130;
  const pt = (i, s = 1) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / pillars.length;
    return [round(cx + Math.cos(a) * R * s), round(cy + Math.sin(a) * R * s)];
  };
  const grid = [0.33, 0.66, 1].map((s) => `<polygon points="${pillars.map((_, i) => pt(i, s).join(',')).join(' ')}" class="dg-grid"/>`).join('');
  const axes = pillars.map((_, i) => { const [x, y] = pt(i); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="dg-axis"/>`; }).join('');
  const shape = pillars.map((p, i) => pt(i, p === pillar ? 1 : 0.62).join(',')).join(' ');
  const nodes = pillars.map((p, i) => {
    const [x, y] = pt(i);
    const [lx, ly] = pt(i, 1.27);
    const cur = p === pillar;
    return `<g class="dg-node${cur ? ' is-active' : ''}" ${hit(name, p.id)} style="--dg:${p.color}">
      ${cur ? `<circle cx="${x}" cy="${y}" r="24" class="dg-pulse"/>` : ''}
      <circle cx="${x}" cy="${y}" r="15" class="dg-node-bg${cur ? ' is-on' : ''}"/>
      <text x="${x}" y="${y + 4}" text-anchor="middle" class="dg-num${cur ? ' is-on' : ''}">${i + 1}</text>
      <text x="${lx}" y="${ly + 4}" text-anchor="middle" class="dg-label${cur ? ' is-on' : ''}">${esc(p.tag)}</text>
    </g>`;
  }).join('');

  const svg = `<div class="dg-canvas"><svg class="interactive-svg" viewBox="0 0 440 400" role="img" aria-label="Pentagon of the five pillars. ${esc(pillar.name)} is selected.">
    ${grid}${axes}<polygon points="${shape}" class="dg-radar-poly" style="--dg:${pillar.color}"/>${nodes}
  </svg></div>`;

  return card(name,
    { eyebrow: 'Interactive competency map', title: 'The five pillars', text: 'Every interview round, diagnostic question and field mission tests these five. Select one to see what “good” looks like.' },
    selector(name, 'Pillar', pillars.map((p, i) => ({ id: p.id, label: `${i + 1} ${p.tag}` })), pillar.id),
    `<div class="dg-split">${svg}${inspector({
      color: pillar.color, chip: `Pillar ${pillars.indexOf(pillar) + 1}`, title: pillar.name, lead: pillar.description,
      rows: [
        { label: 'Interview scenario', text: pillar.question },
        { label: 'What a strong answer does', text: pillar.senior, tone: 'accent' },
        { label: 'In the field', text: pillar.field }
      ]
    })}</div>`);
}

/* ---------- 4. The toolkit stack (lesson o6) ---------- */

export const TOOLKIT_LAYERS = [
  {
    id: 'ai', num: '06', title: 'Applied AI', short: 'Applied AI', color: 'var(--pink)',
    tools: 'One LLM API, tool use, structured output, retrieval, and a small evaluation script you run on every change.',
    trap: 'Shipping a RAG demo with no eval set, then discovering hallucinations in front of an executive.',
    command: 'python eval.py --cases golden.jsonl --fail-under 0.9'
  },
  {
    id: 'security', num: '05', title: 'Networking & identity', short: 'Network & auth', color: 'var(--violet)',
    tools: 'DNS, TLS and certificates, HTTP proxies, OAuth / OIDC and SAML, SSH tunnels.',
    trap: 'An OAuth redirect that works at home and fails behind the customer’s TLS-inspecting proxy.',
    command: 'openssl s_client -connect api.internal:443 -servername api.internal -showcerts'
  },
  {
    id: 'containers', num: '04', title: 'Containers & Kubernetes', short: 'Containers', color: 'var(--blue)',
    tools: 'Multi-stage Docker builds, image registries, Kubernetes pods, services and ingress, Helm.',
    trap: 'An image that downloads packages at start-up, inside a network with no outbound internet.',
    command: 'kubectl logs deploy/api --previous && kubectl describe pod -l app=api'
  },
  {
    id: 'sql', num: '03', title: 'SQL & data', short: 'SQL & data', color: 'var(--amber)',
    tools: 'Joins, CTEs, window functions, reading a query plan; DuckDB or Postgres for fast local analysis.',
    trap: 'An unindexed full-table scan against the customer’s production database at 10am.',
    command: 'EXPLAIN (ANALYZE, BUFFERS) SELECT …'
  },
  {
    id: 'backend', num: '02', title: 'One backend language, deeply', short: 'Backend', color: 'var(--accent)',
    tools: 'Python or TypeScript for prototypes — an API from a blank folder — plus enough Java or Go to read customer code.',
    trap: 'Building microservices on day three when one service would deploy in ten minutes.',
    command: 'uvicorn app:api --host 0.0.0.0 --port 8000 --reload'
  },
  {
    id: 'terminal', num: '01', title: 'Terminal & git', short: 'Terminal', color: 'var(--text)',
    tools: 'bash, ssh, tmux, grep, jq, curl, and git well enough to recover from a bad merge.',
    trap: 'Depending on IDE plugins when the only access is an SSH session on a bastion host.',
    command: 'ssh -N -L 5432:db.internal:5432 you@bastion.customer.example'
  }
];

export function renderToolkitPyramidSvg(activeLayerId = 'terminal') {
  const name = 'toolkit';
  const layer = TOOLKIT_LAYERS.find((l) => l.id === activeLayerId) || TOOLKIT_LAYERS.at(-1); // default: the base
  const W = 480;
  const tiers = TOOLKIT_LAYERS.map((l, i) => {
    const cur = l === layer;
    const y0 = i * 40 + 10;
    const y1 = y0 + 34;
    const t = 60 + i * 26;
    const b = 60 + (i + 1) * 26;
    return `<g class="dg-node dg-tier${cur ? ' is-active' : ''}" ${hit(name, l.id)} style="--dg:${l.color}">
      <polygon points="${W / 2 - t},${y0} ${W / 2 + t},${y0} ${W / 2 + b},${y1} ${W / 2 - b},${y1}" class="dg-tier-poly${cur ? ' is-on' : ''}"/>
      <text x="${W / 2}" y="${y0 + 22}" text-anchor="middle" class="dg-num${cur ? ' is-on' : ''}">${l.num} ${esc(l.short)}</text>
    </g>`;
  }).join('');

  const svg = `<div class="dg-canvas"><svg class="interactive-svg" viewBox="0 0 ${W} 255" role="img" aria-label="Toolkit stack, learned bottom-up from terminal to applied AI. ${esc(layer.title)} is selected.">${tiers}</svg></div>`;

  return card(name,
    { eyebrow: 'Interactive stack', title: 'The toolkit, bottom-up', text: 'Learn from the base: every layer leans on the ones below it. Select a layer for the tools, a real command and the trap.' },
    selector(name, 'Stack layer', [...TOOLKIT_LAYERS].reverse().map((l) => ({ id: l.id, label: `${l.num} ${l.short}` })), layer.id),
    `<div class="dg-split">${svg}${inspector({
      color: layer.color, chip: `Layer ${layer.num}`, title: layer.title, lead: layer.tools,
      rows: [
        { label: 'A command you will run', text: layer.command, code: true },
        { label: 'The trap', text: layer.trap, tone: 'red' }
      ]
    })}</div>`);
}

/* ---------- 5. The first 90 days trust curve (lesson o8) ---------- */

export const TRUST_MILESTONES = [
  {
    id: 'week1', label: 'Week 1', x: 100, y: 196, color: 'var(--blue)', title: 'Listen and map',
    goal: 'Meet the sponsor, the operators who feel the pain and the IT or security gatekeeper. Learn what “success” means in their words.',
    artifact: 'A stakeholder map and a one-page “what I heard” recap, sent back to the customer for correction.',
    trap: 'Opening your editor before you know who signs off on the work.'
  },
  {
    id: 'week3', label: 'Week 3', x: 240, y: 150, color: 'var(--accent)', title: 'First visible win',
    goal: 'Ship something small that removes real, daily pain for one operator, on their real data.',
    artifact: 'A working tool that at least one real user relies on.',
    trap: 'Choosing the most interesting technical problem instead of the most visible pain.'
  },
  {
    id: 'day30', label: 'Day 30', x: 380, y: 128, color: 'var(--amber)', title: 'Agree the success metric',
    goal: 'Turn the early win into a written success plan: baseline, target, owner and date.',
    artifact: 'A success plan the sponsor has agreed to in writing.',
    trap: 'Vague goals such as “better visibility” that nobody can prove at renewal time.'
  },
  {
    id: 'day60', label: 'Day 60', x: 520, y: 88, color: 'var(--violet)', title: 'Harden and hand over',
    goal: 'Move from prototype to production: SSO, permissions, monitoring, a runbook and a named owner on the customer side.',
    artifact: 'A production deployment, a runbook and a support plan that does not depend on you.',
    trap: 'Becoming the only person who can keep it running.'
  },
  {
    id: 'day90', label: 'Day 90', x: 660, y: 48, color: 'var(--pink)', title: 'Prove it and expand',
    goal: 'Show baseline against today in the customer’s own units, propose the next use case and file what you learned with the product team.',
    artifact: 'An executive value readout, an expansion proposal and two or three evidence-backed product tickets.',
    trap: 'Assuming the value is obvious — when nobody captured a baseline.'
  }
];

export function renderTrustCurveSvg(activeId = 'week1') {
  const name = 'trust';
  const m = pick(TRUST_MILESTONES, activeId);
  const base = 230;
  const dip = [310, 168];
  const pts = [[60, 214], ...TRUST_MILESTONES.slice(0, 2).map((p) => [p.x, p.y]), dip, ...TRUST_MILESTONES.slice(2).map((p) => [p.x, p.y]), [700, 40]];
  const curve = smoothPath(pts);
  const dots = TRUST_MILESTONES.map((p) => {
    const cur = p === m;
    return `<g class="dg-node${cur ? ' is-active' : ''}" ${hit(name, p.id)} style="--dg:${p.color}">
      ${cur ? `<line x1="${p.x}" y1="${p.y + 12}" x2="${p.x}" y2="${base}" class="dg-guide"/><circle cx="${p.x}" cy="${p.y}" r="20" class="dg-pulse"/>` : ''}
      <circle cx="${p.x}" cy="${p.y}" r="18" class="dg-hit-area"/>
      <circle cx="${p.x}" cy="${p.y}" r="9" class="dg-node-bg${cur ? ' is-on' : ''}"/>
      <text x="${p.x}" y="${base + 22}" text-anchor="middle" class="dg-label${cur ? ' is-on' : ''}">${esc(p.label)}</text>
    </g>`;
  }).join('');

  const svg = `<div class="dg-canvas"><svg class="interactive-svg" viewBox="0 0 720 265" role="img" aria-label="Customer trust rises over the first 90 days, with a dip after the first demo. ${esc(m.label)}, ${esc(m.title)}, is selected.">
    <defs><linearGradient id="dg-trust-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity="0.28"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
    ${[70, 130, 190].map((y) => `<line x1="40" y1="${y}" x2="700" y2="${y}" class="dg-grid"/>`).join('')}
    <line x1="40" y1="${base}" x2="700" y2="${base}" class="dg-axis"/>
    <line x1="40" y1="20" x2="40" y2="${base}" class="dg-axis"/>
    <text x="0" y="0" transform="translate(26 ${base}) rotate(-90)" class="dg-caption">Customer trust →</text>
    <path d="${curve} L700,${base} L60,${base} Z" class="dg-area" fill="url(#dg-trust-fill)"/>
    <path d="${curve}" class="dg-curve" pathLength="1"/>
    <circle cx="${dip[0]}" cy="${dip[1]}" r="4" class="dg-dip"/>
    <text x="${dip[0] + 10}" y="${dip[1] + 22}" class="dg-caption">first demo: half of it is wrong (that’s fine)</text>
    ${dots}
  </svg></div>`;

  return card(name,
    { eyebrow: 'Interactive timeline', title: 'How trust is earned in the first 90 days', text: 'Trust compounds from small, visible wins. Select a milestone for the goal, the artifact that proves it and the trap.' },
    selector(name, 'Milestone', TRUST_MILESTONES.map((p) => ({ id: p.id, label: p.label })), m.id),
    `${svg}${inspector({
      color: m.color, chip: m.label, title: m.title, lead: m.goal,
      rows: [
        { label: 'Proof you leave behind', text: m.artifact, tone: 'accent' },
        { label: 'The trap', text: m.trap, tone: 'red' }
      ]
    })}`);
}

/* ---------- 6. The field triage ladder (lesson o9) ---------- */

// Ordered bottom-up: you rule out the lower layers before blaming the ones above.
export const TRIAGE_LAYERS = [
  {
    id: 'dns', title: 'Name resolution', short: 'DNS', color: 'var(--blue)',
    symptom: '“Could not resolve host”, or it works by IP address but not by name.',
    command: 'dig +short api.internal.example',
    cause: 'Split-horizon or private DNS zones your machine or cluster cannot see; a stale hosts-file entry.'
  },
  {
    id: 'network', title: 'Reachability & firewalls', short: 'Network', color: 'var(--accent)',
    symptom: 'Connection timed out (packets silently dropped) versus connection refused (nothing listening on that port).',
    command: 'nc -vz db.internal 5432',
    cause: 'A firewall or security-group rule, no route to a peered network, or outbound traffic blocked entirely.'
  },
  {
    id: 'tls', title: 'TLS & proxies', short: 'TLS', color: 'var(--amber)',
    symptom: '“certificate verify failed” or “self-signed certificate in chain” — often only from your container.',
    command: 'openssl s_client -connect api.internal:443 -servername api.internal',
    cause: 'A corporate TLS-inspection proxy whose private root CA is not in your image’s trust store; HTTPS_PROXY / NO_PROXY set wrong.'
  },
  {
    id: 'identity', title: 'Identity & permissions', short: 'Auth', color: 'var(--violet)',
    symptom: '401 or 403, an SSO redirect loop, or it works for admins but not for normal users.',
    command: 'Decode the token payload and check iss, aud, exp and the group claims',
    cause: 'Wrong redirect URI or audience, clock skew breaking token expiry, a missing group claim, a row-level policy.'
  },
  {
    id: 'app', title: 'Application & runtime', short: 'App', color: 'var(--red)',
    symptom: '500 errors, crash loops, OOMKilled pods.',
    command: 'kubectl logs <pod> --previous && kubectl describe pod <pod>',
    cause: 'A missing environment variable or secret, memory limits too low, or an image built for the wrong CPU architecture.'
  },
  {
    id: 'data', title: 'Data & meaning', short: 'Data', color: 'var(--pink)',
    symptom: 'Everything runs, but the numbers are wrong.',
    command: 'SELECT COUNT(*), COUNT(DISTINCT id), COUNT(*) - COUNT(ts) AS null_ts FROM stage_n;',
    cause: 'Time-zone shifts, duplicate join keys multiplying rows, schema drift, or two teams defining a metric differently.'
  }
];

export function renderTriageLadderSvg(activeId = 'dns') {
  const name = 'triage';
  const layer = pick(TRIAGE_LAYERS, activeId);
  const idx = TRIAGE_LAYERS.indexOf(layer);
  const rungY = (i) => 280 - i * 48;
  const rungs = TRIAGE_LAYERS.map((l, i) => {
    const cur = l === layer;
    const status = i < idx ? 'ruled out' : cur ? 'investigate' : 'not yet';
    return `<g class="dg-node${cur ? ' is-active' : ''}${i < idx ? ' is-past' : ''}" ${hit(name, l.id)} style="--dg:${l.color}">
      <rect x="110" y="${rungY(i) - 18}" width="270" height="36" rx="8" class="dg-rung${cur ? ' is-on' : ''}"/>
      <text x="126" y="${rungY(i) + 5}" class="dg-num${cur ? ' is-on' : ''}">L${i + 1}</text>
      <text x="158" y="${rungY(i) + 5}" class="dg-label${cur ? ' is-on-ink' : ''}">${esc(l.title)}</text>
      <text x="394" y="${rungY(i) + 5}" class="dg-status${i < idx ? ' is-ok' : cur ? ' is-on' : ''}">${i < idx ? '✓ ' : cur ? '● ' : ''}${status}</text>
    </g>`;
  }).join('');
  const rise = rungY(0) - rungY(idx);

  const svg = `<div class="dg-canvas"><svg class="interactive-svg" viewBox="0 0 520 320" role="img" aria-label="Triage ladder from DNS at the bottom to data at the top. Layers below ${esc(layer.title)} are ruled out; ${esc(layer.title)} is being investigated.">
    <line x1="70" y1="${rungY(0) + 18}" x2="70" y2="${rungY(TRIAGE_LAYERS.length - 1) - 18}" class="dg-axis"/>
    <line x1="70" y1="${rungY(0)}" x2="70" y2="${rungY(idx)}" class="dg-link is-done" pathLength="1"/>
    <text x="0" y="0" transform="translate(48 ${rungY(0) + 14}) rotate(-90)" class="dg-caption">start at the bottom →</text>
    <circle cx="70" cy="${rungY(0)}" r="6" class="dg-packet" style="--rise:${-rise}px"/>
    ${rungs}
  </svg></div>`;

  return card(name,
    { eyebrow: 'Interactive triage ladder', title: '“It doesn’t work at the customer”', text: 'Work bottom-up and rule each layer out before blaming the one above. Select a layer for the symptom, the check and the usual cause.' },
    selector(name, 'Layer', TRIAGE_LAYERS.map((l, i) => ({ id: l.id, label: `L${i + 1} ${l.short}` })), layer.id),
    `<div class="dg-split">${svg}${inspector({
      color: layer.color, chip: `Layer ${idx + 1} of ${TRIAGE_LAYERS.length}`, title: layer.title, lead: layer.symptom,
      rows: [
        { label: 'Check', text: layer.command, code: true },
        { label: 'Usual cause', text: layer.cause, tone: 'amber' }
      ]
    })}</div>`);
}

/* ---------- 7. The field-to-product flywheel (lesson o10) ---------- */

export const FLYWHEEL_STEPS = [
  {
    id: 'deploy', title: 'Deploy', color: 'var(--accent)',
    what: 'Solve one customer’s problem in their environment.',
    proof: 'A running deployment — and a baseline captured before go-live, while you still can.'
  },
  {
    id: 'measure', title: 'Measure', color: 'var(--blue)',
    what: 'Compare baseline with today in the customer’s own units: hours, money, incidents, cycle time.',
    proof: '“Planning fell from 2 hours to 15 minutes a day across 40 planners — about 4,500 hours a quarter.”'
  },
  {
    id: 'generalize', title: 'Generalize', color: 'var(--amber)',
    what: 'Ask whether the next three customers need this. Separate customer-specific configuration from reusable logic.',
    proof: 'A short note: what is reusable, what is config, and which accounts need it.'
  },
  {
    id: 'upstream', title: 'Upstream', color: 'var(--violet)',
    what: 'Give the product team the problem, how often it occurs, the impact, today’s workaround and a proposed shape.',
    proof: 'A product ticket with evidence, or a reusable component merged into the core product.'
  },
  {
    id: 'accelerate', title: 'Accelerate', color: 'var(--pink)',
    what: 'The next deployment starts from the product instead of a fork, so it reaches value faster.',
    proof: 'Time to first value on the next deployment, compared with the last one.'
  }
];

export function renderFlywheelSvg(activeId = 'deploy') {
  const name = 'flywheel';
  const step = pick(FLYWHEEL_STEPS, activeId);
  const cx = 200;
  const cy = 200;
  const R = 130;
  const n = FLYWHEEL_STEPS.length;
  const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const at = (a, r = R) => [round(cx + Math.cos(a) * r), round(cy + Math.sin(a) * r)];
  const gap = 0.3;
  const arcs = FLYWHEEL_STEPS.map((s, i) => {
    const [x1, y1] = at(ang(i) + gap);
    const [x2, y2] = at(ang(i + 1) - gap);
    return `<path d="M${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2}" class="dg-arc${s === step ? ' is-done' : ''}" marker-end="url(#dg-fly-arrow)"/>`;
  }).join('');
  const nodes = FLYWHEEL_STEPS.map((s, i) => {
    const [x, y] = at(ang(i));
    const cur = s === step;
    return `<g class="dg-node${cur ? ' is-active' : ''}" ${hit(name, s.id)} style="--dg:${s.color}">
      ${cur ? `<circle cx="${x}" cy="${y}" r="38" class="dg-pulse"/>` : ''}
      <circle cx="${x}" cy="${y}" r="31" class="dg-node-bg${cur ? ' is-on' : ''}"/>
      <text x="${x}" y="${y + 4}" text-anchor="middle" class="dg-num dg-num-sm${cur ? ' is-on' : ''}">${esc(s.title)}</text>
    </g>`;
  }).join('');

  const svg = `<div class="dg-canvas"><svg class="interactive-svg dg-square" viewBox="0 0 400 400" role="img" aria-label="Flywheel: deploy, measure, generalize, upstream, accelerate, and back to deploy. ${esc(step.title)} is selected.">
    <defs><marker id="dg-fly-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="dg-arrow-head"/></marker></defs>
    <circle cx="${cx}" cy="${cy}" r="${R + 46}" class="dg-orbit"/>
    ${arcs}
    <text x="${cx}" y="${cy - 6}" text-anchor="middle" class="dg-label">each turn makes</text>
    <text x="${cx}" y="${cy + 14}" text-anchor="middle" class="dg-label">the next one faster</text>
    ${nodes}
  </svg></div>`;

  return card(name,
    { eyebrow: 'Interactive flywheel', title: 'From one deployment to leverage', text: 'Senior FDEs are judged on leverage: how much faster the next deployment goes because of their work. Select a step.' },
    selector(name, 'Flywheel step', FLYWHEEL_STEPS.map((s, i) => ({ id: s.id, label: `${i + 1} ${s.title}` })), step.id),
    `<div class="dg-split">${svg}${inspector({
      color: step.color, chip: `Step ${FLYWHEEL_STEPS.indexOf(step) + 1} of ${n}`, title: step.title, lead: step.what,
      rows: [{ label: 'Evidence', text: step.proof, tone: 'accent' }]
    })}</div>`);
}

// Lesson blocks reference diagrams by name: { type: 'diagram', name: 'trust' }.
// Each renderer falls back to its first stage when called with no selection.
export const LESSON_DIAGRAMS = {
  lifecycle: renderDeploymentPipelineSvg,
  roles: renderRoleMatrixSvg,
  pillars: renderPillarsPentagramSvg,
  toolkit: renderToolkitPyramidSvg,
  trust: renderTrustCurveSvg,
  triage: renderTriageLadderSvg,
  flywheel: renderFlywheelSvg
};

/* ---------- 8. Journey transit map ---------- */

export function renderJourneyTransitSvg(stations = [], currentStationId = '') {
  if (!stations.length) return '';
  const total = stations.length;
  const width = Math.max(760, total * 90);
  const cy = 50;
  const xAt = (i) => round(50 + (i / Math.max(1, total - 1)) * (width - 100));
  const doneCount = stations.filter((s) => s.status === 'done').length;
  const progressX = xAt(Math.max(0, stations.findIndex((s) => s.status !== 'done')));

  const nodes = stations.map((s, i) => {
    const cx = xAt(i);
    const done = s.status === 'done';
    const cur = s.id === currentStationId || s.status === 'current';
    const lines = wrapText(s.title, 15);
    const title = lines.length > 2 ? [lines[0], `${lines[1].slice(0, 13)}…`] : lines;
    return `<g class="dg-node dg-stop${done ? ' is-past' : ''}${cur ? ' is-active' : ''}" data-action="goto-station" data-id="${esc(s.id)}" style="--dg:var(--accent)">
      ${cur ? `<circle cx="${cx}" cy="${cy}" r="22" class="dg-pulse"/>` : ''}
      <circle cx="${cx}" cy="${cy}" r="14" class="dg-node-bg${done ? ' is-on' : cur ? ' is-current' : ''}"/>
      ${done
        ? `<path d="M${cx - 5} ${cy} l3.5 3.5 l7 -7" class="dg-check dg-check-ink"/>`
        : `<text x="${cx}" y="${cy + 4}" text-anchor="middle" class="dg-num dg-num-sm${cur ? ' is-accent' : ''}">${esc(s.n)}</text>`}
      <text x="${cx}" y="${cy + 32}" text-anchor="middle" class="dg-label dg-label-sm${cur ? ' is-on' : ''}">${tspans(title, cx, 13)}</text>
    </g>`;
  }).join('');

  return `<div class="card dg dg-transit">
    <div class="spread">
      <span class="eyebrow eyebrow-accent"><span class="dot"></span>Route map · ${doneCount}/${total} stations</span>
      <span class="dim mono dg-hint">Tap a station to jump to it</span>
    </div>
    <div class="dg-scroll" tabindex="0" role="region" aria-label="Route map (scrolls sideways)">
      <svg class="interactive-transit-svg" viewBox="0 0 ${width} 110" style="min-width:${width}px" role="img" aria-label="Route map: ${doneCount} of ${total} stations complete.">
        <line x1="50" y1="${cy}" x2="${width - 50}" y2="${cy}" class="dg-track"/>
        ${progressX > 50 ? `<line x1="50" y1="${cy}" x2="${progressX}" y2="${cy}" class="dg-track is-done" pathLength="1"/>` : ''}
        ${nodes}
      </svg>
    </div>
  </div>`;
}

/* ---------- 9. Simulator: live system map ---------- */

const health = (v) => (v >= 60 ? 'var(--accent)' : v >= 40 ? 'var(--amber)' : 'var(--red)');

export function renderSimulatorArchitectureSvg(sim, run) {
  const nodes = [
    { x: 30, title: 'Client systems', sub: 'source data', color: 'var(--text-dim)', critical: false },
    { x: 280, title: 'Your pipeline', sub: `integrity ${run.integrity}`, color: health(run.integrity), critical: run.integrity < 40 },
    { x: 530, title: 'Ops users', sub: `trust ${run.trust}`, color: health(run.trust), critical: run.trust < 40 }
  ];
  return `<div class="card dg" id="simArchitectureRadar">
    <div class="spread">
      <div><span class="eyebrow eyebrow-accent"><span class="dot"></span>Live system map</span>
        <h3 class="dg-title dg-title-sm">${esc(sim.client)}</h3></div>
      <div class="chip-row">
        ${[['Trust', run.trust], ['Integrity', run.integrity], ['Velocity', run.velocity]].map(([k, v]) => `<span class="chip chip-mono" style="color:${health(v)};border-color:currentColor">${k} ${v}</span>`).join('')}
      </div>
    </div>
    <div class="dg-canvas">
      <svg class="interactive-svg" viewBox="0 0 680 170" role="img" aria-label="Client systems feed your pipeline, which serves the operations users. Trust ${run.trust}, integrity ${run.integrity}, velocity ${run.velocity}.">
        <rect x="250" y="20" width="410" height="135" rx="10" class="dg-boundary"/>
        <text x="264" y="40" class="dg-caption">CUSTOMER NETWORK · SSO · RESTRICTED EGRESS</text>
        <line x1="150" y1="95" x2="280" y2="95" class="dg-flow" style="--dg:${health(run.integrity)}; --speed:${(2.4 - run.velocity / 60).toFixed(2)}s"/>
        <line x1="400" y1="95" x2="530" y2="95" class="dg-flow" style="--dg:${health(run.velocity)}; --speed:${(2.4 - run.velocity / 60).toFixed(2)}s"/>
        ${nodes.map((nd) => `<g class="dg-topo${nd.critical ? ' is-critical' : ''}" style="--dg:${nd.color}">
          <rect x="${nd.x}" y="65" width="120" height="60" rx="8" class="dg-topo-box"/>
          <text x="${nd.x + 60}" y="91" text-anchor="middle" class="dg-label">${nd.title}</text>
          <text x="${nd.x + 60}" y="108" text-anchor="middle" class="dg-caption dg-caption-tone">${nd.sub}</text>
        </g>`).join('')}
      </svg>
    </div>
  </div>`;
}

/* ---------- 10. Decomp case: phase overview ---------- */

export function renderCaseArchitectureSvg(caseStudy) {
  const phases = caseStudy.architecturePhases || [];
  if (!phases.length) return '';
  const W = 740;
  const gapX = 40;
  const w = Math.min(200, (W - 40 - gapX * (phases.length - 1)) / phases.length);
  const x0 = (W - (w * phases.length + gapX * (phases.length - 1))) / 2;
  const boxes = phases.map((ph, i) => {
    const x = round(x0 + i * (w + gapX));
    const title = wrapText(ph.phase.replace(/^\d+\.\s*/, ''), 22).slice(0, 3);
    const arrow = i < phases.length - 1
      ? `<line x1="${x + w + 4}" y1="85" x2="${x + w + gapX - 8}" y2="85" class="dg-flow" style="--dg:var(--accent); --speed:1.4s" marker-end="url(#dg-case-arrow)"/>`
      : '';
    return `<g class="dg-phase" style="--i:${i}">
      <rect x="${x}" y="30" width="${w}" height="110" rx="10" class="dg-phase-box"/>
      <text x="${x + 14}" y="52" class="dg-num dg-num-sm is-accent">PHASE ${String(i + 1).padStart(2, '0')}</text>
      <text x="${x + 14}" y="76" class="dg-label">${tspans(title, x + 14, 17)}</text>
      ${arrow}
    </g>`;
  }).join('');

  return `<div class="card dg mt-24" id="caseArchitectureCanvas">
    <span class="eyebrow eyebrow-accent"><span class="dot"></span>Architecture at a glance</span>
    <h3 class="dg-title">How the solution is partitioned</h3>
    <p class="dg-sub">Each phase below is one box here: data flows left to right. Present it in this order in an interview.</p>
    <div class="dg-canvas">
      <svg class="interactive-svg" viewBox="0 0 ${W} 170" role="img" aria-label="${phases.length} phases for ${esc(caseStudy.title)}: ${phases.map((p) => esc(p.phase.replace(/^\d+\.\s*/, ''))).join(', then ')}.">
        <defs><marker id="dg-case-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="dg-arrow-head"/></marker></defs>
        ${boxes}
      </svg>
    </div>
  </div>`;
}

/* ---------- 11. Company playbook: interview loop ---------- */

// The value is "<companyId>:<roundIndex>" so a choice made on one playbook never leaks into another.
export function renderPlaybookPipelineSvg(company, activeIdx = 0) {
  const name = 'playbook';
  const stages = company.interviewStages || [];
  if (!stages.length) return '';
  const idx = Math.min(Math.max(0, Number(activeIdx) || 0), stages.length - 1);
  const cur = stages[idx];
  const color = esc(company.accentColor || 'var(--accent)');
  const xAt = (i) => round(stages.length > 1 ? 80 + (i * 600) / (stages.length - 1) : 380);

  const nodes = stages.map((s, i) => {
    const on = i === idx;
    return `<g class="dg-node${on ? ' is-active' : ''}${i < idx ? ' is-past' : ''}" ${hit(name, `${company.id}:${i}`)} style="--dg:${color}">
      ${on ? `<circle cx="${xAt(i)}" cy="45" r="26" class="dg-pulse"/>` : ''}
      <circle cx="${xAt(i)}" cy="45" r="17" class="dg-node-bg${on ? ' is-on' : ''}"/>
      <text x="${xAt(i)}" y="49" text-anchor="middle" class="dg-num${on ? ' is-on-white' : ''}">${i + 1}</text>
      <text x="${xAt(i)}" y="84" text-anchor="middle" class="dg-label dg-label-sm${on ? ' is-on' : ''}">${tspans(wrapText(s.stage, 18).slice(0, 2), xAt(i), 14)}</text>
    </g>`;
  }).join('');

  return card(`${name}`,
    { eyebrow: 'Interactive interview loop', title: `${company.name} interview rounds`, text: 'Select a round to see what it tests.' },
    selector(name, 'Interview round', stages.map((s, i) => ({ id: `${company.id}:${i}`, label: `Round ${i + 1}` })), `${company.id}:${idx}`),
    `<div class="dg-canvas"><svg class="interactive-svg" viewBox="0 0 760 120" role="img" aria-label="${stages.length} interview rounds at ${esc(company.name)}. Round ${idx + 1}, ${esc(cur.stage)}, is selected.">
      <line x1="${xAt(0)}" y1="45" x2="${xAt(stages.length - 1)}" y2="45" class="dg-track"/>
      ${idx > 0 ? `<line x1="${xAt(0)}" y1="45" x2="${xAt(idx)}" y2="45" class="dg-track is-brand" style="--dg:${color}" pathLength="1"/>` : ''}
      ${nodes}
    </svg></div>
    ${inspector({ color, chip: `Round ${idx + 1} of ${stages.length}`, title: cur.stage, lead: cur.details })}`);
}
