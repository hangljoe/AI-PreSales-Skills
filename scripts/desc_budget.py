#!/usr/bin/env python3
"""Skill frontmatter auditor for the `presales` plugin.

Two jobs, deliberately in one tool:

1.  **Description budget** — sums every model-visible skill description and reports the
    catalog total. Routing is description-only, so this number is what the model actually
    carries. The total is reported, not gated: only the per-skill limit is documented.

2.  **Frontmatter integrity** — the three documented silent-invisibility killers:
    over-long descriptions, block-scalar (`>` / `|`) descriptions, and CRLF line endings.
    Each makes a skill vanish with no error.

Stdlib only. No third-party imports, no network, no writes.

    python3 scripts/desc_budget.py              # audit the tree
    python3 scripts/desc_budget.py --table      # + per-skill table
    python3 scripts/desc_budget.py --self-test  # embedded fixtures through the real functions

Exit codes: 0 clean · 1 ERROR found · 2 usage error.
"""

from __future__ import annotations

import argparse
import shutil
import sys
import tempfile
from pathlib import Path

# ---------------------------------------------------------------------------
# Thresholds
# ---------------------------------------------------------------------------

# Per-skill hard limit. Documented failure: the loader silently drops a skill whose
# description exceeds 1024 chars (osd-scoper 1072, discovery-transformer 1052,
# osd-architect 1030 were all invisible until trimmed). We gate below it, because
# emoji cost more than one char in UTF-8 and the limit is measured in bytes.
PER_SKILL_ERROR = 1024
PER_SKILL_WARN = 900

# Catalog-wide total. NOT a verified threshold — see Stage 3 of the harvest plan.
# The 21_432 figure comes from a single unverified observation in a different repo,
# whose own author flagged it as unmeasured. Reported, never gated, until Stage 3
# returns a verdict. Do not promote this to an ERROR without that measurement.
TOTAL_REFERENCE = 21_432
TOTAL_ASPIRATION = 16_000


class Finding:
    __slots__ = ("level", "skill", "message")

    def __init__(self, level: str, skill: str, message: str) -> None:
        self.level = level  # "ERROR" | "WARN"
        self.skill = skill
        self.message = message

    def __repr__(self) -> str:  # pragma: no cover - debugging aid
        return f"{self.level} {self.skill}: {self.message}"


class Skill:
    __slots__ = ("folder", "name", "description", "model_visible", "findings", "has_frontmatter")

    def __init__(self, folder: str) -> None:
        self.folder = folder
        self.name = ""
        self.description = ""
        self.model_visible = True
        self.findings: list[Finding] = []
        self.has_frontmatter = False

    @property
    def length(self) -> int:
        return len(self.description)


# ---------------------------------------------------------------------------
# Parsing
# ---------------------------------------------------------------------------


def split_frontmatter(raw: str) -> str | None:
    """Return the frontmatter block, or None when absent/unterminated.

    Operates on the raw text so CRLF is still detectable by the caller.
    """
    text = raw.replace("\r\n", "\n")
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---", 3)
    if end == -1:
        return None
    return text[4 : end + 1]


def parse_scalar(block: str, key: str) -> tuple[str, bool]:
    """Extract a top-level frontmatter scalar.

    Returns ``(value, is_block_scalar)``. Handles single-line values and YAML
    continuation lines; detects `>` / `|` block scalars, which parse correctly in
    Claude Code but hit a known claude.ai bug and make the skill vanish from chat.
    """
    lines = block.split("\n")
    prefix = f"{key}:"
    for i, line in enumerate(lines):
        if not line.startswith(prefix):
            continue
        first = line[len(prefix) :].strip()
        is_block = first.startswith(">") or first.startswith("|")
        parts: list[str] = []
        if not is_block and first:
            parts.append(first)
        # Continuation: subsequent indented lines belong to this key.
        for cont in lines[i + 1 :]:
            if not cont.strip():
                break
            if not cont.startswith((" ", "\t")):
                break
            parts.append(cont.strip())
        value = " ".join(parts).strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        return value, is_block
    return "", False


