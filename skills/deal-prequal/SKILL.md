---
name: deal-prequal
version: "1.2"
last_updated: 2026-09-28
description: "Leader tool (handbook ch. 22, resource allocation): a readiness sweep across one or many deals before the TFQ. Checks whether the MEDDPICC foundation and SC-request checklist justify SC time, reads deal momentum, returns a warm 3-band call (Ready / A few gaps / Too early) plus ready-to-send AE follow-ups and a portfolio board. Run it with /presales:deal-prequal, e.g. \"readiness sweep\", \"which deals are ready for SC time\", \"prequal my pipeline\". Siblings: /presales:discovery:tfq (the scored Invest / Conditional / Pause gate for one deal). SKIP for qualifying a single deal as an IC (/presales:discovery:qualify)."
triggers: []
disable-model-invocation: true
---

# Deal Pre-Qualification Readiness  *(leader-only)*

A pre-qualification **readiness sweep** for PreSales leaders. Deciding where scarce SC time goes is one
of the core leadership challenges in chapter 22 of *The PreSales Handbook* (resource allocation, 22.2; team
sizing, 22.9); this tool makes that call evidence-based and kind. Point it at one deal or a
whole list; for each it answers a gentler question than the TFQ: **is the qualification even complete
enough for us to invest SC time — and if not, what do we still need to know?** It then drafts the
**warm, non-pushy messages** a leader can send the AE / sales director to close those gaps.

> **This skill is slash-invoked and meant for PreSales leaders.** `disable-model-invocation: true`
> keeps it from auto-activating, so it stays out of ordinary users' way. It runs when someone types
> **`/presales:deal-prequal`**. It is listed openly in the README as a leader tool. There is no
> role-based access control; "for leaders" describes who it is built for, not a secret.
>
> It is for **PreSales leaders** deciding where SC time goes, not for individual-contributor SCs
> qualifying their own deal (they use `/presales:discovery:qualify` and the TFQ). Other skills do not
> auto-route here. It *consumes* other skills (e.g. `capability-mapper`) as feeders.

> **It is NOT a hard yes/no and NOT the TFQ.** It returns a **soft, encouraging 3-band readiness call**
> and a to-do to make the deal investable. The scored *Invest / Conditional / Pause* gate is the
> **TFQ's** job — this tool runs **upstream** of it and hands Ready deals across.

---

## What makes this tool different (tone is the feature)

Every gap this tool surfaces becomes a **collaborative ask, never a reprimand.** The default posture is
*"help me help you get this deal the SC support it deserves"* — appreciative, specific, easy to say yes
to. A leader must be able to forward the drafted message **as-is** and have the AE feel backed, not
audited. See `references/question-drafting.md` — it governs every word that goes outward.

---

## Connected Tools & knowledge data points

This tool is **knowledge-first** — it grounds every read in the team's PreSales knowledge base, of which the
RFX is only one input. The full, extensible registry (paths, what each contributes, how to reach it) lives
in **`references/data-sources.md`** — read it before gathering inputs. In short:

| Source | What it does for you |
|--------|---------------------|
| **Team playbook & opportunity checklist** | The **PreSales playbook** (what "qualified" means; the buying journey *with and without* RFX; handbook chapter 22.5) and, if the team uses one, an **opportunity checklist** — the readiness spine: which of its links (OSD · deal folder · CRM · **RFX** · business requirements) are populated is itself a fast completeness signal. |
| **Deal folders** | The same local library `discovery-transformer` / `osd-scoper` use — per-opp transcripts, discovery summaries, prior OSD/TFQ, business-requirements, and the deal's RFX subfolder. Source of history & momentum. |
| **Response / RFX library (current & historical)** | The current RFX **and historical RFX + Q&A** across prior deals — a **scope-and-answer sense-check** (what's typically in scope, how we've answered before). One input, never the sole basis; a missing RFX is *not* a gap. |
| **Product docs & roadmap** | Ground the **indicative** fit read in shipped-vs-roadmap capability (release notes, a roadmap tool such as Aha! or Productboard). Roadmap-only ≠ confirmed fit. |
| **CRM** (e.g. Salesforce or HubSpot, if connected) | Opportunity, MEDDPICC fields, SC-request record, stage, amount, close date, age, last-activity, notes — the commercial spine of the completeness map and history read. |
| **Email & documents** (e.g. Microsoft 365 or Google Workspace, if connected) | Related emails, invites, and documents to infer what's actually been qualified vs. a field left blank. |
| **`capability-mapper`** *(sibling skill)* | The **indicative** functional-fit read when requirements exist — labelled indicative; the scored gate stays with the TFQ. |

