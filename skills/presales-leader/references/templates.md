# PreSales Leader — output templates

One skeleton per mode. Fill every bracket; leave nothing invented. Confidence-tag every claim
that isn't a plain fact from the leader: 🟢 Confirmed, 🟡 Inferred, 🔴 Unknown.

---

## Pipeline review

```markdown
# Pipeline review — [Team] — [Date]
Cadence: weekly / bi-weekly · Deals reviewed: [n] · Prequal sweep folded in: yes / no

## Board
| Account | Stage | SC | Hours committed | TFQ/ORC verdict | MAP next date | Risk | Confidence |
|---------|-------|----|-----------------|------------------|----------------|------|------------|

## Three decisions to make
1. [Decision] — evidence: [what on the board drives it] — owner: [name] — by: [date]
2. …
3. …

## Next review
[date] · cadence: [weekly / bi-weekly]
```

Risk column values: "no MAP date", "past target close", "hours over budget" (past the average hours per deal from Capacity mode), or blank.

---

## One-on-one

```markdown
# One-on-one — [SC name] — [date] · since [last 1:1 date]
Sources used: presales-metrics scorecard ([period]) · rollups the SC shared / self-report

## Wins
- [Specific, evidenced win 1]
- [Specific, evidenced win 2]

## Blockers
- [What's stopping progress] — who can unblock: [name]

## One development goal
[Goal, tied to a named KPI or skill gap] — next check-in: [date]

## One ask of the leader
[Resourcing / training / introduction / other]

## Notes
[Anything else raised, in the SC's own words where possible]
```

Never add a peer comparison or a ranking line to this template. If the SC asks how they compare
to the team, answer with the team-level distribution question from `presales-metrics`' leader
mode, in a separate conversation — not inside their own 1:1 record.

---

## Capacity

```markdown
# Capacity model — [Team] — [date]

## Inputs
| Input | Value | Tag | Note |
|-------|-------|-----|------|
| Quota per SC (annual) | | 🟢/🟡/🔴 | |
| Team revenue target (period) | | 🟢/🟡/🔴 | |
| Close rate | | 🟢/🟡/🔴 | |
| Avg hours per deal (or per stage) | | 🟢/🟡/🔴 | |
| Avg deal size | | 🟢/🟡/🔴 | |
| Working hours per SC per year | [default: 1,600] | 🟢/🟡/🔴 | handbook ch. 5 worked example |

## Calculation
Opportunities per SC = hours available ÷ hours per deal = [low – high]
Deals won per SC = opportunities × close rate = [low – high]
Deliverable revenue per SC = deals won × avg deal size = [$ low – $ high]
Quota coverage = deliverable revenue per SC ÷ quota per SC = [x.x – x.x]  (flag if < 1)
Headcount needed = team revenue target ÷ deliverable revenue per SC = [low – high, never a point]
Per-deal budget (echoed for Pipeline review) = avg hours per deal = [h]

## Recommendation
Headcount: [low] – [high] SCs, given the 🟡/🔴 inputs above.
Caution: every unwinnable deal an SC carries lowers the whole team's chance of making quota —
this number is a ceiling on what should be committed, not a target to fill up to.
```

---

## Onboarding

```markdown
# 30-60-90 onboarding — [New SC name] — starts [date]
Prior experience: [industry / competitor / new to PreSales] · Buddy/mentor: [name] · Product(s): [list]

## Days 1–30 — observe and integrate
- [ ] Meet each team member and named cross-functional peers individually
- [ ] Shadow [n] live demos or calls
- [ ] Product-proficiency basics: [what "basics" means for this product]
- [ ] Note: listen more than speak

## Days 31–60 — practice and reverse-shadow
- [ ] Lead [n] call(s) or demo(s) with the mentor observing and debriefing
- [ ] Role-play / simulation practice on [named objection or scenario types]
- [ ] First small-account exposure: [account or account type]
- [ ] Self-identified skill gap logged: [gap]

## Days 61–90 — first solo gate and check-in cadence
- [ ] First solo demo scored by the mentor against the team demo checklist — pass required
      before running one fully unsupervised
- [ ] Feedback loop on the plan itself: what worked, what to change for the next hire
- [ ] Regular check-in cadence agreed for the rest of the first year: [cadence]

## First solo demo gate
| Criterion | Mentor score (1–5) | Pass threshold |
|-----------|---------------------|-----------------|
```

---

## Hiring

```markdown
# SC hiring kit — [role level / seat] — [date]
Must-have skills: [list] · Candidates in loop: [n]

## Role scorecard
| Dimension | What "strong" looks like | Interview stage that tests it |
|-----------|---------------------------|--------------------------------|

## Demo role-play brief (give to the candidate in advance)
Scenario: [short prospect scenario]
Mock customer persona: [name, role, one pain]
What the panel watches for: [2–3 specific behaviours, not "did it go well"]

## Scoring rubric
| Dimension | 5 looks like | 2 looks like | Score |
|-----------|--------------|--------------|-------|

## Debrief
| Interviewer | Score | Evidence |
|-------------|-------|----------|

Shared recommendation: [one sentence, drawn from the table above, not a single interviewer's
gut call]

## Who runs the loop
See `raci.md` for the hiring-loop RACI row.
```
