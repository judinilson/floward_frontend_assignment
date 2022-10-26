import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth.slice";
import { countriesReducer } from "./countries.slice";

export * from "./auth.slice";
export * from "./countries.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
    country: countriesReducer,
  },
});
