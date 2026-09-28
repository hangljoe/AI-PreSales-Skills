---
name: pptx-generator
version: "2.2"
last_updated: 2026-09-28
description: "Generates and edits on-brand PowerPoint decks (.pptx) with python-pptx via uv, in the presales-handbook example brand or your own brand, plus square LinkedIn carousels exported to PDF. Use on \"make a deck\", \"create a PowerPoint\", \"build a slide deck\", \"edit this PPTX\", \"create a carousel\". Siblings: /presales:rfp:present (RFP response deck content), demo-storyboard (demo flow before slides), linkedin-post (post text), docx-generator (Word documents). SKIP for Word documents, Excalidraw diagrams, or data charts on their own."
triggers:
  - "create a powerpoint"
  - "powerpoint deck"
  - "PPTX deck"
  - "deck creator"
  - "create slides"
  - "make a deck"
  - "generate presentation"
  - "build a slide deck"
  - "create a carousel"
  - "generate slides"
  - "make slides"
  - "build a presentation"
  - "create a deck"
  - "edit this PPTX"
---

# PowerPoint Deck Creator (PPTX)

Generate professional, on-brand presentation slides using python-pptx. Uses the **presales-handbook** example brand by default; to add your own company brand, see "Add Your Own Company Brand" below. Supports slide generation from deal notes, discovery outputs, and ROI data; LinkedIn carousels (square format, exported to PDF); and editing existing PPTX files.

**All skill resources are in `${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/`.** Glob starting from that path.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **Knowledge base** (e.g. Confluence, Notion) | Source decks to rebrand or extend, and a place to store the approved output slides |

No connections? Paste the content.

---

## CRITICAL: Batch Generation Rules

**Never generate more than 5 slides at once.** Stop and validate after each batch (Step 6); after all batches, combine into one file via `lib/combine_batches.py` and delete the part files (Step 7).

---

## PREREQUISITE: Brand Selection

**Default brand: `presales-handbook`** (navy `#112D4E`, yellow `#FACF39`, Montserrat / Open Sans, white canvas). List the folders in `${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/`. Only `presales-handbook` exists? Use it and say so in one line. User added their own brand folder? Recommend it and confirm: *"I'll use your {brand} brand — say if you want the presales-handbook example instead."*

Load from the **central brand registry**:
```
Read: ${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/{chosen-brand}/brand.json
Read: ${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/brands/{chosen-brand}/config.json
Read: ${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/brands/{chosen-brand}/tone-of-voice.md
```
No `config.json` or `tone-of-voice.md` for that brand yet? Use the presales-handbook ones and tell the user. Use `brand.json → formats.pptx` for slide-specific values (background, dimensions, footer text) and apply its tone-of-voice rules to all generated copy, not just colors.

---

## MANDATORY: Brand Helpers (`lib/brand_helpers.py`)

Every generation and rebrand run **must** import and use the shared helper module — skipping it reproduces three known bugs (off-brand theme, missing footer, silently dropped text). Load it once at the top of the `uv run python` block:

```python
import importlib.util, os
_ROOT = os.environ.get("CLAUDE_PLUGIN_ROOT", "")
if not _ROOT:
    raise SystemExit("CLAUDE_PLUGIN_ROOT is not set — substitute the plugin root you read this SKILL.md from; never hardcode another machine's path.")
_spec = importlib.util.spec_from_file_location(
    "brand_helpers",
    os.path.join(_ROOT, "skills", "pptx-generator", "lib", "brand_helpers.py"))
bh = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(bh)

# brand = the parsed skills/brand/brands/<chosen>/brand.json dict
CHOSEN_BRAND = "presales-handbook"   # default; or the user's own brand folder
brand = bh.load_brand(CHOSEN_BRAND, _ROOT)
```

**Three non-negotiable calls:**

| When | Call | Fixes |
|------|------|-------|
| Right after creating `prs`, before adding slides | `tok = bh.apply_brand_theme(prs, brand)` | #21 — bakes brand palette + fonts into the deck theme so PowerPoint's theme colour palette and font picker show brand tokens, not Office. Returns a resolved `{background, title_slide_bg, section_slide_bg, title_slide_text, section_slide_text, text, accent, accent_2, accent_dark, highlight, alt, link, heading_font, body_font, footer, name}` dict — reuse these values for per-shape colours too. |
| For **every** slide, when `tok["footer"]` is non-empty | `bh.add_footer(slide, prs, tok["footer"])` | #15 — brand footer (from `formats.pptx.footer_text`) on every slide. |
| On every variable-length text frame | `bh.fit_text_frame(tf)` | #16 — auto-sizes the box to the text (`SHAPE_TO_FIT_TEXT`) so content is never clipped. Use `mode="text_to_shape"` only for fixed regions. |

