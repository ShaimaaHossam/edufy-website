import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    isWarningShown: false,
    filters: FILTERS_INIT_STATE,
  },
  reducers: {
    setWarningShown: (state) => {
      state.isWarningShown = true;
    },
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    clearFilters: (state) => {
      state.filters = FILTERS_INIT_STATE;
    },
  },
});

export const { setFilters, clearFilters } = walletSlice.actions;

export const filtersSelector = (state) => state.wallet.filters;
export const isWarningShownSelector = (state) => state.wallet.isWarningShown;
