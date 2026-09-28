---
name: discovery-sales
version: "1.2"
last_updated: 2026-09-28
description: "Commercial Sales Discovery (handbook ch. 5–6) for any B2B deal, anchored on MEDDPICC (the kit's extension of the handbook's BANT): decides whether the deal is real and worth pursuing (economic buyer, decision and paper process, implicated pain, champion, competition, metrics) and hands numeric scoring to /presales:discovery:qualify. Use on \"sales discovery\", \"qualify this deal commercially\", \"is this deal real\", \"MEDDPICC discovery\". Siblings: discovery-ftd (functional and technical deep-dive: how the solution fits), /presales:discovery:qualify (score the MEDDPICC gaps), tfq (the SC-investment gate). SKIP for building technical question sets or product scope."
triggers:
  - "sales discovery"
  - "qualify this deal commercially"
  - "MEDDPICC discovery"
  - "is this deal real"
  - "qualify the opportunity"
  - "commercial qualification"
  - "run MEDDPICC"
  - "MEDDIC discovery"
---

# Sales Discovery (MEDDPICC)

The **commercial** discovery skill — the conversation that decides whether a deal is *real and
worth pursuing*, anchored on **MEDDIC → MEDDPICC**.

> **Where this sits among the "qualify" tools** (four tools, distinct axes — don't confuse them):
> - **Sales Discovery (this skill)** — *should we pursue it **commercially**?* Is the deal real and funded? → MEDDPICC.
> - **`capability-mapper`** — *can we do it **functionally**?* Customer problems mapped to your product's capabilities.
> - **`/presales:discovery:tfq`** — *should we commit SC resources?* Technical & Functional Qualification (handbook chapter 9).
> - **Functional Technical Discovery (`discovery-ftd`)** — *how do we **scope** it technically?* (triggers "FTD", "functional technical discovery").
>
> All use **MEDDPICC** as the single qualification language. The handbook teaches BANT (chapters 5–6);
> this kit extends it to MEDDPICC. For functional coverage go to `capability-mapper`;
> for the resource-commit decision go to `/presales:discovery:tfq`; use this skill for the commercial MEDDPICC conversation.

### Which verdict when?

The kit has four verdict scales. They answer different questions, so never translate one into another.

| Scale | Tool | Question it answers | When |
|-------|------|---------------------|------|
| Pursue / Conditional / Qualify-out | this skill | Is the deal commercially real and worth pursuing? | After a sales discovery conversation |
| X/40, commit-eligible at ≥28 | `/presales:discovery:qualify` | How complete is MEDDPICC, and can the deal be commit-forecast? | Any time; feeds this verdict and the TFQ |
| Ready / A few gaps / Too early | `deal-prequal` (leader only) | Across the pipeline, which deals are ready to request SC time? | Portfolio sweep before TFQs |
| Invest / Conditional / Pause | `tfq` | Should we commit significant SC time (demo prep, PoC, OSD)? | Provisional after discovery; re-run on the OSD |

The /40 informs the Pursue verdict but doesn't decide it. A high score without confirmed Implicated Pain is still Conditional.

This skill runs the qualification *conversation* (what to ask, in what order, per MEDDPICC element)
and then **hands the numeric scoring to `/presales:discovery:qualify`** — it does not re-implement
scoring. Think of it as: *this skill gathers, `qualify` scores.*

---

## Connected Tools (optional)

| Tool | What it does for you |
|------|---------------------|
| **CRM** (e.g. Salesforce or HubSpot, if connected) | Pre-populates MEDDPICC fields, opportunity stage, deal value, contacts by role, and close date, so the conversation starts from what's already known and targets the gaps (Step 1) |

No connections? The skill asks for the same context manually — same output quality.

---

## ALWAYS READ THIS FILE FIRST

```
Read: ${CLAUDE_PLUGIN_ROOT}/skills/discovery-sales/references/meddpicc.md
```

It holds the MEDDIC→MEDDPICC framework, per-element discovery questions, and the BANT mapping.

---

## Step 1 — Intake

Collect (ask only what isn't already provided or pullable from your CRM):

| Field | Required / Optional |
|-------|---------------------|
| **Account / opportunity name** | Required — used for research and the qualification summary |
| **Deal context** | Required — paste CRM notes, prior call summary, or the opportunity description |
| **Stage / close date** | Optional — from your CRM if connected |
| **What's known already** | Optional — any MEDDPICC element already confirmed, so we don't re-ask |
| **Mode** | *Live prep* (question plan to run the call) or *Post-call qualification* (score what we learned) — default: ask |

If a CRM is connected, crawl the opportunity first (MEDDPICC fields, contacts by role, value,
stage, activity history) and mark elements already 🟢 Confirmed so the plan targets only the gaps.

---

## Step 2 — Run the MEDDPICC conversation

Load `references/meddpicc.md`. Frame MEDDPICC as **MEDDIC extended**: MEDDIC (Metrics, Economic
Buyer, Decision Criteria, Decision Process, Identify Pain, Champion) **+ P**aper process **+ I**mplicated
pain depth **+ C**ompetition — the on-ramp is MEDDIC, the standard is MEDDPICC.

For each of the eight elements, generate **2–4 tailored discovery questions** drawn from
`meddpicc.md`, personalised to the account and this deal's context. Prioritise the elements that are
🔴 Unknown or 🟡 weak — do not spend questions on elements already 🟢 Confirmed.

Sequence guidance (from `meddpicc.md`):
1. **Implicated Pain** first — no confirmed pain, no deal.
2. **Metrics** — quantify the pain and the value of solving it.
3. **Champion + Economic Buyer** — who feels it, who funds it.
4. **Decision Criteria + Decision Process + Paper Process** — how the buy happens.
5. **Competition** — who else is in the room and why.

**Lead with MEDDPICC, not BANT.** The handbook teaches BANT (chapters 5–6) and this kit extends it
to MEDDPICC. If the user asks for BANT, offer it only as a mapping onto MEDDPICC (in `meddpicc.md`).

---

## Step 3 — Score with `/presales:discovery:qualify`

Once the conversation content exists (either the plan's expected answers or the post-call notes),
**hand off to the scorer** — do not build a second scoring table here:

> Run `/presales:discovery:qualify` with the assembled MEDDPICC context to produce the 1–5 per-element
> score, the /40 total, commit-forecast eligibility (≥28/40), the top gaps, and the next 3 actions.

If the command isn't available in the surface, reproduce its scoring rubric from
`commands/discovery/qualify.md` — but the command is the source of truth for scoring.

---

## Step 4 — Output

### Output A — Qualification brief (always)

```
## Sales Discovery — [Account/Opportunity] | [Date]

### Verdict
[Pursue / Conditional / Qualify-out] — one sentence why.

### MEDDPICC snapshot (gathered here; scored by /presales:discovery:qualify)
| Element | What we know | Confidence | Gap → next question |
|---------|-------------|------------|---------------------|
| Metrics | | 🟢/🟡/🔴 | |
| Economic Buyer | | | |
| Decision Criteria | | | |
| Decision Process | | | |
| Paper Process | | | |
| Implicated Pain | | | |
| Champion | | | |
| Competition | | | |

### Top 3 gaps to close next
1.
2.
3.

### Recommended next step
[One specific, owner-assigned action.]
```

### Output B — Score (via the qualify command)

The /40 score, eligibility flag, and prioritised actions come from `/presales:discovery:qualify`.
Attach or summarise its output beneath the brief.

Confidence-tag every assertion: 🟢 Confirmed from CRM/call · 🟡 Inferred · 🔴 Unknown.

---

## Quality checklist

- [ ] MEDDPICC framed the whole conversation; BANT appears only as a mapping, and only if the user asked
- [ ] Questions were tailored to the account — no generic element-by-element boilerplate
- [ ] Elements already 🟢 Confirmed were not re-asked
- [ ] Scoring was handed to `/presales:discovery:qualify`, not duplicated here
- [ ] Every assertion is confidence-tagged (🟢/🟡/🔴)
- [ ] The verdict and a single owner-assigned next step are stated explicitly
