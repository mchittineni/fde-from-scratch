// Content for the hands-on labs: portfolio projects, the decomp drill and the story bank.

/* --------------------------------------------------------------------------
   Portfolio projects — each one is a mini deployment with proof you can show.
   -------------------------------------------------------------------------- */
export const portfolioProjects = [
  {
    id: 'p-explorer',
    topic: 'velocity',
    title: 'The 4-hour data explorer',
    pillar: 'software_engineering', level: 'Start', hours: '4–6 h',
    brief: 'A regional logistics firm emails you a 200 MB CSV of shipment events on Monday morning and asks "can we see where things get stuck?" by the afternoon demo.',
    build: 'A single-page app over a small API: upload or load the dataset, filter by lane and date, and show the five slowest legs with their median dwell time.',
    stack: ['FastAPI or Express', 'SQLite or DuckDB', 'Vanilla JS or React', 'Docker'],
    criteria: [
      { id: 'c1', text: 'Runs with one command (docker compose up or a single script) on a clean machine.' },
      { id: 'c2', text: 'Handles a malformed row without crashing and reports how many rows were skipped.' },
      { id: 'c3', text: 'Filters respond in under 500 ms on the full dataset.' },
      { id: 'c4', text: 'README states assumptions you made about the data and what you would ask the customer.' }
    ],
    stretch: ['Add a shareable URL for any filtered view.', 'Time yourself — repeat until you can do it in under 4 hours.'],
    proof: 'Repo + a 2-minute screen recording of the demo.',
    resources: ['r-fastapi', 'r-docker', 'r-missing']
  },
  {
    id: 'p-ingest',
    topic: 'data',
    title: 'Messy-data ingestion pipeline',
    pillar: 'data_ai_infra', level: 'Start', hours: '1–2 days',
    brief: 'Three hospitals export bed-occupancy data in different formats: one JSON API, one nightly CSV with local timestamps, one Excel file someone edits by hand.',
    build: 'An idempotent pipeline that lands raw files, cleans and unifies them into one table, and produces a data-quality report on every run.',
    stack: ['Python + Polars or pandas', 'PostgreSQL or DuckDB', 'Great Expectations or hand-rolled checks'],
    criteria: [
      { id: 'c1', text: 'Re-running the pipeline on the same input produces no duplicate rows.' },
      { id: 'c2', text: 'All timestamps are normalized to UTC with the original timezone preserved.' },
      { id: 'c3', text: 'A quality report lists null rates, rejected rows and schema drift per source.' },
      { id: 'c4', text: 'One window-function query answers "peak occupancy per ward per day".' }
    ],
    stretch: ['Add a fourth source mid-project without changing existing code paths.', 'Explain the indexing choice with an EXPLAIN plan.'],
    proof: 'Repo + the generated quality report + a one-page design note.',
    resources: ['r-polars', 'r-luke', 'r-pgexplain', 'r-fde-book']
  },
  {
    id: 'p-sso',
    topic: 'security',
    title: 'SSO-protected internal tool with RBAC',
    pillar: 'enterprise_security', level: 'Core', hours: '2–3 days',
    brief: 'The customer\'s security team will only approve your tool if it uses their identity provider, enforces roles, and never shows one region\'s data to another.',
    build: 'Put a small CRUD app behind OIDC login (use a free IdP tenant or Keycloak), map IdP groups to roles, and enforce row-level access by region.',
    stack: ['Keycloak or any OIDC provider', 'Your backend of choice', 'PostgreSQL row-level security'],
    criteria: [
      { id: 'c1', text: 'Login uses Authorization Code + PKCE; no passwords are stored by your app.' },
      { id: 'c2', text: 'Roles come from IdP group claims, not a hard-coded list.' },
      { id: 'c3', text: 'A user in region A cannot read region B rows even by calling the API directly.' },
      { id: 'c4', text: 'Every write is audit-logged with user, time and before/after values.' }
    ],
    stretch: ['Add SCIM-style deprovisioning: removing a user in the IdP revokes access within a minute.'],
    proof: 'Repo + a short security design doc a CISO could review.',
    resources: ['r-oauth', 'r-oidc', 'r-owasp']
  },
  {
    id: 'p-airgap',
    topic: 'infra',
    title: 'Air-gapped deployment bundle',
    pillar: 'enterprise_security', level: 'Core', hours: '2 days',
    brief: 'A defense customer\'s cluster has no internet access. Everything — images, packages, models — must arrive on approved media and be verifiable.',
    build: 'Package one of your previous projects into a signed, offline-installable bundle and install it on a VM with outbound networking disabled.',
    stack: ['Docker save/load or a local registry', 'cosign or GPG', 'pip wheelhouse / offline npm cache', 'k3s (optional)'],
    criteria: [
      { id: 'c1', text: 'Install succeeds with outbound network blocked at the VM firewall.' },
      { id: 'c2', text: 'Every artifact has a checksum and signature verified before install.' },
      { id: 'c3', text: 'A software bill of materials (SBOM) ships with the bundle.' },
      { id: 'c4', text: 'Upgrade and rollback are both documented and tested.' }
    ],
    stretch: ['Shrink the bundle by 50% with multi-stage builds and distroless bases.'],
    proof: 'Install script + a runbook + a recording of the offline install.',
    resources: ['r-docker', 'r-k8s', 'r-zerotrust']
  },
  {
    id: 'p-rag',
    topic: 'ai',
    title: 'Grounded RAG assistant with evals',
    pillar: 'data_ai_infra', level: 'Core', hours: '3–4 days',
    brief: 'An insurer wants claims handlers to ask questions of 2,000 policy PDFs. Legal requires citations on every answer and no customer PII sent to the model.',
    build: 'A retrieval-augmented assistant with document-level permissions, PII redaction before any model call, citations in every answer, and an eval set that runs in CI.',
    stack: ['Any LLM API', 'pgvector, Qdrant or similar', 'Presidio', 'A small eval runner'],
    criteria: [
      { id: 'c1', text: 'Every answer cites the source passages it used; uncited answers are refused.' },
      { id: 'c2', text: 'A 30-question eval set reports retrieval hit rate and answer correctness.' },
      { id: 'c3', text: 'PII is redacted before embedding and before generation; tests prove it.' },
      { id: 'c4', text: 'A user only retrieves documents they are permitted to see.' }
    ],
    stretch: ['Add hybrid search (BM25 + vectors) and show the eval improvement.', 'Track cost and latency per query.'],
    proof: 'Repo + eval report + a one-page "why this is safe" note for legal.',
    resources: ['r-evals', 'r-llm-patterns', 'r-presidio', 'r-owasp-llm']
  },
  {
    id: 'p-mcp',
    topic: 'ai',
    title: 'MCP server for a legacy system',
    pillar: 'data_ai_infra', level: 'Core', hours: '1–2 days',
    brief: 'The customer wants their analysts to query an old ticketing system from an AI assistant, but the system only has a clunky REST API and strict rate limits.',
    build: 'An MCP server that exposes three well-designed tools over the legacy API, with input validation, rate limiting, and read-only defaults.',
    stack: ['MCP SDK (TypeScript or Python)', 'A mock legacy API you write yourself'],
    criteria: [
      { id: 'c1', text: 'Tools have precise names, descriptions and JSON schemas a model can use correctly.' },
      { id: 'c2', text: 'Writes are disabled unless an explicit flag is set.' },
      { id: 'c3', text: 'Rate limits and upstream errors return useful messages, not stack traces.' },
      { id: 'c4', text: 'A demo transcript shows an assistant completing a real task with the tools.' }
    ],
    stretch: ['Add an approval step for any write action.'],
    proof: 'Repo + demo transcript.',
    resources: ['r-mcp', 'r-agents', 'r-claude-docs']
  },
  {
    id: 'p-stream',
    topic: 'data',
    title: 'Real-time streaming pipeline',
    pillar: 'data_ai_infra', level: 'Deep', hours: '3–4 days',
    brief: 'A retailer needs fraud signals within 5 seconds of a checkout event during peak traffic, without double-counting when consumers restart.',
    build: 'Produce synthetic checkout events into Kafka, aggregate per-card velocity in a stream processor, and write alerts to a sink exactly once.',
    stack: ['Kafka or Redpanda', 'Spark Structured Streaming, Flink or Kafka Streams', 'PostgreSQL or Delta'],
    criteria: [
      { id: 'c1', text: 'End-to-end latency under 5 s at 2,000 events/s on a laptop.' },
      { id: 'c2', text: 'Killing and restarting the consumer produces no duplicate alerts.' },
      { id: 'c3', text: 'Late events within 2 minutes are handled with watermarks.' },
      { id: 'c4', text: 'A skewed hot key is detected and mitigated (salting or repartitioning).' }
    ],
    stretch: ['Add a dashboard showing lag and throughput.'],
    proof: 'Repo + a load-test result + a design note on delivery guarantees.',
    resources: ['r-kafka', 'r-spark', 'r-ddia']
  },
  {
    id: 'p-decomp',
    topic: 'decomp',
    title: 'Decomp write-up + operational prototype',
    pillar: 'decomp_problem_solving', level: 'Core', hours: '2 days',
    brief: 'Pick any prompt from the decomp drill. Treat it as a real customer: you have one week to show the COO something that changes a decision.',
    build: 'A written decomposition (entities, data sources, workflows, failure modes) and a thin prototype of the single most valuable operator workflow.',
    stack: ['Any — the write-up matters more than the stack'],
    criteria: [
      { id: 'c1', text: 'Names the operator, the decision they make, and the metric that improves.' },
      { id: 'c2', text: 'Entity model with relationships and state transitions, not just tables.' },
      { id: 'c3', text: 'At least three failure modes with a mitigation for each.' },
      { id: 'c4', text: 'Prototype runs on realistic (synthetic) data and demos that one workflow.' }
    ],
    stretch: ['Have a peer play the customer and introduce a new constraint halfway through.'],
    proof: 'Write-up (2–4 pages) + prototype repo.',
    resources: ['r-ddd', 'r-bounded', 'r-sdprimer', 'r-saga']
  },
  {
    id: 'p-incident',
    topic: 'infra',
    title: 'Incident drill, postmortem and runbook',
    pillar: 'enterprise_security', level: 'Core', hours: '1 day',
    brief: 'Something will break in production at a customer. Practice now: break your own deployment on purpose and run the incident like it\'s real.',
    build: 'Inject three failures into one of your projects (disk full, DNS failure, OOM), diagnose each from the command line, and write a blameless postmortem.',
    stack: ['Linux VM or container', 'stress-ng / tc / iptables for fault injection'],
    criteria: [
      { id: 'c1', text: 'Each failure is diagnosed using CLI tools and the commands are recorded.' },
      { id: 'c2', text: 'Postmortem has timeline, impact, root cause and action items with owners.' },
      { id: 'c3', text: 'A runbook lets someone else resolve the same issue without you.' },
      { id: 'c4', text: 'You wrote the customer-facing status update for each incident.' }
    ],
    stretch: ['Add an alert that would have caught each failure earlier.'],
    proof: 'Postmortem + runbook + the customer update emails.',
    resources: ['r-gregg', 'r-sre', 'r-zines']
  },
  {
    id: 'p-demo',
    topic: 'diplomacy',
    title: 'Executive demo and one-pager',
    pillar: 'client_diplomacy', level: 'Start', hours: '4 h',
    brief: 'You have five minutes with a VP who has never seen your work and does not care about the tech stack.',
    build: 'Record a 5-minute demo of any project and write a one-page summary that leads with the business outcome.',
    stack: ['Screen recorder', 'A doc'],
    criteria: [
      { id: 'c1', text: 'The first 30 seconds state the problem, who has it, and what changes.' },
      { id: 'c2', text: 'No architecture diagram appears before minute three.' },
      { id: 'c3', text: 'The one-pager uses the pyramid structure: answer first, then support.' },
      { id: 'c4', text: 'Ends with a specific ask or next step.' }
    ],
    stretch: ['Show it to someone non-technical and rewrite whatever confused them.'],
    proof: 'Recording + one-pager.',
    resources: ['r-pyramid', 'r-momtest', 'r-trusted']
  }
];

