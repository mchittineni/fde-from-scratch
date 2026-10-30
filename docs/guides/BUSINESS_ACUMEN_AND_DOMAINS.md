# Business Acumen and Industry Domains Field Guide

The business knowledge FDEs are expected to have and engineers rarely learn: how enterprises buy, how value is measured, which regulations change your architecture, and how each major industry actually works.

> Related guides: stakeholder communication, discovery interviews, and executive readouts are covered in [Client Diplomacy & Field Survival](./CLIENT_DIPLOMACY_AND_SURVIVAL.md). Security controls like SSO, RLS, and air-gapped delivery are in [Air-Gap, Security & Networking](./AIRGAP_SECURITY_AND_NETWORKING.md). Running the deployment itself is in [Cloud Deployment & Operations](./CLOUD_DEPLOYMENT_AND_OPERATIONS.md).

---

## 1. How Enterprises Buy Software

A deal is not one decision. It is a sequence of approvals by people who care about different things. Knowing who is who saves you weeks.

| Role | What they care about | What they need from you |
| --- | --- | --- |
| **User** | "Does this make my day easier?" | A working workflow on their real data |
| **Champion** | Career win; solving a problem they own | Evidence and a story they can retell internally |
| **Technical evaluator** | Architecture fit, maintenance burden, security | Honest answers, diagrams, a clean deployment |
| **Economic buyer** | Budget, ROI, risk to their organization | A value case in their numbers, not yours |
| **Procurement** | Price, terms, vendor risk, process compliance | Paperwork on time; no surprises |
| **Security / GRC** | Data exposure, controls, audit evidence | Completed questionnaire, architecture, reports (SOC 2, pen test) |
| **Legal / Privacy** | Liability, data processing, IP, regulatory exposure | Accurate data-flow descriptions for the DPA |

### The typical path

```text
Discovery -> Pilot / POC -> Security review -> Procurement + Legal -> Production -> Expansion
              (you)          (you help)         (you unblock)          (you)        (you seed it)
```

