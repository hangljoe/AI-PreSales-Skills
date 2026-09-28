# PreSales KPI catalog

Source: The PreSales Handbook ch. 23 (core metrics, advanced KPIs, client-centric, efficiency; the
"collaboration and internal" group is this kit's split of the handbook's client-centric list). Definitions are paraphrased. Formulas and data fields are this kit's
working defaults; adjust them to your CRM. KPIs marked **(kit)** are not in the handbook list and
are offered as optional extensions.

Targets are deliberately left as "set your own". The handbook recommends benchmarking against
industry or competitor data where you have it (ch. 23, continuous improvement). Never invent a
benchmark. If the user has none, use their own trailing average as the baseline.

## Core metrics (ch. 23)

| KPI | What it tells you | Formula | Data needed | Watch for |
|-----|-------------------|---------|-------------|-----------|
| Demo-to-close rate | How often demos turn into signed deals | closed-won deals that had a demo ÷ deals that had a demo (closed in period) | Opportunity with demo date + outcome | Low rate: demo not tied to pains, or poor qualification |
| Time spent on demos | Average demo length | total demo minutes ÷ demos | Meeting durations | Too long = unfocused; too short = key points skipped |
| Number of demos conducted | Volume and interest | count of demos in period | Demo activities | A spike can mean qualification is too lenient |
| Lead response time | Speed from request to first PreSales response | median hours from SC request/lead to first SC touch | Request and first-activity timestamps | Slow response lowers conversion |
| Client feedback score | Quality of the demo as the client saw it | average post-demo survey score | Survey results | Low items point at content or delivery |
| Value of the sales pipeline | Potential revenue PreSales is supporting | sum of open opportunity value with SC assigned | Open opps + amount | Use it for prioritising SC time |
| PreSales team utilisation | Share of time on core PreSales work | core-activity hours ÷ total logged hours | Time tracking or calendar categories | High admin share = process to streamline |
| PreSales touchpoints | Interactions before a lead converts or drops | average SC activities per closed opportunity | Activities per opp | Over- or under-engagement |
| Follow-up effectiveness | Follow-ups that move the deal forward | follow-ups followed by a stage advance within N days ÷ follow-ups | Follow-up activities + stage history | Timing and relevance of follow-ups |

## Advanced KPIs (ch. 23)

| KPI | Formula | Watch for |
|-----|---------|-----------|
| Customisation requests | count of requests for tailored demos ÷ demos | High = generic demos, or a product gap |
| Technical issue count during demos | glitches logged ÷ demos | Environment robustness, prep |
| Frequency of follow-up questions | post-demo clarifying questions ÷ demos | Initial presentation lacked clarity |
| Competitive win rate | wins ÷ closed deals where competitor X was present (per competitor) | Market position vs each rival |
| Objection handling success | objections resolved ÷ objections logged | Technical and product objections |

## Client-centric (ch. 23)

| KPI | Formula |
|-----|---------|
| Post-demo NPS | % promoters − % detractors on "how likely to recommend", asked after the demo |
| Client satisfaction | average satisfaction score right after a demo or interaction |

## Collaboration and internal (ch. 23, client-centric list)

| KPI | Formula |
|-----|---------|
| Sales–PreSales alignment | joint account/deal syncs per month (or per active opp) |
| Training and development hours | learning hours per SC per month (ties to the 70/30 rule, §2.6 and §18.4) |
| Tool and software utilisation | active use of each PreSales tool ÷ licences, or sessions per SC |

## Efficiency (ch. 23)

| KPI | Formula |
|-----|---------|
| Cost per demo | (tool cost + personnel time × loaded rate + other costs) ÷ demos |
| Demos per PreSales rep | demos ÷ SCs, per period |
| Time to prepare | average prep hours per demo |

## Optional extensions (kit)

| KPI | Formula | Why offered |
|-----|---------|-------------|
| Technical win rate **(kit)** | deals where the SC declared technical win ÷ deals that reached technical evaluation | Separates PreSales outcome from commercial outcome |
| Win rate **(kit)** | closed-won ÷ closed (won + lost + no decision) | Baseline for demo-to-close and competitive win rate |

## Default starter sets

- **Individual SC:** demo-to-close rate, competitive win rate, time to prepare, follow-up
  effectiveness, client feedback score, training hours. Add technical win rate if the team logs it.
- **Leader (ch. 22):** demo-to-close rate, competitive win rate, pipeline value supported,
  utilisation, lead response time, demos per rep, training hours, cost per demo.

## Minimum CSV columns

`opportunity_id, sc_owner, stage, outcome (won/lost/no_decision/open), amount, close_date,
demo_date, competitor, sc_request_date, first_sc_activity_date`. Optional:
`demo_minutes, prep_hours, feedback_score, followups, technical_win (y/n), training_hours`.
Missing columns switch the affected KPIs to "not measurable" rather than estimated.
