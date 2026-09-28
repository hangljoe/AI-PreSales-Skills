# Leader Tools

Seven commands for whoever runs the PreSales team, not for individual-contributor SCs. They
follow chapter 22 of *The PreSales Handbook* (PreSales leadership: resource allocation, coaching,
capacity, onboarding, hiring).

## Why these stay out of /presales:guide

`/presales:guide` and the other skills never route an individual contributor here. The underlying
skills (`deal-prequal`, `presales-metrics` in leader mode, `presales-leader`) have no
natural-language triggers for the leader modes, and `deal-prequal` explicitly disables
model-invocation so it never fires by itself. That is a routing choice, not access control: there
is no permission gate, and these tools are listed openly in [[Commands-Reference]] and the
project README. An SC can run them if they want to see the leader's-eye view of their own deal or
career, but the guide only hands them out when someone asks for one by name, and the tools
themselves stay leader-framed (a pipeline-wide resource call, a team scorecard, a hiring kit) even
if an SC opens them directly.

## The seven leader commands

**`/presales:leader:prequal`** runs a readiness sweep across one or many deals before anyone runs
a TFQ. Use it weekly, or whenever a new deal needs a first look, to decide which deals are worth
SC time at all. It reads the MEDDPICC foundation and deal momentum for each deal and returns a
warm three-band call — Ready, A few gaps, or Too early — plus ready-to-send AE follow-up messages
that close the gaps without sounding like an audit. Ready deals hand straight to
`/presales:discovery:tfq`.

**`/presales:leader:metrics`** builds the team KPI scorecard (a wrapper around `presales-metrics`
in leader mode). Run it monthly or quarterly, ahead of a business review or a round of 1:1s. It
produces KPI definitions, formulas, targets and trends across the whole team — demo-to-close
rate, competitive win rate, utilisation and the rest of the handbook's chapter 23 list — with any
distribution across SCs framed as coaching questions, never a ranking.

**`/presales:leader:pipeline-review`** builds the weekly (or bi-weekly) resource-allocation
agenda. Run it on whatever cadence the team actually holds its pipeline sync. It reads deal-folder
files where they exist, produces one board row per deal — account, stage, SC, hours committed,
TFQ/ORC verdict, MAP next date, risk flag — grouped by stage, and closes with exactly three
resource-allocation decisions, each with the evidence behind it, an owner and a date.

**`/presales:leader:one-on-one`** builds one SC's regular 1:1 from their own evidence only. Run it
on the leader's normal 1:1 cadence with that SC. It produces four sections — wins, blockers, one
development goal, one ask of the leader — and never compares the SC's numbers to a peer's.

**`/presales:leader:capacity`** turns quota, close rate and hours-per-deal into a headcount and
forecast range. Run it quarterly, or any time a hiring case needs numbers behind it. It shows the
full calculation chain — per-SC deliverable revenue, headcount needed, quota coverage — as a
range rather than a point estimate, with every input tagged 🟢 given, 🟡 defaulted or 🔴 unknown.

**`/presales:leader:onboarding`** builds a 30-60-90 plan for a new SC. Run it once, at or just
before their start date. It produces a week-by-week plan across three phases — observe and
integrate, practice and reverse-shadow, first solo demo — ending in a mentor-scored gate the new
SC must clear before running a demo unsupervised.

**`/presales:leader:hiring`** builds an SC interview kit. Run it whenever a req opens. It produces
a role scorecard, a demo role-play brief for candidates, a 1–5 scoring rubric with what a strong
and a weak answer look like, and a debrief template that ends in one shared recommendation across
interviewers rather than a single gut call.

## People-data rules

All seven tools touch personal data about employees or candidates, so the same rules apply across
every mode: use first names or SC-A / SC-B by default, and full names only when the leader
explicitly asks; anonymise candidates in anything written (Candidate 1, Candidate 2, and so on);
never rank SCs against each other, in a 1:1 or anywhere else. Outputs from one-on-one, onboarding
and hiring are saved only in the leader's own private folder — never a deal folder, never the
plugin tree, never a shared knowledge base. The only things that belong in a shared knowledge base
are the generic, non-personal templates: the RACI matrix, the 30-60-90 template shape, and the
hiring rubric. A second-brain journal or weekly rollup is the SC's own; these tools use it only
when the SC shares it, never by reading their second-brain folder directly.

## Suggested cadence

A working rhythm, not a mandate — adjust it to how the team actually runs:

- **Weekly:** `/presales:leader:prequal` to keep the pipeline's readiness current, feeding
  straight into `/presales:leader:pipeline-review` the same week.
- **On the leader's normal 1:1 schedule:** `/presales:leader:one-on-one` per SC.
- **Quarterly:** `/presales:leader:metrics` for the team scorecard, and
  `/presales:leader:capacity` to recheck headcount against the current quota and close rate.
- **As-needed:** `/presales:leader:onboarding` at each new SC's start date, and
  `/presales:leader:hiring` whenever a req is open.

See [[Commands-Reference]] for the full command table and [[Connected-Tools]] for what a CRM or
knowledge base adds to these tools specifically.
