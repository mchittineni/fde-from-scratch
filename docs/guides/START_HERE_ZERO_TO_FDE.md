# Start Here: Zero to Forward Deployed Engineer

The master curriculum for this repo: six phases that take you from writing your first program to walking into an FDE interview loop with a portfolio, a story bank and a rehearsed decomp.

---

## 1. Who This Is For

This guide is for anyone who wants to do the Forward Deployed Engineer job and needs a route, not a reading list:

- **Career starters** with little or no coding experience.
- **Adjacent professionals** (analysts, consultants, solutions engineers, support engineers, data scientists) who already sit near customers and want to ship software for them.
- **Working software engineers** who can code but have never owned an ambiguous customer problem end to end.

The FDE job combines three things that are usually split across roles: you write production code, you work with messy enterprise data and infrastructure, and you manage customers directly. The curriculum trains all three, in that order, because customers forgive a lot but they do not forgive an engineer who cannot ship.

### Honest Time Estimates

These assume roughly **10 focused hours per week**. Double the hours and you roughly halve the calendar time; drop to 5 and expect it to take more than twice as long, because you will spend sessions re-learning what you forgot.

| Starting point | Phases to do | Realistic calendar time |
| --- | --- | --- |
| Zero coding experience | 0 → 5 | 6–9 months, sometimes longer; Phase 0 alone is often 8–12 weeks |
| Analyst or scientist who scripts in Python/SQL | 1 → 5 (skim 0) | 4–6 months |
| Working software engineer (2+ years) | 2 → 5 (skim 0–1) | 2–4 months |
| Senior engineer already in a customer-facing role | 3 → 5, plus gaps from the diagnostic | 4–8 weeks |

None of these numbers are guarantees. They are what it takes to produce the proof artifacts below, which is the bar that matters.

---

## 2. Phase 0 Prerequisites Self-Check

Answer honestly. If you can do every item without looking anything up beyond reference docs, skip Phase 0. If you miss three or more, start at Phase 0.

| # | Can you... | Quick test |
| --- | --- | --- |
| 1 | Write a 100-line program that reads a file, transforms it and writes output | Parse a CSV of orders and print revenue per customer |
| 2 | Use functions, loops, conditionals, lists and dictionaries without a tutorial open | Group a list of records by a key |
| 3 | Navigate a terminal: `cd`, `ls`, `cat`, `grep`, pipes, environment variables | Find every file under a folder containing `TODO` |
| 4 | Install packages in an isolated environment | Create a virtualenv and install `requests` |
| 5 | Write a SQL `JOIN` with `GROUP BY` and explain the result | Count orders per customer, including customers with zero orders |
| 6 | Use Git to commit, branch, push and open a pull request | Contribute a typo fix to any public repo |
| 7 | Call an HTTP API and handle a non-200 response | Fetch JSON from a public API and print a friendly error on failure |
| 8 | Read an error traceback and find the failing line | Fix a `KeyError` in someone else's script |

Item 5 has a trap: "including customers with zero orders" requires a `LEFT JOIN`. If you used an inner join, you are not done with Phase 0 SQL.

---

## 3. The Six Phases at a Glance

```text
[0 Programming] → [1 Software & Data] → [2 Infra, Networks & Identity]
                                                     ↓
[5 Interview Loop] ← [4 Decomposition & Client] ← [3 Applied AI]
```

| Phase | Goal in one line | Proof artifact | Typical length at 10 h/week |
| --- | --- | --- | --- |
| 0 | Write and run real programs | A CLI tool on GitHub | 8–12 weeks |
| 1 | Build an API on real data and test it | A tested API over a messy dataset | 6–8 weeks |
| 2 | Deploy it somewhere that fights back | Containerised deploy with SSO and a runbook | 5–7 weeks |
| 3 | Ship a grounded AI feature with evals | RAG or tool-using agent with an eval suite | 4–6 weeks |
| 4 | Turn vague problems into systems and stakeholders into allies | Two written decomps and an exec readout | 4–5 weeks |
| 5 | Pass the loop | Story bank, mock loop scores, target-company prep | 3–5 weeks |

---

## 4. Phase 0: Programming Foundations

**Goal:** You can write, run and debug a small program in Python, live in a terminal, and save your work in Git.

**What to learn:**

