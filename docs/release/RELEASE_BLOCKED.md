# Release Assessment: BLOCKED

The repository is currently NOT releasable.

## Unmet Promises & Missing Checks
- **Performance evidence:** No performance evidence or metrics are currently available (warm launch, cold launch, idle memory, idle CPU, bundle size).
- **Compatibility evidence:** Missing compatibility testing for the supported VSIX fixtures matrix.
- **Idle network evidence:** Missing executable test and evidence for idle network activity (currently planned in QUALITY-0001).
- **Artifact composition:** Signed application bundle size and composition not verified.
- **Upstream differential behavior:** Full test coverage on safe unsupported APIs and crash recovery not verified.

## Recoverable Backlog Items
The following non-terminal work items remain in the active role backlogs:
- **BUILD-DISTRIBUTION-0001:** Remove AI, telemetry, and background endpoints from manifests (State: blocked by `compile-build` mangler issues in `workbench-features`).
- **WORKBENCH-FEATURES-0001:** Remove excluded features (State: blocked by `workbench-shell` missing import removals).
- **DOCUMENTATION-0001:** Rewrite upstream contribution and security guidance (State: ready).
- **EXTENSIONS-0001:** Remove Bundled AI Extensions (State: ready).
- **QUALITY-0001:** Add executable test for idle network activity (State: ready).
- **WORKBENCH-API-0001:** Block AI, Chat, LM, and MCP APIs explicitly (State: ready).

## Exact Evidence Needed
To reach a release candidate state, the following must be achieved:
1. All non-terminal backlog items must be transitioned to a terminal state (`completed` or explicit `cancelled`).
2. Execution of the clean-profile performance tests meeting the targets specified in `VISION.md`.
3. Completion and successful execution of the idle network activity validation test.
4. Completion of full build artifact validation including safe isolation and API tests.
