---
name: docx-generator
version: "2.2"
last_updated: 2026-09-28
description: "Renders on-brand Word documents (.docx) with python-docx via uv, in the presales-handbook example brand or your own brand, in scratch mode or on your Word letterhead template. Use on \"create a Word document\", \"turn this into a Word doc\", \"branded Word version\", \"write a formal letter\". Siblings: /presales:deal:proposal, /presales:deal:exec-summary, /presales:handover:doc, /presales:value:roi-case (they own the content; this skill renders it), pptx-generator (slides). SKIP for PDFs, slide decks, or plain Markdown notes."
triggers:
  - "create a word document"
  - "turn this into a word doc"
  - "branded word version"
  - "write a formal letter"
  - "business letter"
---

# Word Document Generator

Renders professional, on-brand Word documents (.docx) with python-docx. Uses the **presales-handbook** example brand by default.

**Content from the command, rendering here.** Proposals, executive summaries, handovers and ROI cases get their words from `/presales:deal:proposal`, `/presales:deal:exec-summary`, `/presales:handover:doc` and `/presales:value:roi-case`. This skill lays that content out in Word. It does not re-write it.

**Where things live:**

| File | Holds |
|------|-------|
| `scripts/docx_helpers.py` | Every reusable recipe: brand loading, scratch/template setup, headings, body, bullets, branded tables, callouts, header logo, footer, colour-emoji fix, final save |
| `scripts/colour_emoji_fix.py` | The emoji run-splitter (called by `docx_helpers.finalize`) |
| `references/structures.md` | The nine document structures, their content owners and text-formatting rules |
| `brands/{brand}/tone-of-voice.md` | Tone rules per brand |
| `${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/{brand}/brand.json` | All brand tokens, logos and any Word template (the central registry; never look for brand.json inside this skill) |

---

## Step 0 — Brand, document type, audience

**Brand — default `presales-handbook`.** List the folders in `${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/`. If only `presales-handbook` exists, use it and say so in one line. If the user has added their own brand, recommend it for anything customer-facing and confirm: *"I'll use your {brand} brand — say if you want the presales-handbook example instead."* To add a brand, follow `${CLAUDE_PLUGIN_ROOT}/skills/brand/SKILL.md` → "Add your own company brand"; this skill picks it up automatically.

**Document type — ask if not obvious**, with your best guess: Proposal, Executive Summary, Letter, Discovery Questionnaire, OSD / Solution Design memo, Handover Document, ROI Business Case, Meeting Notes, Report / Analysis. Read `references/structures.md` for the chosen type.

**Content owner check.** If the type has an owner in `structures.md` and its output isn't in the conversation or deal folder, offer to run the owner first. Never fill a proposal, ROI case or handover from the skeleton.

**Audience — infer; ask only if unclear.** Unknown → external. If the document goes to a customer and only the example brand exists, say once: *"This uses the presales-handbook example brand. For customer documents you'll usually want your own company brand — the brand registry walks you through it (about ten minutes)."* Then proceed.

Read `brand.json` from the registry and this skill's `brands/{brand}/tone-of-voice.md`. If the brand has no tone file here, use the presales-handbook one and say so.

