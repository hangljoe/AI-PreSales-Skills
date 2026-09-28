---
name: handoff
version: "1.1"
last_updated: 2026-09-28
description: "Compacts the current Claude session into a handoff document so another agent or a fresh session can pick up the work: agent-to-agent session handoff, NOT the customer/PS handover. Use on \"create a handoff\", \"hand this off\", \"compact this session\", \"save this for the next session\". Siblings: /presales:handover:doc (PreSales-to-Professional-Services handover at technical win). SKIP for any customer, deal or PS handover package."
argument-hint: "What will the next session be used for?"
triggers:
  - "create a handoff"
  - "hand this off"
  - "handoff"
  - "compact this session"
  - "compact this conversation"
  - "save this for the next session"
---

Write a handoff document summarising the current conversation so a fresh agent can continue the work.

This is an agent-to-agent session handoff. It is **not** the PreSales-to-Professional-Services handover at technical win; for that, use `/presales:handover:doc`.

## Output

Save a single Markdown file named `handoff-<short-slug>.md` (slug derived from the topic, e.g. `handoff-skill-hygiene.md`) to the current working directory, unless the user names a different location. Return the saved path at the end.

The document should cover, in order:
1. **Goal** — what the work is trying to achieve, in one or two sentences.
2. **State** — what has been done so far, what is in progress, and what is left.
3. **Key decisions** — choices made and why, so the next agent doesn't re-litigate them.
4. **Files & artefacts** — the paths, branches, or links that matter.
5. **Next steps** — the concrete actions to pick up, most important first.
6. **Open questions / risks** — anything unresolved the next agent should watch for.

## Rules

Redact any sensitive information, such as API keys, passwords, tokens, or personally identifiable information — replace with `[REDACTED]`.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.
