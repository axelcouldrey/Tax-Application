# 0003. Separate Calculation Logic From The UI

- **Status:** Accepted
- **Date:** 2026-10-08 (decision made 2026-06-01, recorded retrospectively)
- **Related:** #12, #1

## Context

The core of this application is the take-home pay calculation: progressive
income tax, the ACC earners' levy, KiwiSaver, and student-loan repayments.
This is the part of the system that is either correct or incorrect, and
errors have real consequences for anyone relying on it.

React components mix several concerns: rendering, user input, and state. If
tax logic lived inside components, it would be hard to test without rendering
a UI, easy to break while changing the layout, and hard to move elsewhere.

The roadmap also plans to move the calculation into a backend API in Phase 2,
and to support more than one country in Phase 11.

## Considered Options

1. **Calculate inside React components:** least code at first, but couples
   tax rules to the UI and makes the logic hard to test and move.
2. **A separate domain module with pure functions:** the UI calls a function
   such as `calculateTakeHome(input)` and only displays the result.
3. **A separate domain module plus rules stored as configuration data:** as
   option 2, but rates and thresholds live in JSON files rather than in code.

## Decision

We will keep calculation logic out of the UI:

- Domain logic lives in `src/lib/` as pure TypeScript functions with no React
  imports, for example `calculateTakeHome`.
- Tax rates, thresholds, and other rule values live in `src/config/` as JSON,
  so a new tax year changes data rather than logic.
- React components in `src/` gather input, call the domain functions, and
  format the results for display. They do not calculate tax themselves.
- Domain logic is covered by unit tests alongside the module, for example
  `calculateTakeHome.test.ts`.

## Consequences

- The calculation can be tested quickly and thoroughly without a browser,
  which supports the testing focus of Phase 1.
- UI changes cannot accidentally change tax results.
- The domain module has a clear boundary with typed input and output. That
  boundary becomes the API contract when the calculation moves to the backend
  in Phase 2, and a natural seam for country-specific rules in Phase 11.
- Contributors must respect the boundary. A reviewer should reject a pull
  request that adds tax arithmetic to a component.
- Configuration in JSON is not type-checked against the rule shapes. Invalid
  data is caught only by tests, which is a risk to address as rules grow.
