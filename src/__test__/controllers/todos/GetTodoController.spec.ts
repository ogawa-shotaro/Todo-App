import { GetTodoController } from "../../../controllers/todos/GetTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件の取得", () => {
  let controller: GetTodoController;
  let repository: MockRepository;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new GetTodoController(repository);
  });
  describe("成功パターン", () => {
    it("id:1のTodoデータ(jsonとstatus200)が返る", async () => {
      const req = createMockRequest({}, { id: "1" });
      const res = createMockResponse();

      repository.find.mockResolvedValue({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.find(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("id:2のTodoデータ(jsonとstatus200)が返る", async () => {
      const req = createMockRequest({}, { id: "2" });
      const res = createMockResponse();

      repository.find.mockResolvedValue({
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.find(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("findメソッドのパラメーターが【id:1】で呼び出される", async () => {
      const req = createMockRequest({}, { id: "1" });
      const res = createMockResponse();

      await controller.find(req, res);

      expect(repository.find).toHaveBeenCalledWith(1);
    });
    it("findメソッドのパラメーターが【id:2】で呼び出される", async () => {
      const req = createMockRequest({}, { id: "2" });
      const res = createMockResponse();

      await controller.find(req, res);

      expect(repository.find).toHaveBeenCalledWith(2);
    });
  });
  describe("異常パターン", () => {
    it("存在しないIDへのリクエストは、エラーメッセージとstatus400が返る", async () => {
      const req = createMockRequest({ id: "999" });
      const res = createMockResponse();

      repository.find.mockRejectedValue(
        new Error("存在しないIDを指定しました。")
      );

      await controller.find(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "存在しないIDを指定しました。",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
