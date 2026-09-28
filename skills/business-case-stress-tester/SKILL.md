---
name: business-case-stress-tester
version: "1.2"
last_updated: 2026-09-28
description: "Pressure-tests an EXISTING business case or ROI model before the customer's finance team does: challenges every assumption, tags each by confidence, surfaces the weakest numbers, builds a conservative scenario and preps the SC for CFO and VP Finance scrutiny. Use on \"stress test this business case\", \"challenge the ROI\", \"CFO prep\", \"what will the CFO challenge\", \"harden this ROI\". Siblings: /presales:value:roi-case (build the case first), /presales:value:pain-to-value (map pains to value). SKIP for building a new ROI case from scratch."
triggers:
  - "stress test this business case"
  - "challenge the ROI"
  - "CFO prep"
  - "pressure test my numbers"
  - "CFO objection prep"
  - "stress test the value case"
  - "test the business case"
  - "harden this ROI"
  - "prepare for finance scrutiny"
  - "what will the CFO challenge"
  - "pressure test the business case"
---

# Business Case Stress Tester

Challenges every assumption in your business case before a CFO does.
Run this before any meeting where finance, procurement, or a sceptical economic buyer will scrutinise the numbers.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **CRM (e.g. Salesforce, HubSpot)** | Pulls deal size, account tier, and any prior ROI discussions logged on the opportunity |
| **Knowledge base (e.g. Confluence, Notion)** | Checks prior approved ROI benchmarks and reference metrics for this industry |

No connections? Paste the business case and any known benchmarks directly.

---

## Step 1 — Intake

Paste the business case, ROI summary, or value model to stress test. If a deal folder is present,
read `04a_roi-case.md` (the output of `/presales:value:roi-case`, which feeds this skill) and
`04_pain-to-value.md` instead of asking. Also provide:
1. **Industry and company size** — determines which assumptions are realistic
2. **Products and modules in scope**
3. **Who will be in the room** — CFO / VP Finance / procurement lead / CEO / board member
4. **The number they are most focused on** — payback period, total value, NPV, cost reduction %
5. **Any pushback already received** on the numbers

---

## Step 2 — Assumption audit

For every quantified claim, identify the assumption behind it and challenge it.

| Claim | Assumption behind it | Challenge question | Defensibility |
|-------|---------------------|-------------------|---------------|
| [e.g. "30% reduction in manual processing time"] | [Assumes current process takes X hours/day across Y FTEs] | "What's your current baseline? Is X hours the worst case or the average?" | 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown |
| [e.g. "$450K annual saving"] | [Assumes $X loaded labour cost per FTE] | "What loaded cost did you use for the FTEs?" | |
| [e.g. "12-month payback"] | [Assumes full deployment by month 4, full ramp by month 8] | "What if deployment takes 6 months longer?" | |

**Defensibility key:**
Tags follow the kit standard (`${CLAUDE_PLUGIN_ROOT}/skills/confidence-tagger/references/confidence-tagging.md`):
- 🟢 Confirmed — the customer supplied or confirmed the number (their baseline, their data, a named person on a dated call)
- 🟡 Inferred — benchmarked against a reference customer or published industry data, or an estimate with a stated basis; not yet confirmed for this account
- 🔴 Unknown — no stated source or basis; must be replaced or removed before going to finance

Benchmarks are 🟡, never 🟢: a finance team will ask "is that *our* number?" Turning 🟡 into 🟢
means getting the customer to confirm the baseline.

Any 🔴 item in a CFO meeting is a liability. Replace or remove before the meeting.

---

## Step 3 — CFO attack scenarios

Run through the five most common finance team challenges against this specific case.

```
CFO CHALLENGE SCENARIOS

1. "Your baseline numbers are wrong."
   Vulnerable point in this case: [What is most exposed to this attack]
   Prepared response: [How to defend or pre-empt it]

2. "We can get this cheaper from [competitor / build internally]."
   Vulnerable point: [Total cost comparison gap in this case]
   Prepared response: [Build vs. buy risk — time, talent, maintenance, opportunity cost]

3. "The ROI only works if everything goes perfectly."
   Vulnerable point: [Which assumptions are most sensitive to delay or partial adoption]
   Prepared response: [Conservative scenario showing downside is still positive]

4. "We've seen ROI claims like this before and they never materialise."
   Vulnerable point: [Credibility of the benchmark and reference evidence]
   Prepared response: [Named reference customer + specific audited outcome]

5. "The payback period is too long for our investment criteria."
   Vulnerable point: [Payback period in this case vs. typical hurdle rate of 12–24 months]
   Prepared response: [How to reframe, phase the investment, or lead with quick wins]
```

---

## Step 4 — Sensitivity analysis

Show what happens when key assumptions are stressed.

| Scenario | Assumption changed | Payback period | Total value |
|----------|--------------------|----------------|-------------|
| **Base case** | As built | [X months] | [$Y] |
| **Conservative** | Reduce key metric by 30% | [X months] | [$Y] |
| **Pessimistic** | Reduce key metric by 50%, add 3 months to deployment | [X months] | [$Y] |
| **Customer's own estimate** | Their stated assumption if known | [X months] | [$Y] |

The conservative case must still produce a compelling result. If it doesn't, the base case assumptions need revisiting before this goes to finance.

---

## Step 5 — Hardened version recommendations

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS CASE STRESS TEST — [Account] | [Products]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall assessment: Strong / Credible / Fragile / Needs rework

Strongest claims — lead with these:
  1. [Claim] — why it's strong
  2. [Claim]

Weakest claims — replace or remove:
  1. [Claim] — why it's vulnerable + what to substitute
  2. [Claim]

Changes to make before the CFO meeting:
  [ ] Replace [assumption] with [benchmarked alternative]
  [ ] Add conservative scenario to show the downside is still positive
  [ ] Get AE approval to name [reference customer] for [specific metric]
  [ ] Remove [claim] — not defensible without a customer baseline

Top 3 CFO questions to prepare for:
  1. [Question] → [Prepared response]
  2. [Question] → [Prepared response]
  3. [Question] → [Prepared response]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Quality checklist

- [ ] Every 🔴 assumption has been replaced or removed
- [ ] Benchmark-based numbers tagged 🟡, not 🟢; the lead value claim is customer-confirmed 🟢 where possible
- [ ] A conservative scenario exists and still produces a positive outcome
- [ ] At least one named reference customer is approved for the lead value claim
- [ ] Payback period has been checked against typical enterprise hurdle rates (12–24 months)
- [ ] Cost side checked against the hidden/indirect cost list in `/presales:value:roi-case` (training, downtime, integration, internal time); a missing cost is a CFO attack point (handbook ch. 10)
- [ ] A one-sentence response is prepared for each CFO challenge scenario

---

## Handoff

- Case needs rebuilding (missing drivers, costs or multi-year view) → `/presales:value:roi-case`
- Pains not yet mapped to value → `/presales:value:pain-to-value`
- Price pushback expected in the meeting → pricing-positioning
