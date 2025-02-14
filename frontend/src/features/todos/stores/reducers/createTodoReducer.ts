import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import {
  pendingReducer,
  createTodoFulfilledReducer,
  rejectedReducer,
} from "@/features/todos/stores/reducers/todoExtraReducer";
import type {
  TodoInput,
  TodoResponse,
  TodoState,
} from "@/features/todos/types/todoTypes";
import { createTodoApi } from "@/features/todos/api/createTodo";

export const createTodoAction = createAsyncThunk<TodoResponse, TodoInput>(
  "todo/createTodo",
  async (input) => {
    return createTodoApi(input);
  }
);

export const buildCreateTodoExtraReducer = (
  builder: ActionReducerMapBuilder<TodoState>
) => {
  builder
    .addCase(createTodoAction.pending, pendingReducer)
    .addCase(createTodoAction.fulfilled, createTodoFulfilledReducer)
    .addCase(createTodoAction.rejected, rejectedReducer);
};
