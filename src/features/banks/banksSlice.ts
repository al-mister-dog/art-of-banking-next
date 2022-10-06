import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { setupFunctions } from "../../config/setup-functions/setupFunctions";
import { Customer } from "../../domain/customer";

import {
  accountData,
  analytics,
  bankData,
  creditData,
  reservesData,
} from "../../domain/structures";
import initialBankData from "./inititalState";

import { Dues } from "../../domain/dues";
import { Banks } from "../../domain/bank";
import { Record } from "../../domain/Records";
import { CentralBank } from "../../domain/centralbank";
import { System } from "../../domain/system";
import { GraphData } from "../../domain/graph-data";

export interface BanksState {
  banks: any;
  accounts: any;
  creditAccounts: any;
  reserves: any;
  analytics: any;
  loading: boolean;
}

const initialState: BanksState = {
  banks: initialBankData.banks,
  accounts: initialBankData.accounts,
  creditAccounts: initialBankData.creditAccounts,
  reserves: initialBankData.reserves,
  analytics: analytics,
  loading: true,
};

export const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setup: (state, { payload }) => {
      setupFunctions[payload.id]();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.resetGraphData(state);
      banksSlice.caseReducers.updateAnalytics(state);
      state.loading = false;
    },
    deposit: (state, { payload }) => {
      const { amount, c1, b1 } = payload;
      Customer.deposit(c1, b1, amount);
      GraphData.setBalanceData();
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    withdraw: (state, { payload }) => {
      const { amount, c1, b1 } = payload;
      Customer.withdraw(c1, b1, amount);
      GraphData.setBalanceData();
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    transfer: (state, { payload }) => {
      const { amount, c1, c2, b1, b2 } = payload;
      if (b2) {
        Customer.transfer(amount, c1, c2, b1, b2);
      } else {
        Customer.transfer(amount, c1, c2, b1);
      }
      GraphData.setBalanceData();
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    bankTransfer: (state, { payload }) => {
      const { amount, b1, b2 } = payload;

      CentralBank.transfer(b1, b2, amount);
      GraphData.setCentralBankGraphData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },

    getLoan: (state, { payload }) => {
      const { amount, interest, c1, b1, } = payload;
      Customer.getLoan(c1, b1, amount, interest);
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    repayLoan: (state, { payload }) => {
      const { amount, c1, b1, paymentType } = payload;
      if (paymentType === "deposits") {
        Customer.repayLoanFromAccount(c1, b1, amount);
      }
      if (paymentType === "cash") {
        Customer.repayLoanCash(c1, b1, amount);
      }
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    payDues: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      Dues.decrease(b1, b2, "Customer Deposits", amount);
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    creditClearinghouse: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      Banks.creditAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    debitClearinghouse: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      Banks.debitAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    netDues: (state, { payload }) => {
      const { b1, b2 } = payload;
      Dues.net(b1, b2);
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    creditBank: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      Banks.creditAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    debitBank: (state, { payload }) => {
      const { amount, b1, b2 } = payload;

      Banks.debitAccount(b1, b2, amount);
      Dues.settle(b1, b2);
      GraphData.setCreditData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    getFedFundsLoan: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      CentralBank.getLoan(b1, b2, amount);
      CentralBank.transfer(b2, b1, amount);
      GraphData.setCentralBankGraphData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
    },
    repayFedFundsLoan: (state, { payload }) => {
      const { amount, b1, b2 } = payload;
      CentralBank.repayLoan(b1, b2, amount);
      CentralBank.transfer(b1, b2, amount);
      GraphData.setCentralBankGraphData();
      banksSlice.caseReducers.setState(state);
      banksSlice.caseReducers.updateRecords(state);
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
        privateCredit: [],
      };
    },
    updateAnalytics: (state) => {
      state.analytics.graphs.credit = [...analytics.graphs.credit];
      state.analytics.graphs.reserves = [...analytics.graphs.reserves];
      if (System.getSystem() === "centralbank") {
        state.analytics.graphs.privateCredit = [
          ...analytics.graphs.privateCredit,
        ];
      }
      state.analytics.graphs.nationalData = analytics.graphs.nationalData;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    updateRecords: (state) => {
      Record.setRound();
    },
  },
});

export const {
  setup,
  deposit,
  withdraw,
  transfer,
  bankTransfer,
  getLoan,
  repayLoan,
  payDues,
  netDues,
  creditBank,
  debitBank,
  creditClearinghouse,
  debitClearinghouse,
  getFedFundsLoan,
  repayFedFundsLoan,
  setLoading,
} = banksSlice.actions;

export const selectBanks = (state: AppState) => state.banks;

export default banksSlice.reducer;
