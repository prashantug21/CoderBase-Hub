import { UserData } from "@/types/model";
import { createSlice } from "@reduxjs/toolkit";

const initialState:UserData = {
  leetcodeHandle:null,
  codeforcesHandle:null,
  codechefHandle:null,
  gfgHandle:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.leetcodeHandle = action.payload.leetcodeHandle;
      state.codeforcesHandle = action.payload.codeforcesHandle;
      state.codechefHandle = action.payload.codechefHandle;
      state.gfgHandle = action.payload.gfgHandle;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
