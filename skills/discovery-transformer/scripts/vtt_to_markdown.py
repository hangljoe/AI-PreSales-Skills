#!/usr/bin/env python3
"""Convert a Microsoft Teams / WebVTT `.vtt` transcript into clean Markdown.

Strips WEBVTT headers, cue identifiers (GUID `…/NN-N` or integer), and timestamp
lines, then reconstructs readable speaker turns. Handles three real-world shapes:
  A — no speaker labels, GUID cue IDs, leading BOM  -> flowing prose
  B — inline `Speaker: text`, integer cue IDs       -> grouped, merged turns
  C — classic `<v Speaker>…</v>` voice tags          -> tag stripped, name kept
Consecutive same-speaker cues are merged into one paragraph. The script does the
mechanical cleanup; the skill does the judgement (folder match, confirm, save).

Usage:
    python3 vtt_to_markdown.py <input.vtt> [--account NAME] [--date YYYY-MM-DD] [--out PATH]

Prints the Markdown to stdout and writes nothing by default, so the skill can run its
confirm-before-write gate first. Only when `--out <path>` is given does it write a file,
and then only to that exact path (never next to the source).
"""

import argparse
import re
import sys
from datetime import datetime
from pathlib import Path

# Lines to discard inside a cue block.
WEBVTT_RE = re.compile(r"^WEBVTT\b")
NOTE_RE = re.compile(r"^NOTE\b")
INT_CUE_RE = re.compile(r"^\d+$")
GUID_CUE_RE = re.compile(r"^[0-9a-fA-F-]+/\d+-\d+$")
TIMESTAMP_RE = re.compile(r"^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->")

# Format C voice tag at the start of a cue, e.g. "<v Jane Doe>Here is what I mean.</v>".
VOICE_OPEN_RE = re.compile(r"^<v\s+(?P<name>[^>]+)>(?P<text>.*)$", re.IGNORECASE)
VOICE_ANY_RE = re.compile(r"</?v[^>]*>", re.IGNORECASE)

# Format B inline speaker prefix, e.g. "Alex Tan: Perfect.".
INLINE_SPEAKER_RE = re.compile(r"^(?P<name>[A-Za-z][\w .'-]{0,38}?):\s+(?P<text>.+)$")


def _looks_like_name(name: str) -> bool:
    """Guard against colons inside ordinary speech being read as a speaker."""
    return len(name.split()) <= 4 and not re.search(r"[.!?]", name)


def parse_cues(raw: str) -> list[tuple[str | None, str]]:
    """Return an ordered list of (speaker_or_None, text) for each cue with content."""
    blocks = re.split(r"\n\s*\n", raw.strip())
    cues: list[tuple[str | None, str]] = []
    last_speaker: str | None = None

    for block in blocks:
        text_lines: list[str] = []
        for line in block.splitlines():
            s = line.strip()
            if not s:
                continue
            if (
                WEBVTT_RE.match(s)
                or NOTE_RE.match(s)
                or TIMESTAMP_RE.match(s)
                or INT_CUE_RE.match(s)
                or GUID_CUE_RE.match(s)
            ):
                continue
            text_lines.append(s)

        if not text_lines:
            continue

        cue_text = re.sub(r"\s+", " ", " ".join(text_lines)).strip()

        speaker: str | None = None
        voice = VOICE_OPEN_RE.match(cue_text)
        if voice:
            speaker = voice.group("name").strip()
            cue_text = voice.group("text")
        cue_text = VOICE_ANY_RE.sub("", cue_text).strip()

        if speaker is None:
            inline = INLINE_SPEAKER_RE.match(cue_text)
            if inline and _looks_like_name(inline.group("name").strip()):
                speaker = inline.group("name").strip()
                cue_text = inline.group("text").strip()

        if speaker is None:
            speaker = last_speaker  # continuation of the previous turn
        else:
            last_speaker = speaker

        cue_text = re.sub(r"\s+", " ", cue_text).strip()
        if cue_text:
            cues.append((speaker, cue_text))

    return cues


def merge_speakers(cues: list[tuple[str | None, str]]) -> list[tuple[str | None, str]]:
    """Merge consecutive cues from the same speaker (and runs of None) into one turn."""
    merged: list[tuple[str | None, str]] = []
    for speaker, text in cues:
        if merged and merged[-1][0] == speaker:
            merged[-1] = (speaker, f"{merged[-1][1]} {text}")
        else:
            merged.append((speaker, text))
    return merged


def build_markdown(
    merged: list[tuple[str | None, str]],
    account: str | None,
    date_str: str,
    source_name: str,
) -> str:
    speakers: list[str] = []
    for sp, _ in merged:
        if sp and sp not in speakers:
            speakers.append(sp)
    has_speakers = bool(speakers)

    out: list[str] = [
        f"# Discovery Transcript — {account or 'Unknown'}",
        "",
        f"- **Date:** {date_str}",
        f"- **Source file:** {source_name}",
        f"- **Speakers:** {', '.join(speakers) if has_speakers else 'not labelled in source'}",
        "",
    ]

    if not merged:
        out.append("> _No transcript content found in source._")
        return "\n".join(out).rstrip() + "\n"

    if not has_speakers:
        out.append("> _No speaker labels in source; cleaned transcript below._")
        out.append("")
        for _, text in merged:
            out.append(text)
            out.append("")
    else:
        for sp, text in merged:
            out.append(f"**{sp or 'Unknown speaker'}:** {text}")
            out.append("")

    return "\n".join(out).rstrip() + "\n"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Convert a .vtt transcript to clean Markdown.")
    parser.add_argument("input", help="path to the .vtt transcript")
    parser.add_argument("--account", default=None, help="account/company label for the header")
    parser.add_argument("--date", default=None, help="meeting date YYYY-MM-DD (default: file mtime)")
    parser.add_argument("--out", default=None, help="write the Markdown to this path (default: stdout only, no file written)")
    args = parser.parse_args(argv)

    src = Path(args.input)
    if not src.is_file():
        print(f"[vtt_to_markdown] input not found: {src}", file=sys.stderr)
        return 1

    raw = src.read_text(encoding="utf-8-sig")  # utf-8-sig swallows the Format A BOM
    merged = merge_speakers(parse_cues(raw))

    date_str = args.date or datetime.fromtimestamp(src.stat().st_mtime).date().isoformat()
    md = build_markdown(merged, args.account, date_str, src.name)

    if args.out:
        out_path = Path(args.out)
        out_path.write_text(md, encoding="utf-8")
        print(f"[vtt_to_markdown] wrote {out_path}", file=sys.stderr)
        return 0

    sys.stdout.write(md)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
