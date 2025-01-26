import { createSlice } from "@reduxjs/toolkit";

import { buildCreateTodoExtraReducer } from "@/features/todos/stores/reducers/createTodoReducer";
import type { TodoState } from "@/features/todos/types/todoTypes";
import { buildGetTodosExtraReducer } from "./reducers/getTodosReducer";

const initialState: TodoState = {
  inProgress: false,
  todos: [],
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    buildCreateTodoExtraReducer(builder);
    buildGetTodosExtraReducer(builder);
  },
});

export default todoSlice.reducer;
