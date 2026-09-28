"""
brand_helpers.py — shared PPTX generation helpers for the pptx-generator skill.

This module is NOT a slide layout. It provides the cross-cutting fixes that every
branded deck needs, so they can never be silently skipped:

  apply_brand_theme(prs, brand)   #21 — bake brand palette + fonts into the deck THEME
                                        (slide master), so PowerPoint's theme colour
                                        palette and font picker present brand tokens,
                                        not Office defaults.
  add_footer(slide, prs, ...)     #15 — add a footer text box to a slide
                                        (text from brand.json formats.pptx.footer_text).
  extract_deck_text(path)         #16 — pull all text out of a source deck BEFORE
                                        rebranding, so nothing relies on recall.
  validate_text_coverage(...)     #16 — after generation, warn on any source text
                                        that never made it into the output.
  fit_text_frame(tf, ...)         #16 — set auto_size + word_wrap on variable-length
                                        text frames so content is never clipped.
  logo_path(brand, on_dark)       — registry logo for the slide canvas:
                                        logo_white_png on dark, logo_dark_png on light.
  add_logo(slide, prs, path, ...) — place that logo (title/section slides; optional
                                        small logo on content slides).

Usage (inside the skill's `uv run python` block):

    import importlib.util, os
    _root = os.environ["CLAUDE_PLUGIN_ROOT"]  # or an absolute path to the plugin
    _spec = importlib.util.spec_from_file_location(
        "brand_helpers",
        os.path.join(_root, "skills", "pptx-generator", "lib", "brand_helpers.py"),
    )
    bh = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(bh)

    prs = Presentation(); prs.slide_width = Inches(13.333); prs.slide_height = Inches(7.5)
    brand = bh.load_brand()                   # default brand: presales-handbook
    tok = bh.apply_brand_theme(prs, brand)    # brand = loaded brand.json dict
    ...
    if tok["footer"]:
        bh.add_footer(slide, prs, tok["footer"])
    ...
    bh.validate_text_coverage(source_texts, prs)   # for rebrands

Depends only on python-pptx (>=0.6.21, tested on 1.0.2) and its bundled lxml.
"""

from lxml import etree
from pptx.dml.color import RGBColor
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_AUTO_SIZE
from pptx.oxml import parse_xml
from pptx.oxml.ns import qn
from pptx.opc.constants import RELATIONSHIP_TYPE as RT
import json
import os


DEFAULT_BRAND = "presales-handbook"


def load_brand(name=None, plugin_root=None):
    """
    Load skills/brand/brands/<name>/brand.json from the central registry.
    name defaults to DEFAULT_BRAND ("presales-handbook"); plugin_root defaults
    to $CLAUDE_PLUGIN_ROOT, else the plugin folder this file lives in.
    """
    name = name or DEFAULT_BRAND
    root = plugin_root or os.environ.get("CLAUDE_PLUGIN_ROOT") or \
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    path = os.path.join(root, "skills", "brand", "brands", name, "brand.json")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


# ---------------------------------------------------------------------------
# small utilities
# ---------------------------------------------------------------------------

def hex_to_rgb(h):
    """'#112D4E' or '112D4E' -> RGBColor."""
    h = h.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def _hex(h):
    """Normalise to 6-char uppercase hex without a leading '#'."""
    return h.lstrip("#").upper()


def is_dark(h):
    """True when a hex colour is dark enough to need light text and the white logo."""
    h = _hex(h)
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return (0.299 * r + 0.587 * g + 0.114 * b) < 140


# ---------------------------------------------------------------------------
# brand-token resolution — central registry brand.json
# ---------------------------------------------------------------------------
# Source of truth: skills/brand/brands/<b>/brand.json (the pptx-local copies
# were removed — issue #31). resolve_brand() reads formats.pptx first for the
# deck background, then semantic.*, then colors.* as fallback, so it also
# tolerates older/simpler shapes.

