/**@type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/__test__/app/controllers/todos/CreateTodoController.spec.ts",
  ],
};
