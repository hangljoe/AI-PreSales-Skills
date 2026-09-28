---
name: pptx-generator
version: "2.1"
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

Generate professional, on-brand presentation slides using python-pptx. Uses the **presales-handbook** example brand by default; to add your own company brand, see "Add Your Own Company Brand" below. Supports:
- **Slide Generation** — Create presentations from deal notes, discovery outputs, ROI data
- **Carousel Generation** — LinkedIn carousels (square format, exports to PDF)
- **Slide Editing** — Modify existing PPTX files

**All skill resources are in `${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/`.** Glob starting from that path.

---

## CRITICAL: Batch Generation Rules

**NEVER generate more than 5 slides at once.**

| Rule | Details |
|------|---------|
| Max slides per batch | **5** |
| After each batch | **STOP and validate output** |
| After ALL batches | **COMBINE into single file and DELETE part files** |

---

## PREREQUISITE: Brand Selection

**Default brand: `presales-handbook`** (The PreSales Handbook — navy `#112D4E`, yellow `#FACF39`, Montserrat / Open Sans, white canvas).

List the folders in `${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/`. If only `presales-handbook` exists, use it and say so in one line. If the user has added their own brand folder, recommend it and confirm: *"I'll use your {brand} brand — say if you want the presales-handbook example instead."*

Then load from the **central brand registry**:
```
Read: ${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/{chosen-brand}/brand.json
Read: ${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/brands/{chosen-brand}/config.json
Read: ${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/brands/{chosen-brand}/tone-of-voice.md
```

If the chosen brand has no `config.json` or `tone-of-voice.md` in this skill yet, use the presales-handbook ones and tell the user.

Use `brand.json → formats.pptx` for slide-specific values (background, dimensions, footer text).
Apply the brand's tone-of-voice rules to all generated copy, not just colors.

---

## MANDATORY: Brand Helpers (`lib/brand_helpers.py`)

Every generation and rebrand run **must** import and use the shared helper module.
These are not optional polish — skipping them reproduces three known bugs (off-brand
theme, missing footer, silently dropped text). Load it once at the top of the
`uv run python` block:

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

`apply_brand_theme` must be re-applied to the **combined** deck too — see Step 7.

---

## Add Your Own Company Brand

The full walkthrough (colours, fonts, logos, deck settings, tone of voice) lives in one place: `${CLAUDE_PLUGIN_ROOT}/skills/brand/SKILL.md` → "Add your own company brand".
Never put a brand.json or logo files inside this skill's `brands/` folder; it holds only `config.json` (output settings) and `tone-of-voice.md`.

---

## Generating Slides

### Step 1: Brand Loading

Brand was already selected in the prerequisite step. Load all three files:
1. `${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/{chosen-brand}/brand.json` — colors and fonts (central registry — never a local copy)
2. `${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/brands/{chosen-brand}/config.json` — output settings
3. `${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/brands/{chosen-brand}/tone-of-voice.md` — copy rules and vocabulary

Apply tone-of-voice guidance to every text element, not just slide titles.

### Step 2: Layout Discovery

**Read ALL layout frontmatters before selecting any layout.** Each `.py` file in `cookbook/` has a `# /// layout` frontmatter block with `purpose`, `best_for`, `avoid_when`, `max_*` limits, and `instructions`.

```
Glob: ${CLAUDE_PLUGIN_ROOT}/skills/pptx-generator/cookbook/*.py
```

Read the first 40 lines of every layout file to build a mental map before choosing.

The cookbook functions' default colour arguments are the presales-handbook palette. For any other brand, pass the values from `tok` (e.g. `bg=tok["background"], primary=tok["accent"]`) — never rely on the defaults for a non-default brand.

**Canvas per slide type** (all from `brand.json → formats.pptx` via `tok`):

| Slide type | Background | Text |
|------------|-----------|------|
| Title slide (`add_title_slide`) | `tok["title_slide_bg"]` (navy for presales-handbook) | `tok["title_slide_text"]` (white on navy) |
| Section divider (`add_section_slide`) | `tok["section_slide_bg"]` (navy for presales-handbook) | `tok["section_slide_text"]` |
| Every other slide | `tok["background"]` (white for presales-handbook) | `tok["text"]` / `tok["accent"]` |

### Step 3: Visual-First Layout Selection

**DEFAULT TO VISUAL LAYOUTS. Content-slide (title + bullets) is the LAST RESORT.**

**Decision tree — ask IN ORDER before using content-slide:**

```
Do I have 3-5 equal items?          → multi-card-slide
Do I have 2-4 big numbers/metrics?  → stats-slide
Am I comparing two things?          → two-column-slide
Do I have exactly 3 related items?  → multi-card-slide (3 cards)
Do I have 1-3 words to emphasize?   → giant-focus-slide
Do I have a powerful quote?         → quote-slide
Is content-slide the ONLY option?   → NOW use content-slide
```

