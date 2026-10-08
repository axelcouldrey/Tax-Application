# 0002. Use React, TypeScript, and Vite

- **Status:** Accepted
- **Date:** 2026-10-08 (decision made 2026-06-01, recorded retrospectively)
- **Related:** #12

## Context

The project needed a browser-based user interface for the take-home pay
calculator. The interface is small today, but the roadmap grows it into a
client for a backend API with authentication and saved scenarios.

The project is also a learning vehicle, so the stack should reflect what is
widely used in industry rather than what is merely sufficient.

The main forces were:

- Tax calculations must be correct, so type safety on inputs and results
  matters.
- The tooling should give fast feedback during development.
- The stack should be mainstream, well documented, and in demand.

## Considered Options

**UI library or framework**

1. **React:** the most widely used UI library, with a large ecosystem and job
   market. Flexible, but leaves choices such as routing and state management
   to the team.
2. **Angular:** a complete, opinionated framework, common in large
   enterprises. Heavier to learn and more ceremony for a small app.
3. **Vue or Svelte:** simpler and well liked, but smaller ecosystems and less
   enterprise adoption.
4. **Plain HTML and JavaScript:** no dependencies, but does not scale and
   teaches little about modern front-end architecture.

**Language**

1. **TypeScript:** static types catch mistakes such as passing a percentage
   where a fraction is expected, before the code runs.
2. **JavaScript:** less setup, but errors surface only at runtime.

**Build tool**

1. **Vite:** fast development server and builds, minimal configuration, and
   the default recommendation for new React projects.
2. **Next.js:** adds server rendering and routing, which this client-only app
   does not need, and would overlap with the planned ASP.NET Core backend.
3. **Create React App:** deprecated and no longer recommended.

## Decision

We will build the front end with **React** and **TypeScript**, using **Vite**
as the development server and build tool. Vitest is used for tests because it
shares Vite's configuration.

## Consequences

- The type checker runs as part of every build (`tsc -b`), so type errors fail
  CI.
- Vite and Vitest share one configuration, keeping tooling simple.
- React does not prescribe routing, state management, or data fetching. Those
  choices will need their own decisions as the app grows, for example when it
  starts calling the backend API in Phase 2.
- The app is a static client-side bundle. It can be hosted on any static host
  or served from a container in later phases.
- Major-version upgrades of React, TypeScript, or Vite are ongoing maintenance
  work.
