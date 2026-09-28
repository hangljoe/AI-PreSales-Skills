---
name: confidence-tagger
version: "1.1"
last_updated: 2026-09-28
description: "Applies this kit's confidence-tagging standard to any presales output: every claim labelled 🟢 Confirmed (sourced), 🟡 Inferred (reasoned) or 🔴 Unknown (gap), plus a gap list and an optional clean customer copy. Final pass before material leaves the team. Use on \"tag this\", \"add confidence tags\", \"what do we actually know\", \"flag the assumptions\". Siblings: humanize (tone and AI tells, not facts), business-case-stress-tester (challenging ROI numbers). SKIP for writing new content."
triggers:
  - "tag this"
  - "add confidence tags"
  - "flag the assumptions"
  - "what do we actually know"
  - "confidence check"
  - "mark confidence levels"
  - "check what we know vs inferred"
---

# Confidence Tagger

Applies this kit's confidence-tagging standard to any presales output. (The standard is the kit's own convention; the PreSales Handbook does not define one.)
Reference spec: `${CLAUDE_PLUGIN_ROOT}/skills/confidence-tagger/references/confidence-tagging.md`

---

## Step 1 — Intake

Ask (or infer from context):
1. What type of output is this? (account brief / discovery summary / OSD / ROI case / battlecard / other)
2. What sources does the user have available? (CRM data, call transcript, public research, internal data)
3. Will any of it go to the customer? If yes, plan for both outputs in Step 5 (internal tagged copy + external clean copy).

---

## Step 2 — Scan for untagged claims

Read through the entire input and identify every claim that makes a factual assertion:
- Numeric figures (revenue, team size, volume, cost, percentage)
- System/technology assertions ("they use SAP S/4HANA")
- Timeline or commitment statements ("go-live Q3 2026")
- Customer pain statements ("they spend 3 days per product launch")
- Value/ROI assertions ("will reduce effort by 80%")
- Competitive statements ("competitor X cannot do Y")
- Market/industry statements ("industry norm is 15% error rate")

---

## Step 3 — Apply tags

For each claim:

**🟢 Confirmed** — apply when:
- Sourced from an annual report, press release, or official filing
- Customer stated it directly on a call (cite date + attendee)
- In the CRM and marked as confirmed
- User supplies internal data in this conversation

Format: `[claim] 🟢 Confirmed — [source, date]`

**🟡 Inferred** — apply when:
- Consistent with industry norms for this sector/company size
- Logical implication of a confirmed data point
- Based on indirect signals (job posts, press coverage, LinkedIn, analyst estimates)
- An estimate whose basis is stated (e.g. "stated volume × industry average cost")

Format: `[claim] 🟡 Inferred — [reasoning in one line]`

**🔴 Unknown** — apply when:
- Not publicly available
- Not in CRM
- Not supplied by the user
- Required for the output but missing
- An estimate or figure with no stated source or basis

Format: `[claim] 🔴 Unknown — [what specifically is missing and why it matters]`

---

## Step 4 — Build the gap list

At the end of the output, add a **Gap List** section:

```
## 🔴 Data Gaps (fill these before presenting to customer)

| Gap | Why it matters | How to fill |
|-----|---------------|-------------|
| [description] | [impact on deal/output] | [call, CRM, data provider (e.g. ZoomInfo), internal SME] |
```

Sort by impact: gaps that affect the core value case first.

---

## Step 5 — Return the tagged output

**Internal tagged copy (always).** Return the full document with inline tags added.
Do not rewrite or reorganise the content — only insert tags and the gap list.

If a section is entirely unverifiable (e.g., a speculative competitive claim), flag the whole section with a banner:

```
> ⚠️ This section is entirely inferred. Validate before using in customer materials.
```

**External clean copy (for anything customer-facing).** Offer it whenever the material will reach the customer; produce it when the user says yes or asked for it up front. Build it from the tagged copy:
- Strip every tag, source note, banner and the gap list.
- 🟢 claims stay as written.
- 🟡 claims stay only if the wording signals an estimate ("typically", "we estimate", "based on your stated volume"). Never let an inferred number read as a fact.
- 🔴 claims are removed, or rephrased as an open question for the customer ("To size this, we'd need your current monthly volume").
- Never add new claims in the clean copy.

End the clean copy with a short note to the user (not part of the customer text) listing what was removed or rephrased, so they can check nothing important went missing.

---

## Quality checklist

- [ ] Every numeric claim tagged
- [ ] Every technology/system assertion tagged
- [ ] Every customer pain statement tagged (stated vs assumed)
- [ ] Every value/ROI driver tagged (hard vs soft, and confidence level)
- [ ] Gap list present with at least one entry per 🔴 tag
- [ ] No 🟡 claim presented as 🟢 in the gap list
- [ ] No fabricated figures left untagged
- [ ] Job posts and other indirect signals tagged 🟡, never 🟢
- [ ] If customer-facing: clean copy offered, with no tags, no unverified 🔴 claims, and a removal note for the user
