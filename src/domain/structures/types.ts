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

export interface Banks {
  [key: string]: Bank;
}

export interface BankData {
  id: number;
  banks: Banks;
  allIds: number[];
}

export interface Account {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
}

export interface Accounts {
  [key: string]: Account;
}

export interface AccountData {
  id: number;
  accounts: Accounts;
  allIds: number[];
}

export interface LoanAccount {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
}

export interface LoanAccounts {
  [key: string]: LoanAccount;
}

export let loanData = {
  id: 0,
  loanAccounts: {} as LoanAccounts,
  allIds: [] as number[],
};

export interface ReservesAccount {
  id: number;
  cashReserves: number;
}

export interface ReservesAccounts {
  [key: string]: ReservesAccount;
}

export interface DuesAccount extends Account {
  category: string;
  netted?: boolean;
}

export type PossibleDuesAccount = DuesAccount | undefined;

export interface DuesAccounts {
  [key: string]: DuesAccount;
}

export interface CreditAccount extends Account {
  category: string;
  netted?: boolean;
}

export type PossibleCreditAccount = CreditAccount | undefined;

export interface CreditAccounts {
  [key: string]: CreditAccount;
}
export interface CreditData {
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

interface Record {
  id: number;
  records: { assets: RecordDetail[]; liabilities: RecordDetail[] };
}

interface Records {
  [key: string]: Record;
}
