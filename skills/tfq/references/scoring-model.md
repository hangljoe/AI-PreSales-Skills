# TFQ Scoring Model — gates, weights, kill-list, verdict logic

The scoring model behind the **TFQ** (the `tfq` skill and `/presales:discovery:tfq`). It turns the
Technical & Functional Qualification described in chapter 9 of *The PreSales Handbook* (9.1 qualify on
the OSD, 9.2 functional and technical components) into a deterministic, gated verdict:
**Invest / Conditional / Pause**. The handbook prescribes no scoring template: the gates, weights,
thresholds and kill-list are the kit's own (kit).

> **The whole point: never over-claim, never round up, never let absence look like a pass.** This model
> is **hybrid and non-compensatory** — a high average can never buy back a failed necessary condition.

> **Weights are PROVISIONAL defaults.** They ship as-is. Calibrate them against 4–6 of your own closed
> deals (won and lost) before treating the thresholds as policy. Every TFQ output must mark the weights
> *"provisional — pending calibration"* so their status is visible.

> **Deterministic inputs.** The per-category questions, per-question weights, the rating→point map, and
> the industry-factor rules live in **`tfq-question-bank.md`** — the TFQ fills them in and **computes**
> each category's `Avg Score`; it does not estimate a 0–1 score. This file governs the gates, verdict
> logic, and floors; `tfq-question-bank.md` governs the question inputs.

---

## 1. Rating → point model

Each question is answered on a scale that maps to points; the max is `weight × 2`.

| Answer scale | Points |
|--------------|--------|
| Yes / good / agree / complex-(integration) / automated & integrated | **2** |
| Don't know / neutral | **1** |
| not really / partial / infrequent | **0.5** |
| No / disagree / definitely not / manual | **0** |
| Users: <10 = 0 · 10–50 = 1 · >50 = 2 | scaled |
| Budget/ARR: below your floor = 0 · around your floor = 1 · clearly above = 2 | scaled |
| Countries / regions: 1 = 0 · 2–10 = 1 · >10 = 2 | scaled |
| Digitalization: Manual = 0 · Legacy = 0.5 · Siloed = 1 · Automated&Integrated = 2 | scaled |
| Lifecycle: incubate/establish = 2 · core = 1 · protect = 0.5 · retire = 0 | scaled |

**Inverted questions** (a "yes" is bad — e.g. "Are there red flags?", "predominantly manual?"): points invert
(Yes = 0, No = 2).

**Per-question:** `Score = points × weight`. `High Score (max) = 2 × weight`.
**Per-category normalized fit (0–1):** `Avg Score = Σ question Score ÷ Σ question High Score`.

A question answered "Don't know", or with no evidence, contributes as **🔴/🟡 unconfirmed** and feeds the
confidence gate (§5) — it is *not* silently scored as a middling pass.

---

## 2. Categories: three hard gates + weighted contributors

`Avg Score` per category is 0–1. Categories split into **necessary-condition gates** and **weighted contributors**.

### Hard gates (necessary conditions — non-compensatory)
| Gate | Provisional weight | Fed by | Calibration origin (kit threshold) |
|------|:------------------:|--------|-----------------------------|
| **Pain Points & Needs** | 2.0 | `critical-business-issue-finder`, FTD + Sales Discovery | Pain Points & Needs (0.75) |
| **Strategic Alignment** | 1.6 | `/presales:account:brief` + your ICP / strategy (× industry factor, §4) | Strategic Alignment (0.65) |
| **Solution / Functional Fit** *(per in-scope product area)* | 1.5 | `capability-mapper` or a requirement-level fit list (OOTB/Config/Dev + must-have) | Solution Specific Area (0.7) |

