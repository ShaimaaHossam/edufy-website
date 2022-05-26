import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { resrvedToken } from "../userSlice";

export const updateNotification = createAsyncThunk(
  "settings/updateNotification",
  async (obj, thunkAPI) => {
    console.log("obj", obj);
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/settings/update",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + resrvedToken,
          },
          body: JSON.stringify(obj),
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

export const getSecondaryContcat = createAsyncThunk(
  "settings/getSecondaryContcat",
  async (thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/users/",
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
    data: null,
    secondaryContcat: [],
    errors: "",
    number: 1,
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
      state.data = payload.data;

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

    [updateNotification.fulfilled]: (state, { payload }) => {
      console.log("fulfilled", payload);
      console.log("res", payload.data);
      state.data = payload.data;

      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updateNotification.rejected]: (state, payload) => {
      console.log("rejected", payload);
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [updateNotification.pending]: (state) => {
      state.isFetching = true;
    },

    [getSecondaryContcat.fulfilled]: (state, { payload }) => {
      state.secondaryContcat = payload.data;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getSecondaryContcat.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [getSecondaryContcat.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState, hello } = settingsSlice.actions;

export const settingsSelector = (state) => state.settings;
