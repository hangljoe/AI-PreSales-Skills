---
name: win-loss-analyzer
version: "1.2"
last_updated: 2026-09-28
description: "Lessons learned on a closed deal (win, loss or no-decision, handbook ch. 17) in three modes: a quick solo debrief (real decision reason, MEDDPICC execution score, what to repeat and change, competitive intel), a facilitated cross-department team session (17.2), or a customer interview guide. Use on \"why did we lose\", \"debrief this win\", \"win/loss debrief\", \"lessons learned session\", \"win/loss interview\". Siblings: presales-coach (deal still open and stuck), competitive-battlecard (turn the intel into a card). SKIP for open deals and customer-facing emails."
triggers:
  - "debrief this win"
  - "analyze why we lost"
  - "win loss debrief"
  - "win/loss debrief"
  - "post-mortem on this deal"
  - "why did we win"
  - "why did we lose"
  - "deal debrief"
  - "closed deal review"
  - "debrief the deal"
  - "loss review"
  - "win review"
  - "lessons learned session"
  - "win/loss interview"
---

# Win/Loss Analyzer

Structured lessons learned on any closed deal — win, loss, or no-decision.
Finds the real reason the customer decided the way they did, not just the official version.
Grounded in *The PreSales Handbook* ch. 17 (Close Won / Close Lost Lessons Learned).

## Choose the mode

| Mode | When | Output |
|------|------|--------|
| **A — Quick debrief** (default) | You, alone or with the AE, within a week of the decision. 20–30 minutes. | Steps 1–7 below: the debrief card and an optional internal write-up. |
| **B — Team session** (handbook 17.2) | Significant, strategic or repeated wins/losses. Several departments were involved. | A facilitated session plan, a categorised findings log, and actions with owners and dates. |
| **C — Customer interview** | The customer agreed to a short call about their decision. Works for wins and losses. | A question guide and a notes template that feed Mode A or B. |

Ask which mode if the user doesn't say. Default to A. Suggest B when the deal was large or the same loss reason keeps coming back, and C when the customer relationship allows it (asking for their view shows you value it, 17.1). Modes combine well: run C first, then A or B with the customer's answers.

If a deal folder exists, read it first (discovery summary, MAP, competitive read).

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **CRM (e.g. Salesforce, HubSpot)** | Pulls full deal history, stage progression, activity log, and close data automatically |
| **Knowledge base (e.g. Confluence, Notion)** | Saves the debrief to your team's win/loss library so others can learn from it |

No connections? Fill in the deal context below.

---

# Mode A — Quick debrief

## Step 1 — Give the skill the deal context

Tell the skill:
1. **Account name and approximate deal size**
2. **Products that were evaluated**
3. **Outcome**: Win / Loss / No decision (the customer formally stopped or shelved the evaluation)

   *Still evaluating?* Then the deal is not closed and this is not a debrief. Say so, and route to the `presales-coach` skill to work the open deal. Come back when there is a decision.
4. **If a loss**: Who won? (Competitor name / build internally / no budget / no decision)
5. **How long was the deal?** — from first contact to close
6. **Key people from the customer side** — who participated in the evaluation
7. **What did the customer tell you about their decision?** (Their stated reason)
8. **What do you ACTUALLY think happened?** — your honest gut read

If a CRM (e.g. Salesforce, HubSpot) is connected: the skill will pull the full deal timeline and activity history automatically.

---

## Step 2 — The real decision moment

The deal was decided at a specific moment — rarely on the day they signed or declined.

```
THE DECISION MOMENT

When did it actually happen?
[Not the close date — the moment the customer's mind was made up.
 It could be after a specific demo module, a pricing conversation, a stakeholder meeting you weren't in.]

What was the context at that point?
[Deal stage, who was involved, what had just happened]

What did the customer do or say that signalled it?
[A reaction, a question that changed tone, a stakeholder who went quiet, a delay that started]

If you could go back and change one thing at that moment — what would it be?
[One specific thing — not a list]
```

---

## Step 3 — MEDDPICC debrief

