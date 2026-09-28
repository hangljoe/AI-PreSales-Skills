---
description: Opportunity Scoping Document [OSD] — draft the handbook-structured OSD from discovery notes and PoC results
argument-hint: "[account name]"
---

Generate an Opportunity Scoping Document (OSD) for: **$ARGUMENTS**

Run the **osd-architect** skill. Paste the discovery summary and PoC results if available, and name the
product(s) in scope. If discovery hasn't been turned into a scope yet, run the **osd-scoper** skill first.

The skill produces a full OSD following chapter 8.2 of *The PreSales Handbook* (Sections 1–10), plus one kit addition (Section 11):
1. Executive Summary
2. Company Profile (incl. the client map)
3. Goals, Challenges & Major Pain Points
4. Desired Outcomes & Vision (success criteria, value proposition, To-Be flows)
5. Supply Chain / Business Flow Map & As-Is Processes
6. IT Overview & Architecture
7. Project Prioritisation & Business Releases
8. Assumptions & Gaps
9. Modules & Detailed Scoping (built from your product scope)
10. Meeting Notes
11. Transition to Delivery (key players, order form / SOW terms, services strategy) — **a kit addition**:
    the handbook's 8.2 structure ends at Meeting Notes; this section bridges the OSD into
    `/presales:handover:doc`

Every claim is tagged 🟢 Confirmed / 🟡 Inferred / 🔴 Unknown, and every assumption is listed explicitly.

If a discovery summary is not available, the skill will ask for it before generating.
