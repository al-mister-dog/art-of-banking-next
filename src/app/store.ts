import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import banksReducer from "../features/banks/banksSlice";
import lecturesReducer from "../features/actions/actionsSlice";
import settingsReducer from "../features/settings/settingsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      banks: banksReducer,
      lectures: lecturesReducer,
      settings: settingsReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
