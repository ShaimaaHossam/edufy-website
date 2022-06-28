import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { openMenu, toggleMenu } = appSlice.actions;

export const appSelector = (state) => state.app;
