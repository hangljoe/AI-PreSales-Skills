---
name: second-brain
version: "2.2"
last_updated: 2026-09-28
description: "Personal daily/weekly operating loop for SCs, stored as markdown in your own folder: guided setup, morning and week-ahead briefs from your journal, big rocks and an optional calendar/mail sweep (e.g. Outlook or Google), end-of-day journal, weekly rollup with a learning-time nudge (handbook 70/30 rule), quarterly big rocks, and a personal writing-voice guide. Use on \"set up my second brain\", \"start my day\", \"end my day\", \"start my week\", \"big rocks\", \"learn my voice\". Siblings: learning-plan (build the monthly or quarterly learning plan behind the training target). SKIP for deal-specific prep (route to the presales skills)."
triggers:
  - "set up my second brain"
  - "second brain setup"
  - "onboard me to second brain"
  - "configure my daily loop"
  - "start my day"
  - "morning brief"
  - "what's on today"
  - "plan my day"
  - "end my day"
  - "wrap up my day"
  - "daily journal"
  - "log my day"
  - "start my week"
  - "week ahead"
  - "monday brief"
  - "end my week"
  - "weekly wrap-up"
  - "week review"
  - "big rocks"
  - "quarterly priorities"
  - "what did I work on this week"
  - "daily review"
  - "second brain"
  - "my writing style"
  - "learn my voice"
---

# Second Brain

Your daily and weekly operating loop: a guided setup wizard, a two-minute evening journal, a
one-command morning brief that remembers your decisions and priorities, week-ahead and
weekly-wrap-up bookends, quarterly big rocks, a training-time nudge, and a writing voice guide —
all stored as plain markdown in **your own folder** (OneDrive, Google Drive, iCloud Drive, Dropbox,
or local; macOS, Linux or Windows), never in any repo, never touched by plugin updates. Setup can
also schedule the daily/weekly modes to run automatically via a scheduled routine (e.g. Claude
Cowork, where the `schedule` skill is available).

The learning-time nudge follows The PreSales Handbook: 70% of your time on deals, 30% on learning
and upskilling (ch. 2.6), protected by dedicated weekly learning slots (ch. 18.3). Setup offers that as
the recommended training target; you can pick a different number or opt out.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **Calendar / mail / chat (optional, e.g. Outlook + Teams, or Google Calendar + Gmail)** | Calendar, unread/flagged mail, chat mentions, sent-mail evidence, meeting transcripts — the morning/week sweeps and the voice analysis. Your calendar/mail connector may be read-only in your org; the skill then drafts instead of writing — End My Week's confirm-gated training booking falls back to suggesting a slot for you to add manually — see conventions.md's Known limitation note |
| **Learning platform (optional, e.g. Docebo, LinkedIn Learning)** | Assigned/overdue training courses and completions — powers the weekly training-time nudge. Falls back to a mail-pattern search, then a self-report question, if not connected |
| **GitHub** | Issues assigned to you + PRs awaiting your review (only if listed as a task source in your PROFILE.md) |
| **Task tracker (optional, e.g. Smartsheet, Asana, Planner)** | Rows/tasks assigned to you in the sheets or projects you list in PROFILE.md |
| **CRM / knowledge base** | Not used by this skill |

No connections? The skill works the same — paste your calendar and urgent items when asked.
Note: writing journal/rocks/voice **files** needs Claude Code (filesystem); on claude.ai the
writing modes hand you the finished file content to save yourself (see Surfaces in conventions).

---

## ALWAYS READ THIS FILE FIRST

Read: `references/conventions.md`

It defines where the brain lives (per-user folder resolution), the file skeletons, reading
window, caps, icons, links, privacy, and the update-safety rules. Every mode depends on it.

---

## Step 1 — Route to the mode

| Mode requested | File to load |
|----------------|--------------|
| **Setup** — "set up my second brain", "second brain setup", "onboard me", "configure my daily loop", `/presales:brain:setup` | `references/setup.md` |
| **Start My Day** — "start my day", "morning brief", "what's on today", "plan my day", `/presales:brain:start` | `references/start-my-day.md` |
| **End My Day** — "end my day", "wrap up my day", "log my day", "daily journal", `/presales:brain:end` | `references/end-my-day.md` |
| **Start My Week** — "start my week", "week ahead", "monday brief", `/presales:brain:start-week` | `references/start-my-week.md` |
| **End My Week** — "end my week", "weekly wrap-up", "week review", `/presales:brain:end-week` | `references/end-my-week.md` |
| **Big Rocks** — "big rocks", "quarterly priorities", `/presales:brain:rocks` | `references/big-rocks.md` |
| **Voice** — "my writing style", "learn my voice", `/presales:brain:voice` | `references/voice.md` |

Load **only** the invoked mode's file. Two special routes:
- **"second brain"** or an ambiguous request ("daily review") → branch on whether a second-brain
  folder exists yet: **no folder** → offer Setup first ("want the guided setup, or should I just
  jump into a mode?"). **Folder exists** → ask which of the 7 modes they want (morning brief,
  evening journal, week-ahead brief, weekly wrap-up, big rocks, voice, or setup/settings) rather
  than defaulting to a fixed two-option menu.
- **"what did I work on this week"** (retrospective) → no mode file needed: read this week's
  journal files plus the latest `weekly/` rollup (respect the conventions reading window — no
  archive bulk-reads) and summarize Done / Decided / Carried, grouped by day.

## Step 2 — Execute the mode

Follow the loaded reference file exactly. All modes share the conventions: resolve the user's
own second-brain root, respect the caps, never overwrite existing user files, keep personal content
inside the second-brain folder.

## Step 3 — Output

Each mode defines its output: the morning brief (chat), the journal/rollup files, BIG-ROCKS.md,
or VOICE.md. Files always land in the user's second-brain folder — never in a repo, never
shared.

---

## Handoff

- Start the day → `/presales:brain:start`
- Weekly rollup and learning-time nudge → `/presales:brain:end-week`
- Build the learning plan behind the training target → `learning-plan`

---

## Quality checklist

- [ ] conventions.md read before any mode ran
- [ ] Only the invoked mode's reference file loaded
- [ ] Root resolved from the user's own folder (memory, offered synced-folder candidates on macOS/Linux/Windows, or asked once) — no hardcoded paths
- [ ] No existing user file overwritten, reformatted, or migrated without explicit confirmation
- [ ] Personal content never left the second-brain folder or the chat
