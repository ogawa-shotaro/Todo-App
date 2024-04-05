const Todo = require("../../../models/Todo");

describe("findAllメソッドのテスト", () => {
  it("配列の決められたデータ構造でTodoが格納されている", () => {
    const todos = Todo.findAll();
    expect(Array.isArray(todos)).toEqual(true);
    expect(todos.length > 0).toEqual(true);
    todos.forEach((todo) => {
      expect({ ...todo }).toEqual({
        id: todo.id,
        title: todo.title,
        body: todo.body,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });
    });
  });
});
