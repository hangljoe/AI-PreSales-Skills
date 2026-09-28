# Skills Reference

All 42 skills in the **presales** plugin. Skills switch on when you say something close to one of the trigger phrases below, with no slash command needed. If a skill also has a slash command that wraps it, that command is the explicit-workflow path into the same skill; the trigger phrase is the conversational path.

If you're not sure which one you need, run `/presales:guide` or see [[The-Deal-Journey]]. For the slash commands themselves, see [[Commands-Reference]].

## Discovery & qualification

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `discovery-sales` | Commercial Sales Discovery anchored on MEDDPICC. Decides whether the deal is real; hands scoring to the qualify command. | "sales discovery", "qualify this deal commercially", "MEDDPICC discovery" | `/presales:discovery:sales` |
| `discovery-ftd` | Functional & Technical Discovery for any B2B product: research, opening framework, product-specific questions, a branded questionnaire or post-call summary. | "run discovery", "discovery session", "FTD" | `/presales:discovery:prep`, `/presales:discovery:questions` |
| `discovery-transformer` | Turns a meeting `.vtt` transcript into clean Markdown filed in the deal folder, plus a Discovery Summary with a coverage check, MEDDPICC delta and follow-up email. | "discovery transformer", "save my transcript", "process this vtt" | None (hands off to `/presales:discovery:summary`) |
| `critical-business-issue-finder` | Surfaces the 2 to 4 Critical Business Issues driving the deal, separated from symptoms and feature requests. | "find the CBIs", "what are the critical business issues", "surface the real problems" | None |
| `tfq` | Technical & Functional Qualification: a gated Invest, Conditional or Pause decision, with an HTML dashboard. | "run the TFQ", "TFQ", "functional technical qualification" | `/presales:discovery:tfq` |

## Scoping & solution

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `osd-scoper` | Translates discovery output into the OSD's 11-section scope: module decisions, as-is/to-be, cited enrichment, prioritised gaps. Living document, re-run after each session. | "scope from discovery", "OSD scope", "OSD scoping" | None |
| `osd-architect` | Generates the full Opportunity Scoping Document as a branded Word file with diagrams, update-in-place, shareable copy and a PS scoping workbook. | "OSD", "opportunity scoping document", "draft the OSD" | `/presales:handover:osd-draft` |
| `capability-mapper` | Maps customer problems to your own capability list: a Technology and Operating Model heat map with ranked recommendations. | "map their problems to our capabilities", "capability assessment", "which of our solutions fit" | None |
| `integration-complexity` | Rates the complexity and risk of connecting the prospect's systems to your platform, with an effort estimate and risk flags. | "assess the integration complexity", "integration landscape", "how complex is their tech stack" | None |
| `workshop-agenda-builder` | Time-boxed customer workshop or executive briefing agenda, built from a modular section library. | "build a workshop agenda", "plan an EBC", "customer discovery day" | None |
| `solution-architecture` | Customer-facing solution architecture document: target architecture, integration touchpoints, sizing, data-migration assessment. | "solution architecture document", "customer-facing architecture document", "target architecture and integration touchpoints" | `/presales:handover:architecture` |

## Demo

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `demo-storyboard` | Tell-Show-Tell storyboard with first-person persona narration and Pain-Capability-Value logic. | "demo prep", "build a demo flow", "Tell-Show-Tell storyboard" | `/presales:demo:storyboard`; its Picture Pitch step also runs standalone via `/presales:demo:picture-pitch` |
| `demo-dryrun-coach` | Rehearses a demo: Tell-Show-Tell compliance, pain mapping, timing, likely objections. | "dry run my demo", "practice this demo", "coach me through the demo" | None |
| `video-demo-creator` | Guides a demo video or click-through from brief and script through recording, editing and a 13-point validation. | "create a demo video", "help me record a demo", "demo video script" | None |

## Value & commercial

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `business-case-stress-tester` | Pressure-tests an existing ROI or business case before the customer's finance team does. | "stress test this business case", "challenge the ROI", "CFO prep" | None |
| `pricing-positioning` | Puts value before price and handles "too expensive" without discounting. | "pricing conversation", "how to position our price", "when they ask about cost" | None |
| `negotiation-prep` | Negotiation brief: positions, walk-away point, trade levers, concession sequence. | "negotiation prep", "prepare for commercial discussion", "deal terms coming up" | None |
| `exec-briefing-prep` | Agenda, persona talking points and hard-question coaching for a C-level meeting. | "exec briefing prep", "executive meeting prep", "EBC prep" | None |