**Hard limits:**
- Content-slide should be **<25% of total slides**
- Visual layouts (cards, stats, columns, hero) should be **50%+**
- Never use the same layout **3+ times consecutively**

### Step 4: Slide Planning (ALWAYS DO THIS)

Create a slide plan table before generating a single line:

```markdown
| # | Layout | Title | Key Content | Notes |
|---|--------|-------|-------------|-------|
| 1 | title-slide | ... | ... | ... |
```

Checklist:
- [ ] No duplicate titles
- [ ] Logical flow
- [ ] Content-slide <25%
- [ ] Visual layouts 50%+
- [ ] No 3+ consecutive same-layout slides

### Step 5: Batch Generation

**Max 5 slides per batch.**

**uv preflight (once per session).** Run `command -v uv`. If it prints nothing, stop and tell the user in one line: *"This skill needs uv — install it from https://docs.astral.sh/uv/getting-started/installation/ (one command, no admin rights), or I can give you the slide plan and copy as Markdown now."* Never fail silently; if they choose the fallback, deliver the Step 4 slide plan plus the full slide copy as a Markdown file in `output/{brand}/`.

Execute via UV:

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

**Also per slide (see MANDATORY Brand Helpers above):**
- `bh.add_footer(slide, prs, tok["footer"])` when `tok["footer"]` is set
- `bh.fit_text_frame(tf)` on every variable-length text frame

### Step 6: Validate Each Batch

After every batch, check:
- Every slide's background matches its slide type: `tok["background"]` for content slides, `tok["title_slide_bg"]` / `tok["section_slide_bg"]` for title and section slides. An unset background (PowerPoint's default) is the most common bug.
- Title slide carries the registry logo for its canvas (white logo on navy)
- No duplicate titles
- No text overflow (use `bh.fit_text_frame` — #16)
- Colors match brand
- No trailing punctuation on titles/bullets
- Brands with a `footer_text`: every slide carries the footer (#15)

Fix before continuing.

### Step 7: Combine Batches

After all batches pass validation:

```python
from pptx import Presentation
from pptx.dml.color import RGBColor
from pathlib import Path

def hex_to_rgb(hex_color):
    h = hex_color.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))

from io import BytesIO
from pptx.enum.shapes import MSO_SHAPE_TYPE

BRAND_BG = tok["background"]  # e.g., "FFFFFF" for presales-handbook

output_dir = Path("output/{brand-name}")
part_files = sorted(output_dir.glob("{name}-part*.pptx"))
combined = Presentation(part_files[0])

for part_file in part_files[1:]:
    part_prs = Presentation(part_file)
    for slide in part_prs.slides:
        blank_layout = combined.slide_layouts[6]
        new_slide = combined.slides.add_slide(blank_layout)
        # CRITICAL: carry the source slide's own background (navy title/section
        # slides stay navy); fall back to the content canvas.
        new_slide.background.fill.solid()
        try:
            new_slide.background.fill.fore_color.rgb = slide.background.fill.fore_color.rgb
        except (AttributeError, TypeError):
            new_slide.background.fill.fore_color.rgb = hex_to_rgb(BRAND_BG)
        for shape in slide.shapes:
            if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
                # Pictures (logos) reference an image part — re-add, don't copy XML
                new_slide.shapes.add_picture(BytesIO(shape.image.blob), shape.left,
                                             shape.top, shape.width, shape.height)
            else:
                new_slide.shapes._spTree.insert_element_before(shape.element, 'p:extLst')

# #21 — the combined deck is built from part_files[0]'s master; re-bake the theme
# so the FINAL file carries the brand palette + fonts (not just the part files).
bh.apply_brand_theme(combined, brand)

final_path = output_dir / "{name}-final.pptx"
combined.save(final_path)
for part_file in part_files:
    part_file.unlink()

# #16 — for rebrands, confirm no source text was silently dropped:
# missing = bh.validate_text_coverage(source_texts, str(final_path))
# if missing: fix the affected slides and regenerate before delivering.
```

---

## LinkedIn Carousels

Square 1:1 format. 5-10 slides. Structure: hook → body points → CTA.

**Dimensions:**
```python
prs.slide_width = Inches(7.5)
prs.slide_height = Inches(7.5)
```

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

**Slide dimensions (16:9):** Width 13.333", Height 7.5"

**Always use:** `prs.slide_layouts[6]` (blank layout), `python-pptx==1.0.2`

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
| `BRAND_TEXT` | `semantic.primary_text` |
| `BRAND_ACCENT` | `semantic.accent` |
| `BRAND_HEADING_FONT` | `fonts.heading` |
| `BRAND_BODY_FONT` | `fonts.body` |

All color values in brand.json are hex **WITHOUT** the `#` prefix.
