# Necessary Condition Networks (NCN): Planning Guide

> **Credit.** Study note in our own words. TOC thinking processes originate with Eliyahu M. Goldratt. This tool follows the Black Belt in Thinking programme ([blackbeltinthinking.com](https://blackbeltinthinking.com/)). The method remains the work of its authors. Short card: `references/BBiT/necessary-condition-networks.md`.

## What it is

An NCN is a plan drawn as a network of outcomes, ordered by what must exist first. You plan it right to left from the goal and execute it left to right. Compared with a task list, it shows where you can actually start, which chains run in parallel, and which work feeds nothing and can be dropped.

Two rules keep it honest:
- **Prerequisite arrows only.** An arrow means "B cannot exist without A". Preferences and efficiency choices go into positioning, never into arrows.
- **Every node is a done statement.** Describe the finished state, not the task (see `references/done-statements-guide.md`).

## When to use it in PreSales

- A POC or pilot with several customer and vendor workstreams.
- A mutual action plan where legal, security, procurement and technical tracks run side by side.
- Turning a PRT and Transition Tree into a resourced, timed plan.
- A quick personal plan for a busy deal week.

## Steps

- [ ] **Goal on the right.** Write the end state as a done statement. Anything that does not lead to it needs a reason to exist.
- [ ] **Build leftward.** For each node ask: "What states must exist before this one?" Add them to the left. Parallel chains appear by themselves.
- [ ] **Place known items.** For each item on an existing list, decide: prerequisite, post-requisite, or its own chain.
- [ ] **Check left to right.** Read "In order to have B, I must first have A." If B is reachable without A, delete the arrow. Delete nodes that feed nothing.
- [ ] **Resource.** Mark the owning person or team per node, at a useful level of detail. Colour by owner.
- [ ] **Level.** Move nodes into the order each owner will really work. Start from one node per owner at a time. Allow overlaps where a team has several people or a node is mostly waiting.
- [ ] **Scale** (only if timing matters). Size each node by elapsed time, including waits and reviews. Ask for a good-case and a normal-bad-case estimate and plan on the middle. Push nodes together for the fastest path, then add real gaps for overloads and outside commitments.
- [ ] Iterate levelling and scaling until the plan is believable. Let one or two people draft it; let the rest review.

## B2B example

Goal: "The customer has signed the order form."
- Chain 1: "IT security has accepted the completed questionnaire" (customer security, about 10 days elapsed).
- Chain 2: "Pilot users have processed live orders against the agreed success criteria" (SC plus customer ops, about 15 days).
- Chain 3: "Both legal teams have agreed the MSA redlines" (legal, about 20 days).
- All three feed "The CFO has approved the business case", which feeds the goal.

Legal is the longest chain, so the redlines start in week one, not after the pilot. The security node is only an hour of work but ten days of waiting. Scaling by touch time would hide that.

## Common errors

- **Habit arrows.** Drawing A → B → C because that is the usual order, although A and B could run in either order.
- **Touch-time scaling.** A 20-minute review can take three days to happen.
- **Optimistic scaling.** Single-number estimates skew to the best case. Use the good/bad range.
- **Action nodes.** "Send the contract" is done when the email leaves. "Legal has confirmed receipt of the contract" is done when the handover actually happened.
