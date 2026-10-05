# FDE from Scratch — Zero to Forward Deployed

[![CI](https://github.com/mchittineni/fde-from-scratch/actions/workflows/ci.yml/badge.svg)](https://github.com/mchittineni/fde-from-scratch/actions/workflows/ci.yml)
[![Link check](https://github.com/mchittineni/fde-from-scratch/actions/workflows/links.yml/badge.svg)](https://github.com/mchittineni/fde-from-scratch/actions/workflows/links.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-3DDC97.svg)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-3DDC97.svg)](CONTRIBUTING.md)

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=000000)](https://buymeacoffee.com/mchittineni)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-24292F?style=for-the-badge&logo=githubsponsors&logoColor=EA4AAA)](https://github.com/sponsors/mchittineni)

A free, open-source field guide to becoming a **Forward Deployed Engineer (FDE)** — the engineers who embed with customers, untangle their data and politics, and ship production software that changes a real business outcome.

It starts from zero with what the job actually is, then walks you along a route of stations tailored to your experience level. Each station tells you what to learn (with vetted resources), where to practice (hands-on labs) and what to build (portfolio projects). It ends with a rehearsed interview loop for the company you're targeting.

**[Open the guide →](https://mchittineni.github.io/fde-from-scratch/)**

## What's inside

### The journey

| Station | What happens there |
| --- | --- |
| **00 · Orientation** | Seven short reads: what an FDE does, FDE vs SWE / SA / consultant, a week in the field, the five pillars, the starter toolkit, everyday communication frameworks, and how to use the guide. |
| **01–06 · Your track** | Week-by-week milestones for your level — Associate (0–2 YOE), Mid (2–5), Senior (5–9), Staff / Field CTO (10+), or role transitioner. Each milestone names the proof artifact to produce. |
| **GO · The Loop** | Rehearse your target company's interview: playbook, simulations, story bank, timed decomps and a full mock loop. |

Progress, XP, ranks, notes and stories are saved in your browser. There are no accounts and nothing is sent anywhere.

### Labs

- **Portfolio projects** — 10 mini-deployments (data explorer, messy ingestion, SSO + RBAC, air-gapped bundle, grounded RAG with evals, MCP server, streaming, decomp write-up, incident drill, exec demo), each with a customer brief and trackable acceptance criteria.
- **Decomp drill** — 12 prompts across industries, a 45-minute clock, a five-phase scaffold with hints, a mid-drill twist, a self-review rubric, and Markdown export.
- **Field simulator** — four branching client crises with live trust, integrity and velocity meters.
- **Story bank** — eight behavioral prompts every FDE loop asks, in STAR form, exportable as Markdown.
- **Skill diagnostic** — 15 scenario questions across five pillars, a radar of your strengths, a recommended track and resources for your weakest area.
- **Decomp cases** — end-to-end architectures with entity models, ingestion, writeback and trade-offs.
- **Question bank** — 20 prompts across eight categories with model answers, red flags and follow-up probes.

### Library

55 vetted resources — docs, books, courses, tools and articles — grouped by skill and level (Start, Core, Deep). 46 are free, and every link is checked weekly in CI.

### Playbooks

Interview loop stages, decomp formulas, red flags and sample questions for Palantir, Databricks, Scale AI, OpenAI & Anthropic, and Snowflake.

## Run it locally

No runtime dependencies — plain HTML, CSS and ES modules. Dev dependencies are only for linting and tests.

```bash
git clone https://github.com/mchittineni/fde-from-scratch.git
cd fde-from-scratch
npm ci
npm start            # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm start` | Serve the site locally on port 5173 |
| `npm run lint` | Lint JavaScript, CSS, HTML and Markdown |
| `npm test` | Validate content data and run unit tests |
| `npm run test:e2e` | Run Playwright browser tests, including accessibility checks (run `npx playwright install chromium` once first) |
| `npm run test:all` | Lint plus every test |
| `npm run check:links` | Check every Library link still loads |

CI runs lint, unit tests with coverage, and the browser tests on every pull request.

Routes are hash-based and deep-linkable, e.g. `#/journey`, `#/library?t=ai`, `#/labs/projects/p-rag`, `#/labs/decomp/d3`, `#/playbooks/palantir`.

The site deploys to GitHub Pages automatically on every push to `main` (see [`.github/workflows/pages.yml`](.github/workflows/pages.yml)).

## Contributing

Contributions are very welcome — especially content from people who do this work. Good places to start:

- Add a Library resource you learned from
- Write a question in the style you were asked (in your own words)
- Add a decomp prompt from an industry you know
- Correct an outdated company playbook detail

Read the [contributing guide](CONTRIBUTING.md) for the content format and quality bar, and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) if you're changing code. Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

Never submit interview material covered by an NDA or that a company asked candidates to keep confidential.

## Project layout

```text
index.html            App shell
styles/               Design tokens and components (dark + light)
src/main.js           Router, views, actions
src/lib/              Pure logic: XP, ranks, scoring, drill clock, station topic matching
src/data/             All content — lessons, tracks, library, labs, questions, playbooks
scripts/              Content validator and link checker
tests/unit/           Node test runner: logic, content guardrails, dev server
tests/e2e/            Playwright: every route, progress, mobile, accessibility
docs/                 Architecture notes
.github/              CI, link check, Pages deploy, issue and PR templates
```

## More guides

- [Ultimate DevOps Guide](https://github.com/mchittineni/ultimate-devops-guide) — CI/CD, containers, IaC, observability and SRE.
- [Ultimate AI Engineering Guide](https://github.com/mchittineni/ultimate-ai-engineering-guide) — LLMs, retrieval, agents, evals and inference.
- [Ultimate Platform Engineering Guide](https://github.com/mchittineni/ultimate-platform-engineering-guide) — IDPs, Kubernetes, GitOps, multi-tenancy, FinOps.

## Support

If this guide helped you, you can [buy me a coffee](https://buymeacoffee.com/mchittineni) or [sponsor on GitHub](https://github.com/sponsors/mchittineni). Starring the repo and sharing it with someone preparing for an FDE role helps too.

## Disclaimer

This is an independent community project. It is not affiliated with, endorsed by, or sponsored by any company named in it. Company names are used only to describe publicly known roles and interview formats, which change over time. Compensation figures are approximate. Always confirm details with the company's official careers pages.

## License

[MIT](LICENSE) © mchittineni and contributors
