import CentralBank from "../../components/widgets/compound-interest-calculator";
import { CreditAccounts } from "./credit-accounts";
import { Record } from "./records";
import {
  Bank,
  creditData,
  CreditData,
  CreditAccount,
  bankData,
} from "../structures";

export const Loans = {
  create(
    subordinate: Bank,
    superior: Bank,
    amount: number,
    type: string,
    interest?: number,
    interestRate?: number
  ) {
    CreditAccounts.create(
      subordinate,
      superior,
      amount,
      type,
      "loans",
      interest,
      interestRate,
      amount
    );
  },
  createMortgage(
    subordinate: Bank,
    superior: Bank,
    amount: number,
    type: string
  ) {
    CreditAccounts.create(subordinate, superior, amount, type, "Mortgage");
  },

  createFedFunds(
    subordinate: Bank,
    superior: Bank,
    amount: number,
    type: string,
    interest: number,
    interestRate: number
  ) {
    CreditAccounts.create(
      subordinate,
      superior,
      amount,
      type,
      "fed funds",
      interest,
      interestRate,
      amount,
    );
  },

  getAll(bank: Bank) {
    const accounts: CreditAccount[] = bank.creditIds
      .map((creditAccountId) => creditData.creditAccounts[creditAccountId])
      .filter((account) => account.category === "loans");
    return accounts;
  },

  getAllSubordinates(bank: Bank) {
    const subAccounts: CreditAccount[] = mapFilter(
      bank,
      (creditAccount) => creditAccount.subordinateId === bank.id
    );
    return subAccounts;
  },

  getAllSuperiors(bank: Bank) {
    const supAccounts: CreditAccount[] = mapFilter(
      bank,
      (creditAccount) => creditAccount.superiorId === bank.id
    );
    return supAccounts;
  },

  get(bank1: Bank, bank2: Bank) {
    return mapFilter(
      bank1,
      (account) =>
        account.subordinateId === bank1.id &&
        account.superiorId === bank2.id &&
        account.category === "loans" &&
        account.balance > 0
    )[0];
  },

  getById(id1: number, id2: number) {
    return Object.keys(creditData.creditAccounts)
      .map((id) => creditData.creditAccounts[id])
      .filter((account) => {
        account.subordinateId === id1 &&
          account.superiorId === id2 &&
          account.category === "loans";
      });
  },

  increase(bank1: Bank, bank2: Bank, amount: number, type: string) {
    let account = Loans.get(bank1, bank2);
    if (account) {
      CreditAccounts.increaseCorrespondingCredit(account, amount);
    } else {
      Loans.create(bank1, bank2, amount, type);
    }
  },

  decrease(bank1: Bank, bank2: Bank, amount: number, type: string) {
    let account = Loans.get(bank1, bank2);
    if (account) {
      CreditAccounts.decreaseCorrespondingCredit(account, amount);
    } else {
      console.log("HELLO");
      Loans.create(bank1, bank2, amount, type);
    }
  },
};

function mapFilter(party: Bank, cb: (account: CreditAccount) => boolean) {
  return party.creditIds
    .map((id) => creditData.creditAccounts[id])
    .filter((account) => cb(account) && account.category === "loans");
}