- **Security review** often runs in parallel with the pilot and takes longer. Expect a questionnaire (often a standard such as SIG or CAIQ, or the customer's own spreadsheet with hundreds of rows). Your answers must match what you actually deployed; a wrong answer here can become a contractual misrepresentation.
- **Legal** negotiates the MSA (master agreement), order form, and DPA (data processing agreement). You are not a lawyer, but you will be asked "what data do we process, where, and who can see it?" Answer precisely or say you will confirm.
- **Expansion** comes from the next team that sees the first one succeed. The FDE who documents wins and introduces adjacent teams drives more revenue than any sales deck.

### Field rule

Every week, know the answer to: **"Who signs, what do they need to believe, and what is the next approval step?"** If you cannot answer, ask your account executive. That is not a sales question; it is a delivery risk question.

---

## 2. The Pilot Lifecycle and Success Criteria

Pilots fail most often because "success" was never written down. Write it in week one and have the champion and economic buyer agree to it.

### Lifecycle

1. **Scope:** one workflow, one team, real data, a fixed time box (commonly 4 to 12 weeks).
2. **Baseline:** measure how the work is done today before you change anything.
3. **Build and deploy:** ship to real users early and iterate weekly.
4. **Measure:** same metrics, same method as the baseline.
5. **Readout:** results against criteria, decision requested, path to production.

### Success criteria template

```markdown
# Pilot Success Criteria: <Customer> x <Product>
**Business problem:** <one sentence, in the customer's words>
**Users in scope:** <team, count, location>
**Data in scope:** <systems, date range, sensitivity classification>
**Time box:** <start> to <end>; weekly check-in <day/time>

| # | Criterion | Baseline (how measured) | Target | Owner of measurement |
|---|-----------|-------------------------|--------|----------------------|
| 1 | Time to triage a claim | 25 min (time study, 50 claims) | <= 10 min | Claims ops lead |
| 2 | Triage accuracy vs senior adjuster | n/a | >= 90% agreement on 200 claims | QA lead |
| 3 | Weekly active users | 0 | >= 15 of 20 | FDE |

**Out of scope:** <explicitly list what you will not do>
**Dependencies on customer:** data access by <date>, SSO by <date>, SME time <N hrs/week>
**Decision at end:** if criteria 1-2 met -> production contract discussion with <economic buyer>
**Signed off by:** <champion>, <economic buyer>, <FDE lead>
```

The "Dependencies on customer" line protects you. If data access arrives three weeks late, the time box moves too.

---

## 3. Value Math

Executives decide on numbers. Learn to build a value case from the customer's own baseline, and always show your assumptions.

| Term | Formula | Plain meaning |
| --- | --- | --- |
| **Baseline** | Measured current state | How it works today, with numbers |
| **Hours saved** | (old time - new time) x volume | Capacity freed up |
| **Cost avoided** | Spend that no longer happens | Retired licenses, avoided hires, fewer write-offs |
| **ROI** | (total benefit - total cost) / total cost | Return per dollar spent |
| **Payback period** | one-time cost / monthly net benefit | How long until it pays for itself |

### Worked example (all numbers hypothetical)

A fictional insurer, Acme Mutual, pilots a claims triage tool.

- **Baseline:** 40 adjusters each spend 2.5 hours/day on manual triage.
- **Pilot result:** triage time drops by 1.5 hours/day per adjuster.
- **Assumptions:** 220 working days/year; fully loaded cost $60/hour; one legacy tool retired at $150,000/year.
- **Costs:** subscription $400,000/year; one-time implementation $200,000; one-time customer internal effort $100,000.

```text
Hours saved     = 40 x 1.5 x 220             = 13,200 hours/year
Value of hours  = 13,200 x $60               = $792,000/year
Cost avoided    = legacy tool retired         = $150,000/year
Annual benefit  = $792,000 + $150,000        = $942,000/year

One-time cost   = $200,000 + $100,000        = $300,000
Net recurring   = $942,000 - $400,000        = $542,000/year  (~$45,167/month)
Payback         = $300,000 / $45,167         = ~6.6 months

3-year ROI      = (3 x $942,000 - (3 x $400,000 + $300,000)) / $1,500,000
                = ($2,826,000 - $1,500,000) / $1,500,000 = ~88%
```

### Make it credible

- **Hours saved are not cash** unless the time is redeployed or hiring is avoided. Show a conservative case. At 50% realization, the annual benefit is $546,000, the net recurring is $146,000, and payback stretches to about 25 months. Showing this unprompted builds trust with finance.
- **Use the customer's numbers** (their loaded rate, their volumes) and name the source of each.
- **Prefer one metric the business already tracks** (claims cycle time, days sales outstanding, unplanned downtime) over a metric you invented.
- **Separate measured from projected.** "Measured in pilot on 20 users" versus "projected to 400 users."

---

## 4. Reading the Org Chart and Mapping Stakeholders

The official org chart tells you reporting lines. It does not tell you who has influence, who owns the data, or who will block you.

### Build a stakeholder map in week one

| Name / role | Reports to | Influence (H/M/L) | Stance (champion / neutral / skeptic) | What they need | Last contact |
| --- | --- | --- | --- | --- | --- |
| VP Claims Ops | COO | H | Champion | Cycle-time win before Q3 review | Mon |
| Director, Data Platform | CIO | H | Skeptic | No new shadow data store | Tue |
| Claims analyst lead | VP Claims Ops | M | Neutral | Not to be replaced | Wed |
| CISO delegate | CISO | H (veto) | Neutral | Questionnaire, data flow diagram | Thu |

### Patterns to recognize

- **Business owns the problem; IT owns the systems.** You need both. A business champion with no IT ally produces a pilot that cannot reach production.
- **The data owner is often not the system owner.** Ask "who can approve access to this table?" separately from "who runs this database?"
- **Skeptics usually have a legitimate concern.** The data platform director who resists you has probably cleaned up after three previous vendors. Ask what went wrong last time.
- **Veto holders** (security, privacy, works councils in some countries, union representatives in some industries) rarely sponsor you, but they can stop you. Engage them early.

---

## 5. Compliance Acronyms and What They Change

You do not need to be an auditor. You need to recognize the acronym, know roughly what it covers, and know what it changes in your deployment. Always confirm specifics with the customer's compliance team; this table is orientation, not legal advice.

| Acronym | What it is | Where you meet it | What it practically changes |
| --- | --- | --- | --- |
| **SOC 2** | AICPA attestation report on controls against the Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy). Type I covers design at a point in time; Type II covers operating effectiveness over a period. | Almost every enterprise security review asks for your company's report | Your access must be logged and reviewed, changes go through change management, and you follow your company's controls even in customer environments |
| **ISO/IEC 27001** | International, certifiable standard for an information security management system (ISMS) | Common outside the US and in global enterprises | Similar operational impact to SOC 2; customers ask for your certificate and Statement of Applicability |
| **HIPAA** | US law governing protected health information (PHI) for covered entities and their business associates | Providers, health plans, and their vendors | A Business Associate Agreement (BAA) is required before you touch PHI; minimum-necessary access; audit logs; breach-notification obligations; every subprocessor (cloud, model API) must also be covered |
| **PCI DSS** | Card industry security standard for systems that store, process, or transmit cardholder data | Retail, payments, banking | Keep card numbers out of your system entirely (tokenization) so you stay out of scope; if in scope, network segmentation and strict controls apply |
| **GDPR** | EU regulation on personal data of people in the EU | Any customer with EU users, employees, or customers | Controller/processor roles and a DPA; lawful basis for processing; data subject rights (access, deletion); restrictions on transfers outside the EU; often data residency requests |
| **FedRAMP** | US government program authorizing cloud services for federal agency use, at Low, Moderate, or High impact | US federal civilian agencies | Only authorized cloud services can be used; the boundary is fixed and documented; changes may need review; continuous monitoring and vulnerability remediation deadlines |
| **ITAR** | US export-control regulations on defense articles and related technical data | Defense contractors, aerospace | Access to controlled technical data is restricted to US persons unless authorized; affects who on your team can support the account, where data is hosted, and where support staff sit |
| **CJIS** | FBI CJIS Security Policy for criminal justice information | State and local law enforcement, courts | Personnel screening (including fingerprint-based background checks) for people with access, advanced authentication, encryption requirements, and agency audits |
| **DoD Impact Levels (IL2, IL4, IL5, IL6)** | DoD Cloud Computing Security Requirements Guide categories by data sensitivity | Defense customers | Determines which cloud regions and offerings you can deploy to (for example, government-specific regions for IL4/IL5); IL6 is for classified information up to SECRET and implies classified networks |

