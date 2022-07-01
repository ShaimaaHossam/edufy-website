import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    filters: FILTERS_INIT_STATE,
    isWarningShown: false,
    isDepositDialogOpen: false,
  },
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    clearFilters: (state) => {
      state.filters = FILTERS_INIT_STATE;
    },
    setWarningShown: (state) => {
      state.isWarningShown = true;
    },
    toggleDepositDialog: (state) => {
      state.isDepositDialogOpen = !state.isDepositDialogOpen;
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setWarningShown,
  toggleDepositDialog,
} = walletSlice.actions;

export const filtersSelector = (state) => state.wallet.filters;
export const isWarningShownSelector = (state) => state.wallet.isWarningShown;
export const isDepositDialogOpenSelector = (state) =>
  state.wallet.isDepositDialogOpen;
