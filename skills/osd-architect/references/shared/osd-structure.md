# OSD Shared Skeleton (standardized format)

This is the **common structure every Opportunity Scoping Document (OSD) inherits**, regardless of
product. It follows chapter 8.2 of *The PreSales Handbook* ("Structuring the OSD") — Document History,
Executive Summary, Company Profile, Goals / Challenges / Major Pain Points, Desired Outcomes & Vision,
Supply Chain (Business Flow) Map, IT Overview & Architecture, Project Prioritisation & Business Releases,
Assumptions & Gaps, Modules & Detailed Scoping, and Meeting Notes — plus one additional element the
handbook invites ("additional elements can be developed if business needs require it"): the
Transition to Delivery. The generator assembles this skeleton, then fills Section 9 with the
**product-specific** module map and scoping questions from the SC's product scope.

Confidence-tag every asserted value per the confidence-tagger standard:
🟢 Confirmed (sourced) · 🟡 Inferred (reasoned) · 🔴 Unknown (gap to confirm).

Use the **Navigation Guide** codes throughout the scope tables: **ROM** = required for Rough
Order of Magnitude · **SOW** = required for Statement of Work / Service Discovery · **CF** =
Complexity Factor (more implementation effort).

Sections marked *(shareable)* can be shared with the prospect (handbook 8.3: validating the OSD with the
prospect, even without sharing it in full, fosters collaboration; 8.4: invite the prospect to review it). Everything else is internal.

---

## Document header

```
# Opportunity Scoping Document (OSD) — [Product scope]
Template Version: [x.x] (Updated: [date])
Client:                           [client name]
PreSales / Solution Consultant:   [SC]
Account Executive (AE):           [AE]
Professional Services (PS):       [PS]
```

**Supporting Documents & Links (optional):**
- Mutual Action Plan: [link]
- Deal folder: [link]
- CRM opportunity: [link]
- RFX folder: [link]
- Technical & Functional Qualification (TFQ): [link]

---

## Document History

| Version | Date | Name | Description |
|---------|------|------|-------------|
| | | | |

---

## Section 1 — Executive Summary

> *A snapshot of the company, its principal challenges, and how your offering addresses them. Sets the
> tone for every reader. AE and SC co-own; SC refines.*

### Customer and Opportunity Information *(internal)*

| Field | Value |
|-------|-------|
| Account Name | |
| Industry | |
| Size (Revenue / Employees) | |
| New Logo / Existing Customer | |
| Competition | |
| ARR / Services Budget | |
| Compelling Event | |
| SIs / Partners | |
| Project Start / Go-Live Date | |
| RFX | Yes / No |

### Summary

- **High-level scope description:**
- **Summary of prospect challenges / objectives:**
- **Summary of value proposition:**

### Opportunity Scope Analysis *(internal)*

| Field | Value |
|-------|-------|
| Ideal Customer Profile Strategic Fit | Excellent / Good / Poor / No fit |
| Product Gaps | None / Minor / Moderate / Major |
| Deal Review (Opportunity Review Call) | Yes + Date / No / Not Needed |
| Deal Review Summary and Actions | |
| TFQ Verdict | Invest / Conditional / Pause / Not run |
| Multi-Product | Yes / No |

---

## Section 2 — Company Profile

> *More than facts and figures: size, industry, current solutions, key stakeholders, organisational
> structure, and market standing. This is where the client map lives.*

### 2.1 Firmographics

| Field | Value |
|-------|-------|
| Company overview (2–3 sentences) | |
| Headquarters | |
| Regions / countries of operation | |
| Business units / legal entities in scope | |
| Industry-specific regulations | |
| Current solutions in place (for this scope) | |

### 2.2 Client Map (stakeholders)

| Name | Title | Role in deal (EB / Champion / Technical / User / Procurement) | Sentiment | Notes |
|------|-------|-----------------------------------------------------------------|-----------|-------|
| | | | | |

---

## Section 3 — Goals, Challenges & Major Pain Points

> *The heart of the matter: the issues the prospect grapples with, their implications, and the likely
> root causes.*

| Reported by | Gathered by | Critical Business Challenges | Problems / Reasons | Specific Capabilities | Delta | Key Date / VRE |
|-------------|-------------|------------------------------|--------------------|-----------------------|-------|----------------|
| Customer / Title / Name | AE / SC / PS | | | | | |

**Field guidance:**
- **Value Category** — the value driver the challenge maps to (see Section 4.2).
- **Critical Business Challenges** — the individual's top-level challenge, often a quarterly/annual/project goal at risk. May include strategic objectives beyond the immediate scope: *cloud-first, integrate with third parties, shrink the IT estate, migrate the ERP, get ready for M&A / carve-out / going public.*
- **Problems / Reasons** — what makes it a problem today, why it's hard, how they do it now.
- **Specific Capabilities** — capabilities the prospect needs, from the prospect's perspective.
- **Delta** — using the prospect's numbers, the value of making the change.
- **Key Date / Value Realization Event (VRE)** — when they need a solution in place and why; the first success indicator.

