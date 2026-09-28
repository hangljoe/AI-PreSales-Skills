# STACK.md — Skills & Commands Inventory

**Every agent reads this file first.** It defines what skills and commands are available.
Update it when you add, remove, or significantly change a skill or command.

---

## Identity

```
PROJECT_NAME=AI PreSales Skills by The PreSales Handbook
DESCRIPTION=Vendor-neutral Claude skills and slash commands for PreSales professionals,
             shipped as the "presales" Claude plugin. Follows The PreSales Handbook
             (condensed in references/PreSales_Handbook_Reference.md, V78 numbering): discovery → qualification → demo → value
             → RFX → closing → handover.
INSTALL=/plugin marketplace add hangljoe/AI-PreSales-Skills
        /plugin install presales@presales-handbook
```

The skills are product-agnostic. They ask the user for their product, capabilities,
differentiators and competitors (or read them from the deal folder, see `DEAL_TEMPLATE.md`).
Never assume a specific vendor's portfolio.

---

## Skills (`skills/`)

Skills are invoked by natural language. Each skill has a `SKILL.md` in `skills/<name>/`.
42 skills on disk: 39 user-facing skills below, the internal `brand` registry, and the
leader-only `deal-prequal` and `presales-leader` (see **Leader-only tools**).

| Skill | What it does | Key trigger phrases |
|-------|-------------|---------------------|
| `discovery-sales` | Commercial Sales Discovery anchored on MEDDPICC (handbook ch. 5). Decides whether the deal is real; hands scoring to `/presales:discovery:qualify`. | "sales discovery" |
| `discovery-ftd` | Functional & Technical Discovery (ch. 7) for any B2B product: research, FTD opening framework, product questions built from the SC's product scope, branded questionnaire or post-call summary. | "FTD", "discovery questionnaire", "what should I ask" |
| `discovery-transformer` | Meeting `.vtt` transcript → clean Markdown, filed in the local deal folder, plus a Discovery Summary with coverage check, MEDDPICC and follow-up email. | "discovery transformer", "process this transcript", "structure these notes" |
| `critical-business-issue-finder` | Surfaces the 2–4 Critical Business Issues, separated from symptoms and feature requests. | "find the CBIs", "what's the real pain" |
| `tfq` | Technical & Functional Qualification (ch. 9): gated Invest / Conditional / Pause decision with HTML dashboard. | "run the TFQ" |
| `osd-scoper` | Discovery output → the OSD's 11-section scope (module decisions, enrichment, prioritised gaps). Living document; re-run after each session. | "scope from discovery" |
| `osd-architect` | Opportunity Scoping Document (ch. 8) as a branded Word file with diagrams, update-in-place, shareable copy and PS scoping workbook. | "OSD", "build the OSD" |
| `capability-mapper` | Maps customer problems to the user's own capability list: Technology + Operating Model heat map, ranked recommendations. | "map their problems to our capabilities", "capability heat map" |
| `integration-complexity` | Rates the complexity and risk of connecting the prospect's landscape to the user's platform; effort estimate and risk flags. | "assess the integration complexity" |
| `workshop-agenda-builder` | Time-boxed customer workshop / EBC agenda from a modular section library. | "build a workshop agenda" |
| `demo-storyboard` | Tell-Show-Tell storyboard (ch. 11) with first-person Limbic persona narration and Pain-Capability-Value logic. | "demo prep", "demo storyboard" |
| `demo-dryrun-coach` | Demo rehearsal: Tell-Show-Tell compliance, pain mapping, timing, likely objections. | "dry run my demo" |
| `video-demo-creator` | Demo video and click-through lifecycle (ch. 12): brief, script, recording checklist, editing, 13-point validation. | "create a demo video" |
| `business-case-stress-tester` | Pressure-tests an existing ROI / business case before the customer's CFO does. | "stress test this business case" |
| `pricing-positioning` | Value before price; handles "too expensive" without discounting. | "pricing conversation" |
| `negotiation-prep` | Negotiation brief: positions, walk-away, trade levers, concession sequence. | "negotiation prep" |
| `exec-briefing-prep` | C-level meeting prep: agenda, persona talking points, hard-question coaching. | "exec briefing prep", "EBC prep" |
| `presales-coach` | Situational coach and stuck-deal entry point: diagnoses the deal constraint by phase, runs a PoC health check (ch. 13.5–13.6), gives three concrete SC actions and the next tool; escalates to `/presales:deal:strategic-think`. | "I'm stuck on a deal", "coach me on this deal", "is the PoC on track" |
| `champion-health` | Separates friendly contacts from real advocates (ch. 4). The gate before `/presales:deal:champion-enable`. | "how strong is my champion" |
| `do-nothing-buster` | Diagnoses no-decision risk against the nine status-quo causes (ch. 20.1) and builds a counter-plan → `08a_status-quo-plan.md`. | "they might do nothing", "status quo is our competitor" |
| `tactical-empathy-coach` | Objection and difficult-conversation coaching: labels, mirrors, calibrated questions (ch. 15). | "objection coaching" |
| `competitive-battlecard` | Honest positioning card against any named competitor or an in-house build, any industry, with SWOT (ch. 20); hands status-quo risk to `do-nothing-buster`. | "competitive battlecard", "how do we beat" |
| `toc-bbit-expert` | Theory of Constraints + Black Belt in Thinking coach: UDE → CRT → Cloud → FRT → PRT → TT with diagrams. | "think like a BBiT expert" |
| `win-loss-analyzer` | Win/loss (ch. 17): quick solo debrief, 17.2 team lessons-learned session, or customer interview; optional internal write-up. | "debrief this win", "why did we lose" |
| `rfx-navigator-presales` | RFX entry point (ch. 14): identifies RFI/RFP/RFQ/tender, rapid fit scan, routes to `/presales:rfp:*`. | "we got an RFP" |
| `field-comms-writer` | Tone-matched 1:1 follow-ups, recaps, chasers after customer moments. | "write a follow-up email" |
| `confidence-tagger` | Labels every claim 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown before material leaves the team. | "tag this" |
| `humanize` | Strips AI tells from customer-facing prose. | "humanize this" |
| `linkedin-post` | LinkedIn posts from PreSales insights (ch. 21, personal branding). | "write a LinkedIn post" |
| `diagram` | Excalidraw diagrams that make a visual argument. | "diagram this" |
| `pptx-generator` | On-brand PowerPoint decks (python-pptx), presales-handbook brand by default. | "create a powerpoint", "make a deck" |
| `docx-generator` | On-brand Word documents (python-docx), scratch mode or the user's letterhead template. | "generate a word doc" |
| `learning-plan` | Personal learning plan on the 70/30 rule (ch. 2.6, 18): goals, weekly block, sources, accountability. Backs `/presales:brain:learn`. | "build my learning plan" |
| `presales-metrics` | KPI scorecard (ch. 23) for one SC or a team: definitions, formulas, targets, trends, three actions; optional HTML dashboard. | "build my scorecard", "team metrics dashboard" |
| `knowledge-capture` | Turns a win, demo, RFP answer or objection into a reusable asset (ch. 19) in the user's own knowledge folder; wiki writes confirm-gated. | "capture this for the team" |
| `second-brain` | Personal daily/weekly operating loop: morning brief, journal, big rocks, writing voice. Backs `/presales:brain:*`. | "set up my second brain" |
| `rag-markdown` | Any source → one clean, RAG-ready Markdown file. | "RAG ready markdown" |
| `security-questionnaire` | Answers SIG / CAIQ / ISO 27001 / SOC 2 and vendor-risk questionnaires from your own trust library (never in the plugin); approved answers reused verbatim, unknowns become questions for security, coverage table, submission-ready document. | "security questionnaire", "SIG", "CAIQ", "vendor risk assessment" |
| `solution-architecture` | Customer-facing solution architecture document (handbook 8.2 §6/§7, 9.2): target architecture, integration touchpoints, sizing, data-migration assessment, security inputs; diagrams via `diagram`, Word via `docx-generator`. | "solution architecture", "architecture document", "migration assessment" |