/* --------------------------------------------------------------------------
   Decomp drill — timed practice with a scaffold and a self-score rubric.
   -------------------------------------------------------------------------- */
export const decompPhases = [
  { id: 'scope', title: 'Clarify & bound scope', minutes: 5, guide: 'Who is the operator? What decision do they make today, and how? What does success look like in numbers? State your assumptions out loud.', hint: 'Ask about latency tolerance, scale, existing systems, and who must approve changes. Pick one North Star metric.' },
  { id: 'entities', title: 'Entities & relationships', minutes: 12, guide: 'Model the real-world objects, their key properties, relationships and state transitions. Think in nouns the operator uses.', hint: 'Include at least one event/action entity (e.g. Reassignment, Alert) — not just static objects. Note which system owns each entity.' },
  { id: 'data', title: 'Data sources & ingestion', minutes: 12, guide: 'Where does each entity come from? Batch or streaming? How do you reconcile duplicates and conflicting IDs across systems?', hint: 'Name the ugliest source (spreadsheets, a mainframe export) and how you would handle its schema drift and freshness.' },
  { id: 'workflow', title: 'Operator workflow & interfaces', minutes: 10, guide: 'Walk through what the operator sees and does, step by step. What gets written back to source systems?', hint: 'Design the one screen that changes a decision. Describe writeback safety: idempotency, approvals, audit.' },
  { id: 'failure', title: 'Failure modes & trade-offs', minutes: 6, guide: 'What breaks? What happens offline, at 10× scale, or when data is wrong? Which trade-offs did you choose and why?', hint: 'Cover data quality, concurrency on writes, and partial outages. Say what you would cut for a 2-week pilot.' }
];

