# AI-Tells Rulebook

The catalogue the `humanize` skill executes and applies. Three layers: lexical
(grep-detectable words/phrases), punctuation (grep-detectable), structural
(judgment — before/after rewrites).

**Sources** (the list is compiled from published catalogues, not invented):

- Kobak, González-Márquez, Horvát & Lause, *Delving into LLM-assisted writing
  in biomedical publications through excess vocabulary*, **Science Advances**
  2025 (sciadv.adt3813) — the excess-vocabulary study behind the lexical layer.
- Wikipedia, **"Signs of AI writing"** (WikiProject AI Cleanup) — phrase
  catalogue, em-dash observation, and the structural-pattern inventory.
- Liang et al. 2023 (PMC10382961) — detector unreliability; grounds the
  skill's honesty section, not a tell source.

**Versioning:** markers vary by model and domain (arXiv 2606.04177) — this list
describes the models observed up to its review date and is expected to evolve.
**Last reviewed: 2026-07-02.** When updating: edit the tables *and* the grep
block together, then run the skill's self-test against `fixtures.md`.

---

## The grep one-liners (run these, don't paraphrase them)

```bash
# TARGETS = a bash array, one quoted element per prose file under review —
#   e.g. TARGETS=( "draft.txt" )  or  TARGETS=( "proposal.md" "Acme Q3 Draft.md" )
#   Pasted text: save it to a scratch file first (see SKILL.md step 1).
# An array (not an unquoted scalar) keeps filenames with spaces or glob
# characters intact. Never scan the presales plugin's own commands/docs unless
# the user explicitly targets them — they use em dashes as a house convention.
# SECURITY: only read-only `grep` / `sed -n` commands belong in this block.
# Any change to it needs a careful maintainer review before merge (this block is
# copied and run verbatim by the skill).
# No `exit` anywhere: this block may run in the user's interactive shell, and
# `exit` would close it. An empty TARGETS just prints a hint and skips the scan.
if [ "${#TARGETS[@]}" -eq 0 ]; then
  echo 'set TARGETS=( file1 file2 … ) first' >&2
else

# Punctuation layer — em dash (U+2014)
grep -n -- '—' "${TARGETS[@]}"

# Lexical layer — stock AI vocabulary and phrases (case-insensitive)
grep -niE -- 'delv(e|es|ing)|pivotal|intricate|showcas(e|es|ing)|underscor(e|es|ing)|boast(s|ing)?\b|meticulous|tapestry|testament to|seamless|streamlin(e|ing)|leverag(e|es|ing)|foster(s|ing)?\b|elevat(e|es|ing)|embark(s|ed|ing)?|unleash|harness(es|ing)? the|holistic|multifaceted|game.?chang(er|ing)|treasure trove|beacon of|bustling|vibrant|ever.evolving|fast.paced (world|environment)|deep dive|dive (in)?to the world|navigat(e|ing) the (complexit|landscape)|unlock(s|ing)? the (full )?potential|(vital|crucial|key) role in|in today.s|it.s (important|worth) (to note|noting)|in conclusion|in summary,|at the end of the day' "${TARGETS[@]}"

# Structural layer, grep-detectable subset — "not just X, but/it's Y"
grep -niE -- "(isn.t|not) (just|only|merely) [^.]{3,80}(,? (but|it.s)|; it.s)" "${TARGETS[@]}"
fi
```

**Line-wrap caveat:** the greps are line-based. In hard-wrapped markdown a
multi-word phrase ("unlock the full potential") can straddle a line break and
escape the scan — unwrap first (`fold -s -w 10000`, or scan paragraph-joined
text) when the source is wrapped, or rely on the judgment pass as the backstop.

Every hit is a *candidate*, not an automatic delete — some words are legitimate
in context (a robot can genuinely "boast a titanium frame" in a spec sheet).
List the hit, judge it, and either rewrite or record why it stays.

## Lexical layer — words/phrases and replacements

Rows marked *(judgment-only)* are not in the grep block — the bare word is too
common to grep without noise; catch them in the rewrite pass.

