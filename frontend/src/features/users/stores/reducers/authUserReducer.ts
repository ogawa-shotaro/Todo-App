import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { signinApi as authUserApi } from "@/features/users/api/signin";
import {
  pendingReducer,
  updateUserFulfilledReducer,
  rejectedReducer,
} from "@/features/users/stores/reducers/authExtraReducer";
import type {
  AuthState,
  SigninInput as AuthUserInput,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const createUserAuthorizationAction = createAsyncThunk<
  AuthResponse,
  AuthUserInput
>("auth/updateUserAuth", async (input) => {
  return authUserApi(input);
});

export const buildUserAuthorizationExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(createUserAuthorizationAction.pending, pendingReducer)
    .addCase(
      createUserAuthorizationAction.fulfilled,
      updateUserFulfilledReducer
    )
    .addCase(createUserAuthorizationAction.rejected, rejectedReducer);
};
