# Roadmap

This project's purpose goes beyond the calculator itself: it is a deliberate,
step-by-step vehicle for learning enterprise-scale software engineering and
infrastructure. Phases are intentionally more elaborate than a calculator of
this size would normally need — that complexity is the point, not a mistake.

Each phase below states what it delivers and why it earns its place on the
roadmap. Phases are meant to be done in order, since later phases build on
architecture introduced earlier.

## Phase 0 — Engineering Foundations

_Tracked in GitHub: [#3](https://github.com/axelcouldrey/Tax-Application/issues/3)
and sub-issues #7–#13._

Repository-level conventions: naming standards, PR/issue templates, automated
PR quality checks, branch protection, architecture decision records, and
versioning conventions.

**Why:** Every real engineering organisation runs on process as much as code.
Establishing these habits now — while the codebase is still small — is cheap.
Retrofitting them onto a large, multi-service system later is not.

## Phase 1 — Deepen Domain Testing

Expand test coverage of `calculateTakeHome` for boundary conditions: tax
bracket edges, $0 salary, KiwiSaver rate edge cases, and rounding behaviour.

**Why:** Teaches the test pyramid and why domain logic — the part of the
system that is actually correct or incorrect — deserves the heaviest test
investment, before anything else is built on top of it.

## Phase 2 — Backend API (ASP.NET Core)

Move the take-home-pay calculation out of the browser and into a real Web API
service with controllers, a service layer, and DTOs. The React app becomes a
client of that API instead of doing the calculation itself.

**Why:** This is the first true architectural split — a client/server
boundary, an API contract, and layered architecture (controller → service →
domain). This layering is the backbone of most enterprise systems.

## Phase 3 — Data Persistence

Introduce a relational database (e.g. PostgreSQL or SQL Server) with EF Core,
schema migrations, and a repository layer, starting with storing calculation
history.

**Why:** Introduces data modelling, migrations, and the repository pattern —
how state survives beyond a single request.

## Phase 4 — Authentication & Authorization

Add user accounts and secure login (OpenID Connect / JWT), with authorization
rules so users can only see their own data.

**Why:** Nearly every enterprise application needs identity. Teaches
session/token security, credential handling, and the distinction between
authentication and authorization.

## Phase 5 — Saved Scenarios

Let authenticated users save and compare multiple salary scenarios, tied to
their account.

**Why:** The first feature that exercises the full stack end-to-end (API +
database + auth together) — it proves the architecture, not just its
individual pieces.

## Phase 6 — Containerization

Add Dockerfiles for the frontend, backend, and database, with
`docker-compose` to run the whole stack locally.

**Why:** Teaches reproducible environments. "Works on my machine" stops being
an acceptable answer once there are multiple services involved.

## Phase 7 — CI/CD Pipeline

Extend GitHub Actions to build and push container images and deploy
automatically on merge.

**Why:** Continuous deployment is a distinct discipline from the continuous
integration set up in Phase 0. Teaches release automation and environment
promotion (dev → staging → production).

## Phase 8 — Cloud Infrastructure as Code

Deploy to a cloud provider (Azure fits ASP.NET Core well) using Terraform or
Bicep instead of manual console configuration.

**Why:** Real infrastructure is version-controlled and reviewable, the same
as application code. Teaches cloud architecture fundamentals (networking,
managed databases, application hosting) and infrastructure-as-code discipline.

## Phase 9 — Observability

Add structured logging, metrics, and tracing (e.g. OpenTelemetry with a
dashboard, or Application Insights).

**Why:** A system that can't be observed can't be operated. Teaches the
difference between "it compiles" and "it's healthy in production."

## Phase 10 — Security Hardening

Introduce secrets management, dependency scanning, and a full security review
pass.

**Why:** Security is a continuous practice, not a one-time checklist —
especially once the application handles accounts and salary data.

## Phase 11 — Scale & Multi-Country Support

Add a second country's tax rules using a strategy pattern for country-specific
rules, along with caching and resilience patterns.

**Why:** Proves the domain model actually generalises, fulfilling the
original product vision in the README, and introduces designing for
extensibility rather than one-off logic.
