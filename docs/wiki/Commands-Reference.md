# Commands Reference

All 54 slash commands in the **presales** plugin, invoked as `/presales:<phase>:<name>`. Text in `[brackets]` after a command is optional context you can type after it; if you leave it out, Claude asks for what it needs.

Most commands read from and write to your local deal folder (see [[Deal-Folder]]). The last column names the file a command produces there, when it produces one. Commands with "None" either produce chat-only output (an email, a script, an agenda) or write somewhere else, which is noted.

For which command to run at which stage of a deal, see [[The-Deal-Journey]]. For the natural-language skills behind these commands, see [[Skills-Reference]].

## Guide

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:guide` | `[a phase name, or "list" for the full map]` | Interactive router. Describe your situation and it points you to the right skill or command, or shows the full phase map. | None |

## Brain (your personal operating loop)

These commands write to your personal second-brain folder, not the deal folder; run `/presales:brain:setup` once to create it.

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:brain:setup` | None | One-time guided setup: folder, big rocks, profile, day and week boundaries, focus areas, training target, voice. | None |
| `/presales:brain:start` | None | Morning brief, prioritised from your journal, big rocks, calendar and mail. | None |
| `/presales:brain:end` | None | Two-minute evening check-in that writes today's journal entry. | None |
| `/presales:brain:start-week` | None | Week-ahead brief with a focus-area-filtered newsletter digest. | None |
| `/presales:brain:end-week` | None | Weekly review with a training-time check against your target. | None |
| `/presales:brain:rocks` | None | Review or set your 3 to 5 quarterly big rocks. | None |
| `/presales:brain:voice` | None | Builds your personal writing style guide (VOICE.md) from your sent mail. | None |
| `/presales:brain:learn` | `[month \| quarter \| review]` | Monthly or quarterly learning plan on the handbook's 70/30 rule. | None |

## Discovery & qualification

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:discovery:prep` | `[account] [persona] [product]` | Discovery call prep sheet: reuses or builds the account brief, adds persona hypotheses, then a question plan. | None (reads `01_account-brief.md`) |
| `/presales:discovery:questions` | `[account] [persona] [product]` | Question card only: tailored SPIN and MEDDPICC questions by persona and product. | None |
| `/presales:discovery:sales` | `[account or opportunity name]` | Runs the commercial Sales Discovery (MEDDPICC) conversation and scores whether the deal is real. | None |
| `/presales:discovery:summary` | `[call or meeting notes / transcript]` | Structures notes or a transcript into the kit's shared call summary: attendees, pains, MEDDPICC delta, next steps. | `02_discovery-notes.md` |
| `/presales:discovery:golden-hours` | `[account] [call summary, or raw notes]` | The 24-hour plan after a key call: debrief, AE brief, confirm-gated CRM update, action plan. | None |
| `/presales:discovery:qualify` | `[opportunity name or description]` | Scores the opportunity on MEDDPICC out of 40, with gaps and next actions. | `02a_meddpicc-score.md` |
| `/presales:discovery:tfq` | `[opportunity name or description]` | Technical & Functional Qualification: a gated Invest, Conditional or Pause decision before you commit SC time. Wrapper for the `tfq` skill. | None |
| `/presales:discovery:orc` | `[opportunity name]` | Opportunity Review Call agenda: cross-department qualify in or out. | None |

## Account & stakeholder intelligence

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:account:brief` | `[account name or domain]` | One-page company brief: firmographics, operational footprint, signals and hypotheses. | `01_account-brief.md` |
| `/presales:account:journey` | `[account] [what you know about where they are]` | Places the buyer on the buying journey, maps your actions per stage, flags whether you engaged early enough. | `01a_buying-journey.md` |
| `/presales:account:map` | `[account] [deal stage]` | Builds the Mutual Action Plan (MAP), the mandatory post-call deliverable. | `03_mutual-action-plan.md` |
| `/presales:account:stakeholders` | `[account] [what you know about the buying group]` | Client stakeholder map: decision-board departments, personas, influence, sentiment, who's missing. | `02b_stakeholder-map.md` |
| `/presales:account:expand` | `[account] [renewal date or expansion signal]` | Renewal and expansion discovery for an existing customer: adoption, realised value, whitespace, renewal risk. | `12_expansion-plan.md` |

## Demo

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:demo:pre-invite` | `[account] [demo date/time] [product focus]` | Pre-demo invite email with agenda, recording notice and webcam ask. | None |
| `/presales:demo:storyboard` | `[product]` | Full Tell-Show-Tell plus PCV (Pain-Capability-Value) demo storyboard and run order, built from discovery pains. | `05_demo-storyboard.md` |
| `/presales:demo:script` | `[storyboard or deal context]` | Word-for-word, print-ready demo script generated from an existing storyboard. | None (reads `05_demo-storyboard.md`) |
| `/presales:demo:post-followup` | `[account] [demo date] [what resonated most]` | Post-demo follow-up email within 24 hours: recap, pains addressed, next step. | None |
| `/presales:demo:picture-pitch` | `[account or persona]` | Standalone Picture Pitch: the 5 to 10 image opening sequence, run on its own. | `05a_picture-pitch.md` |

## Value

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:value:pain-to-value` | `[discovery notes or pain statements]` | Maps customer pains to your capabilities and measurable value outcomes, confidence-tagged. | `04_pain-to-value.md` |
| `/presales:value:roi-case` | `[account] or paste discovery metrics` | Value and ROI business case with three or more value drivers, risk-adjusted value and payback. | `04a_roi-case.md` |
| `/presales:value:realized` | `[account]` | Post-implementation value check against the ROI case: promised vs measured, adoption blockers, reference-ready verdict. | `13_value-realized.md` |

