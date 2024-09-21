import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../../repositories/UserRepository";

describe("【UserRepositoryのテスト】", () => {
  describe("【成功パターン】", () => {
    it("【registerメソッド実行時】DBにUserを保持する。", async () => {
      const repository = new UserRepository();

      const result1 = await repository.register({
        name: "ダミーユーザー1",
        password: "dammyPassword1",
        email: "dammyData1@mail.com",
      });

      const result2 = await repository.register({
        name: "ダミーユーザー2",
        password: "dammyPassword2",
        email: "dammyData2@mail.com",
      });

      expect(result1.user.id).toEqual(1);
      expect(result1.user.name).toEqual("ダミーユーザー1");
      expect(result1.user.email).toEqual("dammyData1@mail.com");
      expect(
        await bcrypt.compare("dammyPassword1", result1.user.password),
      ).toEqual(true);

      const decodedToken1 = jwt.verify(result1.token, "JWT_SECRET_TEST");
      expect(decodedToken1).toMatchObject({ userId: result1.user.id });

      expect(result2.user.id).toEqual(2);
      expect(result2.user.name).toEqual("ダミーユーザー2");
      expect(result2.user.email).toEqual("dammyData2@mail.com");
      expect(
        await bcrypt.compare("dammyPassword2", result2.user.password),
      ).toEqual(true);
      expect(typeof result2.token).toEqual("string");

      const decodedToken2 = jwt.verify(result2.token, "JWT_SECRET_TEST");
      expect(decodedToken2).toMatchObject({ userId: result2.user.id });
    });
  });
  describe("【異常パターン】", () => {
    it("【registerメソッドを実行時】重複したemailはエラーとなる。", async () => {
      const repository = new UserRepository();

      await repository.register({
        name: "ダミーユーザー1",
        password: "dammyPassword1",
        email: "dammyData1@mail.com",
      });

      await expect(
        repository.register({
          name: "ダミーユーザー2",
          password: "dammyPassword2",
          email: "dammyData1@mail.com",
        }),
      ).rejects.toThrow("Unique constraint failed on the fields: (`email`)");
    });
  });
});
