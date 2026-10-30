# Interviews, Offers and the FDE Career

A practical guide to landing a Forward Deployed Engineer role: reading job titles, building a résumé and portfolio that get callbacks, preparing for every round of the loop, negotiating the offer, and growing once you're in.

---

## 1. What the Job Titles Actually Mean

Companies use different names for overlapping jobs. Read the responsibilities, not the title. The table below describes common patterns; any given company may differ, so always check its own careers page.

| Title | Typical emphasis | How much code ships to production | Where you'll see it |
| --- | --- | --- | --- |
| **Forward Deployed Engineer (FDE)** | Embedded with one or a few customers; builds integrations, workflows and AI applications on the company's platform | High: you write and own production code | AI labs, AI data companies, platform startups |
| **Forward Deployed Software Engineer (FDSE)** | Same core idea; the name Palantir uses publicly for its engineers in the field | High | Palantir and companies that copied its model |
| **Deployment Engineer / Deployment Strategist** | Engineer variant is close to FDE. "Strategist" variants usually lean toward scoping, stakeholder management and product configuration, with less code | Varies: read the requirements | Data platform and defense-tech companies |
| **Solutions Engineer (SE)** | Pre-sales: demos, proofs of concept (POCs), technical answers during the sales cycle | Low to medium: prototypes and demos, rarely long-lived production code | Most B2B software companies |
| **Solutions Architect / Resident Solutions Architect** | Designs customer architectures; "resident" roles are often post-sale and embedded for months | Medium: reference implementations, migrations, tuning | Cloud and data platform vendors |
| **Applied AI Engineer / AI Deployment Engineer** | FDE work focused on LLM applications: retrieval, agents, evals, tool integrations | High | AI labs and AI-native startups |
| **Technical Account Manager / Customer Engineer** | Ongoing technical relationship, escalations, adoption | Low | Large software vendors |

### How to Read a Job Description

Split every posting into four questions and highlight the evidence for each:

1. **Pre-sale or post-sale?** Words like "drive technical wins," "pipeline," "quota" or "partner with Account Executives" mean pre-sales. Words like "production," "own deployments," "on-site," "embedded" mean post-sale delivery.
2. **How much engineering?** Look for the languages and systems named, and for verbs like *build, ship, own, debug in production*. "Configure," "demo" and "advise" signal less code.
3. **What environment?** "Clearance," "on-prem," "classified" or "restricted networks" mean air-gapped work (see [AIRGAP_SECURITY_AND_NETWORKING.md](AIRGAP_SECURITY_AND_NETWORKING.md)). "LLMs," "evals," "agents" mean applied AI (see [APPLIED_AI_IN_ENTERPRISE.md](APPLIED_AI_IN_ENTERPRISE.md)).
4. **What's the travel and customer load?** Postings often state a travel percentage. "Multiple concurrent engagements" means context switching; "embedded with a single customer" means depth.

Treat "requirements" as a wish list. If you can show evidence for most of them, plus the core of the job (shipping software with customers), apply.

---

## 2. Building an FDE-Shaped Résumé

An FDE résumé answers one question: *can this person turn a messy customer problem into working software that changed a number the customer cares about?*

### Structure (One Page Until You Have Roughly 8+ Years)

1. **Header:** name, city or "open to relocation," email, GitHub, LinkedIn, portfolio link.
2. **Summary (optional, two lines):** what you build and for whom. Skip it if it would be generic.
3. **Experience:** reverse chronological, 3–5 bullets per role, most impressive first.
4. **Projects:** two or three portfolio projects with a link and one result line each. For career changers this section can go above Experience.
5. **Skills:** grouped (Languages, Data, Cloud & Infra, AI). Only list what you could be quizzed on.

### Impact Bullets in Customer Units

Write bullets as **verb + what you built + for whom + measurable change**, and measure in the units the customer or business uses: hours saved, cycle time, error rate, dollars, number of users, records reconciled. Only state numbers you can defend in an interview.

