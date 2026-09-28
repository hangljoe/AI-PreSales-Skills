---
description: Deal Pre-Qualification [leader] — readiness sweep across one or many deals before the TFQ (wrapper for the deal-prequal skill)
argument-hint: "[deal list, pipeline export, or 'all open']"
---

Run a **deal pre-qualification sweep** for: **$ARGUMENTS**

Invoke the **deal-prequal** skill with the deals above. The skill owns the readiness model: the
MEDDPICC foundation check per deal, the Ready / A few gaps / Too early verdict, the data-source
priority (CRM first, then pasted notes) and the leader summary. Don't restate or alter any rule
here. If this wrapper and the skill ever disagree, the skill wins.

This is a leader tool (handbook ch. 22): it decides where SC time goes before a TFQ is run. It
is not routed by `/presales:guide`; individual contributors use `/presales:discovery:tfq`.
