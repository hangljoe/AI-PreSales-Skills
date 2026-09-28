# Deal Pre-Qualification — Readiness Model  *(authoritative)*

How `deal-prequal` decides whether a deal's qualification is **complete enough to justify SC time**, and
how it bands each deal. This is a **readiness / completeness** read — deliberately softer than the TFQ,
which owns the scored *Invest / Conditional / Pause* gate. Nothing here returns a hard "no".

Confidence semantics are constant with the rest of the library: **🟢 Confirmed** (documented / sourced) ·
**🟡 Partial** (mentioned but unverified) · **🔴 Missing** (no evidence). **Absence is never a pass.**

---

## 1. MEDDPICC completeness map (the core)

MEDDPICC is the single qualification language (BANT is legacy — see §2). Assess each of the 8 elements and
tag it 🟢 / 🟡 / 🔴. "Filled" means real evidence, not a populated CRM field with a guess in it.

| # | Element | 🟢 Confirmed means… | 🟡 Partial means… | 🔴 Missing means… |
|---|---------|--------------------|-------------------|-------------------|
| 1 | **Metrics** | A quantified pain or value target the customer owns (e.g. "$2M / yr lost to manual rework") | A number exists but is our estimate, or unquantified "significant" | No metric of any kind |
| 2 | **Economic Buyer** | Named, and we have (or have a path to) access | Named but not accessed / not confirmed as the EB | Unknown who signs |
| 3 | **Decision Criteria** | We know the criteria the customer will judge on | Some criteria inferred, not confirmed | No idea how they'll choose |
| 4 | **Decision Process** | Steps + approvers + rough dates mapped | Vague sense of process | Unknown |
| 5 | **Paper Process** | Legal / procurement / security path understood | Assumed "standard" without checking | Unknown |
| 6 | **Implicated Pain** | Customer-stated pain tied to a **compelling event** | Pain stated but no consequence / no event | No confirmed pain |
| 7 | **Champion** | Identified **and** tested (sells for us when we're not there) | A friendly contact, untested | None identified |
| 8 | **Competition** | Landscape + incumbent known | Rumoured / partial | Unknown |

**Completeness score** = a simple, transparent count for the leader, e.g. `MEDDPICC 5/8 confirmed
(2 partial, 1 missing)`. Show the count; never hide a 🔴 by averaging it away.

---

## 2. BANT — legacy fallback only

If a deal has **no MEDDPICC** at all (older opp, light intake), map what exists onto BANT
(**B**udget / **A**uthority / **N**eed / **T**imeline) so the leader still gets a read — then explicitly
note: *"Mapped from BANT; MEDDPICC is our standard — the drafted questions move it onto MEDDPICC."* Never
present BANT as equivalent; it's a bridge, and closing the gap toward MEDDPICC is itself a recommendation.

- Budget → informs Metrics + Paper Process · Authority → Economic Buyer · Need → Implicated Pain +
  Metrics · Timeline → Decision Process + compelling event.

---

## 3. Intake / SC-request form check  *(the opportunity checklist is the spine)*

Separately from MEDDPICC, check the **internal SC-request / intake** that triggered the ask. The concrete
artefact here is the team's **opportunity checklist** (`data-sources.md` §1), if it has one — a per-opp list
that enumerates the links a healthy deal should have, e.g. **OSD · deal folder · CRM opportunity ·
collaboration channel · RFX · Business Requirements**. Use its populated-vs-blank state as a fast completeness proxy:

- **How many checklist links are populated?** A checklist with half its links blank is a strong "a few gaps"
  cue — cheap to read, cheap to ask about.
- Is the SC-request actually filled, or a one-line stub ("customer wants a demo")?
- Does it name the product(s) in scope, the ask (demo / PoC / OSD), a rough ARR band, and a date?
- Is there a stated business reason, or only a feature request?

A thin checklist / intake is a common, fixable gap — and one of the most polite things to ask an AE to
complete ("could you finish the opportunity checklist so I can line up the right SC support?").

---

## 4. History & momentum read

Pull the deal's trajectory (CRM activity, folder timeline, prior outputs) and read it **gently** —
context for the leader, never an accusation:

- **Stage vs. age** — has it sat in one stage far longer than typical? (Flag, don't scold.)
- **Last activity** — days since the last logged touch. `quiet ~30+ days` = a soft "worth a nudge" flag.
- **Prior SC investment** — earlier demos / POCs / TFQ / OSD on this deal? (Re-investment raises the bar.)
- **Prior TFQ verdict** — if one exists, carry its verdict + open gaps forward.
- **Momentum signal** — one of `warming` / `steady` / `quiet` / `stalled`, with the one fact behind it.

History **colours** the band and the tone of the drafted message (a warming deal gets an energised nudge;
a quiet one gets a light, no-pressure check-in) but does not by itself decide readiness — §5 does.

---

## 5. Banding (the soft verdict)

Readiness rests on the **foundation trio** plus overall completeness. The foundation trio is the
make-or-break, mirroring the TFQ's Pain gate and basic commercial viability:

- **Pain / compelling event** — a confirmed, customer-owned pain (MEDDPICC #6) 🟢/🟡/🔴
- **Economic Buyer** — identified (MEDDPICC #2) 🟢/🟡/🔴
- **Requirement clarity** — enough of what they need that we'd know what to build/demo 🟢/🟡/🔴

Apply the **first matching** rule. Wording is fixed and encouraging — never emit "NO" or "PAUSE":

1. 🔵 **Too early — key unknowns** — **Pain is 🔴**, OR Economic Buyer is 🔴, OR Requirement clarity is 🔴,
   OR MEDDPICC completeness ≤ ~3/8. *The deal needs a little more discovery before SC time is well spent.*
   → route to `discovery-sales` / `discovery-ftd`; drafted questions frame the quickest path to investable.
2. 🟡 **A few gaps to close** — foundation trio all at least 🟡 and none 🔴, but **2–3 specific elements**
   still 🟡/🔴 (typically MEDDPICC ~4–6/8). *Nearly there — a couple of answers unlock it.*
   → send the drafted questions; re-run when they land.
3. 🟢 **Ready to progress** — foundation trio **all 🟢** (Pain confirmed, EB identified, requirements clear)
   and MEDDPICC broadly complete (~7–8/8, no missing must-know). *Strong enough to invest SC time.*
   → hand to `/presales:discovery:tfq` for the scored gate.

Always add the one-line **why** naming the binding element(s), and — for 🟡/🔵 — the **single highest-value
question** that would move the band. This is a readiness read; state plainly that the scored invest verdict
is the TFQ's, downstream.

---

## 6. Indicative functional-fit read (optional)

Only when concrete requirements exist, borrow `capability-mapper` (or a requirement-level fit list) for a
**directional** read of how much looks out-of-the-box vs. config vs. gap for the lead product. Rules:

- Label it **"indicative — not the scored gate"** everywhere it appears.
- A product area with no requirement-level evidence stays 🔴 Unknown; never rate it on gut feel.
- Never let this read upgrade a band on its own — thin requirements mean the honest output is "can't yet
  read fit; that's a gap to close," which usually points the deal to 🔵 or 🟡.

---

## 7. Hard rules (carry into every output)

1. **Softer than the TFQ, on purpose.** Readiness + a path forward — never a scored kill.
2. **Absence never rounds up.** A 🔴 is always visible and is the reason to ask, not a silent assumption.
3. **History informs tone, not the verdict.** Momentum colours the nudge; §5 decides the band.
4. **Completeness is counted, not averaged.** Show `X/8`; a single critical 🔴 (Pain/EB) can hold a deal
   at 🔵 even with a high count — say which element binds.
5. **BANT is a bridge, not a standard.** Map it if that's all there is, then steer toward MEDDPICC.
