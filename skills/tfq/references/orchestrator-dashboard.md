# TFQ — Orchestrator Dashboard & Cold-Start Spec

How the TFQ renders its result and how it behaves when run **cold** (no feeder skills run yet).
The TFQ is the **consolidation gate**: it rolls up the outputs of the account brief + ICP (strategic),
capability-mapper or requirement-level fit (functional), integration-complexity (technical), the discovery flow
(pain + MEDDPICC commercial) and competition/deal review into **one gated verdict**. This file makes
that consolidation **visual** and makes a **cold run still useful**.

**Authoritative for presentation + cold-start only.** All gates, weights, thresholds and verdict
logic still come from `${CLAUDE_PLUGIN_ROOT}/skills/tfq/references/scoring-model.md`
and `tfq-question-bank.md`. This file never redefines a number — it lays them out.

> **Internal-only.** Neutral professional styling, **no brand skin** — the TFQ is an internal
> scorecard, not a customer deliverable. Do **not** load the `brand` registry for this dashboard.

---

## Part A — Cold-start: always produce a meaningful read

The TFQ consumes feeders. Run it before any feeder exists and every gate is 🔴 Unknown, which
(correctly) caps the verdict — but an empty skeleton helps no one. So **detect the cold run and
gather a minimum viable signal yourself.**

### A1. Detect the cold run
Before scoring, check what feeder evidence is actually present (pasted outputs, prior skill runs in
this session, CRM fields, files in the deal folder). If **two or more gates have no feeder
input at all**, treat it as a **cold / thin run**.

### A2. Quick intake (≈6 questions → provisional read)
On a cold/thin run, ask this compact set in one message, then score. **Everything gathered here is
🟡 Inferred, never 🟢 Confirmed** — intake answers are the SC's belief, not sourced evidence.

1. **Opportunity** — name, and rough ARR band (`<100k` / `100–500k` / `>500k`).
2. **Product area(s) in scope** — which of your products / modules? *(drives per-area lanes and fit-evidence detection)*
3. **Pain** — in one line, the customer's top business pain / compelling event. Is it stated by the customer, or your inference?
4. **Industry** — for the ×industry factor (name it, and whether it is core / adjacent / out of focus for your company; see `tfq-question-bank.md` §3).
5. **Fit read** — off the top of your head, how much looks out-of-the-box vs. config vs. gap for the lead product area? Any known **must-have** we can't meet?
6. **Kill-list** — any of: a deployment model we don't offer, compliance or hosting we can't meet, RFP wired for a competitor, sub-threshold deal size? *(any yes ⇒ auto-PAUSE, stop)*

Optional if the SC volunteers them: competition in play, integration landscape, MEDDPICC/qualify score.

### A3. Score the provisional read
- Map intake answers through the **same** `tfq-question-bank.md` rating→points logic — do **not** invent 0–1 scores.
- Tag every intake-derived score **🟡 Inferred**. Per `scoring-model.md` §5, a gate resting mostly on
  🟡/🔴 **cannot return Invest** — so a pure-intake TFQ tops out at **CONDITIONAL by construction**.
  Say this in the hero: *"Provisional — built from SC intake, not feeder evidence. Max attainable
  verdict is Conditional until feeders confirm."*
- The SC's fit read is a belief, not requirement-level evidence: the Solution-Fit gate stays
  **🔴 Unknown** until a requirement-level fit list exists (never let a gut feel pass the gate).

### A4. Route to close the unknowns
Every gate/contributor still on 🔴/🟡 names **the feeder that upgrades it** (see the feeder map in
Part B4). The dashboard's feeder cards double as the run-order to-do list.

---

## Part B — The Orchestrator Dashboard (HTML primary)

**Primary artefact: a single self-contained HTML file** (no external CDN, all CSS inline in one
`<style>` block). A markdown fallback (Part C) always accompanies it in the terminal.

