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
  AuthResponse,
  SignupInput,
} from "@/features/users/types/authTypes";

export const createSignupAction = createAsyncThunk<AuthResponse, SignupInput>(
  "auth/signup",
  async (input) => {
    return signupApi(input);
  }
);

export const buildSignupExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(createSignupAction.pending, pendingReducer)
    .addCase(createSignupAction.fulfilled, fulfilledReducer)
    .addCase(createSignupAction.rejected, rejectedReducer);
};
