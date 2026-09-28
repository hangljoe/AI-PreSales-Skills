---
description: Golden hours after a discovery call (or demo) — debrief, AE brief, confirm-gated CRM update and 24-hour action plan, built from the call summary
argument-hint: "[account] [call summary, or raw notes to summarise first]"
---

Run the golden hours plan for: **$ARGUMENTS**

*The PreSales Handbook* (11.6) calls the first 24–48 hours after a demo the "golden hours": the
window where follow-up has the most impact on the decision. This kit applies the same discipline
after discovery calls as well as demos. Act on the immediate items within 2 hours and finish the
rest within 24.

## Input: the call summary (don't re-extract)

This command consumes an existing call summary. It does not rebuild one.

- **Discovery call:** use the summary in the shared schema (`${CLAUDE_PLUGIN_ROOT}/references/call-summary-schema.md`),
  pasted or read from the deal folder (`02_discovery-notes.md` or `*_discovery-summary.md`).
- **Demo or other meeting:** use the `meeting-notes-structurer` output.
- **Only raw notes or a transcript?** Run `/presales:discovery:summary` first (or `discovery-transformer`
  for a `.vtt` file), then continue here.

The MEDDPICC delta, pains, next steps and follow-up email brief live in the summary. Refer to them;
don't copy them into this plan.

---

## Golden Hours Plan — [Account] | [Date]

### 1. Debrief (internal — do this first, while it's fresh)

| Question | Your answer |
|---------|------------|
| What was the single most important thing they said? | |
| What surprised you — something you didn't expect? | |
| What's the strongest pain signal? What's the evidence? | |
| Which MEDDPICC gap (summary section 4) worries you most? | |
| Who in the room was most engaged? Who went quiet? | |
| Champion signal (1–10)? What's your read? | |
| Is this a real opportunity? Why / why not? | |
| What would you do differently on the next call? | |

**Biggest gap to fill before the next call:** [one element — the one that could kill the deal if it stays unknown]

---

### 2. AE brief (within 2 hours — Slack or a quick call, not a long email)

- [ ] Outcome: invest / qualify further / deprioritise?
- [ ] Top 1–2 confirmed pains (and whether either is a CBI or only a candidate CBI)
- [ ] Champion: who and how strong?
- [ ] MEDDPICC headline — the one gap that matters most
- [ ] Proposed next step and proposed date
- [ ] Any competitive signal (name the competitor if mentioned)

---

### 3. CRM update (before end of day — confirm-gated)

Prepare the update from the summary, show it as a short before/after list, and write only after an
explicit "yes". Without a connected CRM, give the user the list to paste.

- [ ] Call activity logged — date, attendees, meeting type
- [ ] MEDDPICC fields updated from the summary's delta (section 4)
- [ ] Opportunity stage reviewed — advance only if a real signal supports it
- [ ] Next activity created with date and owner
- [ ] Confirmed pains saved to opportunity notes
- [ ] New contacts added — name, title, role (Champion / Blocker / Neutral / EB)

---

### 4. 24-hour action plan

| Action | Owner | By when |
|--------|-------|---------|
| Draft and send the follow-up email with `field-comms-writer`, from the summary's section 8 (after a demo: `/presales:demo:post-followup`) | SC | 2 hours |
| Brief the AE | SC | 2 hours |
| Update the CRM (confirm-gated) | SC | End of day |
| Research the top open question: [from summary section 6] | SC | 24 hours |
| Book the next step | SC + AE | 24 hours |
| Run `/presales:value:pain-to-value` on confirmed pains | SC | 24 hours — if the pains are strong enough |
| Run `/presales:discovery:qualify` for the MEDDPICC score | SC | 24 hours — if qualification is unclear |
| Update the Mutual Action Plan with `/presales:account:map` | SC + AE | 24 hours — if dates moved |

---

Confidence-tag any new intelligence: 🟢 Confirmed on the call / 🟡 Inferred / 🔴 Still unknown.
