# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

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

- Pure logic moved out of `src/main.js` into `src/lib/core.js` and `src/lib/journey.js` so it can be unit tested.

### Fixed

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
