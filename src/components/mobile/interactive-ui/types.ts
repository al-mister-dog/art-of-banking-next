export interface CardInfo {
  cardInfo: {
    id: number;
    name: string;
    type: string;
    accountIds: number[];
    creditIds: number[];
  };
  balanceSheet: {
    assets: {
      instrument: string;
      accounts: any;
    }[];
    liabilities: {
      instrument: string;
      accounts: any;
    }[];
  };
  color: string | number;
}