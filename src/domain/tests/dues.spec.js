import { System } from '../system'

import { BankingSystem } from '../banking-system'
import { Accounts } from '../accounts'
import { Customer } from '../customer'
import { clearBankData } from '../structures'
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

  Customer.createAccount(alex, barclays, 50)
  Customer.createAccount(herbie, hsbc, 50)
  return { barclays, hsbc, alex, herbie, emma, benno }
}

describe('transfers based on system', () => {
  describe('national system', () => {
    test('transfer amount should be due from bank of customer who sent transfer', () => {
      System.setSystem('national')
      const { barclays, hsbc, alex, herbie } = setupParties()
      Customer.transfer(25, alex, herbie, barclays, hsbc)
      const dues = Dues.get(barclays, hsbc)
      expect(dues.subordinateId).toBe(barclays.id)
      expect(dues.superiorId).toBe(hsbc.id)
      expect(dues.type).toBe('Customer Deposits')
      expect(dues.balance).toBe(25)
    })
    test('due balance should increase on subsequent transfers', () => {
      System.setSystem('national')
      const { barclays, hsbc, alex, herbie } = setupParties()
      const arr = [1, 2, 3, 4, 5]
      arr.forEach((n) => {
        Customer.transfer(25, alex, herbie, barclays, hsbc)
        expect(Dues.get(barclays, hsbc).balance).toBe(25 * n)
      })
    })
    test('there should be two dues accounts representing two way transfers', () => {
      System.setSystem('national')
      const { barclays, hsbc, alex, herbie } = setupParties()
      Customer.transfer(25, alex, herbie, barclays, hsbc)
      Customer.transfer(10, herbie, alex, hsbc, barclays)
      expect(Dues.get(barclays, hsbc).balance).toBe(25)
      expect(Dues.get(hsbc, barclays).balance).toBe(10)
    })
    test('randomised test', () => {
      System.setSystem('national')
      const { barclays, hsbc, alex, herbie } = setupParties()
      const rand1 = Math.floor(Math.random() * 50)
      const rand2 = Math.floor(Math.random() * 50)
      let amount1 = 0
      let amount2 = 0
      const arr = [1, 2, 3, 4, 5]
      arr.forEach(() => {
        Customer.transfer(rand1, alex, herbie, barclays, hsbc)
        Customer.transfer(rand2, herbie, alex, hsbc, barclays)
        amount1 += rand1
        amount2 += rand2
      })
      expect(Dues.get(barclays, hsbc).balance).toBe(amount1)
      expect(Dues.get(hsbc, barclays).balance).toBe(amount2)
    })
  })
})
