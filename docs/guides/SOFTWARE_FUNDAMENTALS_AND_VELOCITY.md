# Software Fundamentals and Velocity

The "Ship fast" pillar: the programming, CS, Git, API, testing, debugging and handover habits that let an FDE go from a blank folder to working software on a customer site in days, not quarters.

---

## 1. Why Velocity Is a Fundamentals Problem

FDEs are judged on how quickly a customer sees something real. That speed does not come from typing faster or from clever frameworks. It comes from not getting stuck: knowing one language well enough that syntax never blocks you, having a default project structure, reading unfamiliar code without panic, and debugging by method instead of by guessing.

A typical first week at a regional logistics customer looks like this: day one, read their codebase and data; day two, stand up an API over their shipment tables; day three, demo a ranked exception list to dispatchers; days four and five, fix what the dispatchers said was wrong. Every skill in this guide shortens one of those days.

---

## 2. Choose One Language and Go Deep

### Python First

Python is the default for FDE work because it is the common language of data tooling, ML and AI SDKs, and scripting glue. Most customer data teams can read it, which matters when you hand code over.

"Deep" means you can do these without searching:

| Area | What fluency looks like |
| --- | --- |
| Data model | Lists, dicts, sets, tuples, comprehensions, `dataclasses`, when to use each |
| Functions | Default args (and the mutable default trap), `*args`/`**kwargs`, closures, decorators |
| Errors | Raising and catching specific exceptions, `finally`, context managers |
| Typing | Type hints on public functions, `Optional`, generics; running a type checker |
| Iteration | Generators and `yield` for streaming large files without loading them into memory |
| Packaging | Virtual environments, a `pyproject.toml`, pinned dependencies |
| Concurrency | When `asyncio` helps (I/O-bound calls) and when it does not (CPU-bound work) |
| Standard library | `pathlib`, `json`, `csv`, `datetime` with time zones, `logging`, `itertools`, `collections` |

