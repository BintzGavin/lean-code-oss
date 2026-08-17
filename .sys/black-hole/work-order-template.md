# [ROLE-ID-NNN] — [Bounded task title]

**Role**: `[role-id]`
**Backlog entry**: `.sys/backlogs/[role-id].md#[ROLE-ID-NNN]`

The role-local backlog owns lifecycle state. The planner freezes Sections 1–6 when the entry becomes `ready`. While an entry is `needs_input`, the planner may revise those sections only to apply its recorded resolution. The executor may append only the Result section.

## 1. Context & Goal

- **Objective**: [One-sentence outcome.]
- **Vision gap**: [The exact promise or constraint that Reality does not meet.]
- **Evidence**: [Files, symbols, tests, or observed behavior proving the gap.]
- **Impact**: [What this unlocks or corrects.]

## 2. File Inventory

- **Create**: [Exact paths with purpose, or “None”.]
- **Modify**: [Exact paths with intended change, or “None”.]
- **Read-only**: [Evidence/dependency paths that must not change.]

## 3. Implementation Spec

- **Required behavior**: [Observable behavior after completion.]
- **Compatibility constraints**: [Existing contracts that must remain true.]
- **Architectural constraints**: [Patterns/boundaries to preserve.]
- **Public contract changes**: [Explicit changes, or “None”.]

Do not include production code. Leave implementation judgment to the executor.

## 4. Test Plan

- **Failing evidence**: [Check that demonstrates the gap before implementation.]
- **Verification commands**: [Exact commands.]
- **Success criteria**: [Measurable outputs or behavior.]
- **Edge cases**: [Cases beyond the happy path.]

## 5. Constraints

- **Non-goals**: [Adjacent work excluded from this order.]
- **Forbidden changes**: [Files, APIs, behavior, or dependencies that must not change.]
- **Scope ceiling**: [Why this fits one execution run.]

## 6. Dependencies

- **Required first**: [Satisfied dependencies, or “None”.]
- **Cross-role needs**: [Dependencies for another planner, or “None”.]
- **Blocked when**: [Conditions that require a blocked result instead of broader edits.]

## 7. Result

Unfilled by the planner. The executor appends completion, blocked, or `needs_input` evidence here after claiming the work order through the role-local backlog.
