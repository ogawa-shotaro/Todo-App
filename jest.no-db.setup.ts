jest.mock("./src/repositories/TodoRepository.ts", () => {
  const repository = {
    todo: {
      create: jest.fn((requestData) => {
        if (!requestData.title) {
          return Promise.reject({
            status: 400,
            message: "titleの内容は必須です",
          });
        }
        if (!requestData.body) {
          return Promise.reject({
            status: 400,
            message: "bodyの内容は必須です",
          });
        }
        return Promise.resolve({
          id: Number(1),
          title: requestData.title,
          body: requestData.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }),
    },
  };

  return { TodoRepository: jest.fn(() => repository) };
});

beforeEach(() => {
  jest.clearAllMocks();
});
