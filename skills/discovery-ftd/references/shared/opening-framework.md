# Universal Opening Framework — Every Discovery

Based on the Functional & Technical Discovery (FTD) methodology in The PreSales Handbook (chapter 7).
Apply this framework at the start of every discovery call, whatever product or module is in scope.

---

## Purpose

The opening phase establishes trust, surfaces the real business context, and
earns the right to ask detailed technical questions. Never skip it.
A discovery call that opens with product questions loses the relationship.

---

## Opening Question (always start here)

> *"Before we get into the details — tell me a bit about yourself.
> How did you end up in this role, and what does your team own day-to-day?"*

**Why:** People like talking about themselves. It relaxes the call, surfaces their
personal stake in the project, and tells you immediately whether you're talking to a
decision maker, a user, a champion, or a technical evaluator.

**Follow-up:**
- "What decisions sit with you, and what do you need others for?"
- "How are you measured — what outcomes does your leadership look for from your team?"

---

## Setting the Agenda

Ask this before any other discovery question:

> *"What would make this session a success for you today?
> What do you want to walk away with?"*

**Why:** Sets a shared goal. You learn what they're actually hoping to get from the
meeting — validation, a business case, a roadmap, or just information.

**Follow-up:**
- "What do we need to cover no matter what?"
- "If I summarise your situation back to you at the end, what do you want me to get exactly right?"

---

## Company Context

> *"What are the top company priorities this year that this initiative needs to support?"*

**Why:** Anchors discovery in strategy. Forces the value framing to be in executive
language, not feature language.

**Follow-up:**
- "Which priority is most urgent, and why?"
- "What was the trigger that made you start looking for a new solution now?"
- "What happens if the date slips? What changed recently to create urgency?"

---

## Team & Stakeholders

> *"Who is involved in this process day-to-day, and who is most impacted when it changes?"*

**Why:** Surfaces champions, users, and potential resistance early.

**Follow-up:**
- "Who benefits most from solving this? Who might push back? Who owns the training?"
- "Who needs to approve this, and what functions must sign off?"
- "Who is the final approver? Who can veto? What's the usual sequence of reviews?"

---

## Current State Walk-through

> *"Walk me through how you handle [this process] today — from start to finish."*

**Why:** Forces a shared view of reality and makes hidden work visible.
People often discover inefficiencies while explaining the flow.

**Follow-up:**
- "Where does it start and where does it end?"
- "Who touches it at each step?"
- "What exceptions or edge cases happen most often?"

---

## Workflows & Pain

> *"Where do you see the most manual work, rework, or friction in the process today?"*

**Why:** Identifies automation targets and exposes the real competitor — often
spreadsheets and workarounds, not another vendor.

**Follow-up:**
- "Which steps require copy-paste or double-entry?"
- "Where do you rely on tribal knowledge — the person who knows how this works?"

---

## Tools & Systems

> *"What tools and systems are you using today, and how do they connect to each other?"*

**Why:** Maps the tech stack and integration needs. Uncovers data silos and swivel-chair operations.

**Follow-up:**
- "Where are integrations missing or broken?"
- "What data is manually moved between systems today?"

---

## Business Operations & Value Flow Context

> *"At a high level, what is your end-to-end flow — from source to customer, or from request to delivery?"*

**Why:** Gives a system view so you don't optimise one step while harming another.

**Follow-up:**
- "Which steps are internal vs. external?"
- "Where are the key handoffs, and where does variability hit hardest?"

---

## Impact & Quantification

> *"What does this problem cost you today — in time, money, or risk?"*

**Why:** Quantification enables ROI and prioritisation. If the pain isn't expensive or risky, it won't get funded.

**Follow-up:**
- "How many hours per week? How many errors per month?"
- "What's the financial impact per incident?"
- "Which of your goals is most at risk because of this?"

---

## The "Do Nothing" Question

> *"What happens if you don't fix this in the next six months?"*

**Why:** Tests urgency. If nothing happens, the project will stall. If consequences are serious, you have a business case.

**Follow-up:**
- "What gets worse?"
- "Are there any deadlines, audits, or customer commitments at risk?"

---

## Magic Wand

> *"If you had a magic wand and could fix two things in your current process — what would they be?"*

**Why:** Helps prioritise without forcing them into solution details.

**Follow-up:**
- "Why those two specifically?"
- "What would change immediately if they were fixed?"

---

## Requirements

> *"What are your must-have criteria versus nice-to-have?"*

**Why:** Prevents demo overload and gives you clear qualification signals for fit.

**Follow-up:**
- "What would disqualify a solution for you immediately?"
- "What does 'success' look like 12 months after go-live?"

---

## Closing the Opening

Before moving to product-specific questions:

> *"That's really helpful context. Let me make sure I understand — [summarise their situation in 3 sentences]. Does that capture it accurately? What did I miss?"*

**Why:** Demonstrates active listening, builds trust, and corrects your hypotheses
before you build questions on wrong assumptions.

---

## FTD 9-Step Structure (handbook 7.2 — for full multi-stakeholder engagements)

For larger deals (above your TFQ engagement floor — the kit default is ~100k ARR, an example to
adjust to your own) or complex integrations, run discovery as the handbook's nine-step process
(7.2) rather than a single call. Steps 3–5 are where the stakeholder sessions happen; each session
follows the 7.4 stages and SPIN sequencing from the `discovery-ftd` call guide.

| Step (handbook 7.2) | What happens | Sessions / audience | Kit tool |
|---------------------|--------------|---------------------|----------|
| 1 Preparation | Research the client, its competitors and market; list open-ended questions (hypotheses: kit) | SC + AE | `/presales:discovery:prep` |
| 2 Initiate Engagement | Book a 25-minute first session, state its purpose, ask for more sessions at the end | Sponsor or champion | `discovery-ftd` Output A |
| 3 Information Gathering | Open questions, active listening, notes or a recording | Executive briefing (sponsor); business sponsor; process owner | `discovery-ftd` Output A per session; `/presales:discovery:summary` after each |
| 4 Technical Assessment (if applicable) | Systems landscape, integrations, constraints, security | Technical briefing (IT / architecture); IT lead (APIs, data flows) | `integration-complexity` |
| 5 Stakeholder Interviews | Role-specific questions, confidential setting | Process owners, functional leads, user groups | One question set per audience |
| 6 Gap Analysis | Compare current state with desired outcomes; prioritise gaps by impact and urgency | Requirements workshop (all); SC consolidation | `capability-mapper` requirement fit table |
| 7 Feedback and Validation | Present the findings back; correct and refine | Customer sign-off session | Summary read-back |
| 8 Documentation and Sharing | Consolidate into the OSD (chapter 8); share with sales, PS and product | SC | `osd-scoper` → `osd-architect` |
| 9 Plan Next Steps | Tailor the solution; book follow-ups or the demo | SC + AE + customer | `/presales:discovery:golden-hours`, `/presales:account:map` |

When running multiple sessions: generate a separate question set per session, tailored to each audience.
