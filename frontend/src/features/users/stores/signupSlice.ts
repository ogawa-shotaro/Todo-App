import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signupApi } from "../api/signup";
import {
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "./reducers/helpers/signupHelper";
import type {
  AuthState,
  SignupInput,
  SignupResponse,
} from "@/features/users/types/signupTypes";

export const signup = createAsyncThunk<SignupResponse, SignupInput>(
  "auth/signup",
  async (input) => {
    return signupApi(input);
  }
);

const initialState: AuthState = {
  signup: {
    inProgress: false,
    isSucceeded: false,
    error: null,
  },
  user: {
    name: "",
    email: "",
  },
};

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
