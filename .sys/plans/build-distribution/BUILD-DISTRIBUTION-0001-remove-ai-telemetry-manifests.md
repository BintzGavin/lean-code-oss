# BUILD-DISTRIBUTION-0001 — Remove AI, telemetry, and background endpoints from manifests

**Role**: `build-distribution`
**Backlog entry**: `.sys/backlogs/build-distribution.md#BUILD-DISTRIBUTION-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove all AI, Copilot, telemetry, and background service endpoint properties from `product.json` and AI dependencies from `package.json`.
- **Vision gap**: The `VISION.md` states: "Exclude from the first alpha: bundled AI, Copilot, chat, inline chat, agents, voice agents, model providers... telemetry... tunnels". Reality contains `defaultChatAgent`, `agentsTelemetryAppName`, Copilot extensions in `builtInExtensionsEnabledWithAutoUpdates`, `voiceWsUrl`, and `@github/copilot` packages.
- **Evidence**: `product.json` and `package.json` both contain forbidden components according to the vision.
- **Impact**: Removes telemetry and AI chat configurations directly from the build distribution, reducing startup size and enforcing the clean profile.

## 2. File Inventory

- **Create**: None
- **Modify**:
  - `product.json`
  - `package.json`
  - `package-lock.json`
- **Read-only**:
  - `VISION.md`
  - `docs/prompts/planning-build-distribution.md`
  - `.sys/black-hole/role-map.md`

## 3. Implementation Spec

- **Required behavior**: The application must build and run successfully without `defaultChatAgent`, `trustedExtensionAuthAccess`, `builtInExtensionsEnabledWithAutoUpdates`, `voiceWsUrl`, `agentsTelemetryAppName` in `product.json` and without `@github/copilot` dependencies in `package.json`.
- **Compatibility constraints**: Standard extensions and debugger APIs must continue to work perfectly.
- **Architectural constraints**: Maintain pure configuration updates.
- **Public contract changes**: Product manifest no longer advertises AI and telemetry.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: `grep "defaultChatAgent" product.json` returning results.
- **Verification commands**:
  - `cat product.json | grep -i copilot`
  - `cat package.json | grep -i copilot`
  - `npm i`
  - `npm run compile`
- **Success criteria**: The grep commands above return empty.
- **Edge cases**: If removing an AI dependency from `package.json` breaks another package, track it.

## 5. Constraints

- **Non-goals**: Modifying extension source code, refactoring typescript files outside the allowed build-distribution surface.
- **Forbidden changes**: Modifying anything in `src/vs` except `tsconfig.*.json` which is allowed. Do not modify `extensions/*`.
- **Scope ceiling**: This touches exactly the high level static manifests which should be straightforward inside a single run.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: None.
- **Blocked when**: N/A.

## 7. Result
