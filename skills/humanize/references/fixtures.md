# Golden Fixtures — humanize self-test

Eval corpus for the `humanize` skill. The self-test scans **only** the section
between `## Planted fixtures` and `## Answer key` (the answer key below names
the tells, so scanning the whole file would false-hit its own documentation) —
extract it to a scratch file, then scan it twice — raw, and paragraph-joined
(the joined pass catches tells that straddle a hard-wrapped line, e.g. P5):

```bash
ROOT="${CLAUDE_PLUGIN_ROOT:-.}"            # dev checkout: run from the repo root
FIX="$ROOT/skills/humanize/references/fixtures.md"
scratch="$(mktemp)"
sed -n '/^## Planted fixtures/,/^## Answer key/p' "$FIX" > "$scratch"

# Pass 1 — raw (line-based, as real files usually arrive)
TARGETS=( "$scratch" )                     # run each ai-tells.md one-liner against "${TARGETS[@]}"

# Pass 2 — paragraph-joined, so line-straddling phrases are caught (P5)
joined="$(mktemp)"; awk 'NF{printf "%s ",$0;next}{print ""}' "$scratch" > "$joined"
TARGETS=( "$joined" )                       # re-run the one-liners
```

Run the judgment pass on the extracted section **before** reading the answer
key — the key is the grading sheet, not the input. **Acceptance:** every
answer-key row is flagged — grep rows by the deterministic scan (P5 only on the
joined pass), judgment rows by the rewrite pass — and the control paragraph gets
zero flags of either kind. Report a per-row pass/fail table, naming misses explicitly.

## Planted fixtures

### P1: lexical layer

In today's fast-paced world of B2B sales, teams must delve into an intricate
landscape of regulations. Our platform showcases a holistic approach that
leverages automation to streamline approval workflows and
unlock the full potential of your sales data.

### P2: punctuation layer

The migration ran overnight — nobody was paged. The new schema — designed for
multi-region reads — cut query time in half, and the team — already stretched
thin — appreciated the quiet launch.

### P3: structural layer

This isn't just a reporting tool, it's a strategic command center. It is fast,
flexible, and reliable. Every stakeholder can find what they need, act on what
they find, and share what they learn. The result: fewer meetings and faster
decisions. In conclusion, adopting the platform positions your team for
success.

### P4: puffery and hedges

The archive stands as a testament to the company's rich tapestry of
innovation, and it may potentially, in some cases, offer somewhat useful
insights for auditors. It's worth noting that these records
play a vital role in compliance reviews.

### P5: line-wrap straddle (grep misses it raw; catches it after paragraph-join)

The rollout lets every partner unlock the full
potential of the network without a single migration script.

### Control: clean human-register prose (must produce zero flags)

The export job runs at 02:00 UTC and writes one CSV file per region to the
backup bucket. Each file holds at most 50,000 rows. When a checksum fails, the
job retries twice, then stops and pages whoever is on call. We saw two
failures last month, both caused by an expired service-account key, and fixed
the rotation script the same week.

## Answer key

| # | Planted tell | Paragraph | Layer | Detected by |
|---|--------------|-----------|-------|-------------|
| 1 | "In today's" opener | P1 | lexical | grep |
| 2 | "fast-paced world" | P1 | lexical | grep |
| 3 | "delve into" | P1 | lexical | grep |
| 4 | "intricate" | P1 | lexical | grep |
| 5 | "landscape" (figurative) | P1 | lexical | judgment (word alone too common to grep) |
| 6 | "showcases" | P1 | lexical | grep |
| 7 | "holistic" | P1 | lexical | grep |
| 8 | "leverages" | P1 | lexical | grep |
| 9 | "streamline" | P1 | lexical | grep |
| 10 | "unlock the full potential" | P1 | lexical | grep |
| 11 | em dash ×5 — one single + two paired parentheticals | P2 | punctuation | grep |
| 12 | "isn't just X, it's Y" | P3 | structural | grep |
| 13 | rule-of-three: "fast, flexible, and reliable" | P3 | structural | judgment |
| 14 | rule-of-three: "find / act / share" triad | P3 | structural | judgment |
| 15 | colon-summary: "The result: …" | P3 | structural | judgment |
| 16 | essay conclusion: "In conclusion, …" | P3 | structural/lexical | grep |
| 17 | "stands as a testament to" | P4 | puffery | grep |
| 18 | "rich tapestry" | P4 | puffery | grep |
| 19 | hedge pile: "may potentially, in some cases, … somewhat" | P4 | structural | judgment |
| 20 | "It's worth noting that" | P4 | lexical | grep |
| 21 | "play a vital role in" | P4 | lexical | grep |
| 22 | "unlock the full potential" straddling a line break | P5 | lexical | grep — **only on the paragraph-joined pass** (raw scan misses it) |
| Ctrl | control paragraph | Control | — | must be zero hits |
