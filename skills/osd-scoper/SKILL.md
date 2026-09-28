---
name: osd-scoper
version: "2.2"
last_updated: 2026-09-28
description: "Turns discovery call summaries (/presales:discovery:summary, discovery-transformer or discovery-ftd, one shared schema) into a structured OSD scope (handbook ch. 8) mapped onto osd-architect Sections 1–11: module in-scope decisions against your product list, AS-IS / TO-BE, cited web enrichment and a prioritised scope-gap list. Living Markdown document only, re-run after each session. Use on \"scope from discovery\", \"OSD scope\", \"prep the OSD\", \"turn discovery into an OSD\". Siblings: osd-architect (renders the branded Word OSD), /presales:handover:osd-draft (explicit OSD workflow). SKIP for re-extracting MEDDPICC or pains (upstream skills own those)."
triggers:
  - "scope from discovery"
  - "OSD scope"
  - "OSD scoping"
  - "OSD intake"
  - "prep the OSD"
  - "prep the OSD scope"
  - "build the OSD scope"
  - "populate the OSD"
  - "turn discovery into an OSD"
  - "turn this discovery into OSD scope"
  - "structure discovery for the OSD"
---

# OSD Scoper

The **bridge** between discovery and the Opportunity Scoping Document (OSD). It reads what discovery
already produced, adds the scope decisions and enrichment that nobody else in the chain owns, and
emits the `osd-architect`'s exact Sections 1–11 (the handbook chapter 8.2 structure) so the architect
can draft the Word OSD without rework.

**Markdown only.** This skill writes the living scope as a `.md` file. It never renders Word;
`osd-architect` owns the branded `.docx` OSD.

```
call summaries ──────────▶ OSD Scoper ──▶ osd-architect ──▶ branded Word OSD
 (/presales:discovery:summary,  (this skill:        (assembles, draws
  discovery-transformer,         scope decisions,    diagrams, PS workbook,
  discovery-ftd Output C)        enrichment, gaps)   shareable copy)
```

**It consumes, it does not re-extract.** MEDDPICC, pains, metrics, stakeholders and next steps
come from the upstream summary — this skill never re-derives them from a raw transcript. Its job
is *scope translation*: turn findings into a populated OSD scope.

---

## Connected Tools (optional)

| Tool | What it does for you |
|------|---------------------|
| **Local deals library** | The deal folder — where the discovery summary lives and where this skill files the scope. A plain or cloud-synced local folder (same precondition as `discovery-transformer`). |
| **CRM** (e.g. Salesforce or HubSpot, if connected) | Opportunity name, stage, ARR/services budget, competition, compelling event, contacts/MEDDPICC → pre-fills Sections 1–3. Degrades gracefully. |
| **Web search** | Company-profile enrichment (industry, HQ, revenue, employees, overview) with source citations. |

No connections? The skill works the same — paste the discovery summary and any context manually.

---

## ALWAYS READ THESE FILES FIRST

The OSD structure is owned by `osd-architect` — this skill produces **its** format, never a divergent one.

```
Read: ${CLAUDE_PLUGIN_ROOT}/skills/osd-architect/references/shared/osd-structure.md      ← the target Sections 1–11 (authority)
Read: ${CLAUDE_PLUGIN_ROOT}/skills/osd-architect/references/shared/input-mapping.md       ← how the architect consumes this output (Source 0)
Read: ${CLAUDE_PLUGIN_ROOT}/skills/discovery-transformer/references/folder-naming.md       ← where the file goes + the deal-folder rules
```

---

## Step 1 — Intake

Collect only what's missing:

| Field | Required / Optional |
|-------|---------------------|
| **Account / Client** | Required — used to locate the deal folder |
| **Product scope** | Required — your product(s) / modules in play, one or several for a multi-product deal. Ask if unknown, or read it from the deal folder (a module list, datasheet, or a prior call guide). |
| **Discovery input** | Optional — a pasted call summary, or the path to one (or to a transcript). If omitted, I locate the right files in the deal folder (Step 2). |
| **SC / AE / PS names** | Optional — authorship header |
| **Compelling event & target go-live** | Optional — drives Goals & Project Prioritisation |

