import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import type {
  AuthState,
  SignupResponse,
  SignupInput,
} from "@/features/users/types";
import { signupApi } from "@/features/users/api/signup";
import {
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "@/features/users/reducers/helpers/signupHelper";

export const signup = createAsyncThunk<SignupResponse, SignupInput>(
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
