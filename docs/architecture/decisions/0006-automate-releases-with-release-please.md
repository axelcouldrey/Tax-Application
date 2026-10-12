# 0006. Automate Releases With Release Please

- **Status:** Accepted
- **Date:** 2026-10-12
- **Related:** #101, [ADR-0004](0004-adopt-semantic-versioning.md),
  [ADR-0005](0005-squash-merge-with-conventional-pr-titles.md)

## Context

[ADR-0004](0004-adopt-semantic-versioning.md) defined Semantic Versioning,
tags, and release notes, with a manual release process: bump the version,
write the changelog, tag, and publish a GitHub Release by hand.
[ADR-0005](0005-squash-merge-with-conventional-pr-titles.md) made every commit
on `master` a typed Conventional Commit. Together they contain everything a
tool needs to work out the next version and the release notes, so the manual
steps are repetitive and error-prone.

Releases should remain a deliberate decision, made once per roadmap phase, not
an automatic result of every merge.

Any automation that opens pull requests must also work with the `Protect
master` ruleset, which requires the `Quality checks` job to pass. Pull
requests opened with the workflow's built-in `GITHUB_TOKEN` do not trigger
other workflows, so their checks never run and they can never merge.

## Considered Options

**Release tool**

1. **Keep releasing by hand:** no tooling, but slow and easy to get wrong.
2. **semantic-release:** releases automatically on every merge to `master`.
   Suits continuous deployment, but removes the human release decision.
3. **git-cliff or conventional-changelog:** generate a changelog only. Version
   bumps, tags, and releases stay manual.
4. **Release Please:** keeps a release pull request open that accumulates the
   version bump and changelog. Merging it tags and publishes the release.

**Identity for the automation**

1. **`GITHUB_TOKEN`:** no setup, but its pull requests do not trigger the
   required checks.
2. **A personal access token:** works, but acts as a person, is long-lived,
   and stops working if that person leaves.
3. **A GitHub App:** a separate bot identity with only the permissions it
   needs, installed on this repository only, issuing tokens that expire after
   an hour.

## Decision

We will automate releases with **Release Please**, run by the `Release`
workflow on every push to `master`, authenticated as a dedicated **GitHub
App** (`axelcouldrey-release-bot`).

The release pull request is titled `chore(release): vX.Y.Z`. Merging it is the
release decision.

Release Please publishes the GitHub Release, which creates the `vX.Y.Z` tag.
These are lightweight tags, not the annotated tags described in ADR-0004; the
GitHub Release records who released it, when, and the notes. This amends the
tag type in ADR-0004 and leaves the rest of that decision unchanged.

## Consequences

- Version bumps, `CHANGELOG.md`, tags, and GitHub Releases are produced from
  Conventional Commit history, with no manual steps beyond merging.
- The release pull request is a live preview of the next release, and its
  changelog can be edited before merging.
- The release pull request runs the same checks as any other pull request.
- The app's private key is a credential to protect and rotate. Its setup is
  recorded in [repository-settings.md](../../repository-settings.md).
- `CHANGELOG.md` is generated, so it is excluded from Prettier.
- Commits before Conventional Commits were adopted are ignored
  (`bootstrap-sha`), so changes from before #111 must be summarised by hand in
  the first release's notes.
- The first release is forced to `0.1.0` with `release-as`. That setting must
  be removed after `v0.1.0` is released, or every later release would also be
  `0.1.0`.
