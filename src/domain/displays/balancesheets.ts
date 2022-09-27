import {
  Account,
  accountData,
  Bank,
  bankData,
  CreditAccount,
  creditData,
  reservesData,
} from "../structures";
import { CreditAccounts } from "../credit-accounts";
import { Banks } from "../bank";

interface CorrespondingInstruments {
  [key: string]: string;
}

interface CorrespondingCreditInstruments {
  [index: string]: {
    [index: string]: string;
  };
}

const correspondingInstruments: CorrespondingInstruments = {
  customerDeposits: "customerOverdrafts",
  customerOverdrafts: "customerDeposits",
  bankDeposits: "bankOverdrafts",
  bankOverdrafts: "bankDeposits",
  "ch certificates": "ch loans",
  "ch loans": "ch certificates",
};

const correspondingCreditInstruments: CorrespondingCreditInstruments = {
  dues: {
    assets: "dueFroms",
    liabilities: "dueTos",
  },
  loans: {
    assets: "loanTo",
    liabilities: "loanFrom",
  },
};

export const BalanceSheets = {
  parseOverdraft(account: Account) {
    return {
      ...account,
      category: correspondingInstruments[account.type],
      balance: -account.balance,
    };
  },

  parseOverdrafts(accounts: Account[]) {
    return accounts.map((account) => {
      return {
        ...account,
        category: correspondingInstruments[account.type],
        balance: -account.balance,
      };
    });
  },

  getAccountAssets(bank: Bank) {
    const accounts = bank.accountIds.map((id) => {
      return accountData.accounts[id];
    });
    const recategorisedInstruments = accounts.map((account) => {
      if (account.subordinateId === bank.id && account.balance >= 0) {
        return account;
      }
      if (account.superiorId === bank.id && account.balance <= 0) {
        return this.parseOverdraft(account);
      }
    });
    return recategorisedInstruments.filter((a) => a !== undefined);
  },

  getAccountLiabilities(bank: Bank) {
    const accounts = bank.accountIds.map((id) => {
      return accountData.accounts[id];
    });
    const recategorisedInstruments = accounts.map((account) => {
      if (account.superiorId === bank.id && account.balance >= 0) {
        return account;
      }
      if (account.subordinateId === bank.id && account.balance <= 0) {
        return this.parseOverdraft(account);
      }
    });
    return recategorisedInstruments.filter((a) => a !== undefined);
  },

  getCreditAssets(bank: Bank) {
    const creditAccounts: CreditAccount[] = CreditAccounts.getAll(bank);

    const dueToAccounts = creditAccounts
      .filter(
        (account) => account.superiorId === bank.id && account.balance > 0
      )
      .map((account) => {
        return {
          ...account,
          category: correspondingCreditInstruments[account.category].assets,
        };
      });
    return dueToAccounts;
  },

  getCreditLiabilities(bank: Bank) {
    const creditAccounts: CreditAccount[] = CreditAccounts.getAll(bank);
    const dueFromAccounts = creditAccounts
      .filter(
        (creditAccount) =>
          creditAccount.subordinateId === bank.id && creditAccount.balance > 0
      )
      .map((account) => {
        return {
          ...account,
          category:
            correspondingCreditInstruments[account.category].liabilities,
        };
      });

    return dueFromAccounts;
  },

  getAssets(bank: Bank) {
    const accounts = this.getAccountAssets(bank);
    const credit = this.getCreditAssets(bank);

    return [...accounts, ...credit];
  },

  getAssetsPlusReserves(bank: Bank) {
    const accounts = this.getAccountAssets(bank);
    const credit = this.getCreditAssets(bank);
    const cashReserves = reservesData.reserves[bank.id];
    return [...accounts, ...credit, { ...cashReserves }];
  },

  getLiabilities(bank: Bank) {
    const accounts = this.getAccountLiabilities(bank);
    const credit = this.getCreditLiabilities(bank);
    return [...accounts, ...credit];
  },

  getAssetsAndLiabilities(bank: Bank) {
    const assets = this.getAssets(bank);
    const liabilities = this.getLiabilities(bank);
    return {
      assets,
      liabilities,
    };
  },

  getAssetsAndLiabilitiesPlusReserves(bank: Bank) {
    const assets = this.getAssetsPlusReserves(bank);
    const liabilities = this.getLiabilities(bank);
    return {
      assets,
      liabilities,
    };
  },

  getAll() {
    const allBanks = Banks.getAll();
    const allBalanceSheets = allBanks.map((bank) => {
      const assets = this.getAssetsPlusReserves(bank);
      const liabilities = this.getLiabilities(bank);
      return {
        id: bank.id,
        name: bank.name,
        assets,
        liabilities,
      };
    });
    return allBanks;
  },
};

function mapFilter(party: Bank, cb: (account: Account) => boolean) {
  return party.accountIds
    .map((id) => {
      return accountData.accounts[id];
    })
    .filter((account) => cb(account));
}
