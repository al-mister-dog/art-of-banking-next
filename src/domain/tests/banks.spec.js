import { BankingSystem } from '../banking-system'
import { clearBankData } from '../structures'

function setupParties() {
  const barclays = BankingSystem.createBank('barclays', 'bank', 100)
  const hsbc = BankingSystem.createBank('hsbc', 'bank', 100)

  const alex = BankingSystem.createBank('alex', 'customer', 100)
  const herbie = BankingSystem.createBank('herbie', 'customer', 100)
  const emma = BankingSystem.createBank('emma', 'customer', 100)
  const benno = BankingSystem.createBank('benno', 'customer', 100)

  return { alex, herbie, emma, benno, barclays, hsbc }
}

describe('initialise parties', () => {
  const { barclays, hsbc, alex, herbie, emma, benno } = setupParties()

  test.each([
    { party: barclays, id: 0 },
    { party: hsbc, id: 1 },
    { party: alex, id: 2 },
    { party: herbie, id: 3 },
    { party: emma, id: 4 },
    { party: benno, id: 5 },
  ])('increment party ids in order of creation', ({ party, id }) => {
    expect(party.id).toBe(id)
  })
})

describe('clearing data', () => {
  clearBankData()
  const { barclays, hsbc, alex, herbie, emma, benno } = setupParties()

  test.each([
    { party: barclays, id: 0 },
    { party: hsbc, id: 1 },
    { party: alex, id: 2 },
    { party: herbie, id: 3 },
    { party: emma, id: 4 },
    { party: benno, id: 5 },
  ])('bankdata id should be reset to 0', ({ party, id }) => {
    expect(party.id).toBe(id)
  })
})
