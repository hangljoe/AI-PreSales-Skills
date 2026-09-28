# Command Reference

All available commands. They ship in the **`presales` plugin** — install it once and they're available everywhere (see `README.md`).

> This file is a quick-scan reference. For worked examples and phase-by-phase guidance, run `/presales:guide`.
> For the complete technical inventory, see `STACK.md`.

---

## Quick Start

| Situation | Command |
|-----------|---------|
| Not sure what to run | `/presales:guide` |
| Research before a call | `/presales:account:brief [company]` |
| Prep for a discovery call | `/presales:discovery:prep [account] [persona] [product]` |
| After a discovery call | `/presales:discovery:summary` |
| Build the demo | `/presales:demo:storyboard [product]` |
| Build business case | `/presales:value:roi-case [deal]` |
| Plan a PoC | `/presales:deal:poc-plan [deal]` |
| Draft the OSD | `/presales:handover:osd-draft [deal]` |
| Hand over to delivery | `/presales:handover:doc [deal]` |

---

## Presales Commands

Invoked as `/presales:<phase>:<name>`.

### Daily/Weekly Operating Loop

| Command | Purpose |
|---------|---------|
| `/presales:brain:setup` | Guided one-pass setup — folder, big rocks, profile, day/week boundaries, focus areas, training target, voice, optional automation |
| `/presales:brain:start` | Start my day — one prioritized morning brief from journal, big rocks, calendar, mail, Teams, and assigned tasks |
| `/presales:brain:end` | End my day — two-minute check-in that writes today's journal entry to your OneDrive |
| `/presales:brain:start-week` | Start my week — week-ahead brief with a focus-area-filtered newsletter digest |
| `/presales:brain:end-week` | End my week — weekly rollup, training-time check against your target, confirm-gated calendar booking if short |
| `/presales:brain:rocks` | Review or set your quarterly big rocks |
| `/presales:brain:learn` | Monthly or quarterly learning plan on the 70/30 rule |
| `/presales:brain:voice` | Build or refresh your personal writing style guide from your sent mail |

### Discovery & Qualification

| Command | Purpose |
|---------|---------|
| `/presales:discovery:qualify [deal]` | MEDDPICC scoring — find gaps before the customer does |
| `/presales:discovery:sales [deal]` | Sales Discovery [MEDDPICC] — commercial qualification conversation, then score whether the deal is real |
| `/presales:discovery:prep [account] [persona] [product]` | Build a call plan — objectives, questions, hypotheses |
| `/presales:discovery:questions [account] [persona] [product]` | Question card only (discovery-ftd card mode) — persona-specific SPIN / MEDDPICC questions |
| `/presales:discovery:summary` | Structure call notes into pains, stakeholders, MEDDPICC, next steps |
| `/presales:discovery:tfq [account] [product]` | Technical & Functional Qualification — gated Invest/Conditional/Pause pre-investment gate (hard gates + kill-list) |
| `/presales:discovery:golden-hours [account]` | 24-hour plan after a key call, from the call summary — debrief, AE brief, CRM update, action plan |
| `/presales:discovery:orc [deal name]` | Opportunity Review Call (ORC) — cross-department agenda: MEDDPICC, PS readiness, qualify in/out |

### Account & Stakeholder Intelligence

| Command | Purpose |
|---------|---------|
| `/presales:account:brief [account]` | Research-backed one-pager before first contact |
| `/presales:deal:champion-enable [account] [champion name/title] brief` | Quick champion brief — talking points, objection responses, proof points |
| `/presales:account:journey [account]` | Buying-journey stage, your actions per stage, early-engagement check |
| `/presales:account:map [account]` | Mutual Action Plan (MAP) — the mandatory post-call deliverable |
| `/presales:account:stakeholders [account]` | Client map — decision board, personas, sentiment, gaps → 02b |
| `/presales:account:expand [account]` | Renewal / expansion discovery for an existing customer → 12 |

### Demo Preparation & Follow-Up

| Command | Purpose |
|---------|---------|
| `/presales:demo:pre-invite [account] [date]` | Pre-demo invite email with agenda and logistics |
| `/presales:demo:storyboard [product]` | Full Tell-Show-Tell storyboard using the PCV (Pain-Capability-Value) structure |
| `/presales:demo:script [storyboard or deal context]` | Word-for-word demo script from a storyboard |
| `/presales:demo:post-followup [account]` | Post-demo follow-up email — recap, resonance, next step |
| `/presales:demo:picture-pitch [account] [persona]` | Standalone Picture Pitch image sequence → 05a |

### Value & Commercial

| Command | Purpose |
|---------|---------|
| `/presales:value:pain-to-value [discovery notes or pain statements]` | Map customer pains to your product's capabilities and measurable value |
| `/presales:value:roi-case [deal]` | ROI business case — 3+ value drivers, Risk Factor, hard vs. soft value |
| `/presales:value:realized [account]` | Post-implementation value check vs the ROI case → 13 |

