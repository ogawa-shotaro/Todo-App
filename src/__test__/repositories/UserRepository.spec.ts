import bcrypt from "bcrypt";

import { UserRepository } from "../../repositories/UserRepository";

describe("【UserRepositoryのテスト】", () => {
  describe("【成功パターン】", () => {
    it("【registerメソッド実行時】DBにUserを保持する。", async () => {
      const repository = new UserRepository();

      const initialUser = await repository.register({
        name: "ダミーユーザー1",
        password: "dammyPassword1",
        email: "dammyData1@mail.com",
      });

      const secondUser = await repository.register({
        name: "ダミーユーザー2",
        password: "dammyPassword2",
        email: "dammyData2@mail.com",
      });

      expect(initialUser.user.id).toEqual(1);
      expect(initialUser.user.name).toEqual("ダミーユーザー1");
      expect(initialUser.user.email).toEqual("dammyData1@mail.com");
      expect(
        await bcrypt.compare("dammyPassword1", initialUser.user.password),
      ).toEqual(true);
      expect(typeof initialUser.token).toEqual("string");

      expect(secondUser.user.id).toEqual(2);
      expect(secondUser.user.name).toEqual("ダミーユーザー2");
      expect(secondUser.user.email).toEqual("dammyData2@mail.com");
      expect(
        await bcrypt.compare("dammyPassword2", secondUser.user.password),
      ).toEqual(true);
      expect(typeof secondUser.token).toEqual("string");
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
