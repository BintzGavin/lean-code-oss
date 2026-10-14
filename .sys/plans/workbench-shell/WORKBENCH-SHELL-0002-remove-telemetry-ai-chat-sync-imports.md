# WORKBENCH-SHELL-0002 — Remove telemetry, AI, chat, and sync imports

**Role**: `workbench-shell`
**Backlog entry**: `.sys/backlogs/workbench-shell.md#WORKBENCH-SHELL-0002`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove telemetry, AI, chat, copilot, and userDataSync imports from workbench shell entry points.
- **Vision gap**: The Lean Code OSS project vision explicitly excludes bundled AI, Copilot, chat, inline chat, agents, MCP, telemetry, remote coding agents, and Settings Sync from the clean lean profile.
- **Evidence**: `src/vs/workbench/workbench.common.main.ts`, `src/vs/workbench/workbench.desktop.main.ts`, and `src/vs/workbench/workbench.web.main.ts` contain many imports related to `telemetry`, `chat`, `ai`, `userDataSync`, and `copilot`.
- **Impact**: Removes structural dependencies on excluded services and contributions, satisfying the Vision's lean profile constraints and eliminating unnecessary overhead.

## 2. File Inventory

- **Create**: None.
- **Modify**:
  - `src/vs/workbench/workbench.common.main.ts`: Remove telemetry, AI, chat, and userDataSync imports.
  - `src/vs/workbench/workbench.desktop.main.ts`: Remove telemetry, chat, and userDataSync imports.
  - `src/vs/workbench/workbench.web.main.ts`: Remove telemetry, chat, and userDataSync imports.
- **Read-only**: `VISION.md`, `test/black-hole/scaffold.test.mjs`

## 3. Implementation Spec

- **Required behavior**: The workbench must launch without loading or executing telemetry, AI, chat, copilot, and settings sync modules.
- **Compatibility constraints**: Must preserve the ability of the editor to launch successfully without missing critical dependencies. The remaining desktop and web workbench initialization flows must function normally.
- **Architectural constraints**: Keep changes inside the defined `workbench-shell` scope; do not modify files belonging to other roles (e.g., `workbench-features` or `workbench-services`).
- **Public contract changes**: None.

## 4. Test Plan

- **Failing evidence**: `grep -iE "telemetry|chat|sync|ai|copilot|userDataSync" src/vs/workbench/workbench.common.main.ts src/vs/workbench/workbench.desktop.main.ts src/vs/workbench/workbench.web.main.ts` returns positive matches.
- **Verification commands**:
  - `grep -iE "telemetry|chat|sync|ai|copilot|userDataSync" src/vs/workbench/workbench.common.main.ts src/vs/workbench/workbench.desktop.main.ts src/vs/workbench/workbench.web.main.ts || echo "No matches"`
  - `node test/black-hole/scaffold.test.mjs`
- **Success criteria**: Grep commands return no matches. The scaffold test passes.
- **Edge cases**: Avoid removing core `sync` imports that might be related to other essential synchronization primitives (if any), only remove `userDataSync` or explicitly telemetry/AI-related sync imports.

## 5. Constraints

- **Non-goals**: Do not delete the actual feature implementation files in other directories (e.g. `src/vs/workbench/contrib`, `src/vs/workbench/services`).
- **Forbidden changes**: Modification of any file outside the `workbench-shell` ownership bounds.
- **Scope ceiling**: Removing top-level imports in specific entry points is bounded and verifiable in a single execution cycle.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: Deleting the unused code in `src/vs/workbench/contrib` and `src/vs/workbench/services` will require future work orders from the `workbench-features` and `workbench-services` roles respectively.
- **Blocked when**: If the core shell has hard dependencies on these modules making removal break the build.

## 7. Result