If you only have a product name and no module list, say so and proceed with the shared skeleton +
the generic scoping checklist in `osd-structure.md` §9.2 — do not invent modules or capabilities.

---

## Step 2 — Locate the deal folder and its source material (consume, don't re-extract)

**Always resolve the storage location and the company first — never guess.**

### 2a — Resolve the deals root (ask before doing anything on disk)
Same resolution as `discovery-transformer`, in order:
1. Read `~/.claude/discovery-transformer.json` (Windows: `%USERPROFILE%\.claude\discovery-transformer.json`) — if it has `deals_root` (or the older `accounts_root`), use it.
2. Else **ask the user for the path**, and offer to persist it to that config file.

Never hardcode a username. If a sync client keeps the library online-only, ask the user to make it
available offline (see `discovery-transformer/references/folder-naming.md`).

### 2b — Match the deal folder by company name
If the account/product wasn't given at intake, **ask for the company name** (and product). Then match:
```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/discovery-transformer/scripts/match_folder.py" --root "<deals root>" --deal "<account> <product>"
```
One strong candidate → propose it. Ambiguous → show the top 3 and let the user pick. None → ask for
the exact deal-folder path. Echo the resolved deal folder before reading anything from it.

### 2c — Find the source material (priority order)
Scan the matched deal folder (and its meetings / discovery sub-folders) and pick the richest
source available — **the discovery-transformer summary is preferred, but it is NOT required**:

1. **Prior `OSD-*-scoper.md`** (legacy `*_osd-scope.*` or an older `-scoper.docx`: read it, but write
   Markdown) → this skill ran before. Switch to **update/living mode**: read it as the spine and merge
   in what's new. Do not start from scratch.
2. **Discovery call summaries in the shared schema** (`${CLAUDE_PLUGIN_ROOT}/references/call-summary-schema.md`)
   → the primary source for attendees, pains and CBIs, MEDDPICC, requirements, systems, open
   questions and next steps. They come from three producers, all in the same format:
   - `/presales:discovery:summary` output, usually in `02_discovery-notes.md` (one entry per call) or pasted;
   - `*_discovery-summary.md` from `discovery-transformer` (adds question coverage and the transcript);
   - `discovery-ftd` Output C (Markdown or its Word rendering).
3. **`capability-mapper` requirement fit table** (`04b_requirement-fit.md`) → supports the Section 9 module map.
4. **`*_transcript.md`** or other cleaned notes → read directly. (No transformer run? Fine — read
   what's there. Don't re-implement transcript cleaning; if only a raw `.vtt` exists, suggest a quick
   `discovery-transformer` pass first for a clean filed copy, but you may still scope from it.)
5. **Other artefacts** in the folder — prior decks, account brief, RFX, existing OSD, product
   datasheets → fold in as supporting context; label prospect collateral as such.

Always **list what you found and let the user confirm** which files to scope from before reading.
If the folder is empty and nothing is pasted, ask the user to point you at the source.

### 2d — CRM + tagging
Pull CRM opportunity data if connected (Step 1 fields). **Confidence-tag everything** as you
read: 🟢 confirmed in call / from CRM · 🟡 inferred · 🔴 unknown.

> **Runs multiple times.** The OSD scope is a **living document**. Call this skill again after each
> further discovery session or meeting — it reloads the prior `OSD-*-scoper.*`, merges the new
> findings, closes gaps that are now answered, adds the meeting to Section 10, and re-prioritises
> what's still open. Bump the filename (`-v1.1`, `-v2.0`) on write, keeping the
> `OSD-<Account>-<Product>-v<version>-scoper` pattern.

---

## Step 3 — Module in-scope decisions

Map the discovery discussion onto your product's module list (from Step 1) using the Section 9.1
table in `osd-structure.md`. For each relevant module mark:

