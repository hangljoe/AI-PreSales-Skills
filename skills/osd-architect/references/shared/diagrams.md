# OSD Diagram Pipeline — auto-generate & embed

An OSD is visual by nature. This skill **draws the diagrams and embeds them** so the SC opens a
document with the maps already rendered — not "(insert here)" placeholders.

Pipeline: **generate Excalidraw JSON → render to PNG → embed in Word**, with a clean fallback.

---

## The four OSD diagrams

| # | Diagram | OSD section | Visual pattern (see diagram skill) |
|---|---------|-------------|------------------------------------|
| 1 | **Supply Chain / Business Flow Map** | 5.1 | Flow: Suppliers → Plant/DC → Customer/Channel (or the service value chain), with regions & volumes |
| 2 | **As-Is Process Flow & Data Choreography** | 5.2 | Assembly line + numbered data flows between parties (ERP, CRM, partners) |
| 3 | **To-Be Process Flow & Data Choreography** | 4.3 | Same parties re-orchestrated through your product's modules; the 1–18 flow in `examples-library.md` |
| 4 | **IT Architecture (As-Is and To-Be)** | 6.1 / 6.2 | Hub-and-spoke: backends ↔ middleware ↔ your product ↔ external parties |

Ground the **Business Flow Map** in real research: the account research from Step 2 (and
`/presales:account:brief` if it ran), plus what discovery confirmed, then express it as a diagram.
Never draw a generic industry template and present it as the customer's reality.

---

## How to generate each diagram

Use the **`diagram` skill** to author the Excalidraw JSON — read its design rules first:

```
Read: ${CLAUDE_PLUGIN_ROOT}/skills/diagram/SKILL.md
Read: ${CLAUDE_PLUGIN_ROOT}/skills/diagram/references/color-palette.md
Read: ${CLAUDE_PLUGIN_ROOT}/skills/diagram/references/element-templates.md
```

Write each diagram to the run's `output/diagrams/` folder, e.g.:
`output/diagrams/sc-map.excalidraw`, `as-is-flow.excalidraw`, `to-be-flow.excalidraw`,
`it-architecture.excalidraw`.

Diagrams must **argue, not decorate** — the structure should carry the meaning even with the
text removed (the diagram skill's Isomorphism Test). Use brand colours from the palette.

---

## How to render to PNG

You need a PNG per diagram to embed. There are two paths — **use the cairosvg path by
default**; the Excalidraw/Playwright path only works with Chromium installed and the
Excalidraw CDN reachable, neither of which holds in most sandboxed or locked-down environments.

### Primary practical path — SVG + cairosvg (default)

The Playwright renderer needs an external CDN (often blocked in sandboxed environments) and
headless Chromium (often not installed), so it can silently produce nothing. `cairosvg` has no
such dependency and is the reliable path.

**uv preflight.** Check `command -v uv` first. If it is missing, tell the user in one line to
install it (https://docs.astral.sh/uv/getting-started/installation/) and use the fallback below
(keep the SVG sources, embed placeholders, render later). Never `pip install` into the system
Python. Run the conversion through uv with a pinned version instead:

Author each diagram directly as an **SVG** (same semantic colour palette / brand colours as
the diagram skill), write it to `output/diagrams/<name>.svg`, then convert at 2× scale:

```bash
uv run --with cairosvg==2.9.1 python -c 'import cairosvg; cairosvg.svg2png(url="output/diagrams/sc-map.svg", write_to="output/diagrams/sc-map.png", scale=2.0)'
```

This produces crisp, high-resolution PNGs that embed cleanly via `add_image()`. Still write
the `.excalidraw` source files too (see below) — they're useful for FigJam handoff even
though you don't render them here.

> **Dependency note.** cairosvg needs the native cairo library. Most Linux environments ship it,
> so the `uv run` above is all you need there. On macOS install it with `brew install cairo`.
> On a bare Windows machine cairo isn't bundled — install the GTK3 runtime, or
> just render the SVGs in any SVG editor / the `diagram` skill and drop the PNGs into
> `output/diagrams/`. The embed step (`add_image`) is renderer-agnostic — it only needs the PNG.

### Aspirational / self-hosted path — Excalidraw + Playwright

Only when Chromium is installed **and** the Excalidraw CDN is allowlisted (e.g. a local or
self-hosted environment):

```bash
command -v uv >/dev/null 2>&1 || echo "uv missing"          # preflight
export UV_PROJECT_ENVIRONMENT="$HOME/.cache/presales/diagram-venv"   # never inside the plugin folder
RENDER=(uv run --project "${CLAUDE_PLUGIN_ROOT}/skills/diagram/references" --frozen)
"${RENDER[@]}" playwright install chromium                   # first time only
"${RENDER[@]}" python "${CLAUDE_PLUGIN_ROOT}/skills/diagram/references/render_excalidraw.py" "$PWD/output/diagrams/sc-map.excalidraw"
```

This fetches the Excalidraw bundle from a CDN, so it needs internet and an allowlisted domain.

---

## How to embed

In the Word engine, embed each rendered PNG with `add_image()`:

```python
add_image("output/diagrams/sc-map.png", caption="As-Is business flow map",
          source_note="Generated via the diagram skill from account research and discovery.")
```

**Use absolute paths (or paths under the run's `output/diagrams/`).** `add_image()` resolves
paths relative to the build script's own directory (`RUN_DIR`), not just the CWD (#23), so
relative `output/diagrams/…` paths resolve correctly wherever the script is run from. If a PNG
is genuinely missing, `add_image()` prints a **loud `WARNING` to stdout** and drops a labelled
placeholder — so a missing diagram is never invisible. **Never deliver an OSD while an
`add_image` WARNING is on screen** — render the diagram and re-run first.

---

## Fallback (no internet / no Chromium)

The cairosvg path above already covers this environment — prefer it. If for some reason no
render happens at all:
1. Still generate and save the `.excalidraw` (and/or `.svg`) source files — useful artifacts.
2. `add_image()` prints a WARNING and drops a labelled placeholder (never silent).
3. Tell the user: *"diagram sources are in `output/diagrams/` — convert the SVGs with
   `uv run --with cairosvg==2.9.1` (`cairosvg.svg2png(..., scale=2.0)`) and re-run, or drop your own images in."*

Never block the OSD on diagram rendering — degrade gracefully, but loudly.

---

## Quality bar for OSD diagrams

- [ ] Business flow map reflects the **account's actual** tiers/regions/flows (from research), not a generic template
- [ ] As-Is vs To-Be are visibly different — the To-Be shows your product's modules orchestrating the flow
- [ ] IT architecture names real systems (ERP, middleware) where known; marks unknowns 🔴
- [ ] Brand colours from the palette; `roughness: 0`, `opacity: 100`
- [ ] Every embedded image has a caption; placeholders name what's missing
