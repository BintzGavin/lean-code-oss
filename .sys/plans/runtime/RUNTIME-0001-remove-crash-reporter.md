# [RUNTIME-0001] — Remove crash reporter and initial background telemetry

**Role**: `runtime`
**Backlog entry**: `.sys/backlogs/runtime.md#RUNTIME-0001`

## 1. Context & Goal

- **Objective**: Remove the crash reporter background service and its command-line arguments to align with the privacy and performance constraints.
- **Vision gap**: The Lean Code OSS Vision states: "No editor-owned network request may occur while idle," and explicitly excludes telemetry and background services like the crash reporter.
- **Evidence**: `src/main.ts` calls `crashReporter.start(...)` during early startup, initializing a background service. It also parses `--crash-reporter-directory`, `--crash-reporter-id`, `--enable-crash-reporter`.
- **Impact**: Removes an unneeded background service from early startup, reducing background idle memory and CPU, and prevents unwanted disk I/O and potential network uploads.

## 2. File Inventory

- **Create**: None
- **Modify**: `src/main.ts`
- **Read-only**: `VISION.md`

## 3. Implementation Spec

- **Required behavior**: The application must start successfully without initializing Electron's `crashReporter`.
- **Compatibility constraints**: The CLI parsing should cleanly ignore or remove crash reporter arguments without causing failure for users who pass them.
- **Architectural constraints**: Maintain sandbox and context isolation.
- **Public contract changes**: None.

## 4. Test Plan

- **Failing evidence**: Run `grep -R "crashReporter\.start" src/main.ts` to show the existing startup behavior.
- **Verification commands**:
  - `grep -R "crashReporter\.start" src/main.ts` (should fail/return nothing).
  - Compile build to ensure no broken references remain: `npm run gulp compile-build`.
- **Success criteria**: No instances of `crashReporter` are initialized in `src/main.ts` and the build compiles successfully.
- **Edge cases**: None.

## 5. Constraints

- **Non-goals**: Removing telemetry from other shared processes or platform services in this execution; this is specifically scoping out the early crash reporter initialization in `src/main.ts` first.
- **Forbidden changes**: Do not modify files outside of `src/main.ts` or other runtime owned files.
- **Scope ceiling**: This work fits entirely within a single execution cycle because it involves excising an isolated early-startup code path.

## 6. Dependencies

- **Required first**: None
- **Cross-role needs**: None
- **Blocked when**: None

## 7. Result
