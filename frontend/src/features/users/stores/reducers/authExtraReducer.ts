import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import type { AuthState, AuthResponse } from "@/features/users/types/authTypes";

export const pendingReducer = (state: AuthState) => {
  state.inProgress = true;
};

export const fulfilledReducer = (
  state: AuthState,
  action: PayloadAction<AuthResponse>
) => {
  state.inProgress = false;
  state.isSucceeded = true;
  state.error = null;
  if (action.payload.user) {
    state.user = {
      name: action.payload.user?.name,
      email: action.payload.user?.email,
    };
  }
};

export const signoutFulfilledReducer = (state: AuthState) => {
  state.inProgress = false;
  state.isSucceeded = false;
  state.error = null;
  state.user = null;
};

export const rejectedReducer = (
  state: AuthState,
  action: { error: SerializedError }
) => {
  const message = action.error.message;

  state.inProgress = false;
  state.isSucceeded = false;
  state.error = {
    message: message ?? "例外エラー",
  };
};
