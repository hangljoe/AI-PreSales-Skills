---
description: Build the PreSales-to-PS handover package — draft at technical win, finalise at contract signature — plus the internal handover-call agenda
argument-hint: "[deal name]"
---

Build the PreSales-to-Professional-Services handover document for: **$ARGUMENTS**

**Timing — two passes.**
1. **Draft at technical win.** PS needs the context before service discovery and the SOW. The
   handbook's selling journey (3.3) has PreSales hand over and align with Professional Services
   before service discovery.
2. **Finalise at contract signature.** Update scope, pricing assumptions and dates to match what
   was signed, then run the handover call below. At closing, the handbook (3.3) has PreSales hand the
   account to Professional Services, onboarding and client success.

Save to the deal folder as `09_handover-package.md` (confirm before writing). Mark every field that
still depends on the signed contract as `(finalise at signature)` in the draft.

Paste available context (discovery notes, OSD, PoC results, CRM data) or describe the deal.
If an Opportunity Scoping Document (OSD) exists, read its Section 11 *Transition to Delivery* first —
it already holds the key players, order form / SOW terms, and services strategy. (Section 11 is this
kit's addition to the handbook's OSD structure in 8.2.)

## PreSales Handover Package

### Deal Summary
| Field | Value |
|-------|-------|
| Customer | |
| Deal owner (AE) | |
| SC name | |
| Products sold | |
| Contract value | (finalise at signature) |
| Contract signed date | (finalise at signature) |
| Go-live target | |
| PS engagement type | Implementation / Configuration / Managed Services |

### Customer Goals (why they bought)
[From discovery and OSD — what outcomes did the customer commit to?]
Tag each: 🟢 Customer-stated / 🟡 Inferred

### Scope — what was sold
[Exact modules, use cases, integration points included in the contract]
[Reference OSD if available]

### What was NOT sold (out of scope)
[Explicitly document exclusions — protects both PS and the customer relationship]

### Key Stakeholders
| Name | Title | Role | Sentiment | Contact |
|------|-------|------|-----------|---------|
| | | Champion / Sponsor / Day-to-day / EB | | |

### Technical Environment
| System | Details | Integration to our solution | Confidence |
|--------|---------|-----------------------------|------------|
| ERP | | | 🟢/🟡 |
| CRM | | | 🟢/🟡 |
| Other core / partner systems | | | 🟢/🟡 |

### POC / Validation Results
[What was tested, what passed, what gaps remain]
[Any customer-confirmed metrics from the POC]

### Success Criteria (signed off)
[The criteria from the evaluation plan that the customer agreed to — these are the go-live gates]

### Pricing Assumptions
[Document any assumptions baked into the pricing that PS needs to know]
[e.g., "1 integration point assumed; customer confirmed SAP S/4HANA via standard connector"]

### Open Items / Risks
| Item | Owner | Priority | Notes |
|------|-------|----------|-------|
| | | H/M/L | |

### Artefacts to hand over
- [ ] Signed OSD
- [ ] Demo script / storyboard
- [ ] POC evaluation plan and results
- [ ] Discovery notes
- [ ] Competitive context
- [ ] Commercial proposal

### Recommended PS kick-off agenda items
[What should the first customer-facing PS call cover to ensure a clean start?]

---

## Handover call agenda (internal, 45–60 min, within a week of signature)

The handbook compares a handover to passing the baton in a relay race: structured handover calls
plus unified documentation, so the next team starts with full context (3.11). After the close, the
SC stays a point of contact for technical questions while delivery takes over (16.4).

**Attendees:** AE, SC, PS lead or project manager, customer success manager; the solution architect if one is assigned.
**Pre-read:** this package, the OSD, the PoC results. Send it at least a day before.

| # | Topic | Lead | Time |
|---|-------|------|------|
| 1 | Why they bought — the CBIs, success criteria and the value case the customer signed up to | AE + SC | 10 min |
| 2 | What was sold, what was not, and the pricing assumptions PS must honour | AE | 10 min |
| 3 | Stakeholders — champion, sponsor, day-to-day contacts, sceptics, sensitivities | AE + SC | 5 min |
| 4 | Technical environment, integrations and PoC results — what was proven and what was only assumed | SC | 10 min |
| 5 | Open items, risks and promises made in the sales cycle (walk the 🔴 list) | SC | 10 min |
| 6 | Customer kick-off plan — who introduces PS to the customer, and when | PS lead | 5 min |
| 7 | Ongoing SC role — how and for how long the SC stays reachable for technical questions | SC + PS lead | 5 min |

**Close the call with:** named owners and dates for every open item, confirmation that every artefact
below was handed over, and a date for a 30-day check-in between SC and PS.

---

Confidence-tag every claim: 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown.
Flag any 🔴 items as action items for PS to confirm with the customer in week 1.

After signature, run `/presales:account:nurture` to plan the SC's post-sale touchpoints: adoption, reference and expansion.
