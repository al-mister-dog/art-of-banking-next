import { accountData, clearBankData } from '../structures'
import { Accounts } from '../accounts'
import { BankingSystem } from '../banking-system'
import { Banks } from '../bank'
import { Display } from '../display'
import { Customer } from '../customer'
import { accounts1 } from './accounts-fixtures'
import { Dues } from '../dues'
import { CreditAccounts } from '../credit-accounts'
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

describe('Account Get Methods', () => {
  test("receive an array of customer's accounts after creating accounts", () => {
    const { barclays, hsbc, alex } = setupParties()

    Banks.createAccount(alex, barclays, 'Customer Deposits', 50)
    Banks.createAccount(alex, hsbc, 'Customer Deposits', 50)

    const accounts = Accounts.getAllAccounts(alex)

    expect(accounts.length).toBe(2)
  })
  test("receive an empty array of customer's accounts after creating accounts", () => {
    const { alex } = setupParties()

    const accounts = Accounts.getAllAccounts(alex)

    expect(accounts.length).toBe(0)
  })

  describe('subordinate and superior accounts', () => {
    function setup() {
      clearBankData()
      const superiorBank = BankingSystem.createBank(
        'superior bank',
        'bank',
        100
      )
      const subordinateBank1 = BankingSystem.createBank(
        'superior bank',
        'bank',
        100
      )
      const subordinateBank2 = BankingSystem.createBank(
        'superior bank',
        'bank',
        100
      )
      Banks.createAccount(
        subordinateBank1,
        superiorBank,

        100
      )
      Banks.createAccount(
        subordinateBank2,
        superiorBank,

        100
      )
      return { superiorBank, subordinateBank1, subordinateBank2 }
    }
    test('receive an array of subordinate*1 accounts after creating accounts', () => {
      const { superiorBank, subordinateBank1, subordinateBank2 } = setup()
      const subordinateBank1Accounts =
        Accounts.getAllSubordinateAccounts(subordinateBank1)
      const subordinateBank2Accounts =
        Accounts.getAllSubordinateAccounts(subordinateBank2)
      expect(subordinateBank1Accounts.length).toBe(1)
      expect(subordinateBank1Accounts[0].superiorId).toBe(superiorBank.id)
      expect(subordinateBank2Accounts.length).toBe(1)
      expect(subordinateBank2Accounts[0].superiorId).toBe(superiorBank.id)
    })
    test('receive an array of superior*1 accounts after creating accounts', () => {
      const { superiorBank, subordinateBank1, subordinateBank2 } = setup()
      const superiorBankAccounts = Accounts.getAllSuperiorAccounts(superiorBank)
      expect(superiorBankAccounts.length).toBe(2)
      expect(superiorBankAccounts[0].subordinateId).toBe(subordinateBank1.id)
      expect(superiorBankAccounts[1].subordinateId).toBe(subordinateBank2.id)
    })
    test('receive an empty array of sub accounts if superior and vice versa', () => {
      const { superiorBank, subordinateBank1, subordinateBank2 } = setup()
      expect(Accounts.getAllSuperiorAccounts(subordinateBank1).length).toBe(0)
      expect(Accounts.getAllSuperiorAccounts(subordinateBank2).length).toBe(0)
      expect(Accounts.getAllSubordinateAccounts(superiorBank).length).toBe(0)
    })
  })
  describe('Mutual Accounts', () => {
    function setup() {
      clearBankData()
      const superiorBank = BankingSystem.createBank(
        'superior bank',
        'bank',
        100
      )
      const subordinateBank1 = BankingSystem.createBank(
        'superior bank',
        'bank',
        100
      )

      Banks.createAccount(
        subordinateBank1,
        superiorBank,

        100
      )

      return { superiorBank, subordinateBank1 }
    }
    test('Should return an account with respective subordinate and superior ids', () => {
      const { superiorBank, subordinateBank1 } = setup()
      const mutualAccount = Accounts.getAccount(subordinateBank1, superiorBank)
      expect(mutualAccount.subordinateId).toBe(subordinateBank1.id)
      expect(mutualAccount.superiorId).toBe(superiorBank.id)
    })
    test('Should return undefined if account not found', () => {
      const { superiorBank, subordinateBank1 } = setup()
      const mutualAccount = Accounts.getAccount(superiorBank, subordinateBank1)
      expect(mutualAccount).toBe(undefined)
    })
    test('should return respective subordinate and superior accounts depending on argument placement', () => {
      const { superiorBank, subordinateBank1 } = setup()
      Banks.createAccount(superiorBank, subordinateBank1)
      const mutualAccount1 = Accounts.getAccount(subordinateBank1, superiorBank)
      expect(mutualAccount1.subordinateId).toBe(subordinateBank1.id)
      expect(mutualAccount1.superiorId).toBe(superiorBank.id)
      const mutualAccount2 = Accounts.getAccount(superiorBank, subordinateBank1)
      expect(mutualAccount2.subordinateId).toBe(superiorBank.id)
      expect(mutualAccount2.superiorId).toBe(subordinateBank1.id)
    })
  })
})

