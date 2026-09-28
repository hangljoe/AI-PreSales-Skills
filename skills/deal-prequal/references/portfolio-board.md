# Deal Pre-Qualification — Portfolio Readiness Board  *(HTML spec + fallback)*

How `deal-prequal` renders its result: a **portfolio readiness board** across all swept deals, with a
per-deal card carrying the readiness call, the MEDDPICC map, history, indicative fit, gaps, and the
**ready-to-send drafted message**. Neutral internal styling — the **same visual family as the TFQ
orchestrator dashboard** (no brand skin, so the two read as one internal toolset).

> **Internal-only.** Do **not** load the `brand` registry. Neutral palette only.

---

## Part A — Delivery (cross-surface)

- **Claude Code:** write to `output/Deal_Prequal_<Date>.html` (relative to project root); print the path.
- **Claude.ai:** write to `/mnt/user-data/outputs/Deal_Prequal_<Date>.html`; then present it so it
  renders inline.
- `<Date>` = ISO `YYYY-MM-DD`. Re-running the same day **overwrites** the file — the readiness read is
  living, so the latest board replaces the last.
- Always accompany with the markdown fallback (Part D) in the terminal.

---

## Part B — Palette, semantics, a11y (constant with the TFQ)

```
Canvas       #F1F5F9      Card         #FFFFFF      Border      #E2E8F0
Header band  #0F172A      Ink          #0F172A      Muted ink   #475569
```
Readiness + confidence semantics are **constant** (never recolor):
```
Ready to progress / Confirmed        green  #1B873F   🟢
A few gaps to close / Partial         amber  #B7791F   🟡
Too early — key unknowns              blue   #2B6CB0   🔵
Missing / Unknown / stall flag        red    #C53030   🔴
```
**a11y (required):** every status pairs **colour + icon + text label** (`🟢 Ready`, `🔴 Missing`) — never
colour alone. Blue/green and green/red are the colour-blind failure pairs, so always keep the icon + word.

---

## Part C — Layout (single-scroll page, max-width 1040px, centered)

**1 — Header band.** Dark `#0F172A` band: `Deal Pre-Qualification · <N> deals · <Date>` with subtitle
`internal · leader readiness sweep · not the TFQ investment gate`.

**2 — Portfolio roll-up card.**
- A **band tally** row: three counts — 🟢 Ready / 🟡 A few gaps / 🔵 Too early.
- A **roll-up table**, one row per deal, sortable by band (Ready first is fine, but keep 🔵 visible — this
  tool never hides the not-ready deals):

  | Deal | Readiness | MEDDPICC | Foundation (Pain·EB·Req) | Top gap | Momentum |
  |------|-----------|----------|--------------------------|---------|----------|
  | chip | `x/8` bar  | 3 dots  | one line                 | pill    |          |

  - **MEDDPICC** = a small `x/8` completeness meter (fill = confirmed count / 8).
  - **Foundation** = three confidence dots (Pain · EB · Requirement clarity).
  - **Momentum** = `warming` / `steady` / `quiet` / `stalled` pill; `quiet`/`stalled` in red text.

**3 — Per-deal cards** (one per deal, in the same order as the table). Each card:
- **Header:** deal name + readiness chip (🟢/🟡/🔵) + one-sentence *why* (naming the binding element).
- **MEDDPICC strip:** 8 labelled cells (M·E·D·D·P·I·C·C), each a 🟢/🟡/🔴 dot + element name; `x/8` count.
- **History line:** stage · age · last activity (`quiet ~Nd` flag if stale) · prior SC touches / prior TFQ.
- **Indicative fit** *(only if requirements exist):* one line, labelled **"indicative — not the scored
  gate (TFQ owns that)"**; product areas without fit evidence shown 🔴 Unknown.
- **Gaps to close:** short list of the specific unknowns, each with the element it maps to.
- **Drafted message:** a copy-ready block (monospace / preformatted) with the warm email draft, and a
  collapsed shorter Teams/Slack variant. This is the leader's send-as-is artefact.
- **Next step:** 🟢 → *"run /presales:discovery:tfq"* · 🟡 → *"send the note; re-run when answers land"* ·
  🔵 → *"discovery-sales / discovery-ftd first"*.

**4 — Footer / provenance.** `readiness model as-of <date>` · *"readiness sweep — not the TFQ investment
verdict"* · confidence legend · *"internal · neutral styling, no brand skin"* · a one-line reminder that
the drafted messages are AE-ready and were written to the warm-tone standard.

---

## Part C2 — Reusable CSS + components

Drop this `<style>` in `<head>`; reuse the snippets so every run matches the TFQ family.

