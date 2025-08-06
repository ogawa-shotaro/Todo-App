import toastReducer, {
  type ToastState,
  showToast,
  clearToast,
} from "@/stores/toastSlice";

describe("【ユニットテスト】State操作に関わるReducer関数(トースト表示)のテスト。", () => {
  let state: ToastState;
  beforeEach(() => {
    state = {
      message: null,
    };
  });
  it("showToastのオブジェクト関数を実行(type:successの場合)すると、messageプロパティに値を追加する。", () => {
    const action = {
      text: "ダミーのトースト処理が成功しました。",
      type: "success",
    };
    const result = toastReducer(state, showToast(action));

    expect(result.message?.text).toEqual(
      "ダミーのトースト処理が成功しました。"
    );
    expect(result.message?.type).toEqual("success");
  });
  it("showToastのオブジェクト関数を実行(type:errorの場合)すると、messageプロパティに値を追加する。", () => {
    const action = {
      text: "ダミーのトースト処理が失敗しました。",
      type: "error",
    };

    const result = toastReducer(state, showToast(action));

    expect(result.message?.text).toEqual(
      "ダミーのトースト処理が失敗しました。"
    );
    expect(result.message?.type).toEqual("error");
  });
  it("clearToastのオブジェクト関数を実行すると、messageプロパティの値をnullにする。", () => {
    let result = toastReducer(
      state,
      showToast({
        text: "ダミーテキスト。",
        type: "success",
      })
    );
    expect(result.message !== null).toEqual(true);

    result = toastReducer(state, clearToast());
    expect(result.message === null).toEqual(true);
  });
});
