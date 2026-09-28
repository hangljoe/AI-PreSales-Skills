# Mode: Setup

Guided, one-pass onboarding: get a new user from zero to a fully working second brain — folder,
big rocks, profile (including day/week boundaries, focus areas, training target), voice, and
optional automation — in one sitting. This is the front door; the other modes' inline bootstraps
(`end-my-day.md` Step 1, `big-rocks.md`, `voice.md`) remain as fallbacks for anyone who never runs
this and just says "end my day" cold.

Read `references/conventions.md` first (folder resolution, file skeletons, update-safety rules).

Re-runnable: if the folder already exists, treat this as a **review/update** pass — read what's
there, ask only about what's missing or what the user wants to change, never regenerate a
complete file from scratch (update-safety rule 1).

---

## Step 0 — Frame it

Tell the user up front, once: "This takes about 10–15 minutes end to end, but every step is
skippable — say 'skip' on any of them and I'll use a sensible default or a minimal stub. You can
always fill gaps in later with `/presales:brain:rocks`, `/presales:brain:voice`, or by running
this again."

## Step 1 — Folder

Resolve/create the second-brain root per conventions (memory → offer likely synced folders →
ask once). Create the folder tree (`journal/`, `weekly/`) if missing.

## Step 2 — Day/week boundaries

Ask in one message: "What time do you want your morning brief ready by, and what time do you
usually wrap up? Which day starts your work week, and which day should the weekly wrap-up land
on (usually your last working day)?"

These four answers go into `PROFILE.md`'s `Day boundaries` section (conventions skeleton) and
become the defaults offered in Step 6's automation times — the user isn't asked to repeat them.

Skip → default to 08:00 start / 17:30 end / Monday–Friday, noted as defaults, not confirmed
preferences.

If `PROFILE.md` already has an old-style `Working hours` line and no `Day boundaries` section
yet, don't just add a parallel field — show the existing value and ask whether to carry it
forward as the new `Day boundaries` (removing the old line) or set something different. One
confirmed edit, not two overlapping fields left to drift apart.

## Step 3 — Big rocks

If `BIG-ROCKS.md` doesn't exist yet, run `big-rocks.md` Step 2's creation flow verbatim (3–5
quarterly priorities, why + success criterion each). If it already exists, skip straight to
Step 4 — don't force a review during Setup; that's what `/presales:brain:rocks` is for later.

## Step 4 — Profile

Three separate turns, not one dense message — by this point the user has already answered
Step 2 and worked through 3-5 big rocks in Step 3, so keep each ask here light and single-topic:

1. **Contacts and sources, one message:** hot accounts? people whose mail always matters (VIPs)?
   senders/patterns to ignore? Optional task sources — GitHub repos (org/repo + handle) and/or
   a task tracker (e.g. Smartsheet, Asana, Planner: sheet/project name + your assignee display
   name)?
2. **Focus areas, its own message:** ask: "Which products, solution areas, or industries do you
   work on most? Name one or more in your own words — this tunes which newsletters and
   updates surface first." No opinion → leave empty (real opt-out — nothing gets suppressed).
3. **Training target, its own message:** recommend the handbook's standard and let the user
   adjust or decline. The PreSales Handbook asks SCs to spend 70% of their time on deals and the
   remaining 30% on learning and upskilling (§2.6), and to protect that with dedicated weekly
   learning slots in the calendar (§18.3). Ask: "Want me to track a weekly learning-time goal and
   nudge you if you're short? I'd recommend the handbook's 70/30 rule: 30% of your working week
   (from your Step 2 hours that's about <n> h). If that isn't realistic yet, pick a smaller fixed
   weekly block and grow it. What number should I track, in minutes/week?" Compute `<n>` from the
   Step 2 day boundaries (or 40 h if skipped). Write only the number the user confirms. Skip or
   "no" → leave unset (real opt-out — no tracking, no nudge, no silent default).
   If the user sets a target, offer `/presales:brain:learn` (learning-plan skill) to decide what
   that weekly block is spent on.

Draft the full `PROFILE.md` from the skeleton, show it, adjust, write. If the file already
exists, show only the new/changed sections and merge them in surgically — never regenerate
existing sections (update-safety rule 1).

## Step 5 — Voice (optional)

Offer inline: "Want me to learn your writing style too? (~3 minutes, analyzes your last ~200
sent emails, ~35–45k tokens — best as a fresh run rather than stacked onto everything we've
already been through, but your call: now or run `/presales:brain:voice` anytime later)." If yes
now, run `voice.md` Steps 1 through 5 verbatim (Step 1's fallback covers no mail
connection), including its token-cost disclosure, prove-it-worked check,
iterate-until-approved loop, and — don't stop at approval — Step 5's save and memory-pointer
step, so the approved guide actually lands in `VOICE.md` rather than evaporating with the
session. Don't block Setup's completion on this — it can run after, and running it in a new
session is perfectly fine.

## Step 6 — Automation (optional)

