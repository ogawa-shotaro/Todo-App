import { createSlice } from "@reduxjs/toolkit";

import { buildCreateTodoExtraReducer } from "@/features/todos/stores/reducers/createTodoReducer";
import type { Todo, TodoState } from "@/features/todos/types/todoTypes";

// ダミーデータ
const Todo1: Todo = {
  id: 1,
  title: "issueを作成",
  body: "Todo機能のCRUD処理に関する事。",
};
const Todo2 = { id: 2, title: "JS、CSSの勉強", body: "サイトを作成する。" };
const Todo3 = {
  id: 3,
  title: "プログラミング学習",
  body: "Reactの公式ドキュメントを読む",
};

const initialState: TodoState = {
  inProgress: false,
  todos: [Todo1, Todo2, Todo3],
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
