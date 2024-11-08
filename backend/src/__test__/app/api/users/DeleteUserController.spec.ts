import { StatusCodes } from "http-status-codes";

import { User } from "@prisma/client";

import { UserRepository } from "../../../../repositories/users/UserRepository";
import { requestAPI, requestAPIWithAuth } from "../../../helper/requestHelper";
import { createTestUser } from "../../../helper/requestHelper";

describe("【APIテスト】ユーザーの削除機能", () => {
  let newUser: User;
  beforeEach(async () => {
    newUser = await createTestUser();
  });
  describe("【成功パターン】", () => {
    it("【認証ユーザーの場合】リクエストをすると成功する。", async () => {
      const response = await requestAPIWithAuth({
        method: "delete",
        endPoint: "/api/users",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      expect(response.body).toEqual({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    });
  });
  describe("【異常パターン】", () => {
    it("【認証ユーザーでない場合】エラーメッセージとstatus(UNAUTHORIZED=401)が返る。", async () => {
      const response = await requestAPI({
        method: "delete",
        endPoint: "/api/users",
        statusCode: StatusCodes.UNAUTHORIZED,
      });

      expect(response.body).toEqual({
        message: "認証に失敗しました。",
      });
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージとstatus(InternalServerError=500)が返る。", async () => {
      jest.spyOn(UserRepository.prototype, "delete").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });

      const response = await requestAPIWithAuth({
        method: "delete",
        endPoint: "/api/users",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        userId: newUser.id,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
    });
  });
});
