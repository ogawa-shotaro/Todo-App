import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from "@/features/todos/stores/reducers/todoExtraReducer";
import type {
  TodoInput,
  TodoResponse,
  TodoState,
} from "@/features/todos/types/todoTypes";
import { createTodoApi } from "@/features/todos/api/createTodo";

export const createTodoInitializeAction = createAsyncThunk<
  TodoResponse,
  TodoInput
>("todo/createTodo", async (input) => {
  return createTodoApi(input);
});

export const buildCreateTodoExtraReducer = (
  builder: ActionReducerMapBuilder<TodoState>
) => {
  builder
    .addCase(createTodoInitializeAction.pending, pendingReducer)
    .addCase(createTodoInitializeAction.fulfilled, fulfilledReducer)
    .addCase(createTodoInitializeAction.rejected, rejectedReducer);
};
