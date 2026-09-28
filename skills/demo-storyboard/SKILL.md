---
name: demo-storyboard
version: "1.5"
last_updated: 2026-09-28
description: "Builds a Tell-Show-Tell demo storyboard for any B2B product: first-person Limbic persona narration, Pain-Capability-Value (PCV) logic, one value module per confirmed customer pain, Picture Pitch image-sequence opening, run order with roles and breaks, and Summary Value Close. Stops at the storyboard. Reads product anchors and discovery from your deal folder or asks. Use on \"demo prep\", \"demo storyboard\", \"structure the demo\", \"how should I demo this\", \"build a demo flow\". Siblings: /presales:demo:script (verbatim script from the storyboard), demo-dryrun-coach (rehearse it), video-demo-creator (recorded videos). SKIP for rehearsing an existing storyboard."
triggers:
  - "demo prep"
  - "build a demo flow"
  - "Tell-Show-Tell storyboard"
  - "structure the demo"
  - "how should I demo this"
  - "demo storyboard"
  - "prepare a demo"
---

# Demo Storyboard

Builds a modular, outcome-first demo using Tell-Show-Tell, the PCV (Pain-Capability-Value) loop, and Limbic Persona-Based Selling — for whatever product you sell. One value module per customer pain. No feature tours.

**Critical rule:** Every SHOW section is narrated in FIRST PERSON as the persona. "I am Sarah. I open the approvals dashboard. I see my queue. I click Run." NEVER say "you can", "you would", or "you should". The SC steps into the role.

---

## Connected Tools

| Tool | What it does for you |
|------|---------------------|
| **CRM** (e.g. Salesforce, HubSpot) | Confirmed pains and stakeholders to anchor the persona and the PCV modules |
| **Knowledge base** (e.g. Confluence, Notion) | Approved demo scripts and prior storyboards to reuse |

No connections? Paste the discovery summary.

---

## Build the demo anchors first

This skill ships no product content. Before building any module, assemble the **demo anchors** for this deal from two sources: **your product** — ask the SC, or read it from the deal folder if present (e.g. `04_pain-to-value.md`, a product/capability list, prior storyboards) — for the product name and modules in scope, the capabilities that address the customer's pains (the "C" in PCV), sourced proof points (reference-customer metrics, benchmarks, analyst data), and demo environment notes (pre-loaded data, sample files, known rough edges); and **the customer's discovery** — the discovery summary / OSD / discovery notes (e.g. `02_discovery-notes.md`) — for pains in the customer's own words, stated metrics, stakeholders, and the compelling event.

From these, derive the **persona library** (named first-person characters built from the real people and roles in discovery, Step 2), **value anchors** (metric claims tagged 🟢 customer-stated, 🟡 your proof point, 🔴 not yet quantified, Step 4), and **Picture-Pitch image ideas** (current-state visuals drawn from how the customer described their day, Step 3).

If the SC gives no proof points, do not invent metrics. Build the value TELL from the customer's own numbers, and mark gaps 🔴 Unknown with a question to close them.

---

## Step 1 — Intake

Collect (ask if not provided, or read from the deal folder): the discovery summary or pains list; your product and the module(s)/workflow(s) to demo *(required — no product content is assumed)*; capabilities and proof points for each pain; the primary persona in the room (name, title, company — drives the Limbic character); the demo type (see below); time available (typical 30 / 45 / 60 min); what they've already seen (prior demo, competitor demo); and the compelling event (regulatory deadline, audit, product launch — drives urgency).

**Demo type guidance:**
- **Look & Feel** — first meeting, broad audience, 2-3 modules maximum, emotional impression counts as much as features
- **Deep Dive** — technical evaluators, 4-6 modules, show integration depth, edge cases, config options
- **Q&A Session** — customer drives agenda; have all modules ready but follow their questions
- **RFX Demo** — requirement-mapped, every module traces to a numbered RFP line item

---

## Step 2 — Create the Limbic Persona

Before building any module, define the first-person character for the SHOW narration. Build the persona from the discovery details for the actual person in the room.

```
DEMO PERSONA
Name: [e.g. Sarah]
Title: [persona's role at {company}]
Department: [their function]
Their stated pain: [exact words from discovery call]
What a great day looks like for them: [the outcome they want]
What a bad day looks like for them: [the pain they live with today]

In the demo, I (the SC) become the persona. I say:
  "I am [name]. I run [function] for [company]."
  "I have [N] markets / sites / partners, [X] people, and [Y] volume a month."
  "My problem today is [pain in their own words]."
  "Watch what I do every Monday morning..."
```

**Filled example:** same shape, first-person, e.g. "I am Sarah, I run accounts payable for [company]." — see template above.

---

## Step 3 — Picture Pitch (the opening image sequence)

The Picture Pitch anchors the demo in their world before any product is shown. It is **not** one slide. It is a rapid **sequence of images**, each on screen for only **5–10 seconds**, cycled in sync with what you say (handbook 11.5.1). The images do not carry text or detail. Each one is a symbol that makes one spoken line stick, so the audience listens to you instead of reading slides.

