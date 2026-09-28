---
description: Interactive router — find the right skill or command for your situation, or browse the full phase map
argument-hint: "[optional: a phase name \"discovery\" / \"demo\" / \"closing\", or \"list\" for the full reference]"
---

## Step 1 — Load the live inventory

Before doing anything else, read `${CLAUDE_PLUGIN_ROOT}/STACK.md`.
This is the authoritative, always-up-to-date list of every skill and command.
Never rely on memory — the inventory changes as skills are added.

> **Exclude leader-only tools.** STACK.md has a **Leader-only tools** section (e.g. `deal-prequal`). Those are
> for PreSales leaders, not individual contributors. **Never list, recommend, surface, or route to
> them here** — not in the interactive router, not in free-text matching, not in the skills table.
> Mention one only if a leader explicitly asks for it by name. Also skip the internal `brand` registry.

Also read `${CLAUDE_PLUGIN_ROOT}/COMMANDS.md` if you need command syntax or arguments.

---

## Step 2 — Decide the mode

**If $ARGUMENTS contains a phase name** (e.g. "discovery", "demo", "poc", "negotiation", "closing", "rfp"):
→ Skip to Step 4 — zoom directly into that phase.

**If $ARGUMENTS is "list"**:
→ Skip to Step 4 — print the full phase-by-phase reference.

**If $ARGUMENTS is empty** (most common):
→ Continue to Step 3 — run the interactive router.

---

## Step 3 — Interactive router

You are helping a presales Solution Consultant (SC) find the right tool for what they're working on right now.
Do not list every skill — route them to the best 1–3 options for their specific situation.

Ask ONE diagnostic question. Use this decision tree:

```
Ask: "What are you working on right now?"

Present these options (numbered — user picks one or describes freely):

  1. Preparing for an upcoming call or meeting
  2. In the middle of a deal — need to move it forward
  3. Writing something (email, proposal, exec summary, document)
  4. Handling an objection, pushback, or a stuck deal
  5. Responding to an RFP / RFI / tender
  6. Planning or running a demo or PoC
  7. Wrapping up a deal — debrief or handover to delivery
  8. Something else — I'll describe it
```

**Based on their answer, follow this routing logic:**

### Option 1 — Preparing for a call or meeting
Ask: "What kind of call?"
- First call with a new account → `/presales:account:brief`, then `/presales:discovery:sales` (`discovery-sales` skill) to plan the commercial conversation
- Sales discovery — is this deal real? → `/presales:discovery:sales` (`discovery-sales` skill); score it afterwards with `/presales:discovery:qualify`
- Functional & technical discovery → `/presales:discovery:prep` + `discovery-ftd` skill
- C-suite or exec meeting → `exec-briefing-prep` skill
- Customer workshop or EBC (Executive Briefing Center visit) → `workshop-agenda-builder` skill
- Demo session → `/presales:demo:storyboard` + `/presales:demo:pre-invite`
- Opportunity Review Call (internal qualify in / out) → `/presales:discovery:orc`
- Pricing or negotiation meeting → `pricing-positioning` skill (introducing price) or `negotiation-prep` skill (terms and concessions)
- Post-call — need to capture and follow up → `/presales:discovery:golden-hours`
- Have a meeting recording transcript (`.vtt`, e.g. from Teams or Zoom) to file and summarise → `discovery-transformer` skill (then `osd-scoper`)

