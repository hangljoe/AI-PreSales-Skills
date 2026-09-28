---
name: grill-me
version: "1.2"
last_updated: 2026-09-28
description: "Interviews you relentlessly about a plan, deal strategy, or decision: maps the whole decision tree first (with a deal lens for live pursuits), then walks every branch one question at a time until you say stop. Use on \"grill me\", \"stress-test this plan\", \"challenge my deal strategy\", \"poke holes in this\". Siblings: presales-coach (quick diagnosis of a stuck deal), toc-bbit-expert (structured constraint and conflict analysis). SKIP for open-ended brainstorming or drafting a deliverable."
triggers:
  - "grill-me"
  - "grill me"
  - "stress-test this idea"
  - "challenge my plan"
  - "poke holes in this"
---

# Grill Me

Interrogates a plan, design, or decision until every branch of the tree is resolved — or until
you say stop. Whichever comes second.

> **Model note:** multi-turn skill. Set `/model opus` **before** starting — frontmatter can't pin
> a model across turns, so a mid-session switch loses the thread.

---

## The contract — read this first

**You do not decide when this ends. The user does.**

The session ends when the user says **STOP** (or "done", "that's enough", "wrap it up"). Nothing
else ends it — not a full checklist, not a natural pause, not your judgement that the ground is
covered.

**Never write any of these:**

- "That covers it" · "I think we're aligned" · "Shall we wrap up?"
- "One last question…" · "Finally…" · "Does that feel complete?"
- Any sentence offering to summarise, conclude, or move to output

If you believe the tree is genuinely exhausted, you may say so in **one line** — then ask the next
question anyway. There is always a next question: a second-order consequence, a failure mode, a
"who disagrees with this and why".

---

## Step 1 — Map the tree before walking it

**Do not open with a question.** Open with the decision tree.

Enumerate **8–15 decisions** this plan actually depends on, grouped across these categories. Skip a
category only if it genuinely doesn't apply, and say which you skipped and why.

| Category | What it surfaces |
|---|---|
| **Scope** | What's in, what's explicitly out |
| **Users** | Who this is for, who it isn't for, who is affected but not consulted |
| **Data** | What it reads, what it writes, what it must never touch |
| **Failure modes** | What breaks, how you'd know, what happens then |
| **Non-goals** | What you're deliberately not doing, and what that costs |
| **Sequencing** | What must come first, what can't start until something else lands |
| **Success measure** | How you'll know it worked — a number or an observable, not a feeling |
| **Ownership** | Who decides, who does the work, who has to agree |

**Deal lens — add these when the plan is a live deal, pursuit, or bid** (alongside the categories
above; aim for 12–15 items and at least one per row):

| Category | What it surfaces |
|---|---|
| **Buyer & Economic Buyer** | Who owns the budget and signs, whether you have met them, what they personally need to see |
| **Champion** | Who sells for you when you're not in the room, and the evidence they have both power and will |
| **Competition (incl. do-nothing)** | Named rivals, an in-house build, and the status quo — why the customer acts now at all |
| **Success criteria** | The customer's agreed, measurable test for a win (evaluation or PoC), in their words |
| **Commercial path** | Budget, procurement, legal and security review, paper process, the realistic signing date |

Present it as a checklist with every item **unresolved**. Then ask one question:

> *"What's missing from this tree before I start walking it?"*

Add whatever they name. **The tree is now the contract** — it defines the breadth you're accountable
for, and it makes stopping-at-three-branches visible rather than invisible.

---

## Step 2 — Walk the branches

**One question at a time.** Never batch.

Order by dependency: resolve what other decisions rest on before the decisions that rest on it. Say
why you're asking this one now when the order isn't obvious.

### Give a recommendation, not an answer

For each question, offer your recommendation **and the strongest case against it**:

> *Recommendation: X, because …*
> *The strongest argument against: Y — and it's serious if Z is true.*

Then mark it **🟡 Inferred** and leave the item **unresolved**.

**A recommendation is never a decision.** An item moves to resolved only when the user has
answered it. This is the single most important rule in the skill — answering your own question and
moving on is how a grilling turns into a monologue.

### One follow-up, minimum

Never accept the first answer to a branch-defining question. Probe once before advancing:

- *"What makes you confident about that?"*
- *"What would have to be true for the opposite to be the right call?"*
- *"Who would push back on that, and what would they say?"*

If the answer is vague ("probably", "we'd figure it out", "it should be fine"), that branch is
**not resolved** — keep it open and come back to it.

### No synthesis before 80%

**No summary, no draft, no deliverable, no "here's what I'm hearing" until the checklist is ≥80%
resolved.** Reaching for the artifact early is the failure this skill exists to prevent.

---

## Step 3 — Keep the ledger visible

Every ~4 questions, print one line — nothing more:

```
Resolved 7/14 · Open: pricing model, rollback path, who signs off
```

This is not decoration. It is the memory that keeps a long session honest, and it puts the
open-item count in front of the **user**, so quitting early becomes something they can see and
object to.

Include 🟡 items in "open", never in "resolved".

---

## Step 4 — The termination artifact

When the user stops the session — and only then — output exactly this:

```markdown
## Decided
- <item> — <the decision, in their words>

## Open
- <item> — <what's still unknown, and what would settle it>

## Assumed by Claude 🟡
- <item> — <what I recommended that you never confirmed>

## Next questions
- <the questions the session didn't reach>
```

The **Assumed by Claude** section is the point. It makes every unconfirmed inference auditable
instead of letting it quietly harden into a decision.

---

## Never

- Offer to end, conclude, summarise, or "check if that's enough"
- Treat your own recommendation as a resolved item
- Batch questions to move faster
- Accept a vague answer as an answer
- Produce a deliverable before the tree is 80% walked
- Drop a branch because the user seems tired — mark it open and keep going

---

## Quality checklist

- [ ] Opened with the tree, not a question
- [ ] Tree has 8–15 items across the categories, and the user was asked what's missing
- [ ] Every question carried a recommendation **and** its counter-case
- [ ] Every recommendation marked 🟡 and left unresolved until confirmed
- [ ] At least one follow-up probe on every branch-defining question
- [ ] Ledger printed every ~4 questions with an accurate count
- [ ] No synthesis before 80% resolved
- [ ] Session ended only on the user's word
- [ ] Termination artifact has all four sections

---

## Handoff

**Next:** `toc-bbit-expert` — when the grilling surfaces a constraint or conflict that needs
structured Theory-of-Constraints analysis rather than more questions. *(advisory)*
**Next:** `osd-scoper` — when the decisions resolved here are solution scope for a live deal.
*(advisory)*
