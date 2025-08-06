import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import type {
  TodoListParams,
  TodoResponse,
  TodoState,
} from "@/features/todos/types/type";
import {
  pendingReducer,
  getTodosFulfilledReducer,
  rejectedReducer,
} from "@/features/todos/stores/reducers/todoExtraReducer";
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
    .addCase(getTodosAction.fulfilled, getTodosFulfilledReducer)
    .addCase(getTodosAction.rejected, rejectedReducer);
};