### Weighted contributors (compensatory — they tune, they don't gate)
| Contributor | Provisional weight | Fed by | Calibration origin (kit threshold) |
|-------------|:------------------:|--------|-----------------------------|
| **Workflow & Process** | 0.9 | `integration-complexity`, FTD | Workflow & Process (0.5) |
| **Technical Requirements** | 0.8 | `integration-complexity` | Technical Requirements (0.65) |
| **Competition & Differentiation** | 0.6 | `competitive-battlecard` | Competition (0.59) |
| **Implementation & Adoption** | 0.5 | `integration-complexity`, Professional Services | Implementation (0.55) |
| **MEDDPICC commercial** *(kit; extends the handbook's BANT, ch. 5)* | 0.5 | **`/presales:discovery:qualify`** | BANT summary (→ renamed) |

> **Deal-worth** ("is the deal worth pursuing?", from a deal review — the handbook's Opportunity Review
> Call, 9.3, run via `/presales:value:orc`) is an **optional low-weight signal** when a review has run —
> provisional weight **0.5**. It is a contributor, never a gate.

**Weighted composite (0–1):**
`weighted = Σ (category Avg Score × weight) ÷ Σ weight`, over all gates **and** contributors that are in play.

---

## 3. Verdict logic (governing model — non-compensatory)

Evaluate in this order; the first matching rule wins.

1. **Auto-PAUSE** — if **any kill-list item** (§6) is true. Hard disqualifier; no score can override.
2. **PAUSE** — if **any gate < 0.30**, OR **≥ 2 gates < 0.50**.
3. **CONDITIONAL** — if **exactly one gate is 0.30 ≤ gate < 0.50**; OR **all gates ≥ 0.50 but weighted < 0.70**;
   OR **any gate rests mostly on unconfirmed 🔴/🟡 evidence** (§5); OR **a Specialist-Required flag is open/unscoped** (§4);
   OR **an in-scope product area has no fit evidence** (§7).
4. **INVEST** — only if **all gates ≥ 0.50 AND weighted ≥ 0.70** AND no open confidence/specialist/fit-evidence block.

Bands are **non-overlapping**: a gate is failing (< 0.30), weak (0.30 ≤ x < 0.50), or passing (≥ 0.50).
A gate at exactly 0.50 **passes** (it is not "weak").

Gate bands (0.30 / 0.50) and the 0.70 composite bar are the **operative model**; the per-category thresholds
in §2 are the **calibration origin**, provisional pending your back-test.

### Multiple product areas
When more than one product area (product, module, or solution line) is in scope, **each passes its OWN
Solution/Functional-Fit gate** — never average across them. If any in-scope area's Solution-Fit gate fails,
the verdict cannot be Invest for that area. Report per-area fit; the deal-level verdict is gated by the
*weakest* in-scope area.

---

## 4. Strategic gate × industry factor

The account brief and your ideal-customer profile (ICP) feed the **Strategic Alignment** gate. If the deal
needs a scarce specialist (an overlay or specialist SC, a partner, or product management) that hasn't been
scoped, surface a **Specialist-Required flag** as a blocking banner.

The **industry factor** (0 / 1 / 2, from your company's industry focus — see `tfq-question-bank.md` §3) is a
**multiplier on the Strategic gate**:

| Industry factor | Multiplier (provisional) | Effect |
|:---------------:|:------------------------:|--------|
| 2 (core focus) | 1.00 | Strategic gate scores at face value |
| 1 (adjacent) | 0.75 | Strategic gate discounted |
| 0 (out of focus) | 0.00 | **Strategic gate = 0 → PAUSE.** A factor-0 industry cannot clear the gate. |

`Strategic gate score = raw Strategic Avg × industry multiplier`.

**Specialist-Required, unscoped → caps at CONDITIONAL** until the specialist scoping is done.

---

## 5. Confidence gating — absence never passes

- **Missing data = 🔴 Unknown.** It is **never scored as a 0-that-averages-away** and **never silently excluded**.
  An unknown on a gate input blocks Invest (caps at CONDITIONAL) until confirmed.
- **A category resting mostly on 🔴/🟡 (unconfirmed) cannot return Invest** — even if the point math looks high.
  **"Mostly unconfirmed" = more than half** of the category's questions (by count) **or** more than half of
  its total High-Score weight rests on 🔴/🟡 answers.
- **An unbacked "fully supported" is not OOTB.** A capability claimed as supported without evidence (a demo,
  documentation, or a product-team confirmation) is treated as 🟡 at best.

### Must-have weighting
Requirements flagged **must-have** carry veto weight inside the Solution/Functional-Fit gate: **a single 🔴 on a
must-have caps the Solution/Functional-Fit gate at 0.49 (max CONDITIONAL), regardless of overall %.** No overall
fit % can lift the gate to the ≥ 0.50 INVEST band while a must-have is 🔴. A 92%-fit deal with one must-have gap
is therefore **not** an Invest. (It caps at CONDITIONAL, not PAUSE — a must-have gap blocks Invest but may be
closeable via configuration or roadmap; PAUSE is reserved for the kill-list and failed/absent gates.) A must-have
that is 🟡/🔵 (config/roadmap, not a hard gap) does not trigger the veto but is surfaced as a risk.

**Materiality & gap breadth (display/ranking, not gate math).** Requirements can be tagged with a **materiality
tier** (🎯 Essential / 🔷 Standard / ▫️ Hygiene) and, for gaps, a **breadth** (Narrow/Broad). These order the
narrative (an Essential + Broad 🔴 headlines; a Hygiene gap is a footnote) but **do not alter the gate
arithmetic**. An Essential + Broad 🔴 that the client didn't explicitly star is proposed as an **inferred
must-have (`⭐?`)**; *once confirmed*, the normal must-have veto applies.

---

## 6. Kill-list — binary auto-PAUSE

Any one of these true ⇒ **Auto-PAUSE**, no scoring. Adapt the examples to your own company's hard limits:

- **Compliance or hosting we cannot meet** — e.g. a certification you don't hold, or an in-country hosting /
  data-sovereignty mandate you can't serve.
- **Deployment model we don't offer** — e.g. on-prem-only when you are SaaS-only.
- **RFP wired for a competitor** (incumbent-locked criteria, single-vendor spec).
- **Sub-threshold deal size** — below your TFQ engagement floor (default guidance: TFQ is for opportunities
  > ~100k ARR; set your own floor).

---

## 7. Functional-Fit gate (the OOTB/Config/Dev split)

The Solution/Functional-Fit gate score is computed from the requirement × capability match — from
`capability-mapper`, an RFX compliance matrix (`/presales:rfp:respond`), or a requirement list the SC rates:

- Each requirement resolves to a fit bucket: 🟢 **OOTB** · 🟡 **Config** · 🔵 **Future/roadmap** · 🔴 **Gap/Unknown**.
- **Functional Fit % (OOTB):** share of requirements met 🟢 out-of-the-box.
- **Config %** and **Dev/Future %:** shares needing configuration or development/roadmap.
- Gate score weights each met requirement: **OOTB ×1.0 · Config ×0.5 · Future/Gap/Unknown ×0.0**, averaged over
  all requirements, then applies the **must-have veto** (§5, caps at 0.49).

### No fit evidence → gate is Unknown (never scored)
If an in-scope product area has **no requirement-level fit evidence**, its **Solution/Functional-Fit gate =
🔴 Unknown**, which **caps the verdict at CONDITIONAL** (§3). Never improvise a fit score without evidence —
that is the exact over-claim this model exists to prevent.

---

## 8. Gate-veto override authority

A gate veto (a Conditional/Pause caused by a failed gate) can be overridden to Invest **only** by a senior
PreSales leader (VP level or your organisation's designated approver) or the equivalent Product Management
leader. The override is recorded on the scorecard with the approver's **name + role + reason** ("strategic
exception"). Weighted contributors carry no veto and need no override.

---

## 9. Living document + write-back

The TFQ is a **living scorecard** — re-run as discovery progresses; unknowns close over time. When a CRM is
connected, the verdict + gate scores can be written back to the opportunity **behind a confirm gate**. The
TFQ is **internal-only** — single neutral-professional styling, **no brand skin**.
