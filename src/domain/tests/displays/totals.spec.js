import { System } from '../../system'
import { BankingSystem } from '../../banking-system'
import { Customer } from '../../customer'
import { clearBankData } from '../../structures'
import { Totals } from '../../displays/totals'

function setupParties() {
  clearBankData()
  const barclays = BankingSystem.createBank('barclays', 'bank', 100)
  const hsbc = BankingSystem.createBank('hsbc', 'bank', 100)
  const alex = BankingSystem.createBank('alex', 'customer', 100)
  const herbie = BankingSystem.createBank('herbie', 'customer', 100)
  const emma = BankingSystem.createBank('emma', 'customer', 100)
  const benno = BankingSystem.createBank('benno', 'customer', 100)

  return { barclays, hsbc, alex, herbie, emma, benno }
}

describe('accounts', () => {
  test('should total all accounts', () => {
    System.setSystem('national')
    const { barclays, hsbc, alex, herbie, emma, benno } = setupParties()
    Customer.createAccount(alex, barclays, 50)
    Customer.createAccount(herbie, hsbc, 50)
    Customer.createAccount(emma, barclays, 50)
    Customer.createAccount(benno, hsbc, 50)
    const total = Totals.getTotalAccounts()
    expect(total).toBe(200)
  })

  test('should total individual accounts', () => {
    const { barclays, hsbc, alex, herbie } = setupParties()
    Customer.createAccount(alex, barclays, 50)
    Customer.createAccount(herbie, hsbc, 50)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    const total = Totals.getTotalBankAccounts(alex)
    expect(total).toBe(25)
  })
})

describe('liabilities', () => {
  test('should total deposit liabilities of an individual bank', () => {
    const { barclays,  alex, herbie } = setupParties()
    Customer.createAccount(alex, barclays, 50)
    Customer.createAccount(herbie, barclays, 50)
    const total = Totals.getTotalCustomerDepositLiabilites(barclays)
    expect(total).toBe(100)
    Customer.transfer(25, alex, herbie, barclays)
    expect(total).toBe(100)
  })
})

describe('assets', () => {
  test('should total deposit assets of an individual customer', () => {
    const { barclays, hsbc, alex } = setupParties()
    Customer.createAccount(alex, barclays, 50)
    Customer.createAccount(alex, hsbc, 50)
    const total = Totals.getTotalCustomerDepositAssets(alex)
    expect(total).toBe(100)
  })
  test('should get total assets', () => {
    System.setSystem('national')
    const { barclays, hsbc, alex, emma, benno, herbie } = setupParties()
    Customer.createAccount(alex, barclays, 50)
    Customer.createAccount(herbie, hsbc, 50)
    Customer.createAccount(emma, barclays, 50)
    Customer.createAccount(benno, hsbc, 50)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    Customer.transfer(10, herbie, alex, hsbc, barclays)
    expect(Totals.getTotalAssets(barclays)).toBe(110)
    expect(Totals.getTotalAssets(hsbc)).toBe(125)
  })
  test('should get total assets', () => {
    System.setSystem('national')
    const { barclays, hsbc, alex, emma, benno, herbie } = setupParties()
    Customer.createAccount(alex, barclays, 50)
    Customer.createAccount(herbie, hsbc, 50)
    Customer.createAccount(emma, barclays, 50)
    Customer.createAccount(benno, hsbc, 50)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    Customer.transfer(10, herbie, alex, hsbc, barclays)
    expect(Totals.getTotalLiabilities(barclays)).toBe(110)
    expect(Totals.getTotalLiabilities(hsbc)).toBe(125)
  })
})