**Internal skill (not user-invoked):** `brand` is the shared brand registry (colours, fonts,
logos, per-format settings) read by `pptx-generator`, `docx-generator`, `osd-architect`,
`discovery-ftd` and `/presales:rfp:present`. It ships one example brand, `presales-handbook`
(navy `#112D4E`, yellow `#FACF39`). Users add their own brand by copying that folder.

---

## Leader-only tools

> These are for PreSales leaders (handbook ch. 22), not individual-contributor SCs. They have no
> natural-language triggers. Don't route individual contributors to them from `/presales:guide`
> or other skills; mention one only when a leader asks for it by name.

| Tool | What it does | How to invoke |
|------|-------------|---------------|
| `deal-prequal` | Readiness sweep across one or many deals before the TFQ: checks whether the MEDDPICC foundation justifies SC time, reads deal momentum, returns a 3-band readiness call (🟢 Ready / 🟡 A few gaps / 🔵 Too early) plus ready-to-send AE follow-ups. Hands 🟢 deals to the TFQ. | `/presales:leader:prequal [deals]` |
| `presales-metrics` (leader mode) | Team KPI scorecard: distribution across SCs framed as 1:1 questions, never a ranking. | `/presales:leader:metrics [export] [period]` |
| `presales-leader` | Leader operating skill (handbook ch. 22): five modes — pipeline review, SC one-on-one, capacity math, new-SC onboarding (30-60-90), SC hiring kit; RACI and templates in its references. | `/presales:leader:pipeline-review` · `/presales:leader:one-on-one` · `/presales:leader:capacity` · `/presales:leader:onboarding` · `/presales:leader:hiring` |

