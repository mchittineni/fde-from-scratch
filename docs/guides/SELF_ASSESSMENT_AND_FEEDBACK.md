# Self-Assessment and Feedback

How to measure your progress toward a Forward Deployed Engineer role, get useful feedback when you're learning alone, and review your own work the way a senior FDE would.

---

## 1. Why Measure at All

Learning alone has one big failure mode: you can't tell what you don't know. You finish tutorials, feel busy, and still freeze in a decomp interview or a customer escalation. The fix is to measure **observable behavior** (what you can do, on a clock, in front of someone) rather than inputs (hours studied, videos watched).

Use three sources of signal together:

| Source | What it tells you | Where to get it |
| --- | --- | --- |
| **Self-assessment** | Where you think you are, against a written rubric | The level rubric below; the app's [Skill diagnostic](https://mchittineni.github.io/fde-from-scratch/#/labs/diagnostic) |
| **Artifacts** | Whether you can actually ship | Portfolio projects that meet their acceptance criteria; timed Decomp drill write-ups |
| **Other people** | What you can't see yourself | Peer reviews, mock interviews, open-source code review, recordings |

---

## 2. Level Rubric for the Five Pillars

The pillars match the app's Skill diagnostic. **Beginner** means you're learning the basics. **Job-ready** means you could do the work on a real deployment with normal support. **Senior** means you lead it and others rely on your judgment. You're at a level when you do these things consistently, not once.

### Software Engineering and Velocity

| Beginner | Job-ready | Senior |
| --- | --- | --- |
| Writes working scripts in one language with help from docs and examples | Ships a working prototype of a small app in hours, with a README and one-command setup | Ships production-quality features fast in unfamiliar codebases and sets the pattern others follow |
| Uses Git for commits and pushes; struggles with merge conflicts | Uses branches, pull requests and code review routinely; resolves conflicts calmly | Designs the repo, CI and review process for a deployment team |
| Debugs by adding print statements and guessing | Reproduces bugs, reads stack traces and logs, tests one hypothesis at a time | Debugs production systems they didn't write, under customer pressure, and writes the postmortem |
| Writes few or no tests | Writes tests for the core logic and the edge cases that broke before | Chooses the right test strategy for the risk, and makes test failures easy to diagnose |

### Data, AI and Infrastructure

| Beginner | Job-ready | Senior |
| --- | --- | --- |
| Writes basic SQL `SELECT`, `JOIN` and `GROUP BY` | Uses CTEs and window functions; reads a query plan to find a slow step | Designs data models and pipelines for many sources, freshness needs and access rules |
| Loads a clean CSV into a notebook | Builds an idempotent pipeline that handles bad rows, timezones and duplicates, with a quality report | Designs ingestion with CDC, schema evolution and entity resolution across systems |
| Has called an LLM API | Builds a retrieval-augmented app with citations and a small eval set | Sets eval strategy, guardrails and cost/latency budgets for AI systems customers depend on |
| Has deployed something to one cloud with a tutorial | Containerizes an app, deploys it, and reads its logs and metrics | Designs deployments across cloud, on-prem and restricted networks with clear operations ownership |

### Enterprise Security and Networking

| Beginner | Job-ready | Senior |
| --- | --- | --- |
| Knows what HTTPS, a firewall and a password manager are | Explains TLS, DNS, proxies and ports well enough to debug "it can't connect" | Leads network and security reviews with a customer's security team and gets approval |
| Has used "Log in with Google" | Implements SSO with OIDC (or understands SAML) and maps IdP groups to roles | Designs identity, RBAC/ABAC and audit for multi-team, sensitive data |
| Keeps secrets in code or `.env` files committed by mistake | Uses a secrets manager or environment injection; never commits secrets | Designs secrets, key rotation and least-privilege access for a whole deployment |
| Hasn't worked offline | Can build an install bundle that works without internet access | Runs air-gapped deployments end to end, including updates, SBOMs and signed artifacts |

### Decomposition and Problem Solving

