import { Accounts } from "./accounts";
import { Reserves } from "./reserves";
import { Dues } from "./dues";
import {
  Bank,
  bankData,
  accountData,
  BankData,
  creditData,
} from "./structures";
import { system, System } from "./system";
import { Loans } from "./loans";
import { mapObject } from "./helpers";
import { Record } from "./Records";
import { CreditAccounts } from "./credit-accounts";

export const CentralBank = {
  createAccount(bank1: Bank, bank2: Bank, amount: number = 0) {
    Accounts.createAccount(bank1, bank2, "bankDeposits", amount);
    if (amount) {
      Reserves.decreaseReserves(bank1, amount);
      Reserves.increaseReserves(bank2, amount);
      Record.deposit(bank1, bank2, amount);
    }
  },
  get() {
    return mapObject(bankData.banks).filter((bank) => bank.type === "bank");
  },
  getAll() {
    return mapObject(bankData.banks);
  },
  getById(id: number) {
    const bank = bankData.allIds
      .map((id) => bankData.banks[id])
      .filter(
        (bank) =>
          (bank.type === "bank" || bank.type === "clearinghouse") &&
          bank.id === id
      );
    return { ...bank[0] };
  },
  getByCustomerId(id: number) {
    const sharedAccounts = mapObject(accountData.accounts).filter(
      (account) => account.subordinateId === id
    );
    const banksById = sharedAccounts.map(
      (account) => bankData.banks[account.superiorId]
    );
    return { ...banksById[0] };
  },
  getAllByCustomerId(id: number) {
    const sharedAccounts = mapObject(accountData.accounts).filter(
      (account) => account.subordinateId === id
    );
    const banksById = sharedAccounts.map(
      (account) => bankData.banks[account.superiorId]
    );
    return banksById;
  },
  deposit(bank1: Bank, bank2: Bank, amount: number) {
    Accounts.increaseCorrespondingBalance(bank1, bank2, amount);
    Reserves.decreaseReserves(bank1, amount);
    Reserves.increaseReserves(bank2, amount);
    Record.deposit(bank1, bank2, amount);
  },
  withdraw(bank1: Bank, bank2: Bank, amount: number) {
    Accounts.decreaseCorrespondingBalance(bank1, bank2, amount);
    Reserves.increaseReserves(bank1, amount);
    Reserves.decreaseReserves(bank2, amount);
  },

  transfer(bank1: Bank, bank2: Bank, amount: number) {
    const centralbank = bankData.banks[0];
    Record.transferMultipleCB(amount, bank1, bank2, centralbank);
    Accounts.increaseCorrespondingBalance(bank2, centralbank, amount);
    Accounts.decreaseCorrespondingBalance(bank1, centralbank, amount);
  },

  creditAccount(bank1: Bank, bank2: Bank, amount: number) {
    Accounts.increaseCorrespondingBalance(bank1, bank2, amount);
    Record.creditAccount(bank1, bank2, amount);
  },

  debitAccount(bank1: Bank, bank2: Bank, amount: number) {
    Accounts.decreaseCorrespondingBalance(bank1, bank2, amount);
    Record.debitAccount(bank1, bank2, amount);
  },

  getLoan(bank1: Bank, bank2: Bank, amount: number) {
    Loans.createFedFunds(bank1, bank2, amount, "fed funds");
    Record.fedFundsLoan(bank1, bank2, amount);
  },
  repayLoan(bank1: Bank, bank2: Bank, amount: number) {
    const account = Object.keys(creditData.creditAccounts)
      .map((id) => creditData.creditAccounts[id])
      .filter(
        (account) =>
          account.subordinateId === bank1.id && account.superiorId === bank2.id
      );

    if (account) {
      CreditAccounts.decreaseCorrespondingCredit(account[0], amount);
      Record.repayFedFundsLoan(bank1, bank2, amount);
    }
  },
};
