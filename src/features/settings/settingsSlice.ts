import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { overdraft, reserveRequirement, interestRate } from "./initialState";

export interface SettingsState {
  overdraft: number;
  reserveRequirement: number;
  interestRate: number;
}

const initialState: SettingsState = {
  overdraft,
  reserveRequirement,
  interestRate,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setOverdraft: (state, { payload }) => {
      const { num } = payload;
      state.overdraft = num;
    },
    setReserveRequirement: (state, { payload }) => {
      const { num } = payload;
      state.reserveRequirement = num;
    },
    setInterestRate: (state, { payload }) => {
      const { num } = payload;
      state.interestRate = num;
    },
    refreshSettings: (state) => {
      state.overdraft = 0;
      state.reserveRequirement = 0;
      state.interestRate = 0;
    },
  },
});

export const {
  setOverdraft,
  setReserveRequirement,
  setInterestRate,
  refreshSettings,
} = settingsSlice.actions;

export const selectSettings = (state: AppState) => state.settings;

export default settingsSlice.reducer;
