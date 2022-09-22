import { System } from '../../system'
import { BalanceSheets } from '../../displays/balancesheets'
import { BankingSystem } from '../../banking-system'
import { Accounts } from '../../accounts'
import { Customer } from '../../customer'
import { Display } from '../../display'
import { clearBankData } from '../../structures'

import {
  balanceSheetDisplay4, balanceSheetDisplay5
} from './test-fixtures'

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

  Customer.createAccount(alex, barclays, 50)
  Customer.createAccount(herbie, hsbc, 50)
  return { barclays, hsbc, alex, herbie, emma, benno }
}

describe('displays for component rendering', () => {
  it('should be able to include reserves in balance sheet display', () => {
    System.setSystem('national')
    const { barclays, hsbc, alex, emma, benno, herbie } = setupParties()
    Customer.createAccount(emma, barclays, 50)
    Customer.createAccount(benno, hsbc, 50)
    Customer.transfer(25, alex, herbie, barclays, hsbc)
    Customer.transfer(10, herbie, alex, hsbc, barclays)
    Customer.transfer(75, emma, benno, barclays, hsbc)
    const balanceSheetDisplay = Display.balanceSheet(barclays)
    expect(balanceSheetDisplay).toEqual(balanceSheetDisplay5)
  })
})