export const decompRubric = [
  { id: 'r1', text: 'Started from the operator and their decision, not the database.' },
  { id: 'r2', text: 'Stated assumptions and checked them instead of waiting for requirements.' },
  { id: 'r3', text: 'Entity model reflects the real world, including events and state.' },
  { id: 'r4', text: 'Handled at least one messy data source concretely.' },
  { id: 'r5', text: 'Covered writeback safety and at least three failure modes.' },
  { id: 'r6', text: 'Adapted cleanly when a new constraint appeared.' }
];

export const decompPrompts = [
  { id: 'd1', domain: 'Logistics', level: 'Start', title: 'Port congestion', prompt: 'A seaport has 35 ships waiting offshore, a 98%-full container yard and 6-hour truck queues. Design software that relieves the bottleneck.', twist: 'Customs now holds 15% of containers for inspection with 24 hours\' notice.' },
  { id: 'd2', domain: 'Healthcare', level: 'Start', title: 'Hospital bed allocation', prompt: 'A 12-hospital network wants to cut emergency-room boarding time by moving patients to beds across the network faster.', twist: 'Two hospitals use a different EHR that only exports nightly.' },
  { id: 'd3', domain: 'Airline', level: 'Core', title: 'Weather disruption rebooking', prompt: 'A storm cancels 400 flights. Rebook 40,000 passengers while respecting crew duty limits and aircraft maintenance windows.', twist: 'A crew union rule changes the maximum duty period mid-incident.' },
  { id: 'd4', domain: 'Financial services', level: 'Core', title: 'Card fraud triage', prompt: 'A bank\'s fraud team reviews 8,000 flagged transactions a day by hand. Help them clear the queue faster without missing real fraud.', twist: 'Regulators require an explanation for every declined transaction.' },
  { id: 'd5', domain: 'Manufacturing', level: 'Core', title: 'Supplier risk', prompt: 'An automaker with 45 plants wants early warning when a tier-2 supplier problem will stop a production line.', twist: 'Supplier data lives in three separate SAP instances with different part numbers.' },
  { id: 'd6', domain: 'Public sector', level: 'Core', title: 'Vaccine cold chain', prompt: 'Distribute vaccines to 5,000 clinics with refrigeration constraints, appointment scheduling and spoilage tracking.', twist: 'A third of clinics have intermittent connectivity.' },
  { id: 'd7', domain: 'Energy', level: 'Deep', title: 'Grid outage restoration', prompt: 'A utility needs to dispatch repair crews after a wildfire knocks out 120 substations, prioritizing critical customers like hospitals.', twist: 'Field crews work offline for up to 8 hours at a time.' },
  { id: 'd8', domain: 'Retail', level: 'Start', title: 'Out-of-stock prevention', prompt: 'A grocery chain loses 4% of sales to empty shelves. Help store managers fix it before customers notice.', twist: 'Point-of-sale data arrives 6 hours late in a third of stores.' },
  { id: 'd9', domain: 'Insurance', level: 'Core', title: 'Catastrophe claims surge', prompt: 'After a hurricane, an insurer receives 60,000 claims in a week. Help adjusters prioritize and settle them fairly.', twist: 'The CEO wants an AI model to auto-approve small claims by Friday.' },
  { id: 'd10', domain: 'Defense', level: 'Deep', title: 'Maintenance readiness', prompt: 'An air wing needs to know which aircraft will be mission-ready next week given parts, technicians and inspection schedules.', twist: 'The system must run fully air-gapped on a single rack.' },
  { id: 'd11', domain: 'Telecom', level: 'Core', title: 'Network incident correlation', prompt: 'A carrier\'s NOC sees 50,000 alarms an hour during an outage. Help operators find the root cause in minutes, not hours.', twist: 'Alarm formats differ by equipment vendor and change with firmware upgrades.' },
  { id: 'd12', domain: 'Pharma', level: 'Deep', title: 'Clinical trial site selection', prompt: 'A pharma company wants to pick trial sites that will actually enroll patients on time.', twist: 'Patient-level data cannot leave each hospital\'s environment.' }
];