How well did we execute against each element? Score 1–5 (1 = didn't happen, 5 = fully done).
MEDDPICC is this kit's qualification standard, an extension of the BANT the handbook teaches (ch. 5–6).

| Element | What we actually did | Score | What we should have done differently |
|---------|---------------------|-------|--------------------------------------|
| **Metrics** — did we put a number on the value? | | 1–5 | |
| **Economic Buyer** — did we get to the person who signs? | | 1–5 | |
| **Decision Criteria** — did we know and shape what they were evaluating us on? | | 1–5 | |
| **Decision Process** — did we know the steps and who was involved? | | 1–5 | |
| **Paper Process** — were we ready for procurement and legal? | | 1–5 | |
| **Implicate Pain** — did they feel what staying the same would cost them? | | 1–5 | |
| **Champion** — did we have one? Did we enable them to sell internally? | | 1–5 | |
| **Competition** — did we know who was in the deal and manage it? | | 1–5 | |

**Total score: /40**
A well-qualified deal in Commit should be 28/40 or higher. (*Commit* is the CRM forecast category for deals the seller commits to closing this period. If your team uses other forecast names, read it as the highest-confidence category.)

---

## Step 4 — What we did right

Even in a loss, something worked. Name it — it's how you repeat it.

```
WHAT WORKED

1. [Specific thing we did well — concrete, not vague like "good relationship"]
2. [Specific thing we did well]
3. [Specific thing we did well]
```

---

## Step 5 — What to change next time

Maximum 3 things. If you list 10, nothing will change.

```
WHAT TO DO DIFFERENTLY — TOP 3

1. [Specific, actionable change]
   When to apply it: [The type of deal or moment where this matters]

2. [Specific, actionable change]
   When to apply it: [...]

3. [Specific, actionable change]
   When to apply it: [...]
```

---

## Step 6 — Competitive intelligence (if a competitor was involved)

```
COMPETITIVE LEARNINGS — [Competitor name]

What they showed that we weren't aware of:
[Any new capabilities, demo moments, or claims we hadn't prepared for]

Their pricing approach (if the customer shared it):
[Pricing model, discount level, commercial structure]

Their weaknesses — what the customer mentioned:
[Anything they said the competitor struggled with or where they had doubts]

New discovery questions to add when we face them next:
[Questions that would have helped us in this deal]
```

---

## Step 7 — Internal post-deal write-up (optional)

If the user wants to share the result with the team (deal channel, team meeting, leadership), turn Steps 3–6 into a short internal write-up: outcome and deal size, the real decision reason, what worked, the top 3 changes, and competitive learnings. Keep it blameless and specific. Anonymise individuals on the customer side unless the audience already knows the deal. This is internal only; never send it to the customer.

---

# Mode B — Team session (handbook 17.2)

A lessons-learned workshop with everyone who touched the deal. The goal is shared learning, never blame.

## B1 — Set the stage (before the session)

1. **Goal.** Write one line: what do we want to learn? What worked, what to do better, or both.
2. **Participants.** Invite people from every department and level that shaped the deal: SC, AE, sales leadership, and as relevant product, implementation or services, legal, finance, marketing. Missing departments mean missing pieces of the picture.
3. **Facilitator.** Name a neutral facilitator who did not own the deal. They keep time, give everyone a turn and balance strong voices. For large or sensitive deals, consider someone from outside the team.
4. **Pre-read.** Circulate a half-page brief 2 days ahead: objectives, timeline, key challenges, outcome. Use the Mode A card if you ran it.
5. **Ground rules.** Open the invite and the session with them: constructive feedback, not a blame game; talk about decisions and events, not people; listen actively; honest and respectful.

## B2 — Run the session (60–90 minutes)

```
LESSONS-LEARNED SESSION — [Account] | [Win / Loss / No decision] | [Date]
Facilitator: [name]   Participants: [names + departments]

1. Ground rules + goal                              (5 min)
2. Successes first: what went well and why          (15 min)
   → strengths to keep using, even in a loss
3. Challenges: what could we have handled differently (25 min)
   → one sticky / line per point, no discussion of who
4. Prioritise: rank by significance and recurrence  (10 min)
   → dot-vote or 1–3 scoring; keep the top 5
5. Actions for the top items                         (15 min)
6. Recap + who shares the findings                   (5 min)
```

Capture every point as it is raised (whiteboard, flip chart or a shared doc). Nothing lives only in someone's head.

## B3 — After the session

Sort every finding into a category, then look for patterns across this and earlier sessions:

| # | Finding | Category | Success / challenge | Recurring? | Action | Owner | Due |
|---|---------|----------|---------------------|------------|--------|-------|-----|
| 1 | | Communication / Technology / Resources / Process / Product / Pricing / Competition | | Yes / No | | | |

- **Every significant finding gets an action, an owner and a date.** An insight without an action is lost.
- **Share the findings** with all stakeholders, including those who weren't in the room (same rules as Step 7: internal, blameless, customer individuals anonymised).
- **Institutionalise.** Where a finding recurs, change the process, playbook or template, not just this team's habits.
- **Follow up.** Book a review 4–8 weeks out: are the actions done, and are they working? Adjust if not.
- **Make it a habit.** For long deals, run a short session at major milestones too, not only at close.

---

# Mode C — Customer interview

A 20–30 minute call with one or two customer decision makers, ideally 2–6 weeks after the decision.
Someone other than the deal's AE or SC should ideally run it, so the customer can speak freely.
Promise confidentiality and keep that promise: findings go into the internal write-up anonymised.

**Question guide** (pick 8–10; open questions, then listen):

1. What triggered the evaluation, and why at that time?
2. Who was involved in the decision, and who had the final say?
3. What criteria mattered most in the end? Did they change during the evaluation?
4. When did you know which way you'd decide? What happened at that point?
5. What did we do well in the process? What should we keep doing?
6. Where did we fall short or make it harder for you?
7. How did our demo or evaluation compare with what you needed to see?
8. How did you see the value compared with the price?
9. *(Loss)* What did the chosen option do better? *(Win)* What nearly made you choose someone else?
10. *(No decision)* What would have to change for this to come back on the agenda?
11. If you could give our team one piece of advice, what would it be?
12. May we stay in touch, and would you be open to a check-in in [6 months]?

**Notes template**

```
CUSTOMER INTERVIEW — [Account] | [Interviewee role] | [Date] | Interviewer: [name]
Stated decision reason:        [their words]
Decision moment (their view):  [when and what]
Top criteria:                  [ranked]
What we did well:              [quotes]
Where we fell short:           [quotes]
Competitor / alternative view: [what they said]
Advice for us:                 [quote]
Relationship next step:        [agreed follow-up, if any]
```

Thank them within 24 hours (use `field-comms-writer` for the note). Feed the answers into Mode A Step 2 or the Mode B pre-read.

---

## Output summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEAL DEBRIEF — [Account] | [Win / Loss / No decision]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Decision moment: [When and what happened]
Real reason for the decision: [Your honest read — not the official story]
MEDDPICC execution score: [X]/40
Top 3 changes for next time: [Listed]
Competitive learnings: [If a competitor was involved]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Handoff

- Competitive learnings → `competitive-battlecard` to update the card.
- Loss to "no decision" or an in-house build → `do-nothing-buster` before the next similar deal.
- A reusable lesson (winning demo flow, objection answer, RFP response) → `knowledge-capture` to turn it into a team asset.
- A recurring pattern across several debriefs → `presales-metrics` to see it in the team KPIs, then raise it in your team review or `presales-coach`.

---

## Quality checklist

- [ ] You've named the REAL reason — not the polite version the customer gave you
- [ ] MEDDPICC scores are honest — 2s where we didn't execute, not inflated to 4s
- [ ] "What to change" has a maximum of 3 items — specific, not vague
- [ ] Competitive learnings are documented for the whole team, not just for you
- [ ] If a CRM (e.g. Salesforce, HubSpot) is connected: update the close reason and competitor fields (confirm before writing)
- [ ] If a knowledge base (e.g. Confluence, Notion) is connected: save to the team win/loss library (confirm before writing)
- [ ] Team session (Mode B): neutral facilitator named, successes discussed first, every top finding has an owner and a date, a follow-up review is booked
- [ ] Customer interview (Mode C): confidentiality promised and kept, thank-you sent within 24 hours
