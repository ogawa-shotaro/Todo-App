import type {
  AuthState,
  SignupResponse,
  SignupInput,
} from "@/features/users/types";
import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

export const pendingOperation = (state: AuthState) => {
  state.signup.inProgress = true;
};

export const fulfilledOperation = (
  state: AuthState,
  action: PayloadAction<
    SignupResponse,
    string,
    {
      arg: SignupInput;
      requestId: string;
      requestStatus: "fulfilled";
    },
    never
  >
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
  action: PayloadAction<
    unknown,
    string,
    {
      arg: SignupInput;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & (
      | {
          rejectedWithValue: true;
        }
      | ({
          rejectedWithValue: false;
        } & {})
    ),
    SerializedError
  >
) => {
  const { message } = action.error;
  state.signup.isSucceeded = false;
  state.signup.inProgress = false;
  state.signup.error = {
    message: message ?? "例外エラー",
  };
};
