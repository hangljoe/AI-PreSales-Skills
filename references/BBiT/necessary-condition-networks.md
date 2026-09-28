# Necessary Condition Networks (NCN)

> **Credit.** Study note in our own words. The Theory of Constraints thinking processes originate with Eliyahu M. Goldratt. This tool, as used here, follows the Black Belt in Thinking (BBiT) programme ([blackbeltinthinking.com](https://blackbeltinthinking.com/)). The method remains the work of its authors. For the plugin's longer planning guide, see `references/ncn-guide.md`.

## What it is

An NCN is a plan drawn as a network of prerequisites instead of a flat task list. It shows where you can start, what can run in parallel and what truly depends on what. Two rules hold throughout:
- **Prerequisite arrows only.** An arrow means "B genuinely needs A first", never "I'd rather do A first".
- **Done statements, not actions.** Each node is the finished state (see `references/done-statements-guide.md`).

## When to use it in PreSales

- Planning a multi-workstream POC or pilot with the customer.
- Building a mutual action plan with parallel legal, security and technical tracks.
- Turning a PRT into a resourced, timed plan.

## Steps

- [ ] **Build:** put the goal on the far right. Work leftward, asking what states must exist before each one. Place each node as a prerequisite, a post-requisite or a separate chain.
- [ ] **Check** left to right: "In order to have B, I must first have A." If B is reachable without A, delete the arrow. Drop nodes that feed nothing.
- [ ] **Resource:** mark the owner of each node (colour per person or team).
- [ ] **Level:** shift nodes into the order each owner will actually work. Spread overloads. Keep sequencing preferences in positions, not arrows.
- [ ] **Scale** (if timing matters): size each node by *elapsed* time, not touch time. Estimate a good case and a bad case, then take the midpoint. Close gaps for the fastest path, then add back real conflicts and outside commitments.
- [ ] Iterate between levelling and scaling. Plan right to left, execute left to right.

## B2B example

Goal: "Customer has signed the order form."
Chains: "Security questionnaire is accepted" (security team, 10 days elapsed); "POC success criteria are met" (SC and customer, 15 days); "Legal has agreed the MSA" (legal, 20 days). All three feed "Economic buyer has approved the business case", which feeds the goal. Legal is the longest chain, so it starts on day one.

## Common errors

- Time-sequence arrows that are really preferences.
- Touch-time scaling, which ignores waiting for reviews and approvals.
- Optimistic estimates. Use the range method.
