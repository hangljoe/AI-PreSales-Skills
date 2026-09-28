# The PreSales Handbook — Tone of Voice

> Example brand voice, calibrated on *The PreSales Handbook* by Dr. Johannes Hangl
> (`${CLAUDE_PLUGIN_ROOT}/references/PreSales_Handbook_Reference.md`; full book at www.presales-handbook.com).
> Replace this file with your own company's voice when you add your own brand.

## Brand personality

Practical, honest, plain-spoken, customer-first. The voice of an experienced Solution Consultant talking to a peer or a buyer: it knows the craft, respects the listener's time, and never oversells. The motto sets the order of work — **Discover, Qualify Hard, Tell the Story, Listen and Stay Honest.**

- **Discover** — start from the customer's world, not the product. Their pain, their words, their numbers.
- **Qualify hard** — say clearly what fits and what doesn't. A candid "not a fit" beats a lost quarter.
- **Tell the story** — the customer is the protagonist; the product is the tool that gets them to a better outcome.
- **Listen** — mirror what the customer said before adding anything new.
- **Stay honest** — no inflated claims, no hidden gaps. Credibility is the asset that closes deals.

## Writing rules

- **Title case** for slide titles and headings; **sentence case** for body copy and bullets
- Lead with the customer's outcome, then the capability that delivers it, then the proof
- Short sentences, active verbs, plain words — "Cut onboarding from 6 weeks to 2", not "enables accelerated onboarding"
- Quantify wherever you honestly can, and label estimates as estimates
- Name limitations and assumptions openly — trust is part of the message
- No clichés: avoid "end-to-end", "best-in-class", "world-class", "seamless", "synergy", "leverage" (as a verb), "game-changer"

## Vocabulary

| Use | Avoid |
|-----|-------|
| Your team, your process, your numbers | "our revolutionary platform" |
| Outcome, result, value | "features", "bells and whistles" |
| Fit / not a fit | "we can do anything" |
| We don't do X today — here is the workaround | vague hedging, silence on gaps |
| Next step with an owner and a date | "let's touch base" |

## Slide design notes

- Canvas: `#FFFFFF` (white); subtle panels `#F7F5F4`; borders `#E7E4E2`
- Primary: `#112D4E` (navy) — titles, key numbers, table headers, title and section slides (white text on navy)
- Highlight: `#FACF39` (yellow) — sparing accents: a key number on navy, a quote mark, one highlighted word. Never yellow text on white.
- Text: `#322F2F` body, `#4A4A4A` secondary
- Fonts: Montserrat (headings), Open Sans (body). Free Google Fonts; PowerPoint substitutes Arial if they are not installed.
- Logo (central registry, `${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/presales-handbook/assets/`): `logo-dark.png` / `logo-dark-wordmark.png` on white, `logo-white.png` on navy. Resolve paths with `bh.logo_path(brand, on_dark)`; this skill keeps no logo copies.
- Footer: "The PreSales Handbook — www.presales-handbook.com" (from `brand.json → formats.pptx.footer_text`)

## Content tone for presales decks

- Title slide: the customer's goal as a statement, not a product name
- Problem slides: the customer's language — mirror the pain they described in discovery
- Solution slides: pain → capability → value, one idea per slide (Tell-Show-Tell)
- Proof slides: real numbers with their source; say which ones are estimates
- Close slide: one specific next step with an owner and a date

## Deck design discipline

- **Whitespace is intentional.** Minimum 0.5" margins; 0.3–0.5" between content blocks.
- **No decorative bars, stripes, or stock photos** — they read as filler.
- **Max two typefaces.** Left-align body copy; centre only titles and callouts.
- **Footer on content slides:** small logo or footer text, slide number bottom-right.
- **One dominant colour** (navy) carries most of the visual weight; yellow stays under 10%. Text contrast ≥ WCAG AA (4.5:1).
- **Metrics displayed large** (36–48pt) with supporting text beneath (12–14pt).
