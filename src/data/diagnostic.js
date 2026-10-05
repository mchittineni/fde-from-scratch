export const diagnosticPillars = [
  {
    id: "software_engineering",
    name: "Software & Systems Velocity",
    description: "Reading unfamiliar code quickly, shipping working prototypes in hours, and debugging production services you did not write.",
    weight: 20
  },
  {
    id: "data_ai_infra",
    name: "Distributed Data & AI Stack",
    description: "SQL and query plans, messy-data ingestion at scale (Spark, DuckDB, lakehouse tables), streaming, and retrieval-based LLM systems with evaluations.",
    weight: 20
  },
  {
    id: "enterprise_security",
    name: "Enterprise Security & Infra",
    description: "Deploying into networks you do not control: restricted egress, SSO and access control, compliance reviews, and Linux-level troubleshooting.",
    weight: 20
  },
  {
    id: "decomp_problem_solving",
    name: "Problem Decomposition ('Decomp')",
    description: "Turning a vague business goal into users, entities, data sources, a first deliverable, and the trade-offs that come with it.",
    weight: 20
  },
  {
    id: "client_diplomacy",
    name: "Client Diplomacy & Stakeholder EQ",
    description: "Earning trust with skeptical engineers, presenting to executives, negotiating scope, and staying steady when a pilot goes wrong.",
    weight: 20
  }
];

