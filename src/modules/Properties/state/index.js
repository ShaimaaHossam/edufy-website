import { createSlice } from "@reduxjs/toolkit";

export const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    propertiesFilters: {
      page: 1,
      perPage: 20,
    },
    unitsFilters: {
      page: 1,
      perPage: 20,
    },

  },
  reducers: {
    setPropertiesFilters: (state, { payload }) => {
      state.propertiesFilters = payload;
    },
    setUnitsFilters: (state, { payload }) => {
      state.unitsFilters = payload;
    },
  },
});

export const { setPropertiesFilters, setUnitsFilters } =
  propertiesSlice.actions;

export const propertiesSelector = (state) => state.properties;
