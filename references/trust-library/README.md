# Trust Library — how to set up your own

This folder in the plugin holds **only this README and the file template below**. Your approved
security answers do **not** belong here: the plugin is public, and this folder is overwritten on
every plugin update. Keep the real library in **your own workspace**, where
`/presales:rfp:security` reads it automatically before drafting any answer.

---

## Where your library lives

The command resolves the library folder in this order:

1. A library path you gave Claude earlier (kept in Claude's memory).
2. `<deals root>/_trust-library/`, if your deals root is configured
   (`deals_root` in `~/.claude/discovery-transformer.json`; on Windows
   `%USERPROFILE%\.claude\discovery-transformer.json`).
3. Otherwise Claude asks you once for a folder, for example a team SharePoint, OneDrive, Google
   Drive or local folder, and offers to remember it.

Never place the library inside the plugin folder or a public repo. If no library is configured
the command still works; every answer is then drafted or flagged unknown, never invented.

A shared team knowledge base (e.g. Confluence or SharePoint, if connected) can serve the same
purpose. The command checks it as well.

---

## What to add

One file per approved control, grouped by domain, so Claude can find and cite the exact control
that answers a question:

```
answers/<domain>/<control-id>.md      e.g. answers/access-control/AC-02-account-provisioning.md
answers/<domain>/<control-id>.md      e.g. answers/data-protection/DP-05-encryption-at-rest.md
answers/<domain>/<control-id>.md      e.g. answers/incident-response/IR-01-notification-sla.md
```

Typical domains: access control, data protection, encryption, incident response, business
continuity, subprocessors, physical security, application security, compliance & certifications.
Use whatever domain set matches your own control framework.

---

## File format

Use this structure so `/presales:rfp:security` can parse and cite each control precisely:

```markdown
---
control: [Control ID and short name — e.g. "AC-02 Account provisioning"]
domain: [e.g. Access control]
owner: [Name or team who owns this control]
approved_on: [YYYY-MM-DD]
expires: [YYYY-MM-DD, or "N/A" if the control has no review cycle]
---

# [Control ID] — [Short name]

## Answer
[The approved answer text, ready to paste into a questionnaire]

## Evidence
[What backs this up — a certification, an audit report reference, a policy document name.
Do not paste the evidence document itself here; name where it lives.]

## Notes
[Optional — caveats, scope limits, or when this control does not apply]
```

---

## Confidentiality note

These files contain approved security and compliance content. Treat them as **Internal —
Confidential**:
- Store them only in your own or your team's workspace, never in the plugin folder or a public repo
- Never commit customer data — this library holds your own controls, not a customer's environment or findings
- Keep `approved_on` and `expires` current; an expired control should be re-reviewed before reuse
- Do not include evidence documents (audit reports, certificates) inline — name and link them instead

---

## Getting started

No library yet? Create the folder and start with the controls most questionnaires ask for first:

1. **`answers/compliance/certifications.md`** — current certifications (ISO 27001, SOC 2, etc.) and their scope
2. **`answers/data-protection/encryption.md`** — encryption at rest and in transit
3. **`answers/access-control/authentication.md`** — authentication, SSO, MFA, role-based access
4. **`answers/incident-response/notification.md`** — incident detection, response and customer notification SLA
5. **`answers/business-continuity/backup-recovery.md`** — backup, recovery and continuity posture

Ask your security or IT trust team for approved versions of these controls.
