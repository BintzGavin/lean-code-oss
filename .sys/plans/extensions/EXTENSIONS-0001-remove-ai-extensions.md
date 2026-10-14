# [EXTENSIONS-0001] — Remove Bundled AI Extensions

**Role**: `extensions`
**Backlog entry**: `.sys/backlogs/extensions.md#EXTENSIONS-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Remove the bundled Copilot and prompt-basics extensions.
- **Vision gap**: `VISION.md` mandates excluding bundled AI, Copilot, chat, inline chat, agents, AI editing, prompt surfaces, and remote coding agents from the first alpha.
- **Evidence**: `extensions/copilot` and `extensions/prompt-basics` exist in the repository as bundled extensions.
- **Impact**: Removes explicitly excluded AI extensions from the shipped built-in extensions allow-list, reducing size and maintaining compliance with the Vision.

## 2. File Inventory

- **Create**: None.
- **Modify**:
  - `build/gulpfile.reh.ts` - Remove copilot build references, shim preparations, and filters if applicable.
  - `build/gulpfile.extensions.ts` - Remove `compileCopilotExtensionBuildTask`.
  - `build/hygiene.ts` - Remove `checkCopilotEnginesVersion` and its checks.
  - `package.json` - Remove copilot scripts (`copilot:setup`, `copilot:get_token`), compile scripts (`compile-copilot`), dependencies (`@github/copilot`, `@github/copilot-sdk`), and watch scripts (`watch-copilot`).
- **Delete**:
  - `extensions/copilot/`
  - `extensions/prompt-basics/`
  - `build/lib/copilot.ts`
- **Read-only**: `VISION.md`.

## 3. Implementation Spec

- **Required behavior**: The workspace builds and executes successfully without compiling or bundling `extensions/copilot` and `extensions/prompt-basics`.
- **Compatibility constraints**: Must not affect other extensions or build tasks.
- **Architectural constraints**: Maintain sandboxing, context isolation, and VSIX local installation.
- **Public contract changes**: None.

## 4. Test Plan

- **Failing evidence**: Check `ls extensions/copilot` and `ls extensions/prompt-basics`. Both directories exist.
- **Verification commands**: Run `npm run check-cyclic-dependencies`, `node test/black-hole/scaffold.test.mjs`, and verify the build works by running `npm run compile`.
- **Success criteria**: The build completes successfully without the copilot and prompt-basics directories.
- **Edge cases**: Verify `remote/node_modules` dependencies for copilot and related shims don't cause failures during `gulpfile.reh.ts` tasks.

## 5. Constraints

- **Non-goals**: Modifying base platform services to remove AI integrations. This focuses strictly on removing the bundled built-in extensions.
- **Forbidden changes**: Do not modify features outside of the `extensions` or build processes strictly related to these extensions.
- **Scope ceiling**: Removing specific bundled extensions and their immediate build references easily fits within one execution cycle.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: Build pipeline cleanup (assigned to build-distribution) if further `package.json` and `build/` files need deeper cleaning beyond immediate copilot tasks, although the executor can touch build scripts to successfully remove the extension. *Note*: The executor should remove copilot references from `build/` files as they are intrinsically tied to the extension's compilation.
- **Blocked when**: None.

## 7. Result
Execution blocked: The required modifications to build/ directory files and package.json violate the extensions executor's static ownership bounds.
