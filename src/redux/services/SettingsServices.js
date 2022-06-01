import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { resrvedToken } from "../userSlice";

export const updateNotification = createAsyncThunk(
  "settings/updateNotification",
  async (obj, thunkAPI) => {
    console.log("obj", JSON.stringify(obj));
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
export const updateCompanyInfo = createAsyncThunk(
  "settings/updateCompanyInfo",
  async ({id, data}, thunkAPI) => {
    console.log("data", data);
    
    try {
      const response = await fetch(
        `https://api.stage.marafeq.munjz.com/v1/companies/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + resrvedToken,
          },
          body: JSON.stringify(data),
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

export const updatePermesion = createAsyncThunk(
  "settings/updatePermesion",
  async ({id, data}, thunkAPI) => {
    console.log("data", data);
    
    try {
      const response = await fetch(
        `https://api.stage.marafeq.munjz.com/v1/roles/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + resrvedToken,
          },
          body: JSON.stringify(data),
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

export const getRoles = createAsyncThunk(
  "settings/getRoles",
  async (thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/roles/?listing=1",
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

export const getPermesion = createAsyncThunk(
  "settings/getPermesion",
  async (thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/permissions/?listing=1&group=1",
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

export const getSelectedPermesion = createAsyncThunk(
  "settings/getSelectedPermesion",
  async (id,thunkAPI) => {
    console.log("idd", id)
    try {
      const response = await fetch(
        `https://api.stage.marafeq.munjz.com/v1/roles/${id}`,
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
    companyInfo:null,
    secondaryContcat: [],
    errors: "",
    roles:[],
    permesions:{},
    selectedPermesion:[],
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errors = "";

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

    [getRoles.fulfilled]: (state, { payload }) => {
      console.log("fulfilled getRoles", payload.data)
      state.roles = payload.data;

      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getRoles.rejected]: (state, payload) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [getRoles.pending]: (state) => {
      state.isFetching = true;
    },

    [getPermesion.fulfilled]: (state, { payload }) => {
      console.log("fulfilled getPermesion", payload.data)
      state.permesions = payload.data;

      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getPermesion.rejected]: (state, payload) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [getPermesion.pending]: (state) => {
      state.isFetching = true;
    },

    [getSelectedPermesion.fulfilled]: (state, { payload }) => {
      console.log("fulfilled getPermesion", payload.data)
      state.selectedPermesion = payload.data;

      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getSelectedPermesion.rejected]: (state, payload) => {
      console.log("rejected getPermesion", payload)

      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [getSelectedPermesion.pending]: (state) => {
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

    [updatePermesion.fulfilled]: (state, { payload }) => {
      console.log("fulfilled update", payload);
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updatePermesion.rejected]: (state, payload) => {
      console.log("rejected", payload);
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [updatePermesion.pending]: (state) => {
      state.isFetching = true;
    },

    [updateCompanyInfo.fulfilled]: (state, { payload }) => {
      console.log("fulfilled", payload);
      state.companyInfo = payload.data;

      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updateCompanyInfo.rejected]: (state, {payload}) => {
      console.log("rejected", payload);
      state.companyInfo = null;

      state.isFetching = false;
      state.isError = true;
      console.log("state.isError", state.isError)
      state.errors = payload.errors;
    },
    [updateCompanyInfo.pending]: (state) => {
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

export const { clearState } = settingsSlice.actions;

export const settingsSelector = (state) => state.settings;
