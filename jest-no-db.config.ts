/**@type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/__test__/controllers/**",
    "<rootDir>/src/__test__/middlewares/**",
    "<rootDir>/src/__test__/schemas/**",
    "<rootDir>/src/__test__/auths/**",
  ],
};
