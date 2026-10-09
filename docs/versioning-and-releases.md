# Versioning And Releases

This document defines how the application is versioned, how releases are
tagged, and what release notes contain. The reasoning is recorded in
[ADR-0004](architecture/decisions/0004-adopt-semantic-versioning.md).

## Semantic Versioning

The application follows [Semantic Versioning 2.0.0](https://semver.org/).
A version has three numbers:

```txt
MAJOR.MINOR.PATCH
  1  .  4  .  2
```

The version in `package.json` is the single source of truth for the current
application version.

### When Each Number Changes

SemVer is defined in terms of a public API. For this application, the public
surface is:

- the user-facing calculator and its documented behaviour
- the backend HTTP API contract, once it exists (Phase 2)
- stored user data, once it exists (Phase 3)

| Change                                                                                              | Bump      | Examples                                                                                                      |
| --------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| A **breaking** change: something that worked before stops working, or users or API clients must act | **MAJOR** | Removing or renaming an API endpoint or field; removing a feature; a data change that needs user action       |
| A **backwards-compatible addition**                                                                 | **MINOR** | A new calculator option; a new API endpoint or optional field; a new country; rules for a new tax year        |
| A **backwards-compatible fix**                                                                      | **PATCH** | Correcting a wrong calculation; fixing a UI bug; fixing a wrong source link; a security patch to a dependency |

When a version number goes up, the numbers to its right reset to zero:
`1.4.2` → `1.5.0` → `2.0.0`.

Changes that do not affect users, such as documentation, tests, CI, or
refactoring, do not need a release on their own. They ship in the next release.

### Before 1.0.0

While the version is `0.y.z`, the application is in initial development and
nothing is guaranteed to be stable. During this period:

- **MINOR** (`0.1.0` → `0.2.0`) marks each completed roadmap phase, including
  phases with breaking changes.
- **PATCH** (`0.2.0` → `0.2.1`) is used for fixes between phases.

Version **1.0.0** is released when Phase 8 (Cloud Infrastructure as Code) is
complete and the application runs on real infrastructure through the CI/CD
pipeline. From then on, breaking changes require a MAJOR version.

## Prereleases

A prerelease is a test version before a final release. It is written as the
target version, a hyphen, a stage, and a counter:

| Stage             | Format          | Meaning                                              |
| ----------------- | --------------- | ---------------------------------------------------- |
| Alpha             | `1.0.0-alpha.1` | Incomplete. Features may still be missing or change. |
| Beta              | `1.0.0-beta.1`  | Feature complete, but may contain known bugs.        |
| Release candidate | `1.0.0-rc.1`    | Ready to ship unless a blocking bug is found.        |

Prereleases sort before the final release:
`1.0.0-alpha.1` < `1.0.0-beta.1` < `1.0.0-rc.1` < `1.0.0`.

Prereleases are optional. Use them when a release needs testing in a real
environment before it is final, which becomes relevant once there is a
deployment pipeline (Phase 7 onward). Mark them as **pre-release** on GitHub.

## Git Tags

Every release is marked with a Git tag on the merge commit in `master`.

- **Format:** `v` followed by the version: `v0.1.0`, `v1.0.0-rc.1`.
- **Type:** annotated tags, which record who tagged the release and when.
  Lightweight tags are not used for releases.
- **Immutability:** a published tag is never moved or deleted. If a release
  is wrong, publish a new PATCH version.

```bash
git tag -a v0.1.0 -m "v0.1.0: Engineering foundations"
git push origin v0.1.0
```

## Release Notes

Every release is published as a
[GitHub Release](https://github.com/axelcouldrey/Tax-Application/releases) from
its tag. Release notes are written for the people affected by the release,
not as a list of commits.

Group changes under these headings, following
[Keep a Changelog](https://keepachangelog.com/). Omit empty headings.

| Heading        | For                                               |
| -------------- | ------------------------------------------------- |
| **Added**      | New features                                      |
| **Changed**    | Changes to existing behaviour                     |
| **Deprecated** | Features that will be removed in a future release |
| **Removed**    | Features removed in this release                  |
| **Fixed**      | Bug fixes                                         |
| **Security**   | Vulnerability fixes                               |

Each entry:

- describes the change from the reader's point of view in one line
- links the issue or pull request, for example `(#106)`

Breaking changes are listed first, under a **Breaking changes** heading, with
what readers need to do.

Automated changelog generation is planned in issue #101 and will build on
these headings.

## Milestones

Each planned release has a GitHub milestone. Issues are assigned to the
milestone of the release they are expected to ship in, so the milestone's
progress bar shows how close the release is.

| Milestone | Roadmap phase                           |
| --------- | --------------------------------------- |
| v0.1.0    | Phase 0: Engineering Foundations        |
| v0.2.0    | Phase 1: Deepen Domain Testing          |
| v0.3.0    | Phase 2: Backend API                    |
| v0.4.0    | Phase 3: Data Persistence               |
| v0.5.0    | Phase 4: Authentication & Authorization |
| v0.6.0    | Phase 5: Saved Scenarios                |
| v0.7.0    | Phase 6: Containerization               |
| v0.8.0    | Phase 7: CI/CD Pipeline                 |
| v1.0.0    | Phase 8: Cloud Infrastructure as Code   |
| v1.1.0    | Phase 9: Observability                  |
| v1.2.0    | Phase 10: Security Hardening            |
| v1.3.0    | Phase 11: Scale & Multi-Country         |

Milestones are created when work on the previous phase starts, so there are
only ever one or two open ahead of the current work. If a phase introduces a
breaking change after 1.0.0, its milestone becomes the next MAJOR version.

## Release Process

1. Confirm every issue in the milestone is closed or moved to a later one.
2. Create a branch `chore/release-vX.Y.Z` and update `version` in
   `package.json` and `package-lock.json`:

   ```bash
   npm version X.Y.Z --no-git-tag-version
   ```

3. Open a pull request titled `Release vX.Y.Z` and merge it once checks pass.
4. On an up-to-date `master`, create and push an annotated tag for the merge
   commit.
5. Create a GitHub Release from the tag, with release notes as described
   above.
6. Close the milestone.
