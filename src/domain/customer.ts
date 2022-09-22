import { Accounts } from "./accounts";
import { Reserves } from "./reserves";
import { Dues } from "./dues";
import { Bank, bankData } from "./structures";
import { System } from "./system";
import { Loans } from "./loans";
import { mapObject } from "./helpers";

export const Customer = {
  get() {
    return mapObject(bankData.banks).filter((bank) => bank.type === "customer");
  },

  getById(id: number) {
    const bank = bankData.allIds
      .map((id) => bankData.banks[id])
      .filter((bank) => bank.type === "customer" && bank.id === id);
    return { ...bank[0] };
  },
  createAccount(customer: Bank, bank: Bank, amount?: number) {
    Accounts.createAccount(customer, bank, "customerDeposits", amount);
    if (amount) {
      Reserves.decreaseReserves(customer, amount);
      Reserves.increaseReserves(bank, amount);
    }
  },
  deposit(customer: Bank, bank: Bank, amount: number) {
    Accounts.increaseCorrespondingBalance(customer, bank, amount);
    Reserves.decreaseReserves(customer, amount);
    Reserves.increaseReserves(bank, amount);
  },
  withdraw(customer: Bank, bank: Bank, amount: number) {
    Accounts.decreaseCorrespondingBalance(customer, bank, amount);
    Reserves.increaseReserves(customer, amount);
    Reserves.decreaseReserves(bank, amount);
  },

  transfer(
    amount: number,
    customer1: Bank,
    customer2: Bank,
    bank1: Bank,
    bank2?: Bank
  ) {
    if (bank2) {
      Accounts.decreaseCorrespondingBalance(customer1, bank1, amount);
      Accounts.increaseCorrespondingBalance(customer2, bank2, amount);
      //bank1 decreases its own balance but is owed by clearinghouse
      //bank2
      System.handleDues(bank1, bank2, amount);
    } else {
      Accounts.decreaseCorrespondingBalance(customer1, bank1, amount);
      Accounts.increaseCorrespondingBalance(customer2, bank1, amount);
    }
  },

  getLoan(customer: Bank, bank: Bank, amount: number) {
    Loans.create(customer, bank, amount, "customerDeposits");
    Accounts.increaseCorrespondingBalance(customer, bank, amount);
  },
  repayLoanFromAccount(customer: Bank, bank: Bank, amount: number) {
    Loans.decrease(customer, bank, amount, "customerDeposits");
    Accounts.decreaseCorrespondingBalance(customer, bank, amount);
  },
  repayLoanCash(customer: Bank, bank: Bank, amount: number) {
    Loans.decrease(customer, bank, amount, "customerDeposits");
    Reserves.decreaseReserves(customer, amount);
    Reserves.increaseReserves(bank, amount);
  },
};
