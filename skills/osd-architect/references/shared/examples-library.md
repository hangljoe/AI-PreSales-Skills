# OSD Example Library (shared appendix)

Illustrative examples for Sections 4.3 (To-Be), 5 (Business Flow Map & As-Is) and 6 (IT Overview).
**All examples are illustrative** — use the format and content that fit the scope and nature of your
opportunity. Copy and adjust; never paste an example verbatim into a customer-facing OSD without
tailoring it. Replace "Our Platform" with your own product and module names.

---

## Supply Chain / Business Flow Map Examples

### Physical Supply Chain Map (e.g. a manufacturer)
- Brand owner + contract manufacturing
- 300–500 suppliers across multiple regions
- Regions: Americas, EMEA, APAC — list the countries in scope
- Flow: Supplier → Plant → Distribution Center → Retailer / End Customer
- Information flow alongside: forecast, purchase order, shipment notice, invoice

### Multi-Tier Map
- Tier-2 → Tier-1 suppliers → final assembly plant → distribution → customer
- Data elements per hop: forecast quantity, capacity, inventory, work in progress
- Documents per hop: order, confirmation, shipment notice, invoice

### Channel Map
- Brand company → end customer
- Channel tiers: Direct (X% revenue), Tier 1 wholesalers, Tier 2 distributors, Tier 3 resellers,
  retailers; services / other (X% revenue)

### Service / Value-Chain Map (e.g. a SaaS or financial-services business)
- Lead → opportunity → contract → onboarding → service delivery → renewal
- Or: request → triage → resolution → billing → reporting
- Mark hand-offs between teams and systems — that's where the delays and re-keying live

---

## IT Overview Examples

### High-Level System Architecture (hub-and-spoke)
- Our Platform: the in-scope modules, grouped by business capability
- Integration via: the customer's middleware (e.g. MuleSoft) or our standard API / connector layer
- External parties: suppliers, partners, customers, service providers, data providers
- Key flows: master data, orders / requests, status updates, documents, invoices, reporting

### To-Be IT Overview
- UI layer + API / integration layer; middleware (TBD 🔴)
- Core modules of Our Platform in scope, each with its main function
- ERP / CRM integration: [system]. Connected systems: [partner systems, data providers]

### Interface List Template

| Interface ID | Interface Name | Description | Business Process | Direction (from Our Platform) | Owner | Source / Target System | Integration Technology / Protocol | Timing | Frequency |
|--------------|----------------|-------------|------------------|-------------------------------|-------|------------------------|-----------------------------------|--------|-----------|
| 0 (Example) | Customer master | Customer account data | Order-to-cash | Inbound | [Name] | [Name] ERP | REST API | Near-real-time | Event-driven |

---

## Process Flow & Data Choreography Examples

### Use Case Template

**Use Case [N]: [Title / Short Description]**

| Field | Content |
|-------|---------|
| Scenario Description | |
| Demonstrated Features | |
| Challenges | |
| Our Value Proposition | |

> Copy this template for every use case addressed in the opportunity. Rename as needed.

### As-Is Use Case Example (order exception handling)
**Scenario:** a customer order fails a credit or stock check; the exception is handled by email.
**Process assumptions:** orders enter the ERP from three channels; exceptions are exported nightly
to a spreadsheet; a shared mailbox coordinates sales, finance, and operations.
**Key challenges:**
- No single view of the exception status; customers chase sales for updates.
- Re-keying between the spreadsheet and the ERP causes errors and delays.
- Team workload prevents root-cause analysis; the same exceptions repeat every week.
**Open clarifications:** exception volume per week? Cost per exception? Which approvals are
mandatory? Who owns the customer communication?

### As-Is Data Choreography Example
**Parties:** customer ERP, CRM, shared mailbox, finance team, operations team, external partner.
**Key flows:** order intake · credit / stock check · exception export · manual triage by email ·
correction in ERP · customer notification · reporting.

### To-Be Data Choreography Example (numbered flows 1–18)
1. Partner Master Data (initial load)
2. Partner Inbound
3. Partner Outbound
4. Partner Alerting
5. Partner Decision
6. Partner Outbound
7. Product Master Data (initial load)
8. Product Inbound
9. Product Outbound
10. Product Alerting
11. Product Decision
12. Product Outbound
13. Transaction Inbound
14. Transaction Outbound
15. Transaction Alerting
16. Transaction Decision
17. Transaction Outbound
18. Reporting

**Integration options:** API / B2B interface · Web UI · spreadsheet upload/download · file transfer (optional for ERP).