**Registry keys** (the helpers read these; don't invent others):

| Need | brand.json key |
|------|---------------|
| Accent / heading colour | `semantic.accent` (`semantic.accent_dark` if present) |
| Body text | `semantic.primary_text` |
| Table header bg / text | `semantic.table_header_bg` / `semantic.table_header_text` |
| Callout bg / text / border | `semantic.callout_bg` / `semantic.callout_text` / `semantic.callout_border` |
| Fonts | `fonts.heading`, `fonts.body`, `fonts.fallback` |
| Sizes | `font_sizes.body_pt`; Word headings `formats.docx.heading1_pt/2/3` (never `font_sizes.heading*_pt`, which are deck scale) |
| Page, margins, footer | `formats.docx.page_*_cm`, `margin_*_cm`, `footer_text` (scratch mode only) |
| Logo (PNG) | `assets.logo_dark_png` for light pages |
| Letterhead (optional) | `formats.docx.template` |

---

## Step 1 — Scratch mode or template mode

| Mode | When | What `dh.new_document()` does |
|------|------|------|
| **Scratch** (default) | No `formats.docx.template` key (true for presales-handbook) | New document, page size and margins from `formats.docx`, logo right-aligned in the header, footer text |
| **Template** | `formats.docx.template` points at your letterhead .docx | Opens it, clears the body (paragraphs and tables), keeps its geometry, header and footer. A missing template file stops the run; it never falls back to scratch silently |

State the mode in the handover message. In template mode, never "correct" the template's margins to registry values.

**Font check.** presales-handbook uses Montserrat (headings) and Open Sans (body), free from fonts.google.com. Check before generating: macOS `system_profiler SPFontsDataType 2>/dev/null | grep -qi 'Montserrat' && echo installed`; Windows PowerShell `Add-Type -AssemblyName System.Drawing; ((New-Object System.Drawing.Text.InstalledFontCollection).Families.Name | Where-Object { $_ -like 'Montserrat*' }).Count -gt 0`. If missing, tell the user they can install it free (no admin rights), or proceed and say in the handover: *"Montserrat / Open Sans aren't installed here — Word shows Arial until they are."* Check your own brand's fonts the same way.

---

## Step 2 — Plan the document

Output this plan before any code:
```
Document type:  [type]           Content owner: [command / skill / this skill]
Brand:          [brand]          Audience:      [external / internal]
Mode:           [scratch / template]
Account:        [company]
Sections:       [list, ~words each]  →  batches: [1: s1–s3] [2: s4–s6] …
Tables:         [names]
Tone notes:     [2–3 rules from tone-of-voice.md]
Output path:    output/{brand}/{doctype}-{account-slug}-{YYYYMMDD}.docx
```

Write to `./output/{brand}/` in the user's working directory (or their deal folder). Never inside the plugin folder or next to their source files.

---

## Step 3 — Generate in batches (max 3 sections per batch)

**uv preflight (once per session).** Run `command -v uv`. If it prints nothing, stop and say in one line: *"This skill needs uv — install it from https://docs.astral.sh/uv/getting-started/installation/ (one command, no admin rights), or I can give you the document as Markdown now to paste into Word."* If they choose the fallback, write the same structure as Markdown to `output/{brand}/`.

Every batch is one `uv run`, pinned, and loads the helpers the same way pptx-generator loads `lib/brand_helpers.py`. Inside a quoted heredoc the shell does **not** expand `${CLAUDE_PLUGIN_ROOT}`, so resolve it in Python:

```bash
uv run --with python-docx==1.1.2 python << 'EOF'
import importlib.util, os
_ROOT = os.environ.get("CLAUDE_PLUGIN_ROOT", "")
if not _ROOT:
    raise SystemExit("CLAUDE_PLUGIN_ROOT is not set — substitute the plugin root you read this SKILL.md from; never hardcode another machine's path.")
_spec = importlib.util.spec_from_file_location(
    "docx_helpers", os.path.join(_ROOT, "skills", "docx-generator", "scripts", "docx_helpers.py"))
dh = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(dh)

brand = dh.load_brand("presales-handbook", _ROOT)   # or the user's brand folder
cfg = dh.brand_cfg(brand)
OUT = "output/presales-handbook/proposal-acme-20260928.docx"

# ---- batch 1 only: create ----
doc, mode = dh.new_document(brand, _ROOT)
dh.add_heading(doc, "Commercial Proposal", 1, cfg)
dh.add_body(doc, "Prepared for: Acme Corp", cfg)
dh.add_page_break(doc)
dh.add_heading(doc, "Our Understanding of Your Challenge", 1, cfg)
dh.add_bullet(doc, "Month-end close takes 9 days 🟡", cfg)
dh.add_branded_table(doc, ["Outcome", "Metric", "Target"], [["Faster close", "Days", "5"]], cfg)
dh.add_callout(doc, "Next step", "Joint review on 14 October 2026", cfg)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
doc.save(OUT)
print("batch 1 saved:", OUT, "| mode:", mode)
EOF
```

**Multi-batch saving.** Each `uv run` is a fresh Python process: nothing survives between batches except the file on disk. So:

1. **Batch 1** creates the document with `dh.new_document(...)` and saves it to `OUT`.
2. **Every later batch** repeats the loader block (re-import the helpers, reload `brand` and `cfg`), then **reopens** the same file with `doc = dh.open_document(OUT)`, appends its sections and saves to `OUT` again. Never call `new_document` twice; that would start a blank file and lose earlier batches.
3. **The final batch** ends with `dh.finalize(doc, OUT, author="[Your name] — [Company]")` instead of `doc.save`. It runs the colour-emoji fix after all styling, sets author metadata, saves, and reopens the file to prove it isn't corrupt.

Helpers available: `add_heading(doc, text, level, cfg)`, `add_body(doc, text, cfg, bold=False)`, `add_bullet(doc, text, cfg, level=0)`, `add_numbered`, `add_branded_table(doc, headers, rows, cfg)`, `add_callout(doc, label, text, cfg)`, `add_page_break(doc)`, plus the lower-level `set_cell_bg`, `set_cell_border`, `add_logo_to_header`, `add_footer_text`. If a template lacks Heading or List styles, the helpers fall back to styled plain paragraphs instead of crashing.

**Colour emoji (🟢🟡🔴✅❌⚠).** Word tints emoji monochrome when a run's font is a text font or when a colour is inherited from `Normal`. `finalize` (via `scripts/colour_emoji_fix.py`) splits each status emoji into its own run with `Segoe UI Emoji` and `w:color="auto"`. Mac Word substitutes Apple Color Emoji automatically. To use other emoji, extend `EMOJI_CHARS` in that script. Never force `w:cs` / `w:eastAsia` to a text font.

---

## Step 4 — Validate each batch

- [ ] Heading colours match the brand (not default black/blue)
- [ ] Table header rows have the branded background and light text
- [ ] Body and heading fonts are the brand fonts; a missing font was **flagged to the user**, not silently accepted
- [ ] Scratch mode: logo in the header, footer text present, margins match `formats.docx`. Template mode: the template's geometry untouched
- [ ] Content matches the owning command's output (no invented numbers, terms or sections)
- [ ] Customer-facing document on the example brand → user told once that their own brand is recommended
- [ ] No lorem ipsum, "[PLACEHOLDER]" or unreplaced template text
- [ ] Final batch used `dh.finalize` and printed "Saved and reopened OK"
- [ ] Dates in DD Month YYYY; text formatting per `references/structures.md`

---

## Handoff

Tell the user the path, the mode (scratch or template file), any font caveat, and one next step:
confidence-tag check before it goes out (`confidence-tagger`), or a matching deck via `pptx-generator`.

**Technical reference:** `python-docx==1.1.2` only (the plugin-wide pin), always via `uv run --with python-docx==1.1.2 python`. A4 default from `formats.docx`. File naming `{doctype}-{account-slug}-{YYYYMMDD}.docx`, e.g. `proposal-acme-20260928.docx`.
