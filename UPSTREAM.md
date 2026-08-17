# Upstream provenance

## Shipping baseline

- Repository: https://github.com/microsoft/vscode
- Tag: `1.133.0`
- Commit: `a5b500951314efd502d07465bd138dfbd714a960`
- Release published: 2026-08-12

The downstream main branch begins at that stable release rather than upstream `main`. Keep stable updates as explicit, benchmarked rebases or merges with a documented patch replay.

## Historical references

- Primary: Code - OSS `1.10.2`, commit `8076a19fdcab7e1fc1707952d652f0bb6c6db331`.
- Secondary: Code - OSS `1.20.1`.

Use historical source, release notes, commands, default views, and interaction flows as evidence. Do not ship obsolete Electron/Chromium/Node dependencies or run old binaries with credentials, private repositories, extensions, or network access.

The original upstream README is retained as `UPSTREAM_README.md`; upstream licensing remains in `LICENSE.txt` and `UPSTREAM_LICENSE.txt`.
