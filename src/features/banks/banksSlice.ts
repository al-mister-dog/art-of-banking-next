import { createSlice } from "@reduxjs/toolkit";
import { Analytics } from "../../domain/displays/analytics";
import type { AppState } from "../../app/store";
import { setupFunctions } from "../../config/setup-functions/setupFunctions";
import { Customer } from "../../domain/customer";
import { BalanceSheets } from "../../domain/displays/balancesheets";
import {
  accountData,
  bankData,
  creditData,
  reservesData,
} from "../../domain/structures";
import initialBankData from "./inititalState";
import { Totals } from "../../domain/displays/totals";
import { Dues } from "../../domain/dues";
import { Banks } from "../../domain/bank";
import { Display } from "../../domain/display";
import { Record } from "../../domain/Records";

export interface BanksState {
  banks: any;
  accounts: any;
  creditAccounts: any;
  reserves: any;
  analytics: any;
}

const initialState: BanksState = {
  banks: initialBankData.banks,
  accounts: initialBankData.accounts,
  creditAccounts: initialBankData.creditAccounts,
  reserves: initialBankData.reserves,
  analytics: {
    records: {},
    balances: {},
    graphs: {
      credit: [],
      reserves: [],
    },
  },
};
let count = 0;
export const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setup: (state, { payload }) => {
      setupFunctions[payload.id]();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.resetGraphData(state);
    },
    deposit: (state, { payload }) => {
      const { amount, c1, b1 } = payload;
      Customer.deposit(c1, b1, amount);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    withdraw: (state, { payload }) => {
      const { amount, c1, b1 } = payload;
      Customer.withdraw(c1, b1, amount);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    transfer: (state, { payload }) => {
      const { amount, c1, c2, b1, b2 } = payload;
      if (b2) {
        Customer.transfer(amount, c1, c2, b1, b2);
      } else {
        Customer.transfer(amount, c1, c2, b1);
      }
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    getLoan: (state, { payload }) => {
      const { amount, c1, b1 } = payload;
      Customer.getLoan(c1, b1, amount);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    repayLoan: (state, { payload }) => {
      const { amount, c1, b1, paymentType } = payload;
      if (paymentType === "deposits") {
        Customer.repayLoanFromAccount(c1, b1, amount);
      }
      if (paymentType === "cash") {
        Customer.repayLoanCash(c1, b1, amount);
      }
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    payDues: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      Dues.decrease(b1, b2, "customerDeposits", amount);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    creditClearinghouse: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      Banks.creditAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    debitClearinghouse: (state, { payload }) => {
      const { amount, b1, b2 } = payload;

      Banks.debitAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    netDues: (state, { payload }) => {
      const { b1, b2 } = payload;
      Dues.net(b1, b2);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    creditBank: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      Banks.creditAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },
    debitBank: (state, { payload }) => {
      const { amount, b1, b2 } = payload;

      Banks.debitAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state)
    },

    setState: (state) => {
      state.banks = bankData.banks;
      state.accounts = accountData.accounts;
      state.creditAccounts = creditData.creditAccounts;
      state.reserves = reservesData.reserves;

      banksSlice.caseReducers.updateAnalytics(state);
    },
    resetGraphData: (state) => {
      state.analytics.graphs = {
        credit: [],
        reserves: [],
      };
    },
    updateAnalytics: (state) => {
      const newCreditData = Analytics.getCreditTotal();
      const newReservesData = Totals.getTotalReserves();
      state.analytics.graphs.credit = [
        ...state.analytics.graphs.credit,
        newCreditData,
      ];
      state.analytics.graphs.reserves = [
        ...state.analytics.graphs.reserves,
        newReservesData,
      ];
    },
    updateRecords: (state) => {
      // console.log(JSON.stringify(Record.getAll()))
      Record.setRound()
    }
  },
});

export const {
  setup,
  deposit,
  withdraw,
  transfer,
  getLoan,
  repayLoan,
  payDues,
  netDues,
  creditBank,
  debitBank,
  creditClearinghouse,
  debitClearinghouse,
} = banksSlice.actions;

export const selectBanks = (state: AppState) => state.banks;

export default banksSlice.reducer;
