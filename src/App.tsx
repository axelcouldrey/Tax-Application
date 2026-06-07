import { useMemo, useState } from 'react'
import kiwiSaverConfig from './config/kiwiSaver.json'
import { calculateTakeHome } from './lib/calculateTakeHome'

const MAX_ANNUAL_SALARY = 10_000_000

const currencyFormatter = new Intl.NumberFormat('en-NZ', {
  style: 'currency',
  currency: 'NZD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

const percentageFormatter = new Intl.NumberFormat('en-NZ', {
  maximumFractionDigits: 1,
})

function formatPercentage(value: number) {
  return `${percentageFormatter.format(value * 100)}%`
}

function App() {
  const [annualSalaryInput, setAnnualSalaryInput] = useState('80000')
  const [hasStudentLoan, setHasStudentLoan] = useState(false)
  const [kiwiSaverRate, setKiwiSaverRate] = useState(
    kiwiSaverConfig.defaultRate,
  )

  const annualSalary = Number(annualSalaryInput) || 0

  const result = useMemo(
    () =>
      calculateTakeHome({
        annualSalary,
        hasStudentLoan,
        kiwiSaverRate,
      }),
    [annualSalary, hasStudentLoan, kiwiSaverRate],
  )

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">NZ PAYE Calculator</h1>
          <p className="mt-2 text-slate-600">
            Estimate annual, monthly, and weekly take-home pay after PAYE,
            KiwiSaver, and student loan deductions.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Your Details</h2>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-700">
                Annual salary
              </span>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-lg"
                inputMode="numeric"
                type="text"
                value={annualSalaryInput}
                onChange={(event) => {
                  const nextValue = event.target.value

                  if (!/^\d*$/.test(nextValue)) {
                    return
                  }

                  const nextSalary = Number(nextValue)

                  if (nextSalary > MAX_ANNUAL_SALARY) {
                    return
                  }

                  setAnnualSalaryInput(nextValue)
                }}
              />
            </label>
            <label className="mt-5 flex items-center gap-3">
              <input
                className="h-4 w-4"
                type="checkbox"
                checked={hasStudentLoan}
                onChange={(event) =>
                  setHasStudentLoan(event.target.checked)
                }
              />
              <span className="text-sm font-medium text-slate-700">
                I have a student loan
              </span>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-700">
                KiwiSaver rate
              </span>
              <select
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                value={kiwiSaverRate}
                onChange={(event) =>
                  setKiwiSaverRate(Number(event.target.value))
                }
              >
                {kiwiSaverConfig.rates.map((rate) => (
                  <option key={rate} value={rate}>
                    {formatPercentage(rate)}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Estimated Take-Home Pay</h2>

            <div className="mt-5 rounded-md bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-800">
                Annual take-home
              </p>
              <p className="mt-1 text-3xl font-bold text-emerald-950">
                {formatCurrency(result.annualTakeHome)}
              </p>
            </div>

            <div className="mt-6 space-y-6 text-sm">
              <dl>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-slate-700">Gross salary</dt>
                  <dd className="font-semibold">
                    {formatCurrency(result.annualSalary)}
                  </dd>
                </div>
              </dl>

              <section className="border-t border-slate-200 pt-5">
                <h3 className="text-xs font-semibold uppercase text-slate-500">
                  PAYE deductions
                </h3>

                <dl className="mt-3 space-y-3">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">Income tax</dt>
                    <dd className="font-medium">
                      -{formatCurrency(result.incomeTax)}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">ACC earners’ levy</dt>
                    <dd className="font-medium">
                      -{formatCurrency(result.accLevy)}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
                    <dt className="font-semibold text-slate-800">Total PAYE</dt>
                    <dd className="font-semibold">
                      -{formatCurrency(result.paye)}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="border-t border-slate-200 pt-5">
                <h3 className="text-xs font-semibold uppercase text-slate-500">
                  Other deductions
                </h3>

                <dl className="mt-3 space-y-3">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">Student loan</dt>
                    <dd className="font-medium">
                      -{formatCurrency(result.studentLoan)}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">KiwiSaver</dt>
                    <dd className="font-medium">
                      -{formatCurrency(result.kiwiSaver)}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="border-t border-slate-200 pt-5">
                <h3 className="text-xs font-semibold uppercase text-slate-500">
                  Take-home by period
                </h3>

                <dl className="mt-3 space-y-3">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">Monthly</dt>
                    <dd className="font-medium">
                      {formatCurrency(result.monthlyTakeHome)}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">Weekly</dt>
                    <dd className="font-medium">
                      {formatCurrency(result.weeklyTakeHome)}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              This is an educational estimate and does not include every payroll
              rule or personal tax situation.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default App