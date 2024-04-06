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
  findAll: () => {
    return todos.slice();
  },
};
