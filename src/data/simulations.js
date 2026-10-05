export const simulations = [
  {
    id: "sim_airgap_bank",
    title: "The Air-Gap Cutover Two Days Before Go-Live",
    companyStyle: "Palantir-style",
    difficulty: "Advanced",
    client: "A tier-1 investment bank (fictional)",
    stakes: "Pilot sign-off ahead of a multi-year platform contract",
    role: "Lead Forward Deployed Engineer",
    background: "You are on-site for the last 48 hours of an anti-money-laundering pilot. At the morning standup, the bank's CISO announces that a new audit finding takes effect today: no outbound network access and no artifacts pulled from external registries. Everything must run on the bank's on-premises RHEL 8 cluster with no internet route. A demo to the head of financial crime is scheduled in 36 hours, and your deployment plan assumed you could pull images from your company's registry through a temporary proxy.",
    stages: [
      {
        stageNumber: 1,
        title: "The New Policy",
        dilemma: "The CISO will not approve the temporary proxy. Your business sponsor, who wants the demo to happen, catches you in the hallway and offers to 'talk to the CISO's boss.' What do you do?",
        options: [
          {
            id: "opt_1a",
            text: "Accept the sponsor's offer. The policy is new, the pilot was approved under the old rules, and an executive exception is the fastest path to the demo.",
            impact: { trust: -25, integrity: -20, velocity: 5 },
            feedback: "You might get the exception, but you have taught the security team that your project routes around them. Every later approval, including the production one, gets harder and slower."
          },
          {
            id: "opt_1b",
            text: "Accept the policy and ask the security team which approved media-transfer process they use. Propose bringing in signed container images, an offline package mirror, an SBOM, and published checksums so they can verify each artifact before it is imported.",
            impact: { trust: 30, integrity: 25, velocity: 15 },
            feedback: "You work inside their control instead of against it and make verification easy for them. Security teams tend to move faster when they get the evidence they need without having to ask for it."
          },
          {
            id: "opt_1c",
            text: "Propose running the demo from your company laptop on its own network, using a sample of the bank's transaction data exported for the occasion.",
            impact: { trust: -20, integrity: -30, velocity: 10 },
            feedback: "It looks practical, but it moves regulated customer data off the bank's controlled environment, which is a bigger policy problem than the proxy. It also demos a system that is not the one being approved."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "The glibc Mismatch",
        dilemma: "The approved bundle is imported and most services start. A host-level ingestion agent, which policy requires to run outside containers, fails with 'GLIBC_2.34 not found'. It was built on a newer distribution, and RHEL 8 ships glibc 2.28. It also expects a font package that is not in the offline mirror. There are 18 hours until the demo.",
        options: [
          {
            id: "opt_2a",
            text: "Rebuild the agent against a RHEL 8-compatible toolchain (for example, in a UBI 8 build container), add the missing font package to the offline mirror, run the smoke tests, and send the new artifacts through the same verification process.",
            impact: { trust: 25, integrity: 30, velocity: 20 },
            feedback: "You fix the root cause by targeting the platform you actually run on, and you keep the chain of custody intact. A second pass through verification costs a few hours, and you planned for it."
          },
          {
            id: "opt_2b",
            text: "Copy a newer glibc into the agent's directory and point LD_LIBRARY_PATH at it, so you don't need to rebuild or wait for another review.",
            impact: { trust: -20, integrity: -30, velocity: 10 },
            feedback: "Mixing glibc versions on one host is fragile and can crash in subtle ways. It also puts an unreviewed system library on a hardened server, which the security team will rightly treat as a policy violation."
          },
          {
            id: "opt_2c",
            text: "Statically link the agent against musl overnight and ship that build, since a static binary has no glibc dependency.",
            impact: { trust: 0, integrity: -5, velocity: 0 },
            feedback: "It can work, but you are swapping the C library the night before a demo. musl differs in DNS resolution, locale handling, and memory allocation, and this build has never been tested. It still has to go through review, so you take on more risk without saving time."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "The Auditability Challenge",
        dilemma: "At 10 PM, the bank's lead data architect watches the entity-resolution pipeline cluster four million transactions. They say: 'Compliance will not accept this unless you can show the clustering is reproducible and that every merge is explained.'",
        options: [
          {
            id: "opt_3a",
            text: "Show them the merge log: each merge records the matching features, scores, thresholds, and rule version. Re-run a sample with a fixed seed to show identical output, and invite them to write their own verification query against the log.",
            impact: { trust: 35, integrity: 30, velocity: 15 },
            feedback: "Reproducibility and per-decision explanations are what auditors need. Letting the architect check them directly turns a skeptic into someone who can vouch for the system."
          },
          {
            id: "opt_3b",
            text: "Explain that the matching logic is the vendor's intellectual property and the details are covered by the NDA, but offer a summary slide.",
            impact: { trust: -25, integrity: -15, velocity: -10 },
            feedback: "In a regulated setting, a model nobody can examine is a model nobody can approve. The architect is likely to report it as an operational risk."
          },
          {
            id: "opt_3c",
            text: "Agree it's important, ask to focus on the demo tonight, and promise a full methodology document the week after go-live.",
            impact: { trust: -5, integrity: 5, velocity: 10 },
            feedback: "It's reasonable but leaves the main objection unanswered until after the decision. If you already have the evidence, showing it now costs less than asking them to trust you."
          }
        ]
      }
    ],
    debrief: {
      lesson: "Treat a client's constraints as part of the requirements, not as obstacles. When security or compliance objects, give them evidence they can check themselves instead of looking for a way around them.",
      coreSkillsDemonstrated: [
        "Offline artifact delivery with signatures, SBOMs, and checksums",
        "Diagnosing ABI and glibc compatibility on hardened Linux hosts",
        "Making entity-resolution decisions reproducible and auditable",
        "Building trust with client security and architecture teams"
      ]
    }
  },

  {
    id: "sim_lakehouse_crash",
    title: "Peak-Traffic Streaming Backlog",
    companyStyle: "Databricks-style",
    difficulty: "Advanced",
    client: "A large online retailer (fictional)",
    stakes: "Real-time fraud scoring and inventory sync during the holiday peak",
    role: "Field Solutions Architect",
    background: "It is 2 AM on the biggest shopping day of the year. Event volume into the client's Spark Structured Streaming pipeline has jumped from about 40,000 to 450,000 events per second. Executors are failing with out-of-memory errors, the processing delay has grown from seconds to over 40 minutes, and the fraud model is scoring checkouts long after they have been approved.",
    stages: [
      {
        stageNumber: 1,
        title: "Triage on the Bridge Call",
        dilemma: "The client's VP of Infrastructure wants the cluster scaled up tenfold right now, even though it would cost tens of thousands of dollars a day. Everyone on the call is waiting for your answer.",
        options: [
          {
            id: "opt_lb1a",
            text: "Approve the scale-up immediately. More executors is the fastest thing anyone can do, and you can diagnose once the pressure is off.",
            impact: { trust: 5, integrity: -20, velocity: -10 },
            feedback: "This feels decisive, but if one task holds most of the data, extra executors sit idle while that task still runs out of memory. You spend money and time and learn nothing."
          },
          {
            id: "opt_lb1b",
            text: "Ask for ten minutes. Check the streaming query progress metrics and the Spark UI stage view for task duration and shuffle-read distribution, and look at state store memory per partition.",
            impact: { trust: 25, integrity: 30, velocity: 20 },
            feedback: "A short, specific diagnostic plan earns trust on an incident call. The stage view shows that one task reads most of the shuffle data: guest checkouts all have an empty user_id, so they hash to the same key in the stream-stream join."
          },
          {
            id: "opt_lb1c",
            text: "Restart the query with a fresh checkpoint to drop the backlog and start over from the latest offsets.",
            impact: { trust: -15, integrity: -30, velocity: 10 },
            feedback: "Latency recovers at first, but you skip every unprocessed event and throw away join state, so those checkouts are never scored. The skew is still there, and the problem comes back within the hour."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Fixing the Hot Key",
        dilemma: "The cause is confirmed: events with an empty user_id pile onto one join key and inflate that partition's state. Guest checkouts have no user profile to join with anyway. How do you fix this tonight?",
        options: [
          {
            id: "opt_lb2a",
            text: "Filter empty-key events out of the profile join and send them to a separate guest-scoring query keyed on session and device ID, with its own checkpoint. Restart the main query from its existing checkpoint after confirming the change keeps the stateful operators compatible.",
            impact: { trust: 30, integrity: 35, velocity: 25 },
            feedback: "You fix the cause instead of spreading the symptom around. Guest orders are still scored, the main query keeps its state, and the backlog clears once the hot partition is gone."
          },
          {
            id: "opt_lb2b",
            text: "Raise spark.sql.shuffle.partitions from 200 to 1,600 and restart, so the load is spread across more tasks.",
            impact: { trust: -5, integrity: -10, velocity: -15 },
            feedback: "Every row with the same key still lands in one partition, so more partitions don't split a single hot key. For stateful streaming queries, the partition count is also fixed by the checkpoint, so the change won't take effect without starting a new one."
          },
          {
            id: "opt_lb2c",
            text: "Drop events with an empty user_id at the ingestion layer until the peak is over.",
            impact: { trust: -25, integrity: -30, velocity: 15 },
            feedback: "The pipeline recovers, but guest checkouts are a large share of orders and are where bots tend to show up. You have stopped fraud scoring for the traffic that needs it most."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "The Post-Incident Review",
        dilemma: "The pipeline holds for the rest of the peak. The next morning, you present to the VP of Infrastructure and the Chief Digital Officer. The checkout team is on the call too.",
        options: [
          {
            id: "opt_lb3a",
            text: "Explain that the checkout service sent events without user IDs, which caused the outage.",
            impact: { trust: -20, integrity: -10, velocity: -10 },
            feedback: "Guest checkouts without a user ID were valid input. The pipeline simply wasn't designed for them. Blaming another team makes them defensive and hides the design gap."
          },
          {
            id: "opt_lb3b",
            text: "Run a blameless review: timeline, how the skew happened, why scaling up wouldn't have helped, what was changed, and follow-ups such as skew and lag alerts, explicit handling of null keys, and a load test at peak volume.",
            impact: { trust: 35, integrity: 35, velocity: 20 },
            feedback: "A clear causal story plus concrete follow-ups shows the client the problem is understood and won't recur. Owners and dates for the follow-ups make it believable."
          },
          {
            id: "opt_lb3c",
            text: "Keep it short: say the issue was a configuration problem that is now fixed, and recommend more reserved capacity for next year.",
            impact: { trust: -10, integrity: -20, velocity: 5 },
            feedback: "Leaving out the cause means the client can't stop it from happening again, and recommending capacity that wouldn't have helped looks like upselling."
          }
        ]
      }
    ],
    debrief: {
      lesson: "When a distributed job falls over, find out where the work is piling up before you add capacity. Adding hardware won't fix one hot key or one oversized state partition.",
      coreSkillsDemonstrated: [
        "Reading Spark UI stage and streaming metrics under pressure",
        "Handling skewed and null join keys in stateful streaming",
        "Knowing which changes a streaming checkpoint allows",
        "Running a blameless post-incident review"
      ]
    }
  },

  {
    id: "sim_ai_hallucination",
    title: "PHI Exposure in a Claims Assistant Pilot",
    companyStyle: "Applied AI lab-style",
    difficulty: "Advanced",
    client: "A national health insurer (fictional)",
    stakes: "Regulatory exposure and the future of the client's generative AI program",
    role: "Applied AI Forward Deployed Engineer",
    background: "Your team built a claims-review assistant on a hosted LLM, covered by a business associate agreement and connected to a retrieval index over claim notes. During a pilot review with the Chief Compliance Officer, a question about one member's oncology claim returns another member's Social Security number and a diagnosis code that appears in neither member's record. The CCO says this may be a reportable privacy incident.",
    stages: [
      {
        stageNumber: 1,
        title: "The First Response",
        dilemma: "The CCO asks: 'How did this happen, and can you guarantee it won't happen in production?' Your account executive whispers that you should keep this from becoming a formal incident.",
        options: [
          {
            id: "opt_ai1a",
            text: "Point out that only internal reviewers saw the output, so it probably doesn't need to be reported, and that the issue will be fixed before production.",
            impact: { trust: -30, integrity: -35, velocity: 5 },
            feedback: "Whether to report is the client's legal decision, not yours. If you push to play it down, compliance will distrust everything you tell them from now on."
          },
          {
            id: "opt_ai1b",
            text: "Take ownership. Recommend pausing pilot access, preserve the logs and traces, support the compliance team's incident process, and commit to a root-cause briefing at a set time. Say plainly that you can't promise 'never', but you can show the controls that close this path and the evidence behind them.",
            impact: { trust: 30, integrity: 35, velocity: 10 },
            feedback: "Containing the problem, preserving evidence, and being candid about what can be guaranteed is what a compliance officer needs. Pausing costs some time but keeps the program alive."
          },
          {
            id: "opt_ai1c",
            text: "Explain that LLMs are probabilistic, so occasional errors are expected, and that the pilot was meant to surface exactly this kind of issue.",
            impact: { trust: -20, integrity: -10, velocity: -10 },
            feedback: "Part of this is true, but it skips the real failure. The model could only leak another member's SSN because retrieval handed it that data. Calling it model randomness hides a fixable access-control bug."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Root Cause",
        dilemma: "The traces show two problems. Retrieval searched across all members' claim notes instead of just the claim under review, and the notes were indexed with identifiers left in. Separately, diagnosis codes were generated as free text without any validation.",
        options: [
          {
            id: "opt_ai2a",
            text: "Add firm instructions to the system prompt telling the model never to output SSNs or invent codes, then re-run the failing query to confirm.",
            impact: { trust: -15, integrity: -30, velocity: 15 },
            feedback: "Prompt instructions are easy to bypass and can't serve as an access control. The other member's data is still being retrieved. You have only asked the model not to repeat it."
          },
          {
            id: "opt_ai2b",
            text: "Fix it in layers: restrict retrieval to the member and claim under review, enforced from the user's session rather than the prompt; re-index with identifiers removed where they aren't needed; constrain code output to a schema and check it against the ICD-10 code set; and add an output scanner for identifier patterns as a backstop.",
            impact: { trust: 35, integrity: 40, velocity: 20 },
            feedback: "The main fix is an authorization boundary in retrieval, so the model never sees data the user can't access. Schema validation catches invented codes, and the scanner is a backstop, not the main control."
          },
          {
            id: "opt_ai2c",
            text: "Switch to a larger, newer model that follows instructions better and hallucinates less.",
            impact: { trust: -5, integrity: -15, velocity: -10 },
            feedback: "A stronger model might invent fewer codes, but it will still repeat whatever retrieval gives it. The leak is a data-access problem, and changing models doesn't touch it."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Re-Review",
        dilemma: "You meet again with the CCO, the CISO, and the medical director. How do you show that the fix works?",
        options: [
          {
            id: "opt_ai3a",
            text: "Present results from an adversarial test set built with the compliance team, including cross-member retrieval attempts and fabricated-code prompts. Report pass rates, every failure, residual risks, and a staged rollout with human review of all outputs at first.",
            impact: { trust: 35, integrity: 35, velocity: 20 },
            feedback: "Showing measured results, failures included, is more credible than claiming perfection. A staged rollout with human review lets the client expand access as evidence builds."
          },
          {
            id: "opt_ai3b",
            text: "Present a clean result: 1,000 adversarial prompts with zero leaks, and declare the issue resolved.",
            impact: { trust: 5, integrity: -15, velocity: 10 },
            feedback: "Zero failures on a test set you designed only proves the set was limited. A careful CISO will ask who wrote the prompts and what they missed, and 'resolved' overstates what testing can show."
          },
          {
            id: "opt_ai3c",
            text: "Demo a few typical queries live so the executives can see normal behavior.",
            impact: { trust: -20, integrity: -20, velocity: 5 },
            feedback: "Normal queries were never the problem. Showing only easy cases looks like you are avoiding the failure that brought everyone into the room."
          }
        ]
      }
    ],
    debrief: {
      lesson: "Enforce access control and data handling outside the model, in retrieval and validation code. Then show your evidence honestly, failures and remaining risks included, because regulated clients trust what they can measure.",
      coreSkillsDemonstrated: [
        "Tracing an LLM failure through retrieval and generation",
        "Enforcing per-user authorization in retrieval",
        "Validating structured output against reference data",
        "Running adversarial evaluations with the client's risk owners"
      ]
    }
  },

  {
    id: "sim_scope_creep",
    title: "The Steering Committee Scope Ambush",
    companyStyle: "Any FDE team",
    difficulty: "Intermediate",
    client: "A national logistics operator (fictional)",
    stakes: "Converting a pilot to an enterprise license",
    role: "Forward Deployed Engineer (pilot lead)",
    background: "It is week six of an eight-week pilot. Your route-optimization tool is live in two depots and has cut empty truck miles by about 11%. At the monthly steering committee, the COO announces that the board expects 'the full platform' at the conversion review in two weeks: all 14 depots, a driver mobile app, and a carbon-reporting dashboard. Your team is you and one other engineer.",
    stages: [
      {
        stageNumber: 1,
        title: "The Announcement",
        dilemma: "Everyone in the room turns to you. The COO asks: 'That's doable, right?'",
        options: [
          {
            id: "opt_sc1a",
            text: "Say yes to keep the meeting positive, and plan to work weekends to get as far as you can.",
            impact: { trust: 10, integrity: -30, velocity: -25 },
            feedback: "The room relaxes, but you've committed to something two engineers can't deliver in two weeks. The gap will show up at the review, when it matters most."
          },
          {
            id: "opt_sc1b",
            text: "Acknowledge the goal, ask what the board most needs to be convinced of, and offer to come back within 24 hours with options and trade-offs.",
            impact: { trust: 25, integrity: 25, velocity: 10 },
            feedback: "You treat the request as a goal to understand, not a list to accept or refuse. The short delay gives you time to plan honestly without seeming to resist."
          },
          {
            id: "opt_sc1c",
            text: "Point out that this is outside the signed pilot scope and would need a contract change.",
            impact: { trust: -20, integrity: 10, velocity: 0 },
            feedback: "You're right on the facts, but the COO hears 'no' in front of their peers. Contract scope matters, and it's a conversation for afterward, not the opening response."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "The Options Memo",
        dilemma: "You learn the board's real question: 'Will this work beyond two depots, and does it help our carbon targets?' You have 24 hours to propose a plan.",
        options: [
          {
            id: "opt_sc2a",
            text: "Propose rolling out to four more depots at production quality, adding a simple carbon estimate based on the miles already saved, and presenting a dated plan for the remaining eight depots and the mobile app.",
            impact: { trust: 30, integrity: 25, velocity: 20 },
            feedback: "You answer the board's actual question with real data and a believable plan. Six live depots show that it scales better than fourteen mockups would."
          },
          {
            id: "opt_sc2b",
            text: "Build clickable mockups of all 14 depots and the mobile app so the review looks complete.",
            impact: { trust: -10, integrity: -30, velocity: 10 },
            feedback: "It looks impressive until a board member asks a question the mockups can't answer. Then the real results lose credibility along with the fake ones."
          },
          {
            id: "opt_sc2c",
            text: "Ask your company to send five more engineers so you can try to build everything.",
            impact: { trust: 5, integrity: -5, velocity: -20 },
            feedback: "New engineers need time to learn the client's data and systems, so two weeks is mostly onboarding. It also spends budget your account team hasn't approved."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "The Pushback",
        dilemma: "The COO reads your memo and replies: 'The board won't be impressed by six depots. I need all 14.' Your account executive privately asks you to 'just make it work.'",
        options: [
          {
            id: "opt_sc3a",
            text: "Meet the COO one-on-one, walk through what a failed 14-depot rollout would do to their credibility, and offer to co-present the six-depot results and the roadmap to the board.",
            impact: { trust: 30, integrity: 20, velocity: 15 },
            feedback: "You frame the plan around the COO's own success. They agree to present six depots plus a roadmap, which gives the board both proof and a path forward."
          },
          {
            id: "opt_sc3b",
            text: "Go along with your account executive and attempt all 14 depots.",
            impact: { trust: -15, integrity: -25, velocity: -30 },
            feedback: "Rushed depots go live with poor data. The review then focuses on why the numbers dropped instead of the savings you had already proven."
          },
          {
            id: "opt_sc3c",
            text: "Escalate to the COO's boss and ask them to set realistic expectations.",
            impact: { trust: -30, integrity: 0, velocity: -5 },
            feedback: "You might win the argument, but you lose your champion. Going over a stakeholder's head should come only after a direct conversation has failed."
          }
        ]
      }
    ],
    debrief: {
      lesson: "Behind most scope requests is something an executive needs to prove to their own audience. Find out what it is, then propose the smallest credible delivery that proves it, and offer options rather than a flat no.",
      coreSkillsDemonstrated: [
        "Uncovering the goal behind a feature request",
        "Negotiating with options and trade-offs",
        "Managing your own account team",
        "Co-presenting with an executive sponsor"
      ]
    }
  }
];