```html
<style>
  :root{
    --canvas:#F1F5F9; --card:#FFF; --border:#E2E8F0; --band:#0F172A;
    --ink:#0F172A; --muted:#475569;
    --ready:#1B873F; --gaps:#B7791F; --early:#2B6CB0; --miss:#C53030;
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
  .chip{display:inline-block;padding:6px 14px;border-radius:999px;color:#fff;
    font-weight:700;letter-spacing:.02em}
  .chip.ready{background:var(--ready)} .chip.gaps{background:var(--gaps)}
  .chip.early{background:var(--early)}
  .meter{position:relative;height:12px;border-radius:6px;background:#E2E8F0;overflow:hidden;min-width:80px}
  .meter>span{display:block;height:100%;border-radius:6px}
  .fill-ready{background:var(--ready)} .fill-gaps{background:var(--gaps)} .fill-early{background:var(--early)}
  .dot{display:inline-block;width:10px;height:10px;border-radius:50%;vertical-align:middle;margin-right:4px}
  .dot.c{background:var(--ready)} .dot.p{background:var(--gaps)} .dot.m{background:var(--miss)}
  .pill{font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px}
  .pill.warm{background:#DCFCE7;color:var(--ready)} .pill.steady{background:#E2E8F0;color:var(--muted)}
  .pill.quiet{background:#FEF3C7;color:var(--gaps)} .pill.stalled{background:#FEE2E2;color:var(--miss)}
  table{width:100%;border-collapse:collapse;font-size:14px}
  th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--border);vertical-align:top}
  th{color:var(--muted);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.03em}
  .meddstrip{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
  .medd{font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:6px}
  .draft{background:#F8FAFC;border:1px solid var(--border);border-radius:8px;padding:14px;
    font:13px/1.55 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap}
  .note{color:var(--muted);font-size:13px}
  details>summary{cursor:pointer;color:var(--early);font-size:13px;font-weight:600;margin-top:8px}
  .prov{border-color:#DDD;background:#F8FAFC;font-size:13px;color:var(--muted)}
</style>
```

Component snippets (fill values from the readiness data):

```html
<!-- readiness chip + MEDDPICC completeness meter (5/8) -->
<span class="chip gaps">🟡 A few gaps to close</span>
<div class="meter"><span class="fill-gaps" style="width:62.5%"></span></div>

<!-- MEDDPICC strip cell -->
<span class="medd"><span class="dot c"></span>Metrics</span>
<span class="medd"><span class="dot m"></span>Economic Buyer</span>

<!-- momentum pill -->
<span class="pill quiet">quiet ~34d</span>

<!-- drafted message block (send-as-is) -->
<div class="draft">Subject: Quick one on Acme — want to get SC behind it

Hi Sam, …</div>
<details><summary>Teams / Slack variant</summary>
<div class="draft">Hey Sam — Acme looks promising 👍 …</div></details>
```

**Rendering rules:** MEDDPICC meter fill = `confirmed ÷ 8 × 100%`, colour matched to the deal's band; the
strip always shows all 8 cells (a 🔴 is never omitted); every drafted message sits in a `.draft` block so
it's obviously copy-ready.

---

## Part D — Markdown fallback (in-terminal, always)

Print the same content, honest-count-first:

```
## Deal Pre-Qualification — <N> deals — <Date>   (internal · readiness sweep, not the TFQ gate)

PORTFOLIO: 🟢 Ready <n>  ·  🟡 A few gaps <n>  ·  🔵 Too early <n>

| Deal | Readiness | MEDDPICC | Pain·EB·Req | Top gap | Momentum |
| … | 🟡 A few gaps | 5/8 | 🟢🔴🟡 | Economic Buyer | quiet ~34d |

— per deal —

### <Deal>  — 🟡 A few gaps to close
Why: EB unidentified and no cost metric; both are quick asks.
MEDDPICC 5/8: M🟢 E🔴 D🟡 D🔴 P🔴 I🟢 C🟢 C🟡
History: Stage 2 · 41d old · last activity 34d ago (quiet) · no prior TFQ
Indicative fit: <Product> ~70% OOTB (indicative — the TFQ owns the scored gate)
Gaps: Economic Buyer (E) · Cost metric (M) · Decision process (D)
Drafted note (email):
   Subject: Quick one on <Deal> — want to get SC behind it
   Hi <AE>, …
Drafted note (Teams): Hey <AE> — <Deal> looks promising 👍 …
Next: send the note; re-run this sweep when answers land.
```

…then the path to the HTML board.

## Hard rules
1. **Never hide a not-ready deal.** 🔵/🟡 rows stay visible — the whole value is honest readiness.
2. **Every drafted message is copy-ready** and written to `question-drafting.md`'s warm-tone standard.
3. **Fit is indicative, labelled as such** everywhere — the scored gate is the TFQ's.
4. **Neutral styling only** — never load the brand registry.
5. **Soft language throughout** — bands and next steps, never "NO/PAUSE".
