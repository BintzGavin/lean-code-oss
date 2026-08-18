# Jules Deployment Status

**Verified:** 2026-08-17 through the Jules web UI using Computer Use  
**Repository:** `BintzGavin/lean-code-oss`  
**Branch:** `main`  
**Account limit:** 100 sessions/day and 15 simultaneous sessions

## Complete deployment

**73 schedules verified** in Jules with their exact minimal prompts and CDT times:

- 12 role planners: daily at **12:00 AM CDT**, **8:00 AM CDT**, and **4:00 PM CDT**;
- 12 matching role executors: daily at **1:00 AM CDT**, **9:00 AM CDT**, and **5:00 PM CDT**;
- one read-only release gate: daily at **11:30 PM CDT**.

Every role listed in `jules-schedules.json` has three planner schedules and three matching executor schedules. Each task contains only its repository prompt pointer:

- `Read docs/prompts/planning-<role>.md and follow it exactly.`
- `Read docs/prompts/execution-<role>.md and follow it exactly.`
- `Read docs/prompts/release-gate.md and follow it exactly.`

The final accessibility-tree scan traversed Jules's virtualized schedule list and found **73 expected, 73 present, zero missing, and zero unexpected** prompt/time pairs.

## Budget and delivery status

The deployed cadence uses 72 role sessions plus one release-gate session per day, totaling 73. The remaining **27 sessions/day are reserved** for recovery and manual work.

Deployment completion was explicitly requested before the first pilot execution. The cards still showed `Inactive` and `No executions yet` after creation, so execution delivery remains unproven until the first scheduled cycle demonstrates planner-only writes, durable executor claims, required GitHub checks, and auto-merge behavior.
