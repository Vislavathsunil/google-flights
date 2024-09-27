import { configureStore } from "@reduxjs/toolkit";
import { flightsApi } from "./flights";

import globalReducer from "./selected";
import cabinSlice from "./cabinStop";

export const store = configureStore({
  reducer: {
    [flightsApi.reducerPath]: flightsApi.reducer,
    globalState: globalReducer,
    cabinSlice: cabinSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightsApi.middleware),
});
