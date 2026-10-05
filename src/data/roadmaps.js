export const experienceLevels = {
  entry: {
    id: "entry",
    title: "Associate / Early Career FDE",
    experience: "0 - 2 Years",
    tagline: "Turn CS fundamentals into working software a customer can use this week",
    overview: "For new grads, bootcamp graduates and engineers with under two years of experience. Early-career FDE interviews tend to check three things: whether you can get productive in an unfamiliar stack quickly, whether you can write correct code with the clock running, and whether you can explain a technical constraint to someone who doesn't write code. This track builds evidence for each, one small artifact at a time.",
    keyStrengthsToProve: [
      "Shipping a small full-stack app end to end (UI, API, database) without waiting for a template",
      "SQL fluency and practical data cleaning on messy CSV, JSON and Parquet inputs",
      "Debugging in an environment you didn't set up: Linux shell, containers, DNS, TLS and logs",
      "Asking clarifying questions before building, and writing short, clear status updates"
    ],
    targetInterviews: [
      "Associate or new-grad forward deployed engineer roles",
      "Forward Deployed Software Engineer (Palantir), early-career hiring",
      "Associate solutions engineer / solutions architect roles at data-platform companies",
      "Deployment or implementation engineer roles at applied AI startups",
      "Technical consultant roles at enterprise SaaS vendors"
    ],
    weeks: [
      {
        week: "Weeks 1 - 2",
        title: "Pillar 1: Shipping a full-stack prototype fast",
        focus: "Software engineering and delivery speed",
        summary: "Get comfortable taking an idea to a running app in one sitting. Keep the stack small so your time goes into the problem, not the setup.",
        tasks: [
          { id: "e1", text: "Build a single-page data explorer (React or plain JS front end, FastAPI or Express back end) that loads a public CSV, filters it and charts one column. Time-box it to four hours and note where the time went.", milestone: "Timed data-explorer prototype with time log" },
          { id: "e2", text: "Add pagination, consistent error responses, rate limiting and an Idempotency-Key header on the POST endpoint of that API, then write a one-page README explaining each choice and how the same contract would look as a gRPC service.", milestone: "Hardened REST API with design notes" },
          { id: "e3", text: "Containerize the app as three services (front end, API, PostgreSQL) with Docker Compose, healthchecks, a named volume and environment-based config; confirm a fresh clone starts with one command.", milestone: "One-command Docker Compose stack" }
        ],
        resources: ["FastAPI documentation (Tutorial - User Guide)", "Docker Compose healthchecks and service dependencies", "Idempotency keys in HTTP APIs"]
      },
      {
        week: "Weeks 3 - 4",
        title: "Pillar 2: SQL and messy real-world data",
        focus: "Data wrangling and SQL",
        summary: "Customer data almost always arrives with gaps, duplicates and surprises. Practice cleaning it reproducibly and querying it well.",
        tasks: [
          { id: "e4", text: "Solve 25 SQL problems that require window functions (ROW_NUMBER, RANK, LAG, LEAD), CTEs and self-joins; keep your solutions in a repo with a one-line note on the technique each one needed.", milestone: "25-problem SQL solutions repo" },
          { id: "e5", text: "Write a Python cleaning script with pandas or Polars for a messy public dataset: handle nulls, mixed timezones, inconsistent casing and duplicate rows, and emit a before-and-after data-quality report.", milestone: "Reproducible cleaning script with quality report" },
          { id: "e6", text: "Load a table with at least a million rows into PostgreSQL, capture EXPLAIN ANALYZE for a slow query, add a suitable B-tree or composite index, and write up how the plan and timing changed.", milestone: "Indexed query with EXPLAIN write-up" }
        ],
        resources: ["Use The Index, Luke", "PostgreSQL documentation: Using EXPLAIN", "Polars User Guide"]
      },
      {
        week: "Weeks 5 - 6",
        title: "Pillar 3: Decomposition basics",
        focus: "Structuring ambiguous problems",
        summary: "Many FDE loops include an open-ended problem with no spec, often called a decomposition or \"decomp\" round. Practice a repeatable way to break it down out loud.",
        tasks: [
          { id: "e7", text: "Write a one-page decomposition checklist in your own words covering four phases: goals and users, data and entities, system and data flow, and tradeoffs and failure modes. Use it in every later practice session.", milestone: "Personal decomposition checklist" },
          { id: "e8", text: "Run five timed 45-minute decompositions (for example: port container scheduling, hospital bed allocation, card-fraud alert triage, airline rebooking after a storm, warehouse stock-outs) and save your notes and diagram for each.", milestone: "Five recorded decomposition sessions" },
          { id: "e9", text: "For two of those prompts, write the ten questions you would ask the customer before designing anything, and mark which answer would change your design the most.", milestone: "Discovery question list with design impact" }
        ],
        resources: ["The Mom Test", "Entity-relationship modeling basics", "Requirements interviewing techniques"]
      },
      {
        week: "Weeks 7 - 8",
        title: "Pillar 4: Linux, networking and troubleshooting",
        focus: "Infrastructure and diagnostics",
        summary: "On a customer's machines you often get a shell and little else. Build a short, repeatable triage routine with standard tools.",
        tasks: [
          { id: "e10", text: "Write your own triage runbook using top/htop, ss, lsof, journalctl, strace, curl -v, dig and tcpdump, with the exact commands you would run for \"service is slow\", \"port not reachable\" and \"DNS lookup fails\".", milestone: "Personal Linux triage runbook" },
          { id: "e11", text: "Put Nginx in front of your API with TLS (self-signed or a local CA), then reproduce and fix a CORS error and a failed WebSocket upgrade; record the request and response headers that revealed each problem.", milestone: "Reverse-proxy lab notes with header traces" },
          { id: "e12", text: "Break your Compose stack on purpose three ways (a container OOMKilled by its memory limit, an exhausted database connection pool, a wrong service DNS name) and write a short incident note for each: symptom, evidence, fix.", milestone: "Three incident notes from a failure lab" }
        ],
        resources: ["The Linux Command Line (William Shotts)", "Systems Performance (Brendan Gregg)", "TLS handshakes and certificate chains"]
      },
      {
        week: "Weeks 9 - 10",
        title: "Pillar 5: Applied AI and lakehouse basics",
        focus: "LLM applications and modern data storage",
        summary: "A lot of current FDE work connects language models and lakehouse tables to existing customer workflows. Build one small example of each and measure it.",
        tasks: [
          { id: "e13", text: "Build a small RAG app over 50 or more documents with chunking, embeddings, a vector index, optional reranking, and answers that cite their source chunks. Record ten questions it gets wrong and why.", milestone: "RAG demo with failure log" },
          { id: "e14", text: "Write a set of Parquet files, then create a Delta Lake or Apache Iceberg table from them; demonstrate an atomic update, a schema change and time travel, and explain what the transaction log or metadata files recorded.", milestone: "Lakehouse table walkthrough notebook" },
          { id: "e15", text: "Add a 20-question evaluation set to your RAG app, log tokens and latency per request, and add a response cache; report answer quality, cost and p95 latency before and after.", milestone: "RAG eval and cost/latency report" }
        ],
        resources: ["AI Engineering (Chip Huyen)", "Delta Lake: The Definitive Guide", "Parquet columnar file format"]
      },
      {
        week: "Weeks 11 - 12",
        title: "Pillar 6: Mock interviews and storytelling",
        focus: "Interview execution",
        summary: "Pull the previous weeks together under realistic conditions: timed coding, a decomposition, and behavioral questions about working with customers.",
        tasks: [
          { id: "e16", text: "Complete ten timed 45-minute coding sessions on medium problems and practical API or parsing tasks; after each, write down the one thing that cost you the most time.", milestone: "Ten-session coding log" },
          { id: "e17", text: "Write six STAR stories, including a bug that surfaced during a demo, a disagreement with a teammate, a deadline where you cut scope, and a tool you had to learn quickly. Keep each under two minutes when spoken.", milestone: "Six-story behavioral bank" },
          { id: "e18", text: "Run a full four-round mock loop with a peer or mentor (coding, decomposition, technical deep dive, behavioral) and collect written feedback against a simple scorecard.", milestone: "Mock loop scorecard and feedback" }
        ],
        resources: ["STAR method for behavioral interviews", "Explaining technical tradeoffs to non-engineers", "Running peer mock interviews"]
      }
    ]
  },

  mid: {
    id: "mid",
    title: "Mid-Level Software Engineer (2 - 5 YOE)",
    experience: "2 - 5 Years",
    tagline: "Move from building features for your own team to delivering systems inside someone else's",
    overview: "For engineers who have shipped and operated production services and now want customer-facing deployment work. Interviewers at this level commonly probe whether you can reason about distributed data systems, enterprise security constraints and LLM applications, and whether you can run discovery with a customer and defend a scope. Expect to produce working code and written design notes in roughly equal measure.",
    keyStrengthsToProve: [
      "Distributed data processing in practice: Spark execution, partitioning, skew and streaming delivery guarantees",
      "Explaining architectural tradeoffs: build vs. buy, batch vs. streaming, strong vs. eventual consistency",
      "Customer discovery: turning a vague request into requirements, success metrics and a phased plan",
      "Hardening a prototype for production: tests, CI/CD, observability, secrets and access control"
    ],
    targetInterviews: [
      "Forward Deployed Software Engineer (Palantir)",
      "Solutions architect / field engineering roles at data-platform companies",
      "Forward deployed engineer roles at applied AI and model companies",
      "Applied AI or customer engineering roles at LLM platform vendors",
      "Implementation and integration engineering roles at enterprise SaaS companies"
    ],
    weeks: [
      {
        week: "Weeks 1 - 2",
        title: "Pillar 1: Distributed data engines and lakehouse internals",
        focus: "Large-scale data processing",
        summary: "Learn how Spark actually executes a job and how table formats affect performance, so you can diagnose a slow pipeline instead of guessing.",
        tasks: [
          { id: "m1", text: "Run a Spark job with a large join and an aggregation, then use the Spark UI to identify stages, shuffles and the physical plan; force a broadcast join and a sort-merge join and explain the difference in a short write-up that covers the Catalyst optimizer and adaptive query execution.", milestone: "Annotated Spark UI and join-plan comparison" },
          { id: "m2", text: "Build a Kafka to Spark Structured Streaming pipeline that writes to a Delta or Iceberg table with checkpointing; test what happens on restart, and explain why end-to-end exactly-once requires a replayable source, checkpointed offsets and an idempotent or transactional sink.", milestone: "Streaming pipeline with restart test" },
          { id: "m3", text: "Create a skewed dataset with many small files, measure a slow query, then fix it with AQE skew-join handling or key salting plus file compaction (OPTIMIZE and Z-ORDER in Delta, or rewrite_data_files in Iceberg); report runtime before and after.", milestone: "Skew and small-file tuning report" }
        ],
        resources: ["Spark: The Definitive Guide", "Designing Data-Intensive Applications", "Kafka: The Definitive Guide"]
      },
      {
        week: "Weeks 3 - 4",
        title: "Pillar 2: Enterprise identity, networking and data security",
        focus: "Identity, private networking and governance",
        summary: "Regulated customers such as banks, hospitals and public agencies decide early whether your software can enter their network. Learn the controls they will ask about and build small working versions.",
        tasks: [
          { id: "m4", text: "Implement login for a small app with the OIDC Authorization Code flow plus PKCE against a real identity provider, add a service-to-service call using the OAuth 2.0 Client Credentials grant, and diagram where SAML federation or mTLS would fit in a stricter customer setup.", milestone: "Working OIDC/OAuth demo with flow diagram" },
          { id: "m5", text: "Diagram a deployment into a customer AWS account (or the equivalent on another cloud) that uses private connectivity (PrivateLink or VPC peering), an egress proxy and IP allowlists, and list what changes when the customer routes many VPCs through a Transit Gateway.", milestone: "Private-connectivity network diagram" },
          { id: "m6", text: "Add role-based and attribute-based access rules, row-level filtering and column masking to a sample dataset, then map each control to the GDPR or HIPAA requirement it helps satisfy.", milestone: "Access-control demo with compliance mapping" }
        ],
        resources: ["OAuth 2 in Action", "AWS PrivateLink and VPC endpoints", "Row-level security and column masking"]
      },
      {
        week: "Weeks 5 - 6",
        title: "Pillar 3: Decomposition under real ambiguity",
        focus: "Framing open-ended problems",
        summary: "At this level the prompt is vaguer and the customer may not know what data they have. Practice scoping, designing for data that changes shape, and tying the design to a business metric.",
        tasks: [
          { id: "m7", text: "Run a timed 60-minute decomposition of: \"An automaker wants to spot battery warranty defects early across about three million connected vehicles.\" Produce an entity model, a data-flow diagram, a first milestone and the top three risks.", milestone: "Battery-warranty decomposition with diagram" },
          { id: "m8", text: "Design an ingestion layer that accepts customer payloads with unannounced new fields: use a schema registry or a schema-on-read landing zone, define compatibility rules, and show one change that is accepted and one that is rejected.", milestone: "Schema-evolution design with test cases" },
          { id: "m9", text: "For one practice prompt, pick a single business metric, derive the technical targets it implies (freshness, p99 latency, throughput, accuracy) and write them as SLOs a customer could sign off on.", milestone: "Metric-to-SLO worksheet" }
        ],
        resources: ["Schema registry compatibility modes", "Data contracts between producers and consumers", "Site Reliability Engineering"]
      },
      {
        week: "Weeks 7 - 8",
        title: "Pillar 4: Applied generative AI and agent workflows",
        focus: "LLM orchestration and evaluation",
        summary: "Customers want LLM systems that hold up on their own data and processes. Focus on measurable quality, controlled actions and retrieval that finds the right document.",
        tasks: [
          { id: "m10", text: "Build a multi-step agent workflow (LangGraph or a hand-written state machine) for a realistic task such as invoice exception handling, with tool calls, persisted state and a human approval step before any write action.", milestone: "Agent workflow with approval gate" },
          { id: "m11", text: "Build an evaluation harness for that workflow: a labeled test set (hand-written plus synthetic cases), automated checks for groundedness and correctness, and a regression run you repeat on every prompt or model change.", milestone: "Repeatable LLM eval harness" },
          { id: "m12", text: "Implement hybrid retrieval that combines BM25 and dense vector results with reciprocal rank fusion, add a cross-encoder reranker, and report recall@k and answer accuracy for each stage on your eval set.", milestone: "Hybrid retrieval benchmark" }
        ],
        resources: ["AI Engineering (Chip Huyen)", "LLM evaluation and groundedness metrics", "Reciprocal rank fusion and cross-encoder reranking"]
      },
      {
        week: "Weeks 9 - 10",
        title: "Pillar 5: Stakeholder management and difficult conversations",
        focus: "Customer communication",
        summary: "Interviewers commonly role-play a skeptical customer engineer who thinks their in-house script already does the job. Practice staying factual, curious and useful under that pressure.",
        tasks: [
          { id: "m13", text: "Write and rehearse responses to three skeptical-customer scenarios using a simple pattern: acknowledge the concern, confirm the shared goal, then propose a test that settles the question with data. Record one and review it.", milestone: "Recorded skeptical-customer role-play" },
          { id: "m14", text: "Take an over-scoped executive request and write a phased plan that declines part of it for now, stating what ships in each phase, what is deferred and why.", milestone: "Phased scope proposal" },
          { id: "m15", text: "Record a ten-minute demo for an executive audience that states the business outcome in the first two minutes before showing any architecture or code, and get feedback from someone non-technical.", milestone: "Executive demo recording with feedback" }
        ],
        resources: ["Never Split the Difference", "The Trusted Advisor", "Crucial Conversations"]
      },
      {
        week: "Weeks 11 - 12",
        title: "Pillar 6: Target-company preparation and full mocks",
        focus: "Loop simulation",
        summary: "Pick the two or three companies you are targeting, learn their loop format from public candidate reports, and rehearse it end to end.",
        tasks: [
          { id: "m16", text: "For decomposition-heavy loops: complete three timed decompositions and two coding rounds weighted toward graphs (BFS/DFS), heaps and basic concurrency, and log the feedback from each.", milestone: "Decomposition-loop mock log" },
          { id: "m17", text: "For data-platform loops: prepare a 20-minute warehouse-to-lakehouse migration proposal and pair it with a live session debugging a slow or failing Spark job.", milestone: "Migration pitch and Spark debugging session" },
          { id: "m18", text: "For applied AI loops: in three hours, build a working AI demo using only the raw API documentation, then present what you would harden before a customer used it.", milestone: "Three-hour AI build with hardening list" }
        ],
        resources: ["System Design Interview – An Insider's Guide", "Public candidate reports on FDE interview loops", "Self-scoring mock interviews"]
      }
    ]
  },

  senior: {
    id: "senior",
    title: "Senior SWE / Solutions Architect (5 - 9 YOE)",
    experience: "5 - 9 Years",
    tagline: "Lead a customer deployment from the first architecture review through go-live and handover",
    overview: "For senior engineers, solutions architects and technical consultants with five or more years of experience. The bar moves from building components to owning the deployment: designing for restricted and regulated environments, getting through the customer's security review, planning for failure and recovery, and leading other engineers in the field. Interviewers commonly probe how you made tradeoffs under real constraints, not just what you built.",
    keyStrengthsToProve: [
      "Architecting for restricted environments: disconnected networks, customer-managed keys and disaster recovery",
      "Running the technical side of an account: security reviews, risk tracking and steady communication with customer leaders",
      "Turning one-off deployment work into reusable templates, tooling and product feedback",
      "Leading incidents in customer environments, including the communication during and after"
    ],
    targetInterviews: [
      "Senior forward deployed engineer roles at applied AI and data companies",
      "Senior Forward Deployed Software Engineer or Deployment Strategist (Palantir)",
      "Senior or specialist solutions architect roles at data-platform companies",
      "Enterprise solutions architect roles at LLM platform vendors",
      "Technical lead roles on professional services or customer engineering teams"
    ],
    weeks: [
      {
        week: "Weeks 1 - 3",
        title: "Pillar 1: Air-gapped, sovereign and high-assurance deployments",
        focus: "Restricted infrastructure",
        summary: "Some customers run fully disconnected or tightly controlled networks: government enclaves, sovereign clouds and bank DMZs. Design software delivery and key management that work without internet access.",
        tasks: [
          { id: "s1", text: "Design and prototype an offline delivery pipeline: build and sign artifacts outside (for example with Sigstore cosign), transfer a bundle, then verify signatures and load images into a private registry with local package mirrors on the inside. Document the update and rollback procedure.", milestone: "Air-gap delivery runbook and prototype" },
          { id: "s2", text: "Design key management for a customer-managed-key requirement: envelope encryption backed by a cloud KMS or on-premises HSM, key rotation, what happens when the customer revokes a key, and what an auditor would check. Implement envelope encryption for one data path.", milestone: "CMEK design doc with envelope-encryption demo" },
          { id: "s3", text: "Write a disaster recovery design for a stateful service with explicit RPO and RTO targets, comparing active-passive and active-active options, the replication method for each data store, and the cost and consistency tradeoffs; run one failover drill in a test environment.", milestone: "DR design with failover drill results" }
        ],
        resources: ["NIST SP 800-53", "Air-gapped Kubernetes installs and private registries", "FedRAMP authorization and DoD impact levels"]
      },
      {
        week: "Weeks 4 - 6",
        title: "Pillar 2: Enterprise domain modeling and decomposition",
        focus: "Domain modeling at scale",
        summary: "Large customers keep the same concept in many systems with different IDs and definitions. Model the domain, reconcile identities and make the engagement's risks visible.",
        tasks: [
          { id: "s4", text: "Design a shared object model (an ontology layer) over at least three source systems such as an ERP, a CRM and an event stream: define core objects and links, which system owns each field, and how updates propagate. Present it as a diagram plus a one-page rationale.", milestone: "Cross-system object model with rationale" },
          { id: "s5", text: "Build an entity-resolution prototype on a public dataset using blocking, pairwise scoring (Fellegi-Sunter or a trained classifier) and graph-based clustering; report precision and recall, and explain how blocking keeps comparisons tractable at 100M+ records.", milestone: "Entity-resolution prototype with accuracy report" },
          { id: "s6", text: "Write a risk register for a hypothetical six-month pilot covering technical, data, security and organizational risks, each with likelihood, impact, owner, mitigation and the date by which it must be resolved.", milestone: "Pilot risk register" }
        ],
        resources: ["Domain-Driven Design", "Data Matching (Peter Christen)", "Ontology and knowledge graph modeling"]
      },
      {
        week: "Weeks 7 - 9",
        title: "Pillar 3: Enterprise AI architecture, guardrails and cost",
        focus: "AI architecture decisions",
        summary: "Senior FDEs are often asked whether to use retrieval, fine-tuning or a different model, and how to keep sensitive data inside the customer's boundary. Back those answers with numbers and working controls.",
        tasks: [
          { id: "s7", text: "Build a cost model comparing a hosted model API with self-hosting an open-weights model (for example on vLLM): include GPU cost and utilization, throughput, engineering and on-call time, and the request volume at which the cheaper option flips.", milestone: "API vs. self-hosted cost model" },
          { id: "s8", text: "Prototype a gateway in front of an LLM that detects and redacts PII using pattern rules plus an NER model, logs its decisions for audit and flags likely prompt-injection attempts; measure the latency it adds at p50 and p95.", milestone: "PII-redaction gateway with latency measurements" },
          { id: "s9", text: "Design a pipeline that produces synthetic or de-identified data for model testing when real records cannot leave the customer's environment, and define how you will check that it is useful (task metrics) and safe (re-identification risk).", milestone: "Synthetic-data design with utility and privacy checks" }
        ],
        resources: ["vLLM documentation", "OWASP Top 10 for LLM Applications", "Differential privacy and synthetic data"]
      },
      {
        week: "Weeks 10 - 12",
        title: "Pillar 4: Executive communication and the senior interview loop",
        focus: "Senior system design and leadership",
        summary: "Senior loops combine large system designs with scenarios about leading through a crisis and influencing the product. Practice all three and keep written artifacts you can reuse.",
        tasks: [
          { id: "s10", text: "Complete four timed system designs and write up each with requirements, architecture, data model, failure modes and cost: real-time payment fraud detection, federated model training across hospitals, global vehicle telemetry, and a multi-tenant document-processing service.", milestone: "Four written system designs" },
          { id: "s11", text: "Role-play a customer executive meeting after a pilot corrupted data the night before a planned announcement: prepare your first five minutes, the facts you will and won't state yet, the remediation plan and the written follow-up.", milestone: "Incident briefing script and follow-up email" },
          { id: "s12", text: "Write a two-page memo on how you turn repeated customer deployment work into shared templates and product features, built around one concrete example from your own experience.", milestone: "Field-to-product memo" }
        ],
        resources: ["High Output Management", "The Pyramid Principle", "Incident communication and blameless postmortems"]
      }
    ]
  },

  staff: {
    id: "staff",
    title: "Staff / Principal / Field CTO (10+ YOE)",
    experience: "10+ Years",
    tagline: "Set technical direction across accounts and turn what the field learns into product",
    overview: "For principal engineers, field CTOs, former founders and long-tenured architects. The work is less about any single deployment and more about leverage: deciding which customer problems become platform capabilities, guiding customer executives through large modernization programs, and building the team and practices that let other engineers deploy well. Interviews at this level commonly include a vision presentation, an architecture defense and conversations about organizational design.",
    keyStrengthsToProve: [
      "Connecting company strategy to multi-year customer transformation programs",
      "Deciding, with evidence, which field patterns become reusable platform capabilities",
      "Advising senior customer technology leaders on modernization and its tradeoffs",
      "Building and developing a forward deployed team: hiring, leveling and sustainable on-site work"
    ],
    targetInterviews: [
      "Principal or staff forward deployed engineer roles",
      "Field CTO or office-of-the-CTO roles at data and AI platform companies",
      "Head or director of forward deployed engineering at growth-stage AI companies",
      "Principal solutions architect or enterprise architect roles at cloud and data vendors",
      "Founding forward deployed or customer engineering lead at an early-stage startup"
    ],
    weeks: [
      {
        week: "Weeks 1 - 4",
        title: "Pillar 1: Modernization strategy and the field-to-product loop",
        focus: "Platform and organizational leverage",
        summary: "Design work that solves one customer's problem and then, deliberately, makes the next deployment cheaper.",
        tasks: [
          { id: "st1", text: "Write a decision framework for promoting customer-specific code into the core platform: the signals (number of customers, maintenance cost, strategic fit), the evidence required, an owner and the review process. Apply it to three real or hypothetical examples.", milestone: "Field-to-product decision framework" },
          { id: "st2", text: "Design tenant isolation for a SaaS product whose customers compete in the same industry: compare pooled, bridged and siloed models for compute, storage, encryption keys and logs, and state which model you would offer at each pricing tier.", milestone: "Tenant-isolation design with tier mapping" },
          { id: "st3", text: "Write a reference architecture for moving a mainframe or Oracle system to cloud-native streaming using change data capture, including the coexistence period, data reconciliation, cutover criteria and rollback plan.", milestone: "Legacy-to-streaming reference architecture" }
        ],
        resources: ["Enterprise Architecture as Strategy", "Platform Engineering (Camille Fournier and Ian Nottingham)", "Change data capture and strangler fig migrations"]
      },
      {
        week: "Weeks 5 - 8",
        title: "Pillar 2: AI strategy, data sovereignty and regulation",
        focus: "Governance and business cases",
        summary: "Large customers expect you to connect AI architecture to regulation, data residency and cost. Produce artifacts their legal, security and finance teams would take seriously.",
        tasks: [
          { id: "st4", text: "Build a compliance matrix for deploying one AI product in the EU, US healthcare and China: map GDPR, the EU AI Act's risk categories, HIPAA and China's PIPL cross-border transfer rules to concrete architecture decisions (data location, logging, model hosting, human oversight), and mark where legal review is needed.", milestone: "Multi-region compliance matrix" },
          { id: "st5", text: "Write a blueprint for a customer's internal AI enablement team: shared platform components, an intake and review process for new use cases, evaluation and risk standards, and a 12-month staffing plan.", milestone: "AI enablement team blueprint" },
          { id: "st6", text: "Build a business-case model for a multi-year platform engagement: baseline cost, measurable savings or revenue impact, implementation cost, payback period, and the three assumptions that most affect the result.", milestone: "Engagement business-case model" }
        ],
        resources: ["EU AI Act risk classification", "Data residency and sovereignty architecture", "NIST AI Risk Management Framework"]
      },
      {
        week: "Weeks 9 - 12",
        title: "Pillar 3: Principal-level interviews",
        focus: "Vision, leadership and architecture defense",
        summary: "Principal loops typically include a presentation of your point of view, a conversation with an engineering or field leader about building teams, and a hard challenge to one of your designs.",
        tasks: [
          { id: "st7", text: "Prepare a 30 to 45-minute talk on where forward deployed engineering is heading in your domain over the next few years, with a clear thesis, evidence from your own work and two predictions you might be wrong about; deliver it to a practice audience.", milestone: "Recorded vision talk" },
          { id: "st8", text: "Write a short plan for growing an FDE team from five to twenty-five engineers: hiring profile, leveling criteria, rotation and travel policy to prevent burnout, and how field feedback reaches product. Use it in a mock interview with an engineering leader.", milestone: "FDE team-building plan" },
          { id: "st9", text: "Present one end-to-end architecture you own to two or three senior engineers asked to find its weakest points; record their objections, your answers and the changes you would make.", milestone: "Architecture review with objection log" }
        ],
        resources: ["Staff Engineer: Leadership beyond the management track", "The Staff Engineer's Path", "The Manager's Path"]
      }
    ]
  },

  transitioner: {
    id: "transitioner",
    title: "SWE / Solutions Architect / DevOps to FDE",
    experience: "Any Level",
    tagline: "Keep what your current role taught you and close the specific gaps forward deployed work exposes",
    overview: "For backend software engineers, solutions architects and sales engineers, and DevOps or SRE engineers moving into forward deployed engineering. Each background arrives with different gaps: SWEs usually need more customer-facing practice, SAs and SEs usually need to rebuild hands-on coding speed, and DevOps and SRE engineers usually need more application and product work. Weeks 1 to 3 help you find your gap; later blocks note which background each one matters most for.",
    keyStrengthsToProve: [
      "SWE to FDE: running discovery with customers, explaining tradeoffs plainly and owning outcomes beyond the codebase",
      "SA/SE to FDE: writing and debugging real code live, not only designing or demoing it",
      "DevOps/SRE to FDE: building user-facing features and business logic on top of the infrastructure you already know",
      "For everyone: staying effective when requirements, environments and stakeholders change mid-engagement"
    ],
    targetInterviews: [
      "Forward deployed engineer roles at applied AI startups",
      "Forward Deployed Software Engineer (Palantir)",
      "Solutions architect / field engineering roles at data-platform companies",
      "Customer or deployment engineering roles at LLM platform vendors",
      "Implementation engineering roles at enterprise SaaS companies"
    ],
    weeks: [
      {
        week: "Weeks 1 - 3",
        title: "Pillar 1: From tickets to outcomes",
        focus: "Role understanding and self-assessment",
        summary: "An FDE is judged by whether the customer's problem gets solved, not by tickets closed. Learn what the role involves day to day, find your gap and reposition your experience.",
        tasks: [
          { id: "t1", text: "Read public write-ups and job descriptions for at least five FDE-style roles and summarize on one page what the work involves day to day, how it differs from your current role, and which parts you have already done.", milestone: "One-page role comparison" },
          { id: "t2", text: "Take the diagnostic on this site (or score yourself on software velocity, data and AI, enterprise security and infrastructure, decomposition, and customer communication), pick your two weakest areas, and write a study plan that weights the later blocks for your background.", milestone: "Gap assessment and study plan" },
          { id: "t3", text: "Rewrite your resume so each bullet states a problem, what you built or changed, and a measurable result for a user or customer; ask someone outside your field to read it and tell you what you do.", milestone: "Outcome-focused resume" }
        ],
        resources: ["What forward deployed engineers do day to day", "Writing impact-focused resume bullets", "FDE vs. solutions architect vs. sales engineer roles"]
      },
      {
        week: "Weeks 4 - 6",
        title: "Pillar 2: Coding and prototyping speed",
        focus: "Hands-on coding (most important for SA/SE backgrounds)",
        summary: "If your recent work has been design, demos or infrastructure, rebuild the habit of writing and debugging code quickly while someone watches. SWEs can move through this block faster.",
        tasks: [
          { id: "t4", text: "Solve 50 medium problems on trees, graphs, hash maps and string parsing, timed at 30 minutes each; track the patterns you miss and redo those problems a week later.", milestone: "50-problem log with pattern review" },
          { id: "t5", text: "Build three small full-stack apps, each in a weekend: a live log viewer that streams over WebSockets, a SQL query runner that renders results as a chart, and a document Q&A tool. DevOps/SRE engineers should spend most of their effort on the UI and API layers.", milestone: "Three-app prototype portfolio" },
          { id: "t6", text: "Record yourself solving three problems while explaining your reasoning out loud, then review the recordings for long silences, unexplained jumps and missed edge cases.", milestone: "Recorded think-aloud sessions" }
        ],
        resources: ["Elements of Programming Interviews", "Vite and FastAPI project setup", "Thinking aloud in coding interviews"]
      },
      {
        week: "Weeks 7 - 9",
        title: "Pillar 3: Decomposition and system design",
        focus: "Problem structuring (most important for SWE and DevOps/SRE backgrounds)",
        summary: "SAs often have a head start here. Everyone should practice turning a vague customer problem into a data model, an architecture and a plan in under an hour.",
        tasks: [
          { id: "t7", text: "Write your own decomposition checklist (scope and users, data model and entities, architecture and ingestion, security and failure modes) and test it on one practice prompt.", milestone: "Personal decomposition checklist" },
          { id: "t8", text: "Run six timed decompositions across different domains (for example hospital logistics, city traffic signals, aerial imagery triage, anti-money-laundering alerts) and score each one against your checklist.", milestone: "Six scored decomposition sessions" },
          { id: "t9", text: "Redraw two of your designs so a non-engineer can follow them: one box-and-arrow diagram each with plain labels and a three-sentence explanation underneath. Test them on someone outside engineering.", milestone: "Two audience-tested architecture diagrams" }
        ],
        resources: ["The System Design Primer", "Designing Data-Intensive Applications", "C4 model for architecture diagrams"]
      },
      {
        week: "Weeks 10 - 12",
        title: "Pillar 4: Behavioral stories and live loops",
        focus: "Customer-facing evidence and applications",
        summary: "Turn experience from your current role into evidence that you can work directly with customers, then start applying.",
        tasks: [
          { id: "t10", text: "Write five STAR stories from past work that show an ambiguous problem, a difficult stakeholder and a fast delivery, each with one line on how it maps to customer-facing work. SWEs and DevOps/SRE engineers should include at least one story involving an external customer or partner.", milestone: "Five-story behavioral bank" },
          { id: "t11", text: "Complete three mock interviews with practicing FDEs or mentors covering coding, decomposition and a customer role-play, and write down one change you will make after each.", milestone: "Three mock rounds with action items" },
          { id: "t12", text: "Shortlist 15 target roles, ask for referrals where you have a connection, and send applications with a short note tailored to each company's customers and products; track responses in a spreadsheet.", milestone: "Application tracker with tailored notes" }
        ],
        resources: ["STAR method for behavioral interviews", "Asking for job referrals", "Fearless Salary Negotiation"]
      }
    ]
  }
};
