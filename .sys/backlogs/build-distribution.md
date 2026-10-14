# Build and Distribution Execution Backlog

This is the authoritative lifecycle ledger shared only by the Build and Distribution planner and executor.

Allowed states: `draft`, `needs_input`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.

Only `completed` and explicit `cancelled` are terminal. Keep at most one nonterminal entry.

## BUILD-DISTRIBUTION-0001 — Remove AI, telemetry, and background endpoints from manifests
- State: blocked
- Work order: .sys/plans/build-distribution/BUILD-DISTRIBUTION-0001-remove-ai-telemetry-manifests.md
- Attempt: 1
- Claim: none
- Dependencies: none
- Result: compile-build fails with mangler complaining about protected fields turning public due to changes in sessionChangesEditor.ts (workbench-features). This must be fixed upstream before build-distribution can complete safely.
