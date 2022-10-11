export type System =
  | "national"
  | "correspondent"
  | "clearinghouse"
  | "centralbank"
  | "chips";

export interface Account {
  id: number;
  customerId: number;
  bankId: number;
  type: string;
  balance: number;
}

export interface Bank {
  id: number;
  name: string;
  type: string;
  accountIds: number[];
  duesAccountIds: number[];
}

export interface Banks {
  [key: string]: Bank;
}

export interface Accounts {
  [key: string]: Account;
}

export interface CorrespondingInstruments {
  [key: string]: string;
}

export type TypeofBank = "customer" | "bank" | "centralBank" | "clearingHouse";
