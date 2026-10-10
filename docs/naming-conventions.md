# Naming Conventions

This document defines how to name code, files, tests, branches, and
environment variables in this repository. The goal is that contributors can
name things consistently without guessing.

**When in doubt, match the surrounding code.** These rules resolve the common
cases; existing code that follows a clear local pattern wins over a rule this
document does not explicitly cover.

The stack today is React, TypeScript, and Vite. Conventions for C# and the
database are included further down as provisional guidance, to be ratified when
those parts of the system are built (see [ROADMAP.md](../ROADMAP.md)).

## TypeScript

| Kind                                                     | Convention                                   | Example                              |
| -------------------------------------------------------- | -------------------------------------------- | ------------------------------------ |
| Variables, parameters, functions, methods                | `camelCase`                                  | `grossSalary`, `calculateTakeHome()` |
| Classes, type aliases, interfaces, enums, enum members   | `PascalCase`                                 | `TaxBracket`, `KiwiSaverRate`        |
| React components                                         | `PascalCase`                                 | `SalaryInput`                        |
| React hooks                                              | `camelCase` with a `use` prefix              | `useTakeHomePay`                     |
| Module-level configuration constants                     | `SCREAMING_SNAKE_CASE`                       | `DEFAULT_KIWISAVER_RATE`             |
| Other `const` bindings (including functions and objects) | `camelCase`                                  | `const taxRules = ...`               |
| Generic type parameters                                  | `PascalCase`, `T` prefix when not a bare `T` | `T`, `TResult`                       |
| Private class fields                                     | `camelCase`, using `#` or `private`          | `#cache`, `private cache`            |
| Booleans                                                 | `is` / `has` / `should` / `can` prefix       | `isResident`, `hasStudentLoan`       |
| Intentionally unused bindings                            | leading underscore                           | `catch (_err)`                       |

Additional rules:

- **Acronyms are treated as words:** capitalise only the first letter.
  Use `PayeCalculator` and `getPayeRate`, not `PAYECalculator`.
- **No `I` prefix on interfaces.** Write `TaxService`, not `ITaxService`.
  (The C# section below deliberately differs; each language follows its own
  community norm.)
- **`SCREAMING_SNAKE_CASE` is only for module-level primitives** that are
  static configuration. A `const` holding a function, object, or component
  stays `camelCase` / `PascalCase`.
- Prefer `interface` for object shapes that may be extended and `type` for
  unions, intersections, and function types.

```ts
// Good
const DEFAULT_KIWISAVER_RATE = 0.03

interface TaxBracket {
  upperBound: number
  rate: number
}

function calculateTakeHome(grossSalary: number, hasStudentLoan: boolean) {
  const isAboveThreshold = grossSalary > STUDENT_LOAN_THRESHOLD
  // ...
}
```

```ts
// Avoid
const defaultKiwisaverRate = 0.03 // module config primitive -> should be CONSTANT_CASE
interface ITaxBracket {} // no I prefix
function CalculateTakeHome() {} // functions are camelCase
```

## Files And Directories

| Kind                  | Convention           | Example                     |
| --------------------- | -------------------- | --------------------------- |
| Component files       | `PascalCase.tsx`     | `SalaryInput.tsx`           |
| Non-component modules | `camelCase.ts`       | `calculateTakeHome.ts`      |
| Test files            | `<module>.test.ts`   | `calculateTakeHome.test.ts` |
| Type-only modules     | `camelCase.types.ts` | `taxRules.types.ts`         |
| Configuration data    | `camelCase.json`     | `kiwiSaver.json`            |
| Directories           | `kebab-case`         | `student-loan/`             |

Rules:

- One component per file. The filename matches the component's default export.
- Test files are co-located next to the module they cover, not in a separate
  `__tests__/` or top-level `tests/` tree.
- Avoid barrel files (`index.ts` that only re-exports). They cause circular
  dependencies and slow down tooling.

## Tests