Adjacent terms you will hear: **CMMC** and **NIST SP 800-171** (protecting controlled unclassified information in the defense supply chain), **NIST SP 800-53** (the federal control catalog behind FedRAMP), **ATO** (Authority to Operate, a government system's approval to run), **SOX** (financial reporting controls at public companies), and **21 CFR Part 11** (FDA rules for electronic records and signatures).

Official sources: [SOC 2 (AICPA)](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2), [HIPAA regulations (45 CFR Parts 160 and 164)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C), [HIPAA privacy and security (ONC)](https://www.healthit.gov/topic/privacy-security-and-hipaa), [PCI DSS](https://www.pcisecuritystandards.org/standards/pci-dss/), [EU data protection](https://commission.europa.eu/law/law-topic/data-protection_en), [FedRAMP](https://www.fedramp.gov/), [ITAR (22 CFR Subchapter M)](https://www.ecfr.gov/current/title-22/chapter-I/subchapter-M), [DoD Cloud Computing SRG](https://public.cyber.mil/dccs/), [NIST SP 800-53](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [NIST SP 800-171](https://csrc.nist.gov/pubs/sp/800/171/r3/final), [21 CFR Part 11 guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application).

---

## 6. Domain Primers

Each primer gives you enough to hold a credible first conversation. Systems named are common examples, not a complete or endorsed list.

### Financial Services and Banking

- **Systems of record:** core banking platforms (for example FIS, Fiserv, Jack Henry, Temenos), payments and card processing, loan origination, general ledger, CRM, data warehouse, often a mainframe.
- **Key entities:** customer/party, account, transaction, loan, payment, counterparty, alert, case.
- **Typical FDE problems:** fraud and anti-money-laundering alert triage, KYC onboarding, entity resolution across product silos, credit risk reporting, payment reconciliation.
- **Vocabulary:** KYC, AML, BSA, SAR (suspicious activity report), sanctions screening, false positive rate, Basel capital, NPL, reconciliation breaks, ISO 20022 (payments messaging).
- **Regulatory gotchas:** model risk management expectations (US regulators' SR 11-7 guidance) apply to anything that looks like a model, including ML and LLM features, so plan for documentation, validation, and monitoring. Third-party risk management reviews vendors in depth ([interagency guidance](https://www.occ.gov/news-issuances/bulletins/2023/bulletin-2023-17.html)). Privacy obligations under GLBA ([Safeguards Rule](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-314)). SAR contents are confidential.

### Insurance

- **Systems of record:** policy administration, claims, and billing systems (for example Guidewire, Duck Creek), rating engines, document management, actuarial models, often legacy mainframe books of business.
- **Key entities:** policy, policyholder, coverage, exposure, premium, claim, loss, reserve, agent/broker.
- **Typical FDE problems:** claims triage and fraud detection, first notice of loss (FNOL) intake from documents and emails, underwriting submission intake, subrogation recovery, catastrophe exposure analysis.
- **Vocabulary:** underwriting, loss ratio, combined ratio, reserves, IBNR, subrogation, reinsurance, adjuster, line of business (P&C, life, specialty), ACORD forms and data standards.
- **Regulatory gotchas:** in the US, insurance is regulated by the states, so rules vary. Some states regulate the use of external data and algorithms in underwriting and pricing (Colorado's SB21-169 is a frequently cited example), which affects any model that touches rating or claims decisions. Health and life lines may involve health data.

### Healthcare and Life Sciences

- **Systems of record:** EHR (for example Epic, Oracle Health, MEDITECH), PACS for imaging, lab information systems, revenue cycle and claims systems, clinical trial (EDC, CTMS) and quality systems in life sciences.
- **Key entities:** patient, encounter, order, observation/result, diagnosis, medication, procedure, claim; in trials, subject, site, visit, adverse event.
- **Standards:** **HL7 v2** (pipe-delimited messages such as ADT for admissions and ORU for results, still the bulk of hospital interface traffic), **[FHIR](https://hl7.org/fhir/)** (REST APIs with resources such as `Patient`, `Encounter`, `Observation`, `Condition`; SMART on FHIR for app authorization), **[DICOM](https://www.dicomstandard.org/)** for imaging, X12 837/835 for claims and remittance, code systems ICD-10, CPT, LOINC, SNOMED CT, RxNorm; **[CDISC](https://www.cdisc.org/standards)** (SDTM, ADaM) for trial data.
- **Typical FDE problems:** patient flow and capacity, prior authorization, clinical documentation and coding, care gap identification, trial site selection and enrollment, pharmacovigilance case intake.
- **Regulatory gotchas:** HIPAA and the BAA (section 5); extra protections for substance use disorder records (42 CFR Part 2) and in many state laws; FDA oversight may apply if software makes clinical decisions ([software as a medical device](https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd)); GxP and 21 CFR Part 11 validation in life sciences; federal interoperability rules ([CMS](https://www.cms.gov/priorities/key-initiatives/burden-reduction/interoperability), [ONC standards](https://www.healthit.gov/topic/standards-technology)).

### Manufacturing and Supply Chain

- **Systems of record:** ERP (for example SAP S/4HANA, Oracle), MES for shop-floor execution, WMS for warehouses, TMS for transport, PLM for product data, QMS for quality, process historians and SCADA/PLCs on the plant floor.
- **Key entities:** material/part, bill of materials (BOM), routing, work order, lot/batch, supplier, purchase order, shipment, inventory position, asset.
- **Architecture frame:** [ISA-95](https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard) layers separate business planning (ERP) from manufacturing operations (MES) from control systems; data rarely flows cleanly between them. OT protocols include OPC UA and MQTT.
- **Typical FDE problems:** shortage and late-order prediction, supplier risk, quality root cause and traceability, predictive maintenance, OEE improvement, S&OP planning.
- **Vocabulary:** OEE, MRP, S&OP, lead time, safety stock, yield, scrap, WIP, takt time, CAPA, MTBF.
- **Regulatory gotchas:** OT networks are segmented and change-averse ([ISA/IEC 62443](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards)); never write to control systems without explicit plant engineering approval. Export controls can apply to technical data; regulated products (pharma, medical devices, food, aerospace) add quality-system requirements.

### Energy and Utilities

- **Systems of record:** SCADA and energy/distribution management systems (EMS, ADMS), outage management (OMS), GIS (network model), advanced metering (AMI) and meter data management (MDM), customer information systems (CIS), enterprise asset management (EAM), historians.
- **Key entities:** asset (transformer, feeder, substation), meter, service point, customer, outage, work order, generation unit.
- **Typical FDE problems:** outage prediction and restoration, vegetation management, asset health and capital planning, load and DER forecasting, interconnection queue analysis, field crew scheduling.
- **Vocabulary:** transmission vs distribution, feeder, substation, SAIDI/SAIFI (reliability indices), DER, load forecasting, rate case, interconnection, CIM (IEC 61968/61970 data model).
- **Regulatory gotchas:** [NERC CIP](https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx) standards govern cyber security for the bulk electric system, which affects network access and change management. Utilities are designated [critical infrastructure](https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience/critical-infrastructure-sectors). Investor-owned utilities recover costs through regulators, so "will the commission allow this cost?" is a real buying question.

### Public Sector and Defense

- **Systems of record:** case management, grants and financial management ERPs, records management, logistics and maintenance systems, intelligence and mission systems on separate networks.
- **Key entities:** case, person, organization, location, event, asset, contract, budget line.
- **Typical FDE problems:** case backlog reduction, fraud and improper payments, logistics readiness, data integration across agencies, analytics on disconnected or classified networks.
- **Vocabulary:** ATO, ISSO/ISSM, authorizing official (AO), RMF, CUI, POA&M, contract vehicle, period of performance, fiscal year (US federal begins October 1), continuing resolution, OTA.
- **Regulatory gotchas:** nothing goes to production without an ATO, which can take months; plan for it from day one. FedRAMP, Impact Levels, ITAR, CJIS, and CMMC apply depending on the customer (section 5). Personnel requirements (citizenship, clearances) may limit who can work on the account. Funding is tied to appropriations, so timelines follow budget cycles. See [Air-Gap, Security & Networking](./AIRGAP_SECURITY_AND_NETWORKING.md) for disconnected deployments.

### Retail and Consumer Packaged Goods (CPG)

- **Systems of record:** POS, ERP, order management (OMS), WMS, merchandising and planning, e-commerce platform, PIM (product information), loyalty/CRM; CPG firms add trade promotion management and receive retailer sell-through data.
- **Key entities:** SKU/item, store, item-location, promotion, price, order, customer, distribution center, planogram.
- **Typical FDE problems:** demand forecasting and replenishment, out-of-stock detection, markdown and pricing optimization, trade promotion effectiveness, assortment planning, returns and shrink analysis.
- **Vocabulary:** sell-through, OOS, shrink, GMROI, open-to-buy, comp sales, case pack, DC, EDI 850 (purchase order) and 856 (advance ship notice), GTIN/UPC.
- **Regulatory gotchas:** PCI DSS for payment data; consumer privacy laws (GDPR, US state laws such as California's CCPA/CPRA) for loyalty and e-commerce data. Retailer data-sharing agreements often limit how CPG companies can use POS data. Change freezes around peak holiday trading are common, so plan deployments around them.

### Telecommunications

- **Systems of record:** BSS (billing, CRM, product catalog, order management), OSS (network inventory, provisioning, fault and performance management), network element management, call/usage detail records (CDR/xDR), field service management.
- **Key entities:** subscriber, account, SIM/IMSI, device, service/product, network element, cell site, circuit, trouble ticket.
- **Typical FDE problems:** churn prediction, network fault correlation and alarm reduction, field dispatch optimization, capacity planning, order-to-activate fallout, fraud.
- **Vocabulary:** ARPU, churn, NOC, MTTR, RAN, core, backhaul, OSS/BSS, 5G SA/NSA, SLA credits, TM Forum Open APIs.
- **Regulatory gotchas:** in the US, customer proprietary network information ([CPNI rules](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-U)) restricts use and disclosure of call and usage data. Lawful intercept systems are off-limits to vendors. Telecom networks are critical infrastructure, and some countries restrict foreign vendor access to network data.

---

## 7. Ramping on a New Domain in One Week

You will be assigned to industries you have never worked in. A structured week gets you to credible conversations.

| Day | Focus | Output |
| --- | --- | --- |
| **Mon** | Read the customer's annual report or public filings, investor presentations, and strategy statements. Note revenue drivers, cost pressures, and stated priorities. | One page: how this company makes money and what keeps its executives up at night |
| **Tue** | Learn the systems of record and core entities. Draw an entity diagram for the workflow in scope. | Entity diagram plus a glossary of 30 terms |
| **Wed** | Read the main regulation or standard at the summary level, plus one official source. Identify what it changes for data access, hosting, and audit. | A "constraints" list for the architecture |
| **Thu** | Shadow a user doing the actual work, or watch a recorded walkthrough. Count steps, systems, and handoffs. | Current-state workflow map with timings (your baseline) |
| **Fri** | Play it back to your champion: "Here is how I understand your process and where time goes. What did I get wrong?" | Corrected map, three candidate pilot use cases ranked by value and feasibility |

### Accelerators

- **Ask for the customer's internal glossary or training deck** for new hires. It exists more often than you expect.
- **Learn the five numbers the business reports on** (for example, loss ratio for an insurer, OEE for a plant, SAIDI for a utility). Tie your work to one of them.
- **Find the subject matter expert who has been there longest** and book 30 minutes a week with them.
- **Keep a running "dumb questions" list** and clear it with your champion every Friday. Early questions cost little; questions in month three cost credibility.

---

## 8. Exercises

| Level | Exercise | Proof artifact |
| --- | --- | --- |
| **Start** | Pick a public company in one of the domains above. From its annual report, write one page on how it makes money, its three biggest cost lines, and two problems an FDE could help with. | One-page brief |
| **Start** | For a fictional pilot of your choice, fill in the success criteria template from section 2 with measurable baselines and targets. | Completed template |
| **Core** | Build a value case for a fictional customer in a spreadsheet: baseline, hours saved, cost avoided, ROI, payback, and a conservative case at 50% realization. Label every assumption. | Spreadsheet plus a five-sentence executive summary |
| **Core** | Take a FHIR `Patient` and `Observation` example from the FHIR specification and map them to a flat analytics table. Note which fields are PHI. | Mapping table plus PHI annotations |
| **Core** | Write answers to 20 typical security questionnaire questions (data encryption, access control, logging, subprocessors, incident response) for a small app you built. | Questionnaire answers consistent with your actual architecture |
| **Deep** | Choose two regimes from section 5 (for example HIPAA and FedRAMP Moderate). Describe how the same application's hosting, access model, logging, and support model must differ for each. | Two-column comparison with a deployment diagram for each |
| **Deep** | Do the one-week domain ramp from section 7 on an industry you know nothing about, using only public sources, then run a mock playback with a peer acting as the champion. | Glossary, entity diagram, workflow map, and three ranked use cases |
