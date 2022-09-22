import {
  Bank,
  creditData,
  CreditData,
  CreditAccount,
  BankData,
} from "./structures";

const nettedAccounts = [];

export const CreditAccounts = {
  getData() {
    return creditData;
  },

  create(
    subordinate: Bank,
    superior: Bank,
    balance = 0,
    type: string,
    category: string
  ) {
    const newAccount = {
      id: creditData.id,
      subordinateId: subordinate.id,
      superiorId: superior.id,
      type,
      balance,
      category,
    };
    const newCreditData = JSON.parse(JSON.stringify(creditData));
    newCreditData.creditAccounts[newCreditData.id] = newAccount;
    newCreditData.id++;

    newCreditData.allIds.push(newAccount.id);
    CreditData.assign(newCreditData);
    BankData.assignCreditIds(subordinate, superior, newAccount.id);
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
    const newCreditAccount = { ...account };
    newCreditAccount.balance += amount;

    let creditAccounts = { ...creditData.creditAccounts };
    creditAccounts = { ...creditAccounts, [account.id]: newCreditAccount };
    CreditData.assignAccounts(creditAccounts);
  },

  decreaseCorrespondingCredit(account: CreditAccount, amount: number) {
    const newCreditAccount = { ...account };
    newCreditAccount.balance -= amount;

    let creditAccounts = { ...creditData.creditAccounts };
    creditAccounts = { ...creditAccounts, [account.id]: newCreditAccount };
    CreditData.assignAccounts(creditAccounts);
  },

  set(account: CreditAccount, amount: number) {
    // console.log(account)
    const newCreditAccount = { ...account };
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
