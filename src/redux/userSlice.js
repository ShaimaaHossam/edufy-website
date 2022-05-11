import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginWithEmail = createAsyncThunk(
  "users/loginWithEmail",
  async ({ email, password, remember }, thunkAPI) => {
    try {
      const response = await fetch(
        "http://api.stage.marafeq.munjz.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            remember,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const requestOtp = createAsyncThunk(
  "users/requestOtp",
  async ({ phone }, thunkAPI) => {
    try {
      const response = await fetch(
        "http://api.stage.marafeq.munjz.com/api/v1/auth/phone-login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
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
        "http://api.stage.marafeq.munjz.com/api/v1/auth/otp-verify",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            token,
          }),
        }
      );
      let data = await response.json();
      console.log("data", data);
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
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
        "http://api.stage.marafeq.munjz.com/api/v1/auth/forgot",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async ({ email, password, token }, thunkAPI) => {
    try {
      const response = await fetch(
        "http://api.stage.marafeq.munjz.com/api/v1/auth/reset",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            token,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    phone: "",
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errors: {},
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
    [loginWithEmail.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.email = payload.email;
      state.password = payload.password;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginWithEmail.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [loginWithEmail.pending]: (state) => {
      state.isFetching = true;
    },
    [requestOtp.fulfilled]: (state, { payload }) => {
      state.phone = payload.phone;
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
      state.phone = payload.phone;
      state.token = payload.token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginWithPhone.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generic;
    },
    [loginWithPhone.pending]: (state) => {
      state.isFetching = true;
    },
    [forgetPassword.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [forgetPassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generi;
    },
    [forgetPassword.pending]: (state) => {
      state.isFetching = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.password = payload.password;
      state.token = payload.token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors.generi;
    },
    [updatePassword.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
