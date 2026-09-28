# Deals library — folder layout, matching rules & naming

Reference for the `discovery-transformer` skill. It documents the recommended structure of the
local **deals library** — one folder per account, one sub-folder per deal — so a transcript lands
in the right place. The matcher (`scripts/match_folder.py`) encodes these rules; this file is the
human-readable authority behind them. The same library is read by `osd-scoper`, `osd-architect`
and `deal-prequal`.

---

## Precondition — the library must be reachable on disk

Claude reads a **local folder**. It can be a plain folder, or a locally-synced copy of a cloud
drive (OneDrive, Google Drive, Dropbox, a synced SharePoint library, etc.). If a sync client keeps
files **online-only**, the matcher may not be able to read them until they are downloaded — ask
the user to mark the library as "always available offline" (or the equivalent in their client).

---

## The recommended tree

```
<Deals root>/
├── Acme Corp/                        ← account folder (flat at root)
│   ├── Acme Corp - Analytics/        ← deal sub-folder (product- or opportunity-tagged)
│   │   ├── 20_sales_discovery/
│   │   ├── 30_functional_discovery/
│   │   ├── 40_meetings_and_demos/    ← transcripts/demos save here
│   │   ├── 50_commercial/
│   │   ├── opportunity_artifacts/
│   │   └── rfx/
│   └── Acme Corp - Renewal 2027/
├── Globex/
│   └── Globex Platform/
├── _Template/                        ← excluded (admin/template)
└── 00_Reports/                       ← excluded
```

- **Level 1 = account folders**, flat at the root (e.g. `Acme Corp`, `Globex`).
- **Level 2 = deal sub-folders**, tagged with the product, module, or opportunity name. Naming
  may be inconsistent (`Globex Platform`, `Acme Corp - Analytics`); word order and separators vary.
- **Level 3 = template sub-folders** inside each deal (the `NN_*` folders above). Recommended but
  optional; older deals may not follow it.

If the user has no library yet, offer to create `<Deals root>/<Account>/<Account> - <Deal>/40_meetings_and_demos/`
behind the same confirm-before-write gate.

---

## Matching rules (deal name → deal sub-folder)

1. **Scan two levels:** account folders, then their deal sub-folders.
2. **Exclude admin/template folders** — any name starting with `_`, `__`, or a digit
   (`_Template`, `__icons`, `00_Reports`). These never appear as candidates.
3. **Primary match = deal sub-folders.** Score = blended fuzzy ratio + token overlap, so
   `"Analytics Acme"` still matches `Acme Corp - Analytics` despite word order.
4. **Fallback tier = account folders**, scored slightly lower so a real deal-folder match always
   wins a tie.
5. **One strong candidate** → propose it. **Several close** → show the top 3 across accounts and
   let the user pick. **None** → ask the user for an exact path.

---

## Save-target resolution (inside the matched deal folder)

In priority order:

1. A sub-folder named exactly **`40_meetings_and_demos`** (case-insensitive) — the template home.
2. Else the first sub-folder whose name matches **`/meeting|demo/i`** — covers ad-hoc names
   like `Meetings - Presentations & Notes`.
3. Else the **deal folder root** itself.

The matcher returns `save_target` (absolute path) and `save_target_is_meetings` (bool) so the
skill can show the user exactly where the file will land.

---

## File naming

```
YYYY-MM-DD_<Account>_transcript.md           ← the cleaned transcript (always)
YYYY-MM-DD_<Account>_discovery-summary.md    ← Discovery Summary for discovery calls (same gate):
                                                exec recap, MEDDPICC, question coverage, open
                                                questions, next steps, client email, embedded transcript
```

- `<Account>` defaults to the **matched account folder name** (e.g. `Acme Corp`).
- Date defaults to the `.vtt` file's modified date, user-overridable at intake.
- On a name clash, warn and offer a `_v2` suffix — **never** silently overwrite.

---

## Per-user path & config

- Config file: `~/.claude/discovery-transformer.json` (on Windows `%USERPROFILE%\.claude\discovery-transformer.json`)
  holding `{"deals_root": "<path>"}`. An older `accounts_root` key is accepted as a synonym.
- If no config exists, ask the user for the path of their deals library, then offer to persist it.
- **Never hardcode a username** — always resolve via the home directory (`~` / `%USERPROFILE%`) or the config file.

---

## Trace example

`"Analytics Acme"` → token overlap matches `Acme Corp\Acme Corp - Analytics` → save target
`Acme Corp\Acme Corp - Analytics\40_meetings_and_demos\` → file
`2026-09-28_Acme Corp_transcript.md`.
