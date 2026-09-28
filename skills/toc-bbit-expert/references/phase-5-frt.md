## Phase 5 — Design the Future State (Future Reality Tree — FRT)

**Goal: Prove the injection works. Show how the goal is reached. Identify what could go wrong. This begins TOC Question 3.**

The FRT is the CRT transformed by your solution set. It answers: "If we apply these injections, will we actually reach the goal? And what else might they cause?"

**Principle: sufficient, not perfect.** You don't need to eliminate every UDE. Cutting a defect rate in half could be a massive improvement. Aim for sufficient resolution of the system's problems — not a zero-defect fantasy.

### FRT construction rules

1. **Start with the injection(s) at the bottom.** These are your inputs.
2. **Build upward with if-then logic.** For each injection: "If we apply this, then what desirable effect follows? And then what? And then what?"
3. **Validate every single link** with causality test + assumption test + sufficiency test.
4. **Actively hunt for Negative Branch Reservations (NBRs).** Ask: "What else might this injection cause that we haven't thought of?"
5. **Add a preventative injection** for each real NBR. This is not optional.
6. **Confirm the goal is actually reached** — trace all effects up to the final desired state.
7. **Find the gaps.** Move up each causal chain. Stop at any point where existing injections are not sufficient to change the outcome — these spots need additional injections.

### Sufficiency test (unique to the FRT)

For each link: "Is this cause *alone* sufficient to produce this effect — or do we need an additional condition or injection?"

If insufficient: add the missing injection before proceeding.

### FRT structure pattern

```
               [GOAL ACHIEVED — Desired Effect N]
                             |
                   [Desired Effect N-1]
                   /                    \
     [Desired Effect A]       [Desired Effect B]
              |                         |
       [Injection A]             [Injection B]

         ↙ NBR branch (handled by preventative injection)
  [Negative Effect]
       ↑
  [Preventative Injection]
```

### NBR — handling the downsides

Side effects come in two types:
- **Legitimate:** a real downside you must mitigate or accept
- **Fear:** a worry that, once mapped, turns out not to actually happen

**How to tell the difference:**
1. Connect the injection to the feared negative with cause-and-effect steps (aim for 4+ steps).
2. Check the logic and assumptions at each step. If an assumption doesn't hold ("customers have no tolerance for minor defects" — is that actually true?), it is likely a fear.
3. Check the magnitude: a small thing going slightly wrong doesn't mean a huge blowout.

**If it is legitimate:**
Grade each step as positive, neutral, or negative:
- The starting injection is positive (you want it)
- The top is negative
- Steps run from positive through neutral to negative

Place your preventative injection **after all the positives but before all the negatives** — you keep the upside and trim the downside. Neutrals give you flexibility.

### NBR identification prompts — never skip this

- "What else might happen when this injection is applied that we haven't thought of?"
- "Who might react negatively to this change, and what would they do as a result?"
- "What resource or capacity does this injection demand that is currently committed elsewhere?"
- "What existing policy or rule does this injection challenge — and how might that push back?"
- "What is the second-order effect of this change six months out?"

### NBR handling table

| Negative Branch | Legitimate or fear? | Preventative injection |
|----------------|--------------------|-----------------------|
| | | |
| | | |

### Win-win confirmation

- [ ] Injection(s) trace upward to the goal through valid causal steps
- [ ] Both conflicting needs remain satisfied throughout the FRT
- [ ] No new UDEs appear — or each is addressed by a preventative injection
- [ ] The goal is reached (sufficiently — not necessarily perfectly)

After completing: offer to generate a **FRT Excalidraw diagram** (injections in green at bottom, desired effects in blue, NBR branches in orange, preventative injections in teal, goal in large green rectangle at top).

> **TOC Q3 begun: How to cause the change safely?**

---

