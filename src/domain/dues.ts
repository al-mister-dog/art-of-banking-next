import { Clearinghouse } from "./clearinghouse";
import { CreditAccounts } from "./credit-accounts";
import { Reserves } from "./reserves";
import {
  Bank,
  creditData,
  CreditData,
  CreditAccount,
  bankData,
} from "./structures";
import { System } from "./system";

export const Dues = {
  create(subordinate: Bank, superior: Bank, amount: number, type: string) {
    CreditAccounts.create(subordinate, superior, amount, type, "dues");
  },

  get(bank1: Bank, bank2: Bank) {
    return mapFilter(
      bank1,
      (account) =>
        account.subordinateId === bank1.id && account.superiorId === bank2.id
    )[0];
  },
  getCorresponding(bank1: Bank, bank2: Bank) {
    // if (System.getSystem() === "clearinghouse") {
    //   return creditData.allIds
    //     .map((id) => creditData.creditAccounts[id])
    //     .filter(
    //       (account) =>
    //         (account.subordinateId === bank1.id &&
    //           account.superiorId === bank2.id) ||
    //         (account.superiorId === bank1.id &&
    //           account.subordinateId === bank2.id &&
    //           account.category === "dues")
    //     );
    // } else {
    return mapFilter(
      bank1,
      (account) =>
        (account.subordinateId === bank1.id &&
          account.superiorId === bank2.id) ||
        (account.superiorId === bank1.id &&
          account.subordinateId === bank2.id &&
          account.category === "dues")
    );
    // }
  },
  getById(id: number) {
    const allDues = creditData.allIds.map(
      (id) => creditData.creditAccounts[id]
    );
    const relevantDues = allDues.filter(
      (account) =>
        (account.subordinateId === id || account.superiorId === id) &&
        account.balance > 0
    );
    return relevantDues;
  },
  getByIdAndNetted(id: number) {
    const allDues = creditData.allIds.map(
      (id) => creditData.creditAccounts[id]
    );
    const relevantDues = allDues
      .filter(
        (account) =>
          (account.subordinateId === id || account.superiorId === id) &&
          account.balance > 0
      )
      .filter((account) => account.category === "dues" && account.netted);
    return relevantDues;
  },
  getAll(bank: Bank) {
    const accounts: CreditAccount[] = bank.creditIds
      .map((creditAccountId) => creditData.creditAccounts[creditAccountId])
      .filter((account) => account.category === "dues");
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

  increase(bank1: Bank, bank2: Bank, type: string, amount: number) {
    let account = Dues.get(bank1, bank2);
    if (account) {
      CreditAccounts.increaseCorrespondingCredit(account, amount);
    } else {
      Dues.create(bank1, bank2, amount, type);
    }
  },

  decrease(bank1: Bank, bank2: Bank, type: string, amount: number) {
    let account = Dues.get(bank1, bank2);

    if (account) {
      CreditAccounts.decreaseCorrespondingCredit(account, amount);
      Reserves.decreaseReserves(bank1, amount);
      Reserves.increaseReserves(bank2, amount);
    } else {
      Dues.create(bank1, bank2, amount, type);
    }
  },

  settle(bank1: Bank, bank2: Bank) {
    const accounts = Dues.getCorresponding(bank1, bank2);

    CreditAccounts.set(accounts[0], 0);
    CreditAccounts.set(accounts[1], 0);
  },

  owed(bank1: Bank, bank2: Bank): boolean {
    const dues = Dues.get(bank1, bank2);
    if (dues) {
      return dues.balance > 0 ? true : false;
    }
    return false;
  },

  net(bank1: Bank, bank2: Bank) {
    const system = System.getSystem();
    if (system === "clearinghouse") {
      this.netClearingHouse(bank2);
    } else {
      const owedByBank1 = Dues.get(bank1, bank2);
      const owedByBank2 = Dues.get(bank2, bank1);
      if (owedByBank1 && owedByBank2) {
        if (owedByBank1.balance > owedByBank2.balance) {
          const amountDue = owedByBank1.balance - owedByBank2.balance;
          this.netAndSet(bank1, bank2, amountDue);
          this.netAndSet(bank2, bank1, 0);
        } else if (owedByBank2.balance > owedByBank1.balance) {
          const amountDue = owedByBank2.balance - owedByBank1.balance;
          this.netAndSet(bank2, bank1, amountDue);
          this.netAndSet(bank1, bank2, 0);
        } else {
          this.netAndSet(bank2, bank1, 0);
          this.netAndSet(bank1, bank2, 0);
        }
      }
    }
  },

  netClearingHouse(bank1: Bank) {
    const clearinghouse = Clearinghouse.get();

    const owedByBank1 = Dues.get(bank1, clearinghouse);
    const owedByBank2 = Dues.get(clearinghouse, bank1);
    if (owedByBank1 && owedByBank2) {
      if (owedByBank1.balance > owedByBank2.balance) {
        const amountDue = owedByBank1.balance - owedByBank2.balance;
        this.netAndSet(bank1, clearinghouse, amountDue);
        this.netAndSet(clearinghouse, bank1, 0);
      } else if (owedByBank2.balance > owedByBank1.balance) {
        const amountDue = owedByBank2.balance - owedByBank1.balance;
        this.netAndSet(clearinghouse, bank1, amountDue);
        this.netAndSet(bank1, clearinghouse, 0);
      } else {
        this.netAndSet(clearinghouse, bank1, 0);
        this.netAndSet(bank1, clearinghouse, 0);
      }
    }
  },

  set(bank1: Bank, bank2: Bank, amount: number) {
    const account = Dues.get(bank1, bank2);
    CreditAccounts.set(account, amount);
  },

  netAndSet(bank1: Bank, bank2: Bank, amount: number) {
    const account = Dues.get(bank1, bank2);
    // CreditAccounts.set(account, amount);
    
    
    const newAccount = { ...account, netted: true };
    CreditAccounts.set(newAccount, amount);
  },
};

function mapFilter(party: Bank, cb: (account: CreditAccount) => boolean) {
  // console.log("mapFilter");
  // console.log(party);
  return party.creditIds
    .map((id) => creditData.creditAccounts[id])
    .filter((account) => cb(account) && account.category === "dues");
}
