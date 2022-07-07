import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const ordersFiltersSlice = createSlice({
  name: "ordersFilters",
  initialState: {
    maintenanceFilters: FILTERS_INIT_STATE,
    cleaningFilters: FILTERS_INIT_STATE,

    // formSteps: {},
  },
  reducers: {
    setFilters: (state, { payload: { key, value } }) => {
      state[key] = value;
    },
    clearFilters: (state, { payload }) => {
      console.log("clearFilters", payload);
      state[payload] = FILTERS_INIT_STATE;
    },
  },
});

export const { setFilters, clearFilters } = ordersFiltersSlice.actions;

export const ordersFiltersSelector = (state) => state.ordersFilters;
