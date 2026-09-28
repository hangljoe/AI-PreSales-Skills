# RAG-Ready Markdown — Best Practices (authority)

This is the authoritative ruleset for the `rag-markdown` skill. It is synthesized from current
(2025–2026) RAG-engineering guidance — see **Sources** at the end. When a formatting decision is
ambiguous, this file wins.

## Why Markdown, and why one structured file

- Markdown is the best default format for RAG: it preserves *just enough* structure (headings,
  tables, lists) for chunkers and embedders to work with, while costing the fewest tokens. HTML
  carries 2–5× more tokens for the same content; raw PDF extraction loses structure entirely.
- Clean Markdown preprocessing is the single highest-leverage step in a RAG pipeline — reported
  retrieval-accuracy gains of well over 50% versus ingesting raw PDFs. The quality ceiling of the
  whole pipeline is set here.
- **Produce one structured file, not pre-split chunks.** Vector stores, Claude Projects, and
  knowledge bases chunk at ingestion using *their own* token window, overlap, and splitter. A clean
  single file lets each target chunk optimally for itself, stays portable across targets, and stays
  human-editable. Pre-chunking hard-codes a guess that fights the downstream splitter. Only
  pre-chunk when the user owns ingestion and deliberately wants fixed boundaries.

## Heading hierarchy (the backbone)

- Exactly **one `# H1`** — the document title.
- **`## H2` is the chunk unit.** Each H2 should be one complete, self-standing idea. Heading-aware
  splitters break here, so an H2 that is a coherent whole becomes a coherent chunk.
- Use **`### H3`** for subsections inside a long H2. Don't skip levels (no H2 → H4).
- Structure by **meaning, not source layout**. Original page breaks, slide breaks, and column breaks
  are not semantic boundaries — regroup content into topics.
- Headings give embedding models context about what a chunk contains, and give the LLM clear anchors
  to reason over. A query like "what does the pricing section say" needs a heading to match against.

## Section sizing

- Target **~200–1000 tokens per section**. Large enough to carry a complete idea; small enough to be
  precise. ~500–800 tokens is a healthy middle for prose.
- **Split** sections that run well past ~1000 tokens into `###` subsections.
- **Merge** trivially thin fragments (a 20-word slide) into a neighbouring coherent section.
- Don't split a document under ~500 tokens at all — one section is fine.

## Self-containment (the rule most pipelines miss)

- Each section must be understandable **with zero neighbouring context**, because at retrieval time
  it may arrive alone.
- Eliminate naked back-references: "as mentioned above", "this approach", "the former", bare "it/they".
  Restate the subject by name.
- Open each section with a sentence that names its subject ("The classification workflow handles…").
- Keep explanatory text together with the data it explains — never split an explanation from its
  table, example, or figure.
- Embed the heading chain meaning into the prose where it aids standalone reading.

## Tables

- Convert **all** tabular data to Markdown **pipe tables**. Never collapse a table into a text blob —
  that destroys row/column relationships and makes the numbers useless to the LLM.
- **Never split a table across sections/chunks.** Keep it whole within one section.
- If a table is genuinely huge, split by logical row groups and **repeat the header row** in each part.
- Preserve merged/spanning headers as best the Markdown allows; flatten nested tables into readable form.
- Add a **one-line caption** immediately above each table in plain language, e.g.
  `**Table — Q3 revenue by region (USD m).**` This makes numeric content retrievable by semantic query
  and flags the section as table-bearing.

## Images, charts, diagrams

- Replace every meaningful image with a **natural-language description** as a blockquote:
  `> **Figure — bar chart showing on-time delivery rising from 82% to 94% after rollout.**`
- Describe *what it shows and the takeaway*, not just "an image". Visual-only content is otherwise
  invisible to text retrieval.
- Include any OCR'd text from the image as well, separately from the description.
- Drop purely decorative images.

## Lists and code

- Preserve lists with `-` or `1.`. Don't break a list across a chunk boundary; don't split mid-item.
- Fence code in triple backticks with a language hint. Keep code out of prose paragraphs.

## Noise to strip (always)

- Repeating **page headers and footers**, **page numbers**, running titles, publication dates on
  every page.
- **Watermarks** and background text.
- Navigation, menus, cookie banners, and boilerplate (from HTML).
- Repeated legal **disclaimers / copyright** lines (keep one copy if genuinely informative).
- **OCR artifacts** and recognition garbage from scanned docs.
- Inline styling, CSS classes, script tags, data attributes.

## Frontmatter metadata

Prepend YAML frontmatter. These fields power filtering, re-ranking, ordering, and citation:

```yaml
---
title: <human-readable title>
source: <original filename or "conversation">
source_type: pdf | pptx | docx | xlsx | html | conversation | other
created: <original document date if known, else omit>
ingested: <YYYY-MM-DD>
tags: [<topic>, <topic>]
summary: <1–2 sentence abstract>
---
```

- Keep `tags` few and specific (topics, product, account).
- `summary` is a true abstract of the whole doc — it often becomes its own retrievable signal.

## Source-type playbook

| Source | Approach |
|--------|----------|
| **Conversation / chat** | Reorganize by topic, not turn order. Synthesize decisions, facts, conclusions into clean sections. Attribute speakers only where it matters. Drop chit-chat. Output a knowledge doc, not a transcript. |
| **Presentation (PPTX)** | One section per topic; merge thin slides. Convert speaker notes to prose. Keep slide numbers only if they aid citation. |
| **Report / whitepaper (PDF/DOCX)** | Mirror the document's heading hierarchy; chunk at subsection level. |
| **Legal contract** | Chunk at clause boundaries; keep clause numbers in headings/metadata for citation. |
| **Financial statement** | Tables as whole units; split large tables by row groups, repeating headers. |
| **Spreadsheet (XLSX)** | One section per sheet; sheet name as heading; data as a Markdown table. |

## Optional: pre-chunked output

Only when the user explicitly wants physically split files:

- One file per `##` section under `chunks/`.
- Begin each with a **breadcrumb header**: `## <Document title> > <Section title>`.
- Minimal per-chunk frontmatter: `source`, `chunk_index`, `section_path`, `has_table`.
- Still keep tables whole; still self-contained.

## Sources

- MDSpin — *Why Markdown is the Best Format for RAG Pipelines*: https://www.mdspin.app/guides/markdown-for-rag
- Iteration Layer — *Document-to-Markdown for RAG*: https://iterationlayer.com/blog/document-to-markdown-for-rag
- Firecrawl — *Best Chunking Strategies for RAG*: https://www.firecrawl.dev/blog/best-chunking-strategies-rag
- Databricks — *The Ultimate Guide to Chunking Strategies for RAG*: https://community.databricks.com/t5/technical-blog/the-ultimate-guide-to-chunking-strategies-for-rag-applications/ba-p/113089
- Dr. Leon Eversberg (TDS) — *Improved RAG Document Processing With Markdown*: https://medium.com/data-science/improved-rag-document-processing-with-markdown-426a2e0dd82b
