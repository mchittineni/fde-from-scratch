// Long-form field guides in docs/guides/. The site links to the rendered files on GitHub.
// file → the Markdown filename; topic → the Library topic it deepens (null for cross-cutting guides).

export const GUIDES_BASE = 'https://github.com/mchittineni/fde-from-scratch/blob/main/docs/guides/';

export const fieldGuides = [
  { id: 'g-start', file: 'START_HERE_ZERO_TO_FDE.md', topic: null, start: true, title: 'Start here: zero to FDE', summary: 'The full curriculum from no coding experience to interview-ready: phases, time estimates, exit checkpoints and a weekly study rhythm.' },
  { id: 'g-velocity', file: 'SOFTWARE_FUNDAMENTALS_AND_VELOCITY.md', topic: 'velocity', title: 'Software fundamentals and velocity', summary: 'One language deeply, the CS that matters, Git on customer repos, an API from a blank folder, pragmatic testing and debugging.' },
  { id: 'g-data', file: 'ENTERPRISE_DATA_AND_INTEGRATION.md', topic: 'data', title: 'Enterprise data and integration', summary: 'Change data capture, Spark skew, DuckDB for local analysis and probabilistic entity resolution.' },
  { id: 'g-ai', file: 'APPLIED_AI_IN_ENTERPRISE.md', topic: 'ai', title: 'Applied AI in the enterprise', summary: 'Production RAG, layout-aware parsing, hybrid search, MCP tool design and eval harnesses in CI.' },
  { id: 'g-cloud', file: 'CLOUD_DEPLOYMENT_AND_OPERATIONS.md', topic: 'infra', title: 'Cloud deployment and operations', summary: 'Deployment models, Kubernetes in the first hour, Terraform, cloud networking, observability, upgrades and field incidents.' },
  { id: 'g-airgap', file: 'AIRGAP_SECURITY_AND_NETWORKING.md', topic: 'security', title: 'Air-gap, security and networking', summary: 'Zero-internet networks, TLS-inspection proxies, SAML vs OIDC and offline container bundles.' },
  { id: 'g-decomp', file: 'DECOMPOSITION_PLAYBOOK.md', topic: 'decomp', title: 'Decomposition playbook', summary: 'A six-phase method for turning a vague customer problem into a working system, with whiteboard timing and twists.' },
  { id: 'g-business', file: 'BUSINESS_ACUMEN_AND_DOMAINS.md', topic: 'diplomacy', title: 'Business acumen and industry domains', summary: 'How enterprises buy software, pilot success criteria, value math, compliance acronyms and primers for eight industries.' },
  { id: 'g-diplomacy', file: 'CLIENT_DIPLOMACY_AND_SURVIVAL.md', topic: 'diplomacy', title: 'Client diplomacy and field survival', summary: 'Discovery interviews, executive readouts, scope negotiation and the 24-hour bad-news rule.' },
  { id: 'g-career', file: 'INTERVIEW_AND_CAREER.md', topic: 'interview', title: 'Interviews and career', summary: 'Reading job posts, an FDE-shaped résumé and portfolio, every interview round, final-prep plans, offers and the career ladder.' },
  { id: 'g-feedback', file: 'SELF_ASSESSMENT_AND_FEEDBACK.md', topic: null, title: 'Self-assessment and feedback', summary: 'Level rubrics for all five pillars, review checklists, getting feedback when learning alone, and an interview-readiness check.' },
  { id: 'g-media', file: 'RECOMMENDED_MEDIA.md', topic: null, title: 'Lectures, talks and reading list', summary: 'University lecture series, full courses, conference talks and articles, checked link by link.' },
  { id: 'g-glossary', file: 'GLOSSARY.md', topic: null, title: 'Glossary', summary: 'Plain-English definitions of the business, data, AI, infrastructure and security terms you will meet.' }
];
