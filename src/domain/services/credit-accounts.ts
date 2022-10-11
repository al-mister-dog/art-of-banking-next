import {
  Bank,
  creditData,
  CreditData,
  CreditAccount,
  BankData,
  loanRecords,
} from "../structures";

export const CreditAccounts = {
  getData() {
    return creditData;
  },

  create(
    subordinate: Bank,
    superior: Bank,
    balance = 0,
    type: string,
    category: string,
    interest?: number,
    interestRate?: number,
    principal?: number
  ) {
    let newAccount: CreditAccount = {
      id: creditData.id,
      subordinateId: subordinate.id,
      superiorId: superior.id,
      type,
      balance,
      category,
      interest,
      interestRate,
      principal,
    };

    if (category === "dues") {
      newAccount = { ...newAccount, netted: false };
    }
    const newCreditData = JSON.parse(JSON.stringify(creditData));
    newCreditData.creditAccounts[newCreditData.id] = newAccount;
    newCreditData.id++;

    newCreditData.allIds.push(newAccount.id);
    CreditData.assign(newCreditData);
    BankData.assignCreditIds(subordinate, superior, newAccount.id);
    if (category === "loans" || category === "fed funds") {
      loanRecords.push(newAccount);
    }
  },
  get() {
    return creditData.creditAccounts;
  },
  getAll(bank: Bank) {
    const accounts: CreditAccount[] = bank.creditIds.map(
      (creditAccountId) => creditData.creditAccounts[creditAccountId]
    );
    return accounts;
  },

  getAllSubordinateAccounts(bank: Bank) {
    const subAccounts: CreditAccount[] = mapFilter(
      bank,
      (creditAccount) => creditAccount.subordinateId === bank.id
    );
    return subAccounts;
  },

  getAllSuperiorAccounts(bank: Bank) {
    const supAccounts: CreditAccount[] = mapFilter(
      bank,
      (creditAccount) => creditAccount.superiorId === bank.id
    );
    return supAccounts;
  },

  increaseCorrespondingCredit(account: CreditAccount, amount: number) {
    let newCreditAccount = { ...account };

    if (newCreditAccount.balance === 0) {
      newCreditAccount = { ...newCreditAccount, netted: false };
    }
    newCreditAccount.balance += amount;

    let creditAccounts = { ...creditData.creditAccounts };
    creditAccounts = { ...creditAccounts, [account.id]: newCreditAccount };
    CreditData.assignAccounts(creditAccounts);
  },

  decreaseCorrespondingCredit(account: CreditAccount, amount: number) {
    const newCreditAccount = { ...account };
    newCreditAccount.balance -= amount;

    if (newCreditAccount.balance <= 0 && newCreditAccount.type === "loans") {
      console.log(newCreditAccount);
      let creditAccounts = { ...creditData.creditAccounts };
      let invalidatedAccount = {
        ...creditAccounts,
        [account.id]: {},
      };
      creditAccounts = { ...creditAccounts, [account.id]: invalidatedAccount };
      CreditData.assignAccounts(creditAccounts);
    } else {
      let creditAccounts = { ...creditData.creditAccounts };
      creditAccounts = { ...creditAccounts, [account.id]: newCreditAccount };
      CreditData.assignAccounts(creditAccounts);
    }
  },

  set(account: CreditAccount, amount: number) {
    let newCreditAccount = { ...account };
    newCreditAccount.balance = amount;
    let creditAccounts = creditData.creditAccounts;
    creditAccounts = { ...creditAccounts, [account.id]: newCreditAccount };
    CreditData.assignAccounts(creditAccounts);
  },
};

function mapFilter(party: Bank, cb: (account: CreditAccount) => boolean) {
  return party.creditIds
    .map((id) => creditData.creditAccounts[id])
    .filter((account) => cb(account));
}
