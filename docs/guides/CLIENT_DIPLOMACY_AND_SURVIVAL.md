# Client Diplomacy, Stakeholder EQ, and Field Survival

A communication manual for software engineers operating directly inside customer politics, executive briefings, and deployment crises.

---

## 1. The FDE Hybrid Mindset

As a Forward Deployed Engineer, code is your primary tool, but communication is your leverage. A brilliant technical architecture that fails to win the trust of skeptical client engineers or that confuses executive sponsors will be quietly dismantled within weeks of your rotation.

### The Four Mindset Shifts

1. **From Spec-Receiver to Problem-Discoverer:** You are not waiting for tickets. You sit with warehouse workers, dispatchers, and finance clerks, observe their real daily friction, and define the software that solves it.
2. **From Technical Perfection to Measured Business Outcome:** Customers do not renew multi-million dollar software contracts because your microservices use asynchronous Rust; they renew because inventory stock-outs dropped by 18% or billing reconciliation cycle time decreased from 5 days to 2 hours.
3. **From Defending Software to Partnering in Reality:** When a demo fails or a client engineer objects to your design, treating it as an argument to win burns political capital. Treat objections as valuable operational discovery.
4. **From Siloed Hero to Upstream Multiplier:** The best FDEs do not just solve one client's problem; they package recurring deployment patterns into reusable libraries and feed them back to core product engineering teams.

---

## 2. Discovery Interviewing: The Mom Test in the Enterprise

When asking clients "What software do you want?", they will describe a faster version of their current spreadsheet or ask for trendy technology ("We need AI on the blockchain").

### The Rule of Real Discovery

- **Do not ask:** "What features would you like to see in the new platform?"
- **Do ask:** "Walk me through what you did yesterday when shipment #402 was delayed. Which three systems did you open, and how long did it take?"
- **Look for Workarounds:** Notice sticky notes on monitors, desktop spreadsheets named `Master_Clean_v14_FINAL_DO_NOT_DELETE.xlsx`, and manual copy-pasting across browser windows. That is where the actual problem lives.

---

## 3. Communication Frameworks for Every Situation

### 1. Diffusing Hostile Stakeholders: Acknowledge → Align → Reframe

When an incumbent engineer or client lead says: *"Your platform is a waste of money and our existing SQL queries are ten times faster."*

- **Acknowledge (Without Defensiveness):**
  > *"That is a very valid concern. Having queries take longer than your existing database is completely unacceptable for your team."*
- **Align (Find Common Ground):**
  > *"Neither of us wants analysts waiting on spinning wheels when pulling reports."*
- **Reframe (Collaborative Action):**
  > *"Can we sit down together this afternoon, pull the query execution plan, and see whether a missing clustering index or task partition skew is causing the bottleneck?"*

### 2. Executive Updates: Minto's Pyramid Principle (Answer First)

Executives have short attention spans and constant interruptions. Never build up chronologically to a conclusion at the end of an email. Lead with the punchline:

```text
[Top Line / Answer First]
We are on track to launch the automated dispatcher workspace this Friday.

[Key Supporting Arguments / Current Status]
1. Ingestion: SAP and Oracle inventory feeds are synced and passing automated quality checks.
2. User Testing: 4 lead dispatchers ran parallel tests yesterday with zero blocker defects.

[Risks & Mitigations]
- Risk: IT firewall change scheduled for Thursday night.
- Mitigation: Network lead confirmed our ports are whitelisted; we are running a verification check at 7am Friday.

[The Ask / Next Step]
No executive action needed. Next readout Monday at 10am.
```

### 3. Handling Scope Creep: Goal → Options → Trade-Off

When a client executive adds three major dashboard requirements two weeks before a pilot deadline:

- **Do not say:** *"No, that wasn't in the initial scope."* (Sounds inflexible).
- **Do not say:** *"Sure, we'll try to work nights and weekends."* (Leads to burnout and shoddy code).
- **Use the Framework:**
  > *"What does the steering board need to see at the Friday demo? To ensure the platform remains rock-solid, we have two options:*
  > *Option A: Deliver the core real-time inventory workflow at 100% production quality by Friday, and release the new executive summary dashboard the following sprint.*
  > *Option B: Deliver prototype versions of all four screens by Friday, recognizing that data freshness will be manual for the first week.*
  > *Which option best supports your presentation to the board?"*

---

## 4. Field Health, Boundaries, and the 24-Hour Rule

### The 24-Hour Bad News Rule

If an architectural blocker, security hold, or data corruption threatens a milestone date by more than 24 hours: **Tell your manager and client sponsor immediately.**

- Early bad news is a professional courtesy: it allows stakeholders to adjust expectations, reallocate resources, and manage executive communications.
- Late bad news is a full-blown crisis: dropping bad news at the eleventh hour permanently damages credibility.

### Keeping an Evidence Log

Every Friday afternoon, spend 10 minutes recording your deployment achievements:

- **Baseline:** "Planners spent 3.5 hours manually compiling daily shortage spreadsheets."
- **Shipped:** "Automated shortage calculation pipeline with row-level RBAC."
- **Result:** "Cycle time reduced to 12 minutes per planner, confirmed by Operations Lead Sarah Jenkins."
- **Artifact:** "Built generic OData SAP connector upstreamed to company repository."

*This evidence log forms the foundation of your performance reviews, promotion cases, and senior interview stories.*
