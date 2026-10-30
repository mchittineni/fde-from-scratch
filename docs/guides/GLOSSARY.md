# FDE Glossary

Plain-English definitions of the business, data, AI, infrastructure, security and interview terms you'll meet on the way to becoming a Forward Deployed Engineer.

Each entry is written for a beginner. Where it helps, an *FDE context* note says where the term shows up in real deployments or interviews. For depth, follow the links to the other guides.

**Jump to:** [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [J](#j) · [K](#k) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [Q](#q) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v) · [W](#w) · [Z](#z)

---

## A

- **ABAC (Attribute-Based Access Control):** Access decisions based on attributes of the user, the resource and the context, such as "analysts in region EU can read EU records during business hours." *FDE context:* needed when simple roles can't express who may see which rows. Compare RBAC.
- **Acceptance criteria:** The specific, checkable conditions that a piece of work must meet to count as done. *FDE context:* agreeing on them with the customer up front prevents "that's not what we meant" at the end. Every portfolio project in the app has them.
- **ACID:** Four guarantees of database transactions: **A**tomicity (all or nothing), **C**onsistency (rules aren't violated), **I**solation (concurrent transactions don't interfere), **D**urability (committed data survives a crash).
- **Active Directory (AD):** Microsoft's directory service that stores users, groups and computers in most corporate networks. Microsoft Entra ID (formerly Azure AD) is the cloud identity service. *FDE context:* your app's roles often come from AD or Entra ID groups.
- **Agent (AI):** An LLM-driven program that decides which tools to call, calls them, looks at the results and repeats until a task is done. *FDE context:* agents that can write to customer systems need permissions, approvals and audit logs, like any other user.
- **Air gap:** A network with no connection to the internet (or to other networks). Software and updates arrive on approved physical media or one-way transfer devices. See [AIRGAP_SECURITY_AND_NETWORKING.md](AIRGAP_SECURITY_AND_NETWORKING.md).
- **At-least-once delivery:** A messaging guarantee that every message is delivered, but possibly more than once. Consumers must therefore be idempotent to avoid duplicate effects.
- **ATO (Authority to Operate):** In US government settings, the formal approval for a system to run on a given network after a security assessment. *FDE context:* getting an ATO can take longer than building the software, so plan for it early.
- **Audit log:** A tamper-resistant record of who did what, when, and to which data. Regulated customers often require one for every write.
- **Authentication vs authorization (AuthN / AuthZ):** Authentication proves *who you are* (login). Authorization decides *what you're allowed to do* (permissions). Bugs often come from mixing them up.

## B

- **Backfill:** Running a pipeline over historical data, for example loading the last two years after building a pipeline that handles only new records.
- **Bastion host (jump host):** A hardened server that is the only allowed entry point into a private network. Engineers connect to it first, then to internal machines.
- **Batch processing:** Processing data in scheduled chunks (for example nightly) rather than continuously. Simpler and cheaper than streaming when minutes or hours of delay are acceptable.
- **Blameless postmortem:** An incident review that focuses on how the system allowed the failure, not on who to blame, so people report problems honestly. See [SELF_ASSESSMENT_AND_FEEDBACK.md](SELF_ASSESSMENT_AND_FEEDBACK.md).
- **BYOC (Bring Your Own Cloud):** A deployment model in which a vendor's software runs inside the customer's own cloud account rather than the vendor's, so the data stays in the customer's environment. The vendor usually manages it remotely.
- **BYOK (Bring Your Own Key):** The customer supplies and controls the encryption keys a vendor uses for their data, so they can revoke access.

## C

- **CAB (Change Advisory Board):** A group in many enterprises that must approve production changes, often on a fixed weekly schedule. *FDE context:* a missed CAB slot can delay a release by a week.
- **CDC (Change Data Capture):** Capturing each insert, update and delete from a database, usually by reading its transaction log, and streaming those changes to other systems. Debezium is a common open-source tool. See [ENTERPRISE_DATA_AND_INTEGRATION.md](ENTERPRISE_DATA_AND_INTEGRATION.md).
- **Certificate authority (CA):** An organization or internal system that issues digital certificates vouching that a public key belongs to a given server or person. Enterprises often run their own internal CA.
- **Champion:** A person inside the customer organization who wants your project to succeed and advocates for it internally. Not always the most senior person. *FDE context:* deployments without a champion tend to stall.
- **Chunking:** Splitting long documents into smaller passages before embedding them for retrieval. Chunk size and boundaries strongly affect RAG quality.
- **CI/CD (Continuous Integration / Continuous Delivery):** Automatically building and testing every code change (CI) and automatically releasing tested changes to an environment (CD).
- **Container:** A packaged application with its dependencies that runs the same way on any machine with a container runtime. Docker popularized the format.
- **Context window:** The maximum amount of text (measured in tokens) an LLM can consider at once, including the prompt, retrieved documents and its answer.
- **CTE (Common Table Expression):** A named temporary result inside a SQL query, written with `WITH name AS (...)`. It makes complex queries readable step by step.

## D

- **DAG (Directed Acyclic Graph):** A set of tasks with dependencies and no loops. Workflow orchestrators such as Apache Airflow run pipelines as DAGs.
- **Data contract:** An agreement between a data producer and its consumers about schema, meaning, freshness and quality, ideally enforced by automated checks.
- **Data diode:** Hardware that physically allows data to flow in only one direction between networks. Used to move data into or out of highly secure networks.
- **Data lake:** Cheap storage (usually cloud object storage) holding raw files of any format. Flexible, but hard to query reliably without extra structure.
- **Data residency:** A requirement that data be stored and processed within a particular country or region, usually for legal reasons.
- **Data warehouse:** A database optimized for analytical queries over large, structured, historical data. Snowflake and BigQuery are examples.
- **Dead-letter queue (DLQ):** A holding area for messages or records that repeatedly fail processing, so they don't block the rest and can be inspected later.
- **Decomp (decomposition):** Breaking a vague business problem into the operator, their decision, entities, data sources, workflow and trade-offs. Also the name of a common FDE interview round. See [DECOMPOSITION_PLAYBOOK.md](DECOMPOSITION_PLAYBOOK.md).
- **DNS (Domain Name System):** The system that translates names like `example.com` into IP addresses. *FDE context:* "can't connect" problems inside customer networks are often DNS problems.
- **DPA (Data Processing Agreement):** A contract that sets out how a vendor (the processor) may handle personal data on behalf of a customer (the controller). Required under GDPR when a vendor processes personal data for a customer.
- **Drift:** Gradual change that breaks assumptions. *Schema drift* is when a source adds, removes or renames fields. *Model or data drift* is when real-world inputs move away from what a model was built or tested on.

## E

- **Economic buyer:** The person at the customer who controls the budget and can approve the purchase. Often different from the champion and the day-to-day users.
- **Egress:** Network traffic leaving a network. Restricted egress means your software can't freely call out to the internet. Compare ingress (incoming traffic).
- **EHR (Electronic Health Record):** The system of record for patient data in hospitals and clinics.
- **Embedding:** A list of numbers (a vector) that represents the meaning of a piece of text, image or other data. Similar meanings produce vectors that are close together, which makes semantic search possible.
- **Entity resolution:** Working out which records from different systems refer to the same real-world thing (customer, supplier, part) when there's no shared ID. Combines exact keys, fuzzy matching and human review. See [ENTERPRISE_DATA_AND_INTEGRATION.md](ENTERPRISE_DATA_AND_INTEGRATION.md).
- **ERP (Enterprise Resource Planning):** Core business software for finance, purchasing, inventory and manufacturing. SAP and Oracle are common examples. Usually a system of record you write back to.
- **ETL / ELT:** Extract, Transform, Load: data is cleaned before it's loaded into the target. Extract, Load, Transform: raw data is loaded first and transformed inside the warehouse or lakehouse. ELT is common with modern cloud warehouses.
- **Eval (evaluation):** A repeatable test of an AI system's quality: a set of inputs, expected outputs or grading criteria, and a score. *FDE context:* evals turn "the demo looked good" into evidence. See [APPLIED_AI_IN_ENTERPRISE.md](APPLIED_AI_IN_ENTERPRISE.md).
- **Executive sponsor:** A senior customer leader who backs the project, removes blockers and cares about the business outcome.

## F

- **Feature flag:** A switch in code that turns a feature on or off without redeploying, often per user or customer. Useful for gradual rollouts and fast rollback.
- **FedRAMP:** A US government program that authorizes cloud services for use by federal agencies after a standardized security assessment.
- **FHIR (Fast Healthcare Interoperability Resources):** A healthcare data standard (from HL7) that defines resources like Patient and Observation and a REST API to exchange them.
- **Fine-tuning:** Further training an existing model on your own examples to change its behavior or style. Often less useful than better retrieval or prompting for adding company knowledge.

## G

- **GDPR (General Data Protection Regulation):** The EU's data protection law. It governs how personal data of people in the EU is collected, used, stored and transferred.
- **Golden record:** The single, trusted, merged version of an entity produced after entity resolution, such as one clean customer record combining three source systems.
- **Grounding:** Making an AI system base its answers on specific provided sources (and ideally cite them), rather than on what the model remembers.
- **Guardrails:** Checks around an AI system that block or correct unwanted inputs or outputs, such as filtering PII, refusing out-of-scope questions or validating output format.

## H

- **Hallucination:** When an AI model produces confident but false or unsupported content. Grounding, citations and evals reduce it; nothing eliminates it entirely.
- **HIPAA:** The US law that sets rules for protecting health information. Vendors handling such data for covered organizations typically sign a Business Associate Agreement (BAA).
- **Hot key (data skew):** One key (a customer, a store, a sensor) with far more data than others, so one worker or partition does most of the work and slows everything. Fixes include salting and repartitioning.
- **Hybrid search:** Combining keyword search (good for exact terms, IDs and names) with vector search (good for meaning), then merging the results.

## I

- **IAM (Identity and Access Management):** The policies and systems that control which identities can do which actions on which resources, especially in cloud platforms.
- **Idempotency:** An operation is idempotent if doing it twice has the same effect as doing it once. *FDE context:* writeback calls should carry an idempotency key so network retries never create duplicate orders or payments.
- **IdP (Identity Provider):** The system that authenticates users and tells other applications who they are, such as Okta or Microsoft Entra ID.
- **Infrastructure as code (IaC):** Defining servers, networks and permissions in version-controlled files (for example Terraform) instead of clicking in a console, so environments are repeatable and reviewable.
- **Ingestion:** Getting data from source systems into your platform, by API, CDC, file drops, streaming or database extracts.

## J

- **JWT (JSON Web Token):** A compact, signed token carrying claims (such as user ID and expiry). Signed means it can't be altered undetected; it is not encrypted by default, so don't put secrets in it.

## K

- **Kafka (Apache Kafka):** A distributed event streaming platform. Producers write events to topics, which are split into partitions, and consumers read them in order within each partition.
- **KPI (Key Performance Indicator):** A metric the business uses to judge success, such as on-time delivery rate or claims processed per day. *FDE context:* tie your work to the customer's KPIs, not to technical metrics.
- **Kubernetes (K8s):** A system for running and managing containers across a cluster of machines, handling scheduling, restarts, scaling and networking.

## L

- **Lakehouse:** An architecture that adds database features (ACID transactions, schemas, time travel) on top of files in a data lake, using open table formats such as Delta Lake or Apache Iceberg.
- **Least privilege:** Giving every user, service and token only the permissions it needs, and nothing more.
- **LLM (Large Language Model):** A model trained on large amounts of text to predict and generate text. The basis of chat assistants and many AI applications.
- **Loop (interview loop):** The full set of interviews in a hiring process, often a coding round, a decomp or design round, and behavioral rounds. See [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md).

## M

- **MCP (Model Context Protocol):** An open protocol, introduced by Anthropic, for connecting AI applications to external tools and data. An MCP server exposes tools, resources and prompts that any compatible client can use. See the [official site](https://modelcontextprotocol.io/) and [APPLIED_AI_IN_ENTERPRISE.md](APPLIED_AI_IN_ENTERPRISE.md).
- **Minto Pyramid:** A writing structure that puts the answer or recommendation first, then the supporting arguments, then the detail. Used for executive updates. See [CLIENT_DIPLOMACY_AND_SURVIVAL.md](CLIENT_DIPLOMACY_AND_SURVIVAL.md).
- **MSA (Master Services Agreement):** The umbrella contract between a vendor and a customer that sets general legal terms. Individual projects are then defined in SOWs under it.
- **mTLS (mutual TLS):** TLS where both sides present certificates, so the server verifies the client as well as the client verifying the server. Common for service-to-service traffic in zero-trust networks.

## N

- **NDA (Non-Disclosure Agreement):** A contract that forbids sharing specified confidential information. *FDE context:* never share interview questions or customer details covered by one.

## O

- **OAuth 2.0:** A standard for granting an application limited access to a resource on a user's behalf, using access tokens instead of sharing passwords. It's about authorization, not login.
- **Observability:** How well you can understand a running system from its outputs, mainly logs, metrics and traces.
- **OIDC (OpenID Connect):** An identity layer on top of OAuth 2.0 that adds login: the IdP returns an ID token (a JWT) describing who the user is. The usual choice for SSO in modern web apps. Compare SAML.
- **On-prem (on-premises):** Software running in the customer's own data centers rather than in a public cloud.
- **Ontology:** A model of a business's real-world objects (entities), their properties, relationships and the actions that can be taken on them. *FDE context:* modeling the ontology is central to decomposition; some platforms make it a first-class product concept.
- **Operator:** In FDE usage, the frontline person who makes the decision your software supports, such as a dispatcher, bed manager or fraud analyst.
- **Optimistic locking:** Preventing lost updates by storing a version number on each record and rejecting a write if the version changed since it was read. Suited to cases where conflicts are rare.
- **Outbox (transactional outbox):** A pattern where an application saves its data change and an "event to send" in the same database transaction, and a separate process reliably delivers the event to other systems. Avoids losing or inventing messages when one side fails.

## P

- **Parquet:** A columnar file format for analytical data. Reading only the needed columns makes queries much faster and storage smaller than CSV.
- **PHI (Protected Health Information):** Health information linked to an identifiable person, protected under HIPAA in the US.
- **Pilot:** A limited real-world deployment with actual users and data, used to prove value before a wider rollout. Usually bigger and more production-like than a POC.
- **PII (Personally Identifiable Information):** Data that can identify a person, such as name, email, phone number or national ID.
- **PKCE (Proof Key for Code Exchange):** An extension to the OAuth authorization code flow that stops stolen authorization codes from being used. Recommended for all clients, including browser and mobile apps.
- **POC (Proof of Concept):** A small, often throwaway build that shows an idea is technically feasible. *FDE context:* agree on success criteria before starting, or POCs drift forever.
- **Prompt injection:** An attack in which text in the input (a document, web page or email) contains instructions that trick an AI system into ignoring its rules or misusing tools.
- **Proxy:** A server that forwards traffic between clients and destinations. Many enterprises force outbound traffic through a proxy that inspects TLS by re-signing certificates with an internal CA. See [AIRGAP_SECURITY_AND_NETWORKING.md](AIRGAP_SECURITY_AND_NETWORKING.md).

## Q

- **Query plan:** The step-by-step strategy a database chooses to run a query (which indexes, which join method). View it with `EXPLAIN` to find out why a query is slow.

## R

- **RAG (Retrieval-Augmented Generation):** Retrieving relevant passages from your own documents and giving them to an LLM with the question, so the answer is grounded in those sources. See [APPLIED_AI_IN_ENTERPRISE.md](APPLIED_AI_IN_ENTERPRISE.md).
- **RBAC (Role-Based Access Control):** Permissions assigned to roles (such as Viewer, Editor, Admin), and users assigned to roles. Simple and common; ABAC handles finer-grained rules.
- **Reranking:** A second retrieval step where a more accurate (and slower) model reorders the top search results before they go to the LLM.
- **REST API:** A common style of web API using HTTP methods (GET, POST, PUT, DELETE) on resource URLs, usually with JSON.
- **Rollback:** Returning a system to a previous known-good version after a bad release. Should be tested before you need it.
- **Row-level security (RLS):** Database rules that restrict which rows each user can see, enforced in the database rather than in application code.
- **Runbook:** Step-by-step instructions for handling a known operational task or failure, written so someone else can follow them without you.

## S

- **Saga:** A way to run a multi-step business transaction across systems as a series of local steps, each with a *compensating* action to undo it if a later step fails. Used instead of distributed transactions.
- **SAML 2.0 (Security Assertion Markup Language):** An older, XML-based SSO standard in which the IdP sends a signed assertion about the user to the application. Still very common in large enterprises. Compare OIDC.
- **SBI (Situation–Behavior–Impact):** A feedback model: describe the situation, the specific behavior and its impact. See [SELF_ASSESSMENT_AND_FEEDBACK.md](SELF_ASSESSMENT_AND_FEEDBACK.md).
- **SBOM (Software Bill of Materials):** A list of all the components and dependencies in a piece of software, with versions. Security teams use it to check for known vulnerabilities.
- **SCIM (System for Cross-domain Identity Management):** A standard for automatically creating, updating and removing user accounts and groups in an application from the IdP.
- **Scope creep:** Gradual growth of a project's requirements beyond what was agreed, without a matching change in time or resources.
- **Secrets manager:** A service that stores and controls access to passwords, API keys and certificates, such as HashiCorp Vault or a cloud provider's secrets service. Keeps secrets out of code.
- **SFTP (SSH File Transfer Protocol):** Secure file transfer over SSH. Still a very common way enterprises send nightly data exports.
- **SLA (Service Level Agreement):** A contractual commitment to a level of service (such as 99.9% monthly availability), usually with penalties if missed.
- **SLI (Service Level Indicator):** A measured number describing service behavior, such as the percentage of requests served successfully in under 300 ms.
- **SLO (Service Level Objective):** An internal target for an SLI over a time window, such as 99.5% of requests under 300 ms over 30 days. Usually set stricter than the SLA.
- **SOC 2:** An audit report (under AICPA standards) on a service organization's security and related controls. Type I checks the design at a point in time; Type II checks the controls operated over a period. Enterprise customers often ask vendors for it.
- **SoR (System of Record):** The authoritative source for a given piece of data, such as the ERP for purchase orders. *FDE context:* your app usually reads from and writes back to the SoR rather than replacing it.
- **SOW (Statement of Work):** A document defining a specific project's scope, deliverables, timeline and price, usually under an MSA.
- **SSO (Single Sign-On):** Logging in once with a central identity provider and gaining access to many applications. Implemented with SAML or OIDC.
- **STAR (Situation, Task, Action, Result):** A structure for answering behavioral interview questions. Spend most of the answer on Action, and say "I," not "we." The app's Story bank uses it.
- **Streaming:** Processing data continuously as events arrive, with low delay, rather than in batches.

## T

- **TLS (Transport Layer Security):** The encryption protocol behind HTTPS. It encrypts traffic and lets clients verify a server's identity through its certificate.
- **Token (LLM):** The unit of text an LLM processes, often a word or part of a word. Context limits and pricing are usually measured in tokens.
- **Tool calling (function calling):** A model capability where the LLM outputs a structured request to call a defined function or API, which the application then executes and returns results for.
- **Two-phase commit (2PC):** A protocol in which a coordinator asks all participants to prepare, then to commit, so a distributed transaction completes everywhere or nowhere. Most legacy enterprise systems and SaaS APIs don't support it, so sagas are used instead.

## U

- **UAT (User Acceptance Testing):** Testing by the actual business users to confirm the system meets their needs before go-live.
- **Upsert:** An operation that inserts a record if it doesn't exist and updates it if it does. A building block for idempotent pipelines.
- **UTC (Coordinated Universal Time):** The global time standard. Store timestamps in UTC and convert to local time only for display.

## V

- **Vector database:** A database built to store embeddings and quickly find the vectors closest to a query vector. Many general-purpose databases now offer vector search too.
- **VPC (Virtual Private Cloud):** An isolated private network inside a public cloud, where you control IP ranges, subnets, routing and firewall rules.
- **VPN (Virtual Private Network):** An encrypted tunnel that makes a remote device or network behave as if it's on a private network.

## W

- **Watermark:** In stream processing, a moving estimate of event time that tells the system how long to wait for late events before finalizing a time window.
- **Window function:** A SQL function that computes over a set of rows related to the current row, such as a running total or rank, using `OVER (PARTITION BY ... ORDER BY ...)`, without collapsing rows like `GROUP BY` does.
- **Writeback:** Sending a user's decision or action from your application back into the customer's system of record, such as creating a purchase order in the ERP. *FDE context:* designs without writeback tend to become dashboards nobody acts on. Needs idempotency, approvals and audit.

## Z

- **Zero trust:** A security model that grants no implicit trust based on network location. Every request is authenticated, authorized and encrypted, whether it comes from inside or outside the corporate network. NIST SP 800-207 describes the architecture.
