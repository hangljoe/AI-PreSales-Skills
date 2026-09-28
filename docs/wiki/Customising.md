# Customising

Five things you can set up once so the plugin talks like your company and reads from your own
folders. None of it is required to start using the skills.

## Add your company brand

Word and PowerPoint output uses The PreSales Handbook brand as a working example (navy `#112D4E`,
yellow `#FACF39`). To use your own:

1. Copy `skills/brand/brands/presales-handbook/` to `skills/brand/brands/<your-company>/`,
   lowercase with hyphens.
2. Edit `brand.json` inside the copy: set `name` to the folder name, then `display_name` and
   `website`; replace the hex values in `colors` and `semantic` with your palette; set
   `fonts.heading` and `fonts.body`; update `footer_text` under `formats.pptx` and `formats.docx`;
   set `formats.pptx.title_slide_bg` and `section_slide_bg` to the canvas colour you want on title
   and section slides. Keep every key in the file — only change values.
3. Replace the logo files in `assets/` with your own, keeping the same file names
   (`logo-dark.*` for light backgrounds, `logo-white.*` for dark ones), and update the `assets`
   paths in `brand.json` to point at the new folder. Logos live only here — output skills never
   keep their own copies.
4. Optional: if your company has an official `.docx` letterhead, put it under
   `brands/{your-brand}/templates/` and point `formats.docx.template` at it. Without one,
   documents are built in scratch mode from your colours and logo.
5. Optional: copy `skills/pptx-generator/brands/presales-handbook/` and
   `skills/docx-generator/brands/presales-handbook/` to folders named after your brand, and rewrite
   `tone-of-voice.md` in your company's voice. These folders hold output settings only — never put
   a `brand.json` or logos there, or the two copies will drift apart.
6. Try it: ask for "a two-slide test deck in the {your-brand} brand" and "a one-page test letter in
   the {your-brand} brand," then check colours, fonts and logo.

Word, PowerPoint and diagram output need [uv](https://docs.astral.sh/uv/getting-started/installation/)
installed; Claude tells you if it's missing. Everything else works without it.

## Set up your RFP answer library

`/presales:rfp:analyze`, `/presales:rfp:respond` and `/presales:rfp:present` all check this
library before drafting anything, and reuse approved language instead of writing from scratch.
Keep it in your own workspace, never inside the plugin (see [[Connected-Tools]] for why). Claude
resolves the folder in this order: a path you've already given it, then `<deals root>/_rfp-library/`
if a deals root is configured, then it asks you once and offers to remember your answer. Each file
is one approved response or reusable section, named so Claude can find it, for example
`Acme_2025_Platform-RFP.md` or `section_implementation-methodology.md`; the file format (frontmatter
plus an Executive Summary, one section per RFP section, key proof points, and lessons learned) is
in `references/rfp-library/README.md`. Start with company-overview, per-product capabilities,
implementation methodology and security-and-compliance sections — the four every RFP asks for.

## Set up your security trust library

`/presales:rfp:security` checks this library the same way before answering any control, and flags
anything not covered as unknown rather than guessing. It resolves the same way as the RFP
library — a remembered path, then `<deals root>/_trust-library/`, then it asks. One file per
approved control, grouped by domain, e.g. `answers/access-control/AC-02-account-provisioning.md`;
the format (frontmatter with owner and expiry dates, an Answer, Evidence pointers, and Notes) is
in `references/trust-library/README.md`. Start with certifications, encryption, authentication,
incident-response SLA and backup/recovery — the controls most questionnaires ask for first. Keep
`approved_on` and `expires` current; an expired control should be re-reviewed before reuse.

## Set the deals-root config

Several skills (`discovery-transformer`, `osd-scoper`, `osd-architect`, and both libraries above)
read one config file to find your local deal folders: `~/.claude/discovery-transformer.json`
(`%USERPROFILE%\.claude\discovery-transformer.json` on Windows), holding `{"deals_root": "<path>"}`.
If it doesn't exist yet, Claude asks for your deals library path the first time it needs it and
offers to save it there — you don't have to create the file by hand. Point `deals_root` at a plain
local folder or a synced cloud-drive folder (OneDrive, Google Drive, Dropbox). See
[[Deal-Folder]] for the folder structure itself.

## Add a skill

Say "write a skill," or follow this shape directly:

1. Create `skills/<name>/SKILL.md` with frontmatter (`name`, `version`, `last_updated`, a
   single-line double-quoted `description`, `triggers`), then the skill body: Connected Tools,
   intake, the main workflow steps, the output, and a quality checklist. Optionally add
   `skills/<name>/references/` for supporting material.
2. Optionally add a matching command at `commands/<phase>/<name>.md`, which becomes
   `/presales:<phase>:<name>`.
3. List the new skill and/or command in `STACK.md`.
4. Run `python3 scripts/desc_budget.py` and `claude plugin validate .`.
5. Test locally: `/plugin marketplace add <path-to-repo>`, then
   `/plugin install presales@presales-handbook`, then trigger the skill in a new session.
6. Merge to `main` — that's the release.

Two rules keep a skill visible on every surface, not just Claude Code: `description` must be one
single-line double-quoted YAML string, never a block scalar, and the file must use LF line
endings, not CRLF (`.gitattributes` enforces this). See [[FAQ-and-Troubleshooting]] for what
happens when a skill silently disappears because one of these slipped.

## Choosing a model

Claude Code doesn't pick a model by task difficulty, and a skill can't switch it for you. Use
**Opus** (`/model opus`) for deep reasoning work — BBiT thinking, the OSD, ROI stress-testing,
negotiation prep. Use `/fast` or a smaller model for mechanical work — follow-up emails, note
structuring, confidence tagging. None of the skills pin a model themselves, so this is your call
each session.
