import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { signoutApi } from "@/features/users/api/signout";
import {
  pendingReducer,
  signoutFulfilledReducer,
  rejectedReducer,
} from "@/features/users/stores/reducers/authExtraReducer";
import type { AuthState } from "@/features/users/types/authTypes";

export const createSignoutAction = createAsyncThunk(
  "auth/signout",
  async () => {
    return signoutApi();
  }
);

export const buildSignoutExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(createSignoutAction.pending, pendingReducer)
    .addCase(createSignoutAction.fulfilled, signoutFulfilledReducer)
    .addCase(createSignoutAction.rejected, rejectedReducer);
};
