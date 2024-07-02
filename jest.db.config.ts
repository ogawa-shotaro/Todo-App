/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.db.setup.ts"],
  testMatch: ["<rootDir>/src/__test__/repositories/TodoRepository.spec.ts"],
};
