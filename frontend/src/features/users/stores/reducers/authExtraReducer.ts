import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import type { AuthState, AuthResponse } from "@/features/users/types/authTypes";

export const pendingReducer = (state: AuthState) => {
  state.inProgress = true;
};

export const fulfilledReducer = (
  state: AuthState,
  action: PayloadAction<AuthResponse>
) => {
  state.error = null;
  state.isSucceeded = true;
  state.inProgress = false;
  if (action.payload.user) {
    state.user = {
      name: action.payload.user?.name,
      email: action.payload.user?.email,
    };
  }
};

export const rejectedReducer = (
  state: AuthState,
  action: { error: SerializedError }
) => {
  const message = action.error.message;

  state.isSucceeded = false;
  state.inProgress = false;
  state.error = {
    message: message ?? "例外エラー",
  };
};
