import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { signupApi } from "@/features/users/api/signup";
import {
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "@/features/users/stores/reducers/operator/authOperation";
import type {
  AuthState,
  SignupInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const signup = createAsyncThunk<AuthResponse, SignupInput>(
  "auth/signup",
  async (input) => {
    return signupApi(input);
  }
);

export const buildSignupExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signup.pending, pendingOperation)
    .addCase(signup.fulfilled, fulfilledOperation)
    .addCase(signup.rejected, rejectedOperation);
};
