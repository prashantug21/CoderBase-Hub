import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import leetcodeReducer from './slices/leetcode'
import gfgReducer from './slices/gfg'
import codeforcesReducer from './slices/codeforces'
import codechefReducer from './slices/codechef'
// ...

export const store=() => configureStore({
  reducer: {
    user: userReducer,
    leetcode:leetcodeReducer,
    gfg:gfgReducer,
    codeforces:codeforcesReducer,
    codechef:codechefReducer,
  },
})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']