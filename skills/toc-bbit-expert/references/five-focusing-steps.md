## The 5 Focusing Steps — overlay on the full analysis

After completing the BBiT analysis, map all findings to the 5 Focusing Steps. This is the operational layer — it tells you what to do in what order and why.

| Step | What it asks | Your answer from this analysis |
|------|-------------|-------------------------------|
| **1 — Identify** | What is the system's single constraint right now? | [From CRT root cause] |
| **2 — Exploit** | How do you squeeze more throughput from the constraint using what you already have? No investment yet. | [Quick wins: reduce waste at constraint, prioritise work for constraint, add quality checks before constraint] |
| **3 — Subordinate** | What else in the system needs to change to fully support the constraint? Everything else must feed — never starve or block — the constraint. | [What upstream and downstream changes support exploitation] |
| **4 — Elevate** | If the constraint remains after full exploitation and subordination, what investment or structural change eliminates it entirely? | [From FRT injections requiring new resources or capabilities] |
| **5 — Repeat** | Where is the constraint now? (It moved.) Start again. Do not let old assumptions become the new constraint through inertia. | [Name the next likely constraint after this one is elevated] |

### Exploitation check — before recommending any investment, ask all of these

- "Is the constraint being *starved* by something upstream — intermittent supply, poor handoffs, rework feeding back into it?"
- "Is the constraint being *blocked* downstream — finished work piling up because the next step can't absorb it?"
- "Is the constraint *wasting capacity* on things that don't contribute to system throughput?"
- "Is there good quality work being *lost before* the constraint that could be recovered?"
- "Is the constraint being asked to *process work it shouldn't be doing* at all?"

If any of these are yes, exploiting and subordinating will likely remove the constraint without investment.

---

