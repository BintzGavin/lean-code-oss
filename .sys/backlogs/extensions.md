# Built-in Extensions Execution Backlog

This is the authoritative lifecycle ledger shared only by the Built-in Extensions planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

<!--
## EXTENSIONS-0000 — Short title
- State: ready
- Work order: .sys/plans/extensions/EXTENSIONS-0000-short-title.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
-->

## EXTENSIONS-0001 — Remove Bundled AI Extensions
- State: blocked
- Work order: .sys/plans/extensions/EXTENSIONS-0001-remove-ai-extensions.md
- Attempt: 1
- Claim: none
- Dependencies: build-distribution role must clean up build/ files and package.json
- Result: pending
