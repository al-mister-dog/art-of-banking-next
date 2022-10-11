import { Banks } from "../services/bank";
import { Display } from "../display";
import { loanRecords } from "../structures";
import { BalanceSheets } from "./balancesheets";
import { Calculator } from "../calculators/Calculator";

export const Analytics = {
  getAllBalanceSheets() {
    const allBanks = Banks.getAll();
    const allBalanceSheets = allBanks.map((bank) => {
      const balanceSheets = Display.balanceSheet(bank);
      return {
        id: bank.id,
        name: bank.name,
        balanceSheets,
      };
    });
    return allBalanceSheets;
  },
  getCreditTotal() {
    const allBanks = Banks.getAll();
    const assetData = allBanks
      .map((bank) => BalanceSheets.getAssets(bank))
      .filter((array) => array.length > 0)
      .reduce((acc, cur) => {
        return acc.concat(cur);
      }, []);
    const assetTotals = assetData
      .map((account) => {
        return account.balance;
      })
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    return {
      data: assetData,
      total: assetTotals,
    };
  },
  getVolumeWeightedMedian() {
    const allLoans = loanRecords;
    const data = Calculator.weightedMedian(allLoans);
    const fallbackData = {
      volumeWeightedMedian: 0,
      associatedData: [
        {
          transactionPercentage: "0",
          rate: 0,
          occurences: 0,
          volume: 0,
          cumulativeFrequency: 0,
        },
      ],
    };
    return data || fallbackData;
  },
};