**Rebrand runs (recreating an existing deck) — additionally required (#16):**

```python
# 1. BEFORE rewriting slides — extract source text; do NOT rely on recall:
source_texts = bh.extract_deck_text(SOURCE_PPTX_PATH)   # {slide_no: [chunks]}
# 2. Build slides from source_texts (this is your ground truth for copy).
# 3. AFTER combining the final deck — validate nothing was dropped:
missing = bh.validate_text_coverage(source_texts, FINAL_PPTX_PATH)
# If `missing` is non-empty, FIX the affected slides and re-run before delivering.
```

`lib/combine_batches.py` (Step 7) re-applies `apply_brand_theme` to the **combined** deck automatically.

---

## Add Your Own Company Brand

The full walkthrough (colours, fonts, logos, deck settings, tone of voice) lives in one place: `${CLAUDE_PLUGIN_ROOT}/skills/brand/SKILL.md` → "Add your own company brand".
Never put a brand.json or logo files inside this skill's `brands/` folder; it holds only `config.json` (output settings) and `tone-of-voice.md`.

---

## Generating Slides

### Step 1: Brand Loading

Brand was already selected in the prerequisite step; load the three files listed there (`brand.json` — colors/fonts, central registry, never a local copy; `config.json` — output settings; `tone-of-voice.md` — copy rules) and apply the tone-of-voice guidance to every text element, not just titles.

### Step 2: Layout Discovery

**Read ALL layout frontmatters before selecting any layout** — each `.py` file in `cookbook/` has a `# /// layout` block with `purpose`, `best_for`, `avoid_when`, `max_*` limits, and `instructions`. Glob `${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/cookbook/*.py` and read the first 40 lines of every file to build a mental map before choosing.

The cookbook functions' default colour arguments are the presales-handbook palette. For any other brand, pass the values from `tok` (e.g. `bg=tok["background"], primary=tok["accent"]`) — never rely on the defaults for a non-default brand.

**Canvas per slide type** (all from `brand.json → formats.pptx` via `tok`):

| Slide type | Background | Text |
|------------|-----------|------|
| Title slide (`add_title_slide`) | `tok["title_slide_bg"]` (navy for presales-handbook) | `tok["title_slide_text"]` (white on navy) |
| Section divider (`add_section_slide`) | `tok["section_slide_bg"]` (navy for presales-handbook) | `tok["section_slide_text"]` |
| Every other slide | `tok["background"]` (white for presales-handbook) | `tok["text"]` / `tok["accent"]` |

### Step 3: Visual-First Layout Selection

**Default to visual layouts. Content-slide (title + bullets) is the last resort.** Ask in this order before reaching for content-slide: 3-5 equal items → multi-card-slide; 2-4 big numbers/metrics → stats-slide; comparing two things → two-column-slide; exactly 3 related items → multi-card-slide (3 cards); 1-3 words to emphasize → giant-focus-slide; a powerful quote → quote-slide; nothing else fits → now use content-slide.

**Hard limits:** content-slide **<25%** of total slides; visual layouts (cards, stats, columns, hero) **50%+**; never the same layout **3+ times consecutively**.

### Step 4: Slide Planning (ALWAYS DO THIS)

Create a slide plan table before generating a single line:
```markdown
| # | Layout | Title | Key Content | Notes |
|---|--------|-------|-------------|-------|
| 1 | title-slide | ... | ... | ... |
```

Checklist: no duplicate titles; logical flow; content-slide <25%; visual layouts 50%+; no 3+ consecutive same-layout slides.

### Step 5: Batch Generation

**Max 5 slides per batch.**

**uv preflight (once per session).** Run `command -v uv`. If it prints nothing, stop and tell the user in one line: *"This skill needs uv — install it from https://docs.astral.sh/uv/getting-started/installation/ (one command, no admin rights), or I can give you the slide plan and copy as Markdown now."* Never fail silently; if they choose the fallback, deliver the Step 4 slide plan plus the full slide copy as a Markdown file in `output/{brand}/`. Execute via UV:

```bash
uv run --with python-pptx==1.0.2 python << 'EOF'
# [Slide generation code with brand values]
EOF
```

**CRITICAL: Every slide MUST have its background explicitly set** — the canvas for its slide type (table in Step 2):
```python
slide = prs.slides.add_slide(prs.slide_layouts[6])
slide.background.fill.solid()
slide.background.fill.fore_color.rgb = hex_to_rgb(tok["background"])  # content slides
# Title / section slides: the cookbook's add_title_slide / add_section_slide set
# tok["title_slide_bg"] / tok["section_slide_bg"] when you pass them.
```

**Logo placement** — always from the registry (`brand.json → assets`), never a copy inside this skill:
```python
on_dark = bh.is_dark(tok["title_slide_bg"])
title_logo = bh.logo_path(brand, on_dark=on_dark)        # logo-white on navy, logo-dark on light
add_title_slide(prs, title, subtitle, bg=tok["title_slide_bg"],
                primary=tok["title_slide_text"], logo=title_logo)
add_section_slide(prs, "Section name", tok=tok,
                  logo=bh.logo_path(brand, on_dark=bh.is_dark(tok["section_slide_bg"])))
# Optional, content slides: a small dark logo bottom-left, clear of the centred footer text
# bh.add_logo(slide, prs, bh.logo_path(brand, on_dark=False), width=Inches(1.2), position="bottom-left", margin=Inches(0.3))
```
If `logo_path` returns `None` (the brand has no PNG for that canvas), skip the logo and say so in the handover message.

**Also per slide (see MANDATORY Brand Helpers above):** `bh.add_footer(slide, prs, tok["footer"])` when set; `bh.fit_text_frame(tf)` on every variable-length text frame.

### Step 6: Validate Each Batch

After every batch, check: every slide's background matches its slide type (`tok["background"]` for content, `tok["title_slide_bg"]` / `tok["section_slide_bg"]` for title/section — an unset background is the most common bug); the title slide carries the registry logo for its canvas; no duplicate titles; no text overflow (`bh.fit_text_frame` — #16); colors match brand; no trailing punctuation on titles/bullets; and brands with `footer_text` carry the footer on every slide (#15). Fix before continuing.

### Step 7: Combine Batches

After all batches pass validation, merge the part files with `lib/combine_batches.py` (carries each slide's background forward, re-bakes the brand theme — #21 — and deletes the part files). Load it like `brand_helpers.py` (see MANDATORY section above):

```python
_spec = importlib.util.spec_from_file_location("combine_batches", os.path.join(_ROOT, "skills", "pptx-generator", "lib", "combine_batches.py"))
cb = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(cb)
final_path = cb.combine(sorted(output_dir.glob("{name}-part*.pptx")), brand, output_dir / "{name}-final.pptx")
```

---

## LinkedIn Carousels

Square 1:1 format, 5-10 slides, hook → body points → CTA. Dimensions: `prs.slide_width = Inches(7.5)`; `prs.slide_height = Inches(7.5)`.

**Export to PDF** — LibreOffice's binary is `soffice` on most installs (macOS, Windows) and sometimes only `libreoffice` on Linux:
```bash
if command -v soffice >/dev/null 2>&1; then OFFICE=soffice
elif command -v libreoffice >/dev/null 2>&1; then OFFICE=libreoffice
else OFFICE=""; fi
if [ -n "$OFFICE" ]; then
  "$OFFICE" --headless --convert-to pdf --outdir output/{brand} output/{brand}/carousel.pptx
else
  echo "LibreOffice not found — export the PDF manually."
fi
```
No LibreOffice → deliver the `.pptx` and tell the user: *"Open carousel.pptx in PowerPoint (File → Export → PDF) or Keynote (File → Export To → PDF), then upload the PDF to LinkedIn as a document post."*

---

## Text Formatting Rules

| Element | Rule |
|---------|------|
| Titles | No trailing periods or commas |
| Bullet points | No trailing periods (unless full sentences) |
| Stats/Numbers | Clean format — "50%" not "50%." |
| Labels | Short, no punctuation |

---

## Technical Reference

**Slide dimensions (16:9):** Width 13.333", Height 7.5". **Always use** `prs.slide_layouts[6]` (blank layout) and `python-pptx==1.0.2`.

**Common imports:**
```python
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Inches, Pt
```

**Brand color mapping** (registry brand.json paths — the `tok` dict returned by `bh.apply_brand_theme(prs, brand)` already contains all of these resolved; prefer it over manual lookups):

| Layout Placeholder | brand.json Path |
|--------------------|-----------------|
| `BRAND_BG` | `formats.pptx.background` (NOT `colors.background` — a brand may use a tinted deck canvas that lives only here) |
| Title slide canvas | `formats.pptx.title_slide_bg` → `tok["title_slide_bg"]` (falls back to `background`) |
| Section slide canvas | `formats.pptx.section_slide_bg` → `tok["section_slide_bg"]` (falls back to the title canvas) |
| Logos | `assets.logo_white_png` (dark canvas), `assets.logo_wordmark_png` / `assets.logo_dark_png` (light) → `bh.logo_path(brand, on_dark)` |
| `BRAND_TEXT` / `BRAND_ACCENT` | `semantic.primary_text` / `semantic.accent` |
| `BRAND_HEADING_FONT` / `BRAND_BODY_FONT` | `fonts.heading` / `fonts.body` |

All color values in brand.json are hex **WITHOUT** the `#` prefix.

---

## Quality checklist

- [ ] Brand theme applied via `bh.apply_brand_theme` — backgrounds, fonts, and logos match the resolved `tok` dict
- [ ] Batch limits respected — max 5 slides per batch, combined via `lib/combine_batches.py`, part files deleted after
- [ ] Every slide has a title; no duplicate titles across the deck
- [ ] No vendor or competitor names in the copy — vendor-neutral throughout
- [ ] Final `.pptx` opens cleanly and passes Step 6 validation (no clipped text, no unset backgrounds)

---

## Handoff

- `docx-generator` — the Word-document twin of this deck (proposal, report version of the same content)
- `/presales:demo:storyboard` — build the Tell-Show-Tell flow first if this deck is a demo
