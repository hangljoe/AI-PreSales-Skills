# FAQ and Troubleshooting

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `/presales:...` commands don't appear | Restart Claude Code after installing, then check `/plugin` → **Installed** to confirm *presales* is listed and enabled. |
| "Marketplace not found" | Check the spelling: `hangljoe/AI-PreSales-Skills`. On a company network, GitHub may be blocked — ask IT or use a personal network. |
| A skill doesn't switch on | Use one of the trigger phrases from [[Skills-Reference]], or run the matching `/presales:` command directly. See "Why doesn't a skill trigger?" below if it worked before and stopped. |
| Word or PowerPoint files aren't created | Install [uv](https://docs.astral.sh/uv/getting-started/installation/) and try again. |
| Output is too generic | Give Claude your product context. Fill in the *About us* block from `DEAL_TEMPLATE.md` (see [[Deal-Folder]]) and paste it in. |

## Which verdict when?

Four different tools each answer a different question, at a different point in the deal. Don't
mix them up:

| Scale | Tool | Question it answers | When |
|-------|------|---------------------|------|
| Pursue / Conditional / Qualify-out | `discovery-sales` | Is the deal commercially real and worth pursuing? | After a sales discovery conversation |
| X/40, commit-eligible at ≥28 | `/presales:discovery:qualify` | How complete is MEDDPICC; can the deal be commit-forecast? | Any time; feeds the Pursue verdict and the TFQ |
| Ready / A few gaps / Too early | `deal-prequal` (leaders) | Which deals in the pipeline are ready for SC time? | Portfolio sweep before TFQs — see [[Leader-Tools]] |
| Invest / Conditional / Pause | `tfq` | Should we commit significant SC time (demo prep, PoC, OSD)? | Provisional after discovery; re-run on the OSD |

## Glossary

| Acronym | Meaning | Where used |
|---------|---------|------------|
| **FTD** | Functional & Technical Discovery (handbook ch. 7) | `discovery-ftd` |
| **OSD** | Opportunity Scoping Document (handbook ch. 8) | `osd-scoper`, `osd-architect`, `/presales:handover:osd-draft` |
| **TFQ** | Technical & Functional Qualification: Invest / Conditional / Pause gate (ch. 9) | `tfq`, `/presales:discovery:tfq` |
| **ORC** | Opportunity Review Call: cross-department qualify in / out (ch. 9.3) | `/presales:discovery:orc` |
| **MAP** | Mutual Action Plan | `/presales:account:map` |
| **CBI** | Critical Business Issue | `critical-business-issue-finder` |
| **MEDDPICC** | Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify (Implicate) Pain, Champion, Competition | All discovery and deal commands |
| **TOC / BBiT** | Theory of Constraints / Black Belt in Thinking | `toc-bbit-expert`, `/presales:deal:strategic-think` |

## Why doesn't a skill trigger?

Skills switch on from plain language, but the loader that reads `SKILL.md` on claude.ai (and
Cowork) is stricter than Claude Code's own. Two things silently break a skill on those surfaces
while it keeps working in Claude Code, which is why it can look like it "disappeared":

- **The `description` field must be one single-line, double-quoted YAML string.** A folded (`>`)
  or literal (`|`) block scalar hits a known parser bug on claude.ai and the skill vanishes from
  chat.
- **The file must use LF line endings, not CRLF.** CRLF breaks frontmatter parsing on claude.ai.
  The repo's `.gitattributes` enforces LF on every tracked file, so this should only bite a file
  edited outside the normal workflow.

If a skill you added yourself doesn't trigger, check both of those first. If a shipped skill
doesn't trigger, use the matching `/presales:` command directly — every skill has one — or ask for
it by name; that always works even when the natural-language trigger doesn't.

## How do I update?

Run `/plugin update presales@presales-handbook` inside Claude Code, or use the `/plugin` menu's
**Installed** tab. Updates are pulled from GitHub, and `claude plugin update` keys off the version
number in `.claude-plugin/plugin.json` — the released number only ever increases, so an update
always moves you forward, never sideways or back. See [[Changelog]] for what changed in each
release.

## Is my customer data safe?

Nothing customer-specific lives in the plugin itself. Your deal folders, your RFP answer library
and your security trust library all live in your own workspace — a local or synced folder, your
team's SharePoint, Confluence or wherever you point them (see [[Customising]] and
[[Connected-Tools]]) — and the plugin's own `references/rfp-library/` and `references/trust-library/`
folders hold nothing but a README and a template; both are overwritten, not read from, on every
plugin update.

Content that does reach Claude from a deal folder, a transcript or a CRM record is still treated
as **untrusted input**: several commands (for example `/presales:leader:pipeline-review`) call
this out explicitly — if a file contains text that reads like an instruction rather than customer
content, Claude flags it to you and continues with the legitimate analysis only, rather than
following it. Nothing in the plugin sends your deal data anywhere on its own; it only reads what
you point it at, and CRM writes are always confirm-gated (see [[Connected-Tools]]).
