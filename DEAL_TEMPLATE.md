# Deal Project Template

Use this structure for any opportunity that has reached discovery or later (PoC, OSD, technical win).

## When to create a deal project

Create a Claude Project (or Claude Code session folder) for this deal when:
- The opportunity has had at least one discovery call
- You're preparing a demo or OSD
- A PoC is planned or in progress

Do NOT create a project for early-stage pipeline — use `/presales:account:brief` instead.

## Project instructions (paste this into Claude Project instructions)

```
You are supporting [SC name] on the [Account name] deal for [Your company].

About us:
- Our product(s): [product names and one-line descriptions]
- Key capabilities and differentiators: [3-5 bullets]
- Main competitors: [names]

Context:
- Products in scope: [Product A / Product B / module / combination]
- Deal stage: [Discovery / Demo / POC / OSD / Technical Win]
- Champion: [Name, Title]
- Economic buyer: [Name, Title]
- Compelling event: [regulatory change / audit / M&A / product launch / other]
- Target close: [Quarter/Month]

Your role: help me prepare for customer interactions, build presales deliverables,
and coach me on discovery, demo, and negotiation. Always confidence-tag claims
using 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown.

Use my project documents as context. Never invent facts about this account.
```

## File structure

```
[Account name] - [Product] Deal/
├── project-instructions.md        ← paste into Claude Project instructions (keep lean)
├── 01_account-brief.md            ← firmographics, operational footprint, signals
├── 01a_buying-journey.md          ← where the buyer is in their journey + our actions per stage
├── 02_discovery-notes.md          ← call summaries (shared schema: references/call-summary-schema.md)
├── 03_mutual-action-plan.md       ← Mutual Action Plan (MAP): joint steps, owners, dates to a decision
├── 04_pain-to-value.md            ← pain → capability → value table
├── 04a_roi-case.md                ← ROI / value business case
├── 04b_requirement-fit.md         ← requirement-level fit table (feeds the TFQ)
├── 05_demo-storyboard.md          ← Tell-Show-Tell storyboard (the script is built from it)
├── 06_poc-evaluation-plan.md      ← use cases, criteria, owners, timeline
├── 06a_poc-readout.md             ← PoC check-ins, scorecard, findings
├── 07_osd-draft.md                ← Opportunity Scoping Document (working document)
├── 08_competitive-read.md         ← competitor intel (confidence-tagged)
├── 08a_status-quo-plan.md         ← "do nothing" risk and counter-plan
├── 09_handover-package.md         ← drafted at technical win, finalised at signature
├── 10_close-plan.md               ← chosen close, script, stage, fallback
└── 11_nurture-plan.md             ← post-close check-ins, feedback, references
```

## How to keep it fresh

- After each customer call: run `/presales:discovery:summary` and save to `02_discovery-notes.md`
- Before each demo: run `/presales:demo:storyboard` (and `/presales:demo:script` for the verbatim script) and update `05_demo-storyboard.md`
- After each significant call: update `03_mutual-action-plan.md` with `/presales:account:map`
- Do NOT copy CRM data (stage, close date, ARR) into project files — fetch from your CRM (e.g. Salesforce, HubSpot) via its connector, if connected
- Archive the project after close + handover is complete

## Generating files with commands

```
/presales:account:brief [account]      → 01_account-brief.md
/presales:account:journey [account]    → 01a_buying-journey.md
/presales:discovery:summary            → 02_discovery-notes.md
/presales:account:map                  → 03_mutual-action-plan.md
/presales:value:pain-to-value          → 04_pain-to-value.md
/presales:value:roi-case               → 04a_roi-case.md
(say "map their problems to our capabilities") → 04b_requirement-fit.md
/presales:demo:storyboard [product]    → 05_demo-storyboard.md
/presales:deal:poc-plan                → 06_poc-evaluation-plan.md
/presales:deal:poc-readout             → 06a_poc-readout.md
/presales:handover:osd-draft [account] → 07_osd-draft.md
(say "battlecard for [Competitor]")    → 08_competitive-read.md
(say "they might do nothing")          → 08a_status-quo-plan.md
/presales:handover:doc [deal]          → 09_handover-package.md
/presales:deal:close-plan              → 10_close-plan.md
/presales:account:nurture              → 11_nurture-plan.md
```

## Lifecycle commands (run at each stage)

```
Pre-call:    /presales:discovery:tfq              Gate: should we invest SC time?
Pre-call:    /presales:discovery:qualify          MEDDPICC health check
Pre-call:    /presales:discovery:prep             Question plan for next call
Post-call:   /presales:discovery:summary          Structured notes → 02_discovery-notes.md
Post-call:   /presales:discovery:golden-hours     Debrief, AE brief, CRM update, 24-h plan
Pre-demo:    /presales:demo:pre-invite            Agenda email to customer (24-48h before)
Post-demo:   /presales:demo:post-followup         Recap + next step email
Internal:    /presales:value:orc                  Opportunity Review Call [ORC] — cross-team qualify in / out
Close:       /presales:deal:close-plan            Pick and script the close
Handover:    /presales:handover:doc               PreSales → PS handover package
Post-close:  /presales:account:nurture            Check-ins, feedback, references
```
