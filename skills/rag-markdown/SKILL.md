---
name: rag-markdown
version: "1.1"
last_updated: 2026-09-28
description: "Converts any source (this conversation, pasted text, PDF, PowerPoint, Word, Excel, or a web page) into one clean Markdown file built for RAG ingestion: strict heading hierarchy as chunk boundaries, self-contained sections, YAML frontmatter, normalised tables, described images. Use on \"make this RAG-ready\", \"convert this PDF to markdown for the knowledge base\", \"prep this for our AI search\", \"turn this into a knowledge-base doc\". Siblings: discovery-transformer (meeting .vtt transcripts), meeting-notes-structurer (call notes into a summary), knowledge-capture (turn a win, demo flow or answer into a reusable team asset). SKIP for summarising a meeting or rendering Word/PowerPoint files."
triggers:
  - "RAG ready markdown"
  - "convert to markdown for RAG"
  - "make this RAG ingestible"
  - "prepare this for the knowledge base"
  - "convert this pdf to markdown for RAG"
  - "turn this into a knowledge base doc"
  - "markdown for embedding"
  - "make this embeddable"
  - "RAG document"
---

# RAG-Ready Markdown

Turn any source into **one clean, chunk-aware `.md` file** that a RAG system can ingest and retrieve well. You produce a single structured Markdown document — not pre-split chunk files — because every modern RAG target (vector DBs, Claude Projects, Confluence/Knowledge MCP) chunks at ingestion using token windows and splitters you don't control. A well-structured single file lets each system chunk *optimally for itself*, stays portable, and remains human-editable. Your job is to make the structure so clean that downstream chunking is trivial.

The detailed, sourced ruleset lives in `references/best-practices.md`. Read it before your first conversion in a session — it is the authority for every formatting decision below.

## What you produce

1. **`<slug>.rag.md`** — the RAG-ready Markdown file: YAML frontmatter + a strict heading hierarchy where each `##` section is a self-contained, retrievable unit.

That's the deliverable. Offer the `--chunked` variant (Step 5) only if the user explicitly needs pre-split files.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **Confluence / Knowledge MCP** | Write the finished `.rag.md` straight into the team knowledge base as a retrievable page, instead of leaving it as a local file. |
| **SharePoint / Box (MCP)** | Pull the source document directly when the user points to a stored file rather than uploading it. |

No connections? The skill works the same — read the source locally (or from pasted text) and write the `.md` to disk.

---

## Step 1 — Identify the source and intake

Determine what you're converting. Each path is handled differently:

| Source | How to get the raw content |
|--------|---------------------------|
| **This conversation** | Use the messages already in context. No extraction needed. |
| **Pasted text** | Use it directly. |
| **PDF / PPTX / DOCX / XLSX / HTML file** | Extract first (Step 2). Never hand-retype — extract. |
| **A URL** | Fetch the page, then treat as HTML. |

Confirm two things before converting (ask only if not obvious):
- **Document title** and rough **topic/tags** (used in frontmatter).
- **RAG target**, if known (vector DB / Claude Project / Confluence). It doesn't change the format much — the output is portable — but it lets you size sections sensibly and choose where to write the file.

## Step 2 — Extract (for binary/rich files only)

For PDF, PPTX, DOCX, XLSX, or HTML, get raw Markdown/text first with the helper script. It uses Microsoft's `markitdown` (layout-aware), pinned, with library fallbacks. Preflight with `command -v uv`, then run it from the user's working directory:

```bash
uv run --with 'markitdown[pdf,docx,pptx,xlsx,xls]==0.1.8' python "${CLAUDE_PLUGIN_ROOT}/skills/rag-markdown/scripts/extract.py" "<path-to-source-file>"
```

(Use these extras, not `markitdown[all]`: `[all]` pulls a pre-release Azure dependency and fails to resolve.)

It prints raw Markdown to stdout and writes `./output/<source-name>.raw.md` in the current working directory, never next to the user's source file. A missing library ends with a one-line message, not a traceback.

