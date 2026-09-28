---
name: diagram
version: "1.2"
last_updated: 2026-09-28
description: "Creates Excalidraw diagram files (.excalidraw) that make a visual argument — workflows, solution architectures, deal and stakeholder flows, integration landscapes, concepts. Use on \"diagram this\", \"architecture diagram\", \"draw a flow\", \"make a diagram of\", \"visualize this process\". Siblings: toc-bbit-expert (draws its own Cloud/CRT/FRT diagrams), pptx-generator (slides). SKIP for data charts and plots (bar, line, pie, dashboards) — that is data visualisation, not Excalidraw."
triggers:
  - "diagram this"
  - "generate diagram"
  - "architecture diagram"
  - "create a flow"
  - "draw a diagram"
  - "visualize this process"
  - "make a diagram"
  - "draw a flow"
---

# Excalidraw Diagram Creator

Generate `.excalidraw` JSON files that **argue visually**, not just display information.

## Connected Tools

No connected tools — this skill works from pasted context only.

## Customization

**All colors live in one file:** `references/color-palette.md`. Read it before generating any diagram — it is the single source of truth for all color choices.

---

## Core Philosophy

**Diagrams should ARGUE, not DISPLAY.**

A diagram isn't formatted text. It's a visual argument that shows relationships, causality, and flow that words alone can't express. The shape should BE the meaning.

**The Isomorphism Test**: If you removed all text, would the structure alone communicate the concept? If not, redesign.

**The Education Test**: Could someone learn something concrete from this diagram, or does it just label boxes?

---

## Depth Assessment (Do This First)

### Simple/Conceptual Diagrams
Use abstract shapes when explaining a mental model, philosophy, or abstraction.

### Comprehensive/Technical Diagrams
Use concrete examples when diagramming a real system, architecture, or integration. **For technical diagrams, include evidence artifacts** — actual data formats, event names, real API calls.

---

## Design Process (Do This BEFORE Generating JSON)

### Step 1: Understand Deeply
For each concept, ask:
- What does this concept **DO**? (not what IS it)
- What relationships exist?
- What's the core transformation or flow?
- **What would someone need to SEE to understand this?**

### Step 2: Map Concepts to Patterns

| If the concept... | Use this pattern |
|-------------------|------------------|
| Spawns multiple outputs | **Fan-out** (radial arrows from center) |
| Combines inputs into one | **Convergence** (funnel, arrows merging) |
| Has hierarchy/nesting | **Tree** (lines + free-floating text) |
| Is a sequence of steps | **Timeline** (line + dots + free-floating labels) |
| Loops or improves | **Spiral/Cycle** (arrow returning to start) |
| Is an abstract state | **Cloud** (overlapping ellipses) |
| Transforms input to output | **Assembly line** (before → process → after) |
| Compares two things | **Side-by-side** (parallel with contrast) |
| Separates into phases | **Gap/Break** (visual separation) |

### Step 3: Ensure Variety
For multi-concept diagrams: **each major concept must use a different visual pattern**. No uniform cards or grids.

### Step 4: Generate JSON
See element templates in `references/element-templates.md`. See JSON schema in `references/json-schema.md`.

### Step 5: Render & Validate
After generating JSON, render and inspect visually. See **Render & Validate** section.

---

## Large / Comprehensive Diagram Strategy

**Build JSON one section at a time.** Do NOT generate the entire file in one pass.

1. Create the base file with JSON wrapper and first section
2. Add one section per edit — think carefully about layout and cross-section connections
3. Use descriptive string IDs (e.g., `"trigger_rect"`, `"arrow_fan_left"`)
4. Namespace seeds by section (section 1 → 100xxx, section 2 → 200xxx) to avoid collisions
5. After all sections: review cross-section arrows, spacing, and bindings

---

## Visual Pattern Library

### Fan-Out (One-to-Many)
```
       ○
      ↗
 □ → ○
      ↘
       ○
```

### Convergence (Many-to-One)
```
 ○ ↘
 ○ → □
 ○ ↗
```

### Tree (Hierarchy)
Use `line` elements for trunk/branches, free-floating text for labels — no boxes needed.

### Spiral/Cycle
```
 □ → □
 ↑     ↓
 □ ← □
```

### Timeline
Vertical/horizontal line + small dot ellipses (10-20px) at intervals + free-floating labels beside each dot.

### Assembly Line (Transformation)
```
 ○○○ → [PROCESS] → □□□
 chaos              order
```

---

## Container vs. Free-Floating Text

**Default to free-floating text. Add containers only when they serve a purpose.**

| Use a Container When... | Use Free-Floating Text When... |
|------------------------|-------------------------------|
| It's the focal point of a section | It's a label or description |
| Arrows need to connect to it | It's supporting detail |
| The shape itself carries meaning | It's a section title or annotation |

**Rule**: Default to no container. Add shapes only when they carry meaning. Aim for <30% of text elements inside containers.

---

## Shape Meaning

