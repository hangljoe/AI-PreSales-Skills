---
name: learning-plan
version: "1.1"
last_updated: 2026-09-28
description: "Builds a personal monthly or quarterly learning plan for an SC, following the handbook's 70/30 deals-to-learning rule: goals across product, industry, selling skills and soft skills, a protected weekly learning block, a curated source mix, an accountability partner and a review cadence. Reads your second-brain big rocks if you have one. Use on \"build my learning plan\", \"learning goals for this quarter\", \"how do I stay up to date\", \"plan my upskilling\". Siblings: second-brain (daily/weekly loop and the training-time nudge). SKIP for team training programmes or onboarding plans."
triggers:
  - "build my learning plan"
  - "learning plan"
  - "learning goals for this quarter"
  - "how do I stay up to date"
  - "plan my upskilling"
  - "70/30 learning"
  - "review my learning plan"
---

# Learning Plan

Turns "I should learn more" into a written plan you can keep. The PreSales Handbook asks you to
spend about 70% of your time on deals and protect the other 30% for learning and upskilling (ch. 2.6,
repeated as an organisational rule of thumb in ch. 18.4). This skill makes that 30% concrete: what
you will learn, when, from which sources, with whom, and how you check progress (ch. 18.2–18.3).

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **Calendar (optional, e.g. Outlook or Google Calendar)** | Finds a realistic slot for the weekly learning block. Booking is always confirm-gated; without write access you get the slot to add yourself |
| **Learning platform (optional, e.g. LinkedIn Learning, Coursera, your company LMS)** | Lists assigned or in-progress courses so the plan builds on them |
| **second-brain folder (optional)** | Reads `BIG-ROCKS.md`, `PROFILE.md` (Focus areas, Training target) and recent weekly rollups, if they exist |

No connections? The skill works the same from your answers.

---

## Step 1 — Intake

Check for a second brain first (folder resolution per
`${CLAUDE_PLUGIN_ROOT}/skills/second-brain/references/conventions.md`). If it exists, read only
`BIG-ROCKS.md`, `PROFILE.md` and the latest 4 `weekly/` rollups. Never read the journal archive.
Do not read `VOICE.md` unless you are drafting a message for the user (e.g. the accountability
partner invite in Step 5). If there is no second brain, skip this silently.

Then ask, in one message, only for what you could not read:

1. **Horizon** — this month or this quarter? (Recommend a quarter; ch. 18.3 sets goals monthly or quarterly.)
2. **Your role and products** — what you sell, to which industries, and your seniority.
3. **Hours available** — a typical week's hours. Recommend 30% of working time for learning
   (ch. 2.6). If `PROFILE.md` already has a Training target (minutes per week), plan to that number
   instead and say so. Second-brain setup recommends the same 30% share by default.
4. **Known gaps** — feedback from a manager, peer or lost deal; a demo that went badly; an
   upcoming product release or certification.
5. **What you already have running** — courses, certifications, study groups.

If the user asks for less than 30%, accept it. Name the gap in one line, and plan to the number
they chose.

---

## Step 2 — Set 3–5 learning goals across four areas

Cover the four areas the handbook keeps returning to. Stay current on your own product and the
wider market (ch. 18.1–18.2). Keep up with industry and regulatory change (ch. 18.1). Balance technical
depth with the soft skills of empathy, communication and problem-solving (ch. 2.6).

| Area | Typical goal |
|------|--------------|
| **Product** | Master a new release or feature well enough to demo it cold |
| **Industry** | Understand a regulation, trend or buyer shift in your top industry |
| **Selling skills** | Discovery, demo, objection handling, value, negotiation |
| **Soft skills** | Listening, storytelling, executive presence, writing |

Each goal must be checkable at the end of the horizon (ch. 18.3 names examples such as mastering a
feature, a number of webinars, or a certification). Write each goal as: *what*, *proof it is
done*, *by when*, *which deal or big rock it serves*. If a second-brain big rock exists, tie at
least one goal to it. Cap the plan at five goals. More than five means none gets done.

---

## Step 3 — Protect the weekly learning block

ch. 18.3 recommends fixed weekly or bi-weekly slots, scheduled with reminders, so learning becomes a
habit rather than an intention. Propose:

- **One recurring block** sized to the chosen share (30% of 40 hours is 12 hours; most SCs start
  with 2–4 hours of protected time and count the rest as in-flow learning like mock demos).
- **Placement** in a low-meeting slot. If a calendar is connected, find a genuinely open slot
  using the free-slot rules in second-brain's `conventions.md`. Offer to book it only after the
  user confirms; never write silently.
