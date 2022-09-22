import { clearBankData, creditData } from '../structures'
import { BankingSystem } from '../banking-system'
import { Accounts } from '../accounts'
import { BalanceSheets } from '../displays/balancesheets'
import { Customer } from '../customer'
import { Display } from '../display'

function setupParties() {
  clearBankData()
  const barclays = BankingSystem.createBank('barclays', 'bank', 100)
  const alex = BankingSystem.createBank('alex', 'customer', 100)
  Customer.createAccount(alex, barclays, 50)
  return { barclays, alex }
}

test('customer should receive x deposits assets on loan creation', () => {
  const { barclays, alex } = setupParties()
  Customer.getLoan(alex, barclays, 100)
  const alexAssets = BalanceSheets.getAccountAssets(alex)
  expect(alexAssets[0].balance).toBe(150)
})
test('bank should receive x deposits liabilities on loan creation', () => {
  const { barclays, alex } = setupParties()
  Customer.getLoan(alex, barclays, 100)
  const barclaysLiabilities = BalanceSheets.getLiabilities(barclays)
  expect(barclaysLiabilities[0].balance).toBe(150)
})
test('customer should receive loan liability on loan creation', () => {
  const { barclays, alex } = setupParties()
  Customer.getLoan(alex, barclays, 100)
  const alexLiabilities = BalanceSheets.getCreditLiabilities(alex)
  expect(alexLiabilities[0].balance).toBe(100)
})
test('bank should receive loan asset on loan creation', () => {
  const { barclays, alex } = setupParties()
  Customer.getLoan(alex, barclays, 100)
  const barclaysAssets = BalanceSheets.getCreditAssets(barclays)
  expect(barclaysAssets[0].balance).toBe(100)
})
test('customer loan should decrease on repayment', () => {
  const { barclays, alex } = setupParties()
  Customer.getLoan(alex, barclays, 100)
  Customer.repayLoanFromAccount(alex, barclays, 50)
  const alexLiabilities = BalanceSheets.getCreditLiabilities(alex)
  expect(alexLiabilities[0].balance).toBe(50)
})
test('bank loan should increase on repayment', () => {
  const { barclays, alex } = setupParties()
  Customer.getLoan(alex, barclays, 100)
  Customer.repayLoanFromAccount(alex, barclays, 50)
  const barclaysAssets = BalanceSheets.getCreditAssets(barclays)
  expect(barclaysAssets[0].balance).toBe(50)
})
test('loan should not appear on balance sheet if repaid', () => {
  const { barclays, alex } = setupParties()
  Customer.getLoan(alex, barclays, 100)
  Customer.repayLoanFromAccount(alex, barclays, 100)
  const barclaysAssets = BalanceSheets.getCreditAssets(barclays)
  const alexLiabilities = BalanceSheets.getCreditLiabilities(alex)
  expect(barclaysAssets.length).toBe(0)
  expect(alexLiabilities.length).toBe(0)
})
