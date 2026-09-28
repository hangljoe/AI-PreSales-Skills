---
name: demo-dryrun-coach
version: "1.3"
last_updated: 2026-09-28
description: "Coaches an SC through a demo dry-run before a major customer session: checks an existing storyboard or script for Tell-Show-Tell compliance and first-person narration, maps every module to a confirmed pain, audits timing, flags likely objections and gives a ready / not-ready verdict. Use on \"dry run my demo\", \"demo rehearsal\", \"review my storyboard\", \"coach me through the demo\", \"practice this demo\". Siblings: demo-storyboard and /presales:demo:storyboard (build the storyboard first), /presales:demo:script (verbatim script). SKIP for building the storyboard itself."
triggers:
  - "dry run my demo"
  - "practice this demo"
  - "coach me through the demo"
  - "review my demo plan"
  - "demo dry run"
  - "demo rehearsal"
  - "run through my demo"
  - "review my storyboard"
  - "get feedback on my demo"
---

# Demo Dry-Run Coach

Reviews your demo plan before the live session and flags issues while there's still time to fix them.
Paste your storyboard or script and get honest, specific coaching.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **Your product knowledge base** (optional, if connected) | Checks your demo steps against your product's latest capabilities and known limitations |

No connections? Just paste your storyboard, script, or a description of what you're planning to show.

---

## Step 1 — Give the coach what it needs

Provide:
1. **Your demo storyboard or script** — paste it, or describe module by module what you're planning
2. **Who will be in the room?** — names, titles, what each person cares about
3. **Time available** — exact slot including Q&A (e.g. "45 minutes total")
4. **Confirmed pains from discovery** — what did the customer tell you hurts?
5. **Demo type**: Look & Feel (broad first impression) / Deep Dive (technical) / Q&A driven / RFX
6. **What are you most worried about?** — name your specific concern

---

## Step 2 — Tell-Show-Tell check (module by module)

For each module, the coach checks three things:

```
MODULE [N]: [Name] — [Planned time]

TELL (the need) — Is the customer's pain clearly stated before anything is shown?
  ✅ Good: "Sarah mentioned in discovery that..."
  ❌ Problem: Jumping straight to the product
  Suggestion: [If it needs strengthening]

SHOW (first-person narration) — Does the SC narrate AS the customer, not ABOUT them?
  ✅ Good: "I am Sarah. I open the approvals dashboard. I see my queue. I click Run."
  ❌ Problem: "As you can see, the system allows you to..."
  Issue found: [Any "you can / you would / you should" language]
  Suggestion: [Rewrite to first-person if needed]

TELL (the value) — Is the outcome clearly stated and quantified?
  ✅ Good: "That's 4,000 invoices a month processed in hours, not weeks."
  ❌ Problem: Ending the module without stating the value
  Suggestion: [If the value statement is weak or missing]

PAUSE — Is there a deliberate pause and a "does this match your situation?" question?
  Missing: [Flag if not present — the pause is mandatory after every module]

TIME CHECK: [X] minutes — [OK / This module will run long / Too thin for the content]
  Cap: one Tell-Show-Tell ≤ 10 minutes (kit). Over 10 → split into two scenes.
```

**The first-person rule is the most important.**
Every SHOW section must be narrated in first person.
Never say "you can", "you would", or "you should" during the demo.
The SC steps INTO the role of the customer persona.

---

## Step 2b — Picture Pitch check

The Picture Pitch is a rapid sequence of images, not one slide (handbook 11.5.1).

```
PICTURE PITCH
  Images: [N] — expect 5–10, each on screen 5–10 s
  One spoken line per image, in sync?        ✅ / ❌
  Symbols, not screenshots or text slides?   ✅ / ❌
  Arc: current-state pain → cost → future state → hand-over to the persona?  ✅ / ❌
  Problem to flag: a single static slide, bullet text, or a line that outlasts its image
```

Ask the SC to run the sequence aloud once with a timer; the rhythm is the technique.

