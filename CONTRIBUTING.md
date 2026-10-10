# Contributing

This guide explains how to propose, make, and submit a change. It is the entry
point for contributors. Detailed rules live in the documents it links to.

Every change follows the same path:

```txt
Issue → Branch → Commits → Pull request → Checks → Squash merge
```

## Before You Start

- Read the [README](README.md) for what the application does and its current
  limitations.
- Check the [ROADMAP](ROADMAP.md) and
  [open issues](https://github.com/axelcouldrey/Tax-Application/issues) to see
  whether the work is already planned.
- To report a security vulnerability, do **not** open a public issue. Follow
  the [security policy](SECURITY.md) instead.

## Set Up Your Environment

Follow [Prerequisites](README.md#prerequisites) and
[Local Setup](README.md#local-setup) in the README. In short:

```bash
nvm use
npm install
npm run dev
```

Enable format on save in your editor (see [Formatting](README.md#formatting)),
so formatting never fails in CI.

## 1. Start From An Issue

Every change starts from a GitHub issue, so the reason for the change is
recorded before the code is written.

- Open a new issue with the **Bug report** or **Change request** template.
  Blank issues are disabled.
- Describe the problem first, then the outcome and acceptance criteria.
- Large pieces of work are split into an epic with sub-issues.
- Labels are applied as described in [docs/labels.md](docs/labels.md). The
  issue forms add a type label automatically.

## 2. Create A Branch

Branch from an up-to-date `master`, named after the issue:

```txt
<type>/<issue-number>-<short-description>
```

```bash
git switch master
git pull
git switch -c feat/42-add-country-selector
```

See [Branches](docs/naming-conventions.md#branches) in the naming conventions.

## 3. Make The Change

- Follow the [naming conventions](docs/naming-conventions.md) for code, files,
  tests, and environment variables.
- Add or update tests for any change in behaviour. Calculation logic belongs in
  `src/lib/`, separate from the UI (see
  [ADR-0003](docs/architecture/decisions/0003-separate-calculation-logic-from-ui.md)).
- Update documentation in the same pull request as the change it describes.
- If the change involves a significant technical decision, write an
  [Architecture Decision Record](docs/architecture/decisions/README.md).
- If you change a GitHub setting, update
  [repository-settings.md](docs/repository-settings.md).
- Never commit secrets. The repository is public.

## 4. Verify Locally

Run the same checks that CI runs, in the same order:

```bash
npm run format:check
npm run lint
npm run test:run
npm run build
```

If formatting fails, run `npm run format` to fix it. See
[Available Commands](README.md#available-commands) for all scripts.

Review your diff before committing:

```bash
git status
git diff
```

## 5. Commit And Push

Commit messages follow
[Conventional Commits](docs/commit-conventions.md):

```txt
<type>(<scope>): <description>
```

Commits on your branch are squashed when the pull request merges, so small or
work-in-progress commits are fine. Push the branch:

```bash
git push -u origin <branch-name>
```

## 6. Open A Pull Request

- **Title:** a Conventional Commit message. It becomes the commit message on
  `master`, so this is the one that must follow the format.
- **Description:** fill in the
  [pull request template](.github/pull_request_template.md), including
  `Closes #<issue-number>` so the issue closes on merge.
- Keep pull requests small and focused on one issue. If a change fits more
  than one commit type, split it.

## 7. Checks, Review, And Merge

`master` is protected (see [repository-settings.md](docs/repository-settings.md)).
A pull request can only merge when:

- the **Quality checks** job in the
  [PR checks workflow](.github/workflows/pr-checks.yml) passes
- the branch is up to date with `master`

Pull requests are **squash merged**, so each one becomes a single commit on
`master` (see
[ADR-0005](docs/architecture/decisions/0005-squash-merge-with-conventional-pr-titles.md)).
The remote branch is deleted automatically.

### Code Owners

[`.github/CODEOWNERS`](.github/CODEOWNERS) maps areas of the repository to the
people responsible for them. When a pull request changes a file, GitHub
automatically requests a review from that file's owners.

Today every area is owned by the maintainer, and authors are never asked to
review their own pull requests, so this has no visible effect yet. The file
exists so that adding a reviewer for an area is a one-line change.

**How matching works:**

- Patterns follow `.gitignore` rules. A leading `/` anchors a path to the
  repository root, and a trailing `/` matches everything in a directory.
- The **last** matching pattern wins. Keep the `*` catch-all at the top and
  more specific paths below it.
- Owners are GitHub usernames (`@name`) or, in an organisation, teams
  (`@org/team`). An owner must have write access to the repository, or GitHub
  ignores them.

**When adding a new area** (for example the backend API in Phase 2, or
infrastructure code in Phase 8):

1. Add a line for its top-level directory, below the `*` line, with a comment
   naming the area.
2. Choose owners who understand that area well enough to approve changes to
   it.
3. Open the file on GitHub after pushing. GitHub shows an error on any line it
   cannot parse.

**When to enforce it:** the ruleset option _Require review from Code Owners_
is off, because the maintainer is the only owner and cannot approve their own
pull requests. Turn it on once every area has at least one owner who is not
the usual author, and record the change in
[repository-settings.md](docs/repository-settings.md).

### After Merging

After merging, update your local copy and delete the local branch:

```bash
git switch master
git pull
git branch -d <branch-name>
```

## Releases

Releases follow Semantic Versioning and are cut from `master` by the
maintainer. Contributors do not need to change version numbers. See
[versioning-and-releases.md](docs/versioning-and-releases.md).

## Reference

| Topic                         | Document                                                              |
| ----------------------------- | --------------------------------------------------------------------- |
| Naming code, files, branches  | [docs/naming-conventions.md](docs/naming-conventions.md)              |
| Commit messages and PR titles | [docs/commit-conventions.md](docs/commit-conventions.md)              |
| Pull request template         | [.github/pull_request_template.md](.github/pull_request_template.md)  |
| Code owners                   | [.github/CODEOWNERS](.github/CODEOWNERS)                              |
| Architecture decisions        | [docs/architecture/decisions/](docs/architecture/decisions/README.md) |
| Issue labels                  | [docs/labels.md](docs/labels.md)                                      |
| Reporting vulnerabilities     | [SECURITY.md](SECURITY.md)                                            |
| Repository and branch rules   | [docs/repository-settings.md](docs/repository-settings.md)            |
| Versioning and releases       | [docs/versioning-and-releases.md](docs/versioning-and-releases.md)    |
| Local setup and commands      | [README.md](README.md#local-setup)                                    |