def scan_skill(skill_md: Path, folder: str) -> Skill:
    """Audit one SKILL.md. Never raises on malformed input — reports instead."""
    skill = Skill(folder)
    # read_bytes, not read_text: read_text applies universal-newline translation and
    # silently rewrites CRLF to LF, which would make the CRLF check below unfireable.
    raw = skill_md.read_bytes().decode("utf-8", errors="replace")

    if "\r\n" in raw:
        skill.findings.append(
            Finding("ERROR", folder, "CRLF line endings — breaks frontmatter parsing on claude.ai")
        )

    block = split_frontmatter(raw)
    if block is None:
        skill.findings.append(Finding("ERROR", folder, "missing or unterminated YAML frontmatter"))
        return skill
    skill.has_frontmatter = True

    skill.name, _ = parse_scalar(block, "name")
    description, is_block = parse_scalar(block, "description")
    skill.description = description
    disable, _ = parse_scalar(block, "disable-model-invocation")
    skill.model_visible = disable.strip().lower() != "true"

    if not skill.name:
        skill.findings.append(Finding("ERROR", folder, "missing `name`"))
    elif skill.name != folder:
        skill.findings.append(
            Finding("ERROR", folder, f"`name: {skill.name}` does not match folder `{folder}`")
        )

    if not description:
        skill.findings.append(Finding("ERROR", folder, "missing `description` — skill cannot route"))
    if is_block:
        skill.findings.append(
            Finding("ERROR", folder, "block-scalar description (`>` / `|`) — invisible on claude.ai")
        )

    length = len(description)
    if length > PER_SKILL_ERROR:
        skill.findings.append(
            Finding("ERROR", folder, f"description {length} chars, over the {PER_SKILL_ERROR} limit")
        )
    elif length > PER_SKILL_WARN:
        skill.findings.append(
            Finding("WARN", folder, f"description {length} chars, near the {PER_SKILL_ERROR} limit")
        )

    for key in ("version", "last_updated"):
        value, _ = parse_scalar(block, key)
        if not value:
            skill.findings.append(Finding("WARN", folder, f"missing `{key}`"))

    return skill


def collect(skills_root: Path) -> tuple[list[Skill], list[Finding]]:
    """Scan every skill directory. Directories without a SKILL.md are reported."""
    skills: list[Skill] = []
    orphans: list[Finding] = []
    for directory in sorted(p for p in skills_root.iterdir() if p.is_dir()):
        skill_md = directory / "SKILL.md"
        if not skill_md.is_file():
            orphans.append(
                Finding("ERROR", directory.name, "directory has no SKILL.md — invisible to the plugin")
            )
            continue
        skills.append(scan_skill(skill_md, directory.name))
    return skills, orphans


# ---------------------------------------------------------------------------
# Reporting
# ---------------------------------------------------------------------------


def report(skills_root: Path, show_table: bool = False) -> int:
    skills, orphans = collect(skills_root)
    visible = [s for s in skills if s.model_visible and s.description]
    hidden = [s for s in skills if not s.model_visible]
    total = sum(s.length for s in visible)

    print(f"Skills scanned         {len(skills)}")
    print(f"Model-visible          {len(visible)}")
    if hidden:
        print(f"Exempt (disabled)      {len(hidden)}  ({', '.join(s.folder for s in hidden)})")
    if visible:
        print(f"Catalog total          {total:,} chars   (avg {total // len(visible)})")
    print(f"Reference point        {TOTAL_REFERENCE:,}  — UNVERIFIED, see harvest plan Stage 3")
    print(f"Aspiration             {TOTAL_ASPIRATION:,}")

    if show_table and visible:
        print("\n  chars  skill")
        print("  -----  " + "-" * 40)
        for s in sorted(visible, key=lambda x: -x.length):
            flag = "!" if s.length > PER_SKILL_ERROR else ("~" if s.length > PER_SKILL_WARN else " ")
            print(f"  {s.length:5d}{flag} {s.folder}")

    findings = orphans + [f for s in skills for f in s.findings]
    errors = [f for f in findings if f.level == "ERROR"]
    warns = [f for f in findings if f.level == "WARN"]

    if findings:
        print()
        for f in sorted(findings, key=lambda x: (x.level != "ERROR", x.skill)):
            print(f"  {f.level:5s} {f.skill}: {f.message}")

    print(f"\n{len(errors)} error(s), {len(warns)} warning(s)")
    return 1 if errors else 0


# ---------------------------------------------------------------------------
# Self-test — fixtures driven through the real entry functions
# ---------------------------------------------------------------------------


def _fixture(root: Path, folder: str, body: str, newline: str = "\n") -> None:
    d = root / folder
    d.mkdir(parents=True, exist_ok=True)
    (d / "SKILL.md").write_bytes(body.replace("\n", newline).encode("utf-8"))


