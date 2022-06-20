import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const ordersSlice = createSlice({
  name: "orders",
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

export const { setFilters, clearFilters } = ordersSlice.actions;

export const ordersSelector = (state) => state.orders;
