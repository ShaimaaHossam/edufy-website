import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    notifications: {
      items: [],
      lastPage: 0,
      newItemsCount: 0,
    },
  },
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },

    addNewNotification: (state, { payload }) => {
      state.notifications.items = [payload, ...state.notifications.items];
      state.notifications.newItemsCount += 1;
    },
    addNotificationsPage: (state, { payload: { page, items } }) => {
      state.notifications.items = [...state.notifications.items, ...items];
      state.notifications.lastPage = page;
    },
    resetNewNotificationsCount: (state) => {
      state.notifications.newItemsCount = 0;
    },
    setNotificationRead: (state, { payload }) => {
      state.notifications.items = state.notifications.items.map((i) =>
        i.id === payload ? { ...i, is_read: true } : i
      );
    },
  },
});

export const {
  openMenu,
  toggleMenu,
  addNewNotification,
  addNotificationsPage,
  resetNewNotificationsCount,
  setNotificationRead,
} = appSlice.actions;

export const isMenuOpenSelector = (state) => state.app.isMenuOpen;
export const notificationsSelector = (state) => state.app.notifications;
