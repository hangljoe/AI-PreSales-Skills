---
name: capability-mapper
version: "1.3"
last_updated: 2026-09-28
description: "Maps customer problems to your own capability list: a heat map across Technology and Operating Model dimensions with ranked recommendations and buyer personas, plus a requirement-level fit table (OOTB / Config / Dev / Gap, must-have, evidence) that feeds the TFQ Solution-Fit gate. Use on \"capability heat map\", \"map their problems to our capabilities\", \"which of our solutions fit\", \"capability mapping\". Siblings: /presales:value:pain-to-value (pain → capability → value table), critical-business-issue-finder (find the CBIs first), tfq (scored functional-fit gate). SKIP for requirement-by-requirement RFP compliance (/presales:rfp:respond)."
triggers:
  - "map their problems to our capabilities"
  - "capability assessment"
  - "which of our solutions fit"
  - "capability heat map"
  - "map pains to solutions"
  - "capability mapping"
  - "map the problems to our product"
  - "capability gap assessment"
---

# Capability Mapper

Maps a prospect's business problems to **your product's** capability framework, producing a prioritised heat map across Technology and Operating Model dimensions — with ranked product recommendations and buyer personas. It also rates each captured requirement in a **requirement fit table**, which is the evidence the TFQ's Solution / Functional Fit gate scores from.

Run this after discovery — ideally after `/presales:account:brief` and a discovery summary — to translate raw pain into a structured solution recommendation.

---

## Before you start — your capability list

This skill ships no vendor capability catalogue. It needs yours. In order of preference:

1. **Read it from the deal folder** if present (e.g. a `capabilities.md`, product fact sheet, or `04_pain-to-value.md`).
2. **Ask the user** to paste their capability list, grouped by domain if they have one. For example:
   `Domain → capabilities` (e.g. "Automate Workflows → Approvals, Rules Engine, Exception Management").
3. **If they have no list**, draft a domain grouping from their product description and website copy they paste, and ask them to confirm it before scoring. Tag the draft 🟡 Inferred.

Also capture, if available: product/module names per domain, the primary buyer persona for each module, and any fit guidance (ideal industries, company sizes, known gaps). Never invent capabilities the user did not confirm.

---

## Artifact Mode (Claude.ai)

If running in Claude.ai with artifact rendering available, render the interactive React component from `references/capability_mapper.tsx`. **Before rendering, replace the illustrative `TECH_CAP_MAP` (and matching `DOMAIN_SHORT` entries) with the user's capability list.** The Operating Model framework (`OPS_CAP_MAP`) is vendor-neutral and can stay. The user enters context, problems, root causes, and priorities step-by-step; the tool generates the capability heat map automatically using the Claude API.

---

## Conversational Mode (Claude Code or no artifact support)

### Step 1 — Context

Ask for:
- **Company name**
- **Industry** (e.g. Healthcare, Retail, Financial Services, Manufacturing)
- **Key business pain points** — from discovery notes, the account brief, or the user's input
- **Your capability list** — see "Before you start" above

If any of this was already provided in the conversation, proceed without asking again.

---

### Step 2 — Problem surfacing

List the stated problems. For each, confirm or refine with the user:
- Is this a real pain or a surface symptom?
- **Business impact if unsolved:** High / Medium / Low
- **Urgency to solve:** High / Medium / Low

Produce a clean table:

| # | Problem | Impact | Urgency |
|---|---------|--------|---------|
| 1 | ... | High | Medium |

---

### Step 3 — Root cause framing

Assign each problem to a root cause cluster. Use the domains of the user's capability list as the clusters, plus **Operating Model** for problems rooted in process, data, governance, or people rather than technology. If the user has no domain grouping yet, these generic clusters work for most B2B products:

| Cluster | Root cause patterns |
|---------|---------------------|
| Customer & Revenue | Customer data gaps, pipeline or channel visibility blind spots, pricing or incentive inaccuracy |
| Planning & Forecasting | Forecast errors, demand volatility, capacity imbalance, poor cross-functional alignment |
| Partner Collaboration | Supplier or partner visibility gaps, manual hand-offs, unreliable partner commitments |
| Risk & Compliance | Regulatory complexity, audit gaps, policy enforcement failures |
| Operations & Execution | Cost overruns, manual workflows, exception backlogs, slow cycle times |
| Operating Model | Process fragmentation, data quality issues, governance gaps, change management |

---

### Step 4 — Capability heat map

Map each problem to the relevant capabilities using the two frameworks below.

**Technology Capabilities — your product**

Use the user's capability list, one row per domain:

| Domain | Capabilities |
|--------|-------------|
| [Your domain 1] | [capability], [capability], ... |
| [Your domain 2] | [capability], [capability], ... |

**Operating Model Capabilities (vendor-neutral)**

| Domain | Capabilities |
|--------|-------------|
| Platform | Analytics & Dashboards, Single view of data, Orchestrate & Execute, Integration (Portal/Excel/Mail), Data quality, AI-enabled |
| Processes | Cross-functional workflows, New ways of working, Human + Machine, Automated Processes |
| Governance | Decision Boards, Cross-functional teams, Central Specialised Teams, Executive Sponsorship, Board Awareness, Regional vs Central |
| People | Adoption, Change management, Domain upskilling, AI upskilling, Systems upskilling |
| Network | Supplier Network, Partner Network, Customer Network, Channel Network |