---

## Section 4 — Desired Outcomes & Vision *(shareable)*

> *Pivot from challenges to aspirations: the prospect's objectives, what success looks like to them,
> and the future your solution makes possible.*

### 4.1 Success Criteria

| # | Outcome the prospect wants | How they will measure it | Target | Confidence |
|---|----------------------------|--------------------------|--------|------------|
| 1 | | | | |

### 4.2 Value Proposition *(value detail internal)*

**Value work completed**

| Service | Done | Link |
|---------|------|------|
| Pain-to-value map (`/presales:value:pain-to-value`) | Yes / No | |
| Value / ROI case (`/presales:value:roi-case`) | Yes / No | |

**Value drivers (select those in play)** — Increase Revenue · Reduce Operating Cost · Increase
Productivity · Reduce Risk / Improve Compliance · Improve Customer Experience · Reduce IT / Legacy Cost ·
Accelerate Time-to-Market. Add the specific value levers for your product (e.g. hours saved per
process, error rate, working capital) and quantify each with the prospect's own numbers.

### 4.3 To-Be Business Process Flows & Data Choreography

> The To-Be is a representation of the end-to-end use-case requirements. Attach screenshots,
> interactive demos, or demo recordings of what was shown. Options: avoid copying customer-provided
> future-state flows · copy from the example library and adjust · write from scratch.

---

## Section 5 — Supply Chain / Business Flow Map & As-Is Processes *(shareable)*

> *A graphical or textual representation of how products, services, or information flow through the
> prospect's organisation — so bottlenecks, inefficiencies, and crucial nodes become visible.* For a
> non-physical business, draw the value chain or the order-to-cash / request-to-resolution flow.

### 5.1 Supply Chain / Business Flow Map
Options: use customer-provided charts · copy from the example library (`examples-library.md`) and
adjust · write from scratch.

### 5.2 As-Is Business Process Flows & Data Choreography
Capture the in-scope business process and current flows. Include multiple process flows / data
choreographies if there are several unique end-to-end use cases.

---

## Section 6 — IT Overview & Architecture *(shareable)*

> *The current technical landscape: which systems, how they talk to each other, and which legacy
> systems need special consideration — then the future architecture.*

### 6.1 As-Is IT Overview
Include:
- Existing backends (ERP, CRM, core operational systems)
- Existing middleware / integration platforms (e.g. MuleSoft, Boomi, SAP BTP, Azure Integration Services)
- Existing integration technologies (even if not directly related)
- External connections to suppliers, partners, customers
- Competing products; indirectly related products
- Use of third-party networks or data providers
- Planned migrations / major projects competing for the same IT resources
- **Explicitly ask about major platform migrations** (e.g. an ERP or CRM replatforming)

### 6.2 To-Be IT Architecture
Include backend systems for integration, middleware, key message flows and directions, and — for
multi-product deals — how your own products integrate with each other.

### 6.3 IT Integration and Hosting

| Category | Requirement | Description | Needed | Response |
|----------|-------------|-------------|--------|----------|
| Customer Systems | External system names (ERP, CRM, etc.) | Names, instances, and info in each | ROM | |
| Customer Systems | Number of external systems (instances) | | ROM | |
| Customer Systems | Integration Type | API, XML/EDI, SFTP, file upload, or manual | SOW | |
| Customer Systems | Response Time | Immediate / near-real-time impacts performance tuning | SOW / CF | |
| Integration & Hosting | Integration between multiple products of ours? | Which products integrate | SOW | |
| Integration & Hosting | Single or multi-tenant / multi-org structure? | Multiple BUs tend to require multi-org | SOW / CF | |
| Integration & Hosting | Standard or High Availability? | Standard assumed unless noted | SOW | |
| Integration & Hosting | Data residency / hosting region | Region, sovereignty constraints | SOW | |
| Security | SSO / identity provider, certifications required | e.g. SAML, SOC 2, ISO 27001 | SOW | |

---

## Section 7 — Project Prioritisation & Business Releases *(shareable)*

> *The sequence in which the prospect wants to roll out solutions or address challenges — a timeline
> view that aids resource allocation.*

| Phase | Business Release | Product / Module | Capability / Scope (Region, Partners, Flows) | Timing | Compelling Event | Business Impact (H/M/L) | Expected Benefits |
|-------|------------------|------------------|----------------------------------------------|--------|------------------|-------------------------|-------------------|
| Phase 1 | | | | | | | |
| Phase 2 | | | | | | | |
| Phase 3 | | | | | | | |

> **Do not add dates** unless there are confirmed customer due dates. Dates must be discussed and confirmed by PS.

---

