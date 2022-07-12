import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    propertyStatsFilters: {
      page: 1,
      perPage: 20,
    },
    materialSpendingFilters: {
      page: 1,
      perPage: 20,
    },
    ordersFilters: {},
  },

  reducers: {
    setPropertyStatsFilters: (state, { payload }) => {
      state.propertyStatsFilters = payload;
    },
    setMaterialSpendingFilters: (state, { payload }) => {
      state.materialSpendingFilters = payload;
    },
    setOrdersFilters: (state, { payload }) => {
      state.ordersFilters = payload;
    },
  },
});

export const {
  setMaterialSpendingFilters,
  setPropertyStatsFilters,
  setOrdersFilters,
} = dashboardSlice.actions;

export const dashboardSelector = (state) => state.dashboard;
