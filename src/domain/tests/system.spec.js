import { System } from '../system'

import { BankingSystem } from '../banking-system'
import { Accounts } from '../accounts'
import { Reserves } from '../reserves'
import { Customer } from '../customer'
import { accountData, bankData, clearBankData } from '../structures'

import { Dues } from '../dues'
import { accounts1 } from './system-test-fixtures'

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
  describe('each system', () => {
    test('setting a system should change system literal', () => {
      System.setSystem('centralbank')
      expect(System.getSystem()).toBe('centralbank')
      System.setSystem('chips')
      expect(System.getSystem()).toBe('chips')
      System.setSystem('clearinghouse')
      expect(System.getSystem()).toBe('clearinghouse')
      System.setSystem('correspondent')
      expect(System.getSystem()).toBe('correspondent')
      System.setSystem('national')
      expect(System.getSystem()).toBe('national')
    })
    describe('initialisation', () => {
      test('clearinghouse: a clearinghouse bank should be created', () => {
        clearBankData()
        System.setSystem('clearinghouse')
        const barclays = BankingSystem.createBank('barclays', 'bank', 100)
        const hsbc = BankingSystem.createBank('hsbc', 'bank', 100)
        expect(Object.keys(bankData.allIds)).toEqual(['0', '1', '2'])
        expect(BankingSystem.getBankById(0).name).toEqual('clearinghouse')
      })
    })
    describe('creating accounts', () => {
      describe('clearinghouse', () => {
        test("bank open accounts with clearinghouse on creation", () => {
          clearBankData()
          System.setSystem('clearinghouse')
          BankingSystem.createBank('barclays', 'bank', 100)
          BankingSystem.createBank('hsbc', 'bank', 100)
          expect(accountData.accounts).toEqual(accounts1)
        })
        test("customers do not open account with clearinghouse on creation", () => {
          clearBankData()
          System.setSystem('clearinghouse')
          BankingSystem.createBank('barclays', 'bank', 100)
          BankingSystem.createBank('hsbc', 'bank', 100)
          BankingSystem.createBank('alex', 'customer', 100)
          expect(accountData.accounts).toEqual(accounts1)
        })
      })
    })
    describe('dues accounts should differ depending on system', () => {
      test('national: transfer dues are betweeen banks', () => {
        System.setSystem('national')
        const { barclays, hsbc, alex, herbie } = setupParties()
        Customer.transfer(25, alex, herbie, barclays, hsbc)
        const dues = Dues.get(barclays, hsbc)
        expect(dues.subordinateId).toBe(barclays.id)
        expect(dues.superiorId).toBe(hsbc.id)
        expect(dues.type).toBe('customer deposits')
        expect(dues.balance).toBe(25)
      })
    })
  })
  // describe('national', () => {})
})