### Option 2 — Moving a deal forward
Ask: "Where is the deal stuck or what's the next milestone?"
- Need to qualify or re-qualify → `/presales:discovery:qualify` + `/presales:discovery:tfq`
- Account plan / joint plan to a decision date → `/presales:account:map` (Mutual Action Plan)
- Unsure which buying-journey stage the buyer is in, or worried you engaged too late → `/presales:account:journey`
- No urgency, status quo or "no decision" is the real competitor → `do-nothing-buster` skill (say "they might do nothing")
- Need to map their problems to your capabilities → `capability-mapper` skill
- Planning a customer workshop or EBC → `workshop-agenda-builder` skill
- Champion is weak, unclear or needs material → `champion-health` skill first; for a confirmed champion, `/presales:deal:champion-enable` in brief mode (quick brief) or kit mode (full Economic Buyer enablement)
- Competitor in the deal → `competitive-battlecard` skill (say "battlecard for [competitor]")
- Need to build the value case → `/presales:value:pain-to-value` + `/presales:value:roi-case`
- CFO or finance pushing back on the numbers → `business-case-stress-tester` skill
- Pricing or negotiation → `pricing-positioning` skill (value before price) + `negotiation-prep` skill (terms, walk-away, concessions)
- Opportunity Review Call needed → `/presales:discovery:orc`
- Planning a PoC → `/presales:deal:poc-plan`
- PoC is running — need a health check → `presales-coach` skill ("is my PoC at risk")
- PoC in flight — weekly check-in or final readout → `/presales:deal:poc-readout`
- Ready for the formal offer → `/presales:deal:proposal`
- Ready to close — choose and script the close with the AE → `/presales:deal:close-plan`
- OSD or scoping phase → the **Discovery → OSD chain**: `discovery-transformer` → `osd-scoper` (first scope + gaps; re-run each session) → `osd-architect` (final Word OSD). See the chain in STACK.md.
- Deal is stalled or you don't know the next move → `presales-coach` skill (escalates to `/presales:deal:strategic-think` when needed)

### Option 3 — Writing something
Ask: "What are you writing?"
- Follow-up email, recap or chaser (1:1 with the customer) → `field-comms-writer` skill
- Demo invite or post-demo follow-up → `/presales:demo:pre-invite` or `/presales:demo:post-followup`
- Proposal → `/presales:deal:proposal`
- Executive summary for your leadership → `/presales:deal:exec-summary`
- Handover document → `/presales:handover:doc`
- Word document (any, incl. white paper or case study) → `docx-generator` skill
- Slide deck or PowerPoint / PPTX → `pptx-generator` skill
- LinkedIn post → `linkedin-post` skill
- Then ask: "Before it goes to the customer, run the pre-send passes in order — `humanize` first (strip AI tells so it reads naturally, since it rewrites), then `confidence-tagger` (tag unverified claims on the final wording, then ask for the clean customer copy), then your own brand check if your company has one."

### Option 4 — Objection, pushback, or stuck deal
- Specific objection in a conversation → `tactical-empathy-coach` skill or `/presales:deal:objection-drill`
- Price objection → `pricing-positioning` skill
- Competitor objection → `competitive-battlecard` skill
- Preparing for a tough negotiation → `negotiation-prep` skill + `/presales:deal:objection-drill`
- Deal stuck, next move unclear → `presales-coach` skill (the entry point for a stuck deal)
- Customer agrees but won't decide (status quo, no urgency) → `do-nothing-buster` skill
- Deal fundamentally stalled or conflicted → `/presales:deal:strategic-think` (quick or full TOC + BBiT pass); for the full process with diagrams, `toc-bbit-expert` skill
- Champion not advocating internally → `champion-health` skill, then `/presales:deal:champion-enable`

### Option 5 — RFP / RFI / tender
- Just received it, not sure whether to bid → `rfx-navigator-presales` skill (say "we got an RFP"), then `/presales:rfp:analyze` for the go / no-go
- BID decision confirmed, need to respond → `/presales:rfp:respond`
- Need the presentation deck → `/presales:rfp:present`
- Before submission → `confidence-tagger` skill

### Option 6 — Demo or PoC
- Planning a new demo → `/presales:demo:storyboard`
- Need a full word-for-word script → `/presales:demo:script`
- Dry-run and coaching → `demo-dryrun-coach` skill
- Creating a recorded video → `video-demo-creator` skill
- Invite email for attendees → `/presales:demo:pre-invite`
- Follow-up after the demo → `/presales:demo:post-followup`
- Planning a PoC → `/presales:deal:poc-plan`
- PoC running, unsure it's on track → `presales-coach` skill (PoC health check)
- PoC check-in or final readout → `/presales:deal:poc-readout`

