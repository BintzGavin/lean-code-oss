# DOCUMENTATION-0001 — Rewrite upstream contribution and security guidance

**Role**: `documentation`
**Backlog entry**: `.sys/backlogs/documentation.md#DOCUMENTATION-0001`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: Rewrite `CONTRIBUTING.md` and `SECURITY.md` to reflect Lean Code OSS as a downstream project governed by the Black Hole protocol.
- **Vision gap**: Upstream attribution, ELv2 downstream terms, or manual Jules operations documented ambiguously.
- **Evidence**: `CONTRIBUTING.md` links to `microsoft/vscode` issues and wikis. `SECURITY.md` links to Microsoft security reporting at `aka.ms/SECURITY.md`.
- **Impact**: Sets correct expectations for contributors regarding autonomous development and proper security reporting for this downstream fork.

## 2. File Inventory

- **Create**: None.
- **Modify**: `CONTRIBUTING.md`, `SECURITY.md`.
- **Read-only**: `VISION.md`, `.sys/black-hole/role-map.md`, `README.md`.

## 3. Implementation Spec

- **Required behavior**: Both markdown files must reflect the Lean Code OSS project, state the Black Hole protocol, remove all direct upstream Microsoft contribution/issue/security links, redirect to the repository's internal processes (Jules), and acknowledge the upstream source properly.
- **Compatibility constraints**: Must remain valid Markdown.
- **Architectural constraints**: Must align with `VISION.md` and `.sys/black-hole/role-map.md`.
- **Public contract changes**: Modifies the public contributing and security guidelines.

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: Run `grep "microsoft/vscode" CONTRIBUTING.md` and `grep "aka.ms" SECURITY.md` and see that they match.
- **Verification commands**:
  - `grep "microsoft/vscode" CONTRIBUTING.md ; test $? -eq 1`
  - `grep "aka.ms" SECURITY.md ; test $? -eq 1`
- **Success criteria**: No references to upstream issue trackers or Microsoft security portals remain; documents accurately describe Lean Code OSS context.
- **Edge cases**: None.

## 5. Constraints

- **Non-goals**: No changes to other documentation files.
- **Forbidden changes**: Do not modify product files, tests, status, context, memory, other roles' state, `VISION.md`, `AGENTS.md`, or `.sys/black-hole/`.
- **Scope ceiling**: Modifying two static markdown files fits easily in one execution run.

## 6. Dependencies

- **Required first**: None.
- **Cross-role needs**: None.
- **Blocked when**: If manual human intervention is required to decide on specific text for security policies.

## 7. Result

- **Status**: `completed`
- **Evidence**:
  - `CONTRIBUTING.md` rewritten to remove upstream issue tracker and wiki links, attribute Code - OSS, and direct to Jules.
  - `SECURITY.md` rewritten to remove `aka.ms/SECURITY.md` link and describe security reporting via Jules.
  - Verification commands `grep "microsoft/vscode" CONTRIBUTING.md` and `grep "aka.ms" SECURITY.md` both exit with 1.
