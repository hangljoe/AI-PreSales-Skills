---
name: rfx-navigator-presales
version: "1.3"
last_updated: 2026-09-28
description: "Entry point when an RFX document lands (RFI, RFP, RFQ, ITT or tender): identifies the type and what it means for workload and strategy, checks for late entry and procedural or price-benchmark RFXs (handbook ch. 14), runs a 10-minute fit scan and routes to the right /presales:rfp:* command. Use on \"we got an RFP\", \"received an RFI\", \"tender received\", \"an RFX arrived\", \"how do we handle this RFP\". Siblings: /presales:rfp:analyze (scored go/no-go), /presales:rfp:respond (write the response). SKIP for the bid/no-bid decision itself."
triggers:
  - "we got an RFP"
  - "received an RFI"
  - "RFQ just came in"
  - "an RFX arrived"
  - "we need to respond to an RFP"
  - "how do we handle this RFP"
  - "RFP came in"
  - "got an RFI"
  - "RFQ request"
  - "tender received"
  - "RFX response"
  - "ITT received"
  - "invitation to tender"
  - "RFI response"
  - "RFQ response"
---

# RFX Navigator

First stop for any incoming RFP, RFI, RFQ, ITT, or tender document.
Gets you oriented in 10 minutes before committing SC time to a full response.

Note: Detailed workflows live in the commands — this skill is the triage and routing layer.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **Your CRM** (optional, e.g. Salesforce or HubSpot, if connected) | Pulls account history, open opportunities, and any prior RFX activity for this account |
| **Your wiki / knowledge base** (optional, e.g. Confluence or SharePoint, if connected) | Checks prior approved responses and competitive intelligence for this account or industry |

No connections? Paste the document or a summary. The navigator works without connections.

---

## Step 1 — What type of document is this?

Paste the document or describe it. Identify the type — it determines the entire strategy.

```
DOCUMENT TYPE IDENTIFICATION

RFI — Request for Information
  What it is: Market information gathering. No commitment to buy yet.
  Workload: Low–Medium. Typically 1–5 pages of narrative responses.
  Strategy: Establish presence, demonstrate thought leadership, get on the shortlist.
             Do NOT over-engineer this. Save the heavy SC work for the RFP that follows.
  Watch out for: A very detailed RFI may be an RFP in disguise — check the timeline.

RFP — Request for Proposal
  What it is: Formal proposal request. Buying intent is real.
  Workload: High. Typically 2–8 weeks of SC effort depending on size and complexity.
  Strategy: Compliance first, then differentiation. Win on fit — not on volume of words.
  Watch out for: Language spec'd for an incumbent. Run /presales:rfp:analyze before starting.

RFQ — Request for Quotation
  What it is: Price-focused. Technical evaluation is largely done — they want commercial terms.
  Workload: Low on SC (technical work complete); High on AE and commercial team.
  Strategy: Anchor value before price lands. Do not let this become a race to the bottom.
  Watch out for: If you have no prior relationship with this account, someone else is the
                 technical incumbent. You are wiring the competition. Qualify out quickly.

ITT / Tender — Invitation to Tender
  What it is: Formal procurement, often public sector or regulated industry.
  Workload: Very High. Strict format requirements, mandatory compliance, formal evaluation.
  Strategy: Compliance above all. Every deviation is a disqualification risk.
  Watch out for: Non-negotiable deadlines. Late by one minute = automatic disqualification.
```

---

## Step 2 — Rapid fit scan (10 minutes)

Before spending more time, do a quick headline assessment.

Two handbook checks come first (ch. 14):
- **Did we see this coming?** An RFP that lands without prior knowledge usually means you are
  entering in the second half: requirements were shaped earlier, often with a competitor (14.1).
  Treat "cold and unsolicited" as a strong warning sign, not a neutral fact.
- **Is it genuine?** Ask why they issued it. Are they looking for a real solution, or is it a
  procedural exercise, perhaps to benchmark prices or validate a decision already made for
  another vendor (14.2)? Specificity of requirements and your prior relationship give the clues.

