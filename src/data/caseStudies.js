export const caseStudies = [
  {
    id: "cs_ontology",
    title: "Palantir Foundry-Style Enterprise Ontology & Writeback Engine",
    category: "Decomposition & Domain Modeling",
    difficulty: "Staff / Senior Level",
    companyContext: "Palantir / Enterprise AI",
    problemStatement: "A global conglomerate operates 45 manufacturing plants across 14 countries. Their enterprise data is fragmented across 3 different SAP ERP instances, Salesforce CRM, custom Oracle databases, and live IoT assembly line sensors. Plant managers and supply chain directors need a single operational platform where they can not only visualize real-time inventory bottlenecks, but execute 'writeback actions' (e.g. re-routing a 50,000-unit part order to a secondary supplier) that propagate back into SAP with audit trails and rollback safety.",
    architecturePhases: [
      {
        phase: "1. Core Entity & Ontology Modeling",
        details: "Define the semantic objects that reflect the physical business world rather than database tables.",
        entities: [
          { name: "Plant", properties: ["plant_id", "country", "status", "capacity_utilization", "coordinates"] },
          { name: "AssemblyLine", properties: ["line_id", "plant_id", "output_rate", "active_work_order"] },
          { name: "PartComponent", properties: ["sku", "lead_time_days", "current_stock", "safety_stock_threshold"] },
          { name: "SupplierContract", properties: ["contract_id", "vendor_name", "tier", "max_capacity_per_week"] },
          { name: "OperationalAction", properties: ["action_id", "initiated_by", "timestamp", "target_system", "status", "rollback_payload"] }
        ],
        relationships: "Plant has many AssemblyLines; AssemblyLine consumes many PartComponents; PartComponent is supplied by SupplierContracts; OperationalAction modifies PartComponent allocation."
      },
      {
        phase: "2. Ingestion & Semantic Unification Pipeline",
        details: "Heterogeneous ingestion via batch & streaming connectors into a unified Object Layer.",
        technicalDecisions: [
          "CDC (Change Data Capture) via Debezium on Oracle and SAP NetWeaver connectors into Apache Kafka topics.",
          "Spark Structured Streaming micro-batches reconcile schema mismatches into an immutable Delta Lake Bronze layer.",
          "Entity Resolution: Probabilistic record linkage unifies vendor names ('Acme Ltd' vs 'Acme Corporation Inc') into a singular Supplier entity.",
          "Operational In-Memory Cache (Redis / Hazelcast) serves low-latency ontology queries (<50ms) to the frontend."
        ]
      },
      {
        phase: "3. Safe Writeback & Two-Phase Transaction Architecture",
        details: "When an operator clicks 'Re-route Purchase Order' in the UI, this must not corrupt the source of truth in SAP.",
        technicalDecisions: [
          "Write-Ahead Log (WAL) records the user action and desired state mutation before network transmission.",
          "Outbox Pattern & Two-Phase Commit coordinator dispatches authenticated SOAP/REST transactions into SAP BAPI with idempotency tokens.",
          "Compensation Saga: If the target ERP rejects the transaction (e.g. fiscal period locked), an automated rollback saga executes to restore previous inventory allocation and alerts the operator.",
          "Full Cryptographic Audit Trail: Every writeback stores user ID, timestamp, pre/post diff state, and digital signature for compliance."
        ]
      }
    ],
    tradeoffs: [
      { decision: "Eventually Consistent Read vs Strong Writeback", reasoning: "Ontology telemetry reads can tolerate 3-5 seconds of eventual consistency, but writebacks must be strictly atomic with idempotency keys." },
      { decision: "Schema-on-Write vs Dynamic JSONB", reasoning: "Core entities use strongly typed schemas with validation contracts; unmapped edge attributes are preserved in an audited dynamic JSONB payload." }
    ],
    interviewTakeaway: "In a Palantir Decomp interview, separating the operational ontology from raw database tables and detailing two-phase writeback safeguards instantly distinguishes top 1% candidates from average engineers."
  },

  {
    id: "cs_airgap_fleet",
    title: "Air-Gapped Multi-Region Fleet Telemetry & Defense Logistics",
    category: "Edge & Air-Gapped Infrastructure",
    difficulty: "Senior / Principal Level",
    companyContext: "Palantir Gotham / Scale Donovan",
    problemStatement: "Architect a logistics and telemetry platform for 25,000 military and maritime vessels operating in intermittent or completely severed network connectivity (air-gapped / DDIL - Disconnected, Denied, Intermittent, Limited). Telemetry must be captured locally on shipboard edge servers, processed in real-time for immediate navigation and sensor alerts, and bidirectionally synchronized with central command whenever satellite bursts (Starlink / SATCOM) become available.",
    architecturePhases: [
      {
        phase: "1. Edge Node Architecture (Shipboard)",
        details: "Lightweight, resilient deployment on bare-metal or single-node K3s clusters with zero internet dependency.",
        technicalDecisions: [
          "Single-node K3s running on ruggedized server hardware inside ship server room.",
          "Local storage on NVMe with SQLite / DuckDB for transactional event logs and DuckDB for fast local OLAP querying.",
          "Lightweight local UI served directly by local Nginx with no CDN or cloud assets.",
          "Event queueing using embedded NATS / SQLite WAL to buffer telemetry during weeks of network blackout."
        ]
      },
      {
        phase: "2. Opportunistic Asymmetric Synchronization Protocol",
        details: "Syncing massive datasets over low-bandwidth (256 Kbps) satellite windows.",
        technicalDecisions: [
          "CRDTs (Conflict-Free Replicated Data Types): State-based CRDTs prevent merge conflicts when multiple edge nodes update shared cargo manifests offline.",
          "Binary Delta Serialization with Protocol Buffers and zstandard (zstd) compression, achieving 80% bandwidth reduction over JSON.",
          "Priority Q-Ranking: Critical distress/threat telemetry is packetized in Tier-1 packets; routine diagnostic logs are queued in Tier-3 and throttled during narrow satellite windows.",
          "Resumable Chunk Transfers: Large sensor dumps are split into 64KB blocks with SHA-256 checksums, enabling partial upload resumes upon dropped connections."
        ]
      },
      {
        phase: "3. Central Command Hub Architecture",
        details: "Scalable ingestion gateway receiving burst syncs from thousands of edge units simultaneously.",
        technicalDecisions: [
          "Global Ingestion Gateway fronted by Envoy proxies handling mTLS client certificates tied to hardware TPM chips.",
          "Kafka partitions keyed by vessel_id to ensure strict in-order processing of incoming telemetry frames.",
          "Delta Lake timeseries tables partitioned by event_date and vessel_type for rapid analytical query response."
        ]
      }
    ],
    tradeoffs: [
      { decision: "Local Storage Footprint vs Analytical Depth", reasoning: "Edge nodes retain 30 days of raw high-frequency telemetry; older data is downsampled and aggregated to preserve local disk." },
      { decision: "CRDTs vs Centralized Locking", reasoning: "Centralized locks are impossible in DDIL environments; CRDTs guarantee mathematical convergence once connectivity is restored." }
    ],
    interviewTakeaway: "Demonstrates deep understanding of physical constraints, embedded edge computing, bandwidth economics, and distributed eventual consistency."
  },

  {
    id: "cs_agentic_rag",
    title: "Production Enterprise Agentic RAG Platform with VPC Isolation",
    category: "Applied AI & LLM Systems",
    difficulty: "Senior / Mid Level",
    companyContext: "OpenAI / Scale AI / Databricks Mosaic",
    problemStatement: "Design an internal Generative AI analyst and assistant for 60,000 corporate employees across Legal, HR, Finance, and R&D. The system must query 50 million internal documents (Jira, Confluence, Google Drive, internal databases) while guaranteeing that confidential executive compensation documents or pre-release earnings data can NEVER be retrieved or synthesized by unauthorized employees.",
    architecturePhases: [
      {
        phase: "1. Security & Identity Propagation (Zero-Trust AI)",
        details: "Preventing cross-tenant data leakage and prompt injection exfiltration.",
        technicalDecisions: [
          "End-to-End User Identity Token Propagation: Every search query preserves the user's Okta/OIDC JWT claims down to the retrieval layer.",
          "Pre-Filtering vs Post-Filtering: Document ACLs (Access Control Lists) are stored directly in the vector index metadata. Security pre-filtering ensures unauthorized chunks are mathematically excluded from the vector similarity search before nearest neighbors are computed.",
          "Dual LLM Gateway: Model queries run inside a dedicated private AWS PrivateLink / Azure OpenAI endpoint with Zero Data Retention (ZDR) enforced by legal SLA."
        ]
      },
      {
        phase: "2. Hybrid Search & Multi-Stage Retrieval Pipeline",
        details: "High precision retrieval across messy real-world PDFs, spreadsheets, and technical docs.",
        technicalDecisions: [
          "Layout-Aware Parser: Unstructured/MinerU extracts markdown tables, preserving columnar relationship integrity rather than flattening tables into meaningless strings.",
          "Hybrid Search: Combines Dense Vector Embeddings (e.g. text-embedding-3-large) with Sparse Keyword Search (BM25) via Reciprocal Rank Fusion (RRF).",
          "Cross-Encoder Reranker (Cohere/BGE-Reranker) trims top 100 retrieved candidates to the top 7 most relevant chunks, slashing prompt token costs by 70%.",
          "Contextual Retrieval: Appends document summary prefixes to every chunk prior to embedding to eliminate ambiguous pronoun references."
        ]
      },
      {
        phase: "3. Agentic Orchestration & Hallucination Guardrails",
        details: "Handling complex multi-hop user questions (e.g. 'Compare Q3 marketing spend in EMEA with our approved budget in Confluence').",
        technicalDecisions: [
          "State Machine Orchestrator (LangGraph): Deconstructs multi-part questions into sequential sub-queries with parallel tool calls.",
          "Deterministic Tool Schema: Queries to financial SQL databases use constrained parameterized stored procedures rather than raw LLM text-to-SQL generation.",
          "Faithfulness Checker (Self-Correction): A secondary lightweight model validates that every factual claim in the generated answer cites an exact source chunk sentence."
        ]
      }
    ],
    tradeoffs: [
      { decision: "Pre-Filtering vs Post-Filtering ACLs", reasoning: "Post-filtering risks returning 0 results if the top-K chunks all belong to restricted documents; pre-filtering guarantees high-K relevant authorized results." },
      { decision: "Latency vs Reranking Accuracy", reasoning: "Reranker adds 60ms latency but increases answer accuracy from 68% to 94%, well worth the budget for enterprise knowledge work." }
    ],
    interviewTakeaway: "Enterprise AI interviews test whether you understand that 90% of production RAG is data parsing, security ACL pre-filtering, and automated eval verification, not prompt engineering."
  }
];
