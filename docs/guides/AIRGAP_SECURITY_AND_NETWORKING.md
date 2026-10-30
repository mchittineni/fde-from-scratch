# Air-Gap, Enterprise Security, and Networking Field Guide

A practical guide to deploying software into restricted networks, passing CISO reviews, and surviving zero-internet customer environments.

---

## 1. The Enterprise Network Boundary

Enterprise customers (particularly in finance, healthcare, defense, and critical infrastructure) operate under strict network isolation:

- **Egress-Filtering Firewalls:** Outbound traffic on ports 80 and 443 is blocked by default.
- **TLS-Inspecting Proxies:** Outbound HTTPS calls are intercepted by corporate appliances (e.g. Zscaler, BlueCoat) that terminate TLS, inspect payloads, and re-encrypt using a corporate internal Certificate Authority (CA).
- **Bastion Hosts / Jump Boxes:** No direct SSH or VPN access into worker nodes; access requires authenticating through a hardened jump host with session recording and multi-factor authentication.
- **Air-Gapped Enclaves:** True disconnected environments with physical hardware isolation and zero outbound network routes.

---

## 2. Surviving TLS Inspection and Private CAs

The most common failure on Day One of an enterprise deployment is:

```text
certificate verify failed: self-signed certificate in certificate chain
```

### Why it Happens

Managed enterprise laptops automatically receive corporate root certificates via Microsoft Active Directory or MDM profiles. Your fresh Docker container, Python virtualenv, or Kubernetes pod uses standard public Mozilla CA bundles and does not know about the customer's private inspection CA.

### The Fix (Never Disable Verification)

Never set `verify=False` or `NODE_TLS_REJECT_UNAUTHORIZED=0` on client infrastructure. It destroys client trust and violates compliance contracts.

1. Obtain the customer's corporate root CA certificate file (`corp-root-ca.crt`).
2. Mount or inject the certificate into your runtime environment:

```bash
# Debian / Ubuntu base containers
cp corp-root-ca.crt /usr/local/share/ca-certificates/corp-root-ca.crt
update-ca-certificates

# RHEL / CentOS / UBI containers
cp corp-root-ca.crt /etc/pki/ca-trust/source/anchors/
update-ca-trust

# Python requests / httpx runtime
export REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
export SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
```

---

## 3. Air-Gapped Software Delivery

In true air-gapped environments, you cannot run `npm install`, `pip install`, `docker pull`, or `helm install`. Everything must arrive on verified offline media.

### Step-by-Step Offline Packaging

- **1. Container Images:** Export all required container images into signed OCI tarballs:

```bash
# Save images into an archive
docker save -o deployment-bundle-v1.0.tar \
  mycompany/fde-app:v1.0 \
  postgres:16-alpine \
  redis:7-alpine

# In the air-gapped enclave: load into local registry
docker load -i deployment-bundle-v1.0.tar
```

- **2. Cryptographic Signing (Cosign):** Sign images and generate signatures and Software Bills of Materials (SBOMs) before transferring media:

```bash
cosign sign --key cosign.key mycompany/fde-app:v1.0
syft mycompany/fde-app:v1.0 -o spdx-json > fde-app-sbom.json
```

- **3. Python Wheelhouse / NPM Cache:** Pre-bundle all language dependencies:

```bash
# Generate offline wheels
pip wheel -r requirements.txt -w ./wheelhouse

# Offline installation inside enclave
pip install --no-index --find-links=./wheelhouse -r requirements.txt
```

- **4. Offline Kubernetes (k3s):** For single-node or edge clusters, utilize k3s air-gap binary packages: place `k3s` binary, `k3s-airgap-images-amd64.tar.zst`, and installation script into a directory and execute with `--airgap-extra-args`.

---

## 4. Enterprise Identity: SAML 2.0 vs OIDC

| Feature | SAML 2.0 | OpenID Connect (OIDC) |
| --- | --- | --- |
| **Data Format** | XML with XML-DSig | JSON (JWT / JWS) |
| **Typical Customer** | Government, defense, legacy Fortune 500 | Modern cloud enterprises, startups |
| **Common Providers** | PingFederate, AD FS, Shibboleth | Okta, Azure AD (Entra ID), Auth0 |
| **FDE Recommendation** | Use battle-tested SAML libraries; watch XML entity expansion vulnerabilities | Use Authorization Code Flow with PKCE; validate `iss`, `aud`, and `exp` claims |

### Implementing Row-Level Security (RLS) via IdP Claims

Do not rely on the client frontend to filter sensitive geographic or departmental rows. Enforce security in the database tier:

```sql
-- Enable RLS on operational data
ALTER TABLE patient_records ENABLE ROW LEVEL SECURITY;

-- Create policy that inspects user claims injected by API backend
CREATE POLICY regional_isolation_policy ON patient_records
FOR ALL
USING (assigned_facility_id = current_setting('app.current_user_facility_id', true)::uuid);
```

---

## 5. Security & Compliance Quick Reference

- **SOC 2 Type II:** Requires evidence of least-privilege access, immutable audit logging of data mutations, and formal change-management procedures.
- **HIPAA (Health Insurance Portability and Accountability Act):** Requires a signed Business Associate Agreement (BAA) with all cloud and AI vendors; strict encryption in transit (TLS 1.3) and at rest (AES-256); automated de-identification of 18 Safe Harbor identifiers.
- **FedRAMP:** Mandatory security standard for US government agency deployments; dictates strict continuous monitoring, vulnerability scanning with zero critical/high CVEs, and US-sovereign infrastructure hosting.
