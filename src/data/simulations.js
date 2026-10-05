export const simulations = [
  {
    id: "sim_airgap_bank",
    title: "The 48-Hour Air-Gapped Financial Crisis",
    companyStyle: "Palantir Style",
    difficulty: "Advanced",
    client: "Global Tier-1 Investment Bank",
    stakes: "$14M Enterprise Foundry Contract Go-Live",
    role: "Lead Forward Deployed Software Engineer (FDSE)",
    background: "You have arrived on-site in New York for the final 48 hours of a high-visibility anti-money laundering pilot. The bank's Chief Information Security Officer (CISO) and Lead Security Architect drop a bombshell during the morning standup: 'Due to a newly enforced audit policy, no internet outbound connection or cloud-hosted artifacts will be permitted. All software must run completely air-gapped on our on-premise RHEL 8 bare-metal cluster with zero internet access, starting today.' The scheduled live demo to the Group CEO is in 36 hours.",
    stages: [
      {
        stageNumber: 1,
        title: "The CISO Ultimatum",
        dilemma: "Your team had initially planned to pull container images from your company's secure cloud registry via a temporary outbound proxy. The CISO refuses to sign off on the outbound proxy. What is your immediate response?",
        options: [
          {
            id: "opt_1a",
            text: "Argue forcefully with the CISO that an exception must be made for the pilot, threatening that the CEO demo will have to be cancelled and blamed on security.",
            impact: { trust: -35, integrity: -20, velocity: -15 },
            feedback: "Disastrous move. The CISO digs in their heels and reports you to executive sponsors for lack of security compliance. Trust is severely damaged."
          },
          {
            id: "opt_1b",
            text: "Acknowledge the policy immediately, validate the CISO's strict posture, and propose an emergency audited bundle protocol: packaging signed container tarballs and offline RPM/pip wheels onto encrypted USB media for security team hash verification.",
            impact: { trust: +30, integrity: +25, velocity: +15 },
            feedback: "Masterful FDE diplomacy! You turned a blocker into a partnership. The security team assigns an auditor to expedite the hash checks."
          },
          {
            id: "opt_1c",
            text: "Quietly connect your team laptop to a personal 5G mobile hotspot to download the missing dependencies inside the bank facility.",
            impact: { trust: -50, integrity: -50, velocity: -40 },
            feedback: "Catastrophic violation! Rogue wireless networks trigger immediate perimeter IDS alarms. Your team is escorted off the trading floor."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "The Missing Dependency Trap",
        dilemma: "You bring the offline image bundles onto the air-gapped cluster. During deployment, a critical microservice fails to start because a sub-dependency requires an external font library and dynamic GLIBC linkage that does not exist on the bank's hardened RHEL 8 kernel. The clock is ticking: 18 hours until the CEO demo.",
        options: [
          {
            id: "opt_2a",
            text: "Recompile the microservice binary with static linking (musl/static C++ runtime) inside a local container and stub the font dependency with a local fallback bitmap.",
            impact: { trust: +20, integrity: +30, velocity: +25 },
            feedback: "Brilliant systems engineering! Static compilation eliminates dynamic OS dependencies, and the microservice boots successfully on the hardened kernel."
          },
          {
            id: "opt_2b",
            text: "Ask the bank's sysadmins to run `yum install` on the bare-metal servers by temporarily connecting the cluster to an unmonitored switch.",
            impact: { trust: -30, integrity: -25, velocity: -20 },
            feedback: "The sysadmins refuse your request as a blatant security breach, and you lose valuable hours while alienating the infrastructure team."
          },
          {
            id: "opt_2c",
            text: "Comment out the entire service and fake the live demo data using a pre-recorded video presentation for the CEO.",
            impact: { trust: -40, integrity: -35, velocity: +10 },
            feedback: "High risk! If the CEO asks an interactive ad-hoc drill-down question during the demo, your deception will unravel and kill the deal."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "The Skeptical Lead Architect",
        dilemma: "At 10 PM (10 hours before the demo), the bank's internal lead database architect watches your real-time entity resolution pipeline process 4 million transactions. They claim: 'Your graph clustering is a black box. Our compliance auditors will never approve this algorithm unless you can prove determinism and provide an audit log of every cluster merge.'",
        options: [
          {
            id: "opt_3a",
            text: "Walk through the mathematical formulation of the clustering algorithm on the whiteboard, open the code to show the deterministic random seed and immutable merge audit table, and offer to let them write a test verification query right now.",
            impact: { trust: +35, integrity: +30, velocity: +20 },
            feedback: "Exceptional outcome! Giving the client architect hands-on control and full transparency turns your harshest critic into your strongest advocate for the morning demo."
          },
          {
            id: "opt_3b",
            text: "Tell the architect that Palantir's algorithms are proprietary intellectual property and cannot be shared or explained under NDA.",
            impact: { trust: -25, integrity: -15, velocity: -10 },
            feedback: "The architect escalates to the CIO that your software is an un-auditable operational risk, casting doubt on the entire pilot."
          }
        ]
      }
    ],
    debrief: {
      lesson: "In high-stakes enterprise deployments, technical excellence is only half the battle. Air-gapped constraints and internal client skepticism are standard operating environments. True Forward Deployed Engineers lean into security constraints with empathy, solve low-level systems problems with static tools, and empower client engineers rather than competing with them.",
      coreSkillsDemonstrated: ["Air-gapped artifact bundling & cryptographic verification", "Systems-level static compilation & Linux kernel debugging", "High-EQ stakeholder de-escalation & transparent auditability"]
    }
  },

  {
    id: "sim_lakehouse_crash",
    title: "Black Friday Lakehouse Streaming Ingestion Outage",
    companyStyle: "Databricks Style",
    difficulty: "Advanced",
    client: "Global E-Commerce Retailer ($8B Annual GMV)",
    stakes: "Real-time Fraud & Inventory Sync During Peak Holiday Traffic",
    role: "Lead Field Solutions Architect",
    background: "It is 2:00 AM on Black Friday. You are supporting the client's core inventory and fraud analytics platform on Databricks Lakehouse. Ingestion throughput spikes from 40,000 events/sec to 450,000 events/sec. Suddenly, the Structured Streaming cluster's memory skyrockets, executor nodes start dropping with 'ExecutorLostFailure (OOM)', and the ingestion delay swells from 3 seconds to 42 minutes. Fraudulent checkout bots are slipping through undetected.",
    stages: [
      {
        stageNumber: 1,
        title: "Triage Under Extreme Fire",
        dilemma: "The client's VP of Infrastructure is on the emergency bridge screaming that the cluster needs 10x more worker nodes immediately ($50k/day cost). What is your immediate diagnostic step?",
        options: [
          {
            id: "opt_lb1a",
            text: "Immediately approve the 10x cluster scale-up to buy time without checking the Spark UI.",
            impact: { trust: +10, integrity: -25, velocity: +5 },
            feedback: "The new nodes boot up, but within 10 minutes they ALSO run out of memory! Adding compute without diagnosing the root cause burned $20,000 with zero impact."
          },
          {
            id: "opt_lb1b",
            text: "Open the Spark UI, inspect the Structured Streaming tab and Event Timeline, and check for severe partition skew and state store memory bloat.",
            impact: { trust: +30, integrity: +35, velocity: +25 },
            feedback: "Spot-on diagnosis! The Spark UI reveals that 92% of all data is hashing to a single partition due to an empty 'user_id' default key on unauthenticated guest checkouts, causing a catastrophic join skew."
          },
          {
            id: "opt_lb1c",
            text: "Advise the client to shut down the streaming pipeline and switch to hourly batch processing until Black Friday ends.",
            impact: { trust: -40, integrity: -30, velocity: -35 },
            feedback: "Unacceptable to the business! An hourly delay means fraudulent transactions will settle, costing millions in chargeback fraud."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Mitigating the Skew & Checkpoint Bottleneck",
        dilemma: "Having identified the join skew on the empty 'user_id' key and RocksDB state-store memory saturation, how do you hot-patch the streaming query with zero downtime?",
        options: [
          {
            id: "opt_lb2a",
            text: "Deploy a query update applying 'salting' (appending a random integer between 1-32 to empty keys) to evenly distribute skewed rows across shuffle partitions, and increase shuffle partition count from 200 to 1,600.",
            impact: { trust: +35, integrity: +35, velocity: +30 },
            feedback: "Flawless distributed systems execution! Salting instantly redistributes the hot partition across all executor nodes. CPU utilization stabilizes, and the 42-minute backlog clears in 12 minutes."
          },
          {
            id: "opt_lb2b",
            text: "Drop all events that have an empty user_id at the Kafka ingestion layer.",
            impact: { trust: -35, integrity: -30, velocity: +10 },
            feedback: "Dangerous! That drops legitimate guest checkout orders, costing the retailer millions in lost revenue."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "The Executive Post-Mortem",
        dilemma: "The pipeline is healthy and Black Friday finishes with record sales. At 9 AM, you present the root-cause analysis to the VP of Infrastructure and Chief Digital Officer. How do you summarize the incident?",
        options: [
          {
            id: "opt_lb3a",
            text: "Blame the client's frontend checkout engineering team for sending malformed payloads with missing user IDs.",
            impact: { trust: -25, integrity: -10, velocity: -10 },
            feedback: "Creates political toxicity. The checkout team becomes defensive and relationships sour."
          },
          {
            id: "opt_lb3b",
            text: "Present a blameless post-mortem: Detail the traffic surge, explain the partition skew mechanics clearly with visual diagrams, document the hot-patch resolution, and present a proactive resilience plan (automated schema validation at the edge + dynamic auto-salting).",
            impact: { trust: +40, integrity: +35, velocity: +25 },
            feedback: "Executive leadership is blown away by your maturity and engineering depth. The CDO signs the 3-year enterprise renewal on the spot."
          }
        ]
      }
    ],
    debrief: {
      lesson: "When high-volume distributed systems break under pressure, throwing more hardware at the problem almost never fixes data skew or state bloat. As an FDE, mastering low-level execution plans (Spark UI, partition distributions, salting, memory allocators) allows you to diagnose and patch live production incidents in minutes.",
      coreSkillsDemonstrated: ["Spark UI diagnostic triage", "Data skew mitigation via salting & repartitioning", "Executive incident management & blameless post-mortems"]
    }
  },

  {
    id: "sim_ai_hallucination",
    title: "Enterprise LLM PII Leak & Hallucination Escalation",
    companyStyle: "OpenAI / Scale AI Style",
    difficulty: "Advanced",
    client: "Healthcare & Insurance Giant (40M Members)",
    stakes: "HIPAA Compliance & $5M Enterprise GenAI Deployment",
    role: "Lead Applied AI Forward Deployed Engineer",
    background: "Your team has deployed an enterprise Generative AI claims adjudication assistant powered by a frontier LLM (GPT-4o / Claude 3.5). During an executive pilot review with the Chief Compliance Officer (CCO) and Head of Medical Affairs, a simulated query about an oncology claim outputs a response containing another patient's Social Security Number and a completely hallucinated medical diagnosis code. The CCO threatens to halt the entire AI initiative and file a regulatory breach report within 2 hours.",
    stages: [
      {
        stageNumber: 1,
        title: "The CCO Confrontation",
        dilemma: "The CCO states: 'We were promised that our patient data was private and that this model does not hallucinate. You have 2 hours to explain why patient data leaked and prove this will never happen in production.' How do you respond?",
        options: [
          {
            id: "opt_ai1a",
            text: "Claim that LLMs are stochastic black boxes and that some hallucinations and edge cases are statistically unavoidable in artificial intelligence.",
            impact: { trust: -45, integrity: -30, velocity: -40 },
            feedback: "The CCO immediately suspends the pilot. In regulated enterprise healthcare, 'unavoidable stochastic behavior' is unacceptable."
          },
          {
            id: "opt_ai1b",
            text: "Take immediate ownership, assure the CCO of strict containment, explain that you are initiating an urgent trace of the prompt context injection, and guarantee a root-cause forensic breakdown with deterministic guardrails within 90 minutes.",
            impact: { trust: +25, integrity: +25, velocity: +20 },
            feedback: "Calm, accountable leadership. The CCO agrees to give your engineering team 90 minutes to present the forensic audit."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "The Forensic Investigation",
        dilemma: "You inspect the application trace logs (OpenTelemetry / LangSmith). You discover two catastrophic bugs: 1) The vector database chunking script ingested raw customer notes without stripping PII upstream, and 2) The system prompt lacked structured output constraints, allowing the model to extrapolate medical codes.",
        options: [
          {
            id: "opt_ai2a",
            text: "Quickly edit the system prompt to say 'DO NOT OUTPUT PATIENT SSN OR FAKE CODES' and hope the model adheres to it during the re-test.",
            impact: { trust: -25, integrity: -35, velocity: +10 },
            feedback: "Negative prompt constraints are unreliable and fail security audits. The model will eventually leak PII on a different prompt variation."
          },
          {
            id: "opt_ai2b",
            text: "Implement a multi-layered defense: 1) Deploy a deterministic regex/Presidio PII redaction proxy at the API gateway layer before data touches embeddings or models, 2) Enforce strict JSON schema structured outputs, and 3) Integrate an automated cross-reference verification check comparing generated diagnosis codes against the approved ICD-10 database.",
            impact: { trust: +40, integrity: +40, velocity: +30 },
            feedback: "Gold-standard Applied AI architecture! Deterministic filters guarantee PII cannot enter or leave the system, and database verification eliminates hallucinated codes."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "The Re-Certification Demo",
        dilemma: "At the 90-minute mark, you re-convene with the CCO, CISO, and Head of Medical Affairs. How do you demonstrate compliance?",
        options: [
          {
            id: "opt_ai3a",
            text: "Run a live automated evaluation suite of 1,000 synthetic adversarial prompts designed to extract SSNs and inject fake codes, showing a 100% block rate via the gateway logs with sub-25ms latency overhead.",
            impact: { trust: +45, integrity: +40, velocity: +30 },
            feedback: "Triumphant success! Objective data and adversarial evals win absolute trust from the CCO. The pilot is approved for enterprise production rollout."
          },
          {
            id: "opt_ai3b",
            text: "Manually type in 3 benign queries that you know will work without triggering errors.",
            impact: { trust: -20, integrity: -20, velocity: +5 },
            feedback: "The CCO sees through the cherry-picked demo and demands independent red-teaming."
          }
        ]
      }
    ],
    debrief: {
      lesson: "Never rely on LLM prompts to enforce regulatory compliance, security, or zero-hallucination guarantees. Enterprise Applied AI requires deterministic guardrails at the network and data layers: PII redaction proxies, JSON schema enforcement, grounded retrieval verification, and automated continuous eval harnesses.",
      coreSkillsDemonstrated: ["Forensic LLM prompt/vector inspection", "Deterministic PII masking & regex gateway integration", "Adversarial red-teaming & evaluation benchmarking"]
    }
  }
];