def resolve_brand(brand):
    """
    Return a normalised dict of the tokens the helpers need:
        {background, title_slide_bg, section_slide_bg, title_slide_text,
         section_slide_text, text, accent, accent_2, accent_dark, highlight, alt,
         link, heading_font, body_font, footer, name}
    `brand` is a parsed brand.json dict (either shape) or a merged dict.
    Missing values fall back to sensible neutrals so the theme is never broken.
    """
    colors = brand.get("colors", {}) or {}
    semantic = brand.get("semantic", {}) or {}
    fonts = brand.get("fonts", {}) or {}
    name = (brand.get("name") or DEFAULT_BRAND).lower()

    def pick(*keys, default=None):
        for src in (semantic, colors):
            for k in keys:
                if src.get(k):
                    return src[k]
        return default

    # Deck canvas: formats.pptx.background is authoritative (a brand may use a
    # tinted deck canvas while colors.background stays the white doc canvas).
    fmt_pptx = (brand.get("formats", {}) or {}).get("pptx", {}) or {}
    background = fmt_pptx.get("background") or pick("background", default="FFFFFF")
    # Title and section slides may use their own (usually dark) canvas.
    title_bg = fmt_pptx.get("title_slide_bg") or background
    section_bg = fmt_pptx.get("section_slide_bg") or title_bg
    text = pick("primary_text", "text", "text_strong", default="322F2F")
    accent = pick("accent", "primary", "cta", default="112D4E")
    highlight = pick("highlight", default=accent)
    accent_2 = pick("accent_secondary", "highlight", "accent_dark",
                    "accent_hover", "primary_hover", default=accent)
    accent_dark = pick("accent_dark", "primary_active", "hero_bg",
                       default=accent)
    alt = pick("background_alt", "background_surface", "background_subtle",
               "canvas", default="E7E4E2")
    link = pick("link", "accent", default=accent)

    heading_font = fonts.get("heading") or fonts.get("fallback") or "Arial"
    body_font = fonts.get("body") or heading_font

    def on(bg):
        # Text on a title/section canvas: white on dark, the accent on light.
        return "FFFFFF" if is_dark(bg) else _hex(accent)

    return {
        "background": _hex(background),
        "title_slide_bg": _hex(title_bg),
        "section_slide_bg": _hex(section_bg),
        "title_slide_text": on(title_bg),
        "section_slide_text": on(section_bg),
        "text": _hex(text),
        "accent": _hex(accent),
        "accent_2": _hex(accent_2),
        "accent_dark": _hex(accent_dark),
        "highlight": _hex(highlight),
        "alt": _hex(alt),
        "link": _hex(link),
        "heading_font": heading_font,
        "body_font": body_font,
        "footer": fmt_pptx.get("footer_text") or "",
        "name": name,
    }


# ---------------------------------------------------------------------------
# #21 — bake the brand palette + fonts into the deck THEME
# ---------------------------------------------------------------------------

def _theme_parts(prs):
    """
    Yield (theme_part, <a:theme> element) for every slide master.

    Theme is stored as a generic blob-backed Part, so we parse the blob into an
    lxml element; the caller edits it and calls _write_theme() to persist.
    """
    for master in prs.slide_masters:
        try:
            theme_part = master.part.part_related_by(RT.THEME)
        except KeyError:
            continue
        yield theme_part, parse_xml(theme_part.blob)


def _write_theme(theme_part, element):
    """Serialise an edited <a:theme> element back into its part's blob."""
    theme_part._blob = etree.tostring(
        element, xml_declaration=True, encoding="UTF-8", standalone=True
    )


def _set_scheme_color(clr_scheme, tag, hexval):
    """Set one <a:clrScheme> slot (e.g. 'accent1') to a solid srgb colour."""
    slot = clr_scheme.find(qn("a:" + tag))
    if slot is None:
        return
    for child in list(slot):
        slot.remove(child)
    srgb = slot.makeelement(qn("a:srgbClr"), {"val": _hex(hexval)})
    slot.append(srgb)