### B0. File naming & delivery (cross-surface)
- **Claude Code:** write to `output/<Opportunity_Sanitised>_TFQ.html` (relative to project root); after
  writing, print the path.
- **Claude.ai:** write to `/mnt/user-data/outputs/<Opportunity_Sanitised>_TFQ.html`; then
  present the file so it renders inline.
- Sanitise: spaces/special chars → underscores (e.g. `Acme_Corp_Analytics`). Re-running **overwrites the
  same filename** — the TFQ is a living scorecard, so the latest dashboard replaces the last.

### B1. Neutral palette (internal — do NOT brand-skin)
```
Canvas       #F1F5F9      Card         #FFFFFF      Border      #E2E8F0
Header band  #0F172A      Ink          #0F172A      Muted ink   #475569
```
**Verdict + traffic-light semantics are CONSTANT** (never recolor):
```
INVEST / pass / Confirmed   green  #1B873F   🟢
CONDITIONAL / Inferred      amber  #B7791F   🟡
Roadmap / future            blue   #2B6CB0   🔵
PAUSE / fail / gap / Unknown red   #C53030   🔴
```
**a11y (required):** every status pairs colour **+ icon + text label** (`🟢 PASS`, `🔴 Gap`) — never
colour alone. Green/red and blue/green are the colour-blind failure pairs.

### B2. Layout — one single-scroll page, max-width 1040px, centered
Sections top-to-bottom:

**1 — Verdict hero (band + card).** Dark header band `#0F172A` with title
`TFQ · <Opportunity> · <Product area(s)> · <Date>` and the subtitle
`internal · weights provisional, pending calibration`. Immediately below, a hero card:
- Large **verdict chip** — INVEST 🟢 / CONDITIONAL 🟡 / PAUSE 🔴 (chip background = verdict colour).
- **Composite meter** 0→1 with the **Invest bar at 0.70 marked** as a labelled vertical line, current value called out numerically.
- One-sentence **why**, naming the binding gate or disqualifier.
- **Kill-list line** — `clear` or `TRIPPED: <which>`.
- If provisional (cold): the *"Provisional — max attainable is Conditional…"* banner (amber strip).
- **Confidence coverage bar** — one stacked bar showing % of scored inputs that are 🟢 / 🟡 / 🔴.

**2 — Gate rail (the necessary conditions).** Three gate cards in a row (wrap on narrow screens):
Pain (2.0) · Strategic × industry (1.6) · Solution / Functional Fit (1.5). Each card:
- Gate name + weight.
- **Horizontal meter 0→1 with the 0.50 pass line marked** (vertical tick). Fill colour = pass green / fail red; if the gate is mostly-inferred, overlay a hatched/amber treatment.
- **Pass/fail badge** (`≥0.50 ✓ PASS` / `✗ FAIL`) + **confidence dot**.
- Note line: Strategic shows `industry factor ×1.0/×0.75/×0.0`; Solution-Fit shows `must-have gaps: none / ⭐🔴 …`.
- If a gate is non-compensatory-failed, add a thin red top border so it reads as verdict-binding.

**3 — Per-product-area Solution-Fit lanes (no averaging).** One lane per in-scope product area. Each lane:
area name · its own Fit meter (0.50 line) · pass/fail · `fit evidence: yes / NONE → 🔴 Unknown`.
Label the **weakest in-scope area** as *"gates the deal verdict"*. Never collapse areas into one average.