## Deal coaching

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `presales-coach` | Diagnoses a stuck deal's constraint by phase, checks PoC health, and gives three concrete next actions plus the right tool. | "I'm stuck on a deal", "deal is going cold", "coach me on this deal" | None |
| `champion-health` | Tells a friendly contact from a real advocate. The gate before you invest in champion enablement. | "how strong is my champion", "is my champion real", "champion health check" | None (gate before `/presales:deal:champion-enable`) |
| `do-nothing-buster` | Diagnoses "no decision" risk against the handbook's nine status-quo causes and builds a counter-plan. | "they might do nothing", "no decision risk", "status quo is our competitor" | None |
| `tactical-empathy-coach` | Coaches objection responses with labels, mirrors and calibrated questions. | "objection coaching", "handle this objection", "hard conversation" | `/presales:deal:objection-drill` |
| `competitive-battlecard` | Honest positioning card against any named competitor or an in-house build, with a SWOT. | "competitive battlecard", "how do we beat", "positioning vs" | None |
| `toc-bbit-expert` | Theory of Constraints and Black Belt in Thinking coach for complex problems, with diagrams. | "think like a BBiT expert", "BBiT me on this", "apply theory of constraints" | None (sibling of `/presales:deal:strategic-think`) |
| `win-loss-analyzer` | Win/loss debrief: a quick solo mode, a team lessons-learned session, or a customer interview. | "debrief this win", "analyze why we lost", "win loss debrief" | None |

## RFX

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `rfx-navigator-presales` | Entry point when an RFI, RFP, RFQ or tender lands: identifies the type, scans fit, routes to the right RFX command. | "we got an RFP", "received an RFI", "RFQ just came in" | None (routes to `/presales:rfp:*`) |
| `security-questionnaire` | Answers SIG, CAIQ, ISO 27001, SOC 2 and vendor-risk questionnaires from your own trust library. | "security questionnaire", "vendor risk assessment", "SIG questionnaire" | `/presales:rfp:security` |

## Communication & content

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `field-comms-writer` | Tone-matched 1:1 follow-ups, recaps and chasers after customer moments. | "write a follow-up email", "send a recap", "follow up on today's call" | None |
| `confidence-tagger` | Labels every claim Confirmed, Inferred or Unknown before material leaves your team. | "tag this", "add confidence tags", "flag the assumptions" | None |
| `humanize` | Strips AI tells from customer-facing prose. | "humanize this", "de-AI this text", "sounds like AI" | None |
| `linkedin-post` | LinkedIn posts built from your PreSales insights, for your personal brand. | "write a LinkedIn post", "LinkedIn post about", "turn this into a post" | None |
| `diagram` | Excalidraw diagrams that make a visual argument: flows, architectures, deal maps. | "diagram this", "generate diagram", "architecture diagram" | None |
| `pptx-generator` | On-brand PowerPoint decks. | "create a powerpoint", "powerpoint deck", "PPTX deck" | None |
| `docx-generator` | On-brand Word documents: proposals, summaries, letters, OSDs, handovers. | "create a word document", "turn this into a word doc", "branded word version" | None |

## Productivity & utilities

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `learning-plan` | Builds a personal learning plan on the handbook's 70/30 rule: goals, weekly learning block, sources, accountability. | "build my learning plan", "learning plan", "learning goals for this quarter" | `/presales:brain:learn` |
| `presales-metrics` | KPI scorecard for one SC or a team, from a CRM export or your own numbers, with three improvement actions and an optional HTML dashboard. | "presales KPIs", "presales metrics", "build my scorecard" | `/presales:leader:metrics` (team view) |
| `knowledge-capture` | Turns a win, demo flow, RFP answer or objection into a reusable asset in your own knowledge folder; wiki writes are confirm-gated. | "capture this for the team", "add this to our knowledge base", "make this reusable" | None |
| `second-brain` | Your personal daily and weekly operating loop: morning brief, journal, big rocks, writing voice. | "set up my second brain", "second brain setup", "onboard me to second brain" | `/presales:brain:setup`, `start`, `end`, `start-week`, `end-week`, `rocks`, `voice` |
| `rag-markdown` | Converts any source (PDF, slides, Word, web page) into one clean, RAG-ready Markdown file. | "RAG ready markdown", "convert to markdown for RAG", "make this RAG ingestible" | None |

## Leader-only

For PreSales leaders (handbook ch. 22), not individual-contributor SCs. They aren't routed by `/presales:guide`; mention one only if a leader asks for it by name. See [[Leader-Tools]] for the full picture.

| Skill | What it does | Say something like… | Command |
|---|---|---|---|
| `deal-prequal` | Readiness sweep across one or many deals before the TFQ: checks whether the MEDDPICC foundation justifies SC time, reads deal momentum, returns a 3-band readiness call plus ready-to-send AE follow-ups. | No natural-language trigger; leader-only | `/presales:leader:prequal` |
| `presales-leader` | Leader operating skill with five modes: pipeline review, SC one-on-one, capacity math, new-SC onboarding (30-60-90), SC hiring kit. | Invoke by command rather than by phrase | `/presales:leader:capacity`, `hiring`, `onboarding`, `one-on-one`, `pipeline-review` |

## Internal

| Skill | Role |
|---|---|
| `brand` | Shared brand registry: colours, fonts, logo paths and per-format settings. Not user-invoked; read by `pptx-generator`, `docx-generator`, `osd-architect`, `discovery-ftd` and `/presales:rfp:present` when they render. Ships one example brand, `presales-handbook`. See [[Customising]] to add your own. |

---

42 skills in total: 5 discovery & qualification, 6 scoping & solution, 3 demo, 4 value & commercial, 7 deal coaching, 2 RFX, 7 communication & content, 5 productivity & utilities, 2 leader-only, 1 internal.