- **A micro-habit** for busy weeks: 20 minutes of reading or one short video, so the streak holds.

---

## Step 4 — Curate the source mix

ch. 18.2 lists internal and external sources; ch. 18.3 asks you to diversify media. Pick 1–2 per row
that fit the goals. Name source *types* and let the user fill in names they trust.

| Source type | Handbook basis | Serves |
|-------------|----------------|--------|
| Product team contact and release notes; internal training after each release | ch. 18.2 | Product |
| Mock demos with colleagues | ch. 18.2 | Product, selling skills |
| Industry events or webinars | ch. 18.2 | Industry |
| Online courses and vendor certifications | ch. 18.2 | Any |
| Online communities and forums | ch. 18.2 | Product, industry |
| Industry publications and newsletters, with weekly reading time | ch. 18.2 | Industry |
| Alerts or feeds on your industry keywords (e.g. Google Alerts, Feedly, LinkedIn) | ch. 18.3 | Industry |
| Mentor and peer network | ch. 18.2, ch. 18.4 | Soft skills, career |
| Client and post-demo feedback | ch. 18.2 | Selling skills |
| Study group | ch. 18.3 | Any |

Warn against a single-source diet. ch. 18.1 also asks you to prefer reliable sources over noise.

---

## Step 5 — Accountability partner and journal

- **Partner** (ch. 18.3): suggest one colleague to swap articles and nudges with. Offer a two-line
  invite the user can send. Draft it in the user's voice if `VOICE.md` exists.
- **Learning log** (ch. 18.3): a short journal of what you learned and where you applied it. If the
  user has a second brain, recommend one line per learning session in End My Day's Done section.
  That makes End My Week's training tally easy to answer. Otherwise keep the log inside the plan
  file (Step 7).
- **Reflection** (ch. 18.3): each log entry answers "where will I use this in a live deal?"
- **Feedback** (ch. 18.3): ask a peer, mentor or manager once per horizon where your blind spots are.

---

## Step 6 — Review cadence

| When | What |
|------|------|
| Weekly (5 min) | Block kept? Minutes vs target. One thing applied in a deal |
| Monthly (20 min) | Goals on track / at risk / dropped; adjust sources |
| End of horizon | Score each goal done / partial / missed; carry over or retire; set the next plan |

With a second brain, the weekly check rides on End My Week's training nudge. Do not add a second
nudge.

---

## Step 7 — Output and save

```markdown
# Learning plan — <Name> — <Q/Month YYYY>
Deal/learning split: <70/30 or chosen> · Weekly block: <day, time, length> · Partner: <name or TBD>

## Goals
| # | Area | Goal | Proof of done | By | Serves (deal / big rock) | Status |
|---|------|------|---------------|----|--------------------------|--------|

## Sources
| Goal | Source type | Named source (user fills) | Cadence |

## Accountability
Partner: … · Check-in rhythm: … · Feedback ask: <who, when>

## Review cadence
Weekly: … · Monthly: … · End of horizon: <date>

## Learning log
- <date> — <what I learned> → <where I applied it>
```

Show the plan first. Save only after the user confirms. With a second brain, suggest
`second-brain/LEARNING-PLAN.md`, a new file this skill owns. Never edit `BIG-ROCKS.md`,
`PROFILE.md` or `VOICE.md`. If the user wants a different Training target in `PROFILE.md`,
tell them to run `/presales:brain:setup` or edit it themselves. Without a second brain, save to a
folder the user names, or `./output/learning-plan-<YYYY-Qn>.md`. Never write into the plugin
folder. On claude.ai (no filesystem), hand over the file content and the path to save it.

---

## Quality checklist

- [ ] 3–5 goals, each with proof of done and a date, covering at least three of the four areas
- [ ] At least one goal is tied to a live deal or a big rock
- [ ] The weekly block has a day, time and length, and booking was confirm-gated
- [ ] Source mix spans at least three media types (ch. 18.3 diversification)
- [ ] Accountability partner and review dates are named, not left as "later"
- [ ] Personal content stays in the user's folder and never lands in customer-facing output

---

## Handoff

- Daily and weekly rhythm → `second-brain` (`/presales:brain:end`, `/presales:brain:end-week`)
- A skill gap from a lost deal → `win-loss-analyzer` first, then feed the top change back here
- Practise a demo or objection → `demo-dryrun-coach`, `/presales:deal:objection-drill`
- Share what you learned with the team → `knowledge-capture`
