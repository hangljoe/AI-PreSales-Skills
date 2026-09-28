The kit follows the flow of [The PreSales Handbook](https://www.presales-handbook.com) (site source: [book repository on GitHub](https://github.com/hangljoe/presales-handbook.com)). Real deals loop back and skip
phases; RFX can start at any point. Each phase below names the handbook chapter, the question it
answers, the command or skill to run first, what it reads from and writes to the deal folder, and
the hand-off to the next phase. File numbers are the [[Deal-Folder]] convention; the full command
list is in [[Commands-Reference]].

## 1. Sales discovery (ch. 5)

**Question:** Is there a real deal here?

**Run first:** the `discovery-sales` skill, or `/presales:account:brief` if you have not engaged the
account yet.

**Reads:** nothing yet on a brand-new account; `01_account-brief.md` if a brief already exists.

**Writes:** `/presales:account:brief` → `01_account-brief.md`. `/presales:account:journey` → `01a_buying-journey.md`
(where the buyer sits on the buying journey, ch. 3). `discovery-sales` hands off to
`/presales:discovery:qualify` for the /40 score.

**Hand-off:** a real, qualifying opportunity moves to phase 2.

## 2. Qualify (ch. 4, 6)

**Question:** Do we actually have a deal worth pursuing, and who is really in it?

**Run first:** `/presales:discovery:qualify`.

**Reads:** `01_account-brief.md` if present.

**Writes:** `02a_meddpicc-score.md` (MEDDPICC /40 with gaps and next actions).
`/presales:account:stakeholders` → `02b_stakeholder-map.md` (decision-board departments, personas,
sentiment). `/presales:account:map` → `03_mutual-action-plan.md`, the mandatory post-call MAP. The
`champion-health` skill diagnoses champion strength but writes no numbered file on its own.

**Hand-off:** a qualifying deal with a mapped buying group moves into functional and technical
discovery.

## 3. Functional & technical discovery (ch. 7)

**Question:** What does the customer actually need, and what does their landscape look like?

**Run first:** the `discovery-ftd` skill, or `/presales:discovery:prep` the night before the call.

**Reads:** `01_account-brief.md`, `02_discovery-notes.md`, `03_mutual-action-plan.md` if they exist.

**Writes:** `/presales:discovery:summary` → `02_discovery-notes.md` (the rolling call-summary file).
The `discovery-transformer` skill instead writes a dated `YYYY-MM-DD_<Account>_discovery-summary.md`
next to it, keeping `02_discovery-notes.md` as the rolling file. `/presales:discovery:golden-hours`
runs the 24-hour debrief and CRM update off that summary. `critical-business-issue-finder` and
`workshop-agenda-builder` support the call but write no numbered file of their own.

**Hand-off:** confirmed pains and landscape data feed the scope.

## 4. Discovery summary / OSD (ch. 8)

**Question:** What exact solution are we proposing?

**Run first:** `osd-scoper` on the discovery notes, then `osd-architect` (wrapped by
`/presales:handover:osd-draft`).

**Reads:** `02_discovery-notes.md`, `04b_requirement-fit.md` if `capability-mapper` has run,
prior scope drafts.

**Writes:** `/presales:handover:osd-draft` → `07_osd-draft.md` (the working OSD; `osd-architect`'s
branded Word file is the customer-facing copy and keeps its own name). Saying "map their problems
to our capabilities" runs `capability-mapper` → `04b_requirement-fit.md`. `integration-complexity`
assesses technical risk into the same scoping pass.

**Hand-off:** a scoped OSD is the input to the TFQ gate.

## 5. TFQ + ORC (ch. 9)

**Question:** Should we keep investing SC time in this deal?

**Run first:** `/presales:discovery:tfq` (wraps the `tfq` skill), which owns the whole
Invest / Conditional / Pause model.

**Reads:** `02_discovery-notes.md`, `02a_meddpicc-score.md`, `07_osd-draft.md` if it exists — the
handbook (9.1) qualifies on the OSD, though the kit also allows an early, provisional TFQ from
discovery evidence alone.

**Writes:** no numbered deal-folder file; the TFQ owns its own scorecard and CRM write-back.
`/presales:discovery:orc` builds the cross-department Opportunity Review Call agenda from the same
inputs when functional or technical fit needs a wider discussion.

**Hand-off:** an Invest or Conditional verdict moves to value and demo work; Pause routes back to
discovery or out of the pipeline.

## 6. Value & ROI (ch. 10)

**Question:** What is this worth to the customer, in their own numbers?

**Run first:** `/presales:value:pain-to-value`.

**Reads:** `02_discovery-notes.md` for confirmed metrics.

**Writes:** `/presales:value:pain-to-value` → `04_pain-to-value.md` (pain → capability → value
table). `/presales:value:roi-case` → `04a_roi-case.md` (handbook ROI %, risk-adjusted value,
payback). `business-case-stress-tester` pressure-tests the case before the customer's finance team
does. `/presales:value:realized` (post-implementation check) writes `13_value-realized.md` — see
"Existing customers" below.

**Hand-off:** the value case feeds the demo storyboard and, later, the proposal.

## 7. Demo and demo automation (ch. 11–12)

**Question:** How do we show the solution solving their specific pain?

**Run first:** `/presales:demo:storyboard`.

**Reads:** `02_discovery-notes.md`, `04_pain-to-value.md`.

**Writes:** `/presales:demo:storyboard` → `05_demo-storyboard.md` (Tell-Show-Tell run order).
`/presales:demo:picture-pitch` can build the opening image sequence standalone → `05a_picture-pitch.md`.
`/presales:demo:script` turns the storyboard into a verbatim script (no separate numbered file).
`demo-dryrun-coach` rehearses delivery. `/presales:demo:pre-invite` and `/presales:demo:post-followup`
send the agenda and recap emails. `video-demo-creator` builds a video or click-through version.

**Hand-off:** a demo that lands moves the deal toward a PoC or straight to proposal.

## 8. PoC (ch. 13)

**Question:** Does it actually work in their environment?

**Run first:** `/presales:deal:poc-plan`.

**Reads:** `02_discovery-notes.md`, `03_mutual-action-plan.md`, `04_pain-to-value.md`.

**Writes:** `/presales:deal:poc-plan` → `06_poc-evaluation-plan.md` (use cases, success criteria,
owners, timeline). `/presales:deal:poc-readout` (check-in or readout mode) → `06a_poc-readout.md`.
`/presales:deal:poc-to-prod` reads both and → `06b_poc-to-prod.md` (keep vs. rebuild, gap closure,
SOW inputs). The `presales-coach` skill checks PoC health mid-run.

**Hand-off:** a successful PoC readout feeds closing and, later, the handover package.

## 9. RFX (ch. 14)

**Question:** Should we bid, and how do we win it?

**Run first:** `rfx-navigator-presales` to triage, or `/presales:rfp:analyze` for the formal
go/no-go score.

**Reads:** account history and any deal-folder context pasted in; RFX content itself is treated as
untrusted external input.

**Writes:** `/presales:rfp:respond` produces the submission-ready response document; `/presales:rfp:present`
builds the accompanying deck; `/presales:rfp:security` (the `security-questionnaire` skill) answers
security/vendor-risk questionnaires from the user's own trust library. None of these write a
numbered deal-folder file — RFX outputs and the answer library live in the user's own folder (see
`references/rfp-library/README.md`).

