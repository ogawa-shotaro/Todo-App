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
  state.isUserUpdateAuthorized = false;
  state.error = null;
  if (action.payload.user) {
    state.user = {
      name: action.payload.user?.name,
      email: action.payload.user?.email,
    };
  }
};

export const updateUserFulfilledReducer = (state: AuthState) => {
  state.inProgress = false;
  state.user = null;
  state.isUserUpdateAuthorized = true;
  state.error = null;
};

export const signoutFulfilledReducer = (state: AuthState) => {
  state.inProgress = false;
  state.user = null;
  state.isUserUpdateAuthorized = false;
  state.error = null;
};

export const rejectedReducer = (
  state: AuthState,
  action: { error: SerializedError }
) => {
  const message = action.error.message;

  state.inProgress = false;
  state.error = {
    message: message ?? "例外エラー",
  };
};
