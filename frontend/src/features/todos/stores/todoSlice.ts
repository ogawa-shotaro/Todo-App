import { createSlice } from "@reduxjs/toolkit";

import type { TodoState } from "@/features/todos/types/type";
import { buildCreateTodoExtraReducer } from "@/features/todos/stores/reducers/createTodoReducer";
import { buildGetTodosExtraReducer } from "@/features/todos/stores/reducers/getTodosReducer";
import { buildUpdateTodoExtraReducer } from "@/features/todos/stores/reducers/updateTodoReducer";

const initialState: TodoState = {
  inProgress: false,
  todoPage: { items: [], totalCount: 0 },
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetTodosAction: (state) => {
      state.todoPage.items = [];
      state.todoPage.totalCount = 0;
    },
  },
  extraReducers(builder) {
    buildCreateTodoExtraReducer(builder);
    buildGetTodosExtraReducer(builder);
    buildUpdateTodoExtraReducer(builder);
  },
});

export const { resetTodosAction } = todoSlice.actions;
export default todoSlice.reducer;
