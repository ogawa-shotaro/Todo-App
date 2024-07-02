/**@type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.no-db.setup.ts"],
  testMatch: [
    "<rootDir>/src/__test__/app/api/todos/CreateTodoController.spec.ts",
  ],
};
