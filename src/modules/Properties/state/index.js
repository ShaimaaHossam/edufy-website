import { createSlice } from "@reduxjs/toolkit";

export const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    propertiesFilters: {
      page: 1,
      perPage: 20,
    },
  },
  reducers: {
    setPropertiesFilters: (state, { payload }) => {
      state.propertiesFilters = payload;
    },
  },
});

export const { setPropertiesFilters } = propertiesSlice.actions;

export const propertiesSelector = (state) => state.properties;
