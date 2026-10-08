# Architecture Decision Records

An Architecture Decision Record (ADR) is a short document that captures one
significant technical decision: the context that forced it, what was decided,
the options considered, and the consequences.

Code shows what the system does. ADRs explain why it is built that way.

## When To Write An ADR

Write an ADR when a decision:

- is hard or expensive to reverse (a framework, database, or cloud provider)
- shapes how other code must be written (a layering rule, an API style)
- was a real choice between reasonable alternatives
- will make a future contributor ask "why did we do it this way?"

Do not write one for routine choices that a convention already covers, such as
naming (see [naming-conventions.md](../../naming-conventions.md)).

## Format

ADRs follow Michael Nygard's format, with a short **Considered Options**
section borrowed from MADR. Copy [template.md](template.md) to start a new one.

## Numbering

- Files are named `NNNN-short-title-in-kebab-case.md`, for example
  `0004-use-postgresql-for-persistence.md`.
- Numbers are four digits, zero-padded, and assigned sequentially.
- Numbers are never reused, even if an ADR is rejected.
- The title is a short imperative phrase describing the decision:
  "Use PostgreSQL", not "Database".

## Status

| Status                     | Meaning                                       |
| -------------------------- | --------------------------------------------- |
| **Proposed**               | Open for discussion in a pull request.        |
| **Accepted**               | Agreed and in effect.                         |
| **Rejected**               | Considered and not adopted. Kept as a record. |
| **Deprecated**             | No longer applies, and nothing replaces it.   |
| **Superseded by ADR-NNNN** | Replaced by a later decision, linked here.    |

## Process

1. Copy `template.md` to the next free number and set the status to
   **Proposed**.
2. Open a pull request. The pull request review is the discussion.
3. Before merging, set the status to **Accepted** (or **Rejected**) and add
   the ADR to the index below.

Once accepted, an ADR is **not edited** except to fix typos or to update its
status. To change a decision, write a new ADR and mark the old one
**Superseded by ADR-NNNN**. This keeps the history of reasoning intact.

Decisions made before ADRs were introduced may be recorded retrospectively.
Note the original decision date in the ADR.

## Index

| ADR                                                | Title                                  | Status   |
| -------------------------------------------------- | -------------------------------------- | -------- |
| [0001](0001-record-architecture-decisions.md)      | Record architecture decisions          | Accepted |
| [0002](0002-use-react-typescript-and-vite.md)      | Use React, TypeScript, and Vite        | Accepted |
| [0003](0003-separate-calculation-logic-from-ui.md) | Separate calculation logic from the UI | Accepted |
