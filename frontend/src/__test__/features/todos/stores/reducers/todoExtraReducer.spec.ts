import { createAction } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";

import {
  pendingReducer,
  fulfilledReducer,
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
  it("fulfilledReducer関数を実行すると、todosの配列情報を更新をする。", () => {
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

    fulfilledReducer(state, action);

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