// Each option describes what you would actually do. Pick the one closest to
// your current habit, not the one you know is "right".
export const diagnosticQuestions = [
  // Pillar 1: Software & Systems Velocity
  {
    id: "q1",
    pillar: "software_engineering",
    text: "You are handed an undocumented Go or Python service you have never seen and asked to add a new REST endpoint by the end of the afternoon. What do you realistically do?",
    options: [
      { text: "I would ask a teammate for a walkthrough or wait for some documentation before changing anything, because I am not sure where to start.", score: 1 },
      { text: "I find an existing endpoint that looks similar, copy its structure, and test my new endpoint by hand with curl or Postman.", score: 3 },
      { text: "I locate the entry point and router, trace one existing request end to end, write a test that exercises the new route first, then implement it with the same error handling and validation conventions the codebase already uses.", score: 5 }
    ]
  },
  {
    id: "q2",
    pillar: "software_engineering",
    text: "A customer asks for a working demo by tomorrow: a small web UI, an API, and a database holding a sample of their data. Starting from an empty folder, how long would that take you?",
    options: [
      { text: "Several days. Setting up the tooling, dependencies, and deployment is usually where I get stuck.", score: 1 },
      { text: "About a full working day, using a stack I already know well, with basic styling and a few rough edges.", score: 3 },
      { text: "A few focused hours. I have a default stack I can set up from memory, I load the sample data early, and I spend most of the time on the one workflow the customer cares about.", score: 5 }
    ]
  },
  {
    id: "q3",
    pillar: "software_engineering",
    text: "A customer's service crashes a few times a day, only under heavy load. You suspect a race condition or a memory leak. What does your investigation usually look like?",
    options: [
      { text: "I restart it, give the container more memory or CPU, and read the application logs around the time of the crash.", score: 2 },
      { text: "I try to reproduce it with a load-testing tool, capture a heap or CPU profile, and look for shared state or locks that could be involved.", score: 4 },
      { text: "I reproduce it under load, compare profiles (heap, CPU, lock contention) between healthy and failing runs, run the race detector or equivalent tooling if the language has one, confirm the root cause, fix it, and add a stress test that would have caught it.", score: 5 }
    ]
  },

  // Pillar 2: Distributed Data & AI Stack
  {
    id: "q4",
    pillar: "data_ai_infra",
    text: "A client hands you 500 GB of historical records spread across 2,000 CSV files, with mixed date formats, missing columns, and schemas that changed over the years. What do you do?",
    options: [
      { text: "I load the files with pandas in a script. It tends to run out of memory, so I process smaller batches by hand.", score: 1 },
      { text: "I use DuckDB or Spark, read with an explicit schema and permissive parsing, and write rows that fail to parse to a separate file so I can review them.", score: 4 },
      { text: "I profile a sample first to catalog the schema versions, build a repeatable ingestion job (Spark or DuckDB into Delta or Iceberg tables) that maps each version to one target schema, quarantine bad rows with the reason they failed, compact the output files, and report row counts in versus out so the client can trust the result.", score: 5 }
    ]
  },
  {
    id: "q5",
    pillar: "data_ai_infra",
    text: "You are building a question-answering assistant over a company's confidential PDFs. Users complain that some answers are wrong or invented. What have you actually done in systems like this?",
    options: [
      { text: "I have split documents into fixed-size chunks, retrieved the top results by vector similarity, and passed them to the model with a prompt telling it to use only the context.", score: 2 },
      { text: "I have tuned chunking to the document structure, combined keyword (BM25) and vector search, filtered by metadata such as document version, and asked the model to cite its sources.", score: 4 },
      { text: "Beyond hybrid search and citations, I have built a labeled set of real questions, measured retrieval quality and answer faithfulness separately, added a reranker where it measurably helped, and used failure analysis to decide what to change next.", score: 5 }
    ]
  },
  {
    id: "q6",
    pillar: "data_ai_infra",
    text: "A dashboard query that used to take 2 seconds now takes 90. How would you approach it?",
    options: [
      { text: "I can write SELECTs, JOINs, and GROUP BYs, but I would not know how to see why a query is slow, so I would ask a DBA.", score: 2 },
      { text: "I would rewrite the query using CTEs or window functions where it helps, check whether the filtered columns are indexed, and test a few variations.", score: 4 },
      { text: "I would run EXPLAIN ANALYZE, compare estimated and actual row counts to spot stale statistics or a bad join order, look for unexpected sequential scans or missed partition pruning, and confirm the fix with the plan, not just the timing.", score: 5 }
    ]
  },

  // Pillar 3: Enterprise Security & Infrastructure
  {
    id: "q7",
    pillar: "enterprise_security",
    text: "A bank's security team tells you the target environment has no outbound internet access at all. How would you get your software installed and updated?",
    options: [
      { text: "I have only deployed to the cloud with internet access, so I would need to research how this is done.", score: 1 },
      { text: "I would export the container images to tar files, move them through the bank's approved transfer process, load them on the host, and run them with Docker Compose.", score: 3 },
      { text: "I would build a versioned offline bundle (signed images, checksums, dependency mirrors, Helm charts or manifests, install and upgrade scripts), push images into the bank's internal registry, confirm nothing in the software tries to call out, and agree with them how logs and support diagnostics leave the environment.", score: 5 }
    ]
  },
  {
    id: "q8",
    pillar: "enterprise_security",
    text: "The client wants login through their Okta or Microsoft Entra ID tenant, and analysts should only see rows and columns for their own region. What is your hands-on experience?",
    options: [
      { text: "I understand SSO conceptually, but I have not configured SAML or OpenID Connect myself.", score: 2 },
      { text: "I have set up an OIDC authorization code flow and mapped group claims from the token to roles in the application.", score: 4 },
      { text: "I have integrated SAML and OIDC with enterprise identity providers, handled user provisioning (for example SCIM) and token lifecycle, and enforced row and column restrictions in the data layer itself rather than only in the UI.", score: 5 }
    ]
  },
  {
    id: "q9",
    pillar: "enterprise_security",
    text: "You are on a customer's Linux host behind their reverse proxy. Users get HTTP 502 Bad Gateway from an internal service. What do you check?",
    options: [
      { text: "I check whether the process is running with `ps` and read the most recent container logs.", score: 2 },
      { text: "I confirm the service is listening (`ss -tlnp`), call it directly on localhost with `curl -v`, check CPU, memory, and disk, and read the proxy's error log.", score: 4 },
      { text: "I start from the proxy error log to see why the upstream response failed (refused, reset, or malformed), then check the upstream address and port the proxy is configured with, DNS and firewall rules between them, the service's own health and logs, and the kernel log for OOM kills or restarts.", score: 5 }
    ]
  },

  // Pillar 4: Problem Decomposition ('Decomp')
  {
    id: "q10",
    pillar: "decomp_problem_solving",
    text: "An interviewer says: 'A shipping company wants to cut empty container repositioning by 20%. How would you approach it?' What is your first move?",
    options: [
      { text: "I start describing a machine learning model that predicts container demand at each port.", score: 1 },
      { text: "I ask clarifying questions about container types, ports, the data available, and current operating constraints.", score: 3 },
      { text: "I confirm who makes repositioning decisions today and how success is measured, then sketch the core entities (ports, depots, containers, bookings, voyages), the data that exists versus what is missing, a small first deliverable those planners would use, and how it rolls out.", score: 5 }
    ]
  },
  {
    id: "q11",
    pillar: "decomp_problem_solving",
    text: "You are modeling a domain where requirements keep changing, such as hospital patient flow or payment networks. How do you usually design the data model?",
    options: [
      { text: "I create normalized tables for what I know today and run schema migrations whenever a new requirement appears.", score: 2 },
      { text: "I use relational tables for stable fields and a JSON column for attributes that vary, so new fields do not always need a migration.", score: 4 },
      { text: "I model the real-world objects and the relationships between them explicitly, keep events (admissions, transfers, payments) as an append-only history, separate stable core attributes from extensible ones, and check the model by walking through real user questions it must answer.", score: 5 }
    ]
  },
  {
    id: "q12",
    pillar: "decomp_problem_solving",
    text: "A client insists on sub-millisecond queries and fully up-to-date, strongly consistent data across several terabytes. How do you respond?",
    options: [
      { text: "I agree to both and plan to work out the architecture during implementation.", score: 1 },
      { text: "I explain that latency and consistency trade off against each other in distributed systems and ask them to choose which one matters more.", score: 3 },
      { text: "I find out which users and decisions actually need each property, then propose different paths: strongly consistent writes where money or safety is involved, cached or replicated reads where slightly stale data is acceptable, with measured latency and freshness targets everyone signs off on.", score: 5 }
    ]
  },

  // Pillar 5: Client Diplomacy & Stakeholder EQ
  {
    id: "q13",
    pillar: "client_diplomacy",
    text: "In a pilot meeting, the client's lead architect says in front of everyone: 'This is overcomplicated and overpriced. Our Python scripts already do this.' What do you do?",
    options: [
      { text: "I explain why our platform's capabilities and benchmarks are better than scripts.", score: 1 },
      { text: "I say politely that the platform covers enterprise needs their scripts may not, and offer to compare the two.", score: 3 },
      { text: "I ask what the scripts handle today and where they cause pain, agree on a concrete comparison using their own workload and success criteria, and look for a way to build on their scripts rather than replace them, so they have a stake in the outcome.", score: 5 }
    ]
  },
  {
    id: "q14",
    pillar: "client_diplomacy",
    text: "Three days before a pilot goes live, a client executive asks for five significant new features. What do you do?",
    options: [
      { text: "I agree to keep them happy and try to fit everything in by working very long days.", score: 1 },
      { text: "I decline and point to the scope agreed in the statement of work.", score: 2 },
      { text: "I ask what outcome is driving the request, estimate each feature with the team, and propose a plan: go live on schedule with the agreed scope (plus at most one small item if it is safe), then a dated follow-up phase for the rest, confirmed in writing.", score: 5 }
    ]
  },
  {
    id: "q15",
    pillar: "client_diplomacy",
    text: "You are presenting your solution to the client's CTO and four of their senior engineers. How do you structure the session?",
    options: [
      { text: "I start with the architecture diagram, code, and database schema, since the audience is technical.", score: 2 },
      { text: "I give an overview of the problem, show a demo, and leave the rest of the time for questions.", score: 3 },
      { text: "I open with the decision I need and the result in their terms (time saved, risk removed, cost), show a short demo on their data, then go into the architecture and open trade-offs, asking the engineers to challenge specific choices.", score: 5 }
    ]
  }
];

