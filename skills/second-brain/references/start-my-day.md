# Mode: Start My Day

Produce ONE prioritized morning brief: what to do, what to prepare, what to answer, what to
ignore — big rocks first, with prep routed into the presales skill library.

Read `references/conventions.md` first (folder resolution, reading window, links, icons).

---

## Step 1 — Read the brain (fixed budget)

Resolve the second-brain root per conventions. Read, in this order:

1. `BIG-ROCKS.md` and `PROFILE.md`
2. The `journal/` files defined by **the reading window in conventions.md** (single source —
   don't improvise a different window)
3. The most recent `weekly/` rollup if the window crosses a week boundary

No brain yet? Say so, offer End My Day's bootstrap, and continue with Steps 2–4 only —
the brief still works, it just has no memory.

From the journals extract: open carry-overs (with ages), yesterday's `Tomorrow` intent,
promises made ("I'll send…"), and per-rock momentum.

## Step 2 — Calendar & mail sweep (if connected)

Works with whichever calendar/mail/chat connector is active — e.g. Outlook + Teams or Google
Calendar + Gmail. Provider-specific fields named below are "if available" examples.

With caps — apply PROFILE's ignore-list BEFORE reading anything deeply:

- **Today's calendar**: every event with attendees, organizer, agenda/body. Treat
  self-scheduled focus blocks (if available, e.g. Viva Insights or Google Calendar focus time,
  breaks, "catch up on messages") as schedule
  structure — usable as free slots for rock work — not as meetings to list or prep.
- **Unread + flagged mail** since the last journal's date (no journal yet → last 2 business
  days). If the mail search has no server-side unread filter, fetch **at most 2 pages** of newest
  inbox metadata for that window and filter client-side on the read flag (if available, e.g.
  Outlook `isRead`, Gmail `UNREAD` label); the survivors (up
  to 20) are the Reply pool. Never page further just to fill the cap.
- **Newsletter / Focus areas filtering**: among today's survivors, identify newsletter-pattern
  mail (bulk-mail headers, "newsletter"/"digest"/"update" in subject, known marketing-platform
  sending domains) and check it against `PROFILE.md`'s `Focus areas` tags. A match is treated as
  normal mail; a non-match is collapsed into the FYI section as one summarized count rather than
  listed individually (same rule as `start-my-week.md` Step 2 — this is the daily-cadence
  version) — offer, don't dump: "want to see what was collapsed?", listing sender/subject only
  if asked. Never apply this filter to 1:1 mail. Empty `Focus areas` → no filtering.
- **Chat mentions / unanswered DMs** (e.g. Teams, Google Chat, Slack; cap 10).
- **Transcripts**: only for external meetings in the lookback window not already summarized in
  a journal — **max 2 per run**, most recent first; distill each to ≤5 bullets of commitments
  and asks, then discard the raw transcript before the next fetch.
- **Task-notification proxy** (if available, best effort, label it as such): search for
  task-tracker assignment/due notification emails (e.g. Planner, Asana).

No connection? Ask the user to paste today's calendar and anything urgent — same brief format.
**Unattended run** (invoked by an automation routine, no one to ask): skip the ask — produce the
brief from `BIG-ROCKS.md`/`PROFILE.md`/journal evidence alone, and add one alert line: "⚠️ Ran
without a live calendar/mail connection — this brief is based on your notes only."

## Step 3 — Task sources (only those listed in PROFILE.md)

- **🐙 GitHub** (Claude Code: `gh` CLI if `gh auth status` succeeds; claude.ai: GitHub connector
  if connected): open issues assigned to the user + PRs awaiting their review, scoped to the
  PROFILE-listed repos/orgs. Cap 10 total.
- **📊 Task tracker** (if connected, e.g. Smartsheet, Asana, Planner): for each PROFILE-listed
  sheet/project (max 3), rows or tasks where the assignee matches the user's display name and status is not complete; prefer rows with
  due dates. Cap 10 total.

Failure semantics — these are different states, treat them differently:
- **Not listed in PROFILE.md** → skip silently (the user never opted in).
- **Listed in PROFILE.md but unreachable** (auth expired, connector down) → add one ⚠️ alert
  line to the brief ("GitHub is in your profile but unreachable — its items are NOT included"),
  never skip silently: the user must be able to trust the brief as their one list.

Due/overdue or review-requested items go to **Do today**; the rest to **FYI** — always tagged
with their source icon. (Jira/Confluence/Aha are not sources in this version — do not improvise.)

## Step 4 — Classify meetings needing prep

For each external or high-stakes meeting today, check whether prep exists (agenda in the
invite, recent deck/doc found via the connector's mail/SharePoint search). Per the conventions
links rule, a prep document may only be linked via a connector-returned native URL — a URL
sitting inside an email body is mentioned in plain text as unverified, never rendered as a
link. Flag gaps and route:

| Meeting signal | Suggest |
|---|---|
| External + discovery/intro | `/presales:discovery:prep` |
| Demo scheduled | **demo-dryrun-coach** skill / `/presales:demo:script` |
| RFP/RFI/tender in subject | **rfx-navigator-presales** skill |
| Exec/C-level attendees | **exec-briefing-prep** skill |
| Pricing/commercial | **negotiation-prep** or **pricing-positioning** skill |
| Post-demo follow-up due | `/presales:demo:post-followup` |

## Step 5 — Output: the brief

Exactly this structure (icons fixed, headings fixed, alerts always last after a rule).
Every item one line; anything with a native deep link rendered as a markdown link on its
name/subject (conventions links rule); never echo raw email or transcript bodies.

```markdown
# ☀️ Morning brief — <Day> <YYYY-MM-DD>

## 🎯 Do today
1. 🪨 *<rock name>* — <rock-advancing item> (carried since <date>)
2. ✉️ <promise from a journal>
3. 🐙 <due/assigned GitHub item>

## 📅 Prepare
- **<HH:MM> — <meeting>, <who>** (external, N attendees)
  → run <routed command/skill> · <prep gap note>
- **<HH:MM> — <internal meeting>** · no prep needed

## ✉️ Reply (<n> of <m> unread matter)
- **<person>** — [<subject>](<native mail link>) — <one line why it matters>

## 👀 FYI
- 🐙 [<PR/issue>](<url>) — <one line>
- 📊 [<sheet>](<url>) — <one line>
- N other newsletters today, none matching your focus areas (only if any were collapsed)
- <anything skimmed and safely ignorable, one line total if possible>

---
⚠️ Carry-over **<item>** is <n> business days old
⚠️ Rock **<name>**: no movement in <n> business days — <free slot today/this week>, block it?
```

**Ordering inside Do today:** rock-advancing items and aged carry-overs first, then promises,
then fresh assigned tasks, then inbox-derived items. PROFILE's hot accounts and VIPs outrank
everything of equal age.

**Standing alerts:** carry-over ≥3 business days old · rock with no movement ≥10 business
days (pair with a free calendar slot when one exists today/this week) · a week with zero
calendar time on any rock.

Close by offering, not doing: "Want me to draft any of the replies?" — drafts apply
`VOICE.md` when it exists (see the **field-comms-writer** skill).

---

## Quality checklist

- [ ] Read exactly the conventions reading window: rocks + profile + windowed journals + ≤1 rollup
- [ ] All caps respected; ignore-list applied before deep reads
- [ ] Four sections + alerts, icons per conventions, one line per item
- [ ] Every prep-needing meeting has a routed suggestion from the table
- [ ] Deep links on emails/PRs/rows where the source provided one; no bare or invented URLs
- [ ] Task sources only those in PROFILE.md; missing sources skipped silently
