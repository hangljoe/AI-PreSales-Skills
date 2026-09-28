# AI PreSales Skills
### by The PreSales Handbook

> *Discover, Qualify Hard, Tell the Story, Listen and Stay Honest*

An AI co-pilot for PreSales professionals and Solution Consultants (SCs), built on
**[The PreSales Handbook](https://www.presales-handbook.com)** by Dr. Johannes Hangl.

It turns Claude into a PreSales colleague who knows the whole deal cycle. Claude can prepare your
discovery call, score MEDDPICC, build a Tell-Show-Tell demo storyboard and write the ROI case. It
can also draft the RFP response and hand the deal over to delivery. It works for any B2B or SaaS
product. You tell it what you sell, and it applies the handbook's methodology to your deal.

**What's inside:** 39 skills · 42 slash commands · a condensed PreSales Handbook reference built in

---

## Contents

1. [Install in 5 minutes](#install-in-5-minutes)
2. [Your first 10 minutes](#your-first-10-minutes)
3. [How it works: commands vs. skills](#how-it-works-commands-vs-skills)
4. [The deal journey at a glance](#the-deal-journey-at-a-glance)
5. [All commands](#all-commands)
6. [All skills](#all-skills)
7. [Leader-only tools](#leader-only-tools)
8. [Make it yours](#make-it-yours)
9. [Troubleshooting](#troubleshooting)
10. [About](#about)

---

## Install in 5 minutes

### What you need

- **A paid Claude plan** (Pro, Max, Team or Enterprise), or an Anthropic Console account.
- **Claude Code**, which is Anthropic's app for working with Claude on your computer. You can use it in
  the terminal, in the Claude Desktop app, or inside VS Code. You don't need to know how to code.

### Step 1: Install Claude Code (skip if you already have it)

On **macOS**, open the *Terminal* app and paste:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

On **Windows**, open *PowerShell* and paste:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Then type `claude` and press Enter. The first time, it asks you to log in with your Claude account.

> Prefer clicking to typing? Install the **Claude Desktop app** from [claude.ai/download](https://claude.ai/download)
> and open the **Code** tab. Everything below works there too.

### Step 2: Add the plugin

Inside Claude Code, type these two lines one at a time and press Enter after each:

```
/plugin marketplace add hangljoe/AI-PreSales-Skills
/plugin install presales@presales-handbook
```

The first line tells Claude where to find the skills. The second line installs them. Restart Claude
Code when it asks you to.

**Using the Desktop app?** Click the **+** button next to the message box, then **Plugins**, then
**Add plugin**. Add the marketplace `hangljoe/AI-PreSales-Skills` and install **AI PreSales Skills**.

### Step 3: Check that it works

Type:

```
/presales:guide
```

You should see a friendly router that asks what you're working on. That's it. You're set up.

### Updating and removing

Updates are pulled from GitHub. To update right away, run:

```
/plugin update presales@presales-handbook
```

To remove the plugin, run `/plugin uninstall presales@presales-handbook`. You can also manage
everything from the `/plugin` menu, under the **Installed** tab.

<details>
<summary><b>For team leads: roll it out to your whole team</b></summary>

If your company uses Claude Team or Enterprise, an admin can switch the plugin on for everyone.
Go to **claude.ai → Organization settings → Claude Code → Managed settings** and add:

```json
{
  "extraKnownMarketplaces": {
    "presales-handbook": {
      "source": { "source": "github", "repo": "hangljoe/AI-PreSales-Skills" },
      "autoUpdate": true
    }
  },
  "enabledPlugins": {
    "presales@presales-handbook": true
  }
}
```

Most teams fork this repo first and add their own product details and brand (see
[Make it yours](#make-it-yours)). Point `repo` at your fork.

</details>

---

## Your first 10 minutes

1. **Tell Claude what you sell.** The skills are vendor-neutral, so they ask about your product,
   capabilities, differentiators and competitors the first time they need them. Save time by
   creating a deal folder with the template in [`DEAL_TEMPLATE.md`](DEAL_TEMPLATE.md), which has
   an *About us* block you fill in once.
2. **Try the router.** Run `/presales:guide` and describe your situation, for example *"I have a
   discovery call with a CFO on Thursday"*. It points you to the right tool.
3. **Run one real workflow.** A good first one is `/presales:discovery:prep` for your next call.
   Claude asks for what it needs and produces a one-page call plan.
4. **Just talk.** Say *"structure these notes"* and paste your call notes. The right skill
   switches on by itself.

> **Tip:** The more context you give, the better the output. Paste discovery notes, prior emails
> or CRM exports. Before anything goes to a customer, say *"tag this"* to mark every claim as
> Confirmed, Inferred or Unknown.

---

## How it works: commands vs. skills

There are two ways to use the library.

**Commands** are step-by-step workflows that you start by typing `/presales:...`. Claude asks for
the context it needs and walks you through the process. For example,
`/presales:discovery:summary` asks who was on the call and what you learned. It then produces a
structured summary, a MEDDPICC update and a ready-to-send follow-up email.

**Skills** switch on when you describe what you need in plain language, with no slash needed. For
example, *"How do we beat [Competitor]?"* starts the competitive battlecard, and *"Dry run my
demo"* starts the demo coach.

You don't need to remember which is which. If you're unsure, run `/presales:guide`.

**Connected tools are optional.** If you've connected a CRM (such as Salesforce or HubSpot), a
wiki (such as Confluence or Notion), or your mail and calendar, the skills pull context from
there. Without connections, they simply ask you and the output quality is the same.

---

## The deal journey at a glance

Each stage follows a chapter of The PreSales Handbook (V78 numbering).

| Stage | Handbook chapter | Start with |
|-------|------------------|------------|
| Research the account | 3 · Buying journey | `/presales:account:brief` → `/presales:account:journey` |
| Sales discovery | 5 · Sales Discovery | `/presales:discovery:prep` → `/presales:discovery:sales` |
| Qualify hard | 6 · Qualify Early, Qualify Hard | `/presales:discovery:qualify` |
| Functional & technical discovery | 7 · FTD | *"FTD"* → `/presales:discovery:prep` → `/presales:discovery:summary` |
| Scope the opportunity | 8 · Opportunity Scoping Document | *"scope from discovery"* → `/presales:handover:osd-draft` |
| Decide whether to invest | 9 · TFQ | `/presales:discovery:tfq` · `/presales:discovery:orc` |
| Build the value case | 10 · ROI and Value | `/presales:value:pain-to-value` → `/presales:value:roi-case` |
| Tell the story | 11 · The Demo | `/presales:demo:storyboard` → `/presales:demo:script` |
| Demo videos and click-throughs | 12 · Demo Automation | *"create a demo video"* |
| Prove it | 13 · Proof of Concept | `/presales:deal:poc-plan` → `/presales:deal:poc-readout` |
| Answer the RFX | 14 · RFX Process | *"we got an RFP"* → `/presales:rfp:respond` |
| Handle objections | 15 · Objection Handling | `/presales:deal:objection-drill` |
| Beat "do nothing" | 20 · Competition | *"they might do nothing"* · *"battlecard for [Competitor]"* |
| Close | 16 · Closing | `/presales:deal:proposal` → `/presales:deal:close-plan` · *"negotiation prep"* |
| Learn from the outcome | 17 · Lessons Learned | *"debrief this win"* / *"why did we lose"* → *"capture this for the team"* |
| Hand over to delivery | 8 · OSD | `/presales:handover:doc` → `/presales:handover:nurture` |
| Grow yourself and your team | 18, 19, 23 · Staying updated, knowledge sharing, metrics | `/presales:brain:learn` · *"capture this for the team"* · *"build my scorecard"* |

---

## All commands

Type these in Claude Code. Anything in `[brackets]` is optional context you can add after the
command.

### Start here

| Command | What it does |
|---------|--------------|
| `/presales:guide` | Interactive router. Describe your situation and it sends you to the right skill or command, or shows the full phase map. |

### Account & champion

| Command | What it does |
|---------|--------------|
| `/presales:account:brief` | One-page company brief: firmographics, operational footprint, signals and hypotheses. |
| `/presales:account:journey` | Places the buyer on the buying journey, maps your actions per stage and flags whether you engaged early enough. |
| `/presales:account:map` | Builds the Mutual Action Plan (MAP), the mandatory post-call deliverable. |

### Discovery & qualification

| Command | What it does |
|---------|--------------|
| `/presales:discovery:prep` | One-page call prep sheet: research, persona hypotheses and a question plan. |
| `/presales:discovery:questions` | Question card only: tailored SPIN and MEDDPICC questions by persona and product. |
| `/presales:discovery:sales` | Runs the commercial Sales Discovery (MEDDPICC) conversation and scores it. |
| `/presales:discovery:summary` | Turns call notes or a transcript into the discovery output document. |
| `/presales:discovery:golden-hours` | The 24-hour plan after a key call: debrief, AE brief, CRM update and action plan, built from your call summary. |
| `/presales:discovery:qualify` | Scores the opportunity on MEDDPICC (out of 40) with gaps and next actions. |
| `/presales:discovery:tfq` | Technical & Functional Qualification: a gated Invest, Conditional or Pause decision before you commit SC time. |
| `/presales:discovery:orc` | Agenda for the Opportunity Review Call, the cross-department call to qualify in or out. |

### Demo

| Command | What it does |
|---------|--------------|
| `/presales:demo:pre-invite` | Pre-demo invite email with a pain-mapped agenda, recording notice and webcam ask. |
| `/presales:demo:storyboard` | Tell-Show-Tell + PCV (Pain-Capability-Value) demo storyboard built from discovery pains. |
| `/presales:demo:script` | Turns a storyboard into a word-for-word, print-ready demo script. |
| `/presales:demo:post-followup` | Follow-up email within 24 hours that recaps what resonated and locks in the next step. |

### Value

| Command | What it does |
|---------|--------------|
| `/presales:value:pain-to-value` | Maps customer pains to your product's capabilities and measurable outcomes, with confidence tags. |
| `/presales:value:roi-case` | Value and ROI business case with three or more value drivers and an explicit risk factor. |

### Deal & closing

| Command | What it does |
|---------|--------------|
| `/presales:deal:poc-plan` | Checks whether a PoC is needed at all, then plans use cases, success criteria, data handling, owners and timeline. |
| `/presales:deal:poc-readout` | Weekly PoC check-ins, a scorecard against the success criteria, and the findings readout. |
| `/presales:deal:objection-drill` | Handles one objection: type it, then Listen, Empathise, Probe, Address, Confirm. |
| `/presales:deal:champion-enable` | Full kit your champion needs to sell to the Economic Buyer. Run *"champion health check"* first. |
| `/presales:deal:exec-summary` | One-page deal summary for leadership. |
| `/presales:deal:proposal` | Formal commercial proposal: cover letter, solution narrative, outcomes, investment and next step. |
| `/presales:deal:close-plan` | Picks one of the handbook's four closes for your deal, scripts it for SC and AE, and plans a fallback. |
| `/presales:deal:strategic-think` | Applies Theory of Constraints and Black Belt in Thinking to a stuck or complex deal. |

### RFX

| Command | What it does |
|---------|--------------|
| `/presales:rfp:analyze` | Go/no-go analysis: scores fit, relationship and win probability before you commit resources. |
| `/presales:rfp:respond` | Maps every requirement to a capability, drafts compliant answers and tracks coverage. |
| `/presales:rfp:present` | Builds the response presentation deck to go with the written response. |

### Handover

| Command | What it does |
|---------|--------------|
| `/presales:handover:osd-draft` | Drafts the Opportunity Scoping Document (OSD), structured as in handbook chapter 8. |
| `/presales:handover:doc` | The PreSales-to-Professional-Services handover package, drafted at technical win and finalised at signature, plus a handover-call agenda. |
| `/presales:handover:nurture` | Post-close plan: check-ins, feedback, references and expansion signals. |

### Second brain (your personal operating loop)

| Command | What it does |
|---------|--------------|
| `/presales:brain:setup` | One-time guided setup: folder, big rocks, profile, day and week boundaries. |
| `/presales:brain:start` | Morning brief, prioritised from your journal, big rocks, calendar and mail. |
| `/presales:brain:end` | Two-minute evening check-in that writes today's journal entry. |
| `/presales:brain:start-week` | Week-ahead brief. |
| `/presales:brain:end-week` | Weekly review with a training-time check. |
| `/presales:brain:rocks` | Review or set your 3–5 quarterly big rocks. |
| `/presales:brain:voice` | Learns your personal writing style from your sent emails. |
| `/presales:brain:learn` | Your monthly or quarterly learning plan, built on the handbook's 70/30 rule. |

---

## All skills

Skills switch on when you say something like the phrase in the right-hand column.

### Discovery & qualification

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `discovery-sales` | Commercial discovery anchored on MEDDPICC. Decides whether the deal is real. | "sales discovery" |
| `discovery-ftd` | Functional & Technical Discovery for any B2B product: research, opening framework, product-specific questions and a branded questionnaire or summary. | "FTD" |
| `discovery-transformer` | Turns a meeting transcript (`.vtt`) into clean Markdown, files it in your deal folder and builds a Discovery Summary. | "discovery transformer" |
| `critical-business-issue-finder` | Finds the 2–4 critical business issues driving the deal, separated from symptoms and feature requests. | "find the CBIs" |
| `tfq` | Technical & Functional Qualification: a gated Invest, Conditional or Pause decision, with an HTML dashboard. | "run the TFQ" |

### Scoping & solution

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `osd-scoper` | Translates discovery output into the OSD's 11-section scope with module decisions and prioritised gaps. | "scope from discovery" |
| `osd-architect` | Generates the full Opportunity Scoping Document as a branded Word file, plus a scoping workbook for delivery. | "OSD" |
| `capability-mapper` | Maps customer problems to your own product's capabilities as a heat map with ranked recommendations. | "map their problems to our capabilities" |
| `integration-complexity` | Rates the complexity and risk of connecting the prospect's systems to your platform. | "assess the integration complexity" |
| `workshop-agenda-builder` | Time-boxed customer workshop or executive briefing agenda with facilitator notes. | "build a workshop agenda" |

### Demo

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `demo-storyboard` | Tell-Show-Tell storyboard with first-person persona narration and pain-capability-value logic. | "demo prep" |
| `demo-dryrun-coach` | Rehearses your demo: Tell-Show-Tell compliance, pain mapping, timing and likely objections. | "dry run my demo" |
| `video-demo-creator` | Guides a demo video from brief and script through recording and editing to final checks. | "create a demo video" |

### Value & commercial

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `business-case-stress-tester` | Pressure-tests your ROI case before the customer's CFO does. | "stress test this business case" |
| `pricing-positioning` | Puts value before price and handles "too expensive" without discounting. | "pricing conversation" |
| `negotiation-prep` | Negotiation brief: positions, walk-away point, trade levers and concession sequence. | "negotiation prep" |
| `exec-briefing-prep` | Agenda, persona talking points and hard-question coaching for a C-level meeting. | "exec briefing prep" |

### Deal coaching

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `presales-coach` | Finds the deal's constraint and gives three concrete next actions plus the right tool. | "I'm stuck on a deal" |
| `champion-health` | Tells a friendly contact from a real advocate. It's the gate before you invest in champion enablement. | "how strong is my champion" |
| `do-nothing-buster` | Diagnoses "no decision" risk against the handbook's nine status-quo causes and builds a counter-plan. | "they might do nothing" |
| `tactical-empathy-coach` | Coaches objection responses with labels, mirrors and calibrated questions. | "objection coaching" |
| `competitive-battlecard` | Honest positioning card against any named competitor or an in-house build, with a SWOT. | "competitive battlecard" |
| `toc-bbit-expert` | Theory of Constraints + Black Belt in Thinking coach for complex problems, with diagrams. | "think like a BBiT expert" |
| `win-loss-analyzer` | Win/loss debrief: quick solo mode, a team lessons-learned session, or a customer interview. | "debrief this win" |

### RFX

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `rfx-navigator-presales` | Entry point when an RFI, RFP, RFQ or tender lands: identifies the type, scans fit and routes to the right command. | "we got an RFP" |

### Communication & content

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `field-comms-writer` | Tone-matched 1:1 follow-ups, recaps and chasers after customer moments. | "write a follow-up email" |
| `confidence-tagger` | Labels every claim Confirmed, Inferred or Unknown before material leaves your team. | "tag this" |
| `humanize` | Strips AI tells from customer-facing text. | "humanize this" |
| `linkedin-post` | LinkedIn posts from your PreSales insights, for your personal brand. | "write a LinkedIn post" |
| `diagram` | Excalidraw diagrams that make a visual argument: flows, architectures, deal maps. | "diagram this" |
| `pptx-generator` | On-brand PowerPoint decks. | "create a powerpoint" |
| `docx-generator` | On-brand Word documents: proposals, summaries, letters, OSDs, handovers. | "generate a word doc" |

### Productivity & utilities

| Skill | What it does | Say something like… |
|-------|--------------|---------------------|
| `learning-plan` | Builds your learning plan (70/30 rule): goals, weekly learning block, sources, accountability. | "build my learning plan" |
| `presales-metrics` | KPI scorecard for you or your team from a CRM export or your own numbers, with three improvement actions. | "build my scorecard" |
| `knowledge-capture` | Turns a win, demo flow or RFP answer into a reusable asset in your own knowledge folder. | "capture this for the team" |
| `second-brain` | Your personal daily and weekly loop: morning brief, journal, big rocks, writing voice. | "set up my second brain" |
| `rag-markdown` | Converts any source (PDF, slides, Word, web page) into one clean Markdown file. | "RAG ready markdown" |

`brand` is a behind-the-scenes skill. It holds the colours, fonts and logos that the Word,
PowerPoint and OSD skills use (the diagram skill keeps its own semantic palette).

---

## Leader-only tools

For PreSales leaders (handbook ch. 22). Not routed by `/presales:guide`; ask for them by name.

| Tool | What it does | How to invoke |
|------|-------------|---------------|
| `deal-prequal` | For PreSales leaders: a readiness sweep across one or many deals before the TFQ. | `/presales:leader:prequal [deals]` |
| `presales-metrics` (leader mode) | Team KPI scorecard: distribution across SCs framed as 1:1 questions, never a ranking. | `/presales:leader:metrics [export] [period]` |

---

## Make it yours

### Add your company's brand

Word and PowerPoint output uses **The PreSales Handbook** brand as an example (navy `#112D4E`,
yellow `#FACF39`). To use your own:

1. Copy `skills/brand/brands/presales-handbook/` to `skills/brand/brands/<your-company>/`.
2. Edit `brand.json` with your colours and fonts.
3. Replace the logo files in `assets/`.
4. Tell Claude *"use the <your-company> brand"*.

The `brand`, `pptx-generator` and `docx-generator` skills each explain this in their *Add your own
company brand* section.

> Word, PowerPoint and diagram output needs [uv](https://docs.astral.sh/uv/getting-started/installation/),
> a small Python tool that Claude uses to run the generators. Claude tells you if it's missing.
> Everything else works without it.

### Add a skill

Say *"write a skill"*, or follow the format in [`CLAUDE.md`](CLAUDE.md). Put a new skill in
`skills/<name>/SKILL.md` and a new command in `commands/<phase>/<name>.md`, which becomes
`/presales:<phase>:<name>`. Before you push, run:

```bash
python3 scripts/desc_budget.py
claude plugin validate .
```

To test locally, run `/plugin marketplace add /path/to/your/copy` and install from there.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `/presales:...` commands don't appear | Restart Claude Code after installing. Then check `/plugin` → **Installed** to see if *presales* is listed and enabled. |
| "Marketplace not found" | Check the spelling: `hangljoe/AI-PreSales-Skills`. On a company network, GitHub may be blocked. Ask IT or use a personal network. |
| A skill doesn't switch on | Use the phrase from the tables above, or run the matching `/presales:` command directly. |
| Word or PowerPoint files aren't created | Install [uv](https://docs.astral.sh/uv/getting-started/installation/) and try again. |
| Output is too generic | Give Claude your product context. Fill in the *About us* block from `DEAL_TEMPLATE.md` and paste it in. |

---

## About

**The PreSales Handbook** is a practical guide to modern PreSales by Dr. Johannes Hangl. It
covers everything from discovery and qualification to the demo, value, RFX, closing and
PreSales leadership. Learn more at [www.presales-handbook.com](https://www.presales-handbook.com).

The `references/` folder holds a condensed reference to the handbook (V78 edition), cheat sheets
for sales discovery, FTD and demos, the Pre-Sales Playbook, interview insights from PreSales
practitioners, and short study notes on TOC/BBiT and Extreme Ownership. The skills draw on these
automatically and cite handbook chapters by their V78 numbers. For the full book, see
[www.presales-handbook.com](https://www.presales-handbook.com).

Changes are listed in [`CHANGELOG.md`](CHANGELOG.md).

**Licence.** The skills, commands and scripts are MIT-licensed, so fork them and make them yours. The PreSales Handbook reference and the author's other material in `references/` stay © Dr. Johannes Hangl. See [`LICENSE`](LICENSE) for details.
