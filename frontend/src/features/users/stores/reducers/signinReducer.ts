import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { signinApi } from "@/features/users/api/signin";
import {
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "@/features/users/stores/reducers/operator/authOperation";
import type {
  AuthState,
  SigninInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const signin = createAsyncThunk<AuthResponse, SigninInput>(
  "auth/signin",
  async (input) => {
    return signinApi(input);
  }
);

export const buildSigninExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signin.pending, pendingOperation)
    .addCase(signin.fulfilled, fulfilledOperation)
    .addCase(signin.rejected, rejectedOperation);
};
