// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Allows you to use a custom runner instead of Jest's default test runner
  runner: "jest-runner",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)",
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  setupFilesAfterEnv: ["jest-extended"]

};