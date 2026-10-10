# Labels

This document defines the labels used on issues and pull requests, what each
one means, and when to apply it. Consistent labels make issues easy to filter,
report on, and automate.

If you add, rename, or remove a label on GitHub, update this document in the
same pull request or immediately after.

## Rules

- Every issue has exactly **one type label**.
- Resolution and contributor labels are optional and can be combined with a
  type label.
- Do not create a new label for a one-off case. Propose it in an issue and add
  it to this document first.

## Type Labels

Exactly one per issue. They say what kind of work the issue is.

| Label           | Use for                                                                                  | Applied by                                         |
| --------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `bug`           | Something is broken or produces the wrong result, such as an incorrect tax calculation   | Automatically by the **Bug report** issue form     |
| `enhancement`   | New or changed behaviour, or engineering work: features, tooling, CI, refactoring, tests | Automatically by the **Change request** issue form |
| `documentation` | Work whose main output is documentation: guides, ADRs, conventions, README changes       | Manually, replacing `enhancement` during triage    |
| `epic`          | A large piece of work broken down into sub-issues (see below)                            | Manually, when the epic is created                 |

When a change request turns out to be documentation-only, replace
`enhancement` with `documentation` rather than keeping both.

## Epics Versus Regular Issues

An **epic** is a container for a larger outcome, such as a roadmap phase. A
**regular issue** is a single piece of work.

|                     | Epic                                            | Regular issue                                 |
| ------------------- | ----------------------------------------------- | --------------------------------------------- |
| Size                | Too big for one pull request                    | Fits in one pull request                      |
| Worked on directly  | No: it has no branch or pull request of its own | Yes                                           |
| Structure           | Has GitHub sub-issues                           | May have a parent epic                        |
| Acceptance criteria | The outcome of the whole initiative             | Specific, testable conditions for this change |
| Closes when         | All its sub-issues are closed                   | Its pull request merges                       |
| Example             | #3 Establish engineering foundations            | #98 Define issue label taxonomy               |

Use an epic when work needs more than one pull request **and** the pieces
share an outcome worth tracking together. Each roadmap phase has one epic.
If an issue grows beyond one pull request while you work on it, convert it
into an epic and split the remaining work into sub-issues.

An epic is labelled `epic` only. Its sub-issues carry their own type labels.

## Resolution Labels

Optional. They record why an issue was closed without being completed.

| Label       | Use when                                                              | How to close                                                     |
| ----------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `duplicate` | The issue already exists                                              | Comment with a link to the original, then close as **Duplicate** |
| `wontfix`   | The request is valid, but a deliberate decision was made not to do it | Comment with the reason, then close as **Not planned**           |

## Contributor Labels

Optional. The repository is public, and GitHub highlights these labels to
people looking for projects to contribute to.

| Label              | Use when                                                                             |
| ------------------ | ------------------------------------------------------------------------------------ |
| `good first issue` | The issue is small, well described, and needs little knowledge of the codebase       |
| `help wanted`      | Outside help is welcome, for example because it needs expertise the maintainer lacks |

## Removed Labels

These GitHub default labels were removed because they were never used and are
covered by something else:

| Label      | Reason                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `invalid`  | GitHub's **Close as not planned** option, with a comment, covers issues that are not actionable                 |
| `question` | Blank issues are disabled and neither issue form is for questions. Questions belong in a comment or discussion. |

## Future Extensions

As the project grows, add labels in prefixed groups, each issue taking at most
one label from each group. This is the pattern used by large projects such as
Kubernetes.

| Group       | Example labels                                       | Add when                                                 |
| ----------- | ---------------------------------------------------- | -------------------------------------------------------- |
| `area:`     | `area: calc`, `area: ui`, `area: api`, `area: infra` | Issues need filtering by part of the system (Phase 2 on) |
| `priority:` | `priority: high`, `priority: low`                    | More issues are open than can be worked on at once       |
| `status:`   | `status: blocked`, `status: needs-triage`            | Issues wait on others, or new issues need regular triage |

`area:` labels should use the same names as commit scopes in
[commit-conventions.md](commit-conventions.md#scope).

Dependabot applies a `dependencies` label to its pull requests by default.
Document it here when automated dependency updates are added (issue #84).
