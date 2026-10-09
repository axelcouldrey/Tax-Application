# 0004. Adopt Semantic Versioning

- **Status:** Accepted
- **Date:** 2026-10-09
- **Related:** #13, #95, #101

## Context

The application has no version numbers, tags, or releases. `package.json`
still has the scaffold default of `0.0.0`. Merged pull requests form a
continuous stream of changes with no release boundaries, so there is no way to
say which version is running, what changed between two points in time, or
which point to roll back to.

This will matter more as the roadmap progresses: a backend API with clients
in Phase 2, deployments built from releases in Phase 7, and production
infrastructure in Phase 8.

## Considered Options

1. **No versioning:** deploy whatever is on `master`. Simple, but gives no
   communication, rollback points, or release planning.
2. **Calendar versioning (CalVer), such as `2026.10.0`:** shows when a release
   happened, which suits products released on a fixed schedule. It says
   nothing about whether a release is safe to adopt.
3. **Semantic Versioning (SemVer):** `MAJOR.MINOR.PATCH`, where each number
   signals the kind of change. The most widely used scheme, understood by npm,
   NuGet, and release tooling.

## Decision

We will version the application with **Semantic Versioning 2.0.0**, tag
releases as `vX.Y.Z` with annotated Git tags, and publish release notes as
GitHub Releases grouped using the Keep a Changelog headings.

The application stays on `0.y.z` until Phase 8 is complete, with one MINOR
version per roadmap phase, and releases **1.0.0** when it runs on cloud
infrastructure through the CI/CD pipeline.

The detailed rules are in
[versioning-and-releases.md](../../versioning-and-releases.md).

## Consequences

- Each version number tells readers whether an upgrade is safe, and each tag
  is a fixed point to deploy or roll back to.
- Milestones map releases to roadmap phases, giving release planning a
  visible progress measure.
- SemVer pairs with Conventional Commits (#95): `fix` maps to PATCH, `feat` to
  MINOR, and a breaking-change marker to MAJOR. This makes version bumps and
  changelog generation (#101) automatable.
- Someone must judge whether a change is breaking. The definitions in the
  versioning document reduce guesswork but do not remove it.
- Releasing becomes an explicit step with its own pull request, tag, and
  notes, which adds a small amount of process to each phase.