export function calculateDiagnosticResult(answers) {
  // answers is an object: { q1: score, q2: score, ... }
  const pillarScores = {
    software_engineering: { total: 0, max: 15, name: "Software Velocity" },
    data_ai_infra: { total: 0, max: 15, name: "Data & AI Stack" },
    enterprise_security: { total: 0, max: 15, name: "Enterprise Security" },
    decomp_problem_solving: { total: 0, max: 15, name: "Problem Decomposition" },
    client_diplomacy: { total: 0, max: 15, name: "Client Diplomacy" }
  };

  diagnosticQuestions.forEach(q => {
    const score = answers[q.id] || 0;
    if (pillarScores[q.pillar]) {
      pillarScores[q.pillar].total += score;
    }
  });

  const percentages = {};
  let overallSum = 0;
  let overallMax = 0;

  Object.keys(pillarScores).forEach(key => {
    const p = pillarScores[key];
    const pct = Math.round((p.total / p.max) * 100);
    percentages[key] = pct;
    overallSum += p.total;
    overallMax += p.max;
  });

  const overallPercent = Math.round((overallSum / overallMax) * 100);

  // Identify strengths and improvement areas
  const sortedPillars = Object.keys(percentages).sort((a, b) => percentages[b] - percentages[a]);
  const primaryStrengthKey = sortedPillars[0];
  const primaryWeaknessKey = sortedPillars[sortedPillars.length - 1];

  let recommendedLevel;
  if (overallPercent >= 85) recommendedLevel = "senior";
  else if (overallPercent >= 65) recommendedLevel = "mid";
  else if (overallPercent < 45) recommendedLevel = "entry";
  else recommendedLevel = "transitioner";

  return {
    overallScore: overallPercent,
    pillarScores,
    percentages,
    primaryStrength: pillarScores[primaryStrengthKey].name,
    primaryWeakness: pillarScores[primaryWeaknessKey].name,
    primaryWeaknessKey,
    recommendedLevel,
    diagnosisSummary: getDiagnosisText(overallPercent, primaryStrengthKey, primaryWeaknessKey)
  };
}


