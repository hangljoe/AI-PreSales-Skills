---
description: Place the buyer on the buying journey — stage, matching seller/PreSales actions, personas per stage, early-engagement timing and risks
argument-hint: "[account] [what you know about where they are]"
---

Map where **$ARGUMENTS** sits on the buying journey and what Sales and PreSales should do about it.
Ground every step in The PreSales Handbook ch. 3 (§3.1 buying journey, §3.2 personas, §3.3 selling
journey, §3.4 bridging the two, §3.10 when to engage). Paraphrase; never quote at length.

If the account or the evidence of where they are is missing, ask once. If a deal folder exists,
read `01_account-brief.md`, `02_discovery-notes.md` and `03_mutual-action-plan.md` first.

## Step 1 — Place the buyer (§3.1)

Pick the current buying stage and cite the evidence. The eight stages:

| Buying stage | The buyer is… | Typical signals |
|--------------|---------------|-----------------|
| Awareness | Sensing a problem they can't yet name; first research | Content downloads, event chats, vague pain |
| Consideration | Researching options; attending webinars and demos; maybe a trial | Inbound demo request, RFI, "what do you do?" |
| Decision | Comparing a shortlist on integration, security, price, support | Deep technical questions, RFP, PoC, reference asks |
| Purchase | Contracting and signing | Procurement, legal, security review |
| Implementation | Integrating, migrating data, training | Kick-off, SOW, onboarding plan |
| Post-purchase | Adopting, asking for support, maybe expanding | Usage questions, new-team interest |
| Retention & renewal | Periodic check-ins; renewal talks | Renewal date approaching |
| Re-evaluation | Needs changed; exploring the market again | Competitor contact, "we are reviewing our tools" |

Remind the user the journey is non-linear (§3.4). Buyers can jump back a stage. Tag the placement
🟢 Confirmed (buyer said so or it is in the CRM), 🟡 Inferred, or 🔴 Unknown.

## Step 2 — Match the selling phase and PreSales actions (§3.3)

Map the buying stage to the selling phases that serve it. List the PreSales actions for those
phases only.

| Buying stage | Selling phases (§3.3.1–3.3.2) | Core PreSales actions |
|--------------|-------------------------------|-----------------------|
| Awareness | Prospecting, Long-term development | Technical insight for campaigns; periodic insights and webinars for leads not ready yet |
| Consideration | Initial contact, Sales discovery/qualification, Functional & technical discovery | Collateral for outreach; join qualification calls; lead FTD and document requirements |
| Decision | Demo & workshops, Ballpark pricing, RFX, Proposal & value | Tailored demo; pricing drivers; RFX responses; validate feasibility in the proposal |
| Purchase | Service discovery, Negotiation, Closing | Align with services on the SOW; clarify technical terms; hand over at close |
| Implementation | Onboarding | Support the implementation team; guide through technical hiccups |
| Post-purchase / Renewal | Expansion/upselling, Renewal & advocacy | Spot expansion needs; demo new features; co-create case studies |
| Re-evaluation | Discovery again, or Disqualification | Re-qualify honestly; give sales clear fit feedback |

Name the **next selling phase** and the one PreSales action that moves the buyer there.

## Step 3 — Personas per stage (§3.2)

For the current and next stage, list who from the decision board should be involved (finance,
legal, IT security, IT, operations, purchasing). Add the persona types: member, sponsor, champion,
detractor, gatekeeper, advisor. For each, name what they need now: evidence for members, vision
for sponsors, ammunition for champions, transparent answers for detractors, paperwork for
gatekeepers, benchmarks for advisors. Flag anyone who is missing.

## Step 4 — Early-engagement timing and risks (§3.2, §3.4, §3.10)

- **Timing:** were we in before the buyer could name the problem (§3.10)? If we arrived in
  Decision, the criteria were probably shaped by someone else. Say so and name the recovery move
  (re-open discovery, reframe the criteria).
- **Late departments:** legal, security, IT or purchasing not yet engaged. §3.2 warns that late
  involvement slows the cycle and puts the deal at risk.
- **Journey not shared:** the buyer buys rarely and we sell daily (§3.4). If they have not seen
  the steps and stakeholders ahead, offer to walk them through it. The MAP is the tool for that.
- **Other risks:** stage skipped (e.g. demo before discovery), a champion not yet armed, a
  re-evaluation signal on an existing customer.

## Output

Save to the deal folder as `01a_buying-journey.md` (confirm first), or show it inline.

```
BUYING JOURNEY — [Account] | [Date]
Current stage: [stage] [🟢/🟡/🔴] — evidence: [one line]
Selling phase now → next: [phase] → [phase]

PRESALES ACTIONS NOW (max 3)
1. …
PERSONAS: involved / missing
| Persona or department | Status | What they need now |

TIMING & RISKS
- Engagement timing: [early / on time / late] — [what that means]
- [risk] → [mitigation]

NEXT STEP: [one action, owner, date]
```

## Handoff

- Consideration or early Decision with discovery still open → `/presales:discovery:prep`
- Stuck between stages, or unsure what to do next → `presales-coach`
- Stakeholders need a shared plan to a decision → `/presales:account:map`
- Champion needs arming → `/presales:account:champion`
