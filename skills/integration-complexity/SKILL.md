---
name: integration-complexity
version: "1.2"
last_updated: 2026-09-28
description: "Maps a prospect's system landscape (ERP, CRM, line-of-business, data, partner and identity systems) against your platform's integration options, rates each integration's technical complexity and business risk, flags high-risk integrations and gives a relative effort profile (Low / Medium / High) for PoC planning and Opportunity Scoping Document (OSD) scoping. Use on \"assess the integration complexity\", \"integration landscape\", \"how complex is their tech stack\", \"integration risk\", \"map their integrations\". Siblings: osd-scoper (full OSD scope), /presales:deal:poc-plan (PoC plan)."
triggers:
  - "assess the integration complexity"
  - "integration landscape"
  - "how complex is their tech stack"
  - "integration risk"
  - "map their integrations"
  - "what are the integration challenges"
  - "integration assessment"
  - "tech stack assessment"
  - "integration scope"
  - "technical complexity assessment"
---

# Integration Complexity Assessor

Maps a prospect's system landscape and rates integration complexity before committing to a PoC or an Opportunity Scoping Document
(OSD, handbook ch. 8).
Stops scope surprises post-sale by making integration risk visible to SC and delivery early.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **Your CRM** (optional, e.g. Salesforce or HubSpot, if connected) | Pulls discovery notes and any systems mentioned in opportunity or account records |
| **Your wiki / knowledge base** (optional, e.g. Confluence or Notion, if connected) | Checks prior integration patterns for this system and version from past deals |

No connections? List the systems you know about below.

---

## Step 0 — Your platform's integration options

Ask the SC (or read from the deal folder or product docs they share):
- **Integration methods** your product supports — REST/GraphQL APIs, webhooks, file/SFTP, EDI, iPaaS connectors
- **Pre-built connectors** that exist today, with supported versions (e.g. "SAP S/4HANA 2021+, Salesforce, NetSuite")
- **Middleware you support or partner with** (e.g. MuleSoft, Boomi, Workato)
- **Known limits** — rate limits, unsupported versions, data residency constraints

Use this list as the source of truth for the "Pre-built connector?" column below. Never assume a connector exists.

---

## Step 1 — System inventory

Collect what is known. Mark confidence for each system (🟢🟡🔴 are reserved for confidence in
this skill; complexity and risk use ▲ ◆ ● instead). Keep the categories that matter for the user's product and drop the rest.

```
SYSTEM LANDSCAPE — [Account]

ERP:
  System: [SAP S/4HANA / SAP ECC / Oracle ERP Cloud / Oracle EBS / Microsoft D365 / NetSuite / Other: ___]
  Version / release: [___]   Confidence: 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown
  Hosting: Cloud / On-premise / Hybrid
  Customisation level: Heavy / Standard / Unknown

CRM (if relevant):
  System: [Salesforce / Microsoft Dynamics / HubSpot / Other: ___]
  Version / edition: [___]   Confidence: 🟢/🟡/🔴

Line-of-business systems (the ones your product replaces or extends):
  System: [e.g. HRIS, WMS, TMS, billing, ITSM, PLM, homegrown tool / Other: ___]
  Version: [___]   Confidence: 🟢/🟡/🔴

Current solution for the problem you solve (current state):
  System: [Incumbent vendor / Spreadsheets / Manual / None / Other: ___]
  Confidence: 🟢/🟡/🔴

External partner connections (if relevant):
  Partner count: [~N]  (e.g. suppliers, carriers, banks, resellers)
  Connection method: EDI / API / Portal / Manual
  Existing partner integrations: [list if known]

Identity and security:
  SSO / IdP: [Okta / Entra ID / Ping / Other: ___]
  Data residency or security requirements: [___]

Other relevant systems:
  [Data warehouse / BI tools, e-commerce platforms, government or regulator portals, etc.]

Integration middleware:
  [MuleSoft / Dell Boomi / SAP Integration Suite / Azure Integration Services / Workato / None / Unknown]
```

---

## Step 2 — Complexity rating per integration

Rate each integration on two axes: technical complexity and business risk.
Scale: ▲ High / ◆ Medium / ● Low. (🟢🟡🔴 stay reserved for confidence.)