**No connections?** The skill works the same — the leader pastes what they have per deal and everything
unstated is honestly tagged 🔴 Unknown (which is often exactly the finding: the qualification is thin).
The data-point set is **expected to grow** — keep `references/data-sources.md` current as sources are added.

---

## Step 0 — Scope the sweep

1. **Which deals?** Accept a single opportunity, a pasted list, or an offer to sweep a set (e.g. "all my
   team's open opps > 100k", "these five accounts", a CRM report). Confirm the list before running.
2. **Gather the knowledge data points per deal** — knowledge-first, per **`references/data-sources.md`**,
   degrading gracefully. The RFX is **one element**, not the starting point:
   - the **opportunity checklist** for the opp, if the team uses one (which links are populated = fast
     completeness signal) and the **PreSales playbook** for what a qualified deal should have at this stage;
   - the **CRM** opp + MEDDPICC fields + SC-request record + activity history (if connected);
   - the **deal folder** — transcripts, discovery summaries, prior OSD/TFQ, business requirements;
   - **RFX (current + historical) & Q&A** from the response library / deal RFX subfolder — as a scope-and-answer
     sense-check, not a prerequisite (many deals have no RFX);
   - **product docs & roadmap** for the indicative capability read; related **emails/documents**;
   - whatever the leader pastes.
   Resolve any folder path (response library, deal folder) config → **ask** — don't assume a path.
3. **Never block on missing data.** Absent or unreachable evidence is 🔴 Unknown, not an assumption — and an
   honest count of unknowns is itself a valid readiness finding. A missing RFX is normal, not a gap.

---

## Step 1 — Assess readiness per deal

For each deal, build the readiness picture using **`references/readiness-model.md`** (authoritative for
the rubric, the bands, and the history signals). In short:

- **MEDDPICC completeness map** — the 8 elements, each 🟢 Confirmed (documented) / 🟡 Partial (mentioned,
  unverified) / 🔴 Missing. This is the core of the read. (BANT is a **legacy fallback** only — map it if
  no MEDDPICC exists, then note MEDDPICC is the standard.)
- **Intake / SC-request form** — is the internal request actually filled, or a stub?
- **Foundation trio** (the make-or-break) — is there (a) a confirmed **pain / compelling event**, (b) an
  identified **Economic Buyer**, and (c) **enough requirement clarity** to know what we'd build?
- **History & momentum** — stage vs. age, last-activity recency, prior SC touches, any prior TFQ/OSD, and
  gentle stall flags (e.g. "quiet ~30+ days").
- **Indicative functional read** — only if requirements exist, via `capability-mapper`; label it clearly
  *indicative — the TFQ owns the scored fit gate.*

Confidence-tag **every** input 🟢 / 🟡 / 🔴. Absence never rounds up to a pass.

---

## Step 2 — Band each deal (soft, not a gate)

Assign one of three **encouraging** bands per `references/readiness-model.md` §5. The wording is fixed and
deliberately non-punitive — even the lowest band frames the fastest path forward:

- 🟢 **Ready to progress** — foundation confirmed; route to the TFQ for the scored gate.
- 🟡 **A few gaps to close** — foundation mostly there; 2–3 specific unknowns → send the drafted questions.
- 🔵 **Too early — key unknowns** — pain unconfirmed, or no EB, or no requirements → needs a bit more
   discovery first; drafted questions frame the quickest route to make it investable.

This is a **readiness** read, not the investment verdict — say so. It never returns "PAUSE/NO."

---

## Step 3 — Draft the warm follow-up (per deal that has gaps)

For every 🟡 and 🔵 deal, draft a **ready-to-send message** to the AE / sales leader using
**`references/question-drafting.md`** (authoritative for tone and templates). Each message:

- opens with genuine appreciation / a specific positive about the deal;
- frames the ask as *making the deal stronger*, not filling in paperwork;
- asks the **2–3 most valuable** gap-closing questions (not the whole list — prioritise);
- gives an easy out and a warm, partnership close.

Also surface the **underlying gap list** (the specific unknowns) beneath each drafted message so the
leader can see what the questions are closing. Offer email **and** a shorter chat variant (e.g. Teams or Slack).

---

## Step 4 — Output the portfolio board (HTML) + markdown fallback

Render **both**, per **`references/portfolio-board.md`**:

1. **HTML portfolio readiness board** (primary) — one self-contained file, neutral internal styling
   (**no brand skin** — same family as the TFQ dashboard): a portfolio roll-up (count by band + a table:
   deal · band · MEDDPICC completeness bar · top gap · momentum), then a **per-deal card** each with the
   readiness chip, the 8-element MEDDPICC strip, the history line, the indicative fit read, the gap list,
   and the **drafted message** in a copy-ready block. Write to `output/Deal_Prequal_<Date>.html`
   (Claude Code) or `/mnt/user-data/outputs/…` (Claude.ai), then present it.
2. **Markdown fallback** (always, in-terminal) — the same portfolio table + per-deal readiness + gaps +
   drafted messages, plus the path to the HTML file.

---

## Step 5 — Hand off

- 🟢 **Ready** deals → *"Want me to run `/presales:discovery:tfq` on <deal> for the scored invest gate?"*
- 🟡 **A few gaps** → send the drafted questions; re-run this sweep once answers land (it's a living read).
- 🔵 **Too early** → route to `discovery-sales` (commercial) and/or `discovery-ftd` (technical) to build
  the missing foundation, then come back.

**CRM write-back** (if connected): confirm-gated only — offer to log the readiness band + top gaps
to the opportunity; never write silently.

---

## Hard rules

1. **Never blunt, never pushy.** Every outward word is collaborative and appreciative — a leader forwards
   the draft unedited without anyone feeling audited. Tone is the product.
2. **Soft verdict only.** Three encouraging bands + a path forward — never "PAUSE/NO." The scored gate is
   the TFQ's, downstream.
3. **Absence never looks like a pass.** Unstated = 🔴 Unknown, visible, and the reason to ask — not a guess.
4. **Indicative, not the gate.** The capability-mapper read here is directional; the TFQ owns the scored
   functional-fit gate. Say so wherever fit appears.
5. **Internal styling only.** Neutral palette; do **not** load the `brand` registry for this output.
6. **Slash-invoked, built for leaders.** Model invocation is disabled; other skills do not auto-route here.

---

## Quality checklist

- [ ] Deal list confirmed before running; every input source that exists was checked
- [ ] MEDDPICC completeness map built for each deal; every element tagged 🟢/🟡/🔴
- [ ] Foundation trio (pain · EB · requirement clarity) explicitly assessed
- [ ] History & momentum read included, with gentle (not alarmist) stall flags
- [ ] Each deal banded with the fixed, encouraging 3-band wording — no "NO/PAUSE"
- [ ] A ready-to-send, warm message drafted for every 🟡/🔵 deal, asking only the top 2–3 questions
- [ ] HTML portfolio board + markdown fallback both produced; neutral styling, no brand skin
- [ ] Handoff offered (Ready → TFQ; Too early → discovery)

---

## Chain

Upstream of the gate: **`deal-prequal`** (this readiness sweep — leader-only) → `/presales:discovery:tfq`
(the scored invest gate) → `/presales:rfp:respond` or `osd-scoper`. Feeds on the same discovery signals as
the TFQ (`discovery-sales`, `discovery-ftd`, `critical-business-issue-finder`, `/presales:discovery:qualify`)
and borrows `capability-mapper` for an indicative fit read. Re-run after each AE reply — the
readiness picture is a living read and unknowns should close over time.

For the team-level view beyond one sweep (demo-to-close rate, win rates, time allocation), leaders
use the sibling `presales-metrics` skill.
