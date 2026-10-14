# QUALITY-0001 — Add executable test for idle network activity

**Role**: `quality`
**Backlog entry**: `.sys/backlogs/quality.md#QUALITY-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Add an executable test (failing check) to verify that no editor-owned network requests occur while the editor is idle.
- **Vision gap**: VISION.md states "No editor-owned network request may occur while idle", but there is no executable test in the `quality` surface that enforces or verifies this rule.
- **Evidence**: `test/smoke` and `test/sanity` do not contain a network idle test for the desktop app.
- **Impact**: Provides a measurable, executable gate that must be closed by runtime/shell roles to fulfill the project vision.

## 2. File Inventory

- **Create**: A new test file `test/smoke/src/areas/quality/idleNetwork.test.ts` (or similar appropriate path under `test/`).
- **Modify**: Existing test orchestration files in `test/smoke` to include the new test.
- **Read-only**: `VISION.md`, `test/black-hole/scaffold.test.mjs`.

## 3. Implementation Spec

- **Required behavior**: The test launches the editor using a clean profile, waits for a defined "idle" period (e.g., 60 seconds), and monitors the network to ensure no outgoing network requests are initiated by the core product processes.
- **Compatibility constraints**: Must not interfere with other smoke tests. Must correctly mock or bypass any setup requests before measuring the "idle" period.
- **Architectural constraints**: Uses existing playwright or test utilities available in the smoke test harness.
- **Public contract changes**: None.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: The new test itself is the failing check and is expected to fail initially against the baseline Code - OSS 1.133.0 runtime.
- **Verification commands**: `./scripts/test.sh --run test/smoke` (or equivalent smoke test launch command)
- **Success criteria**: The new test runs, correctly identifies outgoing network requests during the idle period, and fails (reporting those requests).
- **Edge cases**: Avoid flagging network requests triggered by required OS services or test harness orchestration if possible.

## 5. Constraints

- **Non-goals**: Fixing the actual idle network requests in the product code.
- **Forbidden changes**: No changes to product source code (`src/vs/*`).
- **Scope ceiling**: A standalone executable test is small enough for one execution run.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: Once this test is in place, other roles (e.g., runtime, workbench-shell) will need to address the failing test by removing the network requests.
- **Blocked when**: None.

## 7. Result
