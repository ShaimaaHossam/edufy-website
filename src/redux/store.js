import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import { propertiesAPI } from "./services/properties";
import { peopleAPI } from "./services/people";
import { ordersAPI } from "./services/orders";
import { generalAPI } from "./services/general";

import { authSlice } from "./slices/auth";
import { settingsSlice } from "./slices/settings";
import { ordersSlice } from "./slices/orders";

import { propertiesSlice } from "../modules/Properties/state";

export const store = configureStore({
  reducer: {
    [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    [peopleAPI.reducerPath]: peopleAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
    [generalAPI.reducerPath]: generalAPI.reducer,

    [authSlice.name]: authSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,

    [propertiesSlice.name]: propertiesSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      propertiesAPI.middleware,
      peopleAPI.middleware,
      ordersAPI.middleware,
      generalAPI.middleware,
    ]),
});

setupListeners(store.dispatch);
