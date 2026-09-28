"""Render an .excalidraw JSON file to a PNG using Playwright + headless Chromium.

Usage:
    export UV_PROJECT_ENVIRONMENT="$HOME/.cache/presales/diagram-venv"
    uv run --project "${CLAUDE_PLUGIN_ROOT}/skills/diagram/references" --frozen
        python render_excalidraw.py <path-to-file.excalidraw>   (one line)

The venv lives in the user cache, never in the plugin folder.

Loads the official @excalidraw/excalidraw UMD bundle from a CDN, asks it to
export the scene to SVG, drops that SVG into a blank page, and screenshots it.
SVG export is used (rather than canvas/exportToBlob) because it rasterises
reliably in headless Chromium without depending on canvas font loading.

The output PNG is written next to the input file with the same basename.
Requires internet access to fetch the Excalidraw bundle from the CDN.
"""

import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

# Pinned CDN bundles. The Excalidraw UMD build expects React + ReactDOM as
# globals, so they must be loaded first. The UMD build then exposes the global
# `ExcalidrawLib`.
REACT_CDN = "https://unpkg.com/react@18.2.0/umd/react.production.min.js"
REACT_DOM_CDN = "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"
EXCALIDRAW_CDN = "https://unpkg.com/@excalidraw/excalidraw@0.17.6/dist/excalidraw.production.min.js"


def load_scene(path: Path) -> dict:
    """Read the .excalidraw file and normalise it to {elements, appState, files}.

    Accepts either a full Excalidraw document ({type, version, elements, ...})
    or a bare array/object of elements.
    """
    data = json.loads(path.read_text(encoding="utf-8"))

    if isinstance(data, list):
        # Bare array of elements.
        return {"elements": data, "appState": {}, "files": {}}

    if isinstance(data, dict) and "elements" in data:
        # Full document.
        return {
            "elements": data.get("elements", []),
            "appState": data.get("appState", {}) or {},
            "files": data.get("files", {}) or {},
        }

    # Object that *is* a single element (has a "type" but no "elements").
    if isinstance(data, dict) and "type" in data and data["type"] != "excalidraw":
        return {"elements": [data], "appState": {}, "files": {}}

    raise ValueError(f"Could not find any elements in {path}")


# Runs in the page once the Excalidraw bundle has loaded. Exports the scene to
# an SVG node, drops it in the DOM, and reports its size so we can size the
# viewport to capture the whole diagram.
RENDER_FN = """
  async (scene) => {
    const svg = await ExcalidrawLib.exportToSvg({
      elements: scene.elements,
      appState: {
        exportBackground: true,
        exportWithDarkMode: false,
        viewBackgroundColor:
          (scene.appState && scene.appState.viewBackgroundColor) || "#ffffff",
        ...scene.appState,
      },
      files: scene.files || {},
    });
    const out = document.getElementById("out");
    out.innerHTML = "";
    out.appendChild(svg);
    const bbox = svg.getBoundingClientRect();
    return { width: Math.ceil(bbox.width), height: Math.ceil(bbox.height) };
  }
"""


def render(input_path: Path) -> Path:
    scene = load_scene(input_path)
    if not scene["elements"]:
        raise ValueError(f"{input_path} has no elements to render")

    output_path = input_path.with_suffix(".png")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(device_scale_factor=2)  # 2x for crisp output
        page.set_content(
            '<!doctype html><html><head><meta charset="utf-8">'
            '<style>body{margin:0;background:#fff;}</style></head>'
            '<body><div id="out"></div></body></html>',
            wait_until="load",
        )

        # Load dependencies in order — React and ReactDOM must exist as globals
        # before the Excalidraw UMD bundle evaluates. add_script_tag waits for
        # each script's load event and avoids the document.write blocking issue.
        page.add_script_tag(url=REACT_CDN)
        page.add_script_tag(url=REACT_DOM_CDN)
        page.add_script_tag(url=EXCALIDRAW_CDN)
        page.wait_for_function("typeof window.ExcalidrawLib !== 'undefined'", timeout=30000)

        size = page.evaluate(RENDER_FN, scene)
        # Size the viewport to the SVG so the screenshot captures the whole scene.
        page.set_viewport_size(
            {"width": max(size["width"], 1), "height": max(size["height"], 1)}
        )

        svg_el = page.query_selector("#out svg")
        svg_el.screenshot(path=str(output_path))
        browser.close()

    return output_path


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python render_excalidraw.py <path-to-file.excalidraw>  (see SKILL.md for the uv command)")
        return 2

    input_path = Path(sys.argv[1]).resolve()
    if not input_path.exists():
        print(f"File not found: {input_path}")
        return 1

    output_path = render(input_path)
    print(output_path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
