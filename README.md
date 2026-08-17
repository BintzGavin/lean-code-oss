# Lean Code OSS

A public downstream of Code - OSS focused on the small, instant, keyboard-centered editor experience: modern runtime and stable VSIX compatibility, without bundled AI, cloud, telemetry, promotional, or optional feature weight.

The authoritative product contract is [VISION.md](VISION.md). The autonomous development boundaries and cadence are in [.sys/black-hole/role-map.md](.sys/black-hole/role-map.md).

## Baselines

- Shipping source baseline: Code - OSS 1.133.0, pinned at `a5b500951314efd502d07465bd138dfbd714a960`.
- Primary historical behavior reference: Code - OSS 1.10.2, pinned at `8076a19fdcab7e1fc1707952d652f0bb6c6db331`.
- Initial target: Apple Silicon macOS 26.x.

No lean product implementation has landed yet. The repository currently contains the pinned upstream baseline, executable scaffold checks, and the twelve-role Black Hole planning/execution system.

## Validate the scaffold

```sh
node --test test/black-hole/scaffold.test.mjs
```

See [UPSTREAM.md](UPSTREAM.md) for provenance, [NOTICE.md](NOTICE.md) for licensing scope, and [docs/MANUAL-VALIDATION.md](docs/MANUAL-VALIDATION.md) for GitHub/Jules checks.