/* --------------------------------------------------------------------------
   Story bank — behavioral prompts that come up in nearly every FDE loop.
   -------------------------------------------------------------------------- */
export const storyPrompts = [
  { id: 's1', title: 'Shipped under an impossible deadline', prompt: 'Tell me about a time you delivered something important with far less time than you needed.', probe: 'What did you cut, and how did you decide?' },
  { id: 's2', title: 'Learned an unfamiliar stack fast', prompt: 'Tell me about a time you had to become productive in a technology or domain you did not know.', probe: 'How did you know you understood it well enough to ship?' },
  { id: 's3', title: 'A difficult stakeholder', prompt: 'Describe a time someone outside your team actively resisted your work.', probe: 'What did you learn about their incentives?' },
  { id: 's4', title: 'Said no to a customer or executive', prompt: 'Tell me about a time you pushed back on a request from someone senior.', probe: 'What did you offer instead?' },
  { id: 's5', title: 'Something broke in front of a customer', prompt: 'Describe a demo, launch or production incident that went wrong while a customer was watching.', probe: 'What did you communicate, and when?' },
  { id: 's6', title: 'Ambiguous problem, no spec', prompt: 'Tell me about a project where nobody could tell you exactly what to build.', probe: 'How did you decide what to build first?' },
  { id: 's7', title: 'Turned a one-off into a reusable product', prompt: 'Describe a time you generalized a solution so other teams or customers could use it.', probe: 'What did you have to convince people of?' },
  { id: 's8', title: 'Why forward deployed?', prompt: 'Why do you want a customer-facing engineering role rather than a pure product engineering role?', probe: 'What part of the job do you expect to find hardest?' }
];

export const starFields = [
  { id: 'situation', label: 'Situation', help: 'Context in two sentences. Who, where, what was at stake.' },
  { id: 'task', label: 'Task', help: 'What you specifically owned.' },
  { id: 'action', label: 'Action', help: 'What you did — "I", not "we". The bulk of the story.' },
  { id: 'result', label: 'Result', help: 'Outcome with a number if possible, plus what you learned.' }
];
