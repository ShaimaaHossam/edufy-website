import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const transactionsSlice = createSlice({
  name: "transactions",
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

export const { setFilters, clearFilters } = transactionsSlice.actions;

export const filtersSelector = (state) => state.transactions.filters;
