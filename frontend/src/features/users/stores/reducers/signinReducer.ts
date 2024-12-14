import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { signinApi } from "@/features/users/api/signin";
import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from "@/features/users/stores/reducers/authReducer";
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
    .addCase(signin.pending, pendingReducer)
    .addCase(signin.fulfilled, fulfilledReducer)
    .addCase(signin.rejected, rejectedReducer);
};
