# MEDDIC → MEDDPICC — the qualification framework and question bank

This is the reference for the **Sales Discovery** skill. MEDDPICC is the **single qualification
language** across this PreSales toolkit. The PreSales Handbook teaches BANT (chapters 5–6); this kit
extends it to MEDDPICC. This file holds: the MEDDIC→MEDDPICC model, the per-element discovery
questions, the recommended sequence, and the BANT mapping.

---

## The model: MEDDIC is the on-ramp, MEDDPICC is the standard

**MEDDIC** — Metrics · Economic Buyer · Decision Criteria · Decision Process · Identify Pain · Champion.

**MEDDPICC** extends MEDDIC with the three elements that decide whether a *technically-fit* deal
actually closes:

| Add | Element | Why it matters |
|-----|---------|----------------|
| **P** | **Paper Process** | Procurement, legal, security review, and contract path — the invisible timeline-killer. |
| **I** | **Implicated Pain** | Not just *a* pain, but pain the buyer has *felt the cost of* and connected to consequences. |
| **C** | **Competition** | Every alternative, including "do nothing" and internal build. |

> Read MEDDPICC as **MEDDIC + P + I + C**. If someone on the team still says "MEDDIC", treat it as
> the on-ramp to the same standard — do not introduce a third acronym.

The eight scored elements (the vocabulary used everywhere, incl. the TFQ's commercial category and
`/presales:discovery:qualify`):

1. **Metrics**
2. **Economic Buyer**
3. **Decision Criteria**
4. **Decision Process**
5. **Paper Process**
6. **Implicated Pain**
7. **Champion**
8. **Competition**

---

## Recommended discovery sequence

Qualify in this order — each stage earns the right to the next:

1. **Implicated Pain first.** No confirmed, cost-attached pain → no deal. Everything else is premature.
2. **Metrics.** Quantify the pain and the value of solving it — this is what the economic buyer signs against.
3. **Champion, then Economic Buyer.** Who feels the pain and will sell internally; who controls the budget.
4. **Decision Criteria → Decision Process → Paper Process.** What "good" looks like, how they choose, how they buy.
5. **Competition.** Who else is in the room, including status quo and internal build.

---

## Per-element discovery questions

Pick 2–4 per element, tailored to the account. Prioritise 🔴 Unknown / 🟡 weak elements.

### Metrics — quantified impact (ROI, cost, risk, time)
- "What KPIs are you trying to move with this — and where are they today?"
- "Can you put a number on what this problem costs you per month or per year?"
- "How will you measure whether this was a success 12 months in?"
- "What target are you accountable for that this needs to support?"

### Economic Buyer — who controls budget and can sign
- "Who ultimately owns the budget for this, and who signs the contract?"
- "What does that person care most about — cost, risk, growth, compliance?"
- "How does the economic buyer view the ROI case today?"
- "Can we get time with them, and what would earn that meeting?"

### Decision Criteria — what they're evaluating on
- "What are the must-haves vs. nice-to-haves in your evaluation?"
- "Are there non-negotiables that would disqualify a vendor immediately?"
- "How are you weighting price vs. capability vs. delivery risk?"
- "Who set these criteria — and can they still change?"

### Decision Process — the steps, timeline, people
- "Walk me through the steps from here to a signed decision."
- "Who is involved at each stage, and who has a veto?"
- "What's driving the timeline — is there a date this must land by?"
- "What has stalled decisions like this before?"

### Paper Process — procurement, legal, security, contracts
- "Once you've chosen, what does procurement and legal look like?"
- "Is there a security or IT review, and how long does it typically take?"
- "Are you on a standard paper, or will legal want to redline?"
- "What's the realistic gap between 'decision made' and 'contract signed'?"

### Implicated Pain — felt cost, not just a symptom
- "What happens if you do nothing for another 6–12 months?"
- "Who inside the business is most exposed if this isn't fixed?"
- "How is this pain showing up downstream — in other teams, customers, audits?"
- "What made this a priority *now* rather than last year?"

### Champion — advocate with power and will
- "Who inside is pushing for change, and how much influence do they have?"
- "What does a win here do for them personally or professionally?"
- "Can they get us to the economic buyer, and will they sell when we're not in the room?"
- "What would they need from us to make the internal case?"

### Competition — every alternative, including status quo
- "What else are you evaluating, and how do we compare on your criteria?"
- "Is doing nothing / keeping the current system a real option on the table?"
- "Has anyone floated building this in-house?"
- "If you had to choose today, who wins and why?"

---

## Where scoring happens

This skill **gathers**; `/presales:discovery:qualify` **scores**. That command produces the 1–5
per-element score, the /40 total, commit-forecast eligibility (≥28/40 = 70%), the top gaps, and the
recommended next actions. Do not build a second scoring table.

---

## BANT and other frameworks (mapping only)

**BANT** (Budget, Authority, Need, Timeline) and **CHAMP** (Challenges, Authority, Money,
Prioritisation) are earlier qualification frameworks. The PreSales Handbook (ch. 5–6) introduces BANT as the entry-level framework; this kit extends it to MEDDPICC. BANT still appears in some partner/channel
motions and legacy material, but it is **not** the standard in this toolkit and should never be
led with — every BANT element maps into MEDDPICC (Budget→Metrics/Economic Buyer, Authority→Economic
Buyer/Champion, Need→Implicated Pain, Timeline→Decision Process). Use MEDDPICC. The full BANT/CHAMP/
MEDDIC comparison is preserved in `${CLAUDE_PLUGIN_ROOT}/references/Cheat_Sheet_Sales_Discovery.md` for context only.