**Hand-off:** an Invest or Conditional TFQ verdict (phase 5) gates whether RFX work proceeds; a won
RFX response rejoins the deal at value, demo, or closing depending on what the tender asked for.

## 10. Objections (ch. 15)

**Question:** How do we handle the pushback without losing the deal?

**Run first:** `/presales:deal:objection-drill` on the objection as stated.

**Reads:** the objection itself, plus deal context for a competitive one.

**Writes:** saying "battlecard for [Competitor]" runs `competitive-battlecard` (ch. 20) →
`08_competitive-read.md`. `tactical-empathy-coach` and `pricing-positioning` support price and
competitive objections without a dedicated file.

**Hand-off:** resolved objections clear the path to closing.

## 11. Closing (ch. 16)

**Question:** How do we get from here to a signature?

**Run first:** `/presales:deal:proposal`.

**Reads:** confirmed pains, scope, and value numbers from earlier phases.

**Writes:** `/presales:deal:close-plan` → `10_close-plan.md` (chosen technique, script, fallback),
reading `02_discovery-notes.md`, `02a_meddpicc-score.md`, `03_mutual-action-plan.md`,
`04_pain-to-value.md`, `06_poc-evaluation-plan.md` and `08_competitive-read.md` first.
`/presales:deal:champion-enable` builds the Economic Buyer enablement kit once `champion-health`
confirms the champion is real. `/presales:deal:exec-summary` produces the one-pager for leadership.
`pricing-positioning`, `negotiation-prep` and `exec-briefing-prep` support the close without a
dedicated numbered file.

