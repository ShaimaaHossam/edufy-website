import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const ordersFiltersSlice = createSlice({
  name: "ordersFilters",
  initialState: {
    filters: FILTERS_INIT_STATE,

    formSteps: {},
  },
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    clearFilters: (state) => {
      state.filters = FILTERS_INIT_STATE;
    },
  },
});

export const { setFilters, clearFilters } = ordersFiltersSlice.actions;

export const ordersFiltersSelector = (state) => state.ordersFilters;
