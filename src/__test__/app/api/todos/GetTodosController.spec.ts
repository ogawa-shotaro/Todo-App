import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("[APIテスト] Todo一覧取得", () => {
  it("成功パターン(prisma使用)", async () => {
    for (let i = 1; i <= 3; i++) {
      await prisma.todo.create({
        data: {
          title: "ダミータイトル" + i,
          body: "ダミーボディ" + i,
        },
      });
    }

    const todos = await prisma.todo.findMany();

    expect(todos.length).toEqual(3);
    expect(todos.map((todo) => todo.id)).toEqual([1, 2, 3]);
    expect(todos.map((todo) => todo.title)).toEqual([
      "ダミータイトル1",
      "ダミータイトル2",
      "ダミータイトル3",
    ]);
    expect(todos.map((todo) => todo.body)).toEqual([
      "ダミーボディ1",
      "ダミーボディ2",
      "ダミーボディ3",
    ]);
  });
});
