import { CodeChefData } from "@/types/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState :CodeChefData= {
    handle: "",
  rating: 0,
  history: [],
};

const codechefSlice = createSlice({
  name: "codechef",
  initialState,
  reducers: {
    updateCodechefStats: (state, action) => {
      state.handle = action.payload.handle;
      state.rating = action.payload.rating;
      state.history = action.payload.history;   
    },
    addCodechefRatingHistory: (state, action:PayloadAction<any>) => {
      state.history.push(action.payload);
    },
  },
});

export const { updateCodechefStats, addCodechefRatingHistory } = codechefSlice.actions;
export default codechefSlice.reducer;
