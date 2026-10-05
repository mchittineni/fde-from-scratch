// Curated learning library. Every entry links to the canonical source.
// topic → which skill area it trains; level → Start (from zero), Core (job-ready), Deep (senior+).

export const resourceTopics = [
  { id: 'velocity', name: 'Ship fast', pillar: 'software_engineering' },
  { id: 'data', name: 'Data & SQL', pillar: 'data_ai_infra' },
  { id: 'ai', name: 'Applied AI', pillar: 'data_ai_infra' },
  { id: 'infra', name: 'Linux, networks & cloud', pillar: 'enterprise_security' },
  { id: 'security', name: 'Identity & security', pillar: 'enterprise_security' },
  { id: 'decomp', name: 'Decomp & system design', pillar: 'decomp_problem_solving' },
  { id: 'diplomacy', name: 'Client & communication', pillar: 'client_diplomacy' },
  { id: 'interview', name: 'Interview prep', pillar: null }
];

const book = (q) => `https://openlibrary.org/search?q=${encodeURIComponent(q)}`;

export const resources = [
  // ---- Ship fast ----
  { id: 'r-missing', topic: 'velocity', level: 'Start', type: 'Course', free: true, title: 'The Missing Semester of Your CS Education (MIT)', url: 'https://missing.csail.mit.edu/', why: 'Shell, editors, git, debugging — the tooling fluency you need on an unfamiliar laptop.' },
  { id: 'r-progit', topic: 'velocity', level: 'Start', type: 'Book', free: true, title: 'Pro Git', url: 'https://git-scm.com/book/en/v2', why: 'Branching, rebasing and recovery without panic on a customer repo.' },
  { id: 'r-fastapi', topic: 'velocity', level: 'Start', type: 'Docs', free: true, title: 'FastAPI tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', why: 'The quickest route from zero to a typed, documented API for a prototype.' },
  { id: 'r-mdn', topic: 'velocity', level: 'Start', type: 'Docs', free: true, title: 'MDN: Learn web development', url: 'https://developer.mozilla.org/en-US/docs/Learn', why: 'HTML, CSS and JavaScript fundamentals for shipping thin UIs over data.' },
  { id: 'r-docker', topic: 'velocity', level: 'Start', type: 'Docs', free: true, title: 'Docker: Get started', url: 'https://docs.docker.com/get-started/', why: 'Containerize anything you build so it runs the same in their environment.' },
  { id: 'r-12factor', topic: 'velocity', level: 'Core', type: 'Guide', free: true, title: 'The Twelve-Factor App', url: 'https://12factor.net/', why: 'Config, logs and processes done in a way ops teams will accept.' },
  { id: 'r-pragprog', topic: 'velocity', level: 'Core', type: 'Book', free: false, title: 'The Pragmatic Programmer', url: book('The Pragmatic Programmer'), why: 'Tracer bullets, prototypes and ownership — the FDE mindset in book form.' },

  // ---- Data & SQL ----
  { id: 'r-sqlbolt', topic: 'data', level: 'Start', type: 'Course', free: true, title: 'SQLBolt', url: 'https://sqlbolt.com/', why: 'Interactive SQL from zero in an afternoon.' },
  { id: 'r-luke', topic: 'data', level: 'Core', type: 'Book', free: true, title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', why: 'Why a query is slow and which index fixes it — a staple of data-focused interviews.' },
  { id: 'r-pgexplain', topic: 'data', level: 'Core', type: 'Docs', free: true, title: 'PostgreSQL: Using EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html', why: 'Read query plans the way you will on a customer database.' },
  { id: 'r-polars', topic: 'data', level: 'Start', type: 'Docs', free: true, title: 'Polars user guide', url: 'https://docs.pola.rs/', why: 'Fast dataframe wrangling for the messy CSV exports customers hand you.' },
  { id: 'r-ddia', topic: 'data', level: 'Deep', type: 'Book', free: false, title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', why: 'Replication, partitioning and consistency — the shared vocabulary of most system design rounds.' },
  { id: 'r-spark', topic: 'data', level: 'Core', type: 'Docs', free: true, title: 'Apache Spark documentation', url: 'https://spark.apache.org/docs/latest/', why: 'Shuffles, partitions and the SQL engine behind most enterprise lakehouses.' },
  { id: 'r-delta', topic: 'data', level: 'Core', type: 'Docs', free: true, title: 'Delta Lake documentation', url: 'https://docs.delta.io/', why: 'ACID tables on object storage; core to Databricks deployments.' },
  { id: 'r-iceberg', topic: 'data', level: 'Core', type: 'Docs', free: true, title: 'Apache Iceberg documentation', url: 'https://iceberg.apache.org/docs/latest/', why: 'An open table format supported by Snowflake, Databricks and most modern query engines.' },
  { id: 'r-kafka', topic: 'data', level: 'Core', type: 'Docs', free: true, title: 'Apache Kafka: introduction', url: 'https://kafka.apache.org/intro', why: 'Event streaming and CDC — how real-time customer data actually arrives.' },
  { id: 'r-fde-book', topic: 'data', level: 'Core', type: 'Book', free: false, title: 'Fundamentals of Data Engineering', url: book('Fundamentals of Data Engineering Reis Housley'), why: 'The full data lifecycle from ingestion to serving, vendor-neutral.' },

  // ---- Applied AI ----
  { id: 'r-claude-docs', topic: 'ai', level: 'Start', type: 'Docs', free: true, title: 'Claude developer docs', url: 'https://docs.claude.com/', why: 'Messages API, tool use, prompt caching and structured outputs.' },
  { id: 'r-agents', topic: 'ai', level: 'Core', type: 'Article', free: true, title: 'Building effective agents (Anthropic)', url: 'https://www.anthropic.com/engineering/building-effective-agents', why: 'When to use workflows vs agents — and why simple usually wins in production.' },
  { id: 'r-mcp', topic: 'ai', level: 'Core', type: 'Docs', free: true, title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/', why: 'An open protocol for exposing a customer system to an LLM as tools and data sources.' },
  { id: 'r-cookbook', topic: 'ai', level: 'Start', type: 'Guide', free: true, title: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/', why: 'Worked examples for RAG, function calling and evaluation.' },
  { id: 'r-evals', topic: 'ai', level: 'Core', type: 'Article', free: true, title: 'Your AI product needs evals (Hamel Husain)', url: 'https://hamel.dev/blog/posts/evals/', why: 'How to build the eval harness that gets a pilot past the CISO and into production.' },
  { id: 'r-llm-patterns', topic: 'ai', level: 'Core', type: 'Article', free: true, title: 'Patterns for building LLM-based systems (Eugene Yan)', url: 'https://eugeneyan.com/writing/llm-patterns/', why: 'Evals, RAG, guardrails, caching and feedback loops in one map.' },
  { id: 'r-aieng', topic: 'ai', level: 'Deep', type: 'Book', free: false, title: 'AI Engineering (Chip Huyen)', url: book('AI Engineering Chip Huyen'), why: 'Building production applications on foundation models, end to end.' },
  { id: 'r-owasp-llm', topic: 'ai', level: 'Core', type: 'Guide', free: true, title: 'OWASP Top 10 for LLM Applications', url: 'https://genai.owasp.org/llm-top-10/', why: 'Prompt injection, data leakage and the risks every security review will raise.' },
  { id: 'r-presidio', topic: 'ai', level: 'Core', type: 'Tool', free: true, title: 'Microsoft Presidio', url: 'https://microsoft.github.io/presidio/', why: 'PII detection and redaction before data reaches a model.' },
  { id: 'r-ultimate-ai', topic: 'ai', level: 'Start', type: 'Guide', free: true, title: 'Ultimate AI Engineering Guide', url: 'https://github.com/mchittineni/ultimate-ai-engineering-guide', why: 'Companion guide: the applied AI stack from LLM basics to production.' },

  // ---- Linux, networks & cloud ----
  { id: 'r-gregg', topic: 'infra', level: 'Core', type: 'Guide', free: true, title: 'Linux Performance (Brendan Gregg)', url: 'https://www.brendangregg.com/linuxperf.html', why: 'The observability tool map for triaging a sick server under pressure.' },
  { id: 'r-zines', topic: 'infra', level: 'Start', type: 'Guide', free: true, title: 'Wizard Zines (Julia Evans)', url: 'https://wizardzines.com/', why: 'Friendly, dense explainers on DNS, HTTP, networking and debugging.' },
  { id: 'r-hpbn', topic: 'infra', level: 'Core', type: 'Book', free: true, title: 'High Performance Browser Networking', url: 'https://hpbn.co/', why: 'TCP, TLS and HTTP in enough depth to debug latency and handshakes.' },
  { id: 'r-tls13', topic: 'infra', level: 'Core', type: 'Article', free: true, title: 'The Illustrated TLS 1.3 Connection', url: 'https://tls13.xargs.org/', why: 'Every byte of a TLS handshake, for when certificates break in their VPC.' },
  { id: 'r-k8s', topic: 'infra', level: 'Core', type: 'Docs', free: true, title: 'Kubernetes tutorials', url: 'https://kubernetes.io/docs/tutorials/', why: 'Many enterprise platforms you will deploy onto run on Kubernetes underneath.' },
  { id: 'r-sre', topic: 'infra', level: 'Deep', type: 'Book', free: true, title: 'Site Reliability Engineering (Google)', url: 'https://sre.google/sre-book/table-of-contents/', why: 'SLOs, incident response and postmortems — how to run what you ship.' },
  { id: 'r-wellarch', topic: 'infra', level: 'Core', type: 'Guide', free: true, title: 'AWS Well-Architected Framework', url: 'https://aws.amazon.com/architecture/well-architected/', why: 'AWS\'s framework for reviewing architectures; many enterprise architects use it as a checklist.' },
  { id: 'r-ultimate-devops', topic: 'infra', level: 'Start', type: 'Guide', free: true, title: 'Ultimate DevOps Guide', url: 'https://github.com/mchittineni/ultimate-devops-guide', why: 'Companion guide: CI/CD, IaC, containers and observability.' },
  { id: 'r-ultimate-platform', topic: 'infra', level: 'Core', type: 'Guide', free: true, title: 'Ultimate Platform Engineering Guide', url: 'https://github.com/mchittineni/ultimate-platform-engineering-guide', why: 'Companion guide: Kubernetes platforms, GitOps, multi-tenancy and FinOps.' },

  // ---- Identity & security ----
  { id: 'r-oauth', topic: 'security', level: 'Start', type: 'Guide', free: true, title: 'OAuth 2.0 Simplified', url: 'https://www.oauth.com/', why: 'Authorization code, PKCE and client credentials explained plainly.' },
  { id: 'r-oidc', topic: 'security', level: 'Core', type: 'Docs', free: true, title: 'How OpenID Connect works (OpenID Foundation)', url: 'https://openid.net/developers/how-connect-works/', why: 'How SSO actually works when you integrate with a customer IdP.' },
  { id: 'r-owasp', topic: 'security', level: 'Start', type: 'Guide', free: true, title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', why: 'The baseline web risks a security reviewer will check first.' },
  { id: 'r-zerotrust', topic: 'security', level: 'Deep', type: 'Guide', free: true, title: 'NIST SP 800-207: Zero Trust Architecture', url: 'https://csrc.nist.gov/pubs/sp/800/207/final', why: 'The reference model regulated and government customers design against.' },

  // ---- Decomp & system design ----
  { id: 'r-sdprimer', topic: 'decomp', level: 'Start', type: 'Guide', free: true, title: 'The System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', why: 'Caching, queues, sharding and trade-offs, with worked examples.' },
  { id: 'r-ddd', topic: 'decomp', level: 'Core', type: 'Guide', free: true, title: 'Domain-Driven Design Reference (Eric Evans)', url: 'https://www.domainlanguage.com/ddd/reference/', why: 'Entities, aggregates and bounded contexts — the grammar of a good decomp.' },
  { id: 'r-bounded', topic: 'decomp', level: 'Start', type: 'Article', free: true, title: 'Bounded Context (Martin Fowler)', url: 'https://martinfowler.com/bliki/BoundedContext.html', why: 'Why "customer" means three different things across a client\'s systems.' },
  { id: 'r-saga', topic: 'decomp', level: 'Core', type: 'Article', free: true, title: 'Saga pattern (microservices.io)', url: 'https://microservices.io/patterns/data/saga.html', why: 'Safe multi-step writeback into systems you do not control.' },
  { id: 'r-outbox', topic: 'decomp', level: 'Core', type: 'Article', free: true, title: 'Transactional outbox (microservices.io)', url: 'https://microservices.io/patterns/data/transactional-outbox.html', why: 'Reliable event publishing — a common follow-up in writeback designs.' },

  // ---- Client & communication ----
  { id: 'r-momtest', topic: 'diplomacy', level: 'Start', type: 'Book', free: false, title: 'The Mom Test', url: 'https://www.momtestbook.com/', why: 'Discovery questions that surface real problems instead of polite lies.' },
  { id: 'r-trusted', topic: 'diplomacy', level: 'Core', type: 'Book', free: false, title: 'The Trusted Advisor', url: book('The Trusted Advisor Maister'), why: 'How credibility, reliability and intimacy turn into client trust.' },
  { id: 'r-pyramid', topic: 'diplomacy', level: 'Core', type: 'Book', free: false, title: 'The Pyramid Principle', url: book('The Pyramid Principle Minto'), why: 'Lead with the answer. The structure behind every good exec update.' },
  { id: 'r-crucial', topic: 'diplomacy', level: 'Core', type: 'Book', free: false, title: 'Crucial Conversations', url: book('Crucial Conversations'), why: 'Staying productive when a stakeholder is angry and the stakes are high.' },
  { id: 'r-nsd', topic: 'diplomacy', level: 'Core', type: 'Book', free: false, title: 'Never Split the Difference', url: book('Never Split the Difference'), why: 'Labeling, mirroring and calibrated questions for scope negotiations.' },

  // ---- Interview prep ----
  { id: 'r-tih', topic: 'interview', level: 'Start', type: 'Guide', free: true, title: 'Tech Interview Handbook', url: 'https://www.techinterviewhandbook.org/', why: 'Coding-round strategy, study plans and negotiation basics.' },
  { id: 'r-tih-behav', topic: 'interview', level: 'Start', type: 'Guide', free: true, title: 'Behavioral interviews (Tech Interview Handbook)', url: 'https://www.techinterviewhandbook.org/behavioral-interview/', why: 'STAR structure and the questions you will almost certainly get.' },
  { id: 'r-neetcode', topic: 'interview', level: 'Core', type: 'Course', free: true, title: 'NeetCode roadmap', url: 'https://neetcode.io/roadmap', why: 'A pattern-ordered problem list for the live-coding rounds.' },
  { id: 'r-levels', topic: 'interview', level: 'Core', type: 'Tool', free: true, title: 'Levels.fyi', url: 'https://www.levels.fyi/', why: 'Real compensation data by company and level before you negotiate.' },
  { id: 'r-negotiate', topic: 'interview', level: 'Core', type: 'Guide', free: true, title: 'Negotiating an offer (Tech Interview Handbook)', url: 'https://www.techinterviewhandbook.org/negotiation/', why: 'Scripts and principles for the final conversation.' }
];
