---
description: Build the close plan — read the deal signals, pick ONE of the four handbook closing techniques, script it for SC and AE, set the stage, and prepare a fallback
argument-hint: "[account] [target close date]"
---

Build the close plan for: **$ARGUMENTS**

Grounded in The PreSales Handbook, ch. 16 *Closing* (16.1 role of PreSales, 16.2 setting the stage,
16.3 the four closing techniques) and ch. 15 *Objection Handling*. MEDDPICC is this kit's
qualification extension of the handbook's BANT (ch. 5–6); the handbook itself does not use MEDDPICC.

## Intake

If a deal folder exists, read it first and say which files you used:
`02_discovery-notes.md`, `02a_meddpicc-score.md`, `03_mutual-action-plan.md`, `04_pain-to-value.md`, `06_poc-evaluation-plan.md`
(and a PoC readout, if one exists), `08_competitive-read.md`. Otherwise ask for, in one message:

1. Your product and what is being proposed (scope, rough value, target close date)
2. MEDDPICC status — `02a_meddpicc-score.md` in the deal folder, or the latest `/presales:discovery:qualify` output
3. MAP status — which milestones are done, late, or not started
4. Open objections — voiced ones, and ones you suspect but nobody has said out loud
5. Who is in the room for the close, and whether the Economic Buyer has seen the value case
6. Anything that changed since the proposal: new stakeholders, re-scoped needs, a new competitor

Never invent a signal. Tag every input 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown.

---

## Step 1 — Readiness check (is this a close, or a step back?)

The handbook warns against drifting back into the Demo or Discovery stages at closing time. Going
back looks unsure, dilutes the value narrative, and breaks momentum (ch. 16 intro). So check readiness
before choosing a technique.

| Signal | Status | Evidence | Tag |
|--------|--------|----------|-----|
| Metrics agreed with the customer | | | |
| Economic Buyer has seen and accepted the value case | | | |
| Decision criteria met (PoC / technical validation passed) | | | |
| Decision and paper process known (legal, procurement, security) | | | |
| Pain confirmed and tied to a date or event | | | |
| Champion confirmed (not just friendly) | | | |
| Competition understood (incl. doing nothing) | | | |
| MAP on track to the decision date | | | |
| Open objections | | | |

**Verdict:** Ready to close / Close with one gap to fix first / Not ready.

If **Not ready**, do not script a close. Name the one gap and route it: a weak champion goes to
`champion-health`, status-quo risk to `do-nothing-buster`, and an unclear constraint to `presales-coach`.

---

## Step 2 — Set the stage (16.2)

**Revisit past interactions.** Pull the 3–5 moments that matter most from the deal history: pains
voiced, concerns raised in demos, and goals the customer stated. For each, write how the solution now
ties to *their* path (a concern answered as a story, not as a feature recap).

| Earlier moment (who, when) | What they said | How we close the loop now |
|----------------------------|----------------|---------------------------|
| | | |

**Clarify the proposition.** Propositions drift in long cycles. Before the close, confirm that both
sides agree on exactly what is on the table.

| Element | What we are offering | Customer confirmed? |
|---------|----------------------|---------------------|
| Scope / modules | | |
| Customisations and integrations | | |
| After-sales support and onboarding | | |
| Pricing and terms (AE owns) | | |
| Changes since the proposal | | |

**Anticipate last-minute hesitations** (ch. 16 intro). List the two or three most likely hesitations,
with one prepared answer each (use the ch. 15 sequence: listen, empathise, probe, address honestly, confirm resolution).

---

## Step 3 — Pick ONE closing technique (16.3)

The handbook names four techniques. Recommend exactly one, with a two-sentence rationale that cites the
signals from Step 1.

| Technique | What it does (16.3) | Pick it when | Avoid it when |
|-----------|--------------------|--------------|---------------|
| **Assumptive Close** | Moves the talk from "if" to "when" and "how", building on positive signals | Signals are strong, EB is engaged, no open objections, MAP on track | Any key MEDDPICC element is 🔴 or an objection is still open |
| **Summary Close** | Retells the journey from pains to impact to reinforce the value case | Long or multi-stakeholder cycle, new decision-makers, value spread across many meetings | The value case itself is still disputed |
| **Question Close** | Invites the last reservations ("Is there any reason you would not proceed?") and addresses them | Signals look positive but you suspect a hidden or latent objection | You are not ready to answer what surfaces |
| **Incentive Close** | Adds a genuine, time-bound incentive when the decision drags | Value is accepted but the decision stalls with no internal urgency | It would paper over an unresolved objection, or the incentive does not match what the customer values |

Rule: an incentive is a nudge, not a fix. If the deal stalls because nobody feels the cost of waiting,
run `do-nothing-buster` before reaching for a discount.

---

## Step 4 — Script the close

Write the script for the chosen technique, split by speaker. Keep it short: the close is a
conversation, not a speech.

```
CLOSE SCRIPT — [Technique] — [Account] | [Meeting date]

Opening (AE, ~1 min):
[Frame the meeting: where we are and what we want to agree today]

Value recap (SC, ~3 min):
[2–3 threads from Step 2, in the customer's words, each tied to a proven result]

The close (AE):
[Assumptive: "When would you like the kick-off, and who from your side should join?"
 Summary: the one-paragraph journey from their pain to the impact, then the ask
 Question: "Is there any reason you would not proceed with us?"
 Incentive: the offer, its genuine value to them, and the date it expires]

Technical reassurance (SC, on demand):
[Prepared answers to the hesitations from Step 2, per stakeholder — IT, business, finance]

Confirm and lock (AE):
[The concrete next step: signature date, paper-process owner, kick-off date — add it to the MAP]
```

For the Question Close, rehearse the follow-up path: address each concern that surfaces honestly,
then confirm resolution before asking again (15, *Address the Objection* / *Confirm Resolution*).

---

## Step 5 — Stage plan: who, when, what proof

| Item | Plan |
|------|------|
| Meeting and date | |
| Customer attendees (role, stance) | |
| Our attendees and roles | SC: … / AE: … / exec sponsor (if needed): … |
| Proof to have ready | PoC scorecard, ROI case, reference contact, security docs, implementation plan |
| Pre-wire | Which stakeholder the champion briefs before the meeting, and with what |
| MAP update | Milestones to add after the meeting |

---

## Step 6 — Risks and fallback

| Risk | Likelihood | Early signal | Mitigation |
|------|------------|--------------|------------|
| | H/M/L | | |

**Fallback:** if the chosen technique does not land, name the second technique and why it fits the
new situation (for example, Assumptive meets hesitation → switch to Question; Question surfaces a
pricing issue → AE takes it offline with `negotiation-prep`). Never fall back to re-running the demo.

---

## SC vs AE authority

The SC owns technical validation and reassurance of each stakeholder (16.1), the value recap, and
readiness of the proof. The AE owns the ask, the commercial terms, and any incentive. The handbook
frames the Incentive Close as a sales lever (16.3), so the SC never offers a discount, a free module,
or a deadline on their own. Agree who speaks when before the meeting, and who answers price
questions (always the AE).

---

## Handoff

Save as `10_close-plan.md` in the deal folder, or `./output/` if there is none. Then offer one next
step: `/presales:deal:objection-drill` (rehearse a hesitation), `negotiation-prep` (terms and
concessions), `pricing-positioning` (price comes up), `/presales:account:map` (update the MAP), or
after signature `/presales:handover:doc` and `/presales:account:nurture`.

Confidence-tag every claim: 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown. Any 🔴 in Step 1 is a close risk.
