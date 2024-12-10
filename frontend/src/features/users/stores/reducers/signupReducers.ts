import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import type {
  AuthState,
  SignupResponse,
} from "@/features/users/types/signupTypes";

export const pendingOperation = (state: AuthState) => {
  state.signup.inProgress = true;
};

export const fulfilledOperation = (
  state: AuthState,
  action: PayloadAction<SignupResponse>
) => {
  state.signup.error = null;
  state.signup.isSucceeded = true;
  state.signup.inProgress = false;
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

  state.signup.isSucceeded = false;
  state.signup.inProgress = false;
  state.signup.error = {
    message: message ?? "例外エラー",
  };
};
