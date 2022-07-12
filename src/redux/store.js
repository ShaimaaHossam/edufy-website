import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import { propertiesAPI } from "./services/properties";
import { peopleAPI } from "./services/people";
import { rolesAPI } from "./services/roles";
import { generalAPI } from "./services/general";
import { accountingAPI } from "./services/accounting";

import { authSlice } from "./slices/auth";
import { settingsSlice } from "./slices/settings";

import { appSlice } from "../modules/App/state";

import { peopleSlice } from "../modules/People/state";

import { propertiesFiltersSlice } from "../modules/Properties/state/propertiesFiltersSlice";
import { propertyFormStepperSlice } from "../modules/Properties/state/propertyFormStepperSlice";

import { walletSlice } from "../modules/Accounting/state/walletSlice";
import { invoicesSlice } from "../modules/Accounting/state/invoicesSlice";
import { transactionsSlice } from "../modules/Accounting/state/transactionsSlice";

export const store = configureStore({
  reducer: {
    [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    [peopleAPI.reducerPath]: peopleAPI.reducer,
    [rolesAPI.reducerPath]: rolesAPI.reducer,
    [generalAPI.reducerPath]: generalAPI.reducer,
    [accountingAPI.reducerPath]: accountingAPI.reducer,

    [authSlice.name]: authSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,

    [appSlice.name]: appSlice.reducer,

    [peopleSlice.name]: peopleSlice.reducer,

    [propertiesFiltersSlice.name]: propertiesFiltersSlice.reducer,
    [propertyFormStepperSlice.name]: propertyFormStepperSlice.reducer,

    [walletSlice.name]: walletSlice.reducer,
    [invoicesSlice.name]: invoicesSlice.reducer,
    [transactionsSlice.name]: transactionsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      propertiesAPI.middleware,
      peopleAPI.middleware,
      rolesAPI.middleware,
      generalAPI.middleware,
      accountingAPI.middleware,
    ]),
});

setupListeners(store.dispatch);
