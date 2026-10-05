export const companyPlaybooks = [
  {
    id: "palantir",
    name: "Palantir Technologies",
    roleName: "Forward Deployed Software Engineer (FDSE)",
    logoBadge: "PLTR",
    accentColor: "#6366F1",
    tagline: "The pioneer of Forward Deployed Engineering — where code meets geopolitical and enterprise reality.",
    overview: "Palantir created the modern FDE role. At Palantir, FDSEs deploy directly onto client sites (DoD, NHS, Airbus, Morgan Stanley) to transform chaotic, siloed data into real-time operational decisions using Foundry, Gotham, and AIP. You are expected to be an elite software engineer who can architect distributed systems in the morning and lead C-suite strategy in the afternoon.",
    compensationTier: "$180,000 - $350,000+ (Base + Equity + Relocation/Per-Diem)",
    products: ["Palantir Foundry (Data Integration & Ontology)", "Palantir Gotham (Defense & Intelligence)", "Palantir Apollo (Autonomous Continuous Deployment)", "Palantir AIP (Artificial Intelligence Platform)"],
    interviewStages: [
      {
        stage: "Stage 1: Recruiter & Alignment Screen (30m)",
        details: "Assess motivation for the high-travel, high-intensity FDE culture. Expect questions on why you want forward-deployed rather than internal product SWE, and your perspective on working with defense, government, and commercial sectors."
      },
      {
        stage: "Stage 2: Technical Phone Screen (45-60m)",
        details: "Live algorithmic coding or systems design. Typical questions involve graph traversal (BFS/DFS), priority queues, string parsing, or writing a lightweight concurrent task queue in your language of choice."
      },
      {
        stage: "Stage 3: The Legendary 'Decomp' Round (60m)",
        details: "The signature Palantir interview! You are presented with a massive, ambiguous real-world prompt (e.g., 'A commercial airline needs to handle severe weather disruptions and rebook 40,000 passengers while balancing crew fatigue rules'). You must decompose this into entities, data pipelines, schema models, API contracts, and user workflows on a whiteboard without being guided."
      },
      {
        stage: "Stage 4: Systems Design & Distributed Architecture (60m)",
        details: "Design a high-scale ingestion, streaming, or analytical engine. Focus areas: Air-gapped deployments, VPC isolation, zero-trust security, eventual consistency vs strict ACID, and handling multi-tenant data pipelines."
      },
      {
        stage: "Stage 5: Live Coding & Implementation (60m)",
        details: "Hands-on coding focused on clean object-oriented or functional patterns, robust error handling, concurrency, and writing maintainable code under time pressure."
      },
      {
        stage: "Stage 6: Culture, Ethics & Leadership Fit (45m)",
        details: "Led by a Senior Deployment Strategist or Engineering Director. Tests resilience, handling hostile client pushback, moral/ethical clarity, and intellectual curiosity."
      }
    ],
    decompPlaybook: {
      formula: [
        "Phase 1: Clarify & Bound Scope (5m) — Ask 3-4 pointed questions on latency tolerance, operational constraints, and human-in-the-loop requirements.",
        "Phase 2: Entity & Ontology Modeling (15m) — Define core real-world objects, their properties, relationships, and state transitions (e.g. Flight, Passenger, Seat, CrewMember, AircraftMaintenance).",
        "Phase 3: Data Ingestion & Transformation Architecture (15m) — Design how legacy mainframe / ERP data gets ingested, sanitized, deduplicated, and unified into an operational data layer.",
        "Phase 4: Operational Workflow & UI/API Contracts (15m) — How does an airline dispatcher or field operator interact with the system to make decisions?",
        "Phase 5: Failure Modes, Scalability & Tradeoffs (10m) — What happens when an airport loses power? How do you resolve concurrent rebooking race conditions?"
      ],
      goldenRules: [
        "Never jump into database schemas or ML models in the first 5 minutes.",
        "Focus on the OPERATOR'S workflow: Who is using this software, and what decision are they making?",
        "Acknowledge edge cases early (e.g. regulatory crew flight time caps, missing baggage)."
      ]
    },
    redFlags: [
      "Asking the interviewer for the requirements instead of proposing assumptions and validating them.",
      "Over-complicating with buzzwords (e.g. 'We'll just train a neural net') when simple business rules or graph search solve the problem.",
      "Becoming defensive when the interviewer introduces a sudden constraint (e.g., 'What if the customer only has an air-gapped on-prem datacenter?')."
    ],
    sampleQuestions: [
      {
        q: "Decomp: Design a vaccine distribution and tracking system across 5,000 disparate clinics with cold-chain refrigeration constraints.",
        tip: "Model ColdStorageUnit, BatchVaccine, PatientAppointment, and TransportRoute. Emphasize spoilage alerts and offline sync."
      },
      {
        q: "System Design: How would you architect Palantir Apollo to deploy software across 500 disconnected air-gapped customer environments?",
        tip: "Discuss cryptographically signed release manifests, peer-to-peer artifact distribution, automated rollback triggers, and local audit logging."
      }
    ]
  },

  {
    id: "databricks",
    name: "Databricks",
    roleName: "Solutions Architect / Field Engineer / Forward Deployed",
    logoBadge: "DBRX",
    accentColor: "#EF4444",
    tagline: "Unifying Data, Analytics, and AI on the Lakehouse for Fortune 500 transformation.",
    overview: "Databricks Field Engineers and Solutions Architects are technical powerhouses who architect the Lakehouse for the world's most demanding enterprises. You work alongside enterprise CDOs and lead data teams to migrate from legacy warehouses (Snowflake, Teradata, Oracle) to Delta Lake, scale Apache Spark clusters, and deploy enterprise AI with Mosaic AI and Unity Catalog.",
    compensationTier: "$190,000 - $370,000+ (Base + Equity + Target Commission)",
    products: ["Delta Lake & Lakehouse Architecture", "Apache Spark Engine & Photon", "Databricks Mosaic AI & Model Serving", "Unity Catalog (Unified Governance)"],
    interviewStages: [
      {
        stage: "Stage 1: Recruiter & Technical Baseline (30m)",
        details: "Deep dive into your experience with distributed computing, cloud providers (AWS/Azure/GCP), customer-facing engineering, and big data ecosystems."
      },
      {
        stage: "Stage 2: Technical Screen — Spark & Data Manipulation (60m)",
        details: "Live coding in Python/PySpark or SQL. Focuses on data wrangling, data transformations, window functions, and diagnosing suboptimal query plans."
      },
      {
        stage: "Stage 3: Spark Internals & Distributed Systems Deep Dive (60m)",
        details: "Hardcore distributed systems round: Catalyst optimizer, Tungsten execution engine, DAG scheduling, shuffle operations, partition skew, broadcast joins, and JVM memory tuning."
      },
      {
        stage: "Stage 4: Lakehouse System Design & Migration Architecture (60m)",
        details: "Architect an enterprise migration from on-prem Hadoop or legacy data warehouses to Databricks Lakehouse. Designing Bronze/Silver/Gold medallion pipelines, streaming ingestion with Auto Loader, and data governance with Unity Catalog."
      },
      {
        stage: "Stage 5: Customer Technical Presentation & Whiteboard Demo (60m)",
        details: "You are given a scenario 48 hours prior (e.g., 'Present Lakehouse architecture to a skeptical VP of Analytics who prefers staying on Snowflake'). Judged on technical depth, handling executive pushback, and storytelling."
      },
      {
        stage: "Stage 6: Executive & Culture Alignment (45m)",
        details: "Leadership principles: Customer Obsession, High Standards, Truth Seeking, and Bias for Action."
      }
    ],
    decompPlaybook: {
      formula: [
        "Step 1: Ingestion & Medallion Design — Bronze (raw streaming/batch append-only), Silver (cleansed, deduplicated, enriched), Gold (business-level aggregates).",
        "Step 2: Engine & File Sizing Optimization — Photon vectorized execution, Delta compaction (OPTIMIZE, Z-ORDER by high cardinality filter keys).",
        "Step 3: Governance & Security — Unity Catalog fine-grained access control, lineage tracking, and data sharing without copying (Delta Sharing).",
        "Step 4: AI & ML Integration — Feature Store, MLflow tracking, and fine-tuning with Databricks Mosaic AI."
      ],
      goldenRules: [
        "Always calculate data volume, velocity, and compute cost before proposing cluster sizes.",
        "Demonstrate mastery of Spark shuffle bottlenecks — this is the #1 filter in Databricks technical rounds.",
        "Frame every technical decision in terms of business cost savings and developer velocity."
      ]
    },
    redFlags: [
      "Treating Spark like a black box without understanding driver vs worker nodes or shuffle exchanges.",
      "Proposing massive compute clusters without addressing data skew or file compaction first.",
      "Getting defensive during the presentation round when mock clients throw aggressive curveballs."
    ],
    sampleQuestions: [
      {
        q: "A PySpark job processing 10TB of telemetry data runs for 6 hours and suddenly fails with 'ExecutorLostFailure (exit code 137: OOM)'. How do you diagnose and fix this?",
        tip: "Check Spark UI for data skew on join/groupBy keys, check for large broadcasts exceeding driver/executor memory, adjust spark.sql.shuffle.partitions, or apply salting."
      },
      {
        q: "How would you design a real-time CDC (Change Data Capture) pipeline from 50 production MySQL databases into a Delta Lakehouse with sub-minute latency?",
        tip: "Debezium / Kafka Connect -> Kafka -> Databricks Structured Streaming with Auto Loader & Delta Live Tables (DLT) using MERGE INTO."
      }
    ]
  },

  {
    id: "scale_ai",
    name: "Scale AI",
    roleName: "Forward Deployed Engineer (FDE) / Applied AI Deployment",
    logoBadge: "SCALE",
    accentColor: "#EC4899",
    tagline: "Accelerating the development of AI applications — where rapid prototyping meets enterprise foundation models.",
    overview: "Scale AI is the data infrastructure engine behind OpenAI, Meta, Toyota, and the US Department of Defense. Scale FDEs operate at breakneck startup speed, building customized AI applications, RLHF workflows, and generative AI platforms (Scale Donovan, Enterprise GenAI Platform) directly embedded with defense and Fortune 500 customers.",
    compensationTier: "$180,000 - $340,000+ (Competitive Base + High-Upside Equity)",
    products: ["Scale Data Engine (RLHF & Annotation)", "Scale Donovan (AI Decision Platform for Defense)", "Scale GenAI Platform (Enterprise Model Customization)", "Scale Rapid (On-Demand Data Labeling)"],
    interviewStages: [
      {
        stage: "Stage 1: Recruiter Screen & Speed Check (30m)",
        details: "Assess full-stack versatility, experience with LLMs/APIs, and appetite for high-intensity, fast-shipping environment."
      },
      {
        stage: "Stage 2: Live Hack / Rapid Prototyping Screen (60-90m)",
        details: "Build a working prototype from scratch against a live API under time pressure. Testing speed, clean architecture, and UI responsiveness."
      },
      {
        stage: "Stage 3: Full-Stack & Systems Architecture (60m)",
        details: "Design a high-throughput data labeling orchestration system or real-time model inference gateway. Handling worker queue scheduling, consensus scoring, and latency budgets."
      },
      {
        stage: "Stage 4: Applied AI & Foundation Model Engineering (60m)",
        details: "Evaluating model quality: RLHF pipelines, fine-tuning vs prompt caching, RAG retrieval quality, synthetic data generation, and guardrail enforcement."
      },
      {
        stage: "Stage 5: Client Scenario & Product Execution (60m)",
        details: "Handling an enterprise customer whose pilot model is failing quality SLAs 72 hours before contract renewal. Strategy, de-escalation, and technical remediation."
      },
      {
        stage: "Stage 6: Founder / Leadership Chat (30-45m)",
        details: "Deep dive into intellectual horsepower, extreme ownership, and grit."
      }
    ],
    decompPlaybook: {
      formula: [
        "Step 1: Rapid MVP Framing — What can we build in 48 hours to prove immediate value to the customer?",
        "Step 2: Data Pipeline & Annotation Loop — Ingestion -> Pre-labeling with foundation models -> Human-in-the-loop review -> Active learning selection.",
        "Step 3: Evaluation & Quality Metrics — Inter-annotator agreement, precision/recall on edge cases, automated model regression tests.",
        "Step 4: Deployment & API Hardening — Webhook notifications, rate limiting, and private VPC deployment."
      ],
      goldenRules: [
        "Shipping a working 80% solution in 2 hours beats designing a 100% solution that never runs.",
        "Always instrument observability and error logging right from the prototype stage.",
        "Treat client data security with military-grade rigor."
      ]
    },
    redFlags: [
      "Spending 45 minutes configuring webpack or CSS boilerplate instead of shipping a functioning product.",
      "Lacking understanding of LLM fundamentals (tokens, context length, temperature, top-p, embeddings).",
      "Showing hesitation or paralysis when given ambiguous, incomplete specifications."
    ],
    sampleQuestions: [
      {
        q: "Build an interactive prototype that ingests satellite imagery, allows analysts to draw bounding boxes around military vehicles, and submits them to an async model inference pipeline.",
        tip: "Focus on snappy UI state management, optimistic UI updates, handling network retries, and clean API separation."
      },
      {
        q: "Design an active learning pipeline that selects only the most informative 2% of unlabelled data from a 100M document corpus to minimize human annotation costs.",
        tip: "Discuss uncertainty sampling, entropy scoring, diversity clustering in vector space, and model confidence thresholds."
      }
    ]
  },

  {
    id: "openai_anthropic",
    name: "OpenAI & Anthropic",
    roleName: "Applied AI Engineer / Forward Deployed Solutions Lead",
    logoBadge: "AI LABS",
    accentColor: "#10B981",
    tagline: "Deploying frontier intelligence into global enterprise systems safely and reliably.",
    overview: "Applied AI Engineers and Solutions Architects at OpenAI and Anthropic are at the absolute bleeding edge of technology. They help the world's most strategic enterprises (Apple, Morgan Stanley, Salesforce, healthcare systems) build mission-critical autonomous agents, multi-modal workflows, and secure generative platforms on GPT-4o and Claude 3.5 Sonnet.",
    compensationTier: "$250,000 - $550,000+ (High Base + Liquid/Private Tech Equity)",
    products: ["OpenAI Enterprise / Assistants API", "Anthropic Claude 3.5 Sonnet & Model Context Protocol (MCP)", "Function Calling & Tool Orchestration", "Enterprise Fine-Tuning & Custom Models"],
    interviewStages: [
      {
        stage: "Stage 1: Recruiter & Applied AI Background Screen (30m)",
        details: "Assess experience deploying production LLM systems, engineering rigor, and ability to translate cutting-edge AI capabilities into business ROI."
      },
      {
        stage: "Stage 2: Live Agentic / Tool-Calling Coding Round (60m)",
        details: "Implement an agentic tool-use loop: handling JSON schema validation, parallel tool execution, recursive state management, and graceful recovery from model hallucinated tool inputs."
      },
      {
        stage: "Stage 3: LLM System Design & Enterprise Architecture (60m)",
        details: "Design a high-throughput, fault-tolerant enterprise AI platform: Prompt caching strategies, token budget rate-limiting, semantic caching, vector search with hybrid reranking, and sub-second streaming responses."
      },
      {
        stage: "Stage 4: Evaluation, Safety & Guardrail Architecture (60m)",
        details: "Deep dive into model reliability: Building automated eval benchmarks, LLM-as-a-judge calibration, preventing prompt injection/jailbreaks, and red-teaming enterprise deployments."
      },
      {
        stage: "Stage 5: Enterprise Solutions Deep Dive & C-Suite Pitch (60m)",
        details: "Consulting with an enterprise CIO on whether to use RAG, Fine-Tuning, or Agentic workflows for their core business process while ensuring zero customer data retention."
      },
      {
        stage: "Stage 6: Culture, AI Safety & Mission Alignment (45m)",
        details: "Evaluating candidates on alignment with ethical AI deployment, humbleness, and high collaborative standards."
      }
    ],
    decompPlaybook: {
      formula: [
        "Step 1: Problem Classification — Is this a RAG problem, an Agentic workflow problem, a Fine-Tuning problem, or a simple Deterministic code problem?",
        "Step 2: Architecture & Latency Budget — TTFT (Time to First Token), streaming architecture via Server-Sent Events (SSE), and token economics.",
        "Step 3: Tool & Context Management — Model Context Protocol (MCP), structured outputs via function schemas, and context window pruning.",
        "Step 4: Continuous Evaluation Pipeline — Establishing ground-truth evaluation suites (Golden Datasets) before writing a single production prompt."
      ],
      goldenRules: [
        "Never propose fine-tuning when in-context few-shot prompting and retrieval achieves the same result for 1/10th the cost.",
        "Always enforce structured outputs (Pydantic / JSON schema) when passing model outputs to downstream APIs.",
        "Safety and PII redaction must be architected at the network layer, not left to model discretion."
      ]
    },
    redFlags: [
      "Believing that LLMs are magical and not having concrete strategies for handling hallucinations.",
      "No understanding of token economics, rate limits (TPM/RPM), or prompt caching mechanics.",
      "Treating evaluations as an afterthought rather than the foundation of reliable AI deployment."
    ],
    sampleQuestions: [
      {
        q: "Design an enterprise customer support agent that can autonomously execute account refunds up to $500, check order statuses in real-time, and transfer to human agents with full conversation summaries.",
        tip: "Discuss state machines (LangGraph), deterministic authorization gates, idempotency keys for financial transactions, and human-in-the-loop fallback."
      },
      {
        q: "How would you design a systematic evaluation framework to detect regressions when switching from GPT-4o to Claude 3.5 Sonnet across 50 enterprise use cases?",
        tip: "Define automated test harnesses, semantic similarity metrics, LLM-as-a-judge with reference answers, latency/cost benchmarking, and blind A/B testing."
      }
    ]
  },

  {
    id: "snowflake",
    name: "Snowflake",
    roleName: "Field Technical Architect / Forward Deployed Solutions Engineer",
    logoBadge: "SNOW",
    accentColor: "#38BDF8",
    tagline: "Mobilizing the world's data on the AI Data Cloud with zero-management simplicity.",
    overview: "Snowflake Field Technical Architects are the strategic technical drivers behind global enterprise migrations. You help Fortune 500 customers architect modern cloud data warehouses, build data sharing applications via the Snowflake Marketplace, deploy Python pipelines using Snowpark, and leverage Snowflake Cortex AI without managing infrastructure.",
    compensationTier: "$185,000 - $360,000+ (Base + Equity + Field Incentive)",
    products: ["Snowflake Data Cloud & Virtual Warehouses", "Snowpark & Streamlit", "Snowflake Cortex AI & Vector Search", "Apache Iceberg Tables & Universal Storage"],
    interviewStages: [
      {
        stage: "Stage 1: Recruiter & Technical Qualification (30m)",
        details: "Assessing enterprise cloud architecture experience, SQL expertise, and customer consultative aptitude."
      },
      {
        stage: "Stage 2: Technical Hands-on SQL & Query Optimization (60m)",
        details: "Solving complex analytical SQL, analyzing query profiles, understanding micro-partition pruning, clustering keys, and eliminating spills to local/remote storage."
      },
      {
        stage: "Stage 3: Snowflake Architecture & Cloud Internals (60m)",
        details: "Deep dive: Multi-cluster shared data architecture, Centralized Storage Layer, Multi-Cluster Compute Layer, and Cloud Services Layer. Zero-Copy Cloning, Time Travel, and Fail-safe."
      },
      {
        stage: "Stage 4: Enterprise Migration System Design (60m)",
        details: "Designing an end-to-end modernization from legacy on-prem (Teradata/Netezza/Oracle) to Snowflake. Ingestion patterns (Snowpipe Streaming), security governance (RBAC, Row Access Policies, Masking), and cost management."
      },
      {
        stage: "Stage 5: Customer Discovery & Business Value Defense (60m)",
        details: "Whiteboard presentation to an enterprise customer team comparing Snowflake with Databricks or BigQuery, defending credit consumption and total cost of ownership (TCO)."
      },
      {
        stage: "Stage 6: Field Leadership Alignment (45m)",
        details: "Customer advocacy, handling complex partner ecosystems, and culture fit."
      }
    ],
    decompPlaybook: {
      formula: [
        "Step 1: Compute & Storage Separation — Right-sizing virtual warehouses (XS to 4XL), auto-scaling policies, and auto-suspend timing to optimize credits.",
        "Step 2: Partitioning & Clustering Strategy — Understanding micro-partitions, evaluating clustering depth, and applying automatic clustering only when query profile warrants it.",
        "Step 3: Modern Ingestion & Snowpark — Continuous micro-batch ingestion via Snowpipe, serverless tasks, and running Python/DataFrame logic securely in Snowpark.",
        "Step 4: Enterprise Data Sharing & Marketplace — Sharing live data across cloud regions and accounts without data duplication or ETL overhead."
      ],
      goldenRules: [
        "Cost governance is job #1: Always implement resource monitors and auto-suspend rules in every architectural proposal.",
        "Understand when to use Snowpark DataFrames vs Native SQL for performance.",
        "Highlight Zero-Copy Cloning for instant development/staging environments without increasing storage costs."
      ]
    },
    redFlags: [
      "Assuming larger virtual warehouses automatically solve poorly written queries that lack partition pruning.",
      "Ignoring credit consumption governance and runaway query risks.",
      "Failing to explain how micro-partitions differ from traditional database B-trees or static table partitioning."
    ],
    sampleQuestions: [
      {
        q: "A high-priority business intelligence dashboard query in Snowflake takes 8 minutes to run and shows significant 'Bytes spilled to remote storage' in the Query Profile. How do you optimize it?",
        tip: "Spilling to remote storage indicates memory exhaustion on the warehouse. Scale up the warehouse size for more RAM, reduce data volume via early filtering, optimize join keys to avoid cross joins, or cluster on filter keys."
      },
      {
        q: "How would you design a secure multi-region data sharing architecture between a pharmaceutical company in AWS us-east-1 and an analytics partner in Azure West Europe?",
        tip: "Use Snowflake Cross-Cloud Cross-Region Replication to replicate the source database to Azure West Europe, and create a Secure Data Share without exposing underlying raw storage."
      }
    ]
  }
];
