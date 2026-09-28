#!/usr/bin/env python3
"""Extract raw Markdown/text from a source file for the rag-markdown skill.

Layout-aware extraction via Microsoft's `markitdown` (handles PDF, PPTX, DOCX,
XLSX, HTML and more). Falls back to format-specific libraries if markitdown is
not installed. The output is RAW — page noise, broken tables and bare image
refs remain. Claude then restructures it into RAG-ready Markdown (skill Steps 3-4).

Usage (see SKILL.md for the pinned uv command):
    python3 extract.py "<path-to-source-file>" [--out-dir output]

Writes "<out-dir>/<source-name>.raw.md" (default ./output/ in the current working
directory, never next to the source) and prints the raw Markdown to stdout.
Missing libraries end with a one-line message and exit code 2, not a traceback.
"""

import argparse
import sys
from pathlib import Path

INSTALL_HINT = (
    "Run it through uv so the pinned extractor is available:\n"
    "  uv run --with 'markitdown[pdf,docx,pptx,xlsx,xls]==0.1.8' python extract.py <file>\n"
    "No uv? PDFs can be read directly by Claude; for other formats, paste the "
    "text or export it to PDF/plain text first."
)


def _fail(msg: str) -> None:
    print(f"[extract] {msg}", file=sys.stderr)
    sys.exit(2)


def _try_markitdown(path: str):
    try:
        from markitdown import MarkItDown
    except ImportError:
        return None
    try:
        return MarkItDown().convert(path).text_content
    except Exception as e:  # noqa: BLE001 - surface the reason, then fall back
        print(f"[extract] markitdown failed ({e}); trying fallbacks…", file=sys.stderr)
        return None


def _need(module: str, package: str):
    """Import an optional fallback library, or exit with a clear message."""
    try:
        return __import__(module)
    except ImportError:
        _fail(f"markitdown is unavailable and the fallback library '{package}' "
              f"is not installed either.\n{INSTALL_HINT}")


def _fallback(path: str) -> str:
    ext = Path(path).suffix.lower()
    if ext == ".pdf":
        pdfplumber = _need("pdfplumber", "pdfplumber")
        with pdfplumber.open(path) as pdf:
            return "\n\n".join((p.extract_text() or "") for p in pdf.pages)
    if ext == ".pptx":
        pptx = _need("pptx", "python-pptx")
        out = []
        for i, slide in enumerate(pptx.Presentation(path).slides, 1):
            out.append(f"## Slide {i}")
            for shape in slide.shapes:
                if shape.has_text_frame:
                    out.append(shape.text_frame.text)
        return "\n\n".join(out)
    if ext == ".docx":
        docx = _need("docx", "python-docx")
        return "\n\n".join(p.text for p in docx.Document(path).paragraphs)
    if ext == ".xlsx":
        openpyxl = _need("openpyxl", "openpyxl")
        wb = openpyxl.load_workbook(path, data_only=True)
        out = []
        for ws in wb.worksheets:
            out.append(f"## Sheet: {ws.title}")
            for row in ws.iter_rows(values_only=True):
                out.append(" | ".join("" if c is None else str(c) for c in row))
        return "\n".join(out)
    if ext in (".html", ".htm", ".txt", ".md"):
        return Path(path).read_text(encoding="utf-8", errors="replace")
    _fail(f"No extractor for '{ext}' without markitdown (legacy .ppt/.doc/.xls "
          f"need markitdown or a re-save as .pptx/.docx/.xlsx).\n{INSTALL_HINT}")


def main() -> None:
    ap = argparse.ArgumentParser(description="Extract raw Markdown for rag-markdown.")
    ap.add_argument("source", help="path to the source file")
    ap.add_argument("--out-dir", default="output",
                    help="directory for <name>.raw.md (default: ./output)")
    args = ap.parse_args()

    src = Path(args.source)
    if not src.exists():
        _fail(f"File not found: {src}")

    text = _try_markitdown(str(src))
    if text is None:
        text = _fallback(str(src))

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / (src.name + ".raw.md")
    out_path.write_text(text, encoding="utf-8")
    print(f"[extract] Raw Markdown written to: {out_path.resolve()}", file=sys.stderr)
    print(text)


if __name__ == "__main__":
    main()
