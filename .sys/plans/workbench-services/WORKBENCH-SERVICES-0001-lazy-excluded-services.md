# WORKBENCH-SERVICES-0001 — Make excluded and out-of-contract features lazy

**Role**: `workbench-services`
**Backlog entry**: `.sys/backlogs/workbench-services.md#WORKBENCH-SERVICES-0001`

## 1. Context & Goal

- **Objective**: Ensure that chat, settings sync, MCP, and agent host services are not instantiated eagerly on application launch.
- **Vision gap**: `VISION.md` states: "Exclude from the first alpha: bundled AI, Copilot, chat... MCP, remote coding agents... Settings Sync". Yet several workbench services are still registered with `InstantiationType.Eager`.
- **Evidence**: `InstantiationType.Eager` is used in: `src/vs/workbench/services/chat/common/chatEntitlementService.ts`, `src/vs/workbench/services/mcp/electron-browser/mcpGalleryManifestService.ts`, `src/vs/workbench/services/userDataSync/browser/userDataSyncWorkbenchService.ts`, and `src/vs/workbench/services/agentHost/browser/webAgentHostEnablementService.ts`.
- **Impact**: Removes non-core, excluded features from the critical startup path and reduces baseline idle memory, aligning with the clean lean profile vision.

## 2. File Inventory

- **Create**: None
- **Modify**:
  - `src/vs/workbench/services/chat/common/chatEntitlementService.ts` (Change instantiation type)
  - `src/vs/workbench/services/mcp/electron-browser/mcpGalleryManifestService.ts` (Change instantiation type)
  - `src/vs/workbench/services/userDataSync/browser/userDataSyncWorkbenchService.ts` (Change instantiation type)
  - `src/vs/workbench/services/agentHost/browser/webAgentHostEnablementService.ts` (Change instantiation type)
- **Read-only**: `VISION.md`

## 3. Implementation Spec

- **Required behavior**: The services `IChatEntitlementService`, `IMcpGalleryManifestService`, `IUserDataSyncWorkbenchService`, and `IAgentHostEnablementService` are only initialized when explicitly requested by a feature that depends on them, rather than immediately on application load.
- **Compatibility constraints**: Must preserve standard Dependency Injection semantics; features that rely on these services should still function when invoked, causing instantiation to occur at that point.
- **Architectural constraints**: Maintain isolation. We are strictly altering when these singleton services are initialized via workbench singleton registration.
- **Public contract changes**: None. The interfaces and types remain identical.

## 4. Test Plan

- **Failing evidence**: Run a grep over the product surface: `grep -rl "registerSingleton.*InstantiationType.Eager" src/vs/workbench/services/chat src/vs/workbench/services/mcp src/vs/workbench/services/userDataSync src/vs/workbench/services/agentHost` (this should currently yield matches).
- **Verification commands**:
  - `grep -r "registerSingleton(.*IChatEntitlementService.*InstantiationType.Eager" src/vs/workbench/services/chat` (Must fail/find zero)
  - `grep -r "registerSingleton(.*IMcpGalleryManifestService.*InstantiationType.Eager" src/vs/workbench/services/mcp` (Must fail/find zero)
  - `grep -r "registerSingleton(.*IUserDataSyncWorkbenchService.*InstantiationType.Eager" src/vs/workbench/services/userDataSync` (Must fail/find zero)
  - `grep -r "registerSingleton(.*IAgentHostEnablementService.*InstantiationType.Eager" src/vs/workbench/services/agentHost` (Must fail/find zero)
- **Success criteria**: The services are registered with `InstantiationType.Delayed` and there are no regressions in base compilation (`npm run compile`).
- **Edge cases**: N/A

## 5. Constraints

- **Non-goals**: Removing the services entirely or modifying their internal logic/implementations.
- **Forbidden changes**: Do not modify product files outside of `src/vs/workbench/services/chat`, `src/vs/workbench/services/mcp`, `src/vs/workbench/services/userDataSync`, and `src/vs/workbench/services/agentHost`. Do not change functionality.
- **Scope ceiling**: Strictly limited to finding the singleton registrations and changing `Eager` to `Delayed`. Easily fits in one cycle.

## 6. Dependencies

- **Required first**: None
- **Cross-role needs**: None
- **Blocked when**: N/A

## 7. Result
