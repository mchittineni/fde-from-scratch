# Cloud Deployment and Operations Field Guide

How to get software running inside a customer's environment, keep it running, and recover cleanly when it breaks.

> Related guides: offline bundles, TLS-inspecting proxies and SAML/OIDC live in [Air-Gap, Security & Networking](./AIRGAP_SECURITY_AND_NETWORKING.md). Data pipelines (CDC, Spark) live in [Enterprise Data & Integration](./ENTERPRISE_DATA_AND_INTEGRATION.md). This guide covers everything between "the code works on my laptop" and "the customer depends on it at 3 a.m."

---

## 1. Deployment Models

Before you write a line of infrastructure code, find out which model the deal assumes. It changes who holds the keys, who gets paged, and how fast you can ship a fix.

| Model | Who runs the infra | Data location | Your access | Upgrade speed | Typical customer |
| --- | --- | --- | --- | --- | --- |
| **Multi-tenant SaaS** | Vendor | Vendor cloud, shared infra, logically isolated | Full | Continuous | Mid-market, low-sensitivity workloads |
| **Single-tenant SaaS** | Vendor | Vendor cloud, dedicated stack per customer | Full | Fast, per-tenant rollout | Enterprises wanting isolation without running it |
| **BYOC / customer VPC** | Shared: vendor control plane, customer data plane | Customer cloud account | Scoped IAM role, often time-boxed | Medium; needs customer change windows | Regulated enterprises with a cloud mandate |
| **On-prem / air-gapped** | Customer | Customer data center or enclave | Screen share, escorted, or none | Slow; release media, approvals | Defense, critical infrastructure, some banks and hospitals |

### What each model means for you in the field

- **Multi-tenant:** Your work is configuration, integration, and tenant-level settings. Isolation bugs are the nightmare scenario, so never test with real customer data in a shared environment.
- **Single-tenant:** You will be asked for a dedicated region, customer-managed encryption keys (CMK/BYOK), and a private connection. Template everything; snowflake tenants become unpatchable.
- **BYOC:** The customer owns the account, the bill, and the blast radius. Expect a cross-account IAM role with a written list of permissions, a security review of that list, and a request to remove anything with `*` in it.
- **On-prem / air-gapped:** Every artifact, dependency, and doc must ship with the release. See [Air-Gap, Security & Networking](./AIRGAP_SECURITY_AND_NETWORKING.md) for packaging.

**Field question to ask in week one:** "When something breaks at 2 a.m., whose pager goes off, and what can that person touch?" The answer tells you your real deployment model better than the contract does.

---

## 2. Kubernetes Essentials for the First Hour

Most customer platforms you land in will be Kubernetes, whether that is EKS, AKS, GKE, OpenShift, Rancher, or a k3s box in a closet. You do not need to be a cluster admin. You do need to diagnose your own workload without asking for help.

### The mental model in four lines

- A **Deployment** declares "run N copies of this container spec"; it manages **ReplicaSets**, which manage **Pods**.
- A **Service** gives Pods a stable name and IP; an **Ingress** or **Gateway** exposes it outside the cluster.
- **ConfigMaps** hold configuration; **Secrets** hold credentials (base64-encoded, not encrypted by default; check whether the customer enables encryption at rest or uses an external secret store).
- A **Namespace** is your sandbox. RBAC usually limits you to one or two of them.

### kubectl cheat sheet

```bash
# Where am I, and what can I do?
kubectl config current-context
kubectl auth can-i --list -n acme-app
# What is running and is it healthy?
kubectl get pods -n acme-app -o wide
kubectl get deploy,svc,ingress -n acme-app
kubectl describe pod api-7d9f8c-xk2lp -n acme-app      # read the Events section at the bottom
# Recent cluster events, oldest first
kubectl get events -n acme-app --sort-by=.metadata.creationTimestamp
# Logs: current, previous crashed container, a specific container, follow
kubectl logs deploy/api -n acme-app --since=15m
kubectl logs api-7d9f8c-xk2lp -n acme-app --previous
kubectl logs api-7d9f8c-xk2lp -n acme-app -c migrator -f
# Get inside (if the image has a shell and policy allows it)
kubectl exec -it deploy/api -n acme-app -- sh
# Reach a service from your laptop without exposing it
kubectl port-forward svc/api 8080:80 -n acme-app
# Rollouts
kubectl rollout status deploy/api -n acme-app
kubectl rollout history deploy/api -n acme-app
kubectl rollout undo deploy/api -n acme-app            # back to previous revision
kubectl rollout restart deploy/api -n acme-app         # re-create pods, e.g. after a Secret change
# Resource usage (requires metrics-server)
kubectl top pods -n acme-app
```

