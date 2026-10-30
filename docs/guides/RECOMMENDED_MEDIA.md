# Curated FDE Media and Reading List

A vetted index of lectures, full courses, conference talks, engineering articles and books for learning Forward Deployed Engineering from scratch to principal.

Every link here was checked by hand; videos were confirmed by title against YouTube's oEmbed endpoint, because YouTube returns a normal page even for deleted videos. If you find a dead link, please [open an issue](https://github.com/mchittineni/fde-from-scratch/issues/new/choose). New to the field? Start with [START_HERE_ZERO_TO_FDE.md](START_HERE_ZERO_TO_FDE.md) for the order to work through this list.

---

## 1. Understanding the Role

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[The Role of a Forward Deployed Software Engineer](https://www.youtube.com/watch?v=5OYy_UtINo4)** | Video | YouTube (Palantir) | Engineers who do the job describe it in their own words. Watch before deciding whether this career is for you. |
| **[A Day in the Life of a Palantir Forward Deployed Software Engineer](https://blog.palantir.com/a-day-in-the-life-of-a-forward-deployed-software-engineer-45ef2de257b1)** | Article | Palantir Blog | Building many capabilities for one customer instead of one capability for many, and why the fast feedback loop is the draw. |
| **[Forward Deployed Engineers](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)** | Article | The Pragmatic Engineer | Why companies hire FDEs, how the role differs between them, and what the work looks like day to day. |
| **[WTF is a forward deployed engineer?](https://posthog.com/blog/forward-deployed-engineer)** | Article | PostHog Blog | A plain-spoken explainer of the role and how it differs from sales engineering. |
| **[Introducing Palantir AIP: Capabilities and Product Demo](https://www.youtube.com/watch?v=Xt_RLNx1eBM)** | Video | YouTube (Palantir) | How LLMs connect to an operational ontology, business logic tools and governance controls. |
| **[Palantir Ontology Overview](https://www.youtube.com/watch?v=YDAxITCNcko)** | Video | YouTube (Palantir) | Objects, links and actions as a model of an operational business — the entity-first thinking decomp rounds reward. |

---

## 2. Start From Zero: Programming, SQL and the Command Line

If you have never programmed, do these before anything else. All are free.

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[CS50x: Introduction to Computer Science](https://cs50.harvard.edu/x/)** | Lectures + course | Harvard | The best free first course: C, Python, SQL and the web, with full lecture videos and graded problem sets. |
| **[CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/)** | Lectures + course | Harvard | From zero to writing, testing and debugging real Python — the default FDE prototyping language. |
| **[Learn Python — Full Course for Beginners](https://www.youtube.com/watch?v=rfscVS0vtbw)** | Video | YouTube (freeCodeCamp) | One long type-along lecture from variables to classes. |
| **[Automate the Boring Stuff with Python](https://automatetheboringstuff.com/)** | Book (free online) | Al Sweigart | Files, spreadsheets, PDFs and scraping — the glue scripts of your first week at a customer. |
| **[The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)** | Lectures | MIT | Shell, editors, git, debugging and profiling: the tooling fluency nobody teaches. |
| **[SQL Tutorial — Full Database Course for Beginners](https://www.youtube.com/watch?v=HXV3zeQKqGY)** | Video | YouTube (freeCodeCamp) | Tables, keys, joins and subqueries in one sitting. |
| **[SQLBolt](https://sqlbolt.com/)** and **[Select Star SQL](https://selectstarsql.com/)** | Interactive | — | Practise queries in the browser until joins and aggregations feel automatic. |
| **[OverTheWire: Bandit](https://overthewire.org/wargames/bandit/)** | Game | OverTheWire | Levels played entirely over SSH. The fastest way to get calm in a remote shell. |
| **[Learn Git Branching](https://learngitbranching.js.org/)** | Interactive | — | Visual sandbox for branches, rebases and cherry-picks. |

---

## 3. University Lectures and Full Courses

Free, complete courses with recorded lectures. Pick the one that matches your weakest pillar; you do not need all of them.

| Course | Pillar | Level | Why it matters for an FDE |
| --- | --- | --- | --- |
| **[MIT 6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)** | Software engineering | Core | The data structures and complexity that live-coding rounds expect. |
| **[CMU 15-445/645 Intro to Database Systems](https://15445.courses.cs.cmu.edu/)** | Data | Deep | Storage, indexes, query execution, concurrency and recovery — why the customer database behaves as it does. |
| **[MIT 6.5840 (6.824) Distributed Systems](https://pdos.csail.mit.edu/6.824/)** | Infra / decomp | Deep | Replication, consensus and fault tolerance, with papers and labs. Start with [Lecture 1](https://www.youtube.com/watch?v=cQP8WApzIQQ). |
| **[Data Engineering Zoomcamp](https://github.com/DataTalksClub/data-engineering-zoomcamp)** | Data | Core | Project-based: containers, orchestration, warehouses, batch and streaming. |
| **[Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)** | Applied AI | Start | Classical ML fundamentals, so you can tell when a problem does not need an LLM. |
| **[Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)** | Applied AI | Deep | Backpropagation to a working GPT, built in code by Andrej Karpathy. |
| **[Hugging Face LLM Course](https://huggingface.co/learn/llm-course)** | Applied AI | Core | Tokenizers, transformers, fine-tuning and open-weight models for customers who cannot use a hosted API. |
| **[Practical Deep Learning for Coders](https://course.fast.ai/)** | Applied AI | Deep | Top-down deep learning: train useful models first, theory second. |
| **[PortSwigger Web Security Academy](https://portswigger.net/web-security)** | Security | Core | Free hands-on labs for injection, access control, SSRF and authentication flaws. |
| **[Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials)** | Infra | Core | Infrastructure as code on AWS, Azure and GCP. |
| **[Google Technical Writing](https://developers.google.com/tech-writing)** | Client diplomacy | Start | Short courses on clear sentences and documents. Most of an FDE's influence travels as writing. |

---

## 4. System Decomposition, Architecture and Writeback

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[20 System Design Concepts Explained in 10 Minutes](https://www.youtube.com/watch?v=i53Gi_K3o7I)** | Video | YouTube (NeetCode) | A fast vocabulary pass: caching, replication, sharding, load balancing, queues and consistency. |
| **[Transactions: Myths, Surprises and Opportunities](https://www.youtube.com/watch?v=5ZjhNTM8XU8)** | Video | YouTube (Strange Loop, Martin Kleppmann) | Isolation levels, ACID in practice and what "consistent" really means. |
| **[Using Sagas to Maintain Data Consistency in a Microservice Architecture](https://www.youtube.com/watch?v=YPbGW3Fnmbc)** | Video | YouTube (Devoxx, Chris Richardson) | Choreography vs orchestration, compensating transactions and partial failure across systems. |
| **[Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html)** | Article | Martin Fowler | Incrementally replacing a legacy customer system without a big-bang cutover. |
| **[Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)** | Article | Martin Fowler | Recording every change as an event — useful for financial and operational audit trails. |
| **[Designing Robust and Predictable APIs with Idempotency](https://stripe.com/blog/idempotency)** | Article | Stripe Engineering | Idempotency keys and safe retries that prevent duplicate writes. |
| **[Cloud Design Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)** | Guide | Azure Architecture Center | Circuit breakers, compensating transactions, ambassadors and CQRS. |
| **[Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)** | Guide | Hohpe & Woolf | The messaging vocabulary legacy integrations are built on. |
| **[The C4 Model](https://c4model.com/)** | Guide | Simon Brown | A simple way to draw a decomp that engineers and executives can both read. |
| **[Architecture Decision Records](https://adr.github.io/)** | Guide | ADR GitHub org | Record why each design choice was made, for the team that inherits it. |

---

## 5. Distributed Data, SQL and Lakehouse Internals

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[Apache Spark Core — Deep Dive — Proper Optimization](https://www.youtube.com/watch?v=daXEp4HmS-E)** | Video | YouTube (Databricks, Daniel Tomes) | Executor memory, shuffle partitions and skew diagnostics under heavy load. |
| **[Adaptive Query Execution in Spark SQL](https://www.databricks.com/blog/2020/05/29/adaptive-query-execution-speeding-up-spark-sql-at-runtime.html)** | Article | Databricks Blog | How the engine coalesces partitions, switches join strategies and mitigates skew at runtime. |
| **[Debezium Documentation](https://debezium.io/documentation/reference/stable/)** | Docs | Debezium | Log-based change data capture from enterprise databases into Kafka and lakehouses. |
| **[Event-Driven Architecture and Streaming Patterns](https://developer.confluent.io/patterns/)** | Guide | Confluent Developer | Dead-letter queues, exactly-once processing, deduplication and windowing. |
| **[DuckDB Documentation](https://duckdb.org/docs/)** | Docs | DuckDB | Query gigabytes of CSV or Parquet exports on a laptop. |
| **[Great Expectations Documentation](https://docs.greatexpectations.io/)** | Docs | Great Expectations | Data assertions and quality reports that catch schema drift. |
| **[dbt Documentation](https://docs.getdbt.com/docs/introduction)** | Docs | dbt Labs | Version-controlled SQL transformations with tests and lineage. |

---

## 6. Applied AI, Agents and Production RAG

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g)** | Video | YouTube (Andrej Karpathy) | One hour, no maths: what an LLM is, how it is trained, where it fails, and its security issues. |
| **[Large Language Models Explained Briefly](https://www.youtube.com/watch?v=LPZh9BOjkQs)** | Video | YouTube (3Blue1Brown) | A short visual explanation you can reuse with non-technical sponsors. |
| **[State of GPT](https://www.youtube.com/watch?v=bZQun8Y4L2A)** | Video | YouTube (Microsoft Build, Andrej Karpathy) | Pretraining, fine-tuning, RLHF and practical prompting. |
| **[Deep Dive into LLMs like ChatGPT](https://www.youtube.com/watch?v=7xTGNNLPyMI)** | Video | YouTube (Andrej Karpathy) | Long general-audience lecture on training, hallucinations, tool use and reasoning models. |
| **[Let's Build GPT: From Scratch, in Code](https://www.youtube.com/watch?v=kCc8FmEb1nY)** | Video | YouTube (Andrej Karpathy) | Tokenization, attention and autoregressive generation, written line by line. |
| **[How We Build Effective Agents](https://www.youtube.com/watch?v=D7_ipDqhtwk)** | Video | YouTube (AI Engineer, Barry Zhang of Anthropic) | When not to build an agent, and how to keep agents simple. |
| **[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)** | Article | Anthropic Engineering | Workflows vs agents, and why simple composable patterns win in production. |
| **[Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)** | Article | Anthropic | Contextual chunking, hybrid BM25 + embeddings and reranking — a concrete RAG baseline. |
| **[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)** | Article | Jay Alammar | The clearest visual walkthrough of attention. |
| **[LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)** | Article | Lilian Weng | Planning, memory and tool use in agent systems. |
| **[Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/)** | Article | Hamel Husain | Building the evaluation harness that gets AI pilots into production. |
| **[Patterns for Building LLM-based Systems](https://eugeneyan.com/writing/llm-patterns/)** | Article | Eugene Yan | Evals, RAG, guardrails, caching and feedback loops. |
| **[Model Context Protocol](https://modelcontextprotocol.io/)** | Docs | MCP | The open protocol for exposing customer systems to LLMs as tools and data sources. |
| **[OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)** | Guide | OWASP | Prompt injection, data leakage and excessive agency — what a CISO will ask about. |

---

## 7. Linux, Networks, Security and Air-Gap

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[Proxy vs. Reverse Proxy (Explained by Example)](https://www.youtube.com/watch?v=ozhe__GdWC8)** | Video | YouTube (Hussein Nasser) | Forward vs reverse proxies, TLS termination, load balancing and caching. |
| **[OAuth 2.0 and OpenID Connect (in Plain English)](https://www.youtube.com/watch?v=996OiexHze0)** | Video | YouTube (OktaDev, Nate Barbettini) | Identity vs authorization, scopes, tokens and SSO redirect loops. |
| **[Linux Systems Performance — LISA19](https://www.youtube.com/watch?v=fhBHvsi0Ql0)** | Video | YouTube (USENIX, Brendan Gregg) | Methodologies and tools for CPU, memory, disk and network bottlenecks. |
| **[How DNS Works](https://howdns.works/)** | Comic | DNSimple | Resolution, caching and authoritative servers in a friendly illustrated form. |
| **[Implement DNS in a Weekend](https://implement-dns.wizardzines.com/)** | Guide | Julia Evans | Build a toy resolver in Python. |
| **[The Illustrated TLS 1.3 Connection](https://tls13.xargs.org/)** | Article | xargs.org | Every byte of a TLS handshake, explained. |
| **[Everything You Should Know About Certificates and mTLS](https://smallstep.com/hello-mtls/)** | Guide | Smallstep | PKI, certificate chains, private CAs and mutual TLS. |
| **[SAML 2.0 Technical Overview](https://www.pingidentity.com/en/resources/identity-fundamentals/authentication-authorization-standards/saml.html)** | Guide | Ping Identity | The SSO protocol still common in large enterprises, government and healthcare. |
| **[OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)** | Guide | OWASP | Concise guidance on auth, sessions, secrets, logging and input validation. |
| **[Exponential Backoff and Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)** | Article | AWS Architecture Blog | Why naive retries cause thundering herds and how jitter prevents them. |
| **[The Amazon Builders' Library](https://aws.amazon.com/builders-library/)** | Articles | AWS | Timeouts, retries, load shedding and safe deployments, from the engineers who run them. |

---

## 8. Client Diplomacy and High-Stakes Communication

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[Never Split the Difference — Talks at Google](https://www.youtube.com/watch?v=guZa7mQV1l0)** | Video | YouTube (Talks at Google, Chris Voss) | Tactical empathy, mirroring, labeling and calibrated questions. |
| **[The Mom Test](https://www.momtestbook.com/)** | Book | Rob Fitzpatrick | How to learn what customers actually need when everyone is being polite. |
| **[The Pyramid Principle](https://openlibrary.org/search?q=The%20Pyramid%20Principle%20Minto)** | Book | Barbara Minto | Lead with the answer in executive readouts and steering-committee emails. |
| **[The Trusted Advisor](https://openlibrary.org/search?q=The%20Trusted%20Advisor%20Maister)** | Book | Maister, Green & Galford | How credibility and intimacy, not cleverness, build client trust. |
| **[Getting to Yes](https://openlibrary.org/search?q=Getting%20to%20Yes%20Fisher%20Ury)** | Book | Fisher & Ury | Interests over positions — the basis of every scope negotiation. |
| **[Great Demo!](https://openlibrary.org/search?q=Great%20Demo%20Cohan)** | Book | Peter Cohan | Show the result first, then how you got there. |
| **[The Personal MBA](https://openlibrary.org/search?q=The%20Personal%20MBA%20Kaufman)** | Book | Josh Kaufman | Business vocabulary in plain language. See also [BUSINESS_ACUMEN_AND_DOMAINS.md](BUSINESS_ACUMEN_AND_DOMAINS.md). |

---

## 9. Interview Preparation

| Title | Type | Source | Description |
| --- | --- | --- | --- |
| **[System Design Interview: A Step-By-Step Guide](https://www.youtube.com/watch?v=i7twT3x5yv8)** | Video | YouTube (ByteByteGo) | Structuring an open-ended design round without getting lost in the weeds. |
| **[System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction)** | Guide | Hello Interview | A compact framework, core concepts and common patterns. |
| **[System Design Interview Guide](https://interviewing.io/guides/system-design-interview)** | Guide | interviewing.io | Long-form guide with a step-by-step approach and common pitfalls. |
| **[Tech Interview Handbook](https://www.techinterviewhandbook.org/)** | Guide | Yangshun Tay | Coding, behavioral, résumé and negotiation guides in one place. |
| **[NeetCode Roadmap](https://neetcode.io/roadmap)** | Course | NeetCode | A pattern-ordered problem list for the coding round. |

See [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md) for how to combine these with the app's Labs.

---

## 10. Channels and Writers Worth Following

| Who | Where | Why |
| --- | --- | --- |
| Andrej Karpathy | [YouTube](https://www.youtube.com/@AndrejKarpathy) | The clearest explanations of how LLMs work. |
| Hussein Nasser | [YouTube](https://www.youtube.com/@hnasr) | Backend, proxies, databases and protocols in depth. |
| ByteByteGo | [YouTube](https://www.youtube.com/@ByteByteGo) | Short, visual system-design explainers. |
| CMU Database Group | [YouTube](https://www.youtube.com/@CMUDatabaseGroup) | Full database lecture series and seminar talks. |
| Julia Evans | [jvns.ca](https://jvns.ca/) and [Wizard Zines](https://wizardzines.com/) | Networking, Linux and debugging made approachable. |
| Sam Rose | [samwho.dev](https://samwho.dev/) | Interactive visual essays on load balancing, hashing and memory. |