**Shape used in this kit:** 5–10 images, one spoken line per image. The sequence itself runs about 1–2 minutes. It opens a longer framing segment: in a Deep Dive the handbook aims the whole opening (Picture Pitch plus overall challenges, solution and benefits) at roughly the first ten minutes of focused attention (11.3.2). For a Look & Feel, keep the opening to 3–5 minutes.

**Choosing images (11.5.1):** pick symbols, not screenshots — a heavy safe for "security", a globe criss-crossed with lines for "connectivity". Pop-culture references work when the room knows them (a boxing underdog for the champion, a famous crack team for your experts); use only images you are licensed to use. Build the arc from discovery: current-state pain → what it costs them → turning point → future state → hand-over to the persona.

```
PICTURE PITCH — [Account] | [N] images | ~[total] seconds

#  | Image (what is on screen)        | Why this image          | Spoken line (one sentence, said while it shows) | Sec
---|----------------------------------|-------------------------|--------------------------------------------------|----
1  | [symbol of today's pain]         | [emotion / association] | "[current state, customer's own words]"          | 5-10
2  | [symbol of the cost / consequence]| [...]                  | "[what that costs them — 🟢 if they said it]"     | 5-10
3  | [...]                            | [...]                   | "[...]"                                          | 5-10
…  | [turning-point image]            | [...]                   | "What if this could look like [future state]?"   | 5-10
N  | [future-state image]             | [...]                   | "Let me show you exactly that."                  | 5-10

→ Transition line: "[Persona] — that's me right now — opens [product] on a Monday morning..."
```

Rehearse the sequence until each line lands on its image; the timing is the technique (11.5.1 "The Journey to Mastery").

---

## Step 4 — Map pains to value modules (PCV Loop)

For each confirmed or inferred pain from discovery, build one module:

| Pain (from discovery) | Capability (what product does it) | Value (measurable outcome) |
|----------------------|----------------------------------|---------------------------|
| [paste pain 1] | [product feature / workflow] | [time, cost, risk reduction] |
| [paste pain 2] | [product feature / workflow] | [time, cost, risk reduction] |

**Rules:** one Tell-Show-Tell runs **10 minutes at most** (kit) — if a pain needs longer, split it into two scenes, each with its own Tell-Show-Tell. Maximum 3 modules per 30 minutes of demo time (one per confirmed pain). Order by most compelling pain first, not product feature order. Each module must stand alone: pain → capability → value, complete in itself. Never demo a capability without a pain that motivated it.

**Value anchors:** use the proof points the SC supplied (see "Build the demo anchors first"). Tag every anchor 🟡 Inferred until confirmed with this specific customer; a metric the customer stated themselves is 🟢. Example anchors (illustrative — replace with your own sourced proof points): up to [X]% reduction in manual [process] effort (source: [reference customer / benchmark]); [cycle time] cut from [days] to [hours] for [workflow]; [error / exception rate] reduced by [X]%; full audit trail on every [decision / transaction].

---

## Step 5 — Build the storyboard (Tell-Show-Tell per module)

