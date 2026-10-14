# Workbench Shell Execution Backlog

This is the authoritative lifecycle ledger shared only by the Workbench Shell planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

<!--
## WORKBENCH-SHELL-0001 — Short title
- State: ready
- Work order: .sys/plans/workbench-shell/WORKBENCH-SHELL-0001-short-title.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
-->

## WORKBENCH-SHELL-0001 — Remove optional UI imports on startup
- State: completed
- Work order: .sys/plans/workbench-shell/WORKBENCH-SHELL-0001-remove-optional-ui-imports.md
- Attempt: 1
- Claim: executor-workbench-shell-0001
- Dependencies: none
- Result: tests passed and imports removed, details in work order

## WORKBENCH-SHELL-0002 — Remove telemetry, AI, chat, and sync imports
- State: ready
- Work order: .sys/plans/workbench-shell/WORKBENCH-SHELL-0002-remove-telemetry-ai-chat-sync-imports.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
