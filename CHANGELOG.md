# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **Seven new field guides (`docs/guides/`)** for learners starting from zero: a Start-here zero-to-FDE curriculum, Software Fundamentals & Velocity, Cloud Deployment & Operations, Business Acumen & Domains (eight industry primers and compliance regimes), Interviews & Career, Self-Assessment & Feedback (pillar rubrics and review checklists), and a 130-term Glossary.
- **Field guides on the Library page**, listed from `src/data/guides.js`, with a "Start here" pointer for new learners.
- **64 new Library resources** (152 total): university lecture series (Harvard CS50, MIT 6.006 and 6.5840, CMU 15-445), from-zero programming and SQL courses, Karpathy's LLM lectures, Terraform, Helm, Prometheus, PortSwigger Web Security Academy, C4, ADRs, Enterprise Integration Patterns and more.
- **Two orientation lessons** with knowledge checks: "Starting from zero" and "How enterprises buy software".
- **Learner feedback issue template**, linked from the README, the self-assessment guide and the last orientation lesson.
- The Lectures, Talks & Reading List guide gains from-zero, university-course and channels-to-follow sections.
- The validator now checks that every field guide is listed and exists, and that relative links in the guides and README resolve.

- **Expanded Library**: Curated learning library expanded from 55 to 88 vetted resources across all topics and levels, adding support for video resources (conference talks, architecture deep dives) and canonical engineering articles from Palantir, Databricks, Stripe, Martin Fowler, and ByteByteGo.
- **Deep-Dive Technical Guides (`docs/guides/`)**: Six comprehensive field manuals covering the Decomposition Playbook, Enterprise Data & Integration (CDC, Spark skew, DuckDB, entity resolution), Air-Gap, Security & Networking (TLS proxies, SAML/OIDC, offline bundles), Applied AI in Enterprise (Production RAG, MCP tool design, CI evals), Client Diplomacy & Field Survival (The Mom Test, Minto Pyramid, scope negotiation), and a Curated Media & Reading List.
- **Two End-to-End Decomp Case Studies**: Real-Time Financial Crime & AML Triage with High-Throughput CDC (`cs_fraud_aml`) and Regional Emergency Bed and Patient Transfer Coordination (`cs_hospital_bed_coordination`).
- **Five Question Bank Prompts**: Reconciling CDC lakehouses against legacy ERPs, securing enterprise MCP servers against prompt injection, isolating TCP connection resets behind corporate proxies, greedy interval equipment scheduling, and handling client VP escalation after an ingestion failure.
- Linting for JavaScript (ESLint), CSS (Stylelint), HTML (html-validate) and Markdown (markdownlint).
- Unit tests (Node's built-in test runner) for the journey, XP and simulator logic, the content data and the dev server.
- End-to-end browser tests (Playwright) covering every route, saved progress, themes and mobile layout.
- CI runs lint, unit tests with coverage, and end-to-end tests on every pull request.
- **Interactive diagrams** (`src/lib/diagrams.js`): a deployment lifecycle, role comparison, five-pillar map, toolkit stack, 90-day trust curve, field triage ladder and field-to-product flywheel, plus a journey route map, a live simulator system map, case overviews and playbook interview loops. Each has a keyboard-accessible button row and a detail panel.
- **Four orientation lessons on succeeding in the job**: your first 90 days on a deployment, field triage inside customer networks, proving impact and feeding the product, and working sustainably (customer data, escalation, focus).
- **Knowledge checks** in every lesson: one-shot questions with explanations, worth 10 XP when answered correctly first time (saved as `fde_checks`).
- Five question-bank prompts on the first 30 days, in-cluster debugging, proving value, data boundaries and raising bad news early.
- Sections fade in as they scroll into view; diagrams draw and pulse. All motion is skipped when the user prefers reduced motion.

### Changed

- **Pages deploys only after CI passes** on `main`, and it publishes exactly the commit CI tested.
- **CI audits dependencies** (`npm audit --audit-level=high` and `npm audit signatures`), and checkouts no longer persist credentials.
- **Weekly link check covers the guides**: every external link in the README and `docs/guides/` (239 links in total).
- **Dev dependencies updated to latest** (Playwright 1.64, axe-core 4.14, ESLint 10.13, html-validate 11.17, markdownlint-cli2 0.24). Overrides pin patched `re2js` and `katex`, so `npm audit` reports 0 vulnerabilities.
- **Strict Content-Security-Policy**. The pre-paint theme script moved to `src/theme-init.js` so no inline script is needed.
- **Dev server** answers only GET and HEAD (405 otherwise) and sends `nosniff`, `X-Frame-Options` and `Referrer-Policy` headers.
- Added a favicon, canonical link, `color-scheme` meta and a no-JavaScript fallback that links to the guides.
- Browser tests: the new lessons are in the route list; accessibility checks now also cover onboarding, a project, a case and a new lesson; added tests for the CSP and for the no-JavaScript fallback.

- Pure logic moved out of `src/main.js` into `src/lib/core.js` and `src/lib/journey.js` so it can be unit tested.

### Fixed

- **Header brand link and XP pill** now have accessible names that match their visible text (WCAG 2.5.3, flagged by axe-core 4.14).
- **Five dead Library videos replaced** (Palantir AIP demo, sagas, reverse proxies, Linux performance, system-design interview) and two videos re-credited to the channel that actually published them.
- **Three unverifiable articles replaced** with real sources: Palantir's "A Day in the Life of a Forward Deployed Software Engineer", PostHog's FDE explainer and Palantir's official Ontology docs.
- The link checker now detects deleted YouTube videos through oEmbed (YouTube returns 200 for any watch URL).

- Lesson and journey pages no longer scroll sideways on phones when they contain long code samples or the route map.
- The five-pillars lesson now uses the same pillar names as the diagnostic.

- Dev server no longer serves files from sibling folders whose names start with the project folder's name (path traversal), and refuses dotfiles such as `.git/`.

## [1.0.0] — 2026-10-05

First public release, built around a guided learning journey.

### Added

- **Core content**: experience-tailored 12-week roadmaps, a five-pillar skill diagnostic, field simulator, company playbooks, decomp case studies and a question bank.
- **Journey**: a route of stations per experience track, with progress ring, XP and ranks, a "next up" card and a 7-day activity strip. Each station links to resources to learn from, a lab to practice in, and a portfolio project to build.
- **Orientation (Station 00)**: seven lessons for people starting from zero — the role, how it compares to SWE/SA/consulting, a week in the field, the five pillars, a starter toolkit, communication frameworks, and how to use the guide.
- **Library**: 55 vetted resources grouped by skill and level, with filters, search and "mark done".
- **Portfolio projects**: 10 mini-deployments with customer briefs and trackable acceptance criteria.
- **Decomp drill**: 12 timed prompts with a five-phase scaffold, hints, a mid-drill twist, a self-review rubric and Markdown export.
- **Story bank**: eight behavioral prompts in STAR form with Markdown export.
- **Field simulator**: a fourth scenario on steering-committee scope negotiation.
- **Question bank**: expanded from 6 to 20 questions, with new Behavioral and Product Sense categories.
- **Diagnostic**: "close the gap" resources and project for your weakest pillar; one-click track switch.
- Onboarding flow, light and dark themes, mobile tab bar, deep-linkable routes.
- Support links (GitHub Sponsors, Buy Me a Coffee) and companion guide links.
- Open-source tooling: content validator, link checker, CI, GitHub Pages deployment, issue and PR templates, contributing guide.

### Changed

- Project renamed to **FDE from Scratch**.
- Company playbooks, roadmaps, simulations, cases, diagnostic and question bank reviewed for accuracy, tone and originality; specific compensation figures removed.
- Station reading lists now link to real resources instead of plain text.
- Emoji icons replaced with accessible SVG icons.

[Unreleased]: https://github.com/mchittineni/fde-from-scratch/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mchittineni/fde-from-scratch/releases/tag/v1.0.0
