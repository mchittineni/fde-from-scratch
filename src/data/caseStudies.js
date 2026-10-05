export const caseStudies = [
  {
    id: "cs_ontology",
    title: "Operational Ontology with Safe ERP Writeback",
    category: "Decomposition & Domain Modeling",
    difficulty: "Senior / Staff",
    companyContext: "Ontology-based operational platform (Palantir Foundry-style)",
    problemStatement: "A manufacturer runs 45 plants in 14 countries. Its data is split across three SAP ERP instances, a CRM, several Oracle databases, and line-level sensor feeds. Plant managers and supply-chain planners want one operational tool that shows part shortages as they develop and lets them act on them, for example by moving a purchase order to a backup supplier. Those actions must reach SAP correctly, be auditable, and never leave the two systems silently disagreeing.",
    architecturePhases: [
      {
        phase: "1. Entity Model",
        details: "Model the business objects planners reason about (plants, lines, parts, suppliers, orders) instead of mirroring source tables. Every object keeps the source-system keys it came from, so writeback can find the right record.",
        entities: [
          { name: "Plant", properties: ["plant_id", "name", "country", "sap_instance", "sap_plant_code", "status"] },
          { name: "AssemblyLine", properties: ["line_id", "plant_id", "output_rate_per_hour", "current_work_order_id", "status"] },
          { name: "Part", properties: ["part_id", "sap_material_number", "description", "on_hand_qty", "safety_stock_qty", "lead_time_days"] },
          { name: "Supplier", properties: ["supplier_id", "canonical_name", "source_vendor_ids", "country", "qualification_status"] },
          { name: "PurchaseOrder", properties: ["po_id", "sap_po_number", "sap_instance", "supplier_id", "part_id", "quantity", "delivery_date", "status", "last_synced_at"] },
          { name: "WritebackAction", properties: ["action_id", "action_type", "requested_by", "requested_at", "target_object_id", "parameters", "idempotency_key", "status", "sap_response", "compensating_action_id"] }
        ],
        relationships: "Plant has many AssemblyLines. AssemblyLine consumes many Parts (via bill of materials). Supplier supplies many Parts. PurchaseOrder links one Supplier, one Part, and one receiving Plant. WritebackAction targets one PurchaseOrder and may link to a compensating WritebackAction."
      },
      {
        phase: "2. Ingestion and Entity Resolution",
        details: "Bring each source in with the method that suits it, land the raw data unchanged, then build the object layer from it.",
        technicalDecisions: [
          "Oracle: log-based change data capture (for example, Debezium or GoldenGate) into a message bus.",
          "SAP: use SAP-supported extraction (ODP-based extractors or SLT replication) rather than reading database tables directly, which is often unsupported and breaks on upgrades.",
          "Land raw records unchanged in an append-only layer, then transform into typed objects in versioned pipelines, so any object can be rebuilt and traced back to its sources.",
          "Resolve suppliers across the three SAP instances by combining deterministic rules (tax ID, DUNS number) with fuzzy name and address matching. Low-confidence matches go to a human review queue rather than being merged automatically.",
          "Serve object reads from an indexed store sized for interactive queries, and show each object's last sync time so users know how fresh it is."
        ]
      },
      {
        phase: "3. Writeback to SAP",
        details: "SAP remains the system of record. The platform records what the user intends, sends it to SAP reliably, and only shows the change as done once SAP confirms it.",
        technicalDecisions: [
          "Validate the action before submitting it: check user permissions and business rules, then call the SAP interface in test mode where it supports one (for example, the TESTRUN flag on BAPI_PO_CHANGE).",
          "Use the transactional outbox pattern: save the WritebackAction and an outbox event in one local transaction, and have a relay deliver it to SAP. This avoids losing actions when the platform's database and SAP disagree about what was sent.",
          "Make delivery idempotent: retries reuse the same idempotency key and check SAP's current state before re-sending, so a timeout never creates a duplicate change.",
          "Treat a multi-step action (for example, cancel the line on PO A and create PO B) as a saga, not a distributed transaction. If a later step fails, run compensating steps, such as restoring the original quantity, and alert the planner. A two-phase commit isn't available here because SAP doesn't participate in one.",
          "Keep an append-only audit log of who requested each action, the before and after values, the SAP document numbers, and every status change. Add hash chaining if the auditors require tamper evidence."
        ]
      }
    ],
    tradeoffs: [
      { decision: "Eventually consistent reads, confirmed writes", reasoning: "Dashboards can tolerate data that is a few seconds or minutes old if the age is shown. Writes cannot, so an action stays 'pending' until SAP returns a document number, and the next sync confirms the change." },
      { decision: "Typed core schema plus a flexible extension field", reasoning: "Core properties get strict types and validation so actions can rely on them. Source attributes that haven't been modeled yet are kept in a JSON field so nothing is lost, and they are promoted to typed properties once someone depends on them." },
      { decision: "Sagas instead of distributed transactions", reasoning: "Compensation is more work to design and briefly exposes intermediate states, but it is the only option that works across systems that don't share a transaction coordinator." }
    ],
    interviewTakeaway: "In a decomposition interview, start with the objects and actions the user cares about, then work back to the sources. Spend real time on writeback: name the system of record, how you avoid duplicates, what happens when step two fails, and what the user sees while a change is pending."
  },

  {
    id: "cs_airgap_fleet",
    title: "Disconnected Fleet Telemetry and Sync",
    category: "Edge & Air-Gapped Infrastructure",
    difficulty: "Senior / Principal",
    companyContext: "Defense and maritime logistics (edge-deployed platforms)",
    problemStatement: "Design a telemetry and logistics platform for about 2,000 vessels that spend long periods disconnected, degraded, intermittent, or on limited bandwidth (DDIL). Each ship must capture and process its own sensor data, raise local alerts without relying on shore, and exchange data with a shore hub during short, low-bandwidth satellite windows. The shore hub sends back orders, reference data, and software updates the same way.",
    architecturePhases: [
      {
        phase: "1. Shipboard Edge Node",
        details: "A self-contained deployment that works indefinitely with no connection to shore.",
        technicalDecisions: [
          "Run a small Kubernetes distribution (for example, single-node K3s) on ruggedized hardware, with every image and dependency preloaded. Nothing is pulled at runtime.",
          "Keep an append-only local event log (for example, SQLite in WAL mode or an embedded queue such as NATS JetStream) that is sized to buffer several weeks of telemetry.",
          "Use an embedded analytical engine such as DuckDB for local queries and alerting, and serve the UI from the node with no external assets.",
          "Evaluate safety-critical alerts entirely on board. Shore connectivity should improve the picture, not be required for it."
        ]
      },
      {
        phase: "2. Opportunistic Synchronization",
        details: "Send the most important data first over links that may provide only tens to hundreds of kilobits per second, for a few minutes at a time.",
        technicalDecisions: [
          "Give every event a per-vessel sequence number, so the shore can detect gaps and drop duplicates regardless of arrival order.",
          "Use priority queues: alerts and position reports first, operational status next, bulk diagnostics last. Lower priorities are deferred or downsampled when windows are short.",
          "Encode compactly (for example, Protocol Buffers with zstd compression) and send only changes since the last acknowledged state. Measure the bandwidth savings on real traffic instead of assuming a figure.",
          "Split large files into checksummed chunks with resumable transfer, so a dropped link only costs the chunk in flight.",
          "For shared data edited both on board and ashore, use CRDTs or similar merge rules where any merged result is acceptable (notes, tags, counters). For data with hard invariants, such as allocating limited cargo space, use reservations issued by the shore hub with explicit conflict review, because CRDTs guarantee replicas converge, not that the result is correct for the business.",
          "Send updates from shore to ship as signed bundles that the ship verifies before applying, with the previous version kept for rollback."
        ]
      },
      {
        phase: "3. Shore Hub",
        details: "Absorb bursts of uploads from many vessels at once and present one consistent fleet view.",
        technicalDecisions: [
          "Authenticate every vessel with mutual TLS, using device keys held in hardware (a TPM), at an ingestion gateway that can revoke a single vessel's credentials.",
          "Partition the ingest stream by vessel_id to keep per-vessel order, and process by event time with a large allowed lateness, since data can arrive days after it was recorded.",
          "Store telemetry in time-partitioned tables (by event date and vessel class) for fleet analysis, and keep a per-vessel 'last known state' view for operators."
        ]
      }
    ],
    tradeoffs: [
      { decision: "Edge storage versus history", reasoning: "Ships keep a fixed window of full-resolution data (for example, 30 days) and aggregate older data to save disk. Raw data is uploaded only when a window allows or when shore requests it for an investigation." },
      { decision: "CRDTs versus central coordination", reasoning: "Central locking can't work when ships are offline for weeks, so most shared state uses merge rules that always converge. The cost is that the small set of operations with hard invariants needs a reservation scheme and a way to handle conflicts after the fact." },
      { decision: "Freshness versus bandwidth", reasoning: "Strict prioritization means some low-priority data may arrive days late or only in summary form. Write this down with operators in advance, so missing diagnostics aren't mistaken for a failure." }
    ],
    interviewTakeaway: "Start from the physical constraints: how long ships are offline, how much bandwidth a window gives you, and which decisions must happen on board. Then explain how you order, deduplicate, and prioritize data, and be specific about which conflicts merge automatically and which need a person to resolve."
  },

  {
    id: "cs_agentic_rag",
    title: "Permission-Aware Enterprise RAG Assistant",
    category: "Applied AI & LLM Systems",
    difficulty: "Mid / Senior",
    companyContext: "Enterprise generative AI deployment",
    problemStatement: "Design an internal assistant for 60,000 employees across legal, HR, finance, and R&D that answers questions over roughly 50 million documents from wikis, ticketing systems, shared drives, and internal databases. A user must never get an answer built from content they can't open in the source system, such as executive compensation files or unreleased financial results.",
    architecturePhases: [
      {
        phase: "1. Identity and Access Control",
        details: "Make the source systems' permissions part of retrieval itself, and treat retrieved content as untrusted input.",
        technicalDecisions: [
          "Pass the user's identity (from the company SSO provider) through every request, and resolve it to group memberships at query time.",
          "Store each chunk's access-control list in the index and apply it as a filter during the search, so restricted chunks are never candidates. Then re-check access against the source system for the final set of documents, as defense in depth.",
          "Sync permissions continuously and treat sync lag as a security metric. Revoking access in the source should remove it in the assistant within a defined time.",
          "Call the model through a private endpoint under contract terms that cover data retention, and log prompts and responses to the company's own audit store.",
          "Assume documents can contain prompt injection. Tools run with the user's own permissions, read-only by default, and any action that writes or sends something requires the user to confirm it."
        ]
      },
      {
        phase: "2. Parsing and Retrieval",
        details: "Most answer-quality problems start in parsing and retrieval, so invest there before tuning prompts.",
        technicalDecisions: [
          "Use layout-aware parsing for PDFs and slides so tables keep their rows and columns instead of turning into flat text.",
          "Combine dense embeddings with keyword search (BM25) and merge the rankings, for example with reciprocal rank fusion. Keyword search handles exact terms such as project codes and policy numbers that embeddings often miss.",
          "Rerank the top candidates with a cross-encoder and send only the best few chunks to the model, which improves precision and keeps prompts short.",
          "Add a short description of where each chunk sits in its document (title, section, period) before indexing, so a chunk like 'revenue grew 4%' stays tied to the right company and quarter."
        ]
      },
      {
        phase: "3. Orchestration and Answer Quality",
        details: "Handle multi-step questions (for example, 'compare Q3 EMEA marketing spend with the approved budget') while keeping every claim traceable.",
        technicalDecisions: [
          "Use a planner that breaks the question into sub-queries and tool calls, with a cap on steps and a visible trace of what it did.",
          "Answer structured-data questions through parameterized, read-only query tools with row-level security, not free-form SQL generated by the model.",
          "Require a citation for each claim, and run a groundedness check that flags claims the cited passages don't support. This reduces unsupported answers but doesn't eliminate them, so show the sources in the UI.",
          "Keep an evaluation set covering retrieval quality, answer correctness, and permission-boundary tests (users asking for content they shouldn't see), and run it on every change to prompts, models, or indexing."
        ]
      }
    ],
    tradeoffs: [
      { decision: "Filter during search versus after search", reasoning: "Filtering after the search can leave a user with few or no results when the nearest chunks are all restricted, and it relies on every later step remembering to filter. Filtering during the search returns the best results the user is allowed to see, but very selective filters can slow some vector indexes or reduce their recall, so test it with realistic permission patterns." },
      { decision: "Reranking latency versus precision", reasoning: "A cross-encoder adds measurable latency per query, often tens to a few hundred milliseconds depending on the model and the number of candidates. Decide whether that's worth it using your own evaluation set, not published benchmarks." },
      { decision: "Automated actions versus confirmation", reasoning: "Letting the assistant take actions makes it more useful but also lets prompt injection cause harm. Starting read-only, and requiring confirmation for anything that writes, limits the damage a malicious document can do." }
    ],
    interviewTakeaway: "Show that you see enterprise RAG as mostly a data and access-control problem. Explain how permissions apply to retrieval, how you parse difficult documents, how you would measure quality, and what the system does when it doesn't know. Leave prompt design for last."
  }
];
