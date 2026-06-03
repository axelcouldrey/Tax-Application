import { describe, expect, it } from 'vitest'
import { calculateTakeHome } from './calculateTakeHome'

describe('calculateTakeHome', () => {
  it('calculates take-home pay without a student loan', () => {
    const result = calculateTakeHome({
      annualSalary: 60000,
      hasStudentLoan: false,
      kiwiSaverRate: 0.035,
    })

    expect(result.annualSalary).toBe(60000)
    expect(result.incomeTax).toBeCloseTo(10220.5)
    expect(result.accLevy).toBeCloseTo(1050)
    expect(result.paye).toBeCloseTo(11270.5)
    expect(result.studentLoan).toBe(0)
    expect(result.kiwiSaver).toBeCloseTo(2100)
    expect(result.annualTakeHome).toBeCloseTo(46629.5)
  })

  it('calculates student loan deductions above the threshold', () => {
    const result = calculateTakeHome({
      annualSalary: 60000,
      hasStudentLoan: true,
      kiwiSaverRate: 0.035,
    })

    expect(result.studentLoan).toBeCloseTo(4304.64)
    expect(result.annualTakeHome).toBeCloseTo(42324.86)
  })

  it('does not deduct student loan repayments below the threshold', () => {
    const result = calculateTakeHome({
      annualSalary: 20000,
      hasStudentLoan: true,
      kiwiSaverRate: 0.035,
    })

    expect(result.studentLoan).toBe(0)
  })

  it('caps the ACC levy at the maximum liable earnings', () => {
    const result = calculateTakeHome({
      annualSalary: 200000,
      hasStudentLoan: false,
      kiwiSaverRate: 0.035,
    })

    expect(result.accLevy).toBeCloseTo(2741.2175)
  })

  it('returns zero deductions and take-home pay for a zero salary', () => {
    const result = calculateTakeHome({
      annualSalary: 0,
      hasStudentLoan: false,
      kiwiSaverRate: 0.035,
    })

    expect(result.incomeTax).toBe(0)
    expect(result.accLevy).toBe(0)
    expect(result.paye).toBe(0)
    expect(result.studentLoan).toBe(0)
    expect(result.kiwiSaver).toBe(0)
    expect(result.annualTakeHome).toBe(0)
  })
})
