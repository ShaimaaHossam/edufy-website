import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const propertiesFiltersSlice = createSlice({
  name: "propertiesFilters",
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

export const { setFilters, clearFilters } = propertiesFiltersSlice.actions;

export const filtersSelector = (state) => state.propertiesFilters;
