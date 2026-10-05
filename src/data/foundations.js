// Station 00 — Orientation. The from-scratch primer every track starts with.
// Block types: p, list, steps, table, callout, timeline, diagram (name from LESSON_DIAGRAMS
// in lib/diagrams.js) and check (a one-shot knowledge check: id, question, options, answer, explain).

export const orientationLessons = [
  {
    id: "o1",
    slug: "what-is-an-fde",
    title: "What a Forward Deployed Engineer actually does",
    minutes: 6,
    summary: "The role in one sentence, where it came from, and the loop you will run on every deployment.",
    blocks: [
      { type: "p", text: "A Forward Deployed Engineer (FDE) is a software engineer who works directly inside a customer's world — their data, their networks, their politics — and ships production software that changes a real business outcome. You are not handed a spec. You go find the problem, then you build the fix." },
      { type: "p", text: "Palantir popularized the role to get its platforms working inside governments and Fortune 500s. Data and AI companies such as Databricks, Scale AI, OpenAI, Anthropic and Snowflake now hire for the same shape of engineer, because frontier technology only creates value once someone wires it into messy enterprise reality." },
      { type: "callout", tone: "accent", title: "The one-line definition", text: "An FDE owns a customer outcome end to end: discover the real problem, build the software, deploy it inside the customer's constraints, and feed what you learned back into the product." },
      { type: "p", text: "Every deployment runs the same loop. Explore each stage below — the trap under each one is where most new FDEs lose weeks." },
      { type: "diagram", name: "lifecycle" },
      { type: "check", id: "o1-c1", question: "A customer's VP says: \"We need AI to fix our supply chain.\" Which first move fits the FDE loop?", options: [
        "Start fine-tuning a model on whatever data you can get access to.",
        "Sit with the planners who deal with late shipments, learn their workflow and data, then propose a first milestone.",
        "Send a 40-page proposal covering every possible AI use case.",
        "Ask the VP for a complete written specification before you start."
      ], answer: 1, explain: "Embed, then decompose. You can't scope a useful milestone until you've seen the real workflow, the real data and who decides. Models and proposals come later, and FDEs rarely receive a spec." }
    ]
  },
  {
    id: "o2",
    slug: "fde-vs-other-roles",
    title: "FDE vs SWE vs Solutions Engineer vs Consultant",
    minutes: 5,
    summary: "Why the role is hybrid, and which muscles you already have depending on where you start.",
    blocks: [
      { type: "p", text: "People reach FDE from very different directions. Knowing which column you come from tells you which half of the job to train hardest." },
      { type: "table", head: ["", "Product SWE", "Solutions Eng / SA", "Consultant", "FDE"], rows: [
        ["Who you serve", "Internal roadmap", "Prospects in a sales cycle", "Client leadership", "Operators + leadership at one customer"],
        ["What you ship", "Features", "Demos, POCs, architecture", "Decks, recommendations", "Production software on customer data"],
        ["Success metric", "Velocity, quality", "Deals closed", "Engagement renewed", "Customer outcome moved"],
        ["Hands on code", "Very high", "Medium", "Low", "Very high"],
        ["Ambiguity", "Low–medium", "Medium", "High", "Extreme"]
      ] },
      { type: "callout", tone: "amber", title: "The trap for each background", text: "SWEs under-invest in client communication. SAs and SEs under-invest in deep coding speed. Consultants under-invest in shipping. The journey ahead is weighted to fix exactly that." },
      { type: "diagram", name: "roles" },
      { type: "p", text: "Titles are not standardized. Some companies call this role forward deployed engineer, others field engineer, deployment strategist or solutions engineer, and the same title can mean different things at different companies. Read the job description, not just the title." },
      { type: "check", id: "o2-c1", question: "You're a strong product engineer moving into an FDE role. Based on the comparison above, what should you train hardest?", options: [
        "Algorithms and data structures.",
        "Client communication and working without a spec — writing recaps, running discovery, handling pushback.",
        "Writing longer design documents before you build anything.",
        "Learning more programming languages."
      ], answer: 1, explain: "Product SWEs already have the coding depth. The gap is the client-facing half: ambiguity, discovery and communication. That's what the journey weights for this background." }
    ]
  },
  {
    id: "o3",
    slug: "a-week-in-the-field",
    title: "A week in the field",
    minutes: 4,
    summary: "What the calendar looks like once you're deployed — so the curriculum makes sense.",
    blocks: [
      { type: "timeline", items: [
        { label: "Mon", title: "On-site discovery", text: "Shadow two dispatchers, map their spreadsheet workflow, find the three source systems nobody documented." },
        { label: "Tue", title: "Data wrangling", text: "Ingest a 40 GB CSV export with four timestamp formats. Write the cleaning pipeline. Find the join key that actually works." },
        { label: "Wed", title: "Prototype", text: "Ship a thin UI over the cleaned data. Demo it to the dispatchers at 4pm. Half of it is wrong — good, now you know." },
        { label: "Thu", title: "Security review", text: "The CISO wants SAML, row-level permissions, and no outbound internet. Re-plan the deployment around it." },
        { label: "Fri", title: "Exec readout + product feedback", text: "Two-minute value story for the VP. File the reusable connector you built back to the core product team." }
      ] },
      { type: "p", text: "Every phase in your track maps to one of these days. That is why the journey mixes coding, data, infrastructure, decomposition and people skills instead of treating them as separate subjects." },
      { type: "check", id: "o3-c1", question: "Wednesday's 4pm demo goes badly: dispatchers say half the screen is wrong. What does a good FDE do next?", options: [
        "Defend the design — the requirements were unclear.",
        "Write down exactly what was wrong, fix the top issues overnight and show them again tomorrow.",
        "Pause the build until a full requirements document is signed off.",
        "Escalate to the VP that the dispatchers are resistant to change."
      ], answer: 1, explain: "A demo that surfaces wrong assumptions is the point of prototyping early. Capture the feedback, iterate fast and show progress — that is how trust gets built." }
    ]
  },
  {
    id: "o4",
    slug: "the-five-pillars",
    title: "The five pillars you'll be measured on",
    minutes: 5,
    summary: "The skill model behind the diagnostic, the labs and every interview loop.",
    blocks: [
      { type: "p", text: "Hiring loops differ by company, but most of them probe some mix of the same five capabilities. Your diagnostic scores you on these, and every station in your journey trains at least one of them." },
      { type: "diagram", name: "pillars" },
      { type: "callout", tone: "accent", title: "A useful target", text: "Aim to be solid on all five and genuinely strong on two. Nobody is exceptional everywhere — decide which two you want interviewers to remember you for." },
      { type: "check", id: "o4-c1", question: "An interviewer asks: \"Three stakeholders define a 'late shipment' three different ways. What do you do?\" Which pillar is this mainly testing?", options: [
        "Software & Systems Velocity",
        "Enterprise Security & Infra",
        "Problem Decomposition",
        "Distributed Data & AI Stack"
      ], answer: 2, explain: "Conflicting definitions are an ambiguity problem. A strong answer pins down who decides, writes the definitions down, and models the entity so the rule can change without a rewrite. Diplomacy helps, but the core skill is decomposition." }
    ]
  },
  {
    id: "o6",
    slug: "the-fde-toolkit",
    title: "The FDE toolkit: what to learn first",
    minutes: 5,
    summary: "The tools you'll reach for in the first hour of every deployment, in the order to learn them.",
    blocks: [
      { type: "p", text: "You don't need to master everything before your first deployment. You need to be fast and calm with a small set of tools that work everywhere — on your laptop, on a bastion host, inside a customer VPC." },
      { type: "steps", title: "Learn in this order", items: [
        { label: "Terminal + git", text: "Navigate, grep, pipe, ssh, tmux, and recover from a bad merge. Every environment has a shell; not every environment has your IDE." },
        { label: "One backend language, deeply", text: "Python or TypeScript for prototypes, plus enough Java or Go to read customer code. Be able to build an API from a blank folder." },
        { label: "SQL", text: "Joins, window functions, CTEs and reading a query plan. Customer data almost always lives in a database before it lives anywhere else." },
        { label: "Containers", text: "Build, run, inspect and debug Docker images; know what changes when they run on Kubernetes." },
        { label: "Networking + identity basics", text: "DNS, TLS, proxies, OAuth/OIDC. A large share of 'it works on my machine' problems at customers come down to one of these." },
        { label: "One LLM API", text: "Tool use, structured output and a tiny eval script. Nearly every FDE role now touches applied AI." }
      ] },
      { type: "diagram", name: "toolkit" },
      { type: "callout", tone: "blue", title: "Where to learn each one", text: "The Library tab lists vetted, mostly free resources for every item above, grouped by topic and level." },
      { type: "check", id: "o6-c1", question: "Your only access to the customer environment is SSH to a bastion host. Which skill matters most in the first hour?", options: [
        "Your IDE's remote-development plugin.",
        "Terminal fluency: ssh tunnels, grep, curl, logs and jq.",
        "Building a Kubernetes operator.",
        "Fine-tuning an LLM."
      ], answer: 1, explain: "Every environment has a shell, but not every environment allows your tools. That's why the terminal is the base of the stack." }
    ]
  },
  {
    id: "o7",
    slug: "communication-frameworks",
    title: "Communication frameworks you'll use every day",
    minutes: 6,
    summary: "Five short, repeatable structures for the conversations that make or break a deployment.",
    blocks: [
      { type: "p", text: "Half of an FDE's leverage is in what they say and write. These frameworks aren't scripts — they're defaults that keep you clear when you're tired, under pressure, or talking to someone senior." },
      { type: "table", head: ["Situation", "Framework", "How it sounds", "Use it for"], rows: [
        ["Someone is upset", "Acknowledge → Align → Reframe", "\"That's a fair frustration. We both want this fast. Let's look at the query plan together.\"", "Hostile engineers, failed demos"],
        ["Executive update", "Answer first (Minto's pyramid principle)", "\"We're on track for Friday. Two risks, both mitigated: …\"", "Status emails, steering meetings"],
        ["New request mid-project", "Goal → Options → Trade-off", "\"What does the board need to see? We can do A fully or B partially.\"", "Scope creep, deadline pressure"],
        ["Demo or pitch", "Problem → Change → Proof → Ask", "\"Dispatchers lose two hours a day. This removes it. Here's depot 3. Can we expand?\"", "Exec demos, conversion reviews"],
        ["Behavioral interview", "STAR", "Situation, Task, Action (I, not we), Result with a number", "Every loop's culture round"]
      ] },
      { type: "callout", tone: "amber", title: "The written recap", text: "After any meeting where something changed, send a three-line note within the hour: what we agreed, what moved, who owns what. It quietly prevents a lot of escalations." },
      { type: "p", text: "Practice them in the Field simulator, where your choices move client trust, and in the Story bank, where you write your answers in STAR form." },
      { type: "check", id: "o7-c1", question: "Mid-project, the sponsor asks for a new dashboard due on the same date. Which framework fits best?", options: [
        "STAR",
        "Goal → Options → Trade-off",
        "Problem → Change → Proof → Ask",
        "Acknowledge → Align → Reframe"
      ], answer: 1, explain: "A new request on a fixed date is a scope conversation. Start from what the sponsor needs the dashboard for, offer options, and make the trade-off explicit so they choose." }
    ]
  },
  {
    id: "o8",
    slug: "your-first-90-days",
    title: "Your first 90 days on a deployment",
    minutes: 7,
    summary: "How to earn a customer's trust fast: what to do in week one, by day 30 and by day 90 — and the traps that sink new FDEs.",
    blocks: [
      { type: "p", text: "Getting hired is the start. Your first deployment sets your reputation with the customer and with your own company, and trust compounds: a small, visible win in week three buys you the patience you will need when something breaks in week eight." },
      { type: "diagram", name: "trust" },
      { type: "steps", title: "Your first-week checklist", items: [
        { label: "Find the sponsor and their definition of success", text: "Ask: \"If this works, what is different in six months, and how would you measure it?\" Write the answer down in their words." },
        { label: "Find the operator who feels the pain", text: "The person doing the work every day tells you where the time goes. They also become your first real user." },
        { label: "Find the gatekeeper", text: "Meet IT and security early. Ask what a deployment needs to pass review — before you design it." },
        { label: "Request every access on day one", text: "VPN, accounts, data, a sandbox. Approvals can take weeks at regulated customers, so start the clock now." },
        { label: "Send a \"what I heard\" recap", text: "One page: the problem, who is involved, what success looks like, open questions. Ask them to correct it." }
      ] },
      { type: "callout", tone: "amber", title: "Access is the critical path", text: "If access is slow, don't wait. Ask for a sample export or a schema, build against it, and keep chasing the approvals in parallel. Never work around a security control to go faster." },
      { type: "table", head: ["Who", "What they want", "What you give them"], rows: [
        ["Executive sponsor", "An outcome they can report, and no surprises", "Short written updates with numbers; risks raised early"],
        ["Operators / end users", "Less daily pain", "Working tools, fast fixes, and evidence you listened"],
        ["Customer IT and security", "Safety, process, no shadow IT", "Architecture documents early; follow their change process"],
        ["Your account team", "Renewal and expansion", "Early warning on risk; evidence of value"],
        ["Your product team", "Signal that generalizes", "Feedback with frequency, impact and a proposed shape"]
      ] },
      { type: "check", id: "o8-c1", question: "Day 3 at a new customer. The sponsor wants a demo in two weeks, and your VPN and data access aren't approved yet. What's the best move?", options: [
        "Wait for access, then build as fast as you can.",
        "Ask for a sample export or schema, build against it, and chase access in parallel — while asking security what production needs.",
        "Build on synthetic data that matches the documented schema and swap later.",
        "Ask the sponsor to tell security to skip the review."
      ], answer: 1, explain: "Work in parallel. Real sample data surfaces the messy edge cases synthetic data hides, and asking security early avoids a redesign later. Pressuring the sponsor to skip review burns the trust you are trying to build." },
      { type: "check", id: "o8-c2", question: "Which makes the best first win?", options: [
        "The most technically impressive feature you can build.",
        "A small tool on real data that removes daily pain for a real operator.",
        "A complete platform rollout to every team at once.",
        "A roadmap deck covering the next year."
      ], answer: 1, explain: "Small, visible and real. Someone who uses your tool every day becomes your champion, and their before-and-after becomes your first piece of evidence." }
    ]
  },
  {
    id: "o9",
    slug: "field-triage",
    title: "Field triage: debugging inside someone else's network",
    minutes: 7,
    summary: "A repeatable ladder for \"it doesn't work at the customer\" — from DNS to data — and how to communicate while you fix it.",
    blocks: [
      { type: "p", text: "In the field you rarely have admin rights, all the logs or a debugger. Customer environments add private DNS, firewalls, TLS-inspecting proxies, SSO and decades of data quirks. The fastest FDEs aren't the ones who guess best. They work through the stack in a fixed order, so they don't spend an hour in application code when the problem is a proxy." },
      { type: "diagram", name: "triage" },
      { type: "steps", title: "The triage loop", items: [
        { label: "Scope it", text: "Who is affected, since when, and what changed? \"Everyone since Tuesday's firewall change\" is half the answer." },
        { label: "Reproduce it from where it fails", text: "Run the check from the same host, container or network as the failing system — not from your laptop." },
        { label: "Climb the ladder", text: "Rule out each layer from the bottom up. Write down every result, including the ones that passed." },
        { label: "Change one thing at a time", text: "Two changes at once means you don't know which one fixed it, or which one broke something else." },
        { label: "Fix, then prevent", text: "Add a check, alert or test so the same failure can't come back silently, then write a short note." }
      ] },
      { type: "table", head: ["When", "What you say", "Example"], rows: [
        ["Within 15 minutes", "Acknowledge, state the impact, give the next update time", "\"We see the ingest failing for all sites. Next update at 2:30.\""],
        ["Every 30–60 minutes", "What you know, what you're trying, next update time", "\"DNS and network are fine; we're testing the proxy certificate.\""],
        ["When resolved", "Cause, fix, and what prevents a repeat", "\"Expired proxy CA in our image. Updated it and added an expiry alert.\""],
        ["Within two days", "A short blameless write-up", "Timeline, root cause, what went well, actions with owners"]
      ] },
      { type: "callout", tone: "red", title: "Never on a customer's production system", text: "No ad-hoc writes or schema changes without approval. No copying customer data to your laptop or personal tools. No \"temporarily\" disabling a security control. When in doubt, ask first and write it down." },
      { type: "check", id: "o9-c1", question: "Your container gets \"certificate verify failed\" calling an internal API, but the same call works from the customer's own laptop. Most likely cause?", options: [
        "The API is down.",
        "The customer uses a TLS-inspecting proxy or private CA that their laptops trust but your image doesn't.",
        "Your API key is wrong.",
        "A DNS failure."
      ], answer: 1, explain: "Managed laptops get the corporate root CA through the operating system's trust store. Your image doesn't have it. Add the CA to the image or the runtime's trust bundle — don't disable verification." },
      { type: "check", id: "o9-c2", question: "A connection check reports \"timed out\" rather than \"connection refused\". What does that usually tell you?", options: [
        "Something, such as a firewall or security group, is silently dropping the packets.",
        "The service is up but not listening on that port.",
        "The password is wrong.",
        "The hostname doesn't resolve."
      ], answer: 0, explain: "\"Refused\" means you reached the host and nothing was listening on that port. \"Timed out\" usually means the packets never arrived, so look at firewall rules and routes." }
    ]
  },
  {
    id: "o10",
    slug: "proving-impact",
    title: "Proving impact and feeding the product",
    minutes: 6,
    summary: "How to measure the value you create, turn one-off fixes into product, and build a career on evidence.",
    blocks: [
      { type: "p", text: "Customers renew, expand and act as references because of outcomes they can measure. Your own company promotes FDEs for leverage: how many deployments went faster because of what you built and fed back. Both depend on habits you start on day one." },
      { type: "diagram", name: "flywheel" },
      { type: "steps", title: "Measure value in the customer's units", items: [
        { label: "Capture the baseline before you ship", text: "How long does the task take today, how often does it fail, what does it cost? After go-live, nobody remembers." },
        { label: "Pick one or two metrics the sponsor already reports", text: "Hours, money, incidents, cycle time. Not your metrics — theirs." },
        { label: "Show your working", text: "\"2 hours to 15 minutes per planner per day, 40 planners, about 65 working days a quarter\" is believable. \"Saved millions\" isn't." },
        { label: "Have the customer confirm it", text: "A number the operations lead agrees with is worth more than any number you calculate alone." }
      ] },
      { type: "table", head: ["Field", "Weak feedback", "Feedback that gets acted on"], rows: [
        ["Problem", "\"Customers want better connectors.\"", "\"3 of our last 5 deployments needed a SAP connector; each took about 2 weeks to build by hand.\""],
        ["Impact", "\"It's painful.\"", "\"About 6 engineer-weeks a quarter, and it's slowing expansion at two accounts.\""],
        ["Workaround", "None given", "\"A script in each customer's fork that breaks when their schema changes.\""],
        ["Ask", "\"Build connectors.\"", "\"Generic OData ingestion with incremental sync; we'll pilot it with one account.\""]
      ] },
      { type: "callout", tone: "accent", title: "Keep an evidence log", text: "For each deployment, write down the baseline, the result, the customer quote and the reusable thing you upstreamed. It becomes your interview stories, your performance review and your promotion case — and it takes ten minutes a week." },
      { type: "check", id: "o10-c1", question: "Which is the strongest statement for an executive readout?", options: [
        "\"We deployed 14 microservices and a vector database.\"",
        "\"Users tell us they love it.\"",
        "\"Planning time fell from 2 hours to 15 minutes per planner per day across 40 planners — about 4,500 hours a quarter, confirmed by the ops lead.\"",
        "\"The project is on track.\""
      ], answer: 2, explain: "It uses the customer's units, shows the arithmetic, and has a named customer confirming it. Architecture details and sentiment matter, but neither renews a contract." },
      { type: "check", id: "o10-c2", question: "You built a custom fix for one customer. When should it go upstream to the product?", options: [
        "Immediately — every fix should be productized.",
        "When the same need appears across several customers, or it clearly generalizes.",
        "Never — custom work makes you indispensable.",
        "Only if the customer pays extra for it."
      ], answer: 1, explain: "Generalizing from one example usually produces the wrong abstraction. A common rule of thumb is to wait until about three customers need it, then separate configuration from logic and propose it with evidence." }
    ]
  },
  {
    id: "o11",
    slug: "working-sustainably",
    title: "Working sustainably in the field",
    minutes: 5,
    summary: "Customer data ethics, escalation, juggling accounts and travel — the habits that keep you trusted and effective for years.",
    blocks: [
      { type: "p", text: "FDE work is intense: several stakeholders, unfamiliar systems, travel and deadlines someone else set. The engineers who last aren't the ones who work the most hours. They're the ones customers trust with their data, who raise problems early, and who protect their own focus." },
      { type: "table", head: ["Customer data rule", "Why it matters"], rows: [
        ["Keep data where it lives", "Copies on laptops and in personal tools are the most common way data leaks."],
        ["Use only approved tools — including AI tools", "Pasting customer data into an unapproved chatbot can breach the contract and the law."],
        ["Ask for the least access you need", "Fewer permissions means a smaller blast radius when something goes wrong."],
        ["Write down what you accessed and why", "When security asks, you have the answer in seconds."],
        ["Hand back access when you're done", "Leftover accounts are a security finding waiting to happen."]
      ] },
      { type: "callout", tone: "amber", title: "The 24-hour escalation rule", text: "If a risk could cost more than a day or threatens the outcome, tell your manager or account lead within 24 hours: what happened, the impact, the options and your recommendation. Early bad news is a favour. Late bad news is a crisis." },
      { type: "steps", title: "Protect your focus across accounts", items: [
        { label: "One written status per account per week", text: "It stops ad-hoc \"quick update?\" messages and gives everyone the same picture." },
        { label: "Batch customer messages", text: "Two or three fixed windows a day beat constant context switching." },
        { label: "Keep a decision log", text: "Date, decision, who agreed. It ends the \"we never agreed to that\" arguments." },
        { label: "Write the handoff before you need it", text: "If you were out tomorrow, could someone else keep the deployment running?" }
      ] },
      { type: "list", items: [
        "Say yes to the outcome and negotiate the scope. \"Yes, and to hit Friday we'd drop X\" keeps trust and your weekends.",
        "Be on site for discovery, launches and hard conversations. Build remotely when you can.",
        "Agree on-call expectations explicitly, in writing, before go-live.",
        "Use your company's team: product, support and other FDEs. Asking early is a senior behaviour."
      ] },
      { type: "check", id: "o11-c1", question: "A customer analyst asks you to paste a sample of patient records into a public AI chatbot to draft a cleaning script. What do you do?", options: [
        "Do it — it's a small sample and saves time.",
        "Remove the names first, then paste it.",
        "Decline. Use synthetic or schema-only examples, or an approved tool inside their environment.",
        "Ask a colleague to do it instead."
      ], answer: 2, explain: "Health data is regulated, and removing names alone often doesn't de-identify it. A schema or synthetic rows are enough to write the script, and keeping their data inside approved boundaries is how you keep their trust." }
    ]
  },
  {
    id: "o5",
    slug: "how-to-use-this-guide",
    title: "How to use this guide",
    minutes: 3,
    summary: "The route, the labs, and how to turn each phase into proof for your portfolio.",
    blocks: [
      { type: "list", items: [
        "Pick a track that matches where you are today. You can switch any time; your checkmarks are kept.",
        "Work stations in order. Each milestone names the proof you should produce — check it off only when you have that artifact (repo, write-up, recording).",
        "Each station links to Library resources to learn from and Labs to practice in. Read a little, then build.",
        "Build at least three Portfolio projects. They become your interview stories and your proof of skill.",
        "Run the Decomp drill weekly with a timer. Fill the Story bank as you go — don't leave behavioral prep for the last week.",
        "Two weeks before interviews, open your target company's playbook and run its loop end to end."
      ] },
      { type: "callout", tone: "blue", title: "Pace", text: "Tracks are paced for roughly 12 weeks at 8–10 hours a week. Going slower is fine. Skipping the artifacts is not." }
    ]
  }
];