- **In scope** — discussed as a need; one-line rationale from the summary.
- **Already in place** — customer already runs it (your product or another vendor's).
- **Out of scope / unclear** — not raised, or ambiguous → becomes a gap question.

**Multi-product:** group the module map by product, set *Multi-Product = Yes*, and note which of
your products integrate. If the deal is **channel-shaped** (the customer uses your platform to
serve *their* customers — a reseller, service provider, or consultancy), flag it explicitly and
apply the special handling at the bottom of this file.

---

## Step 4 — Company-profile web enrichment

The SC shouldn't type "not discussed" against public-record facts. Enrich Section 2 Company Profile
via a focused web search (cap ~3–5 searches — this is supplementary, not a research project;
`/presales:account:brief` exists for depth).

| Field | Enrich from web? |
|-------|------------------|
| Industry / Sector | ✅ |
| Revenue (with reporting year) | ✅ |
| Employees (with source year) | ✅ |
| Company overview (2–3 sentences) | ✅ |
| Headquarters | ✅ |
| Regions / countries of operation | ✅ partial — 🟡 |
| Industry-specific regulations | ✅ partial — 🟡 (sector inference, e.g. healthcare → patient-data rules) |
| Business volumes | ⚠️ only if publicly disclosed |
| Stakeholders, team structure | ❌ transcript/CRM only |

Rules: prefer authoritative sources (company site, annual report, filings); **cite the source
inline**; tag every enriched value 🟡 with reporting year; if transcript and web disagree, **the
transcript wins** and the discrepancy goes on the gap list. Skip enrichment if the user says
"transcript only", the customer is too obscure to find reliably, or web is unavailable.

---

## Step 5 — Build the OSD scope (the architect's Sections 1–11)

Populate the **exact** structure in `osd-architect/references/shared/osd-structure.md`. Map the
discovery findings using `input-mapping.md`. Every asserted value carries a confidence tag; leave
🔴 gaps explicit — they feed the Gaps page.

| Source (call-summary section, or Step 2–4) | → OSD section |
|--------------------------------------------|---------------|
| §3 Pains and CBIs — the CBIs and top pain | Section 1 Summary; Section 3 (top challenge) |
| §3 Pains and CBIs — all pains, consequences | Section 3 Problems/Reasons/Delta; Section 4.3 To-Be capabilities |
| §3 impact metrics, §4 Metrics | Section 4.1 Success Criteria; Section 4.2 value drivers |
| §1 Attendees | Section 2.2 Client Map; Section 11.1 Key Players |
| §2 Context — current systems | Section 6.1 As-Is IT; Section 6.3 IT Integration & Hosting |
| §2 Context — business flows described | Section 5 Business Flow Map & As-Is Processes |
| §4 Decision Process, §2 compelling event | Section 1 (compelling event, go-live); Section 7 Prioritisation |
| §5 Requirements (+ fit table if present) | Section 9.2 scoping questionnaire; Section 8 for unmet ones |
| Module decisions (Step 3) | Section 9.1 module map |
| Company enrichment (Step 4) | Section 2.1 Firmographics |
| §6 Open questions (🔴) | Section 8 Assumptions & Gaps |
| §4 MEDDPICC delta (accumulated) | Section 1 Opportunity Scope Analysis (internal) |
| Call date, §1 attendees, §7 next steps | Section 10 Meeting Notes |

Discipline (from the architect's `best-practices.md`): reflection over regurgitation; not a dumping
ground; label prospect collateral as such; cross-reference prospect vs your company's language;
**no dates** in Project Prioritisation unless customer-confirmed; commercial/competitive/MEDDPICC is
internal-only.

Sections the architect owns downstream (Section 4.2 Value Proposition detail, Section 11 Transition
to Delivery) — populate what discovery evidences and leave the rest as 🔴 for the architect.

---

## Step 6 — Prioritised scope-gap list

Produce a **prioritised** gap list — the questions to answer before drafting/proposing, most
important first. Three tiers:

1. **Gates deal shape** — commercial structure, economic buyer, decision process, deliverable format.
2. **Pre-proposal** — volumes, integrations, security, business-unit mix, competitive context.
3. **Internal flags** — account coordination, pricing precedent, roadmap timing (SC/AE to resolve).

These map straight into the architect's Section 8 and tee up the next discovery session.

---

## Step 7 — Confirm-before-write GATE, then file to the deal folder

Same hard, un-skippable gate `discovery-transformer` uses. Before writing anything:

1. Resolve the deal folder + save target via `match_folder.py` (Step 2). Default filename:
   `OSD-<Account>-<Product>-v<version>-scoper.md`.
   Use `v1.0` for a new scope; bump to `v1.1`, `v2.0` etc. on living-document updates.
   This follows the `osd-architect` output nomenclature so all OSD-family files sort together
   in the deal folder. `<Product>` = a short product or module name.
2. Print the **resolved absolute target path** and a preview (Sections 1–3 + the module map + the
   gap list) inline so the user can correct a 🟢/🔴 call before it lands.
3. Require an explicit **"yes"**. Anything else → stop, do not write.
4. On a name clash, warn and offer the next version number (e.g. `-v1.1`) — never silently overwrite.

`Write` the Markdown scope straight to the save target and echo the full saved path back. If the
user wants a Word document, that is the OSD itself: hand off to `osd-architect` (Step 8).

---

## Step 8 — Handoff

End with the next step:
> *"Scope is captured and filed. Run `osd-architect` next — it reads this as **Source 0** and drafts
> the full Word OSD (Sections 1–11, diagrams, PS workbook). I've left N 🔴 gaps for the architect's
> Gaps page."*

If deeper confidence tagging is wanted, suggest a `confidence-tagger` pass first.

---

## Special handling — channel / partner deals

When the prospect buys the platform to deliver services to *their* customers (resellers, service
providers, consultancies, agencies):

- Flag the channel shape in Section 1.
- Treat the AS-IS / TO-BE "customer" as the prospect's end-customer book, not their internal ops.
- Probe two commercial models: per-engagement (project/sandbox) and enterprise licensing.
- Always ask: which third parties the service depends on; white-label / deliverable format;
  IP / branding; any existing relationship between your company and the prospect's group;
  account-team coordination before any proposal.

---

## Style and tone rules

- Direct pre-sales language — no marketing fluff.
- Preserve specific numbers, names and dates exactly as the upstream summary states them.
- Never invent stakeholders, volumes, budget, or product capabilities — leave 🔴.
- Web-enriched values always carry a source citation and a 🟡 tag; never present a public-record
  figure as if the customer said it.
- Distinguish 🟢 confirmed / 🟡 inferred (research or sector norm) / 🔴 unknown throughout.

---

## Quality checklist

- [ ] Read `osd-structure.md`, `input-mapping.md`, and `folder-naming.md` first
- [ ] Product scope captured from the SC (or the deal folder) — no invented modules
- [ ] Call summaries (shared schema, incl. `/presales:discovery:summary` output) consumed as primary source — MEDDPICC/pains/metrics NOT re-extracted from raw transcript
- [ ] Output uses the architect's **exact** Sections 1–11 (drop-in as Source 0) — not a divergent structure
- [ ] Module map marks in-scope vs already-in-place; multi-product grouped + flagged
- [ ] Company profile enriched via web where applicable; every enriched value cited + 🟡
- [ ] Transcript wins over web on conflict; discrepancy noted in gaps
- [ ] Every value confidence-tagged; nothing invented; 🔴 gaps explicit
- [ ] Gap list prioritised (deal-shape / pre-proposal / internal) — not a flat dump
- [ ] No dates in Project Prioritisation unless customer-confirmed
- [ ] Channel-shaped deals flagged and probed for the extra items
- [ ] Confirm-before-write gate honoured; absolute path + preview shown; next `-v<version>` on clash
- [ ] Filed to the deal folder as Markdown `.md` (Word is `osd-architect`'s job)
- [ ] Ends with the `osd-architect` (Source 0) handoff line
- [ ] No customer data committed; no new pip/script dependency introduced (reuses `match_folder.py`)