## Section 8 — Assumptions & Gaps *(assumptions shareable)*

> *A protective measure: everyone — you, the client, and internal teams such as Professional Services —
> understands the same thing.*

### Assumptions
*(List assumptions here — each 🔴 until confirmed.)*

### Known Solution Gaps

| Ticket ID (product backlog) | Gap | Target Business Release | PS Config Feasibility | Product Roadmap Target Release | Comments |
|-----------------------------|-----|-------------------------|-----------------------|--------------------------------|----------|
| | | | | | |

**Objectives:** Is this a comprehensive gap list? Do all gaps have target product releases
(especially those that cannot be addressed via PS configuration)? The gap list is started by the SC
and completed by PS after the implementation planning workshop.

---

## Section 9 — Modules & Detailed Scoping

> *A deep dive into the specific modules of your solution that address the prospect's needs — aligning
> features with challenges. Built from the SC's product scope; there is no built-in product catalogue.*

### 9.1 Module Map

List your product's modules / components relevant to this deal (from the SC, a product datasheet, or a
team scoping template in the deal folder). Mark each:

| Module | Status (In scope / Already in place / Out of scope / Unclear) | Lifecycle (optional: C / E / P / I) | Rationale |
|--------|---------------------------------------------------------------|--------------------------------------|-----------|
| | | | |

**Legend (optional lifecycle):** C = Core · E = Establish · P = Protect · I = Incubate. In the Word
document, use **bold black** for modules **in scope** and **bold red** for modules **already in place**.

### 9.2 Detailed Scoping Questionnaire

If your team keeps a product-specific scoping questionnaire, inject it here. Otherwise use this
generic checklist, one block per in-scope module:

| Group | Requirement | Description | Needed | Response |
|-------|-------------|-------------|--------|----------|
| Process | In-scope business processes / use cases | End-to-end flows the module must support | ROM | |
| Volumes | Transactions / records per year | Drives sizing and licensing | ROM | |
| Users | Named / concurrent users by role | Drives licence model and training | ROM | |
| Organisation | Entities, business units, regions in scope | Multi-org and localisation needs | ROM / CF | |
| Configuration | Rules, workflows, approvals, exceptions | Standard vs. configured behaviour | SOW | |
| Data | Master data sources, quality, migration volume | Migration effort and cleansing | SOW / CF | |
| Reporting | Required reports, dashboards, KPIs | Standard vs. custom reporting | SOW | |
| External parties | Partners, suppliers, customers needing access | Portals, onboarding, connectivity | SOW / CF | |
| Localisation | Languages, currencies, regulatory content | Country-specific requirements | SOW / CF | |
| Non-functional | Performance, availability, retention, audit | Service levels and compliance | SOW | |

---

## Section 10 — Meeting Notes

> *More than a log: discussions, decisions, and revelations, structured to highlight action items,
> responsibilities, and follow-ups. The pulse of the OSD.*

| Date | Meeting / attendees | Key decisions & insights | Actions (owner, date) |
|------|---------------------|--------------------------|-----------------------|
| | | | |

Link each entry to its transcript or discovery summary in the deal folder rather than pasting it in full.

---

## Section 11 — Transition to Delivery *(internal)*

> *An additional element beyond the handbook's core list: it carries the OSD across the handover to
> Professional Services (see `/presales:handover:doc`).*

### 11.1 Key Players

| Role | Representative / Designee | Attendance |
|------|---------------------------|------------|
| Sales Team | | Required |
| Services Leader | | Required |
| Project Team | | Required |
| Customer Success | | Required |
| Infrastructure Lead | | Optional |
| Training Lead | | Optional (if training needed) |
| Contract Specialist | | Optional (special contractual conditions) |

### 11.2 Pre-Handoff Steps
1. Present the account and opportunity plan
2. Review the order form and SOW
3. Document non-standard terms
4. Review this Opportunity Scoping Document
5. Map out project key players
6. Project kick-off and next-steps plan

### 11.3 Order Form / SOW / Non-Standard Terms

**Link to Order Form:** [deal folder] · **Link to SOW:** [deal folder]

| Area | Term | Standard / Non-Standard | Details |
|------|------|-------------------------|---------|
| Contract | "OUT" clause or special cancellation | | |
| SLA | Uptime commitment(s) | | |
| Product | Product commitments, timing & revenue requirement concerns | | |
| PS | Aggressive schedule or scope | | |
| PS | Fixed bid, non-bill hours, low rate | | |
| PS | Partner involvement | | |
| PS | Customizations | | |
| Infrastructure | Types of environments (Prod, Test, Dev) | | |
| Infrastructure | Disaster Recovery | | |
| Infrastructure | Encryption at Rest | | |

### 11.4 Services Strategy (PS)

- Implementation plan, hours, and roles (PS-owned)
- Implementation planning workshop outputs
- [Link(s) to PS documents]
