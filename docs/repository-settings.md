# Repository Settings

This document records the GitHub settings configured for this repository and
why. These settings live in GitHub, not in the code, so this file is the
reference for what is enforced and the history of why it was chosen.

If you change a setting in GitHub, update this document in the same pull
request or immediately after.

## Branch Ruleset: `Protect master`

Configured under **Settings → Rules → Rulesets**.

| Setting            | Value                     |
| ------------------ | ------------------------- |
| Enforcement status | Active                    |
| Target             | Default branch (`master`) |
| Bypass list        | Empty: no one is exempt   |

| Rule                                  | Why                                                                                                                                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Restrict deletions                    | The default branch cannot be deleted.                                                                                                                                                              |
| Block force pushes                    | History on `master` cannot be rewritten, so merged work cannot be lost.                                                                                                                            |
| Require a pull request before merging | Every change goes through a pull request, so it is linked to an issue, verified by CI, and recorded. Direct pushes to `master` are rejected.                                                       |
| Allowed merge methods: squash only    | Each pull request becomes one commit on `master`, titled with its Conventional Commit pull request title. See [ADR-0005](architecture/decisions/0005-squash-merge-with-conventional-pr-titles.md). |
| Require status checks to pass         | The `Quality checks` job from the [PR checks workflow](../.github/workflows/pr-checks.yml) must pass before merging.                                                                               |
| Require branches to be up to date     | A branch must include the latest `master` before merging, so CI has tested the code that will actually exist after the merge.                                                                      |

The bypass list is deliberately empty, including for repository admins. Rules
that the owner can skip are not really rules.

### Deliberate Exception: Zero Required Approvals

Required approvals are set to **0**. This is a solo project, and GitHub does
not allow authors to approve their own pull requests, so requiring an approval
would block every merge.

In a team setting this should be at least **1**. Raise it as soon as a second
contributor joins.

## Plan Dependency

On the GitHub Free plan, rulesets and branch protection are only enforced on
**public** repositories. A private repository on the Free plan returns:

> Upgrade to GitHub Pro or make this repository public to enable this feature.

The repository was made **public** so the rules above are enforced without a
paid plan. If it is made private again, it will need GitHub Pro (personal
accounts) or GitHub Team or Enterprise (organisations) to keep the rules
enforced.

Because the repository is public, never commit secrets. Configuration that
must stay private belongs in environment variables or a secrets manager (see
[ROADMAP.md](../ROADMAP.md), Phase 10).

## Pull Request Settings

Configured under **Settings → General → Pull Requests**.

| Setting                            | Value              | Why                                                                                                                                                         |
| ---------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Automatically delete head branches | On                 | Merged branches are removed from GitHub automatically. Local branches still need deleting by hand.                                                          |
| Allow merge commits                | Off                | Squash merging only. See [ADR-0005](architecture/decisions/0005-squash-merge-with-conventional-pr-titles.md).                                               |
| Allow squash merging               | On                 | Each pull request becomes one commit on `master`.                                                                                                           |
| Squash default commit message      | Pull request title | The pull request title, which follows [Conventional Commits](commit-conventions.md), becomes the commit message. The description stays on the pull request. |
| Allow rebase merging               | Off                | Squash merging only.                                                                                                                                        |

## Security Settings

Configured under **Settings → Advanced Security**.

| Setting           | Value | Why                                                                                                                              |
| ----------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| Dependabot alerts | On    | GitHub alerts when a dependency has a newly published vulnerability. Automated scanning in CI is planned separately (issue #84). |