| Weak bullet | FDE-shaped bullet |
| --- | --- |
| Worked on data pipelines using Python and Airflow. | Built a nightly ingestion pipeline joining three inventory systems for 12 warehouse managers, replacing a manual spreadsheet merge that took about 6 hours a week. |
| Developed a chatbot with LangChain. | Shipped a document Q&A assistant for a 40-person claims team with source citations and a 50-question eval set; adopted as the default lookup tool after a 3-week pilot. |
| Responsible for customer support escalations. | Owned 30+ escalations for enterprise customers; diagnosed a recurring SSO misconfiguration, wrote the fix and a runbook that cut repeat tickets on that issue to near zero. |
| Used SQL to make dashboards. | Rewrote a slow reporting query (window functions plus an index), reducing runtime from minutes to seconds so the operations lead could use it in a daily stand-up. |
| Helped migrate to the cloud. | Led migration of a legacy reporting service to containers on AWS, including network and IAM setup with the customer's security team; no unplanned downtime during cutover. |

### Common Résumé Mistakes

- Listing tools without outcomes ("Python, Kafka, Spark, Kubernetes...").
- Writing "we" achievements you can't explain in detail.
- Hiding customer-facing work. For FDE roles, support rotations, consulting, teaching and on-site work are assets.
- Including confidential customer names or internal metrics. Describe the industry and scale instead ("a regional hospital network").

---

## 3. A Portfolio That Gets Callbacks

The app's [Portfolio projects](https://mchittineni.github.io/fde-from-scratch/#/labs/projects) (data explorer, messy ingestion, SSO + RBAC, air-gapped bundle, grounded RAG with evals, MCP server, streaming, decomp write-up, incident drill, executive demo) each come with a customer brief and acceptance criteria. Two or three finished and well-presented projects beat ten half-done ones.

### Pick a Balanced Set

| If you're targeting... | Lead with | Add |
| --- | --- | --- |
| Applied AI FDE roles | Grounded RAG with evals; MCP server for a legacy system | Messy ingestion or executive demo |
| Data platform FDE / resident architect | Messy-data ingestion; streaming pipeline | Decomp write-up |
| Government, defense or regulated industries | Air-gapped bundle; SSO + RBAC | Incident drill and runbook |
| Career switchers from non-engineering roles | Decomp write-up + prototype; data explorer | Executive demo |

### README Structure for Each Project

Reviewers spend a minute or two on a repo. Make that minute count:

1. **The customer problem** (2–3 sentences): who the operator is, what decision or task is painful, and what changes.
2. **Demo:** a link to the 2-minute video and one screenshot or GIF.
3. **Quick start:** one command to run it (for example `docker compose up`), with sample data included.
4. **Architecture:** one simple diagram and a paragraph on the main data flow.
5. **Acceptance criteria:** the brief's criteria as a checklist, each with how you verified it (a test, a script, a screenshot).
6. **Trade-offs and what I'd do next:** what you cut, what breaks at 10x scale, what you'd ask the customer.
7. **Assumptions:** what you assumed about the data and the users.

### The 2-Minute Demo Video

