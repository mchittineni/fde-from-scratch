# Architecture

FDE from Scratch is a static single-page app with no runtime dependencies: one HTML shell, two stylesheets, and native ES modules. There is no build step. Dev dependencies are used only for linting and tests.

```text
index.html            Shell: header, <main id="app">, footer, mobile tab bar, toast region
styles/main.css       Design tokens (dark + light), reset, layout, header, footer, tab bar
styles/components.css Every component: hero, journey route, stations, labs, library, drill…
src/main.js           Router, state, views and actions
src/lib/core.js       Pure helpers: esc(), XP and ranks, simulator scoring, drill clock
src/lib/journey.js    Pure station logic: TOPIC_RULES, learnFor(), projectFor(), practiceFor()
src/data/*.js         All content (see CONTRIBUTING.md → Content guide)
scripts/validate.mjs  Content + syntax validation (CI)
scripts/check-links.mjs  Library link checker (weekly CI job)
server.js             Local dev server only (exports createServer() for tests)
tests/unit/           Node test runner
tests/e2e/            Playwright specs and shared fixtures
```

## Routing

Routes are hash-based so the site works on any static host (including GitHub Pages) and every page is deep-linkable.

| Route | View |
| --- | --- |
| `#/` | Home |
| `#/start` | Onboarding (track → target company → launch) |
| `#/journey` | The station route for the current track |
| `#/orientation/:slug` | Orientation lesson reader |
| `#/library?t=:topic` | Library, optionally pre-filtered |
| `#/labs` | Labs hub |
| `#/labs/projects/:id` | Portfolio projects |
| `#/labs/decomp/:id` | Decomp drill |
| `#/labs/stories` | Story bank |
| `#/labs/diagnostic` | Skill diagnostic |
| `#/labs/simulator/:id` | Field simulator |
| `#/labs/cases/:id` | Decomp case studies |
| `#/labs/questions?c=:category` | Question bank |
| `#/playbooks/:id` | Company playbooks |

`ROUTES` in `main.js` maps a regex to a view function. Each view returns `{ title, html, after? }`; `render()` writes the HTML into `#app`, updates the document title and header, and calls `after()` for any listeners the view needs.

## State and persistence

`state` in `main.js` holds everything. Durable fields are mirrored to `localStorage` through `store.get` / `store.set` (wrapped in `try/catch` so private browsing still works). Nothing is sent to a server.

| Key | Contents |
| --- | --- |
| `fde_role`, `fde_onboarded`, `fde_target` | Chosen track, onboarding flag, target company |
| `fde_tasks` | Checked roadmap and final-station milestones |
| `fde_lessons` | Orientation lessons read |
| `fde_quiz_answers`, `fde_diag_done` | Diagnostic answers |
| `fde_sims` | Best simulator score per scenario |
| `fde_studied`, `fde_practiced` | Cases studied, questions practiced |
| `fde_projects` | Portfolio project criteria met |
| `fde_drills` | Decomp drill notes, rubric and completion |
| `fde_stories`, `fde_stories_awarded` | Story bank text and completion |
| `fde_resources` | Library items marked done |
| `fde_activity` | Days with activity (for the weekly strip) |
| `fde_theme` | Light/dark override |

Content IDs are the keys inside these records, which is why existing IDs must never change.

## The journey model

`stationsFor(roleId)` builds the route: Station 00 (orientation), one station per track week, and the final "Loop" station. For each week it:

1. scores `TOPIC_RULES` against the title and summary to pick a primary (and optional secondary) Library topic;
2. picks resources with `learnFor()`, preferring the level that suits the track;
3. picks a portfolio project with `projectFor()`;
4. picks lab links with `practiceFor()`.

A station is `done` when all its items are checked; the first unfinished station is `current`. XP is derived from saved state by `totalXP()` — there is no separate XP store.

The scoring functions live in `src/lib/` and take progress as arguments (`learnFor(topics, { role, readRes })`), so they can be unit tested without a browser. `main.js` binds them to the live `state`.

## Rendering and events

- Views are template strings. **Every interpolated data value goes through `esc()`.**
- Clicks are handled by one delegated listener that dispatches on `data-action` to the `ACTIONS` map.
- Checkbox changes (`data-task`, `data-crit`, `data-rubric`) and textarea input (`data-note`, `data-story`) are delegated too. Textareas save as you type without re-rendering, so the caret stays put.
- `rerender()` re-runs the current view in place, preserving scroll position and focus (via `data-key`).

## Adding a new lab

1. Add its content to `src/data/labs.js` (or a new data module) and extend `scripts/validate.mjs`.
2. Write a `viewX()` function in `main.js` and register it in `ROUTES`.
3. Add any `ACTIONS`, and a `localStorage` key if it saves progress.
4. Add a tile in `labTiles()` and, if it earns XP, include it in `totalXP()` in `src/lib/core.js` (and its unit test).
5. Add styles to `components.css` using the existing tokens.
6. Add the route to `ROUTES` in `tests/e2e/fixtures.js` and write a spec for its main interaction.
