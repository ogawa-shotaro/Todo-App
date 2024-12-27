import { createAction } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";

import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
  signoutFulfilledReducer,
  updateUserFulfilledReducer,
} from "@/features/users/stores/reducers/authExtraReducer";
import type { AuthState, AuthResponse } from "@/features/users/types/authTypes";

describe("【ユニットテスト】State操作に関わるReducer関数(ユーザー登録)のテスト。", () => {
  let state: AuthState;
  beforeEach(() => {
    state = {
      inProgress: false,
      user: {
        name: "",
        email: "",
      },
      isUserUpdateAuthorized: false,
      error: null,
    };
  });
  it("pendingReducer関数を実行すると、inProgressをtrueにする。", () => {
    pendingReducer(state);

    expect(state.inProgress).toEqual(true);
    expect(state.error).toEqual(null);
  });
  it("fulfilledReducer関数を実行すると、user情報の更新をする。", () => {
    const signupFulfilled = createAction<AuthResponse>("signup/fulfilled");
    const action = signupFulfilled({
      user: {
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      },
    });

    fulfilledReducer(state, action);

    expect(state.inProgress).toEqual(false);
    expect(state.user?.name).toEqual("ダミーユーザー");
    expect(state.user?.email).toEqual("dummyData@mail.com");
    expect(state.isUserUpdateAuthorized).toEqual(false);
    expect(state.error).toEqual(null);
  });
  it("rejectedReducer関数を実行すると、error情報の更新をする。", () => {
    const signupRejected = createAction<{ error: SerializedError }>(
      "signup/rejected"
    );
    const action = signupRejected({ error: { message: "dummyMessage" } });

    rejectedReducer(state, action.payload);

    expect(state.inProgress).toEqual(false);
    expect(state.error?.message).toEqual("dummyMessage");
  });
  it("signoutFulfilledReducer関数を実行すると、user情報をnullにする。", () => {
    signoutFulfilledReducer(state);

    expect(state.inProgress).toEqual(false);
    expect(state.user).toEqual(null);
    expect(state.isUserUpdateAuthorized).toEqual(false);
    expect(state.error).toEqual(null);
  });
  it("updateUserFulfilledReducer関数を実行すると、isUserUpdateAuthorizedをtrueにする。", () => {
    updateUserFulfilledReducer(state);

    expect(state.inProgress).toEqual(false);
    expect(state.user).toEqual(null);
    expect(state.isUserUpdateAuthorized).toEqual(true);
    expect(state.error).toEqual(null);
  });
});
