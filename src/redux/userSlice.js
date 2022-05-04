import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginWithEmail = createAsyncThunk(
  "users/loginWithEmail",
  async ({ email, password}, thunkAPI) => {
    try {
      const response = await fetch(
        "https://63443c69-6908-47a9-b1d2-5437f06aa1f6.mock.pstmn.io/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username:email,
            password,
          }),
        }
      );
      let data = await response.json();
      console.log("response", data, response.status );
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const loginWithPhone = createAsyncThunk(
  "users/loginWithPhone",
  async ({ phone, otp}, thunkAPI) => {
    try {
      const response = await fetch(
        "https://63443c69-6908-47a9-b1d2-5437f06aa1f6.mock.pstmn.io/auth/verify",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            otp,
          }),
        }
      );
      let data = await response.json();
      console.log("response", data, response.status );
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "users/forgetPassword",
  async ({ email}, thunkAPI) => {
    try {
      const response = await fetch(
        "https://63443c69-6908-47a9-b1d2-5437f06aa1f6.mock.pstmn.io/auth/forogt",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email}),
        }
      );
      let data = await response.json();
      console.log("response", data, response.status );
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }

);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async ({ email, password}, thunkAPI) => {
    try {
      const response = await fetch(
        "https://63443c69-6908-47a9-b1d2-5437f06aa1f6.mock.pstmn.io/auth/updatepassword",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      let data = await response.json();
      console.log("response", data, response.status );
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    phone:"",
    otp:"",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
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
      state.errorMessage = payload.message;
    },
    [loginWithEmail.pending]: (state) => {
      state.isFetching = true;
    },
    [loginWithPhone.fulfilled]: (state, { payload }) => {
      state.phone = payload.phone;
      state.otp = payload.otp;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginWithPhone.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
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
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [forgetPassword.pending]: (state) => {
      state.isFetching = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.password = payload.password;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [updatePassword.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
