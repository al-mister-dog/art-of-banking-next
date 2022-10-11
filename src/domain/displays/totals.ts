import { Accounts } from "../services/accounts";
import { BalanceSheets } from "./balancesheets";
import { Account, Bank, DuesAccount, reservesData } from "../structures";
import { accountData } from "../structures";
import { Banks } from "../services/bank";
//GETTING TOTALS
export const Totals = {
  getTotalAccounts() {
    const totalAccounts = accountData.allIds
      .map((id) => accountData.accounts[id].balance)
      .reduce((acc, cur) => acc + cur);
    return totalAccounts;
  },
  getTotalBankAccounts(bank: Bank) {
    const totalAccounts = mapReduceBalance(Accounts.getAllAccounts(bank));
    return totalAccounts;
  },
  getTotalCustomerDepositLiabilites(bank: Bank) {
    const depositAccounts = mapReduceBalance(
      Accounts.getAllAccounts(bank).filter(
        (account) =>
          account.type === "Customer Deposits" &&
          account.superiorId === bank.id &&
          account.balance > 0
      )
    );

    return depositAccounts;
  },
  getTotalAssetsAndReserves(bank: Bank) {
    const allAssets = BalanceSheets.getAssetsPlusReserves(bank);
    const total = mapReduceBalanceAndReserves(allAssets);
    return total;
  },
  getTotalAssets(bank: Bank) {
    const allAssets = BalanceSheets.getAssets(bank);
    const total = mapReduceBalance(allAssets);
    return total;
  },
  getTotalLiabilities(bank: Bank) {
    const allLiabilities = BalanceSheets.getLiabilities(bank);
    const total = mapReduceBalanceAndReserves(allLiabilities);
    return total;
  },
  getTotalCustomerDepositAssets(bank: Bank) {
    const depositAccounts = mapReduceBalance(
      Accounts.getAllAccounts(bank).filter(
        (account) =>
          account.type === "Customer Deposits" &&
          account.subordinateId === bank.id &&
          account.balance > 0
      )
    );

    return depositAccounts;
  },
  getTotalCustomerDepositLiabilities(bank: Bank) {
    const depositAccounts = mapReduceBalance(
      Accounts.getAllAccounts(bank).filter(
        (account) =>
          account.type === "Customer Deposits" &&
          account.superiorId === bank.id &&
          account.balance > 0
      )
    );

    return depositAccounts;
  },
  getTotalReserves() {
    const totalReserves = reservesData.allIds
      .map((id) => reservesData.reserves[id].cashReserves)
      .reduce((acc, cur) => acc + cur);
    return totalReserves;
  },

  getTotalCredit() {
    const allBanks = Banks.getAll();

    const allAssets = allBanks.map((bank) => {
      let num = 0;
      const totalAssets = BalanceSheets.getAssets(bank);
      if (totalAssets.length > 0) {
        num = mapReduceBalance(totalAssets);
      }
      return num;
    });
    return allAssets.reduce((acc, cur) => acc + cur);
  },
};

function mapReduceBalance(accounts: Account[] | DuesAccount[]) {
  return accounts
    .map((account) => {
      return account.balance;
    })
    .reduce((acc, cur) => acc + cur, 0);
}

function mapReduceBalanceAndReserves(accounts: any[]) {
  return accounts
    .map((account) => {
      if (!account.balance) {
        // if current object is a reserves account
        return account.cashReserves;
      }
      return account.balance;
    })
    .reduce((acc, cur) => acc + cur);
}
