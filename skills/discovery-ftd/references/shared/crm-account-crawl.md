# CRM Account Crawl — discovery-ftd Step 2a

Used by `discovery-ftd` Step 2a when a CRM (e.g. Salesforce or HubSpot) is connected. Skip it when
a Prospect Brief was passed in by `/presales:discovery:prep` and already covers these layers.

Run a full account crawl. Extract all six layers below. This is the most data-dense
research step — do not stop after finding the primary opportunity.

## Account Profile
- Account name, industry, sub-industry, employee count, annual revenue
- Headquarters and operating regions
- Account type: Prospect / Customer / Partner
- If existing customer: Customer Since date, products currently live, CSM assigned
- Account owner (AE) and SC assigned
- Account health score or risk flag if captured

## Existing Revenue & Contracts (existing customers only)
- Total ARR / TCV with your company today
- Active contract lines: product, ARR, contract start/end, renewal date
- Any upcoming renewals or expansion triggers
- Products already live vs. contracted but not yet deployed

## Open Opportunities
For EVERY open opportunity on this account (not just the primary one):

| Field | Extract |
|-------|---------|
| Opportunity name | |
| Stage | |
| Close date | |
| Deal value (ACV / TCV) | |
| Products in scope | |
| AE and SC assigned | |
| Created date / days in stage | |
| MEDDPICC fields captured | |
| Last activity date and type | |
| Key notes or next steps | |

Summarise the open pipeline as: *"[N] open opportunities totalling $[X], ranging from [earliest stage] to [latest stage]."*
Flag any opportunity that appears to overlap or compete with the current engagement.

## Closed Won Opportunities (full history)
For each closed won opportunity:

| Field | Extract |
|-------|---------|
| Opportunity name | |
| Close date | |
| Deal value | |
| Products sold | |
| Implementation status | |

Summarise as: *"[N] prior wins totalling $[X]. Most recent: [name], closed [date], selling [products]."*
This is critical context — it tells you what they already use, what they liked, and how the relationship was established.

## Closed Lost Opportunities (full history)
For each closed lost opportunity:

| Field | Extract |
|-------|---------|
| Opportunity name | |
| Close date | |
| Deal value | |
| Loss reason | |
| Competitor that won | |

Summarise as: *"[N] prior losses. Most recent: [name], lost [date] to [competitor] — reason: [loss reason]."*
Loss history is competitive intelligence — it tells you what objections to pre-empt and whether trust has been damaged.

## Contacts
For EVERY contact associated with the account (not just the primary contact):

| Field | Extract |
|-------|---------|
| Full name | |
| Title | |
| Department | |
| Email | |
| Phone | |
| Role in deals (Economic Buyer / Champion / Technical / User / Procurement) | |
| Last activity with us (date, type) | |
| Relationship strength / notes | |

Group contacts by role type:
- **Economic Buyers / Sponsors** — titles like VP, SVP, CPO, CFO, COO, CIO
- **Champions / Process Owners** — titles like Director, Manager, Head of
- **Technical Evaluators** — titles like IT Manager, Architect, Systems Lead
- **Procurement / Legal** — titles like Procurement Manager, Legal Counsel
- **Unknown / To Investigate** — any contact where role is unclear

Flag any contacts who appear across multiple opportunities — these are relationship anchors.

## Activity History
- Last 3–5 interactions logged (date, type, summary)
- Any open tasks or follow-ups outstanding
- Notes from prior discovery or demo sessions