- **File name:** `<module>.test.ts`, alongside the module.
- **`describe`:** names the unit under test, matching its identifier exactly.
- **Nested `describe`:** names a scenario, starting with `when`.
- **`it`:** describes observable behaviour and reads as a sentence. Start with
  a verb such as `returns`, `throws`, or `renders`. Avoid `should` and vague
  names like `works`.
- Name fixture variables for their role: `input`, `expected`.

```ts
describe('calculateTakeHome', () => {
  it('returns zero deductions for a zero salary', () => {
    // ...
  })

  describe('when income crosses a tax-bracket boundary', () => {
    it('applies the higher rate only to income above the threshold', () => {
      // ...
    })
  })
})
```

## Branches

Format:

```txt
<type>/<issue-number>-<short-description>
```

- `<type>` is one of: `feat`, `fix`, `perf`, `refactor`, `test`, `docs`,
  `ci`, `build`, `chore`. These are the same types used in commit messages
  (see [commit-conventions.md](commit-conventions.md)).
- `<issue-number>` is the GitHub issue the work belongs to.
- `<short-description>` is a `kebab-case` summary, lowercase, no spaces, kept
  under roughly 50 characters.
- Delete the branch after its pull request merges.

```txt
docs/7-document-naming-conventions
feat/42-add-country-selector
fix/58-kiwisaver-rounding
```

`master` is the only long-lived branch.

## Environment Variables

- Always `SCREAMING_SNAKE_CASE`: `TAX_YEAR`, `API_BASE_URL`.
- **`VITE_` prefix is a security boundary.** Vite only exposes variables
  prefixed with `VITE_` to browser code through `import.meta.env`. Use the
  prefix for values that are safe to ship to the client; omit it for
  build-only or server-only secrets.
- Group related variables with a shared prefix: `VITE_API_URL`,
  `VITE_API_TIMEOUT_MS`.
- Suffix units and kinds: `_MS`, `_SECONDS`, `_URL`, `_ENABLED`.
- Every variable must appear in a committed `.env.example` with a comment and
  a placeholder value. Real `.env` files are never committed.

```txt
# .env.example
VITE_API_URL=https://api.example.test   # base URL for the take-home API
VITE_API_TIMEOUT_MS=5000                # request timeout in milliseconds
```

## Provisional: C# (Phase 2 Onward)

To be confirmed when the backend is introduced. Expected to follow Microsoft's
.NET guidelines:

| Kind                                         | Convention                      | Example                  |
| -------------------------------------------- | ------------------------------- | ------------------------ |
| Namespaces, classes, records, structs, enums | `PascalCase`                    | `TaxCalculator`          |
| Methods, properties, events, public fields   | `PascalCase`                    | `CalculateTakeHome`      |
| Interfaces                                   | `PascalCase` with an `I` prefix | `ITaxCalculator`         |
| Local variables, parameters                  | `camelCase`                     | `grossSalary`            |
| Private instance fields                      | `_camelCase`                    | `_cache`                 |
| Constants and `static readonly`              | `PascalCase`                    | `DefaultTaxYear`         |
| Async methods                                | `Async` suffix                  | `CalculateTakeHomeAsync` |
| Generic type parameters                      | `T` prefix                      | `TResult`                |
| Booleans                                     | `Is` / `Has` / `Can` prefix     | `IsResident`             |

The interface `I` prefix and underscore-prefixed fields differ from the
TypeScript rules above. That asymmetry is intentional: each language follows
its own established community convention.

## Provisional: Database (Phase 3 Onward)

To be confirmed when a database is chosen:

- Tables: `snake_case`, plural: `tax_brackets`.
- Columns: `snake_case`: `created_at`, `gross_salary_cents`.
- Primary key: `id`.
- Foreign keys: `<referenced_table_singular>_id`: `user_id`.
- Constraints and indexes: prefixed `pk_`, `fk_`, `ix_`, `uq_`, `ck_`.
- Money is stored as integer minor units (a `_cents` suffix) or `decimal`,
  never a floating-point type.
- Migrations are timestamped and named for intent:
  `20260901120000_AddCalculationHistory`.
- Booleans: `is_` / `has_` prefix.
