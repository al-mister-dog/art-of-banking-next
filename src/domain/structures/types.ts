export type SystemType =
  | "national"
  | "correspondent"
  | "clearinghouse"
  | "centralbank"
  | "chips";

export interface Bank {
  id: number;
  name: string;
  type: string;
  accountIds: number[];
  creditIds: number[];
}

export interface Account {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
}

export interface LoanAccount {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
}

export interface ReservesAccount {
  id: number;
  cashReserves: number;
}

export interface DuesAccount {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
  category: string;
  netted?: boolean;
}

export interface CreditAccount {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
  category: string;
  netted?: boolean;
  interest?: number;
  interestRate?: number;
  principal?: number;
}

export type PossibleCreditAccount = CreditAccount | undefined;

export interface Banks {
  [key: string]: Bank;
}

export interface Accounts {
  [key: string]: Account;
}

export interface LoanAccounts {
  [key: string]: LoanAccount;
}

export interface ReservesAccounts {
  [key: string]: ReservesAccount;
}

export interface DuesAccounts {
  [key: string]: DuesAccount;
}

export interface CreditAccounts {
  [key: string]: CreditAccount;
}

export interface Records {
  [key: string]: Record;
}

export interface BankDataObject {
  id: number;
  banks: Banks;
  allIds: number[];
}

export interface AccountDataObject {
  id: number;
  accounts: Accounts;
  allIds: number[];
}

export interface CreditDataObject {
  id: number;
  creditAccounts: CreditAccounts;
  allIds: number[];
}

export type RecordDetail = {
  instrumentType: string;
  notationType: string;
  amount: number;
  id: number;
  symbol: string;
  name: string;
} | null;

export interface Record {
  id: number;
  records: { assets: RecordDetail[]; liabilities: RecordDetail[] };
}

export type PossibleDuesAccount = DuesAccount | undefined;