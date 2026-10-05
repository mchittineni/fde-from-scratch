# Contributing to FDE from Scratch

Thanks for helping people become Forward Deployed Engineers. Most contributions are **content** — a better resource, a sharper interview question, a new decomp prompt — and you don't need to touch the UI to make them.

- [Ways to contribute](#ways-to-contribute)
- [Run it locally](#run-it-locally)
- [Content guide](#content-guide)
- [Quality bar](#quality-bar)
- [Code changes](#code-changes)
- [Pull request checklist](#pull-request-checklist)

By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

| You want to… | Do this |
| --- | --- |
| Report something broken | Open a [bug report](https://github.com/mchittineni/fde-from-scratch/issues/new?template=bug_report.yml) |
| Suggest content without writing code | Open a [content suggestion](https://github.com/mchittineni/fde-from-scratch/issues/new?template=content.yml) |
| Add or fix content yourself | Edit a file in `src/data/` and open a pull request (see below) |
| Improve the UI or accessibility | Open an issue first for anything bigger than a small fix |

Good first contributions: a missing Library resource for your specialty, a question you were actually asked (in your own words, see [confidentiality](#confidentiality)), a decomp prompt from an industry you know, or fixing an outdated company playbook detail.

## Run it locally

The site has no runtime dependencies. The linters and test runners are dev dependencies, so install them once.

```bash
git clone https://github.com/mchittineni/fde-from-scratch.git
cd fde-from-scratch
npm ci                              # dev tools only: linters, Playwright
npx playwright install chromium     # once, for the end-to-end tests
npm start                           # http://localhost:5173
```

Node 26 or newer is required for the scripts. The site itself is static: you can also serve the folder with `python3 -m http.server 5173`.

## Checks

Every pull request runs these in CI. Run them locally before you push:

| Command | What it checks |
| --- | --- |
| `npm run lint` | ESLint (JS), Stylelint (CSS), html-validate (`index.html`) and markdownlint (docs) |
| `npm run lint:fix` | Auto-fixes what the linters can |
| `npm test` | Content validator plus unit tests (fast, no browser) |
| `npm run test:coverage` | Unit tests with coverage thresholds (90% lines and functions, 80% branches) |
| `npm run test:e2e` | Playwright tests in Chromium: every route, saved progress, keyboard use, themes, mobile layout and axe accessibility checks |
| `npm run test:all` | All of the above |
| `npm run check:links` | Every Library URL still loads (needs network; runs weekly in CI) |

Where tests live:

- `tests/unit/` uses Node's built-in test runner. It covers `src/lib/` (XP, ranks, simulator scoring, drill clock, how stations pick topics, resources and projects), diagnostic scoring, content guardrails and the dev server.
- `tests/e2e/` uses Playwright. The shared fixture fails any test whose page logs a console error. Use `npx playwright test --ui` to debug, and `npx playwright show-report` after a failure.

If you change how stations choose resources (`TOPIC_RULES` in `src/lib/journey.js`), the unit test "every roadmap station gets useful links" checks all tracks for you.

Progress is stored in your browser's `localStorage`. To start fresh, open the dev tools console and run `localStorage.clear()`.

## Content guide

All content lives in plain ES modules under [`src/data/`](src/data). Each entry is an object; IDs must be unique (the validator checks this). Never change an existing `id` — it is the key for learners' saved progress.

| File | What it holds |
| --- | --- |
| `foundations.js` | Station 00 orientation lessons |
| `roadmaps.js` | The five experience tracks and their weekly milestones |
| `resources.js` | The Library |
| `labs.js` | Portfolio projects, decomp drill prompts, the story bank |
| `questionBank.js` | Interview questions with model answers |
| `simulations.js` | Field simulator scenarios |
| `caseStudies.js` | Decomp architecture cases |
| `companies.js` | Company interview playbooks |
| `diagnostic.js` | The 15-question skill diagnostic |

### Add a Library resource

```js
{
  id: 'r-short-name',          // unique, never reuse
  topic: 'data',               // velocity | data | ai | infra | security | decomp | diplomacy | interview
  level: 'Core',               // Start (from zero) | Core (job-ready) | Deep (senior+)
  type: 'Docs',                // Book | Docs | Course | Article | Tool | Guide
  free: true,
  title: 'Exact title of the resource',
  url: 'https://canonical-source.example/',
  why: 'One sentence on why an aspiring FDE should read this.'
}
```

- Link to the **canonical source** (the author, publisher or project), never a mirror, affiliate link or pirated copy.
- For books without an official page, use an Open Library search link — see the `book()` helper in `resources.js`.
- Prefer free resources. A paid resource needs to be clearly the best option for its topic.
- Run `npm run check:links` after adding links.

### Add a question

```js
{
  id: 'qb_21',
  category: 'The Decomp',      // reuse an existing category where possible
  company: 'Databricks',       // or a style like 'All Enterprise Leaders'
  level: 'Mid / Senior',
  title: 'Short title',
  prompt: 'The question as an interviewer would ask it.',
  modelAnswer: '1. First step…\n2. Second step…',   // numbered lines separated by \n
  redFlags: 'What weak answers do.',
  followUp: 'The probe an interviewer asks next.'
}
```

### Add a portfolio project or decomp prompt

See the existing entries in `labs.js`. A project needs a realistic customer **brief**, what to **build**, four testable **criteria**, the **proof** to show, and Library `resources` IDs that exist. A decomp prompt needs a **twist** — a constraint the interviewer adds halfway through.

### Add a simulation

Each stage has 2–3 options. `impact` uses only `trust`, `integrity` and `velocity` (positive or negative). Write `feedback` that teaches *why* a choice is good or bad, not just whether it is.

## Quality bar

- **Accurate.** If you describe a company's interview loop, products or compensation, it should be current and publicly verifiable. Mark uncertain details as approximate.
- **Practical.** Every addition should help someone do the job or pass the interview. Prefer concrete steps, commands and trade-offs over buzzwords.
- **Plain language.** Write for an engineer who is new to the field. Short sentences, no hype.
- **Vendor-neutral where possible.** Name tools when they matter, but teach the underlying idea.

### Confidentiality

Do **not** submit interview questions, rubrics or internal material you received under an NDA or that a company asked candidates to keep private. Paraphrase the *type* of problem in your own words instead. Pull requests that appear to contain confidential material will be closed.

## Code changes

The app has no runtime dependencies: HTML, CSS and native ES modules. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how routing, state and views fit together.

- Keep the site free of runtime dependencies unless there is a strong reason; discuss in an issue first. Dev tooling is fine.
- Put logic that doesn't need the DOM in `src/lib/` as pure functions, and unit test it in `tests/unit/`.
- New views or interactions need a Playwright test in `tests/e2e/`, and new routes go in `ROUTES` in `tests/e2e/fixtures.js` so they get the smoke, mobile and accessibility checks.
- Every interpolated value in a view template goes through `esc()`.
- Use the design tokens in `styles/main.css` (`var(--accent)`, `var(--surface)`…) rather than raw colors, and check both light and dark mode.
- Keep it accessible: keyboard reachable, visible focus, labeled controls, 44px touch targets, no information conveyed by color alone.
- Check the layout at 375px wide — there must be no horizontal scroll.

## Pull request checklist

1. Fork, then create a branch: `git checkout -b content/add-kafka-resource`.
2. Make your change and run `npm run lint` and `npm test`. For code or layout changes, also run `npm run test:e2e`.
3. Open the pages you touched with `npm start`, in light and dark mode.
4. Use a clear commit message, e.g. `content: add Kafka exactly-once resource` or `fix: drill timer pauses on navigation`.
5. Open a pull request and fill in the template.

A maintainer will review within a week or so. Thank you!