---

## Skill chains

### Discovery → OSD chain

```
1. /presales:discovery:prep   ── prepare the call (research, hypotheses, question plan)
        └─ or `discovery-ftd` (pre-call questionnaire / call guide)
                │   (run the call; export the transcript as .vtt)
                ▼
2. discovery-transformer      ── .vtt → clean transcript + Discovery Summary in the deal folder
                ▼
3. osd-scoper                 ── first scope: module decisions, as-is/to-be, prioritised gaps,
                                 in osd-architect's Sections 1–11. Re-run after each session.
                ▼
4. osd-architect              ── final branded Word OSD, diagrams, PS workbook, shareable copy
```

**Folder discipline:** steps 2–4 read and write the user's local deal folder. The root comes
from `~/.claude/discovery-transformer.json` (`deals_root`) or is asked for. Folders are matched
with `skills/discovery-transformer/scripts/match_folder.py`. Without step 2, `osd-scoper` and
`osd-architect` scan the deal folder for whatever notes exist.

### RFX → Qualify chain (should we invest SC time?)

```
1. rfx-navigator-presales   ── triage the RFX; first-cut fit; route
        ▼
2. capability-mapper        ── functional fit against the user's capability list
        ▼
3. integration-complexity   ── technical landscape + risk
        ▼
4. /presales:discovery:tfq  ── the GATE → Invest / Conditional / Pause
        ▼
5. /presales:rfp:respond  or  osd-scoper   ── only after an Invest / Conditional verdict
```

The TFQ's Pain gate is fed by `discovery-ftd`, `discovery-sales` and
`critical-business-issue-finder`. Its MEDDPICC contributor is fed by `/presales:discovery:qualify`.
The optional deal-worth signal comes from `/presales:discovery:orc`. Any input with no feeder yet
scores 🔴 Unknown.

---

## Commands (`commands/`)

Invoked as `/presales:<phase>:<name>`. 54 commands: the 47 below plus the 7 leader commands listed under **Leader-only tools**.

