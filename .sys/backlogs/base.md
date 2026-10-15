# Base Runtime Execution Backlog

This is the authoritative lifecycle ledger shared only by the Base Runtime planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

## BASE-0001 — Remove eager runaway LoadEstimator setInterval from Base IPC
- State: ready
- Work order: .sys/plans/base/BASE-0001-ipc-loadestimator.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
