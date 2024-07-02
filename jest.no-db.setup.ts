jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    todo: {
      create: jest.fn((requestData) => {
        if (!requestData.title) {
          return Promise.reject(new Error("titleの内容は必須です"));
        }
        if (!requestData.body) {
          return Promise.reject(new Error("bodyの内容は必須です"));
        }
        return Promise.resolve({
          id: String(1),
          title: requestData.title,
          body: requestData.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }),
    },
  };

  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

beforeEach(() => {
  jest.clearAllMocks();
});
