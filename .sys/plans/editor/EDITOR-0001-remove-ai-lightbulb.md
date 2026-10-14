# [EDITOR-0001] — Remove AI Lightbulb and Inline Chat Dependencies from Editor Core

**Role**: `editor`
**Backlog entry**: `.sys/backlogs/editor.md#EDITOR-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove AI lightbulb, AI quick fixes, and inline chat integration from the editor core.
- **Vision gap**: The project vision explicitly excludes bundled AI, Copilot, chat, inline chat, agents, and MCP. The editor currently contains `GUTTER_LIGHTBULB_AIFIX_ICON`, `inlineChat.start` dependencies, and telemetry components directly referencing AI and Copilot.
- **Evidence**: `src/vs/editor/contrib/codeAction/browser/lightBulbWidget.ts` contains AI fix icons. `src/vs/editor/contrib/codeAction/browser/codeActionController.ts` contains `inlineChat.start` and `FromAILightbulb`. `src/vs/editor/common/textModelEditSource.ts` contains `isAiEdit` and `inlineChat.applyEdits`.
- **Impact**: Removing these features reduces bundle size, eliminates telemetry triggers, enforces the vision constraints against AI in the base editor, and protects memory/latency budgets.

## 2. File Inventory

- **Create**: None
- **Modify**:
  - `src/vs/editor/contrib/codeAction/browser/lightBulbWidget.ts`
  - `src/vs/editor/contrib/codeAction/browser/codeActionController.ts`
  - `src/vs/editor/contrib/codeAction/browser/codeAction.ts`
  - `src/vs/editor/contrib/codeAction/browser/codeActionModel.ts`
  - `src/vs/editor/contrib/hover/browser/markerHoverParticipant.ts`
  - `src/vs/editor/common/textModelEditSource.ts`
  - `src/vs/editor/common/standaloneStrings.ts`
- **Read-only**: `VISION.md`, `.sys/black-hole/role-map.md`

## 3. Implementation Spec

- **Required behavior**: The editor should no longer attempt to show AI spark lightbulbs, evaluate `isAiEdit`, trigger inline chat commands, or process AI code actions. Standard code action lightbulbs and non-AI quick fixes must continue to function normally.
- **Compatibility constraints**: Must preserve the Monaco text-editing engine and current stable extension-facing editor behavior (e.g., standard quick fixes, hover, lightbulbs).
- **Architectural constraints**: Maintain isolation from other roles. No references to `workbench` or other services should be introduced.
- **Public contract changes**: The `isAiEdit` helper and related properties on `TextModelEditSource` should be removed.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: Run `grep -ri "AiEdit" src/vs/editor/common` and `grep -ri "GUTTER_LIGHTBULB_AIFIX_ICON" src/vs/editor` to verify the presence of AI features.
- **Verification commands**:
  - `npm run monaco-compile-check`
  - `npm run typecheck-client`
  - `./scripts/test.sh --run src/vs/editor/test`
- **Success criteria**: All typescript compilation checks pass without the removed symbols. Editor tests pass. Grep commands return empty for the AI references inside the editor product paths.
- **Edge cases**: Verify that standard lightbulbs and hover actions are not broken by the removal of the AI branches.

## 5. Constraints

- **Non-goals**: Removing inline chat from the workbench. This order is strictly bounded to the `editor` role's surface.
- **Forbidden changes**: Do not modify files outside `src/vs/editor` and `src/vs/monaco.d.ts`. Do not break the stable VSIX API for code actions.
- **Scope ceiling**: This task focuses purely on the localized AI extensions to the lightbulb and text edit sources. It is achievable within a single execution cycle.

## 6. Dependencies

- **Required first**: None
- **Cross-role needs**: Workbench features relying on `isAiEdit` or AI code actions will likely fail typechecking and require corresponding cleanup by their owning roles (e.g., `workbench-features`, `workbench-shell`). This dependency is expected and should be handled downstream.
- **Blocked when**: None

## 7. Result
