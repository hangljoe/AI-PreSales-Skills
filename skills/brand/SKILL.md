---
name: brand
version: "2.1"
last_updated: 2026-09-28
description: "Shared brand registry (colour tokens, fonts, logo paths, PPTX/DOCX/HTML/Excalidraw settings) read by pptx-generator, docx-generator, osd-architect and other branded output. Ships the presales-handbook example brand (navy #112D4E, yellow #FACF39) and holds the one walkthrough for adding your own company brand. Use on \"add my company brand\", \"set up our brand colours\", \"swap in our logo\", \"use our fonts in the decks\". Siblings: pptx-generator, docx-generator (they render using this registry). SKIP for generating a deck or document itself."
user-invocable: false
---

# Brand Registry

Shared asset library for all output skills that generate branded content.

**Read this before generating any slide, document, diagram, or HTML artefact.**

---

## Which skills use this

| Skill | What it reads |
|-------|--------------|
| `pptx-generator` | `brand.json` → `colors`, `semantic`, `fonts`, `formats.pptx` (incl. `title_slide_bg` / `section_slide_bg`), `assets` (logos) |
| `docx-generator` | `brand.json` → `semantic`, `fonts`, `font_sizes`, `formats.docx` |
| Any HTML output | `brand.json` → `formats.html` |

**Skills that do NOT use this registry:**
- `diagram` — uses its own semantic colour grammar (`references/color-palette.md`). Brand colours would destroy the semantic encoding. `formats.excalidraw` is only for a plain branded sketch; its `font_family: 2` (Helvetica) matches the diagram skill's default text font.

---

## Brand selection

**Default brand: `presales-handbook`.** Use it unless the user names another brand or a folder for their own company exists under `brands/`.

If more than one brand folder exists, list them and recommend the user's own company brand (not the example) for customer-facing output. Then load:
```
Read: ${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/{chosen-brand}/brand.json
```

---

## Directory structure

```
${CLAUDE_PLUGIN_ROOT}/skills/brand/
├── SKILL.md                         ← this file
└── brands/
    └── presales-handbook/           ← example brand (default)
        ├── brand.json               ← colours, fonts, sizes, format configs
        └── assets/
            ├── logo-dark.svg        ← yellow icon + navy name, for light backgrounds (default)
            ├── logo-dark.png        ← yellow icon only, PNG (for Word/PowerPoint headers)
            ├── logo-dark-wordmark.png ← yellow icon + navy name, PNG
            ├── logo-colour.svg      ← original all-colour logo (yellow name; web and dark-grey use)
            ├── logo-colour-wordmark.png ← same, PNG
            ├── logo-white.svg       ← white-on-transparent logo for dark backgrounds
            └── logo-white.png       ← same, PNG
```

---

## Add your own company brand

This is the only copy of the walkthrough — `pptx-generator` and `docx-generator` point here. It takes about ten minutes and needs no code.

1. **Copy the example folder.** Duplicate `brands/presales-handbook/` and rename the copy to your company, lowercase with hyphens, e.g. `brands/acme-software/`.
2. **Edit `brand.json`.** Change `name` to the folder name, then `display_name` and `website`. Replace the hex values in `colors` and `semantic` with your palette (six characters, no `#`). Set `fonts.heading` and `fonts.body`. Update `footer_text` under `formats.pptx` and `formats.docx`, and set `formats.pptx.title_slide_bg` / `section_slide_bg` to the canvas you want for title and section slides (usually your darkest brand colour). Keep every key — only change values.
3. **Swap the logos.** Replace the files in `assets/` with your own, keeping the file names: `logo-dark.*` for white backgrounds, `logo-white.*` for dark backgrounds (decks put it on navy title slides). Word and PowerPoint need the PNG versions. Then fix the `assets` paths in `brand.json` so they point at your new folder. Logos live only here; output skills never keep their own copies.
4. **Optional: your Word letterhead.** If your company has an official .docx template, put it in `brands/{your-brand}/templates/` and add `"template": "${CLAUDE_PLUGIN_ROOT}/skills/brand/brands/{your-brand}/templates/{file}.docx"` under `formats.docx`. Without it, documents are built in scratch mode from your colours and logo.
5. **Add a tone of voice and deck settings.** Copy `skills/pptx-generator/brands/presales-handbook/` and `skills/docx-generator/brands/presales-handbook/` to folders with your brand name. Rewrite `tone-of-voice.md` in your company's voice. In the deck folder's `config.json`, set `output.directory` to `output/{your-brand}`; it holds output settings only, no colours or fonts. Never put a `brand.json` or logos in those folders; duplicated token files drift.
6. **Try it.** Ask for "a two-slide test deck in the {your-brand} brand" and "a one-page test letter in the {your-brand} brand", then check colours, fonts, and logo.

The key names are the contract the output skills read, so renaming or removing keys breaks generation. Adding extra keys is fine.

---

## Key brand facts (presales-handbook)

Source: `brands/presales-handbook/brand.json`

- **Name:** The PreSales Handbook — www.presales-handbook.com
- **Primary / accent:** `#112D4E` (navy) — headings, table headers, title slides, emphasis
- **Highlight:** `#FACF39` (yellow) — sparing highlights, key numbers on navy, quote marks. Never yellow text on white (poor contrast).
- **Logo gradient:** `#FBB040` → `#F9ED32` — used in the logo only, not as a background
- **Text:** `#322F2F` body, `#4A4A4A` secondary, `#7E8890` muted
- **Canvas:** `#FFFFFF`; subtle surfaces `#F7F5F4`; borders `#E7E4E2`
- **Callouts:** `#F7F5F4` background with a navy border
- **Fonts:** Montserrat (headings), Open Sans (body), Arial fallback. Both are free Google Fonts; Office substitutes Arial if they are not installed.
- **Word documents:** scratch mode (no template file ships with this brand)

---

## Updating the registry

1. Update `brands/{brand}/brand.json` — change values, never restructure keys.
2. Add new brands as sibling folders (see "Add your own company brand").

Do not store format-specific values (slide dimensions, page margins) in output skills — they belong in `brand.json` under `formats.{output-type}`.
