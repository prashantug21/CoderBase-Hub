import { GFGData } from "@/types/model";
import { createSlice } from "@reduxjs/toolkit";

const initialState:GFGData= {
  handle: "",
  easy: 0,
  medium: 0,
  hard: 0,
  total: 0,
};

const gfgSlice = createSlice({
  name: "gfg",
  initialState,
  reducers: {
    updateGfgStats: (state, action) => {
      state.handle = action.payload.handle;
      state.easy = action.payload.easy;
      state.medium = action.payload.medium;
      state.hard = action.payload.hard;
      state.total = action.payload.total;
    },
  },
});

export const { updateGfgStats } = gfgSlice.actions;
export default gfgSlice.reducer;
