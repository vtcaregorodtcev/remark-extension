/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 60000,
  moduleNameMapper: {
    "^@src(.*)$": "<rootDir>/src$1",
    "^@tests(.*)$": "<rootDir>/tests$1",
  },
};