| Command | What it does |
|---------|-------------|
| `/presales:guide` | Interactive router: find the right skill or command, or browse the phase map |
| `/presales:account:brief` | One-page company brief: firmographics, operational footprint, signals, hypotheses |
| `/presales:account:journey` | Buying-journey stage, our actions per stage, early-engagement check (ch. 3) → `01a_buying-journey.md` |
| `/presales:account:map` | Mutual Action Plan (MAP), the mandatory post-call deliverable |
| `/presales:account:stakeholders` | Client map (ch. 3.2): decision-board departments, persona, influence, sentiment, what each needs to hear, gaps → `02b_stakeholder-map.md` |
| `/presales:account:expand` | Renewal / expansion discovery for an existing customer: adoption, realised vs promised value, whitespace, renewal risk → `12_expansion-plan.md` |
| `/presales:discovery:prep` | Discovery call prep sheet: research, persona hypotheses, question plan |
| `/presales:discovery:questions` | Question card only (discovery-ftd card mode): SPIN / MEDDPICC questions by persona and product |
| `/presales:discovery:sales` | Sales Discovery (MEDDPICC) conversation and score |
| `/presales:discovery:summary` | Call notes or transcript → discovery output document |
| `/presales:discovery:golden-hours` | 24-hour plan after a key call, built from the call summary: debrief, AE brief, CRM update, action plan |
| `/presales:discovery:qualify` | MEDDPICC score (/40) with gaps and next actions |
| `/presales:discovery:tfq` | Technical & Functional Qualification gate |
| `/presales:discovery:orc` | Opportunity Review Call (ch. 9.3) agenda: cross-department qualify in / out |
| `/presales:demo:pre-invite` | Pre-demo invite email: agenda, recording notice, webcam ask |
| `/presales:demo:storyboard` | Tell-Show-Tell + PCV (Pain-Capability-Value) storyboard from discovery pains |
| `/presales:demo:script` | Verbatim demo script from a storyboard |
| `/presales:demo:post-followup` | Post-demo follow-up email within 24 hours |
| `/presales:demo:picture-pitch` | Standalone Picture Pitch (ch. 11.5.1): 5–10 images, one line each, from the persona's world → `05a_picture-pitch.md` |
| `/presales:value:pain-to-value` | Pains → your capabilities → value outcomes, confidence-tagged |
| `/presales:value:roi-case` | ROI business case with 3+ value drivers and a risk factor |
| `/presales:value:realized` | Post-implementation value check against the ROI case: promised vs measured per driver, adoption blockers, reference-ready verdict → `13_value-realized.md` |
| `/presales:deal:poc-plan` | PoC gate (13.1) and plan: use cases, success criteria, data handling, owners, timeline |
| `/presales:deal:poc-readout` | PoC check-ins, scorecard, findings readout (ch. 13.5–13.8) → `06a_poc-readout.md` |
| `/presales:deal:objection-drill` | Objection handling with tactical empathy |
| `/presales:deal:champion-enable` | Champion brief (brief mode) or full Economic Buyer enablement kit (kit mode) for the Economic Buyer sell |
| `/presales:deal:exec-summary` | One-page deal summary for leadership |
| `/presales:deal:proposal` | Formal commercial proposal |
| `/presales:deal:close-plan` | Recommends and scripts one of the four closes (ch. 16.3), stage and fallback → `10_close-plan.md` |
| `/presales:deal:strategic-think` | TOC + BBiT thinking for a stuck or complex deal |
| `/presales:deal:poc-to-prod` | PoC / trial-to-production transition (ch. 13.7, kit): keep vs rebuild, environment and data reuse, gap closure, SOW inputs → `06b_poc-to-prod.md` |
| `/presales:rfp:analyze` | RFX go/no-go analysis (CRM optional) |
| `/presales:rfp:respond` | Requirement-by-requirement response with coverage tracking |
| `/presales:rfp:present` | RFX response presentation deck |
| `/presales:rfp:security` | Security / compliance questionnaire response from your trust library (wrapper for `security-questionnaire`) |
| `/presales:handover:osd-draft` | Draft the Opportunity Scoping Document via `osd-architect` |
| `/presales:handover:doc` | PreSales → Professional Services handover package and handover-call agenda |
| `/presales:handover:nurture` | Post-close plan: check-ins, feedback, references, expansion (ch. 16.4) → `11_nurture-plan.md` |
| `/presales:handover:architecture` | Customer-facing solution architecture document (wrapper for `solution-architecture`) → `07a_solution-architecture.md` |
| `/presales:brain:setup` | Guided second-brain setup |
| `/presales:brain:start` | Morning brief |
| `/presales:brain:end` | End-of-day journal entry |
| `/presales:brain:start-week` | Week-ahead brief |
| `/presales:brain:end-week` | Weekly review with training-time check |
| `/presales:brain:rocks` | Review or set quarterly big rocks |
| `/presales:brain:voice` | Build the personal writing style guide (VOICE.md) |
| `/presales:brain:learn` | Monthly or quarterly learning plan (runs `learning-plan`) |

The RFP answer library lives in the user's own folder (see `references/rfp-library/README.md`), never inside the plugin.

---

## Connected tools (optional)

Skills and commands use these when connected and always work without them.