### Reading pod status

| Status | Usual cause | First check |
| --- | --- | --- |
| `Pending` | No node fits the resource requests, or a PVC cannot bind | `describe pod` events; node capacity; storage class |
| `ImagePullBackOff` | Wrong tag, private registry without pull secret, egress blocked | Image name; `imagePullSecrets`; registry mirror |
| `CrashLoopBackOff` | App exits on start: bad config, missing env var, failed DB connection | `logs --previous` |
| `OOMKilled` (exit code 137) | Container exceeded its memory limit | Memory limit vs actual usage; JVM/Python heap settings |
| `CreateContainerConfigError` | Referenced ConfigMap or Secret key does not exist | `describe pod`; spelling of the key |
| Running but not `Ready` | Readiness probe failing | Probe path and port; dependency health |

Official references: [kubectl quick reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/) and [Debugging applications](https://kubernetes.io/docs/tasks/debug/debug-application/).

---

## 3. Helm and Per-Customer Configuration

Helm packages your Kubernetes manifests as a chart with a `values.yaml` of knobs. The rule in the field: **one chart, many values files, zero forks.**

Layout: `deploy/chart/` is the product chart, versioned with the app; `deploy/customers/<name>/values.yaml` holds each customer's non-secret config (replicas, hostnames, feature flags), with overrides such as `values-prod.yaml` per environment.

```bash
# Render locally first: catches template errors with no cluster access needed
helm template api ./deploy/chart -f deploy/customers/acme-bank/values.yaml > /tmp/rendered.yaml
# Install or upgrade, waiting for pods to become ready
helm upgrade --install api ./deploy/chart \
  -n acme-app -f deploy/customers/acme-bank/values.yaml \
  -f deploy/customers/acme-bank/values-prod.yaml --wait --timeout 10m
helm history api -n acme-app
helm rollback api 4 -n acme-app
```

### Configuration rules that save you later

- **Secrets never go in values files in Git.** Reference them from the customer's secret store (Vault, AWS Secrets Manager, Azure Key Vault, External Secrets Operator) or create them out-of-band.
- **Every customer-specific value has a default in the chart.** If a new customer needs only three overrides, the chart is healthy. If they need forty, the product is leaking into config.
- **Feature flags beat branches.** A customer-only behavior goes behind a flag in the main codebase, not on a `customer-acme` branch that drifts for a year.
- **Pin image tags by version or digest**, never `latest`.

See the [Helm docs](https://helm.sh/docs/) and [values best practices](https://helm.sh/docs/chart_best_practices/values/); the [Twelve-Factor config principle](https://12factor.net/config) is the short argument for keeping config out of code.

---

## 4. Infrastructure as Code with Terraform

Clicking through a cloud console in a customer account is how you end up with an environment nobody can reproduce or audit. Terraform describes infrastructure in code, computes a diff against reality, and applies it.

### Core concepts

| Concept | What it is | Field implication |
| --- | --- | --- |
| **Provider** | Plugin that talks to an API (AWS, Azure, GCP, Kubernetes) | In air-gapped sites you must mirror providers locally |
| **State** | Terraform's record of what it manages | Contains resource IDs and often secrets; store remotely, encrypted, with locking |
| **Module** | Reusable bundle of resources with inputs and outputs | Write one module per deployable unit; call it per customer |
| **Plan** | Proposed changes, computed before anything happens | The artifact a customer change board reviews |

### Example: a per-customer root module

```hcl
terraform {
  required_version = ">= 1.10"
  backend "s3" {
    bucket       = "acme-bank-fde-tfstate"
    key          = "prod/platform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true   # S3-native state locking (Terraform 1.10+)
  }
}

module "platform" {
  source          = "../../modules/platform"   # or a pinned Git/registry ref
  customer        = "acme-bank"
  environment     = "prod"
  vpc_id          = var.vpc_id            # customer-owned VPC; we do not create it
  private_subnets = var.private_subnet_ids
  kms_key_arn     = var.customer_kms_key  # customer-managed key
  tags            = { owner = "fde", cost_center = "pilot-1234" }
}
```

### Plan/apply discipline in a customer account

1. **Never apply what you have not planned.** Run `terraform plan -out=tfplan`, review it, then `terraform apply tfplan` so exactly the reviewed plan runs.
2. **Read every `destroy` and `replace` line aloud.** A renamed resource can show up as destroy-and-recreate, and that includes databases.
3. **Attach the plan to the change ticket.** Customer change advisory boards want to see it.
4. **Use the narrowest role that works**, and request time-boxed elevation for the apply.
5. **Do not hand-edit what Terraform owns.** If someone changes a security group in the console, the next plan will try to revert it. Find out why they changed it before you apply.
6. **Import, don't recreate.** For resources the customer already owns, use `import` blocks or reference them as data sources.

References: [State](https://developer.hashicorp.com/terraform/language/state), [Modules](https://developer.hashicorp.com/terraform/language/modules), [`terraform plan`](https://developer.hashicorp.com/terraform/cli/commands/plan), and the [official tutorials](https://developer.hashicorp.com/terraform/tutorials).

---

## 5. Cloud Networking You Will Actually Hit

Most "the app is down" tickets in week one are networking problems. TLS inspection and proxy chains are covered in the [air-gap guide](./AIRGAP_SECURITY_AND_NETWORKING.md); this section covers the cloud primitives.

| Primitive | What it does | Classic failure |
| --- | --- | --- |
| **VPC / VNet** | Private network inside a cloud account, defined by a CIDR range | Your default `10.0.0.0/16` overlaps the customer's on-prem range, so peering and VPN routing break |
| **Subnets** | Slices of the VPC; "private" means no direct route to the internet | You deployed the load balancer into private subnets and nothing outside can reach it, or the reverse |
| **Security groups / NSGs** | Stateful allow-lists on network interfaces | Port open on the app, but the database SG only allows the old CIDR |
| **NACLs** | Stateless subnet-level rules | Return traffic on ephemeral ports blocked |
| **NAT gateway** | Lets private resources reach out without being reachable | Missing, so image pulls fail; or present, and it is a surprise line on the bill |
| **Private endpoints (AWS PrivateLink, Azure Private Link, GCP Private Service Connect)** | Expose a service into another VPC over a private IP, without peering | DNS still resolves to the public address, so traffic never takes the private path |
| **VPC peering / transit gateway** | Route between VPCs | Peering is not transitive: A to B and B to C does not give A to C |
| **DNS (private zones, conditional forwarders)** | Name resolution inside the network | Pods use cluster DNS, which cannot see the corporate on-prem zone |

### A five-step network triage

```bash
# 1. Does the name resolve, and to what?
nslookup db.internal.acme.example
# 2. Is the port reachable?
nc -vz db.internal.acme.example 5432
# 3. Does TLS complete, and with which certificate?
openssl s_client -connect api.internal.acme.example:443 -servername api.internal.acme.example </dev/null
# 4. What does the app see? Run the same checks from inside the pod
kubectl exec -it deploy/api -n acme-app -- sh
# 5. Then read the security groups, route tables, and endpoint policies, in that order
```

Vendor docs: [AWS VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html), [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html), [Azure Private Link](https://learn.microsoft.com/en-us/azure/private-link/private-link-overview), [GCP Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect).

---

## 6. CI/CD for Customer Deployments

Your company's internal CI/CD probably ships to its own SaaS. Customer deployments need one more idea: **the same immutable artifact is promoted through environments, and only configuration changes.**

```text
build once ──> dev (yours) ──> customer staging ──> customer prod
   │                 │                │                   │
image@sha256:...  automated tests  UAT + sign-off    change ticket + window
```

### Practices that hold up in regulated customers

- **Release artifacts are versioned bundles:** image digests, chart version, Terraform module version, migration scripts, and release notes, all with one version number.
- **Promotion is a pointer change,** not a rebuild. If staging tested `sha256:ab12...`, production runs `sha256:ab12...`.
- **Gates are explicit:** automated tests, a customer UAT sign-off, and a change ticket for production. Record who approved what.
- **GitOps (Argo CD, Flux) works well** when the customer allows an in-cluster agent to pull from a repo; it gives you an audit trail of every change.
- **Supply chain evidence is increasingly requested.** Sign images ([Sigstore](https://docs.sigstore.dev/) cosign), ship an SBOM in SPDX or CycloneDX format ([CISA SBOM resources](https://www.cisa.gov/sbom)), and know what build provenance means ([SLSA](https://slsa.dev/)). Command examples are in the [air-gap guide](./AIRGAP_SECURITY_AND_NETWORKING.md).

[DORA](https://dora.dev/) research gives you vocabulary for delivery performance (deployment frequency, lead time for changes, change fail rate, recovery time) that resonates with customer platform teams.

---

## 7. Observability

If you cannot see it, you cannot support it, and you cannot prove the pilot worked.

| Signal | Answers | Example |
| --- | --- | --- |
| **Logs** | What happened, in detail | `{"level":"error","route":"/score","tenant":"acme","err":"timeout"}` |
| **Metrics** | How much, how often, how fast, over time | `http_request_duration_seconds` histogram |
| **Traces** | Where the time went across services | API span, then DB span (900 ms), then model call span |

### OpenTelemetry

[OpenTelemetry](https://opentelemetry.io/docs/) (OTel) is the vendor-neutral standard for producing all three signals. Instrument once with OTel SDKs, send OTLP to an **OTel Collector** (default ports 4317 for gRPC, 4318 for HTTP), and let the collector export to whatever the customer already runs (Splunk, Datadog, Elastic, Prometheus/Grafana, Azure Monitor, CloudWatch). This matters in the field: **you rarely get to choose the customer's observability stack**, but a collector lets you fit into it. See [signals](https://opentelemetry.io/docs/concepts/signals/).

**The four golden signals,** from the [Google SRE book](https://sre.google/sre-book/monitoring-distributed-systems/): **latency, traffic, errors, saturation.** If you only build one dashboard, build these four per service.

### Day-one dashboards to ship with every deployment

1. **Service health:** the four golden signals for each user-facing endpoint, with p50/p95/p99 latency.
2. **Dependencies:** error rate and latency for every external call (database, SSO, customer APIs, model endpoints).
3. **Data freshness:** time since the last successful ingestion per source, plus row counts versus the expected range.
4. **Platform:** pod restarts, CPU and memory versus limits, disk usage on volumes, certificate expiry dates.
5. **Business outcome:** the one number the pilot is measured on (for example, cases triaged per day). Executives look at this one.

Alert on symptoms users feel (error rate, latency, stale data), not on every CPU spike. Each alert needs an owner and a runbook link.

---

## 8. Upgrades, Migrations, and Rollbacks

At a customer, an upgrade is a negotiated event, not a merge.

### Upgrade checklist

- [ ] Release notes in customer language: what changes, what they must do, expected downtime.
- [ ] Change ticket approved, window booked, customer contact on the call.
- [ ] Backup or snapshot taken **and restore tested** within the past month.
- [ ] Rendered diff reviewed (`helm template` output, Terraform plan).
- [ ] Database migrations reviewed for lock-heavy operations on large tables.
- [ ] Rollback steps written down and timed in staging.
- [ ] Smoke test list ready, run by you and by a customer user.

### Make database changes reversible: expand, migrate, contract

**Expand** (add the new column or table; old code ignores it), then **migrate** (deploy code that writes to both and reads the new one; backfill in batches), then **contract** (after a stable period, drop the old column in a later release). Each step is independently deployable and reversible. A single "rename column" migration is not.

### Rollback rules

- **Decide the rollback trigger before you start** ("error rate above 2% for 10 minutes, or any data integrity check failing").
- **Application rollbacks are cheap** (`helm rollback`, `kubectl rollout undo`). **Data rollbacks are expensive.** This is why expand/contract exists.
- **Roll back first, debug second.** Restoring service beats proving a theory on a live system.

---

## 9. Incident Response in the Field

When your software breaks at a customer, technical skill matters less than calm, structured communication.

### Severity levels (adapt to the customer's scheme; many already have one)

| Sev | Definition | Update cadence | Who is told |
| --- | --- | --- | --- |
| **SEV1** | Production down or data at risk for many users | Every 30 min | Customer sponsor, your manager, on-call engineering |
| **SEV2** | Major feature degraded, workaround exists | Every 1–2 hours | Customer technical lead, your manager |
| **SEV3** | Minor impact, single user or non-critical path | Daily | Ticket queue |

**Roles** (one person may hold several): the **incident commander** coordinates and decides but does not debug; the **operations lead** has hands on keyboard; the **communications lead** writes updates on the agreed cadence. This structure comes from [Managing Incidents](https://sre.google/sre-book/managing-incidents/) in the SRE book.

### Mini runbook template

```markdown
## Runbook: <alert name>
**Symptom:** what the alert or user report looks like
**Impact:** who is affected and how
**Dashboards:** links
**Diagnose:**
1. Check <dependency> health: <command or link>
2. Check recent deploys: `helm history api -n acme-app`
**Mitigate:**
- If caused by the latest deploy: `helm rollback api <prev> -n acme-app`
- If dependency down: enable degraded mode flag `<flag>`
**Escalate to:** <team / on-call alias> after <N> minutes
**Customer comms template:** link
```

### Status update template

```text
[SEV2] Scoring API degraded. Update 3, 14:30 UTC
Impact: ~20% of scoring requests failing for Acme Bank users since 13:55.
Current status: Rolled back release 2.4.1 at 14:20; error rate falling.
Next steps: Confirm recovery, then root-cause the connection pool change.
Next update: 15:00 UTC or sooner if status changes.
```

### Blameless postmortem template

```markdown
# Postmortem: <title> (<date>)
**Status:** Draft / Reviewed / Closed
**Impact:** users affected, duration, data impact, SLA impact
**Timeline (UTC):** detection, escalation, mitigation, resolution
**Root cause and contributing factors:** systems and process, not people
**What went well / what went poorly / where we got lucky**
**Action items:** | Action | Type (prevent/detect/mitigate) | Owner | Due |
```

Blameless means you describe what the system allowed to happen, not who to punish. See [Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) and the [workbook chapter](https://sre.google/workbook/postmortem-culture/). For how to deliver bad news to the client, see [Client Diplomacy & Field Survival](./CLIENT_DIPLOMACY_AND_SURVIVAL.md).

---

## 10. Cost Awareness for a Pilot

Pilots die when the customer's cloud bill surprises their finance team. You do not need to be a FinOps practitioner, but you should know the [basics](https://www.finops.org/introduction/what-is-finops/); the [FinOps Framework](https://www.finops.org/framework/) has the full model.

### What usually drives a pilot's bill

| Driver | Why it surprises people | Control |
| --- | --- | --- |
| Idle compute | Dev and staging run 24/7 | Scale to zero or schedule shutdown out of hours |
| GPUs | Expensive per hour and often over-provisioned | Right-size; share; shut down between evaluation runs |
| NAT and data egress | Charged per GB, easy to miss | Use private endpoints for cloud services; keep data in-region |
| Managed databases | Sized for production during a pilot | Start small; scale on evidence |
| Logs | Verbose debug logging shipped to a paid backend | Sample; set retention; drop health-check noise |
| Orphaned resources | Snapshots, volumes, and load balancers left behind | Tag everything; review weekly |

### Pilot cost hygiene

- **Tag every resource** with `customer`, `environment`, `owner`, and `cost_center` from day one.
- **Set a budget alert** in the customer account at 50%, 80%, and 100% of the agreed pilot spend.
- **Report cost in the weekly update** next to the value metric. "Cost per document processed" is a sentence a CFO understands.
- **Write a teardown plan** before the pilot starts, so ending it cleanly is easy if the customer says no.

---

## 11. Exercises

| Level | Exercise | Proof artifact |
| --- | --- | --- |
| **Start** | Run a local cluster (kind, k3d, or minikube). Deploy an app with a deliberately wrong image tag, then a missing Secret key. Diagnose each using only `get`, `describe`, `logs`, and `events`. | Notes with the exact commands and what each one told you |
| **Start** | Write a Helm chart for a small API with two customer values files that differ only in hostname, replica count, and one feature flag. | Chart plus `helm template` output for both customers |
| **Core** | Write a Terraform module that creates a private subnet, security group, and storage bucket, and call it from two root modules (two "customers") with remote state. Practice `plan -out` then `apply`. | Repo plus a saved plan you reviewed line by line |
| **Core** | Instrument a small service with OpenTelemetry, send traces and metrics through a Collector, and build a four-golden-signals dashboard. | Dashboard screenshot plus collector config |
| **Core** | Perform an expand/migrate/contract column rename on a Postgres table with a running app, with no downtime. | Three migrations and a write-up of rollback at each step |
| **Deep** | Run a game day: break DNS, fill a volume, and expire a certificate in your lab. Respond with severities, timed status updates, and a rollback. | Incident timeline plus a blameless postmortem |
| **Deep** | Design a BYOC deployment for a fictional bank: cross-account IAM policy (least privilege), private connectivity, customer-managed keys, upgrade process, and a pilot cost estimate. | Two-page design doc a customer security team could review |
