import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../../repositories/UserRepository";

describe("【UserRepositoryのテスト】", () => {
  describe("【成功パターン】", () => {
    it("【registerメソッド実行時】DBにUserを保持する。", async () => {
      const repository = new UserRepository();

      const result1 = await repository.register({
        name: "ダミーユーザー1",
        password: "dummyPassword1",
        email: "dummyData1@mail.com",
      });

      const result2 = await repository.register({
        name: "ダミーユーザー2",
        password: "dummyPassword2",
        email: "dummyData2@mail.com",
      });

      expect(result1.user.name).toEqual("ダミーユーザー1");
      expect(result1.user.email).toEqual("dummyData1@mail.com");
      expect(
        await bcrypt.compare("dummyPassword1", result1.user.password),
      ).toEqual(true);
      expect(typeof result1.token).toEqual("string");
      const decodedToken1 = jwt.verify(result1.token, process.env.JWT_SECRET!);
      expect(decodedToken1).toMatchObject({ userId: result1.user.id });

      expect(result2.user.name).toEqual("ダミーユーザー2");
      expect(result2.user.email).toEqual("dummyData2@mail.com");
      expect(
        await bcrypt.compare("dummyPassword2", result2.user.password),
      ).toEqual(true);
      expect(typeof result2.token).toEqual("string");
      const decodedToken2 = jwt.verify(result2.token, process.env.JWT_SECRET!);
      expect(decodedToken2).toMatchObject({ userId: result2.user.id });
    });
  });
  describe("【異常パターン】", () => {
    it("【registerメソッドを実行時】重複したemailはエラーとなる。", async () => {
      const repository = new UserRepository();

      await repository.register({
        name: "ダミーユーザー",
        password: "dmmyPassword",
        email: "dummyData@mail.com",
      });

      await expect(
        repository.register({
          name: "ダミーユーザー",
          password: "dummyPassword",
          email: "dummyData@mail.com",
        }),
      ).rejects.toThrow("Unique constraint failed on the fields: (`email`)");
    });
  });
});
