# Black Hole Gravity Map

**Locked:** 2026-08-17  
**Authoritative Vision:** `VISION.md`  
**Modern baseline:** Code - OSS 1.133.0 at `a5b500951314efd502d07465bd138dfbd714a960`  
**Historical behavior reference:** Code - OSS 1.10.2 at `8076a19fdcab7e1fc1707952d652f0bb6c6db331`

## Scaling decision

The current source tree supports twelve disjoint product roles. This is not a fixed architecture-wide limit: add or split a role only when the new role can own a static path set with no equal, ancestor, or descendant overlap and can finish useful work inside one cycle. Twelve concurrent roles remain below Jules' fifteen-session concurrency ceiling. The release gate is a thirteenth, read-only assessment stream and never writes product code or role state.

The current Jules plan has a 100-task daily limit. Three complete waves schedule 72 role tasks plus one release-gate task each day, reserving 27 tasks for manual reruns, recovery, and one-off work. The budget therefore overrides the article's unconstrained two-hour default without weakening the one-hour planner-to-executor mutex.

## Machine-checkable ownership contract

`test/black-hole/scaffold.test.mjs` rejects equal, ancestor, or descendant overlaps in this block.

```json ownership-contract
{
  "version": 1,
  "baseline": {
    "repository": "microsoft/vscode",
    "tag": "1.133.0",
    "commit": "a5b500951314efd502d07465bd138dfbd714a960"
  },
  "roles": [
    {
      "id": "base",
      "title": "Base Runtime",
      "productPaths": [
        "src/vs/base"
      ]
    },
    {
      "id": "editor",
      "title": "Editor Core",
      "productPaths": [
        "src/vs/editor",
        "src/vs/monaco.d.ts"
      ]
    },
    {
      "id": "platform",
      "title": "Platform Services",
      "productPaths": [
        "src/vs/platform",
        "src/vs/amdX.ts",
        "src/vs/nls.ts"
      ]
    },
    {
      "id": "runtime",
      "title": "Desktop and Host Runtime",
      "productPaths": [
        "src/bootstrap-cli.ts",
        "src/bootstrap-esm.ts",
        "src/bootstrap-fork.ts",
        "src/bootstrap-import.ts",
        "src/bootstrap-meta.ts",
        "src/bootstrap-node.ts",
        "src/bootstrap-server.ts",
        "src/cli.ts",
        "src/main.ts",
        "src/server-cli.ts",
        "src/server-main.ts",
        "src/vs/code",
        "src/vs/server",
        "src/vs/sessions",
        "cli",
        "remote"
      ]
    },
    {
      "id": "workbench-api",
      "title": "Workbench Extension API",
      "productPaths": [
        "src/vs/workbench/api",
        "src/vscode-dts",
        "src/typings"
      ]
    },
    {
      "id": "workbench-shell",
      "title": "Workbench Shell",
      "productPaths": [
        "src/vs/workbench/browser",
        "src/vs/workbench/common",
        "src/vs/workbench/electron-browser",
        "src/vs/workbench/workbench.common.main.ts",
        "src/vs/workbench/workbench.desktop.main.ts",
        "src/vs/workbench/workbench.web.main.internal.ts",
        "src/vs/workbench/workbench.web.main.ts"
      ]
    },
    {
      "id": "workbench-services",
      "title": "Workbench Services",
      "productPaths": [
        "src/vs/workbench/services"
      ]
    },
    {
      "id": "workbench-features",
      "title": "Workbench Features",
      "productPaths": [
        "src/vs/workbench/contrib"
      ]
    },
    {
      "id": "extensions",
      "title": "Built-in Extensions",
      "productPaths": [
        "extensions"
      ]
    },
    {
      "id": "build-distribution",
      "title": "Build and Distribution",
      "productPaths": [
        "build",
        "resources",
        "scripts",
        ".config",
        ".devcontainer",
        ".eslint-plugin-local",
        ".vscode",
        ".eslint-allowed-javascript-files",
        ".eslint-ignore",
        ".lsifrc.json",
        ".npmrc",
        ".nvmrc",
        ".vscode-test.js",
        "CodeQL.yml",
        "cglicenses.json",
        "cgmanifest.json",
        "eslint.config.js",
        "gulpfile.mjs",
        "package-lock.json",
        "package.json",
        "product.json",
        "tsfmt.json",
        "src/tsconfig.base.json",
        "src/tsconfig.defineClassFields.json",
        "src/tsconfig.json",
        "src/tsconfig.monaco.json",
        "src/tsconfig.tsec.json",
        "src/tsconfig.vscode-dts.json",
        "src/tsconfig.vscode-proposed-dts.json",
        "src/tsec.exemptions.json"
      ]
    },
    {
      "id": "quality",
      "title": "Quality and Performance",
      "productPaths": [
        "test",
        "src/vs/workbench/test",
        ".github/workflows"
      ]
    },
    {
      "id": "documentation",
      "title": "Documentation",
      "productPaths": [
        "README.md",
        "CONTRIBUTING.md",
        "SECURITY.md",
        "docs/architecture",
        "docs/decisions",
        "docs/guides",
        "docs/research",
        "docs/PROGRESS.md"
      ]
    }
  ]
}
```

## Role-local state

Every role has exclusive state at `.sys/plans/<role>/`, `.sys/backlogs/<role>.md`, `.sys/memory/<role>.md`, `.sys/context/<role>.md`, and `docs/status/<ROLE>.md`. Its planner may write only a new immutable plan and the matching backlog entry. Its executor may write only its owned product paths and its own backlog/result/memory/context/status after persisting a claim.

## Human-locked surfaces

No scheduled role may modify `VISION.md`, `AGENTS.md`, `.sys/black-hole/**`, `docs/prompts/**`, `LICENSE`, `UPSTREAM_LICENSE.txt`, `NOTICE.md`, `UPSTREAM.md`, or `.github/workflows/auto-merge.yml` without a durable human decision and role-map update. Unassigned paths are read-only.

## Cross-role work

An agent records the owning role, required artifact or behavior, and evidence needed to unblock; it never edits another role's surface. `blocked` and `needs_input` are recoverable. `completed` and explicit `cancelled` are terminal.