### Option 7 — Wrapping up / handover
- Deal debrief (win, loss or no decision) → `win-loss-analyzer` skill
- Internal post-deal write-up for the team → `win-loss-analyzer` skill (Step 7)
- Opportunity Scoping Document (OSD) → `/presales:handover:osd-draft`
- Handover to professional services → `/presales:handover:doc`
- After signature — adoption, reference and expansion touchpoints → `/presales:handover:nurture`
- A win, demo flow or answer worth reusing → `knowledge-capture` skill (say "capture this for the team")
- Patterns across many deals, your KPIs or the team's → `presales-metrics` skill (say "build my scorecard")

### Option 8 — Free text
Listen carefully to what they describe, then match to the best skill or command from STACK.md
(**excluding the Leader-only tools section** — never surface those here).
Always explain WHY you're recommending it in one sentence.

---

**After routing, always:**
1. Name the specific command or skill trigger phrase
2. Say what they'll get from it in one sentence
3. If relevant, suggest what to run before or after

---

## Step 4 — Full phase reference (fallback / browse mode)

Use this when the user wants to browse, or when `/presales:guide [phase]` or `/presales:guide list` is called.
If a specific phase was requested, show only that phase in full detail with one worked example per command.
If "list" was requested, print the complete phase map below.

---

### New here? Start with these 5.

These cover 80% of daily presales work.

| Tool | When | How to trigger |
|------|------|----------------|
| **Account Brief** | Before any first call | `/presales:account:brief [company name]` |
| **Discovery Prep** | Night before a discovery call | `/presales:discovery:prep [account] [persona] [product]` |
| **Meeting Notes** | After every call | Say *"structure these notes"* then paste your notes |
| **Demo Storyboard** | Before every demo | `/presales:demo:storyboard [product]` + paste pains |
| **Confidence Tagger** | Before anything goes to the customer | Say *"tag this"* then paste the document |

---

### Phase map

Follows the flow of *The PreSales Handbook*. Real deals loop back and skip phases; RFX can start at any point.

| # | Phase (handbook ch.) | When you're here | Go-to tools |
|---|----------------------|------------------|-------------|
| 1 | Sales discovery (ch. 5) | Is there a real deal? | `discovery-sales` skill · `/presales:discovery:sales` · `/presales:account:brief` · `/presales:discovery:questions` · `/presales:account:journey` (buying-journey stage, ch. 3) |
| 2 | Qualify (ch. 4, 6) | Qualify early, qualify hard | `/presales:discovery:qualify` · `champion-health` · `/presales:account:map` · `/presales:account:stakeholders` |
| 3 | Functional & technical discovery (ch. 7) | Deep-dive into needs and landscape | `discovery-ftd` skill · `/presales:discovery:prep` · `/presales:discovery:summary` · `/presales:discovery:golden-hours` · `discovery-transformer` · `critical-business-issue-finder` · `workshop-agenda-builder` |
| 4 | Discovery summary / OSD (ch. 8) | Scoping the solution | `osd-scoper` → `osd-architect` · `/presales:handover:osd-draft` · `capability-mapper` · `integration-complexity` |
| 5 | TFQ + ORC (ch. 9) | Invest SC time? Qualify in or out | `/presales:discovery:tfq` (`tfq` skill) · `/presales:discovery:orc` |
| 6 | Value & ROI (ch. 10) | Quantifying the case | `/presales:value:pain-to-value` · `/presales:value:roi-case` · `business-case-stress-tester` · `/presales:value:realized` |
| 7 | Demo and demo automation (ch. 11–12) | Telling the story | `/presales:demo:storyboard` · `/presales:demo:script` · `demo-dryrun-coach` · `/presales:demo:pre-invite` · `/presales:demo:post-followup` · `video-demo-creator` · `/presales:demo:picture-pitch` |
| 8 | PoC (ch. 13) | Proving it in their world | `/presales:deal:poc-plan` · `presales-coach` (PoC health) · `/presales:deal:poc-readout` (check-ins and readout) · `/presales:deal:poc-to-prod` |
| 9 | RFX (ch. 14) | Responding to a tender | `rfx-navigator-presales` · `/presales:rfp:analyze` · `/presales:rfp:respond` · `/presales:rfp:present` · `/presales:rfp:security` · `security-questionnaire` |
| 10 | Objections (ch. 15) | Pushback and concerns | `tactical-empathy-coach` · `/presales:deal:objection-drill` · `competitive-battlecard` (ch. 20) · `pricing-positioning` |
| 11 | Closing (ch. 16) | Proposal, price, negotiation, sign-off | `/presales:deal:proposal` · `/presales:deal:close-plan` · `pricing-positioning` · `negotiation-prep` · `exec-briefing-prep` · `/presales:deal:champion-enable` · `/presales:deal:exec-summary` |
| 12 | Win / loss (ch. 17) | Learning from the decision | `win-loss-analyzer` |
| 13 | Handover and nurture (ch. 16) | Handing over to delivery, then staying close | `/presales:handover:osd-draft` · `/presales:handover:doc` · `/presales:handover:nurture` · `/presales:handover:architecture` · `solution-architecture` · `/presales:account:expand` |
| ⚡ | Any phase | Stuck, conflicted, or complex | `presales-coach` → `/presales:deal:strategic-think` → `toc-bbit-expert` |
| ⚔ | Any phase | A competitor is in the deal | `competitive-battlecard` |
| ⏸ | Any phase (ch. 20) | The status quo is the real competitor | `do-nothing-buster` |
| 📈 | Ongoing (ch. 18, 19, 23) | Growing yourself and the team | `/presales:brain:learn` (`learning-plan`) · `knowledge-capture` · `presales-metrics` |

