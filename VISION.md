# Lean Code OSS Vision

Lean Code OSS is a public, local-first desktop code editor that preserves the classic edit-build-debug experience and current stable VSIX compatibility while making launch feel immediate and settled memory small again.

The shipping dependency base is pinned to **Code - OSS 1.133.0**. **Code - OSS 1.10.2** is the primary behavior and performance reference, with 1.20.1 as a secondary usability reference. Historical builds are evidence, never trusted runtimes.

## First user and platform

The first daily-driver alpha is for an individual developer on **Apple Silicon macOS 26.x**. Cross-platform source compatibility should remain where it does not compromise the first target; signed Windows and Linux distributions are later work.

## Non-negotiable product contract

- Open a folder, navigate files, edit and save text, search, use tabs/splits, Command Palette, settings, keybindings, themes, snippets, Git, terminal, tasks, debugging, diagnostics, output, and problems.
- Install, enable, disable, update, and uninstall ordinary local `.vsix` packages using the pinned stable `vscode` API, Node extension host, LSP, DAP, tree views, commands, storage, subprocesses, and sandboxed webviews.
- Keep renderer sandboxing, context isolation, narrow validated IPC, extension-host isolation, workspace trust, and secure update/signing boundaries.
- Start with a declarative lean profile and allow-lists. Exclude contributions and assets at build time only after executable checks prove they are unnecessary.
- Make excluded or product-specific APIs fail precisely and safely. Never silently start an excluded service to satisfy an extension.

## Keep in the first alpha

Classic window and editor lifecycle; Explorer; quick open; workspace search; file watching; Source Control with minimal Git; terminal; tasks; debugging; extension management; current stable extension API; webviews; language-server and debug-adapter clients; accessibility basics; controlled updates; and an intentionally small built-in extension/theme allow-list.

## Exclude from the first alpha

- bundled AI, Copilot, chat, inline chat, agents, voice agents, model providers, AI editing, prompt surfaces, MCP, remote coding agents, and AI onboarding;
- telemetry, experiments, surveys, news, release-note interruptions, promotions, badges, and upsells;
- account sign-in, Settings Sync, cloud workspaces, tunnels, collaboration, remote SSH/containers/WSL, and background service endpoints;
- notebooks and notebook renderers, browser previews, testing UI, issue reporter, extra profiles, local-history/timeline UI, and other non-core feature packs unless a named compatibility fixture proves a required contract;
- unused built-ins, languages, themes, assets, web/server variants, and development-only targets from the desktop shipping artifact.

No editor-owned network request may occur while idle. Network is allowed only for an explicit update, gallery/registry action, or extension-owned behavior the user invoked.

## Performance contract

Measure a clean profile on the same reference Mac and fixture, using at least twenty warm trials and five cold trials. Report full process-tree private memory, not one renderer.

- At least 40% faster warm launch-to-accepted-keystroke than unmodified Code - OSS 1.133.0.
- At least 35% lower clean-profile idle private memory after 60 seconds.
- At least 30% smaller signed application bundle.
- Warm launch p50 at or below 600 ms and p95 at or below 900 ms.
- Cold launch p50 at or below 1.2 s and p95 at or below 1.7 s.
- Clean-profile idle private memory at or below 250 MB; stretch goal 200 MB.
- Idle CPU median at or below 0.5% over five settled minutes.
- No statistically significant regression in typing, scrolling, save, quick open, or workspace search.

If the safe current Electron floor makes an absolute target impossible, preserve the relative gate and publish the measured floor. Never weaken isolation or security to hit a vanity number.

## Evidence before behavior changes

Every slimming or compatibility change begins with the smallest failing executable check. Release evidence must cover startup, process-tree memory, CPU, bundle composition, idle network, core edit/save/search/Git/terminal/debug flows, VSIX lifecycle, the named extension fixture matrix, safe unsupported APIs, crash recovery, and upstream differential behavior.

## Architecture

- Keep a small replayable downstream patch stack on a pinned stable upstream tag.
- Use a lean product manifest and explicit built-in/contribution/asset allow-lists.
- Defer optional construction, scanning, discovery, schemas, menus, and restoration until after accepted input.
- Keep a lazy, separate extension host and isolated webviews.
- Optimize from traces and raw samples, not intuition.
- Treat the 1.10.2 UI as scope gravity: every later surface must justify its startup, memory, maintenance, and cognitive cost.

## Completion and releases

The system has no permanent terminal state; it continuously compares Reality with this Vision. A release candidate exists only when the daily read-only release gate finds no recoverable blockers, full verification passes, performance evidence meets the contract, supported VSIX fixtures pass, unsupported categories fail honestly, notices/SBOM are current, and the human product judgment approves the artifact.
