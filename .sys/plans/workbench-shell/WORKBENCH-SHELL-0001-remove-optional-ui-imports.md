# WORKBENCH-SHELL-0001 — Remove optional UI imports on startup

**Role**: `workbench-shell`
**Backlog entry**: `.sys/backlogs/workbench-shell.md#WORKBENCH-SHELL-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove welcome, onboarding, and optional banner UI imports from main workbench entry points.
- **Vision gap**: Vision prohibits "welcome, promotion, account, or optional UI that steals focus on launch" and mandates deferring optional discovery until after accepted input.
- **Evidence**: `src/vs/workbench/workbench.common.main.ts` contains `welcomeGettingStarted`, `welcomeAgentSessions`, `welcomeWalkthrough`, `welcomeViews`, and `welcomeOnboarding` imports. `src/vs/workbench/workbench.web.main.ts` contains `welcomeBanner` imports.
- **Impact**: Removes structural dependencies on optional UI components that are loaded unconditionally during editor startup.

## 2. File Inventory

- **Create**: None.
- **Modify**:
  - `src/vs/workbench/workbench.common.main.ts`: Remove welcome and onboarding imports.
  - `src/vs/workbench/workbench.web.main.ts`: Remove welcome banner imports.
- **Read-only**: `VISION.md`, `test/black-hole/scaffold.test.mjs`

## 3. Implementation Spec

- **Required behavior**: The workbench must not unconditionally import or execute welcome, onboarding, and banner view contributions during initialization.
- **Compatibility constraints**: Must preserve the ability of the editor to launch successfully without missing critical dependencies.
- **Architectural constraints**: Keep changes inside the defined `workbench-shell` scope; do not modify files belonging to `workbench-features` (e.g. `src/vs/workbench/contrib`).
- **Public contract changes**: None.

## 4. Test Plan

- **Failing evidence**: `grep -i "welcome" src/vs/workbench/workbench.common.main.ts src/vs/workbench/workbench.web.main.ts` returns positive matches.
- **Verification commands**:
  - `grep -i "welcome" src/vs/workbench/workbench.common.main.ts src/vs/workbench/workbench.web.main.ts || echo "No matches"`
  - `node test/black-hole/scaffold.test.mjs`
- **Success criteria**: Grep commands return no matches. The scaffold test passes.
- **Edge cases**: N/A

## 5. Constraints

- **Non-goals**: Do not delete the actual feature implementation files in `src/vs/workbench/contrib`.
- **Forbidden changes**: Modification of any file outside the `workbench-shell` ownership bounds.
- **Scope ceiling**: Removing top-level imports in specific entry points is bounded and verifiable in a single execution cycle.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: Deleting the unused code in `src/vs/workbench/contrib` will require a future work order from the `workbench-features` role.
- **Blocked when**: If the core shell has hard dependencies on these modules making removal break the build.

## 7. Result
