# Curated FDE Media and Reading List

A vetted index of essential YouTube lectures, engineering blog posts, conference talks, and Medium articles for learning Forward Deployed Engineering from scratch to principal.

---

## 1. Foundational Forward Deployed Engineering & Philosophy

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[What is a Forward Deployed Software Engineer (FDSE) at Palantir?](https://blog.palantir.com/what-is-a-forward-deployed-software-engineer-fdse-at-palantir-12db5bf0d41d)** | Article | Palantir Engineering Blog | The canonical definition of the forward deployed engineering role, covering ownership, customer empathy, and the loop of deploying into enterprise ambiguity. |
| **[What Does a Forward Deployed Engineer Actually Do?](https://towardsdatascience.com/what-does-a-forward-deployed-engineer-actually-do-d096c1da4b7b)** | Article | Towards Data Science | In-depth breakdown of the hybrid FDE persona: combining software engineering velocity, solutions architecture, and management consulting discovery. |
| **[Ontology as Code: Software Engineering Principles for Enterprise Data](https://blog.palantir.com/ontology-as-code-software-engineering-principles-for-enterprise-data-ab0b59b5d27b)** | Article | Palantir Blog | How Palantir models messy customer data into typed operational ontologies, versioned objects, and action writebacks. |
| **[Palantir AIP: Artificial Intelligence Platform Walkthrough](https://www.youtube.com/watch?v=XEM5hz__H10)** | Video | YouTube (Palantir) | Concrete architectural walkthrough showing how LLMs connect directly to enterprise ontologies, business logic tools, and governance controls. |

---

## 2. System Decomposition, Architecture & Writeback

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[Transactions: Myths, Surprises and Opportunities](https://www.youtube.com/watch?v=5ZjhNTM8XU8)** | Video | YouTube (Martin Kleppmann) | Author of *Designing Data-Intensive Applications* explores serializability, weak isolation levels, ACID guarantees, and distributed consensus. |
| **[Managing Data Consistency in Microservices with Sagas](https://www.youtube.com/watch?v=YPbGW3Ys4L0)** | Video | YouTube (Chris Richardson) | Choreography vs orchestration sagas, compensating transactions, and handling partial failures across external customer systems. |
| **[System Design: Scaling from Zero to Millions of Users](https://www.youtube.com/watch?v=i53Gi_K3o7I)** | Video | YouTube (ByteByteGo) | Caching layers, read replicas, database sharding, horizontal scaling, and decoupling architectures with asynchronous message queues. |
| **[Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html)** | Article | Martin Fowler Bliki | The industry-standard pattern for safely and incrementally replacing a monolithic legacy customer system with modern microservices. |
| **[Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)** | Article | Martin Fowler Bliki | Capturing all changes to an application state as an immutable sequence of events — essential for financial and operational audit writeback. |
| **[Designing Robust and Predictable APIs with Idempotency](https://stripe.com/blog/idempotency)** | Article | Stripe Engineering Blog | How Stripe uses idempotency keys and atomic database deduplication to prevent double-charges and duplicate mutations during retries. |
| **[Cloud Design Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)** | Guide | Azure Architecture Center | Reference blueprints for circuit breakers, compensating transactions, ambassador proxies, and CQRS in enterprise systems. |

---

## 3. Distributed Data, SQL & Lakehouse Internals

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[Apache Spark Core Optimization & Memory Management](https://www.youtube.com/watch?v=daXEp4HmS-E)** | Video | YouTube (Databricks) | Daniel Tomes walks through executor memory layout, shuffle partitions, data serialization, and task skew diagnostics under heavy load. |
| **[Adaptive Query Execution (AQE) in Spark SQL](https://www.databricks.com/blog/2020/05/29/adaptive-query-execution-speeding-up-spark-sql-at-runtime.html)** | Article | Databricks Engineering Blog | How modern lakehouse engines automatically coalesce shuffle partitions, convert sort-merge joins to broadcast joins, and mitigate skew at runtime. |
| **[Debezium Documentation](https://debezium.io/documentation/reference/stable/)** | Docs | Debezium.io | Log-based Change Data Capture (CDC) for streaming every insert, update, and delete from enterprise databases into Kafka and lakehouses. |
| **[Event-Driven Architecture and Streaming Patterns](https://developer.confluent.io/patterns/)** | Guide | Confluent Developer | Real-world streaming patterns: dead-letter queues, exactly-once stream processing, deduplication, and stateful event windows. |
| **[DuckDB Documentation](https://duckdb.org/docs/)** | Docs | DuckDB.org | The fast in-process OLAP engine for parsing, slicing, and querying gigabytes of raw CSV/Parquet exports on your local laptop without cloud infrastructure. |
| **[Great Expectations Documentation](https://docs.greatexpectations.io/)** | Docs | Great Expectations | Automated data assertion suites, profiling, and quality reports that catch schema drift before bad rows reach production. |

---

## 4. Applied AI, Agents & Production RAG

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[State of GPT](https://www.youtube.com/watch?v=bZQun8Y4L2A)** | Video | YouTube (Andrej Karpathy) | The foundational breakdown of pretraining, supervised finetuning (SFT), RLHF, and prompt engineering principles for production systems. |
| **[Let's build GPT: from scratch, in code](https://www.youtube.com/watch?v=kCc8FmEb1nY)** | Video | YouTube (Andrej Karpathy) | The clearest code-level explainer of tokenization, attention mechanisms, embeddings, and autoregressive generation. |
| **[LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)** | Article | Lilian Weng | The definitive architectural breakdown of planning, memory systems (short-term & long-term), and tool use in agentic workflows. |
| **[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)** | Article | Anthropic Engineering | Practical guide on when to use deterministic workflows vs autonomous agents, and why simplicity consistently wins in enterprise production. |
| **[Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/)** | Article | Hamel Husain | How to build the automated evaluation harness that proves reliability to customer CISOs and gets AI pilots into production. |
| **[Model Context Protocol (MCP)](https://modelcontextprotocol.io/)** | Docs | Anthropic / MCP | The open protocol for exposing customer databases and legacy enterprise APIs to LLMs as secure tools and data sources. |

---

## 5. Linux, Networks, Security & Air-Gap

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[How Reverse Proxies Actually Work](https://www.youtube.com/watch?v=uK79gV04VdQ)** | Video | YouTube (Hussein Nasser) | In-depth breakdown of L4 vs L7 reverse proxying, TLS termination, header rewriting, keep-alive, and connection pooling. |
| **[OAuth 2.0 and OpenID Connect in Plain English](https://www.youtube.com/watch?v=996OiexHze0)** | Video | YouTube (Nate Barbettini) | The clearest visual explanation of identity vs authorization, scopes, tokens, and SSO redirect loops on customer networks. |
| **[Systems Performance: Enterprise and Cloud](https://www.youtube.com/watch?v=1b_r_N7B_hI)** | Video | YouTube (Brendan Gregg) | Performance methodologies and tooling for troubleshooting CPU, memory, disk I/O, and network bottlenecks under pressure. |
| **[Everything You Should Know About Certificates and mTLS](https://smallstep.com/hello-mtls/)** | Guide | Smallstep | Public key infrastructure, x509 cert chains, private CAs, and mutual TLS for zero-trust service-to-service communication. |
| **[SAML 2.0 Technical Overview](https://www.pingidentity.com/en/resources/identity-fundamentals/authentication-authorization-standards/saml.html)** | Guide | Ping Identity | The legacy SSO protocol still powering Fortune 500 enterprises, government agencies, and healthcare systems. |
| **[Exponential Backoff And Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)** | Article | AWS Architecture Blog | Why naive retries cause thundering herds in client VPCs and how full jitter prevents cascading service outages. |

---

## 6. Client Diplomacy & High-Stakes Communication

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[Never Split The Difference \| Talks at Google](https://www.youtube.com/watch?v=guZa7mQV1l0)** | Video | YouTube (Chris Voss) | Former FBI hostage negotiator explains tactical empathy, mirroring, labeling negative emotions, and negotiating high-stakes deadlines. |
| **[The Mom Test](https://www.momtestbook.com/)** | Book | Rob Fitzpatrick | How to talk to customers and learn if your software solves a real problem when everyone is lying to be polite. |
| **[The Pyramid Principle](https://openlibrary.org/search?q=The%20Pyramid%20Principle%20Minto)** | Book | Barbara Minto | Logic in writing and thinking: leading with the answer first in executive readouts and steering committee emails. |
| **[Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)** | Guide | Google Cloud | Operational excellence, reliability, cost optimization, and security principles that enterprise architects evaluate you against. |

---

## 7. Interview Preparation

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[System Design Interview Fundamentals](https://www.youtube.com/watch?v=kYFp6Y0n-jQ)** | Video | YouTube (ByteByteGo) | How to structure a 45-minute technical system design or decomposition interview without getting lost in implementation weeds. |
| **[System Design Interview Guide](https://techinterviewhandbook.org/system-design/)** | Guide | Tech Interview Handbook | Comprehensive step-by-step framework for requirements gathering, capacity estimation, API design, and trade-off defense. |
| **[Behavioral Interviews Guide](https://www.techinterviewhandbook.org/behavioral-interview/)** | Guide | Tech Interview Handbook | Mastering the STAR format for client-facing and ownership behavioral questions in enterprise engineering loops. |
