import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        isolatedModules: true,
        diagnostics: {
          ignoreCodes: ["TS151001"],
        },
      },
    ],
  },
};

export default jestConfig;