Record with any screen recorder (for example [OBS Studio](https://obsproject.com/), which is free). Use this structure:

| Time | Content |
| --- | --- |
| 0:00–0:20 | The problem, who has it, and what is different after your software exists |
| 0:20–1:20 | One real workflow end to end, using realistic synthetic data |
| 1:20–1:45 | One hard thing you handled (bad rows, access control, an offline install, an eval failure) |
| 1:45–2:00 | What you'd build next and what you'd need from the customer |

No architecture diagram before the workflow. This mirrors the Executive demo project's rule.

### The Write-Up

Publish a short post (blog, GitHub README or LinkedIn article) per flagship project: the problem, the approach, one mistake you made and fixed, and the result. Interviewers often ask about it, and it doubles as a behavioral story.

---

## 4. Finding Roles, Referrals and Outreach

### Where Roles Come From

- **Company careers pages:** search for all the title variants in section 1, not just "Forward Deployed."
- **Referrals:** usually the highest-signal path. A referral gets your résumé read; it doesn't get you through the loop.
- **Communities and meetups:** data, AI and cloud meetups; open-source project channels; alumni networks.
- **Adjacent internal moves:** support engineering, solutions engineering or professional services at a platform company are common routes into FDE work.

### Outreach Message Template

Send to an engineer or FDE at the company, not only recruiters. Keep it short, specific and easy to say yes to.

```text
Subject: Question about the FDE role on <team>

Hi <name>,

I'm an engineer focused on <data integration / applied AI / ...>. I read <their post, talk, or the
team's public blog> about <specific topic> and it matched work I've been doing: I recently built
<one-line project + result, with link>.

I'm applying for the <exact title> role (<job link>). Would you be open to a 15-minute call about
what the work is like day to day? If a referral makes sense after that, I'd be grateful, but no
pressure either way.

Thanks,
<name> · <portfolio link>
```

Rules: one follow-up after a week, then stop. Never ask someone to refer you before they know anything about you. Never ask for interview questions.

---

## 5. The Interview Loop: Round by Round

Loops vary by company; see each company's page in the app's [Playbooks](https://mchittineni.github.io/fde-from-scratch/#/playbooks) for publicly reported formats. Most FDE loops combine some of the rounds below.

| Round | What they're testing | How to prep | Practice in the app |
| --- | --- | --- | --- |
| **Coding** | Clear, working code under time pressure; practical data structures (hash maps, graphs, heaps, parsing); talking while you work | Timed problems in one language; narrate trade-offs; test your own code with edge cases before saying "done" | Question bank: Live Coding / Algo Patterns |
| **Decomposition / system design** | Turning a vague business problem into users, entities, data sources, workflow, writeback and trade-offs | Run 45-minute drills with the five-phase scaffold; practice adapting to a twist | Decomp drill, Decomp cases, [DECOMPOSITION_PLAYBOOK.md](DECOMPOSITION_PLAYBOOK.md) |
| **Debugging / re-engineering** | Reading unfamiliar code, forming hypotheses, using logs and CLI tools, fixing without breaking things | Clone an unfamiliar open-source repo, break something, fix it; practice Linux diagnostics | Question bank: Linux & Systems Diagnostics; Incident drill project |
| **Learning / new-domain round** | How fast you get productive in an unfamiliar API, dataset or business domain | Practice "60 minutes with new docs": read, build a tiny working thing, explain what you'd verify next | Story bank: "Learned an unfamiliar stack fast" |
| **Behavioral & customer scenario** | Ownership, judgment, communication with difficult stakeholders, handling failure in front of customers | Write 8–10 STAR stories; role-play hostile-stakeholder scenarios | Story bank, Field simulator, [CLIENT_DIPLOMACY_AND_SURVIVAL.md](CLIENT_DIPLOMACY_AND_SURVIVAL.md) |
| **Hiring manager** | Motivation for a field role, fit with travel and ambiguity, what you want to grow into | Prepare "why FDE," "why this company," and good questions about team and customers | Story bank: "Why forward deployed?" |

### Round-Specific Tips

**Coding.** Restate the problem, give one example input and output, state the approach and its complexity, then code. Readable names beat clever one-liners. If you get stuck, say what you're considering; silence is the worst signal.

**Decomposition.** Start with the operator and the decision, not the database. State two or three assumptions out loud. Leave time for writeback and failure modes. When the interviewer adds a constraint, restate it, adjust and keep going.

**Debugging.** Reproduce first. Read the error fully. Form one hypothesis at a time and test it with the cheapest check (a log line, a `curl`, a `SELECT COUNT(*)`). Say what you ruled out.

**Learning round.** Interviewers watch your process more than your result. Skim the docs' structure first, find a working example, get something running, then extend. Narrate what you're unsure about and how you'd confirm it.

**Behavioral and customer scenario.** Use "I," not "we." Spend most of the time on Action. End with a result and what you'd do differently. For customer scenarios, show you'd tell bad news early and offer options.

**Hiring manager.** Have specific answers to "Why customer-facing instead of product engineering?" and "What will be hardest for you?" Ask about how deployments are staffed, how field feedback reaches the product team, and what a strong first six months looks like.

### Common Failure Modes

| Round | Failure mode | Fix |
| --- | --- | --- |
| Coding | Coding before understanding; no testing | Spend the first few minutes on examples and approach; walk through one test case at the end |
| Decomp | Jumping to ML or a tech stack; never reaching writeback | Anchor on operator and decision; watch the clock against the 45-minute plan |
| Decomp | Defensiveness when a twist breaks the design | "Good constraint. Here's what changes..." then continue |
| Debugging | Random changes until something works | One hypothesis at a time; write down what you ruled out |
| Learning | Reading every doc page before writing anything | Get a minimal example running early |
| Behavioral | Vague stories with no numbers or no personal role | Pre-written STAR stories with a concrete result |
| Customer scenario | Agreeing to everything the "customer" asks | Acknowledge, clarify the underlying need, offer trade-offs |
| Hiring manager | Generic motivation ("I like people and code") | Point to a specific time you enjoyed working with users and what you shipped |

---

## 6. Final-Prep Plans

Both plans assume you have already worked through your track in the app. Adjust the weights toward your weakest pillar from the [Skill diagnostic](https://mchittineni.github.io/fde-from-scratch/#/labs/diagnostic).

### 4-Week Plan (Interviews Already Scheduled)

| Week | Focus | Concrete output |
| --- | --- | --- |
| 1 | Coding fundamentals and company research | 10–15 timed coding problems; read the target company's Playbook; list its products and recent public announcements |
| 2 | Decomposition | 4 timed Decomp drills (one per industry you haven't tried); 2 Decomp cases studied; one recorded drill reviewed with the rubric |
| 3 | Behavioral and customer scenarios | 8 Story bank entries in STAR form; all Field simulator missions; one mock behavioral round with a peer |
| 4 | Full mock loop and rest | One full mock loop (coding + decomp + behavioral); fix the two weakest areas; light review only in the final two days |

### 8-Week Plan (Building Toward Applying)

| Weeks | Focus | Concrete output |
| --- | --- | --- |
| 1–2 | Diagnose and finish portfolio | Take the diagnostic; finish two portfolio projects with README, video and write-up |
| 3 | Résumé and outreach | Résumé rewritten with impact bullets; 10 tailored outreach messages; applications sent |
| 4 | Coding | Daily timed problems; practice narrating; review patterns you miss |
| 5 | Decomposition | 2–3 drills per week; one peer-reviewed write-up; study all Decomp cases |
| 6 | Debugging and learning rounds | Two "unfamiliar repo" debugging sessions; two "new API in 60 minutes" sessions |
| 7 | Behavioral and hiring manager | Story bank complete; "why FDE" and "why this company" answers rehearsed out loud |
| 8 | Mock loops | Two full mock loops with different partners; final weak-spot fixes; rest |

---

## 7. Running Mock Interviews with a Peer

A mock is only useful if the interviewer behaves like a real one and the feedback is specific.

1. **Pick the round and the prompt in advance.** The interviewer takes a prompt from the Question bank or Decomp drill that the candidate hasn't seen.
2. **Set the rules.** Real time limit, camera on, the interviewer stays mostly quiet and only answers clarifying questions.
3. **Inject a twist.** For decomp rounds, the interviewer adds the drill's twist around the halfway mark.
4. **Record it** (with consent). Watching yourself is the fastest way to notice filler words, long silences and skipped steps.
5. **Score against a rubric.** Use the Decomp drill's self-review rubric or the forms in [SELF_ASSESSMENT_AND_FEEDBACK.md](SELF_ASSESSMENT_AND_FEEDBACK.md).
6. **Debrief in this order:** candidate self-assessment first, then the interviewer's two strongest moments, then the two most important fixes. Not ten fixes.
7. **Swap roles.** Interviewing someone else teaches you what interviewers actually notice.

Free platforms and communities exist for finding mock partners; the [Tech Interview Handbook](https://www.techinterviewhandbook.org/) lists options and covers coding-interview basics. For structured coding practice, [NeetCode](https://neetcode.io/) groups problems by pattern.

---

## 8. Offers and Negotiation Basics

This section deliberately has no compensation numbers: they change fast and depend on level, location and company. Use public, crowd-sourced data such as [Levels.fyi](https://www.levels.fyi/) and the salary ranges that job postings in some jurisdictions are required to show.

- **Understand the components.** Base salary, bonus, equity (and its vesting schedule and type), sign-on bonus, and for field roles: travel policy, per diem, and whether travel time counts as work time.
- **Clarify the level.** Level determines most of the package and your expectations. Ask what level you're being offered and what the next level requires.
- **Don't name a number first if you can avoid it.** "I'd like to understand the full package first; I'm confident we can find something fair" is a reasonable response.
- **Negotiate with information, politely.** Competing offers, your specific experience, or market data are valid reasons. Ask for one thing at a time and be specific.
- **Get it in writing** before resigning from your current job.
- **Ask about the field realities.** Expected travel percentage, number of concurrent customers, on-call expectations, and how deployments are staffed.

The [Tech Interview Handbook negotiation guide](https://www.techinterviewhandbook.org/negotiation/) covers the process in more depth.

---

## 9. Your First Six Months

| Period | Goal | What good looks like |
| --- | --- | --- |
| **Weeks 1–4** | Learn the platform and the people | Platform training done; shadowed experienced FDEs; shipped one small fix or internal tool; met your manager weekly with written notes |
| **Months 2–3** | First customer contribution | Own one well-scoped workstream on a deployment; written status updates every week; one demo to the customer |
| **Months 4–6** | Own an outcome | Own a workflow end to end (data in, decision, writeback); the customer contact knows you by name; you've fed at least one product issue back to the core team with a clear reproduction |

Habits that compound:

- **Keep a deployment log.** What you built, what broke, what the customer said. It becomes your promotion case and your next interview's stories.
- **Write things down.** Decisions, assumptions and customer agreements, sent as short recap emails after meetings.
- **Escalate early.** Bad news within 24 hours, with options (see [CLIENT_DIPLOMACY_AND_SURVIVAL.md](CLIENT_DIPLOMACY_AND_SURVIVAL.md)).
- **Build reusable pieces.** A script, connector or checklist used on two deployments is worth more than a clever one-off.

---

## 10. Career Ladder and Common Exits

Exact titles differ by company. The pattern below is common:

| Level | Scope | What gets you there |
| --- | --- | --- |
| **FDE** | A workstream on one deployment, with guidance | Ships reliably; communicates clearly; asks for help at the right time |
| **Senior FDE** | Leads a whole deployment or a few smaller ones; mentors newer FDEs | Owns outcomes with customer executives; scopes and de-risks work; makes good trade-offs without supervision |
| **Staff FDE / Field CTO / Deployment lead** | Several deployments, an industry vertical, or a technical area across customers | Creates reusable patterns and products from field work; shapes the product roadmap; trusted by senior customer leaders |
| **Manager / Head of Forward Deployed Engineering** | The team: hiring, staffing, delivery quality | Chooses to manage people; builds a hiring and staffing system that scales |

### Common Exits

FDE experience transfers well because it combines engineering with customer judgment.

- **Product engineering:** you bring a strong sense of what customers actually do with software.
- **Product management:** you've seen many customers' real workflows and know which requests generalize.
- **Founder:** many FDEs see the same unsolved problem at several customers. Deployments teach selling, scoping and shipping on a deadline.
- **Solutions or customer engineering leadership:** running pre-sales, professional services or customer success engineering teams.
- **Domain specialist:** deep expertise in one industry (healthcare data, public sector, supply chain) that's valuable to software companies serving it.

For context on the business side of these moves, see [BUSINESS_ACUMEN_AND_DOMAINS.md](BUSINESS_ACUMEN_AND_DOMAINS.md). If you're just starting out, begin at [START_HERE_ZERO_TO_FDE.md](START_HERE_ZERO_TO_FDE.md).

---

## 11. Confidentiality

Never share or request interview questions covered by an NDA, and never put confidential customer information on your résumé, portfolio or social media. When you describe past work, name the industry and the scale, not the client, unless the work is already public.
