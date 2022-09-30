import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import initialActionData, { actions } from "./initialState";

export interface ActionsState {
  actions: any;
  currentLectureId: number;
}

const initialState: ActionsState = {
  actions: initialActionData,
  currentLectureId: 0,
};

export const actionsSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    setActions: (state, { payload }) => {
      const { id } = payload;
      state.actions = actions[id];
      state.currentLectureId = id;
    },
  },
});

export const { setActions } = actionsSlice.actions;

export const selectActions = (state: AppState) => state.lectures;

export default actionsSlice.reducer;
