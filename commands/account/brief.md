---
description: One-page company brief for a target account — firmographics, operational footprint, signals
argument-hint: "[account name or domain]"
---

Build a one-page company brief for **$ARGUMENTS** to prepare for first engagement.

## What to produce

1. **Company overview** — industry, headquarters, revenue, employee count, key geographies. Source from public filings, the company website, press and LinkedIn; a paid data provider (e.g. ZoomInfo) if you have one. Free alternatives: annual reports, national company registers, free company profiles (e.g. Crunchbase).
2. **Operational footprint** — business model, key markets and countries, product or service lines, regulatory exposure relevant to your solution area. Source from public filings, news, sustainability reports.
3. **Technology signals** — known ERP, CRM, and systems in your solution area, including likely incumbents you would replace or integrate with (job posts, press releases, LinkedIn).
4. **Business signals** — recent news, M&A, regulatory events, leadership changes. Anything that could be a compelling event.
5. **Hypotheses** — based on the above, what are the 2-3 most likely pains this company has in the area your solution addresses? Ask the user for their product and solution area if it is not in the deal folder.

## Confidence tagging

Apply the confidence-tagging standard to every claim:
- 🟢 Confirmed — cited from annual report, filing, press release, or CRM
- 🟡 Inferred — reasoned from company profile, industry norms, indirect signals
- 🔴 Unknown — data gap; list explicitly

## Format

Output as a clean one-page brief, printable. End with:
- **Gap list**: 3-5 things we don't know that would materially change the hypotheses
- **Recommended first question**: the single best opening question for this account based on the brief

## Next step

Hand the brief to `/presales:discovery:prep` to turn it into a discovery call prep sheet
(hypotheses by persona and a question plan). If a deal folder exists, save the brief there first
so prep can read it.
