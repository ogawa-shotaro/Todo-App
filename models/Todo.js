const todos = [];
let nextId = 1;

class Todo {
  constructor({ title, body }) {
    this.id = nextId++;
    this.title = title;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = {
  create: ({ title, body }) => {
    if (!title) {
      throw new Error("titleは必須です");
    }
    if (!body) {
      throw new Error("bodyは必須です");
    }

    const todo = new Todo({
      title: title,
      body: body,
    });
    todos.push(todo);

    return todo;
  },
};
