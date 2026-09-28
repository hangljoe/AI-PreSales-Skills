# Mode: Start My Week

Produce ONE week-ahead brief: what the week holds, big rocks first, with prep routed into the
presales skill library — the weekly-cadence sibling of Start My Day. Use this Monday morning (or
whenever the user's `Day boundaries` week-start day is); Start My Day still runs every other
morning for the single-day view.

Read `references/conventions.md` first (folder resolution, reading window, links, icons).

---

## Step 1 — Read the brain (fixed budget)

Same read as Start My Day Step 1: `BIG-ROCKS.md` + `PROFILE.md`, the conventions reading-window
journals, and the most recent `weekly/` rollup. Additionally, if last week's rollup exists, note
its training-minutes line (see Step 5) and any `⏳ Carried into next week` items — these anchor
this week's brief.

No brain yet? Say so, suggest `/presales:brain:setup`, and continue with Steps 2–5 only.

## Step 2 — Calendar & mail sweep — the week ahead

Same caps and rules as Start My Day Step 2 (any calendar/mail connector — e.g. Outlook + Teams
or Google Calendar + Gmail), widened in scope:

- **Calendar**: today through the next 5 business days (or through `Day boundaries`' week-end
  day, whichever is sooner), same treatment of self-scheduled focus-time blocks as free slots,
  not meetings.
- **Unread + flagged mail**: same cap and filtering as Start My Day (≤2 pages, ≤20 survivors) —
  this is still a snapshot, not a full-week mail archive read.
- **Newsletter / Focus areas filtering** (same rule as `start-my-day.md` Step 2 — this is the
  weekly-cadence version): among mail classified as newsletter-pattern (bulk-mail headers,
  "newsletter"/"digest"/"update" in subject, known marketing-platform sending domains), check the
  subject/preview against the user's `PROFILE.md` `Focus areas` tags.
  - Matches a focus area → treat as normal mail (Reply/FYI per the usual rules).
  - Matches no focus area → do not list individually; roll all of them into one FYI line: "N
    other newsletters this week, none matching your focus areas." Offer, don't dump: "want to
    see what was collapsed?" — list them by sender/subject only if asked.
  - `Focus areas` empty → no filtering happens; nothing is suppressed.
- **Chat / transcripts** (e.g. Teams, Google Chat): same caps as Start My Day.

No connection? Ask the user to paste the week's calendar and anything urgent — same brief format.
**Unattended run** (invoked by an automation routine, no one to ask): skip the ask — produce the
brief from `BIG-ROCKS.md`/`PROFILE.md`/journal evidence alone, and add one alert line: "⚠️ Ran
without a live calendar/mail connection — this brief is based on your notes only."

## Step 3 — Task sources across the week

Same as Start My Day Step 3 (GitHub/task tracker, only sources listed in PROFILE.md, same failure
semantics for "listed but unreachable"), but due-this-week items surface in **This week ahead**
rather than requiring a due date of today.

## Step 4 — Classify meetings needing prep, across the week

Apply Start My Day Step 4's routing table (discovery prep, demo dry-run, RFx navigator, exec
briefing, negotiation/pricing, post-demo follow-up) to every flagged meeting across the whole
window, not just today — group the output by day so nothing this week is a surprise.

## Step 5 — Training callout (light)

This mode does not compute the training tally itself — that's End My Week's job, run at the end
of the week with full evidence. Here, just surface **last week's** result if the most recent
`weekly/` rollup logged a shortfall: one line, e.g. "⚠️ Training was 10 of 30 min last week —
worth carving out time this week?" No calendar action, no interview question — a nudge, not an
interrogation.

## Step 6 — Output: the week brief

```markdown
# 📆 Week brief — Week of <YYYY-MM-DD>

## 🎯 This week ahead
1. 🪨 *<rock name>* — <rock-advancing item this week> (carried since <date>)
2. ✉️ <promise carried from last week>
3. 🐙 <due-this-week GitHub item>

## 📅 Prepare
- **<Day> <HH:MM> — <meeting>, <who>** (external, N attendees)
  → run <routed command/skill> · <prep gap note>

## ✉️ Reply (<n> of <m> unread matter)
- **<person>** — [<subject>](<native mail link>) — <one line why it matters>

## 👀 FYI
- <newsletters matching focus areas, individually>
- N other newsletters this week, none matching your focus areas
- <anything else skimmed and safely ignorable>

---
⚠️ Training was <n> of <target> min last week — worth carving out time this week?
⚠️ Rock **<name>**: no movement in <n> business days
```

Same ordering and standing-alert rules as Start My Day (`references/start-my-day.md` Step 5),
applied at week granularity. Close by offering, not doing: "Want me to draft any of the replies,
or block time for a rock this week?"

---

## Quality checklist

- [ ] Read exactly rocks + profile + windowed journals + last weekly rollup
- [ ] Calendar/mail/task sweep widened to the week, same caps per fetch as Start My Day
- [ ] Newsletter/Focus-areas filtering applied only to bulk/newsletter-pattern mail, never to 1:1 mail
- [ ] Every prep-needing meeting across the week has a routed suggestion, grouped by day
- [ ] Training callout is a one-line nudge referencing last week's rollup — no interview, no calendar action here
- [ ] Task sources only those in PROFILE.md; missing sources skipped silently
