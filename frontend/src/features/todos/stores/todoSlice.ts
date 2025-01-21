import { createSlice } from "@reduxjs/toolkit";

import { buildCreateTodoExtraReducer } from "@/features/todos/stores/reducers/createTodoReducer";
import type { TodoState } from "@/features/todos/types/todoTypes";

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
  },
});

export default todoSlice.reducer;