---

### Skills available at any phase

Skills activate by natural language — no `/` needed. Just say the trigger phrase.

**Build this table from STACK.md at run time.** Use the rows of the **Skills** table in
`${CLAUDE_PLUGIN_ROOT}/STACK.md` (read in Step 1): print each skill with its key trigger phrases,
in STACK.md's order. Skip the internal `brand` registry and everything under **Leader-only tools**.
Do not add skills that are not in STACK.md, and do not print a remembered list: if STACK.md
cannot be read, say so and offer the phase map above instead.

Format:

| Skill | What it does | Trigger phrases |
|-------|-------------|----------------|
| `[skill]` | [one line from STACK.md] | [key trigger phrases from STACK.md] |

---

### Always-available utilities

| Command | When | Purpose |
|---------|------|---------|
| `/presales:deal:strategic-think` | Any phase — stuck or complex | TOC + BBiT root-cause thinking |
| `/presales:brain:start` · `/presales:brain:end` | Start and end of each day | Morning brief and evening journal (second brain) |
| `/presales:brain:start-week` · `/presales:brain:end-week` | Start and end of each week | Week-ahead brief and weekly wrap-up |
| `/presales:brain:setup` · `/presales:brain:rocks` · `/presales:brain:voice` | Occasionally | Second-brain setup, quarterly big rocks, personal writing voice |
| `/presales:brain:learn` | Monthly or quarterly | Personal learning plan on the 70/30 rule (`learning-plan` skill) |

---

### Quick tips

- **Tag before you send** — `confidence-tagger` on anything customer-facing.
- **Stuck on a deal?** Say *"I'm stuck on a deal"* (`presales-coach`); it escalates to `/presales:deal:strategic-think` when the constraint needs deeper thinking.
- **After discovery or a demo, act within 24h** — `/presales:discovery:golden-hours` before the momentum fades.
- **Discovery → OSD chain** — `discovery-transformer` (file + summarise the recording) → `osd-scoper` (first scope, gaps; re-run each session) → `osd-architect` (final Word OSD). All three read the account deal folder.
- **Zoom into a phase** — `/presales:guide demo`, `/presales:guide poc` or `/presales:guide negotiation`.
- **See everything** — `/presales:guide list` prints the full reference.
