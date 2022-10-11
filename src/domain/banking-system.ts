import {
  BankData,
  bankData,
  records,
  reservesData,
} from "./structures/objects";
import { Bank } from "./structures/types";
import { System } from "./system";

export const BankingSystem = {
  createBank(
    name: string,
    type: string,
    reserves: number = 0,
    initialDeposit?: number
  ) {
    const newBank = {
      id: bankData.id,
      name,
      type,
      accountIds: [],
      creditIds: [],
    };
    const newReserves = {
      id: reservesData.id,
      cashReserves: reserves,
      category: "Reserves",
    };
    let newBankData = JSON.parse(JSON.stringify(bankData));

    records.parties[newBankData.id] = {
      id: newBankData.id,
      records: { assets: [], liabilities: [] },
    };
    records.partyLogs[newBankData.id] = {
      id: newBankData.id,
      log: [],
    };

    let banks = newBankData.banks;
    banks = { ...banks, [newBank.id]: newBank };
    newBankData.banks = banks;
    newBankData.allIds.push(bankData.id);
    newBankData.id++;
    BankData.assign(newBankData);
    reservesData.reserves[reservesData.id] = newReserves;
    reservesData.allIds.push(reservesData.id);
    reservesData.id++;

    System.joinSystem(newBank, initialDeposit);
  },
  getBank(bank: Bank) {
    return bankData.banks[bank.id];
  },
  getBankById(id: number) {
    return bankData.banks[id];
  },
};
