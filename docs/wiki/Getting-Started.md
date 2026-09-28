# Getting Started

## Install

You need a paid Claude plan (Pro, Max, Team, or Enterprise), or an Anthropic Console account, plus Claude Code, Anthropic's app for working with Claude on your computer. It runs in the terminal, in the Claude Desktop app, or inside VS Code, and you don't need to know how to code.

If you don't already have Claude Code, install it first.

macOS (Terminal):
```
curl -fsSL https://claude.ai/install.sh | bash
```

Windows (PowerShell):
```
irm https://claude.ai/install.ps1 | iex
```

Then run `claude` and log in when it asks. Prefer clicking to typing? Install the Claude Desktop app from claude.ai/download and open the Code tab; everything below works there too.

With Claude Code running, add the plugin:

```
/plugin marketplace add hangljoe/AI-PreSales-Skills
/plugin install presales@presales-handbook
```

Restart Claude Code when it asks you to. Then type `/presales:guide`. If you see an interactive router asking what you're working on, you're set up.

To update later, run `/plugin update presales@presales-handbook`. To remove the plugin, run `/plugin uninstall presales@presales-handbook`, or manage it from the `/plugin` menu's Installed tab.

Team or Enterprise admin? You can switch the plugin on for everyone through managed settings instead of asking each SC to install it. The README has the exact snippet to add.

## Your first 10 minutes

1. **Tell Claude what you sell.** Every skill is vendor-neutral, so the first time it needs your product, capabilities, or competitors, it asks. Save yourself the repetition by setting up a deal folder, see [[Deal-Folder]], with its "About us" block filled in once.
2. **Run the router.** Type `/presales:guide` and describe your situation, for example "I have a discovery call with a CFO on Thursday." It points you at the right tool.
3. **Run one real workflow.** `/presales:discovery:prep` for your next call is a good first one. Claude asks what it needs and hands back a one-page call plan.
4. **Just talk to it.** Say "structure these notes" and paste your call notes, and the right skill switches on with no slash command at all.

The more context you give it, the better the output. Paste discovery notes, prior emails, CRM exports. Before anything goes to a customer, say "tag this" so every claim gets marked Confirmed, Inferred, or Unknown.

## Commands vs. skills

The kit gives you two ways in.

**Commands** are step-by-step workflows you start by typing `/presales:...`. Claude asks for what it needs and walks you through the process. `/presales:discovery:summary`, for example, asks who was on the call and what you learned, then hands back a structured summary, a MEDDPICC update, and a ready-to-send follow-up email.

**Skills** switch on when you describe what you need in plain language, no slash required. Say "how do we beat [competitor]?" and the competitive battlecard skill starts. Say "dry run my demo" and the demo coach takes over.

You don't need to know which is which going in. If you're unsure, run `/presales:guide`.

Both work the same whether or not you've connected a CRM, a knowledge base, or your mail and calendar. See [[Connected-Tools]].

## Three entry points

- **`/presales:guide`** – the router, for when you don't know exactly what you need.
- **The deal journey** – working a specific stage of a specific deal, in order. See [[The-Deal-Journey]].
- **The brain loop** – your own daily and weekly rhythm, independent of any one deal: `/presales:brain:start`, `/presales:brain:end`, and the weekly equivalents.

## Your first deal

1. Create a deal folder using the structure in [[Deal-Folder]], and fill in the "About us" block once.
2. Run `/presales:account:brief` for the account you're chasing.
3. Before your first call, run `/presales:discovery:prep`.
4. After the call, run `/presales:discovery:summary` to turn your notes or transcript into the discovery output document.
5. Then run `/presales:discovery:qualify` to score MEDDPICC and see what's missing.

From there, [[The-Deal-Journey]] carries you through the rest of the cycle.
