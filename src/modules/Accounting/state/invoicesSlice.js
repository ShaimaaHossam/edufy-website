import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    filters: FILTERS_INIT_STATE,
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

export const { setFilters, clearFilters } = invoicesSlice.actions;

export const filtersSelector = (state) => state.invoices.filters;
