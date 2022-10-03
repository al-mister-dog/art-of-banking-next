import { Accounts } from '../../accounts'
import { BankingSystem } from '../../banking-system'
import { Banks } from '../../bank'
import { Customer } from '../../customer'
import { bankData, clearBankData, creditData } from '../../structures'
import { Dues } from '../../dues'
import { Display } from '../../display'
const config = {
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

function setupLecture(config) {
  clearBankData()

  config.banks.forEach((bank) => {
    BankingSystem.createBank(bank.name, 'bank', bank.reserves)
  })
  config.customers.forEach((customer) => {
    BankingSystem.createBank(customer.name, 'customer', customer.reserves)
    customer.bankIds.forEach((bankId) => {
      Customer.createAccount(
        bankData.banks[customer.id],
        bankData.banks[bankId],
        customer.reserves
      )
    })
  })

  const actions = {
    customerTransfer(payload) {
      const { from, to, fromBank, toBank, amount } = payload
      Customer.transfer(
        amount,
        bankData.banks[from],
        bankData.banks[to],
        bankData.banks[fromBank],
        bankData.banks[toBank]
      )
    },
  }

  config.actions.forEach((action) => {
    actions[action.type](action.payload)
  })
}
describe('setting up a test', () => {
  test('it creates specified banks', () => {
    setupLecture(config)
    expect(
      Banks.get().map((bank) => {
        return { id: bank.id, name: bank.name, type: bank.type }
      })
    ).toEqual([
      {
        id: 0,
        name: 'barclays',
        type: 'bank',
      },
      {
        id: 1,
        name: 'hsbc',
        type: 'bank',
      },
    ])
  })
  test('it creates specified customers', () => {
    setupLecture(config)
    expect(
      Customer.get().map((customer) => {
        return { id: customer.id, name: customer.name, type: customer.type }
      })
    ).toEqual([
      {
        id: 2,
        name: 'alex',
        type: 'customer',
      },
      {
        id: 3,
        name: 'emma',
        type: 'customer',
      },
      {
        id: 4,
        name: 'herbie',
        type: 'customer',
      },
      {
        id: 5,
        name: 'benno',
        type: 'customer',
      },
    ])
  })
})

const balancesheet = {
  assets: [
    {
      instrument: 'Due Froms',
      accounts: [
        {
          id: 1,
          subordinateId: 1,
          superiorId: 0,
          type: 'Customer Deposits',
          balance: 40,
          category: 'Due Froms',
          thirdPartyDetail: {
            id: 1,
            name: 'hsbc',
            type: 'bank',
            accountIds: [2, 3],
            creditIds: [0, 1],
          },
        },
      ],
    },
    {
      instrument: 'reserves',
      accounts: [{ id: 0, cashReserves: 0, category: 'reserves', balance: 0 }],
    },
  ],
  liabilities: [
    {
      instrument: 'Customer Deposits',
      accounts: [
        {
          id: 0,
          subordinateId: 2,
          superiorId: 0,
          type: 'Customer Deposits',
          balance: 50,
          category: 'Customer Deposits',
          thirdPartyDetail: {
            id: 2,
            name: 'alex',
            type: 'customer',
            accountIds: [0],
            creditIds: [],
          },
        },
        {
          id: 1,
          subordinateId: 3,
          superiorId: 0,
          type: 'Customer Deposits',
          balance: 140,
          category: 'Customer Deposits',
          thirdPartyDetail: {
            id: 3,
            name: 'emma',
            type: 'customer',
            accountIds: [1],
            creditIds: [],
          },
        },
      ],
    },
    {
      instrument: 'Due Tos',
      accounts: [
        {
          id: 0,
          subordinateId: 0,
          superiorId: 1,
          type: 'Customer Deposits',
          balance: 50,
          category: 'Due Tos',
          thirdPartyDetail: {
            id: 1,
            name: 'hsbc',
            type: 'bank',
            accountIds: [2, 3],
            creditIds: [0, 1],
          },
        },
      ],
    },
  ],
}
