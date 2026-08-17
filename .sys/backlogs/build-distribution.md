# Build and Distribution Execution Backlog

This is the authoritative lifecycle ledger shared only by the Build and Distribution planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

<!--
## BUILD-DISTRIBUTION-0001 — Short title
- State: ready
- Work order: .sys/plans/build-distribution/BUILD-DISTRIBUTION-0001-short-title.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
-->
