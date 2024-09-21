import bcrypt from "bcrypt";

import { hashPassword } from "../../auths/password_operator";

describe("【ユニットテスト】", () => {
  it("【テスト1】パスワードが正常にハッシュ化され、元のパスワードと比較して一致する。", async () => {
    const plainPassword = "dammyData1";
    const hashedPassword = await hashPassword(plainPassword);

    expect(await bcrypt.compare(plainPassword, hashedPassword)).toEqual(true);
  });
  it("【テスト2】パスワードが正常にハッシュ化され、元のパスワードと比較して一致する。", async () => {
    const plainPassword = "dammyData2";
    const hashedPassword = await hashPassword(plainPassword);

    expect(await bcrypt.compare(plainPassword, hashedPassword)).toEqual(true);
  });
});
