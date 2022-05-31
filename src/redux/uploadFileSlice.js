import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resrvedToken } from "./userSlice";

export const uploadFile = createAsyncThunk(
  "settings/uploadFile",
  async (obj, thunkAPI) => {
    console.log("obj", obj);

    try {
      const response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/actions/upload",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + resrvedToken,
          },
          body: new FormData(obj),
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

export const uploadFileSlice = createSlice({
  name: "upload",
  initialState: {
    path: "",
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
    [uploadFile.fulfilled]: (state, { payload }) => {
      console.log("data", payload.data)        
      state.path = payload.data.path;
      state.token = payload.data.token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [uploadFile.rejected]: (state,  payload ) => {
      console.log("rejected", payload);
      state.isFetching = false;
      state.isError = true;
      state.errors = payload.errors;
    },
    [uploadFile.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = uploadFileSlice.actions;

export const uploadFileSelector = (state) => state.upload;
