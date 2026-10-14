# [RUNTIME-0001] — Remove AI Telemetry Appenders

**Role**: `runtime`
**Backlog entry**: `.sys/backlogs/runtime.md#RUNTIME-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove the initialization of OneDataSystemAppender and AI telemetry paths from the runtime and CLI.
- **Vision gap**: The Lean Code OSS vision explicitly excludes telemetry, bundled AI, and AI onboarding, but `OneDataSystemAppender` is still instantiated using `aiConfig.ariaKey`.
- **Evidence**: Instantiations of `OneDataSystemAppender` guarded by `productService.aiConfig?.ariaKey` exist in `src/vs/code/node/cliProcessMain.ts`, `src/vs/server/node/serverServices.ts`, and `src/vs/code/electron-utility/sharedProcess/sharedProcessMain.ts`.
- **Impact**: Removing these appenders ensures that no background telemetry network requests occur and cleans up obsolete dependencies inside the runtime host lifecycle.

## 2. File Inventory

- **Create**: None
- **Modify**:
  - `src/vs/code/node/cliProcessMain.ts`
  - `src/vs/server/node/serverServices.ts`
  - `src/vs/code/electron-utility/sharedProcess/sharedProcessMain.ts`
- **Read-only**: `VISION.md`, `src/platform/telemetry/node/1dsAppender.ts`

## 3. Implementation Spec

- **Required behavior**: The runtime startup must not initialize `OneDataSystemAppender`.
- **Compatibility constraints**: The standard `TelemetryLogAppender` should be maintained if it exists. The array of appenders in the configuration should not contain `OneDataSystemAppender`.
- **Architectural constraints**: Keep the file boundaries intact. Do not touch other roles' services or platform files unless part of this runtime execution path. (Note: `src/vs/code/electron-utility` is arguably part of `src/vs/code`, and `cliProcessMain.ts` and `serverServices.ts` are owned by `runtime`).
- **Public contract changes**: None.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: Run `grep "OneDataSystemAppender" src/vs/code/node/cliProcessMain.ts` and verify it currently exists.
- **Verification commands**:
  - `grep -r "OneDataSystemAppender" src/vs/code/node/cliProcessMain.ts src/vs/server/node/serverServices.ts src/vs/code/electron-utility/sharedProcess/sharedProcessMain.ts` should return no results.
- **Success criteria**: No instances of `OneDataSystemAppender` or `aiConfig?.ariaKey` remain in the specified files.
- **Edge cases**: Ensure that removing the appender does not break the `appenders` array being passed to `TelemetryService` configuration.

## 5. Constraints

- **Non-goals**: We are not removing the underlying `1dsAppender.ts` file from `src/vs/platform/telemetry/node` because `src/vs/platform` is owned by the `platform` role.
- **Forbidden changes**: Do not modify files in `src/vs/platform` or `src/vs/workbench`.
- **Scope ceiling**: This task focuses only on the specific runtime instantiation calls, fitting comfortably within one executor run.

## 6. Dependencies

- **Required first**: None
- **Cross-role needs**: None
- **Blocked when**: None

## 7. Result
