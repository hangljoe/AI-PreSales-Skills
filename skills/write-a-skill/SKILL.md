---
name: write-a-skill
version: "1.1"
last_updated: 2026-09-28
description: "Guides a contributor through creating a new skill for this AI PreSales Skills library: requirements, a correctly structured SKILL.md with the kit's description standard, version and handoff, reference files, the STACK.md row, frontmatter validation with scripts/desc_budget.py, and local testing from a fork. Use on \"write a skill\", \"create a skill\", \"add a skill\", \"new skill for\", \"how do I add a skill\". SKIP for editing a presales deliverable or running an existing skill."
triggers:
  - "write a skill"
  - "create a skill"
  - "build a skill"
  - "add a skill"
  - "I want to add a skill"
  - "help me write a skill"
  - "create a new skill"
  - "how do I add a skill"
---

# Write a Skill

Guides the creation of a new skill for this AI PreSales Skills library — from
requirements to tested, committed, and listed in STACK.md.

**Work in your own fork.** Fork the repo on GitHub, clone your fork, and do all authoring
there. Never edit the installed plugin cache (`~/.claude/plugins/...`): every plugin update
overwrites it and your changes are lost.

---

## Step 1 — Gather requirements

Ask the user for:

| Field | Question |
|-------|----------|
| **Name** | What should the skill be called? (kebab-case, e.g. `exec-briefing-prep`) |
| **Purpose** | What task does it perform in one sentence? |
| **Triggers** | What phrases will users say to activate it? (3–5 go into the description; up to ~10 in `triggers:`) |
| **Siblings** | Which existing skills or `/presales:*` commands overlap? (check STACK.md) — when should users pick those instead? |
| **Handoff** | What comes next — which skill or command should the user run after this one? |
| **Workflow** | What steps does it follow? How many intake questions are needed? |
| **Output** | What does it produce — a document, a structured table, a coaching brief? |
| **References** | Is there supporting material to bundle (cheat sheets, frameworks, templates)? |
| **Connected tools** | Should it use optional connectors if available — a CRM (e.g. Salesforce, HubSpot), a knowledge base (e.g. Confluence, Notion), or file storage (e.g. SharePoint, Google Drive)? |

If the user has already provided some of this in their request, do not ask again.

---

## Step 2 — Create the skill file

Create the file at:

```
skills/<skill-name>/SKILL.md
```

in your fork's working copy.

Use the template below — do not deviate from its structure. Every skill in this library
follows the same pattern so users can predict where to find things.

### SKILL.md template

```markdown
---
name: skill-name
version: "1.0"
last_updated: YYYY-MM-DD
description: "<What it does, one sentence>. Use on \"<phrase>\", \"<phrase>\", \"<phrase>\". Siblings: <skill-or-/command> (<when to use it instead>). SKIP for <what not to use it for>."
triggers:
  - "trigger phrase one"
  - "trigger phrase two"
  - "trigger phrase three"
---

# Skill Name

One-sentence summary of what the skill does and when to use it.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **CRM (e.g. Salesforce, HubSpot)** | What the CRM provides — or "Not used by this skill" |
| **Knowledge base (e.g. Confluence, Notion)** | What the knowledge base provides — or "Not used by this skill" |

No connections? The skill works the same — just paste the context manually.

---

## Step 1 — Intake

What to ask before starting. Keep questions to a minimum — only what's needed.

| Field | Required / Optional |
|-------|---------------------|
| [Field] | Required |
| [Field] | Optional — default: [X] |

---

## Step 2 — [Main workflow step]

What Claude does here. Be specific — this is instruction, not description.

---

## Step 3 — Output

What gets produced. Include exact format, sections, and any output file path.

---

## Quality checklist

- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]

---

## Handoff

- [Next situation] → `<next skill or /presales:command>`
```

---

## Step 3 — Add reference files (if needed)

Place supporting material in:

```
skills/<skill-name>/references/
```

Reference files are appropriate when:
- The SKILL.md would exceed 500 lines without them
- Content belongs to a distinct domain (e.g. separate question banks per persona or deal stage)
- The material is loaded selectively, not always (e.g. advanced questions vs standard questions)

Name files descriptively: `opening-framework.md`, `discovery-questions.md`, `pricing-tiers.md`.
Instruct Claude to `Read` them explicitly inside the relevant Step.

---

## Step 4 — Update STACK.md

Add a row to the skills table in `STACK.md`:

```markdown
| `skill-name` | One-line description of what the skill does | "primary trigger phrase", "alternative phrase" |
```

STACK.md is read by every agent at session start. If the skill isn't listed there, it won't
be discovered. This step is mandatory.

---

## Step 5 — Install and test

