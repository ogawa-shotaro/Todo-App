import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import type { AuthState, SignupResponse, SignupInput } from "../types";
import { signupApi } from "../api/signup";

export const signup = createAsyncThunk<SignupResponse, SignupInput>(
  `auth/signup`,
  async (input) => {
    return signupApi(input);
  }
);

export const buildSignupExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signup.pending, (state) => {
      state.signup.inProgress = true;
    })
    .addCase(signup.fulfilled, (state, action) => {
      if (action.payload?.message) {
        state.signup.error = action.payload;
        state.signup.isSucceeded = false;
      } else {
        state.signup.error = null;
        state.signup.isSucceeded = true;
      }

      state.signup.inProgress = false;
    })
    .addCase(signup.rejected, (state, action) => {
      const { message } = action.error;
      state.signup.isSucceeded = false;
      state.signup.inProgress = false;
      state.signup.error = {
        message: message ?? "例外エラー",
      };
    });
};
