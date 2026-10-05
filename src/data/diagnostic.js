export const diagnosticPillars = [
  {
    id: "software_engineering",
    name: "Software & Systems Velocity",
    description: "Ability to write clean, concurrent, production code and prototype full-stack solutions in hours without boilerplate inertia.",
    weight: 20
  },
  {
    id: "data_ai_infra",
    name: "Distributed Data & AI Stack",
    description: "Fluency in SQL, Lakehouses (Delta/Iceberg), Spark, streaming (Kafka), vector DBs, and LLM orchestration (RAG/Evals).",
    weight: 20
  },
  {
    id: "enterprise_security",
    name: "Enterprise Security & Infra",
    description: "Architectural mastery over VPCs, IAM/SAML/OAuth2, air-gapped on-prem installations, compliance, and Linux debugging.",
    weight: 20
  },
  {
    id: "decomp_problem_solving",
    name: "Problem Decomposition ('Decomp')",
    description: "Breaking ambiguous, unstructured real-world customer requests into rigorous entity models, data schemas, and technical milestones.",
    weight: 20
  },
  {
    id: "client_diplomacy",
    name: "Client Diplomacy & Stakeholder EQ",
    description: "Managing resistant customer engineers, presenting to executive CTOs, de-escalating pilot crises, and negotiating scope.",
    weight: 20
  }
];

