import { BankingSystem } from "../banking-system"
import { Customer } from "../customer"
import { Bank, bankData, clearBankData } from "../structures"

export function setupLecture(config: any) {
  clearBankData()

  config.banks.forEach((bank: any) => {
    BankingSystem.createBank(bank.name, 'bank', bank.reserves)
  })
  config.customers.forEach((customer: any) => {
    BankingSystem.createBank(customer.name, 'customer', customer.reserves)
    customer.bankIds.forEach((bankId: any) => {
      Customer.createAccount(
        bankData.banks[customer.id],
        bankData.banks[bankId],
        customer.reserves
      )
    })
  })
}