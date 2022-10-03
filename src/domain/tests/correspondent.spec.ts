import { clearBankData } from '../structures'
import { Accounts } from '../accounts'
import { BankingSystem } from '../banking-system'
import { Banks } from '../bank'
import { Display } from '../display'
import { Customer } from '../customer'
import { accounts1 } from './accounts-fixtures'
import { Dues } from '../dues'

function setupParties() {
  clearBankData()
  //create some banks
  const barclays = BankingSystem.createBank('barclays', 'bank', 100)
  const hsbc = BankingSystem.createBank('hsbc', 'bank', 100)

  //create some customers
  const alex = BankingSystem.createBank('alex', 'customer', 100)
  const herbie = BankingSystem.createBank('herbie', 'customer', 100)
  const emma = BankingSystem.createBank('emma', 'customer', 100)
  const benno = BankingSystem.createBank('benno', 'customer', 100)

  return { alex, herbie, emma, benno, barclays, hsbc }
}

describe('Correspondent transactions', () => {
  test('Corresponding bank accounts should be created on create account', () => {
    const { barclays, hsbc, alex, herbie } = setupParties()
    Banks.createAccount(barclays, hsbc)
    Banks.createAccount(hsbc, barclays)
    Customer.createAccount(alex, barclays)
    Customer.createAccount(herbie, hsbc)
    expect(Accounts.get()).toEqual(accounts1)
  })
  test('dues accounts should be created on customer transfer', () => {
    const { barclays, hsbc, alex, herbie } = setupParties()
    Banks.createAccount(barclays, hsbc)
    Banks.createAccount(hsbc, barclays)
    Customer.createAccount(alex, barclays)
    Customer.createAccount(herbie, hsbc)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    expect(
      Display.balanceSheetObject(barclays).liabilities.Due Tos[0].superiorId
    ).toEqual(hsbc.id)
    expect(
      Display.balanceSheetObject(barclays).liabilities.Due Tos[0].balance
    ).toEqual(25)
    expect(
      Display.balanceSheetObject(hsbc).assets.Due Froms[0].subordinateId
    ).toEqual(barclays.id)
    expect(Display.balanceSheetObject(hsbc).assets.Due Froms[0].balance).toEqual(
      25
    )
  })
  it('dues accounts should decrease after bank transfer from debtor bank', () => {
    const { barclays, hsbc, alex, herbie } = setupParties()
    Banks.createAccount(barclays, hsbc)
    Banks.createAccount(hsbc, barclays)
    Customer.createAccount(alex, barclays)
    Customer.createAccount(herbie, hsbc)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    Banks.transfer(barclays, hsbc, 20)
    expect(Dues.get(barclays, hsbc).balance).toBe(5)
  })
  it('dues accounts should stay same after bank transfer from creditor bank', () => {
    const { barclays, hsbc, alex, herbie } = setupParties()
    Banks.createAccount(barclays, hsbc)
    Banks.createAccount(hsbc, barclays)
    Customer.createAccount(alex, barclays)
    Customer.createAccount(herbie, hsbc)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    Banks.transfer(hsbc, barclays, 20)
    expect(Dues.get(barclays, hsbc).balance).toBe(25)
  })
  it('nets dues', () => {
    const { barclays, hsbc, alex, herbie } = setupParties()
    Banks.createAccount(barclays, hsbc)
    Banks.createAccount(hsbc, barclays)
    Customer.createAccount(alex, barclays)
    Customer.createAccount(herbie, hsbc)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    Customer.transfer(20, herbie, alex, hsbc, barclays)
    expect(Dues.get(barclays, hsbc).balance).toBe(25)
    expect(Dues.get(hsbc, barclays).balance).toBe(20)
    Dues.net(barclays, hsbc)
    expect(Dues.get(barclays, hsbc).balance).toBe(25 - 20)
    expect(Dues.get(hsbc, barclays).balance).toBe(0)
  })
})
