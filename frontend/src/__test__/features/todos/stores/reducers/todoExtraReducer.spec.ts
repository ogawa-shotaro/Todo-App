import { createAction } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";

import type { TodoState, TodoResponse } from "@/features/todos/types/type";
import {
  pendingReducer,
  createTodoFulfilledReducer,
  getTodosFulfilledReducer,
  rejectedReducer,
  updateTodoFulfilledReducer,
} from "@/features/todos/stores/reducers/todoExtraReducer";

describe("【ユニットテスト】State操作(TodoState)に関わるReducer関数のテスト。", () => {
  let state: TodoState;
  beforeEach(() => {
    state = {
      inProgress: false,
      todoPage: { items: [], totalCount: 0 },
      error: null,
    };
  });
  it("pendingReducer関数を実行すると、inProgressをtrueにする。", () => {
    pendingReducer(state);

    expect(state.inProgress).toEqual(true);
  });
  it("createTodoFulfilledReducer関数を実行すると、inProgressをfalseにする。", () => {
    createTodoFulfilledReducer(state);

    expect(state.inProgress).toEqual(false);
    expect(state.error).toEqual(null);
  });
  it("getTodosFulfilledReducer関数を実行すると、 todoPageのitemsとtotalCountにデータを追加する。", () => {
    const fulfilled = createAction<TodoResponse>("todo/getTodos");
    const action = fulfilled({
      items: [
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
      totalCount: 3,
    });

    getTodosFulfilledReducer(state, action);

    expect(state.inProgress).toEqual(false);
    expect(state.todoPage.items).toEqual([
      {
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: action.payload.items?.map((todo) => todo.updatedAt)[0],
        updatedAt: action.payload?.items?.map((todo) => todo.updatedAt)[0],
      },
      {
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: action.payload?.items?.map((todo) => todo.createdAt)[1],
        updatedAt: action.payload?.items?.map((todo) => todo.updatedAt)[1],
      },
      {
        id: 3,
        title: "ダミータイトル3",
        body: "ダミーボディ3",
        createdAt: action.payload?.items?.map((todo) => todo.createdAt)[2],
        updatedAt: action.payload?.items?.map((todo) => todo.updatedAt)[2],
      },
    ]);
    expect(state.todoPage.totalCount).toEqual(3);
    expect(state.error).toEqual(null);
  });
  it("updateTodoFulfilledReducer関数を実行すると、指定した配列要素(itemsのTodo一件)のデータ更新をする。", () => {
    state.todoPage.items.push({
      id: 1,
      title: "ダミータイトル",
      body: "ダミーボディ",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const fulfilled = createAction<TodoResponse>("todo/updateTodo");
    const action = fulfilled({
      todo: {
        id: 1,
        title: "変更後のタイトル",
        body: "変更後のボディ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    updateTodoFulfilledReducer(state, action);

    expect(state.inProgress).toEqual(false);
    expect(state.todoPage.items[0]).toEqual(action.payload.todo);
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
