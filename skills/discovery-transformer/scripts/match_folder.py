#!/usr/bin/env python3
"""Match a deal name to a deal sub-folder in the local deals library.

Scans two levels of the deals library — account folders, then their
product- or opportunity-tagged deal sub-folders (e.g. `Acme Corp` -> `Acme Corp - Analytics`) — scores each deal
folder against the requested deal name (fuzzy ratio + word-order-insensitive token
overlap), excludes admin/template folders, resolves where a transcript should be
saved (the `40_meetings_and_demos` sub-folder when present), and prints ranked
candidates as JSON. The skill reads this JSON, confirms with the user, then writes.

Usage:
    python match_folder.py --root "<deals root>" --deal "<deal name>" [--top 3]

Prints JSON to stdout. On a missing root prints {"error":"root_not_found",...} and exits 0.
"""

import argparse
import json
import os
import re
from difflib import SequenceMatcher
from pathlib import Path

# Admin / template / report folders never match a deal name.
ADMIN_PREFIX_RE = re.compile(r"^[_0-9]")
MEETINGS_EXACT = "40_meetings_and_demos"
MEETINGS_FALLBACK_RE = re.compile(r"meeting|demo", re.IGNORECASE)
TOKEN_RE = re.compile(r"[a-z0-9]+")


def is_admin(name: str) -> bool:
    """True for admin/template folders (`_…`, `__…`, `0…`, `10_…`, pure digits)."""
    return bool(ADMIN_PREFIX_RE.match(name))


def iter_subdirs(path: Path):
    """Yield immediate sub-directories, surviving permission errors and online-only sync placeholders."""
    try:
        with os.scandir(path) as entries:
            for entry in entries:
                try:
                    if entry.is_dir():
                        yield Path(entry.path)
                except OSError:
                    continue
    except OSError:
        return


def score(deal: str, name: str) -> float:
    """Blend a character-level ratio with token-overlap so word order doesn't matter."""
    a, b = deal.lower().strip(), name.lower().strip()
    ratio = SequenceMatcher(None, a, b).ratio()
    ta, tb = set(TOKEN_RE.findall(a)), set(TOKEN_RE.findall(b))
    jaccard = len(ta & tb) / len(ta | tb) if (ta | tb) else 0.0
    return round(0.5 * ratio + 0.5 * jaccard, 4)


def resolve_save_target(deal_folder: Path) -> tuple[Path, bool]:
    """Prefer the template meetings folder, then any meeting/demo folder, else the deal folder."""
    subs = list(iter_subdirs(deal_folder))
    for d in subs:
        if d.name.lower() == MEETINGS_EXACT:
            return d, True
    for d in subs:
        if MEETINGS_FALLBACK_RE.search(d.name):
            return d, True
    return deal_folder, False


def build_candidates(root: Path, deal: str) -> list[dict]:
    candidates: list[dict] = []
    for account_dir in iter_subdirs(root):
        if is_admin(account_dir.name):
            continue
        account = account_dir.name

        deal_count = 0
        for deal_dir in iter_subdirs(account_dir):
            if is_admin(deal_dir.name):
                continue
            deal_count += 1
            save_target, is_meetings = resolve_save_target(deal_dir)
            candidates.append(
                {
                    "account": account,
                    "deal_folder": str(deal_dir),
                    "score": score(deal, deal_dir.name),
                    "save_target": str(save_target),
                    "save_target_is_meetings": is_meetings,
                    "tier": "deal",
                }
            )

        # Account-level fallback (slightly penalised so deal folders win ties).
        save_target, is_meetings = resolve_save_target(account_dir)
        candidates.append(
            {
                "account": account,
                "deal_folder": str(account_dir),
                "score": round(score(deal, account) * 0.95, 4),
                "save_target": str(save_target),
                "save_target_is_meetings": is_meetings,
                "tier": "account",
                "deal_count": deal_count,
            }
        )

    candidates.sort(key=lambda c: c["score"], reverse=True)
    return candidates


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Match a deal name to a deal sub-folder.")
    parser.add_argument("--root", required=True, help="deals library root (one value; may contain spaces)")
    parser.add_argument("--deal", required=True, help="deal name to match, e.g. 'Acme Corp Analytics'")
    parser.add_argument("--top", type=int, default=3, help="number of candidates to return (default 3)")
    args = parser.parse_args(argv)

    root = Path(args.root)
    if not root.is_dir():
        print(json.dumps({"error": "root_not_found", "root": str(root)}, ensure_ascii=False))
        return 0

    top = build_candidates(root, args.deal)[: max(1, args.top)]

    ambiguous = False
    if len(top) >= 2 and (top[0]["score"] - top[1]["score"]) < 0.15:
        ambiguous = True
    if not top or top[0]["score"] < 0.34:
        ambiguous = True
    # A bare account name matched the account but not a specific deal — and the
    # account holds several deals, so we can't know which one. Make the user pick.
    if top and top[0].get("tier") == "account" and top[0].get("deal_count", 0) >= 2:
        ambiguous = True

    print(
        json.dumps(
            {"root": str(root), "deal": args.deal, "candidates": top, "ambiguous": ambiguous},
            indent=2,
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
