import { createSlice } from "@reduxjs/toolkit";

import { buildCreateTodoExtraReducer } from "@/features/todos/stores/reducers/createTodoReducer";
import type { TodoState } from "@/features/todos/types/todoTypes";

const initialState: TodoState = {
  inProgress: false,
  todos: [
    {
      id: 1,
      title: "issueを作成",
      body: "Todo機能のCRUD処理に関する事。",
    },
    { id: 2, title: "JS、CSSの勉強", body: "サイトを作成する。" },
    {
      id: 3,
      title: "プログラミング学習",
      body: "Reactの公式ドキュメントを読む",
    },
  ],
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
