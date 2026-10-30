# The Forward Deployed Engineer's Decomposition Playbook

A structured methodology for turning vague, ambiguous business problems into production software systems that solve real customer problems.

---

## 1. Why Decomposition is the Core FDE Skill

Traditional Software Engineers are usually handed specifications, tickets, or user stories drafted by product managers. Forward Deployed Engineers (FDEs) operate on the opposite end of the spectrum: you sit across from a VP of Supply Chain, a Hospital Medical Director, or a Chief Operating Officer who says:

> *"Our supply chain is a mess. Shipments are late, costs are spiraling, and we have no visibility. Fix it."*

In hiring loops (especially at Palantir, Scale AI, Databricks, and Anthropic), the **Decomposition ("Decomp")** interview tests whether you can remain calm under high ambiguity, ask the right clarifying questions, construct an operational domain model, design a practical data pipeline with reliable writeback, and articulate architectural trade-offs under real-world constraints.

---

## 2. The 6-Phase Decomp Blueprint

Whenever you face an ambiguous prompt in an interview or on an enterprise customer site, execute these six phases in order:

```text
[Phase 1: Operator & Decision] → [Phase 2: Binding Constraint] → [Phase 3: Domain Ontology]
                                                                        ↓
[Phase 6: Disruption & Twists] ← [Phase 5: Workflow & Writeback] ← [Phase 4: Ingestion & Quality]
```

### Phase 1: Clarify the Operator and the Decision

Never jump into databases or models first. Anchor your entire system on human decisions:

1. **Who is the operational user?** (e.g. Berth scheduler, ER triage nurse, fraud analyst, claims adjuster).
2. **What specific decision are they making?** (e.g. "Which flight gets the cargo loader?", "Which patient is assigned the ICU bed?").
3. **How often is that decision made?** (e.g. Once every 5 minutes, once a shift, once a month).
4. **What is the cost of a wrong or delayed decision?** (e.g. \$10,000/hour vessel demurrage fee, clinical deterioration, fraudulent account draining).
5. **What does success look like in business metrics?** (e.g. Dwell time reduction, on-time departure rate, leakage prevention).

### Phase 2: Identify the Binding Constraint

Every operational bottleneck has one primary constraint that limits throughput (Theory of Constraints):

- In port operations: Is it berth docking windows, quay crane availability, yard ground slots, or gate check-in throughput?
- In hospital transfers: Is it physical beds, specialized nursing staffing ratios, or transport ambulance availability?
- In real-time data pipelines: Is it upstream network bandwidth, consumer group CPU serialization, or database connection pool limits?

*Rule of thumb:* State two or three clarifying assumptions out loud and ask the stakeholder or interviewer to confirm them before designing software.

### Phase 3: Model the Operational Ontology (Entities & State)

Model the business objects and their state transitions rather than copying raw database tables:

- **Core Entities:** `Vessel`, `Berth`, `QuayCrane`, `Container`, `Truck`, `Appointment`.
- **Properties:** Name specific attributes that drive decisions (e.g. `Container`: `size`, `is_hazardous`, `temperature_class`, `customs_release_status`).
- **Relationships:** Cardinality and associations (e.g. `Berth` hosts many `VesselCalls`; `Container` occupies at most one `YardSlot`).
- **State Machine:** Enumerate allowable states and valid transitions (e.g. `Draft` → `Pending_Review` → `Approved` → `Dispatched` → `Completed`).

### Phase 4: Data Ingestion, Reconciliation, and Quality

Enterprise data is notoriously fragmented, stale, and contradictory:

- **Inventory the Source Systems:** Identify systems of record (e.g. Terminal Operating System, SAP ERP, Salesforce CRM, legacy DB2 mainframes).
- **Ingestion Pattern:** Event-driven CDC (Debezium/Kafka) vs micro-batch polling vs file drop (SFTP).
- **Entity Resolution:** How do you join records when source systems lack a shared global UUID? Combine deterministic keys (Tax ID, VIN, container ISO code) with fuzzy matching algorithms and a human review queue for low-confidence ties.
- **Data Quality Contracts:** Land raw inputs untouched in an append-only layer (Delta Lake/Iceberg/Postgres raw partition); enforce schema validation, null checks, and deduplication before promoting rows to clean entities.

### Phase 5: Operator Workflow and Reliable Writeback

Operational systems must close the loop: reading data is useless if operators cannot take action:

- **The Operator Workspace:** Sketch the thin UI. What ranked list or map does the operator see on Monday morning?
- **Writeback Target:** What is the external system of record that must reflect the operator's choice? (e.g. SAP Purchase Order, Terminal Operating System, EHR).
- **The Transactional Outbox Pattern:** Save the operator's action and an outbox event in a single local database transaction. A separate relay process reliably delivers the message to the external API.
- **Sagas vs 2PC:** Legacy enterprise systems do not participate in distributed two-phase commits. Structure multi-step actions as sagas with compensating transactions (e.g. if Step 2 fails, execute Step 1 compensation and flag the discrepancy for an on-call lead).
- **Idempotency:** Every writeback request must include an `Idempotency-Key` so network retries never create duplicate purchase orders, cargo bookings, or payments.

### Phase 6: Stress Testing, Failure Scenarios, and Twists

In interviews, interviewers will deliberately introduce a mid-drill twist. Anticipate failure modes:

- **Data Latency:** "The point-of-sale data arrives 6 hours late in 30% of stores. What breaks?"
- **Network Outage:** "The ship loses satellite connectivity for 72 hours. How do operators function?"
- **Concurrency Conflicts:** "Two dispatchers book the same specialty equipment at the exact same second. How do you resolve it?" (Optimistic locking with version counters).
- **Drift and Poison Pills:** "An upstream vendor alters the schema unannounced. How does your pipeline react?" (Quarantine poison rows, alert on dead-letter queue, preserve clean data flow).

---

## 3. Whiteboard Time Management (45-Minute Drill)

| Minute | Stage | What to Deliver |
| --- | --- | --- |
| **00:00 - 05:00** | **Clarify & Scope** | Name the operator, the decision, 2-3 primary metrics, and state 3 assumptions. |
| **05:00 - 15:00** | **Ontology & Data Model** | Draw 4-6 core entities, their key attributes, relationships, and state transitions. |
| **15:00 - 25:00** | **Ingestion & Data Flow** | Map sources, CDC/batch mechanisms, entity resolution, and data quality checks. |
| **25:00 - 35:00** | **Workflow & Writeback** | Operator UI sketch, outbox relay, saga choreography, and idempotency guarantees. |
| **35:00 - 45:00** | **Twist, Failure Modes & Wrap** | Respond to the interviewer's twist, discuss trade-offs, and define day-one milestone. |

---

## 4. Common Red Flags in Decomp Rounds

1. **Jumping straight to Machine Learning:** Reaching for a deep neural network or LLM when a sorted SQL query, window function, or business rule solves the immediate operational bottleneck.
2. **Ignoring the System of Record:** Treating your new software as the source of truth when an enterprise ERP or TOS already owns billing, inventory, or physical tracking.
3. **Omitting Writeback:** Designing a beautiful dashboard that shows data but gives operators no mechanism to act on it or sync updates back to core systems.
4. **Defensiveness on Constraints:** Resisting when an interviewer introduces a constraint (e.g. "The customer's network has no internet access"). The right response is: restate the constraint, outline what changes in the architecture, and continue.