def apply_brand_theme(prs, brand):
    """
    #21 fix. Rewrite each slide master's theme so PowerPoint associates the deck
    with the brand: theme colour palette + font picker present brand tokens.

    - dk1/dk2  -> brand text / dark accent
    - lt1/lt2  -> brand background / alt surface
    - accent1..6 -> brand accents (accent, accent_2, accent_dark, link, text, alt)
    - hlink/folHlink -> brand link colour
    - major/minor latin fonts -> brand heading / body fonts

    Call ONCE, right after creating the Presentation and before adding slides.
    Returns the resolved token dict (handy for reusing the same values per shape).
    """
    b = resolve_brand(brand)

    for theme_part, theme in _theme_parts(prs):
        elements = theme.find(qn("a:themeElements"))
        if elements is None:
            continue

        clr = elements.find(qn("a:clrScheme"))
        if clr is not None:
            _set_scheme_color(clr, "dk1", b["text"])
            _set_scheme_color(clr, "lt1", b["background"])
            _set_scheme_color(clr, "dk2", b["accent_dark"])
            _set_scheme_color(clr, "lt2", b["alt"])
            _set_scheme_color(clr, "accent1", b["accent"])
            _set_scheme_color(clr, "accent2", b["accent_2"])
            _set_scheme_color(clr, "accent3", b["accent_dark"])
            _set_scheme_color(clr, "accent4", b["link"])
            _set_scheme_color(clr, "accent5", b["text"])
            _set_scheme_color(clr, "accent6", b["alt"])
            _set_scheme_color(clr, "hlink", b["link"])
            _set_scheme_color(clr, "folHlink", b["link"])

        fonts = elements.find(qn("a:fontScheme"))
        if fonts is not None:
            for role, font in (("a:majorFont", b["heading_font"]),
                               ("a:minorFont", b["body_font"])):
                grp = fonts.find(qn(role))
                if grp is None:
                    continue
                latin = grp.find(qn("a:latin"))
                if latin is not None:
                    latin.set("typeface", font)

        _write_theme(theme_part, theme)

    return b


# ---------------------------------------------------------------------------
# #15 — footer on every slide
# ---------------------------------------------------------------------------

def add_footer(slide, prs, text, color="7E8890", font="Arial", size_pt=9):
    """
    #15 fix. Add a centred footer text box at the bottom of a slide.
    Pass text=tok["footer"] (brand.json formats.pptx.footer_text) and call it
    for EVERY slide when the brand defines a footer.
    """
    W, H = prs.slide_width, prs.slide_height
    box = slide.shapes.add_textbox(Inches(0.4), H - Pt(22),
                                   W - Inches(0.8), Pt(16))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size_pt)
    run.font.name = font
    run.font.color.rgb = hex_to_rgb(color)
    return box


# ---------------------------------------------------------------------------
# logos — always from the central registry (brand.json → assets)
# ---------------------------------------------------------------------------

def logo_path(brand, on_dark, plugin_root=None):
    """
    Resolve the registry logo for a slide canvas.
      on_dark=True  -> assets.logo_white_png (navy / dark canvas)
      on_dark=False -> assets.logo_wordmark_png, else assets.logo_dark_png (light canvas)
    Expands ${CLAUDE_PLUGIN_ROOT}; returns None when the brand has no such file.
    """
    assets = brand.get("assets", {}) or {}
    if on_dark:
        raw = assets.get("logo_white_png")
    else:
        raw = assets.get("logo_wordmark_png") or assets.get("logo_dark_png")
    if not raw:
        return None
    root = plugin_root or os.environ.get("CLAUDE_PLUGIN_ROOT") or \
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    path = raw.replace("${CLAUDE_PLUGIN_ROOT}", root)
    return path if os.path.exists(path) else None


