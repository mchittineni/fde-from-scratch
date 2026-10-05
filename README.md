# 🚀 FDE Launchpad: Forward Deployed Engineer Career & Interview Hub

> **The comprehensive, open-source preparation platform for Software Engineers across all experience levels aiming to master and crack the Forward Deployed Software Engineer (FDE / FDSE) role at Palantir, Databricks, Scale AI, OpenAI, and Snowflake.**

---

## 🌟 What is a Forward Deployed Engineer (FDE)?

Popularized by **Palantir Technologies** and adopted rapidly across enterprise AI and data leaders (**Databricks, Scale AI, OpenAI, Anthropic, Snowflake**), the Forward Deployed Engineer is one of the most lucrative, high-impact, and intellectually demanding engineering roles in modern tech.

Unlike traditional software engineers who write code against sprint tickets behind product managers, an **FDE is embedded directly at the sharp edge of the business**:
- Partnering on-site with Fortune 500 C-suites, defense agencies, and healthcare networks.
- Architecting high-scale distributed data pipelines, lakehouses, and LLM applications.
- Operating in the world's most restrictive customer networks (air-gapped datacenters, Zero-Trust VPCs).
- Translating chaotic, ambiguous real-world problems into production software without product specs.
- Mastering high-stakes client diplomacy, de-escalation, and scope negotiation.

---

## 🎯 Platform Features

### 1. 🗺️ Experience-Tailored 12-Week Roadmaps
Curated week-by-week sprints with interactive checklists, milestones, and resource reading lists tailored specifically to your career stage:
- **Associate / Early Career (0 - 2 YOE)**: Rapid prototyping, SQL data wrangling, Linux triage, and Decomp fundamentals.
- **Mid-Level SWE (2 - 5 YOE)**: Distributed computing (Spark/Kafka), enterprise identity (SAML/OIDC/VPCs), and applied AI orchestration.
- **Senior SWE / Architect (5 - 9 YOE)**: Air-gapped containerization, enterprise ontologies, multi-tenant RBAC, and C-suite technical leadership.
- **Staff / Principal / Field CTO (10+ YOE)**: The Field-to-Product Flywheel, global AI compliance (EU AI Act), and 8-figure pilot architecture.
- **Role Transitioners (Solutions Architect / DevOps / SE to FDE)**: Bridging deep coding velocity with consultative diplomacy.

### 2. ⚡ 5-Pillar Skill Diagnostic Assessment
A granular 15-question readiness audit evaluating the 5 core superpowers of an FDE:
1. **Software & Systems Velocity** (48-hour MVPs, concurrency, debugging foreign codebases)
2. **Distributed Data & AI Stack** (Spark, Delta Lake, SQL execution plans, RAG evals)
3. **Enterprise Security & Infrastructure** (Air-gapped clusters, SAML 2.0, VPC peering, Linux diagnostics)
4. **Problem Decomposition ('The Decomp')** (Domain modeling, entity graphs, tradeoffs)
5. **Client Diplomacy & EQ** (Handling hostile client engineers, executive demos, scope defense)
*Includes an interactive SVG Spider/Radar chart and automated track recommendation.*

### 3. 🎮 "In The Field" Client Incident Simulator
Interactive, multi-stage branching crisis scenarios with real-time telemetry meters (**Client Trust**, **Technical Integrity**, **Deployment Velocity**):
- **The 48-Hour Air-Gapped Financial Crisis** (Palantir Style): Handling an unexpected CISO air-gapped ban before a CEO demo.
- **Black Friday Lakehouse Ingestion Outage** (Databricks Style): Diagnosing join skew and memory saturation under 450,000 events/sec.
- **Enterprise LLM PII Leak & Hallucination Escalation** (OpenAI/Scale Style): Remediating HIPAA compliance breaches with deterministic gateway guardrails.

### 4. 🏢 Target Company Playbooks
Deep-dive insider blueprints covering interview stages, decomp formulas, red flags, and sample questions for:
- **Palantir Technologies**: FDSE loop, the 5-step Decomp formula, and high-ownership deployment culture.
- **Databricks**: Solutions Architect loop, Spark internals, Catalyst optimizer, and Medallion Lakehouse design.
- **Scale AI**: Rapid prototyping challenges, RLHF pipelines, and defense AI platforms (Scale Donovan).
- **OpenAI & Anthropic**: Applied AI loop, Model Context Protocol (MCP), structured tool outputs, and LLM eval harnesses.
- **Snowflake**: Field Technical Architect loop, micro-partition pruning, Snowpark, and Zero-Copy data sharing.

### 5. 🏛️ Architecture & Decomp Vault
End-to-end real-world system designs with full entity models, sequence phases, and tradeoff justifications:
- Palantir Foundry-Style Enterprise Ontology & Writeback Engine
- Air-Gapped Multi-Region Fleet Telemetry & Defense Logistics (DDIL)
- Enterprise Agentic RAG Platform with VPC Isolation & Document ACL Pre-Filtering

### 6. 💡 Searchable Question Bank
Filterable by category, seniority level, and company with model answers, red flags to avoid, and interviewer follow-up probes.

---

## 🛠️ Quick Start & Local Development

This application is built with **zero external runtime dependencies** using modern standard HTML5, CSS3 (Vanilla), and ES6 native modules, paired with a lightweight Node.js HTTP server.

### Prerequisites
- Node.js (v18+) or Python 3

### Running the App
1. Clone or navigate to the project directory:
   ```bash
   cd /Users/manideepchittineni/.gemini/antigravity-ide/scratch/FDE
   ```

2. Start the local server:
   ```bash
   npm start
   ```
   *(Alternatively, run `node server.js` or `python3 -m http.server 5173`)*

3. Open your browser:
   ```
   http://localhost:5173
   ```

---

## 📂 Project Directory Structure

```
FDE/
├── index.html              # Modern semantic SPA shell & viewport
├── server.js               # Zero-dependency local Node HTTP server (MIME/CORS)
├── package.json            # Scripts & project metadata
├── README.md               # Documentation & curriculum guide
├── styles/
│   ├── main.css            # Dark enterprise design system, variables & layout
│   └── components.css      # Component styles (Timeline, Radar, Simulator, Cards)
└── src/
    ├── main.js             # Main SPA controller, tab router, state & events
    └── data/
        ├── roadmaps.js     # 5 Experience level curriculum roadmaps
        ├── diagnostic.js   # 15-question 5-pillar assessment & scoring logic
        ├── companies.js    # Palantir, Databricks, Scale AI, OpenAI, Snowflake playbooks
        ├── simulations.js  # Branching real-world field incident scenarios
        ├── caseStudies.js  # Decomp & enterprise system design case studies
        └── questionBank.js # Searchable interview questions with model answers
```

---

## 🤝 Contributing
Contributions are welcomed! If you have real-world FDE interview questions, company loop updates, or decomp prompts to share, feel free to submit a pull request or open an issue.

## 📄 License
MIT License. Free for software engineers everywhere.
