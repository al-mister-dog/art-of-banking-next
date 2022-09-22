import { BankingSystem } from '../banking-system'
import { Customer } from '../customer'
import { system } from '../structures'
import { System } from '../system'

export const lecture1 = {
  system: 'national',
  banks: [
    {
      id: 0,
      name: 'barclays',
      reserves: 0,
    },
    {
      id: 1,
      name: 'hsbc',
      reserves: 0,
    },
  ],
  customers: [
    { id: 2, name: 'alex', reserves: 100, bankIds: [0] },
    { id: 3, name: 'emma', reserves: 100, bankIds: [0] },
    { id: 4, name: 'herbie', reserves: 100, bankIds: [1] },
    { id: 5, name: 'benno', reserves: 100, bankIds: [1] },
  ],
  actions: [
    {
      type: 'customerTransfer',
      payload: { from: 2, to: 4, fromBank: 0, toBank: 1, amount: 50 },
    },
    {
      type: 'customerTransfer',
      payload: { from: 5, to: 3, fromBank: 1, toBank: 0, amount: 40 },
    },
  ],
}

export const lectures = {
  lecture1() {
    System.setSystem('national')
    const bank1 = BankingSystem.createBank('Bank 1', 'bank')
    const customer1 = BankingSystem.createBank('Customer 1', 'customer')
    Customer.createAccount(customer1, bank1)
    return { bank1, customer1 }
  },
  lecture2() {}
}
