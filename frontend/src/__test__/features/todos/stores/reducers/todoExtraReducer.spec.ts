import { createAction } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";

import {
  pendingReducer,
  addTodoFulfilledReducer,
  addTodosFulfilledReducer,
  rejectedReducer,
} from "@/features/todos/stores/reducers/todoExtraReducer";
import type { TodoState, TodoResponse } from "@/features/todos/types/todoTypes";

describe("【ユニットテスト】State操作(TodoState)に関わるReducer関数のテスト。", () => {
  let state: TodoState;
  beforeEach(() => {
    state = {
      inProgress: false,
      todos: [],
      error: null,
    };
  });
  it("pendingReducer関数を実行すると、inProgressをtrueにする。", () => {
    pendingReducer(state);

    expect(state.inProgress).toEqual(true);
  });
  it("addTodoFulfilledReducer関数を実行すると、Stateのtodos配列にTodoを追加する。", () => {
    const fulfilled = createAction<TodoResponse>("todo/createTodo");
    const action = fulfilled({
      todo: {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    addTodoFulfilledReducer(state, action);

    expect(state.inProgress).toEqual(false);
    expect(state.todos).toEqual([
      {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: action.payload.todo?.createdAt,
        updatedAt: action.payload.todo?.updatedAt,
      },
    ]);
    expect(state.error).toEqual(null);
  });
  it("addTodosFulfilledReducer関数を実行すると、Stateのtodos配列にTodos(配列)を追加する。", () => {
    const fulfilled = createAction<TodoResponse>("todo/createTodo");
    const action = fulfilled({
      todos: [
        {
          id: 1,
          title: "ダミータイトル1",
          body: "ダミーボディ1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: "ダミータイトル2",
          body: "ダミーボディ2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: "ダミータイトル3",
          body: "ダミーボディ3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    addTodosFulfilledReducer(state, action);

    expect(state.inProgress).toEqual(false);
    expect(state.todos).toEqual([
      {
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: action.payload.todos?.map((todo) => todo.updatedAt)[0],
        updatedAt: action.payload?.todos?.map((todo) => todo.updatedAt)[0],
      },
      {
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: action.payload?.todos?.map((todo) => todo.createdAt)[1],
        updatedAt: action.payload?.todos?.map((todo) => todo.updatedAt)[1],
      },
      {
        id: 3,
        title: "ダミータイトル3",
        body: "ダミーボディ3",
        createdAt: action.payload?.todos?.map((todo) => todo.createdAt)[2],
        updatedAt: action.payload?.todos?.map((todo) => todo.updatedAt)[2],
      },
    ]);
    expect(state.error).toEqual(null);
  });
  it("rejectedReducer関数を実行すると、error情報の更新をする。", () => {
    const rejected = createAction<{ error: SerializedError }>(
      "todo/createTodo"
    );
    const action = rejected({ error: { message: "dummyMessage" } });

    rejectedReducer(state, action.payload);

    expect(state.inProgress).toEqual(false);
    expect(state.error?.message).toEqual("dummyMessage");
  });
});
