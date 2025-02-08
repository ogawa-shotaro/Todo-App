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
    state.todoPage.items = [...state.todoPage.items, action.payload.todo];
  }
};

export const addTodosFulfilledReducer = (
  state: TodoState,
  action: PayloadAction<TodoResponse>
) => {
  state.inProgress = false;
  state.error = null;

  if (Array.isArray(action.payload.items) && action.payload.totalCount) {
    state.todoPage.items = [...state.todoPage.items, ...action.payload.items];
    state.todoPage.totalCount = action.payload.totalCount;
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