const pillarFocus = {
  software_engineering: "software velocity (reading unfamiliar code, fast prototypes, debugging under load)",
  data_ai_infra: "the data and AI stack (query plans, messy-data ingestion, retrieval systems with evaluations)",
  enterprise_security: "enterprise security and infrastructure (restricted networks, SSO, Linux troubleshooting)",
  decomp_problem_solving: "problem decomposition (turning a vague goal into entities, data, and a first deliverable)",
  client_diplomacy: "client diplomacy (handling pushback, scoping, presenting to executives)"
};

function getDiagnosisText(score, strengthKey, weaknessKey) {
  const strength = pillarFocus[strengthKey];
  const weakness = pillarFocus[weaknessKey];
  const sameArea = strengthKey === weaknessKey;

  if (score >= 80) {
    return `Your answers describe someone who already works the way forward deployed engineers do across most areas. Your strongest area is ${strength}.${sameArea ? "" : ` The area with the most room to grow is ${weakness}; a few deliberate practice reps there will make your interview loop more even.`} Focus on turning your experience into concise stories and on timed decomposition practice.`;
  } else if (score >= 60) {
    return `You have a solid base to build on, strongest in ${strength}.${sameArea ? "" : ` Your answers suggest ${weakness} is the main gap.`} Closing one gap with hands-on work, such as a small project or a few practice interviews, will move your overall readiness more than polishing what is already strong.`;
  } else {
    return `You are early in the path, which is a normal starting point. Your relative strength is ${strength}; build from there.${sameArea ? "" : ` Plan dedicated time for ${weakness}.`} The most useful next steps are building and deploying small end-to-end projects, cleaning a real messy dataset, and practicing structured decomposition out loud.`;
  }
}
