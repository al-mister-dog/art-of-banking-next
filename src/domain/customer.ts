import { Accounts } from "./accounts";
import { Reserves } from "./reserves";
import { Dues } from "./dues";
import { Bank, bankData, records } from "./structures";
import { System } from "./system";
import { Loans } from "./loans";
import { mapObject } from "./helpers";
import { Record } from "./Records";

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
    Accounts.createAccount(customer, bank, "customer deposits", amount);
    if (amount) {
      Reserves.decreaseReserves(customer, amount);
      Reserves.increaseReserves(bank, amount);
      Record.deposit(customer, bank, amount)
    }
  },
  deposit(customer: Bank, bank: Bank, amount: number) {
    Accounts.increaseCorrespondingBalance(customer, bank, amount);
    Reserves.decreaseReserves(customer, amount);
    Reserves.increaseReserves(bank, amount);
    Record.deposit(customer, bank, amount);
  },
  withdraw(customer: Bank, bank: Bank, amount: number) {
    Accounts.decreaseCorrespondingBalance(customer, bank, amount);
    Reserves.increaseReserves(customer, amount);
    Reserves.decreaseReserves(bank, amount);
    Record.customerWithdraw(customer, bank, amount);
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
      System.handleDues(bank1, bank2, amount);
      Record.transferMultiple(amount, customer1, customer2, bank1, bank2);
    } else {
      Accounts.decreaseCorrespondingBalance(customer1, bank1, amount);
      Accounts.increaseCorrespondingBalance(customer2, bank1, amount);
      Record.transferSingle(amount, customer1, customer2, bank1);
    }
    
  },

  getLoan(customer: Bank, bank: Bank, amount: number) {
    Loans.create(customer, bank, amount, "customer deposits");
    Accounts.increaseCorrespondingBalance(customer, bank, amount);
  },
  repayLoanFromAccount(customer: Bank, bank: Bank, amount: number) {
    Loans.decrease(customer, bank, amount, "customer deposits");
    Accounts.decreaseCorrespondingBalance(customer, bank, amount);
  },
  repayLoanCash(customer: Bank, bank: Bank, amount: number) {
    Loans.decrease(customer, bank, amount, "customer deposits");
    Reserves.decreaseReserves(customer, amount);
    Reserves.increaseReserves(bank, amount);
  },
};