| Tool | What it gives you | Used by |
|------|------------------|---------|
| **CRM** (e.g. Salesforce, HubSpot) | Account data, opportunity stage, contacts, MEDDPICC fields, deal history | qualify, account:brief, /presales:discovery:summary, win-loss-analyzer, negotiation-prep, proposal, champion-enable, post-followup, rfp:analyze |
| **Knowledge base** (e.g. Confluence, Notion, SharePoint) | Product docs, competitive intel, approved pricing, reference ROI data; a place to save outputs | field-comms-writer, /presales:discovery:summary, win-loss-analyzer, competitive-battlecard, pricing-positioning, handover:doc |
| **Mail & calendar** (e.g. Outlook, Teams, Gmail) | Meetings, threads and tasks for the daily brief | second-brain, `/presales:brain:*` |

---

## Choosing a model

Claude Code doesn't pick a model by task difficulty, and a skill can't switch it. Use **Opus**
(`/model opus`) for deep reasoning (BBiT, OSD, ROI stress-testing, negotiation). Use `/fast` or
a smaller model for mechanical work (follow-ups, note structuring, tagging). The skills don't pin
a model.

---

## Which verdict when?

| Scale | Tool | Question it answers | When |
|-------|------|---------------------|------|
| Pursue / Conditional / Qualify-out | `discovery-sales` | Is the deal commercially real and worth pursuing? | After a sales discovery conversation |
| X/40, commit-eligible at ≥28 | `/presales:discovery:qualify` | How complete is MEDDPICC; can the deal be commit-forecast? | Any time; feeds the Pursue verdict and the TFQ |
| Ready / A few gaps / Too early | `deal-prequal` (leaders) | Which deals in the pipeline are ready for SC time? | Portfolio sweep before TFQs |
| Invest / Conditional / Pause | `tfq` | Should we commit significant SC time (demo prep, PoC, OSD)? | Provisional after discovery; re-run on the OSD |

---

## Glossary

| Acronym | Meaning | Where used |
|---------|---------|------------|
| **FTD** | Functional & Technical Discovery (handbook ch. 7) | `discovery-ftd` |
| **OSD** | Opportunity Scoping Document (handbook ch. 8) | `osd-scoper`, `osd-architect`, `handover:osd-draft` |
| **TFQ** | Technical & Functional Qualification: Invest / Conditional / Pause gate (ch. 9) | `tfq`, `discovery:tfq` |
| **ORC** | Opportunity Review Call: cross-department qualify in / out (ch. 9.3) | `discovery:orc` |
| **MAP** | Mutual Action Plan | `account:map` |
| **CBI** | Critical Business Issue | `critical-business-issue-finder` |
| **MEDDPICC** | Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify (Implicate) Pain, Champion, Competition | All discovery and deal commands |
| **TOC / BBiT** | Theory of Constraints / Black Belt in Thinking | `toc-bbit-expert`, `deal:strategic-think` |

---

## New to this library? Start here.

| Tool | When | Trigger |
|------|------|---------|
| Account Brief | Before any first call | `/presales:account:brief [company]` |
| Discovery Prep | The day before a discovery call | `/presales:discovery:prep [account] [persona] [product]` |
| Meeting Notes | After every call | Say *"structure these notes"* and paste notes |
| Demo Storyboard | Before every demo | `/presales:demo:storyboard [product]` and paste pains |
| Confidence Tagger | Before anything goes to the customer | Say *"tag this"* and paste the document |

Run `/presales:guide` for the full phase-by-phase map.

---

## Notes for agents

- The repo root is the plugin root; the plugin id is `presales`.
- Skills: `skills/<name>/SKILL.md`. Commands: `commands/<phase>/<name>.md` → `/presales:<phase>:<name>`.
- Per-skill material lives in `skills/<name>/references/`; the shared library (the condensed handbook reference, cheat sheets, BBiT study notes, playbook, and the READMEs for your own RFP answer library and security trust library) lives in `references/`. The book: https://www.presales-handbook.com (site source: https://github.com/hangljoe/presales-handbook.com). Handbook citations use V78 numbering.
- Cross-skill and shared-library paths use `${CLAUDE_PLUGIN_ROOT}/...`.
- Call summaries share one schema: `references/call-summary-schema.md`, used by `/presales:discovery:summary` (every meeting type) and `discovery-transformer`.
- Brand values come from `skills/brand/brands/<brand>/brand.json`. Default brand: `presales-handbook`.
- `toc-bbit-expert` is the deep BBiT tool; `/presales:deal:strategic-think` is the fast deal overlay.
- Connected tools are always optional; every skill degrades gracefully to asking the user.
