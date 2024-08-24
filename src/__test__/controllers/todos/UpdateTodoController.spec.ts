import { UpdateTodoController } from "../../../controllers/todos/UpdateTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../../errors/NotFoundError";

describe("【ユニットテスト】 Todo一件の更新", () => {
  let controller: UpdateTodoController;
  let repository: MockRepository;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new UpdateTodoController(repository);
  });
  describe("【成功パターン】", () => {
    it("id:1のデータ更新(タイトルのみ)", async () => {
      const req = createMockRequest({
        params: { id: "1" },
        body: { title: "変更後のタイトル" },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        title: "変更後のタイトル",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "変更後のタイトル",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("id:1のデータ更新(ボディのみ)", async () => {
      const req = createMockRequest({
        params: { id: "1" },
        body: { title: "変更後のボディ" },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        title: "ダミータイトル1",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("id:2のデータ更新(タイトルとボディ)", async () => {
      const req = createMockRequest({
        params: { id: "2" },
        body: { title: "変更後のタイトル", body: "変更後のボディ" },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 2,
        title: "変更後のタイトル",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        title: "変更後のタイトル",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    describe("【異常パターン】", () => {
      it("存在しないIDへのリクエストは、next関数(パラメーターがNotFoundError)を実行する。", async () => {
        const req = createMockRequest({
          params: { id: "999" },
          body: { title: "変更後のタイトル", body: "変更後のボディ" },
        });
        const res = createMockResponse();
        const next = jest.fn();

        repository.update.mockRejectedValue(
          new NotFoundError("存在しないIDを指定しました。")
        );

        await controller.update(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
      });
    });
  });
});
