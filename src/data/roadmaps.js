export const experienceLevels = {
  entry: {
    id: "entry",
    title: "Associate / Early Career FDE",
    experience: "0 - 2 Years",
    tagline: "Bridging CS fundamentals into rapid enterprise prototyping and client empathy",
    overview: "Ideal for new grads, junior software engineers, and bootcamp grads. At this level, enterprise tech firms (like Palantir & Databricks) evaluate whether you can learn an unfamiliar tech stack in 48 hours, write clean production code under time pressure, and communicate technical constraints clearly to non-engineers.",
    keyStrengthsToProve: [
      "Rapid full-stack prototyping (React/Vue + Python/Go/Java) without boilerplate paralysis",
      "Robust data wrangling & SQL fluency (handling messy, malformed real-world CSV/Parquet/JSON)",
      "System debugging in foreign environments (Linux CLI, Docker, networking basics, cURL, logs)",
      "High coachability and proactive client communication (listening before speaking)"
    ],
    targetInterviews: [
      "Palantir Associate FDE",
      "Scale AI Operations / Deployment Engineer",
      "Databricks Associate Solutions Engineer",
      "Enterprise SaaS Associate Forward Deployed"
    ],
    weeks: [
      {
        week: "Weeks 1 - 2",
        title: "Pillar 1: Full-Stack Velocity & The 48-Hour MVP Muscle",
        focus: "Software Engineering & Fast Shipping",
        summary: "Master building fully functional full-stack web applications from scratch without relying on heavy frameworks or templates.",
        tasks: [
          { id: "e1", text: "Build a single-page data explorer in Vanilla JS or React + FastAPI/Express with zero boilerplate in under 4 hours.", milestone: "Time-to-first-prototype test" },
          { id: "e2", text: "Master REST & gRPC API design: pagination, error handling, rate limiting, and idempotency keys.", milestone: "Production API standards" },
          { id: "e3", text: "Dockerize a multi-container app (Frontend + Backend + PostgreSQL) with healthchecks and compose configs.", milestone: "Containerization fluency" }
        ],
        resources: ["FastAPI Official Tutorials", "Docker Networking Deep Dive", "Building MVPs under Hackathon Constraints"]
      },
      {
        week: "Weeks 3 - 4",
        title: "Pillar 2: Data Wrangling, SQL & Messy Ingestion Pipelines",
        focus: "Real-World Data Pipelines",
        summary: "In the field, client data is NEVER clean. Learn to parse malformed JSON, reconcile schema mismatches, and run complex analytical SQL.",
        tasks: [
          { id: "e4", text: "Solve 25 advanced SQL challenges: window functions (ROW_NUMBER, LAG, LEAD), CTEs, and self-joins.", milestone: "LeetCode Database & Stratascratch" },
          { id: "e5", text: "Build a Python ingestion script using Pandas/Polars that cleans messy real-world datasets with missing values, timezone mismatches, and duplicate records.", milestone: "ETL sanitization pipeline" },
          { id: "e6", text: "Understand indexing (B-Tree, Hash), EXPLAIN ANALYZE query plans, and indexing strategies.", milestone: "Database optimization basics" }
        ],
        resources: ["Use The Index, Luke (SQL Indexing)", "Polars / Pandas Performance Cookbook", "PostgreSQL Execution Plans"]
      },
      {
        week: "Weeks 5 - 6",
        title: "Pillar 3: The 'Decomp' Round Fundamentals (Decomposition)",
        focus: "Problem Solving Without Specs",
        summary: "Palantir and enterprise AI leaders test candidates on ambiguous real-world problems. Learn the 4-phase Decomp framework.",
        tasks: [
          { id: "e7", text: "Master the 4-Step Decomp Framework: 1) Clarify Goals & Edge Cases, 2) Data Modeling & Entities, 3) Architecture & Ingestion, 4) Tradeoffs & Failure Modes.", milestone: "Decomp methodology mastery" },
          { id: "e8", text: "Practice 5 classic Decomp prompts: Port shipping logistics, Hospital bed allocation, Credit card fraud triage, Airline flight rebooking.", milestone: "End-to-end decomp mock" },
          { id: "e9", text: "Learn to ask diagnostic questions rather than jumping straight into database schemas.", milestone: "Consultative problem framing" }
        ],
        resources: ["Palantir Decomp Interview Breakdown", "System Design for Ambiguous Workflows", "Entity-Relationship Modeling Guide"]
      },
      {
        week: "Weeks 7 - 8",
        title: "Pillar 4: Production Linux, Networking & Troubleshooting",
        focus: "Infrastructure & Diagnostics",
        summary: "When you are on-site at a customer VPC, you won't have your comfortable IDE. Master the command line diagnostic toolkit.",
        tasks: [
          { id: "e10", text: "Master Linux diagnostics: top/htop, lsof, netstat/ss, strace, journalctl, curl -iv, dig/nslookup, and tcpdump basics.", milestone: "Server triage under pressure" },
          { id: "e11", text: "Understand TLS/SSL handshakes, reverse proxies (Nginx/Envoy), CORS issues, and WebSocket connections.", milestone: "Networking debugging" },
          { id: "e12", text: "Diagnose and resolve simulated container crashes: out-of-memory (OOMKilled), connection pool exhaustion, and DNS resolution failures.", milestone: "Live debugging lab" }
        ],
        resources: ["Linux Command Line & Performance Tools", "Brendan Gregg Systems Performance", "Debugging Network Latency at the CLI"]
      },
      {
        week: "Weeks 9 - 10",
        title: "Pillar 5: Enterprise AI & Modern Data Stack Foundations",
        focus: "Applied AI & Modern Lakehouse",
        summary: "Understand how modern FDEs integrate Foundation Models, Vector DBs, and Lakehouses into client enterprise workflows.",
        tasks: [
          { id: "e13", text: "Build an end-to-end RAG (Retrieval-Augmented Generation) application with document chunking, embeddings, vector indexing, and reranking.", milestone: "Applied LLM pipeline" },
          { id: "e14", text: "Understand Lakehouse architecture concepts: Parquet file format, ACID transactions (Delta Lake/Iceberg), and partitions.", milestone: "Lakehouse foundation" },
          { id: "e15", text: "Implement prompt evaluations, token usage tracking, and latency reduction caching techniques.", milestone: "AI production metrics" }
        ],
        resources: ["Building Production RAG Systems", "Delta Lake / Apache Iceberg Architecture", "OpenAI Cookbooks"]
      },
      {
        week: "Weeks 11 - 12",
        title: "Pillar 6: Mock Interview Gauntlet & Client Storytelling",
        focus: "Live Interview Execution",
        summary: "Execute end-to-end mock loops: live coding, system decomposition, and behavioral client management questions.",
        tasks: [
          { id: "e16", text: "Complete 10 timed 45-minute live coding sessions focusing on medium algorithm/data structure implementations and API plumbing.", milestone: "Live coding rhythm" },
          { id: "e17", text: "Draft 6 STAR behavioral stories: Handling an unexpected bug in a demo, working with a difficult peer, tight deadline compromise, and learning unfamiliar tech.", milestone: "Behavioral story bank" },
          { id: "e18", text: "Run a full 4-round mock interview loop with a peer or mentor simulating the target company.", milestone: "Full interview readiness" }
        ],
        resources: ["STAR Framework for FDEs", "Handling Technical Pushback", "Company Playbook Checklists"]
      }
    ]
  },

  mid: {
    id: "mid",
    title: "Mid-Level Software Engineer (2 - 5 YOE)",
    experience: "2 - 5 Years",
    tagline: "Transitioning from internal feature developer to mission-critical customer deployment architect",
    overview: "Tailored for software engineers who have built production services but want to transition into high-impact, high-visibility FDE roles. You must demonstrate that you can bridge robust distributed systems engineering with client discovery, product scoping, and architectural autonomy.",
    keyStrengthsToProve: [
      "Distributed systems & data engineering at scale (Spark, Kafka, distributed caching, partition strategies)",
      "Architectural trade-off justification: build vs buy, real-time vs batch, eventual vs strong consistency",
      "Executive client technical discovery (extracting true business requirements from vague executive requests)",
      "Rapid prototype-to-production hardening (instrumentation, observability, CI/CD, security guardrails)"
    ],
    targetInterviews: [
      "Palantir Forward Deployed Software Engineer (FDSE)",
      "Databricks Solutions Architect / Field Engineer",
      "Scale AI Forward Deployed Engineer",
      "OpenAI Applied AI Engineer / Solutions Engineer",
      "Snowflake Field Technical Architect"
    ],
    weeks: [
      {
        week: "Weeks 1 - 2",
        title: "Pillar 1: Distributed Data Engines & Lakehouse Internals",
        focus: "High-Volume Data Processing",
        summary: "Master distributed computing internals: Apache Spark, Delta Lake, query optimizers, and memory management.",
        tasks: [
          { id: "m1", text: "Deep dive into Spark internals: DAG scheduler, Catalyst optimizer, shuffle partitioning, skew joins, and broadcast joins.", milestone: "Spark optimization mastery" },
          { id: "m2", text: "Implement a streaming pipeline with Kafka/Kinesis and structured streaming with exactly-once / at-least-once semantics.", milestone: "Streaming ingestion" },
          { id: "m3", text: "Optimize a query that was running 10x slower due to data skew and small files using compaction (OPTIMIZE/Z-ORDER).", milestone: "Real-world tuning exercise" }
        ],
        resources: ["Spark: The Definitive Guide", "Delta Lake Under the Hood", "Designing Data-Intensive Applications (Kleppmann)"]
      },
      {
        week: "Weeks 3 - 4",
        title: "Pillar 2: Enterprise Integration & Security Architecture",
        focus: "Enterprise Identity, VPC & Security",
        summary: "FDEs must deploy into the world's most restrictive customer networks: banks, defense agencies, and healthcare giants.",
        tasks: [
          { id: "m4", text: "Master enterprise auth: SAML 2.0, OIDC, OAuth2 flows (Authorization Code + PKCE, Client Credentials), and mTLS.", milestone: "Identity & Access Architecture" },
          { id: "m5", text: "Design cloud network topology: AWS PrivateLink, Transit Gateway, VPC peering, egress proxies, and IP whitelisting.", milestone: "Zero-Trust enterprise networking" },
          { id: "m6", text: "Implement RBAC, ABAC (Attribute-Based Access Control), and column/row-level data masking for compliance (GDPR/HIPAA).", milestone: "Enterprise data governance" }
        ],
        resources: ["OAuth 2.0 and OpenID Connect in Action", "AWS PrivateLink & VPC Peering Architecture", "Enterprise Security Best Practices"]
      },
      {
        week: "Weeks 5 - 6",
        title: "Pillar 3: Advanced Problem Decomposition ('Decomp')",
        focus: "Ambiguity & System Framing",
        summary: "Tackle high-ambiguity enterprise problems where the client doesn't even know what data they have or what the bottleneck is.",
        tasks: [
          { id: "m7", text: "Simulate a live Palantir Decomp: 'A global auto manufacturer needs to track battery warranty defects across 3 million connected vehicles.'", milestone: "End-to-end Decomp session" },
          { id: "m8", text: "Master dynamic schema evolution: Handling unknown customer payloads without breaking downstream consumers.", milestone: "Flexible data model design" },
          { id: "m9", text: "Define North Star business metrics and translate them into measurable technical SLAs (p99 latency, freshness, throughput).", milestone: "Business-to-tech alignment" }
        ],
        resources: ["Enterprise System Decomposition Guide", "Case Study: Supply Chain Ontology Modeling", "Decomp Red Flags & Rubrics"]
      },
      {
        week: "Weeks 7 - 8",
        title: "Pillar 4: Applied Generative AI & Enterprise Agentic Workflows",
        focus: "LLM Orchestration & Evaluation",
        summary: "Build reliable AI applications that solve enterprise workflows rather than toy demos.",
        tasks: [
          { id: "m10", text: "Build an enterprise multi-agent workflow using LangGraph or custom state machine with human-in-the-loop approvals.", milestone: "Production Agentic system" },
          { id: "m11", text: "Implement LLM evaluation harness: automated synthetic test generation, hallucination detection, and semantic drift monitoring.", milestone: "Eval & benchmark harness" },
          { id: "m12", text: "Implement hybrid search: Dense vector search + Sparse BM25 + Cross-Encoder Reranker with reciprocal rank fusion (RRF).", milestone: "High-accuracy search engine" }
        ],
        resources: ["LangGraph Multi-Agent Architecture", "RAG Triad & Evaluation Frameworks", "Production Prompt Engineering & Guardrails"]
      },
      {
        week: "Weeks 9 - 10",
        title: "Pillar 5: Stakeholder Diplomacy & The Hostile Client Round",
        focus: "Field Leadership & Communication",
        summary: "FDE interview loops always test how you react when a client engineer says 'Your platform is garbage and our in-house script does this better.'",
        tasks: [
          { id: "m13", text: "Master the 'Acknowledge, Align, Reframe' technique for de-escalating hostile client stakeholders.", milestone: "Diplomacy framework" },
          { id: "m14", text: "Practice saying 'No' to executive feature creep while preserving trust and offering phased delivery milestones.", milestone: "Scope negotiation" },
          { id: "m15", text: "Deliver an executive technical demo: Pitching value in the first 2 minutes before diving into code or architecture.", milestone: "C-Level presentation readiness" }
        ],
        resources: ["Never Split the Difference (Chris Voss)", "The Trusted Advisor", "Managing Resistant Enterprise Clients"]
      },
      {
        week: "Weeks 11 - 12",
        title: "Pillar 6: Target Company Simulation & Final Polish",
        focus: "Company-Specific Interview Gauntlet",
        summary: "Target your specific company loop (Palantir FDSE, Databricks Solutions Architect, Scale AI FDE).",
        tasks: [
          { id: "m16", text: "Palantir Track: 3 full decomp sessions + 2 coding rounds (heavy on graphs, BFS/DFS, priority queues, and concurrency).", milestone: "Palantir interview loop sim" },
          { id: "m17", text: "Databricks Track: Lakehouse migration presentation + live Spark debugging session.", milestone: "Databricks technical deep dive" },
          { id: "m18", text: "Scale/OpenAI Track: 3-hour rapid prototype challenge (Fullstack AI demo built from raw API specs).", milestone: "Rapid build challenge" }
        ],
        resources: ["Palantir Glassdoor & Blind Verified Questions", "Databricks Technical Interview Rubric", "FDE Interview Scorecards"]
      }
    ]
  },

  senior: {
    id: "senior",
    title: "Senior SWE / Solutions Architect (5 - 9 YOE)",
    experience: "5 - 9 Years",
    tagline: "Owning multi-million dollar enterprise platform deployments from technical architecture to production go-live",
    overview: "For senior engineers, lead consultants, and system architects. The interview bar shifts to proving you can lead technical deployments, design resilient multi-tenant architectures, unblock high-friction client security reviews, and mentor deployment teams.",
    keyStrengthsToProve: [
      "Large-scale distributed systems architecture, resilience, disaster recovery, and air-gapped deployments",
      "Field CTO mentality: navigating C-suite relationships, vendor politics, and technical risk de-risking",
      "Platform extensibility: building reusable deployment frameworks that scale across dozens of customer accounts",
      "Handling catastrophic failure modes: live incident leadership in customer environments"
    ],
    targetInterviews: [
      "Palantir Senior FDSE / Deployment Strategist",
      "Databricks Senior Solutions Architect / Principal Field Engineer",
      "Scale AI Senior Forward Deployed Engineer",
      "OpenAI Enterprise Solutions Architect / Technical Lead",
      "Snowflake Principal Cloud Architect"
    ],
    weeks: [
      {
        week: "Weeks 1 - 3",
        title: "Pillar 1: Air-Gapped, Sovereign Cloud & Zero-Trust Deployments",
        focus: "Mission-Critical Enterprise Infrastructure",
        summary: "Architect platforms that run in completely disconnected environments (DoD IL5/IL6, sovereign clouds, FedRAMP High, strict banking DMZs).",
        tasks: [
          { id: "s1", text: "Design an automated air-gapped deployment pipeline: air-gapped container registries, signed artifact verification, and offline yum/pip mirrors.", milestone: "Air-gap deployment blueprint" },
          { id: "s2", text: "Implement hardware security module (HSM) integrations, customer-managed encryption keys (CMEK), and envelope encryption.", milestone: "Cryptographic compliance" },
          { id: "s3", text: "Architect cross-region active-active disaster recovery with RPO < 1 min and RTO < 15 min across heterogeneous cloud providers.", milestone: "Multi-cloud resilience" }
        ],
        resources: ["NIST SP 800-53 Security Controls", "Air-Gapped Kubernetes (Rancher/K3s offline guides)", "AWS GovCloud & FedRAMP Compliance Architectures"]
      },
      {
        week: "Weeks 4 - 6",
        title: "Pillar 2: Complex Enterprise System Decomposition & Ontologies",
        focus: "High-Scale Business Domain Modeling",
        summary: "Deconstruct multi-billion dollar enterprise operations into semantic ontologies, graph networks, and high-throughput microservices.",
        tasks: [
          { id: "s4", text: "Design a Palantir Foundry-style Object/Ontology layer on top of heterogeneous enterprise data sources (SAP, Salesforce, Kafka, Oracle).", milestone: "Enterprise Ontology Architecture" },
          { id: "s5", text: "Solve entity resolution at scale (100M+ entities) using probabilistic record linkage (Fellegi-Sunter) and graph clustering.", milestone: "Entity Resolution Engine" },
          { id: "s6", text: "Formulate technical risk registers and de-risking matrices for 9-figure enterprise pilot engagements.", milestone: "Pilot de-risking blueprint" }
        ],
        resources: ["Palantir Foundry Architecture Whitepapers", "Entity Resolution in the Era of Big Data", "Domain-Driven Design (Eric Evans)"]
      },
      {
        week: "Weeks 7 - 9",
        title: "Pillar 3: Enterprise AI Governance, Guardrails & Fine-Tuning Economics",
        focus: "Strategic AI Architecture",
        summary: "Lead discussions on when to build RAG vs fine-tune vs pre-train, and how to prevent data exfiltration in enterprise LLM workflows.",
        tasks: [
          { id: "s7", text: "Construct a comprehensive Total Cost of Ownership (TCO) model comparing self-hosted open-weights models (vLLM on H100s) vs Frontier APIs (OpenAI/Anthropic).", milestone: "AI TCO Calculator" },
          { id: "s8", text: "Architect real-time PII redaction and enterprise guardrail proxies with sub-20ms overhead using token classification and regex masking.", milestone: "Zero-Leakage AI Gateway" },
          { id: "s9", text: "Design synthetic data generation pipelines for client models where real customer data cannot leave compliant boundaries.", milestone: "Synthetic Data & Privacy Pipeline" }
        ],
        resources: ["LLM Inference Serving at Scale (vLLM/TGI)", "Enterprise AI Security Framework (OWASP Top 10 for LLMs)", "Cost Modeling for Large Language Models"]
      },
      {
        week: "Weeks 10 - 12",
        title: "Pillar 4: Executive Presence, Contract De-escalation & Interview Gauntlet",
        focus: "Executive Leadership & Board-Level Presentation",
        summary: "Ace the Senior FDE system design, Field CTO situational scenarios, and high-stakes behavioral evaluations.",
        tasks: [
          { id: "s10", text: "Conduct 4 advanced system designs: 1) Global Financial Fraud Detection, 2) Healthcare Multi-Hospital Federated Learning, 3) Global Fleet Telemetry.", milestone: "Senior system design mastery" },
          { id: "s11", text: "Simulate a live C-suite crisis meeting where a pilot deployment suffered data corruption 12 hours before public board announcement.", milestone: "Crisis communication test" },
          { id: "s12", text: "Formulate your engineering philosophy: How you scale customer deployment templates into core product features.", milestone: "Field-to-Product Flywheel" }
        ],
        resources: ["Field CTO Playbook", "High Output Management (Andy Grove)", "Executive Communication for Technical Leaders"]
      }
    ]
  },

  staff: {
    id: "staff",
    title: "Staff / Principal / Field CTO (10+ YOE)",
    experience: "10+ Years",
    tagline: "Shaping enterprise technology strategy, transforming product roadmap via field feedback, and closing 8-figure technical deals",
    overview: "For principal engineers, former founders, and field CTOs. At this level, you are the technical authority who unlocks strategic enterprise accounts, influences core company product roadmaps, and builds scalable deployment practices across regions.",
    keyStrengthsToProve: [
      "Translating company-wide technical strategy into enterprise customer transformation programs",
      "The 'Field-to-Product Flywheel': institutionalizing customer deployment patterns into reusable core platform modules",
      "Boardroom & C-Suite technical authority: advising Fortune 50 CTOs/CIOs on architecture modernization",
      "Mentoring and scaling high-performing Forward Deployed Engineering organizations"
    ],
    targetInterviews: [
      "Palantir Principal Deployment Strategist / Lead Architect",
      "Databricks Field CTO / Principal Solutions Architect",
      "Scale AI Head of Forward Deployed Engineering / Principal FDE",
      "OpenAI Head of Enterprise Architecture / Strategic Applied AI",
      "Snowflake Principal Field Architect"
    ],
    weeks: [
      {
        week: "Weeks 1 - 4",
        title: "Pillar 1: Enterprise Modernization Strategy & Field-to-Product Flywheel",
        focus: "Organizational & Platform Scaling",
        summary: "Design architectures that not only win one customer, but systematically become core product features used by hundreds of clients.",
        tasks: [
          { id: "st1", text: "Create a formal framework for identifying when bespoke customer code should be abstracted into a core platform capability.", milestone: "Field-to-Product governance" },
          { id: "st2", text: "Architect multi-tenant isolation patterns for enterprise SaaS serving competing clients in the same industry (e.g. rival airlines or investment banks).", milestone: "Multi-tenant tenant security" },
          { id: "st3", text: "Develop reference architectures for hybrid legacy (Mainframe/COBOL/Oracle) to cloud-native streaming data transformations.", milestone: "Legacy-to-Cloud Playbook" }
        ],
        resources: ["The Flywheel Effect (Jim Collins)", "Enterprise Architecture as Strategy (Ross, Weill, Robertson)", "Platform Engineering at Scale"]
      },
      {
        week: "Weeks 5 - 8",
        title: "Pillar 2: Global AI Strategy, Sovereign Infrastructure & Regulatory Compliance",
        focus: "Global Policy & AI Governance",
        summary: "Lead discussions on EU AI Act compliance, cross-border data sovereignty, and custom enterprise foundation model fine-tuning.",
        tasks: [
          { id: "st4", text: "Formulate a multi-region deployment strategy adhering to GDPR, EU AI Act, HIPAA, and China Cross-Border Data Transfer rules.", milestone: "Global Compliance Matrix" },
          { id: "st5", text: "Design an enterprise AI Center of Excellence (CoE) architectural blueprint for Fortune 100 organizations.", milestone: "AI CoE blueprint" },
          { id: "st6", text: "Create an executive ROI model demonstrating quantified cost savings and revenue acceleration for a $20M platform engagement.", milestone: "Executive Business Case" }
        ],
        resources: ["EU AI Act Technical Requirements", "Cross-Border Data Residency Architecture", "Enterprise AI ROI Modeling"]
      },
      {
        week: "Weeks 9 - 12",
        title: "Pillar 3: The Executive Gauntlet & Principal Leadership Interview",
        focus: "Principal Evaluation Mastery",
        summary: "Execute principal-level interviews: Vision presentation, VP of Engineering interview, and Board-level architecture defense.",
        tasks: [
          { id: "st7", text: "Prepare and deliver a 45-minute executive presentation on 'The Next 5 Years of Enterprise AI & Forward Deployment Architecture'.", milestone: "Keynote presentation" },
          { id: "st8", text: "Simulate a live interview with a VP of Engineering on organizational design, FDE career ladders, and managing field burnout.", milestone: "People & org leadership" },
          { id: "st9", text: "Defend an end-to-end architecture against rigorous scrutiny from Distinguished Engineers.", milestone: "Distinguished architecture defense" }
        ],
        resources: ["Staff Engineer: Culture and Leadership", "The Manager's Path", "Executive Presence in High-Stakes Tech Sales"]
      }
    ]
  },

  transitioner: {
    id: "transitioner",
    title: "SWE / Solutions Architect / DevOps to FDE",
    experience: "Any Level",
    tagline: "Bridging the gap from pure coding or pure consulting into the hybrid superpower of Forward Deployed Engineering",
    overview: "Specifically designed for engineers currently in traditional roles (Pure Backend SWE, Cloud Solutions Architect, Technical Sales Engineer, or DevOps/SRE) who want to pivot into high-paying, high-impact Forward Deployed Engineering.",
    keyStrengthsToProve: [
      "For Backend SWEs: Developing high client empathy, commercial awareness, and communication without losing coding depth",
      "For Solutions Architects / SEs: Re-igniting hardcore coding, rapid debugging, and hands-on algorithm implementation",
      "For DevOps/SREs: Shifting focus from purely keeping infra running to building user-facing customer workflows and business logic",
      "Mastering the FDE identity: You are an engineer who thrives in the chaos of live customer environments"
    ],
    targetInterviews: [
      "Palantir FDSE Transition",
      "Databricks Solutions Architect / Field Engineering",
      "Scale AI Forward Deployed Engineer",
      "OpenAI Enterprise Solutions Engineer",
      "Enterprise AI Startup FDE Roles"
    ],
    weeks: [
      {
        week: "Weeks 1 - 3",
        title: "Pillar 1: The FDE Mindset Shift (From Tickets to Outcomes)",
        focus: "Identity & Operating Model",
        summary: "Understand how an FDE differs from traditional SWEs and Consultants. An FDE owns the client's business outcome, not just a Jira ticket.",
        tasks: [
          { id: "t1", text: "Study the history and philosophy of Forward Deployed Engineering: origin at Palantir, evolution at Databricks, and explosion in the GenAI era.", milestone: "FDE Mindset immersion" },
          { id: "t2", text: "Audit your current skills: Complete the FDE 5-Pillar Diagnostic to pinpoint whether your gap is Coding Velocity, Data, or Client Diplomacy.", milestone: "Personal diagnostic audit" },
          { id: "t3", text: "Rewrite your resume: Shift from listing internal tech stacks to highlighting business outcomes, customer impact, and rapid problem solving.", milestone: "FDE Resume overhaul" }
        ],
        resources: ["The Forward Deployed Engineer Handbook", "Why FDEs Are Replacing Traditional Tech Sales", "Resume Transformation Examples"]
      },
      {
        week: "Weeks 4 - 6",
        title: "Pillar 2: Remediation — The Coding & Prototyping Accelerator",
        focus: "Hands-on Full-Stack & Algo Speed",
        summary: "If you come from a non-coding or low-code background, ramp up your live coding and rapid building speed.",
        tasks: [
          { id: "t4", text: "Complete 50 LeetCode Mediums focusing on Trees, Graphs, Hash Tables, and String Parsing (the bread-and-butter of FDE coding rounds).", milestone: "Algorithm proficiency" },
          { id: "t5", text: "Build 3 full-stack mini-apps from scratch in a weekend each: 1) Live Log Streamer, 2) SQL Query Visualizer, 3) Document QA Chatbot.", milestone: "Rapid prototyping portfolio" },
          { id: "t6", text: "Practice live coding while narrating your thought process out loud to build confidence under observation.", milestone: "Interview vocalization drill" }
        ],
        resources: ["Grokking the Coding Interview", "Rapid Full-Stack Blueprint with Vite & FastAPI", "Think-Aloud Protocols for Coding"]
      },
      {
        week: "Weeks 7 - 9",
        title: "Pillar 3: The Decomp Round & Enterprise System Design",
        focus: "Problem Structuring & Architecture",
        summary: "Learn how to approach open-ended, ambiguous customer problem statements with structured confidence.",
        tasks: [
          { id: "t7", text: "Master the 4-step Decomp formula: Scope & Requirements, Data Model & Entity Graph, Architecture & Ingestion, Security & Failure Scenarios.", milestone: "Decomp methodology" },
          { id: "t8", text: "Practice 6 end-to-end Decomp prompts with timer: Hospital logistics, Smart city traffic, Defense drone imagery processing, Anti-money laundering.", milestone: "Decomp fluency" },
          { id: "t9", text: "Learn to sketch clear architectural diagrams that communicate clearly to both engineers and business stakeholders.", milestone: "Visual architecture sketching" }
        ],
        resources: ["System Design Primer", "Palantir Decomp Sample Solutions", "The Art of Visual Technical Communication"]
      },
      {
        week: "Weeks 10 - 12",
        title: "Pillar 4: Behavioral Story Crafting & Live Company Loops",
        focus: "Client Experience & Behavioral Mastery",
        summary: "Turn your past engineering or consulting experience into compelling evidence of forward-deployed excellence.",
        tasks: [
          { id: "t10", text: "Translate past work into 5 high-impact STAR stories highlighting ambiguous problems solved, difficult stakeholders aligned, and fast deliveries.", milestone: "STAR story repository" },
          { id: "t11", text: "Conduct 3 realistic mock interviews with seasoned FDEs or mentors covering both technical and client-handling rounds.", milestone: "Targeted mock rounds" },
          { id: "t12", text: "Targeted job applications and referral outreach to target companies with customized pitch notes.", milestone: "Application launch" }
        ],
        resources: ["The FDE Behavioral Playbook", "Referral Outreach Templates", "Negotiating FDE Compensation Packages"]
      }
    ]
  }
};
