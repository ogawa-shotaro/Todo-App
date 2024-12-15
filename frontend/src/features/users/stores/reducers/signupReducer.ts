import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { signupApi } from "@/features/users/api/signup";
import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from "@/features/users/stores/reducers/authExtraReducer";
import type {
  AuthState,
  SignupInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const signupAction = createAsyncThunk<AuthResponse, SignupInput>(
  "auth/signup",
  async (input) => {
    return signupApi(input);
  }
);

export const buildSignupExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signupAction.pending, pendingReducer)
    .addCase(signupAction.fulfilled, fulfilledReducer)
    .addCase(signupAction.rejected, rejectedReducer);
};
