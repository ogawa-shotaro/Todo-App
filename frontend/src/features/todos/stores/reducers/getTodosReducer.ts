import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import {
  pendingReducer,
  addTodosFulfilledReducer,
  rejectedReducer,
} from "@/features/todos/stores/reducers/todoExtraReducer";
import type {
  TodoListParams,
  TodoResponse,
  TodoState,
} from "@/features/todos/types/todoTypes";
import { getTodosApi } from "@/features/todos/api/getTodos";

export const getTodosAction = createAsyncThunk<TodoResponse, TodoListParams>(
  "todo/getTodos",
  async (input) => {
    return getTodosApi(input);
  }
);

export const buildGetTodosExtraReducer = (
  builder: ActionReducerMapBuilder<TodoState>
) => {
  builder
    .addCase(getTodosAction.pending, pendingReducer)
    .addCase(getTodosAction.fulfilled, addTodosFulfilledReducer)
    .addCase(getTodosAction.rejected, rejectedReducer);
};
