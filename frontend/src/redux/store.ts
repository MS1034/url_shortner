import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/slices/authSlice";
import paramsReducer from "./Features/slices/paramsSlice";
import TagsReducer from "./Features/slices/tagSlice";
import logoReducer from "./Features/slices/logoSlice";
import { authApi } from "@/services/auth";
import { urlApi } from "@/services/url";
import { logoApi } from "@/services/logo";
import { urlTagsApi } from "@/services/url-tags";

// Create the store with reducers and middleware
export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      params: paramsReducer,
      logo: logoReducer,
      tag: TagsReducer,
      [authApi.reducerPath]: authApi.reducer,
      [urlApi.reducerPath]: urlApi.reducer,
      [logoApi.reducerPath]: logoApi.reducer,
      [urlTagsApi.reducerPath]: urlTagsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        urlTagsApi.middleware,
        logoApi.middleware,
        urlApi.middleware
      ),
  });

// Infer the type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
