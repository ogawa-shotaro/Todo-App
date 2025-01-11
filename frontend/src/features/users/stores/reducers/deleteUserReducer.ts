import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { deleteUserApi } from "@/features/users/api/deleteUser";
import {
  pendingReducer,
  authClearedFulfilledReducer,
  rejectedReducer,
} from "@/features/users/stores/reducers/authExtraReducer";
import type { AuthState } from "@/features/users/types/authTypes";

export const createUserDeleteAction = createAsyncThunk(
  "auth/deleteUser",
  async () => {
    return deleteUserApi();
  }
);

export const buildDeleteUserExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(createUserDeleteAction.pending, pendingReducer)
    .addCase(createUserDeleteAction.fulfilled, authClearedFulfilledReducer)
    .addCase(createUserDeleteAction.rejected, rejectedReducer);
};
