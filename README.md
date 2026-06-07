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

- Node.js
- npm
- Git

Check that they are available:

```bash
node --version
npm --version
git --version
```

## Current Architecture

```bash
src/
├── config/    Country-specific tax rates and thresholds
├── lib/       Calculation and domain logic
├── App.tsx    React user interface
└── main.tsx   Application entry point
```