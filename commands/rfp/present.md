---
description: RFP/RFI Response Presentation — build the polished consolidated response deck to accompany or replace the written response document
argument-hint: "[account name] [paste coverage matrix or response summary]"
---

Build the RFP/RFI response presentation for: **$ARGUMENTS**

Paste the coverage matrix and key responses from `/presales:rfp:respond`, or describe
what was submitted. This command builds the polished presentation deck that:
- Makes a human case alongside the formal document response
- Is shown in a follow-up presentation session (if the customer invites shortlisted vendors)
- Can serve as a standalone response for RFIs that ask for a deck rather than a document

---

## Step 1 — Intake

1. **Coverage matrix** from `/presales:rfp:respond` — the core of the deck
2. **Account context** from `/presales:rfp:analyze` — relationship, history, account intelligence
3. **Value case** — from `/presales:value:roi-case` if run; otherwise construct from confirmed pains
4. **Presentation format**:
   - [ ] **Vendor presentation** — shown live to the evaluation team (typically 30–60 min)
   - [ ] **Response deck** — submitted as a document alongside the written response
   - [ ] **Executive summary deck** — 5–8 slides for senior stakeholders only
5. **Slide count target** and any page/format restrictions from the RFP
6. **Brand** (for slide generation via `pptx-generator` skill) — uses the presales-handbook brand by default; users can add their own brand folder

---

## Step 2 — Deck structure

Use this proven RFP response structure. Every section must earn its place:

```
SLIDE PLAN — [Account] | [RFP title] | [Date]

SECTION 1 — EXECUTIVE SUMMARY (1–2 slides)
Purpose: Give the evaluator the answer in the first 90 seconds.
Content:
  - Our headline recommendation / solution in one sentence
  - The [N] requirements we are uniquely positioned to meet
  - Our proposed value case in one line
  - Why we should be on the shortlist

SECTION 2 — UNDERSTANDING OF YOUR REQUIREMENTS (2–3 slides)
Purpose: Show we read the RFP and understood it — not just answered it.
Content:
  - Their stated objectives (verbatim where possible — shows we listened)
  - The [N] critical requirements we see as determining the winner
  - Any requirements we want to explore further in Q&A
  - What "success" looks like for them (from discovery, if any; inferred from RFP otherwise)

SECTION 3 — OUR SOLUTION (3–4 slides)
Purpose: Map our products directly to their requirements.
Content:
  - One slide per major requirement area (not per product)
  - For each area: requirement → our capability → proof point
  - Coverage summary: ✅ Full / ⚠️ Partial / 🗓️ Roadmap — with honest notes
  - Integration architecture (if integration is a requirement)
  Note: do NOT lead with product names — lead with requirements met.

SECTION 4 — IMPLEMENTATION APPROACH (2 slides)
Purpose: Show this is real and deliverable, not just a pitch.
Content:
  - High-level implementation phases and timeline
  - What the customer's team needs to provide (be honest)
  - Named implementation resources if available
  - Reference: a comparable prior implementation (similar scope/size)

SECTION 5 — VALUE CASE (1–2 slides)
Purpose: Make the financial case without overselling.
Content:
  - The [N] value drivers confirmed or inferred from the RFP
  - Estimated annual value — confidence-tagged 🟡 Inferred
  - Indicative payback period
  - Reference customer benchmark (with confidence tag)
  Mandatory: all figures must be confidence-tagged before this slide goes to a customer.

SECTION 6 — WHY US (1–2 slides)
Purpose: One defensible reason to choose us over the alternatives.
Content:
  - One specific differentiator — not a feature list, not competitor attacks
  - Depth of the platform vs point solutions (if relevant to this RFP)
  - Ecosystem / network effects (if relevant)
  - Stability and commitment to the space
  Note: one compelling, specific reason beats five generic ones.

SECTION 7 — REFERENCE CUSTOMERS (1 slide)
Purpose: Reduce perceived risk.
Content:
  - [2–3] reference customers most relevant to THIS account's industry, size, and use case
  - For each: company name (if permission granted), industry, use case, outcome
  - If no named reference: describe the customer profile and outcome without naming them
  Mandate: confirm every named reference with your AE before including.

SECTION 8 — PRICING OVERVIEW (1 slide)
Purpose: Anchor the investment against the value — not present it in isolation.
Content:
  - Annual investment range or specific figure (as agreed with AE)
  - Framed against the value case from Section 5
  - Payment / commercial structure options (if relevant)
  - What's included vs what would be additional

SECTION 9 — NEXT STEPS (1 slide)
Purpose: Make it easy to say yes and move forward.
Content:
  - Specific ask: shortlist call / product demo / reference customer call
  - Our proposed timeline from shortlist to signature
  - Named contact for follow-up (SC + AE)
```