For each module, complete this template (the worked example below is illustrative — mirror its structure with your own product and the customer's pains):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MODULE [N]: [Pain name]
Time allocation: [X] minutes (≤ 10 per Tell-Show-Tell)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TELL (the need) — 60 seconds
"[Persona] mentioned in our last call that [pain statement in their exact words].
That costs [metric or consequence]. This next module addresses that directly."

SHOW (the capability) — [X-2] minutes
⚠️ FIRST PERSON ONLY. SC narrates AS the persona, not about them.

"I am [persona]. It's Monday morning. I log into [product]."
"I have [N] items waiting in my queue."
"Normally this takes my team [time]. Watch what happens when I click Run."
→ [action 1 — what the persona does, first person]
→ [action 2 — what the persona sees, react as they would]
→ [action 3 — the moment of delight — pause here, let it land]
"I just did that in [seconds] — with [proof point] and a full audit trail. Not [old time]. [new time]."

TELL (the value) — 60 seconds
"For [persona]'s team running [volume], that's [X] returned to higher-value work.
🟡 Inferred — [your proof-point source]; not yet confirmed for this account.
And [secondary benefit — risk, compliance, defensibility]."

Pause. 10 seconds of silence.
Ask: "Does that match the problem [persona] — and your team — are living with today?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Filled example:** same shape, first-person, e.g. TELL "Sarah's team spends three days approving an invoice" → SHOW "I am Sarah, I click Run..." → TELL "That's days returned to higher-value work." — see template above.

**The deliberate pause after each second TELL is mandatory.** Silence after "does that match..." is fine. It is not awkward. Wait for them.

---

## Step 6 — Build the full demo run order

**Roles (handbook 11.5, "Setup with sales").** The SC presents and plays the persona. The AE moderates: keeps time, fields and parks questions, drops in a customer success story when energy dips, and reads the room (champions, decision-makers, sceptics). Agree these roles and hand signals before the session.

**Pacing (handbook 11.3.2).** In any session over about 45 minutes, announce the break schedule in the ground rules and plan a 5–10 minute break every 40–60 minutes. Place breaks between scenes, never inside a Tell-Show-Tell.

```
DEMO OUTLINE — [Account] | [Date] | [Time available]
Product: [your product]
Modules / workflows: [list]
Persona: [primary — name + title]
Demo type: [Look & Feel / Deep Dive / Q&A / RFX]
Roles: SC = presenter + persona | AE = moderator (time, questions, stories) | [others]

INTRO + GROUND RULES (2-3 min)
→ Team intros, when to ask questions, break schedule, agenda for the day.

PICTURE PITCH (sequence of 5-10 images, 5-10 s each; opening segment 3-5 min
Look & Feel, up to ~10 min Deep Dive)
→ One spoken line per image. Current-state pain → future state. Transition into first-person character.

SITUATION SLIDE (optional — 2 min, show before demo modules if audience is unfamiliar)
"Before I show you the product, let me confirm my understanding of where you are today..."
[one slide: current state → pain → proposed outcome]

MODULES 1–3: [Name] (X min each per confirmed pain, most compelling first)
  → repeat TELL → SHOW → TELL → pause → check per module
  [BREAK 5-10 min after ~40-60 min elapsed — between modules, never inside a
   Tell-Show-Tell — announced in the ground rules]

SUMMARY VALUE CLOSE (5 min)
"We've shown you three things today. Let me summarise what [persona] — and your team —
would get out of this:
  1. [Module 1 outcome in one line]
  2. [Module 2 outcome in one line]
  3. [Module 3 outcome in one line]
On a scale of 1-10, how well did that address what you described as your biggest challenges?"
→ If <8: "What would make it closer to a 10?"
→ If 8+: "What would need to be true for this to become a priority for you?"
Next step offer: [specific — POC, OSD session, exec briefing] — ask for commitment, not "we'll follow up"
```

---

## Step 7 — Confidence-tag the value claims

Apply `${CLAUDE_PLUGIN_ROOT}/skills/confidence-tagger/references/confidence-tagging.md` to all value statements in the storyboard. Mark every proof point and metric: 🟢 Confirmed (customer stated the metric in discovery), 🟡 Inferred (based on your proof points — reference customers, benchmarks; not yet confirmed for this account), 🔴 Unknown (value driver exists but we haven't quantified it yet).

---

## Step 8 — Save and hand off to the script

This skill stops at the storyboard and run order. It does not write the word-for-word script; `/presales:demo:script` owns that, from this storyboard, with the same timings (Tell 60 s, Show, Tell 60 s, pause 10 s).

- Deal folder present → offer to save the Picture Pitch table, persona, modules and run order to `05_demo-storyboard.md` (confirm before writing).
- Then offer: "Want the verbatim script? Run `/presales:demo:script`."

---

## Quality checklist

- [ ] Product, modules, capabilities, and sourced proof points captured from the SC (or deal folder)
- [ ] Demo anchors built from discovery (persona, value anchors, Picture-Pitch images)
- [ ] Demo type selected and storyboard calibrated to that format (Look & Feel vs Deep Dive vs RFX)
- [ ] Picture Pitch is a sequence of 5–10 images, each 5–10 s with one spoken line, running from current-state pain to future state
- [ ] Limbic persona created — name, title, pain in their words
- [ ] Every SHOW section uses first-person narration: "I am [persona]. I do. I execute."
- [ ] Zero instances of "you can", "you would", "you should" in the SHOW sections
- [ ] Each module follows TELL → SHOW (first-person) → TELL with deliberate pause
- [ ] No single Tell-Show-Tell longer than 10 minutes; maximum 3 modules per 30 min
- [ ] Sessions over ~45 min: break every 40–60 min, announced in the ground rules
- [ ] Roles agreed: SC presents, AE moderates (time, questions, success stories)
- [ ] All value anchors confidence-tagged
- [ ] Summary Value Close lists all 3 outcomes before asking the 1-10 question
- [ ] Close includes a specific next-step offer with commitment ask (not "we'll follow up")
- [ ] Demo order is: most compelling pain first (not product feature order)
- [ ] Situation slide drafted if persona is unfamiliar with current-state framing
- [ ] Pause after each second TELL is 10 seconds (same value as /presales:demo:script)
- [ ] No verbatim script written here; handed off to /presales:demo:script

---

## Handoff

- Verbatim, timed script from this storyboard → `/presales:demo:script`
- Rehearse before the session → `demo-dryrun-coach`
- Invite the audience → `/presales:demo:pre-invite`

---

## Reusing anchors across deals

If you demo the same product often, keep a short product anchors file in your own workspace (products/modules, persona archetypes, sourced value anchors, Picture-Pitch ideas, one worked module) and point this skill at it during intake. Always re-derive the persona and pains from the current customer's discovery — never reuse another customer's words.
