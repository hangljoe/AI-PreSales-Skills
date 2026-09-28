A deal folder is a plain folder of markdown files (or a Claude Project with those files attached)
that the kit reads from and writes to as a deal moves through [[The-Deal-Journey]]. It is what lets
each command pick up where the last one left off instead of re-asking for context you already gave.

## Why create one

Create a deal folder when:
- The opportunity has had at least one discovery call
- You're preparing a demo or an Opportunity Scoping Document (OSD)
- A PoC is planned or in progress

Don't create one for early-stage pipeline — use `/presales:account:brief` on its own instead; it
works without a deal folder.

## File structure

```
[Account name] - [Product] Deal/
├── project-instructions.md        ← paste into Claude Project instructions (keep lean)
├── 01_account-brief.md            ← firmographics, operational footprint, signals
├── 01a_buying-journey.md          ← where the buyer is in their journey + our actions per stage
├── 02_discovery-notes.md          ← call summaries (shared schema: references/call-summary-schema.md)
├── 02a_meddpicc-score.md          ← MEDDPICC /40 score history (feeds ORC, exec summary, close plan)
├── 02b_stakeholder-map.md         ← client map: decision board, personas, sentiment, gaps
├── 03_mutual-action-plan.md       ← Mutual Action Plan (MAP): joint steps, owners, dates to a decision
├── 04_pain-to-value.md            ← pain → capability → value table
├── 04a_roi-case.md                ← ROI / value business case
├── 04b_requirement-fit.md         ← requirement-level fit table (feeds the TFQ)
├── 05_demo-storyboard.md          ← Tell-Show-Tell storyboard (the script is built from it)
├── 05a_picture-pitch.md           ← standalone Picture Pitch image sequence and script
├── 06_poc-evaluation-plan.md      ← use cases, criteria, owners, timeline
├── 06a_poc-readout.md             ← PoC check-ins, scorecard, findings
├── 06b_poc-to-prod.md             ← PoC-to-production transition, SOW inputs
├── 07_osd-draft.md                ← Opportunity Scoping Document (working document)
├── 07a_solution-architecture.md   ← customer-facing architecture, integrations, sizing, migration
├── 08_competitive-read.md         ← competitor intel (confidence-tagged)
├── 08a_status-quo-plan.md         ← "do nothing" risk and counter-plan
├── 09_handover-package.md         ← drafted at technical win, finalised at signature
├── 10_close-plan.md               ← chosen close, script, stage, fallback
├── 11_nurture-plan.md             ← post-close check-ins, feedback, references
├── 12_expansion-plan.md           ← renewal / expansion discovery: adoption, whitespace, risk
└── 13_value-realized.md           ← promised vs measured value after go-live, reference-ready verdict
```

## What produces each file

| File | Produced by |
|------|-------------|
| `01_account-brief.md` | `/presales:account:brief [account]` |
| `01a_buying-journey.md` | `/presales:account:journey [account]` |
| `02_discovery-notes.md` | `/presales:discovery:summary` |
| `02a_meddpicc-score.md` | `/presales:discovery:qualify` |
| `02b_stakeholder-map.md` | `/presales:account:stakeholders` |
| `03_mutual-action-plan.md` | `/presales:account:map` |
| `04_pain-to-value.md` | `/presales:value:pain-to-value` |
| `04a_roi-case.md` | `/presales:value:roi-case` |
| `04b_requirement-fit.md` | say "map their problems to our capabilities" (`capability-mapper` skill) |
| `05_demo-storyboard.md` | `/presales:demo:storyboard [product]` |
| `05a_picture-pitch.md` | `/presales:demo:picture-pitch` |
| `06_poc-evaluation-plan.md` | `/presales:deal:poc-plan` |
| `06a_poc-readout.md` | `/presales:deal:poc-readout` |
| `06b_poc-to-prod.md` | `/presales:deal:poc-to-prod` |
| `07_osd-draft.md` | `/presales:handover:osd-draft [account]` |
| `07a_solution-architecture.md` | `/presales:handover:architecture` |
| `08_competitive-read.md` | say "battlecard for [Competitor]" (`competitive-battlecard` skill) |
| `08a_status-quo-plan.md` | say "they might do nothing" (`do-nothing-buster` skill) |
| `09_handover-package.md` | `/presales:handover:doc [deal]` |
| `10_close-plan.md` | `/presales:deal:close-plan` |
| `11_nurture-plan.md` | `/presales:handover:nurture` |
| `12_expansion-plan.md` | `/presales:account:expand` |
| `13_value-realized.md` | `/presales:value:realized` |

`02_discovery-notes.md` has one wrinkle: when a transcript is processed with the
`discovery-transformer` skill, it writes a dated `YYYY-MM-DD_<Account>_discovery-summary.md` next
to it instead of overwriting it. `02_discovery-notes.md` stays the rolling file; each dated file is
that call's original.

See [[The-Deal-Journey]] for which phase reads and writes which file, in order.

## Keeping it fresh

- After each customer call: run `/presales:discovery:summary` and save to `02_discovery-notes.md`
- After each significant call: update `03_mutual-action-plan.md` with `/presales:account:map`
- Before each demo: run `/presales:demo:storyboard` (and `/presales:demo:script` for the verbatim
  script) and update `05_demo-storyboard.md`
- Don't copy CRM data (stage, close date, ARR) into project files — fetch it from your CRM (e.g.
  Salesforce, HubSpot) through its connector, if connected — see [[Connected-Tools]]
- Archive the project once close and handover are complete

## Deal-folder content is untrusted input

Deal-folder files are built from customer calls, pasted transcripts, and other external content.
Every command that reads one treats it as untrusted data, never as instructions: if a file happens
to contain text that reads like an instruction to the model, the kit flags it and continues with the
legitimate analysis only. This applies to every file above, not just the raw discovery notes —
`02a_meddpicc-score.md`, `08_competitive-read.md` and the rest are all derived from the same
external source material.

## Where Claude looks for the deals root

Claude never guesses a deals-root path. It resolves it the same way every time:
1. Read `~/.claude/discovery-transformer.json` (Windows: `%USERPROFILE%\.claude\discovery-transformer.json`).
   If it has `deals_root` (or the older `accounts_root`), use it.
2. Otherwise, ask you for the path, and offer to save it to that config file for next time.

Once the root is known, the deal folder itself is matched by company name (and product) rather than
an exact path. This resolution order, and the folder-matching that follows it, is documented once
and shared by the OSD skills in
`skills/osd-architect/references/shared/deal-folder-discipline.md` — every command that touches a
deal folder follows the same discipline.