| Tell | Replace with |
|------|--------------|
| delve (into) | look at, dig into, examine — or just start saying the thing |
| pivotal | important — or name the consequence instead |
| intricate | detailed, involved — or describe the actual complexity |
| showcase | show |
| realm *(judgment-only)* | area, field — often deletable |
| underscore | show, confirm |
| boast(s) | has, offers |
| meticulous(ly) | careful(ly) — or cut |
| crucial / vital role | say what breaks without it |
| tapestry / rich tapestry | delete; name the actual parts |
| testament to / stands as a testament | evidence of — or state the fact plainly |
| landscape (figurative) *(judgment-only)* | market, field, situation |
| leverage (verb) | use |
| foster | build, encourage |
| seamless(ly) | name the absent friction ("no re-login needed") |
| streamline | shorten, simplify — say what got removed |
| elevate | improve — or the concrete effect |
| embark on | start |
| unleash / harness | use, apply |
| holistic | complete — or list what's covered |
| multifaceted / nuanced *(nuanced: judgment-only)* | delete; show the facets instead |
| game-changer / game-changing | say what changes, measurably |
| treasure trove | a lot of; N of |
| beacon of | delete |
| bustling / vibrant | concrete detail ("40 stalls", "open till 2am") |
| ever-evolving / fast-paced world | delete the whole clause |
| deep dive / dive into the world of | detailed look; or just begin |
| navigate the complexities of | deal with, handle |
| unlock the (full) potential | say the specific gain |
| in today's … | delete the throat-clearing; start with the point |
| it's important/worth noting that | delete; the sentence survives without it |
| in conclusion / in summary | delete; end on the last real point |
| at the end of the day | delete |

## Punctuation layer — the em dash

LLMs place em dashes where human writers use commas, parentheses, or a full
stop (Wikipedia catalogue). One em dash per page of prose is a style choice;
several per paragraph is a tell.

| Before | After |
|--------|-------|
| The report — which took three weeks — landed flat. | The report, which took three weeks, landed flat. |
| We shipped it early — nobody noticed. | We shipped it early. Nobody noticed. |
| The fix — a one-line change — closed the ticket. | The fix (a one-line change) closed the ticket. |

## Structural layer — judgment rewrites

**Ground rule for every rewrite: the replacement fact must come from the
source text or the user.** If you don't have one, delete the puffery or ask —
never invent numbers, durations, or specifics. The concrete figures in the
"After" examples below ("under a second", "40s instead of 10s", "40 stalls")
are illustrative placeholders, not templates to emit.

**Not just X, but Y** (also "isn't just X — it's Y")
- Before: *This isn't just a dashboard, it's a command center for your whole team.*
- After: *The dashboard shows every team member's open work on one screen.*

**Rule-of-three stacking** — triads of adjectives/clauses used as filler rhythm.
- Before: *The new flow is fast, flexible, and reliable.*
- After: *The new flow loads in under a second and hasn't failed in a month of use.*
- Keep a triad only when all three items carry distinct, checkable content.

**Hedge piles** — stacked qualifiers that cancel the claim.
- Before: *This may potentially, in some cases, lead to somewhat slower builds.*
- After: *Builds get slower when the cache is cold — about 40s instead of 10s.*
- One honest qualifier maximum; better, replace the hedge with the condition.

**Essay-style conclusion / section summary** — a closing paragraph that restates
what was just said ("In conclusion…", "Overall, …", "By following these steps…").
- Rewrite: delete it. End on the last substantive point.

**Colon-summary ending** — "The result: fewer errors." / "The takeaway: X."
- Before: *We rewrote the parser. The result: fewer errors and happier users.*
- After: *We rewrote the parser and error reports dropped by half.*

**Promotional puffery** — "stands as a testament", "rich tapestry", "plays a
vital role", "a beacon of".
- Rewrite: replace with one verifiable fact *taken from the source text or the
  user*, or delete. Puffery carries no information; a real number or named
  example does — an invented one is worse than the puffery.

**Uniform sentence rhythm** — every sentence 15–25 words, same
subject-verb-object shape, one idea each. No single grep catches it; read the
paragraph aloud.
- Rewrite: merge two short sentences, split a long one, front-load one sentence
  with a subordinate clause. Aim for visible variance, not a formula.
