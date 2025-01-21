import type { SerializedError } from "@reduxjs/toolkit";

import { TodoState } from "@/features/todos/types/todoTypes";

export const pendingReducer = (state: TodoState) => {
  state.inProgress = true;
};

export const fulfilledReducer = (state: TodoState) => {
  state.inProgress = false;
  state.error = null;
};

export const rejectedReducer = (
  state: TodoState,
  action: { error: SerializedError }
) => {
  const message = action.error.message;
  state.error = {
    message: message ?? "例外エラー",
  };
};
