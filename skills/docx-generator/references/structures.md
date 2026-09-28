# Document structures — docx-generator

Nine document types. Each entry says **who owns the content** and **how to render it**.

**Content from the command, rendering here.** Where a command or skill owns a document's content,
run it first (or use its finished output from the deal folder) and render its sections in its own order.
Do not re-invent the content from the skeleton below. The skeletons for owned types only show the
Word layout: cover, page breaks, which sections become tables or callouts.

| Type | Content owner | Default audience |
|------|---------------|------------------|
| Proposal | `/presales:deal:proposal` | External |
| Executive Summary | `/presales:deal:exec-summary` | External |
| Handover Document | `/presales:handover:doc` | Internal |
| ROI Business Case | `/presales:value:roi-case` | External |
| Discovery Questionnaire | `discovery-ftd` skill (Output B) | External |
| OSD / Solution Design | `osd-architect` skill renders its own Word file; use this entry only for a light solution-design memo | External |
| Meeting Notes | `meeting-notes-structurer` skill | Internal |
| Letter | this skill | External |
| Report / Analysis | this skill | Internal |

Unknown audience → treat as external.

---

## Proposal — content from `/presales:deal:proposal`

Render the command's output in its order: cover letter, then Sections 1–6.

1. Cover page — logo, title, "Prepared for: [Company]", "Prepared by: [Name]", date → page break
2. Cover letter — one page, body text → page break
3. Sections 1–6 as H1 headings, in the command's order
4. Tables as the command defines them (outcomes, investment, implementation milestones) → `add_branded_table`
5. The command's "specific next step" → `add_callout(doc, "Next step", …)`

If the command hasn't been run, stop and offer to run it. Never write commercial terms from the skeleton.

## Executive Summary — content from `/presales:deal:exec-summary`

One page, no cover.

1. Logo header (scratch mode) + H1 title with account name and date line
2. Situation, Critical Business Issue, Proposed Solution → H2 + body
3. Value Case and Deal Status → `add_branded_table` with the command's columns
4. Recommended Next Step → `add_callout`

## Handover Document — content from `/presales:handover:doc`

1. Cover page (deal name, "PreSales → Professional Services handover", date, internal marker) → page break
2. Every section of the handover package as H1, in the command's order
3. Stakeholders, technical environment, success criteria, open items/risks, artefacts → `add_branded_table`
4. "What was NOT sold" → `add_callout(doc, "Out of scope", …)` so it can't be missed

## ROI Business Case — content from `/presales:value:roi-case`

1. Cover page → page break
2. Context → H1 + body
3. One H2 per value driver with the command's formula lines as body text
4. Cost of investment and the multi-year view → `add_branded_table` (Year 0 | Year 1 | Year 2 | Year 3)
5. Emotional ROI, caveats, next step → H2 + bullets; the payback/ROI headline → `add_callout`

Numbers come only from the command's output. Never recompute or round them differently.

## Discovery Questionnaire — content from `discovery-ftd` (Output B)

1. Cover — prospect, contact, prepared by, date, call objective → page break
2. Purpose statement — one paragraph
3. One H2 per domain, numbered questions under each (`add_numbered`), e.g. current state, pains and impact,
   requirements and success criteria, technical environment, decision process and timeline
4. Action items → table: Action | Owner | Due date

## OSD / Solution Design memo

The full Opportunity Scoping Document (handbook ch. 8) is `osd-architect`'s job. It renders its own branded file.
Use this skeleton only for a short solution memo:

1. Cover page → page break
2. Executive overview (half a page)
3. Business requirements → numbered list
4. Proposed solution and integration → table: System | Integration type | Data flow | Complexity
5. Assumptions and dependencies → numbered list
6. Risks → table: Risk | Likelihood | Impact | Mitigation

## Meeting Notes — content from `meeting-notes-structurer`

1. Meeting details — date, objective; attendees table: Name | Company | Role
2. Key findings → bullets
3. MEDDPICC update → table: Element | Previous | Updated | Source
4. Action items → table: Action | Owner | Due date
5. Next steps → 3 bullets

## Letter — owned here

1. Logo header and footer (scratch mode) or the brand letterhead (template mode)
2. Recipient block (name, company, address)
3. Date (DD Month YYYY)
4. RE: subject line in bold (`add_body(..., bold=True)`)
5. Body paragraphs (2–4)
6. Closing and signature block (name, title, company, email, phone)

## Report / Analysis — owned here

1. Cover page → page break
2. Executive summary
3. Background
4. Findings — numbered H2 sections, each with body plus a supporting table or bullets
5. Recommendations → numbered list
6. Appendix (if needed)

---

## Text formatting rules (all types)

| Element | Rule |
|---------|------|
| H1 / H2 headings | Title Case |
| H3 and below | Sentence case |
| Body copy | Sentence case, no trailing period on bullets |
| Table headers | ALL CAPS (the helper upper-cases them) or Title Case — never sentence case |
| Dates | DD Month YYYY — e.g. 09 June 2026 |
| Numbers | Numerals for all quantities — "3 weeks", "14 systems" |
| Company names | Exact spelling as the company writes it — yours and the customer's |
