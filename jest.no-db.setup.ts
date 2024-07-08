import type { Todo } from "@prisma/client";
import type { TodoInput } from "./src/types/TodoRequest.type";

jest.mock("./src/repositories/TodoRepository.ts", () => {
  const repository = {
    nextId: 9999,

    async save(input: TodoInput): Promise<Todo> {
      return {
        id: this.nextId++,
        title: input.title,
        body: input.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
  };

  return { TodoRepository: jest.fn(() => repository) };
});

beforeEach(() => {
  jest.clearAllMocks();
});