- [CS50x](https://cs50.harvard.edu/x/) (Harvard, free) for fundamentals, or [CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/) if you want to go straight to Python.
- [The Python Tutorial](https://docs.python.org/3/tutorial/) (official) as your reference.
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/) (free online) for practical scripting against files, spreadsheets and the web.
- [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) (MIT) for the shell, editors, Git and debugging tools nobody teaches.
- [SQLBolt](https://sqlbolt.com/) for interactive SQL basics.

**What to practice:** 30–50 small problems on [Exercism's Python track](https://exercism.org/tracks/python), plus scripts that solve your own annoyances (rename files, summarise a bank export, clean a spreadsheet).

**Proof artifact:** A command-line tool in a public GitHub repo that reads a messy CSV, cleans it, and writes a summary. It has a README with install and usage steps.

**Exit checkpoint:** You pass every item in the self-check above.

---

## 5. Phase 1: Software and Data Fluency

**Goal:** You can build a small backend service from a blank folder, model data in a relational database, and test what you wrote.

**What to learn:**

- [SOFTWARE_FUNDAMENTALS_AND_VELOCITY.md](SOFTWARE_FUNDAMENTALS_AND_VELOCITY.md) in this repo: language depth, Git, APIs, testing, debugging and reading unfamiliar code.
- [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) and [pytest docs](https://docs.pytest.org/en/stable/).
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) and the [Mode SQL tutorial](https://mode.com/sql-tutorial) through window functions.
- [Pro Git](https://git-scm.com/book/en/v2) chapters 1–3, and [Learn Git Branching](https://learngitbranching.js.org/) for rebase and merge intuition.
- [ENTERPRISE_DATA_AND_INTEGRATION.md](ENTERPRISE_DATA_AND_INTEGRATION.md) for CDC, entity resolution and data quality once the basics click.
- [DuckDB docs](https://duckdb.org/docs/) and [pandas getting started](https://pandas.pydata.org/docs/getting_started/index.html) for local analysis.

**What to practice:** Take a public dataset with real mess (duplicate entities, mixed date formats, missing keys). Load it raw, clean it into a modelled schema, and serve it through an API. Do SQL drills on [HackerRank SQL](https://www.hackerrank.com/domains/sql) until joins and aggregations are boring.

**Proof artifact:** A FastAPI service backed by Postgres or DuckDB over a messy dataset, with validation, pagination, error handling, a test suite that runs in CI, and a README explaining the data cleaning decisions. This is the Labs "data explorer" and "messy ingestion" projects.

**Exit checkpoint:** A friend can clone your repo, run one command, and get a working API with passing tests. You can explain every cleaning rule and why it exists.

---

## 6. Phase 2: Infrastructure, Networks and Identity

**Goal:** You can deploy software into an environment you do not control and explain why it is failing when it does.

**What to learn:**

- [CLOUD_DEPLOYMENT_AND_OPERATIONS.md](CLOUD_DEPLOYMENT_AND_OPERATIONS.md) in this repo for containers, Kubernetes, IaC, observability and incident handling.
- [AIRGAP_SECURITY_AND_NETWORKING.md](AIRGAP_SECURITY_AND_NETWORKING.md) for proxies, TLS inspection, SAML vs OIDC and offline bundles.
- [Docker getting started](https://docs.docker.com/get-started/) and the [Kubernetes basics tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/).
- [MDN's HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) so you can reason about headers, status codes, caching and redirects.
- [The Twelve-Factor App](https://12factor.net/) for configuration and deployability habits.
- [Wizard Zines](https://wizardzines.com/) (Julia Evans) for approachable explanations of DNS, networking and Linux tools.

**What to practice:** Containerise your Phase 1 API. Deploy it to a cloud free tier or a local Kubernetes cluster. Put it behind SSO with an identity provider's developer tenant. Then break things on purpose: wrong DNS, expired certificate, missing environment variable, denied egress. Write down the symptom and the fix for each.

**Proof artifact:** The Labs "SSO + RBAC" and "air-gapped bundle" projects: a deployed service with login, two roles, a runbook, and an install bundle that works without internet access.

**Exit checkpoint:** You can explain, on a whiteboard, the path of one HTTPS request from a browser through DNS, a load balancer and a proxy to your container, and name three places it can fail.

---

## 7. Phase 3: Applied AI

**Goal:** You can ship an AI feature that is grounded in customer data, measured by evals, and safe enough to show an executive.

**What to learn:**

- [APPLIED_AI_IN_ENTERPRISE.md](APPLIED_AI_IN_ENTERPRISE.md) in this repo for RAG, parsing, hybrid search, MCP and eval harnesses.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (Anthropic) for when to use workflows vs agents.
- [Claude platform docs](https://platform.claude.com/docs/en/home) or your chosen provider's docs for tool use, structured output and prompt caching.
- [Hugging Face LLM course](https://huggingface.co/learn/llm-course) for how models, tokenizers and embeddings work.
- [Model Context Protocol](https://modelcontextprotocol.io/) docs for exposing tools to models.
- [Your AI product needs evals](https://hamel.dev/blog/posts/evals/) (Hamel Husain) for the eval mindset.

**What to practice:** Build retrieval over a document set with awkward formats (scanned PDFs, tables, versioned policies). Write 30–50 eval cases before tuning anything. Track answer quality, citation accuracy and refusal behaviour across changes.

**Proof artifact:** The Labs "grounded RAG with evals" or "MCP server" project, with an eval report showing a baseline, one improvement, and its measured effect.

**Exit checkpoint:** You can say how often your system is wrong, on what kinds of questions, and what you would do about it, with numbers from your own eval set.

---

## 8. Phase 4: Decomposition and Client Skills

**Goal:** You can take a one-sentence business complaint and produce an operator-centred system design, then explain it to an executive in five minutes.

**What to learn:**

- [DECOMPOSITION_PLAYBOOK.md](DECOMPOSITION_PLAYBOOK.md) for the six-phase decomp blueprint and 45-minute drill timing.
- [CLIENT_DIPLOMACY_AND_SURVIVAL.md](CLIENT_DIPLOMACY_AND_SURVIVAL.md) for discovery interviews, executive readouts and bad-news handling.
- [BUSINESS_ACUMEN_AND_DOMAINS.md](BUSINESS_ACUMEN_AND_DOMAINS.md) for how the industries you will deploy into make and lose money.
- [The Mom Test](https://www.momtestbook.com/) (Rob Fitzpatrick) for asking questions that produce facts rather than opinions.
- [Designing Data-Intensive Applications](https://dataintensive.net/) (Martin Kleppmann) for the trade-off vocabulary decomps lean on.

**What to practice:** Run the Labs decomp drill against the clock at least six times across different industries. Play every Field Simulator scenario. Interview two people who do operational work (a dispatcher, a nurse, a store manager) about a bad day, using Mom Test questions, and write what you learned.

**Proof artifact:** Two written decomps (one per industry) using the playbook phases, plus a one-page executive readout for one of your earlier projects. This is the Labs "decomp write-up" and "exec demo" projects.

**Exit checkpoint:** You complete a 45-minute decomp drill, including the twist, without running out of time, and your self-review rubric scores no phase as missing.

---

## 9. Phase 5: The Interview Loop

**Goal:** You can perform consistently across every stage of a target company's loop.

**What to learn:**

- [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md) for loop structure, story preparation, negotiation and the first 90 days.
- [SELF_ASSESSMENT_AND_FEEDBACK.md](SELF_ASSESSMENT_AND_FEEDBACK.md) for scoring yourself honestly and getting useful mock feedback.
- [Tech Interview Handbook](https://techinterviewhandbook.org/) and its [behavioral interview section](https://www.techinterviewhandbook.org/behavioral-interview/).
- [NeetCode roadmap](https://neetcode.io/roadmap) for coding-round patterns.
- [System Design Primer](https://github.com/donnemartin/system-design-primer) for system design vocabulary.
- The Playbooks tab in the web app for your target company's stages and red flags.

**What to practice:** Fill the Story Bank with eight STAR stories. Work through the Question Bank. Run a full mock loop with a peer, timed, and swap roles.

**Proof artifact:** A completed story bank, scored mock loop results, and a one-page company brief per target company.

**Exit checkpoint:** Two consecutive mock loops where no round scores below "hire" on your rubric.

---

## 10. A Weekly Study Rhythm

A template for 10 hours. Adjust the days, keep the proportions.

| Block | Time | What you do |
| --- | --- | --- |
| Learn | 3 h (2 sessions) | Course or docs for the current phase. Take notes as questions, not summaries. |
| Build | 4 h (1–2 sessions) | Work on the phase proof artifact. Commit at the end of every session, even if broken. |
| Drill | 1.5 h (3 × 30 min) | Coding problems, SQL drills or a timed decomp, depending on phase. |
| Communicate | 1 h | Write a short weekly update as if to a customer: what shipped, what is blocked, what is next. |
| Review | 0.5 h | Check exit checkpoints, update the Journey tracker, plan next week. |

The "Communicate" block is not optional. Writing a weekly status note for an imaginary customer is the cheapest way to practise the part of the job most engineers neglect.

---

## 11. Using the Web App with These Guides

The [web app](https://mchittineni.github.io/fde-from-scratch/) is where you track and drill; the `docs/guides/` manuals are where you read in depth.

| Web app section | Use it for | Pair it with |
| --- | --- | --- |
| **Journey** | Orientation, your track's weekly milestones, progress and XP | This guide's phases |
| **Labs → Diagnostic** | Finding your weakest pillar before you pick a starting phase | [SELF_ASSESSMENT_AND_FEEDBACK.md](SELF_ASSESSMENT_AND_FEEDBACK.md) |
| **Labs → Projects** | Proof artifacts with customer briefs and acceptance criteria | Phase 1–4 guides |
| **Labs → Decomp, Cases, Simulator** | Timed decomps, worked architectures, client crisis practice | [DECOMPOSITION_PLAYBOOK.md](DECOMPOSITION_PLAYBOOK.md), [CLIENT_DIPLOMACY_AND_SURVIVAL.md](CLIENT_DIPLOMACY_AND_SURVIVAL.md) |
| **Labs → Stories, Questions** | Behavioral and technical interview prep | [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md) |
| **Library** | Vetted resources filtered by skill and level | [RECOMMENDED_MEDIA.md](RECOMMENDED_MEDIA.md) |
| **Playbooks** | Company-specific loop stages and decomp formulas | [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md) |

Every manual in `docs/guides/`:

| Guide | Pillar |
| --- | --- |
| [SOFTWARE_FUNDAMENTALS_AND_VELOCITY.md](SOFTWARE_FUNDAMENTALS_AND_VELOCITY.md) | Ship fast |
| [ENTERPRISE_DATA_AND_INTEGRATION.md](ENTERPRISE_DATA_AND_INTEGRATION.md) | Data |
| [CLOUD_DEPLOYMENT_AND_OPERATIONS.md](CLOUD_DEPLOYMENT_AND_OPERATIONS.md) | Infra |
| [AIRGAP_SECURITY_AND_NETWORKING.md](AIRGAP_SECURITY_AND_NETWORKING.md) | Infra and security |
| [APPLIED_AI_IN_ENTERPRISE.md](APPLIED_AI_IN_ENTERPRISE.md) | Applied AI |
| [DECOMPOSITION_PLAYBOOK.md](DECOMPOSITION_PLAYBOOK.md) | Decomposition |
| [CLIENT_DIPLOMACY_AND_SURVIVAL.md](CLIENT_DIPLOMACY_AND_SURVIVAL.md) | Client skills |
| [BUSINESS_ACUMEN_AND_DOMAINS.md](BUSINESS_ACUMEN_AND_DOMAINS.md) | Business context |
| [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md) | Interview loop |
| [SELF_ASSESSMENT_AND_FEEDBACK.md](SELF_ASSESSMENT_AND_FEEDBACK.md) | Calibration |
| [RECOMMENDED_MEDIA.md](RECOMMENDED_MEDIA.md) | Reading list |
| [GLOSSARY.md](GLOSSARY.md) | Vocabulary for every phase |

Progress in the web app is stored only in your browser. If you switch machines or clear site data, it is gone, so keep your proof artifacts in Git.

---

## 12. Common Ways Learners Stall (and How to Recover)

| Stall pattern | What it looks like | Recovery |
| --- | --- | --- |
| **Tutorial loop** | Fourth course on the same topic, no repo | Stop consuming. Build the proof artifact badly, then go back to the course for the specific gap. |
| **Tool shopping** | A week spent choosing between frameworks | Use the defaults in this guide (Python, FastAPI, Postgres, Docker). Revisit only when a customer requires otherwise. |
| **Perfectionism** | Project at 90% for a month | Time-box it. Ship what exists with a "known limitations" section in the README. |
| **Skipping the boring pillar** | Lots of AI demos, no deploys or SQL | Run the Labs diagnostic and spend the next two weeks on the lowest score. |
| **Isolation** | No one has seen your work | Post your weekly update publicly or send it to one peer. Ask for one specific piece of feedback. |
| **Interview anxiety pushed to the end** | Phase 5 feels unreachable | Start one timed decomp per week from Phase 2 onward. Low stakes, high repetition. |
| **Life happens** | Two missed weeks | Do not restart the phase. Re-read your last weekly note, do one 30-minute task, and resume. |

---

## 13. Minimum Viable FDE Checklist

You are ready to apply when every box is honestly ticked:

- [ ] I can build a tested API with validation, pagination and error handling from a blank folder in under a day.
- [ ] I can write SQL with joins, aggregations and window functions, and read a query plan.
- [ ] I have cleaned and modelled a messy real-world dataset and can defend every cleaning rule.
- [ ] I have deployed a containerised service with SSO and written a runbook someone else used.
- [ ] I can debug DNS, TLS and proxy failures methodically, not by guessing.
- [ ] I have shipped a grounded AI feature with an eval set and can quote its failure rate.
- [ ] I have completed at least six timed decomps, including twists.
- [ ] I have written an executive readout that leads with the answer.
- [ ] I have eight STAR stories with measurable outcomes.
- [ ] I have three to five public proof artifacts with READMEs a stranger can follow.
- [ ] I have run at least two full mock loops and acted on the feedback.

If a box is unticked, the guide that fixes it is listed in Section 11.
