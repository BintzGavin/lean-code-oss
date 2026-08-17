# Lean Code OSS Agent Instructions

Read `VISION.md` completely. It is the only authoritative future-state document. Then read `.sys/black-hole/role-map.md` and the prompt for the scheduled role.

## Black Hole protocol

- Planners compare Vision with Reality and write one immutable role-local work order plus its backlog entry. Planners never write product code.
- Executors persist a `ready` → `in_progress` claim before product edits, implement only the claimed work order inside their static surface, verify it, update role-local evidence, and stop.
- No two roles share a product or state write surface. Unassigned and human-locked paths are read-only.
- Cross-role needs become recoverable dependencies. Never edit another role's files on its behalf.
- Budgeted planning waves run at 00:00, 08:00, and 16:00; execution follows at 01:00, 09:00, and 17:00 in America/Chicago. Time is the mutex.
- Memory files hold only critical reusable learnings, never routine logs.
- Only `completed` and explicit `cancelled` are terminal; `blocked` and `needs_input` remain recoverable.
- Start behavior changes with a failing executable check. Do not weaken security or stable VSIX compatibility for performance.

## Git and PRs

Keep each PR atomic and inside one role. Do not change `.github/workflows/auto-merge.yml`, the Vision, role map, prompts, or licenses without a recorded human decision. Auto-merge follows the byte-identical Helios workflow and therefore only trusts its explicit actor allow-list.
