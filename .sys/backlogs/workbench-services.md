# Workbench Services Execution Backlog

This is the authoritative lifecycle ledger shared only by the Workbench Services planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

## WORKBENCH-SERVICES-0001 — Make excluded and out-of-contract features lazy
- State: ready
- Work order: .sys/plans/workbench-services/WORKBENCH-SERVICES-0001-lazy-excluded-services.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
