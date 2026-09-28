# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Start Here

**Read `STACK.md` first.** It lists every available skill and command. Every agent, every session, every plan starts there.

---

## Project Overview

This is **AI PreSales Skills by The PreSales Handbook**. It ships as a single Claude plugin with the id **`presales`** (display name: *AI PreSales Skills*), so commands are `/presales:<phase>:<name>`. It is vendor-neutral: skills ask the user for their product, capabilities and competitors instead of assuming any vendor's portfolio. The methodology follows *The PreSales Handbook* by Dr. Johannes Hangl (condensed in `references/PreSales_Handbook_Reference.md`; citations use the V78 edition's numbering; the full book is at www.presales-handbook.com).

- Plugin manifest: `.claude-plugin/plugin.json` (marketplace manifest: `.claude-plugin/marketplace.json`, marketplace name `presales-handbook`)
- Skills live in `skills/<name>/SKILL.md`
- Commands live in `commands/<phase>/<name>.md` and are invoked as `/presales:<phase>:<name>`
- The shared reference library (the handbook, cheat sheets, BBiT, playbook, interviews) lives in `references/`

**This is not a software application.** There is no backend, no database, no frontend. The "code" is markdown skill definitions and command scripts.

**Keep it vendor-neutral.** Never add a specific company's products, internal URLs, brand voice or internal process names. Examples may use an industry for illustration, never as "our" product.

---

## Distribution

The repo root **is** the plugin root. Users install from GitHub:

```
/plugin marketplace add hangljoe/AI-PreSales-Skills
/plugin install presales@presales-handbook
```

Team/Enterprise admins can enable it for everyone through managed settings (`extraKnownMarketplaces` + `enabledPlugins`); the README has the snippet. Merging to `main` is the release.

**Version bump at merge time:** `claude plugin update` keys off the `plugin.json` version, so the released number must only ever increase.

---

## Available Commands

54 commands, invoked as `/presales:<phase>:<name>`:

