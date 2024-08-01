/**@type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/__test__/controllers/todos/CreateTodoController.spec.ts",
    "<rootDir>/src/__test__/controllers/todos/GetTodoController.spec.ts",
  ],
};