| Beginner | Job-ready | Senior |
| --- | --- | --- |
| Starts with technology ("I'd use Kafka") | Starts with the operator, the decision and a success metric | Reframes the customer's stated problem into the one that actually matters, and gets agreement |
| Models database tables | Models entities, relationships, events and state transitions | Models a domain that several teams can build on, with clear ownership per source system |
| Forgets writeback and failures | Covers writeback safety (idempotency, approvals, audit) and three failure modes | Anticipates twists before they're raised and designs a phased plan around them |
| Runs out of time in a 45-minute drill | Finishes all five phases on time and adapts to a twist | Can run the same exercise live with a customer and leave with a signed-off first milestone |

### Client Diplomacy

| Beginner | Job-ready | Senior |
| --- | --- | --- |
| Explains technical work in technical terms only | Explains the same work to an engineer and to an executive, answer first | Runs executive readouts and steering meetings; influences decisions |
| Avoids conflict or agrees to every request | Acknowledges objections, clarifies the underlying need and offers trade-offs | Turns skeptical stakeholders into champions; negotiates scope without damaging trust |
| Tells people about problems late | Shares bad news within a day, with options | Manages the whole relationship through incidents, including the customer's internal politics |
| Writes long, unstructured updates | Writes short weekly status updates with status, risks and asks | Sets the communication cadence for a deployment and coaches others on it |

---

## 3. Monthly Self-Review Template

Block 45 minutes once a month. Copy this into a file in your notes or a private repo and keep every month's version, so you can see the trend.

```markdown
# Self-review: <Month YYYY>

## 1. Shipped this month
- <artifact + link> — which acceptance criteria it meets, and how I verified them

## 2. Pillar levels (Beginner / Job-ready / Senior) and the evidence
| Pillar | Last month | This month | Evidence (link or one line) |
| --- | --- | --- | --- |
| Software engineering & velocity | | | |
| Data, AI & infra | | | |
| Enterprise security & networking | | | |
| Decomposition & problem solving | | | |
| Client diplomacy | | | |

## 3. Timed practice
- Decomp drills completed: <n>; average rubric score: <x/6>; most-missed item: <...>
- Coding problems: <n>; patterns I still miss: <...>
- Mock interviews: <n>; top feedback themes: <...>

## 4. Feedback received
- From <who>: <what they said> → <what I'm changing>

## 5. What didn't work
- <habit, resource or plan I'm dropping, and why>

## 6. Next month: the three things that move me most
1. <specific, finishable goal with a proof artifact>
2. ...
3. ...
```

Retake the Skill diagnostic every month or two and compare the radar chart to the previous one.

---

## 4. Getting Feedback When You're Learning Alone

