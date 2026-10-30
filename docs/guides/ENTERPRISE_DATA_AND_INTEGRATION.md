# Enterprise Data and Systems Integration Guide

A technical field manual on navigating the reality of enterprise databases, streaming architectures, entity resolution, and data quality on customer deployments.

---

## 1. The Enterprise Data Reality

On client engagements, data rarely lives in clean, documented JSON APIs. You will encounter:

- **SAP ERP & NetSuite:** Complex relational schemas with German or cryptic acronym column names (e.g. `VBAP`, `MARA`, `MARD`), strict proprietary ABAP interfaces, and transactional lockouts.
- **Legacy Relational Databases:** Oracle 11g/19c, Microsoft SQL Server 2012, IBM DB2, often running on on-premises bare metal with decades of historical data patches.
- **Mainframe Batch Exports:** COBOL copybook structures, fixed-width flat files, EBCDIC-encoded dumps delivered overnight via SFTP.
- **Decentralized Spreadsheets:** Manual Excel sheets maintained by operational staff that contain critical business logic and join keys that exist nowhere in the database.

---

## 2. Ingestion Strategies: CDC vs Polling vs File Drops

### Change Data Capture (CDC)

Log-based CDC is the enterprise gold standard for continuous data synchronization:

- **How it works:** Instead of issuing expensive `SELECT * FROM table WHERE updated_at > ?` queries (which lock tables, miss hard deletes, and burden operational databases), a CDC connector (such as Debezium) reads the database binary log (MySQL binlog, Postgres WAL, Oracle redo logs).
- **Benefits:** Captures every `INSERT`, `UPDATE`, and `DELETE` event in exact commit order with minimal database CPU overhead.
- **Key Challenges:** Schema evolution (altering a column in Oracle can crash downstream connectors unless schema registries enforce compatibility) and snapshot bootstrapping on tables with hundreds of millions of rows.

### Reliable Batch Ingestion

When CDC is blocked by customer security policies or database tier licensing:

- Use chunked keyset pagination (`WHERE id > :last_seen_id ORDER BY id LIMIT 10000`) rather than offset pagination (`OFFSET 500000 LIMIT 10000`), which causes quadratic database scan costs.
- Store raw landed payloads in immutable object storage partitions (`raw/source/YYYY/MM/DD/batch_id.parquet`) before attempting any transformation. If your transformation logic contains a bug, raw immutability allows 100% reproducible re-runs.

---

## 3. Dealing with Dirty Data in the Field

### Defensive Data Cleaning Checklist

1. **Timestamp Normalization:** Customer systems frequently export local timestamps without timezone offsets. Convert every incoming timestamp to UTC at the ingestion boundary, while preserving the original raw string in an audit column.
2. **Schema Drift Containment:** If an upstream field changes from integer to string or introduces an unexpected `NULL`, do not allow the pipeline to crash silently or corrupt downstream tables. Route malformed rows to a **Dead-Letter Queue (DLQ)** or quarantine table, increment an error metric, and allow clean rows to continue flowing.
3. **Primary Key Deduplication:** Distributed networks cause duplicated messages. Always enforce idempotency in your ingestion targets using atomic upserts:

```sql
-- PostgreSQL Upsert Example
INSERT INTO inventory_snapshots (sku_id, warehouse_id, count, captured_at)
VALUES ($1, $2, $3, $4)
ON CONFLICT (sku_id, warehouse_id, captured_at)
DO UPDATE SET count = EXCLUDED.count;
```

---

## 4. Entity Resolution (Record Linkage)

In enterprise architectures, the same real-world entity is typically referenced by different identifiers across systems:

- System A (CRM): Customer "Acme Corp Ltd", ID `CRM-9812`
- System B (SAP ERP): Vendor "Acme Corporation", ID `VEND-00412`
- System C (Billing): Entity "Acme Inc.", Tax ID `XX-XXXXXXX`

### Practical Resolution Pipeline

1. **Deterministic Rules First:** Match on authoritative corporate identifiers whenever available: Tax ID / EIN, DUNS number, ISO container code, VIN.
2. **Standardization & Tokenization:** Strip common corporate suffixes ("Inc", "LLC", "Ltd", "GmbH"), normalize whitespace, lowercase text, and remove non-alphanumeric punctuation.
3. **Probabilistic Fuzzy Matching:** For unmatched pairs, compute similarity metrics using Jaro-Winkler, Levenshtein distance, or trigram cosine similarity.
4. **Three-Tier Classification:**
   - Score $\ge 0.90$: Automatic merge into canonical entity graph.
   - Score $0.70 - 0.89$: Route to human operational review queue.
   - Score $< 0.70$: Treat as distinct entities.

---

## 5. Storage Engine Selection: When to Reach for What

| Engine | When an FDE Uses It | Key Strength | Watch Out For |
| --- | --- | --- | --- |
| **DuckDB** | Local exploration, single-node analytics, prototypes | Instant startup, zero dependencies, blazingly fast on CSV/Parquet | Single-node in-memory; not designed for high-concurrency multi-client writes |
| **PostgreSQL** | Operational tools, RBAC backends, transactional writeback | ACID compliance, row-level security, pgvector support | Scaling write-heavy event streams requires tuning WAL and connection pools |
| **Delta Lake / Iceberg** | Lakehouse foundations, high-throughput enterprise ingestion | ACID transactions over cloud storage, schema enforcement, time-travel audits | Small-file problem: requires periodic `OPTIMIZE` or compaction routines |
| **Apache Spark** | Distributed data processing over terabyte-scale data | Massive parallel computing, rich SQL & DataFrame API | Data skew in joins, high executor memory overhead, long startup cold starts |

---

## 6. Spark Performance Tuning & Query Optimization

### Diagnosing and Fixing Data Skew

When 199 tasks finish in 10 seconds and task 200 runs for 45 minutes:

- **Root Cause:** A join or groupBy key (often `NULL`, empty string `""`, or a single massive customer) concentrates a huge volume of rows onto a single executor partition.
- **Fix 1: Broadcast Joins:** If one side of the join is small ($\le 100\text{ MB}$), force a broadcast join to eliminate the shuffle entirely:

```python
from pyspark.sql.functions import broadcast
result = large_df.join(broadcast(small_df), "customer_id")
```

- **Fix 2: Salting:** If both datasets are large, append a random integer from $0$ to $K-1$ to the skewed join key on the primary dataset, replicate the matching rows $K$ times on the secondary dataset, and join on `[key, salt]`.
- **Fix 3: Adaptive Query Execution (AQE):** In Spark 3.x, ensure AQE is enabled:

```properties
spark.sql.adaptive.enabled=true
spark.sql.adaptive.skewJoin.enabled=true
spark.sql.adaptive.coalescePartitions.enabled=true
```
