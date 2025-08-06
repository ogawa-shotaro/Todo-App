import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import type {
  TodoUpdateInput,
  TodoResponse,
  TodoState,
} from "@/features/todos/types/type";
import {
  pendingReducer,
  rejectedReducer,
  updateTodoFulfilledReducer,
} from "@/features/todos/stores/reducers/todoExtraReducer";
import { updateTodoApi } from "@/features/todos/api/updateTodo";

export const updateTodoAction = createAsyncThunk<TodoResponse, TodoUpdateInput>(
  "todo/updateTodo",
  async (input) => {
    return updateTodoApi(input);
  }
);

export const buildUpdateTodoExtraReducer = (
  builder: ActionReducerMapBuilder<TodoState>
) => {
  builder
    .addCase(updateTodoAction.pending, pendingReducer)
    .addCase(updateTodoAction.fulfilled, updateTodoFulfilledReducer)
    .addCase(updateTodoAction.rejected, rejectedReducer);
};