---

## Step 3 — Pain-to-module check

Every module must trace to a pain the customer confirmed in discovery. No exceptions.

| Module | Pain it addresses | Was this confirmed in discovery? | If not — should it be cut? |
|--------|------------------|----------------------------------|---------------------------|
| [Module 1] | | 🟢 Confirmed / 🔴 Not confirmed | |
| [Module 2] | | 🟢 / 🔴 | |
| [Module 3] | | 🟢 / 🔴 | |

**Rule**: No module without a confirmed pain. If a module can't be mapped, cut it or replace it.
Unconfirmed modules waste demo time and can trigger the "why are you showing me this?" reaction.

---

## Step 4 — Objections to prepare for

Based on the audience and the modules, these objections are likely to come up:

```
LIKELY OBJECTION 1: [e.g. "How long does implementation take?"]
Suggested response: [Short, honest answer + redirect to value]

LIKELY OBJECTION 2: [e.g. "We already have something that does this"]
Suggested response: [Tactical empathy — label first, then explore]
(Full handling: use the tactical-empathy-coach skill)

LIKELY OBJECTION 3: [e.g. "Can we see [feature] that wasn't in the plan?"]
Suggested response: [How to handle a scope-creep question live without derailing]
```

---

## Step 5 — Timing audit

```
DEMO TIMING AUDIT

Module                        | Planned | Realistic | Note
------------------------------|---------|-----------|------
Intro + ground rules          |         |           | 2-3 min; announce breaks
Opening / Picture Pitch       |         |           | 5-10 images × 5-10 s; opening ≤5 min L&F, ~10 min Deep Dive
Module 1                      |         |           |
Module 2                      |         |           |
Module 3                      |         |           |
Break(s)                      |         |           | 5-10 min every 40-60 min (handbook 11.3.2)
Q&A + Summary Value Close     |         |           | Leave ≥10 min
TOTAL                         |         |           | Must fit in [available slot]

Tip: Always add 5 minutes of buffer. Demos always run longer than planned.
If you're tight, cut a module — never cut the Summary Value Close or the Q&A.
Any module over 10 minutes breaks the Tell-Show-Tell cap: split or trim it.
```

---

## Step 6 — Dry-run verdict

```
DRY-RUN VERDICT

Overall: Ready to go / Needs one fix before the session / Not ready — needs a redo

Top 3 things to fix (in order of priority):
1. [Most important — specific and actionable]
2. [Second priority]
3. [Third priority]

One thing that's already working well:
[Always name a genuine strength — it's what to protect and repeat]

Final reminder before you go live:
[ ] Demo environment loaded and tested — not just "it was working yesterday"
[ ] Backup plan if the demo environment breaks (screenshots / video / narrated walkthrough)
[ ] Know who in the room has the most influence and open your first TELL to them
[ ] AE briefed as moderator: timekeeping, parking questions, a success story ready if energy drops (handbook 11.5)
```

---

## Handoff

- Storyboard fixed but no verbatim script yet → `/presales:demo:script`
- Ready to go and the invite isn't out → `/presales:demo:pre-invite`
- Storyboard needs a redo → `demo-storyboard` (or `/presales:demo:storyboard`)

---

## Quality checklist

- [ ] Every SHOW section narrates in first person — zero "you can / you would" language
- [ ] Every module traces to a confirmed customer pain
- [ ] Timing fits the available slot including Q&A buffer
- [ ] Top 3 likely objections are prepared with responses
- [ ] Picture Pitch is a sequence of 5–10 images, 5–10 s each, one spoken line per image
- [ ] No Tell-Show-Tell longer than 10 minutes; breaks every 40–60 min in longer sessions
- [ ] AE moderator role agreed
- [ ] Summary Value Close is scripted — includes the 1-10 question
- [ ] Specific next-step offer is ready — not "we'll be in touch"
- [ ] Demo environment tested, backup plan in place
