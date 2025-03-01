import { LeetCodeData } from "@/types/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LeetCode from "leetcode-query";



const initialState: LeetCodeData = {
    handle: "",
    easy: 0,
    medium: 0,
    hard: 0,
    total: 0,
  rating: 0,
  history: [],
};

const leetcodeSlice = createSlice({
  name: "leetcode",
  initialState,
  reducers: {
    updateLeetcodeStats: (state, action) => {
      state.handle = action.payload.handle;
      state.easy = action.payload.easy;
      state.medium = action.payload.medium;
      state.hard = action.payload.hard;
      state.total = action.payload.total;
      state.rating = action.payload.rating;
    },
    addLeetcodeRatingHistory: (state, action:PayloadAction<any>) => {
      state.history.push(action.payload);
    },
  },
});

export const { updateLeetcodeStats, addLeetcodeRatingHistory } = leetcodeSlice.actions;
export default leetcodeSlice.reducer;
