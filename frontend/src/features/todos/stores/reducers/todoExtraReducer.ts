import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import type { TodoState, TodoResponse } from "@/features/todos/types/type";

export const pendingReducer = (state: TodoState) => {
  state.inProgress = true;
};

export const createTodoFulfilledReducer = (state: TodoState) => {
  state.inProgress = false;
  state.error = null;
};

export const getTodosFulfilledReducer = (
  state: TodoState,
  action: PayloadAction<TodoResponse>
) => {
  state.inProgress = false;
  state.error = null;

  if (
    Array.isArray(action.payload.items) &&
    action.payload.totalCount !== undefined
  ) {
    state.todoPage.items = [...action.payload.items];
    state.todoPage.totalCount = action.payload.totalCount;
  }
};

export const updateTodoFulfilledReducer = (
  state: TodoState,
  action: PayloadAction<TodoResponse>
) => {
  state.inProgress = false;
  state.error = null;

  const updatedTodo = action.payload.todo;
  state.todoPage.items = state.todoPage.items.map((todo) =>
    todo.id === updatedTodo?.id ? { ...todo, ...updatedTodo } : todo
  );
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
