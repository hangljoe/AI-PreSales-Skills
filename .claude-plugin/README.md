# Plugin Manifests

This library ships as a single Claude plugin. The repo root is the plugin root.

| File | Purpose |
|------|---------|
| `plugin.json` | The plugin manifest: name (`presales`), display name (*AI PreSales Skills*), version, description. Claude Code and claude.ai read this file. |
| `marketplace.json` | Marketplace manifest (`presales-handbook`) for installs from GitHub: `/plugin marketplace add hangljoe/AI-PreSales-Skills`. Its single plugin entry points at the repo root (`"source": "./"`). |

When you bump the version, update `plugin.json`. Keep the `marketplace.json` descriptions in sync if they changed. Run `claude plugin validate .` before you push.
