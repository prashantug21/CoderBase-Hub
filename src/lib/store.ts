import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import leetcodeReducer from './slices/leetcode'
import gfgReducer from './slices/gfg'
import codeforcesReducer from './slices/codeforces'
import codechefReducer from './slices/codechef'
import signedINReducer from './slices/signedIn'
import { handlesApi } from '@/lib/requests/profileData'
import { friendApi } from './requests/friendData'

export const makeStore=() => configureStore({
  reducer: {
    user: userReducer,
    leetcode:leetcodeReducer,
    gfg:gfgReducer,
    codeforces:codeforcesReducer,
    codechef:codechefReducer,
    signedIn: signedINReducer,
    [handlesApi.reducerPath]:handlesApi.reducer,
    [friendApi.reducerPath]: friendApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(handlesApi.middleware, friendApi.middleware),
   
})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']