import { CodeforcesData } from "@/types/model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CodeforcesData = {
    handle: "",
    easy: 0,
    medium: 0,
    hard: 0,
    total: 0,
  rating: 0,
  history: [],
};

const codeforcesSlice = createSlice({
  name: "codeforces",
  initialState,
  reducers: {
    updateCodeforcesStats: (state, action) => {
      state.handle = action.payload.handle;
      state.easy = action.payload.easy;
      state.medium = action.payload.medium;
      state.hard = action.payload.hard;
      state.total = action.payload.total;
      state.rating = action.payload.rating;
    },
    addCodeforcesRatingHistory: (state, action) => {
      state.history.push(action.payload);
    },
  },
});

export const { updateCodeforcesStats, addCodeforcesRatingHistory } = codeforcesSlice.actions;
export default codeforcesSlice.reducer;
