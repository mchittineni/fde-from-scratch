// Station 00 — Orientation. The from-scratch primer every track starts with.
// Block types: p, list, steps, table, callout, timeline.

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
      { type: "steps", title: "The deployment loop", items: [
        { label: "Embed", text: "Sit with operators and engineers. Learn the workflow, the data sources and who actually makes decisions." },
        { label: "Decompose", text: "Turn a vague ask (\"we need visibility into supply risk\") into entities, data flows, and a first shippable milestone." },
        { label: "Build", text: "Prototype in days, not quarters. Real data, real users, ugly is fine." },
        { label: "Deploy", text: "Harden it for their constraints — SSO, VPCs, air gaps, compliance, on-call." },
        { label: "Feed back", text: "Turn the one-off fix into a reusable product capability so the next deployment is faster." }
      ] }
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
      { type: "p", text: "Titles are not standardized. Some companies call this role forward deployed engineer, others field engineer, deployment strategist or solutions engineer, and the same title can mean different things at different companies. Read the job description, not just the title." }
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
      { type: "p", text: "Every phase in your track maps to one of these days. That is why the journey mixes coding, data, infrastructure, decomposition and people skills instead of treating them as separate subjects." }
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
      { type: "pillars" },
      { type: "callout", tone: "accent", title: "A useful target", text: "Aim to be solid on all five and genuinely strong on two. Nobody is exceptional everywhere — decide which two you want interviewers to remember you for." }
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
      { type: "callout", tone: "blue", title: "Where to learn each one", text: "The Library tab lists vetted, mostly free resources for every item above, grouped by topic and level." }
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
      { type: "p", text: "Practice them in the Field simulator, where your choices move client trust, and in the Story bank, where you write your answers in STAR form." }
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