Resources: [The Python Tutorial](https://docs.python.org/3/tutorial/), [CS50's Python course](https://cs50.harvard.edu/python/), [uv](https://docs.astral.sh/uv/) for environments and dependencies, and [Ruff](https://docs.astral.sh/ruff/) for linting and formatting.

### Enough of the Others to Read Customer Code

You will not choose the customer's stack. Aim to *read* and make small, safe changes in:

| Language | Where you meet it | Learn enough to | Resource |
| --- | --- | --- | --- |
| TypeScript | Internal web apps, Node services | Follow types, async/await, a React component's props and state | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) |
| Java | Enterprise backends, Spark jobs | Navigate packages, interfaces, Spring annotations, Maven/Gradle builds | [dev.java Learn](https://dev.java/learn/) |
| Go | Infrastructure tools, Kubernetes operators | Read error handling, goroutines, interfaces | [A Tour of Go](https://go.dev/tour/) |
| SQL | Everywhere | Write it fluently; it is a first language, not a second | [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) |

---

## 3. Core CS That Actually Shows Up

You do not need a full CS degree. You need the pieces that decide whether a script finishes in two seconds or two hours, and the patterns interviewers reach for.

### Data Structures on the Job

| Structure | Real FDE use | Complexity to know |
| --- | --- | --- |
| Hash map (`dict`) | Joining two exports on an ID without a database | O(1) average lookup |
| Set | Deduplicating records, diffing two ID lists | O(1) membership |
| List / array | Ordered records, batching | O(1) index, O(n) search |
| Heap (`heapq`) | Top-k exceptions, priority queues for scheduling | O(log n) push/pop |
| Deque | Sliding windows over event streams, BFS | O(1) at both ends |
| Graph (adjacency list) | Supplier networks, dependency ordering, entity resolution clusters | BFS/DFS O(V + E) |
| Sorted data + binary search | Time-range lookups in logs | O(log n) |

The most common real performance bug is a nested loop that should be a dictionary lookup:

```python
# O(n * m): fine for 100 rows, hangs on 2 million
matches = [o for o in orders for c in customers if o["cust_id"] == c["id"]]

# O(n + m): build an index once, then look up
by_id = {c["id"]: c for c in customers}
matches = [(o, by_id[o["cust_id"]]) for o in orders if o["cust_id"] in by_id]
```

### Interview-Relevant Patterns

| Pattern | Signal in the prompt | Typical structure |
| --- | --- | --- |
| Hashing / counting | "duplicates", "frequency", "pair that sums to" | `dict` or `Counter` |
| Two pointers | Sorted input, "pair", "remove in place" | Indices from both ends |
| Sliding window | "longest/shortest substring or subarray with..." | Expand right, shrink left |
| BFS / DFS | Grids, networks, "connected", "shortest path (unweighted)" | Queue or recursion with visited set |
| Topological sort | "order tasks with dependencies" | In-degree counts plus queue |
| Heap / top-k | "k largest", "merge k sorted", scheduling | `heapq` |
| Binary search | Sorted data, "minimum value such that..." | Search on answer space |
| Intervals | "merge overlapping", "meeting rooms", shift scheduling | Sort by start, sweep |
| Union-find | "group records that refer to the same entity" | Parent array with path compression |

FDE coding rounds lean practical (parse this log, clean this data, build this small service) more often than puzzle-heavy, but the patterns above still appear. Practise with the [NeetCode roadmap](https://neetcode.io/roadmap) and use the [Big-O cheat sheet](https://www.bigocheatsheet.com/) to check yourself. For depth, MIT's [6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) is free.

---

## 4. Git on Customer Repos

Your Git habits are visible to customer engineers, and they will judge you by them.

| Rule | Why |
| --- | --- |
| Work on a branch, open a pull request, ask for review | Customer engineers own the repo after you leave; let them see every change |
| Small commits with clear messages | Makes review possible and `git bisect` useful |
| Never commit secrets, data extracts or `.env` files | Customer data in Git history is a security incident, not a mistake you can quietly revert |
| Match their conventions | Branch names, commit style, formatter, CI checks; do not import yours |
| Rebase your own branch, never rewrite shared history | Force-pushing over someone's work burns trust fast |

A daily workflow:

```bash
git switch main && git pull --ff-only
git switch -c fde/shipment-exceptions-api
# ...work...
git add -p                     # stage hunks deliberately, review what you are committing
git commit -m "Add exceptions endpoint with pagination"
git fetch origin && git rebase origin/main
git push -u origin fde/shipment-exceptions-api
```

Learn it properly with [Pro Git](https://git-scm.com/book/en/v2), [Learn Git Branching](https://learngitbranching.js.org/), and the short [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) description. If the customer has commit conventions, follow them; if they have none, [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) is a reasonable default to propose.

---

## 5. Building an API from a Blank Folder

Most first deliverables are an API over customer data that a thin UI or another system consumes. Here is a compact FastAPI service showing the four things reviewers check first: validation, errors, pagination and idempotency.

```python
from uuid import uuid4
from fastapi import FastAPI, Header, HTTPException, Query
from pydantic import BaseModel, Field

app = FastAPI(title="Shipment Exceptions")

class ExceptionIn(BaseModel):
    shipment_id: str = Field(min_length=1, max_length=64)
    reason: str = Field(pattern="^(late|damaged|missing)$")
    note: str | None = Field(default=None, max_length=500)

class ExceptionOut(ExceptionIn):
    id: str

DB: dict[str, ExceptionOut] = {}          # swap for Postgres in a real build
IDEMPOTENCY: dict[str, str] = {}          # key -> created exception id

@app.get("/exceptions")
def list_exceptions(limit: int = Query(50, ge=1, le=200), cursor: str | None = None):
    items = sorted(DB.values(), key=lambda e: e.id)
    if cursor:
        items = [e for e in items if e.id > cursor]
    page = items[:limit]
    next_cursor = page[-1].id if len(items) > limit else None
    return {"items": page, "next_cursor": next_cursor}

@app.get("/exceptions/{exc_id}")
def get_exception(exc_id: str):
    if exc_id not in DB:
        raise HTTPException(status_code=404, detail=f"exception {exc_id} not found")
    return DB[exc_id]

@app.post("/exceptions", status_code=201)
def create_exception(body: ExceptionIn, idempotency_key: str = Header(...)):
    if idempotency_key in IDEMPOTENCY:
        return DB[IDEMPOTENCY[idempotency_key]]   # retry returns the original, no duplicate
    exc = ExceptionOut(id=str(uuid4()), **body.model_dump())
    DB[exc.id] = exc
    IDEMPOTENCY[idempotency_key] = exc.id
    return exc
```

What each piece buys you:

- **Validation:** [Pydantic](https://docs.pydantic.dev/latest/) models reject bad input with a 422 and a precise message before your code runs. Constrain lengths and enums at the edge.
- **Errors:** Return the correct status code (404 for missing, 409 for conflicts, 422 for invalid input) with a message a customer engineer can act on. See FastAPI's [error handling](https://fastapi.tiangolo.com/tutorial/handling-errors/) docs.
- **Pagination:** Cursor-based pagination stays correct when rows are inserted between requests; offset pagination can skip or repeat rows. Always cap `limit`.
- **Idempotency:** Clients retry on timeouts. An `Idempotency-Key` header makes a retried `POST` return the original result instead of creating a duplicate. Stripe's [idempotency write-up](https://stripe.com/blog/idempotency) explains the pattern. In production, store keys in the database in the same transaction as the write, with an expiry.

Install `fastapi[standard]`, run it with `fastapi dev main.py` (or `uvicorn main:app --reload`) and open `/docs` for the generated OpenAPI page, which doubles as a demo surface for customer engineers. Work through the [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) once end to end.

---

## 6. Testing Pragmatically

Testing effort should match how long the code will live and who depends on it.

| Code type | Test what | Skip |
| --- | --- | --- |
| Throwaway exploration notebook | Nothing formal; assert row counts and key uniqueness inline | Unit tests |
| Demo prototype (lives 1–4 weeks) | The data transformations the demo's numbers depend on; one happy-path API test | UI tests, exhaustive edge cases |
| Code you hand over to the customer | Business rules, validation, error paths, idempotency, every bug you fixed | Testing framework internals or trivial getters |
| Writeback into a system of record | Everything above, plus contract tests against the target API and retry behaviour | Nothing; this is where errors cost money |

A [pytest](https://docs.pytest.org/en/stable/) example against the API above, using FastAPI's [test client](https://fastapi.tiangolo.com/tutorial/testing/) and a [fixture](https://docs.pytest.org/en/stable/how-to/fixtures.html):

```python
import pytest
from fastapi.testclient import TestClient
from main import app, DB, IDEMPOTENCY

@pytest.fixture
def client():
    DB.clear()
    IDEMPOTENCY.clear()
    return TestClient(app)

def test_rejects_unknown_reason(client):
    r = client.post("/exceptions", json={"shipment_id": "S1", "reason": "lost"},
                    headers={"Idempotency-Key": "k1"})
    assert r.status_code == 422

def test_retry_with_same_key_does_not_duplicate(client):
    body = {"shipment_id": "S1", "reason": "late"}
    first = client.post("/exceptions", json=body, headers={"Idempotency-Key": "k1"})
    second = client.post("/exceptions", json=body, headers={"Idempotency-Key": "k1"})
    assert first.json()["id"] == second.json()["id"]
    assert len(client.get("/exceptions").json()["items"]) == 1
```

The habit that matters most: **when you fix a bug, write the test that would have caught it first.** On a customer engagement, that list of regression tests becomes the documentation of every surprise their data threw at you.

---

## 7. Reading an Unfamiliar Codebase in an Hour

On day one you will be handed a repo with no documentation. A time-boxed technique:

| Minutes | Do this | Output |
| --- | --- | --- |
| 0–10 | Read the README, `Makefile`, `pyproject.toml`/`package.json`, Dockerfile, CI config | How it builds, runs and deploys |
| 10–20 | List the top-level tree; count lines per folder; check `git log --stat` for recently active files | Where the important code lives |
| 20–35 | Find the entry points: `main`, route definitions, job schedulers, CLI commands | A list of the ways the system is invoked |
| 35–50 | Trace one real request or job end to end, from entry point to database and back | A hand-drawn sequence diagram |
| 50–60 | Run the tests (or the app) locally; note what fails | A list of questions for the customer's engineers |

Useful commands:

```bash
git log --since="3 months ago" --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20
rg -n "@app\.(get|post)|@router\.|def main\(" --type py   # entry points in a Python service
rg -n "CREATE TABLE|class .*\(Base\)" | head -40          # where the data model lives
```

[ripgrep](https://github.com/BurntSushi/ripgrep) (`rg`) is faster than `grep` on large repos and respects `.gitignore`. On GitHub-hosted repos, [code search syntax](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax) lets you search across the organisation for a function or config key.

Write your findings down as you go. The questions you bring to the customer's engineers after one hour ("Is `legacy_sync.py` still run, or can I ignore it?") earn more respect than silent weeks of reading.

---

## 8. Debugging Method

Guessing feels fast and is slow. Use a loop:

1. **Reproduce.** Get the failure to happen on demand, ideally with the smallest input. If you cannot reproduce it, you are collecting evidence, not debugging yet.
2. **Hypothesise.** Write one sentence: "The import fails because the date column has two formats."
3. **Predict and test.** Decide what you would observe if the hypothesis is true, then check only that.
4. **Narrow.** Halve the search space each step: half the input rows, half the pipeline stages, half the commits.
5. **Fix and lock in.** Fix the cause, add a regression test, note it in the handover log.

| Tool | Use it when |
| --- | --- |
| Logs with context | The failure happens in a deployed environment you cannot attach to. Log IDs, counts and decisions, not just "error". Python's `logging` with a request ID is enough. |
| [`pdb`](https://docs.python.org/3/library/pdb.html) / `breakpoint()` | You can reproduce locally and want to inspect state at the failure point |
| IDE debugger | Stepping through unfamiliar code; see the [VS Code Python debugging guide](https://code.visualstudio.com/docs/python/debugging) |
| [`git bisect`](https://git-scm.com/docs/git-bisect) | "It worked last week." Binary-search commits to find the one that broke it |
| Data bisection | A batch job fails on 2 million rows; split the input until one row reproduces it |
| `EXPLAIN ANALYZE` | A query is slow; read the [plan](https://www.postgresql.org/docs/current/using-explain.html) before adding indexes |

`git bisect` can run unattended when you have a test script that exits non-zero on failure:

```bash
git bisect start HEAD v1.4.0
git bisect run pytest tests/test_ingest.py -x -q
git bisect reset
```

---

## 9. Prototyping Speed Habits

| Habit | In practice |
| --- | --- |
| **Keep a personal template** | A repo with your default layout: `pyproject.toml`, Ruff config, pytest, a Dockerfile, a Makefile with `run`, `test`, `lint`, and a README skeleton. Clone it instead of starting from nothing. |
| **Scaffold, then delete** | Generate the boilerplate (framework CLIs, AI coding assistants), then remove what you do not need. Read every generated line before it reaches a customer. |
| **Time-box explicitly** | "Two hours to get data loading end to end, ugly is fine." When the box ends, decide: continue, cut scope or ask for help. |
| **Hard-code first, generalise second** | One customer, one file format, one region. Make it work for the case in front of you before adding configuration. |
| **Cut scope, not quality on the critical path** | Drop features before you drop the validation on the numbers executives will see. |
| **Thin vertical slice** | Data in, one transformation, one endpoint, one screen. Show it, then widen. |
| **Write the demo script first** | Three sentences describing what the user will see. Build only what the script needs. |

The [Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) covers many of these habits (tracer bullets, prototypes, orthogonality) in more depth. [The Grug Brained Developer](https://grugbrain.dev/) is a short, funny argument for resisting complexity.

---

## 10. The Code Quality Bar for Code You Leave Behind

Prototype code can be rough. Code that stays at the customer after you rotate off cannot, because their engineers will be paged for it. Before handover, every repo needs:

| Item | Minimum contents |
| --- | --- |
| **README** | What it does, who uses it, how to run it locally in one command, how to run tests |
| **Configuration** | All environment-specific values (URLs, credentials, schedules) in environment variables or a config file, never in code. See [Twelve-Factor config](https://12factor.net/). A `.env.example` with every key and no secrets. |
| **Runbook** | How to deploy, how to roll back, what alerts exist, the three most likely failures and what to do for each |
| **Tests in CI** | The suite runs on every pull request in the customer's CI, not just on your laptop |
| **Logging** | Structured logs with enough context to answer "what happened to record X?" |
| **Data assumptions** | Every cleaning rule and its reason, ideally next to the code that applies it |
| **Ownership** | A named customer engineer who has run the deploy and the rollback at least once with you watching |

A handover is complete when the customer team has operated the system without you, not when you send the README. Schedule a session where they deploy a change while you only answer questions. Google's [code review guide](https://google.github.io/eng-practices/review/) is a good shared standard if the customer has none, and the [Diátaxis](https://diataxis.fr/) framework helps you separate tutorials, how-to guides and reference docs.

---

## 11. Exercises

| Level | Exercise | Done when |
| --- | --- | --- |
| **Start** | Write a Python CLI that reads a CSV of orders and prints revenue per customer, handling a missing file and a malformed row gracefully | It runs on a file with bad rows and reports which rows it skipped |
| **Start** | Rewrite a nested-loop join between two 100,000-row lists using a dictionary; time both versions | You can state the speedup and explain the complexity difference |
| **Start** | Clone an open-source Python project you have never seen and produce the one-hour codebase map from Section 7 | You have a sequence diagram for one request and three written questions |
| **Core** | Build the FastAPI service from Section 5 backed by Postgres or SQLite, with cursor pagination and database-stored idempotency keys | Tests cover validation, 404, pagination boundaries and duplicate retries |
| **Core** | Introduce a bug ten commits back in a practice repo, then find it with `git bisect run` | The bisect identifies the commit without manual steps |
| **Core** | Read a small TypeScript or Go service and add one validated field end to end | Change merged via pull request with a passing CI run |
| **Deep** | Take an ingestion script that fails on a large file and find the bad row by data bisection; add a quarantine path for malformed rows | The job completes, logs quarantined row counts, and has a regression test |
| **Deep** | Hand over one of your projects to a peer using only the README and runbook; they must deploy, change a config value and roll back without asking you | They succeed, and you fix every gap they hit in the docs |

When the Deep exercises feel routine, move to [CLOUD_DEPLOYMENT_AND_OPERATIONS.md](CLOUD_DEPLOYMENT_AND_OPERATIONS.md) and [ENTERPRISE_DATA_AND_INTEGRATION.md](ENTERPRISE_DATA_AND_INTEGRATION.md), or return to [START_HERE_ZERO_TO_FDE.md](START_HERE_ZERO_TO_FDE.md) for the full route.
