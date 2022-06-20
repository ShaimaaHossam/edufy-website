import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { LANGS } from "../../constants/global";

export const resrvedToken =
  window.sessionStorage.getItem("token") ||
  window.localStorage.getItem("token") ||
  "";

const resrvedLanguage = window.localStorage.getItem("lang") || LANGS.en;

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password, remember }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
            remember,
          }),
        }
      );
      let result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("lang", result.data.user.language);

        if (remember === true) {
          localStorage.setItem("token", result.data.token);
          return result;
        } else {
          sessionStorage.setItem("token", result.data.token);
          return result;
        }
      } else {
        return thunkAPI.rejectWithValue(result);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const requestOtp = createAsyncThunk(
  "auth/requestOtp",
  async (phone, thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/auth/phone-login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            phone,
          }),
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

export const loginWithPhone = createAsyncThunk(
  "auth/loginWithPhone",
  async ({ phone, token }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/auth/otp-verify",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            phone,
            token,
          }),
        }
      );
      let result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("lang", result.data.user.language);
        localStorage.setItem("token", result.data.token);
        return result;
      } else {
        return thunkAPI.rejectWithValue(result);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ email }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/auth/forgot",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email }),
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

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ email, token, password, password_confirmation }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/auth/reset",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
            token,
            password_confirmation,
          }),
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

export const rememberMe = createAsyncThunk(
  "auth/rememberMe",
  async (thunkAPI) => {
    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/auth/me",
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

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    company: null,
    language: resrvedLanguage,
    token: resrvedToken,
    errors: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    clearAuth: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    loggedout: (state) => {
      state.user = null;
      state.company = null;
      state.token = "";
      state.errors = {};
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    },
    setLanguage: (state, { payload }) => {
      state.language = payload.language;

      localStorage.setItem("lang", payload.language);
    },
  },
  extraReducers: {
    [loginWithEmail.fulfilled]: (state, { payload }) => {
      state.user = payload.data.user;
      state.company = payload.data.company;
      state.language = payload.data.user.language;
      state.token = payload.data.token;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginWithEmail.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [loginWithEmail.pending]: (state) => {
      state.isFetching = true;
    },
    [requestOtp.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [requestOtp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [requestOtp.pending]: (state) => {
      state.isFetching = true;
    },
    [loginWithPhone.fulfilled]: (state, { payload }) => {
      state.user = payload.data.user;
      state.company = payload.data.company;
      state.language = payload.data.user.language;
      state.token = payload.data.token;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginWithPhone.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [loginWithPhone.pending]: (state) => {
      state.isFetching = true;
    },
    [forgetPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [forgetPassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [forgetPassword.pending]: (state) => {
      state.isFetching = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [updatePassword.pending]: (state) => {
      state.isFetching = true;
    },
    [rememberMe.fulfilled]: (state, { payload }) => {
      state.user = payload.data.user;
      state.company = payload.data.company;
      state.language = payload.data.user.language;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [rememberMe.rejected]: (state, obj) => {
      state.user = null;
      state.company = null;
      state.token = "";
      state.isFetching = false;
      state.isError = true;
    },
    [rememberMe.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearAuth, setLanguage, loggedout } = authSlice.actions;

export const authSelector = (state) => state.auth;