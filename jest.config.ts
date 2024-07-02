import type { Config } from "@jest/types";

/** @type {import('ts-jest').JestConfigWithTsJest} */

const config: Config.InitialOptions = {
  projects: ["./jest.db.config.ts", "./jest.no-db.config.ts"],
};

export default config;
