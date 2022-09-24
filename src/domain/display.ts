import { BalanceSheets } from "./displays/balancesheets";
import { BankingSystem } from "./banking-system";
import { Bank, creditData } from "./structures";
export const Display = {
  addRelation(bank: Bank, account: any) {
    return account.superiorId === bank.id
      ? {
          ...account,
          thirdPartyDetail: BankingSystem.getBankById(account.subordinateId),
        }
      : {
          ...account,
          thirdPartyDetail: BankingSystem.getBankById(account.superiorId),
        };
  },

  addReserves(account: any) {
    return {
      ...account,
      balance: account.cashReserves,
    };
  },

  addDetails(bank: Bank, balanceSheetArray: any[]) {
    return balanceSheetArray.map((account) => {
      return account.category === "reserves"
        ? this.addReserves(account)
        : this.addRelation(bank, account);
    });
  },

  balanceSheet(bank: Bank) {
    const { assets, liabilities } =
      BalanceSheets.getAssetsAndLiabilitiesPlusReserves(bank);
    const assetsDetailed = this.addDetails(bank, assets);
    const liabilitiesDetailed = this.addDetails(bank, liabilities);
    const mappedAssets = mapBalanceToCategory(assetsDetailed);
    const mappedLiabilities = mapBalanceToCategory(liabilitiesDetailed);

    return {
      assets: getNestedArray(mappedAssets),
      liabilities: getNestedArray(mappedLiabilities),
    };
  },
  balanceSheetObject(bank: Bank) {
    const { assets, liabilities } =
      BalanceSheets.getAssetsAndLiabilitiesPlusReserves(bank);
    const assetsDetailed = this.addDetails(bank, assets);
    const liabilitiesDetailed = this.addDetails(bank, liabilities);
    const mappedAssets = mapBalanceToCategory(assetsDetailed);
    const mappedLiabilities = mapBalanceToCategory(liabilitiesDetailed);
    return { assets: mappedAssets, liabilities: mappedLiabilities };
  },
};

function mapBalanceToCategory(balanceSheetArray: any[]) {
  return balanceSheetArray.reduce((acc, cur) => {
    acc[cur.category]
      ? acc[cur.category].push(cur)
      : (acc[cur.category] = [cur]);
    return acc;
  }, {});
}

function getNestedArray(object: { [key: string]: any }) {
  let arr = [];
  for (const key in object) {
    arr.push({ instrument: key, accounts: object[key] });
  }
  return arr;
}
