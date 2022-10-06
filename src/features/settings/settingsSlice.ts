import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import {
  overdraft,
  reserveRequirement,
  interestRate,
  ColorSettings,
  colorSettings,
  DisplaySettings,
  displaySettings,
  spreadsheetSettings,
  ClaveroSettings,
} from "./initialState";

export interface SettingsState {
  overdraft: number;
  reserveRequirement: number;
  interestRate: number;
  colorSettings: ColorSettings;
  displaySettings: DisplaySettings;
  spreadsheetSettings: ClaveroSettings;
}

const initialState: SettingsState = {
  overdraft,
  reserveRequirement,
  interestRate,
  colorSettings,
  displaySettings,
  spreadsheetSettings,
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
      // state.interestRate = 0;
    },
    setColors: (state, { payload }) => {
      const key: keyof ColorSettings = payload.key;
      let resetColorSettings = {
        round: false,
        static: false,
        flash: false,
        off: false,
      };
      const newColorSettings = { ...resetColorSettings, [key]: true };
      state.colorSettings = newColorSettings;
    },
    setDisplay: (state, { payload }) => {
      const key: keyof ColorSettings = payload.key;
      let resetDisplaySettings = {
        balances: false,
        taccounts: false,
        spreadsheet: false,
      };
      const newDisplaySettings = { ...resetDisplaySettings, [key]: true };
      state.displaySettings = newDisplaySettings;
    },
    setClaveroDisplay: (state, { payload }) => {
      const key: keyof ClaveroSettings = payload.key;
      let resetClaveroSettings = {
        latest: false,
        each: false,
        all: false,
      };
      const newClaveroSettings = { ...resetClaveroSettings, [key]: true };
      state.spreadsheetSettings = newClaveroSettings;
    },
  },
});

export const {
  setOverdraft,
  setReserveRequirement,
  setInterestRate,
  refreshSettings,
  setColors,
  setDisplay,
  setClaveroDisplay
} = settingsSlice.actions;

export const selectSettings = (state: AppState) => state.settings;

export default settingsSlice.reducer;
