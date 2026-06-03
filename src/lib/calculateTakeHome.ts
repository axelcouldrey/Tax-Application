import studentLoanRules from '../config/studentLoan.json'
// Keep PAYE rules in JSON so tax-year changes do not require rewriting logic.
import taxRules from '../config/taxRules.json'
import accLevyRules from '../config/accLevy.json'

type TaxBracket = {
  upTo: number | null
  rate: number
}

type CalculateTakeHomeInput = {
  annualSalary: number
  hasStudentLoan: boolean
  kiwiSaverRate: number
}

type CalculateTakeHomeResult = {
  annualSalary: number
  incomeTax: number
  accLevy: number
  paye: number
  studentLoan: number
  kiwiSaver: number
  annualTakeHome: number
  monthlyTakeHome: number
  weeklyTakeHome: number
}

function calculateProgressiveTax(
  annualSalary: number,
  brackets: TaxBracket[],
): number {
  let remainingIncome = annualSalary
  let previousLimit = 0
  let totalTax = 0

  for (const bracket of brackets) {
    if (remainingIncome <= 0) {
      break
    }

    // A null upper limit represents the final tax bracket with no cap.
    const currentLimit = bracket.upTo ?? Number.POSITIVE_INFINITY
    const taxableInBracket = Math.min(
      remainingIncome,
      currentLimit - previousLimit,
    )

    totalTax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
    previousLimit = currentLimit
  }

  return totalTax
}

export function calculateTakeHome(
  input: CalculateTakeHomeInput,
): CalculateTakeHomeResult {
  const incomeTax = calculateProgressiveTax(
    input.annualSalary,
    taxRules.brackets,
  )

  const accLevy =
    Math.min(
      input.annualSalary,
      accLevyRules.maximumLiableEarnings,
    ) * accLevyRules.rate

  const paye = incomeTax + accLevy

  const studentLoan = input.hasStudentLoan
    ? Math.max(
        0,
        input.annualSalary - studentLoanRules.annualRepaymentThreshold,
      ) * studentLoanRules.repaymentRate
    : 0

  const kiwiSaver = input.annualSalary * input.kiwiSaverRate

  const annualTakeHome =
    input.annualSalary - paye - studentLoan - kiwiSaver

  return {
    annualSalary: input.annualSalary,
    incomeTax,
    accLevy,
    paye,
    studentLoan,
    kiwiSaver,
    annualTakeHome,
    monthlyTakeHome: annualTakeHome / 12,
    weeklyTakeHome: annualTakeHome / 52,
  }
}
