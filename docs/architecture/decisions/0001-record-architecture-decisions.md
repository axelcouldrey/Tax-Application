# 0001. Record Architecture Decisions

- **Status:** Accepted
- **Date:** 2026-10-08
- **Related:** #12

## Context

This project is being built in phases toward a deliberately enterprise-style
architecture (see [ROADMAP.md](../../../ROADMAP.md)): a backend API, a
database, authentication, containers, cloud infrastructure, and more. Each
phase involves significant technical choices.

Today the reasoning behind those choices lives only in commit messages, pull
request threads, and people's memories. Commit messages describe changes, not
alternatives. Pull request threads are hard to find later. Memories fade.

Several later roadmap issues already call for decisions to be recorded,
including #25 (backend technology), #75 (observability stack), #82 (secrets
management), and #89 (country-strategy abstraction). They need a shared
format and process.

## Considered Options

1. **No formal records:** rely on commits and pull requests. No overhead, but
   the reasoning is scattered and alternatives are lost.
2. **A wiki or external document:** easy to edit, but separate from the code,
   not reviewed through pull requests, and easily out of date.
3. **ADRs as Markdown files in the repository:** versioned with the code,
   reviewed through pull requests, and readable on GitHub.

## Decision

We will record significant architectural decisions as Architecture Decision
Records in `docs/architecture/decisions/`, using the format and process in the
[README](README.md).

## Consequences

- Future contributors can find out why the system is built the way it is,
  including what was rejected.
- Decisions are reviewed through the same pull request process as code.
- Accepted ADRs are append-only. Changing a decision means writing a new ADR,
  so the history of reasoning is preserved.
- Writing an ADR takes time. The guidance in the README limits ADRs to
  decisions that are significant, hard to reverse, or likely to be questioned.
