# BASE-0001 — Remove eager runaway LoadEstimator setInterval from Base IPC

**Role**: `base`
**Backlog entry**: `.sys/backlogs/base.md#BASE-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Fix a runaway `setInterval` in `LoadEstimator` within base IPC to prevent permanent timer retention.
- **Vision gap**: Retained listeners, timers, caches, or DOM references inflate settled memory and prevent cleanly idle processes. Lean Code OSS prohibits runaway timers.
- **Evidence**: `src/vs/base/parts/ipc/common/ipc.net.ts` creates a static `LoadEstimator._INSTANCE` which starts a 1000ms `setInterval` loop that never stops and holds the process alive unconditionally.
- **Impact**: Improves startup efficiency slightly and stops background polling when idle, allowing clean event loop resting and saving CPU.

## 2. File Inventory

- **Create**: None
- **Modify**: `src/vs/base/parts/ipc/common/ipc.net.ts`
- **Read-only**: `src/vs/base/parts/ipc/test/node/ipc.net.test.ts` (if executor needs to add a test)

## 3. Implementation Spec

- **Required behavior**: The `LoadEstimator` must not use a permanent, un-cancellable `setInterval`. If it needs polling to estimate event loop lag, the interval must only run when actively observed, or the implementation must switch to measuring lag dynamically when queried without a timer. For example, lag could be estimated via a lightweight approach when `hasHighLoad()` is called, or by tracking whether recent `setTimeout` executions were severely delayed.
- **Compatibility constraints**: The `ILoadEstimator` interface (`hasHighLoad()`) must remain identical. The `LoadEstimator.getInstance()` API should remain working.
- **Architectural constraints**: Maintain sandboxing. No Node.js specific modules (like `perf_hooks`) in common IPC path.
- **Public contract changes**: None.

## 4. Test Plan

- **Failing evidence**: A script or test that creates `LoadEstimator.getInstance()` and expects no timers to remain.
- **Verification commands**: `./scripts/test.sh --run src/vs/base/test`
- **Success criteria**: Tests pass, and no interval leaks.
- **Edge cases**: The load estimator must still successfully report high load if the event loop is blocked.

## 5. Constraints

- **Non-goals**: Optimizing IPC protocols beyond the timer.
- **Forbidden changes**: Changing `PersistentProtocol` API. No breaking `PersistentProtocolOptions`.
- **Scope ceiling**: Scoped purely to `LoadEstimator` in one file.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: None.
- **Blocked when**: N/A.

## 7. Result
