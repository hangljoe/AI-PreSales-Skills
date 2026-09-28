"""
combine_batches.py — merge Step-5 batch part files into one branded deck.

Extracted from SKILL.md Step 7, extended with a brand-theme re-bake pass (#21) on the
combined deck; see that section for the load snippet and the one-line call.

Usage (inside the skill's `uv run python` block, after Step 6 validation):

    import importlib.util, os
    _spec = importlib.util.spec_from_file_location(
        "combine_batches",
        os.path.join(_ROOT, "skills", "pptx-generator", "lib", "combine_batches.py"))
    cb = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(cb)

    part_files = sorted(output_dir.glob("{name}-part*.pptx"))
    final_path = cb.combine(part_files, brand, output_dir / "{name}-final.pptx")
"""

import importlib.util
import os
from io import BytesIO
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE_TYPE

# brand_helpers.py is a sibling in this same lib/ folder — resolve it relative to
# this file (not CLAUDE_PLUGIN_ROOT) so this module imports cleanly on its own.
_LIB_DIR = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location(
    "brand_helpers", os.path.join(_LIB_DIR, "brand_helpers.py"))
bh = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bh)


def hex_to_rgb(hex_color):
    h = hex_color.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def combine(part_files, brand, out_path):
    """Merge `part_files` (ordered list of Path) into one branded deck at `out_path`.

    `brand` is the parsed brand.json dict (the same one Step 1 loaded). Carries each
    source slide's own background forward, re-bakes the brand theme onto the combined
    deck (#21), saves to `out_path`, deletes the source part files, and returns
    `out_path`.
    """
    part_files = [Path(p) for p in part_files]
    if not part_files:
        raise ValueError("combine() received no part files")

    combined = Presentation(str(part_files[0]))
    tok = bh.apply_brand_theme(combined, brand)
    brand_bg = tok["background"]

    for part_file in part_files[1:]:
        part_prs = Presentation(str(part_file))
        for slide in part_prs.slides:
            blank_layout = combined.slide_layouts[6]
            new_slide = combined.slides.add_slide(blank_layout)
            # Carry the source slide's own background (navy title/section slides
            # stay navy); fall back to the content canvas.
            new_slide.background.fill.solid()
            try:
                new_slide.background.fill.fore_color.rgb = slide.background.fill.fore_color.rgb
            except (AttributeError, TypeError):
                new_slide.background.fill.fore_color.rgb = hex_to_rgb(brand_bg)
            for shape in slide.shapes:
                if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
                    # Pictures (logos) reference an image part — re-add, don't copy XML
                    new_slide.shapes.add_picture(
                        BytesIO(shape.image.blob), shape.left, shape.top,
                        shape.width, shape.height)
                else:
                    new_slide.shapes._spTree.insert_element_before(shape.element, 'p:extLst')

    # #21 — the combined deck is built from part_files[0]'s master; re-bake the
    # theme so the FINAL file carries the brand palette + fonts (not just the parts).
    bh.apply_brand_theme(combined, brand)

    out_path = Path(out_path)
    combined.save(str(out_path))
    for part_file in part_files:
        part_file.unlink()

    return out_path
