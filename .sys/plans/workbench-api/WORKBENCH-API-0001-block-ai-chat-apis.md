# WORKBENCH-API-0001 — Block AI, Chat, LM, and MCP APIs explicitly

**Role**: `workbench-api`
**Backlog entry**: `.sys/backlogs/workbench-api.md#WORKBENCH-API-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Make all extension-host AI, chat, language model, and MCP proposed APIs explicitly fail with a Blocked `LanguageModelError` rather than silently starting unsupported services.
- **Vision gap**: The Vision explicitly excludes bundled AI, Copilot, chat, agents, model providers, and MCP. Reality currently permits API access that tries to wire to non-existent or excluded services.
- **Evidence**: `src/vs/workbench/api/common/extHostLanguageModels.ts` and `src/vs/workbench/api/common/extHostChatAgents2.ts` implement these APIs by proxying to the main thread.
- **Impact**: Provides honest and immediate failure for extensions relying on removed AI features, preventing silent failure or unexpected proxy behavior, matching the Lean Code OSS explicit API contract.

## 2. File Inventory

- **Create**: None.
- **Modify**:
  - `src/vs/workbench/api/common/extHostLanguageModels.ts` (Block language model access and registration)
  - `src/vs/workbench/api/common/extHostChatAgents2.ts` (Block chat agents and tools)
  - `src/vs/workbench/api/common/extHost.api.impl.ts` (Alternatively/additionally, block entry points at the top-level API instantiation)
- **Read-only**:
  - `src/vscode-dts/vscode.d.ts` (To ensure we only block, not modify the shape of the API)
  - `src/vs/workbench/api/common/extHostTypes.ts` (To use `LanguageModelError.Blocked`)

## 3. Implementation Spec

- **Required behavior**: Calling APIs like `lm.selectChatModels`, `lm.registerLanguageModelChatProvider`, `chat.createChatAgent`, `lm.registerTool`, etc. must instantly throw a `LanguageModelError.Blocked` (or similar clear error for non-LM features) without proxying to the main thread.
- **Compatibility constraints**: The static type shapes in `vscode.d.ts` must remain fully intact for buildability, we are just altering the runtime execution.
- **Architectural constraints**: Block at the earliest boundary within the `workbench-api` product surface (ideally in `extHost*.ts` files or `extHost.api.impl.ts`).
- **Public contract changes**: None structurally. Behavioral change: AI/Chat APIs reliably throw unsupported errors.

## 4. Test Plan

- **Failing evidence**: Write a test in `src/vs/workbench/api/test/common/extHostChatAgents2.test.ts` or `src/vs/workbench/api/test/browser/mainThreadLanguageModels.test.ts` that asserts an API call like `chat.createChatAgent` or `lm.selectChatModels` fails instantly with `LanguageModelError.Blocked`.
- **Verification commands**: `npm run test -- test/unit/browser --grep "ExtHostChatAgents2|MainThreadLanguageModels"` (or similar subset to verify).
- **Success criteria**: Tests must pass proving that these API calls throw `LanguageModelError.Blocked()`.
- **Edge cases**: Ensure standard non-AI APIs (like standard tree views, webviews) still work unhindered.

## 5. Constraints

- **Non-goals**: Removing the files or types entirely; we must preserve the type contract.
- **Forbidden changes**: Do not modify files outside `src/vs/workbench/api`, `src/vscode-dts`, or `src/typings`.
- **Scope ceiling**: Can be accomplished within the extension host proxies by throwing errors rather than executing logic.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: None (this is purely extension API stubbing).
- **Blocked when**: N/A.

## 7. Result