This library ships as the `presales` plugin. Test your skill from your fork's working copy, not
from the installed plugin cache:

```
/plugin marketplace add <path-to-your-fork>
/plugin install presales@presales-handbook
```

Then verify the skill loads by triggering it with one of its description phrases in a new
session. When it works, open a pull request from your fork. Once merged, users get it with the
next plugin update.

---

## Description and triggers — authoring guide

Both fields live in the SKILL.md frontmatter and serve different purposes.

### `description` — for the agent

The description is read by Claude alongside all other installed skills when deciding
which skill to load. It must give enough signal to distinguish this skill from others.
Claude routes on the description only — the `triggers:` list is not read for routing.

> ⚠️ **HARD 1024-character limit — this is the #1 cause of "my skill won't load".**
> Claude Code silently drops any skill whose `description` exceeds **1024 characters** —
> no error, no warning, the skill simply never appears for users. Only `name` and
> `description` are read by the loader; the `triggers:` block below is informational, so
> every keyword that must drive auto-activation has to live *inside the description*.
> **Target ≤ 950 characters** for headroom — emoji (🟢🟡🔴) cost ~4 bytes each, and the
> limit can be enforced on bytes, so avoid emoji in descriptions and leave margin.

**The kit's description standard (one shape for every skill):**

```
"<What it does, one sentence>. Use on \"<phrase>\", \"<phrase>\", \"<phrase>\" (3–5 real user phrases). Siblings: <skill-or-/command> (<when to use it instead>)[, …]. SKIP for <what not to use it for>."
```

- Add `Siblings:` and `SKIP for` only where a real collision exists (check STACK.md).
- Leave out over-broad phrases that would hijack unrelated requests ("new", "help me", "prep").
- Target 350–700 characters; hard maximum 900.

**Format:**
- **350–700 characters, never above 900** (the loader's hard ceiling is 1024 — never approach it)
- **One single-line double-quoted YAML string** — never a folded (`>`) or literal (`|`)
  block scalar. claude.ai's skill-sync parser is stricter than Claude Code's and has a
  known bug with block-scalar descriptions; a single quoted line parses everywhere.
  Escape inner double quotes with `\"`.
- **LF line endings** — a SKILL.md saved with Windows CRLF endings breaks frontmatter
  parsing on claude.ai and makes the skill silently invisible there while still working in
  Claude Code. The repo `.gitattributes` enforces LF on commit; don't fight it.
- Third person, no emoji
- Follow the standard shape above

**Always verify the length before committing** — run the frontmatter auditor from the repo root:
```bash
python3 scripts/desc_budget.py --table
```
It checks every skill at once for over-long descriptions, block-scalar descriptions, and CRLF
line endings, and exits non-zero on any error. CI runs the same check.

**Good:**
```
description: "Pressure-tests an EXISTING business case or ROI model before the customer's finance team does. Use on \"stress test this business case\", \"challenge the ROI\", \"CFO prep\". Siblings: /presales:value:roi-case (build the case first). SKIP for building a new ROI case from scratch."
```

**Bad:**
```
description: "Helps with documents."
```

### `triggers` — for search and discovery

The `triggers` list is the canonical set of phrases users say to activate the skill.
It appears in STACK.md and is used by the `/guide` command and session tooling.

- Aim for 5–10 trigger phrases; prune generic ones that match unrelated requests
- Cover exact phrases, natural variations, and common misspellings
- Include both action phrases ("write a follow-up email") and situation phrases ("I just finished a call")
- Do not duplicate the description — triggers are user-facing, description is agent-facing

---

## Quality checklist

- [ ] `name` is kebab-case and matches the directory name
- [ ] Frontmatter has `name`, `version` (start at "1.0", bump minor on each change) and `last_updated` (YYYY-MM-DD)
- [ ] `description` follows the standard shape (what it does · Use on · Siblings · SKIP), 350–700 chars, never above 900, **measured** with `scripts/desc_budget.py`, third person, no emoji
- [ ] `description` is a single-line double-quoted string (no `>` / `|` block scalars) and the file uses LF line endings — both required for the skill to load on claude.ai
- [ ] `triggers` has 5–10 natural variations, no generic phrases
- [ ] Connected Tools section is present (even if "Not used by this skill")
- [ ] Workflow follows Step 1 (Intake) → Step N → Output structure
- [ ] Quality checklist and a Handoff section (next skill or command) are included
- [ ] Reference files placed in `references/` subdirectory (not flat alongside SKILL.md)
- [ ] STACK.md updated with a row for this skill
- [ ] Authored in your own fork, not the installed plugin cache; tested via `/plugin marketplace add <path-to-your-fork>` then `/plugin install presales@presales-handbook`
- [ ] Skill activated with a trigger phrase to confirm it loads correctly
