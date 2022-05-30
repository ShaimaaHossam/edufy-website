import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { propertiesAPI } from "./services/properties";
import { peopleAPI } from "./services/people";
import { generalAPI } from "./services/general";

import { authSlice } from "./slices/auth";

export const store = configureStore({
  reducer: {
    [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    [peopleAPI.reducerPath]: peopleAPI.reducer,
    [generalAPI.reducerPath]: generalAPI.reducer,

    auth: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      propertiesAPI.middleware,
      peopleAPI.middleware,
      generalAPI.middleware,
    ]),
});

setupListeners(store.dispatch);
