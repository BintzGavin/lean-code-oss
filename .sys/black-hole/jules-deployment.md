# Jules Deployment Status

**Verified:** 2026-08-17 through the Jules web UI using Computer Use  
**Repository:** `BintzGavin/lean-code-oss`  
**Branch:** `main`  
**Account limit:** 100 sessions/day and 15 simultaneous sessions

## Deployed pilot wave

**25 schedules verified** in Jules with their exact minimal prompts and CDT times:

- 12 role planners: daily at **12:00 AM CDT**;
- 12 matching role executors: daily at **1:00 AM CDT**;
- one read-only release gate: daily at **11:30 PM CDT**.

Every role listed in `jules-schedules.json` has one planner/executor pair. The UI exposed all 25 prompt cards after creation, and an automated accessibility-tree check found no missing prompt/time pair.

The cards showed `Inactive` and `No executions yet` immediately after creation. Confirm the first midnight/1:00 AM run before treating execution delivery as proven.

## Planned expansion

The repository contract defines three complete waves per day. The pilot still needs these 48 daily schedules:

- planners at **08:00 AM** and **04:00 PM (16:00)** CDT;
- executors at **09:00 AM** and **05:00 PM (17:00)** CDT.

After expansion, the system will use 72 role sessions plus one release-gate session per day, totaling 73 and reserving 27 of the 100 daily sessions for recovery and manual work.

Do not add the expansion until the first pilot cycle proves planner-only writes, durable executor claims, required GitHub checks, and auto-merge behavior.
