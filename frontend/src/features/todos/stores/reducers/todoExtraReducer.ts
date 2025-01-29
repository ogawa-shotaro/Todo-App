import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import { TodoState, TodoResponse } from "@/features/todos/types/todoTypes";

export const pendingReducer = (state: TodoState) => {
  state.inProgress = true;
};

export const addTodoFulfilledReducer = (
  state: TodoState,
  action: PayloadAction<TodoResponse>
) => {
  state.inProgress = false;
  state.error = null;
  if (action.payload.todo) {
    state.todos = [...state.todos, action.payload.todo];
  }
};

export const addTodosFulfilledReducer = (
  state: TodoState,
  action: PayloadAction<TodoResponse>
) => {
  state.inProgress = false;
  state.error = null;
  if (Array.isArray(action.payload.todos)) {
    state.todos = [...state.todos, ...action.payload.todos];
  }
};

export const rejectedReducer = (
  state: TodoState,
  action: { error: SerializedError }
) => {
  state.inProgress = false;
  const message = action.error.message;
  state.error = {
    message: message ?? "例外エラー",
  };
};
