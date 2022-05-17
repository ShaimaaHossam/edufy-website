import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginWithEmail = createAsyncThunk(
  "users/loginWithEmail",
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
        if (remember === true) {
          localStorage.setItem("token", result.data.token);
        }
        return result;
      } else {
        return thunkAPI.rejectWithValue(result);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const requestOtp = createAsyncThunk(
  "users/requestOtp",
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
  "users/loginWithPhone",
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
  "users/forgetPassword",
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
  "users/updatePassword",
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
  "users/rememberMe",
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
            token: window.localStorage.getItem("token"),
          },
        }
      );
      let result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("remember", result.data.token);
        return result;
      } else {
        return thunkAPI.rejectWithValue(result);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: "",
    me: false,
    token: "",
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
    updateRemember: (state, val) => {
      state.me = val;
      return state;
    },
  },
  extraReducers: {
    [loginWithEmail.fulfilled]: (state, { payload }) => {
      state.userData = payload.data;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginWithEmail.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [loginWithEmail.pending]: (state) => {
      state.isFetching = true;
    },
    [requestOtp.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [requestOtp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [requestOtp.pending]: (state) => {
      state.isFetching = true;
    },
    [loginWithPhone.fulfilled]: (state, { payload }) => {
      state.userData = payload.data;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginWithPhone.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [loginWithPhone.pending]: (state) => {
      state.isFetching = true;
    },
    [forgetPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [forgetPassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [forgetPassword.pending]: (state) => {
      state.isFetching = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [updatePassword.pending]: (state) => {
      state.isFetching = true;
    },
    [rememberMe.fulfilled]: (state, { payload }) => {
      state.remember = payload.data.token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [rememberMe.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [rememberMe.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState, updateRemember } = userSlice.actions;

export const userSelector = (state) => state.user;
