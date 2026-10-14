# BASE-0001 — Remove LoadEstimator setInterval

**Role**: `base`
**Backlog entry**: `.sys/backlogs/base.md#BASE-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove the eager, permanent `setInterval` timer created in `LoadEstimator` initialization.
- **Vision gap**: Retained listeners, timers, caches, or DOM references that inflate settled memory and cause eager startup-time service creation in base layers.
- **Evidence**: `src/vs/base/parts/ipc/common/ipc.net.ts` contains `LoadEstimator` constructor with an unconditional `setInterval(..., 1000)` that runs forever regardless of network activity.
- **Impact**: Removing the timer reduces idle CPU wakeups, shrinks memory by eliminating unnecessary callback retention, and contributes to the goal of zero idle CPU.

## 2. File Inventory

- **Create**: None.
- **Modify**: `src/vs/base/parts/ipc/common/ipc.net.ts` (Remove timer, switch to lazy/on-demand load calculation if needed, or compute load differently).
- **Read-only**: `src/vs/base/parts/ipc/test/node/ipc.net.test.ts` (Must ensure tests pass without `setInterval`).

## 3. Implementation Spec

- **Required behavior**: The `LoadEstimator` must no longer spin a 1000ms timer continuously. Load load calculation must be done reactively or be completely eliminated if it's unused.
- **Compatibility constraints**: The public contract of `LoadEstimator` or `ILoadEstimator` (e.g. `hasHighLoad()`) must be preserved without regressions, even if implemented differently.
- **Architectural constraints**: Cannot introduce dependencies outside `src/vs/base`.
- **Public contract changes**: None.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: Running a trace or observing the memory/CPU usage should show the `LoadEstimator` interval running constantly.
- **Verification commands**: `npm run test -- test/unit/browser/ipc.net.test.ts` (or equivalent `node` test runner script in base tests).
- **Success criteria**: Tests in `src/vs/base/parts/ipc/test/node/ipc.net.test.ts` pass, and `setInterval` no longer appears in `src/vs/base/parts/ipc/common/ipc.net.ts` for the `LoadEstimator`.
- **Edge cases**: Ensure that if `LoadEstimator` is requested, it does not throw errors when calculating high load without the background timer.

## 5. Constraints

- **Non-goals**: Optimizing other IPC primitives or refactoring the entire networking stack.
- **Forbidden changes**: Do not modify IPC protocols or other timers outside `LoadEstimator`.
- **Scope ceiling**: Scoped purely to removing one permanent `setInterval` from one file, easily completed in one run.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: None.
- **Blocked when**: None.

## 7. Result
