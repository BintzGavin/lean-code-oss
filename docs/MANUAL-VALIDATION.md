# Manual validation checklist

These checks cover external state that repository tests cannot prove.

## GitHub

- [ ] Confirm https://github.com/BintzGavin/lean-code-oss is public.
- [ ] Confirm the default branch points to the pinned 1.133.0 baseline plus downstream scaffold commit.
- [ ] Confirm repository auto-merge is enabled.
- [ ] Confirm `.github/workflows/auto-merge.yml` matches Helios byte-for-byte and its actor allow-list is intentional.
- [ ] Confirm the Black Hole scaffold check is a required branch check before unattended operation.
- [ ] Confirm upstream-only workflows are stored outside `.github/workflows/` and therefore do not consume Actions minutes.

## Jules

- [x] Confirm Jules has repository access to `BintzGavin/lean-code-oss` without granting unrelated new repository access.
- [x] Confirm the repo is selected in Jules and its default branch is correct.
- [x] Confirm every deployed scheduled prompt is only `Read docs/prompts/<file>.md and follow it exactly.`.
- [x] Confirm the 25-schedule pilot: all twelve planners at 12:00 AM, all twelve executors at 1:00 AM, and the release gate at 11:30 PM CDT.
- [ ] Confirm all twelve planners use 00:00, 08:00, and 16:00 from `.sys/black-hole/jules-schedules.json`.
- [ ] Confirm all twelve executors use 01:00, 09:00, and 17:00 and the same role's execution prompt.
- [x] Confirm the timezone is America/Chicago and deployed planning/execution never share an hour.
- [x] Confirm the daily release gate reads `docs/prompts/release-gate.md` and writes only `docs/release/`.
- [ ] Confirm the first scheduled pilot execution changes the cards from `No executions yet` and respects the 15-session concurrency ceiling.
- [ ] Run one planner manually, verify it changes only its plan/backlog, then run its executor and verify the claim precedes product edits.
- [ ] Verify a Jules PR triggers checks and the exact Helios auto-merge workflow.

## Product baseline

- [ ] Build unmodified Code - OSS 1.133.0 on the reference Apple Silicon Mac.
- [ ] Capture warm/cold launch, accepted-keystroke, process-tree private memory, idle CPU/network, and bundle-size samples before slimming.
- [ ] Record the 1.10.2 behavior inventory without trusting its runtime.
- [ ] Select and license the 10–15 VSIX compatibility fixtures before changing stable API behavior.