### Deal Execution

| Command | Purpose |
|---------|---------|
| `/presales:deal:objection-drill [objection]` | Structured objection handling using tactical empathy |
| `/presales:deal:poc-plan [deal] [use cases]` | PoC plan with success criteria, timeline, out-of-scope, governance |
| `/presales:deal:exec-summary [deal]` | Executive summary of deal status for the Economic Buyer |
| `/presales:deal:champion-enable [account] [champion] [brief|kit]` | Champion enablement kit — internal selling language and EB coaching |
| `/presales:deal:proposal [deal]` | Formal commercial proposal — cover letter to next step |
| `/presales:deal:poc-readout [deal]` | PoC check-ins, scorecard against success criteria, findings readout |
| `/presales:deal:close-plan [deal]` | Pick and script one of the four closes, set the stage, plan a fallback |
| `/presales:deal:strategic-think [problem]` | TOC + BBiT structured thinking for complex or stuck deals |
| `/presales:deal:poc-to-prod [deal]` | PoC-to-production transition and SOW inputs → 06b |

### RFP / RFI Response

| Command | Purpose |
|---------|---------|
| `/presales:rfp:analyze [account] [RFP]` | Go/No-Go Analyzer — should we bid? 5-dimension weighted scoring |
| `/presales:rfp:respond [account] [RFP]` | Response Writer — maps requirements to capabilities, drafts compliant responses |
| `/presales:rfp:present [account]` | Response Presentation — polished deck for shortlist panel |
| `/presales:rfp:security [questionnaire]` | Security / compliance questionnaire from your trust library |

### Delivery Handover

| Command | Purpose |
|---------|---------|
| `/presales:handover:osd-draft [deal]` | Draft the Opportunity Scoping Document (OSD) |
| `/presales:handover:doc [deal]` | Complete PreSales → Professional Services handover package |
| `/presales:handover:nurture [account]` | Post-close plan — check-ins, feedback, references, expansion |
| `/presales:handover:architecture [account]` | Solution architecture document → 07a |

### Leader-only (PreSales leaders, handbook ch. 22 — not routed by `/presales:guide`)

| Command | Purpose |
|---------|---------|
| `/presales:leader:prequal [deals]` | Readiness sweep across one or many deals before the TFQ (wraps `deal-prequal`) |
| `/presales:leader:metrics [export] [period]` | Team KPI scorecard, distribution framed as 1:1 questions, never a ranking (wraps `presales-metrics`) |
| `/presales:leader:pipeline-review [period]` | Weekly deal review agenda: deals by stage, SC hours, verdicts, three decisions |
| `/presales:leader:one-on-one [SC]` | SC 1:1 from the scorecard and what the SC shares: wins, blockers, one goal, one ask |
| `/presales:leader:capacity` | Capacity math: hours, close rate, deal size → deliverable revenue, headcount, quota coverage |
| `/presales:leader:onboarding [new SC]` | 30-60-90 plan for a new SC with shadow / reverse-shadow and the first solo demo gate |
| `/presales:leader:hiring [role]` | SC interview kit: scorecard, demo role-play brief, rubric, debrief template |

---

## Skills — Natural Language Triggers

Skills activate automatically when you say the right phrase. No slash needed.

### Quality & Review

| Say something like… | Skill |
|--------------------|-------|
| "tag this" / "add confidence tags" / "quality check this" | `confidence-tagger` |

### Discovery & Qualification

| Say something like… | Skill |
|--------------------|-------|
| "discovery prep" / "what should I ask" / "call prep" / "FTD" | `discovery-ftd` |
| "find the CBIs" / "what's the real pain" / "critical business issue" | `critical-business-issue-finder` |
| "assess the integration complexity" / "tech stack assessment" / "integration risk" | `integration-complexity` |
| "sales discovery" / "is this deal real" | `discovery-sales` |

### Demo & Communication

| Say something like… | Skill |
|--------------------|-------|
| "demo prep" / "build a demo flow" / "Tell-Show-Tell" | `demo-storyboard` |
| "dry run my demo" / "demo rehearsal" / "coach me through the demo" | `demo-dryrun-coach` |
| "write a follow-up email" / "post-call email" / "draft a recap" | `field-comms-writer` |
| "structure these notes" / "tidy up my notes" / "action items from this call" | `discovery-transformer` → `/presales:discovery:summary` |

### Deal Health

| Say something like… | Skill |
|--------------------|-------|
| "how strong is my champion" / "champion health check" / "is my champion real" | `champion-health` |
| "I'm stuck on a deal" / "what's my next move" / "is the PoC on track" / "coach me" | `presales-coach` |

### Deal Intelligence

| Say something like… | Skill |
|--------------------|-------|
| "how do we beat [Competitor]" / "battlecard for [Competitor]" | `competitive-battlecard` |
| "debrief this win" / "why did we lose" / "win/loss debrief" | `win-loss-analyzer` |
| "negotiation prep" / "they're pushing on price" | `negotiation-prep` |
| "plan the OSD" / "structure the OSD" | `osd-architect` |