| System | Integration direction | Technical complexity | Business risk | Pre-built connector? | Notes |
|--------|----------------------|---------------------|---------------|----------------------|-------|
| [ERP] | Master data + transactional feed | ▲ High / ◆ Medium / ● Low | ▲ High / ◆ Medium / ● Low | Yes / No / Check with delivery | |
| [CRM] | Account / opportunity sync | | | | |
| [Line-of-business system] | Inbound status updates | | | | |
| [Partner connections] | Standard B2B messages (EDI / API) | | | | |
| [Incumbent tool] | Data migration + live feed during cutover | | | | |

**Technical complexity drivers:**
- ▲ High: unsupported ERP version, no standard API, heavy customisation, unknown middleware, legacy architecture
- ◆ Medium: standard system but older version, partial API coverage, some configuration required
- ● Low: modern cloud system, standard REST/SOAP API available, pre-built connector exists

**Business risk drivers:**
- ▲ High: integration is on the critical go-live path, no fallback, customer has no IT resource available
- ◆ Medium: important but can be phased, IT resource available, test environment confirmed
- ● Low: secondary integration, manual fallback available during cutover, can be deferred post-go-live

---

## Step 3 — Overall complexity assessment

```
INTEGRATION COMPLEXITY SUMMARY — [Account]

Overall complexity rating: ▲ High / ◆ Medium / ● Low   Confidence: 🟢/🟡/🔴
Primary risk driver: [The single thing most likely to delay go-live]

High-risk integrations (must be explicitly scoped in OSD):
  1. [System + reason]
  2. [System + reason]

Pre-built connectors confirmed available:
  [List — each one reduces SC and delivery effort materially]

Custom development likely required: Yes / Possible / No / Unknown
  If yes: [Which integrations and why]

Relative effort profile (not a day estimate — sizing belongs to your delivery team):
  Standard profile (pre-built connectors, modern cloud stack): lower SC and delivery effort
  Custom profile (legacy systems, non-standard API, unknown middleware): higher SC effort, extended delivery
  This account's profile: [Low / Medium / High] — confidence: 🟢/🟡/🔴
  If your delivery team publishes day-ranges per profile, quote theirs and cite the source.

Discovery questions still unanswered (must resolve before OSD):
  1. [e.g. "Which system owns the master data we need — and who maintains it?"]
  2. [e.g. "Is there a test environment available for integration testing during PoC?"]
  3. [e.g. "Who owns the middleware layer — internal IT or a managed service provider?"]
```

---

## Step 4 — Risk flags and SC actions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTEGRATION RISK FLAGS — [Account]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] Legacy ERP version with no standard API — requires custom connector scoping with delivery
[ ] IT resource unavailable or not yet allocated — delivery risk from day one
[ ] No test / dev environment confirmed — blocks PoC and pre-go-live validation
[ ] Integration middleware not confirmed — may add cost and dependency risk
[ ] Partner connections required at scale (e.g. > 20 partners via EDI/API) — significant ongoing effort
[ ] Third-party or regulator portal integration required — timeline outside our direct control
[ ] Data migration from the legacy / incumbent system — consistently underestimated in deals
[ ] Heavy ERP customisation — standard connector may need modification

Flags found: [list]

RECOMMENDED SC ACTIONS:

Before PoC kickoff:
  [What must be confirmed before starting — e.g. test environment, IT resource, API access]

Before OSD:
  [What must be in scope explicitly — e.g. partner connection count, migration scope, middleware owner]

If raising with AE:
  [Any integration risk that affects deal commercials or timeline commitments]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Quality checklist

- [ ] Every major system has a confidence tag — all 🔴 unknowns are on the next discovery call agenda
- [ ] Pre-built connector availability has been verified with delivery or product team, not assumed
- [ ] High-risk integrations are named explicitly — not buried in a footnote
- [ ] Customer's IT availability and test environment status have been asked about directly
- [ ] AE is aware of any integration complexity that affects pricing or timeline commitments
- [ ] Complexity/risk use ▲ ◆ ●; 🟢🟡🔴 used only for confidence

---

## Handoff

- Integration risks and open questions feed the OSD scope → `osd-scoper` (then `osd-architect`)
- Test environment, API access and integration use cases feed the PoC → `/presales:deal:poc-plan`
