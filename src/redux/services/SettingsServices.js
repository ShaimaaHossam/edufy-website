import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { resrvedToken } from "../userSlice";

export const getNotifications = createAsyncThunk(
  "settings/getNotifications",
  async (thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/settings/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + resrvedToken,
          },
        }
      );
      let result = await response.json();
      if (response.status === 200) {
        return result;
      } else {
        return thunkAPI.rejectWithValue(result);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    data: {},
    appSettings:[],
    emailSettings:[],
    smsSettings:[],
    secondarySettings:[],
    errors: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [getNotifications.fulfilled]: (state, { payload }) => {
      console.log("fulfilled", payload);
      state.data = payload.data;
      
      state.appSettings = payload.data.app;
      state.emailSettings = payload.data.email;
      state.smsSettings = payload.data.sms;
      state.secondarySettings = payload.data.secondary;

      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getNotifications.rejected]: (state, payload) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [getNotifications.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = settingsSlice.actions;

export const settingsSelector = (state) => state.settings;
