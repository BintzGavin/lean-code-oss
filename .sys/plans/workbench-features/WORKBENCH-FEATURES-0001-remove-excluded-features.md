# WORKBENCH-FEATURES-0001 — Remove excluded features

**Role**: `workbench-features`
**Backlog entry**: `.sys/backlogs/workbench-features.md#WORKBENCH-FEATURES-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove optional, promotional, cloud, and AI feature packs from the workbench contributions artifact.
- **Vision gap**: The Lean Code OSS project vision explicitly excludes bundled AI, Copilot, chat, inline chat, agents, MCP, telemetry, remote coding agents, Settings Sync, and welcome screens from the clean lean profile, but they are currently shipped.
- **Evidence**: Directories `chat`, `mcp`, `agentsVoice`, `inlineChat`, `telemetry`, `userDataSync`, `remoteCodingAgents`, `welcomeAgentSessions`, `welcomeBanner`, `welcomeGettingStarted`, `welcomeOnboarding`, `welcomeViews`, and `welcomeWalkthrough` exist in `src/vs/workbench/contrib`.
- **Impact**: Reduces startup time, memory, bundle size, and cognitive cost by strictly adhering to the lean allow-list and removing optional feature contributions.

## 2. File Inventory

- **Create**: None.
- **Modify**: `src/vs/workbench/contrib/chat`, `src/vs/workbench/contrib/mcp`, `src/vs/workbench/contrib/agentsVoice`, `src/vs/workbench/contrib/inlineChat`, `src/vs/workbench/contrib/telemetry`, `src/vs/workbench/contrib/userDataSync`, `src/vs/workbench/contrib/remoteCodingAgents`, `src/vs/workbench/contrib/welcomeAgentSessions`, `src/vs/workbench/contrib/welcomeBanner`, `src/vs/workbench/contrib/welcomeGettingStarted`, `src/vs/workbench/contrib/welcomeOnboarding`, `src/vs/workbench/contrib/welcomeViews`, `src/vs/workbench/contrib/welcomeWalkthrough` (all to be deleted).
- **Read-only**: `src/vs/workbench/workbench.common.main.ts` (owned by `workbench-shell`), `VISION.md`.

## 3. Implementation Spec

- **Required behavior**: The workbench must launch successfully without the excluded features (AI, chat, MCP, welcome screens, etc.).
- **Compatibility constraints**: The system must preserve sandboxing, context isolation, extension-host isolation, and stable VSIX compatibility for remaining features.
- **Architectural constraints**: Only the static product surface (`src/vs/workbench/contrib`) owned by this role can be modified.
- **Public contract changes**: None.

## 4. Test Plan

- **Failing evidence**: `node test/black-hole/scaffold.test.mjs` and build commands (`npm run gulp compile-client` or similar) will fail if `src/vs/workbench/workbench.common.main.ts` still imports these features.
- **Verification commands**: `./scripts/test.sh --run src/vs/workbench/browser`
- **Success criteria**: The application builds and starts correctly, and process-tree memory and startup times are lower.
- **Edge cases**: Existing workbench layout state pointing to removed views might need safe fallback handling.

## 5. Constraints

- **Non-goals**: Do not modify code outside `src/vs/workbench/contrib`.
- **Forbidden changes**: Do not edit `src/vs/workbench/workbench.common.main.ts` as it belongs to `workbench-shell`.
- **Scope ceiling**: This work order strictly isolates the removal of forbidden workbench contributions and nothing else.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: `workbench-shell` must remove imports of the prohibited features from `src/vs/workbench/workbench.common.main.ts` before these directories can be safely deleted without breaking the build.
- **Blocked when**: The dependency on `workbench-shell` to remove imports is missing, blocking the deletion.

## 7. Result