**Hand-off:** a signed deal moves to win/loss capture and handover.

## 12. Win / loss (ch. 17)

**Question:** Why did we win or lose, and what do we carry forward?

**Run first:** the `win-loss-analyzer` skill ("debrief this win" / "why did we lose").

**Reads:** the deal's history across the folder.

**Writes:** no numbered deal-folder file; a confirmed write-up can go into the team's knowledge base
via the `knowledge-capture` skill.

**Hand-off:** a win moves to handover; either outcome can feed the learning loop (`/presales:brain:learn`).

## 13. Handover and nurture (ch. 16, and OSD ch. 8)

**Question:** How do we hand off cleanly, and then stay close?

**Run first:** `/presales:handover:doc` at technical win, finalised at signature.

**Reads:** `07_osd-draft.md` Section 11 (Transition to Delivery) if it exists.

**Writes:** `/presales:handover:doc` → `09_handover-package.md`. `/presales:handover:architecture`
(the `solution-architecture` skill) → `07a_solution-architecture.md` (target architecture,
integrations, sizing, migration), reading `07_osd-draft.md`, `02_discovery-notes.md` and
`04b_requirement-fit.md`. `/presales:handover:nurture` → `11_nurture-plan.md` (post-close
check-ins, references, expansion signals), reading `09_handover-package.md` and `04_pain-to-value.md`.

**Hand-off:** the account moves into the existing-customer motion below.

---

## Existing customers

Once an account is live, the motion shifts from net-new discovery to adoption and expansion.
`/presales:value:realized` (ch. 10, ch. 7.3 Value Realisation Event) compares promised value
drivers in `04a_roi-case.md` against what was actually measured after go-live, and writes
`13_value-realized.md`. `/presales:account:expand` (ch. 2.11, ch. 3.1) then runs the renewal and
expansion discovery pass: adoption check, realised-vs-promised value reconciled against
`13_value-realized.md`, whitespace and expansion hypotheses, writing `12_expansion-plan.md`. Run
`/presales:value:realized` first; `/presales:account:expand` falls back to `04a_roi-case.md` alone
if it hasn't been run yet, and marks every "measured" cell 🔴 Unknown until that pass fills it in.

## Stuck?

Any phase can stall. Say "I'm stuck on a deal" or "coach me on this deal" to run the `presales-coach`
skill — it diagnoses the constraint by phase and gives three concrete next actions. For a deeper,
structured pass on a genuinely knotty problem, escalate to `/presales:deal:strategic-think` (Theory
of Constraints + BBiT).

See [[Deal-Folder]] for the full file structure and [[Commands-Reference]] for every command in
one table.
