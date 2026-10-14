# Workbench Features Execution Backlog

This is the authoritative lifecycle ledger shared only by the Workbench Features planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

<!--
## WORKBENCH-FEATURES-0001 — Short title
- State: ready
- Work order: .sys/plans/workbench-features/WORKBENCH-FEATURES-0001-short-title.md
- Attempt: 0
- Claim: none
- Dependencies: none
- Result: pending
-->

## WORKBENCH-FEATURES-0001 — Remove excluded features
- State: blocked
- Work order: .sys/plans/workbench-features/WORKBENCH-FEATURES-0001-remove-excluded-features.md
- Attempt: 0
- Claim: none
- Dependencies: workbench-shell must remove the imports of prohibited features (chat, mcp, agentsVoice, inlineChat, telemetry, userDataSync, and welcome screens) from src/vs/workbench/workbench.common.main.ts
- Result: pending
