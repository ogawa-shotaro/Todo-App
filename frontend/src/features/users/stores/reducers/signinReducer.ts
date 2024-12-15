import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { signinApi } from "@/features/users/api/signin";
import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from "@/features/users/stores/reducers/authExtraReducer";
import type {
  AuthState,
  SigninInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const signinAction = createAsyncThunk<AuthResponse, SigninInput>(
  "auth/signin",
  async (input) => {
    return signinApi(input);
  }
);

export const buildSigninExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signinAction.pending, pendingReducer)
    .addCase(signinAction.fulfilled, fulfilledReducer)
    .addCase(signinAction.rejected, rejectedReducer);
};
