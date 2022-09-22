import { BankingSystem } from '../banking-system'
import { Accounts } from '../accounts'
import { Reserves } from '../reserves'
import { Customer } from '../customer'
import { clearBankData } from '../structures'

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
  return { barclays, hsbc, alex, herbie, emma, benno }
}

describe('reserves', () => {
  describe('reserves structure', () => {
    test('reserves object should be related to a party by id', () => {
      const { barclays, hsbc, alex, herbie, emma, benno } = setupParties()
      expect(Reserves.getReserves(barclays).id).toBe(barclays.id)
      expect(Reserves.getReserves(hsbc).id).toBe(hsbc.id)
      expect(Reserves.getReserves(alex).id).toBe(alex.id)
      expect(Reserves.getReserves(herbie).id).toBe(herbie.id)
      expect(Reserves.getReserves(emma).id).toBe(emma.id)
      expect(Reserves.getReserves(benno).id).toBe(benno.id)
    })
    test('reserves object should include id and cashReserves', () => {
      const { barclays } = setupParties()
      expect(Object.keys(Reserves.getReserves(barclays))).toEqual([
        'id',
        'cashReserves',
        'category',
      ])
    })
  })
  describe('cash reserves', () => {
    describe('customer cash reserves', () => {
      test('customer can add reserves on initialization', () => {
        const { alex } = setupParties()
        const alexReservesAccount = Reserves.getReserves(alex)
        expect(alexReservesAccount.cashReserves).toBe(100)
      })
      test('depositing into bank should decrease customer cash reserves', () => {
        const { barclays, alex } = setupParties()
        Customer.createAccount(alex, barclays)
        expect(Reserves.getReserves(alex).cashReserves).toBe(100)
        Customer.deposit(alex, barclays, 50)
        expect(Reserves.getReserves(alex).cashReserves).toBe(50)
      })
      test('depositing into bank should increase bank cash reserves', () => {
        const { barclays, alex } = setupParties()
        Customer.createAccount(alex, barclays)
        expect(Reserves.getReserves(barclays).cashReserves).toBe(100)
        Customer.deposit(alex, barclays, 50)
        expect(Reserves.getReserves(barclays).cashReserves).toBe(150)
      })
      test('withdrawing from bank should increase customer cash reserves', () => {
        const { barclays, alex } = setupParties()
        Customer.createAccount(alex, barclays)
        expect(Reserves.getReserves(alex).cashReserves).toBe(100)
        Customer.withdraw(alex, barclays, 50)
        expect(Reserves.getReserves(alex).cashReserves).toBe(150)
      })
      test('withdrawing from bank should decrease bank cash reserves', () => {
        const { barclays, alex } = setupParties()
        Customer.createAccount(alex, barclays)
        expect(Reserves.getReserves(barclays).cashReserves).toBe(100)
        Customer.withdraw(alex, barclays, 50)
        expect(Reserves.getReserves(barclays).cashReserves).toBe(50)
      })
    })
  })
})
