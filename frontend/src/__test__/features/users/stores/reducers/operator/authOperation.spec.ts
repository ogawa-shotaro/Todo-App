import { createAction } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";

import {
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "@/features/users/stores/reducers/operator/authOperation";
import type { AuthState, AuthResponse } from "@/features/users/types/authTypes";

describe("【ユニットテスト】State操作に関わる操作関数(ユーザー登録)のテスト。", () => {
  let state: AuthState;
  beforeEach(() => {
    state = {
      auth: {
        inProgress: false,
        isSucceeded: false,
        error: null,
      },
      user: {
        name: "",
        email: "",
      },
    };
  });
  it("pendingOperation関数を実行すると、signupのinProgressをtrueにする。", () => {
    pendingOperation(state);

    expect(state.auth.inProgress).toEqual(true);
    expect(state.auth.isSucceeded).toEqual(false);
    expect(state.auth.error).toEqual(null);
  });
  it("fulfilledOperation関数を実行すると、signupのisSucceedをtrueにし、user情報の更新をする。", () => {
    const signupFulfilled = createAction<AuthResponse>("signup/fulfilled");
    const action = signupFulfilled({
      user: {
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      },
    });

    fulfilledOperation(state, action);

    expect(state.auth.inProgress).toEqual(false);
    expect(state.auth.isSucceeded).toEqual(true);
    expect(state.auth.error).toEqual(null);

    expect(state.user.name).toEqual("ダミーユーザー");
    expect(state.user.email).toEqual("dummyData@mail.com");
  });
  it("rejectedOperation関数を実行すると、error情報の更新をする。", () => {
    const signupRejected = createAction<{ error: SerializedError }>(
      "signup/rejected"
    );
    const action = signupRejected({ error: { message: "dummyMessage" } });

    rejectedOperation(state, action.payload);

    expect(state.auth.inProgress).toEqual(false);
    expect(state.auth.isSucceeded).toEqual(false);
    expect(state.auth.error?.message).toEqual("dummyMessage");
  });
});
