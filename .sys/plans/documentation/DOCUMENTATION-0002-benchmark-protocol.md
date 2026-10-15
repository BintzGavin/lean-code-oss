# DOCUMENTATION-0002 — Document benchmark protocol and machine context

**Role**: `documentation`
**Backlog entry**: `.sys/backlogs/documentation.md#DOCUMENTATION-0002`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Document the exact measurement protocols, raw performance evidence, and reference machine context for Lean Code OSS.
- **Vision gap**: `VISION.md` includes performance constraints and requirements, but the repository lacks the raw evidence, machine context, and the exact protocols used to measure these benchmarks.
- **Evidence**: `docs/research/benchmark-protocol.md` does not exist. The benchmark claims in `VISION.md` under "Performance contract" lack raw evidence.
- **Impact**: Provides operators and contributors with a reproducible procedure for measuring process-tree private memory, CPU usage, launch time, and bundle size.

## 2. File Inventory

- **Create**: `docs/research/benchmark-protocol.md`.
- **Modify**: None.
- **Read-only**: `VISION.md`, `.sys/black-hole/role-map.md`.

## 3. Implementation Spec

- **Required behavior**: The new document must specify the reference machine context (Apple Silicon macOS 26.x) and detail the protocol for verifying warm launch (at least 20 trials), cold launch (at least 5 trials), process-tree memory, and idle CPU/network as outlined in `VISION.md`.
- **Compatibility constraints**: Must remain valid Markdown.
- **Architectural constraints**: Must align with `VISION.md` performance contract section.
- **Public contract changes**: Introduces a new public research and protocol document.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: Run `cat docs/research/benchmark-protocol.md` and see that it fails because the file does not exist.
- **Verification commands**:
  - `cat docs/research/benchmark-protocol.md`
- **Success criteria**: The file `docs/research/benchmark-protocol.md` exists and contains the protocol for the performance benchmarks defined in `VISION.md`.
- **Edge cases**: None.

## 5. Constraints

- **Non-goals**: Performing actual measurements or collecting new benchmark data.
- **Forbidden changes**: Do not modify `VISION.md`, `AGENTS.md`, or `.sys/black-hole/`.
- **Scope ceiling**: Creating one static research document fits easily in one execution run.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: None.
- **Blocked when**: None.

## 7. Result

- **Success criteria met**: Created docs/research/benchmark-protocol.md outlining reference context (Apple Silicon macOS 26.x) and metrics (warm/cold launch, process-tree memory, CPU).
- **Evidence**:
  - `cat docs/research/benchmark-protocol.md` displays the file successfully.
  - `node test/black-hole/scaffold.test.mjs` passed successfully.
