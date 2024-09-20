import bcrypt from "bcrypt";

import { hashPassword } from "../../auths/hashPassword";

describe("【ユニットテスト】", () => {
  it("【成功パターン】パスワードが正常にハッシュ化され、元のパスワードと比較して一致する。", async () => {
    const plainPassword = "dammyData1";
    const hashedPassword = await hashPassword(plainPassword);

    expect(await bcrypt.compare(plainPassword, hashedPassword)).toEqual(true);
  });
  it("【異常パターン】ハッシュ化されていないパスワード同士を比較すると、不一致となる。", async () => {
    const plainPassword = "dammyData2";

    expect(await bcrypt.compare(plainPassword, plainPassword)).toEqual(false);
  });
});
