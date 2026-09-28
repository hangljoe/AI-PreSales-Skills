# Confidence Tagging Standard — this kit's standard

This is the confidence-tagging standard used across this skill kit. It is the kit's own convention, not a chapter of The PreSales Handbook.

Every claim in any customer-facing or internal presales output must carry a confidence tag.
This standard applies to: account briefs, discovery summaries, demo scripts, OSDs, battlecards, ROI cases, handover docs, and stakeholder maps.

---

## The Three Tags

| Tag | Meaning | When to use |
|-----|---------|-------------|
| 🟢 **Confirmed** | Sourced directly from a reliable source | Annual report, sustainability report, exec quote, signed contract, CRM field confirmed by the customer, internal data supplied by the user |
| 🟡 **Inferred** | Reasoned from context, industry norms, or indirect signals | Pattern matches industry norm + company profile; logical implication of confirmed data; consistent with multiple indirect signals |
| 🔴 **Unknown** | Not findable or not yet confirmed | Data gap; must be stated explicitly so it can be filled |

---

## Rules of thumb

- **Indirect signals are 🟡.** Job posts, press coverage, analyst estimates and LinkedIn profiles suggest; they do not confirm.
- **An estimate is 🟡 when its basis is stated** (e.g. "stated invoice volume × average error cost"). An estimate with no stated source or basis is 🔴 Unknown, not 🟡.
- **🟢 needs a citable source**: a document, a named person on a dated call, a confirmed CRM field, or internal data the user supplied.

---

## Source Attribution Format

After each tagged claim, cite the source inline:

```
🟢 Confirmed — Annual Report FY2024, p. 12
🟢 Confirmed — CRM (Salesforce, updated 2026-05-14)
🟢 Confirmed — Internal (AE call notes, June 2026)
🟡 Inferred — industry norm for mid-market SaaS; consistent with company's EU-heavy footprint
🔴 Unknown — named implementation partners not disclosed publicly
```

Never present inferred data as confirmed.
Never fabricate volumes, metrics, or percentages.
The gap list (🔴 items) is as valuable as the confirmed data — it drives the next conversation.

---

## Applying Tags in Practice

### Account brief
Tag every firmographic claim, every operational-footprint assertion, every signal.

```
Revenue: $4.2B (FY2025) 🟢 Confirmed — Annual Report FY2025, p. 4
Order volume: ~180k orders/year 🟡 Inferred — estimate from customer count × country footprint; not disclosed
Warehouse count: 🔴 Unknown — not disclosed and no basis to estimate
ERP: SAP S/4HANA 🟡 Inferred — LinkedIn job posts, 2025 (indirect signal; confirm on the call)
```

### Discovery summary
Tag each customer statement by how it was captured.

```
Pain: "Our finance team spends 3 days closing each month-end" 🟢 Confirmed — stated by the finance director on 2026-05-21 call
Impact: ~$2M annual exposure in billing errors 🟡 Inferred — based on stated invoice volume × average error cost; not customer-confirmed
```

### OSD / solution claims
Tag every capability assertion and every assumption.

```
The automation module will reduce close-cycle time by 50–60% 🟡 Inferred — based on vendor reference customer results; not yet validated against this customer's current state
Integration with SAP S/4HANA via standard API connector 🟢 Confirmed — vendor product documentation, March 2025
Go-live in Q3 2026 🔴 Unknown — depends on customer IT resource availability; not agreed
```

### ROI / business case
Label each value driver as hard (directly measurable) or soft (qualitative), and tag confidence.

```
Error-cost savings: $1.2M/year 🟡 Inferred — hard value; based on stated invoice volume × average error cost × 15% error rate reduction; customer has not confirmed error rate
Manual effort reduction: 4 FTE equivalent 🟡 Inferred — soft value; based on stated team size of 6 × 65% time on manual reconciliation; customer has not confirmed
```

---

## What NOT to do

- ❌ Present a 🟡 inferred figure as a definite fact in a customer slide
- ❌ Leave claims untagged in any draft sent for review
- ❌ Use round numbers without flagging they are estimates (e.g., "$1M in savings" → tag it)
- ❌ Omit the 🔴 gap list to make the output look more complete

---

## When the user supplies internal data mid-conversation

If the user provides confirmed internal data (e.g., "actually their finance team is 8 people, not 6"), treat it as 🟢 Confirmed with internal attribution and update the output immediately:
```
Finance team: 8 FTE 🟢 Confirmed — Internal (call with finance director, 2026-06-02)
```
Move the corresponding item from 🔴 Unknown to 🟢 Confirmed in the gap list.
