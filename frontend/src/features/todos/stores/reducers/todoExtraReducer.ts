import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import { TodoState, TodoResponse } from "@/features/todos/types/todoTypes";

export const pendingReducer = (state: TodoState) => {
  state.inProgress = true;
};

export const fulfilledReducer = (
  state: TodoState,
  action: PayloadAction<TodoResponse>
) => {
  state.inProgress = false;
  state.error = null;
  if (action.payload.todo) {
    state.todo = {
      id: action.payload.todo?.id,
      title: action.payload.todo?.title,
      body: action.payload.todo?.body,
      createdAt: action.payload.todo?.createdAt,
      updatedAt: action.payload.todo?.updatedAt,
    };
  }
};

export const rejectedReducer = (
  state: TodoState,
  action: { error: SerializedError }
) => {
  const message = action.error.message;

  state.inProgress = false;
  state.error = {
    message: message ?? "例外エラー",
  };
};
