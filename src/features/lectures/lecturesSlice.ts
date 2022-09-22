import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import initialActionData, { actions } from "./initialState";

export interface LecturesState {
  actions: any;
  currentLectureId: number;
}

const initialState: LecturesState = {
  actions: initialActionData,
  currentLectureId: 0,
};

export const lecturesSlice = createSlice({
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

export const { setActions } = lecturesSlice.actions;

export const selectLectures = (state: AppState) => state.lectures;

export default lecturesSlice.reducer;
