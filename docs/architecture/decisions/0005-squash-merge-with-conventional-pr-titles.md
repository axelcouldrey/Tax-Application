# 0005. Squash Merge With Conventional Commit Pull Request Titles

- **Status:** Accepted
- **Date:** 2026-10-10
- **Related:** #95, #13, #101, [ADR-0004](0004-adopt-semantic-versioning.md)

## Context

[ADR-0004](0004-adopt-semantic-versioning.md) adopted Semantic Versioning, and
issue #101 plans to generate release notes automatically. Both work best when
every commit on `master` states what kind of change it is, using Conventional
Commits.

Until now all three GitHub merge methods were allowed and merge commits were
used. Every branch commit therefore landed on `master`, including work in
progress such as `fix typo`, alongside a `Merge pull request #N` commit. For
Conventional Commits to be reliable, every one of those commits would need a
correctly formatted message.

## Considered Options

1. **Merge commits:** keeps the full branch history, but every branch commit
   must follow the format, and history includes merge commits.
2. **Rebase and merge:** a linear history with every commit kept, but every
   commit must follow the format and is rewritten with a new ID.
3. **Squash and merge:** each pull request becomes one commit on `master`. Only
   the message of that one commit needs to follow the format.

## Decision

We will allow **squash merging only**, enforced in the `Protect master`
ruleset, with the squash commit message defaulting to the **pull request
title**. Pull request titles must follow Conventional Commits, as described in
[commit-conventions.md](../../commit-conventions.md).

## Consequences

- `master` has one commit per pull request, each with a typed, readable
  message and a link to its pull request.
- Only the pull request title has to follow the format. Developers can commit
  freely on their branches.
- Reverting a pull request means reverting one commit.
- Individual branch commits are not kept on `master`. They remain visible on
  the merged pull request.
- Because commits on `master` are new squash commits, Git does not see a merged
  branch as merged. Deleting a local branch after its pull request merges needs
  `git branch -D` instead of `git branch -d`, after confirming the pull request
  merged.
- The title format is a convention only, until it is checked automatically in
  CI.
