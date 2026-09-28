---
description: Sales Discovery [MEDDPICC] — run the commercial qualification conversation and decide whether the deal is real (wrapper for the discovery-sales skill)
argument-hint: "[account or opportunity name]"
---

Run **Sales Discovery** — the commercial qualification conversation — for: **$ARGUMENTS**

Invoke the **discovery-sales** skill with the account or opportunity above. The skill owns the whole
procedure: intake, the MEDDPICC question plan, the hand-off to `/presales:discovery:qualify` for the
/40 score, and the Pursue / Conditional / Qualify-out brief. Don't restate or alter its steps here.

For the functional and technical deep-dive, use `/presales:discovery:prep` (which runs `discovery-ftd`).
