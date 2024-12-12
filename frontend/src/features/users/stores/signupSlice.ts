import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signupApi } from "@/features/users/api/signup";
import {
  initialState,
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "@/features/users/stores/reducers/authReducers";
import type {
  SignupInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const signup = createAsyncThunk<AuthResponse, SignupInput>(
  "auth/signup",
  async (input) => {
    return signupApi(input);
  }
);

export const signupSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signup.pending, pendingOperation)
      .addCase(signup.fulfilled, fulfilledOperation)
      .addCase(signup.rejected, rejectedOperation);
  },
});

export default signupSlice.reducer;
