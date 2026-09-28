# Connected Tools

Three kinds of connector are optional across the whole plugin: a CRM, a knowledge base, and mail
and calendar. Every skill and command that mentions one degrades gracefully without it — it asks
you for the context instead, and the output quality is the same either way. If nothing is
connected, just paste what you have: notes, a CRM export, an email thread, a transcript.

## CRM (e.g. Salesforce, HubSpot)

A connected CRM saves you re-typing what is already on the opportunity. Per phase:

- **Account and discovery** — account data, opportunity stage, contacts and MEDDPICC fields feed
  `/presales:account:brief`, `/presales:discovery:qualify` and `/presales:discovery:summary`, so
  the score and the summary start from what is already recorded instead of a blank page.
- **Demo** — confirmed pains, persona names and deal context personalise
  `/presales:demo:post-followup` and the `demo-storyboard`/`video-demo-creator` skills.
- **Value and deal** — deal history and prior outcomes inform `negotiation-prep`, `proposal` and
  `champion-enable`, and the `win-loss-analyzer` skill pulls the closed opportunity's own record
  for its debrief.
- **RFX** — `/presales:rfp:analyze` pulls account history and deal health as part of its go/no-go
  read.
- **Leader tools** — pipeline stage, SC assignment and hours-to-date feed
  `/presales:leader:pipeline-review`; role and tenure data feed `/presales:leader:onboarding`. See
  [[Leader-Tools]].

**Read-only, by default.** Most CRM use is a read: `/presales:discovery:qualify`,
`/presales:account:brief`, `/presales:discovery:summary`, `win-loss-analyzer`,
`negotiation-prep`, `proposal`, `champion-enable`, `/presales:demo:post-followup` and
`/presales:rfp:analyze` all pull from the CRM but never write to it.

**Write-back is always confirm-gated.** A small set of commands offer to write back, and every one
of them shows you the change and waits for an explicit yes first — never a silent write:

- `/presales:discovery:golden-hours` — call activity, MEDDPICC field updates and a stage review,
  shown as a before/after list before writing.
- `/presales:discovery:tfq` — the Invest / Conditional / Pause verdict and gate scores, offered
  after the gate is scored.
- `/presales:leader:prequal` — the readiness band and top gaps, offered per deal.
- `win-loss-analyzer` — the close reason and competitor fields, offered at the end of the debrief.

Without a connected CRM, every one of these still works; they hand you the same list to paste in
yourself.

## Knowledge base (e.g. Confluence, Notion, SharePoint)

A connected knowledge base gives skills somewhere to pull from and somewhere to save to. It
supplies product docs, competitive intel, approved pricing and reference ROI data to
`field-comms-writer`, `/presales:discovery:summary`, `win-loss-analyzer`, `competitive-battlecard`
and `pricing-positioning`, and it is where `/presales:handover:doc` can save the finished handover
package. For leader tools, it is the right place for the *generic* artefacts — the RACI matrix,
the 30-60-90 onboarding template, the hiring rubric — never a named person's record; see
[[Leader-Tools]] for the people-data rules that keep those out of any shared space.

## Mail & calendar (e.g. Outlook, Teams, Gmail)

Mail and calendar feed the personal operating loop: `second-brain` and the `/presales:brain:*`
commands use meetings, threads and tasks to build the daily and weekly briefs. Nothing else in the
plugin depends on this connector.

## Everything works without them

None of the above is required. Every skill and command that lists a connector also says what
happens without one: you paste the context — notes, an export, an email — and Claude asks for
anything it's missing rather than guessing. Connecting a tool saves typing; it never changes what
a skill can produce.

## The two libraries that never live in the plugin

Two reference libraries are meant to hold your team's real, approved content, and neither belongs
in the plugin's own folders:

- **The RFP answer library** backs `/presales:rfp:analyze`, `/presales:rfp:respond` and
  `/presales:rfp:present`. It holds your approved past responses and reusable sections.
- **The security trust library** backs `/presales:rfp:security`. It holds your approved answers
  to security and compliance controls, one file per control.

Both stay out of the plugin for the same reason: the plugin's own `references/rfp-library/` and
`references/trust-library/` folders are public and are overwritten on every plugin update, and
both libraries hold commercial or security content marked Internal — Confidential. Keep the real
library in your own workspace — a folder under your deals root, a team SharePoint, OneDrive or
Google Drive — and Claude checks it automatically before drafting anything from scratch, reusing
approved language instead of generic output. See [[Customising]] for how to set each one up and
where the deals-root config that both can piggyback on lives.
