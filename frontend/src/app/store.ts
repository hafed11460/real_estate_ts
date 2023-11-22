import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from 'features/auth/authSlice'
import { authApi } from "features/auth/authApi"
import { toolsApi } from "features/core/tools"
import { propertyAPI } from "features/properties/propertyAPI"
import { agencyAPI } from "features/agencies/agencyAPI"
import proprtiesReducer from 'features/properties/propertiesSlice'
import agenciesReducer from 'features/agencies/agenciesSlice'


export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [toolsApi.reducerPath]: toolsApi.reducer,
    [propertyAPI.reducerPath]: propertyAPI.reducer,
    [agencyAPI.reducerPath]: agencyAPI.reducer,
    properties:proprtiesReducer,
    agencies:agenciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([
    authApi.middleware,
    toolsApi.middleware,
    propertyAPI.middleware,
    agencyAPI.middleware,
  ]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
