import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    propertyStatsFilters: {
      page: 1,
      perPage: 20,
    },
    propertyStatsDetailsFilters: {
      page: 1,
      perPage: 20,
    },
    materialSpendingFilters: {
      page: 1,
      perPage: 20,
    },
    materialSpendingDetailsFilters: {
      page: 1,
      perPage: 20,
    },
    ordersFilters: {},
    detailsOrdersFilters:{}
  },

  reducers: {
    setPropertyStatsFilters: (state, { payload }) => {
      state.propertyStatsFilters = payload;
    },
    setPropertyStatsDetailsFilters: (state, { payload }) => {
      state.propertyStatsDetailsFilters = payload;
    },
    setMaterialSpendingFilters: (state, { payload }) => {
      state.materialSpendingFilters = payload;
    },
    setMaterialSpendingDetailsFilters: (state, { payload }) => {
      state.materialSpendingDetailsFilters = payload;
    },
    setOrdersFilters: (state, { payload }) => {
      state.ordersFilters = payload;
    },
    setDetailsOrdersFilters: (state, { payload }) => {
      state.detailsOrdersFilters = payload;
    },
  },
});

export const {
  setMaterialSpendingFilters,
  setPropertyStatsFilters,
  setOrdersFilters,
  setDetailsOrdersFilters,
  setMaterialSpendingDetailsFilters,
  setPropertyStatsDetailsFilters
} = dashboardSlice.actions;

export const dashboardSelector = (state) => state.dashboard;
