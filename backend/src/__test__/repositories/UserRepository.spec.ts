import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

import { UserRepository } from "../../repositories/users/UserRepository";
import { createTestUser } from "../helper/requestHelper";

const prisma = new PrismaClient();

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
    it("【loginメソッド実行時】DBから認証Userの検索(passwordとemail検索)を行い、ユーザー情報とトークンを返す。", async () => {
      const userData = await createTestUser();
      const email = userData.email;

      const repository = new UserRepository();

      const { user, token } = await repository.login({
        password: "dummyPassword",
        email: email,
      });

      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as JwtPayload;

      expect(decodedToken.userId).toEqual(user.id);
      expect(userData.id).toEqual(user.id);
    });
    it("【checkAndRefreshメソッド実行時】DBから認証Userの検索(id検索)を行い、ユーザー情報とトークンを返す。", async () => {
      const userData = await createTestUser();
      const userId = userData.id;

      const repository = new UserRepository();

      const { user, token } = await repository.checkAndRefresh(userId);

      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as JwtPayload;

      expect(decodedToken.userId).toEqual(user.id);
      expect(userData.id).toEqual(user.id);
    });
    it("【updateメソッド実行時】DBのユーザー情報(nameプロパティの値)を更新し、更新情報を返す。", async () => {
      const userData = await createTestUser();
      const repository = new UserRepository();

      const updatedUser = await repository.update({
        userId: userData.id,
        name: "変更後のユーザー名",
      });
      expect(updatedUser.id).toEqual(1);
      expect(updatedUser.name).toEqual("変更後のユーザー名");
    });
    it("【updateメソッド実行時】DBのユーザー情報(emailプロパティの値)を更新し、更新情報を返す。", async () => {
      const userData = await createTestUser();
      const repository = new UserRepository();

      const updatedUser = await repository.update({
        userId: userData.id,
        email: "updatedEmail@mail.com",
      });
      expect(updatedUser.id).toEqual(1);
      expect(updatedUser.email).toEqual("updatedEmail@mail.com");
    });
    it("【updateメソッド実行時】DBのユーザー情報(passwordプロパティの値)を更新し、更新情報を返す。", async () => {
      const userData = await createTestUser();
      const repository = new UserRepository();

      const updatedUser = await repository.update({
        userId: userData.id,
        password: "updatedPassword",
      });
      expect(updatedUser.id).toEqual(1);
      expect(
        await bcrypt.compare("updatedPassword", updatedUser.password),
      ).toEqual(true);
    });
    it("【updateメソッド実行時】DBのユーザー情報(すべてのプロパティの値)を更新し、更新情報を返す。", async () => {
      const userData = await createTestUser();
      const repository = new UserRepository();

      const updatedUser = await repository.update({
        userId: userData.id,
        name: "変更後のユーザー名",
        password: "updatedPassword",
        email: "updatedEmail@mail.com",
      });
      expect(updatedUser.id).toEqual(1);
      expect(updatedUser.name).toEqual("変更後のユーザー名");
      expect(
        await bcrypt.compare("updatedPassword", updatedUser.password),
      ).toEqual(true);
      expect(updatedUser.email).toEqual("updatedEmail@mail.com");
    });
    it("【deleteメソッド実行時】DBのユーザーを一件削除し、削除したユーザーの情報を返す。", async () => {
      const userData = await createTestUser();
      const repository = new UserRepository();

      const deletedUser = await repository.delete(userData.id);

      expect(deletedUser.id).toEqual(userData.id);
      expect(deletedUser.name).toEqual(userData.name);
      expect(deletedUser.password).toEqual(userData.password);
      expect(deletedUser.email).toEqual(userData.email);

      const user = await prisma.user.findUnique({
        where: { id: userData.id },
      });
      expect(user).toBeNull();
    });
  });
  describe("【異常パターン】", () => {
    it("【registerメソッドを実行時】重複したemailはエラーとなる。", async () => {
      const repository = new UserRepository();

      await repository.register({
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      });

      await expect(
        repository.register({
          name: "ダミーユーザー",
          password: "dummyPassword",
          email: "dummyData@mail.com",
        }),
      ).rejects.toThrow("emailの内容が重複しています。");
    });
    it("【loginメソッド実行時】存在しないユーザーを指定した場合、エラーオブジェクトが返る。", async () => {
      const repository = new UserRepository();

      await expect(
        repository.login({
          password: "dummyPassword",
          email: "dummyData@mail.com",
        }),
      ).rejects.toThrow("認証に失敗しました。");
    });
    it("【loginメソッド実行時】認証に失敗した場合、エラーオブジェクトが返る。", async () => {
      const user = await createTestUser();
      const email = user.email;

      const repository = new UserRepository();

      await expect(
        repository.login({
          password: "incorrect password",
          email: email,
        }),
      ).rejects.toThrow("認証に失敗しました。");
    });
    it("【checkAndRefreshメソッド実行時】認証に失敗した場合、エラーオブジェクトが返る。", async () => {
      await createTestUser();

      const repository = new UserRepository();

      await expect(repository.checkAndRefresh(999)).rejects.toThrow(
        "認証に失敗しました。",
      );
    });
    it("【updateメソッド実行時】重複したemailはエラーとなる。", async () => {
      const repository = new UserRepository();
      const initialUser = await createTestUser();
      const secondUser = await createTestUser();

      await expect(
        repository.update({
          userId: secondUser.id,
          email: initialUser.email,
        }),
      ).rejects.toThrow("emailの内容が重複しています。");
    });
    it("【deleteメソッド実行時】存在しないユーザーを指定した場合、エラーオブジェクトが返る。", async () => {
      const repository = new UserRepository();

      await expect(repository.delete(999)).rejects.toThrow(
        "削除対象のユーザーが見つかりません。",
      );
    });
  });
});
