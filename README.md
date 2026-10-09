# Take-Home Pay Calculator

A take-home pay calculator currently focused on New Zealand salary and wage
earners.

Users can enter an annual salary, select a KiwiSaver contribution rate, and
indicate whether they have a student loan. The application estimates annual,
monthly, and weekly take-home pay and provides a breakdown of deductions.

> This application is an educational project and does not provide financial,
> tax, or payroll advice.

## Product Vision

The long-term goal is to build a secure, production-style platform that allows
users to:

- Calculate take-home pay for supported countries.
- Select country-specific tax years and payroll settings.
- Compare salary scenarios.
- Create an account and save calculations.
- Review historical calculations and rule versions.
- Use the application securely across multiple devices.

New Zealand is the first supported country and provides the initial domain model
for evolving the application.

## Current Features

- New Zealand annual salary input.
- Progressive income-tax calculation.
- ACC earners' levy calculation.
- KiwiSaver employee contribution options.
- Optional student-loan repayments.
- Annual, monthly, and weekly take-home estimates.
- Configuration-driven New Zealand tax rules.
- Unit tests for the calculation logic.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- ESLint

The project currently runs entirely in the browser. It does not yet have a
backend, database, or user authentication.

## Prerequisites

Install:

- Node.js (the version in `.nvmrc`; with nvm, run `nvm use`)
- npm
- Git

Check that they are available:

```bash
node --version
npm --version
git --version
```

## Local Setup

Clone the repository and install its dependencies:

```bash
git clone <repo-url>
cd <repo-directory>
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL printed by Vite, usually:

```bash
http://localhost:5173
```

## Formatting

This project uses Prettier for shared code formatting.

Format all supported files with:

```bash
npm run format
```

Check formatting without changing files with:

```bash
npm run format:check
```

Recommended VS Code setting:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Available Commands

```bash
npm run dev
```

Starts the local dev server.

```bash
npm run test:run
```

Runs the test suite once.

```bash
npm test
```

Runs Vitest in watch mode.

```bash
npm run lint
```

Checks the source code using ESLint.

```bash
npm run build
```

Runs TypeScript checks and creates a production build.

```bash
npm run preview
```

Serves the production build locally for inspection.

## Continuous Integration

Every pull request, and every push to `master`, runs the
[PR checks workflow](.github/workflows/pr-checks.yml) on GitHub Actions. It
uses the Node.js version in `.nvmrc`, installs dependencies with `npm ci`, and
then runs:

1. Formatting check
2. Lint
3. Unit tests
4. Production build

If any step fails, the pull request shows a failing check. Run the same checks
locally before pushing:

```bash
npm ci
npm run format:check
npm run lint
npm run test:run
npm run build
```

## Current Architecture

```txt
src/
├── config/    Country-specific tax rates and thresholds
├── lib/       Calculation and domain logic
├── App.tsx    React user interface
└── main.tsx   Application entry point
```

The current data flow is:

```txt
User input
    ↓
React state
    ↓
calculateTakeHome()
    ↓
Configuration-driven calculation
    ↓
Results displayed by React
```

## Calculation Assumptions

The current calculator:

- Supports New Zealand only.
- Uses rules configured for the 2026-2027 tax year.
- Assumes one main source of salary or wage income.
- Calculates progressive annual income tax.
- Includes the ACC earners' levy.
- Calculates employee KiwiSaver contributions from gross salary.
- Applies student-loan repayment rules when selected.
- Estimates monthly and weekly amounts from the annual result.

## Known Limitations

The calculator does not currently account for:

- Different tax codes or secondary employment.
- Exact payroll-period rounding.
- Employer KiwiSaver contributions or ESCT.
- Tax credits, benefits, allowances, bonuses, or irregular income.
- Temporary KiwiSaver contribution-rate reductions.
- Individual circumstances that affect final tax liability.
- Tax years other than the configured year.
- Countries other than New Zealand.
- User accounts or saved calculations.

## Oficial Sources

The configured rules are based on official Inland Revenue guidance:

- Individual income-tax rates https://www.ird.govt.nz/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals/tax-rates-for-individuals
- KiwiSaver employee contributions https://www.ird.govt.nz/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals/tax-rates-for-individuals
- Student-loan repayments https://www.ird.govt.nz/student-loans
- ACC earners' levy https://www.ird.govt.nz/student-loans

## Development Workflow

1. Select or create a GitHub issue.
2. Confirm its outcome and acceptance criteria.
3. Create a branch linked to the issue.
4. Make and test the change.
5. Review the local Git diff.
6. Commit and push the branch.
7. Open a pull request that closes the issue.
8. Merge after checks and review pass.
9. Update the local default branch.

Before creating a pull request, run:

```bash
npm run test:run
npm run lint
npm run build
```

## Contributing

See [docs/naming-conventions.md](docs/naming-conventions.md) for how to name
code, files, tests, branches, and environment variables.

Changes reach `master` only through pull requests with passing checks. See
[docs/repository-settings.md](docs/repository-settings.md) for the branch
ruleset and other GitHub settings.

Significant technical decisions are recorded as Architecture Decision Records
in [docs/architecture/decisions/](docs/architecture/decisions/README.md).

Releases follow Semantic Versioning. See
[docs/versioning-and-releases.md](docs/versioning-and-releases.md) for version
numbers, tags, release notes, and the release process.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full phased roadmap and the reasoning
behind each phase. The roadmap is also tracked through GitHub Issues and the
project board.