def add_logo(slide, prs, path, width=Inches(2.2), position="top-left",
             margin=Inches(0.5)):
    """
    Place a logo picture. position: "top-left" | "top-right" | "bottom-left".
    Height follows the image's aspect ratio. No-op (returns None) when path is None.
    """
    if not path:
        return None
    pic = slide.shapes.add_picture(path, 0, 0, width=width)
    W, H = prs.slide_width, prs.slide_height
    pic.left = W - width - margin if position == "top-right" else margin
    pic.top = H - pic.height - margin if position == "bottom-left" else margin
    return pic


# ---------------------------------------------------------------------------
# #16 — stop silent text loss on rebrand
# ---------------------------------------------------------------------------

def fit_text_frame(tf, word_wrap=True, mode="shape_to_text"):
    """
    #16 fix. Configure a text frame so variable-length content is never clipped.
      mode="shape_to_text" -> box grows to fit the text (MSO_AUTO_SIZE.SHAPE_TO_FIT_TEXT)
      mode="text_to_shape" -> text shrinks to fit a fixed box (TEXT_TO_FIT_SHAPE)
    Use shape_to_text for body/content frames, text_to_shape only for fixed regions.
    """
    tf.word_wrap = word_wrap
    if mode == "text_to_shape":
        tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
    else:
        tf.auto_size = MSO_AUTO_SIZE.SHAPE_TO_FIT_TEXT
    return tf


def _shape_text(shape):
    parts = []
    if shape.has_text_frame:
        for para in shape.text_frame.paragraphs:
            t = "".join(r.text for r in para.runs)
            if t.strip():
                parts.append(t.strip())
    if shape.has_table:
        for row in shape.table.rows:
            for cell in row.cells:
                t = cell.text.strip()
                if t:
                    parts.append(t)
    return parts


def extract_deck_text(path):
    """
    #16 fix. Extract all text from a source .pptx BEFORE rebranding.
    Returns {slide_index (1-based): [text chunks]}. Feed this to the generator
    so slide copy comes from the source, not from in-context recall.
    """
    from pptx import Presentation
    src = Presentation(path)
    out = {}
    for i, slide in enumerate(src.slides, start=1):
        chunks = []
        for shape in slide.shapes:
            chunks.extend(_shape_text(shape))
        out[i] = chunks
    return out


def _norm(s):
    return " ".join(s.lower().split())


def validate_text_coverage(source_texts, output, min_len=4, verbose=True):
    """
    #16 fix. After generating the rebranded deck, verify no source text was dropped.

    source_texts : dict from extract_deck_text() (or a flat list of strings)
    output       : a Presentation object OR a path to the output .pptx
    Returns a list of missing chunks (empty == full coverage). Prints a report
    when verbose. Short/boilerplate chunks under min_len words that also appear
    nowhere are still reported — tune min_len if noisy.
    """
    from pptx import Presentation
    if isinstance(output, str):
        output = Presentation(output)

    # Gather all output text as one normalised haystack.
    haystack_parts = []
    for slide in output.slides:
        for shape in slide.shapes:
            haystack_parts.extend(_shape_text(shape))
    haystack = _norm(" ␟ ".join(haystack_parts))

    # Flatten source chunks.
    if isinstance(source_texts, dict):
        chunks = [(idx, c) for idx, lst in source_texts.items() for c in lst]
    else:
        chunks = [(None, c) for c in source_texts]

    missing = []
    for idx, chunk in chunks:
        nc = _norm(chunk)
        if not nc:
            continue
        if nc in haystack:
            continue
        # Fallback: treat as covered if >=80% of its words are present in order-free set.
        words = set(nc.split())
        if words and len(words & set(haystack.split())) / len(words) >= 0.8:
            continue
        missing.append((idx, chunk))

    if verbose:
        total = len(chunks)
        if missing:
            print(f"[text-coverage] WARNING: {len(missing)}/{total} source chunks "
                  f"missing from output:")
            for idx, chunk in missing:
                where = f"src slide {idx}: " if idx else ""
                preview = chunk if len(chunk) <= 80 else chunk[:77] + "..."
                print(f"  - {where}{preview!r}")
        else:
            print(f"[text-coverage] OK: all {total} source chunks present in output.")

    return [c for _, c in missing]
