import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signinApi } from "@/features/users/api/signin";
import {
  initialState,
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "@/features/users/stores/reducers/authReducers";
import type {
  SigninInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const signin = createAsyncThunk<AuthResponse, SigninInput>(
  "auth/signin",
  async (input) => {
    return signinApi(input);
  }
);

export const signinSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signin.pending, pendingOperation)
      .addCase(signin.fulfilled, fulfilledOperation)
      .addCase(signin.rejected, rejectedOperation);
  },
});

export default signinSlice.reducer;