| Method | Best for | How to make it work |
| --- | --- | --- |
| **Peer review partner** | Write-ups, demos, decomp drills | Find one or two people at a similar level; trade one review per week; use the forms in section 5 so feedback is specific |
| **Open-source contributions** | Code quality, collaboration, reading unfamiliar code | Start with issues labelled "good first issue" (for example via [goodfirstissue.dev](https://goodfirstissue.dev/)); read the project's contributing guide; expect review comments and treat them as free mentoring |
| **Mock interview partners** | Interview rounds | Run mocks as described in [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md), section 7 |
| **Recording yourself** | Demos, decomp drills, behavioral answers | Record a 2-minute demo or a full drill, wait a day, then watch it with the rubric. Count filler words, long pauses and skipped phases |
| **Asking for code review** | Specific code you're unsure about | Ask in a community forum or a colleague, with a small diff, the context, and a specific question (see section 6) |
| **Teaching** | Checking real understanding | Write a short explainer or answer beginner questions in a community. Gaps show up immediately |
| **Automated checks** | Basic code hygiene | Linters, formatters, type checkers and tests in CI catch the easy issues so humans can focus on design |

When you ask a stranger for feedback, make it cheap: a link, two sentences of context, and one or two specific questions. "Any feedback?" usually gets nothing useful.

---

## 5. Checklists for Reviewing Your Own Work

### Code Review Checklist

Run through this before asking anyone else to look. Google's public [code review guide](https://google.github.io/eng-practices/review/) and its [what to look for](https://google.github.io/eng-practices/review/reviewer/looking-for.html) page are good references.

- [ ] It does what the task asked, and I've run it, not just compiled it.
- [ ] Someone else can run it from the README with one command on a clean machine.
- [ ] Bad input (empty, malformed, duplicated, very large) fails with a clear message, not a stack trace.
- [ ] Re-running it doesn't create duplicates or side effects (idempotent where it matters).
- [ ] No secrets, tokens or customer data are in the code, the Git history or the logs.
- [ ] Names describe what things are; functions do one thing.
- [ ] Tests cover the core logic and at least one previous bug.
- [ ] Errors are logged with enough context to debug without me.
- [ ] Access checks happen on the server, not only in the UI.
- [ ] The diff is small enough to review in one sitting; unrelated changes are split out.

### Decomp Write-Up Rubric

Score each item 0 (missing), 1 (partial) or 2 (strong). It extends the Decomp drill's six-item self-review rubric.

| # | Criterion | 0 / 1 / 2 |
| --- | --- | --- |
| 1 | Names the operator, the decision they make, how often, and the success metric | |
| 2 | States assumptions explicitly and says how they'd be checked | |
| 3 | Entity model includes events and state transitions, and notes which system owns each entity | |
| 4 | Handles at least one messy data source concretely (join keys, freshness, quality) | |
| 5 | Describes the operator workflow and what is written back, with idempotency, approvals and audit | |
| 6 | Covers at least three failure modes with a mitigation each | |
| 7 | Adapts cleanly to the twist and says what changed | |
| 8 | Proposes a first milestone shippable in weeks, and what's deliberately cut | |
| 9 | Explains trade-offs (why this, not that) | |
| 10 | Readable: a stakeholder could follow it in five minutes | |

A score of 15+ out of 20 is a reasonable target before an interview. See [DECOMPOSITION_PLAYBOOK.md](DECOMPOSITION_PLAYBOOK.md) for the method.

### Demo and Readout Feedback Form

Give this to whoever watches your demo, or fill it in yourself from a recording.

| Question | Answer |
| --- | --- |
| In the first 30 seconds, could you say what problem this solves and for whom? | Yes / Partly / No |
| What was the one thing you remember? | |
| Was there a moment you got lost? When? | |
| Did you see a real workflow end to end, or only screens? | |
| Was any technical detail shown before you understood why it mattered? | |
| Was the ask or next step clear at the end? | Yes / No — what was it? |
| One thing to keep | |
| One thing to change | |

### Written Status Update Checklist

- [ ] The first line is the answer: on track, at risk or off track, and why, in one sentence.
- [ ] Progress is stated as outcomes (what works now), not activity (what I did).
- [ ] Risks name an owner and a date, with a mitigation.
- [ ] Asks are explicit: who needs to do what, by when.
- [ ] Bad news isn't buried at the bottom.
- [ ] Readable in under a minute; detail is linked, not pasted.
- [ ] No jargon the reader wouldn't use; acronyms expanded on first use.
- [ ] Sent on the same day and channel every week.

[CLIENT_DIPLOMACY_AND_SURVIVAL.md](CLIENT_DIPLOMACY_AND_SURVIVAL.md) shows an answer-first update example.

---

## 6. Giving and Receiving Feedback Well

### Situation–Behavior–Impact (SBI)

SBI is a widely used feedback model, developed by the Center for Creative Leadership. It keeps feedback specific and about behavior, not personality.

| Part | What to say | Example |
| --- | --- | --- |
| **Situation** | When and where | "In yesterday's demo to the operations lead..." |
| **Behavior** | What the person did, observably | "...you showed the architecture diagram for the first four minutes..." |
| **Impact** | The effect it had | "...and she asked twice what the tool was for before you reached the workflow." |

Then add a suggestion or a question: "Next time, could you open with the dispatcher's screen?"

### Asking Specific Questions

Specific questions get specific answers.

| Vague | Specific |
| --- | --- |
| "Any feedback on my repo?" | "Would you be able to run this from the README in under five minutes? Where did you get stuck?" |
| "Was my decomp good?" | "Did my entity model miss anything an operator would need? Did I spend too long on ingestion?" |
| "How was my demo?" | "At what point did you understand the problem? What would you cut?" |
| "Can you review my code?" | "I'm unsure whether the retry logic in `sync.py` can create duplicates. Can you check lines 40–80?" |

### Receiving Feedback

- **Listen to understand, then say thanks.** Don't defend or explain in the moment.
- **Ask one clarifying question** if it's vague: "Can you point to where that happened?"
- **Look for patterns.** One person's opinion is a data point; the same comment from three people is a priority.
- **Close the loop.** Tell the reviewer what you changed. People keep helping those who visibly use their help.

### Giving Feedback

- Lead with what worked, specifically, so they keep doing it.
- Pick the one or two changes that matter most.
- Be specific (SBI), kind and timely.
- Review the work, not the person.

---

## 7. Deployment Retros and Blameless Postmortems

Once you're on a deployment (or running a portfolio project as if you were), the team-level feedback loops are the **retro** and the **postmortem**.

### Retro (Every Few Weeks or at a Milestone)

Thirty minutes, three questions:

1. What went well and should continue?
2. What slowed us down or surprised us?
3. What one or two things will we change, and who owns each?

Write the actions down and check them at the next retro. A retro without owned actions is just a conversation.

### Blameless Postmortem (After Incidents)

A blameless postmortem assumes people acted reasonably given what they knew, and looks for system fixes rather than someone to blame. This makes people willing to report problems honestly, which is the only way the system improves. Google's SRE book chapter on [postmortem culture](https://sre.google/sre-book/postmortem-culture/) and Atlassian's [blameless postmortem guide](https://www.atlassian.com/incident-management/postmortem/blameless) explain the practice.

A minimal postmortem has:

| Section | Contents |
| --- | --- |
| Summary | What happened, in two or three sentences |
| Impact | Who was affected, how, for how long |
| Timeline | Timestamps from first signal to resolution |
| Root cause and contributing factors | Why it happened, and why it wasn't caught earlier |
| What went well | Detection, communication or recovery that worked |
| Action items | Specific fixes, each with an owner and a due date |

The app's [Incident drill project](https://mchittineni.github.io/fde-from-scratch/#/labs/projects) has you write one. Doing it for your own practice failures builds the habit.

---

## 8. Interview-Readiness Checklist

You're ready to start a loop when most of these are true. Pair it with [INTERVIEW_AND_CAREER.md](INTERVIEW_AND_CAREER.md).

### Evidence

- [ ] At least two portfolio projects meet all their acceptance criteria, each with a README, a 2-minute demo video and a short write-up.
- [ ] Résumé bullets are in customer units, and you can talk for five minutes about each one.

### Rounds

- [ ] Coding: you solve typical medium-difficulty problems within the time limit most of the time, while narrating.
- [ ] Decomp: you've done at least six timed drills across different industries and score 15+/20 on the write-up rubric.
- [ ] Debugging: you can diagnose an unfamiliar service with logs and CLI tools and explain what you ruled out.
- [ ] Learning round: you've practiced getting productive with an unfamiliar API in under an hour.
- [ ] Behavioral: all eight Story bank prompts have STAR answers with a concrete result, and you've said them out loud.
- [ ] Customer scenario: you've run every Field simulator mission and can explain the trade-offs of each choice.
- [ ] Hiring manager: you have a specific "why FDE" and "why this company," plus three good questions.

### Process

- [ ] At least two full mock loops with different partners; the top feedback themes are addressed.
- [ ] You've read the target company's Playbook in the app and its official careers page.
- [ ] Skill diagnostic shows no pillar far below the others, or you have a plan for the weak one.

---

## 9. Feedback About This Guide

This guide improves when learners tell us what's confusing, wrong or missing.

- **Open an issue:** go to [the issue chooser](https://github.com/mchittineni/fde-from-scratch/issues/new/choose) and pick the template that fits. A "Learner feedback" template is being added for exactly this.
- **Send a fix:** open a pull request following [CONTRIBUTING.md](../../CONTRIBUTING.md). Small corrections (a broken link, an unclear sentence) are very welcome.

Useful feedback is specific: which page or section, what you expected, what happened, and what you were trying to do. Never include interview material covered by an NDA.
