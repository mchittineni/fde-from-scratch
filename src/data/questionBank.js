export const questionBank = [
  {
    id: "qb_1",
    category: "The Decomp",
    company: "Palantir",
    level: "All Levels",
    title: "Decomp: Port Authority Container Flow Optimization",
    prompt: "A major commercial seaport is experiencing catastrophic vessel congestion. 35 cargo ships are idling off the coast, terminal container yards are at 98% capacity, and drayage trucks face 6-hour wait times at entry gates. You are forward-deployed to design an operational software system to relieve the bottleneck. How do you decompose this?",
    modelAnswer: "1. Scope & Objective: Clarify the primary constraint (is it berth space, crane availability, or gate clearance?). Define the North Star metric: Container dwell time and truck turnaround time.\n2. Ontology Modeling: Entities = Vessel, Berth, Crane, Container (Hazardous/Refrigerated/Standard), YardSlot, DrayageTruck, GateLane.\n3. Ingestion & Legacy Data: Pull EDI 204/310 manifests from shipping lines, RFID/OCR gate camera streams, and crane PLC telemetry into a centralized operational message bus.\n4. Decision Engine: An appointment booking slot system for trucks matched with dynamic crane staging—pre-positioning containers 2 hours prior to truck arrival to eliminate search delay.\n5. Failure Scenarios: Crane breakdown, customs inspection holds, offline gate scanners.",
    redFlags: "Jumping into machine learning for container placement without addressing basic gate scheduling bottlenecks; failing to model container types (e.g. refrigerated containers needing electric plugs).",
    followUp: "What happens if a major storm halts crane operations for 12 hours? How does your appointment queue automatically rebalance?"
  },
  {
    id: "qb_2",
    category: "Distributed Systems & Lakehouse",
    company: "Databricks",
    level: "Mid / Senior",
    title: "Diagnosing Spark Ingestion Join Skew",
    prompt: "During a technical interview, you are shown a Spark DAG visualization where 199 tasks finish in 15 seconds, but the 200th task runs for 48 minutes and eventually dies with an OutOfMemory error. What is happening, and how do you resolve it?",
    modelAnswer: "1. Diagnosis: This is a classic data skew bottleneck. A join or groupBy operation redistributed records by hash key, and an overwhelmingly high percentage of records share the exact same key (e.g. null, 0, or a high-volume merchant ID), landing on a single executor partition.\n2. Verification: Open Spark UI -> Stage Details -> Task Metrics. Check 'Shuffle Read Size' min/median vs max. If max is gigabytes while median is megabytes, skew is confirmed.\n3. Resolution A (Salting): For skewed joins, append a pseudo-random integer (e.g. key_0 to key_15) to the skewed key on the left table, and replicate corresponding keys across all 16 variants on the right dimension table.\n4. Resolution B (Broadcast Join): If the dimension table is small (<10-50MB), convert to a broadcast hash join to bypass shuffle exchanges entirely.\n5. Resolution C (Adaptive Query Execution - AQE): In Spark 3.x+, enable spark.sql.adaptive.skewJoin.enabled to automatically split skewed partitions at runtime.",
    redFlags: "Suggesting to merely increase cluster driver/executor RAM; not knowing what a shuffle exchange is; failing to inspect task-level distribution metrics in the Spark UI.",
    followUp: "How does Databricks Photon engine improve join performance compared to standard JVM Tungsten execution?"
  },
  {
    id: "qb_3",
    category: "Enterprise AI & LLMs",
    company: "OpenAI / Scale AI",
    level: "Mid / Senior",
    title: "Architecting Grounded RAG with Zero Data Retention",
    prompt: "A tier-1 healthcare customer wants to deploy a clinical protocol search assistant using frontier LLMs. Their legal counsel demands strict Zero Data Retention (ZDR) and proof that no patient medical notes will ever be cached or used for model training. How do you design this?",
    modelAnswer: "1. Contractual & API Architecture: Leverage OpenAI / Azure OpenAI HIPAA-compliant enterprise endpoints with explicit BAA (Business Associate Agreement) and zero data logging. Verify that prompts and completions are purged from memory immediately post-inference.\n2. Network Isolation: Route all traffic through AWS PrivateLink / Azure Private Endpoints so traffic never traverses the public internet.\n3. Gateway Redaction Layer: Deploy an upstream deterministic PII de-identification proxy (using Presidio / custom regex models) to mask patient identifiers (names, dates, MRNs) prior to vector embedding generation.\n4. Vector Database Multi-Tenancy: Enforce row-level tenant isolation in Pinecone / Milvus / Qdrant using cryptographically verified patient tenant hashes.\n5. Audit Logging: Store local cryptographic audit hashes of all queries in the client's internal SIEM (Splunk/Datadog) without retaining raw text.",
    redFlags: "Relying on system prompts ('Please don't remember this data'); sending raw unredacted patient medical records over public internet APIs; failing to mention BAA compliance.",
    followUp: "How do you evaluate retrieval precision to ensure clinicians are not served outdated medical guidelines?"
  },
  {
    id: "qb_4",
    category: "Client EQ & Hostile Stakeholders",
    company: "Palantir / Databricks",
    level: "All Levels",
    title: "Handling the 'Your Platform is Garbage' Confrontation",
    prompt: "In your first week on-site at a customer, their lead data engineer says in front of the VP of Engineering: 'We spent $2M on your software, but it takes 10 minutes to run what our existing PostgreSQL query did in 3 seconds. Your platform is garbage.' How do you respond?",
    modelAnswer: "1. Regulate & Acknowledge: Do not get defensive or recite marketing specs. Say: 'That is completely unacceptable performance, and I completely understand why you are frustrated. If I were in your shoes, I would feel the exact same way.'\n2. Diagnose Collaboratively: 'Let's look at the query plan together right now. Can we pull up the query execution profile and see where the time is being spent?'\n3. Uncover Architectural Mismatch: In 90% of cases, the query was performing a full table scan on an unpartitioned cold lakehouse table instead of using partition pruning or an index. Demonstrate the fix live.\n4. Elevate the Client Engineer: Once optimized down to 100ms, credit the client engineer: 'John's observation uncovered a missing clustering key in the ingestion config. With this fixed, our entire analytics pipeline is now 30x faster.'",
    redFlags: "Blaming the customer's hardware or database schema; arguing that distributed systems have higher latency overhead; escalating immediately to the account executive without investigating the technical root cause.",
    followUp: "What if the customer's query genuinely CANNOT run faster on your platform due to architectural limitations?"
  },
  {
    id: "qb_5",
    category: "Linux & Systems Diagnostics",
    company: "All Enterprise Leaders",
    level: "Entry / Mid",
    title: "Triaging HTTP 504 Gateway Timeout on Bastion Host",
    prompt: "You are connected via SSH to an on-prem customer gateway server. An external client API request is timing out with HTTP 504. Walk through your terminal diagnostic steps in order.",
    modelAnswer: "1. Layer 1 (Process & Upstream): Verify the upstream application is running (`systemctl status <svc>` or `docker ps`). Check if the listening port is open (`ss -tulpn | grep :8080`).\n2. Layer 2 (Local Loopback): Test local HTTP response on localhost (`curl -iv -m 5 http://127.0.0.1:8080/health`). If localhost answers immediately with 200 OK, the application is healthy and the issue lies in the reverse proxy or network.\n3. Layer 3 (Proxy Configuration): Inspect Nginx / Envoy configuration for `proxy_read_timeout` and upstream keepalive pool exhaustion. Check error logs (`tail -f /var/log/nginx/error.log`).\n4. Layer 4 (Host Resources): Run `top` / `htop` to check for 100% CPU lock or load average spiking beyond core count. Run `free -m` for memory exhaustion. Run `df -h` to verify disk space is not 100% full (preventing log writes).\n5. Layer 5 (Network & DNS): Run `dmesg -T | grep -i oom` to see if the kernel OOM-killer murdered workers. Test DNS resolution with `dig` and connection latency with `mtr` or `traceroute`.",
    redFlags: "Restarting the server blindly; jumping directly into application code without verifying network or socket states; ignoring disk space exhaustion.",
    followUp: "How would you use `strace` to identify why a single worker process is hanging?"
  },
  {
    id: "qb_6",
    category: "Live Coding / Algo Patterns",
    company: "Palantir / Scale AI",
    level: "All Levels",
    title: "Graph Dependency Cycle & Topological Sort",
    prompt: "In enterprise data pipelines (like Palantir Foundry or dbt), datasets depend on upstream transformations. Given a list of dataset dependencies (directed edges), write an algorithm to determine if there is a circular dependency (deadlock) and return a valid execution order.",
    modelAnswer: "1. Graph Representation: Construct an adjacency list and an in-degree array for each node.\n2. Kahn's Algorithm (BFS Topological Sort):\n   - Push all nodes with in-degree 0 onto a queue.\n   - While queue is not empty: pop node u, append to executionOrder, and decrement in-degree for all neighbors v.\n   - If in-degree of v becomes 0, push v onto queue.\n3. Cycle Detection: If the length of executionOrder does not equal the total number of unique datasets, a cycle exists (return error with remaining nodes).\n4. Time/Space Complexity: O(V + E) time, O(V + E) space, where V is datasets and E is dependency links.",
    redFlags: "Using naive recursion without tracking recursion stack states leading to infinite loops; forgetting edge cases with disconnected subgraphs or isolated nodes.",
    followUp: "How would you extend this to execute independent nodes in parallel across worker threads?"
  }
];