```
RAPID FIT SCAN

Account: [___]
Document type: RFI / RFP / RFQ / ITT
Submission deadline: [date — how many days from today?]
Estimated size: [number of questions / pages / sections]

Products / modules in scope (list your own — ask the SC if not known):
  [ ] [Your product / module 1]
  [ ] [Your product / module 2]
  [ ] [Your product / module 3]
  [ ] Out of our portfolio (partner or not offered): [___]

Mandatory requirements we clearly cannot meet: [List — if any. If yes, stop here.]
Obvious strengths — where this document plays directly to us: [List]

Is this document written for an incumbent?
  [ ] Specific product version numbers or feature names that sound proprietary
  [ ] Evaluation timeline that suits a known competitor's implementation approach
  [ ] Evaluation criteria that don't reflect standard market practice
  → If yes: escalate to AE before investing SC time

Our prior relationship with this account:
  [ ] Existing customer — we are embedded and responding to expand
  [ ] Active pipeline — we know this account and have prior discovery
  [ ] Prior deal — we bid before (won / lost / no decision — when? why?)
  [ ] Cold — no prior relationship (caution: you are entering in the second half, handbook 14.1)

Is this a procedural or price-benchmark RFX? (handbook 14.2)
  [ ] Requirements generic or copied, no access to the business owner or evaluators
  [ ] Price dominates the evaluation, with little room to show value
  [ ] Signals that a decision is already made (incumbent language, tight timeline, no Q&A access)
  → If yes: flag to AE; qualify hard in /presales:rfp:analyze before investing SC time
```

---

## Step 3 — Strategy recommendation by document type

```
IF THIS IS AN RFI:
  Goal: Get on the shortlist, not write the full response.
  Time box: Allocate [N] hours maximum — this is not a full proposal.
  Key sections to prioritise: company overview, capability match, reference customers.
  Skip: Detailed implementation approach, full integration architecture, pricing.
  Next step: /presales:rfp:respond with a scoped response plan — or draft directly.

IF THIS IS AN RFP:
  Goal: Score the highest combined capability + compliance total across all evaluators.
  First step: Run /presales:rfp:analyze to get a BID / NO-BID recommendation before writing a word.
  If it's a BID: Run /presales:rfp:respond to build the requirement coverage matrix.
  If a presentation is required alongside: Run /presales:rfp:present.

IF THIS IS AN RFQ:
  Goal: Anchor value before price. Do not respond to an RFQ with only a price.
  First step: Brief the AE immediately — this is a commercial lead, not an SC lead.
  SC action: Run /presales:value:roi-case to prepare the value anchor.
  AE action: Confirm budget holder, decision timeline, and any competing quotes.
  Format: Consider /presales:deal:proposal for a value-anchored commercial response.

IF THIS IS AN ITT / TENDER:
  Goal: Full compliance. Non-compliance = disqualification.
  First step: Map every mandatory requirement before writing anything.
  Run: /presales:rfp:analyze (use the requirements fit scan) then /presales:rfp:respond.
  Legal review: Mandatory if the ITT includes contract terms or jurisdictional clauses.
```

---

## Step 4 — Routing decision

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RFX NAVIGATOR — [Account] | [Document type]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Document type: [RFI / RFP / RFQ / ITT]
Deadline: [date] — [N] days from today
Estimated SC effort: [Low / Medium / High / Very High]

First impression:
[2–3 sentences — what stands out, any red flags, initial read on fit and win probability]

RECOMMENDED NEXT STEP:

→ /presales:rfp:analyze [account name]
  Use when: Need a scored BID / NO-BID / CONDITIONAL recommendation (30 min)

→ /presales:rfp:respond [account name]
  Use when: Decision to bid is made — build the requirement coverage matrix and draft responses

→ /presales:rfp:present [account name]
  Use when: A shortlist presentation is required alongside the written response

→ /presales:value:roi-case [account name]
  Use when: RFQ — anchor value before the commercial response

→ /presales:deal:proposal [account name]
  Use when: RFQ or commercial response format needed

After submission (handbook 14.5):
  A few days after submitting, confirm receipt and offer to answer early questions.
  If shortlisted, prepare the presentation or demo: /presales:rfp:present.
  If not selected, ask for feedback: price, solution gaps, how well we understood them.
  Capture it with win-loss-analyzer.

Emergency (< 5 days to deadline):
  Skip /presales:rfp:analyze. Go straight to /presales:rfp:respond.
  Flag to AE: this response will be constrained — scope it honestly and prioritise mandatory requirements.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Handoff

- Bid decision needed → `/presales:rfp:analyze`
- Bid confirmed, draft the response → `/presales:rfp:respond`
- Shortlist presentation required → `/presales:rfp:present`

---

## Quality checklist

- [ ] Document type confirmed — RFI vs. RFP vs. RFQ changes the entire approach and workload
- [ ] Deadline checked — is it achievable? If not, escalate to AE before starting
- [ ] Mandatory requirements scanned — no point starting if there are showstopper gaps
- [ ] AE is aware this RFX has arrived and has agreed to pursue it
- [ ] Prior responses for this account checked (CRM / knowledge base / your RFP library)
- [ ] Late-entry (14.1) and procedural / price-benchmark (14.2) checks answered
- [ ] Post-submission follow-up and loss-feedback step planned (14.5)
