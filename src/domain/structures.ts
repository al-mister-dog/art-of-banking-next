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

export let accountData = {
  id: 0,
  accounts: {} as Accounts,
  allIds: [] as number[],
};

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

interface ReservesAccount {
  id: number;
  cashReserves: number;
}

interface ReservesAccounts {
  [key: string]: ReservesAccount;
}

export let reservesData = {
  id: 0,
  reserves: {} as ReservesAccounts,
  allIds: [],
};

export const ReservesData = {
  assign(newReservesData: any) {
    reservesData = { ...newReservesData };
  },
  assignReservesAccounts(reserves: ReservesAccount) {
    let newReserves = { ...reservesData.reserves };
    newReserves = { ...newReserves, [reserves.id]: reserves };
    reservesData = { ...reservesData, reserves: newReserves };
  },
};

export interface DuesAccount {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
  category: string;
  netted?: boolean;
}

export type PossibleDuesAccount = DuesAccount | undefined;

export interface DuesAccounts {
  [key: string]: DuesAccount;
}

export let duesData = {
  id: 0,
  duesAccounts: {} as DuesAccounts,
};

export function clearBankData() {
  bankData = {
    id: 0,
    banks: {} as Banks,
    allIds: [] as number[],
  };
  accountData = {
    id: 0,
    accounts: {} as Accounts,
    allIds: [] as number[],
  };
  reservesData = {
    id: 0,
    reserves: {} as ReservesAccounts,
    allIds: [] as number[],
  };
  duesData = {
    id: 0,
    duesAccounts: {} as DuesAccounts,
  };
  creditData = {
    id: 0,
    creditAccounts: {} as CreditAccounts,
    allIds: [] as number[],
  };
}

export const AccountData = {
  assign(newAccountData: AccountData) {
    accountData = { ...newAccountData };
  },
  assignAccounts(accounts: Accounts) {
    accountData = { ...accountData, accounts };
  },
};

export const DuesData = {
  assign(duesAccounts: DuesAccounts) {
    duesData = { ...duesData, duesAccounts };
  },
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
  assignCreditIds(bank1: Bank, bank2: Bank, creditId: number) {
    let newBankData = JSON.parse(JSON.stringify(bankData));
    newBankData.banks[bank1.id].creditIds = [
      ...newBankData.banks[bank1.id].creditIds,
      creditId,
    ];
    newBankData.banks[bank2.id].creditIds = [
      ...newBankData.banks[bank2.id].creditIds,
      creditId,
    ];

    this.assign(newBankData);
  },
};

export interface CreditAccount {
  id: number;
  subordinateId: number;
  superiorId: number;
  type: string;
  balance: number;
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
export let creditData: CreditData = {
  id: 0,
  creditAccounts: {} as CreditAccounts,
  allIds: [] as number[],
};

export const CreditData = {
  assign(newCreditData: CreditData) {
    creditData = { ...newCreditData };
  },
  assignAccounts(creditAccounts: CreditAccounts) {
    creditData = { ...creditData, creditAccounts };
  },
};

type RecordDetail = {
  instrumentType: string;
  notationType: string;
  amount: number;
  id: number;
  symbol: string;
} | null;
interface Record {
  id: number;
  records: { assets: RecordDetail[]; liabilities: RecordDetail[] };
}

interface Records {
  [key: string]: Record;
}

export const records = {
  parties: {} as Records,
  allIds: [],
};