### Commercial & Executive

| Say something like… | Skill |
|--------------------|-------|
| "stress test this business case" / "CFO prep" / "challenge the ROI" | `business-case-stress-tester` |
| "exec briefing prep" / "C-suite meeting prep" / "EBC prep" / "briefing the CFO" | `exec-briefing-prep` |
| "pricing conversation" / "how to introduce the price" / "value before price" | `pricing-positioning` |
| "hard conversation" / "handle this objection" / "objection coaching" | `tactical-empathy-coach` |

### RFX

| Say something like… | Skill |
|--------------------|-------|
| "we got an RFP" / "received an RFI" / "should we bid" / "bid or no bid" | `rfx-navigator-presales` |

### Content & Visualization

| Say something like… | Skill |
|--------------------|-------|
| "create a demo video" / "help me record a demo" / "demo video script" / "video brief" | `video-demo-creator` |
| "create slides" / "make a deck" / "generate a presentation" | `pptx-generator` |
| "generate a word doc" / "create a proposal document" | `docx-generator` |
| "humanize this" / "sounds like AI" | `humanize` |
| "diagram this" / "visualize" / "draw a flow" | `diagram` |
| "write a LinkedIn post" / "turn this into a post" | `linkedin-post` |

---

### Leader-only skills

| Skill | How to invoke |
|-------|---------------|
| `deal-prequal` | `/presales:leader:prequal` — no natural-language trigger |
| `presales-leader` | `/presales:leader:pipeline-review` · `one-on-one` · `capacity` · `onboarding` · `hiring` |

## Utilities

| Say something like… | Skill |
|--------------------|-------|
| "map their problems to our capabilities" / "capability heat map" | `capability-mapper` |
| "build a workshop agenda" / "EBC agenda" | `workshop-agenda-builder` |
| "scope from discovery" | `osd-scoper` |
| "process this transcript" / "discovery transformer" | `discovery-transformer` |
| "run the TFQ" | `tfq` |
| "think like a BBiT expert" | `toc-bbit-expert` |
| "they might do nothing" / "status quo is our competitor" | `do-nothing-buster` |
| "build my learning plan" | `learning-plan` |
| "build my scorecard" / "team metrics dashboard" | `presales-metrics` |
| "capture this for the team" | `knowledge-capture` |
| "set up my second brain" | `second-brain` |
| "RAG ready markdown" | `rag-markdown` |
| "security questionnaire" / "SIG" / "CAIQ" | `security-questionnaire` |
| "solution architecture" / "migration assessment" | `solution-architecture` |

---

## Typical Workflows

### Preparing for a new opportunity
```
/presales:account:brief [company]         ← research the account
/presales:discovery:qualify [deal]        ← initial MEDDPICC gap check
/presales:discovery:prep [account] [persona] [product]  ← call plan
```

### After discovery
```
/presales:discovery:summary               ← structure the call notes
/presales:discovery:golden-hours [account] ← post-call action plan
/presales:value:pain-to-value             ← map pains to capabilities
```

### Building the demo
```
/presales:demo:storyboard [product]       ← full Tell-Show-Tell storyboard
/presales:demo:pre-invite [account] [date] ← invite with agenda
← day of demo: say "dry run my demo" → demo-dryrun-coach skill activates
```

### Building the business case
```
/presales:value:roi-case [deal]               ← ROI business case
← say "stress test this business case"       ← pressure-test before the CFO meeting
/presales:deal:exec-summary [deal]            ← exec-level summary
← say "exec briefing prep"                   ← agenda and coaching for C-suite meeting
/presales:discovery:orc [deal]                ← cross-department Opportunity Review Call
← say "champion health check"                ← diagnose champion strength
```

### Responding to an RFP
```
/presales:rfp:analyze [account] [RFP]     ← should we bid?
/presales:rfp:respond [account] [RFP]     ← draft response
/presales:rfp:present [account]           ← shortlist presentation deck
/presales:rfp:security [questionnaire]    ← security / compliance questionnaire
```

### Closing and handing over
```
/presales:deal:champion-enable [account] [champion] [brief|kit] ← enable your champion
/presales:deal:proposal [deal]            ← formal commercial proposal
/presales:handover:osd-draft [deal]       ← draft the OSD
/presales:deal:poc-to-prod [deal]         ← PoC-to-production transition
/presales:handover:architecture [account] ← solution architecture document
/presales:handover:doc [deal]             ← full handover package
say "debrief this win" or "why did we lose" ← win/loss debrief
```

## See Also

- `README.md` — quick start and full platform guide
- `CLAUDE.md` — project rules and how to add skills
- `STACK.md` — authoritative inventory of all skills and commands
- `/presales:guide` — full phase-by-phase presales guide with worked examples
