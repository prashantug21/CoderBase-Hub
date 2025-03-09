import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import leetcodeReducer from './slices/leetcode'
import gfgReducer from './slices/gfg'
import codeforcesReducer from './slices/codeforces'
import codechefReducer from './slices/codechef'
import { handlesApi } from '@/lib/requests/profileData'

export const makeStore=() => configureStore({
  reducer: {
    user: userReducer,
    leetcode:leetcodeReducer,
    gfg:gfgReducer,
    codeforces:codeforcesReducer,
    codechef:codechefReducer,
    [handlesApi.reducerPath]:handlesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(handlesApi.middleware),
})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']