**4 — Weighted contributors (tune, don't gate).** Six horizontal bars with weight chips:
Workflow & Process (0.9) · Technical Requirements (0.8) · Competition & Differentiation (0.6) ·
Implementation & Adoption (0.5) · MEDDPICC commercial (0.5) · Deal-worth (0.5, only if a deal review ran).
Bar fill = score; show the numeric score + confidence dot at the end of each bar.

**5 — Feeder chunk grid (the orchestrator view).** A card per feeder — this is the "all the smaller
chunks we bring together" panel. Each card: feeder name, what it feeds, and a **status pill**:
- `🟢 FED` — feeder was run and its output is sourced here.
- `🟡 INFERRED` — value came from cold-start intake, not the feeder.
- `🔴 NOT RUN` — no input; this is a gap in the qualification itself.

Feeder → gate/contributor map (see Part B4). A `🔴 NOT RUN` card shows a one-line **"run this next"**
call-to-action. The grid is both a picture of coverage and the run-order to-do list.

**6 — Gaps to close.** A table: `Gap` · `Owner` · `Next action` · `Closed by (feeder)`. Top 3 first,
then any others. Must-have 🔴 gaps sort to the very top and are highlighted (they cap Solution-Fit).

**7 — Footer / provenance.** Model as-of (`scoring-model.md` version + date) · *"weights provisional,
pending calibration"* · the **gate-veto override** rule (senior leader only, name+role+reason) · traffic-light
legend · *"internal scorecard — neutral styling, no brand skin."*

### B3. Reusable CSS + component markup
Drop this `<style>` block in `<head>` and reuse the component snippets so every run looks the same.

```html
<style>
  :root{
    --canvas:#F1F5F9; --card:#FFF; --border:#E2E8F0; --band:#0F172A;
    --ink:#0F172A; --muted:#475569;
    --pass:#1B873F; --warn:#B7791F; --future:#2B6CB0; --fail:#C53030;
  }
  *{box-sizing:border-box} 
  body{margin:0;background:var(--canvas);color:var(--ink);
    font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
  .wrap{max-width:1040px;margin:0 auto;padding:0 20px 48px}
  .band{background:var(--band);color:#fff;padding:22px 20px;margin-bottom:20px}
  .band h1{margin:0;font-size:20px;font-weight:650}
  .band .sub{color:#94A3B8;font-size:13px;margin-top:4px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:10px;
    padding:20px;margin-bottom:16px}
  .grid{display:grid;gap:16px}
  .g3{grid-template-columns:repeat(3,1fr)} .g2{grid-template-columns:repeat(2,1fr)}
  @media(max-width:720px){.g3,.g2{grid-template-columns:1fr}}
  .chip{display:inline-block;padding:6px 14px;border-radius:999px;color:#fff;
    font-weight:700;letter-spacing:.02em}
  .chip.invest{background:var(--pass)} .chip.cond{background:var(--warn)}
  .chip.pause{background:var(--fail)}
  /* meter: 0..1 fill + threshold tick */
  .meter{position:relative;height:14px;border-radius:7px;background:#E2E8F0;overflow:hidden}
  .meter>span{display:block;height:100%;border-radius:7px}
  .meter .fill-pass{background:var(--pass)} .meter .fill-fail{background:var(--fail)}
  .meter .fill-warn{background:var(--warn)}
  .tick{position:absolute;top:-4px;bottom:-4px;width:2px;background:#0F172A}
  .tick .lbl{position:absolute;top:-16px;left:50%;transform:translateX(-50%);
    font-size:10px;color:var(--muted);white-space:nowrap}
  .badge{font-size:12px;font-weight:700;padding:2px 8px;border-radius:6px}
  .badge.pass{background:#DCFCE7;color:var(--pass)} .badge.fail{background:#FEE2E2;color:var(--fail)}
  .dot{display:inline-block;width:9px;height:9px;border-radius:50%;vertical-align:middle}
  .dot.c{background:var(--pass)} .dot.i{background:var(--warn)} .dot.u{background:var(--fail)}
  .pill{font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px}
  .pill.fed{background:#DCFCE7;color:var(--pass)} .pill.inf{background:#FEF3C7;color:var(--warn)}
  .pill.no{background:#FEE2E2;color:var(--fail)}
  table{width:100%;border-collapse:collapse;font-size:14px}
  th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--border);vertical-align:top}
  th{color:var(--muted);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.03em}
  .note{color:var(--muted);font-size:13px} .binding{border-top:3px solid var(--fail)}
  .stack{display:flex;height:14px;border-radius:7px;overflow:hidden}
  .stack>i{display:block;height:100%}
  .prov{border-color:#DDD;background:#F8FAFC;font-size:13px;color:var(--muted)}
</style>
```
Component snippets (fill the `--` values / classes from the scored data):

```html
<!-- gate meter: value=.63 → left tick at 50%, fill green because ≥.50 -->
<div class="meter"><span class="fill-pass" style="width:63%"></span>
  <div class="tick" style="left:50%"><span class="lbl">0.50 pass</span></div></div>

<!-- composite meter with the 0.70 Invest bar -->
<div class="meter"><span class="fill-warn" style="width:63%"></span>
  <div class="tick" style="left:70%"><span class="lbl">0.70 invest</span></div></div>

<!-- confidence coverage stacked bar (e.g. 20% confirmed / 55% inferred / 25% unknown) -->
<div class="stack"><i style="width:20%;background:var(--pass)"></i>
  <i style="width:55%;background:var(--warn)"></i><i style="width:25%;background:var(--fail)"></i></div>

<!-- feeder chunk card -->
<div class="card"><strong>capability-mapper</strong>
  <span class="pill inf">🟡 INFERRED</span>
  <div class="note">Feeds Solution / Functional-Fit gate. Run it to confirm OOTB/Config/Dev.</div></div>
```

**Rendering rules:** gate meter fill is **green when ≥0.50, red when <0.50** (amber-hatched only to
signal mostly-inferred); the 0.50 tick sits at `left:50%` on every gate meter; the composite meter's
tick sits at `left:70%`. Confidence dots: `c`=🟢 `i`=🟡 `u`=🔴.

### B4. Feeder → gate/contributor map (drives the chunk grid + routing)
| Feeder | Feeds | Status when absent |
|--------|-------|--------------------|
| `critical-business-issue-finder` + FTD (`discovery-ftd`) + `discovery-sales` | **Pain** gate (2.0) | 🔴 → run discovery / CBI finder |
| `/presales:account:brief` + your ICP (Specialist-Required flag) | **Strategic × industry** gate (1.6) | 🔴 → run the account brief |
| `capability-mapper` or requirement-level fit list (per product area) | **Solution / Functional-Fit** gate (1.5) | 🔴 → run capability-mapper (areas without fit evidence stay 🔴) |
| `integration-complexity` | Workflow (0.9) · Technical (0.8) · Implementation (0.5) | 🔴 → run integration-complexity |
| `competitive-battlecard` | Competition (0.6) | 🔴 → run when a competitor is named |
| `/presales:discovery:qualify` | MEDDPICC commercial (0.5) — normalize X/40 ÷ 40 | 🔴 → run qualify |
| `/presales:value:orc` (deal review / Opportunity Review Call) | Deal-worth (0.5, optional) | grey/omit if not run |

---

## Part C — Markdown fallback (in-terminal)
Always print the text scorecard (the layout in `tfq/SKILL.md` Step 4: VERDICT + one-line why ·
kill-list · GATES table · CONTRIBUTORS table · weighted composite vs 0.70 · Specialist-Required line · TOP 3 GAPS ·
confidence tag on every score) **and** the path to the HTML dashboard. Same numbers, same
honest-count-first order. Terminal has no brand chrome — that's fine; the TFQ is unbranded anyway.

## Hard rules (carry over from the model)
1. **Absence never looks like a pass.** 🔴 Unknown is always visible; a mostly-🔴/🟡 gate can't return Invest.
2. **Non-compensatory.** A high composite never buys back a failed gate — the dashboard marks the binding gate.
3. **No averaging across product areas.** One lane per area; the weakest in-scope area gates the verdict.
4. **Provisional is labelled.** A cold/intake run says so in the hero and caps at Conditional.
5. **Internal styling only.** Neutral palette; never load the brand registry for this dashboard.