## Deal & closing

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:deal:poc-plan` | `[use cases or objectives]` | Checks whether a PoC is needed at all, then plans use cases, success criteria, data handling, owners and timeline. | `06_poc-evaluation-plan.md` |
| `/presales:deal:poc-readout` | `[check-in \| scorecard \| readout] [account]` | Weekly PoC check-ins, a scorecard against the success criteria, and the findings readout. | `06a_poc-readout.md` |
| `/presales:deal:objection-drill` | `[paste the objection]` | Handles one objection: Listen, Empathise, Probe, Address, Confirm. | None |
| `/presales:deal:champion-enable` | `[account] [champion name/title] [brief\|kit] [Economic Buyer name/title]` | Champion brief for an early champion, or the full Economic Buyer enablement kit once champion-health passes. | None |
| `/presales:deal:exec-summary` | `[deal name or account]` | One-page executive summary of a deal or account for leadership. | None |
| `/presales:deal:proposal` | `[account] [products] [deal value]` | Formal commercial proposal: cover letter, solution narrative, outcomes, investment, a specific next step. | None |
| `/presales:deal:close-plan` | `[account] [target close date]` | Picks one of the handbook's four closing techniques, scripts it for SC and AE, and plans a fallback. | `10_close-plan.md` |
| `/presales:deal:strategic-think` | `[describe the situation, problem, or challenge]` | Applies Theory of Constraints and Black Belt in Thinking to a stuck or complex deal. | None |
| `/presales:deal:poc-to-prod` | `[account] [PoC or trial outcome]` | PoC or trial-to-production transition: keep vs rebuild, gap closure, SOW inputs, timeline to go-live. | `06b_poc-to-prod.md` |

## RFX

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:rfp:analyze` | `[account name] [RFP/RFI document or description]` | Go/no-go analysis: scores fit, relationship and win probability before you commit SC resources. | None |
| `/presales:rfp:respond` | `[account name] [requirements or a description of the document]` | Maps every requirement to a capability, drafts compliant responses, tracks coverage. | None (saves to your RFP library, not the deal folder) |
| `/presales:rfp:present` | `[account name] [coverage matrix or response summary]` | Builds the RFX response presentation deck to go with the written response. | None (saves to a `decks/` folder, not the deal folder) |
| `/presales:rfp:security` | `[questionnaire file or paste]` | Security or vendor-risk questionnaire response from your own trust library. Wrapper for the `security-questionnaire` skill. | None |

## Handover

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:handover:osd-draft` | `[account name]` | Drafts the Opportunity Scoping Document (OSD), structured as in handbook chapter 8. | `07_osd-draft.md` |
| `/presales:handover:doc` | `[deal name]` | PreSales-to-Professional-Services handover package, drafted at technical win and finalised at signature, plus a handover-call agenda. | `09_handover-package.md` |
| `/presales:handover:nurture` | `[account] [signature or go-live date]` | Post-close plan: check-ins, feedback asks, reference path, expansion signals. | `11_nurture-plan.md` |
| `/presales:handover:architecture` | `[account name]` | Customer-facing solution architecture document: target architecture, integrations, sizing, data migration. Wrapper for the `solution-architecture` skill. | `07a_solution-architecture.md` |

## Leader-only

For PreSales leaders (handbook ch. 22), not individual-contributor SCs. See [[Leader-Tools]] for the full picture, including the natural-language skills they wrap.

| Command | Arguments | What it does | Deal-folder file |
|---|---|---|---|
| `/presales:leader:capacity` | `[quota, close rate, hours per deal — or "walk me through it"]` | SC capacity and headcount math: forecast from quota, close rate and hours per deal. | None |
| `/presales:leader:hiring` | `[role level, must-have skills]` | SC hiring kit: role scorecard, demo role-play brief, scoring rubric, debrief template. | None |
| `/presales:leader:metrics` | `[team CRM export or numbers] [period]` | Team KPI scorecard for resource decisions and coaching, never a ranking of individuals. | None |
| `/presales:leader:onboarding` | `[new SC name, start date, product(s)]` | New-SC 30-60-90 onboarding plan: week by week, shadow and reverse-shadow, first solo demo gate. | None |
| `/presales:leader:one-on-one` | `[SC name] [period since last 1:1]` | SC one-on-one: wins, blockers, one development goal, one ask. | None |
| `/presales:leader:pipeline-review` | `[pipeline export or deal list] [cadence]` | Weekly pipeline review: deals by stage, SC hours, TFQ/ORC verdicts, three decisions to make. | None |
| `/presales:leader:prequal` | `[deal list, pipeline export, or "all open"]` | Readiness sweep across one or many deals before the TFQ. Wrapper for the `deal-prequal` skill. | None |

---

54 commands in total: 1 guide, 8 brain, 8 discovery, 5 account, 5 demo, 3 value, 9 deal, 4 RFX, 4 handover, 7 leader-only.
