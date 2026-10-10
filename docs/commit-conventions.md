# Commit Conventions

Commit messages on `master` follow
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).
The format makes history readable at a glance and lets tools work out version
numbers and release notes from it.

## Where The Format Applies

Pull requests are **squash merged** (see
[ADR-0005](architecture/decisions/0005-squash-merge-with-conventional-pr-titles.md)).
Each pull request becomes one commit on `master`, and that commit's message is
the **pull request title**. GitHub appends the pull request number.

So in practice:

- **The pull request title must follow the format.** This is the rule that
  matters.
- Commits on your branch are squashed away. Writing them in the same format is
  good practice, but `wip` or `fix typo` on a branch does no harm.

## Format

```txt
<type>(<scope>): <description>
```

```txt
fix(calc): apply student loan threshold to annual salary
```

### Type

Required. One of:

| Type       | Use for                                            | Version bump |
| ---------- | -------------------------------------------------- | ------------ |
| `feat`     | A new feature or behaviour users can see           | MINOR        |
| `fix`      | A bug fix users can see                            | PATCH        |
| `perf`     | A performance improvement                          | PATCH        |
| `refactor` | Restructuring code without changing behaviour      | None         |
| `test`     | Adding or correcting tests                         | None         |
| `docs`     | Documentation only                                 | None         |
| `ci`       | CI configuration, such as GitHub Actions workflows | None         |
| `build`    | Build tooling or dependencies                      | None         |
| `chore`    | Other maintenance that fits none of the above      | None         |

If a change fits more than one type, it probably should be more than one pull
request.

Use the same type as the branch prefix (see
[naming-conventions.md](naming-conventions.md#branches)).

### Scope

Optional. A single lowercase word in parentheses naming the area of the
codebase affected:

| Scope    | Area                                   |
| -------- | -------------------------------------- |
| `calc`   | Calculation logic in `src/lib/`        |
| `config` | Tax rules and rates in `src/config/`   |
| `ui`     | React components and styling           |
| `deps`   | npm dependencies                       |
| `adr`    | Architecture decision records          |
| `api`    | Backend API (from Phase 2)             |
| `db`     | Database and migrations (from Phase 3) |

Leave the scope out when a change is repository-wide or no scope fits. Add new
scopes to this table when new areas of the system are introduced.

### Description

Required. A short summary of the change:

- imperative mood, as if completing "This change will …": `add`, not `added`
  or `adds`
- lowercase first letter, no full stop at the end
- under about 72 characters for the whole first line, so it fits in `git log`
  and GitHub lists
- says **what** changed for the reader, not how you did it

### Breaking Changes

Mark a breaking change (see
[versioning-and-releases.md](versioning-and-releases.md#when-each-number-changes))
with `!` before the colon:

```txt
feat(api)!: rename salary field to grossSalary
```

Explain what breaks and what to do in the pull request description, so it can
be copied into the release notes.

## Examples

```txt
feat(calc): add KiwiSaver employer contribution
fix(config): correct 2026-27 ACC earners' levy rate
docs: document commit message conventions
test(calc): add boundary tests for income-tax brackets
build(deps): update vite to 8.3.3
ci: cache npm dependencies in PR checks
refactor(calc): extract progressive tax calculation
feat(api)!: return amounts in cents instead of dollars
```

Avoid:

| Message                             | Problem                                         |
| ----------------------------------- | ----------------------------------------------- |
| `update stuff`                      | No type, and the description says nothing       |
| `Fix: Fixed the bug.`               | Type is capitalised, past tense, full stop      |
| `feat: add tests and fix KiwiSaver` | Two changes in one; split into `test` and `fix` |
| `fix(KiwiSaver): rounding`          | Scope is not a defined lowercase scope; vague   |

## How This Supports Releases

Because every commit on `master` states its type, the next version and the
release notes can be worked out from history since the last tag:

- any `!` → MAJOR, otherwise any `feat` → MINOR, otherwise any `fix` or
  `perf` → PATCH
- `feat` entries go under **Added**, `fix` under **Fixed**, and breaking
  changes under **Breaking changes**, matching the headings in
  [versioning-and-releases.md](versioning-and-releases.md#release-notes)

Today this is done by hand during the release process. Automating it is
planned in issue #101.