| Concept Type | Shape |
|--------------|-------|
| Labels, descriptions | **none** (free-floating text) |
| Timeline markers | small `ellipse` (10-20px) |
| Start, trigger, input | `ellipse` |
| End, output, result | `ellipse` |
| Decision, condition | `diamond` |
| Process, action, step | `rectangle` |
| Abstract state, context | overlapping `ellipse` |

---

## Color as Meaning

Pull all colors from `references/color-palette.md`. Colors encode meaning, not decoration.

- Each semantic purpose (start, end, decision, warning, etc.) has a specific fill/stroke pair
- Free-floating text uses color for hierarchy
- Evidence artifacts use their own dark background + colored text scheme

**Do not invent new colors.**

---

## Modern Aesthetics

- `roughness: 0` — Clean, crisp edges (default for professional diagrams)
- `strokeWidth: 2` — Standard for shapes and arrows; 3 for emphasis
- `opacity: 100` — Always. Use color and size for hierarchy, not transparency.

---

## Layout Principles

- **Hero**: 300×150 — visual anchor, most important element
- **Primary**: 180×90
- **Secondary**: 120×60
- **Small**: 60×40
- **Whitespace = Importance**: Most important element has 200px+ of empty space around it
- **Flow Direction**: Left→right or top→bottom for sequences; radial for hub-and-spoke

---

## JSON Structure

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [...],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": 20
  },
  "files": {}
}
```

See `references/element-templates.md` for copy-paste JSON templates.

---

## Save, Render & Validate

**Save** every diagram to `./output/diagrams/<topic>.excalidraw` in the user's current working directory (or their deal folder, if they keep one). Never write into the plugin folder.

**Render to PNG and inspect.** The renderer's Python environment lives in your user cache, never in the plugin folder — the plugin folder can be read-only and is replaced on every plugin update. `--frozen` uses the shipped `uv.lock` as-is.

```bash
command -v uv >/dev/null 2>&1 || echo "uv missing"          # preflight
export UV_PROJECT_ENVIRONMENT="$HOME/.cache/presales/diagram-venv"
RENDER=(uv run --project "${CLAUDE_PLUGIN_ROOT}/skills/diagram/references" --frozen)
"${RENDER[@]}" playwright install chromium                   # first time only (~150 MB)
"${RENDER[@]}" python "${CLAUDE_PLUGIN_ROOT}/skills/diagram/references/render_excalidraw.py" "$PWD/output/diagrams/<topic>.excalidraw"
```

The PNG lands next to the `.excalidraw` file. Use the **Read tool** on it to view it. The renderer loads Excalidraw from a CDN, so it needs internet access.

**No uv (or no internet)?** Say so in one line, with the install link (https://docs.astral.sh/uv/getting-started/installation/). Then skip the PNG render. Validate by re-reading the JSON against the checklist below (coordinates, bindings, overlaps), and deliver the `.excalidraw` file anyway.

**The validation loop:**
1. Render & view the PNG
2. Check: does the visual structure match your design?
3. Check for defects: text overflow, overlapping elements, broken arrows, imbalanced composition
4. Fix and re-render
5. Repeat until the diagram is clean and matches the intent

---

## Handoff

Tell the user where the files are and how to open them:

- **Edit:** go to https://excalidraw.com → menu → **Open** → pick `output/diagrams/<topic>.excalidraw`. Changes save back via **Save to…**. Excalidraw's VS Code and Obsidian plugins open the file directly, too.
- **Share:** the rendered `<topic>.png` (if it was rendered) drops straight into email, chat, or a slide.

**Next** (advisory):
- `pptx-generator` — put the PNG on a slide in a customer deck.
- `osd-architect` or `docx-generator` — embed the PNG in the OSD / solution design or another Word deliverable.
- `toc-bbit-expert` — for Theory-of-Constraints trees (Cloud, CRT, FRT); it has its own diagram grammar.

---

## Quality checklist

### Conceptual
- [ ] **Isomorphism**: Does each visual structure mirror its concept's behavior?
- [ ] **Argument**: Does the diagram SHOW something text alone couldn't?
- [ ] **Variety**: Each major concept uses a different visual pattern?
- [ ] **No uniform containers**: Avoided card grids and equal boxes?

### Container Discipline
- [ ] **Minimal containers**: Could any boxed element work as free-floating text?
- [ ] **Lines as structure**: Trees/timelines use lines + text, not boxes?
- [ ] **Typography hierarchy**: Font size and color creating hierarchy?

### Structural
- [ ] Every relationship has an arrow or line
- [ ] Clear visual path for the eye to follow
- [ ] Important elements are larger/more isolated

### Technical
- [ ] `text` contains only readable words (no markup)
- [ ] `fontFamily: 2` (Helvetica, clean sans) for all labels; `fontFamily: 3` (monospace) only inside evidence artifacts — code, JSON, event names. This matches `formats.excalidraw.font_family` in the brand registry.
- [ ] `roughness: 0` for professional diagrams
- [ ] `opacity: 100` for all elements
- [ ] <30% of text elements inside containers
