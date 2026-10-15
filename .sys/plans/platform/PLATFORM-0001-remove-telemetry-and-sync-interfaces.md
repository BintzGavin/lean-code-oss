# PLATFORM-0001 — Remove Telemetry and Settings Sync service interfaces

**Role**: `platform`
**Backlog entry**: `.sys/backlogs/platform.md#PLATFORM-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove the platform-level interfaces and implementations for telemetry and settings sync to enforce their structural exclusion.
- **Vision gap**: The Lean Code OSS Vision strictly excludes telemetry and Settings Sync. However, `ITelemetryService` and `IUserDataSyncService` (along with related telemetry and sync services) remain available via dependency injection, allowing optional features and network requests onto startup paths.
- **Evidence**: `src/vs/platform/telemetry/common/telemetry.ts` defines `ITelemetryService`. `src/vs/platform/userDataSync/common/userDataSync.ts` defines `IUserDataSyncService` and related Sync services.
- **Impact**: Removing these cross-cutting service contracts prevents any other role from depending on telemetry or settings sync at compile-time, physically enforcing the lean profile's network and privacy constraints.

## 2. File Inventory

- **Create**: None
- **Modify**:
  - `src/vs/platform/telemetry/common/telemetry.ts` (Remove `ITelemetryService` interface and export)
  - `src/vs/platform/userDataSync/common/userDataSync.ts` (Remove `IUserDataSyncService`, `IUserDataAutoSyncService`, `IUserDataSyncEnablementService` and related interfaces/exports)
- **Read-only**: `VISION.md`, `.sys/backlogs/platform.md`

## 3. Implementation Spec

- **Required behavior**: The `ITelemetryService` and `IUserDataSyncService` decorators and interfaces must no longer exist.
- **Compatibility constraints**: Current stable VSIX compatibility does not require editor-owned telemetry or settings sync.
- **Architectural constraints**: Enforces the compile-time exclusion of optional services (telemetry, accounts/sync).
- **Public contract changes**: Removing internal platform service interfaces.

## 4. Test Plan

- **Failing evidence**: A build check or structural test that verifies `ITelemetryService` and `IUserDataSyncService` cannot be imported from `src/vs/platform`.
- **Verification commands**: `node test/black-hole/scaffold.test.mjs`
- **Success criteria**: The structural tests pass, and dependent roles will fail to compile (which is expected and will be handled by those roles).
- **Edge cases**: Stubbing or null implementations might be needed in downstream roles, but the platform layer must not provide the interfaces.

## 5. Constraints

- **Non-goals**: Fixing compilation errors in downstream roles (e.g., `workbench-services` or `workbench-features`). This work order only covers the platform surface.
- **Forbidden changes**: Do not modify files outside of `src/vs/platform`.
- **Scope ceiling**: Removing the core interface declarations fits well within one execution cycle.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: Other roles (e.g., `workbench-services`, `agentHost`) will need to remove their usage of `ITelemetryService` and `IUserDataSyncService`. This will be recorded as blocked dependencies if they fail to compile.
- **Blocked when**: None.

## 7. Result
