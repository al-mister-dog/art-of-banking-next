export type SystemType =
  | "national"
  | "correspondent"
  | "clearinghouse"
  | "centralbank"
  | "chips";

export let system = "national";

export interface Bank {
  id: number;
  name: string;
  type: string;
  accountIds: number[];
  creditIds: number[];
}

export interface Banks {
  [key: string]: Bank;
}

export interface BankData {
  id: number;
  banks: Banks;
  allIds: number[];
}

export let bankData: BankData = {
  id: 0,
  banks: {} as Banks,
  allIds: [] as number[],
};

export const BankData = {
  assign(newBankData: BankData) {
    bankData = { ...newBankData };
  },
  assignAccountIds(bank1: Bank, bank2: Bank, accountId: number) {
    let newBankData = { ...bankData };
    newBankData.banks[bank1.id].accountIds = [...bank1.accountIds, accountId];
    newBankData.banks[bank2.id].accountIds = [...bank2.accountIds, accountId];
    this.assign(newBankData);
  },
};
