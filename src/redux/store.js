import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import { propertiesAPI } from "./services/properties";
import { peopleAPI } from "./services/people";
import { ordersAPI } from "./services/orders";
import { rolesAPI } from "./services/roles";
import { generalAPI } from "./services/general";

import { authSlice } from "./slices/auth";
import { settingsSlice } from "./slices/settings";
import { ordersFiltersSlice } from "./slices/ordersFilters";
import { orderFormStepsSlice } from "../modules/Orders/state/orderFormSteps";
import { orderFormDataSlice } from "../modules/Orders/state/orderFormData";

import { appSlice } from "../modules/App/state";

import { peopleSlice } from "../modules/People/state";

import { propertiesFiltersSlice } from "../modules/Properties/state/propertiesFiltersSlice";
import { propertyFormStepperSlice } from "../modules/Properties/state/propertyFormStepperSlice";

export const store = configureStore({
  reducer: {
    [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    [peopleAPI.reducerPath]: peopleAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
    [rolesAPI.reducerPath]: rolesAPI.reducer,
    [generalAPI.reducerPath]: generalAPI.reducer,

    [authSlice.name]: authSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,

    [appSlice.name]: appSlice.reducer,

    [peopleSlice.name]: peopleSlice.reducer,
    [ordersFiltersSlice.name]: ordersFiltersSlice.reducer,
    [orderFormStepsSlice.name]: orderFormStepsSlice.reducer,
    [orderFormDataSlice.name]: orderFormDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      propertiesAPI.middleware,
      peopleAPI.middleware,
      ordersAPI.middleware,
      rolesAPI.middleware,
      generalAPI.middleware,
    ]),
});

setupListeners(store.dispatch);
