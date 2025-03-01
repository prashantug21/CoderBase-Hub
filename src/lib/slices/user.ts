import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  platforms: {
    leetcode: "",
    gfg: "",
    codeforces: "",
    codechef: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.platforms = action.payload.platforms;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
