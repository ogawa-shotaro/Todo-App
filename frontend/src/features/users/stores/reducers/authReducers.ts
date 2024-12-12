import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import type { AuthState, AuthResponse } from "@/features/users/types/authTypes";

export const initialState: AuthState = {
  auth: {
    inProgress: false,
    isSucceeded: false,
    error: null,
  },
  user: {
    name: "",
    email: "",
  },
};

export const pendingOperation = (state: AuthState) => {
  state.auth.inProgress = true;
};

export const fulfilledOperation = (
  state: AuthState,
  action: PayloadAction<AuthResponse>
) => {
  state.auth.error = null;
  state.auth.isSucceeded = true;
  state.auth.inProgress = false;
  if (action.payload.user) {
    state.user = {
      name: action.payload.user?.name,
      email: action.payload.user?.email,
    };
  }
};

export const rejectedOperation = (
  state: AuthState,
  action: { error: SerializedError }
) => {
  const message = action.error.message;

  state.auth.isSucceeded = false;
  state.auth.inProgress = false;
  state.auth.error = {
    message: message ?? "例外エラー",
  };
};