Before offering anything, confirm the **`schedule` skill** (a platform-level scheduled-routine
capability, e.g. Claude Cowork routines, independent of this plugin — not something shipped in
this repo) is actually available in the
current session. If it isn't, say so plainly and skip this step: "Automation needs the `schedule`
skill, which isn't available here — you can trigger the four modes manually, or set this up from
a session/surface where it is." Don't attempt to invoke it after the user has already said yes.

If available, ask: "Want any of these to run automatically instead of you triggering them? Morning
brief and week-ahead brief are the safe ones to automate — they just print output to the routine's
conversation. Evening journal and weekly wrap-up are different: **per `conventions.md`'s Known
limitation note, a scheduled routine has no local filesystem, and your calendar/mail/file
connectors may be read-only in your org — so an automated run of these two usually cannot save
anything; it drafts instead of writing.** I'd recommend keeping those two manual (run them
yourself in Claude Code, where the write works). Still want me to schedule the journal/rollup
ones anyway?" If
the user still says yes to journal/rollup automation after that, proceed — it's their call — but
never schedule them without this disclosure being given first, and don't reword it away as a
minor caveat.

For each mode the user opts into:

1. Propose a cron time derived from Step 2's answers (morning brief → day-start time, journal →
   day-end time, week-ahead → week-start day + day-start time, weekly wrap-up → week-end day +
   day-end time), nudged 2–7 minutes off the `:00`/`:30` mark (never exactly on it), and show it
   alongside the exact prompt that will run (e.g. `Run the second-brain skill in Start My Day
   mode`). Get explicit confirmation of the time before creating anything — never assume.
2. Create it via the `schedule` skill (which wraps a durable scheduled-routine API) — **not** any
   session-local/ephemeral scheduling primitive, which would silently stop working after the
   current session ends or after a few days. **Immediately after it returns**, before any other
   chat output, write `<mode>: <trigger id> · <cron> · confirmed <today's date>` into
   `PROFILE.md`'s `Automation` section (only this mode writes this section — update-safety rule
   5) — don't let other conversation happen between creation and persisting the id, since a lost
   id here means the next Setup run can't find this routine and may create a duplicate. Relay
   back the trigger id, the parsed run time, and the claude.ai URL where output will land, so the
   user can verify the time is right.
3. **Disclose two distinct gaps, not one, for every automated mode** (the persistence gap above
   was already disclosed separately, before the ask, for journal/rollup automation specifically —
   these two apply regardless of mode): (a) *Connector parity* — "this routine runs as a scheduled
   cloud routine, which may not have the same calendar/mail/learning-platform connections active as this session; if it
   doesn't, the run degrades to the no-connections version (still useful, just less automatic)."
   (b) *No one's there* — "there's also nobody to answer the interview questions on an automated
   run — the modes handle that by writing what evidence supports and skipping the rest, marking
   the entry as auto-generated, rather than guessing answers." Both, once, per automated mode —
   not assumed away.

**Re-run path** ("change my automation schedule", or Setup run again with automation already
configured): for each mode already in the `Automation` section, look up its existing trigger via
the `schedule` skill (not just trusting the `PROFILE.md` line at face value) before creating a
new one — if the lookup confirms it still exists, offer *update the time* / *leave it* / *turn it
off*; if the lookup finds no matching routine (stale/corrupted entry), say so and offer to
recreate it, rather than silently creating a duplicate or silently trusting a dead reference.

Skip this step entirely → no automation configured; all four modes remain manually triggered
(the default today), and Setup still completed everything else.

## Output

The completed (or updated) `PROFILE.md`, `BIG-ROCKS.md`, optionally `VOICE.md`, and optionally
one or more automation routines — each shown to the user once for confirmation as it's created,
per the modes reused above. Close with a one-line summary of what's now running automatically
(if anything) and what still needs a manual trigger.

---

## Quality checklist

- [ ] Every step skippable without blocking the rest of Setup, including Big Rocks (skip → stub)
- [ ] Existing files never regenerated — only missing pieces created, existing ones reviewed and
      surgically edited if the user wants changes
- [ ] Day/week boundary answers reused as automation defaults, never re-asked
- [ ] Existing "Working hours" line offered a migration path, not left as a silent duplicate
- [ ] Focus areas captured as the user's own free-text tags; empty/skipped is a real opt-out
      with no filtering, not a default
- [ ] Training target recommendation anchored to the handbook's 70/30 rule (§2.6) and weekly
      learning slots (§18.3); empty/skipped is a real opt-out — no silent default, no nudge ever
- [ ] Automation offered only after confirming the `schedule` skill is actually available
- [ ] Automation uses the durable `schedule` skill, never a session-bound scheduling primitive
- [ ] Trigger id persisted to PROFILE.md immediately after creation, before other chat output
- [ ] Automation re-run verifies each trigger still exists via the `schedule` skill before
      offering update/leave/turn-off — never trusts PROFILE.md's record blindly
- [ ] Both the connector-parity gap and the no-one-to-answer gap disclosed per automated mode
- [ ] Journal/rollup automation (evening journal, weekly wrap-up) discloses the
      write-access persistence gap *before* asking, and only proceeds on explicit "yes anyway"
- [ ] Voice offer runs voice.md through Step 5 (save + memory pointer), not just Step 4 (approval)