def run_self_test() -> int:
    tmp = Path(tempfile.mkdtemp(prefix="desc-budget-selftest-"))
    failures: list[str] = []

    def check(label: str, condition: bool) -> None:
        if condition:
            print(f"  pass  {label}")
        else:
            print(f"  FAIL  {label}")
            failures.append(label)

    try:
        root = tmp / "skills"
        root.mkdir()

        _fixture(root, "good", '---\nname: good\nversion: "1.0"\nlast_updated: 2026-07-29\n'
                               'description: "A clean skill. Use on \\"do the thing\\"."\n---\n\nBody.\n')
        _fixture(root, "name-mismatch", '---\nname: wrong-name\nversion: "1.0"\n'
                                        'last_updated: 2026-07-29\ndescription: "x"\n---\n')
        _fixture(root, "block-scalar", '---\nname: block-scalar\nversion: "1.0"\n'
                                       'last_updated: 2026-07-29\ndescription: >\n  folded text\n---\n')
        _fixture(root, "too-long", f'---\nname: too-long\nversion: "1.0"\nlast_updated: 2026-07-29\n'
                                   f'description: "{"x" * (PER_SKILL_ERROR + 5)}"\n---\n')
        _fixture(root, "crlf", '---\nname: crlf\nversion: "1.0"\nlast_updated: 2026-07-29\n'
                               'description: "y"\n---\n', newline="\r\n")
        _fixture(root, "no-frontmatter", "# Just a heading\n")
        _fixture(root, "exempt", '---\nname: exempt\nversion: "1.0"\nlast_updated: 2026-07-29\n'
                                 'description: "internal only"\ndisable-model-invocation: true\n---\n')
        _fixture(root, "no-meta", '---\nname: no-meta\ndescription: "missing version keys"\n---\n')
        (root / "orphan-dir").mkdir()

        skills, orphans = collect(root)
        by_name = {s.folder: s for s in skills}

        def has(folder: str, level: str, needle: str) -> bool:
            return any(
                f.level == level and needle in f.message for f in by_name[folder].findings
            )

        check("clean skill yields no findings", not by_name["good"].findings)
        check("clean description parses exactly", by_name["good"].length == 39)
        check("name/folder mismatch is an ERROR", has("name-mismatch", "ERROR", "does not match folder"))
        check("block scalar is an ERROR", has("block-scalar", "ERROR", "block-scalar"))
        check("over-limit description is an ERROR", has("too-long", "ERROR", "over the"))
        check("CRLF is an ERROR", has("crlf", "ERROR", "CRLF"))
        check("missing frontmatter is an ERROR", has("no-frontmatter", "ERROR", "frontmatter"))
        check("missing version/last_updated WARNs", has("no-meta", "WARN", "missing `version`"))
        check("disable-model-invocation exempts", by_name["exempt"].model_visible is False)
        check("directory without SKILL.md is an ERROR", len(orphans) == 1 and orphans[0].skill == "orphan-dir")

        total = sum(s.length for s in skills if s.model_visible and s.description)
        check("exempt skill excluded from total", "internal only" not in [s.description for s in skills if s.model_visible])
        check("total is a positive int", isinstance(total, int) and total > 0)

        # Parser units — the cases that silently corrupt a sweep.
        v, blk = parse_scalar('description: "quoted"\n', "description")
        check("quotes stripped", v == "quoted" and not blk)
        v, blk = parse_scalar("description: >\n  folded\n", "description")
        check("block scalar flagged, body not counted as value", blk and v == "folded")
        v, _ = parse_scalar("description: one\n  two\n", "description")
        check("continuation lines joined", v == "one two")
        v, _ = parse_scalar("name: a\ndescription: b\n", "missing")
        check("absent key returns empty", v == "")
        check("unterminated frontmatter returns None", split_frontmatter("---\nname: x\n") is None)
        check("CRLF frontmatter still parses", split_frontmatter("---\r\nname: x\r\n---\r\n") is not None)

        rc = report(root)
        check("report exits non-zero when errors exist", rc == 1)

        clean_root = tmp / "clean"
        clean_root.mkdir()
        _fixture(clean_root, "only-good", '---\nname: only-good\nversion: "1.0"\n'
                                          'last_updated: 2026-07-29\ndescription: "fine"\n---\n')
        check("report exits zero on a clean tree", report(clean_root) == 0)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    print(f"\nself-test: {'FAILED' if failures else 'passed'} "
          f"({len(failures)} failure(s))")
    return 1 if failures else 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--table", action="store_true", help="print the per-skill table")
    ap.add_argument("--self-test", action="store_true", help="run embedded fixtures and exit")
    ap.add_argument("--root", type=Path, default=None, help="repo root (default: parent of this script)")
    args = ap.parse_args()

    if args.self_test:
        return run_self_test()

    repo = args.root or Path(__file__).resolve().parent.parent
    skills_root = repo / "skills"
    if not skills_root.is_dir():
        print(f"error: no skills/ directory under {repo}", file=sys.stderr)
        return 2
    return report(skills_root, show_table=args.table)


if __name__ == "__main__":
    raise SystemExit(main())