**Hard rules:**
- Every claim must be supportable — run `confidence-tagger` before finalising
- No unconfirmed reference customer names
- No product roadmap items presented as GA
- Slide count: aim for 12–16 slides for a 45-minute presentation; 6–8 for a submission deck

---

## Step 3 — Slide generation

To generate the actual PPTX, run the `pptx-generator` skill with:
- Brand: presales-handbook by default, or the user's own brand folder if they have added one
- Layouts: use stats-slide for coverage numbers, two-column for requirement/response pairs, content-slide for narrative sections
- Target: 1 slide per major content block above

Tell the pptx-generator skill:
```
"Generate a [N]-slide RFP response presentation for [Account].
Use the [presales-handbook / your own] brand.
Structure: Executive Summary → Requirements Understanding → Solution →
Implementation → Value Case → Why Us → References → Pricing → Next Steps.
Content is from the RFP response coverage matrix below: [paste]"
```

If you prefer to build the deck manually in PowerPoint or Google Slides: the structure above is the template. Use the slide plan as your outline.

---

## Step 4 — Presentation rehearsal

Before the live session, use these to prepare:

```
PRESENTATION PREP CHECKLIST

Content
  [ ] Every requirement reference in the deck maps to the coverage matrix
  [ ] All value figures are confidence-tagged — no 🔴 claims in the deck
  [ ] Reference customers confirmed — no unapproved names on screen
  [ ] Roadmap items clearly dated and caveated
  [ ] The executive summary slide passes the "30-second test" — decision in 30 seconds?

Presentation
  [ ] Run /presales:demo:storyboard if you're doing a live product demo in the session
  [ ] Know which slides will generate questions — have responses ready
  [ ] Know your Q&A hard stops: what can't you commit to in the room?
  [ ] Confirm the evaluation panel in advance — who's in the room?
  [ ] Time the run-through — does it fit the allocated slot?

Likely hard questions to prepare for:
  - "You said [Req X] is on your roadmap — when exactly, and what if it slips?"
  - "We're currently using [competitor] — why should we switch?"
  - "Your price is higher than [competitor] — justify the premium."
  - "Can we speak to a reference customer who has done this exact use case?"
  - "What happens if the implementation runs over timeline or budget?"
  
For objection coaching on any of these: run `tactical-empathy-coach` skill.
```

---

## Step 5 — Post-presentation follow-up

After the presentation session, within 2 hours:

1. Send a follow-up email using `field-comms-writer` — recap what resonated, confirm open questions you're picking up, lock in the next step
2. Log the presentation outcome in your CRM (e.g. Salesforce or HubSpot, if you use one) — attendees, sentiment, key questions raised
3. If questions were raised that need answers: set a 24-hour deadline to respond in writing
4. Update the coverage matrix with any requirements clarified or added during Q&A

---

## Reference library

Keep your best RFP presentation decks in the `decks/` subfolder of your own RFP library (resolved
per `${CLAUDE_PLUGIN_ROOT}/references/rfp-library/README.md`: a remembered path →
`<deals root>/_rfp-library/` → ask once). Never store them in the plugin folder; it is public and
overwritten on update. No library configured → build from the response document alone.

Naming convention: `decks/[account-or-industry]-[year]-[RFP-topic]-deck.md`

The present command will check this folder for structural patterns and approved content blocks before building the new deck. Good reference decks should include: slide titles, key content per slide, and what worked/didn't in the actual presentation.

---

Confidence-tag all claims in the final deck: 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown.
Run `confidence-tagger` skill on the deck content before submitting or presenting.
