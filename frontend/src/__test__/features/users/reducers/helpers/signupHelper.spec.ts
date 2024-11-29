import type {
  AuthState,
  SignupInput,
  SignupResponse,
} from "@/features/users/types";
import { SerializedError } from "@reduxjs/toolkit";
import {
  pendingOperation,
  fulfilledOperation,
  rejectedOperation,
} from "@/features/users/reducers/helpers/signupHelper";
import { createTestAction } from "@/__test__/helpers/actions/createTestAction";

describe("【ユニットテスト】State操作に関わるヘルパー関数(ユーザー登録)のテスト。", () => {
  let state: AuthState;
  beforeEach(() => {
    state = {
      signup: {
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

    expect(state.signup.inProgress).toEqual(true);
    expect(state.signup.isSucceeded).toEqual(false);
    expect(state.signup.error).toEqual(null);
  });
  it("fulfilledOperation関数を実行すると、signupのisSucceedをtrueにし、user情報の更新をする。", () => {
    const action = createTestAction<
      SignupResponse,
      string,
      {
        arg: SignupInput;
        requestId: string;
        requestStatus: "fulfilled";
      }
    >("signup/fulfilled", {
      user: {
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      },
    });
    fulfilledOperation(state, action);

    expect(state.signup.inProgress).toEqual(false);
    expect(state.signup.isSucceeded).toEqual(true);
    expect(state.signup.error).toEqual(null);

    expect(state.user.name).toEqual("ダミーユーザー");
    expect(state.user.email).toEqual("dummyData@mail.com");
  });
  it("rejectedOperation関数を実行すると、error情報の更新をする。", () => {
    const action = createTestAction<
      unknown,
      string,
      {
        arg: SignupInput;
        requestId: string;
        requestStatus: "rejected";
        aborted: boolean;
        condition: boolean;
      } & (
        | {
            rejectedWithValue: true;
          }
        | ({
            rejectedWithValue: false;
          } & {})
      ),
      SerializedError
    >(
      "signup/rejecte",
      {},
      {
        arg: {
          name: "ダミーユーザー",
          password: "dummyPassword",
          email: "dummyData@mail.com",
        },
        requestId: "1",
        requestStatus: "rejected",
        aborted: false,
        condition: true,
        rejectedWithValue: true,
      },
      {
        message: "dummyMessage",
      }
    );

    rejectedOperation(state, action);

    expect(state.signup.inProgress).toEqual(false);
    expect(state.signup.isSucceeded).toEqual(false);
    expect(state.signup.error?.message).toEqual("dummyMessage");
  });
});
