# Changelog

All notable changes to **AI PreSales Skills by The PreSales Handbook** are documented here.
Format: [Keep a Changelog](https://keepachangelog.com) | Versioning: [Semantic Versioning](https://semver.org)

---

## [2.2.0] — 2026-09-28

### Changed
- **Aligned with The PreSales Handbook V78.** Every chapter citation in the kit now uses the V78 numbering (9 TFQ, 10 ROI, 11 Demo, 12 Demo Automation; ORC 9.3; PoC check-ins 13.5). Claims the book doesn't make are labelled "(kit)".
- **FTQ is now TFQ** (Technical & Functional Qualification), as in V78: the `tfq` skill and `/presales:discovery:tfq` replace `ftq` and `/presales:discovery:ftq`.
- The full handbook text is no longer shipped. `references/PreSales_Handbook_Reference.md` is a condensed V78 reference (~12k words); the full book is at www.presales-handbook.com.
- Third-party material (Extreme Ownership, the Black Belt in Thinking modules, NCN and done-statement guides) is now short study notes in our own words, credited by name in LICENSE.
- Repository renamed to `hangljoe/AI-PreSales-Skills`.

### Removed
- `references/PreSales_Handbook.md` (full book) and `references/PreSales_Handbook_V77_Reference.md`.

---

## [2.1.0] — 2026-09-28

### Added
- `/presales:deal:close-plan`: picks and scripts one of the handbook's four closes (ch. 16.3) with a stage plan and fallback.
- `/presales:deal:poc-readout`: PoC check-ins, scorecard and findings readout (ch. 13.6–13.9).
- `/presales:account:journey`: places the buyer on the buying journey and maps your actions per stage (ch. 3).
- `/presales:account:nurture`: post-close check-ins, feedback, references and expansion (ch. 16.4).
- `do-nothing-buster`: diagnoses "no decision" risk against the nine status-quo causes (ch. 20.1).
- `learning-plan` and `/presales:brain:learn`: a personal learning plan on the 70/30 rule (ch. 2.6, 18).
- `presales-metrics`: a KPI scorecard for you or your team (ch. 23).
- `knowledge-capture`: turns wins into reusable assets in your own knowledge folder (ch. 19).
- One shared discovery call-summary schema (`references/call-summary-schema.md`) and a "Which verdict when?" table in STACK.md.
- A navy-wordmark logo for light backgrounds; the original colour logo is kept as `logo-colour.*`.

### Changed
- Post-call and pre-call tools consolidated: `/presales:discovery:prep` is the single pre-call entry point, `/presales:discovery:questions` is a question-card mode, golden hours builds on the call summary, and all follow-up emails go through `field-comms-writer`.
- `/presales:discovery:ftq`, `/presales:discovery:sales`, `/presales:deal:objection-drill` and `/presales:demo:storyboard` are thin wrappers around their skills.
- Handbook alignment: Picture Pitch as an image sequence and a 10-minute Tell-Show-Tell cap (ch. 10), objection types and Listen–Empathise–Probe–Address–Confirm (ch. 15), the ch. 12 ROI formula with hidden costs and payback, SPIN and the 25-minute first call (ch. 7), the FTQ/OSD order (ch. 9.1), the win/loss team session (ch. 17.2), and SWOT plus "do nothing" in the battlecard (ch. 20).
- `champion-health` is now the gate before champion enablement; `pricing-positioning` and `negotiation-prep` no longer duplicate each other.
- `docx-generator` shrank from ~580 to ~160 lines; recipes moved to `scripts/docx_helpers.py`.
- Demo storyboards use the PCV (Pain–Capability–Value) loop; "PIV" is no longer used.
- MEDDPICC is framed as the kit's extension of the handbook's BANT.

---

## [2.0.0] — 2026-09-28

First public, vendor-neutral release.

### Changed
- Renamed to **AI PreSales Skills by The PreSales Handbook** (plugin id stays `presales`, so every command is still `/presales:<phase>:<name>`).
- Marketplace renamed to `presales-handbook`. Install with `/plugin marketplace add hangljoe/PreSales`.
- All skills and commands rewritten to be vendor-neutral. They ask for your product, capabilities and differentiators instead of assuming a specific vendor's portfolio.
- Output skills (`brand`, `docx-generator`, `pptx-generator`) ship one example brand, `presales-handbook`, plus a short guide to adding your own company brand.
- CRM, calendar, mail and wiki connectors are optional everywhere.
- CI now validates the manifests and skill frontmatter instead of packaging a ZIP.

### Fixed (full-kit review)
- Every skill description now carries its trigger phrases, sibling skills and SKIP notes. Claude routes on the description alone, so the old `triggers:` lists never did anything.
- Scripts run from the plugin root with `python3` or pinned `uv run`, never from relative paths. Nothing writes next to your source files or inside the plugin folder any more.
- The transcript converter no longer writes a file before you confirm. CRM and wiki writes are confirm-gated everywhere.
- Word, PowerPoint, diagram and Markdown-extraction skills check for `uv` first and offer a fallback. PowerPoint title and section slides now use the navy brand canvas and the logo.
- The RFP answer library moved to `references/rfp-library/`, and confidential answers stay in your own folder.
- `second-brain` and `/presales:brain:*` work with Outlook or Google on any OS, and suggest the handbook's 70/30 deals-to-learning split.
- `/presales:guide` and `presales-coach` follow the handbook's deal flow. `presales-coach` gained a PoC health check.
- `confidence-tagger` produces an internal tagged copy and a clean customer copy. `linkedin-post` anonymises customer details by default.
- Leftover industry-specific examples, broken paths, contradictory rules and timing maths are cleaned up across the kit.

### Removed
- Company-specific skills: brand design systems, brand compliance review, corporate voice writing, marketing email campaigns, internal announcement emails, product go-to-market intelligence, product capability checker, account-intelligence pipeline, event playbooks, supply-chain mapping, internal issue logging and product-specific demo-data generators.
- The Salesforce and Atlassian MCP setup commands.
- Company brand guidelines, logos, culture and compliance references.
