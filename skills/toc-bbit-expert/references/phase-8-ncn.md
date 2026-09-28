## Phase 8 — Necessary Condition Network (NCN)

*Use when PRT + TT need to become a full project plan — with parallel workstreams, resource ownership, and time estimation. Can also be invoked standalone without the full TOC analysis.*

An NCN maps the **order** things must happen in, using **Done Statements** as nodes. It turns the PRT's linear obstacle-removal sequence into a visual network that shows which workstreams can run in parallel, who owns each outcome, and how long the full path takes.

### NCN vs PRT + TT

| | PRT + TT | NCN |
|--|----------|-----|
| Structure | Linear sequence | Network — parallel chains visible |
| Resources | Not included | Explicitly assigned per node |
| Timing | Not included | Elapsed time per node |
| Node wording | Conditions and actions | Always Done Statements |
| When to use | Single track, simple sequence | Multi-team, parallel workstreams, project planning |

### How to build an NCN — 6 steps

**Step 1: Start with the goal (far right)**
This is the final Desired Effect from your FRT, or the goal state from the PRT. Place it as a Done Statement on the far right. Every node in the network must lead here.

**Step 2: Build right to left**
For each outcome, ask: *"What state must exist before this one can happen?"*
Add that state to the left with an arrow pointing right.

Work backwards until you reach what can be started immediately — the left edge, with no prerequisites. These are your start states.

**Step 3: Check left to right — validate every arrow**
For each arrow, read: *"In order to have B, I must first have A."*

If you can reach B without A, remove the arrow — it is a false prerequisite. False arrows create unnecessary dependencies, block parallel work, and destroy flexibility.

**Step 4: Resource it — who owns each outcome**
Assign an owner to each node. A person, team, or resource category. Color-code by owner for visual clarity. Keep it high-level — the owner of the outcome, not every individual doing the work.

**Step 5: Level it — the order you will actually work**
Arrows show true prerequisites. Levelling shows practical sequencing given resource constraints.

- Shift nodes left or right to reflect the realistic order.
- Spread nodes where one resource is overloaded at a given moment.
- Preference and efficiency choices go into positioning, NOT into arrows.

*One resource, one node at a time is the starting principle. Overlaps are fine when: (a) the resource category has multiple people, or (b) a node has long elapsed time but short touch time.*

**Step 6: Scale it — when timing matters**
Use **elapsed time**, not touch time.
- Touch time: how long the work takes to physically do.
- Elapsed time: from starting to finishing, including waiting, reviews, and handoffs.

Estimate with a range: best case / worst case → take the midpoint. A 3–5 day estimate becomes 4 days. Close is good enough — false accuracy wastes time.

Resize each node box to span its elapsed time on a time grid. Push nodes hard against the end of the one before to find the fastest possible timeline. Then add gaps for resource overloads and external commitments.

### Two hard rules — never violate

**Rule 1: Prerequisite arrows only**
Only draw an arrow where one outcome is genuinely required before the next. Timing preferences and "it would be nice to do this first" belong in levelling (positioning), not in arrows. Every false arrow adds a constraint that does not exist in reality.

**Rule 2: Every node is a Done Statement**
Each node describes what completion looks like — not what you plan to do.

| Weak (action) | Stronger (action as done) | Best (true outcome) |
|---------------|--------------------------|---------------------|
| "Send the security questionnaire" | "The questionnaire has been sent" | "The customer's IT security team has confirmed receipt of the completed questionnaire" |
| "Run discovery with the customer" | "Discovery is complete" | "All 9 FTD questions have confirmed answers documented in the OSD" |
| "Write the evaluation plan" | "The evaluation plan is written" | "Customer and SC have co-signed a mutual evaluation plan with success criteria" |

### NCN output

```
[Start A] ─────→ [Intermediate 1] ─────→
                                          [GOAL]
[Start B] ─────→ [Intermediate 2] ─────→
                       ↑
            [Prerequisite from another chain]
```

Offer to generate an **NCN Excalidraw diagram**. Save to `output/toc/ncn_[topic].excalidraw`.

---

