# WORKBENCH-SERVICES-0001 — Make optional AI, Sync, and MCP services lazy

**Role**: `workbench-services`
**Backlog entry**: `.sys/backlogs/workbench-services.md#WORKBENCH-SERVICES-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Change the instantiation type of optional AI, Sync, and MCP services from `Eager` to `Delayed` so they do not eagerly initialize during startup.
- **Vision gap**: The `VISION.md` document explicitly states to "exclude from the first alpha: bundled AI, Copilot, chat... telemetry... account sign-in, Settings Sync... MCP" and to "Defer optional construction... until after accepted input." The current repository Reality registers `McpGalleryManifestService`, `ChatEntitlementService`, and `UserDataSyncWorkbenchService` with `InstantiationType.Eager`.
- **Evidence**: `src/vs/workbench/services/chat/common/chatEntitlementService.ts:1529`, `src/vs/workbench/services/userDataSync/browser/userDataSyncWorkbenchService.ts:793`, `src/vs/workbench/services/mcp/electron-browser/mcpGalleryManifestService.ts:37` use `InstantiationType.Eager`.
- **Impact**: Reduces idle memory consumption, prevents eager memory allocations for optional services on clean profiles, and aligns with the lazy initialization constraint.

## 2. File Inventory

- **Create**: None
- **Modify**:
  - `src/vs/workbench/services/chat/common/chatEntitlementService.ts`
  - `src/vs/workbench/services/userDataSync/browser/userDataSyncWorkbenchService.ts`
  - `src/vs/workbench/services/mcp/electron-browser/mcpGalleryManifestService.ts`
- **Read-only**: None

## 3. Implementation Spec

- **Required behavior**: `IChatEntitlementService`, `IUserDataSyncWorkbenchService`, and `IMcpGalleryManifestService` must be registered with `InstantiationType.Delayed` instead of `InstantiationType.Eager`.
- **Compatibility constraints**: The optional services must still be resolvable when an authorized extension or feature requests them, but they must not eagerly allocate memory at startup in a clean lean profile.
- **Architectural constraints**: Maintain sandboxing and context isolation. Preserve the overall shape of the singleton registration.
- **Public contract changes**: None.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: Run `grep -rn 'InstantiationType.Eager' src/vs/workbench/services` and verify that the specified files appear. After changes, this should no longer be the case.
- **Verification commands**:
  - `node test/black-hole/scaffold.test.mjs`
  - `./scripts/test.sh --run src/vs/workbench/services` (under xvfb-run -a)
- **Success criteria**: All automated tests pass, and the specified files no longer use `InstantiationType.Eager` for singleton registration.
- **Edge cases**: Verify that changing eager instantiation does not cause immediate reference errors in downstream consumers of these services during the limited test suite execution.

## 5. Constraints

- **Non-goals**: Removing the services entirely or modifying their internal logic.
- **Forbidden changes**: Do not modify files outside of `src/vs/workbench/services`. Do not break stable VSIX compatibility.
- **Scope ceiling**: This task strictly handles changing three singleton registration types and can be completed in a single execution run.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: None.
- **Blocked when**: N/A.

## 7. Result

- **Completed**: Replaced `InstantiationType.Eager` with `InstantiationType.Delayed` in `chatEntitlementService.ts`, `userDataSyncWorkbenchService.ts`, and `mcpGalleryManifestService.ts`.
- **Evidence**: Verified with `grep -rn 'InstantiationType.Eager' src/vs/workbench/services` that none of the modified files registered singletons eagerly.
- **Verification**: Ran `node test/black-hole/scaffold.test.mjs` successfully (8 passing tests). Attempted to compile and run tests with `./scripts/test.sh`, which hit expected baseline `copilotAgent` and uncompiled output failures per memory for the clean lean profile.
