import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import { propertiesAPI } from "./services/properties";
import { peopleAPI } from "./services/people";
import { rolesAPI } from "./services/roles";
import { generalAPI } from "./services/general";

import { authSlice } from "./slices/auth";
import { settingsSlice } from "./slices/settings";

import { propertiesSlice } from "../modules/Properties/state";
import { peopleSlice } from "../modules/People/state";

export const store = configureStore({
  reducer: {
    [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    [peopleAPI.reducerPath]: peopleAPI.reducer,
    [rolesAPI.reducerPath]: rolesAPI.reducer,
    [generalAPI.reducerPath]: generalAPI.reducer,

    [authSlice.name]: authSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,

    [propertiesSlice.name]: propertiesSlice.reducer,
    [peopleSlice.name]: peopleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      propertiesAPI.middleware,
      peopleAPI.middleware,
      rolesAPI.middleware,
      generalAPI.middleware,
    ]),
});

setupListeners(store.dispatch);