- **brain/**: setup, start, end, start-week, end-week, rocks, voice, learn (personal operating loop and learning plan)
- **discovery/**: prep, questions, sales, summary, golden-hours, qualify, tfq, orc
- **account/**: brief, journey, map, stakeholders, expand
- **demo/**: pre-invite, storyboard, script, post-followup, picture-pitch
- **value/**: pain-to-value, roi-case, realized
- **deal/**: poc-plan, poc-readout, poc-to-prod, objection-drill, champion-enable, exec-summary, proposal, close-plan, strategic-think
- **rfp/**: analyze, respond, present, security (answer library and security trust library kept in the user's own folder; see `references/rfp-library/README.md` and `references/trust-library/README.md`)
- **handover/**: osd-draft, doc, nurture, architecture
- **leader/**: prequal, metrics, pipeline-review, one-on-one, capacity, onboarding, hiring (leader-only; not routed by `/presales:guide`)
- **guide**: interactive router to the right skill or command

See `STACK.md` for the full command table.

---

## Skills (invoked by trigger phrase)

42 skills. **The authoritative skills table with trigger phrases is in `STACK.md`**; don't duplicate it here. `deal-prequal` and `presales-leader` are leader-only tools kept out of the user-facing tables and out of `/presales:guide`.

Notable internal-dependency skills:
- `brand` is the shared brand registry read by the output skills (pptx-generator, docx-generator, osd-architect, discovery-ftd). It is not user-invoked. The example brand is `presales-handbook`.
- `presales-coach` and `toc-bbit-expert` load material from the shared `references/` library.

---

## Connected Tools (optional)

Skills use connected tools when available and always work without them.

| Tool | What it provides |
|------|-----------------|
| **CRM** (e.g. Salesforce, HubSpot) | Account data, opportunity stage, contacts, MEDDPICC fields, deal history |
| **Knowledge base** (e.g. Confluence, Notion) | Product docs, competitive intel, reference ROI data; a place to store outputs |
| **Mail & calendar** (e.g. Outlook, Teams, Gmail) | Input for the second-brain daily and weekly briefs |

Every skill with connector guidance has a "Connected Tools" section. If nothing is connected, the skill asks for the context instead.

---

## How to Add a Skill

1. Create `skills/<name>/SKILL.md` with name, description, triggers, instructions
2. Optionally add `skills/<name>/references/` for supporting material
3. Update `STACK.md` to list it in the skills table
4. Run `python3 scripts/desc_budget.py` and `claude plugin validate .`
5. Test locally: `/plugin marketplace add <path-to-repo>` → `/plugin install presales@presales-handbook` → trigger the skill in a new session
6. Merge to `main`. That's the release

### Skill file format

```markdown
---
name: skill-name
version: "1.0"
last_updated: 2026-07-02
description: "One-line description as a single-line double-quoted string. Use when ..."
triggers:
  - "trigger phrase one"
  - "trigger phrase two"
---

# Skill Name

One-sentence summary of what the skill does and when to use it.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **CRM** (e.g. Salesforce, HubSpot) | What the CRM provides for this skill |
| **Knowledge base** (e.g. Confluence, Notion) | What the knowledge base provides for this skill |

No connections? The skill works the same — just paste the context manually.

---

## Step 1 — Intake

What context to collect before starting.

## Step 2 — [Main workflow step]

What Claude does here.

## Step 3 — [Output]

What gets produced.

---

## Quality checklist

- [ ] Check 1
- [ ] Check 2
```

**Frontmatter fields:** every `SKILL.md` carries `version` (string, e.g. `"1.0"`) and
`last_updated` (ISO date `YYYY-MM-DD`) so a skill's currency is answerable in-session without
checking git. Bump `version` on a meaningful change and set `last_updated` to that day's date.
These are separate top-level keys — never fold them into `description` (which must stay under
the ~950-char load limit).

**Cross-surface compatibility (claude.ai / Cowork):** the skill loader on claude.ai is
stricter than Claude Code's. Two rules keep every skill visible on all surfaces:
1. `description` must be **one single-line double-quoted YAML string** — never a `>` folded
   or `|` literal block scalar (known claude.ai parser bug with block scalars).
2. Files must use **LF line endings** — CRLF breaks frontmatter parsing on claude.ai and the
   skill silently disappears from chat while still working in Claude Code. Enforced by
   `.gitattributes` (`* text=auto eol=lf`).

### Path conventions inside skills and commands

- A skill referencing its **own** files: paths relative to the skill directory (`references/foo.md`, `cookbook/bar.py`)
- A skill or command referencing **another skill's files** or the **shared reference library**: use `${CLAUDE_PLUGIN_ROOT}/skills/...` or `${CLAUDE_PLUGIN_ROOT}/references/...` — this resolves wherever the plugin is installed

---

## How to Add a Command

1. Create `commands/<phase>/<name>.md` — it becomes `/presales:<phase>:<name>`
2. Update `STACK.md` to list it in the commands table
3. Test via a local plugin install (same flow as skills)

---

## Repository Rules

- **No software application code** — this repo is markdown only
- **No Docker, no Python apps, no databases** — skills are text, not apps (skills may include Python cookbook snippets executed by Claude)
- **Narrow tooling carve-out** — the markdown-only rule admits exactly one exception: stdlib-only
  maintenance scripts under `scripts/` that validate the plugin's own structure, plus their tests.
  Today that is `scripts/desc_budget.py` (skill frontmatter + description-budget auditor). Every
  such script must be stdlib-only, must not write to the tree, and must ship a `--self-test` that
  drives embedded fixtures through the real entry functions — a guard with no self-test is a guard
  that silently protects nothing. Nothing else earns an exception
- **Skills must have a `SKILL.md`** — without it the skill is invisible to the plugin
- **Update `STACK.md`** when adding or removing a skill or command
- **The repo root is the plugin root** — anything tracked here ships to the team; never commit customer data or secrets

---

## Directory Structure

```
.claude-plugin/
├── plugin.json          ← plugin manifest (name: presales)
└── marketplace.json     ← marketplace manifest (presales-handbook)
commands/
├── brain/               ← setup, start, end, start-week, end-week, rocks, voice, learn
├── discovery/           ← prep, questions, sales, summary, golden-hours, qualify, tfq, orc
├── account/             ← brief, journey, map, stakeholders, expand
├── demo/                ← pre-invite, storyboard, script, post-followup, picture-pitch
├── value/               ← pain-to-value, roi-case, realized
├── deal/                ← poc-plan, poc-readout, poc-to-prod, objection-drill, champion-enable, exec-summary, proposal, close-plan, strategic-think
├── rfp/                 ← analyze, respond, present, security
├── handover/            ← osd-draft, doc, nurture, architecture
├── leader/              ← prequal, metrics, pipeline-review, one-on-one, capacity, onboarding, hiring (leader-only)
└── guide.md             ← interactive router
skills/                  ← 42 skills (each: SKILL.md + optional references/)
references/              ← shared library: condensed PreSales Handbook reference (V78), Pre-Sales Playbook, cheat sheets, BBiT study notes
scripts/desc_budget.py   ← skill frontmatter auditor (stdlib only)
DEAL_TEMPLATE.md         ← how to set up a deal folder / Claude Project, incl. the "About us" block
docs/wiki/               ← source of the GitHub wiki (user manual); one flat page per topic, [[Page-Name]] links

.github/workflows/
└── validate.yml         ← validates manifests and skill frontmatter on every push and PR
```

---

## Session Memory

Claude automatically saves notes across sessions to `~/.claude/projects/.../memory/`:
- **user** — your role, preferences, expertise
- **feedback** — corrections and confirmed approaches
- **project** — goals, decisions, constraints
- **reference** — where to find things in external systems