**No uv?** Tell the user in one line how to install it (https://docs.astral.sh/uv/getting-started/installation/), then fall back rather than stop: read a **PDF** directly with the Read tool (it handles PDFs; use the `pages` range for long files). For **PPTX / DOCX / XLSX / HTML**, ask the user to paste the text or export the file to PDF, then continue with Step 3. This raw output is **not** RAG-ready — it carries page headers, footers, page numbers, broken tables, and bare image references. Steps 3–4 are where you turn it into something retrievable.

For a **conversation** or **pasted text**, skip this step.

## Step 3 — Restructure for retrieval

Rebuild the content into the RAG structure. Apply `references/best-practices.md` in full; the essentials:

- **One `# H1`** — the document title, matching frontmatter.
- **`## H2` = the chunk unit.** Each H2 is one complete idea, sized so it stands alone (~200–1000 tokens). Use `### H3` for subsections inside long sections. Never let layout dictate structure — group by *meaning*.
- **Self-contained sections.** Every section must be understandable with zero neighbouring context. Kill naked pronouns and back-references ("as mentioned above", "this approach") — restate the subject. Open each section with a sentence that names what it's about.
- **Normalize tables** to Markdown pipe syntax. Never split a table; if huge, repeat the header row. Add a one-line plain-language caption above each table (e.g. `**Table — Q3 revenue by region.**`) so numeric content is retrievable.
- **Describe images, charts, and diagrams** in natural language as a blockquote: `> **Figure — <what it shows and the key takeaway>.**` Visual-only content is invisible to retrieval otherwise.
- **Strip the noise.** Remove page headers/footers, page numbers, watermarks, nav, repeated boilerplate, copyright/disclaimer lines, and OCR artifacts. Keep signal only.
- **Preserve lists and code.** Use `-`/`1.` for lists (don't split mid-item) and triple-backtick fences for code.

### Source-specific handling

- **Conversation** → reorganize by *topic*, not by turn-by-turn chat order. Synthesize the decisions, facts, and conclusions into clean sections. Attribute only where who-said-it matters. Drop the chit-chat. The goal is a knowledge document, not a transcript.
- **Presentation (PPTX)** → one section per coherent topic (merge trivially-thin slides). Keep slide numbers only if they aid citation; otherwise drop them. Turn speaker-note bullets into prose.
- **Report / whitepaper (PDF/DOCX)** → mirror the existing heading hierarchy; chunk at subsection level.
- **Spreadsheet (XLSX)** → one section per sheet; sheet name as the heading; data as a Markdown table.

## Step 4 — Add frontmatter metadata

Prepend YAML frontmatter. These fields drive retrieval filtering, re-ranking, and citation:

```yaml
---
title: <human-readable document title>
source: <original filename or "conversation">
source_type: pdf | pptx | docx | xlsx | html | conversation | other
created: <original document date if known, else omit>
ingested: <today's date, YYYY-MM-DD>
tags: [<topic>, <topic>, <product/account if relevant>]
summary: <1–2 sentence abstract of the whole document>
---
```

Keep `tags` specific and few. Use today's date (it's in your session context) for `ingested`.

## Step 5 — (Optional) pre-chunked variant

Only if the user explicitly says they want physically split chunks (they control ingestion and don't want re-chunking): also emit a `chunks/` folder, one file per `##` section, each carrying a breadcrumb header (`## <H1 title> > <section title>`) and minimal per-chunk frontmatter (`source`, `chunk_index`, `section_path`, `has_table`). Default is **not** to do this — say so and recommend the single file unless they ask.

## Step 6 — Present and explain

Write the `.rag.md` file to `./output/<slug>.rag.md` in the current working directory (or the user's deal / knowledge folder, if they name one; never next to the source or inside the plugin folder) and present it. Then, briefly:
- State where it was written and that it's a single portable file ready to ingest anywhere.
- Note any sections you had to summarize, any images you described from context, and anything the user should verify (flag low-confidence extractions).
- If a Knowledge/Confluence MCP is connected, offer to publish it as a page.

---

## Quality checklist (before delivering)

- [ ] Exactly one `# H1`; clean `##`/`###` hierarchy with no skipped levels
- [ ] Every `##` section is self-contained — no naked pronouns or back-references
- [ ] Sections sized for retrieval (~200–1000 tokens); over-long sections split, trivially-thin ones merged
- [ ] All tables are valid Markdown pipe tables, unsplit, each with a caption line
- [ ] Every image/chart/diagram replaced with a natural-language description
- [ ] Page headers, footers, page numbers, watermarks, and boilerplate stripped
- [ ] YAML frontmatter present and complete (`title`, `source`, `source_type`, `ingested`, `tags`, `summary`)
- [ ] Lists and code blocks preserved with correct Markdown
- [ ] Output is a single `.rag.md` file (no pre-chunking unless explicitly requested)
- [ ] Any summarized or low-confidence content flagged to the user
