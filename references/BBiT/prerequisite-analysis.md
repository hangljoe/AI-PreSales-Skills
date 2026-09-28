# Prerequisite Analysis (PRT): From Obstacles to a Plan

> **Credit.** Study note in our own words. The Theory of Constraints thinking processes, including the Prerequisite Tree, originate with Eliyahu M. Goldratt. This tool, as used here, follows the Black Belt in Thinking (BBiT) programme ([blackbeltinthinking.com](https://blackbeltinthinking.com/)). The method remains the work of its authors.

## What it is

Use it when you know the goal (often an injection) but not how to get there. List what blocks you. Flip each obstacle into the state where it is overcome. That state is an **intermediate objective (IO)**. Sequence the IOs by prerequisite and you have a plan. The druid helps when you lack an answer; the PRT helps when you have one and are stuck.

## When to use it in PreSales

- "Get the customer to a technical win by quarter end" feels overwhelming.
- An injection from a cloud needs to become a concrete plan.
- Aligning a deal team on what must be true before the proposal goes out.

## Steps

- [ ] Write the goal. If it is an injection, keep its exact wording.
- [ ] Ask "why isn't this true yet?" and list five to ten obstacles. Fewer means shallow thinking; more usually means one cluster needs its own nested plan.
- [ ] Flip each obstacle into an IO worded as a done state, not an action.
- [ ] Keep IOs **sufficient, not over-sufficient**: just enough to remove the obstacle.
- [ ] Sequence right to left: goal at the end, then decide for each IO whether it comes before, after, or in a separate chain.
- [ ] Read each link as "In order to [later], we must [earlier]".
- [ ] Execute left to right. Keep the obstacle next to each IO, and skip an IO once its obstacle is gone.

## B2B example

Goal: "The customer's IT has approved our integration architecture."
Obstacles → IOs:
- We don't know their ERP version → "Their ERP version and API options are documented."
- Security hasn't seen our data flows → "Security has reviewed our data-flow diagram."
- No named IT sponsor → "An IT architect owns the review."
- Past vendor integrations failed → "IT has heard from a reference customer on the same ERP."
Sequence: sponsor first, then ERP facts and the reference call in parallel, then the security review, then approval.

## Common errors

- A list made only of "I don't know" items. Ask what else would block you if you knew everything.
- Too few obstacles because you feel confident. Surprises follow later.
- Over-sufficient IOs ("IT loves our product") where a smaller state clears the obstacle.
- Chasing an IO after its obstacle has already disappeared.
