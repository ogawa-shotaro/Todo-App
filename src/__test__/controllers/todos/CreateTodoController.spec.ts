import { CreateTodoController } from "../../../controllers/todos/CreateTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";
import { StatusCodes } from "http-status-codes";

describe("【ユニットテスト】Todo1件の新規作成", () => {
  let controller: CreateTodoController;
  let repository: MockRepository;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new CreateTodoController(repository);
  });
  describe("【成功パターン】", () => {
    it("saveメソッドのパラメータが正しい【titleとbodyの値を含む】と、Todo(jsonとstatus(ok=200))が返る", async () => {
      const req = createMockRequest({
        body: {
          title: "ダミータイトル",
          body: "ダミーボディ",
        },
      });
      const res = createMockResponse();

      repository.save.mockResolvedValue({
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.create(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(repository.save).toHaveBeenCalledWith({
        title: "ダミータイトル",
        body: "ダミーボディ",
      });
    });
  });
  describe("異常パターン", () => {
    it("タイトルなしでは、エラーメッセージとstatus(BAD_REQUEST=400)が返る", async () => {
      const req = createMockRequest({
        body: {
          title: "",
          body: "ダミーボディ",
        },
      });
      const res = createMockResponse();

      repository.save.mockRejectedValue(new Error("titleの内容は必須です"));

      await controller.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "titleの内容は必須です",
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    });
    it("ボディなしでは、エラーメッセージとstatus(BAD_REQUEST=400)が返る", async () => {
      const req = createMockRequest({
        body: {
          title: "ダミータイトル",
          body: "",
        },
      });
      const res = createMockResponse();

      repository.save.mockRejectedValue(new Error("bodyの内容は必須です"));

      await controller.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "bodyの内容は必須です",
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    });
  });
});
