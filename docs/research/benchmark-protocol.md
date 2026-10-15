# Benchmark Protocol

This document outlines the required protocol, raw performance evidence structure, and reference machine context used to measure the Lean Code OSS performance contract as defined in `VISION.md`.

## Machine Context

All baseline performance measurements must be recorded on the primary target hardware for the first alpha release:
- **Hardware**: Apple Silicon
- **OS**: macOS 26.x

No virtualized hardware or CI runners may be used as the authoritative measurement source due to variance in startup timing and idle memory.

## Launch Speed Protocol

The application bundle must be fully built and signed (if applicable for the platform, though signing is a later milestone for non-macOS).

1. **Warm Launch**: Measure from process start to the first accepted keystroke in a newly opened editor window.
   - **Condition**: Ensure the application was recently opened and closed to warm file caches.
   - **Trials**: At least 20 trials.
   - **Requirement**: p50 at or below 600 ms, p95 at or below 900 ms. At least 40% faster than unmodified Code - OSS 1.133.0.

2. **Cold Launch**: Measure from process start to the first accepted keystroke.
   - **Condition**: Clear OS file cache (e.g., via `purge` command on macOS) or reboot between trials.
   - **Trials**: At least 5 trials.
   - **Requirement**: p50 at or below 1.2 s, p95 at or below 1.7 s.

## Memory & CPU Protocol

1. **Idle Private Memory**:
   - **Condition**: Open the editor with a clean profile. Wait 60 seconds of idle time with no user interaction.
   - **Measurement**: Capture the sum of private memory used by the *entire process tree*.
   - **Requirement**: at or below 250 MB (Stretch goal: 200 MB). Must be at least 35% lower than Code - OSS 1.133.0.

2. **Idle CPU**:
   - **Condition**: Open the editor with a clean profile. Wait 60 seconds of idle time.
   - **Measurement**: Record the CPU utilization over five settled minutes.
   - **Requirement**: Median CPU usage at or below 0.5%.

## Network Activity

- **Requirement**: No editor-owned network requests may occur while idle. The protocol requires capturing network traffic during the 5-minute idle CPU test to confirm zero unprompted outbound connections.

## Bundle Size

- **Requirement**: At least 30% smaller signed application bundle.

## Reporting Evidence

Every performance claim must preserve and record raw samples, the upstream comparison taken on the same reference machine, process-tree memory, and accepted-keystroke timings.
