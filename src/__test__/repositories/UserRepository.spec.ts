import { UserRepository } from "../../repositories/UserRepository";

describe("【UserRepositoryのテスト】", () => {
  describe("【成功パターン】", () => {
    it("【registerメソッド実行時】DBにUserを保持する。", async () => {
      const repository = new UserRepository();

      const initialUser = await repository.register({
        name: "ダミーユーザー1",
        password: "dammyPassword1",
        email: "dammyData1.com",
      });
      const secondUser = await repository.register({
        name: "ダミーユーザー2",
        password: "dammyPassword2",
        email: "dammyData2.com",
      });

      expect(initialUser.id).toEqual(1);
      expect(initialUser.name).toEqual("ダミーユーザー1");
      expect(initialUser.email).toEqual("dammyData1.com");
      expect(initialUser.password).toEqual("dammyPassword1");

      expect(secondUser.id).toEqual(2);
      expect(secondUser.name).toEqual("ダミーユーザー2");
      expect(secondUser.email).toEqual("dammyData2.com");
      expect(secondUser.password).toEqual("dammyPassword2");
    });
  });
  describe("【異常パターン】", () => {
    it("【registerメソッドを実行時】重複したemailはエラーとなる。", async () => {
      const repository = new UserRepository();

      await repository.register({
        name: "ダミーユーザー1",
        password: "dammyPassword1",
        email: "dammyData1.com",
      });

      await expect(
        repository.register({
          name: "ダミーユーザー2",
          password: "dammyPassword2",
          email: "dammyData1.com",
        }),
      ).rejects.toThrow("Unique constraint failed on the fields: (`email`)");
    });
  });
});
