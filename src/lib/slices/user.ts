import { UserData } from "@/types/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:UserData = {
  leetcodeHandle:'',
  codeforcesHandle:'',
  codechefHandle:'',
  gfgHandle:''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserData>) => {
      return action.payload;
    }
    
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
