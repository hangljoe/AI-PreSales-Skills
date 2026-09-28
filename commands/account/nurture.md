---
description: Build the post-close nurture plan — handover check-ins, feedback asks, reference and case-study path, and expansion signals for a newly won account
argument-hint: "[account] [signature or go-live date]"
---

Build the post-close nurture plan for: **$ARGUMENTS**

Grounded in The PreSales Handbook: 16.4 *Nurturing a Relationship Beyond the Close*, 2.11 *Building
Relationships with Clients*, and 3.3.2 *Additional Phases* (Expansion/Upselling, Renewal & Advocacy).
The handbook's point: the close is a gateway, not an end. PreSales stays alongside the handover as the
bridge to earlier conversations and the point of contact for technical questions (16.4).

## Intake

If a deal folder exists, read `09_handover-package.md`, `02_discovery-notes.md`,
`04_pain-to-value.md`, and the PoC readout or evaluation plan, and say which files you used. If there
is no handover package yet, run `/presales:handover:doc` first — this plan builds on it.

Otherwise ask for: what was sold and to whom, go-live target, the outcomes the customer bought for (with
metrics), key stakeholders and their stance, who owns the account post-sale (CSM, PS lead, AE), and
anything promised during the sale that delivery must honour.

---

## Step 1 — Handover check-ins (16.4)

The handbook compares the handover to passing a baton: it moves to implementation or customer success,
but the SC keeps running alongside. Plan light, purposeful touchpoints, not a second project team.

| When | Touchpoint | SC role | With whom | Purpose |
|------|-----------|---------|-----------|---------|
| Week 1 | PS kick-off | Attend; walk through context and promises | PS lead, champion | No knowledge lost at the handover |
| Week 2–4 | Technical check-in | Answer open technical questions | Customer IT lead | Early blockers surface fast |
| First milestone / go-live | Milestone call | Celebrate; re-state the value story | Champion, sponsor | Link delivery back to why they bought |
| Day 90 | Value check-in | Compare results to the bought-for metrics | Champion, CSM | First value evidence |
| Month 6–12 | Strategic review | Contribute to a joint planning session (2.11) | Sponsor, CSM, AE | Evolving needs and next goals |

Adjust the cadence to the deal size. Agree it with the post-sale owner so the customer gets one voice.

---

## Step 2 — Feedback asks (16.4, 2.11)

Regular check-ins should be genuine touchpoints, not a formality (16.4). Use the handbook's two core
questions and add one per stakeholder role:

- "Are you getting the value you expected when you chose us?"
- "Have any unexpected challenges or gaps come up?"
- Champion: "What would make you look good internally at the next review?"
- End users: "Where does the tool slow you down today?"

Log every answer, respond quickly and transparently to any issue (2.11 *Handling Concerns*), and pass
product feedback to the product team.

---

## Step 3 — Reference and case-study path (3.3.2, 2.11)

Advocacy is its own phase in the handbook: collaborate with the client on case studies built around
their success points (3.3.2) and co-author success stories (2.11). Build the path step by step, with
consent gates at each step.

| Stage | Trigger | Ask | Consent needed |
|-------|---------|-----|----------------|
| Internal win story | Signature | None — internal only, anonymised numbers | Check the contract for confidentiality terms |
| Reference call | First value evidence (for example, day 90) | "Would you take one call from a peer?" | Customer contact's explicit OK |
| Quote / testimonial | Measured result | Short quote with name and title | Written approval, including the wording |
| Case study | Sustained value (6–12 months) | Co-authored story with metrics | Written approval from the customer's comms or legal team |

Never publish a customer name, logo, or number without written approval. If a case study or post is
approved, draft it with `docx-generator` (case-study document) or `linkedin-post` (announcement post).

---

## Step 4 — Expansion signals (3.3.2, 2.11)

Needs evolve as the customer grows (2.11 *Understand Evolving Needs*). The SC's job is to spot and pass
on signals, not to push offers (the handbook warns against coming across as pushy).

| Signal to watch | Where you hear it | Pass to |
|-----------------|-------------------|---------|
| Another team or region asks for access | Check-ins, support tickets | AE / CSM |
| A use case that was out of scope is now urgent | Value check-in | AE, then scoping |
| New initiative, merger, or leadership change | News, strategic review | AE |
| Heavy usage, requests for more capacity or features | Admin, usage data | CSM |
| Renewal window approaching | Contract | AE / CSM |

Record each signal with a date and a confidence tag. Do not propose scope or pricing yourself.

---

## Output: Nurture Plan — [Account] | [Date]

```
Why they bought: [outcomes + metrics, from the handover package]
Post-sale owner: [CSM / PS lead]  |  SC touchpoints: [list with dates]
Feedback log: [date | who | what | action]
Reference path: [current stage | next ask | consent status]
Expansion signals: [signal | date | passed to | tag]
Risks to the relationship: [risk | mitigation | owner]
```

---

## Handoff

Save as `11_nurture-plan.md` in the deal folder (or `./output/`). Then offer one next step:
`/presales:handover:doc` (if the handover package is missing), `win-loss-analyzer` (run the win debrief
with the team, ch. 17), or `field-comms-writer` (the check-in or reference-ask email).

Confidence-tag every claim: 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown.
