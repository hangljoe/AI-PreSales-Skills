# RFP Reference Library — how to set up your own

This folder in the plugin holds **only this README and the file template below**. Your approved
RFP answers do **not** belong here: the plugin is public, and this folder is overwritten on every
plugin update. Keep the real library in **your own workspace**, where the three RFP commands
read it automatically:

- `/presales:rfp:analyze` — searches it for prior bids against this account or similar requirements
- `/presales:rfp:respond` — checks it before drafting any response section
- `/presales:rfp:present` — pulls proof points, prior win narratives and presentation decks

When your library is populated, Claude checks it **before generating anything from scratch** and
reuses proven, approved language instead of generic output.

---

## Where your library lives

The commands resolve the library folder in this order:

1. A library path you gave Claude earlier (kept in Claude's memory).
2. `<deals root>/_rfp-library/`, if your deals root is configured
   (`deals_root` in `~/.claude/discovery-transformer.json`; on Windows
   `%USERPROFILE%\.claude\discovery-transformer.json`).
3. Otherwise Claude asks you once for a folder, for example a team SharePoint, OneDrive, Google
   Drive or local folder, and offers to remember it.

Never place the library inside the plugin folder or a public repo. If no library is configured
the commands still work; they just draft from your capability list and the RFP text.

A shared team knowledge base (e.g. Confluence or SharePoint, if connected) can serve the same
purpose. The commands check it as well.

---

## What to add

Each file should be a single approved response — either a complete RFP response or a reusable
section. Name files clearly so Claude can identify them:

```
<AccountName>_<Year>_<RFP-topic>.md      e.g. Acme_2025_Platform-RFP.md
section_<topic>.md                        e.g. section_implementation-methodology.md
section_<product>_capabilities.md         e.g. section_ProductName-capabilities.md
decks/<account-or-industry>-<year>-<RFP-topic>-deck.md   e.g. decks/acme-2025-platform-deck.md
```

---

## File format

Use this structure so the RFP commands can parse and use each file efficiently:

```markdown
---
account: [Account name or "Generic"]
year: [YYYY]
rfp_topic: [Brief description — e.g. "Finance Automation Platform"]
outcome: [Won / Lost / No-bid]
products: [Your products / modules — whichever were in scope]
---

# [Account] RFP Response — [Year]

## Executive Summary
[The approved executive summary text]

## Section: [Section name from the original RFP]
[The approved response text for this section]

## Section: [Next section]
[Approved response text]

## Key proof points used
- [Proof point 1]
- [Proof point 2]

## What worked / lessons learned
[Optional — notes for the team on what resonated with the evaluators]
```

---

## Confidentiality note

These files contain approved commercial content. Treat them as **Internal — Confidential**:
- Store them only in your own or your team's workspace, never in the plugin folder or a public repo
- Do not include specific pricing figures (use ranges or "provided separately")
- Anonymize customer names in proof points unless the customer is a public reference
- Do not include content marked "Not for disclosure" from the original RFP

---

## Getting started

No responses yet? Create your library folder and start with these high-value files:

1. **`section_company-overview.md`** — approved boilerplate about your company
2. **`section_<product>-capabilities.md`** — standard capability description for each of your products
3. **`section_implementation-methodology.md`** — standard implementation approach
4. **`section_security-and-compliance.md`** — standard security, data protection, SLA text

Ask your RFP / bid management team for approved versions of these sections.
