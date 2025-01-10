import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { updateUserApi } from "@/features/users/api/updateUser";
import {
  pendingReducer,
  rejectedReducer,
  fulfilledReducer,
} from "@/features/users/stores/reducers/authExtraReducer";
import type {
  SignupInput as UpdateUserInput,
  AuthState,
  AuthResponse,
} from "@/features/users/types/authTypes";

export const createUserUpdateAction = createAsyncThunk<
  AuthResponse,
  UpdateUserInput
>("auth/updateUser", async (input) => {
  return updateUserApi(input);
});

export const buildUpdateUserExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(createUserUpdateAction.pending, pendingReducer)
    .addCase(createUserUpdateAction.fulfilled, fulfilledReducer)
    .addCase(createUserUpdateAction.rejected, rejectedReducer);
};
