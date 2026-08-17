# Desktop and Host Runtime Execution Backlog

This is the authoritative lifecycle ledger shared only by the Desktop and Host Runtime planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

<!--
## RUNTIME-0001 — Short title
- State: ready
- Work order: .sys/plans/runtime/RUNTIME-0001-short-title.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
-->