export const diagnosticQuestions = [
  // Pillar 1: Software & Systems Velocity
  {
    id: "q1",
    pillar: "software_engineering",
    text: "You are given a completely unfamiliar codebase in Go or Python with no documentation and told to expose a new REST endpoint within 2 hours. How do you approach this?",
    options: [
      { text: "I struggle when there is no documentation and need guided onboarding or boilerplate generators.", score: 1 },
      { text: "I read through the core routes and models, follow existing pattern conventions, and test using cURL/Postman.", score: 3 },
      { text: "I immediately trace entry points, grep router definitions, write a quick unit/integration test to establish a feedback loop, and ship the endpoint with proper error handling.", score: 5 }
    ]
  },
  {
    id: "q2",
    pillar: "software_engineering",
    text: "How comfortable are you building a working full-stack prototype (Frontend UI + Backend API + DB) from a blank directory in under 4 hours?",
    options: [
      { text: "I usually rely on established boilerplate setups or need a few days to configure tooling and dependencies.", score: 1 },
      { text: "I can build it in a day using familiar frameworks (like React + Express/FastAPI) with basic styling and functionality.", score: 3 },
      { text: "I can scaffold and deploy a responsive, fully interactive prototype in 2-3 hours using lightweight modern tooling, SQLite/PostgreSQL, and clean UI components.", score: 5 }
    ]
  },
  {
    id: "q3",
    pillar: "software_engineering",
    text: "A customer's microservice crashes intermittently under high concurrency due to a race condition or memory leak. What is your triage process?",
    options: [
      { text: "I restart the container, increase allocated memory/CPU, and inspect basic application error logs.", score: 2 },
      { text: "I reproduce locally with synthetic load, inspect heap dumps / profiler outputs (e.g. pprof), and review thread/goroutine locks.", score: 4 },
      { text: "I analyze CPU/memory flamegraphs, isolate lock contention with strace/pprof, identify non-atomic operations or unbuffered channels, patch with atomic primitives, and add stress regression tests.", score: 5 }
    ]
  },

  // Pillar 2: Distributed Data & AI Stack
  {
    id: "q4",
    pillar: "data_ai_infra",
    text: "A client provides 500GB of messy, malformed historical records (mixed date formats, missing fields, schema drifts) across 2,000 CSV files. What do you do?",
    options: [
      { text: "I write a basic Python script with Pandas, but it frequently crashes with Out-Of-Memory (OOM) errors.", score: 1 },
      { text: "I use DuckDB or PySpark with chunked processing, define a resilient schema with permissive parsing, and log malformed rows to a dead-letter queue.", score: 4 },
      { text: "I architect an automated distributed ingestion pipeline (Spark/Delta Lake) with schema enforcement, quarantine bad records into an audit table, optimize file sizing with compaction (Z-order), and build an ingestion dashboard.", score: 5 }
    ]
  },
  {
    id: "q5",
    pillar: "data_ai_infra",
    text: "When designing an Enterprise RAG (Retrieval-Augmented Generation) system for confidential corporate PDFs, how do you handle accuracy and hallucinations?",
    options: [
      { text: "I just pass chunks directly from a naive vector search (like Chroma/FAISS) to the LLM with a standard prompt.", score: 2 },
      { text: "I implement recursive character chunking with metadata filtering, a hybrid search (Dense + BM25), and basic prompt guardrails.", score: 4 },
      { text: "I deploy semantic chunking tailored to document layout, hybrid search with reciprocal rank fusion (RRF), cross-encoder reranking, context compression, and an automated evaluation pipeline (faithfulness, relevancy, latency benchmarks).", score: 5 }
    ]
  },
  {
    id: "q6",
    pillar: "data_ai_infra",
    text: "How deep is your understanding of SQL optimization and query execution plans?",
    options: [
      { text: "I can write basic SELECT, JOIN, and GROUP BY queries, but rarely look at EXPLAIN plans or tune indexes.", score: 2 },
      { text: "I write advanced SQL using Window functions (RANK, LAG/LEAD), CTEs, and know how B-tree indexes affect lookup performance.", score: 4 },
      { text: "I routinely inspect EXPLAIN ANALYZE tree outputs, spot sequential table scans vs index scans, eliminate cartesian joins, handle data skew in distributed shuffles, and optimize partition pruning.", score: 5 }
    ]
  },

  // Pillar 3: Enterprise Security & Infrastructure
  {
    id: "q7",
    pillar: "enterprise_security",
    text: "A banking client's Chief Information Security Officer (CISO) informs you that no outbound internet connection is allowed (strict air-gap). How do you deploy your software?",
    options: [
      { text: "I am used to cloud SaaS environments and would be unsure how to operate without internet or public Docker Hub.", score: 1 },
      { text: "I would package Docker images into tarballs, transfer them via audited jump hosts, and run docker compose on-prem.", score: 3 },
      { text: "I design an automated air-gapped deployment bundle: private container registry with cryptographically signed images, offline package mirrors, Helm/K8s manifests, zero outbound egress configuration, and local telemetry logging.", score: 5 }
    ]
  },
  {
    id: "q8",
    pillar: "enterprise_security",
    text: "The client requires single sign-on (SSO) integration with their corporate Okta/Azure AD and role-based permissions at the row/column level. What is your familiarity?",
    options: [
      { text: "I know what SSO is conceptually, but have never configured SAML 2.0 or OIDC flows hands-on.", score: 2 },
      { text: "I have configured OIDC/OAuth2 authorization code flows and mapped JWT claims to user roles in application logic.", score: 4 },
      { text: "I have architected enterprise identity integrations using SAML 2.0 and OIDC with SCIM automated provisioning, PKCE, token refresh rotation, and attribute-based dynamic data masking (ABAC) at the query layer.", score: 5 }
    ]
  },
  {
    id: "q9",
    pillar: "enterprise_security",
    text: "You are SSH'd into a client's bastion host. An internal service is returning HTTP 502 Bad Gateway. What is your command-line diagnostic routine?",
    options: [
      { text: "I check if the app is running with `ps aux` and look at the most recent lines of `docker logs`.", score: 2 },
      { text: "I verify listener ports (`netstat -tuln` / `ss`), test localhost connectivity with `curl -iv`, inspect system resources (`htop`, `df -h`), and check reverse proxy error logs.", score: 4 },
      { text: "I execute a systematic OSI layer triage: DNS resolution (`dig`/`nslookup`), firewall/routing (`iptables`, `traceroute`), port socket status (`ss -tulpn`), reverse proxy upstream health, process syscall traces (`strace`), and kernel dmesg OOM kill logs.", score: 5 }
    ]
  },

  // Pillar 4: Problem Decomposition ('Decomp')
  {
    id: "q10",
    pillar: "decomp_problem_solving",
    text: "In an interview, you are given this vague prompt: 'A global logistics company wants to reduce empty shipping container relocations by 20%. How would you solve this?' What is your first move?",
    options: [
      { text: "I immediately start designing a machine learning model to predict container demands.", score: 1 },
      { text: "I ask clarifying questions about container types, port locations, historical data available, and current operational constraints.", score: 3 },
      { text: "I clarify business objectives and success criteria, define key entities and relationships (Ports, Vessels, Containers, Bookings, Depots), identify existing data streams vs gaps, propose an MVP ingestion/matching pipeline, and detail rollout milestones.", score: 5 }
    ]
  },
  {
    id: "q11",
    pillar: "decomp_problem_solving",
    text: "When modeling real-world business domains (e.g. healthcare patient flows, financial transaction graphs), how do you design data schemas for high flexibility?",
    options: [
      { text: "I create rigid relational tables with foreign keys and alter schemas whenever new requirements arise.", score: 2 },
      { text: "I use a hybrid relational + JSONB document model to allow dynamic metadata fields without schema migrations.", score: 4 },
      { text: "I architect an enterprise ontology model: core entities, object types, typed links, time-series events, and immutable audit logs that mirror physical operational workflows and adapt gracefully to unforeseen client edge cases.", score: 5 }
    ]
  },
  {
    id: "q12",
    pillar: "decomp_problem_solving",
    text: "How do you handle technical tradeoffs when a client demands both sub-millisecond query latency and 100% strict real-time consistency across multi-terabyte datasets?",
    options: [
      { text: "I promise we can deliver both and figure out the architecture later during implementation.", score: 1 },
      { text: "I explain the CAP theorem and push back that they have to pick either speed or consistency.", score: 3 },
      { text: "I probe the business workflow to uncover the true latency needs of different user personas, propose a tiered architecture (read-through cache + async replica for analytics, strongly consistent hot path for financial writes), and establish agreed-upon SLAs.", score: 5 }
    ]
  },

  // Pillar 5: Client Diplomacy & Stakeholder EQ
  {
    id: "q13",
    pillar: "client_diplomacy",
    text: "During an on-site pilot, the client's senior lead architect publicly says in a meeting: 'Your software is overly complex, overpriced, and our in-house Python scripts already do this.' How do you respond?",
    options: [
      { text: "I get defensive and argue why our platform's algorithms and benchmarks are superior to their scripts.", score: 1 },
      { text: "I politely say that our platform has enterprise features their scripts might lack, and offer to benchmark both.", score: 3 },
      { text: "I acknowledge their incredible in-house work, validate their skepticism, and invite them to co-pilot: 'Your scripts solved the immediate problem brilliantly. Let's see how our platform can integrate with your existing scripts to take away maintenance burden and handle enterprise scaling.'", score: 5 }
    ]
  },
  {
    id: "q14",
    pillar: "client_diplomacy",
    text: "A client executive requests 5 major custom feature additions 3 days before the pilot's scheduled go-live deadline. How do you handle this?",
    options: [
      { text: "I say 'Yes' to make the client happy and work 20-hour days to try and cram in the features.", score: 1 },
      { text: "I say 'No' firmly and point to the original Statement of Work (SOW) agreement.", score: 2 },
      { text: "I use the 'Yes, and...' scope framework: Validate the strategic importance of their request, map out the technical dependencies, and offer a phased roadmap: 'Phase 1 locks in the core value for Tuesday's deadline; Phase 2 rolls out these 5 high-impact features in sprint 1 immediately post-launch.'", score: 5 }
    ]
  },
  {
    id: "q15",
    pillar: "client_diplomacy",
    text: "You are presenting a technical solution to a room containing the client's Chief Technology Officer (CTO) and 4 staff engineers. How do you structure your presentation?",
    options: [
      { text: "I dive immediately into the architecture diagram, code snippets, and database tables.", score: 2 },
      { text: "I start with a high-level overview of the problem, show a demo, and leave the remaining time for open Q&A.", score: 3 },
      { text: "I lead with the executive bottom line (business impact, risk reduction, operational ROI in 2 minutes), show a live working demo that proves value, and seamlessly transition into deep architectural mechanics, inviting staff engineers into the technical tradeoffs.", score: 5 }
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

  let recommendedLevel = "entry";
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

function getDiagnosisText(score, strengthKey, weaknessKey) {
  if (score >= 80) {
    return "Exceptional FDE Readiness! You exhibit the rare dual superpower of deep distributed systems engineering and high-EQ client leadership. You are primed for Senior FDSE, Staff FDE, or Field CTO interview loops.";
  } else if (score >= 60) {
    return "Strong Technical Core with High Growth Potential! You have strong engineering or problem-solving capability, but need targeted preparation in either Enterprise Security/VPCs or High-Stakes Client Diplomacy to crack top-tier loops.";
  } else {
    return "Emerging Forward Deployed Talent! Focus your preparation on rapid full-stack prototyping, real-world data sanitization, and structured problem decomposition ('Decomp') to stand out from typical candidates.";
  }
}