**Heat scoring rules:**
- **Critical** — 2+ problems map here, OR 1 problem with High impact + High urgency
- **High** — 1 problem with High impact OR High urgency
- **Medium** — 1 problem with Medium impact OR Medium urgency
- **Low** — mapped but lower priority
- **—** — no current problem maps here

Produce the heat map as a table: Domain | Heat | Problems mapped | Evidence

---

### Step 5 — Prioritised recommendations

From the heat map, produce ranked solution recommendations:

1. List the **top 3 capability domains** (Critical + High heat only)
2. Map each domain to the corresponding product(s) or module(s) of the user's portfolio (from their capability list or fit guidance)
3. Name the **primary buyer persona** for each
4. Write a one-sentence value statement per domain

---

### Step 5b — Requirement fit table (feeds the TFQ Solution-Fit gate)

The heat map shows where the problems cluster. The TFQ needs something more granular: each
requirement rated against your product. Build this table whenever requirements exist, usually from
section 5 of the discovery call summary (`${CLAUDE_PLUGIN_ROOT}/references/call-summary-schema.md`), an RFP, or the OSD's
Section 9.

| # | Requirement | Product area | Fit | Must-have? | Evidence | Confidence |
|---|-------------|--------------|-----|------------|----------|------------|
| 1 | [customer need, their words] | [module] | 🟢 OOTB / 🟡 Config / 🔵 Dev / 🔴 Gap | ⭐ Yes / No / ⭐? inferred | [demo, documentation, product-team confirmation, reference customer] | 🟢/🟡/🔴 |

Rules (they mirror the TFQ `scoring-model.md` §5 and §7):
- **OOTB** works as shipped. **Config** needs setup but no code. **Dev** needs development or is on
  the roadmap. **Gap** can't be met. An unrated requirement is 🔴 Unknown, never a pass.
- **Evidence is required for OOTB.** A "fully supported" claim with no demo, document or product-team
  confirmation is 🟡 at best. The SC or product team rates fit; never assume it from the capability list.
- **Must-haves** come from the customer. Mark ⭐? when you infer one, and confirm it before it counts.
- **One summary line per product area**, because the TFQ gates each area separately with no averaging:
  `[Area]: n requirements · OOTB x% · Config y% · Dev z% · Gap w% · must-have gaps: [none / list]`.

Hand the table to `tfq`. A single ⭐ must-have Gap caps that area's Solution-Fit gate at Conditional.
Offer to save it in the deal folder as `04b_requirement-fit.md` (confirm first).

---

### Step 6 — Output

**Capability Assessment — [Company Name]**

```
HEAT MAP SUMMARY
────────────────────────────────────────────
Domain                    Heat      Problems
Plan & Forecast           Critical  3
Automate Workflows        High      2
Manage Risk & Compliance  High      1
...

TOP RECOMMENDATIONS
────────────────────────────────────────────
1. [Planning module] → [VP Operations / FP&A Lead]
   "Eliminate the 25% forecast error driving $Xm in excess cost."

2. [Workflow module] → [Head of Finance Operations]
   "Cut the 3-day approval cycle that delays every month-end close."

3. [Compliance module] → [Compliance Officer / CFO]
   "Automate policy checks to stop the audit findings estimated at $Xm/year."

REQUIREMENT FIT (from Step 5b — full table attached)
────────────────────────────────────────────
[Area]: 14 requirements · OOTB 57% · Config 29% · Dev 7% · Gap 7% · must-have gaps: none

OPEN DATA GAPS (discovery questions to validate)
────────────────────────────────────────────
- What is the current forecast accuracy baseline?
- How many approvals run through email today?
- What did the last audit cost in remediation?
```

---

## Connected Tools

| Tool | What it adds |
|------|-------------|
| **/presales:account:brief** | Account context feeds directly into Step 1 — no need to re-ask for company context |
| **/presales:discovery:summary** | Pains feed Step 2; the requirements section feeds the Step 5b fit table |
| **tfq** | Scores the Solution / Functional Fit gate from the Step 5b table |
| **/presales:value:pain-to-value** | Takes the top recommendations into a pain → capability → value table |

No connections? Paste discovery notes and your capability list, and the skill works identically.

---

## Quality checklist

- [ ] Capability list comes from the user or deal folder — nothing invented
- [ ] Every problem has a confirmed impact + urgency rating
- [ ] Root cause cluster assigned to each problem
- [ ] Heat map only shows Critical/High for capabilities with named evidence
- [ ] No capability marked Critical without a specific problem driving it
- [ ] Recommended products match the user's own fit guidance for this industry and segment
- [ ] Requirement fit table: every requirement rated OOTB / Config / Dev / Gap or left 🔴 Unknown; OOTB only with evidence; one summary line per product area
- [ ] Discovery gaps are explicit — not papered over with assumptions
