// Interview playbooks for companies that hire field and forward deployed engineers.
// Interview loops are not public and change often. Stages describe the shape
// candidates commonly report, not an official or guaranteed process.
// Sample questions are original practice prompts, not real interview questions.

export const companyPlaybooks = [
  {
    id: "palantir",
    name: "Palantir Technologies",
    roleName: "Forward Deployed Software Engineer (FDSE)",
    logoBadge: "PLTR",
    accentColor: "#4F46E5",
    tagline: "The company most associated with the forward deployed model: engineers embedded with a customer until the software changes how work gets done.",
    overview: "Palantir popularized the forward deployed engineer as a distinct job. FDSEs work closely with customer teams in sectors such as government, defense, healthcare and manufacturing, connecting fragmented source systems into Palantir's platforms and building the applications operators use day to day. The role is distinctive because one engineer often owns the whole path: scoping the problem with stakeholders, writing the data integration, shipping the workflow and supporting it in production. Expect travel, ambiguity and frequent context switching between code and customer conversations.",
    compensationTier: "Varies widely by level, location and equity. Check Levels.fyi and the official job posting for current figures.",
    products: ["Palantir Foundry", "Palantir Gotham", "Palantir AIP", "Palantir Apollo"],
    interviewStages: [
      {
        stage: "Recruiter conversation",
        details: "Candidates commonly report a short call about background and motivation. Be ready to explain why you want a customer-facing deployment role rather than an internal product team, and how you feel about travel and about the sectors Palantir serves."
      },
      {
        stage: "Technical phone screen",
        details: "Usually a live coding exercise. Reported topics lean toward practical data structures: graphs, hash maps, heaps, parsing and simple simulations. Clear code and talking through trade-offs tend to matter as much as speed."
      },
      {
        stage: "Decomposition interview",
        details: "The round most candidates mention. You get a broad, loosely defined operational problem and are expected to break it into users, decisions, data sources, a data model and a first version you could ship. The interviewer typically adds constraints as you go to see how you adapt."
      },
      {
        stage: "Coding and system design rounds",
        details: "Onsite loops often include further coding and a design discussion. Design prompts tend to involve integrating messy data from several systems, access control, and deployment into restricted or disconnected environments."
      },
      {
        stage: "Hiring manager and values conversation",
        details: "Often a behavioral discussion about ownership, working with difficult stakeholders and judgment on sensitive use cases. Concrete stories about projects you drove end to end land better than general statements."
      }
    ],
    decompPlaybook: {
      formula: [
        "Clarify the decision: who is the operator, what decision are they making, how often, and what happens when it is wrong.",
        "Bound the scope: state two or three assumptions out loud (scale, latency, who has access) and ask the interviewer to confirm or change them.",
        "Model the world: name the core objects, their key properties, the links between them and the state changes that matter (for example Shipment, Warehouse, Carrier, Delay).",
        "Map the data: list the source systems, how often each updates, how you join records that lack a shared key, and where data quality will break.",
        "Design the workflow: sketch what the operator sees, what action they take, and how that action is written back to the source system.",
        "Stress-test it: walk through one failure (a source goes stale, two users edit the same record, the site loses connectivity) and say what the system does."
      ],
      goldenRules: [
        "Start from the user and the decision, not from the database or a model.",
        "Propose a small first version you could ship in weeks, then describe how it grows.",
        "Treat entity resolution and data quality as first-class problems; they usually are on real deployments.",
        "When the interviewer adds a constraint, restate it, adjust the design and keep moving."
      ]
    },
    redFlags: [
      "Waiting for complete requirements instead of proposing assumptions and checking them.",
      "Reaching for machine learning when rules, joins or a search over a graph would solve the problem.",
      "Ignoring who is allowed to see which data in a multi-team or multi-agency setting.",
      "Getting defensive when a new constraint invalidates part of your design."
    ],
    sampleQuestions: [
      {
        q: "Decomposition practice: a regional hospital network wants to cut the time patients spend waiting for a bed after admission. Where do you start?",
        tip: "Identify the bed manager as the operator. Model Bed, Patient, Ward, Discharge and Cleaning task. Note that admission, discharge and housekeeping data usually live in separate systems with different update rates, and propose a live board that flags likely discharges before demand peaks."
      },
      {
        q: "Design practice: how would you ship software updates to dozens of customer sites that have no direct internet connection?",
        tip: "Cover signed release bundles, a manifest of versions per site, transfer through an approved one-way channel, health checks after install, automatic rollback, and audit logs that sync back when a connection is available."
      },
      {
        q: "Decomposition practice: a manufacturer wants early warning when a supplier delay will stop a production line.",
        tip: "Link Purchase order, Part, Bill of materials, Line and Supplier. The hard part is joining supplier part numbers to internal ones, so say how you would handle unmatched records. Rank alerts by days of inventory left, not by delay size."
      }
    ]
  },

  {
    id: "databricks",
    name: "Databricks",
    roleName: "Solutions Architect / Resident Solutions Architect",
    logoBadge: "DBRX",
    accentColor: "#DC2626",
    tagline: "A field role built around helping data teams design, migrate and tune workloads on a Spark-based data platform.",
    overview: "Databricks field engineers sit between the sales team and the customer's data and platform engineers. Pre-sales solutions architects run technical discovery, build proofs of concept and design target architectures; resident and professional services architects stay with a customer to deliver migrations and production pipelines. The role is distinctive for its technical depth: you are expected to read a Spark query plan, explain a cost profile and still present the design clearly to a data leader.",
    compensationTier: "Varies widely by level, location and equity. Pre-sales field roles often include variable or commission pay. Check Levels.fyi and the official job posting for current figures.",
    products: ["Delta Lake", "Unity Catalog", "Databricks SQL", "Lakeflow"],
    interviewStages: [
      {
        stage: "Recruiter screen",
        details: "Typically covers your experience with data engineering, cloud platforms (AWS, Azure or Google Cloud) and customer-facing work, plus which segment or region you are targeting."
      },
      {
        stage: "Technical screen",
        details: "Candidates commonly report hands-on SQL or PySpark work: joins, aggregations, window functions and reasoning about why a query is slow."
      },
      {
        stage: "Distributed systems deep dive",
        details: "Often a conversation about how Spark executes work: stages and tasks, shuffles, partitioning, skew, join strategies and memory pressure. Interviewers tend to probe how you would diagnose a real failure."
      },
      {
        stage: "Architecture and migration design",
        details: "A design exercise such as moving a legacy warehouse or Hadoop estate onto Databricks. Expect to discuss layered pipelines, streaming versus batch ingestion, governance and a phased cutover plan."
      },
      {
        stage: "Customer presentation and behavioral rounds",
        details: "Many candidates report a prepared presentation to a mock customer, followed by questions and pushback. Behavioral rounds usually map to the company's stated values, such as customer focus and ownership."
      }
    ],
    decompPlaybook: {
      formula: [
        "Size the problem: data volume, daily growth, freshness needed by consumers and the current monthly cost.",
        "Layer the pipeline: raw landing tables, cleaned and deduplicated tables, then business-ready aggregates, with a clear owner for each layer.",
        "Choose ingestion per source: incremental file loading for object storage, change data capture for operational databases, scheduled batch for slow-moving reference data.",
        "Tune storage and compute: file sizing and compaction, liquid clustering or partitioning on common filter columns, and right-sized job versus SQL warehouse compute.",
        "Govern it: catalog permissions, row and column controls, lineage and an audit trail before any data is shared outside the team.",
        "Plan the cutover: run old and new systems in parallel, reconcile outputs, then migrate consumers in waves."
      ],
      goldenRules: [
        "Estimate data volume and cost before you propose cluster sizes.",
        "Explain shuffles, skew and join strategies in plain terms; this is where many candidates struggle.",
        "Tie each design choice to an outcome the customer cares about: cost, freshness, reliability or team productivity.",
        "Be fair about competing platforms. Credibility comes from saying where the trade-offs really are."
      ]
    },
    redFlags: [
      "Treating Spark as a black box with no sense of what the driver and executors do.",
      "Adding compute to fix a job before checking for skew, small files or an unnecessary shuffle.",
      "A migration plan with no parallel run, reconciliation or rollback.",
      "Dismissing a customer's existing platform instead of engaging with why they chose it."
    ],
    sampleQuestions: [
      {
        q: "A nightly PySpark job that joins clickstream events to a customer table has started failing with executor out-of-memory errors as data grows. How do you investigate?",
        tip: "Open the Spark UI and compare task durations within the failing stage to spot skew. Check whether a broadcast table outgrew memory, look at shuffle partition counts, and consider salting the hot key or enabling adaptive query execution before adding nodes."
      },
      {
        q: "A retailer wants inventory changes from several operational PostgreSQL databases available for analytics within a few minutes. Sketch the pipeline.",
        tip: "Use change data capture from each database, land raw change records in an append-only table, then apply them with MERGE into a current-state table using Structured Streaming or Lakeflow Declarative Pipelines. Cover ordering, deletes, schema changes and how you would replay after an outage."
      },
      {
        q: "A data leader says their warehouse bill doubled after moving to Databricks. What do you look at first?",
        tip: "Break cost down by workload, check for always-on or oversized compute, idle clusters without auto-termination, and repeated full-table scans. Propose quick fixes and a tagging scheme so cost is attributed to teams."
      }
    ]
  },

  {
    id: "scale_ai",
    name: "Scale AI",
    roleName: "Forward Deployed Engineer (FDE)",
    logoBadge: "SCALE",
    accentColor: "#DB2777",
    tagline: "A fast-moving deployment role focused on turning AI models and training data into working applications for enterprise and public sector teams.",
    overview: "Scale AI is known for data labeling and evaluation infrastructure used to train and test AI models, and it also builds AI applications for enterprise and government customers. Forward deployed engineers there typically scope a customer use case, build a working prototype quickly, and harden it into something the customer can rely on, often involving retrieval, model evaluation and human review loops. The role is distinctive for the pace and for how much of the work centers on measuring model quality, not just shipping features.",
    compensationTier: "Varies widely by level, location and equity. Check Levels.fyi and the official job posting for current figures.",
    products: ["Scale Data Engine", "Scale GenAI Platform", "Scale Donovan"],
    interviewStages: [
      {
        stage: "Recruiter screen",
        details: "Usually a conversation about your range across backend, frontend and AI work, and whether you are comfortable in a fast, loosely structured environment."
      },
      {
        stage: "Practical coding or build exercise",
        details: "Candidates commonly report a hands-on exercise where you build something that works against a provided API or dataset. Working software, sensible structure and clear communication typically count for more than polish."
      },
      {
        stage: "System design",
        details: "Often a design prompt tied to AI workflows, such as a pipeline that routes items to human reviewers, or a service that calls models with latency and cost limits."
      },
      {
        stage: "Applied AI discussion",
        details: "Expect questions on choosing between prompting, retrieval and fine-tuning, building evaluation sets, measuring quality and handling unsafe or incorrect model output."
      },
      {
        stage: "Customer scenario and behavioral rounds",
        details: "A scenario about a customer project that is behind or underperforming, plus behavioral questions about ownership and working through ambiguity."
      }
    ],
    decompPlaybook: {
      formula: [
        "Define success with the customer: one task, one metric, a target and the date it needs to be met.",
        "Build the thinnest working version end to end: input, model call, output and a way for a person to review it.",
        "Create an evaluation set early: real examples, labeled correct answers and a script that scores every change.",
        "Close the loop: route low-confidence or disputed outputs to human reviewers and feed their corrections back into prompts, retrieval or training data.",
        "Harden for production: logging, retries, rate limits, access control and a clear plan for where customer data is stored."
      ],
      goldenRules: [
        "A narrow solution that works end to end beats a complete design that does not run yet.",
        "Add logging and an evaluation script from the first prototype, not after launch.",
        "Report model quality with numbers and examples, including the failures.",
        "Handle customer data deliberately: know where it is stored, who can see it and when it is deleted."
      ]
    },
    redFlags: [
      "Spending most of a timed build on tooling setup or styling instead of core functionality.",
      "Shaky fundamentals on tokens, context windows, sampling settings or embeddings.",
      "Claiming a model works without any evaluation data to back it up.",
      "Stalling when a specification is incomplete instead of making and stating a reasonable assumption."
    ],
    sampleQuestions: [
      {
        q: "Build practice: create a small web tool where reviewers see a document, the model's extracted fields, and can accept or correct each field. Corrections should be saved for later evaluation.",
        tip: "Keep the data model simple (Document, Field, Prediction, Correction). Show the model's confidence, make keyboard review fast, handle API failures with retries, and export corrections in a format an evaluation script can read."
      },
      {
        q: "Design practice: you have a very large pool of unlabeled documents and budget to label only a small fraction. How do you choose which ones to label?",
        tip: "Combine uncertainty sampling (where the current model is least confident) with diversity sampling (clusters in embedding space) so you do not label near-duplicates. Hold out a random sample to measure true quality, and re-select after each training round."
      },
      {
        q: "Scenario practice: a customer's pilot assistant answers correctly in demos but users report frequent wrong answers. What do you do in the first week?",
        tip: "Collect real failing queries, label them and group failures by cause (retrieval missed the source, outdated documents, ambiguous question, model error). Fix the largest group first and share before-and-after numbers with the customer."
      }
    ]
  },

  {
    id: "openai_anthropic",
    name: "OpenAI & Anthropic",
    roleName: "Forward Deployed Engineer / Applied AI Engineer",
    logoBadge: "AI LABS",
    accentColor: "#047857",
    tagline: "Customer-facing engineering at model developers: helping organizations build reliable products on top of large language models.",
    overview: "Both OpenAI and Anthropic hire engineers who work directly with customers building on their models, under titles such as forward deployed engineer, applied AI engineer and solutions architect. The work typically covers designing agents and tool use, retrieval systems, evaluation, cost and latency tuning, and safe deployment patterns. The role is distinctive because the underlying models change quickly, so judgment about what to build, how to measure it and how to keep it safe matters more than knowledge of any one model version.",
    compensationTier: "Varies widely by level, location and equity. Equity terms differ between private companies, so read the offer details carefully. Check Levels.fyi and the official job posting for current figures.",
    products: ["OpenAI API", "ChatGPT Enterprise", "Claude API", "Model Context Protocol (MCP)"],
    interviewStages: [
      {
        stage: "Recruiter screen",
        details: "Typically covers your experience shipping software that uses language models, how you work with customers and why you want this kind of role."
      },
      {
        stage: "Practical coding",
        details: "Candidates commonly report a hands-on exercise close to real work, such as building a tool-calling loop, parsing structured model output or integrating with an API, with attention to error handling."
      },
      {
        stage: "System design for LLM applications",
        details: "Often a design prompt such as an internal assistant or a document processing pipeline. Expect to discuss retrieval, context management, streaming, caching, rate limits and cost."
      },
      {
        stage: "Evaluation and safety discussion",
        details: "Questions on how you would measure quality, catch regressions when prompts or models change, and defend against prompt injection and data leakage."
      },
      {
        stage: "Customer scenario and values rounds",
        details: "A scenario where you advise a customer on an approach, plus behavioral questions. Both companies place visible emphasis on responsible deployment, so expect questions on how you handle risky use cases."
      }
    ],
    decompPlaybook: {
      formula: [
        "Classify the problem: plain code, a single model call, retrieval over documents, a multi-step agent, or a case that needs fine-tuning.",
        "Write the evaluation first: a set of real inputs with expected outcomes and a scoring method you trust.",
        "Design the context: what the model needs to see, where it comes from, and how you keep it within the context window and budget.",
        "Define tools and boundaries: typed tool schemas, which actions need human approval, and what the model must never do on its own.",
        "Plan for production: latency targets, streaming, retries, rate limits, caching, logging and a way to roll back a prompt or model change."
      ],
      goldenRules: [
        "Try prompting and retrieval before fine-tuning; move on only when evaluations show a gap you cannot close.",
        "Validate structured output against a schema before any downstream system acts on it.",
        "Enforce permissions and sensitive-data handling in code around the model, not in the prompt alone.",
        "Avoid tying a design to one model version; make the model a configuration choice you can re-evaluate."
      ]
    },
    redFlags: [
      "No concrete plan for wrong or made-up answers beyond better prompting.",
      "Little sense of token costs, rate limits or how latency adds up across chained calls.",
      "Treating evaluation as a final check rather than the way you make decisions.",
      "Letting a model take irreversible actions without validation or human approval."
    ],
    sampleQuestions: [
      {
        q: "Design practice: build a support agent that can look up orders, issue small refunds and hand off to a human with a summary. How do you keep it safe?",
        tip: "Expose narrow, typed tools. Enforce refund limits and identity checks in the tool code, use idempotency keys so retries never double-pay, log every action, and define clear triggers for handing off to a human."
      },
      {
        q: "Evaluation practice: a customer wants to switch the model behind several production features. How do you decide whether it is safe?",
        tip: "Assemble an evaluation set per feature from real traffic, score with exact checks where possible and a calibrated model grader elsewhere, compare cost and latency, then roll out gradually with monitoring and a quick way to switch back."
      },
      {
        q: "Security practice: an assistant reads incoming emails and can draft replies and update a CRM. What could go wrong?",
        tip: "Treat email content as untrusted input that may contain injected instructions. Separate reading from acting, require confirmation for writes, limit tool permissions to the current user, and test with adversarial examples."
      }
    ]
  },

  {
    id: "snowflake",
    name: "Snowflake",
    roleName: "Solutions Engineer / Solutions Architect",
    logoBadge: "SNOW",
    accentColor: "#0369A1",
    tagline: "A field role centered on SQL performance, cost control and migrations for teams moving analytics onto a managed cloud data platform.",
    overview: "Snowflake's field engineers work with customer data and analytics teams before and after a purchase. Pre-sales solutions engineers run discovery, proofs of concept and architecture reviews; professional services architects lead migrations and production builds. The role is distinctive for how often the conversation turns to cost: because compute is billed by usage, you are expected to explain how warehouse sizing, query design and governance settings affect the bill, alongside performance and security.",
    compensationTier: "Varies widely by level, location and equity. Pre-sales field roles often include variable or commission pay. Check Levels.fyi and the official job posting for current figures.",
    products: ["Snowpark", "Snowflake Cortex AI", "Streamlit in Snowflake", "Snowflake Marketplace"],
    interviewStages: [
      {
        stage: "Recruiter screen",
        details: "Typically covers your SQL and data warehousing background, cloud experience and comfort leading technical conversations with customers."
      },
      {
        stage: "SQL and performance screen",
        details: "Candidates commonly report analytical SQL problems and questions about reading a query profile: pruning, join behavior and data spilling out of memory."
      },
      {
        stage: "Platform architecture discussion",
        details: "Often a conversation about how separating storage from compute works in practice, plus features such as cloning, Time Travel, data sharing and access control."
      },
      {
        stage: "Migration design",
        details: "A design exercise such as moving an on-premises warehouse to Snowflake. Expect ingestion choices, security and governance, cost controls and a validation plan."
      },
      {
        stage: "Customer presentation and behavioral rounds",
        details: "Many candidates report presenting to a mock customer and handling objections, including comparisons with other platforms, followed by behavioral questions."
      }
    ],
    decompPlaybook: {
      formula: [
        "Profile the workload: who queries what, how often, how fresh the data must be and how many users run queries at once.",
        "Separate workloads: give loading, transformation and BI their own warehouses so one cannot slow down another, with auto-suspend on each.",
        "Design for pruning: filter on columns that align with how data arrives, and add clustering keys only when the query profile shows poor pruning on large tables.",
        "Choose ingestion: bulk loading for history, Snowpipe or Snowpipe Streaming for continuous data, and tasks or dynamic tables for transformations.",
        "Govern and share: role hierarchy, masking and row access policies, then share data through secure shares or listings instead of copying it."
      ],
      goldenRules: [
        "Put cost controls in every design: resource monitors, auto-suspend and per-team warehouses so spend is visible.",
        "Fix the query before resizing the warehouse; a bigger warehouse only helps when the work is truly limited by memory or parallelism.",
        "Know when Snowpark code is the right tool and when plain SQL is simpler and just as fast.",
        "Use zero-copy cloning for development and testing environments, and explain the storage cost as data diverges."
      ]
    },
    redFlags: [
      "Assuming a larger warehouse fixes any slow query.",
      "A design with no resource monitors, budgets or ownership for compute spend.",
      "Not being able to explain micro-partitions and pruning compared with indexes in a traditional database.",
      "Overselling: promising features or performance you have not verified for the customer's case."
    ],
    sampleQuestions: [
      {
        q: "A dashboard query takes several minutes and the query profile shows a large amount of data spilled to remote storage. What do you check?",
        tip: "Spilling means the operation did not fit in memory. First reduce the data involved: filter earlier, select fewer columns, check for an accidental row explosion in a join. If the work is still large, try one size up and compare cost per run."
      },
      {
        q: "A company on one cloud provider needs to share curated data with a partner whose Snowflake account is on a different cloud and region. How do you set it up?",
        tip: "Direct shares only work within a region, so either replicate the database to an account in the partner's region or publish a listing that uses cross-cloud auto-fulfillment. Share secure views rather than base tables and agree on refresh frequency and costs."
      },
      {
        q: "A customer's monthly credit usage jumped with no new projects. How do you find the cause?",
        tip: "Query account usage views to break spend down by warehouse, user and query pattern. Look for warehouses that never suspend, repeated full scans, runaway tasks or retries, then set resource monitors and alerts."
      }
    ]
  }
];
